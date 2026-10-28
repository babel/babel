import { types as t } from "@babel/core";
import type { NodePath, PluginPass } from "@babel/core";
import { FEATURES, type ResolvedOptions } from "./features.ts";
import ReplaceSupers from "@babel/helper-replace-supers";
import { adoptMovedPaths } from "./scope.ts";
import { getExtendsHelper } from "./util.ts";

function hasSpread(node: t.ObjectExpression): boolean {
  return node.properties.some(prop => t.isSpreadElement(prop));
}

/** A context that evaluates the literal repeatedly without a fresh scope. */
function getRepeatedEvaluationContext(path: NodePath<t.ObjectExpression>) {
  let child: NodePath = path;
  let parent: NodePath | null = path.parentPath;
  while (parent) {
    if (parent.isFunction() && child.listKey === "params") return parent;
    if (
      (parent.isFunction() &&
        child.key !== "key" &&
        child.listKey !== "decorators") ||
      parent.isProgram() ||
      parent.isStaticBlock()
    ) {
      return null;
    }
    if (
      (parent.isClassProperty({ static: false }) ||
        parent.isClassPrivateProperty({ static: false }) ||
        parent.isClassAccessorProperty({ static: false })) &&
      child.key === "value"
    ) {
      return parent;
    }
    if (parent.isLoop()) {
      if (child.key === "body") return null;
      if (
        parent.isWhileStatement() ||
        parent.isDoWhileStatement() ||
        (parent.isForStatement() && child.key !== "init")
      ) {
        return parent;
      }
    }
    child = parent;
    parent = parent.parentPath;
  }
  return null;
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

const loopRefsKey = "@babel/helper-create-destructuring-plugin/objectSuper";

export function finishObjectSpreadLoop(path: NodePath<t.Loop>) {
  const refs: t.Identifier[] | undefined = path.getData(loopRefsKey);
  if (!refs) return;
  path.setData(loopRefsKey, undefined);
  for (const id of refs) path.scope.push({ id, kind: "let" });
  path.scope.getProgramParent().crawl();
  // Let transform-block-scoping see the new per-iteration bindings.
  path.requeue();
}

/**
 * var a = { ...b, ...c }
 */
export function transformObjectSpread(
  path: NodePath<t.ObjectExpression>,
  file: PluginPass,
  options: ResolvedOptions,
) {
  if (!(options.features & FEATURES.objectSpread) || !hasSpread(path.node)) {
    return;
  }

  const repeatedContext = path.node.properties.some(prop =>
    t.isObjectMethod(prop),
  )
    ? getRepeatedEvaluationContext(path)
    : null;
  const captureInHeader = repeatedContext?.isLoop();
  const superMethods = new Set<t.ObjectMethod>();
  let objectRef: t.Identifier | undefined;
  let seenSpread = false;
  for (const prop of path.get("properties")) {
    if (prop.isSpreadElement()) seenSpread = true;
    if (!prop.isObjectMethod()) continue;
    // The first object is the final target, so its native methods already
    // have the right home object, without capturing a shared header binding.
    if (captureInHeader && !seenSpread) continue;
    new ReplaceSupers({
      methodPath: prop,
      file: file.file,
      getObjectRef: () => {
        superMethods.add(prop.node);
        return (objectRef ??= path.scope.generateUidIdentifier("obj"));
      },
    }).replace();
  }
  if (
    captureInHeader &&
    objectRef &&
    path.node.properties.some(
      prop => t.isObjectMethod(prop) && prop.kind !== "method",
    ) &&
    path.scope.hasBinding("Object", { noGlobals: true })
  ) {
    // Accessor factories read their descriptor through the global Object.
    path.scope.rename("Object");
  }

  // The properties and spread arguments are only moved to the replacement:
  // they keep their paths, and their scope information.
  const moved = new Map<t.Node, NodePath>();
  for (const prop of path.get("properties")) {
    const movedPath = prop.isSpreadElement() ? prop.get("argument") : prop;
    moved.set(movedPath.node, movedPath);
  }

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
    } else if (
      captureInHeader &&
      exp &&
      t.isObjectMethod(prop) &&
      objectRef &&
      (superMethods.has(prop) || prop.kind !== "method")
    ) {
      if (props.length) make();
      const params = [t.cloneNode(objectRef)];
      const args: t.Expression[] = [exp];
      let accessorKey: t.Identifier | undefined;
      if (prop.computed || prop.kind !== "method") {
        // Evaluate computed keys outside the closure, preserving lexical
        // references and allowing yield/await in the original function.
        if (prop.computed) {
          moved.set(prop.key, moved.get(prop)!.get("key") as NodePath);
        }
        args.push(
          prop.kind === "method"
            ? prop.key
            : t.callExpression(file.addHelper("toPropertyKey"), [
                t.toComputedKey(prop) as t.Expression,
              ]),
        );
        const key = path.scope.generateUidIdentifier("key");
        params.push(key);
        prop.key = t.cloneNode(key);
        prop.computed = true;
        accessorKey = key;
      }
      const object = t.objectExpression([prop]);
      const body =
        prop.kind === "method"
          ? t.callExpression(t.cloneNode(helper), [
              t.cloneNode(objectRef),
              t.objectExpression([]),
              object,
            ])
          : t.callExpression(file.addHelper("defineAccessor"), [
              t.stringLiteral(prop.kind),
              t.cloneNode(objectRef),
              t.cloneNode(accessorKey!),
              t.memberExpression(
                t.callExpression(
                  t.memberExpression(
                    t.identifier("Object"),
                    t.identifier("getOwnPropertyDescriptor"),
                  ),
                  [object, t.cloneNode(accessorKey!)],
                ),
                t.identifier(prop.kind),
              ),
            ]);
      // Capture the target as a parameter of the method factory. Its key
      // stays outside the closure, so yield/await retain their environment.
      exp = t.callExpression(t.arrowFunctionExpression(params, body), args);
      isHelperCall = false;
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

  const [replacement] = path.replaceWith(
    objectRef && !captureInHeader
      ? t.assignmentExpression("=", t.cloneNode(objectRef), exp!)
      : exp!,
  );
  adoptMovedPaths(replacement, moved);

  if (!objectRef) return;
  if (repeatedContext && !captureInHeader) {
    // Each instance or call needs its own captured reference. An arrow
    // preserves the lexical this/super/new.target/arguments environment of
    // the field initializer or parameter.
    path.replaceWith(
      t.callExpression(
        t.arrowFunctionExpression([t.cloneNode(objectRef)], path.node),
        [],
      ),
    );
  } else if (!captureInHeader) {
    const scopePath = path.findParent(
      p =>
        p.isFunction() ||
        p.isProgram() ||
        // Loop headers cannot see declarations in the loop body.
        (p.isLoop() && path.isDescendant(p.get("body"))),
    )!;
    if (scopePath.isLoop()) {
      const refs: t.Identifier[] = scopePath.getData(loopRefsKey) ?? [];
      refs.push(objectRef);
      scopePath.setData(loopRefsKey, refs);
    } else {
      path.scope.push({ id: objectRef });
    }
  }
  // Replacing super introduced references inside the moved methods.
  path.scope.getProgramParent().crawl();
}
