// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const toast = require('../scripts/toast')

// component
require('../components/cryptoItem')

// DOM elements
const coinList = document.getElementById('coin-list')
const searchCoin = document.getElementById('search-coin')

let coins, filterCoins

const renderList = coins => {
  coinList.innerHTML = ''
  
  coins.forEach((coin) => {
    const cryptoInfo = document.createElement('crypto-info')
  
    cryptoInfo.name = coin.name
    cryptoInfo.symbol = coin.symbol
    cryptoInfo.image = coin.image
    cryptoInfo.price = coin.current_price
    cryptoInfo.percentage = coin.price_change_percentage_24h
      
    coinList.append(cryptoInfo)
  })
}

// function
const coinData = async () => {
  coinList.innerHTML = ''
  
  try {
    // start crypto
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: { vs_currency: 'usd' }
    });

    [coins, filterCoins] = [data, data]

    // render crypto data
    renderList(filterCoins)
  } catch (err) {
    toast(err.message)
  }
}

searchCoin.addEventListener('keyup', e => {
  const query = e.target.value.toLowerCase()
  
  filterCoins = coins.filter(
    d => d.name.toLowerCase().includes(query) || d.symbol.includes(query)
  )

  renderList(filterCoins)
})

// call function
coinData()

// delete analyzer
ipcRenderer.on('clear-stack', () => {
  coinData()
})
