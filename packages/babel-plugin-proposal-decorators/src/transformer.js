import { types as t, template } from "@babel/core";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import ReplaceSupers from "@babel/helper-replace-supers";

function prop(key, value) {
  if (!value) return null;
  return t.objectProperty(t.identifier(key), value);
}

function value(body, params = []) {
  return t.objectMethod("method", t.identifier("value"), params, body);
}

function hasDecorators({ node }) {
  if (node.decorators && node.decorators.length > 0) return true;

  const body = node.body.body;
  for (let i = 0; i < body.length; i++) {
    const method = body[i];
    if (method.decorators && method.decorators.length > 0) {
      return true;
    }
  }

  return false;
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

function getKey(node) {
  if (node.computed) {
    return node.key;
  } else {
    return t.stringLiteral(node.key.name || String(node.key.value));
  }
}

function getSingleElementDefinition(path, superRef, classRef, file) {
  const { node } = path;
  const isMethod = path.isClassMethod();

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
    prop("key", getKey(node)),
    isMethod
      ? value(node.body, node.params)
      : value(template.ast`{ return ${node.value} }`),
  ].filter(Boolean);

  return t.objectExpression(properties);
}

function getElementsDefinitions(path, fId, file) {
  const superRef = path.node.superClass || t.identifier("Function");

  const elements = [];
  for (const p of path.get("body.body")) {
    if (!p.isClassMethod({ kind: "constructor" })) {
      elements.push(getSingleElementDefinition(p, superRef, fId, file));
      p.remove();
    }
  }

  return t.arrayExpression(elements);
}

function getConstructorPath(path) {
  return path
    .get("body.body")
    .find(path => path.isClassMethod({ kind: "constructor" }));
}

const bareSupersVisitor = {
  CallExpression(path, { initializeInstanceElements }) {
    if (path.get("callee").isSuper()) {
      path.insertAfter(t.cloneNode(initializeInstanceElements));
    }
  },
  Function(path) {
    if (!path.isArrowFunctionExpression()) path.skip();
  },
};

function insertInitializeInstanceElements(path, initializeInstanceId) {
  const isBase = !path.node.superClass;
  const initializeInstanceElements = t.callExpression(initializeInstanceId, [
    t.thisExpression(),
  ]);

  const constructorPath = getConstructorPath(path);
  if (constructorPath) {
    if (isBase) {
      constructorPath
        .get("body")
        .unshiftContainer("body", [
          t.expressionStatement(initializeInstanceElements),
        ]);
    } else {
      constructorPath.traverse(bareSupersVisitor, {
        initializeInstanceElements,
      });
    }
  } else {
    const constructor = isBase
      ? t.classMethod(
          "constructor",
          t.identifier("constructor"),
          [],
          t.blockStatement([t.expressionStatement(initializeInstanceElements)]),
        )
      : t.classMethod(
          "constructor",
          t.identifier("constructor"),
          [t.restElement(t.identifier("args"))],
          t.blockStatement([
            t.expressionStatement(
              t.callExpression(t.Super(), [
                t.spreadElement(t.identifier("args")),
              ]),
            ),
            t.expressionStatement(initializeInstanceElements),
          ]),
        );
    path.node.body.body.push(constructor);
  }
}

function transformClass(path, file) {
  path.node.type = "ClassDeclaration";
  if (!path.node.id) path.node.id = path.scope.generateUidIdentifier("class");

  const initializeId = path.scope.generateUidIdentifier("initialize");

  const classDecorators = extractDecorators(path);
  const definitions = getElementsDefinitions(path, path.node.id, file);

  insertInitializeInstanceElements(path, initializeId);

  return template.expression.ast`
    ${file.addHelper("decorate")}(
      ${classDecorators || t.nullLiteral()},
      function (${initializeId}) {
        ${path.node}
        return { F: ${t.cloneNode(path.node.id)}, d: ${definitions} };
      }
    )
  `;
}

export default {
  ClassDeclaration(path) {
    if (!hasDecorators(path)) return;

    if (path.parentPath.isExportDefaultDeclaration()) {
      if (!path.node.id) {
        t.toExpression(path.node);
        path.replaceWith(transformClass(path, this.file));
        return;
      }

      path = splitExportDeclaration(path.parentPath);
    }

    path.replaceWith(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.cloneNode(path.node.id),
          transformClass(path, this.file),
        ),
      ]),
    );
  },

  ClassExpression(path) {
    if (hasDecorators(path)) {
      path.replaceWith(transformClass(path, this.file));
    }
  },
};
