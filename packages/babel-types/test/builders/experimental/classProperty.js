import * as t from "../../..";

describe("builders", function () {
  describe("experimental", function () {
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
