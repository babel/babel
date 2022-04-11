import { createTypeAnnotationBasedOnTypeof } from "../../../lib/index.js";

describe("builders", function () {
  describe("flow", function () {
    describe("createTypeAnnotationBasedOnTypeof", function () {
      const values = {
        string: typeof "string",
        number: typeof 123,
        true: typeof true,
        object: typeof {},
        undefined: typeof undefined,
        function: typeof function () {},
        symbol: typeof Symbol(),
        bigint: (() => {
          try {
            return eval("typeof 0n");
          } catch (e) {
            return "bigint";
          }
        })(),
      };

      for (const name in values) {
        const value = values[name];
        it(`${name} is valid`, function () {
          const result = createTypeAnnotationBasedOnTypeof(value);
          expect(result).toMatchSnapshot();
        });
      }

      it("invalid", function () {
        expect(() =>
          createTypeAnnotationBasedOnTypeof("thisdoesnotexist"),
        ).toThrow(Error);
      });
    });
  });
});
