import * as t from "../lib/index.js";
import { itGte } from "$repo-utils";

describe("converters", function () {
  it("toIdentifier", function () {
    expect(t.toIdentifier("swag-lord")).toBe("swagLord");
    expect(t.toIdentifier("ɵ2")).toBe("ɵ2");
    expect(t.toIdentifier("ℬ1")).toBe("ℬ1");
    expect(t.toIdentifier("1bc")).toBe("bc");
    expect(t.toIdentifier("\u0487a")).toBe("_\u0487a");
  });

  describe("valueToNode", function () {
    it("number", function () {
      expect(t.valueToNode(Math.PI)).toEqual(t.numericLiteral(Math.PI));
      expect(t.valueToNode(-Math.PI)).toEqual(
        t.unaryExpression("-", t.numericLiteral(Math.PI)),
      );
      expect(t.valueToNode(0)).toEqual(t.numericLiteral(0));
      expect(t.valueToNode(-0)).toEqual(
        t.unaryExpression("-", t.numericLiteral(0)),
      );
      expect(t.valueToNode(NaN)).toEqual(
        t.binaryExpression("/", t.numericLiteral(0), t.numericLiteral(0)),
      );
      expect(t.valueToNode(-NaN)).toEqual(
        t.binaryExpression("/", t.numericLiteral(0), t.numericLiteral(0)),
      );

      expect(t.valueToNode(Infinity)).toEqual(
        t.binaryExpression("/", t.numericLiteral(1), t.numericLiteral(0)),
      );
      expect(t.valueToNode(-Infinity)).toEqual(
        t.unaryExpression(
          "-",
          t.binaryExpression("/", t.numericLiteral(1), t.numericLiteral(0)),
        ),
      );
    });

    const nodeGte10 = itGte("10.4.0");
    nodeGte10("bigint", function () {
      expect(t.valueToNode(BigInt(123))).toEqual(t.bigIntLiteral("123"));
    });
    it("string", function () {
      expect(t.valueToNode('This is a "string"')).toEqual(
        t.stringLiteral('This is a "string"'),
      );
    });
    it("boolean", function () {
      expect(t.valueToNode(true)).toEqual(t.booleanLiteral(true));
      expect(t.valueToNode(false)).toEqual(t.booleanLiteral(false));
    });
    it("null", function () {
      expect(t.valueToNode(null)).toEqual(t.nullLiteral());
    });
    it("undefined", function () {
      expect(t.valueToNode(undefined)).toEqual(t.identifier("undefined"));
    });
    it("RegExp", function () {
      // eslint-disable-next-line regexp/no-useless-flag
      expect(t.valueToNode(/abc.+/gm)).toEqual(t.regExpLiteral("abc.+", "gm"));
    });
    it("array", function () {
      expect(t.valueToNode([1, "a"])).toEqual(
        t.arrayExpression([t.numericLiteral(1), t.stringLiteral("a")]),
      );
    });
    it("object", function () {
      expect(
        t.valueToNode({
          a: 1,
          "b c": 2,
        }),
      ).toEqual(
        t.objectExpression([
          t.objectProperty(t.identifier("a"), t.numericLiteral(1)),
          t.objectProperty(t.stringLiteral("b c"), t.numericLiteral(2)),
        ]),
      );
    });
    it("object with __proto__ key", () => {
      expect(
        t.valueToNode({
          ["__proto__"]: "__proto__",
          // eslint-disable-next-line no-dupe-keys
          __proto__: null,
        }),
      ).toEqual(
        t.objectExpression([
          t.objectProperty(
            t.stringLiteral("__proto__"),
            t.stringLiteral("__proto__"),
            true,
          ),
        ]),
      );
    });
    it("throws if cannot convert", function () {
      expect(function () {
        t.valueToNode(Object);
      }).toThrow();
      expect(function () {
        t.valueToNode(Symbol());
      }).toThrow();
    });
  });
  describe("toKeyAlias", function () {
    beforeEach(function () {
      // make tests deterministic
      t.toKeyAlias.uid = 0;
    });
    it("doesn't change string literals", function () {
      expect(
        t.toKeyAlias(t.objectProperty(t.stringLiteral("a"), t.nullLiteral())),
      ).toBe('"a"');
    });
    it("wraps around at Number.MAX_SAFE_INTEGER", function () {
      expect(
        t.toKeyAlias(
          t.objectMethod("method", t.identifier("a"), [], t.blockStatement([])),
        ),
      ).toBe("0");
    });
  });
  describe("toStatement", function () {
    it("noop on statements", function () {
      const node = t.emptyStatement();
      expect(t.toStatement(node)).toEqual(node);
      t.assertEmptyStatement(node);
    });
    it("mutate class expression to declaration", function () {
      const node = t.classExpression(
        t.identifier("A"),
        null,
        t.classBody([]),
        [],
      );
      t.toStatement(node);
      t.assertClassDeclaration(node);
    });
    it("fail if class expression has no id", function () {
      const node = t.classExpression(null, null, t.classBody([]), []);
      expect(function () {
        t.toStatement(node);
      }).toThrow(Error);
      expect(t.toStatement(node, /* ignore = */ true)).toBe(false);
      t.assertClassExpression(node);
    });
    it("mutate function expression to declaration", function () {
      const node = t.functionExpression(
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toStatement(node);
      t.assertFunctionDeclaration(node);
    });
    it("fail if function expression has no id", function () {
      const node = t.functionExpression(null, [], t.blockStatement([]));
      expect(function () {
        t.toStatement(node);
      }).toThrow(Error);
      expect(t.toStatement(node, /* ignore = */ true)).toBe(false);
      t.assertFunctionExpression(node);
    });
    it("assignment expression", function () {
      const node = t.assignmentExpression(
        "+=",
        t.identifier("x"),
        t.numericLiteral(1),
      );
      t.assertExpressionStatement(t.toStatement(node));
      t.assertAssignmentExpression(node);
    });
    it("fail if cannot convert node type", function () {
      const node = t.yieldExpression(t.identifier("foo"));
      expect(function () {
        t.toStatement(node);
      }).toThrow(Error);
      expect(t.toStatement(node, /* ignore = */ true)).toBe(false);
      t.assertYieldExpression(node);
    });
  });
  describe("toExpression", function () {
    it("noop on expressions", function () {
      const node = t.identifier("a");
      expect(t.toExpression(node)).toEqual(node);
      t.assertIdentifier(node);
    });
    it("mutate class declaration to expression", function () {
      const node = t.classDeclaration(
        t.identifier("A"),
        null,
        t.classBody([]),
        [],
      );
      t.toExpression(node);
      t.assertClassExpression(node);
    });
    it("mutate function declaration to expression", function () {
      const node = t.functionDeclaration(
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toExpression(node);
      t.assertFunctionExpression(node);
    });
    it("mutate object method to expression", function () {
      const node = t.objectMethod(
        "method",
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toExpression(node);
      t.assertFunctionExpression(node);
    });
    it("mutate class method to expression", function () {
      const node = t.classMethod(
        "constructor",
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toExpression(node);
      t.assertFunctionExpression(node);
    });
    it("expression statement", function () {
      const inner = t.yieldExpression(t.identifier("foo"));
      const node = t.expressionStatement(inner);
      t.assertYieldExpression(t.toExpression(node));
      expect(t.toExpression(node)).toEqual(inner);
      t.assertExpressionStatement(node);
    });
    it("fail if cannot convert node type", function () {
      const node = t.program([]);
      expect(function () {
        t.toExpression(node);
      }).toThrow(Error);
      t.assertProgram(node);
    });
  });
});
