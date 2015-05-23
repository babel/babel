import * as messages from "../../../messages";
import * as t from "../../../types";

function validateAssignment(node, parent, scope, file) {
  const name = node.name;

  var binding = scope.getBinding(name);

  // no binding exists
  if (!binding) return;

  // not a constant
  if (binding.kind !== "const" && binding.kind !== "module") return;

  // check if the assignment id matches the constant declaration id
  // if it does then it was the id used to initially declare the
  // constant so we can just ignore it
  if (binding.identifier === node) return;

  throw file.errorWithNode(node, messages.get("readOnly", name));
}

export function AssignmentExpression(node, parent, scope, file) {
  var ids = this.getBindingIdentifiers();

  for (var name in ids) {
    validateAssignment(ids[name], parent, scope, file);
  }
}

export { AssignmentExpression as UpdateExpression };

export function ForInStatement(node, parent, scope, file) {
  if (t.isIdentifier(node.left)) {
    validateAssignment(node.left, parent, scope, file);
  }
}

export function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}
