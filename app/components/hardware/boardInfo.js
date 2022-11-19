const { baseboard } = require('systeminformation');

class BoardInfo extends HTMLElement {
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
        background-color: rgba(0, 255, 255, 0.18);
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
    cardTitle.textContent = 'board';
    cardTitle.classList.add('card-title');

    // list
    const list = document.createElement('ul');
    list.classList.add('list');

    try {
      const {
        manufacturer,
        model,
        version,
        serial,
      } = await baseboard();

      const infoList = [
        { name: 'manufacturer', type: manufacturer },
        { name: 'model', type: model },
        { name: 'version', type: version },
        { name: 'serial', type: serial === '' ? 'no serial info' : serial },
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

customElements.define('board-info', BoardInfo);
