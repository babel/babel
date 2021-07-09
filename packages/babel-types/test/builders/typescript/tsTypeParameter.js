import * as t from "../../..";

describe("builders", function () {
  describe("typescript", function () {
    describe("tsTypeParameter", function () {
      it("accept name as argument for tsTypeParameter", function () {
        const tsTypeParameter = t.tsTypeParameter(
          t.tsTypeReference(t.identifier("bar")),
          t.tsTypeReference(t.identifier("baz")),
          !process.env.BABEL_8_BREAKING ? "foo" : t.identifier("foo"),
        );
        expect(tsTypeParameter).toMatchSnapshot({
          name: expect.anything(),
        });
        // TODO(babel-8): move this check to the snapshot
        expect(tsTypeParameter).toEqual(
          expect.objectContaining({
            name: !process.env.BABEL_8_BREAKING
              ? "foo"
              : expect.objectContaining({
                  name: "foo",
                  type: "Identifier",
                }),
          }),
        );
      });
      it("throws when name is missing", function () {
        expect(() => {
          t.tsTypeParameter(
            t.tsTypeReference(t.identifier("bar")),
            t.tsTypeReference(t.identifier("baz")),
          );
        }).toThrow(
          !process.env.BABEL_8_BREAKING
            ? "Property name expected type of string but got null"
            : 'Property name of TSTypeParameter expected node to be of a type ["Identifier"] but instead got undefined',
        );
      });
    });
  });
});
