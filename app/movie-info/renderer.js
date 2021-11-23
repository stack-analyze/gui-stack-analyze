const { ipcRenderer } = require('electron')
const axios = require('axios')
const { toast } = require('materialize-css')

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
      const pathImg = result.poster_path === null
        ? 'No-image-found.jpg'
        : `http://image.tmdb.org/t/p/w500/${result.poster_path}`

      // row element
      const row = document.createElement('section')
      const card = document.createElement('article')

      row.classList.add('col', 's4')

      card.classList.add('card', 'sticky-action')

      // card elements
      const moviePoster = document.createElement('figure')
      const movieContent = document.createElement('div')
      const movieTime = document.createElement('div')
      const movieSynopsisContent = document.createElement('div')
      const movieTitle = document.createElement('strong')
      const RevealTitle = document.createElement('h2')
      const movieSynopsis = document.createElement('p')
      const movieDesc = document.createElement('blockquote')
      const movieDate = document.createElement('a')
      const iconClose = document.createElement('i')
      const iconMore = document.createElement('i')

      // poster class
      moviePoster.classList.add('card-image')

      // time content
      movieTime.classList.add('card-action')

      // image
      const poster = document.createElement('img')

      // title
      iconMore.textContent = 'more_vert'
      iconMore.classList.add('material-icons', 'right')
      movieTitle.textContent = result.title
      movieTitle.classList.add('card-title', 'flow-text', 'activator')
      movieTitle.appendChild(iconMore)

      movieSynopsis.textContent = result.overview

      movieDate.href = '#!'
      movieDate.classList.add('info-time')
      movieDate.textContent = `release date: ${result.release_date}`

      iconClose.textContent = 'close'
      iconClose.classList.add('material-icons', 'right')

      RevealTitle.textContent = 'Synopsis'
      RevealTitle.classList.add('card-title', 'flow-text', 'grey-text', 'text-darken-4')
      RevealTitle.append(iconClose)

      poster.src = pathImg
      poster.alt = `poster ${result.title}`
      poster.classList.add('responsive-img', 'center')

      movieSynopsisContent.classList.add('card-reveal')
      movieSynopsisContent.appendChild(RevealTitle)
      movieSynopsisContent.appendChild(movieSynopsis)

      moviePoster.appendChild(poster)

      movieContent.appendChild(movieDesc)
      movieContent.classList.add('card-content')

      movieTime.appendChild(movieDate)

      card.append(moviePoster, movieTitle, movieContent, movieSynopsisContent, movieTime)

      row.append(card)

      movieResults.append(row)
    })
  } catch (err) {
    toast({html: err.message})
    console.error(err.message)
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
