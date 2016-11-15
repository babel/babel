// This file contains methods responsible for dealing with/retrieving children or siblings.

import type TraversalContext from "../index";
import NodePath from "./index";
import * as t from "babel-types";

export function getStatementParent(): ?NodePath {
  let path = this;

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

export function getOpposite() {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
}

export function getCompletionRecords(): Array {
  let paths = [];

  let add = function (path) {
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

export function getSibling(key) {
  return NodePath.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key
  });
}

export function get(key: string, context?: boolean | TraversalContext): NodePath {
  if (context === true) context = this.context;
  let parts = key.split(".");
  if (parts.length === 1) { // "foo"
    return this._getKey(key, context);
  } else { // "foo.bar"
    return this._getPattern(parts, context);
  }
}

export function _getKey(key, context?) {
  let node      = this.node;
  let container = node[key];

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

export function _getPattern(parts, context) {
  let path = this;
  for (let part of (parts: Array)) {
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

export function getBindingIdentifiers(duplicates, returnPaths = false) {
  if (returnPaths) {
    return this.getBindingIdentifierPaths(duplicates);
  }
  return t.getBindingIdentifiers(this.node, duplicates);
}

export function getOuterBindingIdentifiers(duplicates, returnPaths = false) {
  if (returnPaths) {
    return this.getBindingIdentifierPaths(duplicates, true);
  }
  return t.getOuterBindingIdentifiers(this.node, duplicates);
}

// original source - https://github.com/babel/babel/blob/master/packages/babel-types/src/retrievers.js
// path.getBindingIdentifiers returns nodes where the following re-implementation
// returns paths
export function getBindingIdentifierPaths(duplicates = false, outerOnly = false) {
  let path = this;
  let search = [].concat(path);
  let ids = Object.create(null);

  while (search.length) {
    let id = search.shift();
    if (!id) continue;
    if (!id.node) continue;

    let keys = t.getBindingIdentifiers.keys[id.node.type];

    if (id.isIdentifier()) {
      if (duplicates) {
        let _ids = ids[id.node.name] = ids[id.node.name] || [];
        _ids.push(id);
      } else {
        ids[id.node.name] = id;
      }
      continue;
    }

    if (id.isExportDeclaration()) {
      const declaration = id.get("declaration");
      if (declaration.isDeclaration()) {
        search.push(declaration);
      }
      continue;
    }

    if (outerOnly) {
      if (id.isFunctionDeclaration()) {
        search.push(id.get("id"));
        continue;
      }
      if (id.isFunctionExpression()) {
        continue;
      }
    }

    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let child = id.get(key);
        if (Array.isArray(child) || child.node) {
          search = search.concat(child);
        }
      }
    }
  }

  return ids;
}
