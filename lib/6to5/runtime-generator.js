"use strict";

var generator = require("./generation/generator");
var util      = require("./util");
var File      = require("./file");
var t         = require("./types");
var _         = require("lodash");

module.exports = function (namespace) {
  namespace = t.identifier(t.toIdentifier(namespace || "to5Runtime"));

  var body      = [];
  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  var tree      = t.program([t.expressionStatement(t.callExpression(container, [util.template("self-global")]))]);

  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(
      namespace,
      t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([]))
    )
  ]));

  _.each(File.helpers, function (name) {
    if (_.contains(File.excludeHelpersFromRuntime, name)) {
      return;
    }

    var key = t.identifier(t.toIdentifier(name));
    body.push(t.expressionStatement(
      t.assignmentExpression("=", t.memberExpression(namespace, key), util.template(name))
    ));
  });

  return generator(tree).code;
};
