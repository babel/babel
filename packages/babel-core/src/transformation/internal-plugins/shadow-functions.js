import Plugin from "../plugin";
import * as t from "babel-types";

const SUPER_THIS_BOUND = Symbol("super this bound");

const superVisitor = {
  CallExpression(path) {
    if (!path.get("callee").isSuper()) return;

    const { node } = path;
    if (node[SUPER_THIS_BOUND]) return;
    node[SUPER_THIS_BOUND] = true;

    path.replaceWith(t.assignmentExpression("=", this.id, node));
  }
};

export default new Plugin({
  name: "internal.shadowFunctions",

  visitor: {
    ThisExpression(path) {
      remap(path, "this");
    },

    ReferencedIdentifier(path) {
      if (path.node.name === "arguments") {
        remap(path, "arguments");
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

function remap(path, key) {
  // ensure that we're shadowed
  const shadowPath = path.inShadow(key);
  if (!shouldShadow(path, shadowPath)) return;

  const shadowFunction = path.node._shadowedFunctionLiteral;

  let currentFunction;
  let passedShadowFunction = false;

  let fnPath = path.find(function (innerPath) {
    if (innerPath.parentPath && innerPath.parentPath.isClassProperty() && innerPath.key === "value") {
      return true;
    }
    if (path === innerPath) return false;
    if (innerPath.isProgram() || innerPath.isFunction()) {
      // catch current function in case this is the shadowed one and we can ignore it
      currentFunction = currentFunction || innerPath;
    }

    if (innerPath.isProgram()) {
      passedShadowFunction = true;

      return true;
    } else if (innerPath.isFunction() && !innerPath.isArrowFunctionExpression()) {
      if (shadowFunction) {
        if (innerPath === shadowFunction || innerPath.node === shadowFunction.node) return true;
      } else {
        if (!innerPath.is("shadow")) return true;
      }

      passedShadowFunction = true;
      return false;
    }

    return false;
  });

  if (shadowFunction && fnPath.isProgram() && !shadowFunction.isProgram()) {
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

  let cached = fnPath.getData(key);
  if (!cached) {
    const id = path.scope.generateUidIdentifier(key);

    fnPath.setData(key, id);
    cached = id;

    const classPath = fnPath.findParent((p) => p.isClass());
    const hasSuperClass = !!(classPath && classPath.node && classPath.node.superClass);

    if (key === "this" && fnPath.isMethod({ kind: "constructor" }) && hasSuperClass) {
      fnPath.scope.push({ id });

      fnPath.traverse(superVisitor, { id });
    } else {
      const init = key === "this" ? t.thisExpression() : t.identifier(key);

      // Forward the shadowed function, so that the identifiers do not get hoisted
      // up to the first non shadow function but rather up to the bound shadow function
      if (shadowFunction) init._shadowedFunctionLiteral = shadowFunction;

      fnPath.scope.push({ id, init });
    }
  }

  const node = t.cloneDeep(cached);
  node.loc = path.node.loc;

  return path.replaceWith(node);
}
