// modules
const { join } = require('node:path')
const { 
  app, BrowserWindow, Menu, dialog, shell
} = require('electron')
// message
const msg = require('./msg')

// about tools
const aboutTools  = require('./aboutTools')

// recomendation
const recomendation = require('./recomendation')

// mac os
const isMac = process.platform === 'dawin'

app.disableHardwareAcceleration()

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    minWidth: 1024,
    height: 768,
    minHeight: 768,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js')
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png')
  })

  // and load the index.html of the app.
  win.loadFile(join(__dirname, 'index/index.html'))

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
      label: 'Option',
      submenu: [
        {
          label: 'delete analyzer',
          accelerator: process.platform === 'darwin' ? 'Comand+D' : 'Ctrl+D',
          click() {
            win.webContents.send('clear-stack')
          }
        },
      ]
    },
    {
      label: 'Help',
      submenu: [
        aboutTools,
        {
          label: 'About App',
          accelerator: 'F1',
          click() {
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
          async click() {
            await shell.openExternal(
              'https://github.com/intermachine-developers/gui-stack-analyze/wiki'
            )
          }
        },
        {
          label: 'Github',
          async click() {
            await shell.openExternal(
              'https://github.com/intermachine-developers/gui-stack-analyze'
            )
          }
        }
      ]
    }
  ]

  // menu bar
  const menu = Menu.buildFromTemplate(templateMenu)

  // Set The Menu to the Main Window
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
