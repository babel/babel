import _normalizeOptions from "../lib/normalize-options.js";
const normalizeOptions = _normalizeOptions.default || _normalizeOptions;
import { describeBabel8, describeBabel7 } from "$repo-utils";

describe("normalize options", () => {
  describeBabel8("Babel 8", () => {
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
  describeBabel7("Babel 7", () => {
    it("should not throw on unknown options", () => {
      expect(() => normalizeOptions({ allowNamespace: true })).not.toThrow();
    });
    it.each(["allowDeclareFields", "allowNamespaces", "onlyRemoveTypeImports"])(
      "should not throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrow();
      },
    );
    it.each(["jsxPragma"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrow();
      },
    );
    it.each(["allExtensions", "isTSX", "optimizeConstEnums"])(
      "should throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
          `@babel/preset-typescript: '${optionName}' option must be a boolean.`,
        );
      },
    );
    it.each(["jsxPragmaFrag"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
          `@babel/preset-typescript: '${optionName}' option must be a string.`,
        );
      },
    );
    it("default values in Babel 7", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "allExtensions": false,
          "allowNamespaces": true,
          "disallowAmbiguousJSXLike": false,
          "ignoreExtensions": false,
          "isTSX": false,
          "jsxPragma": undefined,
          "jsxPragmaFrag": "React.Fragment",
          "onlyRemoveTypeImports": undefined,
          "optimizeConstEnums": false,
          "rewriteImportExtensions": false,
        }
      `);
    });
  });
});
