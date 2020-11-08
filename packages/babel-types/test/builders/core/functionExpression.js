import * as t from "../../..";

describe("builders", function () {
  describe("core", function () {
    describe("functionExpression", function () {
      it("accept all parameters", function () {
        const functionExpression = t.functionExpression(
          t.identifier("foo"),
          [t.identifier("bar")],
          t.blockStatement([t.returnStatement(t.thisExpression())]),
          true,
          true,
          t.tsTypeAnnotation(t.tsStringKeyword()),
          t.tsTypeParameterDeclaration([
            t.tsTypeParameter(t.tsObjectKeyword(), null, "bar"),
          ]),
        );
        expect(functionExpression).toMatchSnapshot();
      });
    });
  });
});
