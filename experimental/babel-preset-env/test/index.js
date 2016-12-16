"use strict";

const babelPresetEnv = require("../lib/index.js");
const assert = require("assert");
const electronToChromiumData = require("../data/electron-to-chromium");

const {
  validateModulesOption,
  validateLooseOption,
  validatePluginsOption,
  checkDuplicateIncludeExcludes
} = babelPresetEnv;

describe("babel-preset-env", () => {
  describe("getTargets", () => {
    it("should return the current node version with option 'current'", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        node: true
      }), {
        node: parseFloat(process.versions.node)
      });

      assert.deepEqual(babelPresetEnv.getTargets({
        node: "current"
      }), {
        node: parseFloat(process.versions.node)
      });
    });
  });

  describe("getTargets + electron", () => {
    it("should work with a string", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        electron: "1.0"
      }), {
        chrome: 50
      });
    });

    it("should work with a number", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        electron: 1.0
      }), {
        chrome: 50
      });
    });

    Object.keys(electronToChromiumData).forEach((electronVersion) => {
      it(`"should work for Electron: ${electronVersion}`, function() {
        assert.deepEqual(babelPresetEnv.getTargets({
          electron: electronVersion
        }), {
          chrome: electronToChromiumData[electronVersion]
        });
      });
    });
  });

  describe("isPluginRequired", () => {
    it("returns true if no targets are specified", () => {
      const isRequired = babelPresetEnv.isPluginRequired({}, {});
      assert(isRequired);
    });

    it("returns true if plugin feature is not implemented in one or more targets", () => {
      let targets;
      const plugin = {
        edge: false,
        firefox: 45,
        chrome: 49,
      };

      targets = {
        "chrome": Number.MAX_SAFE_INTEGER,
        "firefox": Number.MAX_SAFE_INTEGER
      };
      assert(babelPresetEnv.isPluginRequired(targets, plugin) === false);

      targets = {
        "edge": 12,
      };
      assert(babelPresetEnv.isPluginRequired(plugin, plugin) === true);
    });

    it("returns false if plugin feature is implemented by lower than target", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        "chrome": Number.MAX_SAFE_INTEGER,
      };
      assert(babelPresetEnv.isPluginRequired(targets, plugin) === false);
    });

    it("returns false if plugin feature is implemented is equal to target", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        "chrome": 49,
      };
      assert(babelPresetEnv.isPluginRequired(targets, plugin) === false);
    });

    it("returns true if plugin feature is implemented is greater than target", () => {
      const plugin = {
        chrome: 50,
      };
      const targets = {
        "chrome": 49,
      };
      assert(babelPresetEnv.isPluginRequired(targets, plugin) === true);
    });

    it("returns false if plugin feature is implemented by lower than target defined in browsers query", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        "browsers": "chrome > 50"
      };
      assert(babelPresetEnv.isPluginRequired(targets, plugin) === false);
    });

    it("returns true if plugin feature is implemented is greater than target defined in browsers query", () => {
      const plugin = {
        chrome: 52,
      };
      const targets = {
        "browsers": "chrome > 50"
      };
      assert(babelPresetEnv.isPluginRequired(targets, plugin) === true);
    });

    it("returns true if target's root items overrides versions defined in browsers query", () => {
      const plugin = {
        chrome: 45,
      };
      const targets = {
        browsers: "last 2 Chrome versions",
        chrome: 44
      };

      assert(babelPresetEnv.isPluginRequired(targets, plugin) === true);
    });

    it("doesn't throw when specifiying a decimal for node", () => {
      let targets;
      const plugin = {
        node: 6
      };

      targets = {
        "node": 6.5
      };

      assert.doesNotThrow(() => {
        babelPresetEnv.isPluginRequired(targets, plugin);
      }, Error);
    });
  });

  describe("validateLooseOption", () => {
    it("`undefined` option returns false", () => {
      assert(validateLooseOption() === false);
    });

    it("`false` option returns false", () => {
      assert(validateLooseOption(false) === false);
    });

    it("`true` option returns true", () => {
      assert(validateLooseOption(true) === true);
    });

    it("array option is invalid", () => {
      assert.throws(() => {
        validateModulesOption([]);
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

    describe("validatePluginsOption", function() {
      it("should return empty arrays if undefined", function() {
        assert.deepEqual(validatePluginsOption(), { all: [], plugins: [], builtIns: [] });
      });

      it("should return in transforms array", function() {
        assert.deepEqual(
          validatePluginsOption(["transform-es2015-arrow-functions"]),
          {
            all: ["transform-es2015-arrow-functions"],
            plugins: ["transform-es2015-arrow-functions"],
            builtIns: []
          }
        );
      });

      it("should return in built-ins array", function() {
        assert.deepEqual(
          validatePluginsOption(["es6.map"]),
          {
            all: ["es6.map"],
            plugins: [],
            builtIns: ["es6.map"]
          }
        );
      });

      it("should throw if not in features", function() {
        assert.throws(() => {
          validatePluginsOption(["asdf"]);
        }, Error);
      });
    });

    describe("checkDuplicateIncludeExcludes", function() {
      it("should throw if duplicate names in both", function() {
        assert.throws(() => {
          checkDuplicateIncludeExcludes(
            ["transform-regenerator", "map"],
            ["transform-regenerator", "map"]
          );
        }, Error);
      });

      it("should not throw if no duplicate names in both", function() {
        assert.doesNotThrow(() => {
          checkDuplicateIncludeExcludes(
            ["transform-regenerator"],
            ["map"]
          );
        }, Error);
      });
    });
  });
});
