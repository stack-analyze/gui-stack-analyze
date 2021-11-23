// web components
require('../components/navbar_component')

// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const toast = require('../scripts/toast')

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

    data.results.map((result) => {
      
      const card = document.createElement('article')
      card.classList.add('card')

      // card elements
      const moviePoster = document.createElement('figure')
      moviePoster.classList.add('card-header')

      const movieContent = document.createElement('div')
      movieContent.classList.add('card-content')
      
      const movieTitle = document.createElement('h2')
      movieTitle.textContent = result.title

      const movieSynopsis = document.createElement('p')
      movieSynopsis.textContent = result.overview

      const movieDate = document.createElement('time')
      movieDate.dateTime = result.release_date
      movieDate.textContent = result.release_date

      const movieDesc = document.createElement('p')
      movieDesc.innerHTML = `
        language: ${result.original_language} <br>
        vote average: ${result.vote_average} <br>
        vote count: ${result.vote_count}
      `

      movieContent.append(movieSynopsis, movieDate, movieDesc)

      // image
      const poster = document.createElement('img')
      const pathImg = result.poster_path === null
        ? 'No-image-found.jpg'
        : `http://image.tmdb.org/t/p/w500/${result.poster_path}`
      poster.src = pathImg
      poster.alt = `poster ${result.title}`
      poster.classList.add('card-image')
      moviePoster.appendChild(poster)

      // append to card
      card.append(moviePoster, movieTitle, movieContent)

      // append to list
      movieResults.append(card)
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
