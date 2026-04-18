const { audio, stopRadio } = require('./audio')

class StationItem extends HTMLElement {
  constructor() {
    super()
    this.src = ''
    this.name = ''
    this.language = ''
    this.codec = ''
  }

  static get observedAttributes() {
    return ['src', 'name', 'codec', 'language']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    this[name] = newValue
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' })
    const styles = document.createElement('style')

    // styles
    styles.textContent = `
    .station-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      
      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    }
    
    .station-info {
      flex: 1;
      min-width: 0;
    }
    
    .station-name {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .station-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .codec-badge {
      background: rgba(255, 255, 255, 0.1);
      padding: 0.15rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .station-play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;

      &:hover {
        background: rgba(99, 102, 241, 0.5);
        scale: 1.05;
      }
    }`

    // items
    const stationItem = document.createElement('li')
    stationItem.classList.add('station-item')
    const stationInfo = document.createElement('div')
    stationInfo.classList.add('station-info')
    const stationName = document.createElement('p')
    stationName.classList.add('station-name')
    const stationMeta = document.createElement('div')
    stationMeta.classList.add('station-meta')
    const stationLang = document.createElement('span')
    const stationCodec = document.createElement('span')
    stationCodec.classList.add('codec-badge')
    const stationBtn = document.createElement('button')
    stationBtn.classList.add('station-play-btn')
    const stationIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    // svg
    stationIcon.setAttributeNS(null, 'width', 18)
    stationIcon.setAttributeNS(null, 'height', 18)
    stationIcon.setAttributeNS(null, 'fill', 'currentColor')
    stationIcon.viewBox.baseVal.x = 0
    stationIcon.viewBox.baseVal.y = 0
    stationIcon.viewBox.baseVal.width = 24
    stationIcon.viewBox.baseVal.height = 24
    const playDesign = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    playDesign.setAttributeNS(null, 'points', '5,3 19,12 5,21')
    stationIcon.append(playDesign)

    // text content
    stationName.textContent = this.name
    stationLang.textContent = this.language
    stationCodec.textContent = this.codec


    // event
    stationBtn.addEventListener('click', () => {
      if (!audio.paused) {
        audio.pause()
        audio.load()
      }

      audio.src = this.src
      audio.play()

      stopRadio.classList.add('enabled')
    })

    // append elements
    stationInfo.append(stationName, stationMeta)
    stationMeta.append(stationLang, stationCodec)
    stationBtn.append(stationIcon)
    stationItem.append(stationInfo, stationMeta, stationBtn)
    shadowRoot.append(styles, stationItem)
  }
}

customElements.define('station-item', StationItem)
