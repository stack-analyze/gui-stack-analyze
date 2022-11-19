// delta card component
require('../components/stackCard');

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
  const formatter = new Intl.ListFormat('en', { style: 'short', type: 'unit' });
  const wappalyzer = new Wappalyzer()

  // check stack
  try {
    await wappalyzer.init()

    const { technologies } = await wappalyzer.open(url).analyze()

    technologies.forEach((app) => {
      // create categories array
      const categories = app.categories.map(({ name }) => name);
      
      // create web component
      const stackCard = document.createElement('stack-card');
      
      stackCard.cardTitle = app.name;
      stackCard.image = `../images/${app.icon}`;
      stackCard.alt = app.name;
      stackCard.link = app.website;
      stackCard.categories = formatter.format(categories);
      
      techStack.append(stackCard)
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
