import traverse from "../traversal";
import { tokTypes } from "acorn-babel";
import t from "../types";

export function toEsprimaToken(token) {
  var type = token.type;

  if (type === tokTypes.name) {
    token.type = "Identifier";
  } else if (type === tokTypes.semi || type === tokTypes.comma || type === tokTypes.parenL || type === tokTypes.parenR || type === tokTypes.braceL || type === tokTypes.braceR) {
    token.type = "Punctuator";
    token.value = type.type;
  }

  return token;
}

export function toEsprimaAST(ast) {
  traverse(ast, astTransformVisitor);
}

var astTransformVisitor = {
  noScope: true,
  enter(node) {
    if (t.isImportBatchSpecifier(node)) {
      node.type = "ImportNamespaceSpecifier";
      node.id = node.name;
      delete node.name;
    } else if (t.isFunction(node)) {
      node.defaults = [];

      node.params = node.params.map(function (param) {
        if (t.isAssignmentPattern(param)) {
          node.defaults.push(param.right);
          return param.left;
        } else {
          node.defaults.push(null);
          return param;
        }
      });

      if (t.isRestElement(node.params[node.params.length - 1])) {
        node.rest = node.params.pop();
      }
    } else if (t.isClassProperty(node)) {
      this.remove();
    }
  }
};
