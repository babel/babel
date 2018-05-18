import * as t from "../lib";
import { parse } from "@babel/parser";
import generate from "@babel/generator";

function parseCode(string) {
  return parse(string, {
    allowReturnOutsideFunction: true,
  }).program.body[0];
}
function generateCode(node) {
  return generate(node).code;
}

describe("converters", function() {
  it("toIdentifier", function() {
    expect(t.toIdentifier("swag-lord")).toBe("swagLord");
  });

  describe("valueToNode", function() {
    it("number", function() {
      expect(t.valueToNode(Math.PI)).toEqual(t.numericLiteral(Math.PI));
      expect(t.valueToNode(-Infinity)).toEqual(t.numericLiteral(-Infinity));
      expect(t.valueToNode(NaN)).toEqual(t.numericLiteral(NaN));
    });
    it("string", function() {
      expect(t.valueToNode('This is a "string"')).toEqual(
        t.stringLiteral('This is a "string"'),
      );
    });
    it("boolean", function() {
      expect(t.valueToNode(true)).toEqual(t.booleanLiteral(true));
      expect(t.valueToNode(false)).toEqual(t.booleanLiteral(false));
    });
    it("null", function() {
      expect(t.valueToNode(null)).toEqual(t.nullLiteral());
    });
    it("undefined", function() {
      expect(t.valueToNode(undefined)).toEqual(t.identifier("undefined"));
    });
    it("RegExp", function() {
      expect(t.valueToNode(/abc.+/gm)).toEqual(t.regExpLiteral("abc.+", "gm"));
    });
    it("array", function() {
      expect(t.valueToNode([1, "a"])).toEqual(
        t.arrayExpression([t.numericLiteral(1), t.stringLiteral("a")]),
      );
    });
    it("object", function() {
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
    it("throws if cannot convert", function() {
      expect(function() {
        t.valueToNode(Object);
      }).toThrow();
      expect(function() {
        t.valueToNode(Symbol());
      }).toThrow();
    });
  });
  describe("toKeyAlias", function() {
    beforeEach(function() {
      // make tests deterministic
      t.toKeyAlias.uid = 0;
    });
    it("doesn't change string literals", function() {
      expect(
        t.toKeyAlias(t.objectProperty(t.stringLiteral("a"), t.nullLiteral())),
      ).toBe('"a"');
    });
    it("wraps around at Number.MAX_SAFE_INTEGER", function() {
      expect(
        t.toKeyAlias(
          t.objectMethod("method", t.identifier("a"), [], t.blockStatement([])),
        ),
      ).toBe("0");
    });
  });
  describe("toStatement", function() {
    it("noop on statements", function() {
      const node = t.emptyStatement();
      expect(t.toStatement(node)).toEqual(node);
      t.assertEmptyStatement(node);
    });
    it("mutate class expression to declaration", function() {
      const node = t.classExpression(
        t.identifier("A"),
        null,
        t.classBody([]),
        [],
      );
      t.toStatement(node);
      t.assertClassDeclaration(node);
    });
    it("fail if class expression has no id", function() {
      const node = t.classExpression(null, null, t.classBody([]), []);
      expect(function() {
        t.toStatement(node);
      }).toThrow(Error);
      expect(t.toStatement(node, /* ignore = */ true)).toBe(false);
      t.assertClassExpression(node);
    });
    it("mutate function expression to declaration", function() {
      const node = t.functionExpression(
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toStatement(node);
      t.assertFunctionDeclaration(node);
    });
    it("fail if function expression has no id", function() {
      const node = t.functionExpression(null, [], t.blockStatement([]));
      expect(function() {
        t.toStatement(node);
      }).toThrow(Error);
      expect(t.toStatement(node, /* ignore = */ true)).toBe(false);
      t.assertFunctionExpression(node);
    });
    it("assignment expression", function() {
      const node = t.assignmentExpression(
        "+=",
        t.identifier("x"),
        t.numericLiteral(1),
      );
      t.assertExpressionStatement(t.toStatement(node));
      t.assertAssignmentExpression(node);
    });
    it("fail if cannot convert node type", function() {
      const node = t.yieldExpression(t.identifier("foo"));
      expect(function() {
        t.toStatement(node);
      }).toThrow(Error);
      expect(t.toStatement(node, /* ignore = */ true)).toBe(false);
      t.assertYieldExpression(node);
    });
  });
  describe("toExpression", function() {
    it("noop on expressions", function() {
      const node = t.identifier("a");
      expect(t.toExpression(node)).toEqual(node);
      t.assertIdentifier(node);
    });
    it("mutate class declaration to expression", function() {
      const node = t.classDeclaration(
        t.identifier("A"),
        null,
        t.classBody([]),
        [],
      );
      t.toExpression(node);
      t.assertClassExpression(node);
    });
    it("mutate function declaration to expression", function() {
      const node = t.functionDeclaration(
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toExpression(node);
      t.assertFunctionExpression(node);
    });
    it("mutate object method to expression", function() {
      const node = t.objectMethod(
        "method",
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toExpression(node);
      t.assertFunctionExpression(node);
    });
    it("mutate class method to expression", function() {
      const node = t.classMethod(
        "constructor",
        t.identifier("A"),
        [],
        t.blockStatement([]),
      );
      t.toExpression(node);
      t.assertFunctionExpression(node);
    });
    it("expression statement", function() {
      const inner = t.yieldExpression(t.identifier("foo"));
      const node = t.expressionStatement(inner);
      t.assertYieldExpression(t.toExpression(node));
      expect(t.toExpression(node)).toEqual(inner);
      t.assertExpressionStatement(node);
    });
    it("fail if cannot convert node type", function() {
      const node = t.program([]);
      expect(function() {
        t.toExpression(node);
      }).toThrow(Error);
      t.assertProgram(node);
    });
  });
  describe("toSequenceExpression", function() {
    let scope;
    const undefinedNode = t.identifier("undefined");
    beforeEach(function() {
      scope = [];
      scope.buildUndefinedNode = function() {
        return undefinedNode;
      };
    });
    it("gathers nodes into sequence", function() {
      const node = t.identifier("a");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      t.assertSequenceExpression(sequence);
      expect(sequence.expressions[0]).toBe(undefinedNode);
      expect(sequence.expressions[1]).toBe(node);
      t.assertIdentifier(node);
    });
    it("avoids sequence for single node", function() {
      const node = t.identifier("a");
      let sequence = t.toSequenceExpression([node], scope);
      expect(sequence).toBe(node);

      const block = t.blockStatement([t.expressionStatement(node)]);
      sequence = t.toSequenceExpression([block], scope);
      expect(sequence).toBe(node);
    });
    it("gathers expression", function() {
      const node = t.identifier("a");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence.expressions[1]).toBe(node);
    });
    it("gathers expression statement", function() {
      const node = t.expressionStatement(t.identifier("a"));
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence.expressions[1]).toBe(node.expression);
    });
    it("gathers var declarations", function() {
      const node = parseCode("var a, b = 1;");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      t.assertIdentifier(scope[0].id, { name: "a" });
      t.assertIdentifier(scope[1].id, { name: "b" });
      expect(generateCode(sequence.expressions[1])).toBe("b = 1");
      expect(generateCode(sequence.expressions[2])).toBe("undefined");
    });
    it("skips undefined if expression after var declaration", function() {
      const node = parseCode("{ var a, b = 1; true }");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe("b = 1, true");
    });
    it("bails on let and const declarations", function() {
      let node = parseCode("let a, b = 1;");
      let sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence).toBeUndefined();

      node = parseCode("const b = 1;");
      sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence).toBeUndefined();
    });
    it("gathers if statements", function() {
      let node = parseCode("if (true) { true }");
      let sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe(
        "true ? true : undefined",
      );

      node = parseCode("if (true) { true } else { b }");
      sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe("true ? true : b");
    });
    it("bails in if statements if recurse bails", function() {
      let node = parseCode("if (true) { return }");
      let sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence).toBeUndefined();

      node = parseCode("if (true) { true } else { return }");
      sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence).toBeUndefined();
    });
    it("gathers block statements", function() {
      let node = parseCode("{ a }");
      let sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe("a");

      node = parseCode("{ a; b; }");
      sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe("a, b");
    });
    it("bails in block statements if recurse bails", function() {
      const node = parseCode("{ return }");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(sequence).toBeUndefined();
    });
    it("gathers empty statements", function() {
      const node = parseCode(";");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe("undefined");
    });
    it("skips empty statement if expression afterwards", function() {
      const node = parseCode("{ ; true }");
      const sequence = t.toSequenceExpression([undefinedNode, node], scope);
      expect(generateCode(sequence.expressions[1])).toBe("true");
    });
  });
});
