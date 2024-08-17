import type { NodePath, types as t } from "@babel/core";

/**
 * Check whether a function expression can be affected by
 * https://bugs.webkit.org/show_bug.cgi?id=220517
 * @param path The function expression NodePath
 * @returns the name of function id if it should be transformed, otherwise returns false
 */
export function shouldTransform(
  path: NodePath<t.FunctionExpression>,
): string | false {
  const { node } = path;
  const functionId = node.id;
  if (!functionId) return false;

  const name = functionId.name;
  // On collision, `getOwnBinding` returns the param binding
  // with the id binding be registered as constant violation
  const paramNameBinding = path.scope.getOwnBinding(name);
  if (paramNameBinding === undefined) {
    // Case 1: the function id is injected by babel-helper-name-function, which
    // assigns `NOT_LOCAL_BINDING` to the `functionId` and thus not registering id
    // in scope tracking
    // Case 2: the function id is injected by a third party plugin which does not update the
    // scope info
    return false;
  }
  if (paramNameBinding.kind !== "param") {
    // the function id does not reproduce in params
    return false;
  }

  if (paramNameBinding.identifier === paramNameBinding.path.node) {
    // the param binding is a simple parameter
    // e.g. (function a(a) {})
    return false;
  }

  return name;
}
