const player = document.querySelector('.player')
const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullsreenBtn = document.querySelector('.fullscreen')
const speed = document.querySelector('.player-speed')

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'play')
}

function togglePlay() {
  if (video.paused) {
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')
  } else {
    video.pause()
    showPlayIcon()
  }
}

// On Video end, show play button icon

video.addEventListener('ended', showPlayIcon)

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  seconds = seconds > 9 ? seconds : `0${seconds}`
  return `${minutes}:${seconds}`
}
// Update progress bar as the video plays

// click to seek in the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth
  progressBar.style.width = `${newTime * 100}`
  video.currentTime = newTime * video.duration
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
  currentTime.textContent = `${displayTime(video.currentTime)} /`
  duration.textContent = `${displayTime(video.duration)}`
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Vloume bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth
  // Rounding volume up and down
  if (volume < 0.1) {
    volume = 0
  }
  if (volume > 0.9) {
    volume = 1
  }
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume

  // Change icon depending on volume
  volumeIcon.className = ''
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up')
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down')
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off')
  }
  lastVolume = volume;
}

// Mute / unmute

function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute')
  } else {
    video.volume = lastVolume;
      volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'mute')
    volumeBar.style.width = `${lastVolume * 100}%`
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen')
}

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

let fullscreen = false

// Event Listeners

playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullsreenBtn.addEventListener("click", toggleFullscreen)