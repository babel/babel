import * as messages from "../../../messages";
import * as t from "../../../types";

export function check(node) {
  return t.isVariableDeclaration(node, { kind: "const" }) || t.isImportDeclaration(node);
}

var visitor = {
  enter(node, parent, scope, state) {
    if (this.isAssignmentExpression() || this.isUpdateExpression()) {
      var ids = this.getBindingIdentifiers();

      for (var name in ids) {
        var id = ids[name];

        var constant = state.constants[name];

        // no constant exists
        if (!constant) continue;

        var constantIdentifier = constant.identifier;

        // check if the assignment id matches the constant declaration id
        // if it does then it was the id used to initially declare the
        // constant so we can just ignore it
        if (id === constantIdentifier) continue;

        // check if there's been a local binding that shadows this constant
        if (!scope.bindingIdentifierEquals(name, constantIdentifier)) continue;

        throw state.file.errorWithNode(id, messages.get("readOnly", name));
      }
    } else if (this.isScope()) {
      this.skip();
    }
  }
};

export function Scopable(node, parent, scope, file) {
  this.traverse(visitor, {
    constants: scope.getAllBindingsOfKind("const", "module"),
    file:      file
  });
}

export function VariableDeclaration(node) {
  if (node.kind === "const") node.kind = "let";
}
