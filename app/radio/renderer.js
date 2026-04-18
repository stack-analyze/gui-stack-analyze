// audio api
const { audio, stopRadio } = require('./audio')
require('./stationItem')

// DOM elements
const country = document.querySelector('input')
const getStations = document.querySelector('#get-stations')
const clearStations = document.querySelector('#clear-stations')
const stationListEl = document.querySelector('ul')

// methods
const stations = async () => {
  stationListEl.innerHTML = ''

  try {
    const data = await (
      await fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${country.value}`)
    ).json()
  
    if (data.length > 0) {
      stationListEl.style.overflowY = 'scroll'
    }
    
    data.forEach(item => {
      const stationItem = document.createElement('station-item')
      stationItem.src = item.url
      stationItem.name = item.name
      stationItem.language = item.language || 'no info'
      stationItem.codec = item.codec

      stationListEl.append(stationItem)
    });
  } catch (err) {
    console.error(err.message);
  }

  country.value = ''
}

getStations.addEventListener('click', () => {
  stations()
})

stopRadio.addEventListener('click', () => {
  audio.pause()
  audio.load()
  audio.src = ''
  stopRadio.classList.remove('enabled')
})

clearStations.addEventListener('click', () => {
  stationListEl.innerHTML = ''
  stationListEl.removeAttribute('style')
})
