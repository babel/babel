import Plugin from "../plugin";
import * as t from "babel-types";

const isSuperMember = (path) => path.isMemberExpression() && path.get("object").isSuper();

export default new Plugin({
  visitor: {
    UpdateExpression(path){
      if (!isSuperMember(path.get("argument")) || !getShadowBindingRoot(path, "this")) return;

      // Convert the update to assignments.
      decomposeUpdateExpression(path);
    },

    CallExpression(path){
      if (!isSuperMember(path.get("callee")) || !getShadowBindingRoot(path, "this")) return;

      // super.foo(a, b, c); => super.foo.call(this, a, b, c);
      path.node.callee = t.memberExpression(path.node.callee, t.identifier("call"));
      path.node.arguments.unshift(t.thisExpression());
    },

    AssignmentExpression(path){
      if (!isSuperMember(path.get("left")) || !getShadowBindingRoot(path, "this")) return;

      // Convert things like "+=" and such to simple assignment.
      decomposeUpdateAssignment(path);

      // super.foo = 4; => superSet("foo", 4);
      remapSuperSet(path);
    },

    MemberExpression(path){
      if (!isSuperMember(path) || !getShadowBindingRoot(path, "this")) return;
      if (path.parentPath.isAssignmentExpression({left: path.node})) return;

      // var foo = super.foo; => var foo = superGet("foo");
      remapSuperGet(path);
    },

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

/**
 * Given an member expression for a super property, convert it to a call to a function that
 * calls super in the correct scope,
 */
function remapSuperGet(path){
  let fnPath = getShadowBindingRoot(path, "this");
  if (!fnPath) return;

  let id = fnPath.getData("super-get");
  if (!id){
    // Ensure that there is a "var _superGet = (prop) => super[prop];" helper.
    id = path.scope.generateUidIdentifier("super-get");
    fnPath.setData("super-get", id);

    fnPath.scope.push({ id, init: t.arrowFunctionExpression([t.identifier("prop")],
      t.memberExpression(t.super(), t.identifier("prop"), true)) });
  }

  assertNotCircular(path, id);

  return path.replaceWith(t.callExpression(id,
    [path.node.computed ? path.node.property : t.stringLiteral(path.node.property.name)]));
}

/**
 * Given an assignment expression for a super property, convert it to a call to a function that
 * calls super in the correct scope,
 */
function remapSuperSet(path){
  let fnPath = getShadowBindingRoot(path, "this");
  if (!fnPath) return;

  let id = fnPath.getData("super-set");
  if (!id){
    // Ensure that there is a "var _superSet = (prop, val) => super[prop] = val;" helper.
    id = path.scope.generateUidIdentifier("super-set");
    fnPath.setData("super-set", id);

    fnPath.scope.push({ id, init: t.arrowFunctionExpression(
      [t.identifier("prop"), t.identifier("val")], t.assignmentExpression("=",
      t.memberExpression(t.super(), t.identifier("prop"), true), t.identifier("val"))) });
  }

  assertNotCircular(path, id);

  let {left, right} = path.node;

  return path.replaceWith(t.callExpression(id, [
    left.computed ? left.property : t.stringLiteral(left.property.name), right]));
}

/**
 * Given an UpdateExpression, decompose and replace it with one or more AssignmentExpressions.
 */
function decomposeUpdateExpression(path){
  const expr = path.get("argument");

  // ++super.foo => super.foo += 1;
  if (path.is("prefix")){
    path.replaceWith(t.assignmentExpression(path.node.operator.slice(0, 1) + "=",
      expr.node, t.numericLiteral(1)));
    return;
  }

  // super.foo-- => _ref = super.foo, super.foo = _ref + 1, _ref;
  const result = expr.scope.maybeGenerateMemoised(expr.node);

  const secondary = t.memberExpression(expr.node.object, expr.node.property, expr.node.computed);
  if (expr.is("computed")){
    const id = expr.scope.maybeGenerateMemoised(expr.get("property"));
    if (id){
      expr.node.property = t.assignmentExpression("=", id, expr.node.property);
      secondary.property = id;
    }
  }

  path.replaceWithMultiple([
    t.assignmentExpression("=", result, expr.node),
    t.assignmentExpression("=", secondary, t.binaryExpression("+", result, t.numericLiteral(1))),
    result
  ]);
}

/**
 * Given an AssignmentExpression, ensure that it is a simple "=" assignment, not a more complex
 * one like "+=" or "/=".
 */
function decomposeUpdateAssignment(path){
  // super.foo += bar => super.foo = super.foo + "bar";
  if (path.node.operator === "=") return;

  const expr = path.get("left");

  const secondary = t.memberExpression(expr.node.object, expr.node.property, expr.node.computed);
  if (expr.is("computed")){
    const id = expr.scope.maybeGenerateMemoised(expr.get("property"));
    if (id){
      expr.node.property = t.assignmentExpression("=", id, expr.node.property);
      secondary.property = id;
    }
  }

  path.node.right = t.binaryExpression(path.node.operator.slice(0, 1), secondary, path.node.right);
  path.node.operator = "=";
}

/**
 * If someone has enabled the arrow function transform, we can't properly insert the super getter
 * and setter functions, since they would also be transformed.
 *
 * We could get around this by actually transforming the super expressions the same way the class
 * transform does it, but it's easier for now to consider that a disallowed edge-case.
 */
function assertNotCircular(path, id){
  const binding = path.scope.getBinding(id.name);

  if (binding && path.findParent((parent) => parent === binding.path)){
    throw path.buildCodeFrameError("'super.*' property usage inside arrow functions is not " +
      "supported with native classes and transpiled arrows.");
  }
}
