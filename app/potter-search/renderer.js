// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')

const toast = require('../scripts/toast')

// DOM elements
const keywordSearch = document.querySelector('#keyword-search')
const startSearch = document.querySelector('#potter-search')
const characterList = document.querySelector('#character-list')

// potter character search info
const getCharacters = async () => {
  try {
    const { data } = await axios.get("https://potterapi-fedeperin.vercel.app/en/characters", {
      params: { search: keywordSearch.value }
    })
    
    data.forEach((character) => {
      const container = document.createElement('article')
      container.classList.add('app-glass', 'info')
      
      const image = document.createElement('img')
      image.classList.add('info-img')
      image.src = character.image
      image.alt = character.nickname
      
      /* const characterName = document.createElement('strong')
      characterName.classList.add('info-title')
      characterName.textContent = `${character.fullName} - "${character.nickname}"` */
      
      const desc = document.createElement('p')
      desc.classList.add('info-desc')
      desc.innerHTML = `
      <strong>${character.fullName} - "${character.nickname}"</strong>
      hogwarts house: ${ character.hogwartsHouse }<br>
      interpreted by: ${ character.interpretedBy }
      `
      
      const birthdate = document.createElement('time')
      birthdate.classList.add('info-birthdate')
      birthdate.textContent = character.birthdate
      birthdate.dateTime = character.birthdate
      
      
      container.append(image, desc, birthdate)
      
      characterList.append(container)
    })
  } catch(err) {
    toast(err.message)
  }
}

// events
startSearch.addEventListener('submit', (e) => {
  characterList.innerHTML = ''

  getCharacters()

  e.preventDefault()
  startSearch.reset()
})


ipcRenderer.on('clear-stack', () => (characterList.innerHTML = ''))
