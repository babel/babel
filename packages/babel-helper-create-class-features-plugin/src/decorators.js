import { types as t, template } from "@babel/core";
import ReplaceSupers from "@babel/helper-replace-supers";

export function hasOwnDecorators(node) {
  return !!(node.decorators && node.decorators.length);
}

export function hasDecorators(node) {
  return hasOwnDecorators(node) || node.body.body.some(hasOwnDecorators);
}

function prop(key, value) {
  if (!value) return null;
  return t.objectProperty(t.identifier(key), value);
}

function value(body, params = [], async, generator) {
  const method = t.objectMethod("method", t.identifier("value"), params, body);
  method.async = !!async;
  method.generator = !!generator;
  return method;
}

function takeDecorators({ node }) {
  let result;
  if (node.decorators && node.decorators.length > 0) {
    result = t.arrayExpression(
      node.decorators.map(decorator => decorator.expression),
    );
  }
  node.decorators = undefined;
  return result;
}

function getKey(node) {
  if (node.computed) {
    return node.key;
  } else if (t.isIdentifier(node.key)) {
    return t.stringLiteral(node.key.name);
  } else {
    return t.stringLiteral(String(node.key.value));
  }
}

function getSingleElementDefinition(path, superRef, classRef, file) {
  const { node, scope } = path;
  const isMethod = path.isClassMethod();

  if (path.isPrivate()) {
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
      isStatic: node.static,
      superRef,
      scope,
      file,
    },
    true,
  ).replace();

  const properties = [
    prop("kind", t.stringLiteral(isMethod ? node.kind : "field")),
    prop("decorators", takeDecorators(path)),
    prop("static", node.static && t.booleanLiteral(true)),
    prop("key", getKey(node)),
    isMethod
      ? value(node.body, node.params, node.async, node.generator)
      : node.value
      ? value(template.ast`{ return ${node.value} }`)
      : prop("value", scope.buildUndefinedNode()),
  ].filter(Boolean);

  return t.objectExpression(properties);
}

function getElementsDefinitions(path, fId, file) {
  const elements = [];
  for (const p of path.get("body.body")) {
    if (!p.isClassMethod({ kind: "constructor" })) {
      elements.push(
        getSingleElementDefinition(p, path.node.superClass, fId, file),
      );
      p.remove();
    }
  }

  return t.arrayExpression(elements);
}

function addDecorateHelper(file) {
  try {
    return file.addHelper("decorate");
  } catch (err) {
    if (err.code === "BABEL_HELPER_UNKNOWN") {
      err.message +=
        "\n  '@babel/plugin-transform-decorators' in non-legacy mode" +
        " requires '@babel/core' version ^7.0.2 and you appear to be using" +
        " an older version.";
    }
    throw err;
  }
}

export function buildDecoratedClass(ref, path, file) {
  const { node, scope } = path;
  const initializeId = scope.generateUidIdentifier("initialize");
  const isDeclaration = node.id && path.isDeclaration();
  const isStrict = path.isInStrictMode();
  const { superClass } = path.node;

  node.type = "ClassDeclaration";
  if (!path.node.id) path.node.id = t.cloneNode(ref);

  const superId =
    superClass &&
    scope.generateUidIdentifierBasedOnNode(node.superClass, "super");

  if (superClass) node.superClass = superId;

  const classDecorators = takeDecorators(path);
  const definitions = getElementsDefinitions(path, node.id, file);

  let replacement = template.expression.ast`
    ${addDecorateHelper(file)}(
      ${classDecorators || t.nullLiteral()},
      function (${initializeId}, ${superClass ? superId : null}) {
        ${node}
        return { F: ${t.cloneNode(node.id)}, d: ${definitions} };
      },
      ${superClass}
    )
  `;
  let classPathDesc = "arguments.1.body.body.0";

  if (!isStrict) {
    replacement.arguments[1].body.directives.push(
      t.directive(t.directiveLiteral("use strict")),
    );
  }

  if (isDeclaration) {
    replacement = template.ast`let ${ref} = ${replacement}`;
    classPathDesc = "declarations.0.init." + classPathDesc;
  }

  return {
    instanceNodes: [template.statement.ast`${initializeId}(this)`],
    wrapClass(path) {
      path.replaceWith(replacement);
      return path.get(classPathDesc);
    },
  };
}
