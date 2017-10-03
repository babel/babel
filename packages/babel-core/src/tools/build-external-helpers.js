import * as helpers from "babel-helpers";
import generator from "babel-generator";
import template from "babel-template";
import * as t from "babel-types";

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

const normalizeHelperId = helperId => helperId.replace(/^_+/, "");

function buildModule(namespace, builder) {
  const body = [];
  const module = [];
  builder(body);

  body.forEach(helperNode => {
    let exportedHelperId;

    if (t.isFunctionDeclaration(helperNode)) {
      exportedHelperId = normalizeHelperId(helperNode.id.name);
    } else if (t.isVariableDeclaration(helperNode)) {
      exportedHelperId = normalizeHelperId(helperNode.declarations[0].id.name);
    }

    if (!exportedHelperId || helpers.list.indexOf(exportedHelperId) === -1) {
      module.push(helperNode);
      return;
    }

    const isKeywordHelper =
      helpers.keywordHelpers.indexOf(exportedHelperId) !== -1;

    if (isKeywordHelper) {
      module.push(helperNode);
      module.push(
        t.exportNamedDeclaration(null, [
          t.exportSpecifier(
            t.identifier(`_${exportedHelperId}`),
            t.identifier(exportedHelperId),
          ),
        ]),
      );
      return;
    }

    module.push(t.exportNamedDeclaration(helperNode, []));
  });

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
  const tree = t.program(body);
  builder(body);
  body.push(t.expressionStatement(namespace));
  return tree;
}

function buildHelpers(body, namespace, whitelist) {
  const getHelperReference = name => {
    const id = t.identifier(name);
    return namespace ? t.memberExpression(namespace, id) : id;
  };

  helpers.list.forEach(function(name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;

    const { nodes } = helpers.get(
      name,
      getHelperReference,
      getHelperReference(name),
    );

    body.push(...nodes);
  });
}
export default function(
  whitelist?: Array<string>,
  outputType: "global" | "module" | "umd" | "var" = "global",
) {
  const namespace =
    outputType !== "module" ? t.identifier("babelHelpers") : null;

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
    throw new Error(`Unsupported output type ${outputType}`);
  }

  return generator(tree).code;
}
