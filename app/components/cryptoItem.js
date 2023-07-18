const currency = Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'USD'
})

const balanceColor = percentage => {
  switch(true) {
    case percentage === 0:
      return 'coin-neutral'
    case percentage > 0:
      return 'coin-positive'
    case percentage < 0:
      return 'coin-negative'
  }
}

const resultBalance = percentage => {
  switch(true) {
    case percentage === 0:
      return 'neutral'
    case percentage > 0:
      return 'profit'
    case percentage < 0:
      return 'lost'
  }
}

class CryptoInfo extends HTMLElement {
  constructor() {
    super()
    this.name = ''
    this.symbol = ''
    this.image = ''
    this.price = 0
    this.percentage = 0
  }

  static get observedAttributes () {
    return ['name', 'symbol', 'image', 'price', 'percentage']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return
    this[name] = newValue
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    
    const styles = document.createElement('style');
    
    styles.textContent = `
      .container {
        background-color: rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        padding: 16px;
        margin: 16px 8px;
        display: flex;
        align-items: center;
      }
      
      .container strong {
        font-size: 15px;
        margin-left: 15px;
      }
      
      .crypto-logo {
        margin-right: 20px;
        border-radius: 50%;
        width: 90px;
        height: 90px;
      }
      
      .coin-neutral, .coin-positive, .coin-negative {
        background-color: #000;
        font-weight: bold;
      }
      
      .coin-neutral {
        color: #fff;
      }

      .coin-positive {
        color: #0f0;
      }
      
      .coin-negative {
        color: #f00;
      }
    `
    
    // container
    const listItem = document.createElement('figure')
    listItem.classList.add('container')
    
    const cryptoLogo = document.createElement('img')
    cryptoLogo.src = this.image
    cryptoLogo.alt = this.name
    cryptoLogo.classList.add('crypto-logo')
    
    const container = document.createElement('figcaption')
    
    const containerName = document.createElement('p')
    containerName.innerHTML = `${this.name} <strong>(${this.symbol.toUpperCase()})</strong>`
    
    const containerPrice = document.createElement('p')
    containerPrice.innerHTML = `price: <strong>${currency.format(this.price)} USD</strong>`
    
    const containerBalance = document.createElement('p')
    containerBalance.textContent = `balance: ${this.percentage} % "${resultBalance(this.percentage)}"`
    containerBalance.classList.add(balanceColor(this.percentage))
    
    container.append(containerName, containerPrice, containerBalance)
    
    listItem.append(cryptoLogo, container)
    
    shadowRoot.append(styles, listItem)
  }
}

customElements.define('crypto-info', CryptoInfo)
