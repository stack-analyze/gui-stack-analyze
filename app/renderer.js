// modules
const { ipcRenderer, shell } = require('electron')
const Wappalyzer = require('wappalyzer')
const { toast } = require('materialize-css')

// DOM elements
const From = document.getElementById('analyze')
const webSite = document.getElementById('web')
const techStack = document.querySelector('tbody')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.querySelector('#analyze-button')
const webLanguaje = document.querySelector('.meta-languaje')

// tech stack function
const stack = async (url) => {
  const wappalyzer = await new Wappalyzer()

  // check stack
  try {
    await wappalyzer.init()

    const results = await wappalyzer.open(url).analyze()

    results.technologies.map((app) => {
      techStack.innerHTML += `
        <tr>
            <td>${app.name}</td>
            <td><a href="${app.website}" target="_blank">${
        app.name
      } website</a></td>
            <td><img class="logo" src="images/${app.icon}" alt="${
        app.name
      } logo"/></td>
            <td>${Object.values(app.categories).map((categorie) => categorie.name).join(' ')}</td>
        </tr>
      `
    })
    webLanguaje.innerHTML = `website languaje: ${results.meta.language}`
  } catch (error) { toast({ html: error }) }

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
  webLanguaje.innerHTML = ''
  techStack.innerHTML = ''
})

// welcome message
toast({
  html: 'Welcome to Intermachine stack-analyze'
})
