const btnPlay = document.querySelector('.play')
const btnPlayIcon = btnPlay.querySelector('i')
const player = document.getElementById('player')
const song = document.querySelector('.song')

btnPlay.addEventListener('click', () => {
  player.classList.toggle('playing')
  if (player.classList.contains('playing')) {
    btnPlayIcon.classList.remove('fa-pause')
    btnPlayIcon.classList.add('fa-play')
    song.play()
  } else {
    btnPlayIcon.classList.remove('fa-play')
    btnPlayIcon.classList.add('fa-pause')
    song.pause()
  }
})
