// @flow

import buildDebug from "debug";
import path from "path";
import json5 from "json5";
import gensync, { type Handler } from "gensync";
import {
  makeStrongCache,
  makeWeakCacheSync,
  type CacheConfigurator,
} from "../caching";
import makeAPI, { type PluginAPI } from "../helpers/config-api";
import { makeStaticFileCache } from "./utils";
import pathPatternToRegex from "../pattern-to-regex";
import type { FilePackageData, RelativeConfig, ConfigFile } from "./types";
import type { CallerMetadata } from "../validation/options";

import * as fs from "../../gensync-utils/fs";
import resolve from "../../gensync-utils/resolve";

const debug = buildDebug("babel:config:loading:files:configuration");

export const ROOT_CONFIG_FILENAMES = [
  "babel.config.js",
  "babel.config.cjs",
  "babel.config.json",
];
const RELATIVE_CONFIG_FILENAMES = [".babelrc", ".babelrc.js", ".babelrc.cjs"];

const BABELIGNORE_FILENAME = ".babelignore";

export function* findConfigUpwards(rootDir: string): Handler<string | null> {
  let dirname = rootDir;
  while (true) {
    for (const filename of ROOT_CONFIG_FILENAMES) {
      if (yield* fs.exists(path.join(dirname, filename))) {
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
  caller: CallerMetadata | void,
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
        packageData.pkg && packageData.pkg.dirname === loc
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
  caller: CallerMetadata | void,
): Handler<ConfigFile | null> {
  return loadOneConfig(ROOT_CONFIG_FILENAMES, dirname, envName, caller);
}

function* loadOneConfig(
  names: string[],
  dirname: string,
  envName: string,
  caller: CallerMetadata | void,
  previousConfig?: ConfigFile | null = null,
): Handler<ConfigFile | null> {
  const configs = yield* gensync.all(
    names.map(filename =>
      readConfig(path.join(dirname, filename), envName, caller),
    ),
  );
  const config = configs.reduce((previousConfig: ConfigFile | null, config) => {
    if (config && previousConfig) {
      throw new Error(
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
  caller: CallerMetadata | void,
): Handler<ConfigFile> {
  const filepath = yield* resolve(name, { basedir: dirname });

  const conf = yield* readConfig(filepath, envName, caller);
  if (!conf) {
    throw new Error(`Config file ${filepath} contains no configuration data`);
  }

  debug("Loaded config %o from %o.", name, dirname);
  return conf;
}

/**
 * Read the given config file, returning the result. Returns null if no config was found, but will
 * throw if there are parsing errors while loading a config.
 */
function readConfig(filepath, envName, caller) {
  const ext = path.extname(filepath);
  return ext === ".js" || ext === ".cjs"
    ? readConfigJS(filepath, { envName, caller })
    : readConfigJSON5(filepath);
}

const LOADING_CONFIGS = new Set();

const readConfigJS = makeStrongCache(function* readConfigJS(
  filepath: string,
  cache: CacheConfigurator<{
    envName: string,
    caller: CallerMetadata | void,
  }>,
): Handler<ConfigFile | null> {
  if (!fs.exists.sync(filepath)) {
    cache.forever();
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

  let options;
  try {
    LOADING_CONFIGS.add(filepath);

    yield* []; // If we want to allow mjs configs imported using `import()`
    // $FlowIssue
    const configModule = (require(filepath): mixed);
    options =
      configModule && configModule.__esModule
        ? configModule.default || undefined
        : configModule;
  } catch (err) {
    err.message = `${filepath}: Error while loading config - ${err.message}`;
    throw err;
  } finally {
    LOADING_CONFIGS.delete(filepath);
  }

  let assertCache = false;
  if (typeof options === "function") {
    yield* []; // if we want to make it possible to use async configs
    options = ((options: any): (api: PluginAPI) => {})(makeAPI(cache));

    assertCache = true;
  }

  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new Error(
      `${filepath}: Configuration should be an exported JavaScript object.`,
    );
  }

  if (typeof options.then === "function") {
    throw new Error(
      `You appear to be using an async configuration, ` +
        `which your current version of Babel does not support. ` +
        `We may add support for this in the future, ` +
        `but if you're on the most recent version of @babel/core and still ` +
        `seeing this error, then you'll need to synchronously return your config.`,
    );
  }

  if (assertCache && !cache.configured()) throwConfigError();

  return {
    filepath,
    dirname: path.dirname(filepath),
    options,
  };
});

const packageToBabelConfig = makeWeakCacheSync(
  (file: ConfigFile): ConfigFile | null => {
    const babel = file.options[("babel": string)];

    if (typeof babel === "undefined") return null;

    if (typeof babel !== "object" || Array.isArray(babel) || babel === null) {
      throw new Error(`${file.filepath}: .babel property must be an object`);
    }

    return {
      filepath: file.filepath,
      dirname: file.dirname,
      options: babel,
    };
  },
);

const readConfigJSON5 = makeStaticFileCache((filepath, content) => {
  let options;
  try {
    options = json5.parse(content);
  } catch (err) {
    err.message = `${filepath}: Error while parsing config - ${err.message}`;
    throw err;
  }

  if (!options) throw new Error(`${filepath}: No config detected`);

  if (typeof options !== "object") {
    throw new Error(`${filepath}: Config returned typeof ${typeof options}`);
  }
  if (Array.isArray(options)) {
    throw new Error(`${filepath}: Expected config object but found array`);
  }

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
    .map(line => line.replace(/#(.*?)$/, "").trim())
    .filter(line => !!line);

  for (const pattern of ignorePatterns) {
    if (pattern[0] === "!") {
      throw new Error(`Negation of file paths is not supported.`);
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

function throwConfigError() {
  throw new Error(`\
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
};`);
}
