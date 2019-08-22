import * as t from "../../..";

describe("builders", function() {
  describe("experimental", function() {
    describe("sliceExpression", function() {
      it("should validate", function() {
        expect(
          t.sliceExpression(
            t.identifier("foo"),
            t.identifier("bar"),
            t.numericLiteral(42),
            t.unaryExpression("-", t.numericLiteral(42)),
          ),
        ).toMatchSnapshot();
        expect(
          t.sliceExpression(
            t.identifier("foo"),
            t.unaryExpression("-", t.identifier("Infinity")),
          ),
        ).toMatchSnapshot();
        expect(() =>
          t.sliceExpression(
            t.identifier("foo"),
            t.binaryExpression("+", t.numericLiteral(4), t.numericLiteral(2)),
          ),
        ).toThrow();
      });
    });
  });
});
