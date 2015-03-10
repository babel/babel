import * as t from "../../../types";

var isConsole = t.buildMatchMemberExpression("console", true);

export var optional = true;

export function CallExpression(node, parent) {
  if (isConsole(node.callee)) {
    if (t.isExpressionStatement(parent)) {
      this.parentPath.remove();
    } else {
      this.remove();
    }
  }
}
