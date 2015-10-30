/* @flow */

import Plugin from "../plugin";
import * as t from "babel-types";

export default new Plugin({
  visitor: {
    ThisExpression(path) {
      remap(path, "this", () => t.thisExpression());
    },

    ReferencedIdentifier(path) {
      if (path.node.name === "arguments") {
        remap(path, "arguments", () => t.identifier("arguments"));
      }
    }
  }
});

function shouldShadow(path, shadowPath) {
  if (path.is("_forceShadow")) {
    return true;
  } else {
    return shadowPath && !shadowPath.isArrowFunctionExpression();
  }
}

function remap(path, key, create) {
  // ensure that we're shadowed
  let shadowPath = path.inShadow(key);
  if (!shouldShadow(path, shadowPath)) return;

  let shadowFunction = path.node._shadowedFunctionLiteral;
  let currentFunction;

  let fnPath = path.findParent(function (path) {
    if (path.isProgram() || path.isFunction()) {
      // catch current function in case this is the shadowed one and we can ignore it
      currentFunction = currentFunction || path;
    }

    if (path.isProgram()) {
      return true;
    } else if (path.isFunction()) {
      if (shadowFunction) {
        return path === shadowFunction || path.node === shadowFunction.node;
      } else {
        return !path.is("shadow");
      }
    }

    return false;
  });

  // no point in realiasing if we're in this function
  if (fnPath === currentFunction) return;

  let cached = fnPath.getData(key);
  if (cached) return path.replaceWith(cached);

  let init = create();
  let id   = path.scope.generateUidIdentifier(key);

  fnPath.setData(key, id);
  fnPath.scope.push({ id, init });

  return path.replaceWith(id);
}
