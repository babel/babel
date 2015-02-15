"use strict";

module.exports = AMDFormatter;

var DefaultFormatter = require("./_default");
var CommonFormatter  = require("./common");
var includes         = require("lodash/collection/includes");
var values           = require("lodash/object/values");
var util             = require("../../util");
var t                = require("../../types");

function AMDFormatter() {
  CommonFormatter.apply(this, arguments);
}

util.inherits(AMDFormatter, DefaultFormatter);

AMDFormatter.prototype.init = CommonFormatter.prototype.init;

AMDFormatter.prototype.buildDependencyLiterals = function () {
  var names = [];
  for (var name in this.ids) {
    names.push(t.literal(name));
  }
  return names;
};

/**
 * Wrap the entire body in a `define` wrapper.
 */

AMDFormatter.prototype.transform = function (program) {
  var body = program.body;

  // build an array of module names

  var names = [t.literal("exports")];
  if (this.passModuleArg) names.push(t.literal("module"));
  names = names.concat(this.buildDependencyLiterals());
  names = t.arrayExpression(names);

  // build up define container

  var params = values(this.ids);
  if (this.passModuleArg) params.unshift(t.identifier("module"));
  params.unshift(t.identifier("exports"));

  var container = t.functionExpression(null, params, t.blockStatement(body));

  var defineArgs = [names, container];
  var moduleName = this.getModuleName();
  if (moduleName) defineArgs.unshift(t.literal(moduleName));

  var call = t.callExpression(t.identifier("define"), defineArgs);

  program.body = [t.expressionStatement(call)];
};

/**
 * Get the AMD module name that we'll prepend to the wrapper
 * to define this module
 */

AMDFormatter.prototype.getModuleName = function () {
  if (this.file.opts.moduleIds) {
    return DefaultFormatter.prototype.getModuleName.apply(this, arguments);
  } else {
    return null;
  }
};

AMDFormatter.prototype._getExternalReference = function (node) {
  return this.scope.generateUidIdentifier(node.source.value);
};

AMDFormatter.prototype.importDeclaration = function (node) {
  this.getExternalReference(node);
};

AMDFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var key = t.getSpecifierName(specifier);
  var ref = this.getExternalReference(node);

  if (includes(this.file.dynamicImportedNoDefault, node)) {
    // Prevent unnecessary renaming of dynamic imports.
    this.ids[node.source.value] = ref;
  } else if (t.isImportBatchSpecifier(specifier)) {
    // import * as bar from "foo";
  } else if (!includes(this.file.dynamicImported, node) && t.isSpecifierDefault(specifier) && !this.noInteropRequireImport) {
    // import foo from "foo";
    ref = t.callExpression(this.file.addHelper("interop-require"), [ref]);
  } else {
    // import {foo} from "foo";
    ref = t.memberExpression(ref, t.getSpecifierId(specifier), false);
  }

  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(key, ref)
  ]));
};

AMDFormatter.prototype.exportDeclaration = function (node) {
  if (this.doDefaultExportInterop(node)) {
    this.passModuleArg = true;
  }

  CommonFormatter.prototype.exportDeclaration.apply(this, arguments);
};
