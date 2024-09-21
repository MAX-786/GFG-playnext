document.getElementById('startButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'start' });
  });
  
  document.getElementById('stopButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' });
  });