// modules
const { format } = require('url')
const { join } = require('path')
const { app, BrowserWindow, Menu, dialog } = require('electron')

// message
const msg = require('./msg')

// window
let win
let htmlTool

// window function
const createWindow = () => {
  // create borwser window
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: false,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
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
    width: 800,
    height: 600,
    resizable: false,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

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
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(exclusiveToolMenu)
  htmlTool.setMenu(menu)
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
