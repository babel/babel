import type { PluginPass } from "@babel/core";

let currentTypes: any = null;

export function wrapWithTypes<This, Args extends unknown[]>(
  types: any,
  fn: (this: This, ...args: Args) => unknown,
) {
  return function (this: This, ...args: Args) {
    const oldTypes = currentTypes;
    currentTypes = types;
    try {
      return fn.apply(this, args);
    } finally {
      currentTypes = oldTypes;
    }
  };
}

export function getTypes() {
  return currentTypes;
}

export let runtimeProperty: (file: PluginPass, name: any) => any;
if (!process.env.BABEL_8_BREAKING) {
  runtimeProperty = function (file, name) {
    const t = getTypes();
    const helper = file.addHelper("regeneratorRuntime");
    return t.memberExpression(
      // In some cases, `helper` will be (() => regeneratorRuntime).
      // Se the implementation in transform-runtime for more details.
      t.isArrowFunctionExpression(helper) &&
        t.isIdentifier((helper as any).body)
        ? (helper as any).body
        : t.callExpression(helper, []),
      t.identifier(name),
      false,
    );
  };
}

export function isReference(path: any) {
  return (
    path.isReferenced() ||
    path.parentPath.isAssignmentExpression({ left: path.node })
  );
}

export function replaceWithOrRemove(path: any, replacement: any) {
  if (replacement) {
    path.replaceWith(replacement);
  } else {
    path.remove();
  }
}
