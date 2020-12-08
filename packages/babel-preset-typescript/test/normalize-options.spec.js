import normalizeOptions from "../src/normalize-options";
describe("normalize options", () => {
  describe("Babel_8_breaking", () => {
    let old_babel_8_breaking_env;
    beforeAll(() => {
      old_babel_8_breaking_env = process.env.BABEL_8_BREAKING;
      process.env.BABEL_8_BREAKING = "1";
    });
    afterAll(() => {
      if (old_babel_8_breaking_env) {
        process.env.BABEL_8_BREAKING = old_babel_8_breaking_env;
      } else {
        delete process.env.BABEL_8_BREAKING;
      }
    });
    it("should throw on unknown options", () => {
      expect(() => normalizeOptions({ allowNamespace: true })).toThrowError(
        "@babel/preset-typescript: 'allowNamespace' is not a valid top-level option.\n- Did you mean 'allowNamespaces'?",
      );
    });
    it.each([
      "allowDeclareFields",
      "allExtensions",
      "allowNamespaces",
      "isTSX",
      "onlyRemoveTypeImports",
    ])("should throw when `%p` is not a boolean", optionName => {
      expect(() =>
        normalizeOptions({ [optionName]: 0 }),
      ).toThrowErrorMatchingSnapshot();
    });
    it.each(["jsxPragma", "jsxPragmaFrag"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() =>
          normalizeOptions({ [optionName]: 0 }),
        ).toThrowErrorMatchingSnapshot();
      },
    );
    it("should not throw when options is not defined", () => {
      expect(() => normalizeOptions()).not.toThrowError();
    });
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "allExtensions": false,
          "allowDeclareFields": true,
          "allowNamespaces": true,
          "isTSX": false,
          "jsxPragma": "React",
          "jsxPragmaFrag": "React.Fragment",
          "onlyRemoveTypeImports": true,
        }
      `);
    });
  });
  (process.env.BABEL_8_BREAKING ? describe.skip : describe)("Babel 7", () => {
    it("should not throw on unknown options", () => {
      expect(() =>
        normalizeOptions({ allowNamespace: true }),
      ).not.toThrowError();
    });
    it.each(["allowDeclareFields", "allowNamespaces", "onlyRemoveTypeImports"])(
      "should not throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrowError();
      },
    );
    it.each(["jsxPragma"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrowError();
      },
    );
    it.each(["allExtensions", "isTSX"])(
      "should throw when `%p` is not a boolean",
      optionName => {
        expect(() =>
          normalizeOptions({ [optionName]: 0 }),
        ).toThrowErrorMatchingSnapshot();
      },
    );
    it.each(["jsxPragmaFrag"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() =>
          normalizeOptions({ [optionName]: 0 }),
        ).toThrowErrorMatchingSnapshot();
      },
    );
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "allExtensions": false,
          "allowDeclareFields": undefined,
          "allowNamespaces": undefined,
          "isTSX": false,
          "jsxPragma": undefined,
          "jsxPragmaFrag": "React.Fragment",
          "onlyRemoveTypeImports": undefined,
        }
      `);
    });
  });
});
