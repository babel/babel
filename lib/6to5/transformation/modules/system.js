module.exports = SystemFormatter;

var DefaultFormatter = require("./_default");
var AMDFormatter     = require("./amd");
var util             = require("../../util");
var t                = require("../../types");
var _                = require("lodash");

function SystemFormatter(file) {
  AMDFormatter.apply(this, arguments);

  this.moduleNameLiteral = t.literal(this.getModuleName());
  this.exportIdentifier  = file.generateUidIdentifier("export");
}

util.inherits(SystemFormatter, AMDFormatter);

SystemFormatter.prototype.getModuleName = DefaultFormatter.prototype.getModuleName;

SystemFormatter.prototype._exportsWildcard = function (objectIdentifier) {
  var leftIdentifier = t.identifier("i");
  var valIdentifier  = t.memberExpression(objectIdentifier, leftIdentifier, true);

  var left = t.variableDeclaration("var", [
    t.variableDeclarator(leftIdentifier)
  ]);

  var right = objectIdentifier;

  var block = t.blockStatement([
    this.buildExportCall(leftIdentifier, valIdentifier)
  ]);

  return t.forInStatement(left, right, block);
};

SystemFormatter.prototype._exportsAssign = function (id, init) {
  return this.buildExportCall(t.literal(id.name), init, true);
};

SystemFormatter.prototype.remapExportAssignment = function (node) {
  return this.buildExportCall(t.literal(node.left.name), node);
};

SystemFormatter.prototype.buildExportCall = function (id, init, isStatement) {
  var call = t.callExpression(this.exportIdentifier, [id, init]);
  if (isStatement) {
    return t.expressionStatement(call);
  } else {
    return call;
  }
};

SystemFormatter.prototype.buildRunnerSetters = function () {
  return t.arrayExpression(_.map(this.ids, function (uid) {
    var moduleIdentifier = t.identifier("m");

    return t.functionExpression(null, [moduleIdentifier], t.blockStatement([
      t.assignmentExpression("=", uid, moduleIdentifier)
    ]));
  }));
};

SystemFormatter.prototype.transform = function (ast) {
  var program = ast.program;

  var runner = util.template("system", {
    MODULE_NAME: this.moduleNameLiteral,
    MODULE_DEPENDENCIES: t.arrayExpression(this.buildDependencyLiterals()),
    EXPORT_IDENTIFIER: this.exportIdentifier,
    SETTERS: this.buildRunnerSetters(),
    EXECUTE: t.functionExpression(null, [], t.blockStatement(program.body))
  }, true);

  if (!_.isEmpty(this.ids)) {
    var handlerBody = runner.expression.arguments[2].body.body;
    handlerBody.unshift(t.variableDeclaration("var", _.map(this.ids, function (uid) {
      return t.variableDeclarator(uid);
    })));
  }

  program.body = [runner];
};
