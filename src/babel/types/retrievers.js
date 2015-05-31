import object from "../helpers/object";
import * as t from "./index";

/**
 * Return a list of binding identifiers associated with the input `node`.
 */

export function getBindingIdentifiers(node: Object): Object {
  var search = [].concat(node);
  var ids    = object();

  while (search.length) {
    var id = search.shift();
    if (!id) continue;

    var keys = t.getBindingIdentifiers.keys[id.type];

    if (t.isIdentifier(id)) {
      ids[id.name] = id;
    } else if (t.isExportDeclaration(id)) {
      if (t.isDeclaration(node.declaration)) {
        search.push(node.declaration);
      }
    } else if (keys) {
      for (var key of (keys: Array)) {
        search = search.concat(id[key] || []);
      }
    }
  }

  return ids;
}

getBindingIdentifiers.keys = {
  CatchClause: ["param"],
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],
  ImportSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportDefaultSpecifier: ["local"],
  VariableDeclarator: ["id"],
  FunctionDeclaration: ["id"],
  FunctionExpression: ["id"],
  ClassDeclaration: ["id"],
  ClassExpression: ["id"],
  SpreadElement: ["argument"],
  RestElement: ["argument"],
  UpdateExpression: ["argument"],
  SpreadProperty: ["argument"],
  Property: ["value"],
  ComprehensionBlock: ["left"],
  AssignmentPattern: ["left"],
  ComprehensionExpression: ["blocks"],
  ImportDeclaration: ["specifiers"],
  VariableDeclaration: ["declarations"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"]
};
