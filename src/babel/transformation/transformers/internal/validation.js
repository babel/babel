import * as messages from "../../../messages";
import * as t from "../../../types";

export function ForOfStatement(node, parent, scope, file) {
  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    var declar = left.declarations[0];
    if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
  }
}

export { ForOfStatement as ForInStatement };

export function Property(node, parent, scope, file) {
  if (node.kind === "set") {
    if (node.value.params.length !== 1) {
      throw file.errorWithNode(node.value, messages.get("settersInvalidParamLength"));
    }

    var first = node.value.params[0];
    if (t.isRestElement(first)) {
      throw file.errorWithNode(first, messages.get("settersNoRest"));
    }
  }
}

export { Property as MethodDefinition };

export function BlockStatement(node) {
  for (var i = 0; i < node.body.length; i++) {
    var bodyNode = node.body[i];
    if (t.isExpressionStatement(bodyNode) && t.isLiteral(bodyNode.expression)) {
      bodyNode._blockHoist = Infinity;
    } else {
      return;
    }
  }
}

export { BlockStatement as Program };
