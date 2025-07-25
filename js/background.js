function bookmarkListener() {
    chrome.bookmarks.onCreated.addListener(function handleCreated() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'bookmark', bookmark: 1 }, function (response) {
                //console.log(response.farewell);
            });
        });
    });
}

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error('Error setting panel behavior:', error));

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const url = new URL(tab.url);
        if (url.protocol === 'https:' || url.protocol === 'http:') {
            chrome.sidePanel.setOptions({
                tabId,
                path: 'sidepanel.html',
                enabled: true
            })
            // .then(() => {
            //     chrome.sidePanel.open({ tabId });
            // })
            .catch((error) => console.error('Error opening side panel:', error));
        } else {
            chrome.sidePanel.setOptions({ tabId, enabled: false });
        }
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'new_search_results') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'update_sidepanel',
          data: request.data
        }, (response) => {
          console.log("Side panel update response:", response);
          sendResponse({ status: "Side panel notified" });
        });
      }
    });
    return true; // Keep the message channel open for async response
  }
});

bookmarkListener();
