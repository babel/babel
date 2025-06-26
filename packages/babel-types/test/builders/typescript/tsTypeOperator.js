import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    describe("tsTypeOperator", function () {
      it("accept operator as argument for tsTypeOperator", function () {
        const tsTypeOperator = t.TSTypeOperator(
          t.TSTypeQuery(t.Identifier("x")),
          "keyof",
        );
        expect(tsTypeOperator).toHaveProperty("type", "TSTypeOperator");
        expect(tsTypeOperator).toHaveProperty("operator", "keyof");
      });
    });
  });
});
