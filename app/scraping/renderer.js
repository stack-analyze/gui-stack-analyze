// component
require('../components/navbar_component')

// module
const { ipcRenderer } = require('electron')
const toast = require('../scripts/toast')

// DOM elements
const form = document.getElementById('scraping')
const linkScraping = document.getElementById('link-scraping')
const selectorScraping = document.getElementById('selector-scraping')
const resultScraping = document.getElementById('results-scraping')
const analyzeButton = document.getElementById('analyze-button')

/* web  */
const createScraping = async () => {
  // results scraping
  let results

  // DOM parser
  const parser = new DOMParser()

  // option value
  const opt = selectorScraping.value

  try {
    const res = await fetch(linkScraping.value)
    const data = await res.text()

    /* start results */
    const page = parser.parseFromString(data, 'text/html')

    resultScraping.classList.replace('shell-msg', 'shell-results')

    const scrapeOpts = {
      title() {
        resultScraping.textContent = page.title
      },
      metadata() {
        results = [...page.querySelectorAll('meta')]
          .filter(({ name }) => name !== '')
          .map(item => ({
            metaType: item.name,
            metaValue: item.content
          }))

        resultScraping.textContent = JSON.stringify(results, null, 2)
      },
      images() {
        results = [...page.querySelectorAll('img')]
          .map(item => {
            const initalReplace = location.origin || location.origin + __dirname

            const imageURL = item.src.replace(initalReplace, '')

            return {
              imageURL,
              imageTitle: item.alt
            }
          })

        resultScraping.textContent = results.length === 0
          ? "no found images"
          : JSON.stringify(results, null, 2)
      },
      headings() {
        results = [...page.querySelectorAll('h1, h2, h3, h4, h5, h6')]
          .map(item => ({
            headingElement: item.tagName,
            text: item.textContent
          }))

        resultScraping.textContent = JSON.stringify(results, null, 2)
      },
      links() {
        results = [...page.querySelectorAll('a')]
          .filter((item) => item.href !== "")
          .map(item => ({
            url: item.href.replaceAll(location.origin, ''),
            text: item.textContent
          }))
          .shift()

        resultScraping.textContent = JSON.stringify(results, null, 2)
      },
      cites() {
        results = [...page.querySelectorAll('q, blockquote')]
          .map(item => ({
            citeTag: item.tagName,
            citeLink: item.cite,
            citeText: item.textContent
          }))

        resultScraping.textContent = results.length === 0
          ? "no found q and/or blockquote tags"
          : JSON.stringify(results, null, 2)
      },
      table_heading() {
        results = [...page.querySelectorAll('th')].map((i, item) => ({
          headingRow: i++,
          text: item.textContent
        }))

        resultScraping.textContent = results.length === 0
          ? "no found th tags"
          : JSON.stringify(results, null, 2)
      },
      table_data() {
        results = [...page.querySelectorAll('td')].map(item => item.textContent)

        resultScraping.textContent = results.length === 0
          ? "no found td tags"
          : JSON.stringify(results, null, 2)
      },
    }

    /* finish results */
    scrapeOpts[opt]()
    toast(res.status)
  } catch (err) {
    toast(err.message)
  }
}

linkScraping.addEventListener('keyup', () => {
  analyzeButton.disabled = !linkScraping.validity.valid
})

form.addEventListener('submit', e => {
  createScraping()
  
  analyzeButton.disabled = true
  e.preventDefault()
  form.reset()
})

ipcRenderer.on('clear-stack', () => {
  resultScraping.classList.replace('shell-results', 'shell-msg')
  resultScraping.textContent = 'wait scraping results'
})
