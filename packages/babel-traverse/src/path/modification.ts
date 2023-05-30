// This file contains methods that modify the path/node in some ways.

import { path as pathCache } from "../cache";
import PathHoister from "./lib/hoister";
import NodePath from "./index";
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
import type Scope from "../scope";

/**
 * Insert the provided nodes before the current one.
 */

export function insertBefore(
  this: NodePath,
  nodes_: t.Node | t.Node[],
): NodePath[] {
  this._assertUnremoved();

  const nodes = this._verifyNodeList(nodes_);

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
    return parentPath.insertBefore(nodes);
  } else if (
    (this.isNodeType("Expression") && !this.isJSXElement()) ||
    (parentPath.isForStatement() && this.key === "init")
  ) {
    if (this.node) nodes.push(this.node);
    // @ts-expect-error todo(flow->ts): check that nodes is an array of statements
    return this.replaceExpressionWithStatements(nodes);
  } else if (Array.isArray(this.container)) {
    return this._containerInsertBefore(nodes);
  } else if (this.isStatementOrBlock()) {
    const node = this.node as t.Statement;
    const shouldInsertCurrentNode =
      node &&
      (!this.isExpressionStatement() ||
        (node as t.ExpressionStatement).expression != null);

    this.replaceWith(blockStatement(shouldInsertCurrentNode ? [node] : []));
    return (this as NodePath<t.BlockStatement>).unshiftContainer(
      "body",
      // @ts-expect-error Fixme: refine nodes to t.BlockStatement["body"] when this is a BlockStatement path
      nodes,
    );
  } else {
    throw new Error(
      "We don't know what to do with this node type. " +
        "We were previously a Statement but we can't fit in here?",
    );
  }
}

export function _containerInsert<N extends t.Node>(
  this: NodePath,
  from: number,
  nodes: N[],
): NodePath<N>[] {
  this.updateSiblingKeys(from, nodes.length);

  const paths: NodePath<N>[] = [];

  // @ts-expect-error todo(flow->ts): this.container could be a NodePath
  this.container.splice(from, 0, ...nodes);
  for (let i = 0; i < nodes.length; i++) {
    const to = from + i;
    const path = this.getSibling(to) as NodePath<N>;
    paths.push(path);

    if (this.context && this.context.queue) {
      path.pushContext(this.context);
    }
  }

  const contexts = this._getQueueContexts();

  for (const path of paths) {
    path.setScope();
    path.debug("Inserted.");

    for (const context of contexts) {
      context.maybeQueue(path, true);
    }
  }

  return paths;
}

export function _containerInsertBefore<N extends t.Node>(
  this: NodePath,
  nodes: N[],
) {
  return this._containerInsert(this.key as number, nodes);
}

export function _containerInsertAfter<N extends t.Node>(
  this: NodePath,
  nodes: N[],
) {
  return this._containerInsert((this.key as number) + 1, nodes);
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

export function insertAfter(
  this: NodePath,
  nodes_: t.Node | t.Node[],
): NodePath[] {
  this._assertUnremoved();

  if (this.isSequenceExpression()) {
    return last(this.get("expressions")).insertAfter(nodes_);
  }

  const nodes = this._verifyNodeList(nodes_);

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
    );
  } else if (
    (this.isNodeType("Expression") &&
      !this.isJSXElement() &&
      !parentPath.isJSXElement()) ||
    (parentPath.isForStatement() && this.key === "init")
  ) {
    if (this.node) {
      const node = this.node as t.Expression | t.VariableDeclaration;
      let { scope } = this;

      if (scope.path.isPattern()) {
        assertExpression(node);

        this.replaceWith(callExpression(arrowFunctionExpression([], node), []));
        (this.get("callee.body") as NodePath<t.Expression>).insertAfter(nodes);
        return [this];
      }

      if (isHiddenInSequenceExpression(this)) {
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
    return this._containerInsertAfter(nodes);
  } else if (this.isStatementOrBlock()) {
    const node = this.node as t.Statement;
    const shouldInsertCurrentNode =
      node &&
      (!this.isExpressionStatement() ||
        (node as t.ExpressionStatement).expression != null);

    this.replaceWith(blockStatement(shouldInsertCurrentNode ? [node] : []));
    // @ts-expect-error Fixme: refine nodes to t.BlockStatement["body"] when this is a BlockStatement path
    return this.pushContainer("body", nodes);
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

  const paths = pathCache.get(this.parent);

  for (const [, path] of paths) {
    if (typeof path.key === "number" && path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}

export function _verifyNodeList<N extends t.Node>(
  this: NodePath,
  nodes: N | N[],
): N[] {
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

export function unshiftContainer<N extends t.Node, K extends keyof N & string>(
  this: NodePath<N>,
  listKey: K,
  nodes: N[K] extends (infer E)[]
    ? E | E[]
    : // todo: refine to t.Node[]
      //  ? E extends t.Node
      //    ? E | E[]
      //    : never
      never,
) {
  // todo: NodePaths<Nodes>
  this._assertUnremoved();

  // @ts-expect-error fixme
  nodes = this._verifyNodeList(nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway
  const path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: this.node[listKey] as unknown as t.Node | t.Node[],
    listKey,
    key: 0,
  }).setContext(this.context);

  return path._containerInsertBefore(
    // @ts-expect-error typings needed to narrow down nodes as t.Node[]
    nodes,
  );
}

export function pushContainer<N extends t.Node, K extends keyof N & string>(
  this: NodePath<N>,
  listKey: K,
  nodes: N[K] extends (infer E)[]
    ? E | E[]
    : // todo: refine to t.Node[]
      //  ? E extends t.Node
      //    ? E | E[]
      //    : never
      never,
) {
  this._assertUnremoved();

  const verifiedNodes = this._verifyNodeList(
    // @ts-expect-error refine typings
    nodes,
  );

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  const container = this.node[listKey];
  const path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container as unknown as t.Node | t.Node[],
    listKey,
    // @ts-expect-error TS cannot infer that container is t.Node[]
    key: container.length,
  }).setContext(this.context);

  return path.replaceWithMultiple(verifiedNodes);
}

/**
 * Hoist the current node to the highest scope possible and return a UID
 * referencing it.
 */
export function hoist<T extends t.Node>(
  this: NodePath<T>,
  scope: Scope = this.scope,
) {
  const hoister = new PathHoister<T>(this, scope);
  return hoister.run();
}
