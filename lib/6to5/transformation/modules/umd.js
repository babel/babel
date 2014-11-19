module.exports = UMDFormatter;

var AMDFormatter = require("./amd");
var util         = require("../../util");
var t            = require("../../types");
var _            = require("lodash");

function UMDFormatter() {
  AMDFormatter.apply(this, arguments);
}

util.inherits(UMDFormatter, AMDFormatter);

UMDFormatter.prototype.transform = function (ast) {
  var program = ast.program;
  var body    = program.body;

  // build an array of module names

  var names = [];
  _.each(this.ids, function (id, name) {
    names.push(t.literal(name));
  });

  // factory

  var ids  = _.values(this.ids);
  var args = [t.identifier("exports")].concat(ids);

  var factory = t.functionExpression(null, args, t.blockStatement(body));

  // runner

  var defineArgs = [t.arrayExpression([t.literal("exports")].concat(names))];
  var moduleName = this.getModuleName();
  if (moduleName) defineArgs.unshift(t.literal(moduleName));

  var runner = util.template("umd-runner-body", {
    AMD_ARGUMENTS: defineArgs,

    COMMON_ARGUMENTS: names.map(function (name) {
      return t.callExpression(t.identifier("require"), [name]);
    })
  });

  //

  var call = t.callExpression(runner, [factory]);
  program.body = [t.expressionStatement(call)];
};
