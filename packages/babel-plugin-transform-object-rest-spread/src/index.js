import syntaxObjectRestSpread from "babel-plugin-syntax-object-rest-spread";

export default function({ types: t }) {
  function hasRestElement(path) {
    let foundRestElement = false;
    path.traverse({
      RestElement() {
        foundRestElement = true;
        path.stop();
      },
    });
    return foundRestElement;
  }

  function hasSpread(node) {
    for (const prop of node.properties) {
      if (t.isSpreadElement(prop)) {
        return true;
      }
    }
    return false;
  }

  // returns an array of all keys of an object, and a status flag indicating if all extracted keys
  // were converted to stringLiterals or not
  // e.g. extracts {keys: ["a", "b", "3", ++x], allLiteral: false }
  // from ast of {a: "foo", b, 3: "bar", [++x]: "baz"}
  function extractNormalizedKeys(path) {
    const props = path.node.properties;
    const keys = [];
    let allLiteral = true;

    for (const prop of props) {
      if (t.isIdentifier(prop.key) && !prop.computed) {
        // since a key {a: 3} is equivalent to {"a": 3}, use the latter
        keys.push(t.stringLiteral(prop.key.name));
      } else if (t.isLiteral(prop.key)) {
        keys.push(t.stringLiteral(String(prop.key.value)));
      } else {
        keys.push(prop.key);
        allLiteral = false;
      }
    }

    return { keys, allLiteral };
  }

  // replaces impure computed keys with new identifiers
  // and returns variable declarators of these new identifiers
  function replaceImpureComputedKeys(path) {
    const impureComputedPropertyDeclarators = [];
    for (const propPath of path.get("properties")) {
      const key = propPath.get("key");
      if (propPath.node.computed && !key.isPure()) {
        const identifier = path.scope.generateUidIdentifierBasedOnNode(
          key.node,
        );
        const declarator = t.variableDeclarator(identifier, key.node);
        impureComputedPropertyDeclarators.push(declarator);
        key.replaceWith(identifier);
      }
    }
    return impureComputedPropertyDeclarators;
  }

  //expects path to an object pattern
  function createObjectSpread(path, file, objRef) {
    const last = path.get("properties").pop(); // note: popping does not mean removal from path
    const restElement = t.clone(last.node);
    last.remove(); // remove restElement

    const impureComputedPropertyDeclarators = replaceImpureComputedKeys(path);
    const { keys, allLiteral } = extractNormalizedKeys(path);

    let keyExpression;
    if (!allLiteral) {
      // map to toPropertyKey to handle the possible non-string values
      keyExpression = t.callExpression(
        t.memberExpression(t.arrayExpression(keys), t.identifier("map")),
        [file.addHelper("toPropertyKey")],
      );
    } else {
      keyExpression = t.arrayExpression(keys);
    }

    return [
      impureComputedPropertyDeclarators,
      restElement.argument,
      t.callExpression(file.addHelper("objectWithoutProperties"), [
        objRef,
        keyExpression,
      ]),
    ];
  }

  function replaceRestElement(parentPath, paramPath, i, numParams) {
    if (paramPath.isAssignmentPattern()) {
      replaceRestElement(parentPath, paramPath.get("left"), i, numParams);
      return;
    }

    if (paramPath.isArrayPattern() && hasRestElement(paramPath)) {
      const elements = paramPath.get("elements");

      for (let i = 0; i < elements.length; i++) {
        replaceRestElement(parentPath, elements[i], i, elements.length);
      }
    }

    if (paramPath.isObjectPattern() && hasRestElement(paramPath)) {
      const uid = parentPath.scope.generateUidIdentifier("ref");

      const declar = t.variableDeclaration("let", [
        t.variableDeclarator(paramPath.node, uid),
      ]);

      parentPath.ensureBlock();
      parentPath.get("body").unshiftContainer("body", declar);
      paramPath.replaceWith(uid);
    }
  }

  return {
    inherits: syntaxObjectRestSpread,

    visitor: {
      // taken from transform-es2015-parameters/src/destructuring.js
      // function a({ b, ...c }) {}
      Function(path) {
        const params = path.get("params");
        for (let i = params.length - 1; i >= 0; i--) {
          replaceRestElement(params[i].parentPath, params[i], i, params.length);
        }
      },
      // adapted from transform-es2015-destructuring/src/index.js#pushObjectRest
      // const { a, ...b } = c;
      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }

        let insertionPath = path;

        path.get("id").traverse(
          {
            RestElement(path) {
              if (
                // skip single-property case, e.g.
                // const { ...x } = foo();
                // since the RHS will not be duplicated
                this.originalPath.node.id.properties.length > 1 &&
                !t.isIdentifier(this.originalPath.node.init)
              ) {
                // const { a, ...b } = foo();
                // to avoid calling foo() twice, as a first step convert it to:
                // const _foo = foo(),
                //       { a, ...b } = _foo;
                const initRef = path.scope.generateUidIdentifierBasedOnNode(
                  this.originalPath.node.init,
                  "ref",
                );
                // insert _foo = foo()
                this.originalPath.insertBefore(
                  t.variableDeclarator(initRef, this.originalPath.node.init),
                );
                // replace foo() with _foo
                this.originalPath.replaceWith(
                  t.variableDeclarator(this.originalPath.node.id, initRef),
                );

                return;
              }

              let ref = this.originalPath.node.init;
              const refPropertyPath = [];

              path.findParent(path => {
                if (path.isObjectProperty()) {
                  refPropertyPath.unshift(path.node.key.name);
                } else if (path.isVariableDeclarator()) {
                  return true;
                }
              });

              if (refPropertyPath.length) {
                refPropertyPath.forEach(prop => {
                  ref = t.memberExpression(ref, t.identifier(prop));
                });
              }

              const objectPatternPath = path.findParent(path =>
                path.isObjectPattern(),
              );
              const [
                impureComputedPropertyDeclarators,
                argument,
                callExpression,
              ] = createObjectSpread(objectPatternPath, file, ref);

              insertionPath.insertBefore(impureComputedPropertyDeclarators);

              insertionPath.insertAfter(
                t.variableDeclarator(argument, callExpression),
              );

              insertionPath = insertionPath.getSibling(insertionPath.key + 1);

              if (path.parentPath.node.properties.length === 0) {
                path
                  .findParent(
                    path =>
                      path.isObjectProperty() || path.isVariableDeclarator(),
                  )
                  .remove();
              }
            },
          },
          {
            originalPath: path,
          },
        );
      },
      // taken from transform-es2015-destructuring/src/index.js#visitor
      // export var { a, ...b } = c;
      ExportNamedDeclaration(path) {
        const declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        if (!hasRestElement(declaration)) return;

        const specifiers = [];

        for (const name in path.getOuterBindingIdentifiers(path)) {
          const id = t.identifier(name);
          specifiers.push(t.exportSpecifier(id, id));
        }

        // Split the declaration and export list into two declarations so that the variable
        // declaration can be split up later without needing to worry about not being a
        // top-level statement.
        path.replaceWith(declaration.node);
        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
      },
      // try {} catch ({a, ...b}) {}
      CatchClause(path) {
        const paramPath = path.get("param");
        replaceRestElement(paramPath.parentPath, paramPath);
      },
      // ({a, ...b} = c);
      AssignmentExpression(path, file) {
        const leftPath = path.get("left");
        if (leftPath.isObjectPattern() && hasRestElement(leftPath)) {
          const nodes = [];

          const ref = path.scope.generateUidIdentifierBasedOnNode(
            path.node.right,
            "ref",
          );

          nodes.push(
            t.variableDeclaration("var", [
              t.variableDeclarator(ref, path.node.right),
            ]),
          );

          const [
            impureComputedPropertyDeclarators,
            argument,
            callExpression,
          ] = createObjectSpread(leftPath, file, ref);

          if (impureComputedPropertyDeclarators.length > 0) {
            nodes.push(
              t.variableDeclaration("var", impureComputedPropertyDeclarators),
            );
          }

          const nodeWithoutSpread = t.clone(path.node);
          nodeWithoutSpread.right = ref;
          nodes.push(t.expressionStatement(nodeWithoutSpread));
          nodes.push(
            t.toStatement(
              t.assignmentExpression("=", argument, callExpression),
            ),
          );

          if (ref) {
            nodes.push(t.expressionStatement(ref));
          }

          path.replaceWithMultiple(nodes);
        }
      },
      // taken from transform-es2015-destructuring/src/index.js#visitor
      ForXStatement(path) {
        const { node, scope } = path;
        const leftPath = path.get("left");
        const left = node.left;

        // for ({a, ...b} of []) {}
        if (t.isObjectPattern(left) && hasRestElement(leftPath)) {
          const temp = scope.generateUidIdentifier("ref");

          node.left = t.variableDeclaration("var", [
            t.variableDeclarator(temp),
          ]);

          path.ensureBlock();

          node.body.body.unshift(
            t.variableDeclaration("var", [t.variableDeclarator(left, temp)]),
          );

          return;
        }

        if (!t.isVariableDeclaration(left)) return;

        const pattern = left.declarations[0].id;
        if (!t.isObjectPattern(pattern)) return;

        const key = scope.generateUidIdentifier("ref");
        node.left = t.variableDeclaration(left.kind, [
          t.variableDeclarator(key, null),
        ]);

        path.ensureBlock();

        node.body.body.unshift(
          t.variableDeclaration(node.left.kind, [
            t.variableDeclarator(pattern, key),
          ]),
        );
      },
      // var a = { ...b, ...c }
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        const useBuiltIns = file.opts.useBuiltIns || false;
        if (typeof useBuiltIns !== "boolean") {
          throw new Error(
            "transform-object-rest-spread currently only accepts a boolean " +
              "option for useBuiltIns (defaults to false)",
          );
        }

        const args = [];
        let props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        for (const prop of (path.node.properties: Array)) {
          if (t.isSpreadElement(prop)) {
            push();
            args.push(prop.argument);
          } else {
            props.push(prop);
          }
        }

        push();

        if (!t.isObjectExpression(args[0])) {
          args.unshift(t.objectExpression([]));
        }

        const helper = useBuiltIns
          ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
          : file.addHelper("extends");

        path.replaceWith(t.callExpression(helper, args));
      },
    },
  };
}
