import * as t from "../../../lib/index.js";

describe("builders", function () {
  describe("typescript", function () {
    (process.env.BABEL_8_BREAKING ? describe : describe.skip)(
      "tsTypeParameter",
      function () {
        it("accept name as argument for tsTypeParameter", function () {
          const tsTypeParameter = t.tsTypeParameter(
            t.tsTypeReference(t.identifier("bar")),
            t.tsTypeReference(t.identifier("baz")),
            t.identifier("foo"),
          );
          expect(tsTypeParameter).toMatchSnapshot();
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
      },
    );
    (process.env.BABEL_8_BREAKING ? describe.skip : describe)(
      "tsTypeParameter - Babel 7",
      function () {
        it("accept name as argument for tsTypeParameter", function () {
          const tsTypeParameter = t.tsTypeParameter(
            t.tsTypeReference(t.identifier("bar")),
            t.tsTypeReference(t.identifier("baz")),
            "foo",
          );
          expect(tsTypeParameter).toMatchSnapshot();
        });
        it("throws when name is missing", function () {
          expect(() => {
            t.tsTypeParameter(
              t.tsTypeReference(t.identifier("bar")),
              t.tsTypeReference(t.identifier("baz")),
            );
          }).toThrow("Property name expected type of string but got undefined");
        });
      },
    );
  });
});
