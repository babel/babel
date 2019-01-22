import assert from "assert";
import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "../../babel-core";

const exprT = template.expression;

const constStatement = (id, initializer) =>
  t.variableDeclaration("const", [t.variableDeclarator(id, initializer)]);

class WhenRewriter {
  constructor({ scope, outerLabel }) {
    this.stmts = undefined; // Initialized in `translate` before each use.
    this.scope = scope;
    this.outerLabel = outerLabel;
    this.innerLabel = scope.generateUidIdentifier("caseInner");
  }

  // private
  buildError(node, msg) {
    return this.scope.path.hub.buildError(node, msg);
  }

  // private
  bindConst(id, initializer) {
    this.stmts.push(constStatement(id, initializer));
  }

  // private
  failIf(testExpr) {
    this.stmts.push(t.ifStatement(testExpr, t.breakStatement(this.innerLabel)));
  }

  translate(node, valueId) {
    const { pattern, matchGuard, body } = node;
    this.stmts = [];
    this.translatePattern(pattern, valueId);
    if (matchGuard !== undefined) {
      this.failIf(t.unaryExpression("!", matchGuard));
    }
    this.stmts.push(body);
    this.stmts.push(t.breakStatement(this.outerLabel));
    return t.labeledStatement(this.innerLabel, t.blockStatement(this.stmts));
  }

  // private
  translatePattern(pattern, id) {
    assert(id.type === "Identifier");
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

      case "ObjectMatchPattern": {
        this.failIf(exprT`ID === null || typeof ID !== "object"`({ ID: id }));

        const propertyIds = [];
        const lhsPatterns = [];
        for (let i = 0; i < pattern.properties.length; ++i) {
          const property = pattern.properties[i];
          const subId = scope.generateUidIdentifier();
          propertyIds.push(subId);
          if (t.isMatchRestElement(property)) {
            assert(i === pattern.properties.length - 1); // guaranteed by parser
            lhsPatterns.push(t.restElement(subId));
          } else {
            lhsPatterns.push(t.objectProperty(property.key, subId));
          }
        }
        const lhs = t.ObjectPattern(lhsPatterns);
        this.bindConst(lhs, id);

        for (let i = 0; i < pattern.properties.length; ++i) {
          const subId = propertyIds[i];
          const property = pattern.properties[i];
          this.failIf(exprT`SUBID === void 0`({ SUBID: subId }));
          const subPattern = t.isMatchRestElement(property)
            ? property.body
            : property.element || property.key;
          this.translatePattern(subPattern, subId);
        }
        return;
      }

      case "ArrayMatchPattern": {
        // TODO this is too specific
        this.failIf(exprT`!Array.isArray(ID)`({ ID: id }));

        const { elements } = pattern;
        if (
          elements.slice(0, -1).some(elt => elt.type === "MatchRestElement")
        ) {
          throw this.buildError(
            pattern,
            "rest-pattern before end of array pattern",
          );
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
        throw this.buildError(pattern, "Bad expression in pattern");
    }
  }
}

export default declare(api => {
  api.assertVersion(7);

  const caseVisitor = {
    CaseStatement(path) {
      const { scope } = path;
      const outerLabel = scope.generateUidIdentifier("caseOuter");
      const rewriter = new WhenRewriter({ scope, outerLabel });

      const stmts = [];
      const { discriminant, cases } = path.node;
      const discriminantId = scope.generateUidIdentifier("caseVal");
      stmts.push(constStatement(discriminantId, discriminant));
      for (const whenNode of cases) {
        stmts.push(rewriter.translate(whenNode, discriminantId));
      }
      path.replaceWith(t.labeledStatement(outerLabel, t.blockStatement(stmts)));
    },
  };

  return {
    name: "proposal-pattern-matching",
    inherits: syntaxPatternMatching,
    visitor: caseVisitor,
  };
});
