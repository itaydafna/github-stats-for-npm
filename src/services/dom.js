const intervalIds = {};

export function pollDOM({ intervalId, interval, callback }) {
  clearInterval(intervalIds[intervalId]);
  return new Promise(resolve => {
    intervalIds[intervalId] = setInterval(() => {
      const result = callback();
      if (result) {
        clearInterval(intervalIds[intervalId]);
        resolve(result);
      }
    }, interval);
  });
}

export function selectRepoBox() {
  try {
    return [
      ...document.querySelectorAll(`div[class^='package__sidebarSection']`),
    ].find(elm => elm.children[0].childNodes[0].data === 'repository');
  } catch (e) {
    return null;
  }
}

export function findGithubRepoEndpoint() {
  const ghBase = 'https://github.com/';
  const ghAnchors = [...document.querySelectorAll(`a[href^="${ghBase}"]`)];
  const anchor = ghAnchors.find(a => a.innerText === 'github');
  const path = anchor && anchor.href && anchor.href.split(ghBase)[1];
  return path && path.includes('#') ? path.substr(0, path.indexOf('#')) : path;
}

export function isMounted() {
  return !!document.getElementById('__gh-stats-for-npm');
}
