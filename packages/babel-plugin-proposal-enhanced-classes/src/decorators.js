import { types as t, template } from "@babel/core";
import ReplaceSupers from "@babel/helper-replace-supers";
import { injectInitialization } from "./misc.js";

function prop(key, value) {
  if (!value) return null;
  return t.objectProperty(t.identifier(key), value);
}

function method(key, params, body) {
  return t.objectMethod("method", t.identifier(key), params, body);
}

function extractDecorators({ node }) {
  let result;
  if (node.decorators && node.decorators.length > 0) {
    result = t.arrayExpression(
      node.decorators.map(decorator => decorator.expression),
    );
  }
  node.decorators = undefined;
  return result;
}

function getKey(node, buildPrivateNameId, privateNamesMap) {
  if (t.isPrivateName(node.key)) {
    const { name } = node.key.id;
    return t.callExpression(t.cloneNode(buildPrivateNameId), [
      t.stringLiteral(name),
      t.cloneNode(privateNamesMap.get(name)),
    ]);
  } else if (node.computed) {
    return node.key;
  } else {
    return t.stringLiteral(node.key.name || String(node.key.value));
  }
}

function getSingleElementDefinition(
  path,
  superRef,
  classRef,
  buildPrivateNameId,
  privateNamesMap,
  file,
) {
  const { node } = path;
  const isMethod = path.isClassMethod();

  if (false && path.isPrivate()) {
    throw path.buildCodeFrameError(
      `Private ${
        isMethod ? "methods" : "fields"
      } in decorated classes are not supported yet.`,
    );
  }

  new ReplaceSupers(
    {
      methodPath: path,
      methodNode: node,
      objectRef: classRef,
      superRef: superRef,
      isStatic: node.static,
      scope: path.scope,
      file: file,
    },
    true,
  ).replace();

  const properties = [
    prop("kind", t.stringLiteral(isMethod ? node.kind : "field")),
    prop("decorators", extractDecorators(path)),
    prop("static", node.static && t.booleanLiteral(true)),
    prop("key", getKey(node, buildPrivateNameId, privateNamesMap)),
    isMethod
      ? method("value", node.params, node.body)
      : method("value", [], template.ast`{ return ${node.value} }`),
  ].filter(Boolean);

  return t.objectExpression(properties);
}

function getElementsDefinitions(
  path,
  fId,
  buildPrivateNameId,
  privateNamesMap,
  file,
) {
  const superRef = path.node.superClass || t.identifier("Function");

  const elements = [];
  for (const p of path.get("body.body")) {
    if (!p.isClassMethod({ kind: "constructor" })) {
      elements.push(
        getSingleElementDefinition(
          p,
          superRef,
          fId,
          buildPrivateNameId,
          privateNamesMap,
          file,
        ),
      );
      p.remove();
    }
  }

  return t.arrayExpression(elements);
}

function buildInitCall(initializeInstanceId) {
  return t.expressionStatement(
    t.callExpression(initializeInstanceId, [t.thisExpression()]),
  );
}

export function transformDecoratedClass(
  path,
  constructor,
  privateNamesMap,
  loose,
  file,
) {
  const isDeclaration = path.node.id && path.isDeclaration();
  const isStrict = path.isInStrictMode();
  const { superClass } = path.node;

  path.node.type = "ClassDeclaration";
  if (!path.node.id) path.node.id = path.scope.generateUidIdentifier("class");

  const initializeId = path.scope.generateUidIdentifier("initialize");
  const superId = superClass
    ? path.scope.generateUidIdentifierBasedOnNode(path.node.superClass, "super")
    : null;

  const buildPrivateNameId =
    privateNamesMap.size > 0 || superClass
      ? path.scope.generateUidIdentifier("buildPrivateName")
      : null;

  if (superClass) path.node.superClass = superId;

  const classDecorators = extractDecorators(path);
  const definitions = getElementsDefinitions(
    path,
    path.node.id,
    buildPrivateNameId,
    privateNamesMap,
    file,
  );

  const buildPrivateNameHelperName = loose
    ? "buildPrivateNameLoose"
    : "buildPrivateName";

  injectInitialization(path, constructor, [buildInitCall(initializeId)]);

  const expr = template.expression.ast`
      ${file.addHelper("decorate")}(
        ${classDecorators || t.nullLiteral()},
        function (
          ${initializeId},
          ${buildPrivateNameId},
          ${superId}
        ) {
          ${isStrict ? null : t.stringLiteral("use strict")}
          ${path.node}
          return { F: ${t.cloneNode(path.node.id)}, d: ${definitions} };
        },
        ${file.addHelper(buildPrivateNameHelperName)},
        ${superClass}
      )
    `;

  return isDeclaration ? template.ast`let ${path.node.id} = ${expr}` : expr;
}

export function hasDecorators({ node }) {
  return node.decorators && node.decorators.length > 0;
}
