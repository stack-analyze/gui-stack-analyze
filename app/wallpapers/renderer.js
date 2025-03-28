// modules
const { ipcRenderer } = require('electron')

// DOM Element
const wallpaperSelect = document.querySelector('#wallpaper-selector')
const wallpaperElement = document.querySelector('#wallpapers')
const stackPopover = document.querySelector('#stack')

// wallpaper list
const wallpaperOptions = ['sol-moon', 'dimensions', 'seyyahi2']
const wallapersList = {
  'sol-moon': [...Array(20).keys()],
  dimensions: [...Array(12).keys()],
  seyyahi2: [...Array(14).keys()]
}

// events
wallpaperSelect.addEventListener('change', () => {
  if (wallpaperOptions.includes(wallpaperSelect.value)) {
    wallpaperElement.innerHTML = ""

    wallapersList[wallpaperSelect.value].forEach(i => {
      const wallpaperName = `${wallpaperSelect.value}-${i + 1}.jpeg`

      const wallaperItem = document.createElement('div')
      wallaperItem.classList.add('wallpaper-section', 'glass')

      const wallaperImage = document.createElement('img')
      wallaperImage.src = `../images/${wallpaperSelect.value}/${wallpaperName}`

      const wallaperDownload = document.createElement('a')
      wallaperDownload.classList.add('download-btn', 'full-btn')
      wallaperDownload.textContent = `download: ${wallpaperName.replace('.jpeg', '')}`
      wallaperDownload.href = `../images/${wallpaperSelect.value}/${wallpaperName}`
      wallaperDownload.download = wallpaperName

      wallaperItem.append(wallaperImage, wallaperDownload)
      wallpaperElement.append(wallaperItem)
    })
  } else {
    wallpaperElement.innerHTML = ""
  }
})

ipcRenderer.on('clear-stack', async () => {
  // stackPopover.togglePopover()
  !stackPopover.open
    ? stackPopover.showModal()
    : stackPopover.close()
})
