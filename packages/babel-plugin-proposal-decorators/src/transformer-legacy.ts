// Fork of https://github.com/loganfsmyth/babel-plugin-proposal-decorators-legacy

import { template, types as t } from "@babel/core";
import type { NodePath, Visitor, PluginPass } from "@babel/core";

const buildClassDecorator = template.statement(`
  DECORATOR(CLASS_REF = INNER) || CLASS_REF;
`) as (replacements: {
  DECORATOR: t.Expression;
  CLASS_REF: t.Identifier;
  INNER: t.Expression;
}) => t.ExpressionStatement;

const buildClassPrototype = template(`
  CLASS_REF.prototype;
`) as (replacements: { CLASS_REF: t.Identifier }) => t.ExpressionStatement;

const buildGetDescriptor = template(`
    Object.getOwnPropertyDescriptor(TARGET, PROPERTY);
`) as (replacements: {
  TARGET: t.Expression;
  PROPERTY: t.Literal;
}) => t.ExpressionStatement;

const buildGetObjectInitializer = template(`
    (TEMP = Object.getOwnPropertyDescriptor(TARGET, PROPERTY), (TEMP = TEMP ? TEMP.value : undefined), {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function(){
            return TEMP;
        }
    })
`) as (replacements: {
  TEMP: t.Identifier;
  TARGET: t.Expression;
  PROPERTY: t.Literal;
}) => t.ExpressionStatement;

const WARNING_CALLS = new WeakSet();

// legacy decorator does not support ClassAccessorProperty
type ClassDecoratableElement =
  | t.ClassMethod
  | t.ClassPrivateMethod
  | t.ClassProperty
  | t.ClassPrivateProperty;

/**
 * If the decorator expressions are non-identifiers, hoist them to before the class so we can be sure
 * that they are evaluated in order.
 */
function applyEnsureOrdering(
  path: NodePath<t.ClassExpression | t.ObjectExpression>,
) {
  // TODO: This should probably also hoist computed properties.
  const decorators: t.Decorator[] = (
    path.isClass()
      ? [
          path,
          ...(path.get("body.body") as NodePath<ClassDecoratableElement>[]),
        ]
      : path.get("properties")
  ).reduce(
    (acc: t.Decorator[], prop) =>
      acc.concat(
        (
          prop as NodePath<
            t.ObjectMember | t.ClassExpression | ClassDecoratableElement
          >
        ).node.decorators || [],
      ),
    [],
  );

  const identDecorators = decorators.filter(
    decorator => !t.isIdentifier(decorator.expression),
  );
  if (identDecorators.length === 0) return;

  return t.sequenceExpression(
    identDecorators
      .map((decorator): t.Expression => {
        const expression = decorator.expression;
        const id = (decorator.expression =
          path.scope.generateDeclaredUidIdentifier("dec"));
        return t.assignmentExpression("=", id, expression);
      })
      .concat([path.node]),
  );
}

/**
 * Given a class expression with class-level decorators, create a new expression
 * with the proper decorated behavior.
 */
function applyClassDecorators(classPath: NodePath<t.ClassExpression>) {
  if (!hasClassDecorators(classPath.node)) return;

  const decorators = classPath.node.decorators || [];
  classPath.node.decorators = null;

  const name = classPath.scope.generateDeclaredUidIdentifier("class");

  return decorators
    .map(dec => dec.expression)
    .reverse()
    .reduce(function (acc, decorator) {
      return buildClassDecorator({
        CLASS_REF: t.cloneNode(name),
        DECORATOR: t.cloneNode(decorator),
        INNER: acc,
      }).expression;
    }, classPath.node);
}

function hasClassDecorators(classNode: t.Class) {
  return !!classNode.decorators?.length;
}

/**
 * Given a class expression with method-level decorators, create a new expression
 * with the proper decorated behavior.
 */
function applyMethodDecorators(
  path: NodePath<t.ClassExpression>,
  state: PluginPass,
) {
  if (!hasMethodDecorators(path.node.body.body)) return;

  return applyTargetDecorators(
    path,
    state,
    // @ts-expect-error ClassAccessorProperty is not supported in legacy decorator
    path.node.body.body,
  );
}

function hasMethodDecorators(
  body: t.ClassBody["body"] | t.ObjectExpression["properties"],
) {
  return body.some(
    node =>
      // @ts-expect-error decorators not in SpreadElement/StaticBlock
      node.decorators?.length,
  );
}

/**
 * Given an object expression with property decorators, create a new expression
 * with the proper decorated behavior.
 */
function applyObjectDecorators(
  path: NodePath<t.ObjectExpression>,
  state: PluginPass,
) {
  if (!hasMethodDecorators(path.node.properties)) return;

  return applyTargetDecorators(
    path,
    state,
    path.node.properties.filter(
      (prop): prop is t.ObjectMember => prop.type !== "SpreadElement",
    ),
  );
}

/**
 * A helper to pull out property decorators into a sequence expression.
 */
function applyTargetDecorators(
  path: NodePath<t.ClassExpression | t.ObjectExpression>,
  state: PluginPass,
  decoratedProps: (t.ObjectMember | ClassDecoratableElement)[],
) {
  const name = path.scope.generateDeclaredUidIdentifier(
    path.isClass() ? "class" : "obj",
  );

  const exprs = decoratedProps.reduce(function (acc, node) {
    let decorators: t.Decorator[] = [];
    if (node.decorators != null) {
      decorators = node.decorators;
      node.decorators = null;
    }

    if (decorators.length === 0) return acc;

    if (
      // @ts-expect-error computed is not in ClassPrivateProperty
      node.computed
    ) {
      throw path.buildCodeFrameError(
        "Computed method/property decorators are not yet supported.",
      );
    }

    const property: t.Literal = t.isLiteral(node.key)
      ? node.key
      : t.stringLiteral(
          // @ts-expect-error: should we handle ClassPrivateProperty?
          node.key.name,
        );

    const target =
      path.isClass() && !(node as ClassDecoratableElement).static
        ? buildClassPrototype({
            CLASS_REF: name,
          }).expression
        : name;

    if (t.isClassProperty(node, { static: false })) {
      const descriptor = path.scope.generateDeclaredUidIdentifier("descriptor");

      const initializer = node.value
        ? t.functionExpression(
            null,
            [],
            t.blockStatement([t.returnStatement(node.value)]),
          )
        : t.nullLiteral();

      node.value = t.callExpression(
        state.addHelper("initializerWarningHelper"),
        [descriptor, t.thisExpression()],
      );

      WARNING_CALLS.add(node.value);

      acc.push(
        t.assignmentExpression(
          "=",
          t.cloneNode(descriptor),
          t.callExpression(state.addHelper("applyDecoratedDescriptor"), [
            t.cloneNode(target),
            t.cloneNode(property),
            t.arrayExpression(
              decorators.map(dec => t.cloneNode(dec.expression)),
            ),
            t.objectExpression([
              t.objectProperty(
                t.identifier("configurable"),
                t.booleanLiteral(true),
              ),
              t.objectProperty(
                t.identifier("enumerable"),
                t.booleanLiteral(true),
              ),
              t.objectProperty(
                t.identifier("writable"),
                t.booleanLiteral(true),
              ),
              t.objectProperty(t.identifier("initializer"), initializer),
            ]),
          ]),
        ),
      );
    } else {
      acc.push(
        t.callExpression(state.addHelper("applyDecoratedDescriptor"), [
          t.cloneNode(target),
          t.cloneNode(property),
          t.arrayExpression(decorators.map(dec => t.cloneNode(dec.expression))),
          t.isObjectProperty(node) || t.isClassProperty(node, { static: true })
            ? buildGetObjectInitializer({
                TEMP: path.scope.generateDeclaredUidIdentifier("init"),
                TARGET: t.cloneNode(target),
                PROPERTY: t.cloneNode(property),
              }).expression
            : buildGetDescriptor({
                TARGET: t.cloneNode(target),
                PROPERTY: t.cloneNode(property),
              }).expression,
          t.cloneNode(target),
        ]),
      );
    }

    return acc;
  }, []);

  return t.sequenceExpression([
    t.assignmentExpression("=", t.cloneNode(name), path.node),
    t.sequenceExpression(exprs),
    t.cloneNode(name),
  ]);
}

function decoratedClassToExpression({ node, scope }: NodePath<t.Class>) {
  if (!hasClassDecorators(node) && !hasMethodDecorators(node.body.body)) {
    return;
  }

  const ref = node.id
    ? t.cloneNode(node.id)
    : scope.generateUidIdentifier("class");

  return t.variableDeclaration("let", [
    t.variableDeclarator(ref, t.toExpression(node)),
  ]);
}

const visitor: Visitor<PluginPass> = {
  ExportDefaultDeclaration(path) {
    const decl = path.get("declaration");
    if (!decl.isClassDeclaration()) return;

    const replacement = decoratedClassToExpression(decl);
    if (replacement) {
      const [varDeclPath] = path.replaceWithMultiple([
        replacement,
        t.exportNamedDeclaration(null, [
          t.exportSpecifier(
            // @ts-expect-error todo(flow->ts) might be add more specific return type for decoratedClassToExpression
            t.cloneNode(replacement.declarations[0].id),
            t.identifier("default"),
          ),
        ]),
      ]);

      if (!decl.node.id) {
        path.scope.registerDeclaration(varDeclPath);
      }
    }
  },
  ClassDeclaration(path) {
    const replacement = decoratedClassToExpression(path);
    if (replacement) {
      const [newPath] = path.replaceWith(replacement);

      const decl = newPath.get("declarations.0");
      const id = decl.node.id as t.Identifier;

      // TODO: Maybe add this logic to @babel/traverse
      const binding = path.scope.getOwnBinding(id.name);
      binding.identifier = id;
      binding.path = decl;
    }
  },
  ClassExpression(path, state) {
    // Create a replacement for the class node if there is one. We do one pass to replace classes with
    // class decorators, and a second pass to process method decorators.
    const decoratedClass =
      applyEnsureOrdering(path) ||
      applyClassDecorators(path) ||
      applyMethodDecorators(path, state);

    if (decoratedClass) path.replaceWith(decoratedClass);
  },
  ObjectExpression(path, state) {
    const decoratedObject =
      applyEnsureOrdering(path) || applyObjectDecorators(path, state);

    if (decoratedObject) path.replaceWith(decoratedObject);
  },

  AssignmentExpression(path, state) {
    if (!WARNING_CALLS.has(path.node.right)) return;

    path.replaceWith(
      t.callExpression(state.addHelper("initializerDefineProperty"), [
        // @ts-expect-error todo(flow->ts) typesafe NodePath.get
        t.cloneNode(path.get("left.object").node),
        t.stringLiteral(
          // @ts-expect-error todo(flow->ts) typesafe NodePath.get
          path.get("left.property").node.name ||
            // @ts-expect-error todo(flow->ts) typesafe NodePath.get
            path.get("left.property").node.value,
        ),
        // @ts-expect-error todo(flow->ts)
        t.cloneNode(path.get("right.arguments")[0].node),
        // @ts-expect-error todo(flow->ts)
        t.cloneNode(path.get("right.arguments")[1].node),
      ]),
    );
  },

  CallExpression(path, state) {
    if (path.node.arguments.length !== 3) return;
    if (!WARNING_CALLS.has(path.node.arguments[2])) return;

    // If the class properties plugin isn't enabled, this line will add an unused helper
    // to the code. It's not ideal, but it's ok since the configuration is not valid anyway.
    // @ts-expect-error todo(flow->ts) check that `callee` is Identifier
    if (path.node.callee.name !== state.addHelper("defineProperty").name) {
      return;
    }

    path.replaceWith(
      t.callExpression(state.addHelper("initializerDefineProperty"), [
        t.cloneNode(path.get("arguments")[0].node),
        t.cloneNode(path.get("arguments")[1].node),
        // @ts-expect-error todo(flow->ts)
        t.cloneNode(path.get("arguments.2.arguments")[0].node),
        // @ts-expect-error todo(flow->ts)
        t.cloneNode(path.get("arguments.2.arguments")[1].node),
      ]),
    );
  },
};

export default visitor;
