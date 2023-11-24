// delta card component
require('../components/stackCard');

// modules
const { ipcRenderer, shell } = require('electron')
const Wappalyzer = require('wappalyzer')
const toast = require('../scripts/toast')
const { webRegexp } = require('../scripts/regex')

// DOM elements
const techStack = document.querySelector('#stack')
const website = document.querySelector('#web')
const analyzeButton = document.querySelector('#analyze-button')

// tech stack function
const stack = async () => {
  const formatter = new Intl.ListFormat('en', { style: 'short', type: 'unit' });
  const wappalyzer = new Wappalyzer()
  
  if(!webRegexp.test(website.value)) {
    return toast('https:// or https:// is required')
  }

  // check stack
  try {
    await wappalyzer.init()

    const { technologies } = await (await wappalyzer.open(website.value)).analyze()

    technologies.forEach((app) => {
      // create categories array
      const categories = app.categories.map(({ name }) => name);
      
      // create web component
      const stackCard = document.createElement('stack-card');
      
      stackCard.cardTitle = app.name;
      stackCard.image = `../images/logos/${app.icon}`;
      stackCard.alt = app.name;
      stackCard.link = app.website;
      stackCard.categories = formatter.format(categories);
      
      techStack.append(stackCard)
    })
    toast(`finish analyze ${website.value}`)
  } catch (err) {
    toast(err.message)
  }

  // finish check
  await wappalyzer.destroy()
  website.value = ''
}

// events
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.href.startsWith('http')) {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }
})

analyzeButton.addEventListener('click', (e) => {
  techStack.innerHTML = ''
  e.preventDefault()
  stack()
})

// clear analyze
ipcRenderer.on('clear-stack', () => (techStack.innerHTML = ''))
