const btnPlay = document.querySelector('.play')
const btnPlayIcon = btnPlay.querySelector('i')
const btnNext = document.querySelector('.next')
const player = document.getElementById('player')
const song = document.querySelector('.song')
const progress = document.querySelector('.progress')

btnPlay.addEventListener('click', () => {
  player.classList.toggle('playing')
  if (player.classList.contains('playing')) {
    btnPlayIcon.classList.remove('fa-pause')
    btnPlayIcon.classList.add('fa-play')
    song.addEventListener('timeupdate', () => {
      const duration = song.duration
      const currentTime = song.currentTime
      const position = (currentTime / duration) * 100

      if (position <= 100) progress.value = position
      if (position > 95) {
        progress.classList.add('finishing')
        if (position >= 100) {
          stopSong()
        }
      } else {
        progress.classList.remove('finishing')
      }
    })
    song.play()
  } else {
    btnPlayIcon.classList.remove('fa-play')
    btnPlayIcon.classList.add('fa-pause')
    song.pause()
    song.removeEventListener('timeupdate', () => {
      console.log('Song paused')
    })
  }
})

btnNext.addEventListener('click', () => {
  song.currentTime = (song.duration / 10) * 9.4
})

function stopSong() {
  player.classList.remove('playing')
  btnPlayIcon.classList.remove('fa-pause')
  btnPlayIcon.classList.add('fa-play')
  progress.value = 0
  song.load()
}
