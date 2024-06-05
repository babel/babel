import _normalizeOptions, {
  checkDuplicateIncludeExcludes,
  validateModulesOption,
  validateUseBuiltInsOption,
  normalizePluginName,
} from "../lib/normalize-options.js";
const normalizeOptions = _normalizeOptions.default || _normalizeOptions;
import { itBabel7, itBabel8 } from "$repo-utils";

describe("normalize-options", () => {
  describe("normalizeOptions", () => {
    it("should return normalized `include` and `exclude`", () => {
      const normalized = normalizeOptions({
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
        expect(() => normalizeOptions({ include, exclude })).toThrow(
          /were found in both/,
        );
      },
    );

    it("should not throw if corejs version is valid", () => {
      ["3.5", "3.5.5"].forEach(corejs => {
        ["entry", "usage"].forEach(useBuiltIns => {
          expect(() => normalizeOptions({ useBuiltIns, corejs })).not.toThrow();
        });
      });
    });

    itBabel7("should not throw if corejs version is valid (babel 7)", () => {
      [2, 2.1, 3].forEach(corejs => {
        ["entry", "usage"].forEach(useBuiltIns => {
          expect(() => normalizeOptions({ useBuiltIns, corejs })).not.toThrow();
        });
      });
    });

    itBabel7("should throw if corejs version is invalid (babel 7)", () => {
      [1, 1.2, 4, 4.5].forEach(corejs => {
        ["entry", "usage"].forEach(useBuiltIns => {
          expect(() => normalizeOptions({ useBuiltIns, corejs })).toThrow(
            /The version passed to `corejs` is invalid./,
          );
        });
      });
    });

    itBabel8("should throw if corejs version is invalid", () => {
      [1, 1.2, 4, 4.5, 3, 3.1, "3"].forEach(corejs => {
        ["entry", "usage"].forEach(useBuiltIns => {
          expect(() => normalizeOptions({ useBuiltIns, corejs })).toThrow(
            /The version passed to `corejs` is invalid./,
          );
        });
      });
    });

    it("throws when including module plugins", () => {
      expect(() =>
        normalizeOptions({ include: ["transform-dynamic-import"] }),
      ).toThrow();
      expect(() =>
        normalizeOptions({ include: ["transform-modules-amd"] }),
      ).toThrow();
    });

    it("allows exclusion of module plugins", () => {
      expect(() =>
        normalizeOptions({ exclude: ["transform-dynamic-import"] }),
      ).not.toThrow();
      expect(() =>
        normalizeOptions({ exclude: ["transform-modules-commonjs"] }),
      ).not.toThrow();
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
      const normalizeIncludeWithNonExistingPlugin = () => {
        normalizeOptions({
          include: ["non-existing-plugin"],
        });
      };
      const normalizeExcludeWithNonExistingPlugin = () => {
        normalizeOptions({
          exclude: ["non-existing-plugin"],
        });
      };
      expect(normalizeIncludeWithNonExistingPlugin).toThrow(Error);
      expect(normalizeExcludeWithNonExistingPlugin).toThrow(Error);
    });

    it("should expand regular expressions in `include`", () => {
      const normalized = normalizeOptions({
        include: ["^[a-z]*-spread", "babel-plugin-transform-classes"],
      });
      expect(normalized.include).toEqual([
        "transform-spread",
        "transform-classes",
      ]);
    });

    it("should expand regular expressions in `exclude`", () => {
      const normalized = normalizeOptions({
        useBuiltIns: "entry",
        corejs: "3.0",
        exclude: ["es.math.log.*"],
      });
      expect(normalized.exclude).toEqual([
        "es.math.log10",
        "es.math.log1p",
        "es.math.log2",
      ]);
    });

    itBabel7("should work both with proposal-* and transform-*", () => {
      expect(
        normalizeOptions({ include: ["proposal-.*-regex"] }).include,
      ).toEqual([
        "transform-duplicate-named-capturing-groups-regex",
        "transform-unicode-sets-regex",
        "transform-dotall-regex",
        "transform-unicode-property-regex",
        "transform-named-capturing-groups-regex",
        "transform-sticky-regex",
        "transform-unicode-regex",
      ]);

      expect(
        normalizeOptions({ include: ["transform-.*-regex"] }).include,
      ).toEqual([
        "transform-duplicate-named-capturing-groups-regex",
        "transform-unicode-sets-regex",
        "transform-dotall-regex",
        "transform-unicode-property-regex",
        "transform-named-capturing-groups-regex",
        "transform-sticky-regex",
        "transform-unicode-regex",
      ]);
    });

    it("should not allow the same modules in `include` and `exclude`", () => {
      const normalizeWithNonExistingPlugin = () => {
        normalizeOptions({
          useBuiltIns: "entry",
          corejs: "3.0",
          include: ["es.math.log2"],
          exclude: ["es.math.log.*"],
        });
      };
      expect(normalizeWithNonExistingPlugin).toThrow(Error);
    });

    it("should not do partial match if not explicitly defined `include` and `exclude`", () => {
      const normalized = normalizeOptions({
        useBuiltIns: "entry",
        corejs: "3.0",
        include: ["es.reflect.set-prototype-of"],
        exclude: ["es.reflect.set"],
      });
      expect(normalized.include).toEqual(["es.reflect.set-prototype-of"]);
      expect(normalized.exclude).toEqual(["es.reflect.set"]);
    });
  });

  describe("checkDuplicateIncludeExcludes", function () {
    it("should throw if duplicate names in both", function () {
      expect(() => {
        checkDuplicateIncludeExcludes(
          ["transform-regenerator", "map"],
          ["transform-regenerator", "map"],
        );
      }).toThrow();
    });

    it("should not throw if no duplicate names in both", function () {
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

    it("`'false'` option is invalid", () => {
      expect(() => {
        validateModulesOption("false");
      }).toThrow();
    });

    it("array option is invalid", () => {
      expect(() => {
        validateModulesOption([]);
      }).toThrow();
    });
  });

  describe("validateUseBuiltInsOptions", () => {
    it("usage option is valid", () => {
      expect(validateUseBuiltInsOption("usage")).toBe("usage");
    });

    it("entry option is valid", () => {
      expect(validateUseBuiltInsOption("entry")).toBe("entry");
    });

    it("`false` option returns false", () => {
      expect(validateUseBuiltInsOption(false)).toBe(false);
    });

    it("`'false'` option is invalid", () => {
      expect(() => {
        validateUseBuiltInsOption("false");
      }).toThrow();
    });
  });
});
