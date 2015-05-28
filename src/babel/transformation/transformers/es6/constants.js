import * as messages from "../../../messages";

function checkPath(path, file) {
  var ids = path.getBindingIdentifiers();

  for (var name in ids) {
    var id = ids[name];

    var binding = path.scope.getBinding(name);

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

export function AssignmentExpression(node, parent, scope, file) {
  checkPath(this, file);
}

export { AssignmentExpression as UpdateExpression };

export function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}

export function ForXStatement(node, parent, scope, file) {
  var left = this.get("left");
  if (left.isIdentifier() || left.isPattern()) {
    checkPath(left, file);
  }
}
