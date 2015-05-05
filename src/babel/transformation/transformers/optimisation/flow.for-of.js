import { _ForOfStatementArray } from "../es6/for-of";
import * as t from "../../../types";

export var shouldVisit = t.isForOfStatement;
export var metadata = {
  optional: true
};

export function ForOfStatement(node, parent, scope, file) {
  if (this.get("right").isTypeGeneric("Array")) {
    return _ForOfStatementArray.call(this, node, scope, file);
  }
}
