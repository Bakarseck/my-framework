export class FormControl {
  constructor(initialValue = "", validator = null) {
    this.value = initialValue;
    this.validator = validator;
    this.errors = null;
  }

  setValue(value) {
    this.value = value;
    this.validate();
  }

  validate() {
    if (this.validator) {
      const validationResult = this.validator(this.value);
      this.errors = validationResult
        ? { valid: false, message: validationResult }
        : null;
    }
  }
}

export class FormGroup {
  constructor(controls) {
    this.controls = controls;
  }

  setValue(controlName, value) {
    if (this.controls[controlName]) {
      this.controls[controlName].setValue(value);
    }
  }

  validate() {
    Object.keys(this.controls).forEach((key) => this.controls[key].validate());
  }

  get valid() {
    return Object.values(this.controls).every((control) => !control.errors);
  }

  get values() {
    return Object.keys(this.controls).reduce((acc, key) => {
      acc[key] = this.controls[key].value;
      return acc;
    }, {});
  }
}
