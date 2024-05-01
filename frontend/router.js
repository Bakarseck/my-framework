class Router {
    constructor(routes) {
        this.routes = routes;
        this.appDiv = document.getElementById("app");
        window.addEventListener("hashchange", () => this.routeChange());
        this.routeChange();
        this.createComponent("nav-component");
        this.createComponent("toast-component");
        this.createComponent("toggle-component");
    }

    async routeChange() {
        const path = window.location.hash.slice(1) || "/";
        const route = this.routes.find((r) => r.path === path);
        if (!route) {
            this.appDiv.innerHTML =
                "<div class='not-found'><h1>404 Not Found</h1></div>";
            this.appDiv.className = "not-found-div";
            return;
        }
        this.appDiv.className = "";
        await this.loadComponent(route.component);
    }

    async createComponent(name) {
        if (!customElements.get(name)) {
            const [html, css] = await Promise.all([
                fetch(`./components/${name}/${name}.template`).then((res) =>
                    res.text()
                ),
                fetch(`./components/${name}/${name}.css`).then((res) => res.text()),
            ]);
            defineComponent(name, html, css);
        }
    }

    async loadComponent(name) {
        await this.createComponent(name);
        this.appDiv.innerHTML = `<${name}></${name}>`;
    }
}

const routes = [
    { path: "/", component: "auth-component" },
    { path: "/chat", component: "chat-component" },
    { path: "/post", component: "post-component" },
];

document.addEventListener("DOMContentLoaded", () => {
    new Router(routes);
});

async function defineComponent(name, html, css) {
    const template = document.createElement("template");
    template.innerHTML = `
        <style>${css}</style>
        ${html}
    `;

    class CustomElement extends HTMLElement {
        static get observedAttributes() {
            return ["model"];
        }

        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            this.loadComponentScript();
        }

        attributeChangedCallback(attrName, oldVal, newVal) {
            if (attrName === "model") {
                this.loadComponentScript();
            }
        }

        async loadComponentScript() {
            const module = await import(`/components/${name}/${name}.js`);
            const ComponentClass = module.default;
            this.componentInstance = new ComponentClass(
                this.shadowRoot,
                this.tagName.toLowerCase()
            );
            if (this.getAttribute("model")) {
                this.componentInstance.updateModel(
                    JSON.parse(this.getAttribute("model"))
                );
            }
        }
    }

    customElements.define(name, CustomElement);
}
