import NodePath from "./index";
import * as t from "../../types";

/**
 * Description
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
 * Description
 */

export function getCompletionRecords(): Array<NodePath> {
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
  } else {
    paths.push(this);
  }

  return paths;
}

/**
 * Description
 */

export function getSibling(key) {
  return NodePath.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    containerKey: this.containerKey,
    key: key
  });
}

/**
 * Description
 */

export function get(key: string): NodePath {
  var parts = key.split(".");
  if (parts.length === 1) { // "foo"
    return this._getKey(key);
  } else { // "foo.bar"
    return this._getPattern(parts);
  }
}

/**
 * Description
 */

export function _getKey(key) {
  var node      = this.node;
  var container = node[key];

  if (Array.isArray(container)) {
    // requested a container so give them all the paths
    return container.map((_, i) => {
      return NodePath.get({
        containerKey: key,
        parentPath: this,
        parent: node,
        container: container,
        key: i
      }).setContext();
    });
  } else {
    return NodePath.get({
      parentPath: this,
      parent: node,
      container: node,
      key: key
    }).setContext();
  }
}

/**
 * Description
 */

export function _getPattern(parts) {
  var path = this;
  for (var part of (parts: Array)) {
    if (part === ".") {
      path = path.parentPath;
    } else {
      if (Array.isArray(path)) {
        path = path[part];
      } else {
        path = path.get(part);
      }
    }
  }
  return path;
}

/**
 * Description
 */

export function getBindingIdentifiers() {
  return t.getBindingIdentifiers(this.node);
}
