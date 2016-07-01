
var id = 100;

// ブラウザアクションのボタン
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
    var targetId = null;
    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      if (tabId != targetId || changedProps.status != "complete") return;
      chrome.tabs.onUpdated.removeListener(listener);
      var views = chrome.extension.getViews();
      for (var i = 0; i < views.length; i++) {
        var view = views[i];
        if (view.location.href == viewTabUrl) {
          view.setScreenshotUrl(screenshotUrl);
          break;
        }
      }
    });
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      console.log(tabs[0]);
      chrome.tabs.create({index:tabs[0].index ,url: viewTabUrl}, function(tab) {
        targetId = tab.id;
        console.log(tab.id);
      });
    });
  });
});
