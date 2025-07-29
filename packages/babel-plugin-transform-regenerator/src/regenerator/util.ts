import type { PluginPass } from "@babel/core";
import { types as t } from "@babel/core";

export let newHelpersAvailable: (file: PluginPass) => boolean;
if (!process.env.BABEL_8_BREAKING) {
  newHelpersAvailable = (file: PluginPass) => {
    if (!process.env.IS_PUBLISH && process.env.FORCE_OLD_REGENERATOR) {
      // Only for testing purposes.
      return false;
    }
    return (
      file.availableHelper("regenerator") &&
      // At this point, we can safely try to inject the `regenerator` helper.
      // If this plugin tries to inject any helper, than we are sure that
      // `regenerator` is one of them.
      !t.isIdentifier(file.addHelper("regenerator"), {
        // This is a special marker returned by transform-runtime, which means
        // "the version of `@babel/runtime` does not have the helper".
        // Normally transform-runtime will fallback to just injecting the
        // helper inline, but we special handle this case to instead be able
        // to fallback to the old `regeneratorRuntime` helper
        name: "__interal_marker_fallback_regenerator__",
      })
    );
  };
}

export let runtimeProperty: (file: PluginPass, name: any) => any;
if (!process.env.BABEL_8_BREAKING) {
  runtimeProperty = function (file, name) {
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
