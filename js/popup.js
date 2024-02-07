const displaySearchResults = (el, docs) => {
    htmlString = `<div class="list-group">`;
    docs.forEach(doc => {
        htmlString += `<a href="${doc.url}" class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${doc.page_title}</h5>
          <small>3 days ago</small>
        </div>
        <p class="mb-1">${doc.leading_paragraph}</small>
      </a>`
    });
    htmlString += `</div>`;
    el.innerHTML = htmlString;
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"msg_from_popup"}, function(response){
            const container = document.getElementById('feedbackResultsContainer');
            console.log(container)
            displaySearchResults(container, response.docs);

        });
    });
})





