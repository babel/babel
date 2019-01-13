import assert from "assert";
import { declare } from "@babel/helper-plugin-utils";
import syntaxPatternMatching from "@babel/plugin-syntax-pattern-matching";
import { types as t, template } from "../../babel-core";

/**
 * Return a label for the statement.  If it doesn't yet have one, give it one.
 *
 * If passed null, do nothing and return null.
 */
function forceLabelStatement(path) {
  if (path === null) {
    return null;
  }
  assert(path.isStatement());
  if (path.parentPath.isLabeledStatement()) {
    return path.parentPath.node.label;
  }
  const label = path.scope.generateUidIdentifier("label");
  path.replaceWith(t.labeledStatement(label, path.node));
  return label;
}

/**
 * Get path of the statement an unlabelled `break` would refer to.
 *
 * If there is no such statement, return null.
 */
function findEnclosingBreakable(path) {
  // The ES spec helpfully points out:
  //     NOTE    A BreakableStatement is one that can be exited via an
  //             unlabelled BreakStatement.
  // https://tc39.github.io/ecma262/#sec-iteration-statements
  //
  // (Fun fact: a *labelled* BreakStatement, `break foo;`, can refer to
  // a label on any enclosing statement!  E.g.,
  //   l: { break l; console.error("unreachable") }; console.log("hello")
  // just prints "hello".  See
  //   https://tc39.github.io/ecma262/#sec-labelled-statements-runtime-semantics-labelledevaluation
  // .)
  //
  // And BreakableStatement means IterationStatement or SwitchStatement...
  // in Babel terms, Loop or SwitchStatement.
  while (path && !path.isFunction()) {
    if (path.isLoop() || path.isSwitchStatement()) {
      return path;
    }
    if (
      path.parentPath.isLabeledStatement() &&
      path.parentPath.node.body !== path.node
    ) {
      // There's been a modification at `path.parentPath` since
      // `path` was constructed, which could be from a previous
      // `forceLabelStatement`.  TODO this solution feels messy.
      path = path.parentPath.get("body");
      continue;
    }
    path = path.parentPath;
  }
  return null;
}

/**
 * Get path of the loop an unlabelled `continue` would refer to.
 *
 * If there is no such loop, return null.
 */
function findEnclosingLoop(path) {
  // Unlike `break`, `continue` applies only to loops (aka
  // IterationStatement in spec terms).  See the sections
  // linked in findEnclosingBreakable, and compare:
  //   https://tc39.github.io/ecma262/#sec-loopcontinues
  while (path && !path.isFunction()) {
    if (path.isLoop()) {
      return path;
    }
    if (
      path.parentPath.isLabeledStatement() &&
      path.parentPath.node.body !== path.node
    ) {
      // There's been a modification at `path.parentPath` since
      // `path` was constructed, which could be from a previous
      // `forceLabelStatement`.  TODO this solution feels messy.
      path = path.parentPath.get("body");
      continue;
    }
    path = path.parentPath;
  }
  return null;
}

/**
 * Rewrite any `break` and `continue` that would implicitly exit `outerPath`.
 *
 * Specifically: find each `break` or `continue` statement which doesn't
 * use a label, and doesn't refer to an enclosing loop or `switch` inside
 * this traversal (whose root must be `outerPath`.)  Add labels to those
 * statements to explicitly refer to the same enclosing loops/switches as
 * they do now.
 *
 * Also add labels to those enclosing loops/switches, as needed.
 */
const labelRewriteVisitor = {
  Loop(path) {
    path.skip();
  },

  SwitchStatement: {
    enter(path, state) {
      state.switchDepth = (state.switchDepth || 0) + 1;
    },
    exit(path, state) {
      state.switchDepth--;
    },
  },

  BreakStatement(path, { outerPath, switchDepth }) {
    if (switchDepth > 0) {
      return;
    }
    if (path.node.label !== null) {
      return;
    }
    // TODO cache these
    const label = forceLabelStatement(findEnclosingBreakable(outerPath));
    if (label === null) {
      throw path.buildCodeFrameError("Illegal break statement");
    }
    path.node.label = label;
  },

  ContinueStatement(path, { outerPath }) {
    if (path.node.label !== null) {
      return;
    }
    const label = forceLabelStatement(findEnclosingLoop(outerPath));
    if (label === null) {
      throw path.buildCodeFrameError("Illegal continue statement");
    }
    path.node.label = label;
  },
};

const exprT = template.expression;

const constStatement = (id, initializer) =>
  t.variableDeclaration("const", [t.variableDeclarator(id, initializer)]);

const failIf = testExpr => t.ifStatement(testExpr, t.continueStatement(null));

class WhenRewriter {
  constructor({ scope, caseLabel }) {
    this.stmts = undefined; // Initialized in `translate` before each use.
    this.scope = scope;
    this.caseLabel = caseLabel;
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
    this.stmts.push(failIf(testExpr));
  }

  translate(node, valueId) {
    const { pattern, matchGuard, body } = node;
    this.stmts = [];
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
      const caseLabel = scope.generateUidIdentifier("case");
      const rewriter = new WhenRewriter({ scope, caseLabel });

      path.traverse(labelRewriteVisitor, { outerPath: path });

      const stmts = [];
      const { discriminant, cases } = path.node;
      const discriminantId = scope.generateUidIdentifier("caseVal");
      stmts.push(constStatement(discriminantId, discriminant));
      for (const whenNode of cases) {
        stmts.push(rewriter.translate(whenNode, discriminantId));
      }
      path.replaceWith(
        template`
          LABEL: do { STMTS } while (0);
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
