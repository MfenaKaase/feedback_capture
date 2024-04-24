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

    fetch(`https://feedback.grayfinancial.site/fetch_cohorts.php`)
      .then(response => response.json())
      .then(cohorts => {
        populateCohortsList(cohorts);
      })
      .catch(error => {
          console.log('error', error)
      });
    
    function populateCohortsList(cohorts) {
        let cohortsList = document.getElementById('cohorts');
        cohortsList.innerHTML = ''; 
        cohorts.forEach(cohort => {
            let listItem = document.createElement('li');
            listItem.setAttribute('id', cohort.id);
            listItem.classList.add('list-group-item');
            listItem.classList.add('d-flex');
            listItem.classList.add('justify-content-between');
            listItem.classList.add('align-items-center');
            listItem.innerHTML = ` <p>${cohort.name}</p>
            <button class='btn btn-dark bx bx-door-open' style="cursor:pointer" id="${cohort.name}">Login</buttob>`;
            cohortsList.appendChild(listItem);
        });

        let LoginBtns = document.querySelectorAll('.bx-door-open');
        LoginBtns.forEach(LoginBtn => {
            LoginBtn.addEventListener('click', evt => {
                let cohort = evt.target.id;
                chrome.storage.local.set({ cohort: cohort });
                copyMessage.innerText = `Login successful! ${cohort}`
            })
        })
    }
    
    saveButton.addEventListener('click', function () {
        
    });
    
    
    
})





