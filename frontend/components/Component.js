export default class Component {
  constructor(shadowRoot, name, model) {
    this.name = name;
    this.shadowRoot = shadowRoot;
    this.model = model;
    this.attachEventListeners();

    this.updateTemplate();
  }

  getSelector() {
    return this.name.split("-")[0] + "-container";
  }

  attachEventListeners() {
    const container = this.shadowRoot.getElementById(`${this.getSelector()}`);
    container.querySelectorAll("[custom-event]").forEach((element) => {
      const attributes = Array.from(element.attributes);
      attributes.forEach((attr) => {
        if (attr.name.startsWith("@")) {
          const eventHandler = attr.value.split("=");
          const event = attr.name.trim().substring(1);
          const handler = eventHandler[0].trim();
          element.addEventListener(event, (event) => this[handler](event));
        }
      });
    });

    this.shadowRoot
      .querySelectorAll("[data-input-binding]")
      .forEach((element) => {
        const prop = element.getAttribute("data-input-binding");
        element.addEventListener("input", (e) => {
          this.model[prop] = e.target.value;
          this.updateTemplate();
        });
      });
  }

  updateTemplate() {
    const container = this.shadowRoot.getElementById(this.getSelector());

    const repeatElements = container.querySelectorAll("[data-repeat]");
    repeatElements.forEach((element) => {
      const items = this.model[element.getAttribute("data-repeat")];
      const parent = element.parentNode;
      parent.innerHTML = "";
      items.forEach((item) => {
        const clone = element.content.cloneNode(true);
        this.applyBindings(clone, item);
        parent.appendChild(clone);
      });
    });

    container.querySelectorAll("[data-if]").forEach((element) => {
      const condition = element.getAttribute("data-if");
      if (!this.model[condition]) {
        element.style.display = "none";
      } else {
        element.style.display = "";
      }
    });

    container.querySelectorAll("[data-bind]").forEach((element) => {
      const prop = element.getAttribute("data-bind");
      element.textContent = this.model[prop] || "";
    });

    this.shadowRoot.querySelectorAll("[data-bind]").forEach((element) => {
      const propertyName = element.dataset.bind;
      element.innerHTML = this.model[propertyName] ?? this[propertyName];
    });

    this.shadowRoot.querySelectorAll("[data-class]").forEach((element) => {
      const propertyName = element.dataset.class;
      element.classList.add(this.model[propertyName] ?? this[propertyName]);
    });
  }

  updateModel(modelJson) {
    this.model = modelJson;
    this.updateTemplate();
  }

  setupFormListeners(formId, formGroup) {
    const form = this.shadowRoot.getElementById(formId);
    form.querySelectorAll("[data-input-binding]").forEach((input) => {
      input.addEventListener("input", () => {
        formGroup.setValue(
          input.getAttribute("data-input-binding"),
          input.value
        );
      });
    });
  }

  applyBindings(element, context) {
    element.querySelectorAll("[data-repeat-bind]").forEach((bindElement) => {
      const prop = bindElement.getAttribute('data-repeat-bind')
      if (bindElement.tagName.toLowerCase() === "img") {
        bindElement.src = context[prop] || "";
      } else {
        bindElement.textContent = context[prop] || "";
      }
    });
  }
}
