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
    // $FlowFixMe we immediately call path.setup() so this is fine for now.
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
  parentPath: NodePath;
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
    hub?: HubInterface,
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
      // TODO: make a constructor that does the setup, so that
      // path.parentPath is never set to null.
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
  isArrayExpression = function(opts?: Object): boolean {
    return false;
  };
  isAssignmentExpression = function(opts?: Object): boolean {
    return false;
  };
  isBinaryExpression = function(opts?: Object): boolean {
    return false;
  };
  isInterpreterDirective = function(opts?: Object): boolean {
    return false;
  };
  isDirective = function(opts?: Object): boolean {
    return false;
  };
  isDirectiveLiteral = function(opts?: Object): boolean {
    return false;
  };
  isBlockStatement = function(opts?: Object): boolean {
    return false;
  };
  isBreakStatement = function(opts?: Object): boolean {
    return false;
  };
  isCallExpression = function(opts?: Object): boolean {
    return false;
  };
  isCatchClause = function(opts?: Object): boolean {
    return false;
  };
  isConditionalExpression = function(opts?: Object): boolean {
    return false;
  };
  isContinueStatement = function(opts?: Object): boolean {
    return false;
  };
  isDebuggerStatement = function(opts?: Object): boolean {
    return false;
  };
  isDoWhileStatement = function(opts?: Object): boolean {
    return false;
  };
  isEmptyStatement = function(opts?: Object): boolean {
    return false;
  };
  isExpressionStatement = function(opts?: Object): boolean {
    return false;
  };
  isFile = function(opts?: Object): boolean {
    return false;
  };
  isForInStatement = function(opts?: Object): boolean {
    return false;
  };
  isForStatement = function(opts?: Object): boolean {
    return false;
  };
  isFunctionDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isFunctionExpression = function(opts?: Object): boolean {
    return false;
  };
  isIdentifier = function(opts?: Object): boolean {
    return false;
  };
  isIfStatement = function(opts?: Object): boolean {
    return false;
  };
  isLabeledStatement = function(opts?: Object): boolean {
    return false;
  };
  isStringLiteral = function(opts?: Object): boolean {
    return false;
  };
  isNumericLiteral = function(opts?: Object): boolean {
    return false;
  };
  isNullLiteral = function(opts?: Object): boolean {
    return false;
  };
  isBooleanLiteral = function(opts?: Object): boolean {
    return false;
  };
  isRegExpLiteral = function(opts?: Object): boolean {
    return false;
  };
  isLogicalExpression = function(opts?: Object): boolean {
    return false;
  };
  isMemberExpression = function(opts?: Object): boolean {
    return false;
  };
  isNewExpression = function(opts?: Object): boolean {
    return false;
  };
  isProgram = function(opts?: Object): boolean {
    return false;
  };
  isObjectExpression = function(opts?: Object): boolean {
    return false;
  };
  isObjectMethod = function(opts?: Object): boolean {
    return false;
  };
  isObjectProperty = function(opts?: Object): boolean {
    return false;
  };
  isRestElement = function(opts?: Object): boolean {
    return false;
  };
  isReturnStatement = function(opts?: Object): boolean {
    return false;
  };
  isSequenceExpression = function(opts?: Object): boolean {
    return false;
  };
  isSwitchCase = function(opts?: Object): boolean {
    return false;
  };
  isSwitchStatement = function(opts?: Object): boolean {
    return false;
  };
  isThisExpression = function(opts?: Object): boolean {
    return false;
  };
  isThrowStatement = function(opts?: Object): boolean {
    return false;
  };
  isTryStatement = function(opts?: Object): boolean {
    return false;
  };
  isUnaryExpression = function(opts?: Object): boolean {
    return false;
  };
  isUpdateExpression = function(opts?: Object): boolean {
    return false;
  };
  isVariableDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isVariableDeclarator = function(opts?: Object): boolean {
    return false;
  };
  isWhileStatement = function(opts?: Object): boolean {
    return false;
  };
  isWithStatement = function(opts?: Object): boolean {
    return false;
  };
  isAssignmentPattern = function(opts?: Object): boolean {
    return false;
  };
  isArrayPattern = function(opts?: Object): boolean {
    return false;
  };
  isArrowFunctionExpression = function(opts?: Object): boolean {
    return false;
  };
  isClassBody = function(opts?: Object): boolean {
    return false;
  };
  isClassDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isClassExpression = function(opts?: Object): boolean {
    return false;
  };
  isExportAllDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isExportDefaultDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isExportNamedDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isExportSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isForOfStatement = function(opts?: Object): boolean {
    return false;
  };
  isImportDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isImportDefaultSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isImportNamespaceSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isImportSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isMetaProperty = function(opts?: Object): boolean {
    return false;
  };
  isClassMethod = function(opts?: Object): boolean {
    return false;
  };
  isObjectPattern = function(opts?: Object): boolean {
    return false;
  };
  isSpreadElement = function(opts?: Object): boolean {
    return false;
  };
  isSuper = function(opts?: Object): boolean {
    return false;
  };
  isTaggedTemplateExpression = function(opts?: Object): boolean {
    return false;
  };
  isTemplateElement = function(opts?: Object): boolean {
    return false;
  };
  isTemplateLiteral = function(opts?: Object): boolean {
    return false;
  };
  isYieldExpression = function(opts?: Object): boolean {
    return false;
  };
  isAnyTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isArrayTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isBooleanTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isBooleanLiteralTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isNullLiteralTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isClassImplements = function(opts?: Object): boolean {
    return false;
  };
  isDeclareClass = function(opts?: Object): boolean {
    return false;
  };
  isDeclareFunction = function(opts?: Object): boolean {
    return false;
  };
  isDeclareInterface = function(opts?: Object): boolean {
    return false;
  };
  isDeclareModule = function(opts?: Object): boolean {
    return false;
  };
  isDeclareModuleExports = function(opts?: Object): boolean {
    return false;
  };
  isDeclareTypeAlias = function(opts?: Object): boolean {
    return false;
  };
  isDeclareOpaqueType = function(opts?: Object): boolean {
    return false;
  };
  isDeclareVariable = function(opts?: Object): boolean {
    return false;
  };
  isDeclareExportDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isDeclareExportAllDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isDeclaredPredicate = function(opts?: Object): boolean {
    return false;
  };
  isExistsTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isFunctionTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isFunctionTypeParam = function(opts?: Object): boolean {
    return false;
  };
  isGenericTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isInferredPredicate = function(opts?: Object): boolean {
    return false;
  };
  isInterfaceExtends = function(opts?: Object): boolean {
    return false;
  };
  isInterfaceDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isInterfaceTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isIntersectionTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isMixedTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isEmptyTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isNullableTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isNumberLiteralTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isNumberTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isObjectTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isObjectTypeInternalSlot = function(opts?: Object): boolean {
    return false;
  };
  isObjectTypeCallProperty = function(opts?: Object): boolean {
    return false;
  };
  isObjectTypeIndexer = function(opts?: Object): boolean {
    return false;
  };
  isObjectTypeProperty = function(opts?: Object): boolean {
    return false;
  };
  isObjectTypeSpreadProperty = function(opts?: Object): boolean {
    return false;
  };
  isOpaqueType = function(opts?: Object): boolean {
    return false;
  };
  isQualifiedTypeIdentifier = function(opts?: Object): boolean {
    return false;
  };
  isStringLiteralTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isStringTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isThisTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isTupleTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isTypeofTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isTypeAlias = function(opts?: Object): boolean {
    return false;
  };
  isTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isTypeCastExpression = function(opts?: Object): boolean {
    return false;
  };
  isTypeParameter = function(opts?: Object): boolean {
    return false;
  };
  isTypeParameterDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTypeParameterInstantiation = function(opts?: Object): boolean {
    return false;
  };
  isUnionTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isVariance = function(opts?: Object): boolean {
    return false;
  };
  isVoidTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isJSXAttribute = function(opts?: Object): boolean {
    return false;
  };
  isJSXClosingElement = function(opts?: Object): boolean {
    return false;
  };
  isJSXElement = function(opts?: Object): boolean {
    return false;
  };
  isJSXEmptyExpression = function(opts?: Object): boolean {
    return false;
  };
  isJSXExpressionContainer = function(opts?: Object): boolean {
    return false;
  };
  isJSXSpreadChild = function(opts?: Object): boolean {
    return false;
  };
  isJSXIdentifier = function(opts?: Object): boolean {
    return false;
  };
  isJSXMemberExpression = function(opts?: Object): boolean {
    return false;
  };
  isJSXNamespacedName = function(opts?: Object): boolean {
    return false;
  };
  isJSXOpeningElement = function(opts?: Object): boolean {
    return false;
  };
  isJSXSpreadAttribute = function(opts?: Object): boolean {
    return false;
  };
  isJSXText = function(opts?: Object): boolean {
    return false;
  };
  isJSXFragment = function(opts?: Object): boolean {
    return false;
  };
  isJSXOpeningFragment = function(opts?: Object): boolean {
    return false;
  };
  isJSXClosingFragment = function(opts?: Object): boolean {
    return false;
  };
  isNoop = function(opts?: Object): boolean {
    return false;
  };
  isParenthesizedExpression = function(opts?: Object): boolean {
    return false;
  };
  isAwaitExpression = function(opts?: Object): boolean {
    return false;
  };
  isBindExpression = function(opts?: Object): boolean {
    return false;
  };
  isClassProperty = function(opts?: Object): boolean {
    return false;
  };
  isOptionalMemberExpression = function(opts?: Object): boolean {
    return false;
  };
  isPipelineTopicExpression = function(opts?: Object): boolean {
    return false;
  };
  isPipelineBareFunction = function(opts?: Object): boolean {
    return false;
  };
  isPipelinePrimaryTopicReference = function(opts?: Object): boolean {
    return false;
  };
  isOptionalCallExpression = function(opts?: Object): boolean {
    return false;
  };
  isClassPrivateProperty = function(opts?: Object): boolean {
    return false;
  };
  isClassPrivateMethod = function(opts?: Object): boolean {
    return false;
  };
  isImport = function(opts?: Object): boolean {
    return false;
  };
  isDecorator = function(opts?: Object): boolean {
    return false;
  };
  isDoExpression = function(opts?: Object): boolean {
    return false;
  };
  isExportDefaultSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isExportNamespaceSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isPrivateName = function(opts?: Object): boolean {
    return false;
  };
  isBigIntLiteral = function(opts?: Object): boolean {
    return false;
  };
  isTSParameterProperty = function(opts?: Object): boolean {
    return false;
  };
  isTSDeclareFunction = function(opts?: Object): boolean {
    return false;
  };
  isTSDeclareMethod = function(opts?: Object): boolean {
    return false;
  };
  isTSQualifiedName = function(opts?: Object): boolean {
    return false;
  };
  isTSCallSignatureDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSConstructSignatureDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSPropertySignature = function(opts?: Object): boolean {
    return false;
  };
  isTSMethodSignature = function(opts?: Object): boolean {
    return false;
  };
  isTSIndexSignature = function(opts?: Object): boolean {
    return false;
  };
  isTSAnyKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSUnknownKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSNumberKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSObjectKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSBooleanKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSStringKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSSymbolKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSVoidKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSUndefinedKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSNullKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSNeverKeyword = function(opts?: Object): boolean {
    return false;
  };
  isTSThisType = function(opts?: Object): boolean {
    return false;
  };
  isTSFunctionType = function(opts?: Object): boolean {
    return false;
  };
  isTSConstructorType = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeReference = function(opts?: Object): boolean {
    return false;
  };
  isTSTypePredicate = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeQuery = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeLiteral = function(opts?: Object): boolean {
    return false;
  };
  isTSArrayType = function(opts?: Object): boolean {
    return false;
  };
  isTSTupleType = function(opts?: Object): boolean {
    return false;
  };
  isTSOptionalType = function(opts?: Object): boolean {
    return false;
  };
  isTSRestType = function(opts?: Object): boolean {
    return false;
  };
  isTSUnionType = function(opts?: Object): boolean {
    return false;
  };
  isTSIntersectionType = function(opts?: Object): boolean {
    return false;
  };
  isTSConditionalType = function(opts?: Object): boolean {
    return false;
  };
  isTSInferType = function(opts?: Object): boolean {
    return false;
  };
  isTSParenthesizedType = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeOperator = function(opts?: Object): boolean {
    return false;
  };
  isTSIndexedAccessType = function(opts?: Object): boolean {
    return false;
  };
  isTSMappedType = function(opts?: Object): boolean {
    return false;
  };
  isTSLiteralType = function(opts?: Object): boolean {
    return false;
  };
  isTSExpressionWithTypeArguments = function(opts?: Object): boolean {
    return false;
  };
  isTSInterfaceDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSInterfaceBody = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeAliasDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSAsExpression = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeAssertion = function(opts?: Object): boolean {
    return false;
  };
  isTSEnumDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSEnumMember = function(opts?: Object): boolean {
    return false;
  };
  isTSModuleDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSModuleBlock = function(opts?: Object): boolean {
    return false;
  };
  isTSImportEqualsDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSExternalModuleReference = function(opts?: Object): boolean {
    return false;
  };
  isTSNonNullExpression = function(opts?: Object): boolean {
    return false;
  };
  isTSExportAssignment = function(opts?: Object): boolean {
    return false;
  };
  isTSNamespaceExportDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeParameterInstantiation = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeParameterDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeParameter = function(opts?: Object): boolean {
    return false;
  };

  isExpression = function(opts?: Object): boolean {
    return false;
  };
  isBinary = function(opts?: Object): boolean {
    return false;
  };
  isScopable = function(opts?: Object): boolean {
    return false;
  };
  isBlockParent = function(opts?: Object): boolean {
    return false;
  };
  isBlock = function(opts?: Object): boolean {
    return false;
  };
  isStatement = function(opts?: Object): boolean {
    return false;
  };
  isTerminatorless = function(opts?: Object): boolean {
    return false;
  };
  isCompletionStatement = function(opts?: Object): boolean {
    return false;
  };
  isConditional = function(opts?: Object): boolean {
    return false;
  };
  isLoop = function(opts?: Object): boolean {
    return false;
  };
  isWhile = function(opts?: Object): boolean {
    return false;
  };
  isExpressionWrapper = function(opts?: Object): boolean {
    return false;
  };
  isFor = function(opts?: Object): boolean {
    return false;
  };
  isForXStatement = function(opts?: Object): boolean {
    return false;
  };
  isFunction = function(opts?: Object): boolean {
    return false;
  };
  isFunctionParent = function(opts?: Object): boolean {
    return false;
  };
  isPureish = function(opts?: Object): boolean {
    return false;
  };
  isDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isPatternLike = function(opts?: Object): boolean {
    return false;
  };
  isLVal = function(opts?: Object): boolean {
    return false;
  };
  isTSEntityName = function(opts?: Object): boolean {
    return false;
  };
  isLiteral = function(opts?: Object): boolean {
    return false;
  };
  isImmutable = function(opts?: Object): boolean {
    return false;
  };
  isUserWhitespacable = function(opts?: Object): boolean {
    return false;
  };
  isMethod = function(opts?: Object): boolean {
    return false;
  };
  isObjectMember = function(opts?: Object): boolean {
    return false;
  };
  isProperty = function(opts?: Object): boolean {
    return false;
  };
  isUnaryLike = function(opts?: Object): boolean {
    return false;
  };
  isPattern = function(opts?: Object): boolean {
    return false;
  };
  isClass = function(opts?: Object): boolean {
    return false;
  };
  isModuleDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isExportDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isModuleSpecifier = function(opts?: Object): boolean {
    return false;
  };
  isFlow = function(opts?: Object): boolean {
    return false;
  };
  isFlowType = function(opts?: Object): boolean {
    return false;
  };
  isFlowBaseAnnotation = function(opts?: Object): boolean {
    return false;
  };
  isFlowDeclaration = function(opts?: Object): boolean {
    return false;
  };
  isFlowPredicate = function(opts?: Object): boolean {
    return false;
  };
  isJSX = function(opts?: Object): boolean {
    return false;
  };
  isPrivate = function(opts?: Object): boolean {
    return false;
  };
  isTSTypeElement = function(opts?: Object): boolean {
    return false;
  };
  isTSType = function(opts?: Object): boolean {
    return false;
  };
  isNumberLiteral = function(opts?: Object): boolean {
    return false;
  };
  isRegexLiteral = function(opts?: Object): boolean {
    return false;
  };
  isRestProperty = function(opts?: Object): boolean {
    return false;
  };
  isSpreadProperty = function(opts?: Object): boolean {
    return false;
  };
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
