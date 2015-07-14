import { _ForOfStatementArray } from "../es6/for-of";

export var metadata = {
  optional: true
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ForOfStatement(node, parent, scope, file) {
    if (this.get("right").isGenericType("Array")) {
      return _ForOfStatementArray.call(this, node, scope, file);
    }
  }
};
