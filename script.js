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
  const currentVideo = document.querySelector('.sidebar_item__khyNp.active');
  const nextVideo = currentVideo.nextElementSibling.querySelector('.sidebar_item__khyNp');
  videoPlayer = document.querySelector('video.vjs-tech');

  videoPlayer.play();
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
  const currentVideo = document.querySelector('.sidebar_item__khyNp.active');
  const nextVideo = currentVideo.nextElementSibling.querySelector('.sidebar_item__khyNp');

  if (nextVideo) {
    browser.tabs.update({ url: nextVideo.href });
  } else {
    // Handle the case where there's no next video (e.g., show a message)
    console.log('No more videos found');
  }
}