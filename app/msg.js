// modules for message
const { author, license } = require('../package.json')
const { app } = require('electron')

// export message
module.exports = `
    inspired from version 1.0.5 the cli edition of stack-analyze:
    app version: ${app.getVersion()}
    node version: ${process.versions.node}
    electron version: ${process.versions.electron}

    main development: Julian David Cordoba torres (omega5300).

    community: ${author}, license: ${license}
`
