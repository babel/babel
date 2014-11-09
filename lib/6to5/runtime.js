var generator = require("./generation/generator");
var util      = require("./util");
var File      = require("./file");
var t         = require("./types");
var _         = require("lodash");

module.exports = function (namespace) {
  namespace = t.identifier(namespace || "to5Runtime");

  var body      = [];
  var container = t.functionExpression(null, [], t.blockStatement(body));
  var tree      = t.program([t.expressionStatement(t.callExpression(container, []))]);

  body.push(util.template("self-global", true));

  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(
      namespace,
      t.assignmentExpression("=", t.memberExpression(t.identifier("self"), namespace), t.objectExpression([]))
    )
  ]));

  _.each(File.declarations, function (name) {
    var key = t.identifier(t.toIdentifier(name));
    body.push(t.expressionStatement(
      t.assignmentExpression("=", t.memberExpression(namespace, key), util.template(name))
    ));
  });

  return generator(tree).code;
};
