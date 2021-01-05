// modules
const { format } = require('url')
const { join } = require('path')
const { app, BrowserWindow, Menu, dialog } = require('electron')

// message
const msg = require('./msg')

// recomendation
const recomendation = require('./recomendation')

// window
let win
let pagespeed
let htmlTool
let github
let anime

// window function
const createWindow = () => {
  // create borwser window
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

  win.show()

  // load index.html in the app
  win.loadURL(
    format({
      pathname: join(__dirname, 'index/index.html'),
      protocol: 'file',
      slashes: true
    })
  )

  // Emitted when the window is closed.
  win.on('closed', () => (win = null))
}

function htmlValidator () {
  htmlTool = new BrowserWindow({
    width: 940,
    height: 680,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

  htmlTool.show()

  htmlTool.loadURL(
    format({
      pathname: join(__dirname, 'html-validator/index.html'),
      protocol: 'file',
      slashes: true
    })
  )

  // html validator menu
  const exclusiveToolMenu = [
    {
      label: 'validator tool',
      submenu: [
        {
          label: 'delete validator',
          click () {
            htmlTool.webContents.send('clear-validator')
          }
        },
        {
          label: 'About tool',
          click () {
            dialog.showMessageBoxSync({
              icon: join(__dirname, '../icons/icon.png'),
              type: 'info',
              buttons: ['OK'],
              title: 'HTML validator',
              detail: 'exclusive tool for stack-analyze-gui analyze HTML page',
              message: 'developer and design: omega5300'
            })
          }
        },
        { role: 'close' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(exclusiveToolMenu)
  htmlTool.setMenu(menu)
  htmlTool.on('closed', () => (htmlTool = null))
}

function pagespeedTool () {
  pagespeed = new BrowserWindow({
    width: 1024,
    height: 768,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

  pagespeed.show()

  pagespeed.loadURL(
    format({
      pathname: join(__dirname, 'pagespeed/index.html'),
      protocol: 'file',
      slashes: true
    })
  )

  // pagespeed menu
  const pagespeedToolMenu = [
    {
      label: 'pagespeed tool',
      submenu: [
        { role: 'reload' },
        {
          label: 'About tool',
          click () {
            dialog.showMessageBoxSync({
              icon: join(__dirname, '../icons/icon.png'),
              type: 'info',
              buttons: ['OK'],
              title: 'pagespeed tool',
              detail: 'pagespeed tool for stack-analyze-gui ',
              message: 'developer and design: omega5300'
            })
          }
        },
        { role: 'close' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(pagespeedToolMenu)
  pagespeed.setMenu(menu)
  pagespeed.on('closed', () => (github = null))
}

function githubInfo () {
  github = new BrowserWindow({
    width: 900,
    height: 550,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

  github.show()

  github.loadURL(
    format({
      pathname: join(__dirname, 'github-info/index.html'),
      protocol: 'file',
      slashes: true
    })
  )

  // github info menu
  const githubToolMenu = [
    {
      label: 'github info tool',
      submenu: [
        {
          label: 'clear info',
          click () {
            github.webContents.send('clear-info')
          }
        },
        {
          label: 'About tool',
          click () {
            dialog.showMessageBoxSync({
              icon: join(__dirname, '../icons/icon.png'),
              type: 'info',
              buttons: ['OK'],
              title: 'github info',
              detail: 'github info tool for stack-analyze-gui ',
              message: 'developer and design: omega5300'
            })
          }
        },
        { role: 'close' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(githubToolMenu)
  github.setMenu(menu)
  github.on('closed', () => (github = null))
}

// anime tool
function animeSearch () {
  anime = new BrowserWindow({
    width: 1024,
    height: 768,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation : false
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

  anime.show()

  anime.loadURL(
    format({
      pathname: join(__dirname, 'anime-search/index.html'),
      protocol: 'file',
      slashes: true
    })
  )

  // github info menu
  const animeToolMenu = [
    {
      label: 'anime search tool',
      submenu: [
        {
          label: 'clear search',
          click () {
            anime.webContents.send('clear-anime-list')
          }
        },
        {
          label: 'About tool',
          click () {
            dialog.showMessageBoxSync({
              icon: join(__dirname, '../icons/icon.png'),
              type: 'info',
              buttons: ['OK'],
              title: 'anime search',
              detail: 'anime search tool for stack-analyze-gui ',
              message: 'developer and design: omega5300'
            })
          }
        },
        { role: 'close' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(animeToolMenu)
  anime.setMenu(menu)
  anime.on('closed', () => (anime = null))
}


// mac os
const isMac = process.platform === 'dawin'

// main menu template
const templateMenu = [
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [{ role: 'hide' }, { role: 'unhide' }, { role: 'quit' }]
      }
    ]
    : []),
  {
    label: 'File',
    submenu: [
      { role: 'minimize' },
      { role: 'toggleDevTools' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'delete analyzer',
        accelerator: process.platform === 'darwin' ? 'Comand+D' : 'Ctrl+D',
        click () {
          win.webContents.send('clear-stack')
        }
      }
    ]
  },
  {
    label: 'Exclusive tool',
    submenu: [
      {
        label: 'html validator',
        accelerator: 'Ctrl+H',
        click () {
          htmlValidator()
        }
      }
    ]
  },
  {
    label: 'Other tools',
    submenu: [
      {
        label: 'pagespeed',
        accelerator: 'Ctrl+P',
        click () {
          pagespeedTool()
        }
      },
      {
        label: 'github info',
        accelerator: 'Ctrl+G',
        click () {
          githubInfo()
        }
      },
      {
        label: 'anime search',
        accelerator: 'Ctrl+S',
        click () {
          animeSearch()
        }
      },
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About tool',
        click () {
          dialog.showMessageBoxSync({
            icon: join(__dirname, '../icons/icon.png'),
            type: 'info',
            buttons: ['OK'],
            title: 'tech stack and pagespeed',
            detail: 'pagespeed and tech stack analyze tools',
            message: 'developers and design: omega5300'
          })
        }
      },
      {
        label: 'About App',
        accelerator: 'F1',
        click () {
          dialog.showMessageBoxSync({
            icon: join(__dirname, '../icons/icon.png'),
            type: 'none',
            buttons: ['OK'],
            title: app.name,
            message: msg
          })
        }
      },
      {
        label: 'Recomendation',
        submenu: recomendation
      },
      {
        label: 'Learn wiki',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://github.com/intermachine-developers/gui-stack-analyze/wiki'
          )
        }
      },
      {
        label: 'Github',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal(
            'https://github.com/intermachine-developers/gui-stack-analyze'
          )
        }
      }
    ]
  }
]

// initialization app
app.on('ready', () => {
  createWindow()

  // menu bar
  const menu = Menu.buildFromTemplate(templateMenu)

  // Set The Menu to the Main Window
  Menu.setApplicationMenu(menu)
})

// render process
app.allowRendererProcessReuse = true

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
