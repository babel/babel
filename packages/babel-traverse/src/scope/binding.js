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
    this.referencePaths = [];
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

  deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  }

  setValue(value: any) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value    = value;
  }

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

  reference(path) {
    this.referenced = true;
    this.references++;
    this.referencePaths.push(path)
  }

  /**
   * Decrement the amount of references to this binding.
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }
}
