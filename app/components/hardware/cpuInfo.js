const { cpu } = require('systeminformation');

class CpuInfo extends HTMLElement {
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
        background-color: rgba(0, 0, 255, 0.18);
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
    cardTitle.textContent = 'cpu';
    cardTitle.classList.add('card-title');

    // list
    const list = document.createElement('ul');
    list.classList.add('list');

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

      const infoList = [
        {
          name: 'manufacturer', type: manufacturer },
        { name: 'brand', type: brand },
        { name: 'speed', type: speed },
        { name: 'cores', type: cores },
        { name: 'physicalCores', type: physicalCores },
        { name: 'processors', type: processors },
        { name: 'vendor', type: vendor  },
        { name: 'family', type: family },
        { name: 'model', type: model }
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

customElements.define('cpu-info', CpuInfo);
