import { fetchRepoData } from './api';
import { INIT_APP, FETCH_REPO_DATA } from '../constants/messages.json';
import './page-state-matcher';

chrome.webNavigation.onHistoryStateUpdated.addListener(({ tabId }) => {
  chrome.tabs.sendMessage(tabId, {
    message: INIT_APP,
  });
});

chrome.tabs.onUpdated.addListener(tabId =>
  chrome.tabs.sendMessage(tabId, {
    message: INIT_APP,
  })
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type, endpoint } = request;
  if (type === FETCH_REPO_DATA && endpoint) {
    fetchRepoData(endpoint).then(repoData => {
      sendResponse({ repoData });
    });
    return true;
  }
});
