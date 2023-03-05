// module
const { ipcRenderer } = require('electron')

const scraping = require('./scrapingOpt')

// toast
const toast = require('../scripts/toast')

// DOM elements
const form = document.getElementById('scraping')
const linkScraping = document.getElementById('link-scraping')
const selectorScraping = document.getElementById('selector-scraping')
const resultScraping = document.getElementById('results-scraping')
const analyzeButton = document.getElementById('analyze-button')

/* web  */
const createScraping = async () => {
 const opt = selectorScraping.value
 
 try {
    const res = await fetch(linkScraping.value)
    const data = await res.text()

    resultScraping.classList.replace('shell-msg', 'shell-results')

    scraping(data, resultScraping, opt)
    toast(res.status)
  } catch (err) {
    toast(err.message)
  }
}

linkScraping.addEventListener('keyup', () => {
  analyzeButton.disabled = !linkScraping.validity.valid
})

form.addEventListener('submit', e => {
  createScraping()
  
  analyzeButton.disabled = true
  e.preventDefault()
  form.reset()
})

ipcRenderer.on('clear-stack', () => {
  resultScraping.classList.replace('shell-results', 'shell-msg')
  resultScraping.textContent = 'wait scraping results'
})
