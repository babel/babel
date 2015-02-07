"use strict";

module.exports = CommonJSFormatter;

var DefaultFormatter = require("./_default");
var contains         = require("lodash/collection/contains");
var util             = require("../../util");
var t                = require("../../types");

function CommonJSFormatter() {
  DefaultFormatter.apply(this, arguments);
}

util.inherits(CommonJSFormatter, DefaultFormatter);

CommonJSFormatter.prototype.init = function () {
  if (!this.noInteropRequireImport && this.hasNonDefaultExports) {
    this.file.ast.program.body.push(util.template("exports-module-declaration", true));
  }
};

CommonJSFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  var ref = this.getExternalReference(node, nodes);

  // import foo from "foo";
  if (t.isSpecifierDefault(specifier)) {
    if (!contains(this.file.dynamicImported, node)) {
      if (this.noInteropRequireImport) {
        ref = t.memberExpression(ref, t.identifier("default"));
      } else {
        ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
      }
    }
    nodes.push(t.variableDeclaration("var", [t.variableDeclarator(variableName, ref)]));
  } else {
    if (specifier.type === "ImportBatchSpecifier") {

      if (!this.noInteropRequireImport) {
        ref = t.callExpression(this.file.addHelper("interop-require-wildcard"), [ref]);
      }

      // import * as bar from "foo";
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(variableName, ref)
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
  if (this.doDefaultExportInterop(node)) {
    var declar = node.declaration;
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

  DefaultFormatter.prototype.exportDeclaration.apply(this, arguments);
};

CommonJSFormatter.prototype._getExternalReference = function (node, nodes) {
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
