const express = require('express');
const moxios = require('moxios');
const request = require('supertest');

const { getStats, clearCache } = require('../get-stats');

const initGetStats = () => {
  const app = express();
  const router = express.Router();
  router.get('/stats', getStats);
  return app.use(router);
};

describe('GET /stats', () => {
  beforeEach(() => {
    moxios.install();
    process.env.GH_CLIENT_ID = 'TEST_GH_CLIENT_ID';
    process.env.GH_CLIENT_SECRET = 'TEST_GH_CLIENT_SECRET';
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('no repo in query', () => {
    it('should 404 and return a "no repo" error response when no repo is provided in query', async () => {
      const app = initGetStats();
      const res = await request(app).get('/stats');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        status: 'error',
        message: 'no repo was sent in query',
      });
    });
  });

  describe('successful GH response', () => {
    beforeEach(() => {
      moxios.stubRequest(/api.github.com\/repos/, {
        status: 200,
        headers: {
          'x-ratelimit-remaining': 1234,
          'x-ratelimit-limit': 5000,
        },
        response: {
          data: 'repo data...',
        },
      });
    });

    afterEach(() => {
      clearCache();
    });

    it('Should fetch the repo provided in the query from GitHub', async () => {
      const app = initGetStats();
      await request(app)
        .get('/stats')
        .query({ repo: 'test/repo' });
      expect(moxios.requests.mostRecent().url).toBe(
        `https://api.github.com/repos/test/repo?client_id=TEST_GH_CLIENT_ID&client_secret=TEST_GH_CLIENT_SECRET`
      );
    });

    it('Should return a github response if in case it is the first request for this repo', async () => {
      const app = initGetStats();
      const res = await request(app)
        .get('/stats')
        .query({ repo: 'test/repo' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: { data: 'repo data...' },
        message:
          'gh api response: 1234 out of 5000 requests remaining till hourly limit is reached',
        status: 'success',
      });
    });
    it('Should return a cached response in case the same repo is queried more than once in the same hour', async () => {
      const app = initGetStats();
      await request(app)
        .get('/stats')
        .query({ repo: 'test2/repo2' });
      const res = await request(app)
        .get('/stats')
        .query({ repo: 'test2/repo2' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: { data: 'repo data...' },
        message: 'cached response',
        status: 'success',
      });
    });
  });

  describe('general error response', () => {
    it('should 500 and return "something went wrong" and the error message', async () => {
      moxios.stubRequest(/api.github.com\/repos/, {
        status: 500,
        response: {
          message: 'github server error',
        },
      });
      const app = initGetStats();
      const res = await request(app)
        .get('/stats')
        .query({ repo: 'test3/repo3' });
      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        status: 'error',
        message: 'something went wrong',
        error: 'Request failed with status code 500',
      });
    });
  });
});
