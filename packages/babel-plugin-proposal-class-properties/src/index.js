import { declare } from "@babel/helper-plugin-utils";
import nameFunction from "@babel/helper-function-name";
import syntaxClassProperties from "@babel/plugin-syntax-class-properties";
import { template, types as t } from "@babel/core";

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;

  const findBareSupers = {
    Super(path) {
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        this.push(path.parentPath);
      }
    },

    ClassBody(path) {
      path.skip();
    },

    Function(path) {
      if (path.isArrowFunctionExpression()) return;
      path.skip();
    },
  };

  const collisionVisitor = {
    "TSTypeAnnotation|TypeAnnotation"(path) {
      path.skip();
    },
    ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.collision = true;
        path.stop();
      }
    },
  };

  const remapThisVisitor = {
    ThisExpression(path) {
      path.replaceWith(this.thisRef);
    },

    Function(path) {
      if (path.isArrowFunctionExpression()) return;
      path.skip();
    },
  };

  function collectPropertiesVisitor(body, propNames) {
    for (const path of body.get("body")) {
      if (path.isClassMethod({ kind: "constructor" })) {
        propNames.constructor = path;
        continue;
      }

      if (!path.isProperty()) continue;

      const { key, computed, static: isStatic } = path.node;
      propNames[isStatic ? "staticProps" : "instanceProps"].push(path);

      if (computed) {
        propNames.computedPaths.push(path);
        continue;
      }

      const isPrivate = path.isClassPrivateProperty();
      const name = isPrivate
        ? key.id.name
        : t.isIdentifier(key) ? key.name : key.value;
      const seen =
        propNames[
          isPrivate
            ? "privateProps"
            : isStatic ? "publicStaticProps" : "publicProps"
        ];
      if (seen[name]) {
        throw path.buildCodeFrameError("duplicate class field");
      }
      seen[name] = true;
    }
  }

  const staticErrorVisitor = {
    ClassBody(path) {
      path.skip();
    },

    ClassProperty(path) {
      const { computed, key, static: isStatic } = path.node;
      if (computed || !isStatic) return;

      const name = t.isIdentifier(key) ? key.name : key.value;
      if (name === "prototype") {
        throw path.buildCodeFrameError("illegal static class field");
      }
    },

    PrivateName(path) {
      const { parentPath, node } = path;
      if (parentPath.isMemberExpression({ property: node, computed: false })) {
        if (!this.privateProps[node.id.name]) {
          throw path.buildCodeFrameError("unknown private property");
        }

        return;
      }

      if (parentPath.isClassPrivateProperty({ key: node })) return;

      throw path.buildCodeFrameError(
        `illegal syntax. Did you mean \`this.#${node.id.name}\`?`,
      );
    },
  };

  const privateNameRemapper = {
    PrivateName(path) {
      const { node, parent, parentPath, scope } = path;
      if (node.id.name !== this.name) {
        return;
      }
      if (!parentPath.isMemberExpression()) return;

      const grandParentPath = parentPath.parentPath;
      const { object } = parent;

      let replacePath = parentPath;
      let replaceWith = t.callExpression(this.get, [object, this.privateMap]);

      if (
        grandParentPath.isAssignmentExpression() ||
        grandParentPath.isUpdateExpression()
      ) {
        const { node } = grandParentPath;
        let assign;
        let memo;
        let postfix;

        if (grandParentPath.isAssignmentExpression({ operator: "=" })) {
          assign = node.right;
        } else {
          const { right, operator } = node;
          memo = scope.maybeGenerateMemoised(object);

          if (memo) {
            replaceWith.arguments[0] = memo;
            memo = t.assignmentExpression("=", memo, object);
          }

          if (grandParentPath.isUpdateExpression({ prefix: false })) {
            postfix = scope.generateUidIdentifierBasedOnNode(parent);
            scope.push({ id: postfix });
            replaceWith = t.assignmentExpression(
              "=",
              postfix,
              t.unaryExpression("+", replaceWith),
            );
          }

          assign = t.binaryExpression(
            operator.slice(0, -1),
            replaceWith,
            right || t.numericLiteral(1),
          );
        }

        replacePath = grandParentPath;
        replaceWith = t.callExpression(this.put, [
          memo || object,
          this.privateMap,
          assign,
        ]);

        if (postfix) {
          replaceWith = t.sequenceExpression([replaceWith, postfix]);
        }
      } else if (grandParentPath.isCallExpression({ callee: parent })) {
        const memo = scope.maybeGenerateMemoised(object);
        if (memo) {
          replaceWith.arguments[0] = t.assignmentExpression("=", memo, object);
        }

        const call = t.cloneNode(grandParentPath.node);
        call.callee = t.memberExpression(replaceWith, t.identifier("call"));
        call.arguments.unshift(memo || object);

        replacePath = grandParentPath;
        replaceWith = call;
      }

      replacePath.replaceWith(replaceWith);
    },

    ClassBody(path) {
      path.skip();
    },
  };

  const privateNameRemapperLoose = {
    PrivateName(path) {
      const { parentPath, node } = path;
      if (node.id.name !== this.name) {
        return;
      }
      if (!parentPath.isMemberExpression()) return;

      const object = parentPath.get("object");

      object.replaceWith(
        t.callExpression(this.base, [object.node, this.privateKey]),
      );
      parentPath.node.computed = true;
      path.replaceWith(this.privateKey);
    },

    ClassBody(path) {
      path.skip();
    },
  };

  const ClassFieldDefinitionEvaluationTDZVisitor = {
    Expression(path) {
      if (path === this.shouldSkip) {
        path.skip();
      }
    },

    ReferencedIdentifier(path) {
      if (this.classRef === path.scope.getBinding(path.node.name)) {
        const classNameTDZError = this.file.addHelper("classNameTDZError");
        const throwNode = t.callExpression(classNameTDZError, [
          t.stringLiteral(path.node.name),
        ]);

        path.replaceWith(t.sequenceExpression([throwNode, path.node]));
        path.skip();
      }
    },
  };

  const buildPublicClassPropertySpec = (ref, prop) => {
    const { key, value, computed } = prop.node;
    return template.statement`
      Object.defineProperty(REF, KEY, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: VALUE
      });
    `({
      REF: t.cloneNode(ref),
      KEY: t.isIdentifier(key) && !computed ? t.stringLiteral(key.name) : key,
      VALUE: value || prop.scope.buildUndefinedNode(),
    });
  };

  const buildPublicClassPropertyLoose = (ref, prop) => {
    const { key, value, computed } = prop.node;
    return template.statement`MEMBER = VALUE`({
      MEMBER: t.memberExpression(
        t.cloneNode(ref),
        key,
        computed || t.isLiteral(key),
      ),
      VALUE: value || prop.scope.buildUndefinedNode(),
    });
  };

  const buildPrivateClassPropertySpec = (ref, prop, classBody, nodes) => {
    const { node } = prop;
    const { name } = node.key.id;
    const { file } = classBody.hub;
    const privateMap = classBody.scope.generateDeclaredUidIdentifier(name);

    classBody.traverse(privateNameRemapper, {
      name,
      privateMap,
      get: file.addHelper("classPrivateFieldGet"),
      put: file.addHelper("classPrivateFieldPut"),
    });

    nodes.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          privateMap,
          t.newExpression(t.identifier("WeakMap"), []),
        ),
      ),
    );

    return t.expressionStatement(
      t.callExpression(t.memberExpression(privateMap, t.identifier("set")), [
        ref,
        node.value || classBody.scope.buildUndefinedNode(),
      ]),
    );
  };

  const buildPrivateClassPropertyLoose = (ref, prop, classBody, nodes) => {
    const { key, value } = prop.node;
    const { name } = key.id;
    const { file } = classBody.hub;
    const privateKey = classBody.scope.generateDeclaredUidIdentifier(name);

    classBody.traverse(privateNameRemapperLoose, {
      name,
      privateKey,
      base: file.addHelper("classPrivateFieldBase"),
    });

    nodes.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          privateKey,
          t.callExpression(file.addHelper("classPrivateFieldKey"), [
            t.stringLiteral(name),
          ]),
        ),
      ),
    );

    return template.statement`
      Object.defineProperty(REF, KEY, {
        // configurable is false by default
        // enumerable is false by default
        writable: true,
        value: VALUE
      });
    `({
      REF: ref,
      KEY: privateKey,
      VALUE: value || prop.scope.buildUndefinedNode(),
    });
  };

  const buildPublicClassProperty = loose
    ? buildPublicClassPropertyLoose
    : buildPublicClassPropertySpec;

  const buildPrivateClassProperty = loose
    ? buildPrivateClassPropertyLoose
    : buildPrivateClassPropertySpec;

  return {
    inherits: syntaxClassProperties,

    visitor: {
      Class(path) {
        const isDerived = !!path.node.superClass;

        const instanceProps = [];
        const staticProps = [];
        const computedPaths = [];
        const body = path.get("body");
        const { scope } = path;

        const propNames = {
          publicProps: Object.create(null),
          publicStaticProps: Object.create(null),
          privateProps: Object.create(null),
          instanceProps,
          staticProps,
          computedPaths,
          constructor: null,
        };
        collectPropertiesVisitor(body, propNames);
        body.traverse(staticErrorVisitor, propNames);

        if (!instanceProps.length && !staticProps.length) return;

        let ref;
        if (path.isClassExpression() || !path.node.id) {
          nameFunction(path);
          ref = scope.generateUidIdentifier("class");
        } else {
          // path.isClassDeclaration() && path.node.id
          ref = path.node.id;
        }

        const computedNodes = [];
        const staticNodes = [];
        let instanceBody = [];

        for (const computedPath of computedPaths) {
          const computedNode = computedPath.node;
          // Make sure computed property names are only evaluated once (upon class definition)
          // and in the right order in combination with static properties
          if (!computedPath.get("key").isConstantExpression()) {
            computedPath.traverse(ClassFieldDefinitionEvaluationTDZVisitor, {
              classRef: path.scope.getBinding(ref.name),
              file: this.file,
              shouldSkip: computedPath.get("value"),
            });
            const ident = path.scope.generateUidIdentifierBasedOnNode(
              computedNode.key,
            );
            computedNodes.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(ident, computedNode.key),
              ]),
            );
            computedNode.key = t.cloneNode(ident);
          }
        }

        for (const prop of staticProps) {
          if (prop.isClassPrivateProperty()) {
            staticNodes.push(
              buildPrivateClassProperty(ref, prop, body, staticNodes),
            );
          } else {
            staticNodes.push(buildPublicClassProperty(ref, prop));
          }
        }

        const afterNodes = [...staticNodes];

        if (instanceProps.length) {
          let constructor = propNames.constructor;
          if (!constructor) {
            const newConstructor = t.classMethod(
              "constructor",
              t.identifier("constructor"),
              [],
              t.blockStatement([]),
            );
            if (isDerived) {
              newConstructor.body.body.push(
                t.returnStatement(
                  t.callExpression(t.super(), [
                    t.spreadElement(t.identifier("arguments")),
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
          const bareSupers = [];

          if (isDerived) {
            constructor.traverse(findBareSupers, bareSupers);
          }

          if (bareSupers.length <= 1) {
            for (const prop of instanceProps) {
              prop.traverse(collisionVisitor, collisionState);
              if (collisionState.collision) break;
            }
          }

          const extract = bareSupers.length > 1 || collisionState.collision;
          const thisRef = extract
            ? scope.generateUidIdentifier("this")
            : t.thisExpression();

          for (const prop of instanceProps) {
            if (extract) {
              prop.traverse(remapThisVisitor, { thisRef });
            }

            if (prop.isClassPrivateProperty()) {
              instanceBody.push(
                buildPrivateClassProperty(thisRef, prop, body, afterNodes),
              );
            } else {
              instanceBody.push(buildPublicClassProperty(thisRef, prop));
            }
          }

          if (extract) {
            const initialisePropsRef = scope.generateUidIdentifier(
              "initialiseProps",
            );

            afterNodes.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  initialisePropsRef,
                  t.functionExpression(
                    null,
                    [thisRef],
                    t.blockStatement(instanceBody),
                  ),
                ),
              ]),
            );

            instanceBody = [
              t.expressionStatement(
                t.callExpression(initialisePropsRef, [t.thisExpression()]),
              ),
            ];
          }

          if (bareSupers.length) {
            for (const bareSuper of bareSupers) {
              bareSuper.insertAfter(instanceBody);
            }
          } else {
            constructor.get("body").unshiftContainer("body", instanceBody);
          }
        }

        for (const prop of [...staticProps, ...instanceProps]) {
          prop.remove();
        }

        if (computedNodes.length === 0 && afterNodes.length === 0) return;

        if (path.isClassExpression()) {
          scope.push({ id: ref });
          path.replaceWith(
            t.assignmentExpression("=", t.cloneNode(ref), path.node),
          );
        } else if (!path.node.id) {
          // Anonymous class declaration
          path.node.id = ref;
        }

        path.insertBefore(computedNodes);
        path.insertAfter(afterNodes);
      },

      PrivateName(path) {
        throw path.buildCodeFrameError(
          "PrivateName is illegal outside ClassBody",
        );
      },
    },
  };
});
