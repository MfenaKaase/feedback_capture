document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({ popupOpened: true });
});

const displaySearchResults = (el, docs) => {
    let htmlString = '<p class="text-danger">No Results Found in Your Group!</p>';
    if (docs && docs.length > 0) {
        const urlMap = new Map(); // Create a map to store unique URLs and their associated objects

        // Iterate over each object in the `docs` array
        docs.forEach(doc => {
            // If the URL already exists in the map
            if (urlMap.has(doc.url)) {
                // Update the interestWeight and aggregatedWeight properties of existing object
                const existingDoc = urlMap.get(doc.url);
                if (doc.page_saved || doc.printed_document || doc.bookmarked) existingDoc.interestWeight += 1;
                existingDoc.interestWeight += (0.281 * doc.total_copy + 0.002 * doc.total_active_time + 2.9778);
                existingDoc.aggregatedWeight += (existingDoc.interestWeight + doc.score);
                existingDoc.relevance_count += !isNaN(doc.relevance) ? doc.relevance : 0;
                existingDoc.count++; // Increment the count for averaging later
            } else {
                // If URL doesn't exist in the map, add it along with the object
                doc.interestWeight = 0.281 * doc.total_copy + 0.002 * doc.total_active_time + 2.9778;
                doc.aggregatedWeight = doc.interestWeight + doc.score;
                doc.relevance_count = !isNaN(doc.relevance) ? doc.relevance : 0;
                doc.count = 1; // Initialize count for averaging
                urlMap.set(doc.url, doc);
            }
        });

        // Convert map values back to an array
        const uniqueDocs = Array.from(urlMap.values());

        console.log(uniqueDocs);

        // Calculate average for objects with duplicate URLs
        uniqueDocs.forEach(doc => {
            doc.interestWeight /= doc.count * 10;
            doc.aggregatedWeight /= doc.count * 10;
        });

        // Sort the uniqueDocs array based on aggregatedWeight in descending order
        uniqueDocs.sort((a, b) => b.aggregatedWeight - a.aggregatedWeight);

        htmlString = `<div class="list-group">`;
        uniqueDocs.forEach(doc => {
            console.log(doc.relevance_count);
            htmlString += `<div class="list-group-item list-group-item-action flex-column align-items-start" data-bs-toggle="tooltip" data-bs-html="true" title="${typeof doc.leading_paragraph === "string"
                ? doc.leading_paragraph.substring(0, 100) + "..."
                : "Couldn't find any paragraphs with up to 100 characters"}">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${doc.page_title}</h5>
                <span class="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
                <i class='bx bx-star'></i>
                ${doc.aggregatedWeight.toFixed(2)}
                </span>
                </div>
                <a href="${doc.url}" target="_blank">${doc.url}</a>
                <small class="">${typeof doc.leading_paragraph === "string"
                    ? doc.leading_paragraph.substring(0, 100) + "..."
                    : "Couldn't find any paragraphs with up to 100 characters"}</small>
                <div class="d-flex justify-content-between mt-2">
                    <span class="badge bg-primary">${doc.relevance_count} ${doc.relevance_count > 1 || doc.relevance_count == 0 ? 'people' : 'person'} found this relevant</span>
                </div>i
            </div>`;
        });
        htmlString += `</div>`;
    }
    el.innerHTML = htmlString;
}

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('signup-form');
    console.log("search form", searchForm);
    let tabs = document.querySelectorAll('.nav-link');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            let target = tab.getAttribute('data-bs-target');
            tabs.forEach(function (t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            let tabContents = document.querySelectorAll('.tab-pane');
            tabContents.forEach(function (content) {
                content.classList.remove('show', 'active');
            });
            document.querySelector(target).classList.add('show', 'active');
        });
    });


    const searchInput = document.getElementById('search-input');
    let debounceTimeout;

    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            const query = searchInput.value.trim();
            const container = document.getElementById('searchResultsContainer');
            if (!query) {
                container.innerHTML = '<p class="text-danger">Please enter a search query</p>';
                return;
            }
            // Show spinner in container
            container.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 60px;">
                Loading ...
                <div class="spinner-border text-primary" role="status" aria-hidden="true"></div>
            </div>
        `;
            // searchButton.disabled = true;
            try {
                // const myHeaders = new Headers();
                // myHeaders.append('Authorization', `Bearer ${authToken}`);
                const response = await fetch(`https://feedback.sekimbi.com/api/implicit-feedback?query=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    // headers: myHeaders,
                    redirect: 'follow'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const results = await response.json();
                console.log('Search results:', results);
                
                displaySearchResults(container, results.response?.docs || []);
            } catch (error) {
                console.error('Error fetching search results:', error);
                document.getElementById('searchResultsContainer').innerHTML = '<p class="text-danger">Error fetching results. Please try again.</p>';
            } finally {
                // searchButton.classList.remove('loading');
                // searchButton.disabled = false;
            }
        }, 400); // 400ms debounce
    });
    // Handle search form submission
    // if (searchForm) {
    //     searchForm.addEventListener('submit', async (evt) => {
    //         evt.preventDefault();
    //         const searchInput = document.getElementById('search-input');
    //         const query = searchInput.value.trim();
    //         if (!query) {
    //             document.getElementById('searchResultsContainer').innerHTML = '<p class="text-danger">Please enter a search query</p>';
    //             return;
    //         }

    //         chrome.storage.local.get(['authToken'], async (result) => {
    //             searchButton.classList.add('loading');
    //             searchButton.disabled = true;

    //             try {
    //                 // const myHeaders = new Headers();
    //                 // myHeaders.append('Authorization', `Bearer ${authToken}`);
    //                 const response = await fetch(`https://localhost/api/implicit-feedback?query=${encodeURIComponent(query)}`, {
    //                     method: 'GET',
    //                     // headers: myHeaders,
    //                     redirect: 'follow'
    //                 });

    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! Status: ${response.status}`);
    //                 }

    //                 const results = await response.json();
    //                 console.log('Search results:', results);
    //                 const container = document.getElementById('searchResultsContainer');
    //                 displaySearchResults(container, results.response?.docs || []);    //             } catch (error) {
    //                 console.error('Error fetching search results:', error);
    //                 document.getElementById('searchResultsContainer').innerHTML = '<p class="text-danger">Error fetching results. Please try again.</p>';
    //             } finally {
    //                 searchButton.classList.remove('loading');
    //                 searchButton.disabled = false;
    //             }
    //         });
    //     });
    // }

    // Listen for side panel updates
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === 'update_sidepanel') {
            console.log("Received new search results for side panel:", request.data);
            const container = document.getElementById('feedbackResultsContainer');
            displaySearchResults(container, request.data.docs || []);
            sendResponse({ status: "Side panel updated" });
        }
        return true;
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "msg_from_popup" }, function (response) {
            const container = document.getElementById('feedbackResultsContainer');
            console.log(response);
            if (response) displaySearchResults(container, response.docs);
            else container.innerHTML = "<p class='text-danger'>An error has occurred! Check your internet connection!</p>";
        });
    });

});