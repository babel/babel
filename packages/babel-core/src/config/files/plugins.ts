/**
 * This file handles all logic for converting string-based configuration references into loaded objects.
 */

import buildDebug from "debug";
import path from "path";
import gensync, { type Handler } from "gensync";
import { isAsync } from "../../gensync-utils/async";
import loadCjsOrMjsDefault, { supportsESM } from "./module-types";
import { fileURLToPath, pathToFileURL } from "url";

import importMetaResolve from "./import-meta-resolve";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const debug = buildDebug("babel:config:loading:files:plugins");

const EXACT_RE = /^module:/;
const BABEL_PLUGIN_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-plugin-)/;
const BABEL_PRESET_PREFIX_RE = /^(?!@|module:|[^/]+\/|babel-preset-)/;
const BABEL_PLUGIN_ORG_RE = /^(@babel\/)(?!plugin-|[^/]+\/)/;
const BABEL_PRESET_ORG_RE = /^(@babel\/)(?!preset-|[^/]+\/)/;
const OTHER_PLUGIN_ORG_RE =
  /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-plugin(?:-|\/|$)|[^/]+\/)/;
const OTHER_PRESET_ORG_RE =
  /^(@(?!babel\/)[^/]+\/)(?![^/]*babel-preset(?:-|\/|$)|[^/]+\/)/;
const OTHER_ORG_DEFAULT_RE = /^(@(?!babel$)[^/]+)$/;

export function* resolvePlugin(name: string, dirname: string): Handler<string> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return yield* resolveStandardizedName("plugin", name, dirname);
}

export function* resolvePreset(name: string, dirname: string): Handler<string> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return yield* resolveStandardizedName("preset", name, dirname);
}

export function* loadPlugin(
  name: string,
  dirname: string,
): Handler<{ filepath: string; value: unknown }> {
  const filepath = yield* resolvePlugin(name, dirname);

  const value = yield* requireModule("plugin", filepath);
  debug("Loaded plugin %o from %o.", name, dirname);

  return { filepath, value };
}

export function* loadPreset(
  name: string,
  dirname: string,
): Handler<{ filepath: string; value: unknown }> {
  const filepath = yield* resolvePreset(name, dirname);

  const value = yield* requireModule("preset", filepath);

  debug("Loaded preset %o from %o.", name, dirname);

  return { filepath, value };
}

function standardizeName(type: "plugin" | "preset", name: string) {
  // Let absolute and relative paths through.
  if (path.isAbsolute(name)) return name;

  const isPreset = type === "preset";

  return (
    name
      // foo -> babel-preset-foo
      .replace(
        isPreset ? BABEL_PRESET_PREFIX_RE : BABEL_PLUGIN_PREFIX_RE,
        `babel-${type}-`,
      )
      // @babel/es2015 -> @babel/preset-es2015
      .replace(
        isPreset ? BABEL_PRESET_ORG_RE : BABEL_PLUGIN_ORG_RE,
        `$1${type}-`,
      )
      // @foo/mypreset -> @foo/babel-preset-mypreset
      .replace(
        isPreset ? OTHER_PRESET_ORG_RE : OTHER_PLUGIN_ORG_RE,
        `$1babel-${type}-`,
      )
      // @foo -> @foo/babel-preset
      .replace(OTHER_ORG_DEFAULT_RE, `$1/babel-${type}`)
      // module:mypreset -> mypreset
      .replace(EXACT_RE, "")
  );
}

type Result<T> = { error: Error; value: null } | { error: null; value: T };

function* resolveAlternativesHelper(
  type: "plugin" | "preset",
  name: string,
): Iterator<string, string, Result<string>> {
  const standardizedName = standardizeName(type, name);
  const { error, value } = yield standardizedName;
  if (!error) return value;

  // @ts-expect-error code may not index error
  if (error.code !== "MODULE_NOT_FOUND") throw error;

  if (standardizedName !== name && !(yield name).error) {
    error.message += `\n- If you want to resolve "${name}", use "module:${name}"`;
  }

  if (!(yield standardizeName(type, "@babel/" + name)).error) {
    error.message += `\n- Did you mean "@babel/${name}"?`;
  }

  const oppositeType = type === "preset" ? "plugin" : "preset";
  if (!(yield standardizeName(oppositeType, name)).error) {
    error.message += `\n- Did you accidentally pass a ${oppositeType} as a ${type}?`;
  }

  throw error;
}

function tryRequireResolve(
  id: Parameters<RequireResolve>[0],
  { paths: [dirname] }: Parameters<RequireResolve>[1],
): Result<string> {
  try {
    return { error: null, value: require.resolve(id, { paths: [dirname] }) };
  } catch (error) {
    return { error, value: null };
  }
}

async function tryImportMetaResolve(
  id: Parameters<ImportMeta["resolve"]>[0],
  options: Parameters<ImportMeta["resolve"]>[1],
): Promise<Result<string>> {
  try {
    return { error: null, value: await importMetaResolve(id, options) };
  } catch (error) {
    return { error, value: null };
  }
}

function resolveStandardizedNameForRequire(
  type: "plugin" | "preset",
  name: string,
  dirname: string,
) {
  const it = resolveAlternativesHelper(type, name);
  let res = it.next();
  while (!res.done) {
    res = it.next(tryRequireResolve(res.value, { paths: [dirname] }));
  }
  return res.value;
}
async function resolveStandardizedNameForImport(
  type: "plugin" | "preset",
  name: string,
  dirname: string,
) {
  const parentUrl = pathToFileURL(
    path.join(dirname, "./babel-virtual-resolve-base.js"),
  ).href;

  const it = resolveAlternativesHelper(type, name);
  let res = it.next();
  while (!res.done) {
    res = it.next(await tryImportMetaResolve(res.value, parentUrl));
  }
  return fileURLToPath(res.value);
}

const resolveStandardizedName = gensync<
  [type: "plugin" | "preset", name: string, dirname?: string],
  string
>({
  sync(type, name, dirname = process.cwd()) {
    return resolveStandardizedNameForRequire(type, name, dirname);
  },
  async async(type, name, dirname = process.cwd()) {
    if (!supportsESM) {
      return resolveStandardizedNameForRequire(type, name, dirname);
    }

    try {
      return await resolveStandardizedNameForImport(type, name, dirname);
    } catch (e) {
      try {
        return resolveStandardizedNameForRequire(type, name, dirname);
      } catch (e2) {
        if (e.type === "MODULE_NOT_FOUND") throw e;
        if (e2.type === "MODULE_NOT_FOUND") throw e2;
        throw e;
      }
    }
  },
});

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var LOADING_MODULES = new Set();
}
function* requireModule(type: string, name: string): Handler<unknown> {
  if (!process.env.BABEL_8_BREAKING) {
    if (!(yield* isAsync()) && LOADING_MODULES.has(name)) {
      throw new Error(
        `Reentrant ${type} detected trying to load "${name}". This module is not ignored ` +
          "and is trying to load itself while compiling itself, leading to a dependency cycle. " +
          'We recommend adding it to your "ignore" list in your babelrc, or to a .babelignore.',
      );
    }
  }

  try {
    if (!process.env.BABEL_8_BREAKING) {
      LOADING_MODULES.add(name);
    }
    return yield* loadCjsOrMjsDefault(
      name,
      `You appear to be using a native ECMAScript module ${type}, ` +
        "which is only supported when running Babel asynchronously.",
      // For backward compatibility, we need to support malformed presets
      // defined as separate named exports rather than a single default
      // export.
      // See packages/babel-core/test/fixtures/option-manager/presets/es2015_named.js
      true,
    );
  } catch (err) {
    err.message = `[BABEL]: ${err.message} (While processing: ${name})`;
    throw err;
  } finally {
    if (!process.env.BABEL_8_BREAKING) {
      LOADING_MODULES.delete(name);
    }
  }
}
