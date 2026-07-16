// modules
const { ipcRenderer } = require('electron')
const toast = require('../scripts/toast')
const axios = require('axios')

// modules
/** @type {HTMLInputElement} */
const freq = document.querySelector('#freq')
/** @type {HTMLTableSectionElement}  */
const stationsList = document.querySelector('tbody')
/** @type {HTMLButtonElement}  */
const btn = document.querySelector('button')

// methods
const getStations = async () => {
  try {
    const { data } = await axios.get('https://shortwave.live/khz', {
      params: { q: freq.valueAsNumber }
    })

    const parser = new DOMParser()
    const page = parser.parseFromString(data, 'text/html')
    page.querySelectorAll('tbody tr').forEach((el) => {
      const row = document.createElement('tr')
      
      const name = document.createElement('th')
      const lang = document.createElement('td')
      const days = document.createElement('td')
      const startUTC = document.createElement('td')
      const endUTC = document.createElement('td')

      name.textContent = el.querySelector('#station').textContent
      lang.textContent = el.querySelector('#language').textContent
      days.textContent = el.querySelector('#days').textContent
      startUTC.textContent = el.querySelector('#start').textContent
      endUTC.textContent = el.querySelector('#end').textContent

      row.append(name, lang, days, startUTC, endUTC)
      stationsList.append(row)
    })
  } catch (err) { toast(err.message) }

  freq.value = ''
  btn.disabled = true
}

// events
freq.addEventListener('input', () => {
  btn.disabled = !(freq.valueAsNumber >= freq.min && freq.valueAsNumber <= freq.max)
})

btn.addEventListener('click', () => {
  stationsList.innerHTML = ''
  getStations()
})

ipcRenderer.on('clear-stack', () => {
  stationsList.innerHTML = ''
})
