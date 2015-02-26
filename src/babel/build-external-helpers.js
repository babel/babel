import buildHelpers from "./build-helpers";
import generator from "./generation";
import * as util from  "./util";
import t from "./types";

export default function (whitelist) {
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

  buildHelpers(body, namespace, whitelist);

  return generator(tree).code;
};
