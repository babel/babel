import buildDebug from "debug";
import nodeFs from "fs";
import path from "path";
import json5 from "json5";
import gensync from "gensync";
import type { Handler } from "gensync";
import { makeStrongCache, makeWeakCacheSync } from "../caching";
import type { CacheConfigurator } from "../caching";
import { makeConfigAPI } from "../helpers/config-api";
import type { ConfigAPI } from "../helpers/config-api";
import { makeStaticFileCache } from "./utils";
import loadCodeDefault from "./module-types";
import pathPatternToRegex from "../pattern-to-regex";
import type { FilePackageData, RelativeConfig, ConfigFile } from "./types";
import type { CallerMetadata } from "../validation/options";
import ConfigError from "../../errors/config-error";

import * as fs from "../../gensync-utils/fs";

import { createRequire } from "module";
import { endHiddenCallStack } from "../../errors/rewrite-stack-trace";
const require = createRequire(import.meta.url);

const debug = buildDebug("babel:config:loading:files:configuration");

export const ROOT_CONFIG_FILENAMES = [
  "babel.config.js",
  "babel.config.cjs",
  "babel.config.mjs",
  "babel.config.json",
  "babel.config.cts",
];
const RELATIVE_CONFIG_FILENAMES = [
  ".babelrc",
  ".babelrc.js",
  ".babelrc.cjs",
  ".babelrc.mjs",
  ".babelrc.json",
  ".babelrc.cts",
];

const BABELIGNORE_FILENAME = ".babelignore";

const LOADING_CONFIGS = new Set();

const readConfigCode = makeStrongCache(function* readConfigCode(
  filepath: string,
  cache: CacheConfigurator<{
    envName: string;
    caller: CallerMetadata | undefined;
  }>,
): Handler<ConfigFile | null> {
  if (!nodeFs.existsSync(filepath)) {
    cache.never();
    return null;
  }

  // The `require()` call below can make this code reentrant if a require hook like @babel/register has been
  // loaded into the system. That would cause Babel to attempt to compile the `.babelrc.js` file as it loads
  // below. To cover this case, we auto-ignore re-entrant config processing.
  if (LOADING_CONFIGS.has(filepath)) {
    cache.never();

    debug("Auto-ignoring usage of config %o.", filepath);
    return {
      filepath,
      dirname: path.dirname(filepath),
      options: {},
    };
  }

  let options: unknown;
  try {
    LOADING_CONFIGS.add(filepath);
    options = yield* loadCodeDefault(
      filepath,
      "You appear to be using a native ECMAScript module configuration " +
        "file, which is only supported when running Babel asynchronously.",
    );
  } finally {
    LOADING_CONFIGS.delete(filepath);
  }

  let assertCache = false;
  if (typeof options === "function") {
    // @ts-expect-error - if we want to make it possible to use async configs
    yield* [];

    options = endHiddenCallStack(options as any as (api: ConfigAPI) => {})(
      makeConfigAPI(cache),
    );

    assertCache = true;
  }

  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new ConfigError(
      `Configuration should be an exported JavaScript object.`,
      filepath,
    );
  }

  // @ts-expect-error todo(flow->ts)
  if (typeof options.then === "function") {
    throw new ConfigError(
      `You appear to be using an async configuration, ` +
        `which your current version of Babel does not support. ` +
        `We may add support for this in the future, ` +
        `but if you're on the most recent version of @babel/core and still ` +
        `seeing this error, then you'll need to synchronously return your config.`,
      filepath,
    );
  }

  if (assertCache && !cache.configured()) throwConfigError(filepath);

  return {
    filepath,
    dirname: path.dirname(filepath),
    options,
  };
});

const packageToBabelConfig = makeWeakCacheSync(
  (file: ConfigFile): ConfigFile | null => {
    const babel: unknown = file.options["babel"];

    if (typeof babel === "undefined") return null;

    if (typeof babel !== "object" || Array.isArray(babel) || babel === null) {
      throw new ConfigError(`.babel property must be an object`, file.filepath);
    }

    return {
      filepath: file.filepath,
      dirname: file.dirname,
      options: babel,
    };
  },
);

const readConfigJSON5 = makeStaticFileCache((filepath, content): ConfigFile => {
  let options;
  try {
    options = json5.parse(content);
  } catch (err) {
    throw new ConfigError(
      `Error while parsing config - ${err.message}`,
      filepath,
    );
  }

  if (!options) throw new ConfigError(`No config detected`, filepath);

  if (typeof options !== "object") {
    throw new ConfigError(`Config returned typeof ${typeof options}`, filepath);
  }
  if (Array.isArray(options)) {
    throw new ConfigError(`Expected config object but found array`, filepath);
  }

  delete options["$schema"];

  return {
    filepath,
    dirname: path.dirname(filepath),
    options,
  };
});

const readIgnoreConfig = makeStaticFileCache((filepath, content) => {
  const ignoreDir = path.dirname(filepath);
  const ignorePatterns = content
    .split("\n")
    .map<string>(line => line.replace(/#(.*?)$/, "").trim())
    .filter(line => !!line);

  for (const pattern of ignorePatterns) {
    if (pattern[0] === "!") {
      throw new ConfigError(
        `Negation of file paths is not supported.`,
        filepath,
      );
    }
  }

  return {
    filepath,
    dirname: path.dirname(filepath),
    ignore: ignorePatterns.map(pattern =>
      pathPatternToRegex(pattern, ignoreDir),
    ),
  };
});

export function findConfigUpwards(rootDir: string): string | null {
  let dirname = rootDir;
  for (;;) {
    for (const filename of ROOT_CONFIG_FILENAMES) {
      if (nodeFs.existsSync(path.join(dirname, filename))) {
        return dirname;
      }
    }

    const nextDir = path.dirname(dirname);
    if (dirname === nextDir) break;
    dirname = nextDir;
  }

  return null;
}

export function* findRelativeConfig(
  packageData: FilePackageData,
  envName: string,
  caller: CallerMetadata | undefined,
): Handler<RelativeConfig> {
  let config = null;
  let ignore = null;

  const dirname = path.dirname(packageData.filepath);

  for (const loc of packageData.directories) {
    if (!config) {
      config = yield* loadOneConfig(
        RELATIVE_CONFIG_FILENAMES,
        loc,
        envName,
        caller,
        packageData.pkg?.dirname === loc
          ? packageToBabelConfig(packageData.pkg)
          : null,
      );
    }

    if (!ignore) {
      const ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
      ignore = yield* readIgnoreConfig(ignoreLoc);

      if (ignore) {
        debug("Found ignore %o from %o.", ignore.filepath, dirname);
      }
    }
  }

  return { config, ignore };
}

export function findRootConfig(
  dirname: string,
  envName: string,
  caller: CallerMetadata | undefined,
): Handler<ConfigFile | null> {
  return loadOneConfig(ROOT_CONFIG_FILENAMES, dirname, envName, caller);
}

function* loadOneConfig(
  names: string[],
  dirname: string,
  envName: string,
  caller: CallerMetadata | undefined,
  previousConfig: ConfigFile | null = null,
): Handler<ConfigFile | null> {
  const configs = yield* gensync.all(
    names.map(filename =>
      readConfig(path.join(dirname, filename), envName, caller),
    ),
  );
  const config = configs.reduce((previousConfig: ConfigFile | null, config) => {
    if (config && previousConfig) {
      throw new ConfigError(
        `Multiple configuration files found. Please remove one:\n` +
          ` - ${path.basename(previousConfig.filepath)}\n` +
          ` - ${config.filepath}\n` +
          `from ${dirname}`,
      );
    }

    return config || previousConfig;
  }, previousConfig);

  if (config) {
    debug("Found configuration %o from %o.", config.filepath, dirname);
  }
  return config;
}

export function* loadConfig(
  name: string,
  dirname: string,
  envName: string,
  caller: CallerMetadata | undefined,
): Handler<ConfigFile> {
  const filepath = require.resolve(name, { paths: [dirname] });

  const conf = yield* readConfig(filepath, envName, caller);
  if (!conf) {
    throw new ConfigError(
      `Config file contains no configuration data`,
      filepath,
    );
  }

  debug("Loaded config %o from %o.", name, dirname);
  return conf;
}

/**
 * Read the given config file, returning the result. Returns null if no config was found, but will
 * throw if there are parsing errors while loading a config.
 */
function readConfig(
  filepath: string,
  envName: string,
  caller: CallerMetadata | undefined,
): Handler<ConfigFile | null> {
  const ext = path.extname(filepath);
  switch (ext) {
    case ".js":
    case ".cjs":
    case ".mjs":
    case ".cts":
      return readConfigCode(filepath, { envName, caller });
    default:
      return readConfigJSON5(filepath);
  }
}

export function* resolveShowConfigPath(
  dirname: string,
): Handler<string | null> {
  const targetPath = process.env.BABEL_SHOW_CONFIG_FOR;
  if (targetPath != null) {
    const absolutePath = path.resolve(dirname, targetPath);
    const stats = yield* fs.stat(absolutePath);
    if (!stats.isFile()) {
      throw new Error(
        `${absolutePath}: BABEL_SHOW_CONFIG_FOR must refer to a regular file, directories are not supported.`,
      );
    }
    return absolutePath;
  }
  return null;
}

function throwConfigError(filepath: string): never {
  throw new ConfigError(
    `\
Caching was left unconfigured. Babel's plugins, presets, and .babelrc.js files can be configured
for various types of caching, using the first param of their handler functions:

module.exports = function(api) {
  // The API exposes the following:

  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  // Don't cache at all. Not recommended because it will be very slow.
  api.cache(false);

  // Cached based on the value of some function. If this function returns a value different from
  // a previously-encountered value, the plugins will re-evaluate.
  var env = api.cache(() => process.env.NODE_ENV);

  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for
  // any possible NODE_ENV value that might come up during plugin execution.
  var isProd = api.cache(() => process.env.NODE_ENV === "production");

  // .cache(fn) will perform a linear search though instances to find the matching plugin based
  // based on previous instantiated plugins. If you want to recreate the plugin and discard the
  // previous instance whenever something changes, you may use:
  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");

  // Note, we also expose the following more-verbose versions of the above examples:
  api.cache.forever(); // api.cache(true)
  api.cache.never();   // api.cache(false)
  api.cache.using(fn); // api.cache(fn)

  // Return the value that will be cached.
  return { };
};`,
    filepath,
  );
}
