// component
require('../components/navbar_component')

// modules
const { ipcRenderer, shell } = require('electron')
const Wappalyzer = require('wappalyzer')
const toast = require('../scripts/toast')

// DOM elements
const techStack = document.getElementById('stack')
const From = document.getElementById('analyze')
const webSite = document.getElementById('web')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.getElementById('analyze-button')

// tech stack function
const stack = async (url) => {
  const wappalyzer = await new Wappalyzer()

  // check stack
  try {
    await wappalyzer.init()

    const { technologies } = await wappalyzer.open(url).analyze()

    technologies.map((app) => {

      // card elements
      const cardContent = document.createElement('article')
      const webSite = document.createElement('div')
      const imageLogo = document.createElement('figure')
      const cardTitle = document.createElement('h2')
      const categories = document.createElement('p')

      // card
      cardContent.classList.add('card', 'app-glass')
      imageLogo.classList.add('card-image')

      // link element
      const link = document.createElement('a')

      // image element
      const logo = document.createElement('img')

      webSite.classList.add('card-action')

      link.href = app.website
      link.target = '_blank'
      link.textContent = `${app.name} website`
      link.classList.add('card-link')

      logo.src = `../images/${app.icon}`
      logo.alt = app.name
      logo.classList.add('logo')
      
      cardTitle.textContent = app.name
      cardTitle.classList.add('card-title')

      categories.classList.add('card-content')
      categories.textContent = app.categories.map((categorie) => categorie.name).join(', ')

      webSite.appendChild(link)
      imageLogo.appendChild(logo)
      
      cardContent.append(imageLogo, cardTitle, categories, webSite)

      techStack.appendChild(cardContent)
    })
    toast(`finish analyze ${url}`)
  } catch (err) {
    toast(err.message)
  }

  // finish check
  await wappalyzer.destroy()
}

// events
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.href.startsWith('http')) {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }
})

analyzeLink.addEventListener('keyup', () => {
  analyzeButton.disabled = !analyzeLink.validity.valid
})

From.addEventListener('submit', (e) => {
  techStack.innerHTML = ''
  stack(webSite.value)

  analyzeButton.disabled = true
  e.preventDefault()
  From.reset()
})

// clear analyze
ipcRenderer.on('clear-stack', () => (techStack.innerHTML = ''))
