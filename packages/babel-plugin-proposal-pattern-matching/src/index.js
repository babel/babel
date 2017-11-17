import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";

export default function({ types: t }) {
  function makeIsArrayTest(body) {
    return t.callExpression(
      t.memberExpression(t.identifier("Array"), t.identifier("isArray"), false),
      [body],
    );
  }

  function makeArrayLengthTest(id, length) {
    return t.binaryExpression(
      "===",
      t.memberExpression(id, t.identifier("length")),
      t.numericLiteral(length),
    );
  }

  function makeIsObjectTest(body) {
    return t.binaryExpression(
      "===",
      t.unaryExpression("typeof", body, true),
      t.stringLiteral("object"),
    );
  }

  function makeRestTest(id, keys) {
    if (!Array.isArray(keys) || keys.length === 0) {
      throw new Error(
        "The second param must be array, and its length must bigger than zero",
      );
    }

    let tree;
    keys.forEach((existKey, index) => {
      const expr = t.binaryExpression("!==", id, t.stringLiteral(existKey));
      if (index === 0) {
        tree = expr;
      } else {
        tree = t.logicalExpression("&&", tree, expr);
      }
    });
    return tree;
  }

  function makeTest(path, id, pattern, defines, isRoot) {
    let arrayTest;
    let objectTest;
    let objectPropTest;
    let objPropSubTest;
    let newId;
    let key_id;

    if (pattern === "else" && isRoot) {
      return null;
    }

    switch (pattern.type) {
      case "NumericLiteral":
      case "BigIntLiteral":
      case "StringLiteral":
      case "NullLiteral":
      case "BooleanLiteral":
        return t.binaryExpression("===", id, pattern);
        break;
      case "ArrayMatchPattern":
        arrayTest = makeIsArrayTest(id);

        if (!pattern.hasRest) {
          // if no `...`
          arrayTest = t.logicalExpression(
            "&&",
            arrayTest,
            makeArrayLengthTest(id, pattern.children.length),
          );
        }

        pattern.children.forEach((patternNode, index) => {
          const newId = t.memberExpression(
            id /* object */,
            t.numericLiteral(index) /* property */,
            true /* computed */,
          );
          const subTest = makeTest(path, newId, patternNode, defines, false);

          arrayTest = t.logicalExpression("&&", arrayTest, subTest);
        });

        return arrayTest;
      case "ObjectMatchPattern":
        objectTest = makeIsObjectTest(id);

        pattern.children.forEach(propPattern => {
          const subPropTest = makeTest(path, id, propPattern, defines, false);

          objectTest = t.logicalExpression("&&", objectTest, subPropTest);
        });

        if (pattern.restIdentifier !== null) {
          const exists_key = pattern.children.map(
            propPattern => propPattern.key.name,
          );

          // make a new object
          // iterate the matched key
          // check if the matched key in the old objects
          // if it's not, add it to the new object
          //
          // let $restID = {};
          //
          // for (let $key in id) {
          //  if ($key !== $key1 && $key !== $key2 && ...) {
          //    newobj[key] = id[key];
          //  }
          // }
          if (exists_key.length > 0) {
            defines.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  pattern.restIdentifier,
                  t.objectExpression([]),
                ),
              ]),
            );
            key_id = path.scope.generateUidIdentifier("key");

            defines.push(
              t.forInStatement(
                t.variableDeclaration("var", [
                  t.variableDeclarator(key_id, null),
                ]), // left
                id, // right
                t.ifStatement(
                  makeRestTest(key_id, exists_key),
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      t.memberExpression(pattern.restIdentifier, key_id, true),
                      t.memberExpression(id, key_id, true),
                    ),
                  ),
                ),
              ),
            );
          } else {
            // exists_key.length === 0
            defines.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  pattern.restIdentifier,
                  t.callExpression(
                    t.memberExpression(
                      t.identifier("Object"),
                      t.identifier("assign"),
                      false,
                    ),
                    [t.objectExpression([]), id],
                  ),
                ),
              ]),
            );
          }
        }

        return objectTest;
      case "ObjectPropertyMatchPattern":
        objectPropTest = t.callExpression(
          t.memberExpression(id, t.identifier("hasOwnProperty"), false),
          [t.stringLiteral(pattern.key.name)],
        );

        newId = t.memberExpression(id, pattern.key, false);
        if (pattern.value === null) {
          pattern.value = pattern.key;
        }
        objPropSubTest = makeTest(path, newId, pattern.value, defines, false);

        objectPropTest = t.logicalExpression(
          "&&",
          objectPropTest,
          objPropSubTest,
        );

        return objectPropTest;
      case "Identifier":
        if (isRoot) {
          return t.binaryExpression("===", id, pattern);
        } else {
          defines.push(
            t.variableDeclaration("const", [t.variableDeclarator(pattern, id)]),
          );
          return t.binaryExpression(
            "!==",
            id,
            path.scope.buildUndefinedNode(), // undefined node
          );
        }
    }
    throw new Error("Not a correct pattern");
  }

  function makeClosure(clause, defines) {
    if (!Array.isArray(defines)) {
      throw new Error("The second param of makeClosure must be an array");
    }
    let body;
    if (clause.expression) {
      body = t.blockStatement([...defines, t.returnStatement(clause.body)], []);
      if (defines.length === 0) {
        return t.returnStatement(clause.body);
      }
    } else {
      // a block statement
      body = t.blockStatement([...defines, ...clause.body.body], []);
    }
    return t.returnStatement(
      t.callExpression(
        t.functionExpression(
          null /* id */,
          [] /* params */,
          body /* body */,
          false /* generator */,
          false /* async */,
        ),
        [],
      ),
    );
  }

  return {
    inherits: syntaxPatternMatching,

    visitor: {
      MatchExpression(path) {
        let match_expression_id;
        let first_statements_group = [];

        // detect if it's necessary to create new identifier
        if (t.isIdentifier(path.node.expression)) {
          match_expression_id = path.node.expression;
        } else {
          match_expression_id = path.scope.generateUidIdentifier("match_expr");

          first_statements_group = [
            t.variableDeclaration("const", [
              t.variableDeclarator(match_expression_id, path.node.expression),
            ]),
          ];
        }

        let mainIfTree, lastTree;

        for (let i = 0; i < path.node.clauses.length; i++) {
          const clause = path.node.clauses[i];
          const index = i;

          const defines = [];
          let _test;
          let _closure;
          if (index === 0) {
            _test = makeTest(
              path,
              match_expression_id,
              clause.pattern,
              defines,
              true,
            );
            _closure = makeClosure(clause, defines);
            if (_test === null) {
              lastTree = mainIfTree = _closure;
              break;
            } else {
              lastTree = mainIfTree = t.ifStatement(_test, _closure, null);
            }
          } else {
            _test = makeTest(
              path,
              match_expression_id,
              clause.pattern,
              defines,
              true,
            );
            _closure = makeClosure(clause, defines);
            if (_test === null) {
              lastTree.alternate = _closure;
              break;
            } else {
              const newIfTree = t.ifStatement(_test, _closure, null);
              lastTree.alternate = newIfTree;
              lastTree = newIfTree;
            }
          }
        }

        const bodyExpr = t.blockStatement(
          first_statements_group.concat([mainIfTree]),
        );

        path.replaceWith(
          t.callExpression(
            t.arrowFunctionExpression(
              [], // params
              bodyExpr, // body
              false, // async
            ),
            [],
          ),
        );
      },
    },
  };
}
