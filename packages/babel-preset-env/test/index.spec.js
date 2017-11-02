"use strict";

const babelPresetEnv = require("../lib/index.js");
const assert = require("assert");

describe("babel-preset-env", () => {
  describe("isPluginRequired", () => {
    const MAX_VERSION = `${Number.MAX_SAFE_INTEGER}.0.0`;

    it("returns true if no targets are specified", () => {
      assert.strictEqual(babelPresetEnv.isPluginRequired({}, {}), true);
    });

    it("returns true if plugin feature is not implemented in one or more targets", () => {
      let targets;
      const plugin = {
        edge: false,
        firefox: 45,
        chrome: 49,
      };

      targets = {
        chrome: MAX_VERSION,
        firefox: MAX_VERSION,
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        false,
      );

      targets = {
        edge: "12",
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        true,
      );
    });

    it("returns false if plugin feature is implemented by lower than target", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        chrome: MAX_VERSION,
      };

      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        false,
      );
    });

    it("returns false if plugin feature is implemented by lower than target (ecmascript)", () => {
      const plugin = {
        ecmascript: 2015,
      };
      const targets = {
        ecmascript: "2018",
      };

      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        false,
      );
    });

    it("returns false if plugin feature is implemented is equal to target", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        chrome: "49.0.0",
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        false,
      );
    });

    it("returns false if plugin feature is implemented is equal to target (ecmascript)", () => {
      const plugin = {
        ecmascript: 2015,
      };
      const targets = {
        ecmascript: "2015",
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        false,
      );
    });

    it("returns true if plugin feature is implemented is greater than target", () => {
      const plugin = {
        chrome: 50,
      };
      const targets = {
        chrome: "49.0.0",
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        true,
      );
    });

    it("returns true if plugin feature is implemented is greater than target (ecmascript)", () => {
      const plugin = {
        ecmascript: 2018,
      };
      const targets = {
        ecmascript: "5",
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        true,
      );
    });

    it("returns true if uglify is specified as a target", () => {
      const plugin = {
        chrome: 50,
      };
      const targets = {
        chrome: "55.0.0",
        uglify: true,
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        true,
      );
    });

    it("returns when target is a decimal", () => {
      const plugin = {
        node: 6.9,
      };
      const targets = {
        node: "6.10.0",
      };
      assert.strictEqual(
        babelPresetEnv.isPluginRequired(targets, plugin),
        false,
      );
    });

    it("throws an error if target version is invalid", () => {
      const plugin = {
        chrome: 50,
      };
      const targets = {
        chrome: 55,
      };
      assert.throws(() => babelPresetEnv.isPluginRequired(targets, plugin));
    });
  });

  describe("transformIncludesAndExcludes", () => {
    it("should return in transforms array", () => {
      assert.deepEqual(
        babelPresetEnv.transformIncludesAndExcludes([
          "transform-arrow-functions",
        ]),
        {
          all: ["transform-arrow-functions"],
          plugins: new Set(["transform-arrow-functions"]),
          builtIns: new Set(),
        },
      );
    });

    it("should return in built-ins array", () => {
      assert.deepEqual(
        babelPresetEnv.transformIncludesAndExcludes(["es6.map"]),
        {
          all: ["es6.map"],
          plugins: new Set(),
          builtIns: new Set(["es6.map"]),
        },
      );
    });
  });
});
