// This file contains methods responsible for introspecting the current path for certain values.

import type NodePath from "./index.ts";
import {
  STATEMENT_OR_BLOCK_KEYS,
  VISITOR_KEYS,
  isBlockStatement,
  isExpression,
  isIdentifier,
  isLiteral,
  isStringLiteral,
  isType,
  matchesPattern as _matchesPattern,
} from "@babel/types";
import type * as t from "@babel/types";

/**
 * Match the current node if it matches the provided `pattern`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

export function matchesPattern(
  this: NodePath,
  pattern: string,
  allowPartial?: boolean,
): boolean {
  return _matchesPattern(this.node, pattern, allowPartial);
}

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  /**
   * Check whether we have the input `key`. If the `key` references an array then we check
   * if the array has any items, otherwise we just check if it's falsy.
   */
  // eslint-disable-next-line no-restricted-globals
  exports.has = function has<N extends t.Node>(
    this: NodePath<N>,
    key: keyof N,
  ): boolean {
    const val = (this.node as N)?.[key];
    if (val && Array.isArray(val)) {
      return !!val.length;
    } else {
      return !!val;
    }
  };
}

export function isStatic(this: NodePath): boolean {
  return this.scope.isStatic(this.node);
}

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  /**
   * Alias of `has`.
   */
  // eslint-disable-next-line no-restricted-globals
  exports.is = exports.has;

  /**
   * Opposite of `has`.
   */
  // eslint-disable-next-line no-restricted-globals
  exports.isnt = function isnt<N extends t.Node>(
    this: NodePath<N>,
    key: keyof N,
  ): boolean {
    // @ts-expect-error Babel 7
    return !this.has(key);
  };

  /**
   * Check whether the path node `key` strict equals `value`.
   */
  // eslint-disable-next-line no-restricted-globals
  exports.equals = function equals<N extends t.Node>(
    this: NodePath<N>,
    key: keyof N,
    value: any,
  ): boolean {
    return (this.node as N)[key] === value;
  };
}

/**
 * Check the type against our stored internal type of the node. This is handy when a node has
 * been removed yet we still internally know the type and need it to calculate node replacement.
 */

export function isNodeType(this: NodePath, type: string): boolean {
  return isType(this.type, type);
}

/**
 * This checks whether or not we're in one of the following positions:
 *
 *   for (KEY in right);
 *   for (KEY;;);
 *
 * This is because these spots allow VariableDeclarations AND normal expressions so we need
 * to tell the path replacement that it's ok to replace this with an expression.
 */

export function canHaveVariableDeclarationOrExpression(this: NodePath) {
  return (
    (this.key === "init" || this.key === "left") && this.parentPath.isFor()
  );
}

/**
 * This checks whether we are swapping an arrow function's body between an
 * expression and a block statement (or vice versa).
 *
 * This is because arrow functions may implicitly return an expression, which
 * is the same as containing a block statement.
 */

export function canSwapBetweenExpressionAndStatement(
  this: NodePath,
  replacement: t.Node,
): boolean {
  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
    return false;
  }

  if (this.isExpression()) {
    return isBlockStatement(replacement);
  } else if (this.isBlockStatement()) {
    return isExpression(replacement);
  }

  return false;
}

/**
 * Check whether the current path references a completion record
 */

export function isCompletionRecord(
  this: NodePath,
  allowInsideFunction?: boolean,
): boolean {
  let path = this;
  let first = true;

  do {
    const { type, container } = path;

    // we're in a function so can't be a completion record
    if (!first && (path.isFunction() || type === "StaticBlock")) {
      return !!allowInsideFunction;
    }

    first = false;

    // check to see if we're the last item in the container and if we are
    // we're a completion record!
    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while (
    (path = path.parentPath) &&
    !path.isProgram() &&
    !path.isDoExpression()
  );

  return true;
}

/**
 * Check whether or not the current `key` allows either a single statement or block statement
 * so we can explode it if necessary.
 */

export function isStatementOrBlock(this: NodePath): boolean {
  if (
    this.parentPath.isLabeledStatement() ||
    isBlockStatement(this.container as t.Node)
  ) {
    return false;
  } else {
    return STATEMENT_OR_BLOCK_KEYS.includes(this.key as string);
  }
}

/**
 * Check if the currently assigned path references the `importName` of `moduleSource`.
 */

export function referencesImport(
  this: NodePath,
  moduleSource: string,
  importName: string,
): boolean {
  if (!this.isReferencedIdentifier()) {
    if (
      (this.isJSXMemberExpression() &&
        this.node.property.name === importName) ||
      ((this.isMemberExpression() || this.isOptionalMemberExpression()) &&
        (this.node.computed
          ? isStringLiteral(this.node.property, { value: importName })
          : (this.node.property as t.Identifier).name === importName))
    ) {
      const object = (
        this as NodePath<t.MemberExpression | t.OptionalMemberExpression>
      ).get("object");
      return (
        object.isReferencedIdentifier() &&
        object.referencesImport(moduleSource, "*")
      );
    }

    return false;
  }

  const binding = this.scope.getBinding((this.node as t.Identifier).name);
  if (!binding || binding.kind !== "module") return false;

  const path = binding.path;
  const parent = path.parentPath;
  if (!parent.isImportDeclaration()) return false;

  // check moduleSource
  if (parent.node.source.value === moduleSource) {
    if (!importName) return true;
  } else {
    return false;
  }

  if (path.isImportDefaultSpecifier() && importName === "default") {
    return true;
  }

  if (path.isImportNamespaceSpecifier() && importName === "*") {
    return true;
  }

  if (
    path.isImportSpecifier() &&
    isIdentifier(path.node.imported, { name: importName })
  ) {
    return true;
  }

  return false;
}

/**
 * Get the source code associated with this node.
 */

export function getSource(this: NodePath): string {
  const node = this.node;
  if (node.end) {
    const code = this.hub.getCode();
    if (code) return code.slice(node.start, node.end);
  }
  return "";
}

export function willIMaybeExecuteBefore(
  this: NodePath,
  target: NodePath,
): boolean {
  return this._guessExecutionStatusRelativeTo(target) !== "after";
}

function getOuterFunction(path: NodePath) {
  return path.isProgram()
    ? path
    : (
        path.parentPath.scope.getFunctionParent() ||
        path.parentPath.scope.getProgramParent()
      ).path;
}

function isExecutionUncertain(type: t.Node["type"], key: string) {
  switch (type) {
    // a && FOO
    // a || FOO
    case "LogicalExpression":
      return key === "right";

    // a ? FOO : FOO
    // if (a) FOO; else FOO;
    case "ConditionalExpression":
    case "IfStatement":
      return key === "consequent" || key === "alternate";

    // while (a) FOO;
    case "WhileStatement":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForOfStatement":
      return key === "body";

    // for (a; b; FOO) FOO;
    case "ForStatement":
      return key === "body" || key === "update";

    // switch (a) { FOO }
    case "SwitchStatement":
      return key === "cases";

    // try { a } catch FOO finally { b }
    case "TryStatement":
      return key === "handler";

    // var [ x = FOO ]
    case "AssignmentPattern":
      return key === "right";

    // a?.[FOO]
    case "OptionalMemberExpression":
      return key === "property";

    // a?.(FOO)
    case "OptionalCallExpression":
      return key === "arguments";

    default:
      return false;
  }
}

function isExecutionUncertainInList(paths: NodePath[], maxIndex: number) {
  for (let i = 0; i < maxIndex; i++) {
    const path = paths[i];
    if (isExecutionUncertain(path.parent.type, path.parentKey)) {
      return true;
    }
  }
  return false;
}

// TODO(Babel 8)
// This can be { before: boolean, after: boolean, unknown: boolean }.
// This allows transforms like the tdz one to treat cases when the status
// is both before and unknown/after like if it were before.
type RelativeExecutionStatus = "before" | "after" | "unknown";

// Used to avoid infinite recursion in cases like
//   function f() { if (false) f(); }
//   f();
// It also works with indirect recursion.
const SYMBOL_CHECKING = Symbol();

type ExecutionStatusCache = Map<
  t.Node,
  Map<t.Node, RelativeExecutionStatus | typeof SYMBOL_CHECKING>
>;

/**
 * Given a `target` check the execution status of it relative to the current path.
 *
 * "Execution status" simply refers to where or not we **think** this will execute
 * before or after the input `target` element.
 */

export function _guessExecutionStatusRelativeTo(
  this: NodePath,
  target: NodePath,
): RelativeExecutionStatus {
  return _guessExecutionStatusRelativeToCached(this, target, new Map());
}

function _guessExecutionStatusRelativeToCached(
  base: NodePath,
  target: NodePath,
  cache: ExecutionStatusCache,
): RelativeExecutionStatus {
  // check if the two paths are in different functions, we can't track execution of these
  const funcParent = {
    this: getOuterFunction(base),
    target: getOuterFunction(target),
  };

  // here we check the `node` equality as sometimes we may have different paths for the
  // same node due to path thrashing
  if (funcParent.target.node !== funcParent.this.node) {
    return _guessExecutionStatusRelativeToDifferentFunctionsCached(
      base,
      funcParent.target,
      cache,
    );
  }

  const paths = {
    target: target.getAncestry(),
    this: base.getAncestry(),
  };

  // If this is an ancestor of the target path,
  // e.g. f(g); where this is f and target is g.
  if (paths.target.includes(base)) return "after";
  if (paths.this.includes(target)) return "before";

  // get ancestor where the branches intersect
  let commonPath;
  const commonIndex = { target: 0, this: 0 };

  while (!commonPath && commonIndex.this < paths.this.length) {
    const path = paths.this[commonIndex.this];
    commonIndex.target = paths.target.indexOf(path);
    if (commonIndex.target >= 0) {
      commonPath = path;
    } else {
      commonIndex.this++;
    }
  }

  if (!commonPath) {
    throw new Error(
      "Internal Babel error - The two compared nodes" +
        " don't appear to belong to the same program.",
    );
  }

  if (
    isExecutionUncertainInList(paths.this, commonIndex.this - 1) ||
    isExecutionUncertainInList(paths.target, commonIndex.target - 1)
  ) {
    return "unknown";
  }

  const divergence = {
    this: paths.this[commonIndex.this - 1],
    target: paths.target[commonIndex.target - 1],
  };

  // container list so let's see which one is after the other
  // e.g. [ THIS, TARGET ]
  if (
    divergence.target.listKey &&
    divergence.this.listKey &&
    divergence.target.container === divergence.this.container
  ) {
    return divergence.target.key > divergence.this.key ? "before" : "after";
  }

  // otherwise we're associated by a parent node, check which key comes before the other
  const keys = VISITOR_KEYS[commonPath.type];
  const keyPosition = {
    this: keys.indexOf(divergence.this.parentKey),
    target: keys.indexOf(divergence.target.parentKey),
  };
  return keyPosition.target > keyPosition.this ? "before" : "after";
}

function _guessExecutionStatusRelativeToDifferentFunctionsInternal(
  base: NodePath,
  target: NodePath,
  cache: ExecutionStatusCache,
): RelativeExecutionStatus {
  if (!target.isFunctionDeclaration()) {
    if (
      _guessExecutionStatusRelativeToCached(base, target, cache) === "before"
    ) {
      return "before";
    }
    return "unknown";
  } else if (target.parentPath.isExportDeclaration()) {
    return "unknown";
  }

  // so we're in a completely different function, if this is a function declaration
  // then we can be a bit smarter and handle cases where the function is either
  // a. not called at all (part of an export)
  // b. called directly
  const binding = target.scope.getBinding(target.node.id.name);

  // no references!
  if (!binding.references) return "before";

  const referencePaths: Array<NodePath> = binding.referencePaths;

  let allStatus;

  // verify that all the calls have the same execution status
  for (const path of referencePaths) {
    // if a reference is a child of the function we're checking against then we can
    // safely ignore it
    const childOfFunction = !!path.find(path => path.node === target.node);
    if (childOfFunction) continue;

    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
      // This function is passed as a reference, so we don't
      // know when it will be called.
      return "unknown";
    }

    const status = _guessExecutionStatusRelativeToCached(base, path, cache);

    if (allStatus && allStatus !== status) {
      return "unknown";
    } else {
      allStatus = status;
    }
  }

  return allStatus;
}

function _guessExecutionStatusRelativeToDifferentFunctionsCached(
  base: NodePath,
  target: NodePath,
  cache: ExecutionStatusCache,
): RelativeExecutionStatus {
  let nodeMap = cache.get(base.node);
  let cached;

  if (!nodeMap) {
    cache.set(base.node, (nodeMap = new Map()));
  } else if ((cached = nodeMap.get(target.node))) {
    if (cached === SYMBOL_CHECKING) {
      return "unknown";
    }
    return cached;
  }

  nodeMap.set(target.node, SYMBOL_CHECKING);

  const result = _guessExecutionStatusRelativeToDifferentFunctionsInternal(
    base,
    target,
    cache,
  );

  nodeMap.set(target.node, result);
  return result;
}

/**
 * Resolve a "pointer" `NodePath` to it's absolute path.
 */
export function resolve(
  this: NodePath,
  dangerous?: boolean,
  resolved?: NodePath[],
) {
  return _resolve.call(this, dangerous, resolved) || this;
}

export function _resolve(
  this: NodePath,
  dangerous?: boolean,
  resolved?: NodePath[],
): NodePath | undefined | null {
  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
  if (resolved?.includes(this)) return;

  // we store all the paths we've "resolved" in this array to prevent infinite recursion
  resolved = resolved || [];
  resolved.push(this);

  if (this.isVariableDeclarator()) {
    if (this.get("id").isIdentifier()) {
      return this.get("init").resolve(dangerous, resolved);
    } else {
      // otherwise it's a request for a pattern and that's a bit more tricky
    }
  } else if (this.isReferencedIdentifier()) {
    const binding = this.scope.getBinding(this.node.name);
    if (!binding) return;

    // reassigned so we can't really resolve it
    if (!binding.constant) return;

    // todo - lookup module in dependency graph
    if (binding.kind === "module") return;

    if (binding.path !== this) {
      const ret = binding.path.resolve(dangerous, resolved);
      // If the identifier resolves to parent node then we can't really resolve it.
      if (this.find(parent => parent.node === ret.node)) return;
      return ret;
    }
  } else if (this.isTypeCastExpression()) {
    // @ ts-ignore todo: babel-types
    return this.get("expression").resolve(dangerous, resolved);
  } else if (dangerous && this.isMemberExpression()) {
    // this is dangerous, as non-direct target assignments will mutate it's state
    // making this resolution inaccurate

    const targetKey = this.toComputedKey();
    if (!isLiteral(targetKey)) return;

    // @ts-expect-error todo(flow->ts): NullLiteral
    const targetName = targetKey.value;

    const target = this.get("object").resolve(dangerous, resolved);

    if (target.isObjectExpression()) {
      const props = target.get("properties");
      for (const prop of props as any[]) {
        if (!prop.isProperty()) continue;

        const key = prop.get("key");

        // { foo: obj }
        let match =
          prop.isnt("computed") && key.isIdentifier({ name: targetName });

        // { "foo": "obj" } or { ["foo"]: "obj" }
        match = match || key.isLiteral({ value: targetName });

        if (match) return prop.get("value").resolve(dangerous, resolved);
      }
    } else if (target.isArrayExpression() && !isNaN(+targetName)) {
      const elems = target.get("elements");
      const elem = elems[targetName];
      if (elem) return elem.resolve(dangerous, resolved);
    }
  }
}

export function isConstantExpression(this: NodePath): boolean {
  if (this.isIdentifier()) {
    const binding = this.scope.getBinding(this.node.name);
    if (!binding) return false;
    return binding.constant;
  }

  if (this.isLiteral()) {
    if (this.isRegExpLiteral()) {
      return false;
    }

    if (this.isTemplateLiteral()) {
      return this.get("expressions").every(expression =>
        expression.isConstantExpression(),
      );
    }

    return true;
  }

  if (this.isUnaryExpression()) {
    if (this.node.operator !== "void") {
      return false;
    }

    return this.get("argument").isConstantExpression();
  }

  if (this.isBinaryExpression()) {
    const { operator } = this.node;
    return (
      operator !== "in" &&
      operator !== "instanceof" &&
      this.get("left").isConstantExpression() &&
      this.get("right").isConstantExpression()
    );
  }

  if (this.isMemberExpression()) {
    return (
      !this.node.computed &&
      this.get("object").isIdentifier({ name: "Symbol" }) &&
      !this.scope.hasBinding("Symbol", { noGlobals: true })
    );
  }

  if (this.isCallExpression()) {
    return (
      this.node.arguments.length === 1 &&
      this.get("callee").matchesPattern("Symbol.for") &&
      !this.scope.hasBinding("Symbol", { noGlobals: true }) &&
      this.get("arguments")[0].isStringLiteral()
    );
  }

  return false;
}

export function isInStrictMode(this: NodePath) {
  const start = this.isProgram() ? this : this.parentPath;

  const strictParent = start.find(path => {
    if (path.isProgram({ sourceType: "module" })) return true;

    if (path.isClass()) return true;

    if (
      path.isArrowFunctionExpression() &&
      !path.get("body").isBlockStatement()
    ) {
      return false;
    }

    let body: t.BlockStatement | t.Program;
    if (path.isFunction()) {
      body = path.node.body as t.BlockStatement;
    } else if (path.isProgram()) {
      // @ts-expect-error TODO: TS thinks that `path` here cannot be
      // Program due to the `isProgram()` check at the beginning of
      // the function
      body = path.node;
    } else {
      return false;
    }

    for (const directive of body.directives) {
      if (directive.value.value === "use strict") {
        return true;
      }
    }
  });

  return !!strictParent;
}
