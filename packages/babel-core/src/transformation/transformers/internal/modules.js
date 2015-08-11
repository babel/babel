// in this transformer we have to split up classes and function declarations
// from their exports. why? because sometimes we need to replace classes with
// nodes that aren't allowed in the same contexts. also, if you're exporting
// a generator function as a default then regenerator will destroy the export
// declaration and leave a variable declaration in it's place... yeah, handy.

import * as t from "babel-types";

/**
 * [Please add a description.]
 */

function getDeclar(node) {
  var declar = node.declaration;
  t.inheritsComments(declar, node);
  t.removeComments(node);
  declar._ignoreUserWhitespace = true;
  return declar;
}

/**
 * [Please add a description.]
 */

function buildExportSpecifier(id) {
  return t.exportSpecifier(cloneIdentifier(id), cloneIdentifier(id));
}

function cloneIdentifier({ name, loc }) {
  var id = t.identifier(name);
  id._loc = loc;
  return id;
}

export var metadata = {
  group: "builtin-pre"
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  ExportDefaultDeclaration(node, parent, scope) {
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
  },

  /**
   * [Please add a description.]
   */

  ExportNamedDeclaration(node) {
    var declar = node.declaration;

    if (t.isClassDeclaration(declar)) {
      // export class Foo {}
      node.specifiers  = [buildExportSpecifier(declar.id)];

      let nodes = [getDeclar(node), node];
      node.declaration = null;
      return nodes;
    } else if (t.isFunctionDeclaration(declar)) {
      // export function Foo() {}
      var newExport = t.exportNamedDeclaration(null, [buildExportSpecifier(declar.id)]);
      newExport._blockHoist = 2;
      return [getDeclar(node), newExport];
    } else if (t.isVariableDeclaration(declar)) {
      // export var foo = "bar";
      var specifiers = [];
      var bindings = this.get("declaration").getBindingIdentifiers();
      for (var key in bindings) {
        specifiers.push(buildExportSpecifier(bindings[key]));
      }
      return [declar, t.exportNamedDeclaration(null, specifiers)];
    }
  },

  /**
   * [Please add a description.]
   */

  Program: {
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
  }
};
