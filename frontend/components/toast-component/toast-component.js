import Component from "../Component.js";

export default class ToastComponent extends Component {
  constructor(shadowRoot, name) {
    const TOAST_TIMEOUT = 2000;
    const model = {};
    super(shadowRoot, name, model);

    setTimeout(() => {
      this.closeToast();
    }, TOAST_TIMEOUT);
  }

  closeToast() {
    const toast = this.shadowRoot.querySelector(".toast");
    if (!toast) return;

    toast.style.opacity = "0";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 600);
  }
}
