const { format } = require('timeago.js')

class MovieCard extends HTMLElement {
  constructor() {
    super()
    this.name
    this.poster
    this.sypnosis
    this.date
    this.language
    this.average
    this.count
  }
  
  static get observedAttributes () {
    return ['name', 'poster', 'sypnosis', 'date', 'language', 'average', 'count']
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    this[name] = newValue
  }
  
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    
    const styles = document.createElement('style');
    
    styles.textContent = `
      .card {
        background-color: rgba(0, 0, 0, 0.35);
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.47 );
        backdrop-filter: blur(20px);
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        border-radius: 20px;
        color: #fff;
        padding: 16px;
      }
      
      .card-image {
        display: block;
        margin-inline: auto;
        width: 250px;
      }
      
      .card-title {
        font-size: 1.3em;
        font-weight: bold;
        text-align: center;
      }
      
      .card-date {
        display: block;
        text-align: center;
        padding-bottom: 8px;
      }
      
      .card-footer {
        display: flex;
        justify-content: space-between;
      }
    `
    
    const movieItem = document.createElement('article')
    movieItem.classList.add('card')
    
    const cardHeader = document.createElement('figure')
    
    const cardImage = document.createElement('img')
    cardImage.classList.add('card-image')
    cardImage.src = this.poster
    cardImage.alt = this.name
    
    const cardTitle = document.createElement('figcaption')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = this.name
    
    cardHeader.append(cardImage, cardTitle)
    
    const cardTime = document.createElement('time')
    cardTime.classList.add('card-date')
    cardTime.datetime = this.date
    cardTime.textContent = `${this.date} - ${format(this.date)}`
    
    const cardSypnosis = document.createElement('p')
    cardSypnosis.classList.add('card-sypnosis')
    cardSypnosis.textContent = this.sypnosis
    
    const cardFooter = document.createElement('footer')
    cardFooter.classList.add('card-footer')
    
    const cardLanguage = document.createElement('span')
    cardLanguage.textContent = `language: ${this.language}`
    
    const cardAverage = document.createElement('span')
    cardAverage.textContent = `average: ${this.average}`
    
    const cardCount = document.createElement('span')
    cardCount.textContent = `count: ${this.count}`
    
    cardFooter.append(cardLanguage, cardAverage, cardCount)
    
    movieItem.append(cardHeader, cardSypnosis, cardTime, cardFooter)
    
    shadowRoot.append(styles, movieItem)
  }
}

customElements.define('movie-card', MovieCard)
