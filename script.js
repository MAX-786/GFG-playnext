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
  videoPlayer = document.querySelector('video.vjs-tech');
  videoPlayer.playbackRate = 2;

  intervalId = setInterval(() => {
    if (videoPlayer.ended) {
      getNextVideo();
    }
  }, 1000); // Check for video end every 1000ms (adjust as needed)
}

function stopVideo() {
  clearInterval(intervalId);
}

function getNextVideo() {

  const b = document.querySelectorAll('.sidebar_item__khyNp');
  let found = 0;
  let curr = null;

  for (const i of b) {
    if (found === 1) {
      curr = i;
      found = 0;
      break;
    }

    if (i.classList.contains('active')) {
      found = 1;
    }
  }

  if (curr) {
    curr.click();
  } else {
    console.log('No more videos found');
  }
}