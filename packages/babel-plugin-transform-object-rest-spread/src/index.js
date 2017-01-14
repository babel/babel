export default function ({ types: t }) {
  function hasRestProperty(path) {
    let foundRestProperty = false;
    path.traverse({
      RestProperty() {
        foundRestProperty = true;
        path.stop();
      }
    });
    return foundRestProperty;
  }

  function hasSpread(node) {
    for (const prop of (node.properties)) {
      if (t.isSpreadProperty(prop)) {
        return true;
      }
    }
    return false;
  }

  function createObjectSpread(file, props, objRef) {
    const restProperty = props.pop();

    const keys = [];
    for (const prop of props) {
      let key = prop.key;
      if (t.isIdentifier(key) && !prop.computed) {
        key = t.stringLiteral(prop.key.name);
      }
      keys.push(key);
    }

    return [
      restProperty.argument,
      t.callExpression(
        file.addHelper("objectWithoutProperties"), [
          objRef,
          t.arrayExpression(keys)
        ]
      )
    ];
  }

  function replaceRestProperty(paramsPath, i, numParams) {
    if (paramsPath.isObjectPattern() && hasRestProperty(paramsPath)) {
      const parentPath = paramsPath.parentPath;
      const uid = parentPath.scope.generateUidIdentifier("ref");

      const declar = t.variableDeclaration("let", [
        t.variableDeclarator(paramsPath.node, uid)
      ]);
      declar._blockHoist = i ? numParams - i : 1;

      parentPath.ensureBlock();
      parentPath.get("body").unshiftContainer("body", declar);
      paramsPath.replaceWith(uid);
    }
  }

  return {
    inherits: require("babel-plugin-syntax-object-rest-spread"),

    visitor: {
      // taken from transform-es2015-parameters/src/destructuring.js
      // function a({ b, ...c }) {}
      Function(path) {
        const params = path.get("params");
        for (let i = 0; i < params.length; i++) {
          replaceRestProperty(params[i], i, params.length);
        }
      },
      // adapted from transform-es2015-destructuring/src/index.js#pushObjectRest
      // const { a, ...b } = c;
      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) { return; }
        const kind = path.parentPath.node.kind;
        const nodes = [];

        path.traverse({
          RestProperty(path) {
            let ref = this.originalPath.node.init;

            path.findParent((path) => {
              if (path.isObjectProperty()) {
                ref = t.memberExpression(ref, t.identifier(path.node.key.name));
              } else if (path.isVariableDeclarator()) {
                return true;
              }
            });

            const [ argument, callExpression ] = createObjectSpread(
              file,
              path.parentPath.node.properties,
              ref
            );

            nodes.push(
              t.variableDeclarator(
                argument,
                callExpression
              )
            );

            if (path.parentPath.node.properties.length === 0) {
              path.findParent(
                (path) => path.isObjectProperty() || path.isVariableDeclaration()
              ).remove();
            }
          }
        },{
          originalPath: path
        });

        if (nodes.length > 0) {
          path.parentPath.getSibling(path.parentPath.key + 1)
            .insertBefore(
            t.variableDeclaration(kind, nodes)
          );
        }
      },
      // taken from transform-es2015-destructuring/src/index.js#visitor
      // export var { a, ...b } = c;
      ExportNamedDeclaration(path) {
        const declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        if (!hasRestProperty(declaration)) return;

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
        replaceRestProperty(path.get("param"));
      },
      // ({a, ...b} = c);
      AssignmentExpression(path, file) {
        const leftPath = path.get("left");
        if (leftPath.isObjectPattern() && hasRestProperty(leftPath)) {
          const nodes = [];

          let ref;
          if (path.isCompletionRecord() || path.parentPath.isExpressionStatement()) {
            ref = path.scope.generateUidIdentifierBasedOnNode(path.node.right, "ref");

            nodes.push(t.variableDeclaration("var", [
              t.variableDeclarator(ref, path.node.right)
            ]));
          }

          const [ argument, callExpression ] = createObjectSpread(
            file,
            path.node.left.properties,
            ref
          );

          const nodeWithoutSpread = t.clone(path.node);
          nodeWithoutSpread.right = ref;
          nodes.push(t.expressionStatement(nodeWithoutSpread));
          nodes.push(t.toStatement(t.assignmentExpression(
            "=",
            argument,
            callExpression
          )));

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
        if (t.isObjectPattern(left) && hasRestProperty(leftPath)) {
          const temp = scope.generateUidIdentifier("ref");

          node.left = t.variableDeclaration("var", [
            t.variableDeclarator(temp)
          ]);

          path.ensureBlock();

          node.body.body.unshift(t.variableDeclaration("var", [
            t.variableDeclarator(left, temp)
          ]));

          return;
        }

        if (!t.isVariableDeclaration(left)) return;

        const pattern = left.declarations[0].id;
        if (!t.isObjectPattern(pattern)) return;

        const key = scope.generateUidIdentifier("ref");
        node.left = t.variableDeclaration(left.kind, [
          t.variableDeclarator(key, null)
        ]);

        path.ensureBlock();

        node.body.body.unshift(
          t.variableDeclaration(node.left.kind, [
            t.variableDeclarator(pattern, key)
          ])
        );
      },
      // var a = { ...b, ...c }
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        const useBuiltIns = file.opts.useBuiltIns || false;
        if (typeof useBuiltIns !== "boolean") {
          throw new Error("transform-object-rest-spread currently only accepts a boolean option for useBuiltIns (defaults to false)");
        }

        const args = [];
        let props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        for (const prop of (path.node.properties: Array)) {
          if (t.isSpreadProperty(prop)) {
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

        const helper = useBuiltIns ?
          t.memberExpression(t.identifier("Object"), t.identifier("assign")) :
          file.addHelper("extends");

        path.replaceWith(t.callExpression(helper, args));
      }
    }
  };
}
