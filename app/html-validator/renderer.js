// modules
const { ipcRenderer } = require('electron')
const validator = require('html-validator')
const { toast } = require('materialize-css')

// DOM elements
const form = document.getElementById('validator')
const website = document.getElementById('website')
const validatorBtn = document.getElementById('submit-validate')
const resultValidator = document.getElementById('html-results')

// DOM fragment element
const fragment = document.createDocumentFragment()

const htmlValidator = async (url) => {
  const options = {
    url,
    validator: 'http://html5.validator.nu',
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

      row.appendChild(msg)
      row.appendChild(msgContent)
      row.appendChild(details)

      fragment.appendChild(row)

      resultValidator.appendChild(fragment)
    })
  } catch (err) {
    toast({ html: err.message, classes: 'rounded toast-bottom' })
  }
}

// events
website.addEventListener('keyup', () => (validatorBtn.disabled = !website.validity.valid))

form.addEventListener('submit', (e) => {
  // restart validator
  resultValidator.innerHTML = ''

  htmlValidator(website.value)
  validatorBtn.disabled = true

  e.preventDefault()
  form.reset()
})

ipcRenderer.on('clear-stack', () => (resultValidator.innerHTML = ''))
