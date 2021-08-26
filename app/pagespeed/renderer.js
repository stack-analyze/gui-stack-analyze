// component
require('../components/navbar_component.js')

// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const Chart = require('chart.js')
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
      backgroundColor: ['#000', '#000'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    },
    tooltips: {
      enabled: true
    },
    hover: { mode: null }
  }
}

const chart = new Chart(speedResults, ctxOptions)

// pagespeed function
async function pageSpeed(url) {
  try {
    const resDesktop = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=desktop`
  )

  const resMobile = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=mobile`
  )
    
    chart.data.datasets[0].data[0] = Math.round(resDesktop.data.lighthouseResult.categories.performance.score * 100)
    chart.data.datasets[0].data[1] = Math.round(resMobile.data.lighthouseResult.categories.performance.score * 100)

    switch (true) {
      case (chart.data.datasets[0].data[0] === 1 || chart.data.datasets[0].data[0] <= 49):
        chart.data.datasets[0].backgroundColor[0] = '#f00'
        break
      case (chart.data.datasets[0].data[0] === 50 || chart.data.datasets[0].data[0] <= 89):
        chart.data.datasets[0].backgroundColor[0] = '#ff0'
        break
      case (chart.data.datasets[0].data[0] >= 90 || chart.data.datasets[0].data[0] === 100):
        chart.data.datasets[0].backgroundColor[0] = '#0f0'
        break
      default:
        chart.data.datasets[0].backgroundColor[0] = '#000'
        break
    }
    switch (true) {
      case (chart.data.datasets[0].data[1] === 1 || chart.data.datasets[0].data[1] <= 49):
        chart.data.datasets[0].backgroundColor[1] = '#f00'
        break
      case (chart.data.datasets[0].data[1] === 50 || chart.data.datasets[0].data[1] <= 89):
        chart.data.datasets[0].backgroundColor[1] = '#ff0'
        break
      case (chart.data.datasets[0].data[1] >= 90 || chart.data.datasets[0].data[1] === 100):
        chart.data.datasets[0].backgroundColor[1] = '#0f0'
        break
      default:
        chart.data.datasets[0].backgroundColor[1] = '#000'
        break
    }

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
