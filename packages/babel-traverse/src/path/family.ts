// This file contains methods responsible for dealing with/retrieving children or siblings.

import type TraversalContext from "../context.ts";
import NodePath from "./index.ts";
import {
  getAssignmentIdentifiers as _getAssignmentIdentifiers,
  getBindingIdentifiers as _getBindingIdentifiers,
  getOuterBindingIdentifiers as _getOuterBindingIdentifiers,
  numericLiteral,
  unaryExpression,
} from "@babel/types";
import type * as t from "@babel/types";

const NORMAL_COMPLETION = 0;
const BREAK_COMPLETION = 1;

type Completion = {
  path: NodePath;
  type: 0 | 1;
};

type CompletionContext = {
  // whether the current context allows `break` statement. When it allows, we have
  // to search all the statements for potential `break`
  canHaveBreak: boolean;
  // whether the statement is an immediate descendant of a switch case clause
  inCaseClause: boolean;
  // whether the `break` statement record should be populated to upper level
  // when a `break` statement is an immediate descendant of a block statement, e.g.
  // `{ break }`, it can influence the control flow in the upper levels.
  shouldPopulateBreak: boolean;
  // Whether the `break` statement should be preserved.
  shouldPreserveBreak: boolean;
};

function NormalCompletion(path: NodePath): Completion {
  return { type: NORMAL_COMPLETION, path };
}

function BreakCompletion(path: NodePath): Completion {
  return { type: BREAK_COMPLETION, path };
}

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
  context: CompletionContext,
): Completion[] {
  if (path) {
    records.push(..._getCompletionRecords(path, context));
  }
  return records;
}

function completionRecordForSwitch(
  cases: NodePath<t.SwitchCase>[],
  records: Completion[],
  context: CompletionContext,
): Completion[] {
  // https://tc39.es/ecma262/#sec-runtime-semantics-caseblockevaluation
  let lastNormalCompletions: Completion[] = [];
  for (let i = 0; i < cases.length; i++) {
    const casePath = cases[i];
    const caseCompletions = _getCompletionRecords(casePath, context);
    const normalCompletions = [];
    const breakCompletions = [];
    for (const c of caseCompletions) {
      if (c.type === NORMAL_COMPLETION) {
        normalCompletions.push(c);
      }
      if (c.type === BREAK_COMPLETION) {
        breakCompletions.push(c);
      }
    }
    if (normalCompletions.length) {
      lastNormalCompletions = normalCompletions;
    }
    records.push(...breakCompletions);
  }
  records.push(...lastNormalCompletions);
  return records;
}

function normalCompletionToBreak(completions: Completion[]) {
  completions.forEach(c => {
    c.type = BREAK_COMPLETION;
  });
}

/**
 * Determine how we should handle the break statement for break completions
 *
 * @param {Completion[]} completions
 * @param {boolean} reachable Whether the break statement is reachable after
   we mark the normal completions _before_ the given break completions as the final
   completions. For example,
   `{ 0 }; break;` is transformed to `{ return 0 }; break;`, the `break` here is unreachable
   and thus can be removed without consequences. We may in the future reserve them instead since
   we do not consistently remove unreachable statements _after_ break
   `{ var x = 0 }; break;` is transformed to `{ var x = 0 }; return void 0;`, the `break` is reachable
   because we can not wrap variable declaration under a return statement
 */
function replaceBreakStatementInBreakCompletion(
  completions: Completion[],
  reachable: boolean,
) {
  completions.forEach(c => {
    if (c.path.isBreakStatement({ label: null })) {
      if (reachable) {
        c.path.replaceWith(unaryExpression("void", numericLiteral(0)));
      } else {
        c.path.remove();
      }
    }
  });
}

function getStatementListCompletion(
  paths: NodePath[],
  context: CompletionContext,
): Completion[] {
  const completions = [];
  if (context.canHaveBreak) {
    let lastNormalCompletions = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const newContext = { ...context, inCaseClause: false };
      if (
        path.isBlockStatement() &&
        (context.inCaseClause || // case test: { break }
          context.shouldPopulateBreak) // case test: { { break } }
      ) {
        newContext.shouldPopulateBreak = true;
      } else {
        newContext.shouldPopulateBreak = false;
      }
      const statementCompletions = _getCompletionRecords(path, newContext);
      if (
        statementCompletions.length > 0 &&
        // we can stop search `paths` when we have seen a `path` that is
        // effectively a `break` statement. Examples are
        // - `break`
        // - `if (true) { 1; break } else { 2; break }`
        // - `{ break }```
        // In other words, the paths after this `path` are unreachable
        statementCompletions.every(c => c.type === BREAK_COMPLETION)
      ) {
        if (
          lastNormalCompletions.length > 0 &&
          statementCompletions.every(c =>
            c.path.isBreakStatement({ label: null }),
          )
        ) {
          // when a break completion has a path as BreakStatement, it must be `{ break }`
          // whose completion value we can not determine, otherwise it would have been
          // replaced by `replaceBreakStatementInBreakCompletion`
          // When we have seen normal completions from the last statement
          // it is safe to stop populating break and mark normal completions as break
          normalCompletionToBreak(lastNormalCompletions);
          completions.push(...lastNormalCompletions);
          // Declarations have empty completion record, however they can not be nested
          // directly in return statement, i.e. `return (var a = 1)` is invalid.
          if (lastNormalCompletions.some(c => c.path.isDeclaration())) {
            completions.push(...statementCompletions);
            if (!context.shouldPreserveBreak) {
              replaceBreakStatementInBreakCompletion(
                statementCompletions,
                /* reachable */ true,
              );
            }
          }
          if (!context.shouldPreserveBreak) {
            replaceBreakStatementInBreakCompletion(
              statementCompletions,
              /* reachable */ false,
            );
          }
        } else {
          completions.push(...statementCompletions);
          if (!context.shouldPopulateBreak && !context.shouldPreserveBreak) {
            replaceBreakStatementInBreakCompletion(
              statementCompletions,
              /* reachable */ true,
            );
          }
        }
        break;
      }
      if (i === paths.length - 1) {
        completions.push(...statementCompletions);
      } else {
        lastNormalCompletions = [];
        for (let i = 0; i < statementCompletions.length; i++) {
          const c = statementCompletions[i];
          if (c.type === BREAK_COMPLETION) {
            completions.push(c);
          }
          if (c.type === NORMAL_COMPLETION) {
            lastNormalCompletions.push(c);
          }
        }
      }
    }
  } else if (paths.length) {
    // When we are in a context where `break` must not exist, we can skip linear
    // search on statement lists and assume that the last
    // non-variable-declaration statement determines the completion.
    for (let i = paths.length - 1; i >= 0; i--) {
      const pathCompletions = _getCompletionRecords(paths[i], context);
      if (
        pathCompletions.length > 1 ||
        (pathCompletions.length === 1 &&
          !pathCompletions[0].path.isVariableDeclaration() &&
          !pathCompletions[0].path.isEmptyStatement())
      ) {
        completions.push(...pathCompletions);
        break;
      }
    }
  }
  return completions;
}

function _getCompletionRecords(
  path: NodePath,
  context: CompletionContext,
): Completion[] {
  let records: Completion[] = [];
  if (path.isIfStatement()) {
    records = addCompletionRecords(path.get("consequent"), records, context);
    records = addCompletionRecords(path.get("alternate"), records, context);
  } else if (
    path.isDoExpression() ||
    path.isFor() ||
    path.isWhile() ||
    path.isLabeledStatement()
  ) {
    return addCompletionRecords(path.get("body"), records, context);
  } else if (path.isProgram() || path.isBlockStatement()) {
    return getStatementListCompletion(path.get("body"), context);
  } else if (path.isFunction()) {
    return _getCompletionRecords(path.get("body"), context);
  } else if (path.isTryStatement()) {
    records = addCompletionRecords(path.get("block"), records, context);
    records = addCompletionRecords(path.get("handler"), records, context);
  } else if (path.isCatchClause()) {
    return addCompletionRecords(path.get("body"), records, context);
  } else if (path.isSwitchStatement()) {
    return completionRecordForSwitch(path.get("cases"), records, context);
  } else if (path.isSwitchCase()) {
    return getStatementListCompletion(path.get("consequent"), {
      canHaveBreak: true,
      shouldPopulateBreak: false,
      inCaseClause: true,
      shouldPreserveBreak: context.shouldPreserveBreak,
    });
  } else if (path.isBreakStatement()) {
    records.push(BreakCompletion(path));
  } else {
    records.push(NormalCompletion(path));
  }

  return records;
}

/**
 * Retrieve the completion records of a given path.
 * Note: to ensure proper support on `break` statement, this method
 * will manipulate the AST around the break statement. Do not call the method
 * twice for the same path.
 *
 * @export
 * @param {NodePath} this
 * @param {boolean} [shouldPreserveBreak=false] Whether the `break` statement should be preserved.
 * @returns {NodePath[]} Completion records
 */
export function getCompletionRecords(
  this: NodePath,
  shouldPreserveBreak = false,
): NodePath[] {
  const records = _getCompletionRecords(this, {
    canHaveBreak: false,
    shouldPopulateBreak: false,
    inCaseClause: false,
    shouldPreserveBreak,
  });
  return records.map(r => r.path);
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

// convert "1" to 1 (string index to number index)
type MaybeToIndex<T extends string> = T extends `${bigint}` ? number : T;

type Pattern<Obj extends string, Prop extends string> = `${Obj}.${Prop}`;

// split "body.body.1" to ["body", "body", 1]
type Split<P extends string> =
  P extends Pattern<infer O, infer U>
    ? [MaybeToIndex<O>, ...Split<U>]
    : [MaybeToIndex<P>];

// traverse the Node with tuple path ["body", "body", 1]
// Path should be created with Split
type Trav<
  Node extends t.Node | t.Node[],
  Path extends unknown[],
> = Path extends [infer K, ...infer R]
  ? K extends keyof Node
    ? Node[K] extends t.Node | t.Node[]
      ? R extends []
        ? Node[K]
        : Trav<Node[K], R>
      : never
    : never
  : never;

type ToNodePath<T> =
  T extends Array<t.Node | null | undefined>
    ? Array<NodePath<T[number]>>
    : T extends t.Node | null | undefined
      ? NodePath<T>
      : never;

function get<T extends NodePath, K extends keyof T["node"]>(
  this: T,
  key: K,
  context?: boolean | TraversalContext,
): T extends any
  ? T["node"][K] extends Array<t.Node | null | undefined>
    ? Array<NodePath<T["node"][K][number]>>
    : T["node"][K] extends t.Node | null | undefined
      ? NodePath<T["node"][K]>
      : never
  : never;

function get<T extends NodePath, K extends string>(
  this: T,
  key: K,
  context?: boolean | TraversalContext,
): T extends any ? ToNodePath<Trav<T["node"], Split<K>>> : never;

function get(
  this: NodePath,
  key: string,
  context?: true | TraversalContext,
): NodePath | NodePath[];

function get(
  this: NodePath,
  key: string,
  context: true | TraversalContext = true,
): NodePath | NodePath[] {
  if (context === true) context = this.context;
  const parts = key.split(".");
  if (parts.length === 1) {
    // "foo"
    // @ts-expect-error key may not index T
    return _getKey.call(this, key, context);
  } else {
    // "foo.bar"
    return _getPattern.call(this, parts, context);
  }
}

export { get };

export function _getKey<T extends t.Node>(
  this: NodePath<T>,
  key: keyof T & string,
  context?: TraversalContext,
): NodePath | NodePath[] {
  const node = this.node as T;
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
        // @ts-expect-error part may not index path
        path = path[part];
      } else {
        path = path.get(part, context);
      }
    }
  }
  return path;
}

export function getAssignmentIdentifiers(this: NodePath) {
  return _getAssignmentIdentifiers(this.node);
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
  this: NodePath,
  duplicates?: boolean,
): Record<string, t.Identifier[] | t.Identifier> {
  return _getBindingIdentifiers(this.node, duplicates);
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
  this: NodePath,
  duplicates?: boolean,
): Record<string, t.Identifier[] | t.Identifier> {
  return _getOuterBindingIdentifiers(this.node, duplicates);
}

export { getOuterBindingIdentifiers };

function getBindingIdentifierPaths(
  duplicates: true,
  outerOnly?: boolean,
): Record<string, NodePath<t.Identifier>[]>;
function getBindingIdentifierPaths(
  duplicates: false,
  outerOnly?: boolean,
): Record<string, NodePath<t.Identifier>>;
function getBindingIdentifierPaths(
  duplicates?: boolean,
  outerOnly?: boolean,
): Record<string, NodePath<t.Identifier> | NodePath<t.Identifier>[]>;

// original source - https://github.com/babel/babel/blob/main/packages/babel-types/src/retrievers/getBindingIdentifiers.js
// path.getBindingIdentifiers returns nodes where the following re-implementation returns paths
function getBindingIdentifierPaths(
  this: NodePath,
  duplicates: boolean = false,
  outerOnly: boolean = false,
): Record<string, NodePath<t.Identifier> | NodePath<t.Identifier>[]> {
  const path = this;
  const search = [path];
  const ids = Object.create(null);

  while (search.length) {
    const id = search.shift();
    if (!id) continue;
    if (!id.node) continue;

    const keys = _getBindingIdentifiers.keys[id.node.type];

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
        if (Array.isArray(child)) {
          search.push(...child);
        } else if (child.node) {
          search.push(child);
        }
      }
    }
  }

  return ids;
}

export { getBindingIdentifierPaths };

function getOuterBindingIdentifierPaths(
  duplicates: true,
): Record<string, NodePath<t.Identifier>[]>;
function getOuterBindingIdentifierPaths(
  duplicates?: false,
): Record<string, NodePath<t.Identifier>>;
function getOuterBindingIdentifierPaths(
  duplicates?: boolean,
): Record<string, NodePath<t.Identifier> | NodePath<t.Identifier>[]>;

function getOuterBindingIdentifierPaths(
  this: NodePath,
  duplicates: boolean = false,
) {
  return this.getBindingIdentifierPaths(duplicates, true);
}

export { getOuterBindingIdentifierPaths };
