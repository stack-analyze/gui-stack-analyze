const { graphics } = require('systeminformation');

class DisplayInfo extends HTMLElement {
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
      }
      
      .card {
        background-color: rgba(0, 255, 0, 0.18);
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
      const { displays } = await graphics();
      
      displays.forEach(({
        model,
        main,
        connection,
        resolutionX,
        resolutionY
      }) => {
        // vram size
        const isMain = main ? 'master monitor' : 'slave monitor';

        const card = document.createElement('article');
        card.classList.add('card');
        
        const listTitle = document.createElement('strong');
        listTitle.textContent = model;
        listTitle.classList.add('card-title');

        const listElement = document.createElement('ul');
        listElement.classList.add('list');

        const monitorItem = document.createElement('li');
        monitorItem.textContent = `monitor type: ${isMain}`;
        
        const connectionItem = document.createElement('li');
        connectionItem.textContent = `type: ${connection}`;
        
        const resolutionItem = document.createElement('li');
        resolutionItem.textContent = `resolution: ${resolutionX} x ${resolutionY}`;

        listElement.append(monitorItem, connectionItem, resolutionItem);

        card.append(listTitle, listElement);
        
        container.append(card);
      });
      
      shadowRoot.append(styles, container);
    } catch (err) {
      shadowRoot.textContent = err.message;
    }
  }
}

customElements.define('display-info', DisplayInfo);
