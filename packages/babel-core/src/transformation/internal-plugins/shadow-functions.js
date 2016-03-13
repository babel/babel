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
    return shadowPath;
  }
}

function getShadowBindingRoot(path, key){
  // ensure that we're shadowed
  let shadowPath = path.inShadow(key);
  if (!shouldShadow(path, shadowPath)) return;

  let shadowFunction = path.node._shadowedFunctionLiteral;

  let currentFunction;
  let passedShadowFunction = false;

  let fnPath = path.findParent(function (path) {
    if (path.isProgram() || path.isFunction()) {
      // catch current function in case this is the shadowed one and we can ignore it
      currentFunction = currentFunction || path;
    }

    if (path.isProgram()) {
      passedShadowFunction = true;

      return true;
    } else if (path.isFunction() && !path.isArrowFunctionExpression()) {
      if (shadowFunction) {
        if (path === shadowFunction || path.node === shadowFunction.node) return true;
      } else {
        if (!path.is("shadow")) return true;
      }

      passedShadowFunction = true;
      return false;
    }

    return false;
  });

  if (shadowFunction && fnPath.isProgram() && !shadowFunction.isProgram()){
    // If the shadow wasn't found, take the closest function as a backup.
    // This is a bit of a hack, but it will allow the parameter transforms to work properly
    // without introducing yet another shadow-controlling flag.
    fnPath = path.findParent((p) => p.isProgram() || p.isFunction());
  }

  // no point in realiasing if we're in this function
  if (fnPath === currentFunction) return;

  // If the only functions that were encountered are arrow functions, skip remapping the
  // binding since arrow function syntax already does that.
  if (!passedShadowFunction) return;

  return fnPath;
}

function remap(path, key, create) {
  let fnPath = getShadowBindingRoot(path, key);
  if (!fnPath) return;

  let cached = fnPath.getData(key);
  if (cached) return path.replaceWith(cached);

  let init = create();
  let id   = path.scope.generateUidIdentifier(key);

  fnPath.setData(key, id);
  fnPath.scope.push({ id, init });

  return path.replaceWith(id);
}
