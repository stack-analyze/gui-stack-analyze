// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { toast } = require('materialize-css')
const Chart = require('chart.js')

// DOM elements
const speedResults = document.getElementById('pagespeed-results')
const From = document.getElementById('pagespeed')
const webSite = document.getElementById('web')
const analyzeLink = document.querySelector('.analyze-link')
const analyzeButton = document.getElementById('analyze-button')

// chart pagespeed function
const stats = (el, scoreDesktop, scoreMobile, bgColorDesktop, bgColorMobile) => {

  const ctxOptions = {
    type: 'bar',
    data: {
    labels: [ 'desktop', 'mobile' ],
    datasets: [{
      label: 'pagespeed',
      data: [ scoreDesktop, scoreMobile ],
      backgroundColor: [ bgColorDesktop, bgColorMobile ],
      borderWidth: 1
    }]
  },
    options: {
      responsive: false,
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

  return new Chart(el, ctxOptions)
}

// pagespeed function
async function pageSpeed (url) {
  const resDesktop = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=desktop`
  )
  const resMobile = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=mobile`
  )

  try {
    const desktopScore = Math.round(resDesktop.data.lighthouseResult.categories.performance.score * 100)
    const phoneScore = Math.round(resMobile.data.lighthouseResult.categories.performance.score * 100)
    
    let colorDesktop
    let colorMobile

    switch (true) {
      case (desktopScore === 1 || desktopScore <= 49):
        colorDesktop = '#f00'
        break
      case (desktopScore === 50 || desktopScore <= 89):
        colorDesktop = '#ff0'
        break
      case (desktopScore >= 90 || desktopScore === 100):
        colorDesktop = '#0f0'
        break
      default:
        colorDesktop = '#000'
        break
    }
        switch (true) {
      case (phoneScore === 1 || phoneScore <= 49):
        colorMobile = '#f00'
        break
      case (phoneScore === 50 || phoneScore <= 89):
        colorMobile = '#ff0'
        break
      case (phoneScore >= 90 || phoneScore === 100):
        colorMobile = '#0f0'
        break
      default:
        colorMobile = '#000'
        break
    }
    
    stats(speedResults, phoneScore, desktopScore, colorMobile, colorDesktop)

  } catch (err) {
    toast({
      html: err.message,
    })
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

stats(speedResults, 0, 0, '#000', '#000')
