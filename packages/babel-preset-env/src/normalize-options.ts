import type { SemVer } from "semver";
import {
  plugins as pluginsList,
  pluginsBugfixes as bugfixPluginsList,
} from "./plugins-compat-data.ts";
import moduleTransformations from "./module-transformations.ts";
import { TopLevelOptions, ModulesOption } from "./options.ts";
import { OptionValidator } from "@babel/helper-validator-option";

import type { ModuleOption, Options, PluginListOption } from "./types.d.ts";

const v = new OptionValidator(PACKAGE_JSON.name);

const allPluginsList = [
  ...Object.keys(pluginsList),
  ...Object.keys(bugfixPluginsList),
];

// NOTE: Since module plugins are handled separately compared to other plugins (via the "modules" option) it
// should only be possible to exclude and not include module plugins, otherwise it's possible that preset-env
// will add a module plugin twice.
const modulePlugins = [
  "transform-dynamic-import",
  ...Object.keys(moduleTransformations).map(m => moduleTransformations[m]),
];

const getValidIncludesAndExcludes = (type: "include" | "exclude") => {
  const set = new Set(allPluginsList);
  if (type === "exclude") modulePlugins.map(set.add, set);
  return Array.from(set);
};

export const normalizePluginName = (plugin: string) =>
  plugin.replace(/^(?:@babel\/|babel-)(?:plugin-)?/, "");

const expandIncludesAndExcludes = (
  filterList: PluginListOption = [],
  type: "include" | "exclude",
) => {
  if (filterList.length === 0) return [];

  const filterableItems = getValidIncludesAndExcludes(type);

  const invalidFilters: PluginListOption = [];
  const selectedPlugins = filterList.flatMap(filter => {
    let re: RegExp;
    if (typeof filter === "string") {
      try {
        re = new RegExp(`^${normalizePluginName(filter)}$`);
      } catch (_) {
        invalidFilters.push(filter);
        return [];
      }
    } else {
      re = filter;
    }
    const items = filterableItems.filter(item => {
      return re.test(item);
    });
    if (items.length === 0) invalidFilters.push(filter);
    return items;
  });

  v.invariant(
    invalidFilters.length === 0,
    `The plugins/built-ins '${invalidFilters.join(
      ", ",
    )}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`,
  );

  return selectedPlugins;
};

export const checkDuplicateIncludeExcludes = (
  include: string[] = [],
  exclude: string[] = [],
) => {
  const duplicates = include.filter(opt => exclude.includes(opt));

  v.invariant(
    duplicates.length === 0,
    `The plugins/built-ins '${duplicates.join(
      ", ",
    )}' were found in both the "include" and
    "exclude" options.`,
  );
};

const normalizeTargets = (
  targets: string | string[] | Options["targets"] | undefined,
): NonNullable<Options["targets"]> => {
  // TODO: Allow to use only query or strings as a targets from next breaking change.
  if (typeof targets === "string" || Array.isArray(targets)) {
    return { browsers: targets };
  }
  return { ...targets };
};

export const validateModulesOption = (
  modulesOpt: ModuleOption = ModulesOption.auto,
) => {
  v.invariant(
    // @ts-expect-error we have provided fallback for undefined keys
    ModulesOption[modulesOpt.toString()] || modulesOpt === ModulesOption.false,
    `The 'modules' option must be one of \n` +
      ` - 'false' to indicate no module processing\n` +
      ` - a specific module type: 'commonjs', 'amd', 'umd', 'systemjs'` +
      ` - 'auto' (default) which will automatically select 'commonjs' if the current\n` +
      `   process is known to *not* support ES module syntax, or 'false' otherwise\n`,
  );

  return modulesOpt;
};

export type NormalizedCorejsOption = {
  proposals: boolean;
  version: SemVer | null | false;
};

export default function normalizeOptions(opts: Options): Omit<
  Required<Options>,
  "include" | "exclude"
> & {
  include: string[];
  exclude: string[];
} {
  v.invariant(
    !Object.hasOwn(opts, "bugfixes"),
    "The 'bugfixes' option has been removed, and now bugfix plugins are" +
      " always enabled. Please remove it from your config.",
  );

  v.validateTopLevelOptions(opts, TopLevelOptions);

  if ((opts as any).useBuiltIns) {
    throw new Error(
      "The 'useBuiltIns' option has been removed. Please use babel-plugin-polyfill-corejs3 instead.",
    );
  }

  const include = expandIncludesAndExcludes(
    opts.include,
    TopLevelOptions.include,
  );

  const exclude = expandIncludesAndExcludes(
    opts.exclude,
    TopLevelOptions.exclude,
  );

  checkDuplicateIncludeExcludes(include, exclude);

  return {
    configPath: v.validateStringOption(
      TopLevelOptions.configPath,
      opts.configPath,
      process.cwd(),
    ),
    debug: v.validateBooleanOption(TopLevelOptions.debug, opts.debug, false),
    include,
    exclude,
    forceAllTransforms: v.validateBooleanOption(
      TopLevelOptions.forceAllTransforms,
      opts.forceAllTransforms,
      false,
    ),
    ignoreBrowserslistConfig: v.validateBooleanOption(
      TopLevelOptions.ignoreBrowserslistConfig,
      opts.ignoreBrowserslistConfig,
      false,
    ),
    modules: validateModulesOption(opts.modules),
    shippedProposals: v.validateBooleanOption(
      TopLevelOptions.shippedProposals,
      opts.shippedProposals,
      false,
    ),
    targets: normalizeTargets(opts.targets),
    browserslistEnv: v.validateStringOption(
      TopLevelOptions.browserslistEnv,
      opts.browserslistEnv,
    ),
  };
}
