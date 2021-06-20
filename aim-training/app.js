const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#33cff4', '#04e7b1', '#696cea', '#aa6edc', '#fd3fd7', '#feb97e', '#f9cc3e']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

timeList.addEventListener('change', event => {
  if (event.target.classList.contains('input')) {
    time = event.target.value
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else{
    let current = --time
    setTime(current)
  }
}

function setTime(value) {
  let int = Math.floor(value/60)
  let rest = value%60
  if (intCheck(int) && restCheck(rest)) {
    timeEl.innerHTML = `0${int}:0${rest}`
  }
  if (intCheck(int) && !restCheck(rest)) {
    timeEl.innerHTML = `0${int}:${rest}`
  }
  if (restCheck(rest) && !intCheck(int)) {
    timeEl.innerHTML = `${int}:0${rest}`
  }
}

function intCheck(int) {
  if (int < 10) {
    int = `0${int}`
    return true
  }
}

function restCheck(rest) {
  if (rest < 10) {
    rest = `0${rest}`
    return true
  }
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span>${score}</span></h1>`
}

function createRandomCircle() {
  let color = getRandomColor()
  const circle = document.createElement('div')

  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.backgroundColor = color
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
