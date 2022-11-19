// components
require('../components/hardware/cpuInfo')
require('../components/hardware/diskInfo')
require('../components/hardware/displayInfo')
require('../components/hardware/graphicsInfo')
require('../components/hardware/osDetail')
require('../components/hardware/ramInfo')
require('../components/hardware/boardInfo')
require('../components/hardware/biosInfo')

// modules
const { ipcRenderer } = require('electron')

// modal element
const modal = document.querySelector('dialog')
const example = document.querySelector('button')

// pc processes
ipcRenderer.on('clear-stack', async () => {
  !modal.open
    ? modal.showModal()
    : modal.close()
})
