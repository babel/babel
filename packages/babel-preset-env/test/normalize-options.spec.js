"use strict";

const normalizeOptions = require("../lib/normalize-options.js");
const assert = require("assert");

const {
  checkDuplicateIncludeExcludes,
  normalizePluginNames,
  validateBoolOption,
  validateIncludesAndExcludes,
  normalizeModulesOption,
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

  describe("normalizePluginNames", function() {
    it("should drop `babel-plugin-` prefix if needed", function() {
      assert.deepEqual(
        normalizePluginNames([
          "babel-plugin-transform-object-super",
          "transform-parameters",
        ]),
        ["transform-object-super", "transform-parameters"],
      );
    });

    it("should not throw if no duplicate names in both", function() {
      assert.doesNotThrow(() => {
        checkDuplicateIncludeExcludes(["transform-regenerator"], ["map"]);
      }, Error);
    });
  });

  describe("normalizeModulesOption", () => {
    it("`undefined` option returns commonjs", () => {
      assert(normalizeModulesOption()[0] === "commonjs");
    });

    it("`false` option returns false", () => {
      assert(normalizeModulesOption(false)[0] === false);
    });

    it("commonjs option is valid", () => {
      assert(normalizeModulesOption("commonjs")[0] === "commonjs");
    });

    it("systemjs option is valid", () => {
      assert(normalizeModulesOption("systemjs")[0] === "systemjs");
    });

    it("amd option is valid", () => {
      assert(normalizeModulesOption("amd")[0] === "amd");
    });

    it("umd option is valid", () => {
      assert(normalizeModulesOption("umd")[0] === "umd");
    });

    it("commonjs option with options is valid", () => {
      const [format, options] = normalizeModulesOption("commonjs", {
        strictMode: true,
      });
      assert(format === "commonjs");
      assert.deepStrictEqual(options, { strictMode: true });
    });

    it("systemjs option with options is valid", () => {
      const [format, options] = normalizeModulesOption("systemjs", {
        strictMode: true,
        loose: true,
      });
      assert(format === "systemjs");
      assert.deepStrictEqual(options, { loose: true, strictMode: true });
    });

    it("amd option with options is valid", () => {
      const [format, options] = normalizeModulesOption("amd", {
        strictMode: true,
        loose: false,
      });
      assert(format === "amd");
      assert.deepStrictEqual(options, { loose: false, strictMode: true });
    });

    it("umd option with options is valid", () => {
      const [format, options] = normalizeModulesOption("umd", {
        strictMode: true,
      });
      assert(format === "umd");
      assert.deepStrictEqual(options, { strictMode: true });
    });

    it("`true` option is invalid", () => {
      assert.throws(() => {
        normalizeModulesOption(true);
      }, Error);
    });
  });
  describe("validateIncludesAndExcludes", function() {
    it("should return empty arrays if undefined", function() {
      assert.deepEqual(validateIncludesAndExcludes(), []);
    });
    it("should throw if not in features", function() {
      assert.throws(() => {
        validateIncludesAndExcludes(["asdf"]);
      }, Error);
    });
  });
});
