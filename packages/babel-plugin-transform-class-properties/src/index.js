import nameFunction from "@babel/helper-function-name";
import template from "@babel/template";
import syntaxClassProperties from "@babel/plugin-syntax-class-properties";

export default function({ types: t }, options) {
  const { loose } = options;

  const findBareSupers = {
    Super(path) {
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        this.push(path.parentPath);
      }
    },
  };

  const referenceVisitor = {
    "TSTypeAnnotation|TypeAnnotation"(path) {
      path.skip();
    },
    ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.collision = true;
        path.skip();
      }
    },
  };

  const buildObjectDefineProperty = template(`
    Object.defineProperty(REF, KEY, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: VALUE
    });
  `);

  const buildClassPropertySpec = (ref, { key, value, computed }, scope) =>
    buildObjectDefineProperty({
      REF: ref,
      KEY: t.isIdentifier(key) && !computed ? t.stringLiteral(key.name) : key,
      VALUE: value ? value : scope.buildUndefinedNode(),
    });

  const buildClassPropertyLoose = (ref, { key, value, computed }, scope) =>
    t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(ref, key, computed || t.isLiteral(key)),
        value ? value : scope.buildUndefinedNode(),
      ),
    );

  const buildClassProperty = loose
    ? buildClassPropertyLoose
    : buildClassPropertySpec;

  return {
    inherits: syntaxClassProperties,

    visitor: {
      Class(path) {
        const isDerived = !!path.node.superClass;
        let constructor;
        const props = [];
        const body = path.get("body");

        for (const path of body.get("body")) {
          if (path.isClassProperty()) {
            props.push(path);
          } else if (path.isClassMethod({ kind: "constructor" })) {
            constructor = path;
          }
        }

        if (!props.length) return;

        const nodes = [];
        let ref;

        if (path.isClassExpression() || !path.node.id) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          // path.isClassDeclaration() && path.node.id
          ref = path.node.id;
        }

        let instanceBody = [];

        for (const prop of props) {
          const propNode = prop.node;
          if (propNode.decorators && propNode.decorators.length > 0) continue;

          const isStatic = propNode.static;

          if (isStatic) {
            nodes.push(buildClassProperty(ref, propNode, path.scope));
          } else {
            // Make sure computed property names are only evaluated once (upon
            // class definition).
            if (propNode.computed) {
              const ident = path.scope.generateUidIdentifierBasedOnNode(
                propNode.key,
              );
              nodes.push(
                t.variableDeclaration("var", [
                  t.variableDeclarator(ident, propNode.key),
                ]),
              );
              propNode.key = ident;
            }

            instanceBody.push(
              buildClassProperty(t.thisExpression(), propNode, path.scope),
            );
          }
        }

        if (instanceBody.length) {
          if (!constructor) {
            const newConstructor = t.classMethod(
              "constructor",
              t.identifier("constructor"),
              [],
              t.blockStatement([]),
            );
            if (isDerived) {
              newConstructor.params = [t.restElement(t.identifier("args"))];
              newConstructor.body.body.push(
                t.returnStatement(
                  t.callExpression(t.super(), [
                    t.spreadElement(t.identifier("args")),
                  ]),
                ),
              );
            }
            [constructor] = body.unshiftContainer("body", newConstructor);
          }

          const collisionState = {
            collision: false,
            scope: constructor.scope,
          };

          for (const prop of props) {
            prop.traverse(referenceVisitor, collisionState);
            if (collisionState.collision) break;
          }

          if (collisionState.collision) {
            const initialisePropsRef = path.scope.generateUidIdentifier(
              "initialiseProps",
            );

            nodes.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  initialisePropsRef,
                  t.functionExpression(
                    null,
                    [],
                    t.blockStatement(instanceBody),
                  ),
                ),
              ]),
            );

            instanceBody = [
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(initialisePropsRef, t.identifier("call")),
                  [t.thisExpression()],
                ),
              ),
            ];
          }

          //

          if (isDerived) {
            const bareSupers = [];
            constructor.traverse(findBareSupers, bareSupers);
            for (const bareSuper of bareSupers) {
              bareSuper.insertAfter(instanceBody);
            }
          } else {
            constructor.get("body").unshiftContainer("body", instanceBody);
          }
        }

        for (const prop of props) {
          prop.remove();
        }

        if (!nodes.length) return;

        if (path.isClassExpression()) {
          path.scope.push({ id: ref });
          path.replaceWith(t.assignmentExpression("=", ref, path.node));
        } else {
          // path.isClassDeclaration()
          if (!path.node.id) {
            path.node.id = ref;
          }

          if (path.parentPath.isExportDeclaration()) {
            path = path.parentPath;
          }
        }

        path.insertAfter(nodes);
      },
    },
  };
}
