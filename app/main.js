// modules
const { join } = require('path')
const { app, BrowserWindow, Menu, dialog, shell } = require('electron')

// message
const msg = require('./msg')

// recomendation
const recomendation = require('./recomendation')

// mac os
const isMac = process.platform === 'dawin'

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
        isMac ? { role: 'close' } : { role: 'quit' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' }
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
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About tool',
          click() {
            dialog.showMessageBoxSync({
              icon: join(__dirname, '../icons/icon.png'),
              type: 'info',
              buttons: ['OK'],
              title: 'tech stack and pagespeed',
              detail: 'all stack analyze tools',
              message: 'developers and design: omega5300'
            })
          }
        },
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
