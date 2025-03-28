// modules
const { ipcRenderer, shell } = require('electron')

// toast
const toast = require('../scripts/toast')

// DOM elements
const pokerGameSelect = document.querySelector('select')
const pokerTitle = document.querySelector('#game-title')
const pokerMinAge = document.querySelector('#age')
const pokerPlayersList = document.querySelector('#players')
const howPlayTitle = document.querySelector('#how-play-title')

// open bicycle cards website
const openLink = async () => {
  await shell.openExternal('https://bicyclecards.com')
}

// scraping
const pokerGame = async (opt) => {
  const parser = new DOMParser()
  
  try {
    const data = await (
      await fetch(`https://bicyclecards.com/how-to-play/${opt}`)
    ).text()
    
    const page = parser.parseFromString(data, 'text/html')
    
    // title
    pokerTitle.textContent = page.title
    
    // age & players
    const [age, players] = [...page.querySelectorAll(
      '.border-brand-blue-pale div:not(.text-brand-blue)'
    )].map(el => el.textContent).slice(1)
    
    
    pokerMinAge.textContent = `ages: ${age}`
    pokerPlayersList.textContent = `players: ${players}`
    
    // how play title
    page.querySelectorAll('h3.text-2xl')
    
    // how play list
    if(howPlayTitle.children.length !== 0) { howPlayTitle.innerHTML = '' }
    
    const howplay = [...page.querySelectorAll('h3.text-2xl+p.mb-5')]
      .slice(0, 5)
    
    howplay.forEach(el => {
      const listItem = document.createElement('li')
      listItem.textContent = el.textContent
      
      howPlayTitle.append(listItem)
    })
  } catch(err) {
    toast(err.message)
  }
}

// change event
pokerGameSelect.addEventListener('change', () => {
  if (pokerGameSelect.value !== '') {
    pokerGame(pokerGameSelect.value)
  } else { 
    pokerTitle.textContent = ''
    pokerMinAge.textContent = ''
    pokerPlayersList.textContent = ''
    howPlayTitle.innerHTML = ''
  }
})

// events
ipcRenderer.on('clear-stack', () => {
  toast('now redirect to bicycle cards website')
  
  openLink()
})
