import type { HubInterface } from "../hub.ts";
import type TraversalContext from "../context.ts";
import type { ExplodedTraverseOptions } from "../index.ts";
import * as virtualTypes from "./lib/virtual-types.ts";
import buildDebug from "debug";
import traverse from "../index.ts";
import type { Visitor } from "../types.ts";
import Scope from "../scope/index.ts";
import { validate } from "@babel/types";
import * as t from "@babel/types";
import * as cache from "../cache.ts";
import generator from "@babel/generator";

// NodePath is split across many files.
import * as NodePath_ancestry from "./ancestry.ts";
import * as NodePath_inference from "./inference/index.ts";
import * as NodePath_replacement from "./replacement.ts";
import * as NodePath_evaluation from "./evaluation.ts";
import * as NodePath_conversion from "./conversion.ts";
import * as NodePath_introspection from "./introspection.ts";
import * as NodePath_context from "./context.ts";
import * as NodePath_removal from "./removal.ts";
import * as NodePath_modification from "./modification.ts";
import * as NodePath_family from "./family.ts";
import * as NodePath_comments from "./comments.ts";
import * as NodePath_virtual_types_validator from "./lib/virtual-types-validator.ts";
import type { NodePathAssertions } from "./generated/asserts.ts";
import type { NodePathValidators } from "./generated/validators.ts";

const debug = buildDebug("babel");

export const REMOVED = 1 << 0;
export const SHOULD_STOP = 1 << 1;
export const SHOULD_SKIP = 1 << 2;

const NodePath_Final = class NodePath {
  constructor(hub: HubInterface, parent: t.Node | null) {
    this.parent = parent;
    this.hub = hub;
    this.data = null;

    this.context = null;
    this.scope = null;
  }

  declare parent: t.Node;
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
  parentPath: NodePath_Final | null = null;
  container: t.Node | Array<t.Node> | null = null;
  listKey: string | null = null;
  key: string | number | null = null;
  node: t.Node | null = null;
  type: t.Node["type"] | null = null;

  static get({
    hub,
    parentPath,
    parent,
    container,
    listKey,
    key,
  }: {
    hub?: HubInterface;
    parentPath: NodePath_Final | null;
    parent: t.Node;
    container: t.Node | t.Node[];
    listKey?: string;
    key: string | number;
  }): NodePath_Final {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    if (!parent) {
      throw new Error("To get a node path the parent needs to exist");
    }

    const targetNode =
      // @ts-expect-error key must present in container
      container[key];

    const paths = cache.getOrCreateCachedPaths(hub, parent);

    let path = paths.get(targetNode);
    if (!path) {
      path = new NodePath(hub, parent) as NodePath_Final;
      if (targetNode) paths.set(targetNode, path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  }

  getScope(this: NodePath_Final, scope: Scope): Scope {
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

  hasNode(): boolean {
    return this.node != null;
  }

  buildCodeFrameError(
    msg: string,
    Error: new () => Error = SyntaxError,
  ): Error {
    return this.hub.buildError(this.node, msg, Error);
  }

  traverse<T>(this: NodePath_Final, visitor: Visitor<T>, state: T): void;
  traverse(this: NodePath_Final, visitor: Visitor): void;
  traverse(this: NodePath_Final, visitor: any, state?: any) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  set(key: string, node: any) {
    validate(this.node, key, node);
    // @ts-expect-error key must present in this.node
    this.node[key] = node;
  }

  getPathLocation(this: NodePath_Final): string {
    const parts = [];
    let path: NodePath_Final = this;
    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while ((path = path.parentPath));
    return parts.join(".");
  }

  debug(this: NodePath_Final, message: string) {
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
};

Object.assign(
  NodePath_Final.prototype,
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
  NodePath_Final.prototype._guessExecutionStatusRelativeToDifferentFunctions =
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
  NodePath_Final.prototype[typeKey] = function (opts: any) {
    return fn(this.node, opts);
  };

  // @ts-expect-error augmenting NodePath prototype
  NodePath_Final.prototype[`assert${type}`] = function (opts: any) {
    if (!fn(this.node, opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

// Register virtual types validators after base types validators
Object.assign(NodePath_Final.prototype, NodePath_virtual_types_validator);

for (const type of Object.keys(virtualTypes) as (keyof typeof virtualTypes)[]) {
  if (type[0] === "_") continue;
  if (!t.TYPES.includes(type)) t.TYPES.push(type);
}

interface NodePathOverwrites {
  // We need to re-define these predicate and assertion
  // methods here, because we cannot refine `this` in
  // a function declaration.
  // See https://github.com/microsoft/TypeScript/issues/38150

  /**
   * NOTE: This assertion doesn't narrow the type on unions of
   * NodePaths, due to https://github.com/microsoft/TypeScript/issues/44212
   *
   * @see ./conversion.ts for implementation.
   */
  ensureBlock(
    this: NodePath_Final,
  ): asserts this is NodePath_Final<
    (
      | t.Loop
      | t.WithStatement
      | t.Function
      | t.LabeledStatement
      | t.CatchClause
    ) & { body: t.BlockStatement }
  >;
  /**
   * @see ./introspection.ts for implementation.
   */
  isStatementOrBlock(
    this: NodePath_Final,
  ): this is NodePath_Final<t.Statement | t.Block>;
}

type NodePathMixins = Omit<
  typeof NodePath_ancestry &
    typeof NodePath_inference &
    typeof NodePath_replacement &
    typeof NodePath_evaluation &
    typeof NodePath_conversion &
    typeof NodePath_introspection &
    typeof NodePath_context &
    typeof NodePath_removal &
    typeof NodePath_modification &
    typeof NodePath_family &
    typeof NodePath_comments,
  keyof NodePathOverwrites
>;

interface NodePath<T extends t.Node>
  extends InstanceType<typeof NodePath_Final>,
    NodePathAssertions,
    NodePathValidators,
    NodePathMixins,
    NodePathOverwrites {
  parent: t.ParentMaps[T["type"]];
  parentPath: t.ParentMaps[T["type"]] extends null
    ? null
    : NodePath_Final<t.ParentMaps[T["type"]]> | null;
  node: T;
  type: T["type"] | null;
}

// This trick is necessary so that
// NodePath_Final<A | B> is the same as NodePath_Final<A> | NodePath_Final<B>
type NodePath_Final<T extends t.Node = t.Node> = T extends any
  ? NodePath<T>
  : never;

export { NodePath_Final as default, type NodePath as NodePath_Internal };
