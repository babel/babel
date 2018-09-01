import { declare } from "@babel/helper-plugin-utils";
import nameFunction from "@babel/helper-function-name";
import syntaxClassProperties from "@babel/plugin-syntax-class-properties";
import { template, traverse, types as t } from "@babel/core";
import { environmentVisitor } from "@babel/helper-replace-supers";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;

  const findBareSupers = traverse.visitors.merge([
    {
      Super(path) {
        const { node, parentPath } = path;
        if (parentPath.isCallExpression({ callee: node })) {
          this.push(parentPath);
        }
      },
    },
    environmentVisitor,
  ]);

  const referenceVisitor = {
    "TSTypeAnnotation|TypeAnnotation"(path) {
      path.skip();
    },

    ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.scope.rename(path.node.name);
        path.skip();
      }
    },
  };

  const classFieldDefinitionEvaluationTDZVisitor = traverse.visitors.merge([
    {
      ReferencedIdentifier(path) {
        if (
          this.classBinding &&
          this.classBinding === path.scope.getBinding(path.node.name)
        ) {
          const classNameTDZError = this.file.addHelper("classNameTDZError");
          const throwNode = t.callExpression(classNameTDZError, [
            t.stringLiteral(path.node.name),
          ]);

          path.replaceWith(t.sequenceExpression([throwNode, path.node]));
          path.skip();
        }
      },
    },
    environmentVisitor,
  ]);

  // Traverses the class scope, handling private name references.  If an inner
  // class redeclares the same private name, it will hand off traversal to the
  // restricted visitor (which doesn't traverse the inner class's inner scope).
  const privateNameVisitor = {
    PrivateName(path) {
      const { name } = this;
      const { node, parentPath } = path;

      if (!parentPath.isMemberExpression({ property: node })) return;
      if (node.id.name !== name) return;
      this.handle(parentPath);
    },

    Class(path) {
      const { name } = this;
      const body = path.get("body.body");

      for (const prop of body) {
        if (!prop.isClassPrivateProperty()) continue;
        if (prop.node.key.id.name !== name) continue;

        // This class redeclares the private name.
        // So, we can only evaluate the things in the outer scope.
        path.traverse(privateNameInnerVisitor, this);
        path.skip();
        break;
      }
    },
  };

  // Traverses the outer portion of a class, without touching the class's inner
  // scope, for private names.
  const privateNameInnerVisitor = traverse.visitors.merge([
    {
      PrivateName: privateNameVisitor.PrivateName,
    },
    environmentVisitor,
  ]);

  const privateNameHandlerSpec = {
    memoise(member, count) {
      const { scope } = member;
      const { object } = member.node;

      const memo = scope.maybeGenerateMemoised(object);
      if (!memo) {
        return;
      }

      this.memoiser.set(object, memo, count);
    },

    receiver(member) {
      const { object } = member.node;

      if (this.memoiser.has(object)) {
        return t.cloneNode(this.memoiser.get(object));
      }

      return t.cloneNode(object);
    },

    get(member) {
      const { map, file } = this;

      return t.callExpression(file.addHelper("classPrivateFieldGet"), [
        this.receiver(member),
        t.cloneNode(map),
      ]);
    },

    set(member, value) {
      const { map, file } = this;

      return t.callExpression(file.addHelper("classPrivateFieldSet"), [
        this.receiver(member),
        t.cloneNode(map),
        value,
      ]);
    },

    call(member, args) {
      // The first access (the get) should do the memo assignment.
      this.memoise(member, 1);

      return optimiseCall(this.get(member), this.receiver(member), args);
    },
  };

  const privateNameHandlerLoose = {
    handle(member) {
      const { prop, file } = this;
      const { object } = member.node;

      member.replaceWith(
        template.expression`BASE(REF, PROP)[PROP]`({
          BASE: file.addHelper("classPrivateFieldLooseBase"),
          REF: object,
          PROP: prop,
        }),
      );
    },
  };

  const staticPrivatePropertyHandlerSpec = {
    ...privateNameHandlerSpec,

    get(member) {
      const { file, name, privateClassId, classRef } = this;

      return t.callExpression(
        file.addHelper("classStaticPrivateFieldSpecGet"),
        [
          this.receiver(member),
          classRef,
          privateClassId,
          t.stringLiteral(name),
        ],
      );
    },

    set(member, value) {
      const { file, name, privateClassId, classRef } = this;

      return t.callExpression(
        file.addHelper("classStaticPrivateFieldSpecSet"),
        [
          this.receiver(member),
          classRef,
          privateClassId,
          t.stringLiteral(name),
          value,
        ],
      );
    },

    call(member, args) {
      // The first access (the get) should do the memo assignment.
      this.memoise(member, 1);

      return optimiseCall(this.get(member), this.receiver(member), args);
    },
  };

  const staticPrivatePropertyHandlerLoose = {
    handle(member) {
      const { file, privateId, classRef } = this;
      member.replaceWith(
        template.expression`BASE(RECEIVER, CLASS).PRIVATE_ID`({
          BASE: file.addHelper("classStaticPrivateFieldLooseBase"),
          RECEIVER: member.node.object,
          CLASS: classRef,
          PRIVATE_ID: privateId,
        }),
      );
    },
  };

  function buildClassPropertySpec(ref, path, state) {
    const { scope } = path;
    const { key, value, computed } = path.node;
    return t.expressionStatement(
      t.callExpression(state.addHelper("defineProperty"), [
        ref,
        computed || t.isLiteral(key) ? key : t.stringLiteral(key.name),
        value || scope.buildUndefinedNode(),
      ]),
    );
  }

  function buildClassPropertyLoose(ref, path) {
    const { scope } = path;
    const { key, value, computed } = path.node;
    return t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(ref, key, computed || t.isLiteral(key)),
        value || scope.buildUndefinedNode(),
      ),
    );
  }

  function buildClassPrivatePropertySpec(ref, path, initNodes, state) {
    const { parentPath, scope } = path;
    const { name } = path.node.key.id;

    const map = scope.generateUidIdentifier(name);
    memberExpressionToFunctions(parentPath, privateNameVisitor, {
      name,
      map,
      file: state,
      ...privateNameHandlerSpec,
    });

    initNodes.push(
      template.statement`var MAP = new WeakMap();`({
        MAP: map,
      }),
    );

    // Must be late evaluated in case it references another private field.
    return () =>
      template.statement`
        MAP.set(REF, {
          // configurable is always false for private elements
          // enumerable is always false for private elements
          writable: true,
          value: VALUE
        });
      `({
        MAP: map,
        REF: ref,
        VALUE: path.node.value || scope.buildUndefinedNode(),
      });
  }

  function buildClassPrivatePropertyLoose(ref, path, initNodes, state) {
    const { parentPath, scope } = path;
    const { name } = path.node.key.id;

    const prop = scope.generateUidIdentifier(name);

    parentPath.traverse(privateNameVisitor, {
      name,
      prop,
      file: state,
      ...privateNameHandlerLoose,
    });

    initNodes.push(
      template.statement`var PROP = HELPER(NAME);`({
        PROP: prop,
        HELPER: state.addHelper("classPrivateFieldLooseKey"),
        NAME: t.stringLiteral(name),
      }),
    );

    // Must be late evaluated in case it references another private field.
    return () =>
      template.statement`
      Object.defineProperty(REF, PROP, {
        // configurable is false by default
        // enumerable is false by default
        writable: true,
        value: VALUE
      });
    `({
        REF: ref,
        PROP: prop,
        VALUE: path.node.value || scope.buildUndefinedNode(),
      });
  }

  function buildClassStaticPrivatePropertySpec(
    ref,
    path,
    state,
    privateClassId,
  ) {
    const { scope, parentPath } = path;
    const { key, value } = path.node;
    const { name } = key.id;
    const staticNodesToAdd = [];

    if (!privateClassId) {
      // Create a private static "host" object if it does not exist
      privateClassId = path.scope.generateUidIdentifier(ref.name + "Statics");
      staticNodesToAdd.push(
        template.statement`const PRIVATE_CLASS_ID = Object.create(null);`({
          PRIVATE_CLASS_ID: privateClassId,
        }),
      );
    }

    memberExpressionToFunctions(parentPath, privateNameVisitor, {
      name,
      privateClassId,
      classRef: ref,
      file: state,
      ...staticPrivatePropertyHandlerSpec,
    });

    staticNodesToAdd.push(
      t.expressionStatement(
        t.callExpression(state.addHelper("defineProperty"), [
          privateClassId,
          t.stringLiteral(name),
          value || scope.buildUndefinedNode(),
        ]),
      ),
    );

    return [staticNodesToAdd, privateClassId];
  }

  function buildClassStaticPrivatePropertyLoose(ref, path, state) {
    const { scope, parentPath } = path;
    const { key, value } = path.node;
    const { name } = key.id;
    const privateId = scope.generateUidIdentifier(name);

    parentPath.traverse(privateNameVisitor, {
      name,
      privateId,
      classRef: ref,
      file: state,
      ...staticPrivatePropertyHandlerLoose,
    });

    const staticNodesToAdd = [
      template.statement`
        Object.defineProperty(OBJ, KEY, {
          value: VALUE,
          enumerable: false,
          configurable: false,
          writable: true
        });
      `({
        OBJ: ref,
        KEY: t.stringLiteral(privateId.name),
        VALUE: value || scope.buildUndefinedNode(),
      }),
    ];

    return [staticNodesToAdd];
  }

  const buildClassProperty = loose
    ? buildClassPropertyLoose
    : buildClassPropertySpec;

  const buildClassPrivateProperty = loose
    ? buildClassPrivatePropertyLoose
    : buildClassPrivatePropertySpec;

  const buildClassStaticPrivateProperty = loose
    ? buildClassStaticPrivatePropertyLoose
    : buildClassStaticPrivatePropertySpec;

  return {
    inherits: syntaxClassProperties,

    visitor: {
      Class(path, state) {
        const isDerived = !!path.node.superClass;
        let constructor;
        const props = [];
        const computedPaths = [];
        const privateNames = new Set();
        const body = path.get("body");

        for (const path of body.get("body")) {
          const { computed, decorators } = path.node;
          if (computed) {
            computedPaths.push(path);
          }
          if (decorators && decorators.length > 0) {
            throw path.buildCodeFrameError(
              "Decorators transform is necessary.",
            );
          }

          if (path.isClassPrivateProperty()) {
            const {
              key: {
                id: { name },
              },
            } = path.node;

            if (privateNames.has(name)) {
              throw path.buildCodeFrameError("Duplicate private field");
            }
            privateNames.add(name);
          }

          if (path.isProperty()) {
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
        const instanceBody = [];

        for (const computedPath of computedPaths) {
          computedPath.traverse(classFieldDefinitionEvaluationTDZVisitor, {
            classBinding:
              path.node.id && path.scope.getBinding(path.node.id.name),
            file: this.file,
          });

          const computedNode = computedPath.node;
          // Make sure computed property names are only evaluated once (upon class definition)
          // and in the right order in combination with static properties
          if (!computedPath.get("key").isConstantExpression()) {
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

        // Transform private props before publics.
        const privateMaps = [];
        const privateMapInits = [];
        for (const prop of props) {
          if (prop.isPrivate() && !prop.node.static) {
            const inits = [];
            privateMapInits.push(inits);

            privateMaps.push(
              buildClassPrivateProperty(t.thisExpression(), prop, inits, state),
            );
          }
        }
        let p = 0;
        let privateClassId;
        for (const prop of props) {
          if (prop.node.static) {
            if (prop.isPrivate()) {
              let staticNodesToAdd;
              [
                staticNodesToAdd,
                privateClassId,
              ] = buildClassStaticPrivateProperty(
                t.cloneNode(ref),
                prop,
                state,
                privateClassId,
              );
              staticNodes.push(...staticNodesToAdd);
            } else {
              staticNodes.push(
                buildClassProperty(t.cloneNode(ref), prop, state),
              );
            }
          } else if (prop.isPrivate()) {
            instanceBody.push(privateMaps[p]());
            staticNodes.push(...privateMapInits[p]);
            p++;
          } else {
            instanceBody.push(
              buildClassProperty(t.thisExpression(), prop, state),
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
                t.expressionStatement(
                  t.callExpression(t.super(), [
                    t.spreadElement(t.identifier("args")),
                  ]),
                ),
              );
            }
            [constructor] = body.unshiftContainer("body", newConstructor);
          }

          const state = { scope: constructor.scope };
          for (const prop of props) {
            if (prop.node.static) continue;
            prop.traverse(referenceVisitor, state);
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

        if (computedNodes.length === 0 && staticNodes.length === 0) return;

        if (path.isClassExpression()) {
          path.scope.push({ id: ref });
          path.replaceWith(
            t.assignmentExpression("=", t.cloneNode(ref), path.node),
          );
        } else if (!path.node.id) {
          // Anonymous class declaration
          path.node.id = ref;
        }

        path.insertBefore(computedNodes);
        path.insertAfter(staticNodes);
      },

      PrivateName(path) {
        throw path.buildCodeFrameError(`Unknown PrivateName "${path}"`);
      },
    },
  };
});
