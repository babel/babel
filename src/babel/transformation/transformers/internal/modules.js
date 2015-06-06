// in this transformer we have to split up classes and function declarations
// from their exports. why? because sometimes we need to replace classes with
// nodes that aren't allowed in the same contexts. also, if you're exporting
// a generator function as a default then regenerator will destroy the export
// declaration and leave a variable declaration in it's place... yeah, handy.

import clone from "lodash/lang/clone";
import * as t from "../../../types";

function getDeclar(node) {
  var declar = node.declaration;
  t.inheritsComments(declar, node);
  t.removeComments(node);
  declar._ignoreUserWhitespace = true;
  return declar;
}

export var metadata = {
  group: "builtin-pre"
};

export function ExportDefaultDeclaration(node, parent, scope) {
  var declar = node.declaration;

  if (t.isClassDeclaration(declar)) {
    // export default class Foo {};
    let nodes = [getDeclar(node), node];
    node.declaration = declar.id;
    return nodes;
  } else if (t.isClassExpression(declar)) {
    // export default class {};
    var temp = scope.generateUidIdentifier("default");
    node.declaration = t.variableDeclaration("var", [
      t.variableDeclarator(temp, declar)
    ]);

    let nodes = [getDeclar(node), node];
    node.declaration = temp;
    return nodes;
  } else if (t.isFunctionDeclaration(declar)) {
    // export default function Foo() {}
    node._blockHoist = 2;

    let nodes = [getDeclar(node), node];
    node.declaration = declar.id;
    return nodes;
  }
}

function buildExportSpecifier(id) {
  return t.exportSpecifier(clone(id), clone(id));
}

export function ExportNamedDeclaration(node, parent, scope) {
  var declar = node.declaration;

  if (t.isClassDeclaration(declar)) {
    // export class Foo {}
    node.specifiers  = [buildExportSpecifier(declar.id)];

    let nodes = [getDeclar(node), node];
    node.declaration = null;
    return nodes;
  } else if (t.isFunctionDeclaration(declar)) {
    // export function Foo() {}
    node.specifiers  = [buildExportSpecifier(declar.id)];
    node._blockHoist = 2;

    let nodes = [getDeclar(node), node];
    node.declaration = null;
    return nodes;
  } else if (t.isVariableDeclaration(declar)) {
    // export var foo = "bar";
    var specifiers = [];
    var bindings = this.get("declaration").getBindingIdentifiers();
    for (var key in bindings) {
      specifiers.push(buildExportSpecifier(bindings[key]));
    }
    return [declar, t.exportNamedDeclaration(null, specifiers)];
  }
}

export var Program = {
  enter(node) {
    var imports = [];
    var rest    = [];

    for (var i = 0; i < node.body.length; i++) {
      var bodyNode = node.body[i];
      if (t.isImportDeclaration(bodyNode)) {
        imports.push(bodyNode);
      } else {
        rest.push(bodyNode);
      }
    }

    node.body = imports.concat(rest);
  },

  exit(node, parent, scope, file) {
    if (!file.transformers["es6.modules"].canTransform()) return;

    if (file.moduleFormatter.setup) {
      file.moduleFormatter.setup();
    }
  }
};
