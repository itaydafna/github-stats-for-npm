const express = require('express');
const app = express();

const { getStats } = require('./get-stats');

const port = process.env.PORT || 5000;

const router = express.Router();

router.get('/stats', getStats);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
