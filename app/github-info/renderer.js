// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { format } = require('timeago.js')
const toast = require('../scripts/toast')

// DOM elements
const gitInfo = document.getElementById('git-info')
const user = document.getElementById('user')
const gitUser = document.getElementById('git-user')
const profile = document.getElementById('profile')
const fullName = document.getElementById('fullname')
const twitter = document.getElementById('twitter')
const repos = document.getElementById('repos')
const gits = document.getElementById('gits')
const created = document.getElementById('created')

// function
async function github(user) {
  try {
    const res = await axios.get(`https://api.github.com/users/${user}`)

    profile.src = res.data.avatar_url

    // data print
    gitUser.textContent = res.data.login

    fullName.textContent = res.data.name === null ? "no info" : res.data.name

    repos.textContent = res.data.public_repos

    gits.textContent = res.data.public_gists

    created.textContent = format(res.data.created_at)
    created.title = new Date(res.data.created_at).toDateString()

    twitter.textContent = res.data.twitter_username === null ? 'no twitter info' : res.data.twitter_username
    
    toast(res.status)
    console.log(res.status)
  } catch (err) {
    toast(err.message)
  }
}

// events
gitInfo.addEventListener('submit', (e) => {
  github(user.value)

  e.preventDefault()
  gitInfo.reset()
})

// delete analyzer
ipcRenderer.on('clear-stack', () => {
  gitUser.textContent = ''
  profile.src = '../images/no-found.jpg'
  fullName.textContent = 'no info'
  twitter.textContent = ''
  repos.textContent = ''
  gits.textContent = ''
  created.textContent = ''
  created.title = new Date().toDateString()  
})
