// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const toast = require('../scripts/toast')

// component
require('../components/movieCard')

// DOM elements
const movieQuery = document.getElementById('movie')
const movieToken = document.getElementById('token')
const movieSearch = document.getElementById('movie-search')
const movieResults = document.getElementById('movie-cards')

// movie funcition
const movieInfo = async () => {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: movieToken.value,
        query: movieQuery.value,
        page: 1,
      }
    })

    data.results
      .sort((x, y) => {
        const primaryDate = new Date(x.release_date)
        const secondaryDate = new Date(y.release_date)

        return primaryDate.getTime() - secondaryDate.getTime()
      })
      .filter((data) => data?.release_date)
      .forEach((result) => {
        const movieCard = document.createElement('movie-card')

        const pathImg = result?.poster_path
          ? `http://image.tmdb.org/t/p/w500/${result.poster_path}`
          : '../images/not-found.jpg'

        movieCard.name = result.title
        movieCard.poster = pathImg
        movieCard.sypnosis = result.overview
        movieCard.date = result.release_date
        movieCard.language = result.original_language
        movieCard.average = result.vote_average
        movieCard.count = result.vote_count

        movieResults.append(movieCard)
      })
  } catch (err) {
    toast(err.message)
  }
}

// submit
movieSearch.addEventListener('submit', (e) => {
  movieResults.innerHTML = ''
  movieInfo()

  e.preventDefault()
  movieSearch.reset()
})

// movie results clear
ipcRenderer.on('clear-stack', () => (movieResults.innerHTML = ''))
