import * as messages from "../../../messages";
import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

export var visitor = {
  ForXStatement(node, parent, scope, file) {
    var left = node.left;
    if (t.isVariableDeclaration(left)) {
      var declar = left.declarations[0];
      if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
    }
  },

  Property(node, parent, scope, file) {
    if (node.kind === "set") {
      var first = node.value.params[0];
      if (t.isRestElement(first)) {
        throw file.errorWithNode(first, messages.get("settersNoRest"));
      }
    }
  }
};
