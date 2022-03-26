// modules
const { ipcRenderer, shell } = require('electron')
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

// function
async function github(user) {
  try {
    const res = await axios.get(`https://api.github.com/users/${user}`)

    profile.src = res.data.avatar_url

    // data print
    gitUser.textContent = res.data.login

    fullName.textContent = res.data.name === null ? "no info" : res.data.name

    info.textContent = res.data.bio === null ? "no bio" : res.data.bio

    repos.textContent = res.data.public_repos

    gits.textContent = res.data.public_gists

    created.textContent = format(res.data.created_at)
    created.title = new Date(res.data.created_at).toDateString()

    if (res.data.twitter_username === null) {
      twitter.textContent = "no twitter info"
      twitter.href = "#"
    } else {
      twitter.textContent = `${res.data.twitter_username} twitter`
      twitter.href = `https://twitter.com/${res.data.twitter_username}`
      twitter.target = "_blank"
    }
  } catch (err) {
    toast({ html: err.message })
  }
}

// events
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.href.startsWith('http')) {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }
})

gitInfo.addEventListener('submit', (e) => {
  github(user.value)

  e.preventDefault()
  gitInfo.reset()
})

//
ipcRenderer.on('clear-stack', () => {
  gitUser.textContent = ''
  profile.src = '../images/no-found.jpg'
  fullName.textContent = ''
  info.textContent = ''
  twitter.textContent = 'no info'
  twitter.href = '#'
  twitter.removeAttribute('target')
  repos.textContent = ''
  gits.textContent = ''
  created.textContent = ''
  created.title = new Date().toDateString()
})
