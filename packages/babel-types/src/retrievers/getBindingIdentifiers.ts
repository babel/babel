import {
  isExportDeclaration,
  isIdentifier,
  isDeclaration,
  isFunctionDeclaration,
  isFunctionExpression,
  isExportAllDeclaration,
} from "../validators/generated";
import type * as t from "..";

export { getBindingIdentifiers as default };

function getBindingIdentifiers(
  node: t.Node,
  duplicates: true,
  outerOnly?: boolean,
): Record<string, Array<t.Identifier>>;

function getBindingIdentifiers(
  node: t.Node,
  duplicates?: false,
  outerOnly?: boolean,
): Record<string, t.Identifier>;

function getBindingIdentifiers(
  node: t.Node,
  duplicates?: boolean,
  outerOnly?: boolean,
): Record<string, t.Identifier> | Record<string, Array<t.Identifier>>;

/**
 * Return a list of binding identifiers associated with the input `node`.
 */
function getBindingIdentifiers(
  node: t.Node,
  duplicates?: boolean,
  outerOnly?: boolean,
): Record<string, t.Identifier> | Record<string, Array<t.Identifier>> {
  const search: t.Node[] = [].concat(node);
  const ids = Object.create(null);

  while (search.length) {
    const id = search.shift();
    if (!id) continue;

    const keys =
      // @ts-expect-error getBindingIdentifiers.keys do not cover all AST types
      getBindingIdentifiers.keys[id.type];

    if (isIdentifier(id)) {
      if (duplicates) {
        const _ids = (ids[id.name] = ids[id.name] || []);
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
      continue;
    }

    if (isExportDeclaration(id) && !isExportAllDeclaration(id)) {
      if (isDeclaration(id.declaration)) {
        search.push(id.declaration);
      }
      continue;
    }

    if (outerOnly) {
      if (isFunctionDeclaration(id)) {
        search.push(id.id);
        continue;
      }

      if (isFunctionExpression(id)) {
        continue;
      }
    }

    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const nodes =
          // @ts-expect-error key must present in id
          id[key] as t.Node[] | t.Node | undefined | null;
        if (nodes) {
          Array.isArray(nodes) ? search.push(...nodes) : search.push(nodes);
        }
      }
    }
  }

  // $FlowIssue Object.create() seems broken
  return ids;
}

/**
 * Mapping of types to their identifier keys.
 */
getBindingIdentifiers.keys = {
  DeclareClass: ["id"],
  DeclareFunction: ["id"],
  DeclareModule: ["id"],
  DeclareVariable: ["id"],
  DeclareInterface: ["id"],
  DeclareTypeAlias: ["id"],
  DeclareOpaqueType: ["id"],
  InterfaceDeclaration: ["id"],
  TypeAlias: ["id"],
  OpaqueType: ["id"],

  CatchClause: ["param"],
  LabeledStatement: ["label"],
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],

  ImportSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportDefaultSpecifier: ["local"],
  ImportDeclaration: ["specifiers"],

  ExportSpecifier: ["exported"],
  ExportNamespaceSpecifier: ["exported"],
  ExportDefaultSpecifier: ["exported"],

  FunctionDeclaration: ["id", "params"],
  FunctionExpression: ["id", "params"],
  ArrowFunctionExpression: ["params"],
  ObjectMethod: ["params"],
  ClassMethod: ["params"],
  ClassPrivateMethod: ["params"],

  ForInStatement: ["left"],
  ForOfStatement: ["left"],

  ClassDeclaration: ["id"],
  ClassExpression: ["id"],

  RestElement: ["argument"],
  UpdateExpression: ["argument"],

  ObjectProperty: ["value"],

  AssignmentPattern: ["left"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"],

  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id"],
};
