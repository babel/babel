// eslint-disable-next-line import/extensions
import compatData from "@babel/compat-data/plugins";
import * as babel from "@babel/core";

import * as babelPresetEnv from "../lib/index.js";

import _removeRegeneratorEntryPlugin from "../lib/polyfills/regenerator.js";
import _pluginLegacyBabelPolyfill from "../lib/polyfills/babel-polyfill.js";
import _transformations from "../lib/module-transformations.js";
import _availablePlugins from "../lib/available-plugins.js";
const removeRegeneratorEntryPlugin =
  _removeRegeneratorEntryPlugin.default || _removeRegeneratorEntryPlugin;
const pluginLegacyBabelPolyfill =
  _pluginLegacyBabelPolyfill.default || _pluginLegacyBabelPolyfill;
const transformations = _transformations.default || _transformations;
const availablePlugins = _availablePlugins.default || _availablePlugins;

// We need to load the correct plugins version (ESM or CJS),
// because our tests rely on function identity.
let pluginCoreJS2, pluginCoreJS3, pluginRegenerator;
import _pluginCoreJS2_esm from "babel-plugin-polyfill-corejs2";
import _pluginCoreJS3_esm from "babel-plugin-polyfill-corejs3";
import _pluginRegenerator_esm from "babel-plugin-polyfill-regenerator";
import { createRequire } from "module";
// eslint-disable-next-line @babel/development-internal/require-default-import-fallback
if (/* commonjs */ _transformations.default) {
  const require = createRequire(import.meta.url);

  pluginCoreJS2 = require("babel-plugin-polyfill-corejs2").default;
  pluginCoreJS3 = require("babel-plugin-polyfill-corejs3").default;
  pluginRegenerator = require("babel-plugin-polyfill-regenerator").default;
} else {
  pluginCoreJS2 = _pluginCoreJS2_esm;
  pluginCoreJS3 = _pluginCoreJS3_esm;
  pluginRegenerator = _pluginRegenerator_esm;
}

const itBabel7 = process.env.BABEL_8_BREAKING ? it.skip : it;
const itBabel8 = process.env.BABEL_8_BREAKING ? it : it.skip;

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
  describe("getModulesPluginNames", () => {
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
            "syntax-import-meta",
          ]);
        });
      });
      describe("ESMs should be transformed", () => {
        describe("dynamic imports should not be transformed", () => {
          it("returns specified modules transform and syntax-dynamic-import", () => {
            expect(
              babelPresetEnv.getModulesPluginNames({
                modules: "commonjs",
                transformations,
                shouldTransformESM: true,
                shouldTransformDynamicImport: false,
                shouldTransformExportNamespaceFrom: false,
              }),
            ).toEqual([
              "transform-modules-commonjs",
              "syntax-dynamic-import",
              "syntax-export-namespace-from",
              "syntax-import-meta",
            ]);
          });
        });
        describe("dynamic imports should be transformed", () => {
          it("returns specified modules transform and transform-dynamic-import", () => {
            expect(
              babelPresetEnv.getModulesPluginNames({
                modules: "systemjs",
                transformations,
                shouldTransformESM: true,
                shouldTransformDynamicImport: true,
                shouldTransformExportNamespaceFrom: false,
              }),
            ).toEqual([
              "transform-modules-systemjs",
              "transform-dynamic-import",
              "syntax-export-namespace-from",
              "syntax-import-meta",
            ]);
          });
          describe("export namespace from should be transformed", () => {
            it("works", () => {
              expect(
                babelPresetEnv.getModulesPluginNames({
                  modules: "systemjs",
                  transformations,
                  shouldTransformESM: true,
                  shouldTransformDynamicImport: true,
                  shouldTransformExportNamespaceFrom: true,
                }),
              ).toEqual([
                "transform-modules-systemjs",
                "transform-dynamic-import",
                "transform-export-namespace-from",
                "syntax-import-meta",
              ]);
            });
          });
        });
      });
    });
  });
  describe("getPolyfillPlugins", () => {
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
            expect(polyfillPlugins[1][0]).toEqual(pluginLegacyBabelPolyfill);
          });
        });
        describe("using corejs 3", () => {
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
              expect(polyfillPlugins[1][0]).toEqual(pluginLegacyBabelPolyfill);
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
              expect(polyfillPlugins[1][0]).toEqual(pluginLegacyBabelPolyfill);
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
            expect(polyfillPlugins[0][0]).toEqual(pluginLegacyBabelPolyfill);
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
              expect(polyfillPlugins[1][0]).toEqual(pluginLegacyBabelPolyfill);
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
              expect(polyfillPlugins[1][0]).toEqual(pluginLegacyBabelPolyfill);
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
    const arrAvailablePlugins = Object.keys(availablePlugins).sort();
    const arrCompatData = Object.keys(compatData)
      // TODO(Babel 8): Remove this .map
      .map(name => name.replace("proposal-", "transform-"))
      .sort();

    expect(arrAvailablePlugins).toEqual(expect.arrayContaining(arrCompatData));
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
});
