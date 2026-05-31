// Saves options to chrome.storage.sync
async function saveOptions() {
  const filterString_txt = document.getElementById('filterJSON_TextArea').value.replace(/[\t\n\r]/g,"");
  const DisabledOnRegularView_txt = document.getElementById('DisabledOnRegularView').checked;
  const DisabledOnModView_txt = document.getElementById('DisabledOnModView').checked;
  await chrome.storage.local.set({ 
    filterConfig: JSON.parse(filterString_txt)['filterConfig'], 
    settings: {
      DisabledOnRegularView: DisabledOnRegularView_txt,
      DisabledOnModView: DisabledOnModView_txt
    }
  }, function() {
    // Update status to let user know options were saved. 
    const status = document.getElementById('status');
    status.textContent = 'Filter saved successfully!';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
  const cfg = await chrome.storage.local.get()
  console.log(cfg)
}
document.getElementById('save').addEventListener('click', saveOptions);


document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['filterConfig'], (result) => {
    if (result.filterConfig) {
      //console.log(result['filterConfig'])
      document.getElementById('filterJSON_TextArea').value = JSON.stringify(result, null, '\t');
    } 
  });
  chrome.storage.local.get(['settings'], (result) => {
    if (result.settings) {
      //console.log(result['filterConfig'])
      const s = result['settings']
      document.getElementById('DisabledOnRegularView').checked = s['DisabledOnRegularView']
      document.getElementById('DisabledOnModView').checked = s['DisabledOnModView']
    } 
  });
});