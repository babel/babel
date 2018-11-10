import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "../../babel-core";

export default declare(api => {
  api.assertVersion(7);

  const identifierSubstitueVisitor = {
    Identifier(path) {
      const { substitutionsMap } = this;
      const { name } = path.node;
      const subName = substitutionsMap.get(name);
      if (typeof subName !== "undefined") {
        path.replaceWith(t.identifier(subName));
      }
    },
  };

  const clauses = [];

  // every when clause will create a "virtual" scope
  const WhenClauseVisitor = {
    WhenClause(path) {
      function generateTestExpr(expr, pattern, substitutionsMap) {
        if (
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
          throw new Error("Syntax Error: not a Match Pattern");
        }
      }

      function generateObjectTestExpr(expr, objPattern, substitutionsMap) {
        const objectId = template.expression(`Object.is(EXPR)`)({
          EXPR: expr,
        });

        return objPattern.properties.reduce((acc, property) => {
          let bindingId;
          const { key, element } = property;
          if (element && t.isIdentifier(element)) {
            bindingId = path.scope.generateUidIdentifier(element.name);
            substitutionsMap.set(element.name, bindingId.name);
          } else {
            bindingId = path.scope.generateUidIdentifier(key.name);
            substitutionsMap.set(key.name, bindingId.name);
          }

          let test;

          if (element && !t.isIdentifier(element)) {
            test = generateTestExpr(bindingId, element, substitutionsMap);
          } else {
            test = template.expression(`typeof BINDING_ID !== "undefined"`)({
              BINDING_ID: bindingId,
            });
          }

          return template.expression(`LEFT && (BINDING_ID = EXPR.PROP, TEST)`)({
            LEFT: acc,
            EXPR: expr,
            PROP: property.key,
            BINDING_ID: bindingId,
            TEST: test,
          });
        }, objectId);
      }

      function generateArrayTestExpr(expr, arrayPattern, substitutionsMap) {
        const base = template.expression(`Array.isArray(EXPR)`)({
          EXPR: expr,
        });
        return arrayPattern.elements.reduce((acc, element, index) => {
          const subExpr = t.memberExpression(
            expr,
            t.numericLiteral(index),
            true,
          );
          if (t.isIdentifier(element)) {
            const bindingId = path.scope.generateUidIdentifier(element.name);
            substitutionsMap.set(element.name, bindingId.name);
            return template.expression(
              `LEFT && (BINDING_ID = SUB_EXPR, typeof BINDING_ID !== "undefined")`,
            )({
              LEFT: acc,
              SUB_EXPR: subExpr,
              BINDING_ID: bindingId,
            });
          } else {
            return template.expression(`LEFT && SUB_TEST`)({
              LEFT: acc,
              SUB_TEST: generateTestExpr(subExpr, element, substitutionsMap),
            });
          }
        }, base);
      }

      const substitutionsMap = new Map();
      const { pattern, body, matchGuard } = path.node;
      const { caseId } = this;
      let test = generateTestExpr(caseId, pattern, substitutionsMap);

      if (matchGuard) {
        const matchGuardPath = path.get("matchGuard");
        matchGuardPath.traverse(identifierSubstitueVisitor, {
          substitutionsMap,
        });
        test = t.logicalExpression("&&", test, matchGuard);
      }

      path.traverse(identifierSubstitueVisitor, { substitutionsMap });
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
