import assert from "assert";
import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "../../babel-core";

export default declare(api => {
  api.assertVersion(7);

  const matchPattern = (pattern, id, { stmts, scope }) => {
    switch (pattern.type) {
      case "NumericLiteral":
      case "StringLiteral":
      case "BooleanLiteral":
      case "NullLiteral":
        stmts.push(
          t.ifStatement(
            t.binaryExpression("!==", id, pattern),
            t.continueStatement(null),
          ),
        );
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
          t.ifStatement(
            template.expression`
              ID === null || typeof ID === "undefined"
            `({ ID: id }),
            t.continueStatement(null),
          ),
        );
        for (const property of pattern.properties) {
          assert(property.type === "ObjectMatchProperty");
          const { key } = property;
          const subId = scope.generateUidIdentifier(key.name);
          stmts.push(
            template`const SUBID = ID.KEY`({ SUBID: subId, ID: id, KEY: key }),
          );
          matchPattern(property.element || property.key, subId, {
            stmts,
            scope,
          });
        }
        return;

      case "ArrayMatchPattern":
        console.warn("Unimplemented: array matching");
        return;

      case "RegExpLiteral":
      default:
        // TODO better error; use path.buildCodeFrameError ?
        throw new Error("Bad expression in pattern");
    }
  };

  const whenVisitor = {
    WhenClause(path, { discriminantId, stmts: outerStmts, outerLabel, scope }) {
      const { pattern, body } = path.node;

      const wrapper = template`
        do { } while (0);
      `();
      const stmts = wrapper.body.body; // DoWhileS -> BlockS -> []

      matchPattern(pattern, discriminantId, { stmts, scope });

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
