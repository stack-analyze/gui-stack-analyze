const { format } = require('timeago.js')

class TwitchCard extends HTMLElement {
  constructor() {
    super()
    this.username
    this.image
    this.date
    this.description
    this.type
    this.count
  }
  
  static get observedAttributes() {
    return ['username', 'image', 'date', 'description', 'type', 'count']
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    this[name] = newValue
  }
  
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    
    // twitch card styles
    const styles = document.createElement('style')
    styles.textContent = `
      .card {
        background-color: rgba( 130, 130, 130, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        border-radius: 10px;
        color: #fff;
        padding: 12px;
      }
      
      .card-header {
        margin: 0.3rem;
      }
      
      .card-title {
        text-align: center;
      }
      
      .card-details {
        display: flex;
        justify-content: space-between;
      }
      
      .card-image {
        display: block;
        margin-inline: auto;
        height: 200px;
      }
      
      .card-age {
        text-align: center;
      }
    `
    
    // card element
    const cardElement = document.createElement('article')
    cardElement.classList.add('card')
    
    // card header
    const cardHeader = document.createElement('figure')
    cardHeader.classList.add('card-header')
    
    // twitch profile image
    const cardImage = document.createElement('img')
    cardImage.classList.add('card-image')
    cardImage.src = this.image
    cardImage.alt = this.username
    
    // twitch account age info
    const twitchAge = new Date(this.date)
    
    const cardAge = document.createElement('figcaption')
    cardAge.classList.add('card-age')
    cardAge.textContent = `created at: ${twitchAge.toLocaleDateString()} - account age ${format(this.date)}`
    
    cardHeader.append(cardImage, cardAge)
    
    // twitch username
    const cardTitle = document.createElement('h2')
    cardTitle.textContent = this.username
    
    // details
    const cardDetails = document.createElement('p')
    cardDetails.classList.add('card-details')
    cardDetails.innerHTML = `
      <span>view count: ${this.count}</span>
      <span>broadcast: ${this.type || 'user'}</span>
    `
    
    const cardDescription = document.createElement('p')
    cardDescription.classList.add('card-description')
    cardDescription.textContent = this.description || 'no description'
    
    cardElement.append(cardHeader, cardTitle, cardDetails, cardDescription)
    
    shadowRoot.append(styles, cardElement)
  }
}

customElements.define('twitch-card', TwitchCard)
