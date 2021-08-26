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
    label: 'nonolive streamers',
    submenu: [
      {
        label: '⚔️GothspiceChann💰',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/14278329'
          )
        }
      },
      {
        label: '🎬JUJU#IDOL',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/17342980'
          )
        }
      },
      {
        label: 'Ly Pháp ❤️',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/33519748'
          )
        }
      },
      {
        label: 'Seyyahi Solist',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/28525468'
          )
        }
      },
      {
        label: '🌼PAPATYA❣SS🌼',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/28480328'
          )
        }
      },
      {
        label: "ᴹᴰ🐺☣ToniD'Ale",
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/41145492'
          )
        }
      },
      {
        label: 'ᴹᴰ🐰CELI69🦄🦎',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/41135433'
          )
        }
      },
      {
        label: '🦎🌟Aidee💋🦜',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/31655138'
          )
        }
      },
      {
        label: '🤡😻Piolinita💀',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/34109808'
          )
        }
      },
      {
        label: '💋🧉Narki🐺Lili',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/28480328'
          )
        }
      },
      {
        label: '🦎🌟GUANI🌻🍦',
        async click() {
          await shell.openExternal(
            'https://www.nonolive.com/9330839'
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
        async click() {
          await shell.openExternal(
            'https://dprojects.org'
          )
        }
      }
    ]
  },
  {
    label: 'twitch streamers',
    submenu: [
      {
        label: 'lamua_',
        async click() {
          await shell.openExternal(
            'https://www.twitch.tv/lamua_'
          )
        }
      },
      {
        label: 'lunanny',
        async click() {
          await shell.openExternal(
            'https://www.twitch.tv/lunanny'
          )
        }
      },
      {
        label: 'dannyaegyo',
        async click() {
          await shell.openExternal(
            'https://www.twitch.tv/dannyaegyo'
          )
        }
      }
    ]
  }
]

module.exports = recomendation;
