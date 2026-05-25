// Saves options to chrome.storage.sync
function saveOptions() {
  const filterString = document.getElementById('filterString').value;

  chrome.storage.sync.set({ userFilter: filterString }, function() {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Filter saved successfully!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
}

// Restores select state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({ userFilter: '' }, function(items) {
    document.getElementById('filterString').value = items.userFilter;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
