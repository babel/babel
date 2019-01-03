// This file contains methods responsible for introspecting the current path for certain values.
// @flow
import type NodePath from "./index";
import includes from "lodash/includes";
import * as t from "@babel/types";

/**
 * Match the current node if it matches the provided `pattern`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */

export function matchesPattern(
  pattern: string,
  allowPartial?: boolean,
): boolean {
  return t.matchesPattern(this.node, pattern, allowPartial);
}

/**
 * Check whether we have the input `key`. If the `key` references an array then we check
 * if the array has any items, otherwise we just check if it's falsy.
 */

export function has(key: string): boolean {
  const val = this.node && this.node[key];
  if (val && Array.isArray(val)) {
    return !!val.length;
  } else {
    return !!val;
  }
}

/**
 * Description
 */

export function isStatic(): boolean {
  return this.scope.isStatic(this.node);
}

/**
 * Alias of `has`.
 */

export const is = has;

/**
 * Opposite of `has`.
 */

export function isnt(key: string): boolean {
  return !this.has(key);
}

/**
 * Check whether the path node `key` strict equals `value`.
 */

export function equals(key: string, value: string): boolean {
  return this.node[key] === value;
}

/**
 * Check the type against our stored internal type of the node. This is handy when a node has
 * been removed yet we still internally know the type and need it to calculate node replacement.
 */

export function isNodeType(type: string): boolean {
  return t.isType(this.type, type);
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

export function canHaveVariableDeclarationOrExpression() {
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
  replacement: NodePath,
): boolean {
  if (this.key !== "body" || !this.parentPath.isArrowFunctionExpression()) {
    return false;
  }

  if (this.isExpression()) {
    return t.isBlockStatement(replacement);
  } else if (this.isBlockStatement()) {
    return t.isExpression(replacement);
  }

  return false;
}

/**
 * Check whether the current path references a completion record
 */

export function isCompletionRecord(allowInsideFunction: ?boolean): boolean {
  let path = this;
  let first = true;

  do {
    const container = path.container;

    // we're in a function so can't be a completion record
    if (path.isFunction() && !first) {
      return !!allowInsideFunction;
    }

    first = false;

    // check to see if we're the last item in the container and if we are
    // we're a completion record!
    if (Array.isArray(container) && path.key !== container.length - 1) {
      return false;
    }
  } while ((path = path.parentPath) && !path.isProgram());

  return true;
}

/**
 * Check whether or not the current `key` allows either a single statement or block statement
 * so we can explode it if necessary.
 */

export function isStatementOrBlock(): boolean {
  if (
    this.parentPath.isLabeledStatement() ||
    t.isBlockStatement(this.container)
  ) {
    return false;
  } else {
    return includes(t.STATEMENT_OR_BLOCK_KEYS, this.key);
  }
}

/**
 * Check if the currently assigned path references the `importName` of `moduleSource`.
 */

export function referencesImport(moduleSource: NodePath, importName: string) {
  if (!this.isReferencedIdentifier()) return false;

  const binding = this.scope.getBinding(this.node.name);
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

  if (path.isImportSpecifier() && path.node.imported.name === importName) {
    return true;
  }

  return false;
}

/**
 * Get the source code associated with this node.
 */

export function getSource() {
  const node = this.node;
  if (node.end) {
    const code = this.hub.getCode();
    if (code) return code.slice(node.start, node.end);
  }
  return "";
}

export function willIMaybeExecuteBefore(target: NodePath) {
  return this._guessExecutionStatusRelativeTo(target) !== "after";
}

/**
 * Given a `target` check the execution status of it relative to the current path.
 *
 * "Execution status" simply refers to where or not we **think** this will execuete
 * before or after the input `target` element.
 */

export function _guessExecutionStatusRelativeTo(target: NodePath) {
  // check if the two paths are in different functions, we can't track execution of these
  const targetFuncParent =
    target.scope.getFunctionParent() || target.scope.getProgramParent();
  const selfFuncParent =
    this.scope.getFunctionParent() || target.scope.getProgramParent();

  // here we check the `node` equality as sometimes we may have different paths for the
  // same node due to path thrashing
  if (targetFuncParent.node !== selfFuncParent.node) {
    const status = this._guessExecutionStatusRelativeToDifferentFunctions(
      targetFuncParent,
    );
    if (status) {
      return status;
    } else {
      target = targetFuncParent.path;
    }
  }

  const targetPaths = target.getAncestry();
  if (targetPaths.indexOf(this) >= 0) return "after";

  const selfPaths = this.getAncestry();

  // get ancestor where the branches intersect
  let commonPath;
  let targetIndex;
  let selfIndex;
  for (selfIndex = 0; selfIndex < selfPaths.length; selfIndex++) {
    const selfPath = selfPaths[selfIndex];
    targetIndex = targetPaths.indexOf(selfPath);
    if (targetIndex >= 0) {
      commonPath = selfPath;
      break;
    }
  }
  if (!commonPath) {
    return "before";
  }

  // get the relationship paths that associate these nodes to their common ancestor
  // $FlowFixMe if commonPath is set then targetIndex must also be set.
  const targetRelationship = targetPaths[targetIndex - 1];
  const selfRelationship = selfPaths[selfIndex - 1];
  if (!targetRelationship || !selfRelationship) {
    return "before";
  }

  // container list so let's see which one is after the other
  if (
    targetRelationship.listKey &&
    targetRelationship.container === selfRelationship.container
  ) {
    return targetRelationship.key > selfRelationship.key ? "before" : "after";
  }

  // otherwise we're associated by a parent node, check which key comes before the other
  const keys = t.VISITOR_KEYS[commonPath.type];
  const targetKeyPosition = keys.indexOf(targetRelationship.key);
  const selfKeyPosition = keys.indexOf(selfRelationship.key);
  return targetKeyPosition > selfKeyPosition ? "before" : "after";
}

export function _guessExecutionStatusRelativeToDifferentFunctions(
  // FIXME: I don't know whether targetFuncParent is actually a NodePath.
  // I suspect it isn't, because it has a .path property.
  targetFuncParent: NodePath,
) {
  // $FlowFixMe NodePath doesn't have a .path. It's probably not a NodePath.
  const targetFuncPath = targetFuncParent.path;
  if (!targetFuncPath.isFunctionDeclaration()) return;

  // so we're in a completely different function, if this is a function declaration
  // then we can be a bit smarter and handle cases where the function is either
  // a. not called at all (part of an export)
  // b. called directly
  const binding = targetFuncPath.scope.getBinding(targetFuncPath.node.id.name);

  // no references!
  if (!binding.references) return "before";

  const referencePaths: Array<NodePath> = binding.referencePaths;

  // verify that all of the references are calls
  for (const path of referencePaths) {
    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
      return;
    }
  }

  let allStatus;

  // verify that all the calls have the same execution status
  for (const path of referencePaths) {
    // if a reference is a child of the function we're checking against then we can
    // safelty ignore it
    const childOfFunction = !!path.find(
      path => path.node === targetFuncPath.node,
    );
    if (childOfFunction) continue;

    const status = this._guessExecutionStatusRelativeTo(path);

    if (allStatus) {
      if (allStatus !== status) return;
    } else {
      allStatus = status;
    }
  }

  return allStatus;
}

/**
 * Resolve a "pointer" `NodePath` to its absolute path.
 */

export function resolve(
  dangerous: ?Array<NodePath>,
  resolved: ?Array<NodePath>,
): NodePath {
  return this._resolve(dangerous, resolved) || this;
}

export function _resolve(
  dangerous: ?Array<NodePath>,
  resolved: ?Array<NodePath>,
): ?NodePath {
  // detect infinite recursion
  // todo: possibly have a max length on this just to be safe
  if (resolved && resolved.indexOf(this) >= 0) return;

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
    return this.get("expression").resolve(dangerous, resolved);
  } else if (dangerous && this.isMemberExpression()) {
    // this is dangerous, as non-direct target assignments will mutate it's state
    // making this resolution inaccurate

    const targetKey = this.toComputedKey();
    if (!t.isLiteral(targetKey)) return;

    const targetName = targetKey.value;

    const target = this.get("object").resolve(dangerous, resolved);

    if (target.isObjectExpression()) {
      const props = target.get("properties");
      for (const prop of (props: Array<any>)) {
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

export function isConstantExpression() {
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
    if (this.get("operator").node !== "void") {
      return false;
    }

    return this.get("argument").isConstantExpression();
  }

  if (this.isBinaryExpression()) {
    return (
      this.get("left").isConstantExpression() &&
      this.get("right").isConstantExpression()
    );
  }

  return false;
}

export function isInStrictMode() {
  const start = this.isProgram() ? this : this.parentPath;

  const strictParent = start.find(path => {
    if (path.isProgram({ sourceType: "module" })) return true;

    if (path.isClass()) return true;

    if (!path.isProgram() && !path.isFunction()) return false;

    if (
      path.isArrowFunctionExpression() &&
      !path.get("body").isBlockStatement()
    ) {
      return false;
    }

    let { node } = path;
    if (path.isFunction()) node = node.body;

    for (const directive of node.directives) {
      if (directive.value.value === "use strict") {
        return true;
      }
    }
  });

  return !!strictParent;
}
