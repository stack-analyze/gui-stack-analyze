const { format } = require('timeago.js')

class AnimeCard extends HTMLElement {
  constructor() {
    super()
    this.image
    this.type
    this.rating
    this.name
    this.subname
    this.episodes
    this.sypnosis
    this.debut
    this.finish
    this.status
  }

  static get observedAttributes() {
    return ['image', 'type', 'rating', 'name', 'subname', 'episodes', 'sypnosis', 'debut', 'finish', 'status']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    this[name] = newValue
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')
    styles.textContent = `
      .card {
        color: #ffF;
        padding: 20px;
        background-color: rgba(0, 0, 0, 0.30);
        backdrop-filter: blur(4px);
        box-shadow: 0 0 20px #000;
        border-top: 2px solid rgba(255, 255, 255, 0.25);
        border-left: 2px solid rgba(255, 255, 255, 0.2);
      }

      .card-episodes {
        text-align: center;
        margin-top: .6rem;
      }

      .card-image {
        width: 150px;
        border-radius: 50%;
        border: 2px solid #fff;
        display: block;
        margin-inline: auto;
      }

      .card-title {
        font-size: 1.3em;
        text-align: center;
        margin-block: .6rem;
      }

      .card-details {
        font-size: 1em;
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .date {
        border-radius: 10px;
        padding: 8px;
      }

      .date-debut {
        background-color: rgba(0, 255, 0, .4);
      }
      
      .date-final {
        background-color: rgba(255, 0, 0, .4);
      }      
    `

    const cardContainer = document.createElement('article')
    cardContainer.classList.add('card')

    const cardHeader = document.createElement('figure')

    const cardImage = document.createElement('img')
    cardImage.src = this.image
    cardImage.alt = this.title
    
    const cardDetails = document.createElement('figcaption')
    cardDetails.textContent = `rating: ${this.rating} episodes: ${this.episodes || 'current'}`

    cardHeader.append(cardImage, cardDetails)

    const cardTitle = document.createElement('h2')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = this.name

    const cardSubtitle = document.createElement('strong')
    cardSubtitle.textContent = this.subname

    const cardSypnosis = document.createElement('p')
    cardSypnosis.classList.add('card-sypnosis')
    cardSypnosis.textContent = this.sypnosis

    const cardFooter = document.createElement('footer')
    cardFooter.classList.add('card-footer')

    const debutDate = document.createElement('time')
    debutDate.classList.add('date', 'date-debut')
    debutDate.dateTime = this.debut
    debutDate.textContent = format(this.debut)
    
    const contentType = document.createElement('span')
    contentType.textContent = this.type

    cardFooter.append(debutDate, contentType)

    if (!this.finish) {
      const status = document.createElement('span')
      status.classList.add('date', 'date-final')
      status.textContent = this.status
      
      cardFooter.append(status)
    } else {
      const finishDate = document.createElement('time')
      finishDate.classList.add('date', 'date-final')
      finishDate.dateTime = this.finish
      finishDate.textContent = format(this.finish)
      
      cardFooter.append(finishDate)
    }

    cardContainer.append(cardHeader, cardTitle, cardSubtitle, cardSypnosis, cardFooter)

    shadowRoot.append(styles, cardContainer)
  }
}

customElements.define('anime-card', AnimeCard)
