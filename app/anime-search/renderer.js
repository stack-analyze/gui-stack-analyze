// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')

const toast = require('../scripts/toast')

// component
require('../components/animeCard')

// DOM elements
const animeList = document.getElementById('anime-cards')
const search = document.getElementById('anime')
const sendSearch = document.getElementById('anime-search')

// anime search function
async function animeTool(query) {
  try {
    // call api
    const { data: animeData } = await axios.get("https://api.jikan.moe/v4/anime", {
      params: { q: query }
    })

    animeData.data.forEach((anime) => {
      // row element
      const animeCard = document.createElement('anime-card')

      animeCard.name = anime.title
      animeCard.altername = anime.title_japanese
      animeCard.type = anime.type
      animeCard.image = anime.images.webp.image_url
      animeCard.rating = anime.rating
      animeCard.episodes = anime.episodes
      animeCard.debut = anime.aired.from
      
      if(anime.aired?.to) {
        animeCard.finish = anime.aired.to
      } else {
        animeCard.status = anime.status
      }

      animeList.append(animeCard)
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
