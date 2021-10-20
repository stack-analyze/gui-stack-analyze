// modules
const { ipcRenderer, shell } = require('electron')
const Wappalyzer = require('wappalyzer')
const { toast } = require('materialize-css')

// DOM elements
const techStack = document.getElementById('stack')
const From = document.getElementById('analyze')
const webSite = document.getElementById('web')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.getElementById('analyze-button')

// DOM stackFragment
const stackFragment = document.createDocumentFragment()

// tech stack function
const stack = async (url) => {
  const wappalyzer = await new Wappalyzer()

  // check stack
  try {
    await wappalyzer.init()

    const { technologies } = await wappalyzer.open(url).analyze()

    technologies.map((app) => {
      // column element
      const column = document.createElement('section')

      // card elements
      const cardContent = document.createElement('div')
      const webSite = document.createElement('div')
      const imageLogo = document.createElement('figure')
      const cardTitle = document.createElement('h2')
      const categories = document.createElement('div')

      // card
      cardContent.classList.add('card', 'medium')
      imageLogo.classList.add('card-image')

      // link element
      const link = document.createElement('a')

      // image element
      const logo = document.createElement('img')

      column.classList.add('col', 's4')

      webSite.classList.add('card-action')

      link.href = app.website
      link.target = '_blank'
      link.textContent = `${app.name} website`
      link.classList.add('black-text')

      logo.src = `../images/${app.icon}`
      logo.alt = app.name
      logo.classList.add('logo')
      cardTitle.textContent = app.name
      cardTitle.classList.add('card-title', 'flow-text', 'center')

      categories.classList.add('card-content')
      categories.textContent = app.categories.map((categorie) => categorie.name).join(', ')

      webSite.appendChild(link)
      imageLogo.appendChild(logo)
      cardContent.appendChild(imageLogo)
      cardContent.appendChild(cardTitle)
      cardContent.appendChild(categories)
      cardContent.appendChild(webSite)

      column.appendChild(cardContent)

      stackFragment.appendChild(column)

      techStack.appendChild(stackFragment)
    })
  } catch (err) {
    console.error(err)
    toast({ html: err, classes: 'rounded toast-bottom' })
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
