const rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: 'npmjs.com' },
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});
