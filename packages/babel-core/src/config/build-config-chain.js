// @flow

import path from "path";
import micromatch from "micromatch";
import buildDebug from "debug";
import {
  validate,
  type ValidatedOptions,
  type PluginItem,
  type PluginList,
  type IgnoreList,
} from "./options";

const debug = buildDebug("babel:config:config-chain");

import {
  loadPlugin,
  loadPreset,
  findConfigs,
  loadConfig,
  type ConfigFile,
} from "./loading/files";

import { makeWeakCache, makeStrongCache } from "./caching";

type ConfigItem = {
  type: "arguments" | "env" | "file",
  options: ValidatedOptions,
  alias: string,
  dirname: string,
};

export type ConfigChain = {
  plugins: Array<BasicDescriptor>,
  presets: Array<BasicDescriptor>,
  options: Array<ValidatedOptions>,
};

export type BasicDescriptor = {
  name: string | void,
  value: {} | Function,
  options: {} | void | false,
  dirname: string,
  alias: string,
  ownPass?: boolean,
};

export type PresetInstance = SimpleConfig;

type LoadedConfig = {
  options: ValidatedOptions,
  plugins: Array<BasicDescriptor>,
  presets: Array<BasicDescriptor>,
};

type ConfigPart =
  | {
      part: "config",
      config: ConfigItem,
      ignore: ?IgnoreList,
      only: ?IgnoreList,
      activeEnv: string | null,
    }
  | {
      part: "extends",
      path: string,
      dirname: string,
      activeEnv: string | null,
    };

type SimpleConfig = {
  options: ValidatedOptions,
  alias: string,
  dirname: string,
};

export const buildPresetChain = makeWeakCache(
  (preset: PresetInstance): ConfigChain => {
    const loaded = processConfig(preset);

    return {
      plugins: loaded.plugins,
      presets: loaded.presets,
      options: [loaded.options],
    };
  },
);

export function buildRootChain(
  cwd: string,
  opts: ValidatedOptions,
  envName: string,
): ConfigChain | null {
  const filename = opts.filename ? path.resolve(cwd, opts.filename) : null;
  const builder = new ConfigChainBuilder(
    filename ? new LoadedFile(filename) : null,
  );

  try {
    builder.mergeConfigArguments(opts, cwd, envName);

    // resolve all .babelrc files
    if (opts.babelrc !== false && filename) {
      findConfigs(path.dirname(filename), envName).forEach(configFile =>
        builder.mergeConfigFile(configFile, envName),
      );
    }
  } catch (e) {
    if (e.code !== "BABEL_IGNORED_FILE") throw e;

    return null;
  }

  return dedupLoadedConfigs(
    builder.configs.reverse().map(config => processConfig(config)),
  );
}

class ConfigChainBuilder {
  file: LoadedFile | null;
  configs: Array<ConfigItem> = [];
  seenFiles: Set<ConfigFile> = new Set();

  constructor(file: LoadedFile | null) {
    this.file = file;
  }

  mergeConfigArguments(
    opts: ValidatedOptions,
    dirname: string,
    envKey: string,
  ) {
    flattenArgumentsOptionsParts(opts, dirname, envKey).forEach(part =>
      this._processConfigPart(part, envKey),
    );
  }

  mergeConfigFile(file: ConfigFile, envName: string) {
    if (this.seenFiles.has(file)) {
      throw new Error(
        `Cycle detected in Babel configuration file through "${
          file.filepath
        }".`,
      );
    }

    const parts = flattenFileOptionsParts(file)(envName);

    this.seenFiles.add(file);
    parts.forEach(part => this._processConfigPart(part, envName));
    this.seenFiles.delete(file);
  }

  _processConfigPart(part: ConfigPart, envName: string) {
    if (part.part === "config") {
      const { ignore, only } = part;

      // Bail out ASAP if this file is ignored so that we run as little logic as possible on ignored files.
      if (
        this.file &&
        this.file.shouldIgnore(ignore, only, part.config.dirname)
      ) {
        // TODO(logan): This is a really gross way to bail out. Avoid this in rewrite.
        throw Object.assign((new Error("This file has been ignored."): any), {
          code: "BABEL_IGNORED_FILE",
        });
      }

      this.configs.push(part.config);
    } else {
      this.mergeConfigFile(
        loadConfig(part.path, part.dirname, envName),
        envName,
      );
    }
  }
}

/**
 * Given a plugin/preset item, resolve it into a standard format.
 */
function createDescriptor(
  pair: PluginItem,
  resolver,
  dirname,
  {
    index,
    alias,
    ownPass,
  }: {
    index: number,
    alias: string,
    ownPass?: boolean,
  },
): BasicDescriptor {
  let name;
  let options;
  let value = pair;
  if (Array.isArray(value)) {
    if (value.length === 3) {
      // $FlowIgnore - Flow doesn't like the multiple tuple types.
      [value, options, name] = value;
    } else {
      [value, options] = value;
    }
  }

  let filepath = null;
  if (typeof value === "string") {
    ({ filepath, value } = resolver(value, dirname));
  }

  if (!value) {
    throw new Error(`Unexpected falsy value: ${String(value)}`);
  }

  if (typeof value === "object" && value.__esModule) {
    if (value.default) {
      value = value.default;
    } else {
      throw new Error("Must export a default export when using ES6 modules.");
    }
  }

  if (typeof value !== "object" && typeof value !== "function") {
    throw new Error(
      `Unsupported format: ${typeof value}. Expected an object or a function.`,
    );
  }

  if (filepath !== null && typeof value === "object" && value) {
    // We allow object values for plugins/presets nested directly within a
    // config object, because it can be useful to define them in nested
    // configuration contexts.
    throw new Error(
      "Plugin/Preset files are not allowed to export objects, only functions.",
    );
  }

  return {
    name,
    alias: filepath || `${alias}$${index}`,
    value,
    options,
    dirname,
    ownPass,
  };
}

function normalizeOptions(opts: ValidatedOptions): ValidatedOptions {
  const options = Object.assign({}, opts);
  delete options.extends;
  delete options.env;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;

  // "sourceMap" is just aliased to sourceMap, so copy it over as
  // we merge the options together.
  if (options.sourceMap) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }
  return options;
}

/**
 * Load and validate the given config into a set of options, plugins, and presets.
 */
const processConfig = makeWeakCache((config: SimpleConfig): LoadedConfig => {
  const plugins = (config.options.plugins || []).map((plugin, index) =>
    createDescriptor(plugin, loadPlugin, config.dirname, {
      index,
      alias: config.alias,
    }),
  );

  assertNoDuplicates(plugins);

  const presets = (config.options.presets || []).map((preset, index) =>
    createDescriptor(preset, loadPreset, config.dirname, {
      index,
      alias: config.alias,
      ownPass: config.options.passPerPreset,
    }),
  );

  assertNoDuplicates(presets);

  return {
    options: normalizeOptions(config.options),
    plugins,
    presets,
  };
});

function assertNoDuplicates(items: Array<BasicDescriptor>): void {
  const map = new Map();

  for (const item of items) {
    if (typeof item.value !== "function") continue;

    let nameMap = map.get(item.value);
    if (!nameMap) {
      nameMap = new Set();
      map.set(item.value, nameMap);
    }

    if (nameMap.has(item.name)) {
      throw new Error(
        [
          `Duplicate plugin/preset detected.`,
          `If you'd like to use two separate instances of a plugin,`,
          `they neen separate names, e.g.`,
          ``,
          `  plugins: [`,
          `    ['some-plugin', {}],`,
          `    ['some-plugin', {}, 'some unique name'],`,
          `  ]`,
        ].join("\n"),
      );
    }

    nameMap.add(item.name);
  }
}

function dedupLoadedConfigs(items: Array<LoadedConfig>): ConfigChain {
  const options = [];
  const plugins = [];
  const presets = [];

  for (const item of items) {
    plugins.push(...item.plugins);
    presets.push(...item.presets);
    options.push(item.options);
  }

  return {
    options,
    plugins: dedupDescriptors(plugins),
    presets: dedupDescriptors(presets),
  };
}

function dedupDescriptors(
  items: Array<BasicDescriptor>,
): Array<BasicDescriptor> {
  const map: Map<
    Function,
    Map<string | void, { value: BasicDescriptor | null }>,
  > = new Map();

  const descriptors = [];

  for (const item of items) {
    if (typeof item.value === "function") {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);
      if (!nameMap) {
        nameMap = new Map();
        map.set(fnKey, nameMap);
      }
      let desc = nameMap.get(item.name);
      if (!desc) {
        desc = { value: null };
        descriptors.push(desc);

        // Treat passPerPreset presets as unique, skipping them
        // in the merge processing steps.
        if (!item.ownPass) nameMap.set(item.name, desc);
      }

      if (item.options === false) {
        desc.value = null;
      } else {
        desc.value = item;
      }
    } else {
      descriptors.push({ value: item });
    }
  }

  return descriptors.reduce((acc, desc) => {
    if (desc.value) acc.push(desc.value);
    return acc;
  }, []);
}

/**
 * Given the root config object passed to Babel, split it into the separate
 * config parts. The resulting config objects in the 'ConfigPart' have their
 * object identity preserved between calls so that they can be used for caching.
 */
function flattenArgumentsOptionsParts(
  opts: ValidatedOptions,
  dirname: string,
  envName: string,
): Array<ConfigPart> {
  const {
    env,
    plugins,
    presets,
    passPerPreset,
    extends: extendsPath,
    ...options
  } = opts;

  const raw = [];
  if (env) {
    raw.push(...flattenArgumentsEnvOptionsParts(env)(dirname)(envName));
  }

  if (Object.keys(options).length > 0) {
    raw.push(...flattenOptionsParts(buildArgumentsItem(options, dirname)));
  }

  if (plugins) {
    raw.push(...flattenArgumentsPluginsOptionsParts(plugins)(dirname));
  }
  if (presets) {
    raw.push(
      ...flattenArgumentsPresetsOptionsParts(presets)(!!passPerPreset)(dirname),
    );
  }

  if (extendsPath != null) {
    raw.push(
      ...flattenOptionsParts(
        buildArgumentsItem({ extends: extendsPath }, dirname),
      ),
    );
  }

  return raw;
}

/**
 * For the top-level 'options' object, we cache the env list based on
 * the object identity of the 'env' object.
 */
const flattenArgumentsEnvOptionsParts = makeWeakCache((env: {}) => {
  const options: ValidatedOptions = { env };

  return makeStrongCache((dirname: string) =>
    flattenOptionsPartsLookup(buildArgumentsItem(options, dirname)),
  );
});

/**
 * For the top-level 'options' object, we cache the plugin list based on
 * the object identity of the 'plugins' object.
 */
const flattenArgumentsPluginsOptionsParts = makeWeakCache(
  (plugins: PluginList) => {
    const options: ValidatedOptions = { plugins };

    return makeStrongCache((dirname: string) =>
      flattenOptionsParts(buildArgumentsItem(options, dirname)),
    );
  },
);

/**
 * For the top-level 'options' object, we cache the preset list based on
 * the object identity of the 'presets' object.
 */
const flattenArgumentsPresetsOptionsParts = makeWeakCache(
  (presets: PluginList) =>
    makeStrongCache((passPerPreset: boolean) => {
      // The concept of passPerPreset is integrally tied to the preset list
      // so unfortunately we need to copy both values here, adding an extra
      // layer of caching functions.
      const options = { presets, passPerPreset };

      return makeStrongCache((dirname: string) =>
        flattenOptionsParts(buildArgumentsItem(options, dirname)),
      );
    }),
);

function buildArgumentsItem(
  options: ValidatedOptions,
  dirname: string,
): ConfigItem {
  return {
    type: "arguments",
    options,
    alias: "base",
    dirname,
  };
}

/**
 * Given a config from a specific file, return a list of ConfigPart objects
 * with object identity preserved for all 'config' part objects for use
 * with caching later in config processing.
 */
const flattenFileOptionsParts = makeWeakCache((file: ConfigFile) => {
  return flattenOptionsPartsLookup({
    type: "file",
    options: validate("file", file.options),
    alias: file.filepath,
    dirname: file.dirname,
  });
});

/**
 * Given a config, create a function that will return the config parts for
 * the environment passed as the first argument.
 */
function flattenOptionsPartsLookup(
  config: ConfigItem,
): (string | null) => Array<ConfigPart> {
  const parts = flattenOptionsParts(config);

  const def = parts.filter(part => part.activeEnv === null);
  const lookup = new Map();

  parts.forEach(part => {
    if (part.activeEnv !== null) lookup.set(part.activeEnv, []);
  });

  for (const [activeEnv, values] of lookup) {
    parts.forEach(part => {
      if (part.activeEnv === null || part.activeEnv === activeEnv) {
        values.push(part);
      }
    });
  }

  return envName => lookup.get(envName) || def;
}

/**
 * Given a generic config object, flatten it into its various parts so that
 * then can be cached and processed later.
 */
function flattenOptionsParts(
  config: ConfigItem,
  activeEnv: string | null = null,
): Array<ConfigPart> {
  const { options: rawOpts, alias, dirname } = config;

  const parts = [];

  if (rawOpts.env) {
    for (const envKey of Object.keys(rawOpts.env)) {
      if (rawOpts.env[envKey]) {
        parts.push(
          ...flattenOptionsParts(
            {
              type: "env",
              options: rawOpts.env[envKey],
              alias: alias + `.env.${envKey}`,
              dirname,
            },
            envKey,
          ),
        );
      }
    }
  }

  parts.push({
    part: "config",
    config,
    ignore: rawOpts.ignore,
    only: rawOpts.only,
    activeEnv,
  });

  if (rawOpts.extends != null) {
    parts.push({
      part: "extends",
      path: rawOpts.extends,
      dirname,
      activeEnv,
    });
  }

  return parts;
}

/**
 * Track a given file and expose function to check if it should be ignored.
 */
class LoadedFile {
  filename: string;
  possibleDirs: null | Array<string> = null;

  constructor(filename) {
    this.filename = filename;
  }

  /**
   * Tests if a filename should be ignored based on "ignore" and "only" options.
   */
  shouldIgnore(
    ignore: ?IgnoreList,
    only: ?IgnoreList,
    dirname: string,
  ): boolean {
    if (ignore) {
      if (this._matchesPatterns(ignore, dirname)) {
        debug(
          "Ignored %o because it matched one of %O from %o",
          this.filename,
          ignore,
          dirname,
        );
        return true;
      }
    }

    if (only) {
      if (!this._matchesPatterns(only, dirname)) {
        debug(
          "Ignored %o because it failed to match one of %O from %o",
          this.filename,
          only,
          dirname,
        );
        return true;
      }
    }

    return false;
  }

  /**
   * Returns result of calling function with filename if pattern is a function.
   * Otherwise returns result of matching pattern Regex with filename.
   */
  _matchesPatterns(patterns: IgnoreList, dirname: string): boolean {
    const res = [];
    const strings = [];
    const fns = [];

    patterns.forEach(pattern => {
      if (typeof pattern === "string") strings.push(pattern);
      else if (typeof pattern === "function") fns.push(pattern);
      else res.push(pattern);
    });

    const filename = this.filename;
    if (res.some(re => re.test(filename))) return true;
    if (fns.some(fn => fn(filename))) return true;

    if (strings.length > 0) {
      let possibleDirs = this.possibleDirs;
      // Lazy-init so we don't initialize this for files that have no glob patterns.
      if (!possibleDirs) {
        possibleDirs = this.possibleDirs = [];

        possibleDirs.push(filename);

        let current = filename;
        while (true) {
          const previous = current;
          current = path.dirname(current);
          if (previous === current) break;

          possibleDirs.push(current);
        }
      }

      const absolutePatterns = strings.map(pattern => {
        // Preserve the "!" prefix so that micromatch can use it for negation.
        const negate = pattern[0] === "!";
        if (negate) pattern = pattern.slice(1);

        return (negate ? "!" : "") + path.resolve(dirname, pattern);
      });

      if (
        micromatch(possibleDirs, absolutePatterns, { nocase: true }).length > 0
      ) {
        return true;
      }
    }

    return false;
  }
}
