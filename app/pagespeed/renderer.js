// modules
const { ipcRenderer } = require('electron')
const Chart = require('chart.js/auto')
const pagespeedApi = require('./pagespeedApi')
const toast = require('../scripts/toast')
const { webRegexp } = require('../scripts/regex')

// DOM elements
const speedResults = document.querySelector('#pagespeed-results')
const website = document.querySelector('#web')
const analyzeButton = document.querySelector('#analyze-button')

speedResults.getContext('2d')

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
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'pagespeed'
      }
    },
    scales: {
    	y: { min: 0, max: 100 }
    }
  },
}

const chart = new Chart(speedResults, ctxOptions)

const colorBarChart = score => {
  switch(true) {
    case score === 0:
      return '#000'
      break
    case score === 1 || score <= 49:
      return '#f00'
      break
    case score === 50 || score <= 89:
      return '#ff0'
      break
    case score >= 90 || score === maxScore:
      return '#0f0'
      break
  }
}

// pagespeed function
async function pageSpeed() {
  try {
    const resDesktop = await pagespeedApi(website.value, 'desktop')

    const resMobile = await pagespeedApi(website.value, 'mobile')
    
    chart.data.datasets[0].data[0] = Math.round(resDesktop.lighthouseResult.categories.performance.score * 100)
    chart.data.datasets[0].data[1] = Math.round(resMobile.lighthouseResult.categories.performance.score * 100)
    
    chart.data.datasets[0].backgroundColor[0] = colorBarChart(chart.data.datasets[0].data[0])
    chart.data.datasets[0].backgroundColor[1] = colorBarChart(chart.data.datasets[0].data[1])

    chart.update();
    toast(`finish analyze ${website.value}`)
  } catch (err) {
    toast(err.message)
  }
  
  website.value = ''
}


// events
analyzeButton.addEventListener('click', (e) => {
  !webRegexp.test(website.value) 
  	? toast('https:// or https:// is required') 
  	: pageSpeed()

  e.preventDefault()
})

ipcRenderer.on('clear-stack', () => {
  chart.data.datasets[0].data[0] = 0
  chart.data.datasets[0].data[1] = 0

  chart.data.datasets[0].backgroundColor[0] = '#000'
  chart.data.datasets[0].backgroundColor[1] = '#000'
  
  chart.update();
})
