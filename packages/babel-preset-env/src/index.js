//@flow

import corejs2Polyfills from "../data/corejs2-built-ins.json";
import corejs3Polyfills from "core-js-compat/data";
import { logPluginOrPolyfill } from "./debug";
import {
  getCoreJS2PlatformSpecificDefaultFor,
  getOptionSpecificExcludesFor,
} from "./defaults";
import { filterItems } from "./env-filter";
import moduleTransformations from "./module-transformations";
import normalizeOptions from "./normalize-options.js";
import pluginList from "../data/plugins.json";
import {
  builtIns as proposalBuiltIns,
  corejs3ShippedProposalsList,
  features as proposalPlugins,
  pluginSyntaxMap,
} from "../data/shipped-proposals.js";
import addCoreJS2UsagePlugin from "./polyfills/corejs2/usage-plugin";
import addCoreJS3UsagePlugin from "./polyfills/corejs3/usage-plugin";
import addRegeneratorUsagePlugin from "./polyfills/regenerator/usage-plugin";
import replaceCoreJS2EntryPlugin from "./polyfills/corejs2/entry-plugin";
import replaceCoreJS3EntryPlugin from "./polyfills/corejs3/entry-plugin";
import removeRegeneratorEntryPlugin from "./polyfills/regenerator/entry-plugin";
import getTargets from "./targets-parser";
import availablePlugins from "./available-plugins";
import { filterStageFromList, prettifyTargets } from "./utils";
import { declare } from "@babel/helper-plugin-utils";

const corejs2PolyfillsWithoutProposals = filterStageFromList(
  corejs2Polyfills,
  proposalBuiltIns,
);

const pluginListWithoutProposals = filterStageFromList(
  pluginList,
  proposalPlugins,
);

const corejs3PolyfillsWithoutProposals = Object.keys(corejs3Polyfills)
  .filter(name => !name.startsWith("esnext."))
  .reduce((memo, key) => {
    memo[key] = corejs3Polyfills[key];
    return memo;
  }, {});

const corejs3PolyfillsWithShippedProposals = corejs3ShippedProposalsList.reduce(
  (memo, key) => {
    memo[key] = corejs3Polyfills[key];
    return memo;
  },
  { ...corejs3PolyfillsWithoutProposals },
);

const getPlugin = (pluginName: string) => {
  const plugin = availablePlugins[pluginName];

  if (!plugin) {
    throw new Error(
      `Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`,
    );
  }

  return plugin;
};

const getBuiltInTargets = targets => {
  // eslint-disable-next-line no-unused-vars
  const { uglify, ...builtInTargets } = targets;
  return builtInTargets;
};

export const transformIncludesAndExcludes = (opts: Array<string>): Object => {
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

function supportsStaticESM(caller) {
  return !!(caller && caller.supportsStaticESM);
}

export default declare((api, opts) => {
  api.assertVersion(7);

  const {
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    loose,
    modules,
    shippedProposals,
    spec,
    targets: optionsTargets,
    useBuiltIns,
    corejs,
    proposals,
  } = normalizeOptions(opts);
  // TODO: remove this in next major
  let hasUglifyTarget = false;

  if (optionsTargets && optionsTargets.uglify) {
    hasUglifyTarget = true;
    delete optionsTargets.uglify;

    console.log("");
    console.log("The uglify target has been deprecated. Set the top level");
    console.log("option `forceAllTransforms: true` instead.");
    console.log("");
  }

  if (optionsTargets && optionsTargets.esmodules && optionsTargets.browsers) {
    console.log("");
    console.log(
      "@babel/preset-env: esmodules and browsers targets have been specified together.",
    );
    console.log(
      `\`browsers\` target, \`${optionsTargets.browsers}\` will be ignored.`,
    );
    console.log("");
  }

  const targets = getTargets(optionsTargets, {
    ignoreBrowserslistConfig,
    configPath,
  });
  const include = transformIncludesAndExcludes(optionsInclude);
  const exclude = transformIncludesAndExcludes(optionsExclude);

  const transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets;

  const transformations = filterItems(
    shippedProposals ? pluginList : pluginListWithoutProposals,
    include.plugins,
    exclude.plugins,
    transformTargets,
    null,
    getOptionSpecificExcludesFor({ loose }),
    pluginSyntaxMap,
  );

  const plugins = [];
  const pluginUseBuiltIns = useBuiltIns !== false;

  if (
    modules !== false &&
    moduleTransformations[modules] &&
    // TODO: Remove the 'api.caller' check eventually. Just here to prevent
    // unnecessary breakage in the short term for users on older betas/RCs.
    (modules !== "auto" || !api.caller || !api.caller(supportsStaticESM))
  ) {
    // NOTE: not giving spec here yet to avoid compatibility issues when
    // transform-modules-commonjs gets its spec mode
    plugins.push([getPlugin(moduleTransformations[modules]), { loose }]);
  }

  transformations.forEach(pluginName =>
    plugins.push([
      getPlugin(pluginName),
      { spec, loose, useBuiltIns: pluginUseBuiltIns },
    ]),
  );

  const regenerator = transformations.has("transform-regenerator");

  if (debug) {
    console.log("@babel/preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify(prettifyTargets(targets), null, 2));
    console.log(`\nUsing modules transform: ${modules.toString()}`);
    console.log("\nUsing plugins:");
    transformations.forEach(transform => {
      logPluginOrPolyfill(transform, targets, pluginList);
    });

    if (!useBuiltIns) {
      console.log(
        "\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.",
      );
    } else {
      console.log(`\nUsing polyfills with \`${useBuiltIns}\` option:`);
    }
  }

  if (useBuiltIns === "usage" || useBuiltIns === "entry") {
    const polyfillTargets = getBuiltInTargets(targets);

    const polyfills = filterItems(
      corejs.major === 2
        ? shippedProposals
          ? corejs2Polyfills
          : corejs2PolyfillsWithoutProposals
        : proposals // || useBuiltIns === "entry"
        ? corejs3Polyfills
        : shippedProposals
        ? corejs3PolyfillsWithShippedProposals
        : corejs3PolyfillsWithoutProposals,
      include.builtIns,
      exclude.builtIns,
      polyfillTargets,
      corejs.major === 2
        ? getCoreJS2PlatformSpecificDefaultFor(polyfillTargets)
        : null,
      null,
    );

    const pluginOptions = {
      useBuiltIns,
      debug,
      polyfills,
      regenerator,
      polyfillTargets,
      allBuiltInsList: corejs.major === 2 ? corejs2Polyfills : corejs3Polyfills,
      corejs,
    };

    if (useBuiltIns === "usage") {
      if (corejs.major === 2) {
        plugins.push([addCoreJS2UsagePlugin, pluginOptions]);
      } else {
        plugins.push([addCoreJS3UsagePlugin, pluginOptions]);
      }
      if (regenerator) {
        plugins.push([addRegeneratorUsagePlugin, pluginOptions]);
      }
    } else {
      if (corejs.major === 2) {
        plugins.push([replaceCoreJS2EntryPlugin, pluginOptions]);
      } else {
        plugins.push([replaceCoreJS3EntryPlugin, pluginOptions]);
        if (!regenerator) {
          plugins.push([removeRegeneratorEntryPlugin, pluginOptions]);
        }
      }
    }
  }

  return {
    plugins,
  };
});
