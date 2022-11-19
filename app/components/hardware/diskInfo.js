const { diskLayout } = require('systeminformation');

class DiskInfo extends HTMLElement {
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
        background-color: rgba(0, 255, 255, 0.28);
        box-shadow: 0 8px 32px 0 rgba( 255, 255, 255, 0.27 );
        backdrop-filter: blur(20px);
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        border-radius: 20px;
        width: 80%;
        margin-bottom: 8px;
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
      const disks = await diskLayout();

      disks.forEach(({
        type,
        name,
        vendor,
        size,
        interfaceType
      }, i) => {
        // total disk size
        const diskSize = (size / 1073741824).toFixed(2)
        
        const card = document.createElement('article');
        card.classList.add('card');
        
        const cardTitle = document.createElement('strong');
        cardTitle.textContent = `disk ${i + 1}`;
        cardTitle.classList.add('card-title');

        const listElement = document.createElement('ul');
        listElement.classList.add('list');

        const typeDiskItem = document.createElement('li');
        typeDiskItem.textContent = `type: ${type}`;

        const nameDiskItem = document.createElement('li');
        nameDiskItem.textContent = `name: ${name}`;
        
        const vendorDiskItem = document.createElement('li');
        vendorDiskItem.textContent = `vendor: ${vendor}`;

        const sizeDiskItem = document.createElement('li');
        sizeDiskItem.textContent = `size: ${diskSize}`;

        const interfaceDiskItem = document.createElement('li');
        interfaceDiskItem.textContent = `interface: ${interfaceType}`;

        listElement.append(typeDiskItem, typeDiskItem, vendorDiskItem, sizeDiskItem, interfaceDiskItem);

        card.append(cardTitle, listElement);
        
        container.append(card);
      });
      
      shadowRoot.append(styles, container);
    } catch (err) {
      shadowRoot.textContent = err.message;
    }
  }
}

customElements.define('disk-info', DiskInfo);

