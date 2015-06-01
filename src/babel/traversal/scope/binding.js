export default class Binding {
  constructor({ identifier, scope, path, kind }) {
    this.constantViolations = [];
    this.constant           = true;

    this.identifier = identifier;
    this.references = 0;
    this.referenced = false;

    this.scope      = scope;
    this.path       = path;
    this.kind       = kind;
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
