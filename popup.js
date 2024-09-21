document.getElementById('startButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: 'start' }); // Send message to content script
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: 'stop' }); // Send message to content script
  });
});