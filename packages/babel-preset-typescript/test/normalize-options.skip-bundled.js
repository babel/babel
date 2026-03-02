import _normalizeOptions from "../lib/normalize-options.js";
const normalizeOptions = _normalizeOptions.default || _normalizeOptions;

describe("normalize options", () => {
  describe("Babel 8", () => {
    it("should throw on unknown options", () => {
      expect(() => normalizeOptions({ allowNamespace: true })).toThrow(
        "@babel/preset-typescript: 'allowNamespace' is not a valid top-level option.\n- Did you mean 'allowNamespaces'?",
      );
    });
    it.each([
      "allowNamespaces",
      "ignoreExtensions",
      "onlyRemoveTypeImports",
      "optimizeConstEnums",
    ])("should throw when `%p` is not a boolean", optionName => {
      expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
        `@babel/preset-typescript: '${optionName}' option must be a boolean.`,
      );
    });
    it.each(["jsxPragma", "jsxPragmaFrag"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
          `@babel/preset-typescript: '${optionName}' option must be a string.`,
        );
      },
    );
    it.each(["isTSX", "allExtensions"])(
      "should throw when `%p` is used",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: true })).toThrow(
          `@babel/preset-typescript: The .allExtensions and .isTSX options have been removed.`,
        );
      },
    );
    it("should not throw when options is not defined", () => {
      expect(() => normalizeOptions()).not.toThrow();
    });
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "allowNamespaces": true,
          "disallowAmbiguousJSXLike": false,
          "ignoreExtensions": false,
          "jsxPragma": "React",
          "jsxPragmaFrag": "React.Fragment",
          "onlyRemoveTypeImports": true,
          "optimizeConstEnums": false,
          "rewriteImportExtensions": false,
        }
      `);
    });
  });
});
