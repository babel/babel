import type { FunctionExpression } from "@babel/types";
import type { NodePath } from "@babel/traverse";

/**
 * Check whether a function expression can be affected by
 * https://bugs.webkit.org/show_bug.cgi?id=220517
 * @param path The function expression NodePath
 * @returns the name of function id if it should be transformed, otherwise returns false
 */
export function shouldTransform(
  path: NodePath<FunctionExpression>,
): string | false {
  const { node } = path;
  const functionId = node.id;
  if (!functionId) return false;

  const name = functionId.name;
  // On collision, `getOwnBinding` returns the param binding
  // with the id binding be registered as constant violation
  const paramNameBinding = path.scope.getOwnBinding(name);
  const constantViolations = paramNameBinding.constantViolations;
  if (constantViolations.length === 0) {
    // the function scope has no such collided bindings
    return false;
  }
  const firstViolation = constantViolations[0];

  if (firstViolation.node !== node) {
    // the violation does not happen in id
    // e.g. (function a() { var a; })
    return false;
  }

  if (paramNameBinding.identifier === paramNameBinding.path.node) {
    // the param binding is a simple parameter
    // e.g. (function a(a) {})
    return false;
  }

  return name;
}
