// modules
const { ipcRenderer } = require('electron')
const {
  cpu,
  mem,
  osInfo,
  diskLayout,
  graphics,
  bios,
  baseboard,
  time
} = require('systeminformation')
const { Tabs, toast } = require('materialize-css')

// DOM elements
const cpuInfo = document.getElementById('cpu-info')
const ramInfo = document.getElementById('ram-info')
const osInfoContent = document.getElementById('os-info')
const disksInfo = document.getElementById('disks-info')
const controllersInfo = document.getElementById('controller-info')
const displaysInfo = document.getElementById('display-info')
const biosDetails = document.getElementById('bios-info')
const boardInfo = document.getElementById('board-info')
const elems = document.querySelectorAll('.tabs')

async function cpuShow() {
  try {
    const {
      manufacturer,
      brand,
      speed,
      cores,
      physicalCores,
      processors,
      vendor,
      family,
      model
    } = await cpu();
    cpuInfo.textContent = `
    manufacturer: ${manufacturer}
    brand: ${brand}
    speedMin: ${speed}
    cores: ${cores}
    physicalCores: ${physicalCores}
    processors: ${processors}
    vendor: ${vendor}
    family: ${family}
    model: ${model} 
  `
  } catch (err) {
    toast({ html: err })
  }
}

async function ramMem() {
  try {
    const {
      total,
      free,
      used,
      active,
      available
    } = await mem()
    ramInfo.textContent = `
      - total: ${(total / 1073741824).toFixed(2)} GB
      - free: ${(free / 1073741824).toFixed(2)} GB
      - used: ${(used / 1073741824).toFixed(2)} GB
      - active: ${(active / 1073741824).toFixed(2)} GB
      - available: ${(available / 1073741824).toFixed(2)} GB
    `
  } catch (err) {
    toast({ html: err })
  }
}

async function osDetails() {
  try {
    const {
      hostname,
      platform,
      distro,
      release,
      kernel,
      arch,
      uefi
    } = await osInfo()

    osInfoContent.textContent = `
      - hostname: ${hostname}
      - platform: ${platform}
      - distro: ${distro}
      - release: ${release}
      - kernel: ${kernel}
      - arch: ${arch}
      - uefi: ${uefi ? 'uefi bios' : 'legacy bios'}
    `
  } catch (err) {
    toast({ html: err })
  }
}

async function diskInfo() {
  try {
    const disks = await diskLayout()

    // render disks info
    disks.map(({ type, name, vendor, size, interfaceType }) => {
      // list
      const diskList = document.createElement('ul')
      diskList.classList.add('hardware-list', 'col', 's6')

      // items
      const diskType = document.createElement('li')
      const diskName = document.createElement('li')
      const diskTitle = document.createElement('strong')
      const diskVendor = document.createElement('li')
      const diskSize = document.createElement('li')
      const diskInterface = document.createElement('li')

      // text content
      diskType.textContent = `disk type: ${type}`
      diskTitle.classList.add('disk-title')
      diskTitle.textContent = name
      diskVendor.textContent = `disk vendor: ${vendor}`
      diskSize.textContent = `disk size: ${(size / 1073741824).toFixed(2)} GB`
      diskInterface.textContent = `disk interface: ${interfaceType}`

      // append elems
      diskName.appendChild(diskTitle)
      diskList.appendChild(diskName)
      diskList.appendChild(diskType)
      diskList.appendChild(diskVendor)
      diskList.appendChild(diskSize)
      diskList.appendChild(diskInterface)

      // append main
      disksInfo.appendChild(diskList)
    })
  } catch (err) {
    toast({ html: err })
  }
}

async function ControllerInfo() {
  try {
    const { controllers } = await graphics()



    controllers.map(({
      model,
      vendor,
      vram,
      bus
    }) => {
      const controllerList = document.createElement('ul')
      controllerList.classList.add('hardware-list', 'col', 's6')

      // items
      const controllerName = document.createElement('li')
      const controllerTitle = document.createElement('strong')
      const controllerVendor = document.createElement('li')
      const controllerVram = document.createElement('li')
      const controllerBus = document.createElement('li')

      controllerTitle.textContent = model
      controllerVendor.textContent = `controller vendor: ${vendor}`
      controllerVram.textContent = vram < 1024 ? `controller vram: ${vram} MB` : `controller vram: ${(vram / 1024).toFixed(2)} GB`
      controllerBus.textContent = `controller bus: ${bus}`

      // append
      controllerName.appendChild(controllerTitle)

      controllerList.appendChild(controllerName)
      controllerList.appendChild(controllerVendor)
      controllerList.appendChild(controllerVram)
      controllerList.appendChild(controllerBus)

      controllersInfo.appendChild(controllerList)
    })
  } catch (err) {
    toast({ html: err })
  }
}
async function displayInfo() {
  try {
    const { displays } = await graphics()

    displays.map(({
      model,
      main,
      connection,
      resolutionX,
      resolutionY
    }) => {
      const displayList = document.createElement('ul')
      displayList.classList.add('hardware-list', 'col', 's6')

      // items
      const displayName = document.createElement('li')
      const displayTitle = document.createElement('strong')
      const displayMain = document.createElement('li')
      const displayConnection = document.createElement('li')
      const displayResolution = document.createElement('li')

      displayTitle.textContent = model
      displayMain.textContent = `monitor type: ${main ? 'master monitor' : 'slave monitor'}`
      displayConnection.textContent = `tpye: ${connection}`
      displayResolution.textContent = `resolution: ${resolutionX} x ${resolutionY}`

      // append
      displayName.appendChild(displayTitle)
      displayList.appendChild(displayName)
      displayList.appendChild(displayMain)
      displayList.appendChild(displayConnection)
      displayList.appendChild(displayResolution)

      displaysInfo.appendChild(displayList)
    })
  } catch (err) {
    toast({ html: err })
  }
}
async function biosInfo() {
  try {
    const {
      releaseDate,
      vendor,
      revision,
      version
    } = await bios();

    biosDetails.textContent = `
      - bios release date: ${releaseDate}
      - bios vendor: ${vendor}
      - bios revision: ${revision === "" ? "no info": revision}
      - bios version: ${version}
    `
  } catch (err) {
    toast({ html: err })
  }
}

async function systemInfo() {
  try {
    const {
      manufacturer,
      model,
      version,
      serial,
    } = await baseboard()

    boardInfo.textContent = `
      - board manufacturer: ${manufacturer}
      - board model: ${model}
      - board version: ${version}
      - board serial: ${serial === '' ? 'no serial info' : serial}
    `
  } catch (err) {
    toast({ html: err })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cpuShow()
  ramMem()
  osDetails()
  diskInfo()
  ControllerInfo()
  displayInfo()
  biosInfo()
  systemInfo()
  Tabs.init(elems)
})

// pc processes
ipcRenderer.on('clear-stack', async () => {
  try {
    const { timezone } = await time()
    alert(`delete analyze not available in this tool but you observer the current timezone is: ${timezone}
    `)
  } catch (err) {
    alert(err)
  }
})

