import DefaultFormatter from "./_default";
import AMDFormatter from "./amd";
import values from "lodash/object/values";
import path from "path";
import * as util from  "../../util";
import * as t from "../../types";

/**
 * [Please add a description.]
 */

export default class UMDFormatter extends AMDFormatter {

  /**
   * [Please add a description.]
   */

  transform(program) {
    DefaultFormatter.prototype.transform.apply(this, arguments);

    var body = program.body;

    // build an array of module names

    var names = [];
    for (let name in this.ids) {
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

    var browserArgs = [];
    if (this.passModuleArg) browserArgs.push(t.identifier("mod"));

    for (let name in this.ids) {
      var id = this.defaultIds[name] || t.identifier(t.toIdentifier(path.basename(name, path.extname(name))));
      browserArgs.push(t.memberExpression(t.identifier("global"), id));
    }

    //

    var moduleName = this.getModuleName();
    if (moduleName) defineArgs.unshift(t.literal(moduleName));

    //
    var globalArg = this.file.opts.basename;
    if (moduleName) globalArg = moduleName;
    globalArg = t.identifier(t.toIdentifier(globalArg));

    var runner = util.template("umd-runner-body", {
      AMD_ARGUMENTS: defineArgs,
      COMMON_TEST: commonTests,
      COMMON_ARGUMENTS: commonArgs,
      BROWSER_ARGUMENTS: browserArgs,
      GLOBAL_ARG: globalArg
    });

    //

    program.body = [t.expressionStatement(
      t.callExpression(runner, [t.thisExpression(), factory])
    )];
  }
}
