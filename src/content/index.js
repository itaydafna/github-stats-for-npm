import Vue from 'vue';
import App from './App';
import {
  pollDOM,
  selectRepoBox,
  findGithubRepoEndpoint,
  isMounted,
} from '../services/dom';
import { INIT_APP, FETCH_REPO_DATA } from '../constants/messages.json';
import * as filters from './filters';

Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter]);
});

function appendVueContainer({ repoBox }) {
  const vueContainer = document.createElement('div');
  vueContainer.id = '__gh-stats-for-npm';
  repoBox.appendChild(vueContainer);
  new Vue({
    el: '#__gh-stats-for-npm',
    components: {
      App,
    },
    data: {
      stats: null,
      error: false,
    },
    async created() {
      const endpoint = await pollDOM({
        intervalId: 'repoEndpoint',
        interval: 500,
        callback: findGithubRepoEndpoint,
      });

      chrome.runtime.sendMessage(
        {
          type: FETCH_REPO_DATA,
          endpoint,
        },
        ({ repoData }) => {
          if (repoData) {
            this.stats = repoData;
          } else {
            this.error = true;
          }
          return true;
        }
      );
    },
    template: '<App :stats="stats" :error="error" />',
  });
}

export async function mountVueApp() {
  try {
    const repoBox = await pollDOM({
      intervalId: 'repoBox',
      interval: 500,
      callback: selectRepoBox,
    });

    return appendVueContainer({
      repoBox,
    });
  } catch (err) {
    console.warn(err);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === INIT_APP) {
    !isMounted() && mountVueApp();
  }
});
