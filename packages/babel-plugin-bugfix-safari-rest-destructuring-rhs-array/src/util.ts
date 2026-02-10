import type { NodePath, types as t } from "@babel/core";
import { skipTransparentExprWrappers } from "@babel/helper-skip-transparent-expression-wrappers";

/**
 * Check whether a path is an ArrayExpression with exactly N non-spread & non-hole elements and no trailing comma
 * @param path
 * @param N
 * @returns
 */
export function isPathSimpleArrayWithLength(
  path: NodePath,
  N: number,
): path is NodePath<t.ArrayExpression> {
  if (!path.isArrayExpression()) {
    return false;
  }
  const elementPaths = path.get("elements");
  return (
    elementPaths.length === N &&
    elementPaths.every(
      elementPath => elementPath.node && !elementPath.isSpreadElement(),
    ) &&
    !path.node.extra?.trailingComma
  );
}

/**
 * Check whether an array pattern may be affected by
 * https://github.com/babel/babel/issues/17773#issuecomment-3842765704
 * @param path The array pattern NodePath
 * @returns The RHS NodePath if the pattern should be transformed, or false if it can be left as-is.
 */
export function shouldTransform(
  path: NodePath<t.ArrayPattern>,
): NodePath<t.Expression> | false {
  const elementPaths = path.get("elements");
  const elementPathsLength = elementPaths.length;
  if (elementPaths[elementPathsLength - 1].isRestElement()) {
    const { parentPath } = path;
    const rhsPath = parentPath.isVariableDeclarator()
      ? parentPath.get("init")
      : parentPath.isAssignmentExpression()
        ? parentPath.get("right")
        : null;
    if (
      rhsPath &&
      isPathSimpleArrayWithLength(
        skipTransparentExprWrappers(rhsPath),
        elementPathsLength,
      )
    ) {
      return rhsPath;
    }
  }
  return false;
}
