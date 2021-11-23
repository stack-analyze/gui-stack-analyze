// links
const links = require('./links')

// navbar component
class NavBarStack extends HTMLElement {
  constructor() {
    super()
    this.title
  }

  static get observedAttributes() {
    return ['title'];
  }

  connectedCallback() {
    // element
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')

    styles.textContent = `
      /* glass style*/
      .glass {
        background: rgba( 255, 255, 255, 0.10 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 10px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
      }
      
      /* toolbar title tool*/
      .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        color: #fff;
        user-select: none;
      }
      
      /* sidenav*/
      .sidenav {
        height: 70vh;
        width: 200px;
        z-index: 1;
        position: fixed;
        overflow-x: hidden;
        padding-top: 20px;
        margin-top: 3vh;
      }
      
      .sidenav-menu {
        list-style: none;
      }
      
      .sidenav-menu-button {
        padding-top: 6px;
        padding-bottom: 6px;
        text-decoration: none;
        font-size: 20px;
        color: #eee;
        display: block;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
      }
      
      .sidenav-menu-button:hover {
        color: #111;
      }
    `

    const headerComponent = document.createElement('header')
    headerComponent.classList.add('glass')

    const TitleComponent = document.createElement('h1')
    TitleComponent.classList.add('brand')
    TitleComponent.textContent = this.title

    headerComponent.appendChild(TitleComponent)

    const navbarComponent = document.createElement('nav')
    navbarComponent.classList.add('sidenav', 'glass')

    const listComponent = document.createElement('ul')
    listComponent.classList.add('sidenav-menu')

    links.forEach(link => {
      const itemComponent = document.createElement('li')
      
      const linkComponent = document.createElement('a')
      linkComponent.classList.add('sidenav-menu-button')
      
      linkComponent.href = link.page
      linkComponent.title = link.title
      linkComponent.textContent = link.title

      itemComponent.append(linkComponent)
      
      listComponent.append(itemComponent)
    })

    navbarComponent.appendChild(listComponent)

    shadowRoot.append(styles, headerComponent, navbarComponent)
  }
}

// custom tag
customElements.define('navbar-stack', NavBarStack)
