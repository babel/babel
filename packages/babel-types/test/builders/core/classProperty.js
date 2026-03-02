import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("core", function () {
    describe("classProperty", function () {
      it("should validate", function () {
        expect(
          t.classProperty(t.stringLiteral("test"), t.numericLiteral(1)),
        ).toMatchSnapshot();

        expect(
          t.classProperty(
            t.stringLiteral("test"),
            t.numericLiteral(1),
            null,
            null,
            false,
            true,
          ),
        ).toMatchSnapshot();
      });
    });
  });
});
