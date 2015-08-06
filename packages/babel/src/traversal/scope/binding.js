/**
 * This class is responsible for a binding inside of a scope.
 *
 * It tracks the following:
 *
 *  * Node path.
 *  * Amount of times referenced by other nodes.
 *  * Paths to nodes that reassign or modify this binding.
 *  * The kind of binding. (Is it a parameter, declaration etc)
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
   * Register a constant violation with the provided `path`.
   */

  reassign(path: Object) {
    this.constant = false;
    this.constantViolations.push(path);
  }

  /**
   * Increment the amount of references to this binding.
   */

  reference() {
    this.referenced = true;
    this.references++;
  }

  /**
   * Decrement the amount of references to this binding.
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }
}
