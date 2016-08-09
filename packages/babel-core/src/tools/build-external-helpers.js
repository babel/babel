/* eslint max-len: 0 */

import * as helpers from "babel-helpers";
import generator from "babel-generator";
import * as messages from "babel-messages";
import template from "babel-template";
import each from "lodash.foreach";
import * as t from "babel-types";

let buildUmdWrapper = template(`
  (function (root, factory) {
    if (typeof define === "function" && define.amd) {
      define(AMD_ARGUMENTS, factory);
    } else if (typeof exports === "object") {
      factory(COMMON_ARGUMENTS);
    } else {
      factory(BROWSER_ARGUMENTS);
    }
  })(UMD_ROOT, function (FACTORY_PARAMETERS) {
    FACTORY_BODY
  });
`);

function buildGlobal(namespace, builder) {
  let body      = [];
  let container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
  let tree      = t.program([t.expressionStatement(t.callExpression(container, [helpers.get("selfGlobal")]))]);

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
  let body = [];
  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(namespace, t.identifier("global"))
  ]));

  builder(body);

  return t.program([
    buildUmdWrapper({
      FACTORY_PARAMETERS: t.identifier("global"),
      BROWSER_ARGUMENTS:  t.assignmentExpression(
        "=",
        t.memberExpression(t.identifier("root"), namespace),
        t.objectExpression([])
      ),
      COMMON_ARGUMENTS:   t.identifier("exports"),
      AMD_ARGUMENTS:      t.arrayExpression([t.stringLiteral("exports")]),
      FACTORY_BODY:       body,
      UMD_ROOT:           t.identifier("this")
    })
  ]);
}

function buildVar(namespace, builder) {
  let body = [];
  body.push(t.variableDeclaration("var", [
    t.variableDeclarator(namespace, t.objectExpression([]))
  ]));
  builder(body);
  body.push(t.expressionStatement(namespace));
  return t.program(body);
}

function buildHelpers(body, namespace, whitelist) {
  each(helpers.list, function (name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;

    let key = t.identifier(name);
    body.push(t.expressionStatement(
      t.assignmentExpression("=", t.memberExpression(namespace, key), helpers.get(name))
    ));
  });
}
export default function (
  whitelist?: Array<string>,
  outputType: "global" | "umd" | "var" = "global",
) {
  let namespace = t.identifier("babelHelpers");

  let builder = function (body) {
    return buildHelpers(body, namespace, whitelist);
  };

  let tree;

  let build = {
    global: buildGlobal,
    umd:    buildUmd,
    var:    buildVar,
  }[outputType];

  if (build) {
    tree = build(namespace, builder);
  } else {
    throw new Error(messages.get("unsupportedOutputType", outputType));
  }

  return generator(tree).code;
}
