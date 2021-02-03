import normalizeOptions from "../src/normalize-options";
describe("normalize options", () => {
  (process.env.BABEL_8_BREAKING ? describe : describe.skip)("Babel 8", () => {
    it("should throw on unknown options", () => {
      expect(() => normalizeOptions({ allowDeclareField: true }))
        .toThrowErrorMatchingInlineSnapshot(`
        "@babel/preset-flow: 'allowDeclareField' is not a valid top-level option.
        - Did you mean 'allowDeclareFields'?"
      `);
    });
    it.each(["all", "allowDeclareFields"])(
      "should throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
          `@babel/preset-flow: '${optionName}' option must be a boolean.`,
        );
      },
    );
    it("should not throw when options is not defined", () => {
      expect(() => normalizeOptions()).not.toThrowError();
    });
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "all": undefined,
          "allowDeclareFields": undefined,
        }
      `);
    });
  });
  (process.env.BABEL_8_BREAKING ? describe.skip : describe)("Babel 7", () => {
    it("should not throw on unknown options", () => {
      expect(() =>
        normalizeOptions({ allDeclareField: true }),
      ).not.toThrowError();
    });
    it.each(["all", "allowDeclareFields"])(
      "should not throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrowError();
      },
    );
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "all": undefined,
          "allowDeclareFields": undefined,
        }
      `);
    });
  });
});
