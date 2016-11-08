export default function ({ types: t }) {
  function hasRestProperty(node) {
    for (let property of (node.properties)) {
      if (t.isRestProperty(property)) {
        return true;
      }
    }
  }

  function variableDeclarationHasRestProperty(node) {
    for (let declar of (node.declarations)) {
      if (t.isObjectPattern(declar.id)) {
        return hasRestProperty(declar.id);
      }
    }
    return false;
  }

  function hasSpread(node) {
    for (let prop of (node.properties)) {
      if (t.isSpreadProperty(prop)) {
        return true;
      }
    }
    return false;
  }

  function createObjectSpread(file, props, objRef) {
    const restProperty = props.pop();

    let keys = [];
    for (let prop of props) {
      let key = prop.key;
      if (t.isIdentifier(key) && !prop.computed) {
        key = t.stringLiteral(prop.key.name);
      }
      keys.push(key);
    }

    return t.variableDeclarator(
      restProperty.argument,
      t.callExpression(
        file.addHelper("objectWithoutProperties"), [
          objRef,
          t.arrayExpression(keys)
        ]
      )
    );
  }

  return {
    inherits: require("babel-plugin-syntax-object-rest-spread"),

    visitor: {
      // taken from transform-es2015-parameters/src/destructuring.js
      Function(path) {
        let params = path.get("params");

        for (let i = 0; i < params.length; i++) {
          let param = params[i];
          if (param.isObjectPattern() && hasRestProperty(param.node)) {
            let uid = path.scope.generateUidIdentifier("ref");

            let declar = t.variableDeclaration("let", [
              t.variableDeclarator(param.node, uid)
            ]);
            declar._blockHoist = params.length - i;

            path.ensureBlock();
            path.get("body").unshiftContainer("body", declar);

            param.replaceWith(uid);
          }
        }
      },
      // adapted from transform-es2015-destructuring/src/index.js#pushObjectRest
      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) { return; }
        const kind = path.parentPath.node.kind;
        let nodes = [];

        path.traverse({
          RestProperty(path) {
            if (!this.originalPath.node) {
              return;
            }

            let ref = this.originalPath.node.init;

            path.findParent((path) => {
              if (path.isObjectProperty()) {
                ref = t.memberExpression(ref, t.identifier(path.node.key.name));
              } else if (path.isVariableDeclarator()) {
                return true;
              }
            });

            nodes.push(
              createObjectSpread(
                file,
                path.parentPath.node.properties,
                ref
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
      ExportNamedDeclaration(path) {
        let declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        if (!variableDeclarationHasRestProperty(declaration.node)) return;

        let specifiers = [];

        for (let name in path.getOuterBindingIdentifiers(path)) {
          let id = t.identifier(name);
          specifiers.push(t.exportSpecifier(id, id));
        }

        // Split the declaration and export list into two declarations so that the variable
        // declaration can be split up later without needing to worry about not being a
        // top-level statement.
        path.replaceWith(declaration.node);
        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
      },
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        let useBuiltIns = file.opts.useBuiltIns || false;
        if (typeof useBuiltIns !== "boolean") {
          throw new Error("transform-object-rest-spread currently only accepts a boolean option for useBuiltIns (defaults to false)");
        }

        let args = [];
        let props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        for (let prop of (path.node.properties: Array)) {
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
