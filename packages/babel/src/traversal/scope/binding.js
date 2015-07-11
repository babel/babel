export default class Binding {
  constructor({ existing, identifier, scope, path, kind }) {
    this.constantViolations = [];
    this.constant           = true;

    this.identifier = identifier;
    this.references = 0;
    this.referenced = false;

    this.scope = scope;
    this.path  = path;
    this.kind  = kind;

    this.hasValue         = false;
    this.hasDeoptedValue  = false;
    this.value            = null;

    this.clearValue();

    if (existing) {
      this.constantViolations = [].concat(
        existing.path,
        existing.constantViolations,
        this.constantViolations
      );
    }
  }

  /**
   * Description
   */

  deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  }

  /**
   * Description
   */

  setValue(value) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value    = value;
  }

  /**
   * Description
   */

  clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue        = false;
    this.value           = null;
  }

  /**
   * Description
   */

  reassign(path) {
    this.constant = false;
    this.constantViolations.push(path);
  }

  /**
   * Description
   */

  reference() {
    this.referenced = true;
    this.references++;
  }

  /**
   * Description
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }

  /**
   * Description
   */

  isCompatibleWithType(): boolean {
    return false;
  }
}
