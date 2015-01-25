"use strict";

module.exports = CommonJSFormatter;

var DefaultFormatter = require("./_default");
var traverse         = require("../../traverse");
var util             = require("../../util");
var t                = require("../../types");
var _                = require("lodash");

var visitor = {
  enter: function (node, parent, scope, context, state) {
    if (t.isExportDeclaration(node) && !node.default) {
      state.hasNonDefaultExports = true;
      context.stop();
    }
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

  var ref = this.push(node, nodes);

  // import foo from "foo";
  if (t.isSpecifierDefault(specifier)) {
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
            ref
          ])
        )
      ]));
    } else {
      // import { foo } from "foo";
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(
          variableName,
          t.memberExpression(ref, t.getSpecifierId(specifier))
        )
      ]));
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

CommonJSFormatter.prototype._push = function (node, nodes) {
  var source = node.source.value;
  var call = t.callExpression(t.identifier("require"), [node.source]);

  if (this.localImportOccurences[source] > 1) {
    var uid = this.file.generateUidIdentifier(source);
    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(uid, call)
    ]));
    return uid;
  } else {
    return call;
  }
};
