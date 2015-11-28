import type NodePath from "../path";

/**
 * This class is responsible for a binding inside of a scope.
 *
 * It tracks the following:
 *
 *  * Node path.
 *  * Amount of times referenced by other nodes.
 *  * Paths to nodes that reassign or modify this binding.
 *  * The kind of binding. (Is it a parameter, declaration etc)
 *
 * @public
 */

export default class Binding {
  constructor({ existing, identifier, scope, path, kind }) {

    /**
     * [Needs description]
     * @public
     * @member
     * @name binding.identifier
     */

    this.identifier = identifier;

    /**
     * [Needs description]
     * @public
     * @member {Scope}
     * @name binding.scope
     */

    this.scope = scope;

    /**
     * [Needs description]
     * @public
     * @member {NodePath}
     * @name binding.path
     */

    this.path = path;

    /**
     * [Needs description]
     * @public
     * @member {String}
     * @name binding.kind
     */

    this.kind = kind;

    /**
     * [Needs description]
     * @public
     * @member {Boolean}
     * @name binding.constant
     */

    this.constant = true;

    // private members
    this.constantViolations = [];
    this.referencePaths = [];
    this.referenced = false;
    this.references = 0;

    this.clearValue();

    if (existing) {
      this.constantViolations = [].concat(
        existing.path,
        existing.constantViolations,
        this.constantViolations
      );
    }
  }


  constantViolations: Array<NodePath>;
  constant: boolean;

  referencePaths: Array<NodePath>;
  referenced: boolean;
  references: number;

  hasDeoptedValue: boolean;
  hasValue: boolean;
  value: any;

  /**
   * @private
   */

  deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  }

  /**
   * @private
   */

  setValue(value: any) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value    = value;
  }

  /**
   * @private
   */

  clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue        = false;
    this.value           = null;
  }

  /**
   * Register a constant violation with the provided `path`.
   * @private
   */

  reassign(path: Object) {
    this.constant = false;
    this.constantViolations.push(path);
  }

  /**
   * Increment the amount of references to this binding.
   * @private
   */

  reference(path: NodePath) {
    this.referenced = true;
    this.references++;
    this.referencePaths.push(path)
  }

  /**
   * Decrement the amount of references to this binding.
   * @private
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }
}
