const { join } = require('node:path')
const { app, dialog, shell } = require("electron/main")

// message
const msg = require('./msg')

// about tools
const aboutTools = require('./aboutTools')

// recomendation
const recomendation = require('./recomendation')

// mac os
const isMac = process.platform === 'darwin'

const macMenu = isMac ? [
  {
    label: app.name,
    submenu: [{ role: 'hide' }, { role: 'unhide' }, { role: 'quit' },]
  }
] : []

const fileMenu = {
  label: 'File',
  submenu: [
    { role: 'minimize' },
    isMac ? { role: 'close' } : { role: 'quit' }
  ]
}

const helpMenu = {
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

module.exports = { isMac, macMenu, fileMenu, helpMenu }
