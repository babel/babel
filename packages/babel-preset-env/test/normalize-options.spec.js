"use strict";

const normalizeOptions = require("../lib/normalize-options.js");

const {
  checkDuplicateIncludeExcludes,
  validateBoolOption,
  validateModulesOption,
  validateTransformModeOption,
  normalizePluginName,
} = normalizeOptions;
describe("normalize-options", () => {
  describe("normalizeOptions", () => {
    it("should return normalized `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: ["babel-plugin-transform-spread", "transform-classes"],
      });
      expect(normalized.include).toEqual([
        "transform-spread",
        "transform-classes",
      ]);
    });

    it("should not normalize babel-plugin with prefix", () => {
      const normalized = normalizePluginName("prefix-babel-plugin-postfix");
      expect(normalized).toBe("prefix-babel-plugin-postfix");
    });

    it("should throw if duplicate names in `include` and `exclude`", () => {
      const normalizeWithSameIncludes = () => {
        normalizeOptions.default({
          include: ["babel-plugin-transform-spread"],
          exclude: ["transform-spread"],
        });
      };
      expect(normalizeWithSameIncludes).toThrow();
    });
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
    it("`undefined` option returns commonjs", () => {
      expect(validateModulesOption()).toBe("commonjs");
    });

    it("`false` option returns commonjs", () => {
      expect(validateModulesOption(false)).toBe(false);
    });

    it("commonjs option is valid", () => {
      expect(validateModulesOption()).toBe("commonjs");
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

  describe("validateTransformModeOption", () => {
    it("`undefined` for everything returns normal", () => {
      expect(validateTransformModeOption({})).toBe("normal");
    });

    it("`transformMode: 'normal'` is valid", () => {
      expect(validateTransformModeOption({ transformMode: "normal" })).toBe(
        "normal",
      );
    });

    it("`transformMode: 'performance'` is valid", () => {
      expect(
        validateTransformModeOption({ transformMode: "performance" }),
      ).toBe("performance");
    });

    it("`transformMode: 'compliance'` is valid", () => {
      expect(validateTransformModeOption({ transformMode: "compliance" })).toBe(
        "compliance",
      );
    });

    it("`spec: true` returns 'compliance'", () => {
      expect(validateTransformModeOption({ spec: true })).toBe("compliance");
    });

    it("`loose: true` returns 'performance'", () => {
      expect(validateTransformModeOption({ loose: true })).toBe("performance");
    });
  });
});
