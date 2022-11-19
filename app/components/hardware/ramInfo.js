const { mem } = require('systeminformation');

class RamInfo extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    // shadow root
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    // styles
    const styles = document.createElement('style');

    styles.textContent = `
      .card {
        background-color: rgba(255, 0, 0, 0.18);
        box-shadow: 0 8px 32px 0 rgba( 255, 255, 255, 0.27 );
        backdrop-filter: blur(20px);
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        border-radius: 20px;
        width: 80%;
        max-width: 100%;
      }

      .card-title {
        display: block;
        font-weight: bold;
        padding-block: 5px;
        text-align: center;
        text-transform: capitalize;
      }

      .list {
        list-style: none;
      }
    `;

    // card
    const card = document.createElement('section');
    card.classList.add('card');
    
    // card title
    const cardTitle = document.createElement('strong');
    cardTitle.textContent = 'Ram Info';
    cardTitle.classList.add('card-title');

    // list
    const list = document.createElement('ul');
    list.classList.add('list');

    try {
      const {
      total,
      free,
      used,
      active,
      available
    } = await mem();

      const infoList = [
        { name: 'total', type: `${(total / 1073741824).toFixed(2)} GB` },
        { name: 'free', type: `${(free / 1073741824).toFixed(2)} GB` },
        { name: 'used', type: `${(used / 1073741824).toFixed(2)} GB` },
        { name: 'active', type: `${(active / 1073741824).toFixed(2)} GB` },
        { name: 'available', type: `${(available / 1073741824).toFixed(2)} GB` }
      ];

      infoList.forEach(({name, type}) => {
        const item = document.createElement('li');
        item.textContent = `${name}: ${type}`;

        list.append(item);
      });

      card.append(cardTitle, list);

      shadowRoot.append(styles, card);
    } catch (err) {
      shadowRoot.textContent = err.message;
    }
  }
}

customElements.define('ram-info', RamInfo);
