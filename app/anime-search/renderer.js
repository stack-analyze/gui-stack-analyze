// component
require('../components/navbar_component.js')

// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { format } = require('timeago.js')

const toast = require('../scripts/toast')

// DOM elements
const animeList = document.getElementById('anime-cards')
const search = document.getElementById('anime')
const sendSearch = document.getElementById('anime-search')

// anime search function
async function animeTool(query) {
  try {
    // call api
    const res = await axios.get("https://api.jikan.moe/v3/search/anime", {
      params: {
        q: query
      }
    })

    res.data.results.map((animeData) => {
      // row element
      const card = document.createElement('article')

      card.classList.add('card')

      // card elements
      const animePoster = document.createElement('figure')
      const animeContent = document.createElement('div')
      const animeTitle = document.createElement('h2')
      const animeSynopsis = document.createElement('p')
      const animeTime = document.createElement('p')

      // poster class
      animePoster.classList.add('card-header')

      // image
      const poster = document.createElement('img')

      // title
      animeTitle.textContent = `${animeData.title}: ${animeData.episodes === 0 ? 'making' : animeData.episodes} episodes`
      animeTitle.classList.add('card-title')

      animeSynopsis.textContent = `synopsis: ${animeData.synopsis}`
      animeSynopsis.classList.add('anime-synopsis')

      poster.src = animeData.image_url
      poster.alt = `poster ${animeData.title}`
      poster.classList.add('card-image')

      animePoster.appendChild(poster)

      animeContent.append(animeSynopsis, animeTime)
      animeContent.classList.add('card-content')

      animeTime.textContent = `
        debut: ${format(animeData.start_date)}
        final: ${animeData.end_date === null ? 'Current Date' : format(animeData.end_date) }
      `
      animeTime.classList.add('anime-time')

      card.append(animePoster, animeTitle, animeContent)

      animeList.appendChild(card)
    })
  } catch (err) {
    toast(err.message)
  }
}

// events
sendSearch.addEventListener('submit', (e) => {
  animeList.innerHTML = ''

  animeTool(search.value)

  e.preventDefault()
  sendSearch.reset()
})

// anime clear
ipcRenderer.on('clear-stack', () => (animeList.innerHTML = ''))
