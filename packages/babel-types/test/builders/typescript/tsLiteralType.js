import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    describe("tsLiteralType", function () {
      it("accept unary expression", function () {
        expect(
          t.tsLiteralType(t.unaryExpression("-", t.numericLiteral(1))),
        ).toMatchSnapshot();
      });

      it("accepts unary expression with bigint literal", function () {
        expect(
          t.tsLiteralType(
            t.unaryExpression("-", t.bigIntLiteral(BigInt("123456789"))),
          ),
        ).toMatchInlineSnapshot(`
          Object {
            "literal": Object {
              "argument": Object {
                "type": "BigIntLiteral",
                "value": 123456789n,
              },
              "operator": "-",
              "prefix": true,
              "type": "UnaryExpression",
            },
            "type": "TSLiteralType",
          }
        `);
      });
      it("throws with non-numeric argument", function () {
        expect(() => {
          t.tsLiteralType(t.unaryExpression("-", t.stringLiteral(1)));
        }).toThrow("Property value expected type of string but got number");
        expect(() => {
          t.tsLiteralType(t.unaryExpression("-", t.objectExpression([])));
        }).toThrow(
          'Property argument of UnaryExpression expected node to be of a type ["NumericLiteral","BigIntLiteral"] but instead got "ObjectExpression"',
        );
      });
    });
    it("throws with bad operator", function () {
      expect(() => {
        t.tsLiteralType(t.unaryExpression("+", t.numericLiteral(1)));
      }).toThrow(
        'Property operator expected value to be one of ["-"] but got "+"',
      );

      // should check operator first since it appears first
      expect(() => {
        t.tsLiteralType(t.unaryExpression("+", t.objectExpression([])));
      }).toThrow(
        'Property operator expected value to be one of ["-"] but got "+"',
      );

      expect(() => {
        t.tsLiteralType(t.unaryExpression("~", t.numericLiteral(1)));
      }).toThrow(
        'Property operator expected value to be one of ["-"] but got "~"',
      );

      expect(() => {
        t.tsLiteralType(t.unaryExpression("void", t.numericLiteral(1)));
      }).toThrow(
        'Property operator expected value to be one of ["-"] but got "void"',
      );
    });
  });
});
