import PathHoister from "./lib/hoister";
import NodePath from "./index";
import * as t from "../../types";

/**
 * Insert the provided nodes before the current one.
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
      this.node = this.container[this.key] = t.blockStatement(nodes);
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

/**
 * [Please add a description.]
 */

export function _containerInsert(from, nodes) {
  this.updateSiblingKeys(from, nodes.length);

  var paths = [];

  for (var i = 0; i < nodes.length; i++) {
    var to = from + i;
    var node = nodes[i];
    this.container.splice(to, 0, node);

    if (this.context) {
      var path = this.context.create(this.parent, this.container, to, this.listKey);
      paths.push(path);
      this.queueNode(path);
    } else {
      paths.push(NodePath.get({
        parentPath: this,
        parent: node,
        container: this.container,
        listKey: this.listKey,
        key: to
      }));
    }
  }

  return paths;
}

/**
 * [Please add a description.]
 */

export function _containerInsertBefore(nodes) {
  return this._containerInsert(this.key, nodes);
}

/**
 * [Please add a description.]
 */

export function _containerInsertAfter(nodes) {
  return this._containerInsert(this.key + 1, nodes);
}

/**
 * [Please add a description.]
 */

export function _maybePopFromStatements(nodes) {
  var last = nodes[nodes.length - 1];
  if (t.isExpressionStatement(last) && t.isIdentifier(last.expression) && !this.isCompletionRecord()) {
    nodes.pop();
  }
}

/**
 * Insert the provided nodes after the current one. When inserting nodes after an
 * expression, ensure that the completion record is correct by pushing the current node.
 */

export function insertAfter(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertAfter(nodes);
  } else if (this.isNodeType("Expression") || (this.parentPath.isForStatement() && this.key === "init")) {
    if (this.node) {
      var temp = this.scope.generateDeclaredUidIdentifier();
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
      this.node = this.container[this.key] = t.blockStatement(nodes);
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  }

  return [this];
}

/**
 * Update all sibling node paths after `fromIndex` by `incrementBy`.
 */

export function updateSiblingKeys(fromIndex, incrementBy) {
  var paths = this.parent._paths;
  for (var i = 0; i < paths.length; i++) {
    let path = paths[i];
    if (path.key >= fromIndex) {
      path.key += incrementBy;
    }
  }
}

/**
 * [Please add a description.]
 */

export function _verifyNodeList(nodes) {
  if (nodes.constructor !== Array) {
    nodes = [nodes];
  }

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (!node) {
      throw new Error(`Node list has falsy node with the index of ${i}`);
    } else if (typeof node !== "object") {
      throw new Error(`Node list contains a non-object node with the index of ${i}`);
    } else if (!node.type) {
      throw new Error(`Node list contains a node without a type with the index of ${i}`);
    } else if (node instanceof NodePath) {
      nodes[i] = node.node;
    }
  }

  return nodes;
}

/**
 * [Please add a description.]
 */

export function unshiftContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway

  var container = this.node[listKey];
  var path      = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey,
    key: 0
  });

  return path.insertBefore(nodes);
}

/**
 * [Please add a description.]
 */

export function pushContainer(listKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  var container = this.node[listKey];
  var i         = container.length;
  var path      = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container,
    listKey,
    key: i
  });

  return path.replaceWith(nodes, true);
}

/**
 * Hoist the current node to the highest scope possible and return a UID
 * referencing it.
 */

export function hoist(scope = this.scope) {
  var hoister = new PathHoister(this, scope);
  return hoister.run();
}
