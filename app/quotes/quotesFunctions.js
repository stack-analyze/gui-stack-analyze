// modules
const { default: axios } = require('axios')

const resultsQuotes = document.querySelector('#results-quotes')

const quotesFunctions = {
  anime: async (anime) => {
    try {
      const { data } = await axios.get('https://api.animechan.io/v1/quotes/random', {
        params: { anime }
      })

      console.log(data)

      resultsQuotes.textContent = JSON.stringify(data, null, 2)
    } catch (err) {
      resultsQuotes.textContent = err.message
    }
  },
  swift: async () => {
    try {
      const data = await (await fetch('https://taylorswiftapi.onrender.com/get')).json()
      resultsQuotes.textContent = JSON.stringify(data, null, 2)
    } catch (err) {
      resultsQuotes.textContent = err.message
    }
  }
}

const quotesOptions = Object.keys(quotesFunctions)

module.exports = { resultsQuotes, quotesOptions, quotesFunctions }
