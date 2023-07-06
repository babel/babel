import type { HubInterface } from "../hub";
import type TraversalContext from "../context";
import type { ExplodedTraverseOptions } from "..";
import * as virtualTypes from "./lib/virtual-types";
import buildDebug from "debug";
import traverse from "../index";
import type { Visitor } from "../types";
import Scope from "../scope";
import { validate } from "@babel/types";
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
import * as NodePath_virtual_types_validator from "./lib/virtual-types-validator";
import type { NodePathAssertions } from "./generated/asserts";
import type { NodePathValidators } from "./generated/validators";

const debug = buildDebug("babel");

export const REMOVED = 1 << 0;
export const SHOULD_STOP = 1 << 1;
export const SHOULD_SKIP = 1 << 2;

class NodePath<T extends t.Node = t.Node> {
  constructor(hub: HubInterface, parent: t.ParentMaps[T["type"]]) {
    this.parent = parent;
    this.hub = hub;
    this.data = null;

    this.context = null;
    this.scope = null;
  }

  declare parent: t.ParentMaps[T["type"]];
  declare hub: HubInterface;
  declare data: Record<string | symbol, unknown>;
  // TraversalContext is configured by setContext
  declare context: TraversalContext;
  declare scope: Scope;

  contexts: Array<TraversalContext> = [];
  state: any = null;
  opts: ExplodedTraverseOptions | null = null;
  // this.shouldSkip = false; this.shouldStop = false; this.removed = false;
  _traverseFlags: number = 0;
  skipKeys: Record<string, boolean> | null = null;
  parentPath: t.ParentMaps[T["type"]] extends null
    ? null
    : NodePath<t.ParentMaps[T["type"]]> | null = null;
  container: t.Node | Array<t.Node> | null = null;
  listKey: string | null = null;
  key: string | number | null = null;
  node: T = null;
  type: T["type"] | null = null;

  static get({
    hub,
    parentPath,
    parent,
    container,
    listKey,
    key,
  }: {
    hub?: HubInterface;
    parentPath: NodePath | null;
    parent: t.Node;
    container: t.Node | t.Node[];
    listKey?: string;
    key: string | number;
  }): NodePath {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    if (!parent) {
      throw new Error("To get a node path the parent needs to exist");
    }

    const targetNode =
      // @ts-expect-error key must present in container
      container[key];

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

  getScope(scope: Scope): Scope {
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

  hasNode(): this is NodePath<NonNullable<this["node"]>> {
    return this.node != null;
  }

  buildCodeFrameError(
    msg: string,
    Error: new () => Error = SyntaxError,
  ): Error {
    return this.hub.buildError(this.node, msg, Error);
  }

  traverse<T>(visitor: Visitor<T>, state: T): void;
  traverse(visitor: Visitor): void;
  traverse(visitor: any, state?: any) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  set(key: string, node: any) {
    validate(this.node, key, node);
    // @ts-expect-error key must present in this.node
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

  debug(message: string) {
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

  get parentKey(): string {
    return (this.listKey || this.key) as string;
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

if (!process.env.BABEL_8_BREAKING) {
  // @ts-expect-error The original _guessExecutionStatusRelativeToDifferentFunctions only worked for paths in
  // different functions, but _guessExecutionStatusRelativeTo works as a replacement in those cases.
  NodePath.prototype._guessExecutionStatusRelativeToDifferentFunctions =
    NodePath_introspection._guessExecutionStatusRelativeTo;
}

// we can not use `import { TYPES } from "@babel/types"` here
// because the transformNamedBabelTypesImportToDestructuring plugin in babel.config.js
// does not offer live bindings for `TYPES`
// we can change to `import { TYPES }` when we are publishing ES modules only
for (const type of t.TYPES) {
  const typeKey = `is${type}`;
  // @ts-expect-error typeKey must present in t
  const fn = t[typeKey];
  // @ts-expect-error augmenting NodePath prototype
  NodePath.prototype[typeKey] = function (opts: any) {
    return fn(this.node, opts);
  };

  // @ts-expect-error augmenting NodePath prototype
  NodePath.prototype[`assert${type}`] = function (opts: any) {
    if (!fn(this.node, opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

// Register virtual types validators after base types validators
Object.assign(NodePath.prototype, NodePath_virtual_types_validator);

for (const type of Object.keys(virtualTypes) as (keyof typeof virtualTypes)[]) {
  if (type[0] === "_") continue;
  if (!t.TYPES.includes(type)) t.TYPES.push(type);
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
  typeof NodePath_family &
  typeof NodePath_comments;

// @ts-expect-error TS throws because ensureBlock returns the body node path
// however, we don't use the return value and treat it as a transform and
// assertion utilities. For better type inference we annotate it as an
// assertion method
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface NodePath<T>
  extends NodePathAssertions,
    NodePathValidators,
    NodePathMixins {
  /**
   * @see ./conversion.ts for implementation
   */
  ensureBlock<
    T extends
      | t.Loop
      | t.WithStatement
      | t.Function
      | t.LabeledStatement
      | t.CatchClause,
  >(
    this: NodePath<T>,
  ): asserts this is NodePath<T & { body: t.BlockStatement }>;
}

export default NodePath;
