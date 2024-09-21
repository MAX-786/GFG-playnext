document.getElementById('startButton').addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'start' });
});

document.getElementById('stopButton').addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'stop' });
});