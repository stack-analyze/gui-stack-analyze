const { join } = require('node:path')
const { dialog } = require('electron')

module.exports = {
  label: 'About tools',
  click() {
    dialog.showMessageBoxSync({
      icon: join(__dirname, '../icons/icon.png'),
      type: 'info',
      buttons: ['OK'],
      title: 'stack analyze tools',
      message: `
        developer and design: omega5300
        tools:
          - tech stack: npm versions 1.0.4 - 1.0.5
          - pagespeed: npm version 1.0.7
          - html validator: exclusive tool
          - github info: npm version 1.0.9
          - anime search: npm version 1.0.9
          - hardware information: npm versions 1.1.0 - 1.1.1
          - crypto market: npm version 1.1.3
          - bitly info: npm version 1.1.4
          - movie search (movie info): npm version 1.1.5
          - twitch info (now twitch search): npm version 1.1.7
          - webscraping: npm version 1.1.9
          - password generator: npm versions 1.2.0 - 1.2.1
          - bundlephobia: npm version 1.2.3
          - pokemon info: npm version 1.2.5
          - wallpapers: npm version 1.2.7
          - css validate: npm version 1.2.9
          - deezer search: npm versions 1.3.0 - 1.3.1
          - potter search: npm version 1.3.3
          - poker rules: npm version 1.3.5
          - quotes tool: npm version 1.3.7
      `
    })
  }
}
