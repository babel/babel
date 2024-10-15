// eslint-disable-next-line import/extensions
import compatData from "@babel/compat-data/plugins";
// eslint-disable-next-line import/extensions
import bugfixesData from "@babel/compat-data/plugin-bugfixes";
import * as babel from "@babel/core";

import { USE_ESM, itBabel7, itBabel8, describeBabel7NoESM } from "$repo-utils";

import * as babelPresetEnv from "../lib/index.js";

import _transformations from "../lib/module-transformations.js";
import _availablePlugins from "../lib/available-plugins.js";
const transformations = _transformations.default || _transformations;
const availablePlugins = _availablePlugins.default || _availablePlugins;

// We need to load the correct plugins version (ESM or CJS),
// because our tests rely on function identity.
let pluginCoreJS3;
import _pluginCoreJS3_esm from "babel-plugin-polyfill-corejs3";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
if (USE_ESM) {
  pluginCoreJS3 = _pluginCoreJS3_esm;
} else {
  pluginCoreJS3 = require("babel-plugin-polyfill-corejs3").default;
}
if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var {
    pluginCoreJS2,
    pluginRegenerator,
    removeRegeneratorEntryPlugin,
    legacyBabelPolyfillPlugin,
  } = require("../lib/polyfills/babel-7-plugins.cjs");
}

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
  describeBabel7NoESM("getModulesPluginNames", () => {
    describe("modules is set to false", () => {
      it("returns only syntax plugins", () => {
        expect(
          babelPresetEnv.getModulesPluginNames({
            modules: false,
            transformations,
            shouldTransformESM: false,
            shouldTransformDynamicImport: false,
            shouldTransformExportNamespaceFrom: false,
          }),
        ).toEqual([
          "syntax-dynamic-import",
          "syntax-export-namespace-from",
          "syntax-top-level-await",
          "syntax-import-meta",
        ]);
      });
    });
    describe("modules is not set to false", () => {
      describe("ESMs should not be transformed", () => {
        it("returns syntax plugins", () => {
          expect(
            babelPresetEnv.getModulesPluginNames({
              modules: "commonjs",
              transformations,
              shouldTransformESM: false,
              shouldTransformDynamicImport: false,
              shouldTransformExportNamespaceFrom: false,
            }),
          ).toEqual([
            "syntax-dynamic-import",
            "syntax-export-namespace-from",
            "syntax-top-level-await",
            "syntax-import-meta",
          ]);
        });
      });
      describe("ESMs should be transformed", () => {
        describe("dynamic imports should not be transformed", () => {
          it("returns specified modules transform and syntax-dynamic-import", () => {
            const names = babelPresetEnv.getModulesPluginNames({
              modules: "commonjs",
              transformations,
              shouldTransformESM: true,
              shouldTransformDynamicImport: false,
              shouldTransformExportNamespaceFrom: false,
            });
            expect(names).toEqual([
              "transform-modules-commonjs",
              "syntax-dynamic-import",
              "syntax-export-namespace-from",
              "syntax-top-level-await",
              "syntax-import-meta",
            ]);
          });
        });
        describe("dynamic imports should be transformed", () => {
          it("returns specified modules transform and transform-dynamic-import", () => {
            const names = babelPresetEnv.getModulesPluginNames({
              modules: "systemjs",
              transformations,
              shouldTransformESM: true,
              shouldTransformDynamicImport: true,
              shouldTransformExportNamespaceFrom: false,
            });
            expect(names).toEqual([
              "transform-modules-systemjs",
              "transform-dynamic-import",
              "syntax-export-namespace-from",
              "syntax-top-level-await",
              "syntax-import-meta",
            ]);
          });
          describe("export namespace from should be transformed", () => {
            it("works", () => {
              const names = babelPresetEnv.getModulesPluginNames({
                modules: "systemjs",
                transformations,
                shouldTransformESM: true,
                shouldTransformDynamicImport: true,
                shouldTransformExportNamespaceFrom: true,
              });
              expect(names).toEqual([
                "transform-modules-systemjs",
                "transform-dynamic-import",
                "transform-export-namespace-from",
                "syntax-top-level-await",
                "syntax-import-meta",
              ]);
            });
          });
        });
      });
    });
  });
  describeBabel7NoESM("getPolyfillPlugins", () => {
    const staticProps = {
      polyfillTargets: [],
      include: new Set(),
      exclude: new Set(),
      proposals: false,
      shippedProposals: false,
      debug: false,
    };
    describe("useBuiltIns is false", () => {
      it("returns no polyfill plugins", () => {
        expect(
          babelPresetEnv.getPolyfillPlugins(
            Object.assign(
              {
                useBuiltIns: false,
                corejs: false,
                regenerator: false,
              },
              staticProps,
            ),
          ),
        ).toEqual([]);
      });
    });
    describe("useBuiltIns is not false", () => {
      describe("corejs is not given", () => {
        it("returns no polyfill plugins", () => {
          expect(
            babelPresetEnv.getPolyfillPlugins(
              Object.assign(
                {
                  useBuiltIns: "usage",
                  corejs: false,
                  regenerator: false,
                },
                staticProps,
              ),
            ),
          ).toEqual([]);
        });
      });
      describe("useBuiltIns is set to usage", () => {
        describe("using corejs 2", () => {
          it("returns an array with core js 2 usage plugin", () => {
            const polyfillPlugins = babelPresetEnv.getPolyfillPlugins(
              Object.assign(
                {
                  useBuiltIns: "usage",
                  corejs: { major: 2 },
                  regenerator: false,
                },
                staticProps,
              ),
            );
            expect(polyfillPlugins.length).toBe(2);
            expect(polyfillPlugins[0][0]).toEqual(pluginCoreJS2);
            expect(polyfillPlugins[1][0]).toEqual(legacyBabelPolyfillPlugin);
          });
        });
        describe("using corejs 3 (babel 7)", () => {
          describe("regenerator is set to false", () => {
            it("returns an array with core js 3 usage plugin", () => {
              const polyfillPlugins = babelPresetEnv.getPolyfillPlugins(
                Object.assign(
                  {
                    useBuiltIns: "usage",
                    corejs: { major: 3 },
                    regenerator: false,
                  },
                  staticProps,
                ),
              );
              expect(polyfillPlugins.length).toBe(2);
              expect(polyfillPlugins[0][0]).toEqual(pluginCoreJS3);
              expect(polyfillPlugins[1][0]).toEqual(legacyBabelPolyfillPlugin);
            });
          });

          describe("regenerator is set to true", () => {
            it("returns an array with core js 3 usage plugin and add regenerator usage plugin", () => {
              const polyfillPlugins = babelPresetEnv.getPolyfillPlugins(
                Object.assign(
                  {
                    useBuiltIns: "usage",
                    corejs: { major: 3 },
                    regenerator: true,
                  },
                  staticProps,
                ),
              );
              expect(polyfillPlugins.length).toBe(3);
              expect(polyfillPlugins[0][0]).toEqual(pluginCoreJS3);
              expect(polyfillPlugins[1][0]).toEqual(legacyBabelPolyfillPlugin);
              expect(polyfillPlugins[2][0]).toEqual(pluginRegenerator);
            });
          });
        });
      });
      describe("useBuiltIns is set to entry", () => {
        describe("using corejs 2", () => {
          it("returns an array with core js 2 entry plugin", () => {
            const polyfillPlugins = babelPresetEnv.getPolyfillPlugins(
              Object.assign(
                {
                  useBuiltIns: "entry",
                  corejs: { major: 2 },
                  regenerator: true,
                },
                staticProps,
              ),
            );
            expect(polyfillPlugins.length).toBe(2);
            expect(polyfillPlugins[0][0]).toEqual(legacyBabelPolyfillPlugin);
            expect(polyfillPlugins[1][0]).toEqual(pluginCoreJS2);
          });
        });
        describe("using corejs 3", () => {
          describe("regenerator is set to true", () => {
            it("returns an array with core js 3 entry plugin", () => {
              const polyfillPlugins = babelPresetEnv.getPolyfillPlugins(
                Object.assign(
                  {
                    useBuiltIns: "entry",
                    corejs: { major: 3 },
                    regenerator: true,
                  },
                  staticProps,
                ),
              );
              expect(polyfillPlugins.length).toBe(2);
              expect(polyfillPlugins[0][0]).toEqual(pluginCoreJS3);
              expect(polyfillPlugins[1][0]).toEqual(legacyBabelPolyfillPlugin);
            });
          });

          describe("regenerator is set to false", () => {
            it("returns an array with core js 3 entry plugin and remove regenerator entry plugin", () => {
              const polyfillPlugins = babelPresetEnv.getPolyfillPlugins(
                Object.assign(
                  {
                    useBuiltIns: "entry",
                    corejs: { major: 3 },
                    regenerator: false,
                  },
                  staticProps,
                ),
              );
              expect(polyfillPlugins.length).toBe(3);
              expect(polyfillPlugins[0][0]).toEqual(pluginCoreJS3);
              expect(polyfillPlugins[1][0]).toEqual(legacyBabelPolyfillPlugin);
              expect(polyfillPlugins[2][0]).toEqual(
                removeRegeneratorEntryPlugin,
              );
            });
          });
        });
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

    itBabel7(
      "logs proposal- for packages that were proposals during the Babel 7 lifetime",
      () => {
        babel.transformSync("code", {
          configFile: false,
          browserslistConfigFile: false,
          presets: [[babelPresetEnv.default, { debug: true }]],
        });
        expect(log).toHaveBeenCalledWith(expect.stringContaining("proposal-"));
      },
    );

    itBabel8(
      "logs transform- for packages that were proposals during the Babel 7 lifetime",
      () => {
        babel.transformSync("code", {
          configFile: false,
          browserslistConfigFile: false,
          presets: [[babelPresetEnv.default, { debug: true }]],
        });
        expect(log).not.toHaveBeenCalledWith(
          expect.stringContaining("proposal-"),
        );
      },
    );
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
