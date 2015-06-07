import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

function remap(path, key, create) {
  // ensure that we're shadowed
  if (!path.inShadow()) return;

  var fnPath = path.findParent((path) => !path.is("shadow") && (path.isFunction() || path.isProgram()));

  var cached = fnPath.getData(key);
  if (cached) return cached;

  var init = create();
  var id   = path.scope.generateUidIdentifier(key);

  fnPath.setData(key, id);
  fnPath.scope.push({ id, init });

  return id;
}

export function ThisExpression() {
  return remap(this, "this", () => t.thisExpression());
}

export function ReferencedIdentifier(node) {
  if (node.name === "arguments" && !node._shadowedFunctionLiteral) {
    return remap(this, "arguments", () => t.identifier("arguments"));
  }
}
