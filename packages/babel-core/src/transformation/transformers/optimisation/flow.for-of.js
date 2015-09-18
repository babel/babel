import { _ForOfStatementArray } from "../es6/for-of";

export let metadata = {
  optional: true
};

export let visitor = {
  ForOfStatement(node, parent, scope, file) {
    if (this.get("right").isGenericType("Array")) {
      return _ForOfStatementArray.call(this, node, scope, file);
    }
  }
};
