browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    startVideo();
  } else if (request.action === 'stop') {
    stopVideo();
  }
});

let videoPlayer;
let intervalId;
let currentItemIndex = 0; // Keep track of the current video index

function startVideo() {
  videoPlayer = document.querySelector('video.vjs-tech');
  videoPlayer.playbackRate = 2;

  videoPlayer.addEventListener('ended', handleVideoEnded);
  getNextVideo();
}

function stopVideo() {
  clearInterval(intervalId);
  videoPlayer.removeEventListener('ended', handleVideoEnded);
}

function getNextVideo() {
  const videos = document.querySelectorAll('.sidebar_item__khyNp');

  if (currentItemIndex >= videos.length) {
    console.log('No more videos found');
    return;
  }

  const currentVideo = videos[currentItemIndex];
  currentVideo.click();
  currentItemIndex++;
}

function handleVideoEnded() {
  getNextVideo();
}
