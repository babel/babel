import type TraversalContext from "../index";
import NodePath from "./index";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

export function getStatementParent(): ?NodePath {
  var path = this;

  do {
    if (!path.parentPath || (Array.isArray(path.container) && path.isStatement())) {
      break;
    } else {
      path = path.parentPath;
    }
  } while (path);

  if (path && (path.isProgram() || path.isFile())) {
    throw new Error("File/Program node, we can't possibly find a statement parent to this");
  }

  return path;
}

/**
 * [Please add a description.]
 */

export function getOpposite() {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
}

/**
 * [Please add a description.]
 */

export function getCompletionRecords(): Array {
  var paths = [];

  var add = function (path) {
    if (path) paths = paths.concat(path.getCompletionRecords());
  };

  if (this.isIfStatement()) {
    add(this.get("consequent"));
    add(this.get("alternate"));
  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
    add(this.get("body"));
  } else if (this.isProgram() || this.isBlockStatement()) {
    add(this.get("body").pop());
  } else if (this.isFunction()) {
    return this.get("body").getCompletionRecords();
  } else if (this.isTryStatement()) {
    add(this.get("block"));
    add(this.get("handler"));
    add(this.get("finalizer"));
  } else {
    paths.push(this);
  }

  return paths;
}

/**
 * [Please add a description.]
 */

export function getSibling(key) {
  return NodePath.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  });
}

/**
 * [Please add a description.]
 */

export function get(key: string, context?: boolean | TraversalContext): NodePath {
  if (context === true) context = this.context;
  var parts = key.split(".");
  if (parts.length === 1) { // "foo"
    return this._getKey(key, context);
  } else { // "foo.bar"
    return this._getPattern(parts, context);
  }
}

/**
 * [Please add a description.]
 */

export function _getKey(key, context?) {
  var node      = this.node;
  var container = node[key];

  if (Array.isArray(container)) {
    // requested a container so give them all the paths
    return container.map((_, i) => {
      return NodePath.get({
        listKey: key,
        parentPath: this,
        parent: node,
        container: container,
        key: i
      }).setContext(context);
    });
  } else {
    return NodePath.get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext(context);
  }
}

/**
 * [Please add a description.]
 */

export function _getPattern(parts, context) {
  var path = this;
  for (var part of (parts: Array)) {
    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }
  return path;
}

/**
 * [Please add a description.]
 */

export function getBindingIdentifiers(duplicates?) {
  return t.getBindingIdentifiers(this.node, duplicates);
}
