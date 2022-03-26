// elctron shell module
const { shell } = require('electron')

const recomendation = [
  {
    label: 'dev youtuber',
    submenu: [
      {
        label: 'recommend',
        submenu: [
          {
            label: 'fazt',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/channel/UCX9NJ471o7Wie1DQe94RVIg'
              )
            }
          },
          {
            label: 'doriandesings',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/user/DorianDesigns'
              )
            }
          },
          {
            label: 'bluuweb',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/user/Bluuweb'
              )
            }
          },
          {
            label: 'fernando herrera',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/channel/UCuaPTYj15JSkETGnEseaFFg'
              )
            }
          }
        ]
      },
      {
        label: 'neutral recommend',
        submenu: [
          {
            label: 'leonidas esteban',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/user/LeonidasEsteban'
              )
            }
          },
          {
            label: 'soy dalto',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/channel/UCtoo4_P6ilCj7jwa4FmA5lQ'
              )
            }
          }
        ]
      },
    ]
  },
  {
    label: 'instagram',
    submenu: [
      {
        label: 'seyyahikaktus',
        async click() {
          await shell.openExternal('https://www.instagram.com/seyyahikaktus')
        }
      },
      {
        label: 'papatyakaktuss',
        async click() {
          await shell.openExternal('https://www.instagram.com/papatyakaktuss')
        }
      },
      {
        label: 'juju_juhariah1995',
        async click() {
          await shell.openExternal('https://www.instagram.com/juju_juhariah1995')
        }
      },
    ]
  },
  {
    label: 'projects',
    submenu: [
      {
        label: "Doofy's Projects",
        async click() {
          await shell.openExternal('https://dprojects.org')
        }
      }
    ]
  },
  {
    label: 'twitch streamers',
    submenu: [
      {
        label: 'lunanny',
        async click() {
          await shell.openExternal('https://www.twitch.tv/lunanny')
        }
      },
      {
        label: 'dannyaegyo',
        async click() {
          await shell.openExternal('https://www.twitch.tv/dannyaegyo')
        }
      }
    ]
  },
  {
    label: 'ideas',
    submenu: [
      {
        label: "verguiskarime",
        async click() {
          await shell.openExternal('https://instagram.com/verguiskarime')
        }
      }
    ]
  },
]

module.exports = recomendation;
