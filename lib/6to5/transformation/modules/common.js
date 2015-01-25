"use strict";

module.exports = CommonJSFormatter;

var DefaultFormatter = require("./_default");
var traverse         = require("../../traverse");
var util             = require("../../util");
var t                = require("../../types");
var _                = require("lodash");

var visitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isExportDeclaration(node) && !node.default) state.hasNonDefaultExports = true;
  }
};

function CommonJSFormatter(file) {
  DefaultFormatter.apply(this, arguments);

  var state = { hasNonDefaultExports: false };
  traverse(file.ast, visitor, file.scope, state);

  this.insertedModuleDeclaration = false;
  this.hasNonDefaultExports = state.hasNonDefaultExports;
}

util.inherits(CommonJSFormatter, DefaultFormatter);

CommonJSFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (t.isSpecifierDefault(specifier)) {
    var ref = util.template("require", {
      MODULE_NAME: node.source
    });
    if (!_.contains(this.file.dynamicImported, node)) {
      ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
    }
    nodes.push(t.variableDeclaration("var", [t.variableDeclarator(variableName, ref)]));
  } else {
    if (specifier.type === "ImportBatchSpecifier") {
      // import * as bar from "foo";
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(
          variableName,
          t.callExpression(this.file.addHelper("interop-require-wildcard"), [
            t.callExpression(t.identifier("require"), [node.source])
          ])
        )
      ]));
    } else {
      // import foo from "foo";
      nodes.push(util.template("require-assign-key", {
        VARIABLE_NAME: variableName,
        MODULE_NAME:   node.source,
        KEY:           t.getSpecifierId(specifier)
      }));
    }
  }
};

CommonJSFormatter.prototype.importDeclaration = function (node, nodes) {
  // import "foo";
  nodes.push(util.template("require", {
    MODULE_NAME: node.source
  }, true));
};

CommonJSFormatter.prototype.exportDeclaration = function (node, nodes) {
  if (node.default && !this.noInteropRequire) {
    var declar = node.declaration;
    var assign;

    if (this.hasNonDefaultExports) {
      if (!this.insertedModuleDeclaration) {
        nodes.push(util.template("exports-module-declaration", true));
        this.insertedModuleDeclaration = true;
      }
    } else {
      var assign = util.template("exports-default-assign", {
        VALUE: this._pushStatement(declar, nodes)
      }, true);

      if (t.isFunctionDeclaration(declar)) {
        // we can hoist this assignment to the top of the file
        assign._blockHoist = 3;
      }

      nodes.push(assign);
      return;
    }
  }

  DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
};

CommonJSFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  this._exportSpecifier(function () {
    return t.callExpression(t.identifier("require"), [node.source]);
  }, specifier, node, nodes);
};
