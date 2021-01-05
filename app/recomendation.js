const recomendation = [
  {
    label: 'dev youtuber',
    submenu: [
      {
        label: 'fazt',
        async click() {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.youtube.com/channel/UCX9NJ471o7Wie1DQe94RVIg'
          )
        }
      },
      {
        label: 'doriandesings',
        async click() {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.youtube.com/user/DorianDesigns'
          )
        }
      },
      {
        label: 'bluuweb',
        async click() {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.youtube.com/user/Bluuweb'
          )
        }
      },
      {
        label: 'leonidas esteban',
        async click() {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.youtube.com/user/LeonidasEsteban'
          )
        }
      }
    ]
  },
  {
    label: 'nonolive streamers',
    submenu: [
      {
        label: "⚔️GothspiceChann💰",
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.nonolive.com/14278329'
          )
        }
      },
      {
        label: 'JUJU جوهري🎵SS',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.nonolive.com/17342980'
          )
        }
      }
    ]
  },
  {
    label: 'projects',
    submenu: [
      {
        label: "Doofy's Projects",
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://windowsminios.org'
          )
        }
      }
    ]
  },
  {
    label: 'twitch streamers',
    submenu: [
      {
        label: 'lunanny',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.twitch.tv/lunanny'
          )
        }
      },
      {
        label: 'dannyaegyo',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://www.twitch.tv/dannyaegyo'
          )
        }
      }
    ]
  }
]

module.exports = recomendation;
