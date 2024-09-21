function findNextVideo() {
  const currentVideo = document.querySelector('.sidebar_item__khyNp.active');
  const nextVideo = currentVideo.nextElementSibling.querySelector('.sidebar_item__khyNp');
  const videoPlayer = document.querySelector('video.vjs-tech');

  videoPlayer.play();
  videoPlayer.playbackRate = 2;

  videoPlayer.addEventListener('ended', () => {
    browser.runtime.sendMessage({ action: 'videoEnded' });
  });

  return nextVideo.href;
}