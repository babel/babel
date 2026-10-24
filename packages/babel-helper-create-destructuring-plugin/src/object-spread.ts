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

/** `__proto__: value`, which sets the prototype of the object literal. */
function isProtoSetter(
  prop: t.ObjectExpression["properties"][number],
): prop is t.ObjectProperty {
  return (
    t.isObjectProperty(prop) &&
    !prop.computed &&
    !prop.shorthand &&
    (t.isIdentifier(prop.key, { name: "__proto__" }) ||
      t.isStringLiteral(prop.key, { value: "__proto__" }))
  );
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
  // Whether `exp` is a call to `helper`, which more arguments can be added to
  let isHelperCall = false;
  let props: t.ObjectMember[] = [];

  function make() {
    const hadProps = props.length > 0;
    const obj = t.objectExpression(props);
    props = [];

    if (!exp) {
      exp = t.callExpression(helper, [obj]);
      isHelperCall = true;
      return;
    }

    // When we can assume that getters are pure and don't depend on
    // the order of evaluation, we can avoid making multiple calls.
    if (pureGetters && isHelperCall) {
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
    isHelperCall = true;
  }

  for (const prop of path.node.properties) {
    if (t.isSpreadElement(prop)) {
      make();
      exp!.arguments.push(prop.argument);
    } else if (exp && isProtoSetter(prop)) {
      // The object already exists: set its prototype when the property is
      // evaluated. A value that is neither an object nor null is ignored,
      // and the prototype stays `Object.prototype`:
      //   setPrototypeOf(obj, getPrototypeOf({ __proto__: value }))
      if (props.length) make();
      exp = t.callExpression(file.addHelper("setPrototypeOf"), [
        exp,
        t.callExpression(file.addHelper("getPrototypeOf"), [
          t.objectExpression([prop]),
        ]),
      ]);
      isHelperCall = false;
    } else {
      props.push(prop);
    }
  }

  if (props.length) make();

  forgetScopeInfo();
  registerReplacement(path.replaceWith(exp!), path.scope);
}
