// electon method
const { ipcRenderer } = require('electron')

// modules
const axios = require('axios')

// toast
const toast = require('../scripts/toast')

// DOM elements
const questionEl = document.querySelector('input')
const lang = document.querySelector('select')
const btn = document.querySelector('button')
const magicBallSay = document.querySelector('legend')
const magicBallAnwser = document.querySelector('p')

// magic ball methods
const magicBall = async () => {
  const localeKeyword = {
    en: "magic ball say:",
    es: "la bola magic te dice:"
  };
  
  try {
    const { data } = await axios.get('https://eightballapi.com/api/biased', {
      params: { 
        question: questionEl.value, 
        locale: lang.value, 
      }})

    magicBallSay.textContent = localeKeyword[lang.value]
    magicBallAnwser.textContent = data.reading
  } catch (err) {
    toast(err.message)
  }

  questionEl.value = ''
  lang.value = ''
}

// events
questionEl.addEventListener('input', () => {
  btn.disabled = questionEl.value.length <= 10
})

btn.addEventListener('click', () => {
  magicBall()
})

// clear stack
ipcRenderer.on('clear-stack', () => {
  magicBallSay.textContent = 'sin respuesta'
  magicBallAnwser.textContent = ''
})

