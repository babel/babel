import * as helpers from "babel-helpers";
import generator from "babel-generator";
import * as messages from "babel-messages";
import template from "babel-template";
import * as t from "babel-types";

const keywordHelpers = ["typeof", "extends", "instanceof"];

const buildUmdWrapper = template(`
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
  const body = [];
  const container = t.functionExpression(
    null,
    [t.identifier("global")],
    t.blockStatement(body),
  );
  const tree = t.program([
    t.expressionStatement(
      t.callExpression(container, [
        // typeof global === "undefined" ? self : global
        t.conditionalExpression(
          t.binaryExpression(
            "===",
            t.unaryExpression("typeof", t.identifier("global")),
            t.stringLiteral("undefined"),
          ),
          t.identifier("self"),
          t.identifier("global"),
        ),
      ]),
    ),
  ]);

  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(
        namespace,
        t.assignmentExpression(
          "=",
          t.memberExpression(t.identifier("global"), namespace),
          t.objectExpression([]),
        ),
      ),
    ]),
  );

  builder(body);

  return tree;
}

function buildModule(namespace, builder) {
  const body = [];
  builder(body);

  const module = body
    .map(helper => {
      const originalIdentifier = helper.expression.left.property.name;
      const isKeywordHelper = keywordHelpers.indexOf(originalIdentifier) !== -1;
      const helperIndentifier = isKeywordHelper
        ? `_${originalIdentifier}`
        : originalIdentifier;

      const variableDeclaration = t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier(helperIndentifier),
          helper.expression.right,
        ),
      ]);

      return isKeywordHelper
        ? variableDeclaration
        : t.exportNamedDeclaration(variableDeclaration, []);
    })
    .concat(
      t.exportNamedDeclaration(
        null,
        keywordHelpers.map(keywordHelper =>
          t.exportSpecifier(
            t.identifier(`_${keywordHelper}`),
            t.identifier(keywordHelper),
          ),
        ),
      ),
    );

  return t.program(module);
}

function buildUmd(namespace, builder) {
  const body = [];
  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(namespace, t.identifier("global")),
    ]),
  );

  builder(body);

  return t.program([
    buildUmdWrapper({
      FACTORY_PARAMETERS: t.identifier("global"),
      BROWSER_ARGUMENTS: t.assignmentExpression(
        "=",
        t.memberExpression(t.identifier("root"), namespace),
        t.objectExpression([]),
      ),
      COMMON_ARGUMENTS: t.identifier("exports"),
      AMD_ARGUMENTS: t.arrayExpression([t.stringLiteral("exports")]),
      FACTORY_BODY: body,
      UMD_ROOT: t.identifier("this"),
    }),
  ]);
}

function buildVar(namespace, builder) {
  const body = [];
  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(namespace, t.objectExpression([])),
    ]),
  );
  builder(body);
  body.push(t.expressionStatement(namespace));
  return t.program(body);
}

function buildHelpers(body, namespace, whitelist) {
  helpers.list.forEach(function(name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;

    const { nodes } = helpers.get(
      name,
      t.memberExpression(namespace, t.identifier(name)),
    );

    body.push(...nodes);
  });
}
export default function(
  whitelist?: Array<string>,
  outputType: "global" | "module" | "umd" | "var" = "global",
) {
  const namespace = t.identifier("babelHelpers");

  const builder = function(body) {
    return buildHelpers(body, namespace, whitelist);
  };

  let tree;

  const build = {
    global: buildGlobal,
    module: buildModule,
    umd: buildUmd,
    var: buildVar,
  }[outputType];

  if (build) {
    tree = build(namespace, builder);
  } else {
    throw new Error(messages.get("unsupportedOutputType", outputType));
  }

  return generator(tree).code;
}
