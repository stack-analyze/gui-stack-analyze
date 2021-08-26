// component
require('../components/navbar_component.js')

// modules
const { ipcRenderer, shell } = require('electron')
const { format } = require('timeago.js')
const CoinGecko = require('coingecko-api');
const toast = require('../scripts/toast')

//
const cryptoSearch = document.getElementById('crypto-search')

// init coingecko
const CoinGeckoClient = new CoinGecko();

// DOM elements
const coinList = document.getElementById('coin-list')

// function
const coinData = async () => {
  try {
    // start crypto
    const coinData = await CoinGeckoClient.coins.markets();

    // render crypto data
    coinData.data.map((coin) => {
      coinList.innerHTML += `
        <article class="${coin.price_change_percentage_24h >= 0 ? 'coin-positive' : 'coin-negative'} card">
          <figure>
            <img class="card-image" src="${coin.image}" alt="${coin.name}">
          </figure>
          <h2 class="card-title">${coin.name}</h2>
          <p class="card-description">
            symbol: ${coin.symbol.toUpperCase()} <br>
            price: ${coin.current_price} USD <br>
            last updated: ${format(coin.last_updated)} <br>
            <strong
              class="${coin.price_change_percentage_24h >= 0 ? 'coin-balance-positive' : 'coin-balance-negative'}"
            >
              balance: ${coin.price_change_percentage_24h}
            </strong>
          </p>

        </article>
      `
    })
  } catch (err) {
    toast(err.message)
  }
}

// call function
coinData()

// delete analyzer
ipcRenderer.on('clear-stack', () => shell.openExternal('https://lolwallpapers.net'))
