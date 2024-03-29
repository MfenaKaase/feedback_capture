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
                existingDoc.interestWeight += (0.281 * doc.total_copy + 0.002 * doc.total_active_time + 2.9778);
                existingDoc.aggregatedWeight += (existingDoc.interestWeight + doc.score);
                existingDoc.count++; // Increment the count for averaging later
            } else {
                // If URL doesn't exist in the map, add it along with the object
                doc.interestWeight = 0.281 * doc.total_copy + 0.002 * doc.total_active_time + 2.9778;
                doc.aggregatedWeight = doc.interestWeight + doc.score;
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
            htmlString += `<div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${doc.page_title}</h5>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                <i class='bx bx-star'></i>
                ${doc.aggregatedWeight.toFixed(2)}
                </span>
                </div>
                <a href="${doc.url}" target="_blank">${doc.url}</a>
                <small class="">${doc.leading_paragraph ? doc.leading_paragraph[0].substring(0, 100) + "..." : "Couldn't find any paragraphs with up to 100 characters"}</small>
            </div>`;
        });
        htmlString += `</div>`;
    }
    el.innerHTML = htmlString;
}


document.addEventListener('DOMContentLoaded', function () {

    let tabs = document.querySelectorAll('.nav-link');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            let target = tab.getAttribute('data-bs-target');

            // Remove active class from all tabs
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });

            // Add active class to the clicked tab
            tab.classList.add('active');

            // Hide all tab content
            let tabContents = document.querySelectorAll('.tab-pane');
            tabContents.forEach(function(content) {
                content.classList.remove('show', 'active');
            });

            // Show the corresponding tab content
            document.querySelector(target).classList.add('show', 'active');
        });
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "msg_from_popup" }, function (response) {
            const container = document.getElementById('feedbackResultsContainer');
            console.log(response)
            if (response) displaySearchResults(container, response.docs);
            else container.innerHTML = "<p class='text-danger'>An error has occured! Check your internet connection!</p>"

        });
    });

    let cohortBar = document.getElementById('cohort-bar');
    let cohortInput = document.getElementById('cohort-input');
    let saveButton = document.getElementById('save-cohort');
    let message = document.getElementById('message');
    let copyMessage = document.getElementById('copy-message');

    chrome.storage.local.get(['cohorts'], function(result) {
        let cohorts = result.cohorts;
        if (Array.isArray(cohorts)) {
            // Populate the unordered list with existing cohorts
            populateCohortsList(cohorts);
        } else {
            chrome.storage.local.remove('cohorts',function() {
               console.log("Cohorts cleared successfully!")
            })
        }
    });
    
    function populateCohortsList(cohorts) {
        let cohortsList = document.getElementById('cohorts');
        cohortsList.innerHTML = ''; 
        cohorts.forEach(cohort => {
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item')
            listItem.innerHTML = `${cohort} <i class='bx bx-copy' style="cursor:pointer"></i>`;
            cohortsList.appendChild(listItem);
        });

        let copyBtns = document.querySelectorAll('.bx-copy');
        copyBtns.forEach(copyBtn => {
            copyBtn.addEventListener('click', evt => {
                let text = evt.target.parentNode.textContent;
                navigator.clipboard.writeText(text);
                copyMessage.innerText = `copied successfully! ${text}`
            })
        })
    }
    
    saveButton.addEventListener('click', function () {
        message.textContent = "saving...";
        let spinner = document.createElement('div');
        spinner.classList.add('spinner-border', 'text-light');
        spinner.setAttribute('role', 'status');
        
        // Append spinner to the saveButton
        saveButton.appendChild(spinner);
    
        // Disable the saveButton
        saveButton.setAttribute('disabled', true);
    
        // Get the value of the cohortInput and trim any whitespace
        let newCohort = cohortInput.value.trim().split(' ').join('_');
        if (newCohort !== '') {
            // Save the newCohort value to local storage
            chrome.storage.local.get(['cohorts'], function(result) {
                let cohorts = result.cohorts || [];
                if (!cohorts.includes(newCohort)) {
                    cohorts.push(newCohort);
                    chrome.storage.local.set({ cohorts: cohorts }, function() {
                        spinner.remove();
                        console.log('Cohort saved successfully.');
                        // After saving is complete, remove the spinner and enable the saveButton
                        saveButton.removeAttribute('disabled');
                        // Populate the unordered list with updated cohorts
                        populateCohortsList(cohorts);
                    });

            
                } else {
                    spinner.remove();
                    console.log('Cohort already exists.');
                    // After saving is complete, remove the spinner and enable the saveButton
                    saveButton.removeAttribute('disabled');
                }
                chrome.storage.local.set({ cohort: newCohort });
            });
            message.textContent = "cohort saved!"
        } else {
            spinner.remove();
            // After saving is complete, remove the spinner and enable the saveButton
            saveButton.removeAttribute('disabled');
            message.textContent = "something went wrong!"
        }
    });
    
    
    
})





