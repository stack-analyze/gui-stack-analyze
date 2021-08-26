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

    shadowRoot.innerHTML = `
    <!-- styles component -->
    <style>
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
    </style>
    <!-- component navbar -->
    <header class="glass">
      <h1 class="brand">${this.title}</h1>
    </header>
    <nav class="sidenav glass">
      <ul class="sidenav-menu">
        <li>
          <a class="sidenav-menu-button" href="../index/index.html" title="techstack tool">tech-stack</a>
        </li>
        <li>
          <a class="sidenav-menu-button" href="../pagespeed/index.html" title="pagespeed tool">pagespeed</a>
        </li>
        <li>
          <a class="sidenav-menu-button" href="../html-validator/index.html" title="html validator tool">HTML validator</a>
        </li>
        <li>
          <a class="sidenav-menu-button" href="../github-info/index.html" title="github search tool">github info</a>
        </li>
        <li>
          <a class="sidenav-menu-button" href="../anime-search/index.html" title="anime search tool">anime search</a>
        </li>
        <li>
          <a class="sidenav-menu-button" href="../hardware-information/index.html" title="hardware information tool">hardware information</a>
        </li>
        <li>
        <a class="sidenav-menu-button" href="../crypto-market/index.html" title="crypto market tool">crypto market</a>
        </li>
      </ul>
    </nav>
    `
  }
}

// custom tag
customElements.define('navbar-stack', NavBarStack)
