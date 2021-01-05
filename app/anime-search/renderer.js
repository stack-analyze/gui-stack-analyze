// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { toast } = require('materialize-css')
const { format } = require('timeago.js')

// DOM elements
const animeList = document.querySelector('tbody')
const search = document.getElementById('anime')
const sendSearch = document.getElementById('anime-search')

// DOM fragment
const fragment = document.createDocumentFragment()

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
      const row = document.createElement('tr')

      // column elements
      const animePoster = document.createElement('td')
      const animeTitle = document.createElement('td')
      const animeSynopsis = document.createElement('td')
      const animeType = document.createElement('td')
      const animeEpisodes = document.createElement('td')
      const animeDebut = document.createElement('td')
      const animeFinish = document.createElement('td')
      const animeRated = document.createElement('td')
      
      // image
      const poster = document.createElement('img')

      animeTitle.textContent = animeData.title
      animeSynopsis.textContent = animeData.synopsis
      animeType.textContent = animeData.type
      animeEpisodes.textContent = animeData.episodes
      animeDebut.textContent = format(animeData.start_date)
      
      if (animeData.end_date === null) {
        animeFinish.textContent = 'Current Date'
      } else {
        animeFinish.textContent = format(animeData.end_date)
      }
      
      animeRated.textContent = animeData.rated

      poster.src = animeData.image_url
      poster.alt = `poster ${animeData.title}`
      poster.classList.add('poster')
      
      animePoster.appendChild(poster)

      row.appendChild(animePoster)
      row.appendChild(animeTitle)
      row.appendChild(animeSynopsis)
      row.appendChild(animeType)
      row.appendChild(animeEpisodes)
      row.appendChild(animeDebut)
      row.appendChild(animeFinish)
      row.appendChild(animeRated)

      fragment.appendChild(row)

      animeList.appendChild(fragment)
    })

  } catch (err) {
    toast({ html: err.message })
    console.error(err.message)
  }
}

// events
sendSearch.addEventListener('submit', (e) => {
  animeList.innerHTML = ''

  animeTool(search.value)

  e.preventDefault()
  sendSearch.reset()
})

// clear results
ipcRenderer.on('clear-anime-list', () => (animeList.innerHTML = ''))
