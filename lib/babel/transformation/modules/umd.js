"use strict";

module.exports = UMDFormatter;

var AMDFormatter = require("./amd");
var util         = require("../../util");
var t            = require("../../types");
var values       = require("lodash/object/values");

function UMDFormatter() {
  AMDFormatter.apply(this, arguments);
}

util.inherits(UMDFormatter, AMDFormatter);

UMDFormatter.prototype.transform = function (program) {
  var body = program.body;

  // build an array of module names

  var names = [];
  for (var name in this.ids) {
    names.push(t.literal(name));
  }

  // factory

  var ids  = values(this.ids);
  var args = [t.identifier("exports")];
  if (this.passModuleArg) args.push(t.identifier("module"));
  args = args.concat(ids);

  var factory = t.functionExpression(null, args, t.blockStatement(body));

  // amd

  var defineArgs = [t.literal("exports")];
  if (this.passModuleArg) defineArgs.push(t.literal("module"));
  defineArgs = defineArgs.concat(names);
  defineArgs = [t.arrayExpression(defineArgs)];

  // common

  var testExports = util.template("test-exports");
  var testModule  = util.template("test-module");
  var commonTests = this.passModuleArg ? t.logicalExpression("&&", testExports, testModule) : testExports;

  var commonArgs = [t.identifier("exports")];
  if (this.passModuleArg) commonArgs.push(t.identifier("module"));
  commonArgs = commonArgs.concat(names.map(function (name) {
    return t.callExpression(t.identifier("require"), [name]);
  }));

  // globals

  //var umdArgs = [];

  //

  var moduleName = this.getModuleName();
  if (moduleName) defineArgs.unshift(t.literal(moduleName));

  var runner = util.template("umd-runner-body", {
    AMD_ARGUMENTS: defineArgs,
    COMMON_TEST: commonTests,
    COMMON_ARGUMENTS: commonArgs
  });

  //

  var call = t.callExpression(runner, [factory]);
  program.body = [t.expressionStatement(call)];
};
