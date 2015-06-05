import * as messages from "../../../messages";
import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

export function ForOfStatement(node, parent, scope, file) {
  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    var declar = left.declarations[0];
    if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
  }
}

export { ForOfStatement as ForInStatement };

export function MethodDefinition(node) {
  if (node.kind !== "constructor") {
    // get constructor() {}
    var isConstructor = !node.computed && t.isIdentifier(node.key, { name: "constructor" });

    // get ["constructor"]() {}
    isConstructor = isConstructor || t.isLiteral(node.key, { value: "constructor" });

    if (isConstructor) {
      throw this.errorWithNode(messages.get("classesIllegalConstructorKind"));
    }
  }

  Property.apply(this, arguments);
}

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
