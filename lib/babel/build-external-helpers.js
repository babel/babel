"use strict";

var buildHelpers = require("./build-helpers");
var generator    = require("./generation");
var util         = require("./util");
var t            = require("./types");

module.exports = function () {
  var namespace = t.identifier("babelHelpers");

  var body      = [];
  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  var tree      = t.program([t.expressionStatement(t.callExpression(container, [util.template("self-global")]))]);

  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(
      namespace,
      t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([]))
    )
  ]));

  buildHelpers(body, namespace);

  return generator(tree).code;
};
