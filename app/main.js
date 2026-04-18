// modules
const { join } = require('node:path')
const { app, BrowserWindow, Menu, } = require('electron/main')

const {
  isMac, macMenu, fileMenu, helpMenu
} = require('./TemplateMenu.js')

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
      preload: join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: false,
    icon: join(__dirname, '../icons/icon.png'),
  })

  // and load the index.html of the app.
  win.loadFile(join(__dirname, 'index/index.html'))

  const radioWindow = () => {
    const radio = new BrowserWindow({
      parent: win,
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      icon: join(__dirname, '../icons/icon.png'),
      title: 'radio stations',
      modal: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    })

    radio.setMenuBarVisibility(false)
    radio.loadFile(join(__dirname, 'radio/index.html'))
    radio.once('ready-to-show', () => radio.show())
  }

  // main menu template
  const templateMenu = [
    ...(macMenu),
    fileMenu,
    {
      label: 'radio stations',
      accelerator: isMac ? 'Comand+R' : 'Ctrl+R',
      click() { radioWindow() }
    },
    {
      label: 'Option',
      submenu: [
        {
          label: 'delete analyzer',
          accelerator: isMac ? 'Comand+D' : 'Ctrl+D',
          click() {
            win.webContents.send('clear-stack')
          }
        },
      ]
    },
    helpMenu
  ]

  // menu bar
  const menu = Menu.buildFromTemplate(templateMenu)

  // Set The Menu to the Main Window
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})
