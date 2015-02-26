import * as messages from "../../../messages";
import t from "../../../types";

export { isFor as check } from "../../../types";

exports.ForInStatement =
exports.ForOfStatement = function (node, parent, scope, file) {
  var left = node.left;
  if (t.isVariableDeclaration(left)) {
    var declar = left.declarations[0];
    if (declar.init) throw file.errorWithNode(declar, messages.get("noAssignmentsInForHead"));
  }
};
