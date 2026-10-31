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

/**
 * Where the reference to an object literal, captured by its methods using
 * `super`, is bound: it depends on the context evaluating the literal.
 */
type ObjectRefSite =
  /** A loop header, evaluated by each iteration: each definition captures it. */
  | { kind: "header"; loop: NodePath<t.Loop> }
  /** A parameter or instance field, evaluated by each call or instance: an IIFE. */
  | { kind: "evaluation" }
  /** A loop body, which the header can't see: a `let` declared on exit. */
  | { kind: "body"; loop: NodePath<t.Loop> }
  /** A `var` of the enclosing function. */
  | { kind: "hoisted" };

const hoistedSite: ObjectRefSite = { kind: "hoisted" };

function getObjectRefSite(path: NodePath<t.ObjectExpression>): ObjectRefSite {
  let child: NodePath = path;
  let parent: NodePath | null = path.parentPath;
  while (parent) {
    if (parent.isFunction()) {
      if (child.listKey === "params") return { kind: "evaluation" };
      // Computed keys and decorators are evaluated in the enclosing context
      if (child.key !== "key" && child.listKey !== "decorators") {
        return hoistedSite;
      }
    } else if (parent.isProgram() || parent.isStaticBlock()) {
      return hoistedSite;
    } else if (
      (parent.isClassProperty({ static: false }) ||
        parent.isClassPrivateProperty({ static: false }) ||
        parent.isClassAccessorProperty({ static: false })) &&
      child.key === "value"
    ) {
      return { kind: "evaluation" };
    } else if (parent.isLoop()) {
      if (child.key === "body") return { kind: "body", loop: parent };
      if (
        parent.isWhileStatement() ||
        parent.isDoWhileStatement() ||
        (parent.isForStatement() && child.key !== "init") ||
        (parent.isForXStatement() && child.key === "left")
      ) {
        return { kind: "header", loop: parent };
      }
    }
    child = parent;
    parent = parent.parentPath;
  }
  return hoistedSite;
}

/** For `t.traverseFast`: stop at a `super` node. */
function stopAtSuper(node: t.Node) {
  return t.isSuper(node) ? t.traverseFast.stop : undefined;
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

  const properties = path.get("properties");
  const site = properties.some(prop => prop.isObjectMethod())
    ? getObjectRefSite(path)
    : hoistedSite;
  const captureInHeader = site.kind === "header";
  // The methods using `super`, with the function forgetting their scope
  // information, collected before `super` is replaced (with clones of nodes)
  const superMethods = new Map<t.Node, () => void>();
  let objectRef: t.Identifier | undefined;
  let seenSpread = false;
  // Accessors after a spread must be defined individually on the target:
  // copying their full descriptors would erase an earlier getter or setter.
  let definesAccessors = false;
  for (const prop of properties) {
    if (prop.isSpreadElement()) seenSpread = true;
    if (!prop.isObjectMethod()) continue;
    if (seenSpread && prop.node.kind !== "method") definesAccessors = true;
    // The first object is the final target, so its native methods already
    // have the right home object, without capturing a shared header binding.
    if (captureInHeader && !seenSpread) continue;
    if (!t.traverseFast(prop.node, stopAtSuper)) continue;
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
    definesAccessors &&
    path.scope.hasBinding("Object", { noGlobals: true })
  ) {
    // The descriptors of the accessors are read through the global Object.
    path.scope.rename("Object");
  }

  // The properties and spread arguments are only moved to the replacement:
  // they keep their paths, and their scope information.
  const moved = new Map<t.Node, NodePath>();
  for (const prop of properties) {
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

  // Assigning the following properties to the target would call the
  // accessors defined individually, instead of replacing them.
  const assigns = setSpreadProperties && !definesAccessors;
  const helper = assigns
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
      // The first object is the target of every call, and the result. Its
      // reference is assigned before copying the properties, which can call
      // the getters using `super` (with `setSpreadProperties` or
      // `pureGetters`).
      exp = t.callExpression(helper, [
        objectRef && !captureInHeader
          ? t.assignmentExpression("=", t.cloneNode(objectRef), obj)
          : obj,
      ]);
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
      // objectSpread2 copies its odd arguments with [[Get]]: a spread
      // following another one in a merged call (pureGetters) must not be
      // copied with its property descriptors.
      if (!assigns && exp!.arguments.length % 2 === 0) {
        exp!.arguments.push(t.objectExpression([]));
      }
      exp!.arguments.push(prop.argument);
    } else if (
      exp &&
      t.isObjectMethod(prop) &&
      (prop.kind !== "method" || (captureInHeader && superMethods.has(prop)))
    ) {
      if (props.length) make();
      // Before its key is moved out of the closure
      forgetMoved(prop);
      // A factory capturing the target defines the property: in a loop
      // header, each evaluation captures its own reference for `super`; and
      // the coerced computed key of an accessor is used twice. The key stays
      // outside the closure, so yield/await retain their environment.
      const params: t.Identifier[] = [];
      const args: t.Expression[] = [];
      let target: t.Expression = exp;
      const captures = captureInHeader && superMethods.has(prop);
      if (captures || (prop.computed && prop.kind !== "method")) {
        // Outside of a loop header, the reference of the target is the same
        const id = objectRef ?? path.scope.generateUidIdentifier("obj");
        params.push(t.cloneNode(id));
        args.push(exp);
        target = t.cloneNode(id);
      }
      // The key of an accessor, to read its descriptor. A static key keeps
      // the accessor name, without a computed key that
      // transform-computed-properties would turn into a function expression.
      let accessorKey = t.toComputedKey(prop) as t.Expression;
      if (prop.computed && params.length) {
        args.push(
          prop.kind === "method"
            ? prop.key
            : t.callExpression(file.addHelper("toPropertyKey"), [prop.key]),
        );
        const key = path.scope.generateUidIdentifier("key");
        params.push(key);
        prop.key = t.cloneNode(key);
        accessorKey = key;
      }
      const object = t.objectExpression([prop]);
      const definition: t.CallExpression =
        prop.kind === "method"
          ? t.callExpression(t.cloneNode(helper), [
              target,
              t.objectExpression([]),
              object,
            ])
          : t.callExpression(file.addHelper("defineAccessor"), [
              t.stringLiteral(prop.kind),
              target,
              t.cloneNode(accessorKey),
              t.memberExpression(
                t.callExpression(
                  t.memberExpression(
                    t.identifier("Object"),
                    t.identifier("getOwnPropertyDescriptor"),
                  ),
                  [object, t.cloneNode(accessorKey)],
                ),
                t.identifier(prop.kind),
              ),
            ]);
      exp = params.length
        ? t.callExpression(t.arrowFunctionExpression(params, definition), args)
        : definition;
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

  const replacementNode: t.Expression = exp!;
  // Each instance or call needs its own captured reference.
  const wrapInIIFE = objectRef && site.kind === "evaluation";
  if (objectRef && site.kind === "hoisted") {
    pushHoistedVars(path.scope, [objectRef]);
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
  if (objectRef && site.kind === "body") {
    // Declared when exiting the loop, for each iteration
    const refs: LoopObjectRef[] = site.loop.getData(loopRefsKey) ?? [];
    refs.push({ id: objectRef, replacement });
    site.loop.setData(loopRefsKey, refs);
  }
}
