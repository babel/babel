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

  function makeTest(path, id, pattern, isRoot) {
    let arrayTest;

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
          const subTest = makeTest(path, newId, patternNode, false);

          arrayTest = t.logicalExpression("&&", arrayTest, subTest);
        });

        return arrayTest;
      case "Identifier":
        if (isRoot) {
          return t.binaryExpression("===", id, pattern);
        } else {
          return t.binaryExpression(
            "!==",
            id,
            path.scope.buildUndefinedNode(), // undefined node
          );
        }
      // TODO:
      // case "ObjectMatchPattern":
      // case "ObjectPropertyMatchPattern":
      default:
        return t.booleanLiteral(true);
    }
  }

  function extractAllIdentifier(pattern, set) {
    switch (pattern.type) {
      case "ArrayMatchPattern":
        pattern.children.forEach(val => extractAllIdentifier(val, set));
        break;
      case "ObjectMatchPattern":
        pattern.children.forEach(val => extractAllIdentifier(val.value, set));
        break;
      case "Identifier":
        set.add(pattern.name);
        break;
    }
  }

  function makeClosure(clause) {
    let body;
    if (clause.expression) {
      body = t.blockStatement([t.returnStatement(clause.body)], []);
    } else {
      body = clause.body;
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

  function generateIDDefines(set) {
    const result = [];

    for (const item of set) {
      const expr = t.variableDeclaration("let", [
        t.variableDeclarator(t.identifier(item), null),
      ]);
      result.push(expr);
    }
    return result;
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

        // extract all identifier begin
        let id_set = new Set();

        path.node.clauses.forEach(clause => {
          const pattern = clause.pattern;
          extractAllIdentifier(pattern, id_set);
        });

        const exprs = generateIDDefines(id_set);

        id_set = null; // release set;
        // end

        path.node.clauses.forEach((clause, index) => {
          if (index === 0) {
            lastTree = mainIfTree = t.ifStatement(
              makeTest(path, match_expression_id, clause.pattern, true),
              makeClosure(clause),
              null,
            );
          } else {
            const newIfTree = t.ifStatement(
              makeTest(path, match_expression_id, clause.pattern, true),
              makeClosure(clause),
              null,
            );
            lastTree.alternate = newIfTree;
            lastTree = newIfTree;
          }
        });

        const bodyExpr = t.blockStatement(
          first_statements_group.concat([...exprs, mainIfTree]),
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
