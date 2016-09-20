chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if( tab.url.indexOf("https://tweetdeck.twitter.com/") != -1 ){
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(){
  // var observer1 = new MutationObserver(setMouseEvent);
  // observer1.observe( document.getElementsByTagName('html')[0], {childList: true} );
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
      console.log(response);
    });
  });
});
