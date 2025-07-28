// modules
const { ipcRenderer } = require('electron')
const {
  resultsQuotes, quotesFunctions, quotesOptions
} = require('./quotesFunctions')

// DOM elements
/** @type {HTMLInputElement} */
const quoteInput = document.querySelector('.input-field-text')
/** @type {HTMLSelectElement} */
const quoteSelector = document.querySelector('#quotes')
const btnSubmit = document.querySelector('.btn-submit')
const startSearch = document.querySelector('#get-quote-info')

// add quotes options
quotesOptions.forEach(opt => {
  const quotesOption = document.createElement('option')
  quotesOption.textContent = opt
  quotesOption.value = opt
  quoteSelector.append(quotesOption)
})

// events
quoteSelector.addEventListener('change', () => {
  const isRequired = quoteSelector.value !== 'anime'
  quoteInput.required = isRequired
  btnSubmit.disabled = quoteSelector.value === ''
})

startSearch.addEventListener('submit', (e) => {
  if(quoteInput.required) {
    quotesFunctions[quoteSelector.value](quoteInput.value)
  } else { 
    quotesFunctions.anime(quoteInput.value)
  }

  e.preventDefault()
  startSearch.reset()
  
  quoteInput.required = true
  btnSubmit.disabled = true
})

ipcRenderer.on('clear-stack', () => {
  resultsQuotes.textContent = ''
})
