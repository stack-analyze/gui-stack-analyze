// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { toast } = require('materialize-css')
const { format } = require('timeago.js')

// DOM elements
const animeList = document.getElementById('anime-cards')
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
      const row = document.createElement('section')
      const card = document.createElement('article')

      row.classList.add('col', 's4')

      card.classList.add('card', 'sticky-action')

      // card elements
      const animePoster = document.createElement('figure')
      const animeContent = document.createElement('div')
      const animeTime = document.createElement('div')
      const animeSynopsisContent = document.createElement('div')
      const animeTitle = document.createElement('strong')
      const RevealTitle = document.createElement('h2')
      const animeSynopsis = document.createElement('p')
      const animeDesc = document.createElement('blockquote')
      const animeDebut = document.createElement('a')
      const animeFinish = document.createElement('a')
      const iconClose = document.createElement('i')
      const iconMore = document.createElement('i')

      // poster class
      animePoster.classList.add('card-image')

      // time content
      animeTime.classList.add('card-action')

      // image
      const poster = document.createElement('img')

      // title
      iconMore.textContent = 'more_vert'
      iconMore.classList.add('material-icons', 'right')
      animeTitle.textContent = animeData.title
      animeTitle.classList.add('card-title', 'flow-text', 'activator')
      animeTitle.appendChild(iconMore)

      animeSynopsis.textContent = animeData.synopsis
      animeDesc.textContent = `type: ${animeData.type} \n episodes: ${animeData.episodes} \n rated: ${animeData.rated}`
      animeDesc.classList.add('description')

      animeDebut.href = '#!'
      animeDebut.classList.add('info-time')
      animeDebut.textContent = `debut time: ${format(animeData.start_date)}`

      animeFinish.href = '#!'
      animeFinish.classList.add('info-time')

      iconClose.textContent = 'close'
      iconClose.classList.add('material-icons', 'right')

      RevealTitle.textContent = 'Synopsis'
      RevealTitle.classList.add('card-title', 'flow-text', 'grey-text', 'text-darken-4')
      RevealTitle.appendChild(iconClose)

      animeData.end_date === null ? animeFinish.textContent = 'Current Date' : animeFinish.textContent = `finish time: ${format(animeData.end_date)}`

      poster.src = animeData.image_url
      poster.alt = `poster ${animeData.title}`
      poster.classList.add('responsive-img', 'center')

      animeSynopsisContent.classList.add('card-reveal')
      animeSynopsisContent.appendChild(RevealTitle)
      animeSynopsisContent.appendChild(animeSynopsis)

      animePoster.appendChild(poster)

      animeContent.appendChild(animeDesc)
      animeContent.classList.add('card-content')

      animeTime.appendChild(animeDebut)
      animeTime.appendChild(animeFinish)

      card.appendChild(animePoster)
      card.appendChild(animeTitle)
      card.appendChild(animeContent)
      card.appendChild(animeSynopsisContent)
      card.appendChild(animeTime)

      row.appendChild(card)

      fragment.appendChild(row)

      animeList.appendChild(fragment)
    })

  } catch (err) {
    toast({ html: err.message })
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
