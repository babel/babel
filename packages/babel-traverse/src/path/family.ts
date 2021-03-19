// This file contains methods responsible for dealing with/retrieving children or siblings.

import type TraversalContext from "../context";
import NodePath from "./index";
import * as t from "@babel/types";

const NORMAL_COMPLETION = 0;
// const BREAK_COMPLETION = 1;

type Completion = {
  path: NodePath;
  type: 0 | 1;
};

// type CompletionContext = {
//   inCatchClause: boolean;
// };

export function getOpposite(this: NodePath): NodePath | null {
  if (this.key === "left") {
    return this.getSibling("right");
  } else if (this.key === "right") {
    return this.getSibling("left");
  }
  return null;
}

function addCompletionRecords(
  path: NodePath | null | undefined,
  records: Completion[],
): Completion[] {
  if (path) return records.concat(_getCompletionRecords(path));
  return records;
}

function findBreak(statements): NodePath | null {
  let breakStatement;
  if (!Array.isArray(statements)) {
    statements = [statements];
  }

  for (const statement of statements) {
    if (
      statement.isDoExpression() ||
      statement.isProgram() ||
      statement.isBlockStatement() ||
      statement.isCatchClause() ||
      statement.isLabeledStatement()
    ) {
      breakStatement = findBreak(statement.get("body"));
    } else if (statement.isIfStatement()) {
      breakStatement =
        findBreak(statement.get("consequent")) ??
        findBreak(statement.get("alternate"));
    } else if (statement.isTryStatement()) {
      breakStatement =
        findBreak(statement.get("block")) ??
        findBreak(statement.get("handler"));
    } else if (statement.isBreakStatement()) {
      breakStatement = statement;
    }

    if (breakStatement) {
      return breakStatement;
    }
  }
  return null;
}

function completionRecordForSwitch(cases, paths) {
  let isLastCaseWithConsequent = true;

  for (let i = cases.length - 1; i >= 0; i--) {
    const switchCase = cases[i];
    const consequent = switchCase.get("consequent");

    let breakStatement = findBreak(consequent);

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

function _getCompletionRecords(path: NodePath): Completion[] {
  let records = [];

  if (path.isIfStatement()) {
    records = addCompletionRecords(path.get("consequent"), records);
    records = addCompletionRecords(path.get("alternate"), records);
  } else if (path.isDoExpression() || path.isFor() || path.isWhile()) {
    // @ts-expect-error(flow->ts): todo
    records = addCompletionRecords(path.get("body"), records);
  } else if (path.isProgram() || path.isBlockStatement()) {
    // @ts-expect-error(flow->ts): todo
    records = addCompletionRecords(path.get("body").pop(), records);
  } else if (path.isFunction()) {
    return _getCompletionRecords(path.get("body"));
  } else if (path.isTryStatement()) {
    records = addCompletionRecords(path.get("block"), records);
    records = addCompletionRecords(path.get("handler"), records);
  } else if (path.isCatchClause()) {
    records = addCompletionRecords(path.get("body"), records);
  } else if (path.isSwitchStatement()) {
    records = completionRecordForSwitch(path.get("cases"), records);
  } else {
    records.push({ type: NORMAL_COMPLETION, path: path });
  }

  return records;
}

export function getCompletionRecords(this: NodePath): NodePath[] {
  const records = _getCompletionRecords(this);
  const paths = [];
  for (const record of records) {
    if (record.type === NORMAL_COMPLETION) {
      paths.push(record.path);
    }
  }
  return paths;
}

export function getSibling(this: NodePath, key: string | number): NodePath {
  return NodePath.get({
    parentPath: this.parentPath,
    parent: this.parent,
    container: this.container,
    listKey: this.listKey,
    key: key,
  }).setContext(this.context);
}

export function getPrevSibling(this: NodePath): NodePath {
  // @ts-expect-error todo(flow->ts) this.key could be a string
  return this.getSibling(this.key - 1);
}

export function getNextSibling(this: NodePath): NodePath {
  // @ts-expect-error todo(flow->ts) this.key could be a string
  return this.getSibling(this.key + 1);
}

export function getAllNextSiblings(this: NodePath): NodePath[] {
  // @ts-expect-error todo(flow->ts) this.key could be a string
  let _key: number = this.key;
  let sibling = this.getSibling(++_key);
  const siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(++_key);
  }
  return siblings;
}

export function getAllPrevSiblings(this: NodePath): NodePath[] {
  // @ts-expect-error todo(flow->ts) this.key could be a string
  let _key: number = this.key;
  let sibling = this.getSibling(--_key);
  const siblings = [];
  while (sibling.node) {
    siblings.push(sibling);
    sibling = this.getSibling(--_key);
  }
  return siblings;
}

function get<T extends t.Node, K extends keyof T>(
  this: NodePath<T>,
  key: K,
  context?: boolean | TraversalContext,
): T[K] extends Array<t.Node | null | undefined>
  ? Array<NodePath<T[K][number]>>
  : T[K] extends t.Node | null | undefined
  ? NodePath<T[K]>
  : never;

function get<T extends t.Node>(
  this: NodePath<T>,
  key: string,
  context?: true | TraversalContext,
): NodePath | NodePath[];

function get<T extends t.Node>(
  this: NodePath<T>,
  key: string,
  context: true | TraversalContext = true,
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

export { get };

export function _getKey<T extends t.Node>(
  this: NodePath<T>,
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
  this: NodePath,
  parts: string[],
  context?: TraversalContext,
): NodePath | NodePath[] {
  let path: NodePath | NodePath[] = this;
  for (const part of parts) {
    if (part === ".") {
      // @ts-expect-error todo(flow-ts): Can path be an array here?
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

function getBindingIdentifiers(
  duplicates: true,
): Record<string, t.Identifier[]>;
function getBindingIdentifiers(
  duplicates?: false,
): Record<string, t.Identifier>;
function getBindingIdentifiers(
  duplicates: boolean,
): Record<string, t.Identifier[] | t.Identifier>;

function getBindingIdentifiers(
  duplicates?: boolean,
): Record<string, t.Identifier[] | t.Identifier> {
  return t.getBindingIdentifiers(this.node, duplicates);
}

export { getBindingIdentifiers };

function getOuterBindingIdentifiers(
  duplicates: true,
): Record<string, t.Identifier[]>;
function getOuterBindingIdentifiers(
  duplicates?: false,
): Record<string, t.Identifier>;
function getOuterBindingIdentifiers(
  duplicates: boolean,
): Record<string, t.Identifier[] | t.Identifier>;

function getOuterBindingIdentifiers(
  duplicates?: boolean,
): Record<string, t.Identifier[] | t.Identifier> {
  return t.getOuterBindingIdentifiers(this.node, duplicates);
}

export { getOuterBindingIdentifiers };

// original source - https://github.com/babel/babel/blob/main/packages/babel-types/src/retrievers/getBindingIdentifiers.js
// path.getBindingIdentifiers returns nodes where the following re-implementation
// returns paths
export function getBindingIdentifierPaths(
  this: NodePath,
  duplicates: boolean = false,
  outerOnly: boolean = false,
): {
  [x: string]: NodePath;
} {
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
  this: NodePath,
  duplicates?: boolean,
): {
  [x: string]: NodePath;
} {
  return this.getBindingIdentifierPaths(duplicates, true);
}
