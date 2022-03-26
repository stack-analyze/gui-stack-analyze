// component
require('../components/navbar_component')

// module
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { format } = require('timeago.js')
const toast = require('../scripts/toast')

// DOM elements
const form = document.getElementById('twitch-info')
const twitchUser = document.getElementById('twitch-user')
const twitchClient = document.getElementById('twitch-client')
const twitchToken = document.getElementById('twitch-token')
const twitchImage = document.getElementById('profile-twitch')
const twitchlogin = document.getElementById('user')
const twitchCount = document.getElementById('count')
const twitchdate = document.getElementById('created')
const twitchDesc = document.getElementById('description')

// twitch info function
const twitchInfo = async (login, token, client) => {
  try {
    const { status, data } = await axios.get('https://api.twitch.tv/helix/users', {
      params: { login },
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": client
      }
    })

    twitchImage.src = data.data[0].profile_image_url
    twitchlogin.textContent = data.data[0].login
    twitchCount.textContent = data.data[0].view_count
    twitchdate.textContent = format(data.data[0].created_at)
    twitchDesc.textContent = data.data[0].description

    toast(status)
  } catch (err) {
    console.error(err.message)
    toast(err.message)
  }
}

// ajax
form.addEventListener('submit', (e) => {
  twitchInfo(twitchUser.value, twitchToken.value, twitchClient.value)
  e.preventDefault()
  form.reset()
})

// results clear
ipcRenderer.on('clear-stack', () => {
  twitchImage.src = '../images/no-found.jpg'
  twitchlogin.textContent = 'no-info'
  twitchCount.textContent = ''
  twitchdate.textContent = ''
  twitchDesc.textContent = ''
})
