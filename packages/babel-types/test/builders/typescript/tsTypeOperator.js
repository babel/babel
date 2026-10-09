import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    describe("tsTypeOperator", function () {
      it("accept operator as argument for tsTypeOperator", function () {
        const tsTypeOperator = t.tsTypeOperator(
          t.tsTypeQuery(t.identifier("x")),
          "keyof",
        );
        expect(tsTypeOperator).toHaveProperty("type", "TSTypeOperator");
        expect(tsTypeOperator).toHaveProperty("operator", "keyof");
      });
    });
  });
});
