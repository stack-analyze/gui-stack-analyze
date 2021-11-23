// component
require('../components/navbar_component.js')

// modules
const { ipcRenderer, shell } = require('electron')
const { format } = require('timeago.js')
const CoinGecko = require('coingecko-api');
const toast = require('../scripts/toast')

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
      //
      const cardBackground = coin.price_change_percentage_24h >= 0 ? 'coin-positive' : 'coin-negative'
      const cardBalanceResult = coin.price_change_percentage_24h >= 0 ? 'coin-balance-positive' : 'coin-balance-negative'

      // DOM card elements
      const cardBody = document.createElement('article')
      const cardHeader = document.createElement('figure')
      const cardImage = document.createElement('img')
      const cardTitle = document.createElement('h2')
      const cardDescription = document.createElement('p')
      const cardBalance = document.createElement('strong')

      // add class
      cardBody.classList.add(cardBackground, 'card')
      cardImage.classList.add('card-image')
      cardTitle.classList.add('card-title')
      cardDescription.classList.add('card-description')
      cardBalance.classList.add(cardBalanceResult)

      // img
      cardImage.src = coin.image
      cardImage.alt = coin.name

      // title
      cardTitle.textContent = coin.name

      // description and balance
      cardDescription.innerHTML = `
        symbol: ${coin.symbol.toUpperCase()} <br>
        price: ${coin.current_price} USD <br>
        last updated: ${format(coin.last_updated)} <br>
      `

      cardBalance.textContent = `balance: ${coin.price_change_percentage_24h}`

      // append
      cardHeader.appendChild(cardImage)
      cardDescription.appendChild(cardBalance)

      cardBody.append(cardHeader, cardTitle, cardDescription)
      coinList.append(cardBody)

      /* coinList.innerHTML += `
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
      ` */
    })
  } catch (err) {
    toast(err.message)
  }
}

// call function
coinData()

// delete analyzer
ipcRenderer.on('clear-stack', () => shell.openExternal('https://lolwallpapers.net'))
