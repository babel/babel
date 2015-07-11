/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  Property(node) {
    if (node.method) {
      node.method = false;
    }

    if (node.shorthand) {
      node.shorthand = false;
    }
  }
};
