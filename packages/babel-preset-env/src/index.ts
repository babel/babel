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

import type { CallerMetadata, PluginItem, PresetAPI } from "@babel/core";

import pluginCoreJS3 from "babel-plugin-polyfill-corejs3";

import getTargets, {
  prettifyTargets,
  filterItems,
} from "@babel/helper-compilation-targets";
import type { Targets, InputTargets } from "@babel/helper-compilation-targets";
import availablePlugins from "./available-plugins.ts";
import { declarePreset } from "@babel/helper-plugin-utils";

import type { BuiltInsOption, ModuleOption, Options } from "./types.d.ts";
export type { Options };

/**
 * @deprecated Use `isRequired` from `@babel/helper-compilation-targets` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isPluginRequired(targets: Targets, support: Targets) {
  throw new Error(
    "`isPluginRequired` has been removed in Babel 8. Please use `isRequired` from `@babel/helper-compilation-targets` instead.",
  );
}

function filterStageFromList(
  list: Record<string, Targets>,
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

const pluginsListWithProposals = Object.assign(
  {},
  pluginsList,
  pluginsBugfixesList,
);
const pluginsListWithoutProposals = filterStageFromList(
  pluginsListWithProposals,
  proposalPlugins,
);

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

export const transformIncludesAndExcludes = (opts: string[]): any => {
  return opts.reduce(
    (result, opt) => {
      const target = /^(?:es|es6|es7|esnext|web)\./.test(opt)
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

function getLocalTargets(
  optionsTargets: Options["targets"],
  ignoreBrowserslistConfig: boolean,
  configPath: string,
  browserslistEnv: string,
  api: PresetAPI,
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
    onBrowserslistConfigFound(config) {
      api.addExternalDependency(config);
    },
  });
}

function supportsStaticESM(caller: CallerMetadata | undefined) {
  // TODO(Babel 9): Fallback to true
  return !!caller?.supportsStaticESM;
}

function supportsDynamicImport(caller: CallerMetadata | undefined) {
  // TODO(Babel 9): Fallback to true
  return !!caller?.supportsDynamicImport;
}

function supportsExportNamespaceFrom(caller: CallerMetadata | undefined) {
  // TODO(Babel 9): Fallback to null
  return !!caller?.supportsExportNamespaceFrom;
}

export default declarePreset((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const babelTargets = api.targets();

  if ("loose" in opts || "spec" in opts) {
    throw new Error(
      "@babel/preset-env: The 'loose' and 'spec' options have been removed, " +
        "and you should configure granular compiler assumptions instead. See " +
        "https://babeljs.io/assumptions for more information.",
    );
  }

  const {
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
    targets = getLocalTargets(
      optionsTargets,
      ignoreBrowserslistConfig,
      configPath,
      browserslistEnv,
      api,
    );
  }

  const transformTargets = forceAllTransforms ? ({} as Targets) : targets;

  const include = transformIncludesAndExcludes(optionsInclude);
  const exclude = transformIncludesAndExcludes(optionsExclude);

  const compatData = shippedProposals
    ? pluginsListWithProposals
    : pluginsListWithoutProposals;

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
  // TODO(Babel 9): stop doing this, similarly to how we don't do this for any
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

    undefined,
    pluginSyntaxMap,
  );
  if (shippedProposals) {
    addProposalSyntaxPlugins(pluginNames, proposalSyntaxPlugins);
  }
  removeUnsupportedItems(pluginNames, api.version);
  removeUnnecessaryItems(pluginNames, overlappingPlugins);

  const polyfillPlugins: PluginItem[] = useBuiltIns
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
    : [];

  const pluginUseBuiltIns = useBuiltIns !== false;
  const plugins = Array.from(pluginNames)
    .map((pluginName): PluginItem => {
      return [getPlugin(pluginName), { useBuiltIns: pluginUseBuiltIns }];
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
