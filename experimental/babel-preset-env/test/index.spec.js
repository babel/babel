"use strict";

const babelPresetEnv = require("../lib/index.js");
const assert = require("assert");
const { versions: electronToChromiumData } = require("electron-to-chromium");

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
        chrome: 49
      });
    });

    it("should work with a number", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        electron: 1.0
      }), {
        chrome: 49
      });
    });


    it("should preserve lower Chrome number if Electron version is more recent", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        electron: 1.4,
        chrome: 50
      }), {
        chrome: 50
      });
    });

    it("should overwrite Chrome number if Electron version is older", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        electron: 1.0,
        chrome: 50
      }), {
        chrome: 49
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

    it("should error if electron version is invalid", () => {
      const fixtures = [
        "0.19",
        0.19,
        999,
        "999",
      ];

      fixtures.forEach((electronVersion) => {
        assert.throws(() => {
          babelPresetEnv.getTargets({
            electron: electronVersion,
          });
        }, Error);
      });
    });
  });

  describe("getTargets + uglify", () => {
    it("should work with `true`", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        uglify: true
      }), {
        uglify: true
      });
    });

    it("should ignore `false`", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        uglify: false
      }), {});
    });

    it("should ignore `null`", function() {
      assert.deepEqual(babelPresetEnv.getTargets({
        uglify: null
      }), {});
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

    it("returns true if uglify is specified as a target", () => {
      const plugin = {
        chrome: 50
      };
      const targets = {
        chrome: 55,
        uglify: true
      };

      assert(babelPresetEnv.isPluginRequired(targets, plugin) === true);
    });

    it("doesn't throw when specifying a decimal for node", () => {
      const plugin = {
        node: 6
      };

      const targets = {
        "node": 6.5
      };

      assert.doesNotThrow(() => {
        babelPresetEnv.isPluginRequired(targets, plugin);
      }, Error);
    });

    it("will throw if target version is not a number", () => {
      const plugin = {
        "node": 6,
      };

      const targets = {
        "node": "6.5",
      };

      assert.throws(() => {
        babelPresetEnv.isPluginRequired(targets, plugin);
      }, Error);
    });
  });

  describe("transformIncludesAndExcludes", function() {
    it("should return in transforms array", function() {
      assert.deepEqual(
        babelPresetEnv.transformIncludesAndExcludes(["transform-es2015-arrow-functions"]),
        {
          all: ["transform-es2015-arrow-functions"],
          plugins: ["transform-es2015-arrow-functions"],
          builtIns: []
        }
      );
    });

    it("should return in built-ins array", function() {
      assert.deepEqual(
        babelPresetEnv.transformIncludesAndExcludes(["es6.map"]),
        {
          all: ["es6.map"],
          plugins: [],
          builtIns: ["es6.map"]
        }
      );
    });
  });
});
