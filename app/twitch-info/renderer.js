// module
const { ipcRenderer } = require('electron')
const axios = require('axios')
const toast = require('../scripts/toast')

// component
require('../components/twitchCard')

// DOM elements
const form = document.getElementById('twitch-info')
const twitchUsers = document.getElementById('twitch-user')
const twitchClient = document.getElementById('twitch-client')
const twitchToken = document.getElementById('twitch-token')

const twitchList = document.getElementById('twitch-list')

// twitch info function
const twitchInfo = async (login, token, client) => {
  // params for twitch api
  const params = new URLSearchParams();
  
  const users = twitchUsers.value.split(',')
  
  if(users.length === 100) return toast('users must be 100')
  
  users.forEach(user => {
    params.append('login', user)
  })
  
  twitchList.innerHTML = ''
  
  try {
    const { data: twitchData } = await axios.get('https://api.twitch.tv/helix/users', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": client
      }
    })
    
    twitchData.data.forEach(twitch => {
      const card = document.createElement('twitch-card')
      
      card.username = twitch.login
      card.image = twitch.profile_image_url
      card.date = twitch.created_at
      card.description = twitch.description
      card.type = twitch.broadcaster_type
      card.count = twitch.view_count
      
      twitchList.append(card)
    })
  } catch (err) {
    console.error(err.message)
    toast(err.message)
  }
}

// ajax
form.addEventListener('submit', (e) => {
  twitchInfo(twitchUsers.value, twitchToken.value, twitchClient.value)
  e.preventDefault()
  form.reset()
})

// results clear
ipcRenderer.on('clear-stack', () => {
  twitchList.innerHTML = ''
})
