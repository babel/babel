import * as t from "../../..";

describe("builders", function() {
  describe("es2015", function() {
    describe("templateElement", function() {
      it("should validate", function() {
        expect(
          t.templateElement({ raw: "foo", cooked: "foo" }),
        ).toMatchSnapshot();

        expect(t.templateElement({ raw: "foo" })).toMatchSnapshot();

        expect(() =>
          t.templateElement({ raw: 1 }),
        ).toThrowErrorMatchingSnapshot();

        expect(() =>
          t.templateElement({ raw: "foo", cooked: 1 }),
        ).toThrowErrorMatchingSnapshot();

        expect(() => t.templateElement("foo")).toThrowErrorMatchingSnapshot();
      });
    });
  });
});
