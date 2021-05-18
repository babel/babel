import type { HubInterface } from "../hub";
import type TraversalContext from "../context";
import * as virtualTypes from "./lib/virtual-types";
import buildDebug from "debug";
import traverse from "../index";
import type { Visitor } from "../types";
import Scope from "../scope";
import * as t from "@babel/types";
import { path as pathCache } from "../cache";
import generator from "@babel/generator";

// NodePath is split across many files.
import * as NodePath_ancestry from "./ancestry";
import * as NodePath_inference from "./inference";
import * as NodePath_replacement from "./replacement";
import * as NodePath_evaluation from "./evaluation";
import * as NodePath_conversion from "./conversion";
import * as NodePath_introspection from "./introspection";
import * as NodePath_context from "./context";
import * as NodePath_removal from "./removal";
import * as NodePath_modification from "./modification";
import * as NodePath_family from "./family";
import * as NodePath_comments from "./comments";
import type { NodePathAssetions } from "./generated/asserts";
import type { NodePathValidators } from "./generated/validators";

const debug = buildDebug("babel");

export const REMOVED = 1 << 0;
export const SHOULD_STOP = 1 << 1;
export const SHOULD_SKIP = 1 << 2;

// TODO: When TS supports defining the variance of type parameters ([1]), T
// should be marked as contravariant.
// It would make `NodePath<A | B>` and `NodePath<A> | NodePath<B>` equivalent, making
// them work better with type refinement where we migth have multiple checks
// such as `path.isIfStatement() || path.isConditionalExpression()`.
//
// [1]: https://github.com/microsoft/TypeScript/issues/10717#issuecomment-246726793
class NodePath<T extends t.Node = t.Node> {
  constructor(hub: HubInterface, parent: t.Node) {
    this.parent = parent;
    this.hub = hub;
    this.data = null;

    this.context = null;
    this.scope = null;
  }

  declare parent: t.Node;
  declare hub: HubInterface;
  declare data: object;
  declare context: TraversalContext;
  declare scope: Scope;

  contexts: Array<TraversalContext> = [];
  state: any = null;
  opts: any = null;
  // this.shouldSkip = false; this.shouldStop = false; this.removed = false;
  _traverseFlags: number = 0;
  skipKeys: any = null;
  parentPath: NodePath | null = null;
  container: object | null | Array<any> = null;
  listKey: string | null = null;
  key: string | number | null = null;
  node: T = null;
  type: string | null = null;

  static get({
    hub,
    parentPath,
    parent,
    container,
    listKey,
    key,
  }: {
    hub?;
    parentPath;
    parent;
    container;
    listKey?;
    key;
  }): NodePath {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    if (!parent) {
      throw new Error("To get a node path the parent needs to exist");
    }

    const targetNode = container[key];

    let paths = pathCache.get(parent);
    if (!paths) {
      paths = new Map();
      pathCache.set(parent, paths);
    }

    let path = paths.get(targetNode);
    if (!path) {
      path = new NodePath(hub, parent);
      if (targetNode) paths.set(targetNode, path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  }

  getScope(scope: Scope) {
    return this.isScope() ? new Scope(this) : scope;
  }

  setData(key: string | symbol, val: any): any {
    if (this.data == null) {
      this.data = Object.create(null);
    }
    return (this.data[key] = val);
  }

  getData(key: string | symbol, def?: any): any {
    if (this.data == null) {
      this.data = Object.create(null);
    }
    let val = this.data[key];
    if (val === undefined && def !== undefined) val = this.data[key] = def;
    return val;
  }

  buildCodeFrameError(
    msg: string,
    Error: ErrorConstructor = SyntaxError,
  ): Error {
    return this.hub.buildError(this.node, msg, Error);
  }

  traverse<T>(visitor: Visitor<T>, state: T): void;
  traverse(visitor: Visitor): void;
  traverse(visitor: any, state?: any) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  set(key: string, node: any) {
    t.validate(this.node, key, node);
    this.node[key] = node;
  }

  getPathLocation(): string {
    const parts = [];
    let path: NodePath = this;
    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while ((path = path.parentPath));
    return parts.join(".");
  }

  debug(message) {
    if (!debug.enabled) return;
    debug(`${this.getPathLocation()} ${this.type}: ${message}`);
  }

  toString() {
    return generator(this.node).code;
  }

  get inList() {
    return !!this.listKey;
  }

  set inList(inList) {
    if (!inList) {
      this.listKey = null;
    }
    // ignore inList = true as it should depend on `listKey`
  }

  get parentKey() {
    return this.listKey || this.key;
  }

  get shouldSkip() {
    return !!(this._traverseFlags & SHOULD_SKIP);
  }

  set shouldSkip(v) {
    if (v) {
      this._traverseFlags |= SHOULD_SKIP;
    } else {
      this._traverseFlags &= ~SHOULD_SKIP;
    }
  }

  get shouldStop() {
    return !!(this._traverseFlags & SHOULD_STOP);
  }

  set shouldStop(v) {
    if (v) {
      this._traverseFlags |= SHOULD_STOP;
    } else {
      this._traverseFlags &= ~SHOULD_STOP;
    }
  }

  get removed() {
    return !!(this._traverseFlags & REMOVED);
  }
  set removed(v) {
    if (v) {
      this._traverseFlags |= REMOVED;
    } else {
      this._traverseFlags &= ~REMOVED;
    }
  }
}

Object.assign(
  NodePath.prototype,
  NodePath_ancestry,
  NodePath_inference,
  NodePath_replacement,
  NodePath_evaluation,
  NodePath_conversion,
  NodePath_introspection,
  NodePath_context,
  NodePath_removal,
  NodePath_modification,
  NodePath_family,
  NodePath_comments,
);

for (const type of t.TYPES) {
  const typeKey = `is${type}`;
  const fn = t[typeKey];
  NodePath.prototype[typeKey] = function (opts) {
    return fn(this.node, opts);
  };

  NodePath.prototype[`assert${type}`] = function (opts) {
    if (!fn(this.node, opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

for (const type of Object.keys(virtualTypes)) {
  if (type[0] === "_") continue;
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  const virtualType = virtualTypes[type];

  NodePath.prototype[`is${type}`] = function (opts) {
    return virtualType.checkPath(this, opts);
  };
}

type NodePathMixins = typeof NodePath_ancestry &
  typeof NodePath_inference &
  typeof NodePath_replacement &
  typeof NodePath_evaluation &
  typeof NodePath_conversion &
  typeof NodePath_introspection &
  typeof NodePath_context &
  typeof NodePath_removal &
  typeof NodePath_modification &
  typeof NodePath_comments &
  typeof NodePath_family;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NodePath<T>
  extends NodePathAssetions,
    NodePathValidators,
    NodePathMixins {
  // Sometimes it's necessary to help TypeScript by specifying a value for `K` even when
  // the `key` parameter is a string literal. For example, in this code:
  //   function f<T extends t.Node>(expr: NodePath<T>) {
  //     if (!expr.isCallExpression()) return null;
  //     const a = expr.get("callee");
  //     const b = expr.get<"callee">("callee");
  //   }
  // as of TS 4.3 the first gget() call uses the `key: string` signature and returns
  // `NodePath | NodePath[]`, while the second .get() call correctly returns
  // `NodePath<t.Expression | t.V8IntrinsicIdentifier>`.
  // I (@nicolo-ribaudo) don't understand why TypeScript's inference fails here so I
  // cannot fix it, but I can at least make it easier to specify the `K` type argument
  // by removing the `T` type argument when calling `get()` as a method on `NodePath`,
  // so that users of our type definitions (and ourselves!) don't have to manually
  // specify it.
  // This function is implemented as a standalone function in `family.ts`, and its type
  // arguments there are still `<T extends t.Node, K extends keyof T>`.
  get<K extends keyof T>(
    key: K,
    context?: boolean | TraversalContext,
  ): /* prettier-ignore */ (
      T[K] extends Array<t.Node>        ? Array<NodePath<T[K][number]>>
    : T[K] extends Array<t.Node | null> ? Array<NodePath<Exclude<T[K][number], null & T[K][number]>> | null>
    : T[K] extends t.Node               ? NodePath<T[K]>
    : T[K] extends t.Node | null        ? null
    : never
  );
  get(key: string, context?: boolean | TraversalContext): NodePath | NodePath[];
}

export default NodePath;
