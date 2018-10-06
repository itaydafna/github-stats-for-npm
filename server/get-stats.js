const axios = require('axios');
let cache = {};

function clearCache() {
  cache = {};
}

const getStats = async (req, res) => {
  try {
    const { repo } = req.query;
    if (!repo) {
      res.status(404);
      return res.json({
        status: 'error',
        message: 'no repo was sent in query',
      });
    }

    if (cache[repo]) {
      res.status(200);
      return res.json({
        status: 'success',
        message: 'cached response',
        data: cache[repo],
      });
    }
    const { GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;
    const { data, status, headers } = await axios.get(
      `https://api.github.com/repos/${repo}?client_id=${GH_CLIENT_ID}&client_secret=${GH_CLIENT_SECRET}`
    );
    if (status === 200 && !!data) {
      cache[repo] = data;
      res.status(200);
      res.json({
        status: 'success',
        message: `gh api response: ${headers['x-ratelimit-remaining']} out of ${
          headers['x-ratelimit-limit']
        } requests remaining till hourly limit is reached`,
        data,
      });
    }
  } catch (err) {
    res.status(500);
    res.json({
      status: 'error',
      message: 'something went wrong',
      error: err.message,
    });
  }
};

// clear cache every hour
setInterval(clearCache, 1000 * 60 * 60);

module.exports = {
  clearCache,
  getStats,
};
