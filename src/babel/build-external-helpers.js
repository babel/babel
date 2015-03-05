import buildHelpers from "./build-helpers";
import generator from "./generation";
import * as util from  "./util";
import t from "./types";

function buildGlobal(namespace, builder) {
  var body      = [];
  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  var tree      = t.program([t.expressionStatement(t.callExpression(container, [util.template("self-global")]))]);

  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(
      namespace,
      t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([]))
    )
  ]));

  builder(body);

  return tree;
}

function buildUmd(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(namespace, t.identifier("global"))
  ]));

  builder(body);

  var container = util.template("umd-commonjs-strict", {
    FACTORY_PARAMETERS: t.identifier("global"),
    BROWSER_ARGUMENTS:  t.assignmentExpression("=", t.memberExpression(t.identifier("root"), namespace), t.objectExpression({})),
    COMMON_ARGUMENTS:   t.identifier("exports"),
    AMD_ARGUMENTS:      t.arrayExpression([t.literal("exports")]),
    FACTORY_BODY:       body,
    UMD_ROOT:           t.identifier("this")
  });
  return t.program([container]);
}

function buildVar(namespace, builder) {
  var body = [];
  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(namespace, t.objectExpression({}))
  ]));
  builder(body);
  return t.program(body);
}

export default function (whitelist, outputType = "global") {
  var namespace = t.identifier("babelHelpers");
  var builder = function (body) {
    return buildHelpers(body, namespace, whitelist);
  };

  var tree;
  switch (outputType) {
  case "global":
    tree = buildGlobal(namespace, builder);
    break;
  case "umd":
    tree = buildUmd(namespace, builder);
    break;
  case "var":
    tree = buildVar(namespace, builder);
    break;
  default:
    throw new Error("Unsupported output type");
  }

  return generator(tree).code;
};
