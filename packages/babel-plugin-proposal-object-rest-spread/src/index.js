import { declare } from "@babel/helper-plugin-utils";
import syntaxObjectRestSpread from "@babel/plugin-syntax-object-rest-spread";
import { types as t } from "@babel/core";

export default declare((api, opts) => {
  api.assertVersion(7);

  const { useBuiltIns = false, loose = false } = opts;

  if (typeof loose !== "boolean") {
    throw new Error(".loose must be a boolean, or undefined");
  }

  function hasRestElement(path) {
    let foundRestElement = false;
    visitRestElements(path, () => {
      foundRestElement = true;
      path.stop();
    });
    return foundRestElement;
  }

  function visitRestElements(path, visitor) {
    path.traverse({
      Expression(path) {
        const parentType = path.parent.type;
        if (
          (parentType == "AssignmentPattern" && path.key === "right") ||
          (parentType == "ObjectProperty" &&
            path.parent.computed &&
            path.key === "key")
        ) {
          path.skip();
        }
      },
      RestElement: visitor,
    });
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
        keys.push(t.cloneNode(prop.key));
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
        const name = path.scope.generateUidBasedOnNode(key.node);
        const declarator = t.variableDeclarator(t.identifier(name), key.node);
        impureComputedPropertyDeclarators.push(declarator);
        key.replaceWith(t.identifier(name));
      }
    }
    return impureComputedPropertyDeclarators;
  }

  //expects path to an object pattern
  function createObjectSpread(path, file, objRef) {
    const props = path.get("properties");
    const last = props[props.length - 1];
    t.assertRestElement(last.node);
    const restElement = t.cloneNode(last.node);
    last.remove();

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
        t.cloneNode(objRef),
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
      paramPath.replaceWith(t.cloneNode(uid));
    }
  }

  return {
    inherits: syntaxObjectRestSpread,

    visitor: {
      // taken from transform-parameters/src/destructuring.js
      // function a({ b, ...c }) {}
      Function(path) {
        const params = path.get("params");
        for (let i = params.length - 1; i >= 0; i--) {
          replaceRestElement(params[i].parentPath, params[i], i, params.length);
        }
      },
      // adapted from transform-destructuring/src/index.js#pushObjectRest
      // const { a, ...b } = c;
      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }

        let insertionPath = path;
        const originalPath = path;

        visitRestElements(path.get("id"), path => {
          if (!path.parentPath.isObjectPattern()) {
            // Return early if the parent is not an ObjectPattern, but
            // (for example) an ArrayPattern or Function, because that
            // means this RestElement is an not an object property.
            return;
          }

          if (
            // skip single-property case, e.g.
            // const { ...x } = foo();
            // since the RHS will not be duplicated
            originalPath.node.id.properties.length > 1 &&
            !t.isIdentifier(originalPath.node.init)
          ) {
            // const { a, ...b } = foo();
            // to avoid calling foo() twice, as a first step convert it to:
            // const _foo = foo(),
            //       { a, ...b } = _foo;
            const initRef = path.scope.generateUidIdentifierBasedOnNode(
              originalPath.node.init,
              "ref",
            );
            // insert _foo = foo()
            originalPath.insertBefore(
              t.variableDeclarator(initRef, originalPath.node.init),
            );
            // replace foo() with _foo
            originalPath.replaceWith(
              t.variableDeclarator(originalPath.node.id, t.cloneNode(initRef)),
            );

            return;
          }

          let ref = originalPath.node.init;
          const refPropertyPath = [];
          let kind;

          path.findParent(path => {
            if (path.isObjectProperty()) {
              refPropertyPath.unshift(path.node.key.name);
            } else if (path.isVariableDeclarator()) {
              kind = path.parentPath.node.kind;
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

          t.assertIdentifier(argument);

          insertionPath.insertBefore(impureComputedPropertyDeclarators);

          insertionPath.insertAfter(
            t.variableDeclarator(argument, callExpression),
          );

          insertionPath = insertionPath.getSibling(insertionPath.key + 1);

          path.scope.registerBinding(kind, insertionPath);

          if (objectPatternPath.node.properties.length === 0) {
            objectPatternPath
              .findParent(
                path => path.isObjectProperty() || path.isVariableDeclarator(),
              )
              .remove();
          }
        });
      },
      // taken from transform-destructuring/src/index.js#visitor
      // export var { a, ...b } = c;
      ExportNamedDeclaration(path) {
        const declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;

        const hasRest = declaration
          .get("declarations")
          .some(path => hasRestElement(path.get("id")));
        if (!hasRest) return;

        const specifiers = [];

        for (const name in path.getOuterBindingIdentifiers(path)) {
          specifiers.push(
            t.exportSpecifier(t.identifier(name), t.identifier(name)),
          );
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

          const refName = path.scope.generateUidBasedOnNode(
            path.node.right,
            "ref",
          );

          nodes.push(
            t.variableDeclaration("var", [
              t.variableDeclarator(t.identifier(refName), path.node.right),
            ]),
          );

          const [
            impureComputedPropertyDeclarators,
            argument,
            callExpression,
          ] = createObjectSpread(leftPath, file, t.identifier(refName));

          if (impureComputedPropertyDeclarators.length > 0) {
            nodes.push(
              t.variableDeclaration("var", impureComputedPropertyDeclarators),
            );
          }

          const nodeWithoutSpread = t.cloneNode(path.node);
          nodeWithoutSpread.right = t.identifier(refName);
          nodes.push(t.expressionStatement(nodeWithoutSpread));
          nodes.push(
            t.toStatement(
              t.assignmentExpression("=", argument, callExpression),
            ),
          );
          nodes.push(t.expressionStatement(t.identifier(refName)));

          path.replaceWithMultiple(nodes);
        }
      },
      // taken from transform-destructuring/src/index.js#visitor
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
            t.variableDeclaration("var", [
              t.variableDeclarator(left, t.cloneNode(temp)),
            ]),
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
            t.variableDeclarator(pattern, t.cloneNode(key)),
          ]),
        );
      },
      // var a = { ...b, ...c }
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        const args = [];
        let props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        if (t.isSpreadElement(path.node.properties[0])) {
          args.push(t.objectExpression([]));
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

        let helper;
        if (loose) {
          helper = useBuiltIns
            ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
            : file.addHelper("extends");
        } else {
          helper = file.addHelper("objectSpread");
        }

        path.replaceWith(t.callExpression(helper, args));
      },
    },
  };
});
