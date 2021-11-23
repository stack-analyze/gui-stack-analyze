// web components
require('../components/navbar_component')

// modules
const { ipcRenderer } = require('electron')
const toast = require('../scripts/toast')

// DOM elements
const From = document.getElementById('analyze')
const webSite = document.getElementById('url')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.getElementById('analyze-button')
const token = document.getElementById('token')
const bitlyDate = document.getElementById('created-date')
const bitlyLink = document.getElementById('bitly-link')
const link = document.getElementById('link')

// validate bitly link
analyzeLink.addEventListener('keyup', () => {
  analyzeButton.disabled = !analyzeLink.validity.valid
})

// bitly info function
const bitly = async () => {
  try {
    const res = await fetch('https://api-ssl.bitly.com/v4/expand', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bitlink_id: webSite.value })
    })

    const data = await res.json()
    
    console.table(data)

    bitlyDate.textContent = new Date(data.created_at).toDateString()
    bitlyLink.textContent = data.link;
    link.textContent = data.long_url
  } catch(err) {
    toast(err.message)
  }
}

// submit
From.addEventListener('submit', (e) => {
  // start funcition
  bitly()

  // finish
  analyzeButton.disabled = true
  e.preventDefault()
  From.reset()
})

// reset
ipcRenderer.on('clear-stack', () => {
  bitlyDate.textContent = new Date().toDateString()
  bitlyLink.textContent = "no url"
  link.textContent = "no long url"
})

// loading DOM data
document.addEventListener('DOMContentLoaded', () => {
  bitlyDate.textContent = new Date().toDateString()
  bitlyLink.textContent = "no url"
  link.textContent = "no long url"
})

