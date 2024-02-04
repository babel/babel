import semver, { type SemVer } from "semver";
import { logPlugin } from "./debug.ts";
import {
  addProposalSyntaxPlugins,
  removeUnnecessaryItems,
  removeUnsupportedItems,
} from "./filter-items.ts";
import moduleTransformations from "./module-transformations.ts";
import normalizeOptions from "./normalize-options.ts";
import {
  pluginSyntaxMap,
  proposalPlugins,
  proposalSyntaxPlugins,
} from "./shipped-proposals.ts";
import {
  plugins as pluginsList,
  pluginsBugfixes as pluginsBugfixesList,
  overlappingPlugins,
} from "./plugins-compat-data.ts";

import type { CallerMetadata } from "@babel/core";

import _pluginCoreJS3 from "babel-plugin-polyfill-corejs3";
// TODO(Babel 8): Just use the default import
const pluginCoreJS3 = _pluginCoreJS3.default || _pluginCoreJS3;

// TODO(Babel 8): Remove this
import babel7 from "./polyfills/babel-7-plugins.cjs";

import getTargets, {
  prettifyTargets,
  filterItems,
  isRequired,
} from "@babel/helper-compilation-targets";
import type { Targets, InputTargets } from "@babel/helper-compilation-targets";
import availablePlugins from "./available-plugins.ts";
import { declarePreset } from "@babel/helper-plugin-utils";

import type { BuiltInsOption, ModuleOption, Options } from "./types.ts";

// TODO: Remove in Babel 8
export function isPluginRequired(targets: Targets, support: Targets) {
  return isRequired("fake-name", targets, {
    compatData: { "fake-name": support },
  });
}

function filterStageFromList(
  list: { [feature: string]: Targets },
  stageList: Set<string>,
) {
  return Object.keys(list).reduce((result, item) => {
    if (!stageList.has(item)) {
      // @ts-expect-error todo: refine result types
      result[item] = list[item];
    }

    return result;
  }, {});
}

const pluginLists = {
  withProposals: {
    withoutBugfixes: pluginsList,
    withBugfixes: Object.assign({}, pluginsList, pluginsBugfixesList),
  },
  withoutProposals: {
    withoutBugfixes: filterStageFromList(pluginsList, proposalPlugins),
    withBugfixes: filterStageFromList(
      Object.assign({}, pluginsList, pluginsBugfixesList),
      proposalPlugins,
    ),
  },
};

function getPluginList(proposals: boolean, bugfixes: boolean) {
  if (proposals) {
    if (bugfixes) return pluginLists.withProposals.withBugfixes;
    else return pluginLists.withProposals.withoutBugfixes;
  } else {
    if (bugfixes) return pluginLists.withoutProposals.withBugfixes;
    else return pluginLists.withoutProposals.withoutBugfixes;
  }
}

const getPlugin = (pluginName: string) => {
  const plugin =
    // @ts-expect-error plugin name is constructed from available plugin list
    availablePlugins[pluginName]();

  if (!plugin) {
    throw new Error(
      `Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`,
    );
  }

  return plugin;
};

export const transformIncludesAndExcludes = (opts: Array<string>): any => {
  return opts.reduce(
    (result, opt) => {
      const target = opt.match(/^(es|es6|es7|esnext|web)\./)
        ? "builtIns"
        : "plugins";
      result[target].add(opt);
      return result;
    },
    {
      all: opts,
      plugins: new Set(),
      builtIns: new Set(),
    },
  );
};

function getSpecialModulesPluginNames(
  modules: Exclude<ModuleOption, "auto">,
  shouldTransformDynamicImport: boolean,
) {
  const modulesPluginNames = [];
  if (modules) {
    modulesPluginNames.push(moduleTransformations[modules]);
  }

  if (shouldTransformDynamicImport) {
    if (modules && modules !== "umd") {
      modulesPluginNames.push("transform-dynamic-import");
    } else {
      console.warn(
        "Dynamic import can only be transformed when transforming ES" +
          " modules to AMD, CommonJS or SystemJS.",
      );
    }
  }

  if (!process.env.BABEL_8_BREAKING) {
    // Enable module-related syntax plugins for older Babel versions
    if (!shouldTransformDynamicImport) {
      modulesPluginNames.push("syntax-dynamic-import");
    }
    modulesPluginNames.push("syntax-top-level-await");
    modulesPluginNames.push("syntax-import-meta");
  }

  return modulesPluginNames;
}

const getCoreJSOptions = ({
  useBuiltIns,
  corejs,
  polyfillTargets,
  include,
  exclude,
  proposals,
  shippedProposals,
  debug,
}: {
  useBuiltIns: BuiltInsOption;
  corejs: SemVer | null | false;
  polyfillTargets: Targets;
  include: Set<string>;
  exclude: Set<string>;
  proposals: boolean;
  shippedProposals: boolean;
  debug: boolean;
}) => ({
  method: `${useBuiltIns}-global`,
  version: corejs ? corejs.toString() : undefined,
  targets: polyfillTargets,
  include,
  exclude,
  proposals,
  shippedProposals,
  debug,
  "#__secret_key__@babel/preset-env__compatibility": {
    noRuntimeName: true,
  },
});

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var getPolyfillPlugins = ({
    useBuiltIns,
    corejs,
    polyfillTargets,
    include,
    exclude,
    proposals,
    shippedProposals,
    regenerator,
    debug,
  }: {
    useBuiltIns: BuiltInsOption;
    corejs: SemVer | null | false;
    polyfillTargets: Targets;
    include: Set<string>;
    exclude: Set<string>;
    proposals: boolean;
    shippedProposals: boolean;
    regenerator: boolean;
    debug: boolean;
  }) => {
    const polyfillPlugins = [];
    if (useBuiltIns === "usage" || useBuiltIns === "entry") {
      const pluginOptions = getCoreJSOptions({
        useBuiltIns,
        corejs,
        polyfillTargets,
        include,
        exclude,
        proposals,
        shippedProposals,
        debug,
      });

      if (corejs) {
        if (process.env.BABEL_8_BREAKING) {
          polyfillPlugins.push([pluginCoreJS3, pluginOptions]);
        } else {
          if (useBuiltIns === "usage") {
            if (corejs.major === 2) {
              polyfillPlugins.push(
                [babel7.pluginCoreJS2, pluginOptions],
                [babel7.legacyBabelPolyfillPlugin, { usage: true }],
              );
            } else {
              polyfillPlugins.push(
                [pluginCoreJS3, pluginOptions],
                [
                  babel7.legacyBabelPolyfillPlugin,
                  { usage: true, deprecated: true },
                ],
              );
            }
            if (regenerator) {
              polyfillPlugins.push([
                babel7.pluginRegenerator,
                { method: "usage-global", debug },
              ]);
            }
          } else {
            if (corejs.major === 2) {
              polyfillPlugins.push(
                [babel7.legacyBabelPolyfillPlugin, { regenerator }],
                [babel7.pluginCoreJS2, pluginOptions],
              );
            } else {
              polyfillPlugins.push(
                [pluginCoreJS3, pluginOptions],
                [babel7.legacyBabelPolyfillPlugin, { deprecated: true }],
              );
              if (!regenerator) {
                polyfillPlugins.push([
                  babel7.removeRegeneratorEntryPlugin,
                  pluginOptions,
                ]);
              }
            }
          }
        }
      }
    }
    return polyfillPlugins;
  };

  if (!USE_ESM) {
    // eslint-disable-next-line no-restricted-globals
    exports.getPolyfillPlugins = getPolyfillPlugins;
  }
}

function getLocalTargets(
  optionsTargets: Options["targets"],
  ignoreBrowserslistConfig: boolean,
  configPath: string,
  browserslistEnv: string,
) {
  if (optionsTargets?.esmodules && optionsTargets.browsers) {
    console.warn(`
@babel/preset-env: esmodules and browsers targets have been specified together.
\`browsers\` target, \`${optionsTargets.browsers.toString()}\` will be ignored.
`);
  }

  return getTargets(optionsTargets as InputTargets, {
    ignoreBrowserslistConfig,
    configPath,
    browserslistEnv,
  });
}

function supportsStaticESM(caller: CallerMetadata | undefined) {
  // TODO(Babel 8): Fallback to true
  // @ts-expect-error supportsStaticESM is not defined in CallerMetadata
  return !!caller?.supportsStaticESM;
}

function supportsDynamicImport(caller: CallerMetadata | undefined) {
  // TODO(Babel 8): Fallback to true
  // @ts-expect-error supportsDynamicImport is not defined in CallerMetadata
  return !!caller?.supportsDynamicImport;
}

function supportsExportNamespaceFrom(caller: CallerMetadata | undefined) {
  // TODO(Babel 8): Fallback to null
  // @ts-expect-error supportsExportNamespaceFrom is not defined in CallerMetadata
  return !!caller?.supportsExportNamespaceFrom;
}

export default declarePreset((api, opts: Options) => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  const babelTargets = api.targets();

  if (process.env.BABEL_8_BREAKING && ("loose" in opts || "spec" in opts)) {
    throw new Error(
      "@babel/preset-env: The 'loose' and 'spec' options have been removed, " +
        "and you should configure granular compiler assumptions instead. See " +
        "https://babeljs.io/assumptions for more information.",
    );
  }

  const {
    bugfixes,
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    modules: optionsModules,
    shippedProposals,
    targets: optionsTargets,
    useBuiltIns,
    corejs: { version: corejs, proposals },
    browserslistEnv,
  } = normalizeOptions(opts);

  if (!process.env.BABEL_8_BREAKING) {
    // eslint-disable-next-line no-var
    var { loose, spec = false } = opts;
  }

  let targets = babelTargets;

  if (
    // @babel/core < 7.13.0 doesn't load targets (api.targets() always
    // returns {} thanks to @babel/helper-plugin-utils), so we always want
    // to fallback to the old targets behavior in this case.
    semver.lt(api.version, "7.13.0") ||
    // If any browserslist-related option is specified, fallback to the old
    // behavior of not using the targets specified in the top-level options.
    opts.targets ||
    opts.configPath ||
    opts.browserslistEnv ||
    opts.ignoreBrowserslistConfig
  ) {
    if (!process.env.BABEL_8_BREAKING) {
      // eslint-disable-next-line no-var
      var hasUglifyTarget = false;

      if (optionsTargets?.uglify) {
        hasUglifyTarget = true;
        delete optionsTargets.uglify;

        console.warn(`
The uglify target has been deprecated. Set the top level
option \`forceAllTransforms: true\` instead.
`);
      }
    }

    targets = getLocalTargets(
      optionsTargets,
      ignoreBrowserslistConfig,
      configPath,
      browserslistEnv,
    );
  }

  const transformTargets = (
    process.env.BABEL_8_BREAKING
      ? forceAllTransforms
      : forceAllTransforms || hasUglifyTarget
  )
    ? ({} as Targets)
    : targets;

  const include = transformIncludesAndExcludes(optionsInclude);
  const exclude = transformIncludesAndExcludes(optionsExclude);

  const compatData = getPluginList(shippedProposals, bugfixes);
  const modules =
    optionsModules === "auto"
      ? api.caller(supportsStaticESM)
        ? false
        : "commonjs"
      : optionsModules;
  const shouldTransformDynamicImport =
    optionsModules === "auto" ? !api.caller(supportsDynamicImport) : !!modules;

  // If the caller does not support export-namespace-from, we forcefully add
  // the plugin to `includes`.
  // TODO(Babel 8): stop doing this, similarly to how we don't do this for any
  // other plugin. We can consider adding bundlers as targets in the future,
  // but we should not have a one-off special case for this plugin.
  if (
    !exclude.plugins.has("transform-export-namespace-from") &&
    (optionsModules === "auto"
      ? !api.caller(supportsExportNamespaceFrom)
      : !!modules)
  ) {
    include.plugins.add("transform-export-namespace-from");
  }

  const pluginNames = filterItems(
    compatData,
    include.plugins,
    exclude.plugins,
    transformTargets,
    getSpecialModulesPluginNames(modules, shouldTransformDynamicImport),
    process.env.BABEL_8_BREAKING || !loose
      ? undefined
      : ["transform-typeof-symbol"],
    pluginSyntaxMap,
  );
  if (shippedProposals) {
    addProposalSyntaxPlugins(pluginNames, proposalSyntaxPlugins);
  }
  removeUnsupportedItems(pluginNames, api.version);
  removeUnnecessaryItems(pluginNames, overlappingPlugins);

  const polyfillPlugins = process.env.BABEL_8_BREAKING
    ? useBuiltIns
      ? [
          [
            pluginCoreJS3,
            getCoreJSOptions({
              useBuiltIns,
              corejs,
              polyfillTargets: targets,
              include: include.builtIns,
              exclude: exclude.builtIns,
              proposals,
              shippedProposals,
              debug,
            }),
          ],
        ]
      : []
    : getPolyfillPlugins({
        useBuiltIns,
        corejs,
        polyfillTargets: targets,
        include: include.builtIns,
        exclude: exclude.builtIns,
        proposals,
        shippedProposals,
        regenerator: pluginNames.has("transform-regenerator"),
        debug,
      });

  const pluginUseBuiltIns = useBuiltIns !== false;
  const plugins = Array.from(pluginNames)
    .map(pluginName => {
      if (
        !process.env.BABEL_8_BREAKING &&
        (pluginName === "transform-class-properties" ||
          pluginName === "transform-private-methods" ||
          pluginName === "transform-private-property-in-object")
      ) {
        return [
          getPlugin(pluginName),
          {
            loose: loose
              ? "#__internal__@babel/preset-env__prefer-true-but-false-is-ok-if-it-prevents-an-error"
              : "#__internal__@babel/preset-env__prefer-false-but-true-is-ok-if-it-prevents-an-error",
          },
        ];
      }
      if (pluginName === "syntax-import-attributes") {
        // For backward compatibility with the import-assertions plugin, we
        // allow the deprecated `assert` keyword.
        // TODO(Babel 8): Revisit this.
        return [getPlugin(pluginName), { deprecatedAssertSyntax: true }];
      }
      return [
        getPlugin(pluginName),
        process.env.BABEL_8_BREAKING
          ? { useBuiltIns: pluginUseBuiltIns }
          : { spec, loose, useBuiltIns: pluginUseBuiltIns },
      ];
    })
    .concat(polyfillPlugins);

  if (debug) {
    console.log("@babel/preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify(prettifyTargets(targets), null, 2));
    console.log(`\nUsing modules transform: ${optionsModules.toString()}`);
    console.log("\nUsing plugins:");
    pluginNames.forEach(pluginName => {
      logPlugin(pluginName, targets, compatData);
    });

    if (!useBuiltIns) {
      console.log(
        "\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.",
      );
    }
  }

  return { plugins };
});

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  // eslint-disable-next-line no-restricted-globals
  exports.getModulesPluginNames = ({
    modules,
    transformations,
    shouldTransformESM,
    shouldTransformDynamicImport,
    shouldTransformExportNamespaceFrom,
  }: {
    modules: ModuleOption;
    transformations: typeof import("./module-transformations").default;
    shouldTransformESM: boolean;
    shouldTransformDynamicImport: boolean;
    shouldTransformExportNamespaceFrom: boolean;
  }) => {
    const modulesPluginNames = [];
    if (modules !== false && transformations[modules]) {
      if (shouldTransformESM) {
        modulesPluginNames.push(transformations[modules]);
      }

      if (shouldTransformDynamicImport) {
        if (shouldTransformESM && modules !== "umd") {
          modulesPluginNames.push("transform-dynamic-import");
        } else {
          console.warn(
            "Dynamic import can only be transformed when transforming ES" +
              " modules to AMD, CommonJS or SystemJS.",
          );
        }
      }
    }

    if (shouldTransformExportNamespaceFrom) {
      modulesPluginNames.push("transform-export-namespace-from");
    }
    if (!shouldTransformDynamicImport) {
      modulesPluginNames.push("syntax-dynamic-import");
    }
    if (!shouldTransformExportNamespaceFrom) {
      modulesPluginNames.push("syntax-export-namespace-from");
    }
    modulesPluginNames.push("syntax-top-level-await");
    modulesPluginNames.push("syntax-import-meta");

    return modulesPluginNames;
  };
}
