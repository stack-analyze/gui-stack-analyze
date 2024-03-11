// modules
const { ipcRenderer } = require('electron')
const validateCss = require('css-validator')
const { webRegexp } = require('../scripts/regex')
const toast = require('../scripts/toast')

// DOM elements
const url = document.querySelector('#website')
const btnSubmit = document.querySelector('#css-validate')
const results = document.querySelector('#css-results')

const cssValidate = () => {
	validateCss({uri: url.value}, (err, data) => {
 		if (err) { toast(err.message) } else {
 			results.textContent = JSON.stringify(data, null, 2)
 		}
 	})
  
  url.value = ''
}

// events
btnSubmit.addEventListener('click', () => {
	!webRegexp.test(url.value)
		? toast('https:// or https:// is required') 
		: cssValidate()
})

ipcRenderer.on('clear-stack', () => (results.textContent = ''))
