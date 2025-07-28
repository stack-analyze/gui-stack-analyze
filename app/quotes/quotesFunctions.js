// modules
const { default: axios } = require('axios')

const resultsQuotes = document.querySelector('#results-quotes')

const quotesOptions = ['anime']

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
  }
}

module.exports = { resultsQuotes, quotesOptions, quotesFunctions }
