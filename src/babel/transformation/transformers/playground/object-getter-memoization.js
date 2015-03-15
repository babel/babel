import * as t from "../../../types";

export var playground = true;
export var optional = true;

var visitor = {
  enter(node, parent, scope, state) {
    if (this.isFunction()) return this.skip();

    if (this.isReturnStatement() && node.argument) {
      node.argument = t.memberExpression(t.callExpression(state.file.addHelper("define-property"), [
        t.thisExpression(),
        state.key,
        node.argument
      ]), state.key, true);
    }
  }
};

export function MethodDefinition(node, parent, scope, file) {
  if (node.kind !== "memo") return;
  node.kind = "get";

  file.log.deprecate("Object getter memoization is deprecated and will be removed in 5.0.0");

  t.ensureBlock(node.value);

  var key = node.key;

  if (t.isIdentifier(key) && !node.computed) {
    key = t.literal(key.name);
  }

  var state = {
    key:  key,
    file: file
  };

  this.get("value").traverse(visitor, state);

  return node;
}

export { MethodDefinition as Property };
