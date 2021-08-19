import * as helpers from "@babel/helpers";
import generator from "@babel/generator";
import template from "@babel/template";
import {
  arrayExpression,
  assignmentExpression,
  binaryExpression,
  blockStatement,
  callExpression,
  cloneNode,
  conditionalExpression,
  exportNamedDeclaration,
  exportSpecifier,
  expressionStatement,
  functionExpression,
  identifier,
  memberExpression,
  objectExpression,
  program,
  stringLiteral,
  unaryExpression,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type * as t from "@babel/types";
import File from "../transformation/file/file";

// Wrapped to avoid wasting time parsing this when almost no-one uses
// build-external-helpers.
const buildUmdWrapper = replacements =>
  template.statement`
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
  `(replacements);

function buildGlobal(allowlist?: Array<string>) {
  const namespace = identifier("babelHelpers");

  const body: t.Statement[] = [];
  const container = functionExpression(
    null,
    [identifier("global")],
    blockStatement(body),
  );
  const tree = program([
    expressionStatement(
      callExpression(container, [
        // typeof global === "undefined" ? self : global
        conditionalExpression(
          binaryExpression(
            "===",
            unaryExpression("typeof", identifier("global")),
            stringLiteral("undefined"),
          ),
          identifier("self"),
          identifier("global"),
        ),
      ]),
    ),
  ]);

  body.push(
    variableDeclaration("var", [
      variableDeclarator(
        namespace,
        assignmentExpression(
          "=",
          memberExpression(identifier("global"), namespace),
          objectExpression([]),
        ),
      ),
    ]),
  );

  buildHelpers(body, namespace, allowlist);

  return tree;
}

function buildModule(allowlist?: Array<string>) {
  const body: t.Statement[] = [];
  const refs = buildHelpers(body, null, allowlist);

  body.unshift(
    exportNamedDeclaration(
      null,
      Object.keys(refs).map(name => {
        return exportSpecifier(cloneNode(refs[name]), identifier(name));
      }),
    ),
  );

  return program(body, [], "module");
}

function buildUmd(allowlist?: Array<string>) {
  const namespace = identifier("babelHelpers");

  const body: t.Statement[] = [];
  body.push(
    variableDeclaration("var", [
      variableDeclarator(namespace, identifier("global")),
    ]),
  );

  buildHelpers(body, namespace, allowlist);

  return program([
    buildUmdWrapper({
      FACTORY_PARAMETERS: identifier("global"),
      BROWSER_ARGUMENTS: assignmentExpression(
        "=",
        memberExpression(identifier("root"), namespace),
        objectExpression([]),
      ),
      COMMON_ARGUMENTS: identifier("exports"),
      AMD_ARGUMENTS: arrayExpression([stringLiteral("exports")]),
      FACTORY_BODY: body,
      UMD_ROOT: identifier("this"),
    }),
  ]);
}

function buildVar(allowlist?: Array<string>) {
  const namespace = identifier("babelHelpers");

  const body: t.Statement[] = [];
  body.push(
    variableDeclaration("var", [
      variableDeclarator(namespace, objectExpression([])),
    ]),
  );
  const tree = program(body);
  buildHelpers(body, namespace, allowlist);
  body.push(expressionStatement(namespace));
  return tree;
}

function buildHelpers(
  body: t.Statement[],
  namespace: t.Expression | null,
  allowlist?: Array<string>,
) {
  const getHelperReference = (name: string) => {
    return namespace
      ? memberExpression(namespace, identifier(name))
      : identifier(`_${name}`);
  };

  const refs = {};
  helpers.list.forEach(function (name) {
    if (allowlist && allowlist.indexOf(name) < 0) return;

    const ref = (refs[name] = getHelperReference(name));

    helpers.ensure(name, File);
    const { nodes } = helpers.get(name, getHelperReference, ref);

    body.push(...nodes);
  });
  return refs;
}
export default function (
  allowlist?: Array<string>,
  outputType: "global" | "module" | "umd" | "var" = "global",
) {
  let tree: t.Program;

  const build = {
    global: buildGlobal,
    module: buildModule,
    umd: buildUmd,
    var: buildVar,
  }[outputType];

  if (build) {
    tree = build(allowlist);
  } else {
    throw new Error(`Unsupported output type ${outputType}`);
  }

  return generator(tree).code;
}
