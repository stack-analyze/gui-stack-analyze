// modules for message
const { app } = require('electron')
const { author, license } = require('../package.json')

// export message
module.exports = `
    inspired from version 1.0.5 the cli edition of stack-analyze:
    app version: ${app.getVersion()}
    node version: ${process.versions.node}
    electron version: ${process.versions.electron}

    main development: Julian David Cordoba torres (omega5300).

    community: ${author} now stack-analyze, license: ${license}
`
