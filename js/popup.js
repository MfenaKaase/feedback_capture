document.getElementById('consentForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const consentCheckbox = document.getElementById('consentCheckbox');
  const consentGiven = consentCheckbox.checked;

  console.log('I was clicked!')
  if (consentGiven) {
    // Store consent in localStorage
    chrome.storage.local.set({ consentGiven: true });
    alert('Consent saved!');
    
  }
});
