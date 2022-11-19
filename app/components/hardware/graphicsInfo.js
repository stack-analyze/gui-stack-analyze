const { graphics } = require('systeminformation');

class ControllerInfo extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    // shadow root
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    // styles
    const styles = document.createElement('style');

    styles.textContent = `
      .card-container {
        display: flex;
        flex-direction: column;
      }
      
      .card {
        background-color: rgba(19, 23, 28, 0.18);
        box-shadow: 0 8px 32px 0 rgba( 255, 255, 255, 0.27 );
        backdrop-filter: blur(20px);
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        border-radius: 20px;
        width: 80%;
        margin-right: 8px;
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
        diplay: inline-block;
      }
    `;
    
    const container = document.createElement('section');
    container.classList.add('card-container');

    try {
      const { controllers } = await graphics();
      
      controllers.forEach(({
        model,
        vendor,
        vram,
        bus
      }) => {
        // vram size
        const vramSize = vram < 1024 
          ? `${vram} MB`
          : `${(vram / 1024).toFixed(2)} GB`;

        const card = document.createElement('article');
        card.classList.add('card');
        
        const listTitle = document.createElement('storng');
        listTitle.textContent = model;
        listTitle.classList.add('card-title');

        const listElement = document.createElement('ul');
        listElement.classList.add('list');

        const vendorItem = document.createElement('li');
        vendorItem.textContent = `vendor: ${vendor}`;
        
        const vramItem = document.createElement('li');
        vramItem.textContent = `vram: ${vramSize}`;
        
        const busItem = document.createElement('li');
        busItem.textContent = `bus: ${bus}`;

        listElement.append(vendorItem, vramItem, busItem);

        card.append(listTitle, listElement);
        
        container.append(card);
      });
      
      shadowRoot.append(styles, container);
    } catch (err) {
      shadowRoot.textContent = err.message;
    }
  }
}

customElements.define('controller-info', ControllerInfo);
