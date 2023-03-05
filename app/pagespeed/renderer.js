// modules
const { ipcRenderer } = require('electron')
const Chart = require('chart.js/auto')
const pagespeedApi = require('./pagespeedApi')
const toast = require('../scripts/toast')

// DOM elements
const speedResults = document.getElementById('pagespeed-results').getContext('2d')
const From = document.getElementById('pagespeed')
const webSite = document.getElementById('web')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.getElementById('analyze-button')

const ctxOptions = {
  type: 'bar',
  data: {
    labels: ['desktop', 'mobile'],
    datasets: [{
      label: 'pagespeed',
      data: [0, 0],
      backgroundColor: ['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)'],
      borderWidth: 1
    }]
  },
}

const chart = new Chart(speedResults, ctxOptions)

const colorBarChart = score => {
  switch(true) {
    case score === 0:
      return 'rgba(0, 0, 0, 0.2)'
      break
    case score === 1 || score <= 49:
      return 'rgba(255, 0, 0, 0.2)'
      break
    case score === 50 || score <= 89:
      return 'rgba(255, 255, 0, 0.2)'
      break
    case score >= 90 || score === maxScore:
      return 'rgba(0, 255, 0, 0.2)'
      break
  }
}

// pagespeed function
async function pageSpeed(url) {
  try {
    const resDesktop = await pagespeedApi(url, 'desktop')

    const resMobile = await pagespeedApi(url, 'mobile')
    
    chart.data.datasets[0].data[0] = Math.round(resDesktop.lighthouseResult.categories.performance.score * 100)
    chart.data.datasets[0].data[1] = Math.round(resMobile.lighthouseResult.categories.performance.score * 100)
    
    chart.data.datasets[0].backgroundColor[0] = colorBarChart(chart.data.datasets[0].data[0])
    chart.data.datasets[0].backgroundColor[1] = colorBarChart(chart.data.datasets[0].data[1])

    chart.update();
    toast(`finish analyze ${url}`)
  } catch (err) {
    toast(err.message)
  }
}


// events
analyzeLink.addEventListener('keyup', () => {
  analyzeButton.disabled = !analyzeLink.validity.valid
})

From.addEventListener('submit', (e) => {
  pageSpeed(webSite.value)

  analyzeButton.disabled = true
  e.preventDefault()
  From.reset()
})

ipcRenderer.on('clear-stack', () => {
  chart.data.datasets[0].data[0] = 0
  chart.data.datasets[0].data[1] = 0

  chart.data.datasets[0].backgroundColor[0] = '#000'
  chart.data.datasets[0].backgroundColor[1] = '#000'
  
  chart.update();
})
