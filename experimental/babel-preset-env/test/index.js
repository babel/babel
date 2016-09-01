"use strict";

const babelPresetEnv = require("../lib/index.js");
const assert = require("assert");

describe("babel-preset-env", () => {
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
      }

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
  });
});
