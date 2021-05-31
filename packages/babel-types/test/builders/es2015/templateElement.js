import * as t from "../../..";

describe("builders", function () {
  describe("es2015", function () {
    describe("templateElement", function () {
      it("should validate", function () {
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
    describe("templateLiteral", function () {
      it("should validate", function () {
        const foo = t.templateElement({ raw: "foo" });
        const bar = t.templateElement({ raw: "bar" });

        const baz = t.stringLiteral("baz");
        const qux = t.stringLiteral("qux");

        expect(t.templateLiteral([foo], [])).toMatchSnapshot();

        expect(t.templateLiteral([foo, bar], [baz])).toMatchSnapshot();

        expect(() =>
          t.templateLiteral([foo, bar], [baz, qux]),
        ).toThrowErrorMatchingSnapshot();

        expect(() =>
          t.templateLiteral([foo, bar], []),
        ).toThrowErrorMatchingSnapshot();

        expect(() =>
          t.templateLiteral({}, [baz]),
        ).toThrowErrorMatchingSnapshot();

        expect(() =>
          t.templateLiteral([foo, bar]),
        ).toThrowErrorMatchingSnapshot();
      });
    });
  });
});
