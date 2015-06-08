import { _ForOfStatementArray } from "../es6/for-of";

export var metadata = {
  optional: true
};

export function ForOfStatement(node, parent, scope, file) {
  if (this.get("right").isGenericType("Array")) {
    return _ForOfStatementArray.call(this, node, scope, file);
  }
}
