import DefaultFormatter from "./_default";
import AMDFormatter from "./amd";
import values from "lodash/object/values";
import path from "path";
import * as util from  "../../util";
import * as t from "babel-types";

export default class UMDFormatter extends AMDFormatter {
  transform(program) {
    DefaultFormatter.prototype.transform.apply(this, arguments);

    let body = program.body;

    // build an array of module names

    let names = [];
    for (let name in this.ids) {
      names.push(t.stringLiteral(name));
    }

    // factory

    let ids  = values(this.ids);
    let args = [t.identifier("exports")];
    if (this.passModuleArg) args.push(t.identifier("module"));
    args = args.concat(ids);

    let factory = t.functionExpression(null, args, t.blockStatement(body));

    // amd

    let defineArgs = [t.stringLiteral("exports")];
    if (this.passModuleArg) defineArgs.push(t.stringLiteral("module"));
    defineArgs = defineArgs.concat(names);
    defineArgs = [t.arrayExpression(defineArgs)];

    // common

    let testExports = util.template("test-exports");
    let testModule  = util.template("test-module");
    let commonTests = this.passModuleArg ? t.logicalExpression("&&", testExports, testModule) : testExports;

    let commonArgs = [t.identifier("exports")];
    if (this.passModuleArg) commonArgs.push(t.identifier("module"));
    commonArgs = commonArgs.concat(names.map(function (name) {
      return t.callExpression(t.identifier("require"), [name]);
    }));

    // globals

    let browserArgs = [];
    if (this.passModuleArg) browserArgs.push(t.identifier("mod"));

    for (let name in this.ids) {
      let id = this.defaultIds[name] || t.identifier(t.toIdentifier(path.basename(name, path.extname(name))));
      browserArgs.push(t.memberExpression(t.identifier("global"), id));
    }

    //

    let moduleName = this.getModuleName();
    if (moduleName) defineArgs.unshift(t.stringLiteral(moduleName));

    //
    let globalArg = this.file.opts.basename;
    if (moduleName) globalArg = moduleName;
    globalArg = t.identifier(t.toIdentifier(globalArg));

    let runner = util.template("umd-runner-body", {
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
