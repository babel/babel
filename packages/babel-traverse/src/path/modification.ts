// This file contains methods that modify the path/node in some ways.

import NodePath, { INSERTED } from "./index.ts";
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
import TraversalContext, { createNodePath } from "../context.ts";

/**
 * Insert the provided nodes before the current one.
 */

export function insertBefore<Nodes extends NodeOrNodeList<t.Node>>(
  this: NodePath<t.Node | null>,
  nodes_: Nodes,
): NodePaths<Nodes> {
  _assertUnremoved.call(this);

  const nodes = _verifyNodeList.call(this, nodes_);

  const { parentPath } = this;

  if (
    parentPath.isExpressionStatement() ||
    parentPath.isLabeledStatement() ||
    parentPath.isExportNamedDeclaration() ||
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

function _containerInsert<Nodes extends NodeList<t.Node>>(
  this: NodePath<t.Node | null>,
  from: number,
  nodes: Nodes,
): NodePaths<Nodes> {
  const len = nodes.length;

  updateSiblingKeys.call(this, from, len);

  const paths: NodePath<t.Node | null>[] = [];

  (this.container as t.Node[]).splice(from, 0, ...nodes);

  for (let i = 0; i < len; i++) {
    const to = from + i;
    const path = this.getSibling(to);
    path._traverseFlags |= INSERTED;
    paths.push(path);
  }

  for (let ctx = TraversalContext.current; ctx; ctx = ctx._parent) {
    const stack = ctx.findInsertionStack(this.container, this);
    if (!stack) continue;

    const shouldQueue =
      stack.container !== this.container || from <= stack.index;

    for (let i = ctx._depth - 1; i > 0; i--) {
      const frame = ctx._stacks[i];
      if (frame.container === this.container && frame.index >= from) {
        frame.index += len;
      }
    }

    if (shouldQueue) stack.queue.push(...paths);
  }

  return paths as NodePaths<Nodes>;
}

export function _containerInsertBefore<Nodes extends NodeList<t.Node>>(
  this: NodePath<t.Node | null>,
  nodes: Nodes,
): NodePaths<Nodes> {
  return _containerInsert.call(
    this,
    this.key as number,
    nodes,
  ) as NodePaths<Nodes>;
}

export function _containerInsertAfter<Nodes extends NodeList<t.Node>>(
  this: NodePath<t.Node | null>,
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
    blockScope.getOwnBinding(node.left.name)!.constantViolations.length <= 1
  );
}

/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 */

export function insertAfter<Nodes extends NodeOrNodeList<t.Node>>(
  this: NodePath<t.Node | null>,
  nodes_: Nodes,
): NodePaths<Nodes> {
  _assertUnremoved.call(this);

  if (this.isSequenceExpression()) {
    return last(this.get("expressions")).insertAfter(nodes_);
  }

  const nodes = _verifyNodeList.call(this, nodes_);

  const { parentPath } = this;
  if (
    parentPath.isExpressionStatement() ||
    parentPath.isLabeledStatement() ||
    parentPath.isExportNamedDeclaration() ||
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
        (
          self.get("callee.body") as unknown as NodePath<t.Expression>
        ).insertAfter(nodes);
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
          scope = scope.parent!;
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
  this: NodePath<t.Node | null>,
  fromIndex: number,
  incrementBy: number,
) {
  if (!incrementBy) return;
  const { parentPath, container } = this;
  updateSiblingKey(parentPath._childPath0, container, fromIndex, incrementBy);
  updateSiblingKey(parentPath._childPath1, container, fromIndex, incrementBy);
  if (parentPath._childPaths) {
    for (const path of parentPath._childPaths.values()) {
      updateSiblingKey(path, container, fromIndex, incrementBy);
    }
  }
}

function updateSiblingKey(
  path: NodePath | undefined,
  container: NodePath["container"],
  fromIndex: number,
  incrementBy: number,
) {
  if (
    path?.container === container &&
    typeof path.key === "number" &&
    path.key >= fromIndex
  ) {
    path.key += incrementBy;
  }
}

export function _verifyNodeList<N extends t.Node>(
  this: NodePath<t.Node | null>,
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
  [P in string & keyof N]-?: N[P] extends (t.Node | null)[] ? P : never;
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
  const path = createNodePath(
    this.context,
    this,
    container[0],
    container,
    0,
    listKey,
  );

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
  const path = createNodePath(
    this.context,
    this,
    container[container.length],
    container,
    container.length,
    listKey,
  );

  return path.replaceWithMultiple(verifiedNodes) as NodePaths<Nodes>;
}
