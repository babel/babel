// TODO(Babel 8): Remove this file

import { types as t, template } from "@babel/core";
import type { File, NodePath } from "@babel/core";
import ReplaceSupers from "@babel/helper-replace-supers";

type Decoratable = Extract<t.Node, { decorators?: t.Decorator[] | null }>;

export function hasOwnDecorators(node: t.Class | t.ClassBody["body"][number]) {
  // @ts-expect-error: 'decorators' not in TSIndexSignature
  return !!node.decorators?.length;
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

function takeDecorators(node: Decoratable) {
  let result: t.ArrayExpression | undefined;
  if (node.decorators && node.decorators.length > 0) {
    result = t.arrayExpression(
      node.decorators.map(decorator => decorator.expression),
    );
  }
  node.decorators = undefined;
  return result;
}

type AcceptedElement = Exclude<ClassElement, t.TSIndexSignature>;
type SupportedElement = Exclude<
  AcceptedElement,
  | t.ClassPrivateMethod
  | t.ClassPrivateProperty
  | t.ClassAccessorProperty
  | t.StaticBlock
>;

function getKey(node: SupportedElement) {
  if (node.computed) {
    return node.key;
  } else if (t.isIdentifier(node.key)) {
    return t.stringLiteral(node.key.name);
  } else {
    return t.stringLiteral(
      String(
        // A non-identifier non-computed key
        (node.key as t.StringLiteral | t.NumericLiteral | t.BigIntLiteral)
          .value,
      ),
    );
  }
}

function extractElementDescriptor(
  file: File,
  classRef: t.Identifier,
  superRef: t.Identifier,
  path: NodePath<AcceptedElement>,
) {
  const isMethod = path.isClassMethod();
  if (path.isPrivate()) {
    throw path.buildCodeFrameError(
      `Private ${
        isMethod ? "methods" : "fields"
      } in decorated classes are not supported yet.`,
    );
  }
  if (path.node.type === "ClassAccessorProperty") {
    throw path.buildCodeFrameError(
      `Accessor properties are not supported in 2018-09 decorator transform, please specify { "version": "2021-12" } instead.`,
    );
  }
  if (path.node.type === "StaticBlock") {
    throw path.buildCodeFrameError(
      `Static blocks are not supported in 2018-09 decorator transform, please specify { "version": "2021-12" } instead.`,
    );
  }

  const { node, scope } = path as NodePath<SupportedElement>;

  if (!path.isTSDeclareMethod()) {
    new ReplaceSupers({
      methodPath: path as NodePath<
        Exclude<SupportedElement, t.TSDeclareMethod>
      >,
      objectRef: classRef,
      superRef,
      file,
      refToPreserve: classRef,
    }).replace();
  }

  const properties: t.ObjectExpression["properties"] = [
    prop("kind", t.stringLiteral(t.isClassMethod(node) ? node.kind : "field")),
    prop("decorators", takeDecorators(node as Decoratable)),
    prop("static", node.static && t.booleanLiteral(true)),
    prop("key", getKey(node)),
  ].filter(Boolean);

  if (isMethod) {
    if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
      // polyfill when being run by an older Babel version
      path.ensureFunctionName ??=
        // eslint-disable-next-line no-restricted-globals
        require("@babel/traverse").NodePath.prototype.ensureFunctionName;
    }
    // @ts-expect-error path is a ClassMethod, that technically
    // is not supported as it does not have an .id property
    // This plugin will however then transform the ClassMethod
    // to a function expression, so it's fine.
    path.ensureFunctionName(false);

    properties.push(prop("value", t.toExpression(path.node)));
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
  return file.addHelper("decorate");
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
      .filter(
        element =>
          // @ts-expect-error Ignore TypeScript's abstract methods (see #10514)
          !element.node.abstract && element.node.type !== "TSIndexSignature",
      )
      .map(path =>
        extractElementDescriptor(
          file,
          node.id,
          superId,
          // @ts-expect-error TS can not exclude TSIndexSignature
          path,
        ),
      ),
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
    instanceNodes: [
      template.statement.ast`
        ${t.cloneNode(initializeId)}(this)
      ` as t.ExpressionStatement,
    ],
    wrapClass(path: NodePath<t.Class>) {
      path.replaceWith(replacement);
      return path.get(classPathDesc) as NodePath;
    },
  };
}
