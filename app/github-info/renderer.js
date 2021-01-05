// modules
const { ipcRenderer } = require('electron')
const axios = require('axios')
const { format } = require('timeago.js')
const { toast } = require('materialize-css')

// DOM elements
const gitInfo = document.getElementById('git-info')
const user = document.getElementById('user')
const gitUser = document.getElementById('git-user')
const profile = document.getElementById('profile')
const fullName = document.getElementById('fullname')
const info = document.getElementById('info')
const twitter = document.getElementById('twitter')
const repos = document.getElementById('repos')
const gits = document.getElementById('gits')
const created = document.getElementById('created')
const updated = document.getElementById('updated')

// function
async function github(user) {
  try {
    const res = await axios.get(`https://api.github.com/users/${user}`)

    profile.src = res.data.avatar_url

    // data print
    gitUser.textContent = res.data.login
    fullName.textContent = res.data.name === null ? "no info": res.data.name
    info.textContent = res.data.bio === null ? "no bio": res.data.bio
    twitter.textContent = res.data.twitter_username === null ? "no info": `@${res.data.twitter_username}`
    repos.textContent = res.data.public_repos
    gits.textContent = res.data.public_gists
    created.textContent = format(res.data.created_at)
    updated.textContent = format(res.data.updated_at)
  } catch (err) {
    toast({html: err.message})
  }
}

// events
gitInfo.addEventListener('submit', (e) => {
  github(user.value)

  e.preventDefault()
  gitInfo.reset()
})

// clear analyze
ipcRenderer.on('clear-info', () => {
  gitUser.textContent = ''
  profile.src = ''
  fullName.textContent = ''
  info.textContent = ''
  twitter.textContent = ''
  repos.textContent = ''
  gits.textContent = ''
  created.textContent = ''
  updated.textContent = ''
})
