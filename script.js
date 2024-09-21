function findNextVideo() {
    const currentVideo = document.querySelector('.sidebar_item__khyNp.active');
    const nextVideo = currentVideo.nextElementSibling.querySelector('.sidebar_item__khyNp');
    const videoPlayer = document.querySelector('video.vjs-tech');
  
    videoPlayer.play();
    videoPlayer.playbackRate = 2;
  
    videoPlayer.addEventListener('ended', () => {
        // Send a message to the background script indicating that the video has ended
        chrome.runtime.sendMessage({ action: 'videoEnded' });
      });
  
    return nextVideo.href;
  }