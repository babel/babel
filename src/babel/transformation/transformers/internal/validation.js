import * as messages from "../../../messages";
import t from "../../../types";

export function ForOfStatement(node, parent, scope, file) {
  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    var declar = left.declarations[0];
    if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
  }
}

export { ForOfStatement as ForInStatement };

export function Property(node, parent, scope, file) {
  if (node.kind === "set" && node.value.params.length !== 1) {
    throw file.errorWithNode(node.value, messages.get("settersInvalidParamLength"));
  }
}

export { Property as MethodDefinition };
