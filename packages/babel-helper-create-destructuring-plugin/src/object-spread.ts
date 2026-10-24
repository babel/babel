import { types as t } from "@babel/core";
import type { NodePath, PluginPass } from "@babel/core";
import type { ResolvedOptions } from "./features.ts";
import { collectScopeInfo, registerReplacement } from "./scope.ts";
import { getExtendsHelper } from "./util.ts";

function hasSpread(node: t.ObjectExpression): boolean {
  for (const prop of node.properties) {
    if (t.isSpreadElement(prop)) {
      return true;
    }
  }
  return false;
}

/**
 * var a = { ...b, ...c }
 */
export function transformObjectSpread(
  path: NodePath<t.ObjectExpression>,
  file: PluginPass,
  options: ResolvedOptions,
) {
  if (!hasSpread(path.node)) return;

  const forgetScopeInfo = collectScopeInfo(path);
  const { useBuiltIns, pureGetters, setSpreadProperties } = options;

  const helper = setSpreadProperties
    ? getExtendsHelper(useBuiltIns, name => file.addHelper(name))
    : file.addHelper("objectSpread2");

  let exp: t.CallExpression | null = null;
  let props: t.ObjectMember[] = [];

  function make() {
    const hadProps = props.length > 0;
    const obj = t.objectExpression(props);
    props = [];

    if (!exp) {
      exp = t.callExpression(helper, [obj]);
      return;
    }

    // When we can assume that getters are pure and don't depend on
    // the order of evaluation, we can avoid making multiple calls.
    if (pureGetters) {
      if (hadProps) {
        exp.arguments.push(obj);
      }
      return;
    }

    exp = t.callExpression(t.cloneNode(helper), [
      exp,
      // If we have static props, we need to insert an empty object
      // because the odd arguments are copied with [[Get]], not
      // [[GetOwnProperty]]
      ...(hadProps ? [t.objectExpression([]), obj] : []),
    ]);
  }

  for (const prop of path.node.properties) {
    if (t.isSpreadElement(prop)) {
      make();
      exp!.arguments.push(prop.argument);
    } else {
      props.push(prop);
    }
  }

  if (props.length) make();

  forgetScopeInfo();
  registerReplacement(path.replaceWith(exp!), path.scope);
}
