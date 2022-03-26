// links
const links = require('./links')

// navbar component
class NavBarStack extends HTMLElement {
  constructor() {
    super()
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
      
      /* sidenav*/
      .sidenav {
        height: auto;
        width: 200px;
        position: fixed;
        overflow-x: hidden;
        margin-left: 5px;
      }
      
      .sidenav-title {
        padding-block: .5em;
        margin-inline: .6em;
        color: #fff;
      }
      
      .sidenav-logo {
        width: 128px;
        height: 128px;
        display: block;
        padding-top: .5em;
        margin-inline: auto;
        filter: drop-shadow(2px 4px 6px #000);
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

    const navbarComponent = document.createElement('nav')
    navbarComponent.classList.add('sidenav', 'glass')

    // header
    const headerComponent = document.createElement('header')
    const titleComponent = document.createElement('h1')
    const logo = document.createElement('img')
    
    // logo
    logo.src = '../logo.png'
    logo.alt = 'brand logo'
    logo.classList.add('sidenav-logo')
    
    // title
    titleComponent.textContent = 'menu Tools'
    titleComponent.classList.add('sidenav-title')

    headerComponent.append(logo, titleComponent)

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

    navbarComponent.append(headerComponent, listComponent)

    shadowRoot.append(styles, navbarComponent)
  }
}

// custom tag
customElements.define('navbar-stack', NavBarStack)
