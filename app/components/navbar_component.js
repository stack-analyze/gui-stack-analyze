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
        padding: 1rem;
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
      
      .menu-tool:not(:last-child) {
        margin-bottom: 12px
      }
      
      .menu-tille {
        color: #f1f1f1;
        font-weight: bold;
        font-size: 1.2em;
        cursor: pointer;
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

    const listComponent = document.createDocumentFragment();
    
    // wallpapers item
    const wallpaperLink = document.createElement('a')
    wallpaperLink.classList.add('sidenav-menu-button')
    wallpaperLink.textContent = 'wallpapers'
    wallpaperLink.href = '../wallpapers/index.html'
    wallpaperLink.title = 'go to wallpapers'

    const quotesLink = document.createElement('a')
    quotesLink.classList.add('sidenav-menu-button')
    quotesLink.textContent = 'quotes'
    quotesLink.href = '../quotes/index.html'
    quotesLink.title = 'go to quotes'

    links.forEach(({ title, tools }) => {
      const itemComponent = document.createElement('details')
      itemComponent.name = "tools"
      itemComponent.classList.add('menu-tool')
      
      // title item
      const titleTools = document.createElement('summary')
      titleTools.classList.add('menu-tille')
      titleTools.textContent = title
      
      // menu item
      const menuTools = document.createElement('menu')
      menuTools.classList.add('sidenav-menu')
      
      tools.forEach(tool => {
        const menuItem = document.createElement('li')
        
        const menuLink = document.createElement('a')
        menuLink.classList.add('sidenav-menu-button')
        
        menuLink.href = tool.page
        menuLink.textContent = tool.title
        menuLink.title = `go to ${tool.title}`
        
        // append to menu tools
        menuItem.append(menuLink)
        
        menuTools.append(menuItem)
      })
      
      itemComponent.append(titleTools, menuTools)
      
      listComponent.append(itemComponent)
    })
    
    listComponent.append(wallpaperLink, quotesLink)

    navbarComponent.append(headerComponent, listComponent)

    shadowRoot.append(styles, navbarComponent)
  }
}

// custom tag
customElements.define('navbar-stack', NavBarStack)
