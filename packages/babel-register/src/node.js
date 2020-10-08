import deepClone from "lodash/cloneDeep";
import sourceMapSupport from "source-map-support";
import * as registerCache from "./cache";
import escapeRegExp from "lodash/escapeRegExp";
import * as babel from "@babel/core";
import { OptionManager, DEFAULT_EXTENSIONS } from "@babel/core";
import { addHook } from "pirates";
import fs from "fs";
import path, { extname } from "path";

// Technically we could use the "semver" package here, but (for exmaple)
// parseFloat("4.23.6") returns 4.23 so it's "good enough"
const BABEL_SUPPORTS_EXTENSIONS_OPTION = parseFloat(babel.version) >= 7.11;

// The "pirates" library, that we use to register require hooks, does
// not allow hooking into all the loaded files, but requries us to
// specify the extensions upfront.
// In order to hook into all of them, we need to do two things:
//  1) Add hooks for all the already registered extensions, defined in
//     Module._extensions. By doing so, we can shadow the loaders already
//     defined.
//  2) Node throws an error when requireing .mjs unless a hook has been
//     defined. For compatibility reason (@babel/register can load .mjs files)
//     we add the extension to the list.
//  3) Node fallbacks to the .js loader for unknown extensions, however
//     pirates will only run our hook if it actually matches the extension
//     (without a fallback mechanism). However, it checks if an extension
//     has been registered by checking 'extensions.indexOf(...)'.
//     And... we can make it always return true! ^-^
// Since this is not technically part of the public API of "pirates", the
// version in package.json is fixed to avoid untested updates.
function generateExtensionsArray(exts) {
  return Object.defineProperty(Array.from(exts), "indexOf", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: () => true,
  });
}

// Node.js's algorithm tries to automatically resolve the extension of the
// required file. This means that if you have, for example, require("./foo")
// it can load foo.js (even if ".js" is not specified).
// This doesn't only work with predefined extensions: whenever a new extension
// hook is registered, Node.js can resolve it.
// For this reason, we need to register new extensions as soon as we know about
// them. This means:
//   1) When we compile a file and see a new extension in its `extensions` option.
//   2) When a file with a new explicit extension is loaded
//
// In practice, this means that to load foo.ts you have to use
//    node -r @babel/register ./foo.ts
// instead of just
//    node -r @babel/register ./foo
const knownExtensions = new Set();
function registerNewExtensions(extensions, filename) {
  if (!BABEL_SUPPORTS_EXTENSIONS_OPTION) return;

  const prevSize = knownExtensions.size;

  if (filename) {
    const ext = extname(filename);
    if (ext) knownExtensions.add(ext);
  }

  if (extensions) {
    extensions.forEach(ext => {
      if (ext && ext !== "*") knownExtensions.add(ext);
    });
  }

  if (knownExtensions.size !== prevSize) {
    hookExtensions(generateExtensionsArray(knownExtensions));
  }
}

const maps = {};
let transformOpts = {};
let piratesRevert = null;

function installSourceMapSupport() {
  sourceMapSupport.install({
    handleUncaughtExceptions: false,
    environment: "node",
    retrieveSourceMap(source) {
      const map = maps && maps[source];
      if (map) {
        return {
          url: null,
          map: map,
        };
      } else {
        return null;
      }
    },
  });
}

let cache;

function mtime(filename) {
  return +fs.statSync(filename).mtime;
}

function compile(code, filename) {
  // merge in base options and resolve all the plugins and presets relative to this file
  const opts = new OptionManager().init(
    // sourceRoot can be overwritten
    {
      sourceRoot: path.dirname(filename) + path.sep,
      ...deepClone(transformOpts),
      filename,
    },
  );

  // Bail out ASAP if the file has been ignored or has an unsupported extension
  if (opts === null) return code;

  registerNewExtensions(opts.extensions, filename);

  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;

  const env = babel.getEnv(false);

  if (env) cacheKey += `:${env}`;

  let cached = cache && cache[cacheKey];

  if (!cached || cached.mtime !== mtime(filename)) {
    cached = babel.transform(code, {
      ...opts,
      sourceMaps: opts.sourceMaps === undefined ? "both" : opts.sourceMaps,
      ast: false,
    });

    if (cache) {
      cache[cacheKey] = cached;
      cached.mtime = mtime(filename);
    }
  }

  if (cached.map) {
    if (Object.keys(maps).length === 0) {
      installSourceMapSupport();
    }
    maps[filename] = cached.map;
  }

  return cached.code;
}

let compiling = false;

function compileHook(code, filename) {
  if (compiling) return code;

  try {
    compiling = true;
    return compile(code, filename);
  } finally {
    compiling = false;
  }
}

function hookExtensions(exts) {
  if (piratesRevert) piratesRevert();
  piratesRevert = addHook(compileHook, { exts, ignoreNodeModules: false });
}

export function revert() {
  if (piratesRevert) piratesRevert();
}

register();

export default function register(opts?: Object = {}) {
  // Clone to avoid mutating the arguments object with the 'delete's below.
  opts = { ...opts };

  if (BABEL_SUPPORTS_EXTENSIONS_OPTION) {
    // TODO(Babel 8): At some point @babel/core will default to DEFAULT_EXTENSIONS
    // instead of ["*"], and we can avoid setting it here.
    opts.extensions ??= DEFAULT_EXTENSIONS;

    registerNewExtensions(opts.extensions);
  } else {
    hookExtensions(opts.extensions ?? DEFAULT_EXTENSIONS);
  }

  if (opts.cache === false && cache) {
    registerCache.clear();
    cache = null;
  } else if (opts.cache !== false && !cache) {
    registerCache.load();
    cache = registerCache.get();
  }

  delete opts.cache;
  if (!BABEL_SUPPORTS_EXTENSIONS_OPTION) {
    delete opts.extensions;
  }

  transformOpts = {
    ...opts,
    caller: {
      name: "@babel/register",
      ...(opts.caller || {}),
    },
  };

  let { cwd = "." } = transformOpts;

  // Ensure that the working directory is resolved up front so that
  // things don't break if it changes later.
  cwd = transformOpts.cwd = path.resolve(cwd);

  if (transformOpts.ignore === undefined && transformOpts.only === undefined) {
    transformOpts.only = [
      // Only compile things inside the current working directory.
      new RegExp("^" + escapeRegExp(cwd), "i"),
    ];
    transformOpts.ignore = [
      // Ignore any node_modules inside the current working directory.
      new RegExp(
        "^" +
          escapeRegExp(cwd) +
          "(?:" +
          path.sep +
          ".*)?" +
          escapeRegExp(path.sep + "node_modules" + path.sep),
        "i",
      ),
    ];
  }
}
