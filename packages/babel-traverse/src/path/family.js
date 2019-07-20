// @flow
// This file contains methods responsible for dealing with/retrieving children or siblings.

import type TraversalContext from "../index";
import NodePath from "./index";
import * as t from "@babel/types";

export function getOpposite(): ?NodePath {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
}

function addCompletionRecords(path, paths) {
  if (path) return paths.concat(path.getCompletionRecords());
  return paths;
}

function completionRecordForSwitch(cases, paths) {
  let isLastCaseWithConsequent = true;

  for (let i = cases.length - 1; i >= 0; i--) {
    const switchCase = cases[i];
    const consequent = switchCase.get("consequent");

    let breakStatement;
    findBreak: for (const statement of consequent) {
      if (statement.isBlockStatement()) {
        for (const statementInBlock of statement.get("body")) {
          if (statementInBlock.isBreakStatement()) {
            breakStatement = statementInBlock;
            break findBreak;
          }
        }
      } else if (statement.isBreakStatement()) {
        breakStatement = statement;
        break;
      }
    }

    if (breakStatement) {
      while (
        breakStatement.key === 0 &&
        breakStatement.parentPath.isBlockStatement()
      ) {
        breakStatement = breakStatement.parentPath;
      }

      const prevSibling = breakStatement.getPrevSibling();
      if (
        breakStatement.key > 0 &&
        (prevSibling.isExpressionStatement() || prevSibling.isBlockStatement())
      ) {
        paths = addCompletionRecords(prevSibling, paths);
        breakStatement.remove();
      } else {
        breakStatement.replaceWith(breakStatement.scope.buildUndefinedNode());
        paths = addCompletionRecords(breakStatement, paths);
      }
    } else if (isLastCaseWithConsequent) {
      const statementFinder = statement =>
        !statement.isBlockStatement() ||
        statement.get("body").some(statementFinder);
      const hasConsequent = consequent.some(statementFinder);
      if (hasConsequent) {
        paths = addCompletionRecords(consequent[consequent.length - 1], paths);
        isLastCaseWithConsequent = false;
      }
    }
  }
  return paths;
}

export function getCompletionRecords(): NodePath[] {
  let paths = [];

  if (this.isIfStatement()) {
    paths = addCompletionRecords(this.get("consequent"), paths);
    paths = addCompletionRecords(this.get("alternate"), paths);
  } else if (this.isDoExpression() || this.isFor() || this.isWhile()) {
    paths = addCompletionRecords(this.get("body"), paths);
  } else if (this.isProgram() || this.isBlockStatement()) {
    paths = addCompletionRecords(this.get("body").pop(), paths);
  } else if (this.isFunction()) {
    return this.get("body").getCompletionRecords();
  } else if (this.isTryStatement()) {
    paths = addCompletionRecords(this.get("block"), paths);
    paths = addCompletionRecords(this.get("handler"), paths);
    paths = addCompletionRecords(this.get("finalizer"), paths);
  } else if (this.isCatchClause()) {
    paths = addCompletionRecords(this.get("body"), paths);
  } else if (this.isSwitchStatement()) {
    paths = completionRecordForSwitch(this.get("cases"), paths);
  } else {
    paths.push(this);
  }

  return paths;
}

export function getSibling(key: string): NodePath {
  return NodePath.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key,
  });
}

export function getPrevSibling(): NodePath {
  return this.getSibling(this.key - 1);
}

export function getNextSibling(): NodePath {
  return this.getSibling(this.key + 1);
}

export function getAllNextSiblings(): NodePath[] {
  let _key = this.key;
  let sibling = this.getSibling(++_key);
  const siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(++_key);
  }
  return siblings;
}

export function getAllPrevSiblings(): NodePath[] {
  let _key = this.key;
  let sibling = this.getSibling(--_key);
  const siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(--_key);
  }
  return siblings;
}

export function get(
  key: string,
  context?: boolean | TraversalContext,
): NodePath | NodePath[] {
  if (context === true) context = this.context;
  const parts = key.split(".");
  if (parts.length === 1) {
    // "foo"
    return this._getKey(key, context);
  } else {
    // "foo.bar"
    return this._getPattern(parts, context);
  }
}

export function _getKey(
  key: string,
  context?: TraversalContext,
): NodePath | NodePath[] {
  const node = this.node;
  const container = node[key];

  if (Array.isArray(container)) {
    // requested a container so give them all the paths
    return container.map((_, i) => {
      return NodePath.get({
        listKey: key,
        parentPath: this,
        parent: node,
        container: container,
        key: i,
      }).setContext(context);
    });
  } else {
    return NodePath.get({
      parentPath: this,
      parent: node,
      container: node,
      key: key,
    }).setContext(context);
  }
}

export function _getPattern(
  parts: string[],
  context?: TraversalContext,
): NodePath | NodePath[] {
  let path = this;
  for (const part of parts) {
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

export function getBindingIdentifiers(duplicates?: boolean): Object {
  return t.getBindingIdentifiers(this.node, duplicates);
}

export function getOuterBindingIdentifiers(duplicates?: boolean): Object {
  return t.getOuterBindingIdentifiers(this.node, duplicates);
}

// original source - https://github.com/babel/babel/blob/master/packages/babel-types/src/retrievers.js
// path.getBindingIdentifiers returns nodes where the following re-implementation
// returns paths
export function getBindingIdentifierPaths(
  duplicates?: boolean = false,
  outerOnly?: boolean = false,
): { [string]: NodePath } {
  const path = this;
  let search = [].concat(path);
  const ids = Object.create(null);

  while (search.length) {
    const id = search.shift();
    if (!id) continue;
    if (!id.node) continue;

    const keys = t.getBindingIdentifiers.keys[id.node.type];

    if (id.isIdentifier()) {
      if (duplicates) {
        const _ids = (ids[id.node.name] = ids[id.node.name] || []);
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
        const key = keys[i];
        const child = id.get(key);
        if (Array.isArray(child) || child.node) {
          search = search.concat(child);
        }
      }
    }
  }

  // $FlowIssue Object.create() is object type
  return ids;
}

export function getOuterBindingIdentifierPaths(
  duplicates?: boolean,
): { [string]: NodePath } {
  return this.getBindingIdentifierPaths(duplicates, true);
}
