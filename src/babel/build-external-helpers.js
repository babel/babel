import buildHelpers from "./build-helpers";
import generator from "./generation";
import * as util from  "./util";
import t from "./types";

export default function (whitelist) {
  var namespace = t.identifier("babelHelpers");

  var body = [];
  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(namespace, t.identifier("global"))
  ]));

  buildHelpers(body, namespace, whitelist);

  var container = util.template("umd-commonjs-strict", {
    AMD_ARGUMENTS:      t.arrayExpression([t.literal("exports")]),
    COMMON_ARGUMENTS:   t.identifier("exports"),
    BROWSER_ARGUMENTS:  t.assignmentExpression("=", t.memberExpression(t.identifier("root"), namespace), t.objectExpression({})),
    UMD_ROOT:           t.identifier("this"),
    FACTORY_PARAMETERS: t.identifier("global"),
    FACTORY_BODY:       body
  });
  var tree = t.program([container]);

  return generator(tree).code;
};
