import { types as t, template } from "@babel/core";
import type { File } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import ReplaceSupers from "@babel/helper-replace-supers";
import nameFunction from "@babel/helper-function-name";

type Decorable = Extract<t.Node, { decorators?: t.Decorator[] | null }>;

export function hasOwnDecorators(node: t.Node) {
  // @ts-expect-error(flow->ts) TODO: maybe we could add t.isDecoratable to make ts happy
  return !!(node.decorators && node.decorators.length);
}

export function hasDecorators(node: t.Class) {
  return hasOwnDecorators(node) || node.body.body.some(hasOwnDecorators);
}

function prop(key: string, value?: t.Expression) {
  if (!value) return null;
  return t.objectProperty(t.identifier(key), value);
}

function method(key: string, body: t.Statement[]) {
  return t.objectMethod(
    "method",
    t.identifier(key),
    [],
    t.blockStatement(body),
  );
}

function takeDecorators(node: Decorable) {
  let result: t.ArrayExpression | undefined;
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

// NOTE: This function can be easily bound as .bind(file, classRef, superRef)
//       to make it easier to use it in a loop.
function extractElementDescriptor(
  this: File,
  classRef: t.Identifier,
  superRef: t.Identifier,
  path: ClassElementPath,
) {
  const { node, scope } = path;
  const isMethod = path.isClassMethod();

  if (path.isPrivate()) {
    throw path.buildCodeFrameError(
      `Private ${
        isMethod ? "methods" : "fields"
      } in decorated classes are not supported yet.`,
    );
  }

  new ReplaceSupers({
    methodPath: path,
    objectRef: classRef,
    superRef,
    file: this,
    refToPreserve: classRef,
  }).replace();

  const properties: t.ObjectExpression["properties"] = [
    prop("kind", t.stringLiteral(t.isClassMethod(node) ? node.kind : "field")),
    prop("decorators", takeDecorators(node as Decorable)),
    prop("static", node.static && t.booleanLiteral(true)),
    prop("key", getKey(node)),
  ].filter(Boolean);

  if (t.isClassMethod(node)) {
    const id = node.computed ? null : node.key;
    t.toExpression(node);
    properties.push(prop("value", nameFunction({ node, id, scope }) || node));
  } else if (t.isClassProperty(node) && node.value) {
    properties.push(
      method("value", template.statements.ast`return ${node.value}`),
    );
  } else {
    properties.push(prop("value", scope.buildUndefinedNode()));
  }

  path.remove();

  return t.objectExpression(properties);
}

function addDecorateHelper(file: File) {
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

type ClassElement = t.Class["body"]["body"][number];
type ClassElementPath = NodePath<ClassElement>;

export function buildDecoratedClass(
  ref: t.Identifier,
  path: NodePath<t.Class>,
  elements: ClassElementPath[],
  file: File,
) {
  const { node, scope } = path;
  const initializeId = scope.generateUidIdentifier("initialize");
  const isDeclaration = node.id && path.isDeclaration();
  const isStrict = path.isInStrictMode();
  const { superClass } = node;

  node.type = "ClassDeclaration";
  if (!node.id) node.id = t.cloneNode(ref);

  let superId: t.Identifier;
  if (superClass) {
    superId = scope.generateUidIdentifierBasedOnNode(node.superClass, "super");
    node.superClass = superId;
  }

  const classDecorators = takeDecorators(node);
  const definitions = t.arrayExpression(
    elements
      // @ts-expect-error Ignore TypeScript's abstract methods (see #10514)
      .filter(element => !element.node.abstract)
      .map(extractElementDescriptor.bind(file, node.id, superId)),
  );

  const wrapperCall = template.expression.ast`
    ${addDecorateHelper(file)}(
      ${classDecorators || t.nullLiteral()},
      function (${initializeId}, ${superClass ? t.cloneNode(superId) : null}) {
        ${node}
        return { F: ${t.cloneNode(node.id)}, d: ${definitions} };
      },
      ${superClass}
    )
  ` as t.CallExpression & { arguments: [unknown, t.FunctionExpression] };

  if (!isStrict) {
    wrapperCall.arguments[1].body.directives.push(
      t.directive(t.directiveLiteral("use strict")),
    );
  }

  let replacement: t.Node = wrapperCall;
  let classPathDesc = "arguments.1.body.body.0";
  if (isDeclaration) {
    replacement = template.statement.ast`let ${ref} = ${wrapperCall}`;
    classPathDesc = "declarations.0.init." + classPathDesc;
  }

  return {
    instanceNodes: [template.statement.ast`${t.cloneNode(initializeId)}(this)`],
    wrapClass(path: NodePath<t.Class>) {
      path.replaceWith(replacement);
      return path.get(classPathDesc) as NodePath;
    },
  };
}
