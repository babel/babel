import object from "../helpers/object";
import * as t from "./index";

/**
 * Return a list of binding identifiers associated with the input `node`.
 */

export function getBindingIdentifiers(node: Object, duplicates?): Object {
  var search = [].concat(node);
  var ids    = object();

  while (search.length) {
    var id = search.shift();
    if (!id) continue;

    var key = t.getBindingIdentifiers.keys[id.type];

    if (t.isIdentifier(id)) {
      if (duplicates) {
        var _ids = ids[id.name] = ids[id.name] || [];
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
    } else if (t.isExportDeclaration(id)) {
      if (t.isDeclaration(node.declaration)) {
        search.push(node.declaration);
      }
    } else if (key && id[key]) {
      search = search.concat(id[key]);
    }
  }

  return ids;
}

/**
 * Mapping of types to their identifier keys.
 */

getBindingIdentifiers.keys = {
  DeclareClass: "id",
  DeclareFunction: "id",
  DeclareModule: "id",
  DeclareVariable: "id",
  InterfaceDeclaration: "id",
  TypeAlias: "id",

  ComprehensionExpression: "blocks",
  ComprehensionBlock: "left",

  CatchClause: "param",
  LabeledStatement: "label",
  UnaryExpression: "argument",
  AssignmentExpression: "left",

  ImportSpecifier: "local",
  ImportNamespaceSpecifier: "local",
  ImportDefaultSpecifier: "local",
  ImportDeclaration: "specifiers",

  FunctionDeclaration: "id",
  FunctionExpression: "id",

  ClassDeclaration: "id",
  ClassExpression: "id",

  SpreadElement: "argument",
  RestElement: "argument",
  UpdateExpression: "argument",

  SpreadProperty: "argument",
  Property: "value",

  AssignmentPattern: "left",
  ArrayPattern: "elements",
  ObjectPattern: "properties",

  VariableDeclaration: "declarations",
  VariableDeclarator: "id"
};
