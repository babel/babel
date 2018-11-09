import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  const bodyIdentifierVisitor = {
    Identifier(path) {
      const { substitutionsMap } = this;
      const { name } = path.node;
      const subName = substitutionsMap.get(name);
      if (typeof subName === "undefined") {
        path.replaceWith(t.identifier(subName));
      }
    },
  };

  const clauses = [];

  // every when clause will create a "virtual" scope
  const WhenClauseVisitor = {
    WhenClause(path) {
      function generateTestExpr(expr, pattern, substitutionsMap) {
        if (t.isRegExpLiteral(pattern)) {
          return template.expression(`
        (EXPR instanceof RegExp) && REG.test(EXPR)
      `)({
            EXPR: expr,
            REG: pattern,
          });
        } else if (
          t.isNullLiteral(pattern) ||
          t.isStringLiteral(pattern) ||
          t.isBooleanLiteral(pattern) ||
          t.isNumericLiteral(pattern) ||
          t.isIdentifier(pattern)
        ) {
          return t.binaryExpression("===", expr, pattern);
        } else if (t.isObjectMatchPattern(pattern)) {
          return generateObjectTestExpr(expr, pattern, substitutionsMap);
        } else if (t.isArrayMatchPattern(pattern)) {
          return generateArrayTestExpr(expr, pattern, substitutionsMap);
        } else {
          throw new Error("Unexpected clause");
        }
      }

      function generateObjectTestExpr(expr, objPattern, substitutionsMap) {
        const objectId = template.expression(`Object.is(EXPR)`)({
          EXPR: expr,
        });

        const test = objPattern.properties.reduce((acc, property) => {
          const bindingId = path.scope.generateUidIdentifier(property.key.name);
          substitutionsMap.set(property.key.name, bindingId.name);

          return template.expression(
            `LEFT && (BINDING_ID = EXPR, typeof BINDING_ID !== "undefined")`,
          )({
            LEFT: acc,
            EXPR: expr,
            BINDING_ID: bindingId,
          });
        }, objectId);

        // TODO: new scope variable and assignement

        return template.expression(`
        Object.is(EXPR) && DEEPER_EXPR
      `)({
          EXPR: expr,
          DEEPER_EXPR: test,
        });
      }

      function generateArrayTestExpr(expr, arrayPattern, substitutionsMap) {
        return template.expression(`
        Array.isArray(EXPR) && DEEPER_EXPR
      `)({
          EXPR: expr,
          DEEPER_EXPR: generateArrayTestExpr(expr, pattern, substitutionsMap),
        });
      }

      const substitutionsMap = new Map();
      const { pattern, body } = path.node;
      const { caseId } = this;
      const test = generateTestExpr(caseId, pattern, substitutionsMap);
      path.traverse(bodyIdentifierVisitor, { substitutionsMap });
      clauses.push({
        test,
        body,
        substitutionsMap,
      });
    },
  };

  return {
    inherits: syntaxPatternMatching,
    visitor: {
      CaseStatement(path) {
        const { discriminant } = path.node;
        const caseId = path.scope.generateUidIdentifier("case");
        path.traverse(WhenClauseVisitor, { caseId });
        const variableDeclaration = t.variableDeclaration("let", [
          t.variableDeclarator(caseId, discriminant),
        ]);

        const ids = [];
        let ifStatement;
        let lastStatement;
        clauses.forEach(({ test, body, substitutionsMap }) => {
          for (const id of substitutionsMap.keys()) {
            ids.push(id);
          }
          if (typeof ifStatement === "undefined") {
            lastStatement = ifStatement = t.ifStatement(test, body, null);
          } else {
            const newStmt = t.ifStatement(test, body, null);
            lastStatement.alternate = newStmt;
            lastStatement = newStmt;
          }
        });

        ids.forEach(id => {
          variableDeclaration.declarations.push(
            t.variableDeclarator(t.identifier(id), null),
          );
        });

        path.replaceWithMultiple([variableDeclaration, ifStatement]);
      },
    },
  };
});
