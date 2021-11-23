// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { toast } = require('materialize-css')
const { format } = require('timeago.js')

// DOM elements
const movieList = document.getElementById('movie-cards')
const search = document.getElementById('movie')
const sendSearch = document.getElementById('movie-search')

// DOM fragment
const fragment = document.createDocumentFragment()

// movie search function
async function movieTool(query) {
  try {
    // call api
    const res = await axios.get("https://api.jikan.moe/v3/search/movie", {
      params: {
        q: query
      }
    })

    res.data.results.map((movieData) => {
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
      const movieDebut = document.createElement('a')
      const movieFinish = document.createElement('a')
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
      movieTitle.textContent = movieData.title
      movieTitle.classList.add('card-title', 'flow-text', 'activator')
      movieTitle.appendChild(iconMore)

      movieSynopsis.textContent = movieData.synopsis
      movieDesc.textContent = `type: ${movieData.type} \n episodes: ${movieData.episodes} \n rated: ${movieData.rated}`
      movieDesc.classList.add('description')

      movieDebut.href = '#!'
      movieDebut.classList.add('info-time')
      movieDebut.textContent = `debut time: ${format(movieData.start_date)}`

      movieFinish.href = '#!'
      movieFinish.classList.add('info-time')

      iconClose.textContent = 'close'
      iconClose.classList.add('material-icons', 'right')

      RevealTitle.textContent = 'Synopsis'
      RevealTitle.classList.add('card-title', 'flow-text', 'grey-text', 'text-darken-4')
      RevealTitle.appendChild(iconClose)

      movieData.end_date === null ? movieFinish.textContent = 'Current Date' : movieFinish.textContent = `finish time: ${format(movieData.end_date)}`

      poster.src = movieData.image_url
      poster.alt = `poster ${movieData.title}`
      poster.classList.add('responsive-img', 'center')

      movieSynopsisContent.classList.add('card-reveal')
      movieSynopsisContent.appendChild(RevealTitle)
      movieSynopsisContent.appendChild(movieSynopsis)

      moviePoster.appendChild(poster)

      movieContent.appendChild(movieDesc)
      movieContent.classList.add('card-content')

      movieTime.appendChild(movieDebut)
      movieTime.appendChild(movieFinish)

      card.appendChild(moviePoster)
      card.appendChild(movieTitle)
      card.appendChild(movieContent)
      card.appendChild(movieSynopsisContent)
      card.appendChild(movieTime)

      row.appendChild(card)

      fragment.appendChild(row)

      movieList.appendChild(fragment)
    })

  } catch (err) {
    toast({ html: err.message })
  }
}

// events
sendSearch.addEventListener('submit', (e) => {
  movieList.innerHTML = ''

  movieTool(search.value)

  e.preventDefault()
  sendSearch.reset()
})

// movie clear
ipcRenderer.on('clear-stack', () => (movieList.innerHTML = ''))
