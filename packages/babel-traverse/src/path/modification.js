// This file contains methods that modify the path/node in some ways.

import { PATH_CACHE_KEY } from "./constants";
import PathHoister from "./lib/hoister";
import NodePath from "./index";
import * as t from "babel-types";

/**
 * Insert the provided nodes before the current one.
 * @public
 * @name NodePath.prototype.insertBefore
 */

export function insertBefore(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertBefore(nodes);
  } else if (this.isNodeType("Expression") || (this.parentPath.isForStatement() && this.key === "init")) {
    if (this.node) nodes.push(this.node);
    this.replaceExpressionWithStatements(nodes);
  } else {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertBefore(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.push(this.node);
      this._replaceWith(t.blockStatement(nodes));
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

/**
 * @private
 */

export function _containerInsert(from, nodes) {
  this.updateSiblingKeys(from, nodes.length);

  let paths = [];

  for (let i = 0; i < nodes.length; i++) {
    let to = from + i;
    let node = nodes[i];
    this.container.splice(to, 0, node);

    if (this.context) {
      let path = this.context.create(this.parent, this.container, to, this.listKey);
      paths.push(path);
    } else {
      paths.push(NodePath.get({
        parentPath: this.parentPath,
        parent: this.parent,
        container: this.container,
        listKey: this.listKey,
        key: to
      }));
    }
  }

  let contexts = this.contexts;
  let path = this;
  while (!contexts.length) {
    path = path.parentPath;
    contexts = path.contexts;
  }

  for (let path of paths) {
    path.setScope();
    path.debug(() => "Inserted.");

    for (let context of contexts) {
      context.maybeQueue(path, true);
    }
  }

  return paths;
}

/**
 * @private
 */

export function _containerInsertBefore(nodes) {
  return this._containerInsert(this.key, nodes);
}

/**
 * @private
 */

export function _containerInsertAfter(nodes) {
  return this._containerInsert(this.key + 1, nodes);
}

/**
 * @private
 */

export function _maybePopFromStatements(nodes) {
  let last = nodes[nodes.length - 1];
  let isIdentifier = t.isIdentifier(last) || (t.isExpressionStatement(last) && t.isIdentifier(last.expression));

  if (isIdentifier && !this.isCompletionRecord()) {
    nodes.pop();
  }
}

/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 * @public
 * @name NodePath.prototype.insertAfter
 */

export function insertAfter(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertAfter(nodes);
  } else if (this.isNodeType("Expression") || (this.parentPath.isForStatement() && this.key === "init")) {
    if (this.node) {
      let temp = this.scope.generateDeclaredUidIdentifier();
      nodes.unshift(t.expressionStatement(t.assignmentExpression("=", temp, this.node)));
      nodes.push(t.expressionStatement(temp));
    }
    this.replaceExpressionWithStatements(nodes);
  } else {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertAfter(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.unshift(this.node);
      this._replaceWith(t.blockStatement(nodes));
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

/**
 * Update all sibling node paths after `fromIndex` by `incrementBy`.
 * @public
 * @name NodePath.prototype.updateSiblingKeys
 */

export function updateSiblingKeys(fromIndex, incrementBy) {
  if (!this.parent) return;

  let paths = this.parent[PATH_CACHE_KEY];
  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];
    if (path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}

/**
 * @private
 */

export function _verifyNodeList(nodes) {
  if (!nodes) {
    return [];
  }

  if (nodes.constructor !== Array) {
    nodes = [nodes];
  }

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
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
      let type = Array.isArray(node) ? "array" : typeof node;
      throw new Error(`Node list ${msg} with the index of ${i} and type of ${type}`);
    }
  }

  return nodes;
}

/**
 * [Needs description]
 * @public
 * @name NodePath.prototype.unshiftContainer
 */

export function unshiftContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway
  let path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: this.node[listKey],
    listKey,
    key: 0
  });

  return path.insertBefore(nodes);
}

/**
 * [Needs description]
 * @public
 * @name NodePath.prototype.pushContainer
 */

export function pushContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  let container = this.node[listKey];
  let path = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey,
    key: container.length
  });

  return path.replaceWithMultiple(nodes);
}

/**
 * Hoist the current node to the highest scope possible and return a UID
 * referencing it.
 * @public
 * @name NodePath.prototype.hoist
 */

export function hoist(scope = this.scope) {
  let hoister = new PathHoister(this, scope);
  return hoister.run();
}
