// Fork of https://github.com/loganfsmyth/babel-plugin-proposal-decorators-legacy

import syntaxDecorators from "@babel/plugin-syntax-decorators";
import { template, types as t } from "@babel/core";

const buildClassDecorator = template(`
  DECORATOR(CLASS_REF = INNER) || CLASS_REF;
`);

const buildClassPrototype = template(`
  CLASS_REF.prototype;
`);

const buildGetDescriptor = template(`
    Object.getOwnPropertyDescriptor(TARGET, PROPERTY);
`);

const buildGetObjectInitializer = template(`
    (TEMP = Object.getOwnPropertyDescriptor(TARGET, PROPERTY), (TEMP = TEMP ? TEMP.value : undefined), {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function(){
            return TEMP;
        }
    })
`);

export default function() {
  const WARNING_CALLS = new WeakSet();

  /**
   * If the decorator expressions are non-identifiers, hoist them to before the class so we can be sure
   * that they are evaluated in order.
   */
  function applyEnsureOrdering(path) {
    // TODO: This should probably also hoist computed properties.
    const decorators = (path.isClass()
      ? [path].concat(path.get("body.body"))
      : path.get("properties")
    ).reduce((acc, prop) => acc.concat(prop.node.decorators || []), []);

    const identDecorators = decorators.filter(
      decorator => !t.isIdentifier(decorator.expression),
    );
    if (identDecorators.length === 0) return;

    return t.sequenceExpression(
      identDecorators
        .map(decorator => {
          const expression = decorator.expression;
          const id = (decorator.expression = path.scope.generateDeclaredUidIdentifier(
            "dec",
          ));
          return t.assignmentExpression("=", id, expression);
        })
        .concat([path.node]),
    );
  }

  /**
   * Given a class expression with class-level decorators, create a new expression
   * with the proper decorated behavior.
   */
  function applyClassDecorators(classPath) {
    if (!hasClassDecorators(classPath.node)) return;

    const decorators = classPath.node.decorators || [];
    classPath.node.decorators = null;

    const name = classPath.scope.generateDeclaredUidIdentifier("class");

    return decorators
      .map(dec => dec.expression)
      .reverse()
      .reduce(function(acc, decorator) {
        return buildClassDecorator({
          CLASS_REF: name,
          DECORATOR: decorator,
          INNER: acc,
        }).expression;
      }, classPath.node);
  }

  function hasClassDecorators(classNode) {
    return !!(classNode.decorators && classNode.decorators.length);
  }

  /**
   * Given a class expression with method-level decorators, create a new expression
   * with the proper decorated behavior.
   */
  function applyMethodDecorators(path, state) {
    if (!hasMethodDecorators(path.node.body.body)) return;

    return applyTargetDecorators(path, state, path.node.body.body);
  }

  function hasMethodDecorators(body) {
    return body.some(node => node.decorators && node.decorators.length);
  }

  /**
   * Given an object expression with property decorators, create a new expression
   * with the proper decorated behavior.
   */
  function applyObjectDecorators(path, state) {
    if (!hasMethodDecorators(path.node.properties)) return;

    return applyTargetDecorators(path, state, path.node.properties);
  }

  /**
   * A helper to pull out property decorators into a sequence expression.
   */
  function applyTargetDecorators(path, state, decoratedProps) {
    const name = path.scope.generateDeclaredUidIdentifier(
      path.isClass() ? "class" : "obj",
    );

    const exprs = decoratedProps.reduce(function(acc, node) {
      const decorators = node.decorators || [];
      node.decorators = null;

      if (decorators.length === 0) return acc;

      if (node.computed) {
        throw path.buildCodeFrameError(
          "Computed method/property decorators are not yet supported.",
        );
      }

      const property = t.isLiteral(node.key)
        ? node.key
        : t.stringLiteral(node.key.name);

      const target =
        path.isClass() && !node.static
          ? buildClassPrototype({
              CLASS_REF: name,
            }).expression
          : name;

      if (t.isClassProperty(node, { static: false })) {
        const descriptor = path.scope.generateDeclaredUidIdentifier(
          "descriptor",
        );

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

        acc = acc.concat([
          t.assignmentExpression(
            "=",
            descriptor,
            t.callExpression(state.addHelper("applyDecoratedDescriptor"), [
              target,
              property,
              t.arrayExpression(decorators.map(dec => dec.expression)),
              t.objectExpression([
                t.objectProperty(
                  t.identifier("enumerable"),
                  t.booleanLiteral(true),
                ),
                t.objectProperty(t.identifier("initializer"), initializer),
              ]),
            ]),
          ),
        ]);
      } else {
        acc = acc.concat(
          t.callExpression(state.addHelper("applyDecoratedDescriptor"), [
            target,
            property,
            t.arrayExpression(decorators.map(dec => dec.expression)),
            t.isObjectProperty(node) ||
            t.isClassProperty(node, { static: true })
              ? buildGetObjectInitializer({
                  TEMP: path.scope.generateDeclaredUidIdentifier("init"),
                  TARGET: target,
                  PROPERTY: property,
                }).expression
              : buildGetDescriptor({
                  TARGET: target,
                  PROPERTY: property,
                }).expression,
            target,
          ]),
        );
      }

      return acc;
    }, []);

    return t.sequenceExpression([
      t.assignmentExpression("=", name, path.node),
      t.sequenceExpression(exprs),
      name,
    ]);
  }

  return {
    inherits: syntaxDecorators,

    visitor: {
      ClassDeclaration(path) {
        const { node } = path;

        if (!hasClassDecorators(node) && !hasMethodDecorators(node.body.body)) {
          return;
        }

        const ref = node.id || path.scope.generateUidIdentifier("class");
        const letDeclaration = t.variableDeclaration("let", [
          t.variableDeclarator(ref, t.toExpression(node)),
        ]);

        if (path.parentPath.isExportDefaultDeclaration()) {
          // Split the class declaration and the export into two separate statements.
          path.parentPath.replaceWithMultiple([
            letDeclaration,
            t.exportNamedDeclaration(null, [
              t.exportSpecifier(ref, t.identifier("default")),
            ]),
          ]);
        } else {
          path.replaceWith(letDeclaration);
        }
      },
      ClassExpression(path, state) {
        // Create a replacement for the class node if there is one. We do one pass to replace classes with
        // class decorators, and a second pass to process method decorators.
        const decoratedClass =
          applyEnsureOrdering(path) ||
          applyClassDecorators(path, state) ||
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
            path.get("left.object").node,
            t.stringLiteral(path.get("left.property").node.name),
            path.get("right.arguments")[0].node,
            path.get("right.arguments")[1].node,
          ]),
        );
      },
    },
  };
}
