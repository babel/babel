import nameFunction from "babel-helper-function-name";
import template from "babel-template";
import syntaxClassProperties from "babel-plugin-syntax-class-properties";

export default function({ types: t }) {
  const findBareSupers = {
    Super(path) {
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        this.push(path.parentPath);
      }
    },

    Class(path) {
      path.skip();
    },

    Function(path) {
      if (path.isArrowFunctionExpression()) return;
      path.skip();
    },
  };

  const collisionVisitor = {
    TypeAnnotation(path) {
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

      if (computed) continue;

      const name = t.isIdentifier(key) ? key.name : key.value;
      const seen =
        propNames[
          path.isClassPrivateProperty()
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
    Class(path) {
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
      if (!parentPath.isMemberExpression({ property: node, computed: false })) {
        throw path.buildCodeFrameError(
          `illegal syntax. Did you mean \`this.#${node.id.name}\`?`,
        );
      }

      if (!this.privateProps[node.id.name]) {
        throw path.buildCodeFrameError(`unknown private property`);
      }
    },
  };

  const privateNameRemapper = {
    PrivateName(path) {
      const { node, parent, parentPath, scope } = path;
      if (node.id.name !== this.name) {
        return;
      }

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

        const call = t.clone(grandParentPath.node);
        call.callee = t.memberExpression(replaceWith, t.identifier("call"));
        call.arguments.unshift(memo || object);

        replacePath = grandParentPath;
        replaceWith = call;
      }

      replacePath.replaceWith(replaceWith);
    },

    Class(path) {
      path.skip();
    },
  };

  const privateNameRemapperLoose = {
    PrivateName(path) {
      const { parentPath, node } = path;
      if (node.id.name !== this.name) {
        return;
      }

      parentPath.node.computed = true;
      path.replaceWith(this.privateName);
    },

    Class(path) {
      path.skip();
    },
  };

  const buildPublicProperty = template(`
    Object.defineProperty(REF, KEY, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: VALUE
    });
  `);

  const buildPrivateProperty = template(`
    Object.defineProperty(REF, KEY, {
      // configurable is false by default
      // enumerable is false by default
      writable: true,
      value: VALUE
    });
  `);

  function buildPublicClassPropertySpec(ref, prop) {
    const { key, value, computed } = prop.node;
    return buildPublicProperty({
      REF: ref,
      KEY: t.isIdentifier(key) && !computed ? t.stringLiteral(key.name) : key,
      VALUE: value || prop.scope.buildUndefinedNode(),
    });
  }

  function buildPublicClassPropertyLoose(ref, prop) {
    const { key, value, computed } = prop.node;
    return t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(ref, key, computed || t.isLiteral(key)),
        value || prop.scope.buildUndefinedNode(),
      ),
    );
  }

  function buildPrivateClassPropertySpec(ref, prop, klass, nodes) {
    const { node } = prop;
    const { name } = node.key;
    const { file } = klass.hub;
    const privateMap = klass.scope.generateDeclaredUidIdentifier(name);

    klass.traverse(privateNameRemapper, {
      name,
      privateMap,
      get: file.addHelper("privateClassPropertyGetSpec"),
      put: file.addHelper("privateClassPropertyPutSpec"),
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
        node.value || klass.scope.buildUndefinedNode(),
      ]),
    );
  }

  function buildPrivateClassPropertyLoose(ref, prop, klass, nodes) {
    const { key, value } = prop.node;
    const { name } = key;
    const { file } = klass.hub;
    const privateName = klass.scope.generateDeclaredUidIdentifier(name);

    klass.traverse(privateNameRemapperLoose, { name, privateName });

    nodes.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          privateName,
          t.callExpression(file.addHelper("privateClassPropertyKey"), [
            t.stringLiteral(name),
          ]),
        ),
      ),
    );

    return buildPrivateProperty({
      REF: ref,
      KEY: privateName,
      VALUE: value || prop.scope.buildUndefinedNode(),
    });
  }

  return {
    inherits: syntaxClassProperties,

    visitor: {
      Class(path, state) {
        const buildPublicClassProperty = state.opts.loose
          ? buildPublicClassPropertyLoose
          : buildPublicClassPropertySpec;
        const buildPrivateClassProperty = state.opts.loose
          ? buildPrivateClassPropertyLoose
          : buildPrivateClassPropertySpec;
        const isDerived = !!path.node.superClass;

        const instanceProps = [];
        const staticProps = [];
        const body = path.get("body");
        const { scope } = path;

        const propNames = {
          publicProps: Object.create(null),
          publicStaticProps: Object.create(null),
          privateProps: Object.create(null),
          instanceProps,
          staticProps,
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

        const nodes = [];
        let instanceBody = [];

        for (const prop of staticProps) {
          if (prop.isClassPrivateProperty()) {
            nodes.push(buildPrivateClassProperty(ref, prop, path, nodes));
          } else {
            nodes.push(buildPublicClassProperty(ref, prop));
          }
        }

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
                buildPrivateClassProperty(thisRef, prop, path, nodes),
              );
            } else {
              instanceBody.push(buildPublicClassProperty(thisRef, prop));
            }
          }

          if (extract) {
            const initialisePropsRef = scope.generateUidIdentifier(
              "initialiseProps",
            );

            nodes.push(
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

        if (!nodes.length) return;

        if (path.isClassExpression()) {
          scope.push({ id: ref });
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

      PrivateName(path) {
        throw path.buildCodeFrameError(
          "PrivateName is illegal outside ClassBody",
        );
      },

      ArrowFunctionExpression(path) {
        const classExp = path.get("body");
        if (!classExp.isClassExpression()) return;

        const body = classExp.get("body");
        const members = body.get("body");
        if (members.some(member => member.isProperty())) {
          path.ensureBlock();
        }
      },
    },
  };
}
