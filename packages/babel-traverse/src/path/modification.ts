// This file contains methods that modify the path/node in some ways.

import { getCachedPaths } from "../cache.ts";
import NodePath from "./index.ts";
import { _getQueueContexts, pushContext, setScope } from "./context.ts";
import { _assertUnremoved } from "./removal.ts";
import {
  arrowFunctionExpression,
  assertExpression,
  assignmentExpression,
  blockStatement,
  callExpression,
  cloneNode,
  expressionStatement,
  isAssignmentExpression,
  isCallExpression,
  isExportNamedDeclaration,
  isExpression,
  isIdentifier,
  isSequenceExpression,
  isSuper,
  thisExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import type Scope from "../scope/index.ts";
import type {
  NodeList,
  NodeOrNodeList,
  NodeListType,
  NodePaths,
} from "./index.ts";

/**
 * Insert the provided nodes before the current one.
 */

export function insertBefore<Nodes extends NodeOrNodeList<t.Node>>(
  this: NodePath,
  nodes_: Nodes,
): NodePaths<Nodes> {
  _assertUnremoved.call(this);

  const nodes = _verifyNodeList.call(this, nodes_);

  const { parentPath, parent } = this;

  if (
    parentPath.isExpressionStatement() ||
    parentPath.isLabeledStatement() ||
    // https://github.com/babel/babel/issues/15293
    // When Babel transforms `export class String { field }`, the class properties plugin will inject the defineProperty
    // helper, which depends on the builtins e.g. String, Number, Symbol, etc. To prevent them from being shadowed by local
    // exports, the helper injector replaces the named export into `class _String { field }; export { _String as String }`,
    // with `parentPath` here changed to the moved ClassDeclaration, causing rare inconsistency between `parent` and `parentPath`.
    // Here we retrieve the parent type from the `parent` property. This is a temporary fix and we should revisit when
    // helpers should get injected.
    isExportNamedDeclaration(parent) ||
    (parentPath.isExportDefaultDeclaration() && this.isDeclaration())
  ) {
    return parentPath.insertBefore(nodes as Nodes);
  } else if (
    (this.isNodeType("Expression") && !this.isJSXElement()) ||
    (parentPath.isForStatement() && this.key === "init")
  ) {
    if (this.node) nodes.push(this.node);
    // @ts-expect-error todo(flow->ts): check that nodes is an array of statements
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return _containerInsertBefore.call(this, nodes) as NodePaths<Nodes>;
  } else if (this.isStatementOrBlock()) {
    const node = this.node as t.Statement;
    const shouldInsertCurrentNode =
      node &&
      (!this.isExpressionStatement() ||
        (node as t.ExpressionStatement).expression != null);

    const [blockPath] = this.replaceWith(
      blockStatement(shouldInsertCurrentNode ? [node] : []),
    );
    return blockPath.unshiftContainer(
      "body",
      nodes as t.Statement[],
    ) as NodePaths<Nodes>;
  } else {
    throw new Error(
      "We don't know what to do with this node type. " +
        "We were previously a Statement but we can't fit in here?",
    );
  }
}

export function _containerInsert<Nodes extends NodeList<t.Node>>(
  this: NodePath,
  from: number,
  nodes: Nodes,
): NodePaths<Nodes> {
  updateSiblingKeys.call(this, from, nodes.length);

  const paths: NodePath[] = [];

  // @ts-expect-error todo(flow->ts): this.container could be a NodePath
  this.container.splice(from, 0, ...nodes);
  for (let i = 0; i < nodes.length; i++) {
    const to = from + i;
    const path = this.getSibling(to);
    paths.push(path);

    if (this.context?.queue) {
      pushContext.call(path, this.context);
    }
  }

  const contexts = _getQueueContexts.call(this);

  for (const path of paths) {
    setScope.call(path);
    path.debug("Inserted.");

    for (const context of contexts) {
      context.maybeQueue(path, true);
    }
  }

  return paths as NodePaths<Nodes>;
}

export function _containerInsertBefore<Nodes extends NodeList<t.Node>>(
  this: NodePath,
  nodes: Nodes,
): NodePaths<Nodes> {
  return _containerInsert.call(
    this,
    this.key as number,
    nodes,
  ) as NodePaths<Nodes>;
}

export function _containerInsertAfter<Nodes extends NodeList<t.Node>>(
  this: NodePath,
  nodes: Nodes,
): NodePaths<Nodes> {
  return _containerInsert.call(
    this,
    (this.key as number) + 1,
    nodes,
  ) as NodePaths<Nodes>;
}

const last = <T>(arr: T[]) => arr[arr.length - 1];

function isHiddenInSequenceExpression(path: NodePath): boolean {
  return (
    isSequenceExpression(path.parent) &&
    (last(path.parent.expressions) !== path.node ||
      isHiddenInSequenceExpression(path.parentPath))
  );
}

function isAlmostConstantAssignment(
  node: t.Node,
  scope: Scope,
): node is t.AssignmentExpression & { left: t.Identifier } {
  if (!isAssignmentExpression(node) || !isIdentifier(node.left)) {
    return false;
  }

  // Not every scope can contain variables. For example, we might be in
  // a ClassScope either in the ClassHeritage or in a computed key.
  const blockScope = scope.getBlockParent();

  // If the variable is defined in the current scope and only assigned here,
  // we can be sure that its value won't change.
  return (
    blockScope.hasOwnBinding(node.left.name) &&
    blockScope.getOwnBinding(node.left.name).constantViolations.length <= 1
  );
}

/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 */

export function insertAfter<Nodes extends NodeOrNodeList<t.Node>>(
  this: NodePath,
  nodes_: Nodes,
): NodePaths<Nodes> {
  _assertUnremoved.call(this);

  if (this.isSequenceExpression()) {
    return last(this.get("expressions")).insertAfter(nodes_);
  }

  const nodes = _verifyNodeList.call(this, nodes_);

  const { parentPath, parent } = this;
  if (
    parentPath.isExpressionStatement() ||
    parentPath.isLabeledStatement() ||
    // see insertBefore
    isExportNamedDeclaration(parent) ||
    (parentPath.isExportDefaultDeclaration() && this.isDeclaration())
  ) {
    return parentPath.insertAfter(
      nodes.map(node => {
        // Usually after an expression we can safely insert another expression:
        //   A.insertAfter(B)
        //     foo = A;  -> foo = (A, B);
        // If A is an expression statement, it isn't safe anymore so we need to
        // convert B to an expression statement
        //     A;        -> A; B // No semicolon! It could break if followed by [!
        return isExpression(node) ? expressionStatement(node) : node;
      }),
      // todo: this cast is unsound, we wrap some expression nodes in expressionStatement but never unwrap them in the return values.
    ) as NodePaths<Nodes>;
  } else if (
    (this.isNodeType("Expression") &&
      !this.isJSXElement() &&
      !parentPath.isJSXElement()) ||
    (parentPath.isForStatement() && this.key === "init")
  ) {
    const self = this as NodePath<t.Expression | t.VariableDeclaration>;
    if (self.node) {
      const node = self.node;
      let { scope } = this;

      if (scope.path.isPattern()) {
        assertExpression(node);

        self.replaceWith(callExpression(arrowFunctionExpression([], node), []));
        (self.get("callee.body") as NodePath<t.Expression>).insertAfter(nodes);
        // todo: this cast is unsound, we wrap nodes in the IIFE but never unwrap them in the return values.
        // consider just returning the insertAfter result.
        return [self] as NodePaths<Nodes>;
      }

      if (isHiddenInSequenceExpression(self)) {
        nodes.unshift(node);
      }
      // We need to preserve the value of this expression.
      else if (isCallExpression(node) && isSuper(node.callee)) {
        nodes.unshift(node);
        // `super(...)` always evaluates to `this`.
        nodes.push(thisExpression());
      } else if (isAlmostConstantAssignment(node, scope)) {
        nodes.unshift(node);
        nodes.push(cloneNode(node.left));
      } else if (scope.isPure(node, true)) {
        // Insert the nodes before rather than after; it's not observable.
        nodes.push(node);
      } else {
        // Inserting after the computed key of a method should insert the
        // temporary binding in the method's parent's scope.
        if (parentPath.isMethod({ computed: true, key: node })) {
          scope = scope.parent;
        }
        const temp = scope.generateDeclaredUidIdentifier();
        nodes.unshift(
          expressionStatement(
            // @ts-expect-error todo(flow->ts): This can be a variable
            // declaration in the "init" of a for statement, but that's
            // invalid here.
            assignmentExpression("=", cloneNode(temp), node),
          ),
        );
        nodes.push(expressionStatement(cloneNode(temp)));
      }
    }
    // @ts-expect-error todo(flow->ts): check that nodes is an array of statements
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return _containerInsertAfter.call(this, nodes) as NodePaths<Nodes>;
  } else if (this.isStatementOrBlock()) {
    const node = this.node as t.Statement;
    const shouldInsertCurrentNode =
      node &&
      (!this.isExpressionStatement() ||
        (node as t.ExpressionStatement).expression != null);

    const [blockPath] = this.replaceWith(
      blockStatement(shouldInsertCurrentNode ? [node] : []),
    );
    return blockPath.pushContainer(
      "body",
      nodes as t.Statement[],
    ) as NodePaths<Nodes>;
  } else {
    throw new Error(
      "We don't know what to do with this node type. " +
        "We were previously a Statement but we can't fit in here?",
    );
  }
}

/**
 * Update all sibling node paths after `fromIndex` by `incrementBy`.
 */

export function updateSiblingKeys(
  this: NodePath,
  fromIndex: number,
  incrementBy: number,
) {
  if (!this.parent) return;

  const paths = getCachedPaths(this);
  if (!paths) return;

  for (const [, path] of paths) {
    if (
      typeof path.key === "number" &&
      path.container === this.container &&
      path.key >= fromIndex
    ) {
      path.key += incrementBy;
    }
  }
}

export function _verifyNodeList<N extends t.Node | null>(
  this: NodePath,
  nodes: N | N[],
) {
  if (!nodes) {
    return [];
  }

  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    let msg;

    if (!node) {
      msg = "has falsy node";
    } else if (typeof node !== "object") {
      msg = "contains a non-object node";
    } else if (!node.type) {
      msg = "without a type";
    } else if (node instanceof NodePath) {
      msg = "has a NodePath when it expected a raw object";
    }

    if (msg) {
      const type = Array.isArray(node) ? "array" : typeof node;
      throw new Error(
        `Node list ${msg} with the index of ${i} and type of ${type}`,
      );
    }
  }

  return nodes;
}

type NodeKeyOfArrays<N extends t.Node> = {
  [P in string & keyof N]-?: N[P] extends Array<t.Node | null> ? P : never;
}[string & keyof N];

export function unshiftContainer<
  N extends t.Node,
  K extends NodeKeyOfArrays<N>,
  Nodes extends NodeOrNodeList<NodeListType<N, K>>,
>(this: NodePath<N>, listKey: K, nodes: Nodes): NodePaths<Nodes> {
  _assertUnremoved.call(this);

  const verifiedNodes = _verifyNodeList.call(this, nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway
  const container = (this.node as N)[listKey] as t.Node[];
  const path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container,
    listKey,
    key: 0,
  }).setContext(this.context);

  return _containerInsertBefore.call(path, verifiedNodes) as NodePaths<Nodes>;
}

export function pushContainer<
  N extends t.Node,
  K extends NodeKeyOfArrays<N>,
  Nodes extends NodeOrNodeList<NodeListType<N, K>>,
>(this: NodePath<N>, listKey: K, nodes: Nodes): NodePaths<Nodes> {
  _assertUnremoved.call(this);

  const verifiedNodes = _verifyNodeList.call(this, nodes);

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  const container = (this.node as N)[listKey] as t.Node[];
  const path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container,
    listKey,
    key: container.length,
  }).setContext(this.context);

  return path.replaceWithMultiple(verifiedNodes) as NodePaths<Nodes>;
}

import PathHoister from "./lib/hoister.ts" with { if: "!process.env.BABEL_8_BREAKING && !USE_ESM" };
if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  /**
   * Hoist the current node to the highest scope possible and return a UID
   * referencing it.
   */
  // eslint-disable-next-line no-restricted-globals
  exports.hoist = function hoist<N extends t.Node>(
    this: NodePath<N>,
    scope: Scope = this.scope,
  ) {
    const hoister = new PathHoister<N>(this, scope);
    return hoister.run();
  };
}
