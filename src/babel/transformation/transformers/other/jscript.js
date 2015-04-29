import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function VariableDeclarator(node, print) {
  var varName = node.id.name;
  if (node.init) {
    if (t.isFunctionExpression(node.init)) {
      if (node.init.id) {
        var fnName = node.init.id.name;
        if (varName === fnName) {
          node.init._ignoreUserWhitespace = true;
          var closureBody = [
            t.toStatement(node.init),
            t.returnStatement(node.init.id)
          ];
          var init = t.callExpression(
            t.functionExpression(null, [], t.blockStatement(closureBody)), []
          );
          return t.variableDeclarator(node.id, init);
        }
      }
    }
  }
}
