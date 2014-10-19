module.exports = UMDFormatter;

var AMDFormatter = require("./amd");
var util         = require("../util");
var b            = require("ast-types").builders;
var _            = require("lodash");

function UMDFormatter(file) {
  this.file = file;
  this.ids  = {};
}

util.inherits(UMDFormatter, AMDFormatter);

UMDFormatter.prototype.transform = function (ast) {
  var program = ast.program;
  var body    = program.body;

  // build an array of module names

  var names = [];
  _.each(this.ids, function (id, name) {
    names.push(b.literal(name));
  });

  // factory

  var ids  = _.values(this.ids);
  var args = [b.identifier("exports")].concat(ids);

  var factory = b.functionExpression(null, args, b.blockStatement(body));

  // runner

  var runner = util.template("umd-runner-body", {
    AMD_ARGUMENTS: b.arrayExpression([b.literal("exports")].concat(names)),

    COMMON_ARGUMENTS: names.map(function (name) {
      return b.callExpression(b.identifier("require"), [name]);
    })
  });

  //

  var call = b.callExpression(runner, [factory]);
  program.body = [b.expressionStatement(call)];
};
