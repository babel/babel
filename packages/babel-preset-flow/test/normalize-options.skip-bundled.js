import _normalizeOptions from "../lib/normalize-options.js";
const normalizeOptions = _normalizeOptions.default || _normalizeOptions;

describe("normalize options", () => {
  (process.env.BABEL_8_BREAKING ? describe : describe.skip)("Babel 8", () => {
    it("should throw on unknown options", () => {
      expect(() => normalizeOptions({ al: true }))
        .toThrowErrorMatchingInlineSnapshot(`
        "@babel/preset-flow: 'al' is not a valid top-level option.
        - Did you mean 'all'?"
      `);
    });
    it("should throw on Babel 7 `allowDeclareFields` option", () => {
      expect(() =>
        normalizeOptions({ allowDeclareFields: true }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"@babel/preset-flow: Since Babel 8, \`declare property: A\` is always supported, and the \\"allowDeclareFields\\" option is no longer available. Please remove it from your config."`,
      );
    });
    it.each(["all"])("should throw when `%p` is not a boolean", optionName => {
      expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
        `@babel/preset-flow: '${optionName}' option must be a boolean.`,
      );
    });
    it("should not throw when options is not defined", () => {
      expect(() => normalizeOptions()).not.toThrow();
    });
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "all": undefined,
          "ignoreExtensions": undefined,
        }
      `);
    });
  });
  (process.env.BABEL_8_BREAKING ? describe.skip : describe)("Babel 7", () => {
    it("should not throw on unknown options", () => {
      expect(() => normalizeOptions({ allDeclareField: true })).not.toThrow();
    });
    it.each(["all", "allowDeclareFields"])(
      "should not throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrow();
      },
    );
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "all": undefined,
          "allowDeclareFields": undefined,
          "ignoreExtensions": undefined,
        }
      `);
    });
  });
});
