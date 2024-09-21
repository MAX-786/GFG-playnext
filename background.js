chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
      startVideo();
    } else if (request.action === 'stop') {
      stopVideo();
    }
  });
  
  let videoPlayer;
  let intervalId;
  
  function startVideo() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['script.js']  
  
      }, () => {
        // Listen for the 'videoEnded' message from the content script
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: findNextVideo
      }, (results) => {
        const nextVideoUrl = results[0].result;
        if (nextVideoUrl) {
          chrome.tabs.update({ url: nextVideoUrl });
        }
      });
    });
  }