// modules
const { ipcRenderer } = require('electron')
const validator = require('html-validator')

// DOM elements
const form = document.getElementById('validator')
const website = document.getElementById('website')
const validatorBtn = document.getElementById('btn')
const resultValidator = document.getElementById('html-results')
const webInfo = document.getElementById('link')

// DOM fragment element
const fragment = document.createDocumentFragment()

const htmlValidator = async (url) => {
  const options = {
    url,
    format: 'json'
  }

  try {
    const res = await validator(options)

    res.messages.map((data) => {
      // create elements
      const row = document.createElement('code')
      const msg = document.createElement('span')
      const msgDetails = document.createElement('span')
      const details = document.createElement('b')

      // conditional class
      data.type === 'error' ? row.classList.add('error') : row.classList.add('warn')

      msgDetails.textContent = `From the line ${data.lastLine}, column ${data.firstColumn}; to line ${data.lastLine}, column ${data.lastColumn}:`
      msgDetails.classList.add('msg-details')

      msg.textContent = `${data.message}`
      msg.classList.add('msg-details')

      details.textContent = data.extract
      details.classList.add('code', 'scroll')

      row.appendChild(msg)
      row.appendChild(msgDetails)
      row.appendChild(details)

      fragment.appendChild(row)

      resultValidator.appendChild(fragment)
    })
  } catch (err) {
    alert(err.message)
  }
}

// events
website.addEventListener('keyup', () => (validatorBtn.disabled = !website.validity.valid))

form.addEventListener('submit', (e) => {
  // restart validator
  resultValidator.innerHTML = ''

  htmlValidator(website.value)

  webInfo.textContent = website.value
  validatorBtn.disabled = true

  e.preventDefault()
  form.reset()
})

// clear validator
ipcRenderer.on('clear-validator', () => (resultValidator.innerHTML = ''))