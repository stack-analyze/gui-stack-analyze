// modules
const { ipcRenderer } = require('electron')
const validator = require('html-validator')
const toast = require('../scripts/toast')
const { webRegexp } = require('../scripts/regex')

// DOM elements
const website = document.getElementById('website')
const validatorBtn = document.getElementById('submit-validate')
const resultValidator = document.getElementById('html-results')

const htmlValidator = async () => {
  const options = {
    url: website.value,
    format: 'json'
  }

  try {
    const res = await validator(options)

    res.messages.map((data) => {
      // create elements
      const row = document.createElement('article')
      const msg = document.createElement('span')
      const msgContent = document.createElement('pre')
      const msgDetails = document.createElement('code')
      const details = document.createElement('b')

      // conditional class
      data.type === 'error' ? row.classList.add('error') : row.classList.add('warn')

      msgDetails.textContent = `From the line ${data.lastLine}, column ${data.firstColumn}; to line ${data.lastLine}, column ${data.lastColumn}:`
      msgDetails.classList.add('msg-details')

      msg.textContent = `${data.message}`
      msg.classList.add('msg-details')

      details.textContent = data.extract
      details.classList.add('code', 'scroll')

      msgContent.appendChild(msgDetails)

      row.append(msg, msgContent, details)

      resultValidator.append(row)
    })
    toast(`finish analyze ${website.value}`)
  } catch (err) {
    toast(err.message)
  }
  
  website.value = ''
}

// events
validatorBtn.addEventListener('click', (e) => {
  // restart validator
  resultValidator.innerHTML = ''

  !webRegexp.test(website.value)
  	? toast('https:// or https:// is required')
  	: htmlValidator()

  e.preventDefault()
})

ipcRenderer.on('clear-stack', () => (resultValidator.innerHTML = ''))
