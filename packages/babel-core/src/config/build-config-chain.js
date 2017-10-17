// @flow

import { getEnv } from "./helpers/environment";
import path from "path";
import micromatch from "micromatch";
import buildDebug from "debug";

const debug = buildDebug("babel:config:config-chain");

import { findConfigs, loadConfig, type ConfigFile } from "./loading/files";

import { makeWeakCache, makeStrongCache } from "./caching";

type ConfigItem = {
  type: "options" | "arguments",
  options: {},
  dirname: string,
  alias: string,
};

type ConfigPart =
  | {
      part: "config",
      config: ConfigItem,
      ignore: ?Array<mixed>,
      only: ?Array<mixed>,
      activeEnv: string | null,
    }
  | {
      part: "extends",
      path: string,
      dirname: string,
      activeEnv: string | null,
    };

export default function buildConfigChain(opts: {}): Array<ConfigItem> | null {
  if (typeof opts.filename !== "string" && opts.filename != null) {
    throw new Error(".filename must be a string, null, or undefined");
  }

  const filename = opts.filename ? path.resolve(opts.filename) : null;
  const builder = new ConfigChainBuilder(
    filename ? new LoadedFile(filename) : null,
  );

  const envKey = getEnv();
  try {
    builder.mergeConfigArguments(opts, process.cwd(), envKey);

    // resolve all .babelrc files
    if (opts.babelrc !== false && filename) {
      findConfigs(path.dirname(filename)).forEach(configFile =>
        builder.mergeConfigFile(configFile, envKey),
      );
    }
  } catch (e) {
    if (e.code !== "BABEL_IGNORED_FILE") throw e;

    return null;
  }

  return builder.configs.reverse();
}

class ConfigChainBuilder {
  file: LoadedFile | null;
  configs: Array<ConfigItem> = [];

  constructor(file: LoadedFile | null) {
    this.file = file;
  }

  mergeConfigArguments(opts: {}, dirname: string, envKey: string) {
    flattenArgumentsOptionsParts(opts, dirname, envKey).forEach(part =>
      this._processConfigPart(part, envKey),
    );
  }

  mergeConfigFile(file: ConfigFile, envKey: string) {
    flattenFileOptionsParts(file)(envKey).forEach(part =>
      this._processConfigPart(part, envKey),
    );
  }

  _processConfigPart(part: ConfigPart, envKey: string) {
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
      const extendsConfig = loadConfig(part.path, part.dirname);

      const existingConfig = this.configs.some(config => {
        return config.alias === extendsConfig.filepath;
      });
      if (!existingConfig) {
        this.mergeConfigFile(extendsConfig, envKey);
      }
    }
  }
}

/**
 * Given the root config object passed to Babel, split it into the separate
 * config parts. The resulting config objects in the 'ConfigPart' have their
 * object identity preserved between calls so that they can be used for caching.
 */
function flattenArgumentsOptionsParts(
  opts: {},
  dirname: string,
  envKey: string,
): Array<ConfigPart> {
  const raw = [];

  const env = typeof opts.env === "object" ? opts.env : null;
  const plugins = Array.isArray(opts.plugins) ? opts.plugins : null;
  const presets = Array.isArray(opts.presets) ? opts.presets : null;
  const passPerPreset =
    typeof opts.passPerPreset === "boolean" ? opts.passPerPreset : false;

  if (env) {
    raw.push(...flattenArgumentsEnvOptionsParts(env)(dirname)(envKey));
  }

  const innerOpts = Object.assign({}, opts);
  // If the env, plugins, and presets values on the object aren't arrays or
  // objects, leave them in the base opts so that normal options validation
  // will throw errors on them later.
  if (env) delete innerOpts.env;
  if (plugins) delete innerOpts.plugins;
  if (presets) {
    delete innerOpts.presets;
    delete innerOpts.passPerPreset;
  }
  delete innerOpts.extends;

  if (Object.keys(innerOpts).length > 0) {
    raw.push(
      ...flattenOptionsParts({
        type: "arguments",
        options: innerOpts,
        alias: "base",
        dirname,
      }),
    );
  }

  if (plugins) {
    raw.push(...flattenArgumentsPluginsOptionsParts(plugins)(dirname));
  }
  if (presets) {
    raw.push(
      ...flattenArgumentsPresetsOptionsParts(presets)(passPerPreset)(dirname),
    );
  }

  if (opts.extends != null) {
    raw.push(
      ...flattenOptionsParts(
        buildArgumentsItem({ extends: opts.extends }, dirname),
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
  const options = { env };

  return makeStrongCache((dirname: string) =>
    flattenOptionsPartsLookup(buildArgumentsItem(options, dirname)),
  );
});

/**
 * For the top-level 'options' object, we cache the plugin list based on
 * the object identity of the 'plugins' object.
 */
const flattenArgumentsPluginsOptionsParts = makeWeakCache(
  (plugins: Array<mixed>) => {
    const options = { plugins };

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
  (presets: Array<mixed>) =>
    makeStrongCache((passPerPreset: ?boolean) => {
      // The concept of passPerPreset is integrally tied to the preset list
      // so unfortunately we need to copy both values here, adding an extra
      // layer of caching functions.
      const options = { presets, passPerPreset };

      return makeStrongCache((dirname: string) =>
        flattenOptionsParts(buildArgumentsItem(options, dirname)),
      );
    }),
);

function buildArgumentsItem(options: {}, dirname: string): ConfigItem {
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
    type: "options",
    options: file.options,
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

  return envKey => lookup.get(envKey) || def;
}

/**
 * Given a generic config object, flatten it into its various parts so that
 * then can be cached and processed later.
 */
function flattenOptionsParts(
  config: ConfigItem,
  activeEnv: string | null = null,
): Array<ConfigPart> {
  const { type, options: rawOpts, alias, dirname } = config;

  if (rawOpts.ignore != null && !Array.isArray(rawOpts.ignore)) {
    throw new Error(
      `.ignore should be an array, ${JSON.stringify(rawOpts.ignore)} given`,
    );
  }
  if (rawOpts.only != null && !Array.isArray(rawOpts.only)) {
    throw new Error(
      `.only should be an array, ${JSON.stringify(rawOpts.only)} given`,
    );
  }
  const ignore = rawOpts.ignore || null;
  const only = rawOpts.only || null;

  const parts = [];

  if (
    rawOpts.env != null &&
    (typeof rawOpts.env !== "object" || Array.isArray(rawOpts.env))
  ) {
    throw new Error(".env block must be an object, null, or undefined");
  }

  const rawEnv = rawOpts.env || {};

  Object.keys(rawEnv).forEach(envKey => {
    const envOpts = rawEnv[envKey];

    if (envOpts !== undefined && activeEnv !== null && activeEnv !== envKey) {
      throw new Error(`Unreachable .env[${envKey}] block detected`);
    }

    if (
      envOpts != null &&
      (typeof envOpts !== "object" || Array.isArray(envOpts))
    ) {
      throw new Error(".env[...] block must be an object, null, or undefined");
    }

    if (envOpts) {
      parts.push(
        ...flattenOptionsParts(
          {
            type,
            options: envOpts,
            alias: alias + `.env.${envKey}`,
            dirname,
          },
          envKey,
        ),
      );
    }
  });

  parts.push({
    part: "config",
    config,
    ignore,
    only,
    activeEnv,
  });

  if (rawOpts.extends != null) {
    if (typeof rawOpts.extends !== "string") {
      throw new Error(".extends must be a string");
    }

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
    ignore: ?Array<mixed>,
    only: ?Array<mixed>,
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
  _matchesPatterns(patterns: Array<mixed>, dirname: string): boolean {
    const res = [];
    const strings = [];
    const fns = [];

    patterns.forEach(pattern => {
      if (typeof pattern === "string") strings.push(pattern);
      else if (typeof pattern === "function") fns.push(pattern);
      else if (pattern instanceof RegExp) res.push(pattern);
      else {
        throw new Error(
          "Patterns must be a string, function, or regular expression",
        );
      }
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
