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
                'https://www.youtube.com/@FaztTech'
              )
            }
          },
          {
            label: 'doriandesings',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/@DorianDesings'
              )
            }
          },
          {
            label: 'bluuweb',
            async click() {
              await shell.openExternal(
                'https://www.youtube.com/@Bluuweb'
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
                'https://www.youtube.com/@LeonidasEsteban'
              )
            }
          },
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
        label: 'melodikaktus',
        async click() {
          await shell.openExternal('https://www.instagram.com/melodikaktus')
        }
      },
    ]
  },
  {
    label: 'projects',
    submenu: [
      {
        label: 'black metal promotions',
        async click() {
          await shell.openExternal('https://www.youtube.com/@bmpromotion')
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
        label: 'dannyagii',
        async click() {
          await shell.openExternal('https://www.twitch.tv/dannyagii')
        }
      }
    ]
  },
]

module.exports = recomendation;
