function bookmarkListener() {
    chrome.bookmarks.onCreated.addListener(function handleCreated() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'bookmark', bookmark: 1 }, function (response) {
                //console.log(response.farewell);
            });
        });
    });
}
  

bookmarkListener();
