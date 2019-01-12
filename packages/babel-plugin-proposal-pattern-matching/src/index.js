import assert from "assert";
import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "../../babel-core";

export default declare(api => {
  api.assertVersion(7);

  const failIf = testExpr => t.ifStatement(testExpr, t.continueStatement(null));

  const matchPattern = (pattern, id, { stmts, scope }) => {
    switch (pattern.type) {
      case "NumericLiteral":
      case "StringLiteral":
      case "BooleanLiteral":
      case "NullLiteral":
        stmts.push(failIf(t.binaryExpression("!==", id, pattern)));
        return;

      case "Identifier":
        stmts.push(
          template`
            const SRCID = ID;
          `({ SRCID: pattern, ID: id }),
        );
        return;

      case "ObjectMatchPattern":
        stmts.push(
          failIf(
            template.expression`
            ID === null || typeof ID === "undefined"
          `({ ID: id }),
          ),
        );
        for (const property of pattern.properties) {
          assert(property.type === "ObjectMatchProperty");
          const { key } = property;
          const subId = scope.generateUidIdentifier(key.name);
          stmts.push(
            template`const SUBID = ID.KEY`({ SUBID: subId, ID: id, KEY: key }),
            failIf(
              template.expression`typeof SUBID === "undefined"`({
                SUBID: subId,
              }),
            ),
          );
          matchPattern(property.element || property.key, subId, {
            stmts,
            scope,
          });
        }
        return;

      case "ArrayMatchPattern": {
        stmts.push(
          failIf(
            // TODO this is too specific
            template.expression`!Array.isArray(ID)`({ ID: id }),
          ),
        );

        const { elements } = pattern;
        if (
          elements.slice(0, -1).some(elt => elt.type === "MatchRestElement")
        ) {
          throw new Error("rest-pattern before end of array pattern");
        }
        const haveRest =
          elements.length > 0 &&
          elements[elements.length - 1].type === "MatchRestElement";

        const numElements = elements.length - (haveRest ? 1 : 0);
        if (!haveRest || numElements > 0) {
          stmts.push(
            failIf(
              t.binaryExpression(
                haveRest ? "<" : "!==",
                t.memberExpression(id, t.identifier("length")),
                t.numericLiteral(numElements),
              ),
            ),
          );
        }

        elements.slice(0, numElements).forEach((element, index) => {
          const subId = scope.generateUidIdentifier(index);
          stmts.push(
            template`const SUBID = ID[INDEX]`({
              SUBID: subId,
              ID: id,
              INDEX: t.numericLiteral(index),
            }),
            failIf(
              template.expression`typeof SUBID === "undefined"`({
                SUBID: subId,
              }),
            ),
          );
          matchPattern(element, subId, { stmts, scope });
        });
        return;
      }

      case "RegExpLiteral":
      default:
        // TODO better error; use path.buildCodeFrameError ?
        throw new Error("Bad expression in pattern");
    }
  };

  const whenVisitor = {
    WhenClause(path, { discriminantId, stmts: outerStmts, outerLabel, scope }) {
      const { pattern, matchGuard, body } = path.node;

      const wrapper = template`
        do { } while (0);
      `();
      const stmts = wrapper.body.body; // DoWhileS -> BlockS -> []

      matchPattern(pattern, discriminantId, { stmts, scope });
      if (matchGuard !== undefined) {
        stmts.push(failIf(t.unaryExpression("!", matchGuard)));
      }

      stmts.push(body);

      stmts.push(t.continueStatement(outerLabel));

      outerStmts.push(wrapper);
    },
  };

  const caseVisitor = {
    CaseStatement(path, state) {
      const { discriminant, cases } = path.node;

      // TODO is this the right namespace for a label?
      const outerLabel = path.scope.generateUidIdentifier("case");
      const wrapper = template`
        LABEL:
        do {
        } while (0);
      `({ LABEL: outerLabel });
      const stmts = wrapper.body.body.body; // LabeledS -> DoWhileS -> BlockS -> []

      const discriminantId = path.scope.generateUidIdentifierBasedOnNode(
        discriminant,
      );
      stmts.push(
        t.variableDeclaration("const", [
          t.variableDeclarator(discriminantId, discriminant),
        ]),
      );

      const { scope } = path;
      path.traverse(whenVisitor, { discriminantId, stmts, outerLabel, scope });
      // console.log(stmts[1].body.body);

      path.replaceWith(
        template`
          LABEL:
          do {
            STMTS
          } while (0);
        `({ LABEL: outerLabel, STMTS: stmts }),
      );
    },
  };

  return {
    name: "proposal-pattern-matching",
    inherits: syntaxPatternMatching,
    visitor: caseVisitor,
  };
});
