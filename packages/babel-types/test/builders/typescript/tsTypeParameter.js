import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    describe("tsTypeParameter", function () {
      it("accept name as argument for tsTypeParameter", function () {
        const tsTypeParameter = t.tsTypeParameter(
          t.tsTypeReference(t.identifier("bar")),
          t.tsTypeReference(t.identifier("baz")),
          t.identifier("foo"),
        );
        expect(tsTypeParameter).toHaveProperty("type", "TSTypeParameter");
        expect(tsTypeParameter).toHaveProperty("name.name", "foo");
      });
      it("throws when name is missing", function () {
        expect(() => {
          t.tsTypeParameter(
            t.tsTypeReference(t.identifier("bar")),
            t.tsTypeReference(t.identifier("baz")),
          );
        }).toThrow(
          'Property name of TSTypeParameter expected node to be of a type ["Identifier"] but instead got undefined',
        );
      });
    });
  });
});
