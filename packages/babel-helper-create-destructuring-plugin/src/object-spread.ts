import { types as t } from "@babel/core";
import type { NodePath, PluginPass } from "@babel/core";
import { FEATURES, type ResolvedOptions } from "./features.ts";
import ReplaceSupers from "@babel/helper-replace-supers";
import {
  adoptMovedPaths,
  collectScopeInfo,
  pushHoistedVars,
  registerScopeInfo,
} from "./scope.ts";
import { getExtendsHelper, wrapBodyInBlock } from "./util.ts";

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
        (parent.isForStatement() && child.key !== "init") ||
        (parent.isForXStatement() && child.key === "left")
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

interface LoopObjectRef {
  id: t.Identifier;
  /** The lowered object expression, which references `id` */
  replacement: NodePath;
}

export function finishObjectSpreadLoop(path: NodePath<t.Loop>) {
  const refs: LoopObjectRef[] | undefined = path.getData(loopRefsKey);
  if (!refs) return;
  path.setData(loopRefsKey, undefined);
  const replacements = refs
    .map(ref => ref.replacement)
    .filter(replacement => !replacement.removed);
  // `scope.push` would wrap a body that is not a block in a new block, whose
  // scope is crawled again through new paths.
  if (!path.get("body").isBlockStatement()) {
    const bodyPath = path.get("body");
    wrapBodyInBlock(path);
    // The paths from the body to the replacements still have the scope of
    // the loop, which their children would get.
    for (const replacement of replacements) {
      const ancestors: NodePath[] = [];
      for (let p = replacement; p !== bodyPath; p = p.parentPath!) {
        ancestors.push(p);
      }
      for (const p of ancestors.reverse()) p.setContext(p.context);
    }
  }
  const program = path.scope.getProgramParent();
  for (const { id } of refs) {
    path.scope.push({ id, kind: "let" });
    // Its references were registered as a global before it was declared
    delete program.globals[id.name];
  }
  registerScopeInfo(replacements);
  // Let transform-block-scoping see the new per-iteration bindings: they are
  // declared after it visited the loop, but before it visits the body
  // declarations again (it would turn them into `var`s first).
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
  // The methods using `super`, with the function forgetting their scope
  // information, collected before `super` is replaced (with clones of nodes)
  const superMethods = new Map<t.Node, () => void>();
  let objectRef: t.Identifier | undefined;
  let seenSpread = false;
  for (const prop of path.get("properties")) {
    if (prop.isSpreadElement()) seenSpread = true;
    if (!prop.isObjectMethod()) continue;
    // The first object is the final target, so its native methods already
    // have the right home object, without capturing a shared header binding.
    if (captureInHeader && !seenSpread) continue;
    const forget = collectScopeInfo(prop);
    new ReplaceSupers({
      methodPath: prop,
      file: file.file,
      getObjectRef: () => {
        superMethods.set(prop.node, forget);
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
  // Except the properties registered again with new paths: the methods whose
  // `super` was replaced by nodes without scope information, and the ones
  // moved into a new arrow, whose scope is crawled when its path is set up.
  const forgets: (() => void)[] = [];
  const forgetMoved = (prop: t.Node) => {
    const propPath = moved.get(prop);
    if (!propPath) return;
    moved.delete(prop);
    forgets.push(superMethods.get(prop) ?? collectScopeInfo(propPath));
  };
  for (const method of superMethods.keys()) forgetMoved(method);

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
      // Before its key is moved out of the closure
      forgetMoved(prop);
      const params = [t.cloneNode(objectRef)];
      const args: t.Expression[] = [exp];
      // The key of an accessor, to read its descriptor
      let accessorKey: t.Expression | undefined;
      if (prop.computed) {
        // Evaluate computed keys outside the closure, preserving lexical
        // references and allowing yield/await in the original function.
        args.push(
          prop.kind === "method"
            ? prop.key
            : t.callExpression(file.addHelper("toPropertyKey"), [prop.key]),
        );
        const key = path.scope.generateUidIdentifier("key");
        params.push(key);
        prop.key = t.cloneNode(key);
        accessorKey = key;
      } else if (prop.kind !== "method") {
        // A static key keeps the accessor name, without a computed key that
        // transform-computed-properties would turn into a function expression.
        accessorKey = t.toComputedKey(prop) as t.Expression;
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

  let replacementNode: t.Expression = exp!;
  // Each instance or call needs its own captured reference.
  const wrapInIIFE = objectRef && repeatedContext && !captureInHeader;
  let loop: NodePath<t.Loop> | null = null;
  if (objectRef && !captureInHeader) {
    replacementNode = t.assignmentExpression("=", t.cloneNode(objectRef), exp!);
    if (!repeatedContext) loop = declareObjectRef(path, objectRef);
  }
  const [replacement] = path.replaceWith(
    wrapInIIFE
      ? // An arrow preserves the lexical this/super/new.target/arguments
        // environment of the field initializer or parameter. Empty when its
        // path is set up, which crawls its scope (declaring the parameter).
        t.callExpression(
          t.arrowFunctionExpression(
            [t.cloneNode(objectRef!)],
            t.buildUndefinedNode(),
          ),
          [],
        )
      : replacementNode,
  );
  if (wrapInIIFE) {
    (
      replacement.get("callee") as NodePath<t.ArrowFunctionExpression>
    ).node.body = replacementNode;
  }
  for (const forget of forgets) forget();
  adoptMovedPaths(replacement, moved);
  if (loop) {
    const refs: LoopObjectRef[] = loop.getData(loopRefsKey) ?? [];
    refs.push({ id: objectRef!, replacement });
    loop.setData(loopRefsKey, refs);
  }
}

/**
 * Declare the reference to the object whose methods use `super`. Returns the
 * loop whose iterations need their own reference: it is declared when
 * exiting the loop.
 */
function declareObjectRef(
  path: NodePath<t.ObjectExpression>,
  objectRef: t.Identifier,
): NodePath<t.Loop> | null {
  const scopePath = path.findParent(
    p =>
      p.isFunction() ||
      p.isProgram() ||
      // Loop headers cannot see declarations in the loop body.
      (p.isLoop() && path.isDescendant(p.get("body"))),
  )!;
  if (scopePath.isLoop()) return scopePath;
  pushHoistedVars(path.scope, [objectRef]);
  return null;
}
