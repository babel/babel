// @flow
import {
  isExportDeclaration,
  isIdentifier,
  isDeclaration,
  isFunctionDeclaration,
  isFunctionExpression,
} from "../validators/generated";

/**
 * Return a list of binding identifiers associated with the input `node`.
 */
export default function getBindingIdentifiers(
  node: Object,
  duplicates?: boolean,
  outerOnly?: boolean,
): { [string]: Object | Array<Object> } {
  let search = [].concat(node);
  const ids = Object.create(null);

  while (search.length) {
    const id = search.shift();
    if (!id) continue;

    const keys = getBindingIdentifiers.keys[id.type];

    if (isIdentifier(id)) {
      if (duplicates) {
        const _ids = (ids[id.name] = ids[id.name] || []);
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
      continue;
    }

    if (isExportDeclaration(id)) {
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
        if (id[key]) {
          search = search.concat(id[key]);
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

  ForInStatement: ["left"],
  ForOfStatement: ["left"],

  ClassDeclaration: ["id"],
  ClassExpression: ["id"],

  RestElement: ["argument"],
  UpdateExpression: ["argument"],

  ObjectProperty: ["value"],
  Property: ["value"],

  AssignmentPattern: ["left"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"],

  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id"],
};
