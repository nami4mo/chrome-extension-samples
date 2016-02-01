chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(tabs[0].url != "https://tweetdeck.twitter.com/") return;
    chrome.tabs.insertCSS(tabs[0].id,{
      file: "style.css"
    });
  });
});
