import * as babel from "@babel/core";

import * as babelPresetEnv from "../lib/index.js";

import _availablePlugins from "../lib/available-plugins.js";
const availablePlugins = _availablePlugins.default || _availablePlugins;

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// eslint-disable-next-line import/no-unresolved, import/extensions
import compatData from "@babel/compat-data/plugins" with { type: "json" };
// eslint-disable-next-line import/no-unresolved, import/extensions
import bugfixesData from "@babel/compat-data/plugin-bugfixes" with { type: "json" };

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

  it("available-plugins is in sync with @babel/compat-data", () => {
    const arrAvailablePlugins = Object.keys(availablePlugins)
      .filter(
        name =>
          // 1. The syntax plugins are always enabled, they don't have compat-data entries
          // 2. The modules transforms are for non-ES module systems, they don't have compat-data entries
          // 3. The dynamic import transform is controlled by the modules option and the API caller support
          !(
            name.startsWith("syntax-") ||
            name.startsWith("transform-modules-") ||
            name === "transform-dynamic-import"
          ),
      )
      .sort();
    const arrCompatData = [
      ...Object.keys(compatData),
      ...Object.keys(bugfixesData),
    ].sort();

    for (const plugin of arrAvailablePlugins) {
      expect(arrCompatData).toContain(plugin);
    }
  });

  describe("debug", () => {
    let log;
    beforeEach(() => {
      log = jest.spyOn(console, "log").mockImplementation(() => {});
    });
    afterEach(() => {
      log.mockRestore();
    });

    it("logs transform- for packages that were proposals during the Babel 7 lifetime", () => {
      babel.transformSync("code", {
        configFile: false,
        browserslistConfigFile: false,
        presets: [[babelPresetEnv.default, { debug: true }]],
      });
      expect(log).not.toHaveBeenCalledWith(
        expect.stringContaining("proposal-"),
      );
    });
  });

  it("should add .browserslistrc to external dependencies when configPath is specified", () => {
    const browserslistConfigFile = require.resolve(
      "./regressions/.browserslistrc",
    );
    const { externalDependencies } = babel.transformSync("", {
      configFile: false,
      presets: [
        [babelPresetEnv.default, { configPath: browserslistConfigFile }],
      ],
    });
    expect(externalDependencies).toContain(browserslistConfigFile);
  });

  it.todo(
    "should add .browserslistrc to external dependencies when browserslistConfigFile is specified",
  );

  describe("when process.env.BROWSERSLIST_CONFIG is specified", () => {
    afterEach(() => {
      delete process.env.BROWSERSLIST_CONFIG;
    });
    it("should add process.env.BROWSERSLIST_CONFIG to external dependencies using preset-env's resolveTarget", () => {
      const browserslistConfigFile = require.resolve(
        "./regressions/.browserslistrc",
      );
      process.env.BROWSERSLIST_CONFIG = browserslistConfigFile;
      const { externalDependencies } = babel.transformSync("", {
        configFile: false,
        presets: [[babelPresetEnv.default, { browserslistEnv: "development" }]],
      });
      expect(externalDependencies).toContain(browserslistConfigFile);
    });

    it.todo(
      "should add process.env.BROWSERSLIST_CONFIG to external dependencies using core's resolveTarget",
    );
  });
});
