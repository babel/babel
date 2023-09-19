import semver, { type SemVer } from "semver";
import { logPlugin } from "./debug.ts";
import getOptionSpecificExcludesFor from "./get-option-specific-excludes.ts";
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

import removeRegeneratorEntryPlugin from "./polyfills/regenerator.ts";
import legacyBabelPolyfillPlugin from "./polyfills/babel-polyfill.ts";

import type { CallerMetadata } from "@babel/core";

import _pluginCoreJS2 from "babel-plugin-polyfill-corejs2";
import _pluginCoreJS3 from "babel-plugin-polyfill-corejs3";
import _pluginRegenerator from "babel-plugin-polyfill-regenerator";
const pluginCoreJS2 = _pluginCoreJS2.default || _pluginCoreJS2;
const pluginCoreJS3 = _pluginCoreJS3.default || _pluginCoreJS3;
const pluginRegenerator = _pluginRegenerator.default || _pluginRegenerator;

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

// TODO(Babel 8): Do not export this function
const dynamicImportValidTransformTypes = new Set<ModuleOption>([
  "cjs",
  "commonjs",
  "amd",
  "systemjs",
]);

export function getModulesPluginNames({
  modules,
  shouldTransformDynamicImport,
  shouldTransformExportNamespaceFrom,
}: {
  modules: Exclude<ModuleOption, "auto">;
  shouldTransformDynamicImport: boolean;
  shouldTransformExportNamespaceFrom: boolean;
}) {
  // For backward compat since this function is exported
  if (!process.env.BABEL_8_BREAKING) {
    if (arguments[0].modules === "auto") modules = "cjs";
    if (arguments[0].shouldTransformESM === false) modules = false;
  }
  const modulesPluginNames = [];
  if (modules) {
    modulesPluginNames.push(moduleTransformations[modules]);
  }

  if (shouldTransformDynamicImport) {
    if (dynamicImportValidTransformTypes.has(modules)) {
      modulesPluginNames.push("transform-dynamic-import");
    } else {
      console.warn(
        "Dynamic import can only be transformed when transforming ES" +
          " modules to AMD, CommonJS or SystemJS.",
      );
    }
  }

  if (shouldTransformExportNamespaceFrom) {
    modulesPluginNames.push("transform-export-namespace-from");
  }

  if (!process.env.BABEL_8_BREAKING) {
    // Enable module-related syntax plugins for older Babel versions
    if (!shouldTransformDynamicImport) {
      modulesPluginNames.push("syntax-dynamic-import");
    }
    if (!shouldTransformExportNamespaceFrom) {
      modulesPluginNames.push("syntax-export-namespace-from");
    }
    modulesPluginNames.push("syntax-top-level-await");
    modulesPluginNames.push("syntax-import-meta");
  }

  return modulesPluginNames;
}

export const getPolyfillPlugins = ({
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
    const pluginOptions = {
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
    };

    if (corejs) {
      if (useBuiltIns === "usage") {
        if (corejs.major === 2) {
          polyfillPlugins.push(
            [pluginCoreJS2, pluginOptions],
            [legacyBabelPolyfillPlugin, { usage: true }],
          );
        } else {
          polyfillPlugins.push(
            [pluginCoreJS3, pluginOptions],
            [legacyBabelPolyfillPlugin, { usage: true, deprecated: true }],
          );
        }
        if (regenerator) {
          polyfillPlugins.push([
            pluginRegenerator,
            { method: "usage-global", debug },
          ]);
        }
      } else {
        if (corejs.major === 2) {
          polyfillPlugins.push(
            [legacyBabelPolyfillPlugin, { regenerator }],
            [pluginCoreJS2, pluginOptions],
          );
        } else {
          polyfillPlugins.push(
            [pluginCoreJS3, pluginOptions],
            [legacyBabelPolyfillPlugin, { deprecated: true }],
          );
          if (!regenerator) {
            polyfillPlugins.push([removeRegeneratorEntryPlugin, pluginOptions]);
          }
        }
      }
    }
  }
  return polyfillPlugins;
};

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
  return Boolean(
    // TODO(Babel 8): Fallback to true
    // @ts-expect-error supportsStaticESM is not defined in CallerMetadata
    caller?.supportsStaticESM ?? (process.env.BABEL_8_BREAKING ? false : false),
  );
}

function supportsDynamicImport(caller: CallerMetadata | undefined) {
  return Boolean(
    // TODO(Babel 8): Fallback to true
    // @ts-expect-error supportsDynamicImport is not defined in CallerMetadata
    caller?.supportsDynamicImport ??
      (process.env.BABEL_8_BREAKING ? false : false),
  );
}

function supportsExportNamespaceFrom(caller: CallerMetadata | undefined) {
  // @ts-expect-error supportsExportNamespaceFrom is not defined in CallerMetadata
  const supported = caller?.supportsExportNamespaceFrom;
  return supported == null ? null : Boolean(supported);
}

export default declarePreset((api, opts: Options) => {
  api.assertVersion(7);

  const babelTargets = api.targets();

  const {
    bugfixes,
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    loose,
    modules: optionsModules,
    shippedProposals,
    spec,
    targets: optionsTargets,
    useBuiltIns,
    corejs: { version: corejs, proposals },
    browserslistEnv,
  } = normalizeOptions(opts);

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
  const targetsNeedExportNsTransform = isRequired(
    "transform-export-namespace-from",
    transformTargets,
    { compatData, includes: include.plugins, excludes: exclude.plugins },
  );
  const shouldTransformExportNamespaceFrom =
    modules === false
      ? targetsNeedExportNsTransform
      : optionsModules === "auto"
      ? api.caller(supportsExportNamespaceFrom) ?? targetsNeedExportNsTransform
      : false;
  const modulesPluginNames = getModulesPluginNames({
    modules,
    shouldTransformDynamicImport,
    shouldTransformExportNamespaceFrom,
  });

  const pluginNames = filterItems(
    compatData,
    include.plugins,
    exclude.plugins,
    transformTargets,
    modulesPluginNames,
    getOptionSpecificExcludesFor({ loose }),
    pluginSyntaxMap,
  );
  if (shippedProposals) {
    addProposalSyntaxPlugins(pluginNames, proposalSyntaxPlugins);
  }
  removeUnsupportedItems(pluginNames, api.version);
  removeUnnecessaryItems(pluginNames, overlappingPlugins);

  const polyfillPlugins = getPolyfillPlugins({
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
        pluginName === "transform-class-properties" ||
        pluginName === "transform-private-methods" ||
        pluginName === "transform-private-property-in-object"
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
        { spec, loose, useBuiltIns: pluginUseBuiltIns },
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
