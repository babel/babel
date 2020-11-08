import * as t from "@babel/types";

describe("builders", function () {
  describe("es2015", function () {
    describe("arrowFunctionExpression", function () {
      it("accept all parameters", function () {
        const arrowFunctionExpression = t.arrowFunctionExpression(
          [t.identifier("foo")],
          t.blockStatement([t.returnStatement(t.thisExpression())]),
          true,
          true,
          true,
          t.tsTypeAnnotation(t.tsStringKeyword()),
          t.tsTypeParameterDeclaration([
            t.tsTypeParameter(t.tsObjectKeyword(), null, "foo"),
          ]),
        );
        expect(arrowFunctionExpression).toMatchSnapshot();
      });
    });
  });
});
