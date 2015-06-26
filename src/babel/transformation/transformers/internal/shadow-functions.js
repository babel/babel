import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

function remap(path, key, create) {
  // ensure that we're shadowed
  if (!path.inShadow()) return;

  var shadowed = path.node._shadowedFunctionLiteral;
  var currentFunction;

  var fnPath = path.findParent(function (path) {
    if (shadowed) {
      // only match our shadowed function parent
      if (path === shadowed) {
        // found our target reference function
        currentFunction = path;
        return true;
      } else {
        return false;
      }
    } else if (path.isFunction() || path.isProgram()) {
      // catch current function in case this is the shadowed one
      if (!currentFunction) currentFunction = path;

      return !path.is("shadow");
    } else {
      return false;
    }
  });

  // no point in realiasing if we're in this function
  if (fnPath === currentFunction) return;

  var cached = fnPath.getData(key);
  if (cached) return cached;

  var init = create();
  var id   = path.scope.generateUidIdentifier(key);

  fnPath.setData(key, id);
  fnPath.scope.push({ id, init });

  return id;
}

export var visitor = {
  ThisExpression() {
    return remap(this, "this", () => t.thisExpression());
  },

  ReferencedIdentifier(node) {
    if (node.name === "arguments") {
      return remap(this, "arguments", () => t.identifier("arguments"));
    }
  }
};
