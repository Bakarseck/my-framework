import Component from "../Component.js";
import { FormGroup, FormControl } from "../../utils/forms.js";

export default class AuthComponent extends Component {
  constructor(shadowRoot, name) {
    const model = {};
    super(shadowRoot, name, model);
    this.initForms();
  }

  initForms() {
    this.loginForm = new FormGroup({
      username: new FormControl("", (value) =>
        /^[a-zA-Z0-9_]{4,}$/.test(value) ? "" : "Invalid username"
      ),
      password: new FormControl("", (value) =>
        /.{6,}/.test(value) ? "" : "Password too short"
      ),
    });

    this.registerForm = new FormGroup({
      nickname: new FormControl(),
      age: new FormControl(),
      gender: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl("", (value) =>
        value.includes("@") ? "" : "Invalid email"
      ),
      regpassword: new FormControl("", (value) =>
        value.length >= 8 ? "" : "Password too short"
      ),
    });

    this.setupFormListeners("login-form", this.loginForm);
    this.setupFormListeners("register-form", this.registerForm);
  }

  async login() {
    this.loginForm.validate();

    if (this.loginForm.valid) {
      const formData = new FormData();
      
      Object.entries(this.loginForm.values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
      })

      const toast = document.createElement("toast-component");
      let model

      if (!response.ok) {
        const data = await response.text()
        model = {
          message: data,
          type: "error",
        }
      } else {
        model = {
          message: "Login Successful",
          type: "success",
        };
      }

      toast.setAttribute("model", JSON.stringify(model));
      this.shadowRoot.appendChild(toast);
    } else {
      let messages = "";
      const errorToast = document.createElement("toast-component");
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.controls[key];
        if (control.errors) {
          messages += `${key}: ${control.errors.message} <br />`;
        }
      });
      const model = {
        message: messages,
        type: "error",
      };
      errorToast.setAttribute("model", JSON.stringify(model));
      this.shadowRoot.appendChild(errorToast);
    }
  }

  register() {
    this.registerForm.validate();

    if (this.registerForm.valid) {
      const toast = document.createElement("toast-component");
      const model = {
        message: "Registration Successful",
        type: "Success",
      };
      toast.setAttribute("model", JSON.stringify(model));
      this.shadowRoot.appendChild(toast);
    } else {
      let messages = "";
      const errorToast = document.createElement("toast-component");
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.controls[key];
        if (control.errors) {
          messages += `${key}: ${control.errors.message} <br />`;
        }
      });
      const model = {
        message: messages,
        type: "error",
      };
      errorToast.setAttribute("model", JSON.stringify(model));
      this.shadowRoot.appendChild(errorToast);
    }
  }

  showRegister() {
    this.shadowRoot.getElementById("login-form").style.display = "none";
    this.shadowRoot.getElementById("register-form").style.display = "block";
  }

  showLogin() {
    this.shadowRoot.getElementById("register-form").style.display = "none";
    this.shadowRoot.getElementById("login-form").style.display = "block";
  }

  handleMouseOver() {
    console.log("Le curseur est sur le login.");
  }
}
