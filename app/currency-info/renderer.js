// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const toast = require('../scripts/toast')
const { currencyNames } = require('./currencyList')

// DOM elements
const search = document.querySelector('input')
const analyzeButton = document.querySelector('button')
const currencyListEl = document.querySelector('tbody')
const currencyNameTitle = document.querySelector('caption')

const getCurrencyInfo = async () => {
  if(!search.value) { return toast('this field is required') }

  currencyNameTitle.innerHTML = ''
  currencyListEl.innerHTML = ''
  
  try {
    const { data } = await axios.get("https://fulusly.soft9.us/api/rates", {
      params: {
        base: search.value,
        symbols: "cop,usd,eur,jpy,brl,mxn"
      }
    })

    currencyNameTitle.textContent = currencyNames[data.base]

    for (const [key, value] of Object.entries(data.rates)) {
      // console.log(`${key}: ${value}`)
      const currencyListRow = document.createElement('tr')

      const currencyListCode = document.createElement('td')
      currencyListCode.textContent = key
      const currencyListName = document.createElement('td')
      currencyListName.textContent = currencyNames[key]
      const currencyListValue = document.createElement('td')
      currencyListValue.textContent = `$ ${value}`

      currencyListRow.append(currencyListCode, currencyListName, currencyListValue)
      currencyListEl.append(currencyListRow)
    }
  } catch (err) { toast(err.message) }
}

analyzeButton.addEventListener('click', () => {
  getCurrencyInfo()
  search.value = ''
})

ipcRenderer.on('clear-stack', () => {
  currencyListEl.innerHTML = ''
  currencyNameTitle.innerHTML = ''
})
