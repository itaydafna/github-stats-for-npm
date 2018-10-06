export function getUrl(endpoint) {
  let HOST = 'http:/localhost:5000';
  if (process.env.NODE_ENV === 'production') {
    HOST = 'https://gh-stats-for-npm.herokuapp.com';
  }
  return `${HOST}/stats?repo=${endpoint}`;
}

export async function fetchRepoData(endpoint) {
  const res = await fetch(getUrl(endpoint));
  const data = await res.json();
  return data.data;
}
