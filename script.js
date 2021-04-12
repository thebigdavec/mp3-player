const btnPlay = document.querySelector('.play')
const btnPlayIcon = btnPlay.querySelector('.fa-play')
const btnPauseIcon = btnPlay.querySelector('.fa-pause')
const btnNext = document.querySelector('.next')
const btnPrev = document.querySelector('.prev')
const player = document.getElementById('player')
const song = document.querySelector('.song')
const progress = document.querySelector('.progress')
const cover = document.querySelector('.cover img')
const title = document.querySelector('.title')
const currentTimeSpan = document.querySelector('.current-time')
const timeLeftSpan = document.querySelector('.time-left')
const durationSpan = document.querySelector('.duration')

const songs = [
  {
    filename: 'california-blue',
    title: 'California Blue',
    cover: 'california-blue'
  },
  { filename: 'its-over', title: "It's Over", cover: 'its-over' },
  {
    filename: 'oh-pretty-woman',
    title: 'Oh, Pretty Woman',
    cover: 'oh-pretty-woman'
  },
  { filename: 'penny-arcade', title: 'Penny Arcade', cover: 'penny-arcade' }
]
let songIndex = 0
changeTrack()

btnPlay.addEventListener('click', () => {
  player.classList.toggle('playing')
  if (player.classList.contains('playing')) {
    btnPlayIcon.classList.remove('hidden')
    btnPauseIcon.classList.add('hidden')
    song.addEventListener('timeupdate', () => {
      if (song.readyState >= 2) {
        setDisplay()
      }
      const position = (song.currentTime / song.duration) * 100

      song.ended
        ? changeTrack(true)
        : position
        ? (progress.value = position)
        : (progress.value = 0)
    })
    song.play()
  } else {
    btnPauseIcon.classList.remove('hidden')
    btnPlayIcon.classList.add('hidden')
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
  btnPlayIcon.classList.remove('hidden')
  btnPauseIcon.classList.add('hidden')
  progress.value = 0
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

  if (songs[songIndex].cover) {
    cover.src = `images/${songs[songIndex].cover}.jpg`
  } else {
    cover.src = 'images/base-record.png'
  }

  btnPlayIcon.classList.remove('fa-pause')
  btnPlayIcon.classList.add('fa-play')

  if (player.classList.contains('playing')) {
    song.play()
  } else {
    stopSong()
  }
  song.addEventListener('loadeddata', () => {
    if (song.readyState > 2) {
      setDisplay()
    }
  })
}
function setDisplay() {
  const duration = song.duration
  const currentTime = song.currentTime
  const position = (currentTime / duration) * 100

  currentTimeSpan.innerText = getTime(currentTime)
  timeLeftSpan.innerText = getTime(duration - currentTime)
  durationSpan.innerText = getTime(duration)
}
function getTime(seconds) {
  const minutes = parseInt(seconds / 60, 10)
  seconds = parseInt(seconds % 60)
  if (seconds < 10) seconds = '0' + seconds
  const time = minutes + ':' + seconds
  return time
}
