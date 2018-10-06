import { getUrl } from '../api';
describe('api', () => {
  describe('getUrl', () => {
    it('returns localhost api url with provided endpoint while not running in production', () => {
      const result = getUrl('test/endpoint');
      expect(result).toBe('http:/localhost:5000/stats?repo=test/endpoint');
    });
    it('returns production api url with provided endpoint while running in production', () => {
      process.env.NODE_ENV = 'production';
      const result = getUrl('test/endpoint');
      expect(result).toBe(
        'https://gh-stats-for-npm.herokuapp.com/stats?repo=test/endpoint'
      );
    });
  });
});
