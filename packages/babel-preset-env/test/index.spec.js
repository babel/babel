"use strict";

const babelPresetEnv = require("../lib/index");
const addCoreJS3UsagePlugin = require("../lib/polyfills/corejs3/usage-plugin")
  .default;
const addRegeneratorUsagePlugin = require("../lib/polyfills/regenerator/usage-plugin")
  .default;
const replaceCoreJS3EntryPlugin = require("../lib/polyfills/corejs3/entry-plugin")
  .default;
const removeRegeneratorEntryPlugin = require("../lib/polyfills/regenerator/entry-plugin")
  .default;
const transformations = require("../lib/module-transformations").default;

const compatData = require("@babel/compat-data/plugins");
const availablePlugins = require("../lib/available-plugins").default;

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
      it("returns only syntax-dynamic-import", () => {
        expect(
          babelPresetEnv.getModulesPluginNames({
            modules: false,
            transformations,
            shouldTransformESM: false,
            shouldTransformDynamicImport: false,
          }),
        ).toEqual(["syntax-dynamic-import"]);
      });
    });
    describe("modules is not set to false", () => {
      describe("ESMs should not be transformed", () => {
        it("returns syntax-dynamic-import", () => {
          expect(
            babelPresetEnv.getModulesPluginNames({
              modules: "commonjs",
              transformations,
              shouldTransformESM: false,
              shouldTransformDynamicImport: false,
            }),
          ).toEqual(["syntax-dynamic-import"]);
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
              }),
            ).toEqual(["transform-modules-commonjs", "syntax-dynamic-import"]);
          });
        });
        describe("dynamic imports should be transformed", () => {
          it("returns specified modules transform and proposal-dynamic-import", () => {
            expect(
              babelPresetEnv.getModulesPluginNames({
                modules: "systemjs",
                transformations,
                shouldTransformESM: true,
                shouldTransformDynamicImport: true,
              }),
            ).toEqual([
              "transform-modules-systemjs",
              "proposal-dynamic-import",
            ]);
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
              expect(polyfillPlugins.length).toBe(1);
              expect(polyfillPlugins[0][0]).toEqual(addCoreJS3UsagePlugin);
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
              expect(polyfillPlugins.length).toBe(2);
              expect(polyfillPlugins[0][0]).toEqual(addCoreJS3UsagePlugin);
              expect(polyfillPlugins[1][0]).toEqual(addRegeneratorUsagePlugin);
            });
          });
        });
      });
      describe("useBuiltIns is set to entry", () => {
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
              expect(polyfillPlugins.length).toBe(1);
              expect(polyfillPlugins[0][0]).toEqual(replaceCoreJS3EntryPlugin);
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
              expect(polyfillPlugins.length).toBe(2);
              expect(polyfillPlugins[0][0]).toEqual(replaceCoreJS3EntryPlugin);
              expect(polyfillPlugins[1][0]).toEqual(
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
    const arrCompatData = Object.keys(compatData).sort();

    expect(arrAvailablePlugins).toEqual(expect.arrayContaining(arrCompatData));
  });
});
