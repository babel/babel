import * as helpers from "babel-helpers";
import generator from "babel-generator";
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

function buildGlobal(builder) {
  const namespace = t.identifier("babelHelpers");

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

  builder(body, namespace);

  return tree;
}

function buildModule(builder) {
  const namespace = t.identifier("babelHelpers");
  const body = [];
  builder(body, namespace);

  const module = body.map(helperNode => {
    const possibleAssignment = t.isExpressionStatement(helperNode)
      ? helperNode.expression
      : helperNode;

    const isExportedHelper =
      t.isAssignmentExpression(possibleAssignment) &&
      t.isMemberExpression(possibleAssignment.left) &&
      possibleAssignment.left.object.name === namespace.name;

    if (!isExportedHelper) {
      return helperNode;
    }

    const exportedHelper = possibleAssignment;

    const identifier = exportedHelper.left.property.name;
    const isKeywordHelper = keywordHelpers.indexOf(identifier) !== -1;

    if (isKeywordHelper) {
      return t.exportNamedDeclaration(null, [
        t.exportSpecifier(
          t.identifier(`_${identifier}`),
          t.identifier(identifier),
        ),
      ]);
    }

    return t.exportNamedDeclaration(
      t.variableDeclaration("var", [
        t.variableDeclarator(t.identifier(identifier), exportedHelper.right),
      ]),
      [],
    );
  });

  return t.program(module);
}

function buildUmd(builder) {
  const namespace = t.identifier("babelHelpers");

  const body = [];
  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(namespace, t.identifier("global")),
    ]),
  );

  builder(body, namespace);

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

function buildVar(builder) {
  const namespace = t.identifier("babelHelpers");

  const body = [];
  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(namespace, t.objectExpression([])),
    ]),
  );
  const tree = t.program(body);
  builder(body, namespace);
  body.push(t.expressionStatement(namespace));
  return tree;
}

function buildHelpers(body, namespace, whitelist) {
  const getHelperReference = name =>
    t.memberExpression(namespace, t.identifier(name));

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
  const builder = function(body, namespace) {
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
    tree = build(builder);
  } else {
    throw new Error(`Unsupported output type ${outputType}`);
  }

  return generator(tree).code;
}
