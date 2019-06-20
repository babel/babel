"use strict";

const babelPresetEnv = require("../lib/index");

describe("babel-preset-env", () => {
  describe("transformIncludesAndExcludes", () => {
    it("should return in transforms array", () => {
      expect(
        babelPresetEnv.transformIncludesAndExcludes([
          "transform-arrow-functions",
        ]),
      ).toEqual({
        all: ["transform-arrow-functions"],
        plugins: new Set(["transform-arrow-functions"]),
        builtIns: new Set(),
      });
    });

    it("should return in built-ins array", () => {
      expect(babelPresetEnv.transformIncludesAndExcludes(["es.map"])).toEqual({
        all: ["es.map"],
        plugins: new Set(),
        builtIns: new Set(["es.map"]),
      });
    });
  });
});
