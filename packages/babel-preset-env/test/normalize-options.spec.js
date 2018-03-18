"use strict";

const normalizeOptions = require("../lib/normalize-options.js");
const assert = require("assert");

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
        include: ["babel-plugin-transform-spread", "transform-classes"],
      });
      assert.deepEqual(normalized.include, [
        "transform-spread",
        "transform-classes",
      ]);
    });

    it("should not normalize babel-plugin with prefix", () => {
      const normalized = normalizePluginName("prefix-babel-plugin-postfix");
      assert.equal(normalized, "prefix-babel-plugin-postfix");
    });

    it("should throw if duplicate names in `include` and `exclude`", () => {
      const normalizeWithSameIncludes = () => {
        normalizeOptions.default({
          include: ["babel-plugin-transform-spread"],
          exclude: ["transform-spread"],
        });
      };
      assert.throws(normalizeWithSameIncludes, Error);
    });
  });

  describe("RegExp include/exclude", () => {
    it("should not allow invalid plugins in `include` and `exclude`", () => {
      const normalizeWithNonExistingPlugin = () => {
        normalizeOptions.default({
          include: ["non-existing-plugin"],
        });
      };
      assert.throws(normalizeWithNonExistingPlugin, Error);
    });

    it("should expand regular expressions in `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: ["^[a-z]*-spread", "babel-plugin-transform-classes"],
      });
      assert.deepEqual(normalized.include, [
        "transform-spread",
        "transform-classes",
      ]);
    });

    it("should expand regular expressions in `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        exclude: ["es6.math.log.*"],
      });
      assert.deepEqual(normalized.exclude, [
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
      assert.throws(normalizeWithNonExistingPlugin, Error);
    });

    it("should not do partial match if not explicitly defined `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: ["es6.reflect.set-prototype-of"],
        exclude: ["es6.reflect.set"],
      });
      assert.deepEqual(normalized.include, ["es6.reflect.set-prototype-of"]);
      assert.deepEqual(normalized.exclude, ["es6.reflect.set"]);
    });
  });

  describe("validateBoolOption", () => {
    it("`undefined` option returns false", () => {
      assert(validateBoolOption("test", undefined, false) === false);
    });

    it("`false` option returns false", () => {
      assert(validateBoolOption("test", false, false) === false);
    });

    it("`true` option returns true", () => {
      assert(validateBoolOption("test", true, false) === true);
    });

    it("array option is invalid", () => {
      assert.throws(() => {
        validateBoolOption("test", [], false);
      });
    });
  });

  describe("checkDuplicateIncludeExcludes", function() {
    it("should throw if duplicate names in both", function() {
      assert.throws(() => {
        checkDuplicateIncludeExcludes(
          ["transform-regenerator", "map"],
          ["transform-regenerator", "map"],
        );
      }, Error);
    });

    it("should not throw if no duplicate names in both", function() {
      assert.doesNotThrow(() => {
        checkDuplicateIncludeExcludes(["transform-regenerator"], ["map"]);
      }, Error);
    });
  });

  describe("validateModulesOption", () => {
    it("`undefined` option returns commonjs", () => {
      assert(validateModulesOption() === "commonjs");
    });

    it("`false` option returns commonjs", () => {
      assert(validateModulesOption(false) === false);
    });

    it("commonjs option is valid", () => {
      assert(validateModulesOption("commonjs") === "commonjs");
    });

    it("systemjs option is valid", () => {
      assert(validateModulesOption("systemjs") === "systemjs");
    });

    it("amd option is valid", () => {
      assert(validateModulesOption("amd") === "amd");
    });

    it("umd option is valid", () => {
      assert(validateModulesOption("umd") === "umd");
    });

    it("`true` option is invalid", () => {
      assert.throws(() => {
        validateModulesOption(true);
      }, Error);
    });

    it("array option is invalid", () => {
      assert.throws(() => {
        assert(validateModulesOption([]));
      }, Error);
    });
  });
});
