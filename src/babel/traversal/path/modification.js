import PathHoister from "./lib/hoister";
import NodePath from "./index";
import * as t from "../../types";

/**
 * Description
 */

export function insertBefore(nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  if (this.parentPath.isExpressionStatement() || this.parentPath.isLabeledStatement()) {
    return this.parentPath.insertBefore(nodes);
  } else if (this.isNodeType("Expression") || (this.parentPath.isForStatement() && this.key === "init")) {
    if (this.node) nodes.push(this.node);
    this.replaceExpressionWithStatements(nodes);
  } else if (this.isNodeType("Statement") || !this.type) {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertBefore(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.push(this.node);
      this.node = this.container[this.key] = t.blockStatement(nodes);
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  } else {
    throw new Error("No clue what to do with this node type.");
  }

  return [this];
}

export function _containerInsert(from, nodes) {
  this.updateSiblingKeys(from, nodes.length);

  var paths = [];

  for (var i = 0; i < nodes.length; i++) {
    var to = from + i;
    var node = nodes[i];
    this.container.splice(to, 0, node);

    if (this.context) {
      var path = this.context.create(this.parent, this.container, to, this.containerKey);
      paths.push(path);
      this.queueNode(path);
    } else {
      paths.push(NodePath.get({
        parentPath: this,
        parent: node,
        container: this.container,
        containerKey: this.containerKey,
        key: to
      }));
    }
  }

  return paths;
}

export function _containerInsertBefore(nodes) {
  return this._containerInsert(this.key, nodes);
}

export function _containerInsertAfter(nodes) {
  return this._containerInsert(this.key + 1, nodes);
}

export function _maybePopFromStatements(nodes) {
  var last = nodes[nodes.length - 1];
  if (t.isExpressionStatement(last) && t.isIdentifier(last.expression) && !this.isCompletionRecord()) {
    nodes.pop();
  }
}

/**
 * Description
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
  } else if (this.isNodeType("Statement") || !this.type) {
    this._maybePopFromStatements(nodes);
    if (Array.isArray(this.container)) {
      return this._containerInsertAfter(nodes);
    } else if (this.isStatementOrBlock()) {
      if (this.node) nodes.unshift(this.node);
      this.node = this.container[this.key] = t.blockStatement(nodes);
    } else {
      throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");
    }
  } else {
    throw new Error("No clue what to do with this node type.");
  }

  return [this];
}

/**
 * Description
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
 * Description
 */

/**
 * Description
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
 * Description
 */

export function unshiftContainer(containerKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get the first path and insert our nodes before it, if it doesn't exist then it
  // doesn't matter, our nodes will be inserted anyway

  var container = this.node[containerKey];
  var path      = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container,
    containerKey,
    key: 0
  });

  return path.insertBefore(nodes);
}

/**
 * Description
 */

export function pushContainer(containerKey, nodes) {
  this._assertUnremoved();

  nodes = this._verifyNodeList(nodes);

  // get an invisible path that represents the last node + 1 and replace it with our
  // nodes, effectively inlining it

  var container = this.node[containerKey];
  var i         = container.length;
  var path      = NodePath.get({
    parentPath: this,
    parent: this.node,
    container: container,
    containerKey,
    key: i
  });

  return path.replaceWith(nodes, true);
}

/**
 * Description
 */

export function hoist(scope = this.scope) {
  var hoister = new PathHoister(this, scope);
  return hoister.run();
}
