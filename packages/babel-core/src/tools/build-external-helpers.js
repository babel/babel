import * as helpers from "@babel/helpers";
import generator from "@babel/generator";
import template from "@babel/template";
import * as t from "@babel/types";

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

function buildGlobal(whitelist) {
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

  buildHelpers(body, namespace, whitelist);

  return tree;
}

function buildModule(whitelist) {
  const body = [];
  const refs = buildHelpers(body, null, whitelist);

  body.unshift(
    t.exportNamedDeclaration(
      null,
      Object.keys(refs).map(name => {
        return t.exportSpecifier(t.clone(refs[name]), t.identifier(name));
      }),
    ),
  );

  return t.program(body, [], "module");
}

function buildUmd(whitelist) {
  const namespace = t.identifier("babelHelpers");

  const body = [];
  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(namespace, t.identifier("global")),
    ]),
  );

  buildHelpers(body, namespace, whitelist);

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

function buildVar(whitelist) {
  const namespace = t.identifier("babelHelpers");

  const body = [];
  body.push(
    t.variableDeclaration("var", [
      t.variableDeclarator(namespace, t.objectExpression([])),
    ]),
  );
  const tree = t.program(body);
  buildHelpers(body, namespace, whitelist);
  body.push(t.expressionStatement(namespace));
  return tree;
}

function buildHelpers(body, namespace, whitelist) {
  const getHelperReference = name => {
    return namespace
      ? t.memberExpression(namespace, t.identifier(name))
      : t.identifier(`_${name}`);
  };

  const refs = {};
  helpers.list.forEach(function(name) {
    if (whitelist && whitelist.indexOf(name) < 0) return;

    const ref = (refs[name] = getHelperReference(name));

    const { nodes } = helpers.get(name, getHelperReference, ref);

    body.push(...nodes);
  });
  return refs;
}
export default function(
  whitelist?: Array<string>,
  outputType: "global" | "module" | "umd" | "var" = "global",
) {
  let tree;

  const build = {
    global: buildGlobal,
    module: buildModule,
    umd: buildUmd,
    var: buildVar,
  }[outputType];

  if (build) {
    tree = build(whitelist);
  } else {
    throw new Error(`Unsupported output type ${outputType}`);
  }

  return generator(tree).code;
}
