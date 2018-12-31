// @flow
import type { HubInterface } from "../hub";
import type TraversalContext from "../context";
// $FlowFixMe Not sure why flow can't find this.
import * as virtualTypes from "./lib/virtual-types";
import buildDebug from "debug";
import traverse from "../index";
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

const debug = buildDebug("babel");

export default class NodePath {
  constructor(hub: HubInterface, parent: Object) {
    this.parent = parent;
    this.hub = hub;
    this.contexts = [];
    this.data = {};
    this.shouldSkip = false;
    this.shouldStop = false;
    this.removed = false;
    this.state = null;
    this.opts = null;
    this.skipKeys = null;
    this.parentPath = null;
    this.context = null;
    this.container = null;
    this.listKey = null;
    this.inList = false;
    this.parentKey = null;
    this.key = null;
    this.node = null;
    this.scope = null;
    this.type = null;
    this.typeAnnotation = null;
  }

  parent: Object;
  hub: HubInterface;
  contexts: Array<TraversalContext>;
  data: Object;
  shouldSkip: boolean;
  shouldStop: boolean;
  removed: boolean;
  state: any;
  opts: ?Object;
  skipKeys: ?Object;
  parentPath: ?NodePath;
  context: TraversalContext;
  container: ?Object | Array<Object>;
  listKey: ?string;
  inList: boolean;
  parentKey: ?string;
  key: ?string;
  node: ?Object;
  scope: Scope;
  type: ?string;
  typeAnnotation: ?Object;

  static get({
    hub,
    parentPath,
    parent,
    container,
    listKey,
    key,
  }: {
    hub: ?HubInterface,
    parentPath: ?NodePath,
    parent: NodePath,
    container: Array<NodePath>,
    listKey: string,
    key: number,
  }): NodePath {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    if (!parent) {
      throw new Error("To get a node path the parent needs to exist");
    }

    const targetNode = container[key];

    const paths = pathCache.get(parent) || [];
    if (!pathCache.has(parent)) {
      pathCache.set(parent, paths);
    }

    let path: ?NodePath;

    for (let i = 0; i < paths.length; i++) {
      const pathCheck = paths[i];
      if (pathCheck.node === targetNode) {
        path = pathCheck;
        break;
      }
    }

    if (!path) {
      path = new NodePath(hub, parent);
      paths.push(path);
    }

    path.setup(parentPath, container, listKey, key);

    return path;
  }

  getScope(scope: Scope) {
    // $FlowFixMe I'm pretty sure this method can't exist.
    return this.isScope() ? new Scope(this) : scope;
  }

  setData(key: string, val: any): any {
    return (this.data[key] = val);
  }

  getData(key: string, def?: any): any {
    let val = this.data[key];
    if (!val && def) val = this.data[key] = def;
    return val;
  }

  buildCodeFrameError(msg: string, Error: typeof Error = SyntaxError): Error {
    return this.hub.buildError(this.node, msg, Error);
  }

  traverse(visitor: Object, state?: any) {
    traverse(this.node, visitor, this.scope, state, this);
  }

  set(key: string, node: Object) {
    t.validate(this.node, key, node);
    // $FlowFixMe not sure how to prove that this.node is not null here.
    this.node[key] = node;
  }

  getPathLocation(): string {
    const parts = [];
    let path = this;
    do {
      let key = path.key;
      // $FlowFixMe yeah yeah: in theory these can be null
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while ((path = path.parentPath));
    return parts.join(".");
  }

  debug(message: any) {
    if (!debug.enabled) return;
    // $FlowFixMe yeah yeah: in theory these can be null
    debug(`${this.getPathLocation()} ${this.type}: ${message}`);
  }

  toString() {
    return generator(this.node).code;
  }

  findParent = NodePath_ancestry.findParent;
  find = NodePath_ancestry.find;
  getFunctionParent = NodePath_ancestry.getFunctionParent;
  getStatementParent = NodePath_ancestry.getStatementParent;
  getEarliestCommonAncestorFrom =
    NodePath_ancestry.getEarliestCommonAncestorFrom;
  getDeepestCommonAncestorFrom = NodePath_ancestry.getDeepestCommonAncestorFrom;
  getAncestry = NodePath_ancestry.getAncestry;
  isAncestor = NodePath_ancestry.isAncestor;
  isDescendant = NodePath_ancestry.isDescendant;
  inType = NodePath_ancestry.inType;
  getTypeAnnotation = NodePath_inference.getTypeAnnotation;
  _getTypeAnnotation = NodePath_inference._getTypeAnnotation;
  isBaseType = NodePath_inference.isBaseType;
  couldBeBaseType = NodePath_inference.couldBeBaseType;
  baseTypeStrictlyMatches = NodePath_inference.baseTypeStrictlyMatches;
  isGenericType = NodePath_inference.isGenericType;

  shareCommentsWithSiblings = NodePath_comments.shareCommentsWithSiblings;
  addComment = NodePath_comments.addComment;
  addComments = NodePath_comments.addComments;
  call = NodePath_context.call;
  _call = NodePath_context._call;
  isBlacklisted = NodePath_context.isBlacklisted;
  visit = NodePath_context.visit;
  skip = NodePath_context.skip;
  skipKey = NodePath_context.skipKey;
  stop = NodePath_context.stop;
  setScope = NodePath_context.setScope;
  setContext = NodePath_context.setContext;
  resync = NodePath_context.resync;
  _resyncParent = NodePath_context._resyncParent;
  _resyncKey = NodePath_context._resyncKey;
  _resyncList = NodePath_context._resyncList;
  _resyncRemoved = NodePath_context._resyncRemoved;
  popContext = NodePath_context.popContext;
  pushContext = NodePath_context.pushContext;
  setup = NodePath_context.setup;
  setKey = NodePath_context.setKey;
  requeue = NodePath_context.requeue;
  _getQueueContexts = NodePath_context._getQueueContexts;
  toComputedKey = NodePath_conversion.toComputedKey;
  ensureBlock = NodePath_conversion.ensureBlock;
  arrowFunctionToShadowed = NodePath_conversion.arrowFunctionToShadowed;
  unwrapFunctionEnvironment = NodePath_conversion.unwrapFunctionEnvironment;
  arrowFunctionToExpression = NodePath_conversion.arrowFunctionToExpression;
  evaluateTruthy = NodePath_evaluation.evaluateTruthy;
  evaluate = NodePath_evaluation.evaluate;
  getOpposite = NodePath_family.getOpposite;
  getCompletionRecords = NodePath_family.getCompletionRecords;
  getSibling = NodePath_family.getSibling;
  getPrevSibling = NodePath_family.getPrevSibling;
  getNextSibling = NodePath_family.getNextSibling;
  getAllNextSiblings = NodePath_family.getAllNextSiblings;
  getAllPrevSiblings = NodePath_family.getAllPrevSiblings;
  get = NodePath_family.get;
  _getKey = NodePath_family._getKey;
  _getPattern = NodePath_family._getPattern;
  getBindingIdentifiers = NodePath_family.getBindingIdentifiers;
  getOuterBindingIdentifiers = NodePath_family.getOuterBindingIdentifiers;
  getBindingIdentifierPaths = NodePath_family.getBindingIdentifierPaths;
  getOuterBindingIdentifierPaths =
    NodePath_family.getOuterBindingIdentifierPaths;
  matchesPattern = NodePath_introspection.matchesPattern;
  has = NodePath_introspection.has;
  isStatic = NodePath_introspection.isStatic;
  isnt = NodePath_introspection.isnt;
  equals = NodePath_introspection.equals;
  isNodeType = NodePath_introspection.isNodeType;
  canHaveVariableDeclarationOrExpression =
    NodePath_introspection.canHaveVariableDeclarationOrExpression;
  canSwapBetweenExpressionAndStatement =
    NodePath_introspection.canSwapBetweenExpressionAndStatement;
  isCompletionRecord = NodePath_introspection.isCompletionRecord;
  isStatementOrBlock = NodePath_introspection.isStatementOrBlock;
  referencesImport = NodePath_introspection.referencesImport;
  getSource = NodePath_introspection.getSource;
  willIMaybeExecuteBefore = NodePath_introspection.willIMaybeExecuteBefore;
  _guessExecutionStatusRelativeTo =
    NodePath_introspection._guessExecutionStatusRelativeTo;
  _guessExecutionStatusRelativeToDifferentFunctions =
    NodePath_introspection._guessExecutionStatusRelativeToDifferentFunctions;
  resolve = NodePath_introspection.resolve;
  _resolve = NodePath_introspection._resolve;
  isConstantExpression = NodePath_introspection.isConstantExpression;
  isInStrictMode = NodePath_introspection.isInStrictMode;
  insertBefore = NodePath_modification.insertBefore;
  _containerInsert = NodePath_modification._containerInsert;
  _containerInsertBefore = NodePath_modification._containerInsertBefore;
  _containerInsertAfter = NodePath_modification._containerInsertAfter;
  insertAfter = NodePath_modification.insertAfter;
  updateSiblingKeys = NodePath_modification.updateSiblingKeys;
  _verifyNodeList = NodePath_modification._verifyNodeList;
  unshiftContainer = NodePath_modification.unshiftContainer;
  pushContainer = NodePath_modification.pushContainer;
  hoist = NodePath_modification.hoist;
  remove = NodePath_removal.remove;
  _removeFromScope = NodePath_removal._removeFromScope;
  _callRemovalHooks = NodePath_removal._callRemovalHooks;
  _remove = NodePath_removal._remove;
  _markRemoved = NodePath_removal._markRemoved;
  _assertUnremoved = NodePath_removal._assertUnremoved;
  replaceWithMultiple = NodePath_replacement.replaceWithMultiple;
  replaceWithSourceString = NodePath_replacement.replaceWithSourceString;
  replaceWith = NodePath_replacement.replaceWith;
  _replaceWith = NodePath_replacement._replaceWith;
  replaceExpressionWithStatements =
    NodePath_replacement.replaceExpressionWithStatements;
  replaceInline = NodePath_replacement.replaceInline;
}

for (const type of (t.TYPES: Array<string>)) {
  const typeKey = `is${type}`;
  const fn = t[typeKey];
  // $FlowFixMe somehow generate these?
  NodePath.prototype[typeKey] = function(opts) {
    return fn(this.node, opts);
  };

  // $FlowFixMe somehow generate these?
  NodePath.prototype[`assert${type}`] = function(opts) {
    if (!fn(this.node, opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

for (const type in virtualTypes) {
  if (type[0] === "_") continue;
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);

  const virtualType = virtualTypes[type];

  // $FlowFixMe somehow generate these?
  NodePath.prototype[`is${type}`] = function(opts) {
    return virtualType.checkPath(this, opts);
  };
}
