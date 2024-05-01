import Component from "../Component.js";

export default class NavComponent extends Component {
  constructor(shadowRoot, name) {
    const model = {
      logo: "Real-Time",
    };
    super(shadowRoot, name, model);

    this.shadowRoot = shadowRoot;
    this.navLinks = this.shadowRoot.querySelector(".nav-links");
    this.hamburgerMenu = this.shadowRoot.querySelector(".hamburger-menu");

    this.hamburgerMenu.addEventListener("click", () => this.toggleMenu());

    this.updateTemplate()
  }

  toggleMenu() {
    if (this.navLinks.style.right === "0px") {
      this.navLinks.style.right = "-100%";
    } else {
      this.navLinks.style.right = "0px";
    }
  }

  sayHello() {
    alert("Bonjour");
  }

  handleMouseOver() {
    console.log("this", this.model.logo);
    window.location.hash = "#/duxei";
  }

  handleMouseOut() {
    this.model.logo += "1"
  }
}
