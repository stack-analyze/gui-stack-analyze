// component
require('../components/navbar_component.js')

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
const toast = require('../scripts/toast')

// DOM elements
const cpuInfo = document.getElementById('cpu-info')
const ramInfo = document.getElementById('ram-info')
const osInfoContent = document.getElementById('os-info')
const disksInfo = document.getElementById('disks-info')
const controllersInfo = document.getElementById('controller-info')
const displaysInfo = document.getElementById('display-info')
const biosDetails = document.getElementById('bios-info')
const boardInfo = document.getElementById('board-info')
const tabcontents = document.querySelectorAll('.tab-content')
const tablinks = document.querySelectorAll('.tab-links')

// tabs
tablinks.forEach((tablink, i) => {
  tablink.addEventListener('click', () => {
    tablinks.forEach((tablink, i) => {
      tablink.classList.remove('active')
      tabcontents[i].style.display = "none";
    })
    
    tabcontents[i].style.display = "block";
    tablink.classList.add('active')
  })
})

// functions
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
    - manufacturer: ${manufacturer}
    - brand: ${brand}
    - speedMin: ${speed}
    - cores: ${cores}
    - physicalCores: ${physicalCores}
    - processors: ${processors}
    - vendor: ${vendor}
    - family: ${family}
    - model: ${model} 
  `
  } catch (err) {
    toast(err.message)
    console.error(err.message)
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
    toast(err.message)
    console.error(err.message)
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
    toast(err.message)
    console.error(err.message)
  }
}

async function diskInfo() {
  try {
    const disks = await diskLayout()

    // render disks info
    disks.map(({ type, name, vendor, size, interfaceType }) => {

      // items
      const diskItem = document.createElement('li')
      const diskTitle = document.createElement('strong')
      const diskDesc = document.createElement('p')


      // text content
      diskTitle.textContent = name
      diskTitle.classList.add('disk-title')
      diskDesc.textContent = `
        - disk type: ${type}
        - disk vendor: ${vendor}
        - disk size: ${(size / 1073741824).toFixed(2)} GB
        - disk interface: ${interfaceType}
      `
      diskDesc.classList.add('description')
      diskItem.classList.add('disk-item')

      // append main
      diskItem.appendChild(diskTitle)
      diskItem.appendChild(diskDesc)
      
      // append main
      disksInfo.appendChild(diskItem)
    })
  } catch (err) {
    toast(err.message)
    console.error(err.message)
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

      // items
      const controllerItem = document.createElement('li')
      const controllerTitle = document.createElement('strong')
      const controllerDesc = document.createElement('p')
      
      controllerTitle.textContent = model
      
      controllerDesc.textContent = `
        - controller vendor: ${vendor}
        - controller vram: ${vram < 1024 ? vram + ' MB' : (vram / 1024).toFixed(2) + ' GB'}
        - controller bus: ${bus}
      `
      controllerDesc.classList.add('description')
      controllerItem.classList.add('controller-item')

      // append
      controllerItem.appendChild(controllerTitle)

      controllerItem.appendChild(controllerDesc)

      controllersInfo.appendChild(controllerItem)
    })
  } catch (err) {
    toast(err.message)
    console.error(err.message)
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
      // items
      const displayItem = document.createElement('li')
      const displayTitle = document.createElement('strong')
      const displayDesc = document.createElement('p')
      
      displayTitle.textContent = model
      
      displayDesc.textContent = `
        - monitor type: ${main ? 'master monitor' : 'slave monitor'}
        - tpye: ${connection}
        - resolution: ${resolutionX} x ${resolutionY}
      `
      displayDesc.classList.add('description')
      displayDesc.classList.add('display-item')

      // append 
      displayItem.appendChild(displayTitle)
      displayItem.appendChild(displayDesc)

      displaysInfo.appendChild(displayItem)
    })
  } catch (err) {
    toast(err.message)
    console.error(err.message)
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
    toast(err.message)
    console.error(err.message)
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
    toast(err.message)
  }
}

cpuShow()
ramMem()
osDetails()
diskInfo()
ControllerInfo()
displayInfo()
biosInfo()
systemInfo()

// pc processes
ipcRenderer.on('clear-stack', async () => {
  try {
    const { timezone } = await time()
    alert(`delete analyze not available in this tool but you observer the current timezone is: ${timezone}
    `)
  } catch (err) {
    alert(err.message)
  }
})
