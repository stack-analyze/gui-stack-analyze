// modules
const { ipcRenderer, shell } = require('electron')
const Wappalyzer = require('wappalyzer')
const { toast } = require('materialize-css')

// DOM elements
const From = document.getElementById('analyze')
const webSite = document.getElementById('web')
const techStack = document.querySelector('tbody')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.getElementById('analyze-button')

// DOM fragment
const fragment = document.createDocumentFragment()

// tech stack function
const stack = async (url) => {
  const wappalyzer = await new Wappalyzer()

  // check stack
  try {
    await wappalyzer.init()

    const results = await wappalyzer.open(url).analyze()

    results.technologies.map((app) => {
      // row element
      const row = document.createElement('tr')

      // column elements
      const appName = document.createElement('td')
      const webSite = document.createElement('td')
      const imageLogo = document.createElement('td')
      const categories = document.createElement('td')

      // link element
      const link = document.createElement('a')

      // image element
      const logo = document.createElement('img')

      appName.textContent = app.name

      link.href = app.website
      link.target = '_blank'
      link.textContent = `${app.name} website`

      logo.src = `../images/${app.icon}`
      logo.alt = app.name
      logo.classList.add('logo')

      categories.textContent = Object.values(app.categories)
        .map((categorie) => categorie.name)
        .join(' ')

      webSite.appendChild(link)
      imageLogo.appendChild(logo)

      row.appendChild(appName)
      row.appendChild(webSite)
      row.appendChild(imageLogo)
      row.appendChild(categories)

      fragment.appendChild(row)

      techStack.appendChild(fragment)
    })
  } catch (error) { toast({ html: error, classes: 'rounded toast-bottom' }) }

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
ipcRenderer.on('clear-stack', () => {
  techStack.innerHTML = ''
})
