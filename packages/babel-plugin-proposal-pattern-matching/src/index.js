import assert from "assert";
import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "../../babel-core";

const exprT = template.expression;

const constStatement = (id, initializer) =>
  t.variableDeclaration("const", [t.variableDeclarator(id, initializer)]);

const failIf = testExpr => t.ifStatement(testExpr, t.continueStatement(null));

class WhenRewriter {
  constructor({ scope, caseLabel }) {
    this.stmts = [];
    this.scope = scope;
    this.caseLabel = caseLabel;
  }

  // private
  bindConst(id, initializer) {
    this.stmts.push(constStatement(id, initializer));
  }

  // private
  failIf(testExpr) {
    this.stmts.push(failIf(testExpr));
  }

  translate(node, valueId) {
    const { pattern, matchGuard, body } = node;
    this.translatePattern(pattern, valueId);
    if (matchGuard !== undefined) {
      this.failIf(t.unaryExpression("!", matchGuard));
    }
    this.stmts.push(body);
    this.stmts.push(t.continueStatement(this.caseLabel));
    return template`do { STMTS } while (0);`({ STMTS: this.stmts });
  }

  // private
  translatePattern(pattern, id) {
    const { scope } = this;

    switch (pattern.type) {
      case "NumericLiteral":
      case "StringLiteral":
      case "BooleanLiteral":
      case "NullLiteral":
        this.failIf(t.binaryExpression("!==", id, pattern));
        return;

      case "Identifier":
        this.bindConst(pattern, id);
        return;

      case "ObjectMatchPattern":
        this.failIf(
          exprT`ID === null || typeof ID === "undefined"`({ ID: id }),
        );
        for (const property of pattern.properties) {
          assert(property.type === "ObjectMatchProperty");
          const { key } = property;
          const subId = scope.generateUidIdentifier(key.name);
          this.bindConst(subId, exprT`ID.KEY`({ ID: id, KEY: key }));
          this.failIf(exprT`typeof SUBID === "undefined"`({ SUBID: subId }));
          this.translatePattern(property.element || property.key, subId);
        }
        return;

      case "ArrayMatchPattern": {
        // TODO this is too specific
        this.failIf(exprT`!Array.isArray(ID)`({ ID: id }));

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
          this.failIf(
            t.binaryExpression(
              haveRest ? "<" : "!==",
              t.memberExpression(id, t.identifier("length")),
              t.numericLiteral(numElements),
            ),
          );
        }

        elements.slice(0, numElements).forEach((element, index) => {
          const subId = scope.generateUidIdentifier(index);
          this.bindConst(
            subId,
            exprT`ID[INDEX]`({ ID: id, INDEX: t.numericLiteral(index) }),
          );
          this.failIf(exprT`typeof SUBID === "undefined"`({ SUBID: subId }));
          this.translatePattern(element, subId);
        });

        if (haveRest) {
          const subId = scope.generateUidIdentifier("rest");
          this.bindConst(
            subId,
            exprT`ID.slice(START)`({
              ID: id,
              START: t.numericLiteral(numElements),
            }),
          );
          this.translatePattern(elements[elements.length - 1].body, subId);
        }

        return;
      }

      case "RegExpLiteral":
      default:
        // TODO better error; use path.buildCodeFrameError ?
        throw new Error("Bad expression in pattern");
    }
  }
}

export default declare(api => {
  api.assertVersion(7);

  const visitWhen = (
    whenNode,
    { discriminantId, stmts: outerStmts, caseLabel, scope },
  ) => {
    const rewriter = new WhenRewriter({ scope, caseLabel });
    outerStmts.push(rewriter.translate(whenNode, discriminantId));
  };

  const caseVisitor = {
    CaseStatement(path) {
      const { discriminant, cases } = path.node;
      const { scope } = path;
      const caseLabel = scope.generateUidIdentifier("case");
      const discriminantId = scope.generateUidIdentifier("caseVal");

      const stmts = [];
      stmts.push(constStatement(discriminantId, discriminant));
      for (const whenNode of cases) {
        visitWhen(whenNode, { discriminantId, stmts, caseLabel, scope });
      }
      path.replaceWith(
        template`
          LABEL: do {STMTS} while (0);
        `({ LABEL: caseLabel, STMTS: stmts }),
      );
    },
  };

  return {
    name: "proposal-pattern-matching",
    inherits: syntaxPatternMatching,
    visitor: caseVisitor,
  };
});
