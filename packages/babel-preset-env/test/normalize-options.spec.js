"use strict";

const normalizeOptions = require("../lib/normalize-options.js");

const {
  checkDuplicateIncludeExcludes,
  validateBoolOption,
  validateModulesOption,
  normalizePluginName,
} = normalizeOptions;
describe("normalize-options", () => {
  describe("normalizeOptions", () => {
    it("should return normalized `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: [
          "babel-plugin-transform-spread",
          "transform-classes",
          "@babel/plugin-transform-unicode-regex",
          "@babel/transform-block-scoping",
        ],
        exclude: [
          "babel-plugin-transform-for-of",
          "transform-parameters",
          "@babel/plugin-transform-regenerator",
          "@babel/transform-new-target",
        ],
      });
      expect(normalized.include).toEqual([
        "transform-spread",
        "transform-classes",
        "transform-unicode-regex",
        "transform-block-scoping",
      ]);
      expect(normalized.exclude).toEqual([
        "transform-for-of",
        "transform-parameters",
        "transform-regenerator",
        "transform-new-target",
      ]);
    });

    it("should not normalize babel-plugin with prefix", () => {
      const normalized = normalizePluginName("prefix-babel-plugin-postfix");
      expect(normalized).toBe("prefix-babel-plugin-postfix");
    });

    test.each`
      include                               | exclude
      ${["babel-plugin-transform-spread"]}  | ${["transform-spread"]}
      ${["@babel/plugin-transform-spread"]} | ${["transform-spread"]}
      ${["transform-spread"]}               | ${["babel-plugin-transform-spread"]}
      ${["transform-spread"]}               | ${["@babel/plugin-transform-spread"]}
      ${["babel-plugin-transform-spread"]}  | ${["@babel/plugin-transform-spread"]}
      ${["@babel/plugin-transform-spread"]} | ${["babel-plugin-transform-spread"]}
      ${["@babel/plugin-transform-spread"]} | ${["@babel/transform-spread"]}
      ${["@babel/transform-spread"]}        | ${["@babel/plugin-transform-spread"]}
      ${["babel-plugin-transform-spread"]}  | ${["@babel/transform-spread"]}
      ${["@babel/transform-spread"]}        | ${["babel-plugin-transform-spread"]}
    `(
      "should throw if with includes $include and excludes $exclude",
      ({ include, exclude }) => {
        expect(() =>
          normalizeOptions.default({ include, exclude }),
        ).toThrowError(/were found in both/);
      },
    );
  });

  describe("Config format validation", () => {
    it("should throw if top-level option not found", () => {
      const unknownTopLevelOption = () => {
        normalizeOptions({ unknown: "option" });
      };
      expect(unknownTopLevelOption).toThrow();
    });
  });

  describe("RegExp include/exclude", () => {
    it("should not allow invalid plugins in `include` and `exclude`", () => {
      const normalizeWithNonExistingPlugin = () => {
        normalizeOptions.default({
          include: ["non-existing-plugin"],
        });
      };
      expect(normalizeWithNonExistingPlugin).toThrow(Error);
    });

    it("should expand regular expressions in `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: ["^[a-z]*-spread", "babel-plugin-transform-classes"],
      });
      expect(normalized.include).toEqual([
        "transform-spread",
        "transform-classes",
      ]);
    });

    it("should expand regular expressions in `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        exclude: ["es6.math.log.*"],
      });
      expect(normalized.exclude).toEqual([
        "es6.math.log1p",
        "es6.math.log10",
        "es6.math.log2",
      ]);
    });

    it("should not allow the same modules in `include` and `exclude`", () => {
      const normalizeWithNonExistingPlugin = () => {
        normalizeOptions.default({
          include: ["es6.math.log2"],
          exclude: ["es6.math.log.*"],
        });
      };
      expect(normalizeWithNonExistingPlugin).toThrow(Error);
    });

    it("should not do partial match if not explicitly defined `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: ["es6.reflect.set-prototype-of"],
        exclude: ["es6.reflect.set"],
      });
      expect(normalized.include).toEqual(["es6.reflect.set-prototype-of"]);
      expect(normalized.exclude).toEqual(["es6.reflect.set"]);
    });
  });

  describe("validateBoolOption", () => {
    it("`undefined` option returns false", () => {
      expect(validateBoolOption("test", undefined, false)).toBe(false);
    });

    it("`false` option returns false", () => {
      expect(validateBoolOption("test", false, false)).toBe(false);
    });

    it("`true` option returns true", () => {
      expect(validateBoolOption("test", true, false)).toBe(true);
    });

    it("array option is invalid", () => {
      expect(() => {
        validateBoolOption("test", [], false);
      }).toThrow();
    });
  });

  describe("checkDuplicateIncludeExcludes", function() {
    it("should throw if duplicate names in both", function() {
      expect(() => {
        checkDuplicateIncludeExcludes(
          ["transform-regenerator", "map"],
          ["transform-regenerator", "map"],
        );
      }).toThrow();
    });

    it("should not throw if no duplicate names in both", function() {
      expect(() => {
        checkDuplicateIncludeExcludes(["transform-regenerator"], ["map"]);
      }).not.toThrow();
    });
  });

  describe("validateModulesOption", () => {
    it("`undefined` option returns auto", () => {
      expect(validateModulesOption()).toBe("auto");
    });

    it("`false` option returns false", () => {
      expect(validateModulesOption(false)).toBe(false);
    });

    it("auto option is valid", () => {
      expect(validateModulesOption("auto")).toBe("auto");
    });

    it("commonjs option is valid", () => {
      expect(validateModulesOption("commonjs")).toBe("commonjs");
    });

    it("systemjs option is valid", () => {
      expect(validateModulesOption("systemjs")).toBe("systemjs");
    });

    it("amd option is valid", () => {
      expect(validateModulesOption("amd")).toBe("amd");
    });

    it("umd option is valid", () => {
      expect(validateModulesOption("umd")).toBe("umd");
    });

    it("`true` option is invalid", () => {
      expect(() => {
        validateModulesOption(true);
      }).toThrow();
    });

    it("array option is invalid", () => {
      expect(() => {
        validateModulesOption([]);
      }).toThrow();
    });
  });
});
