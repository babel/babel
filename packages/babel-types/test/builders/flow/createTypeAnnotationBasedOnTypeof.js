import { createTypeAnnotationBasedOnTypeof } from "../../..";

describe("builders", function() {
  describe("flow", function() {
    describe("createTypeAnnotationBasedOnTypeof", function() {
      const values = {
        string: typeof "string",
        number: typeof 123,
        true: typeof true,
        object: typeof {},
        undefined: typeof undefined,
        function: typeof function() {},
        symbol: typeof Symbol(),
      };

      for (const name in values) {
        const value = values[name];
        it(name, function() {
          const result = createTypeAnnotationBasedOnTypeof(value);
          expect(result).toMatchSnapshot();
        });
      }

      it("invalid", function() {
        expect(() =>
          createTypeAnnotationBasedOnTypeof("thisdoesnotexist"),
        ).toThrow(Error);
      });
    });
  });
});
