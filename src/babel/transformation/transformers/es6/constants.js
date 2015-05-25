import * as messages from "../../../messages";

export function AssignmentExpression(node, parent, scope, file) {
  var ids = this.getBindingIdentifiers();

  for (var name in ids) {
    var id = ids[name];

    var binding = scope.getBinding(name);

    // no binding exists
    if (!binding) continue;

    // not a constant
    if (binding.kind !== "const" && binding.kind !== "module") continue;

    // check if the assignment id matches the constant declaration id
    // if it does then it was the id used to initially declare the
    // constant so we can just ignore it
    if (binding.identifier === id) continue;

    throw file.errorWithNode(id, messages.get("readOnly", name));
  }
}

export { AssignmentExpression as UpdateExpression };

export function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}
