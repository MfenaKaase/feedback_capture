let search_results = {};
// Add to the top of content.js
let lastKnownUrl = window.location.href;

// Function to check for URL changes
function monitorUrlChanges() {
  setInterval(() => {
    if (window.location.href !== lastKnownUrl) {
      console.log("URL changed from", lastKnownUrl, "to", window.location.href);
      lastKnownUrl = window.location.href;
      saveCaptureData.getSearchQuery(); // Fetch new search results
      notifySidePanel(); // Notify side panel of new results
    }
  }, 1000); // Check every second
}

// Function to notify side panel of new search results
function notifySidePanel() {
  chrome.runtime.sendMessage({
    type: "new_search_results",
    data: search_results
  }, (response) => {
    console.log("Side panel notified:", response);
  });
}


// URL handler
function getUrlVars(href) {
  var vars = [], hash;
  var hashes = href.slice(href.indexOf("?") + 1).split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;

}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    if (request["type"] == 'msg_from_popup') {
      console.log("msg receive from popup");
      sendResponse(search_results);

    }
    return true;

  }
);

// Save capture data object
var saveCaptureData = {
  timeIntervalID: null,
  active_time_counter: 0,
  total_user_clicks: 0,
  total_mouse_movement_x: 0,
  total_mouse_movement_y: 0,
  total_user_scroll: 0,
  total_key_stroke: 0,
  total_copy: 0,
  total_text_selections: 0,
  bookmarked: 0,
  printed_document: 0,
  page_saved: 0,
  total_mouse_distance: 0,
  total_mouse_speed: 0,
  average_mouse_speed: 0,
  total_active_time: 0,
  url: window.location.href,
  pageTitle: "",
  leadingParagraph: "",
  content: "",
  search_query: "",
  userIP: "",
  userID: "12",
  user_rating: 0,
  cohort: "",
  token: "",
  openTimeStamp: 0,
  closeTimeStamp: 0,
  velocity_time_count: 0,

  init: function () {
    this.loadedTime = Date.now();
    this.newTime = new Date();
    this.openTimeStamp = Math.floor(this.newTime.getTime() / 1000);
    console.log("The time loading is: " + this.openTimeStamp);
    this.setCloseEvent();
    this.startTimeCount();
    this.monitorKeyPress();
    this.monitorClicks();
    this.monitorScroll();
    this.monitorTabVisibility();
    this.CopyPaste();
    this.pageSelectionEvent();
    this.userPrintEvents();
    this.pageSaveEvent();
    this.getIP();
    this.getUserID();
    this.getPageTitle();
    this.getContent();
    this.getLeadingParagraph();

    chrome.storage.sync.get(["searchQuery"], function (result) {
      saveCaptureData.search_query = result.searchQuery || "";
      console.log("Search query that brought up this page: " + saveCaptureData.search_query);
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.type === 'bookmark') {
        if (request.bookmark === 1) {
          saveCaptureData.bookmarked += 1;
          console.log("Bookmark event recorded. Total bookmarks: " + saveCaptureData.bookmarked);
        } else {
          console.warn("Invalid bookmark value received:", request.bookmark);
        }
      } else if (request.IP) {
        saveCaptureData.userIP = request.IP;
        console.log("IP received from background:", request.IP);
      } else if (request.type === 'msg_from_popup') {
        console.log("Message received from popup");
        sendResponse(search_results);
      }
      return true;
    });
  },

  getSearchQuery: function () {
    let lastUrl = window.location.href;
    console.log("URL: " + lastUrl);
    let query = String(getUrlVars(lastUrl).q || "");
    let r = query.split('+').join(' ');

    if (!r) {
      console.log("No search query found in URL, skipping search request.");
      return;
    }

    chrome.storage.local.get(['authToken'], function (result) {
      let authToken = result.authToken || "";
      console.log("Auth token for search query:", authToken);

      const myHeaders = new Headers();
      if (authToken) {
        myHeaders.append('Authorization', `Bearer ${authToken}`);
      }

      fetch(`https://feedback.sekimbi.com/api/implicit-feedback?query=${encodeURIComponent(r)}`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
        .then(response => {
          console.log("Search query response status:", response.status);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then(results => {
          console.log('Parsed JSON:', results);
          search_results = results.response || {};
          console.log('Search results updated:', search_results);
          notifySidePanel(); // Notify side panel after updating search_results
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          search_results = {};
          if (error.message.includes("403")) {
            console.error("403 Forbidden: Check auth token or server CORS configuration.");
          }
        });

      chrome.storage.sync.set({ 'searchQuery': r }, function () {
        console.log("Search query set to: " + r);
      });
    });
  },

  userPrintEvents: function () {
    window.addEventListener("afterprint", function () {
      saveCaptureData.printed_document += 1;
      console.log("Print event count: " + saveCaptureData.printed_document);
    });
  },

  pageSaveEvent: function () {
    document.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        saveCaptureData.page_saved += 1;
        console.log("Page save count: " + saveCaptureData.page_saved);
      }
    });
  },

  pageSelectionEvent: function () {
    document.addEventListener("selectionchange", () => {
      let selection = window.getSelection().toString();
      if (selection.length > 0) {
        saveCaptureData.total_text_selections += 1;
        console.log("Text selection count: " + saveCaptureData.total_text_selections);
      }
    });
  },

  setCloseEvent: function () {
    //Window close listener
    window.addEventListener("beforeunload", function (e) {
      // prevent default behavior
      e.preventDefault();
      // Chrome requires returnValue to be set

      var dt = Date.now();
      var d = new Date();
      saveCaptureData.closeTimeStamp = Math.floor(d.getTime() / 1000);
      
      saveCaptureData.user_rating = 1;
      saveCaptureData.save();
      e.returnValue = "";
    });
  },

  monitorKeyPress: function () {
    $(document).on("keypress", function () {
      saveCaptureData.total_key_stroke += 1;
      console.log("Key stroke count: " + saveCaptureData.total_key_stroke);
    });
  },

  monitorClicks: function () {
    $(document).on("click", function () {
      saveCaptureData.total_user_clicks += 1;
      console.log("Click count: " + saveCaptureData.total_user_clicks);
    });
  },

  monitorScroll: function () {
    $(document).on("scroll", function () {
      saveCaptureData.total_user_scroll += 1;
      console.log("Scroll count: " + saveCaptureData.total_user_scroll);
    });
  },

  CopyPaste: function () {
    $(document).on("copy", function () {
      saveCaptureData.total_copy += 1;
      console.log("Copy count: " + saveCaptureData.total_copy);
    });
  },

  monitorTabVisibility: function () {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        saveCaptureData.stopTimeCount();
      } else if (document.visibilityState === "visible") {
        saveCaptureData.startTimeCount();
      }
    });
  },

  stopTimeCount: function () {
    if (this.timeIntervalID) {
      clearInterval(this.timeIntervalID);
      this.timeIntervalID = null;
      console.log("Timer stopped.");
    }
  },

  startTimeCount: function () {
    let startTime = Date.now();
    this.timeIntervalID = setInterval(() => {
      if (document.hasFocus()) {
        this.active_time_counter = Math.floor((Date.now() - startTime) / 1000);
      }
      this.total_active_time = this.active_time_counter;
      console.log("Active time: " + this.active_time_counter);
    }, 1000);
  },

  getIP: async function (retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        if (!navigator.onLine) {
          console.error("No network connection for IP fetch.");
          return false;
        }
        const response = await fetch("https://api.ipify.org?format=json", {
          signal: AbortSignal.timeout(5000)
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        this.userIP = data.ip;
        console.log("IP address: " + data.ip);
        return data.ip;
      } catch (error) {
        console.error(`IP fetch attempt ${i + 1} failed:`, error);
        if (i < retries - 1) await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    console.error("All IP fetch attempts failed.");
    return false;
  },

  getUserID: function () {
    chrome.storage.local.get(["authToken"], (result) => {
      if (!result.authToken) {
        console.error("No auth token found in storage.");
        return;
      }
      this.token = result.authToken;
      fetch("https://feedback.sekimbi.com/api/auth/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${result.authToken}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (data && data.id) {
            chrome.storage.local.set({ implicit_feedback_ID: data.id }, () => {
              this.userID = data.id;
              console.log("User ID set to: " + data.id);
            });
          } else {
            console.error("Failed to fetch user ID.");
          }
        })
        .catch(error => {
          console.error("Error fetching user ID:", error);
          if (error.message.includes("403")) {
            console.error("403 Forbidden: Invalid or expired auth token.");
            chrome.storage.local.remove('authToken', () => {
              console.log("User session invalidated.");
            });
          }
        });
    });
  },

  getPageTitle: function () {
    this.pageTitle = document.title || "";
    console.log("Page title: " + this.pageTitle);
  },

  getContent: function () {
    this.content = document.body.innerText.trim().substring(0, 1000);
    console.log("Content captured (first 1000 chars).");
  },

  getLeadingParagraph: async function () {
    let paragraphs = document.querySelectorAll('body p');
    let meaningfulParagraph = await findMeaningfulParagraph(paragraphs);
    if (meaningfulParagraph) {
      this.leadingParagraph = meaningfulParagraph;
      console.log("Leading paragraph captured.");
    } else {
      console.log("No meaningful paragraph found.");
    }
  },

  getData: function () {
    return {
      total_user_clicks: this.total_user_clicks,
      total_mouse_movement_x: this.total_mouse_movement_x,
      total_mouse_movement_y: this.total_mouse_movement_y,
      total_user_scroll: this.total_user_scroll,
      user_rating: this.user_rating,
      total_key_stroke: this.total_key_stroke,
      total_active_time: this.active_time_counter,
      total_mouse_distance: this.total_mouse_distance,
      total_mouse_speed: this.total_mouse_speed,
      url: document.location.href,
      userIP: this.userIP,
      total_copy: this.total_copy,
      openTimeStamp: this.openTimeStamp,
      closeTimeStamp: this.closeTimeStamp,
      velocity_time_count: this.velocity_time_count,
      average_mouse_speed: this.average_mouse_speed,
      total_text_selections: this.total_text_selections,
      bookmarked: this.bookmarked,
      printed_document: this.printed_document,
      page_saved: this.page_saved,
      search_query: this.search_query,
      user_ID: this.userID,
      pageTitle: this.pageTitle,
      leadingParagraph: this.leadingParagraph,
      cohort: this.cohort,
      content: this.content,
      token: this.token
    };
  },

  save: async function (retries = 3, delay = 1000) {
    const data = this.getData();
    console.log("Preparing to save data:", data);

    // Send to background script for actual network request
    chrome.runtime.sendMessage({ type: 'save_data', payload: data }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending to background:", chrome.runtime.lastError);
        // Fallback: Store unsent data locally to retry later (e.g., on extension load)
        chrome.storage.local.set({ unsentData: data }, () => {
          console.log("Unsent data stored locally for later retry.");
        });
      } else {
        console.log("Data sent to background for saving:", response);
      }
    });
  }

};



// Check for excluded domains
const excludedDomains = /(facebook|twitter|localhost|chat\.openai|msgoba|35\.221\.213\.87|namecheap|^https?:\/\/(www\.)?google\.com)/i;

// Call monitorUrlChanges when initializing
if (!excludedDomains.test(window.location.href)) {
  saveCaptureData.init();
  monitorUrlChanges(); // Start monitoring URL changes
} else {
  saveCaptureData.getSearchQuery();
  monitorUrlChanges(); // Monitor even on excluded domains for search queries
}

async function findMeaningfulParagraph(paragraphs) {
  for (var i = 0; i < paragraphs.length; i++) {
    var trimmedText = paragraphs[i].textContent.trim();
    if (trimmedText.length >= 200) {
      return trimmedText;
    }
  }
  return null;
}