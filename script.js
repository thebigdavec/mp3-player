const btnPlay = document.querySelector('.play')
const btnPlayIcon = btnPlay.querySelector('i')
const btnNext = document.querySelector('.next')
const btnPrev = document.querySelector('.prev')
const player = document.getElementById('player')
const song = document.querySelector('.song')
const progress = document.querySelector('.progress')
const title = document.querySelector('.title')

const songs = [
  { filename: 'california-blue', title: 'California Blue' },
  { filename: 'its-over', title: "It's Over" },
  { filename: 'oh-pretty-woman', title: 'Oh, Pretty Woman' },
  { filename: 'penny-arcade', title: 'Penny Arcade' }
]
let songIndex = 0
changeTrack()

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
          changeTrack(true)
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
  }
})

btnNext.addEventListener('click', () => {
  songIndex++
  if (songIndex === songs.length) {
    songIndex = 0
  }
  changeTrack()
})

btnPrev.addEventListener('click', () => {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  changeTrack()
})

progress.addEventListener('click', e => {
  const offset = e.offsetX
  const width = progress.clientWidth
  const position = (offset / width) * song.duration
  song.currentTime = position
})

function stopSong() {
  player.classList.remove('playing')
  btnPlayIcon.classList.remove('fa-pause')
  btnPlayIcon.classList.add('fa-play')
  progress.value = 0
  song.load()
}
function changeTrack(next = false) {
  if (next) {
    songIndex++
    if (songIndex === songs.length) {
      songIndex = 0
    }
  }
  title.innerText = songs[songIndex].title
  song.src = `music/${songs[songIndex].filename}.mp3`
  song.load()

  btnPlayIcon.classList.remove('fa-pause')
  btnPlayIcon.classList.add('fa-play')

  if (player.classList.contains('playing')) {
    song.play()
  } else {
    stopSong()
  }
}
