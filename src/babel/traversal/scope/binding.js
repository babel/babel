/**
 * [Please add a description.]
 */

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

    this.hasValue        = false;
    this.hasDeoptedValue = false;
    this.value           = null;

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
   * [Please add a description.]
   */

  deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  }

  /**
   * [Please add a description.]
   */

  setValue(value: any) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value    = value;
  }

  /**
   * [Please add a description.]
   */

  clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue        = false;
    this.value           = null;
  }

  /**
   * [Please add a description.]
   */

  reassign(path: Object) {
    this.constant = false;
    this.constantViolations.push(path);
  }

  /**
   * [Please add a description.]
   */

  reference() {
    this.referenced = true;
    this.references++;
  }

  /**
   * [Please add a description.]
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }

  /**
   * [Please add a description.]
   */

  isCompatibleWithType(): boolean {
    return false;
  }
}
