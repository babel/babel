// TODO(Babel 8): Use "semver" directly
import semver, { type SemVer } from "@nicolo-ribaudo/semver-v6";
import corejs2Polyfills from "@babel/compat-data/corejs2-built-ins";
// @ts-expect-error Fixme: TS can not infer types from ../data/core-js-compat.js
// but we can't import core-js-compat/data.json because JSON imports do
// not work on Node 14
import corejs3Polyfills from "../data/core-js-compat";
import { plugins as pluginsList } from "./plugins-compat-data";
import moduleTransformations from "./module-transformations";
import { TopLevelOptions, ModulesOption, UseBuiltInsOption } from "./options";
import { OptionValidator } from "@babel/helper-validator-option";

const corejs2DefaultWebIncludes = [
  "web.timers",
  "web.immediate",
  "web.dom.iterable",
];

import type {
  BuiltInsOption,
  CorejsOption,
  ModuleOption,
  Options,
  PluginListOption,
} from "./types";

const v = new OptionValidator(PACKAGE_JSON.name);

const allPluginsList = Object.keys(pluginsList);

// NOTE: Since module plugins are handled separately compared to other plugins (via the "modules" option) it
// should only be possible to exclude and not include module plugins, otherwise it's possible that preset-env
// will add a module plugin twice.
const modulePlugins = [
  "transform-dynamic-import",
  ...Object.keys(moduleTransformations).map(m => moduleTransformations[m]),
];

const getValidIncludesAndExcludes = (
  type: "include" | "exclude",
  corejs: number | false,
) =>
  Array.from(
    new Set([
      ...allPluginsList,
      ...(type === "exclude" ? modulePlugins : []),
      ...(corejs
        ? corejs == 2
          ? [...Object.keys(corejs2Polyfills), ...corejs2DefaultWebIncludes]
          : Object.keys(corejs3Polyfills)
        : []),
    ]),
  );

function flatMap<T, U>(array: Array<T>, fn: (item: T) => Array<U>): Array<U> {
  return Array.prototype.concat.apply([], array.map(fn));
}

export const normalizePluginName = (plugin: string) =>
  plugin.replace(/^(@babel\/|babel-)(plugin-)?/, "");

const expandIncludesAndExcludes = (
  filterList: PluginListOption = [],
  type: "include" | "exclude",
  corejs: number | false,
) => {
  if (filterList.length === 0) return [];

  const filterableItems = getValidIncludesAndExcludes(type, corejs);

  const invalidFilters: PluginListOption = [];
  const selectedPlugins = flatMap(filterList, filter => {
    let re: RegExp;
    if (typeof filter === "string") {
      try {
        re = new RegExp(`^${normalizePluginName(filter)}$`);
      } catch (e) {
        invalidFilters.push(filter);
        return [];
      }
    } else {
      re = filter;
    }
    const items = filterableItems.filter(item => {
      return process.env.BABEL_8_BREAKING
        ? re.test(item)
        : re.test(item) ||
            // For backwards compatibility, we also support matching against the
            // proposal- name.
            re.test(item.replace(/^transform-/, "proposal-"));
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
  include: Array<string> = [],
  exclude: Array<string> = [],
) => {
  const duplicates = include.filter(opt => exclude.indexOf(opt) >= 0);

  v.invariant(
    duplicates.length === 0,
    `The plugins/built-ins '${duplicates.join(
      ", ",
    )}' were found in both the "include" and
    "exclude" options.`,
  );
};

const normalizeTargets = (
  targets: string | string[] | Options["targets"],
): Options["targets"] => {
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
      ` - 'auto' (default) which will automatically select 'false' if the current\n` +
      `   process is known to support ES module syntax, or "commonjs" otherwise\n`,
  );

  return modulesOpt;
};

export const validateUseBuiltInsOption = (
  builtInsOpt: BuiltInsOption = false,
) => {
  v.invariant(
    // @ts-expect-error we have provided fallback for undefined keys
    UseBuiltInsOption[builtInsOpt.toString()] ||
      builtInsOpt === UseBuiltInsOption.false,
    `The 'useBuiltIns' option must be either
    'false' (default) to indicate no polyfill,
    '"entry"' to indicate replacing the entry polyfill, or
    '"usage"' to import only used polyfills per file`,
  );

  return builtInsOpt;
};

export type NormalizedCorejsOption = {
  proposals: boolean;
  version: SemVer | null | false;
};

export function normalizeCoreJSOption(
  corejs: CorejsOption | undefined | null,
  useBuiltIns: BuiltInsOption,
): NormalizedCorejsOption {
  let proposals = false;
  let rawVersion;

  if (useBuiltIns && corejs === undefined) {
    rawVersion = 2;
    console.warn(
      "\nWARNING (@babel/preset-env): We noticed you're using the `useBuiltIns` option without declaring a " +
        "core-js version. Currently, we assume version 2.x when no version " +
        "is passed. Since this default version will likely change in future " +
        "versions of Babel, we recommend explicitly setting the core-js version " +
        "you are using via the `corejs` option.\n" +
        "\nYou should also be sure that the version you pass to the `corejs` " +
        "option matches the version specified in your `package.json`'s " +
        "`dependencies` section. If it doesn't, you need to run one of the " +
        "following commands:\n\n" +
        "  npm install --save core-js@2    npm install --save core-js@3\n" +
        "  yarn add core-js@2              yarn add core-js@3\n\n" +
        "More info about useBuiltIns: https://babeljs.io/docs/en/babel-preset-env#usebuiltins\n" +
        "More info about core-js: https://babeljs.io/docs/en/babel-preset-env#corejs",
    );
  } else if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const version = rawVersion ? semver.coerce(String(rawVersion)) : false;

  if (!useBuiltIns && version) {
    console.warn(
      "\nWARNING (@babel/preset-env): The `corejs` option only has an effect when the `useBuiltIns` option is not `false`\n",
    );
  }

  if (useBuiltIns && (!version || version.major < 2 || version.major > 3)) {
    throw new RangeError(
      "Invalid Option: The version passed to `corejs` is invalid. Currently, " +
        "only core-js@2 and core-js@3 are supported.",
    );
  }

  return { version, proposals };
}

export default function normalizeOptions(opts: Options) {
  v.validateTopLevelOptions(opts, TopLevelOptions);

  const useBuiltIns = validateUseBuiltInsOption(opts.useBuiltIns);

  const corejs = normalizeCoreJSOption(opts.corejs, useBuiltIns);

  const include = expandIncludesAndExcludes(
    opts.include,
    TopLevelOptions.include,
    !!corejs.version && corejs.version.major,
  );

  const exclude = expandIncludesAndExcludes(
    opts.exclude,
    TopLevelOptions.exclude,
    !!corejs.version && corejs.version.major,
  );

  checkDuplicateIncludeExcludes(include, exclude);

  return {
    bugfixes: v.validateBooleanOption(
      TopLevelOptions.bugfixes,
      opts.bugfixes,
      process.env.BABEL_8_BREAKING ? true : false,
    ),
    configPath: v.validateStringOption(
      TopLevelOptions.configPath,
      opts.configPath,
      process.cwd(),
    ),
    corejs,
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
    loose: v.validateBooleanOption<boolean>(TopLevelOptions.loose, opts.loose),
    modules: validateModulesOption(opts.modules),
    shippedProposals: v.validateBooleanOption(
      TopLevelOptions.shippedProposals,
      opts.shippedProposals,
      false,
    ),
    spec: v.validateBooleanOption(TopLevelOptions.spec, opts.spec, false),
    targets: normalizeTargets(opts.targets),
    useBuiltIns: useBuiltIns,
    browserslistEnv: v.validateStringOption<string>(
      TopLevelOptions.browserslistEnv,
      opts.browserslistEnv,
    ),
  };
}
