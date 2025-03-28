// module
const { ipcRenderer } = require('electron')

const scraping = require('./scrapingOpt')

// scripts
const toast = require('../scripts/toast')
const { webRegexp } = require('../scripts/regex')

// DOM elements
const linkScraping = document.getElementById('link-scraping')
const selectorScraping = document.getElementById('selector-scraping')
const resultScraping = document.getElementById('results-scraping')
const analyzeButton = document.getElementById('analyze-button')

/* web  */
const createScraping = async () => {
  if(!selectorScraping.value) {
    toast('the scraping opt is required')
  }
 
  try {
    const res = await fetch(linkScraping.value)
    const data = await res.text()

    resultScraping.classList.replace('shell-msg', 'shell-results')

    scraping(data, resultScraping, selectorScraping.value)
    toast(res.status)
  } catch (err) { toast(err.message) }
  
  linkScraping.value = ''
  selectorScraping.value = ''
}

analyzeButton.addEventListener('click', e => {
  !webRegexp.test(linkScraping.value)
  	? toast('https:// or https:// is required') 
  	:createScraping()
  
  e.preventDefault()
})

ipcRenderer.on('clear-stack', () => {
  resultScraping.classList.replace('shell-results', 'shell-msg')
  resultScraping.textContent = 'wait scraping results'
})
