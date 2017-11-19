import nameFunction from "@babel/helper-function-name";
import syntaxClassProperties from "@babel/plugin-syntax-class-properties";
import { template, types as t } from "@babel/core";

export default function(api, options) {
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

  const buildClassPropertySpec = (ref, { key, value, computed }, scope) => {
    return template.statement`
      Object.defineProperty(REF, KEY, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: VALUE
      });
    `({
      REF: ref,
      KEY: t.isIdentifier(key) && !computed ? t.stringLiteral(key.name) : key,
      VALUE: value || scope.buildUndefinedNode(),
    });
  };

  const buildClassPropertyLoose = (ref, { key, value, computed }, scope) => {
    return template.statement`MEMBER = VALUE`({
      MEMBER: t.memberExpression(ref, key, computed || t.isLiteral(key)),
      VALUE: value || scope.buildUndefinedNode(),
    });
  };

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
        const computedPaths = [];
        const body = path.get("body");

        for (const path of body.get("body")) {
          if (path.node.computed) {
            computedPaths.push(path);
          }

          if (path.isClassProperty()) {
            props.push(path);
          } else if (path.isClassMethod({ kind: "constructor" })) {
            constructor = path;
          }
        }

        if (!props.length) return;

        let ref;

        if (path.isClassExpression() || !path.node.id) {
          nameFunction(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          // path.isClassDeclaration() && path.node.id
          ref = path.node.id;
        }

        const computedNodes = [];
        const staticNodes = [];
        let instanceBody = [];

        /**
         * Helper function to run a statement before an expression by replacing it with a comma expression
         * and wrapping the statement in an IIFE as the first operand.
         */
        function statementBeforeExpression(statement, expression) {
          return t.sequenceExpression([
            t.callExpression(
              t.functionExpression(null, [], t.blockStatement([statement])),
              [],
            ),
            expression,
          ]);
        }

        const ClassFieldDefinitionEvaluationTDZ = classRef => ({
          Expression(path) {
            if (path.parentKey === "value") {
              path.skip();
            }
          },

          ReferencedIdentifier(path) {
            if (classRef === path.scope.getBinding(path.node.name)) {
              const throwNode = t.throwStatement(
                t.newExpression(t.identifier("Error"), [
                  t.stringLiteral(
                    `Class cannot be referenced in computed property keys.`,
                  ),
                ]),
              );

              path.replaceWith(statementBeforeExpression(throwNode, path.node));
              path.skip();
            }
          },
        });

        for (const computedPath of computedPaths) {
          const computedNode = computedPath.node;
          // Make sure computed property names are only evaluated once (upon class definition)
          // and in the right order in combination with static properties
          if (!computedPath.get("key").isConstantExpression()) {
            computedPath.traverse(
              ClassFieldDefinitionEvaluationTDZ(
                path.scope.getBinding(ref.name),
              ),
            );
            const ident = path.scope.generateUidIdentifierBasedOnNode(
              computedNode.key,
            );
            computedNodes.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(ident, computedNode.key),
              ]),
            );
            computedNode.key = t.clone(ident);
          }
        }

        for (const prop of props) {
          const propNode = prop.node;
          if (propNode.decorators && propNode.decorators.length > 0) continue;

          if (propNode.static) {
            staticNodes.push(buildClassProperty(ref, propNode, path.scope));
          } else {
            instanceBody.push(
              buildClassProperty(t.thisExpression(), propNode, path.scope),
            );
          }
        }

        const nodes = computedNodes.concat(staticNodes);

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
