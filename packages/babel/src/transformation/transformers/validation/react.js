import * as messages from "../../../messages";
import * as t from "../../../types";

// check if the input Literal `source` is an alternate casing of "react"
function check(source, file) {
  if (t.isLiteral(source)) {
    var name  = source.value;
    var lower = name.toLowerCase();

    if (lower === "react" && name !== lower) {
      throw file.errorWithNode(source, messages.get("didYouMean", "react"));
    }
  }
}

export var visitor = {
  CallExpression(node, parent, scope, file) {
    if (this.get("callee").isIdentifier({ name: "require" }) && node.arguments.length === 1) {
      check(node.arguments[0], file);
    }
  },

  ModuleDeclaration(node, parent, scope, file) {
    check(node.source, file);
  }
};
