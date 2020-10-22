// modules
const axios = require('axios')
const { toast } = require('materialize-css')
const Chart = require('chart.js')

// DOM
const ctxMobile = document.getElementById('mobile-score')
const ctxDesktop = document.getElementById('desktop-score')
const mobilePercent = document.getElementById('mobile-percent')
const desktopPercent = document.getElementById('desktop-percent')

const stats = (el, score, bgColor) => {
  const extra = 100 - score

  const ctxOptions = {
    type: 'doughnut',
    data: {
      labels: ['page speed'],
      datasets: [{
        data: [score, extra],
        backgroundColor: [bgColor, 'rgba(0, 0, 0, 0.5)'],
        borderWidth: [0, 0]
      }]
    },
    options: {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: { mode: null },
      cutoutPercentage: 95
    }
  }

  return new Chart(el, ctxOptions)
}

async function mobile (url) {
  const res = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=mobile`
  )

  try {
    const phoneScore = Math.round(res.data.lighthouseResult.categories.performance.score * 100)

    switch (true) {
      case (phoneScore === 1 || phoneScore <= 49):
        stats(ctxMobile, phoneScore, '#f00')
        break
      case (phoneScore === 50 || phoneScore <= 89):
        stats(ctxMobile, phoneScore, '#ff0')
        break
      case (phoneScore >= 90 || phoneScore === 100):
        stats(ctxMobile, phoneScore, '#0f0')
        break
      default:
        stats(ctxMobile, phoneScore, '#000')
        break
    }

    mobilePercent.textContent = `Mobile ${phoneScore}`
  } catch (err) {
    toast({
      html: err.message,
      classes: 'rounded toast-bottom'
    })
  }
}

async function desktop (url) {
  const res = await axios.get(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=AIzaSyBEDaW4FxSZ2s1vz5CdD5Ai6PGZGdAzij0&strategy=desktop`
  )

  try {
    const desktopScore = Math.round(res.data.lighthouseResult.categories.performance.score * 100)

    switch (true) {
      case (desktopScore === 1 || desktopScore <= 49):
        stats(ctxDesktop, desktopScore, '#f00')
        break
      case (desktopScore === 50 || desktopScore <= 89):
        stats(ctxDesktop, desktopScore, '#ff0')
        break
      case (desktopScore >= 90 || desktopScore === 100):
        stats(ctxDesktop, desktopScore, '#0f0')
        break
      default:
        stats(ctxDesktop, desktopScore, '#000')
        break
    }

    desktopPercent.textContent = `Desktop ${desktopScore}`
  } catch (err) {
    toast({
      html: err.message,
      classes: 'rounded toast-bottom'
    })
  }
}

stats(ctxMobile, 0, '#000')
stats(ctxDesktop, 0, '#000')

module.exports = {
  ctxMobile,
  ctxDesktop,
  mobilePercent,
  desktopPercent,
  stats,
  mobile,
  desktop
}
