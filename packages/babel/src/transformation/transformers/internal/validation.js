import * as messages from "../../../messages";
import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ForXStatement(node, parent, scope, file) {
    var left = node.left;
    if (t.isVariableDeclaration(left)) {
      var declar = left.declarations[0];
      if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
    }
  },

  /**
   * [Please add a description.]
   */

  Property(node, parent, scope, file) {
    if (node.kind === "set") {
      var first = node.value.params[0];
      if (t.isRestElement(first)) {
        throw file.errorWithNode(first, messages.get("settersNoRest"));
      }
    }
  }
};
