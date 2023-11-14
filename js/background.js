function bookmarkListener() {
  chrome.bookmarks.onCreated.addListener(function handleCreated() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { bookmark: 1 }, function (response) {
        //console.log(response.farewell);
      });
    });
  });
}

function getIP() {
  if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
  else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 
  xmlhttp.open("GET", "https://api.hostip.info/get_html.php", false);
  xmlhttp.send();

  hostipInfo = xmlhttp.responseText.split("\n");
  console.log(hostipInfo);

  for (i = 0; hostipInfo.length >= i; i++) {
    ipAddress = hostipInfo[i].split(":");
    if (ipAddress[0] == "IP") {
      return ipAddress[1];
    }
  }
  return false;
}


bookmarkListener();