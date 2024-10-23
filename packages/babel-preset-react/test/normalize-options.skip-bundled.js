import _normalizeOptions from "../lib/normalize-options.js";
const normalizeOptions = _normalizeOptions.default || _normalizeOptions;
import { describeBabel8, describeBabel7 } from "$repo-utils";

describe("normalize options", () => {
  describeBabel8("Babel 8", () => {
    it("should throw on unknown options", () => {
      expect(() => normalizeOptions({ throwIfNamespaces: true })).toThrow(
        "@babel/preset-react: 'throwIfNamespaces' is not a valid top-level option.\n- Did you mean 'throwIfNamespace'?",
      );
    });
    it.each(["development", "pure", "throwIfNamespace"])(
      "should throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
          `@babel/preset-react: '${optionName}' option must be a boolean.`,
        );
      },
    );
    it.each(["importSource", "pragma", "pragmaFrag", "runtime"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).toThrow(
          `@babel/preset-react: '${optionName}' option must be a string.`,
        );
      },
    );
    it("should throw on Babel 7 'useBuiltIns' option", () => {
      expect(() => normalizeOptions({ useBuiltIns: true }))
        .toThrowErrorMatchingInlineSnapshot(`
        "@babel/preset-react: Since \\"useBuiltIns\\" is removed in Babel 8, you can remove it from the config.
        - Babel 8 now transforms JSX spread to object spread. If you need to transpile object spread with
        \`useBuiltIns: true\`, you can use the following config
        {
          \\"plugins\\": [
            [\\"@babel/plugin-transform-object-rest-spread\\", { \\"loose\\": true, \\"useBuiltIns\\": true }]
          ],
          \\"presets\\": [\\"@babel/preset-react\\"]
        }"
      `);
    });
    it("should throw on Babel 7 'useSpread' option", () => {
      expect(() =>
        normalizeOptions({ useSpread: true }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"@babel/preset-react: Since Babel 8, an inline object with spread elements is always used, and the \\"useSpread\\" option is no longer available. Please remove it from your config."`,
      );
    });
    it("should throw on unknown 'runtime' option", () => {
      expect(() => normalizeOptions({ runtime: "classical" }))
        .toThrowErrorMatchingInlineSnapshot(`
        "@babel/preset-react: 'runtime' must be one of ['automatic', 'classic'] but we have 'classical'
        - Did you mean 'classic'?"
      `);
    });
    it("should not throw when options are not defined", () => {
      expect(() => normalizeOptions()).not.toThrow();
    });
    it("default values", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "development": undefined,
          "importSource": "react",
          "pragma": undefined,
          "pragmaFrag": undefined,
          "pure": undefined,
          "runtime": "automatic",
          "throwIfNamespace": true,
        }
      `);
      expect(normalizeOptions({ runtime: "classic" })).toMatchInlineSnapshot(`
        Object {
          "development": undefined,
          "importSource": undefined,
          "pragma": "React.createElement",
          "pragmaFrag": "React.Fragment",
          "pure": undefined,
          "runtime": "classic",
          "throwIfNamespace": true,
        }
      `);
    });
  });
  describeBabel7("Babel 7", () => {
    it("should not throw on unknown options", () => {
      expect(() => normalizeOptions({ throwIfNamespaces: true })).not.toThrow();
    });
    it.each(["development", "pure", "throwIfNamespace"])(
      "should not throw when `%p` is not a boolean",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrow();
      },
    );
    it.each(["importSource", "pragma", "pragmaFrag", "runtime"])(
      "should throw when `%p` is not a string",
      optionName => {
        expect(() => normalizeOptions({ [optionName]: 0 })).not.toThrow();
      },
    );
    it("default values in Babel 7", () => {
      expect(normalizeOptions({})).toMatchInlineSnapshot(`
        Object {
          "development": undefined,
          "importSource": undefined,
          "pragma": "React.createElement",
          "pragmaFrag": "React.Fragment",
          "pure": undefined,
          "runtime": "classic",
          "throwIfNamespace": true,
          "useBuiltIns": undefined,
          "useSpread": undefined,
        }
      `);
      expect(normalizeOptions({ runtime: "automatic" })).toMatchInlineSnapshot(`
        Object {
          "development": undefined,
          "importSource": undefined,
          "pragma": undefined,
          "pragmaFrag": undefined,
          "pure": undefined,
          "runtime": "automatic",
          "throwIfNamespace": true,
          "useBuiltIns": undefined,
          "useSpread": undefined,
        }
      `);
    });
  });
});
