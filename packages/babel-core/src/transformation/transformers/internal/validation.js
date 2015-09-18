import * as messages from "babel-messages";
import * as t from "babel-types";

export let metadata = {
  group: "builtin-pre"
};

export let visitor = {
  ForXStatement(node, parent, scope, file) {
    let left = node.left;
    if (t.isVariableDeclaration(left)) {
      let declar = left.declarations[0];
      if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
    }
  },

  Property(node, parent, scope, file) {
    if (node.kind === "set") {
      let first = node.value.params[0];
      if (t.isRestElement(first)) {
        throw file.errorWithNode(first, messages.get("settersNoRest"));
      }
    }
  }
};
