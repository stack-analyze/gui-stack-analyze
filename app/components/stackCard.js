const { shell } = require('electron');

class DeltaCard extends HTMLElement {
  constructor() {
    super();
    this.cardTitle = '';
    this.image = '';
    this.alt = '';
    this.link = '';
    this.categories = '';
  }

  static get observedAttributes() {
    return ['name', 'image', 'alt', 'link', 'categories'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });

    const styles = document.createElement('style');

    styles.textContent = `
      .card {
        max-height: 40rem;
      }

      .card-title {
        font-weight: bold;
        font-size: 1.5em;
        text-align: center;
      }

      .card-header {
        margin: 2rem 1rem;
      }

      .card-image {
        display: block;
        margin-inline: auto;
        width: 8rem;
        filter: drop-shadow(0 0 0.55rem var(--image-shadow));
        image-resolution: 300dpi;
      }

      .card-body {
        margin: 0 2.5rem 1rem;
      }

      .card-glass {
        background-color: var(--background-glass);
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.47 );
        backdrop-filter: blur(20px);
        border-radius: 20px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
      }

      .card-btn {
        all: unset;
        cursor: pointer;
        display: block;
        font-weight: bold;
        max-width: 100%;
        width: var(--card-btn-width);
        height: var(--card-btn-height);
        padding: 4px 2px;
        border-radius: 15px;
        text-align: center;
        outline: 2px solid var(--card-btn);
        margin-inline: auto;
        line-height: 50px;
      }

      @media(hover: hover) {
        .card-btn:hover {
          background-color: var(--card-btn);
          color: #fff;
          text-decoration: underline;
        }
      }
    `;

    // card element
    const card = document.createElement('article');
    card.classList.add('card-glass', 'card');

    // card header and image
    const cardHeader = document.createElement('figure');
    cardHeader.classList.add('card-header');

    // image
    const cardImage = document.createElement('img');
    cardImage.src = this.image;
    cardImage.alt= this.alt;
    cardImage.classList.add('card-image');
    
    cardHeader.appendChild(cardImage);

    // card title
    const cardTitle = document.createElement('figcaption');
    cardTitle.textContent = this.cardTitle;
    cardTitle.classList.add('card-title');

    // card body and content elements
    const cardBody = document.createElement('section');
    cardBody.classList.add('card-body');

    const categories = document.createElement('p');
    categories.textContent = this.categories;

    const link = document.createElement('a');
    link.href = this.link;
    link.target = '_blank';
    link.textContent = 'web tech';
    link.classList.add('card-btn');

    cardBody.append(categories, link);
    
    // append elements
    card.append(cardHeader, cardTitle, cardBody);
    
    shadowRoot.append(styles, card);

    shadowRoot.addEventListener('click', e => {
      if(e.target.tagName === 'A' && e.target.href.startsWith('http')) {
        e.preventDefault();
        shell.openExternal(e.target.href);
      }
    });
  }
}

customElements.define('stack-card', DeltaCard);
