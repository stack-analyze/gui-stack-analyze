// modules
const { ipcRenderer, shell } = require('electron')
const axios = require('axios')

const toast = require('../scripts/toast')

// DOM modules
const form = document.querySelector('#bundlephobia-search')
const pkgInput = document.querySelector('#pkg-name')
const moduleName = document.querySelector('#module_name')
const moduleVer = document.querySelector('#module_ver')
const moduleDescription = document.querySelector('#module_description')
const moduleSize = document.querySelector('#module_size')
const moduleGzip = document.querySelector('#module_gzip')
const moduleRepo = document.querySelector('#module_repo')

// convert size
const kilobyteConvert = size => (
  size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`
)

// loaded
document.addEventListener('DOMContentLoaded', () => {
  moduleVer.textContent = '0.0.0'
  moduleSize.textContent = kilobyteConvert(0)
  moduleGzip.textContent = kilobyteConvert(0)
});

const bundlephobia = async () => {
  try {
    const { data } = await axios.get('https://bundlephobia.com/api/size', {
      params: { package: pkgInput.value }
    });
    
    moduleName.textContent = data.name
    moduleVer.textContent = data.version
    moduleDescription.textContent = data.description
    moduleSize.textContent = kilobyteConvert(data.size)
    moduleGzip.textContent = kilobyteConvert(data.gzip)
    
    moduleRepo.textContent = `${data.name} repo`
    moduleRepo.href = data.repository
    moduleRepo.target = '_blank'
  } catch (err) {
    toast(err.message)
  }
}

// sumbit
form.addEventListener('submit', e => {
  bundlephobia()
  
  e.preventDefault()
  form.reset()
})

// open external browser
moduleRepo.addEventListener('click', e => {
  if(e.target.href.startsWith('http')) {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }
})

// anime clear
ipcRenderer.on('clear-stack', () => {
  moduleName.textContent = 'no module'
  moduleVer.textContent = '0.0.0'
  moduleDescription.textContent = 'no description'
  moduleSize.textContent = kilobyteConvert(0)
  moduleGzip.textContent = kilobyteConvert(0)
  
  moduleRepo.textContent = 'no repo'
  moduleRepo.href = '#'
  moduleRepo.removeAttribute('target')
})