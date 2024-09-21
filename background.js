browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    startVideo();
  } else if (request.action === 'stop') {
    stopVideo();
  }
});

let videoPlayer;
let intervalId;

function startVideo() {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['script.js']
    }, () => {
      // Listen for the 'videoEnded' message from the content script
      browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'videoEnded') {
          getNextVideo();
        }
      });
    });
  });
}

function stopVideo() {
  clearInterval(intervalId);
}

function getNextVideo() {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: findNextVideo
    }, (results) => {
      const nextVideoUrl = results[0].result;
      if (nextVideoUrl) {
        browser.tabs.update({ url: nextVideoUrl });
      }
    });
  });
}