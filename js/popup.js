const displaySearchResults = (el, docs) => {

    let htmlString = '<p class="text-danger">No Results Found in Your Group!</p>';
    if (docs) {
        if (docs.length > 0) {
            docs.forEach(doc => {
                doc.interestWeight = 0.281 * doc.total_copy + 0.002 * doc.total_active_time + 2.9778;
                doc.aggregatedWeight = doc.interestWeight + doc.score;
            });
        
            docs.sort((a, b) => b.aggregatedWeight - a.aggregatedWeight);
            htmlString = `<div class="list-group">`;
            docs.forEach(doc => {
                htmlString += `<a href=${doc.url} target="_blank" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${doc.page_title}</h5>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${doc.aggregatedWeight.toFixed(2)}
                </span>
                </div>
                <p class="text-danger">${doc.leading_paragraph ? doc.leading_paragraph[0].substring(0, 100) + "..." : "Couldn't find any paragraph's with up to 200 characters" }</small>
            </a>`
        });
            htmlString += `</div>`;
            
        } 
    }
    el.innerHTML = htmlString;
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"msg_from_popup"}, function(response){
            const container = document.getElementById('feedbackResultsContainer');
            console.log(response)
            if (response) displaySearchResults(container, response.docs);
            else container.innerHTML = "<p class='text-danger'>An error has occured! Check your internet connection!</p>"

        });
    });
})





