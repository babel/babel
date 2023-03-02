// Many thanks to the author of https://gist.github.com/TravisMullen/16dfabca0db4bb4c32fb4f5ef297b25a

/* eslint-disable import/extensions */

// this is a workarround to make sure global._BABEL_ESM_REGISTER is set to true before anything else gets loaded
import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, extname, resolve as resolvePath } from "node:path";
import { env } from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import Module from "module";

import { addHook } from "pirates";
import setup from "./hook-common.js";
import { isInRegisterWorker } from "./is-in-register-worker.js";

let JS_EXTENSIONS;
let compile;
let flag = {};
let piratesRevert;

global._BABEL_ESM_REGISTER = {
  register(clientType, opts) {
    if (!isInRegisterWorker) {
      const { client, compile: _compile } = setup(clientType, opts);

      flag = {};
      compile = _compile;

      // handle CJS
      piratesRevert = addHook(compile, {
        exts:
          opts.extensions != null
            ? opts.extensions
            : client.getDefaultExtensions(),
        ignoreNodeModules: false,
      });

      JS_EXTENSIONS = new Set(opts.extensions ?? client.getDefaultExtensions());
    }
  },
  revert() {
    if (piratesRevert) piratesRevert();
    else return;
    piratesRevert = null;
    compile = null;
    flag = {};
  },
};

if (env.BABEL_REGISTER) {
  const { default: opts } = await import(pathToFileURL(env.BABEL_REGISTER));
  const { default: register } = await import("./experimental-worker.js");
  register(opts);
}

function tryCJSResolve(specifier, context) {
  const { parentURL } = context;
  let fakeParent;

  if (parentURL) {
    const { pathname: parentPathname } = new URL(parentURL);

    fakeParent = {
      loaded: true,
      filename: parentPathname,
      id: parentPathname,
      paths: Module._nodeModulePaths(dirname(parentPathname)),
    };
  }
  let resolved;

  try {
    resolved = Module._resolveFilename(specifier, fakeParent);
  } catch (error) {
    // do nothing
  }

  if (resolved) {
    return pathToFileURL(resolved).href;
  }
}

async function tryESMResolve(specifier, context, nextResolve) {
  try {
    const next = await nextResolve(specifier, context);
    return next.url;
  } catch (error) {
    // do nothing
  }
}

async function exists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch (error) {
    // do nothing
  }
}

export async function resolve(specifier, context, nextResolve) {
  if (!compile) {
    return nextResolve(specifier, context);
  }

  if (Module.builtinModules.includes(specifier)) {
    return nextResolve(specifier, context);
  }

  let resolved;
  if (specifier.startsWith("file://")) {
    // already resolved
    resolved = specifier;
  } else if ((resolved = tryCJSResolve(specifier, context, nextResolve))) {
    // NOTE: this is technically a hack since commonjs module resolution
    // gets extended by @babel/register/experimental-worker
    // in the future we could either use node's own cjs resolve function directly
    // or something of our own
  } else if (
    (resolved = await tryESMResolve(specifier, context, nextResolve))
  ) {
    // last resort
  } else {
    // can't resolve, assume not for us
    return nextResolve(specifier, context);
  }

  const resolvedPath = fileURLToPath(resolved);

  const ext = extname(resolvedPath);

  if (
    resolved.startsWith("file://") &&
    JS_EXTENSIONS.has(ext) &&
    (await exists(resolvedPath))
  ) {
    const result = compile(
      // FIXME: we're calling it with the "correct" source from nextLoad later, but this will get cached
      String(await readFile(resolvedPath)),
      resolvedPath,
      true
    );

    if (result === null) {
      // shouldn't be handeled by us
      return nextResolve(specifier, context);
    }

    const { sourceType } = result;

    flag[resolved] = true;

    // console.log('map', resolved)

    return {
      // will end up at load()
      url: resolved,
      format: sourceType,
      shortCircuit: true,
    };
  } else {
    return nextResolve(specifier, context);
  }
}

export async function load(url, context, nextLoad) {
  if (flag[url]) {
    // Imported files can be either CommonJS or ES modules, so we want any
    // imported file to be treated by Node.js the same as a .js file at the
    // same location. To determine how Node.js would interpret an arbitrary .js
    // file, search up the file system for the nearest parent package.json file
    // and read its "type" field.
    const format = await getPackageType(url);
    // When a hook returns a format of 'commonjs', `source` is be ignored.
    // The .register call at the beginning of the file already takes care of
    // the common-js file
    if (format === "commonjs") {
      return {
        format,
        shortCircuit: true,
      };
    }

    const { source: rawSource, responseURL } = await nextLoad(url, {
      ...context,
      format,
    });

    const file = fileURLToPath(responseURL || url);
    const result = compile(rawSource.toString(), file, true);

    if (result !== null) {
      return result;
    }
  }

  // Let Node.js handle all other URLs.
  return nextLoad(url);
}

export function globalPreload({ port }) {
  port.onmessage = evt => {
    if (evt.data.opts) {
      global._BABEL_ESM_REGISTER.register(evt.data.client, evt.data.opts);
    } else if (evt.data.revert) {
      global._BABEL_ESM_REGISTER.revert();
    }
  };
  port.unref();

  const fnc = {
    register(client, opts) {
      port.postMessage({ client, opts });
    },
    revert() {
      port.postMessage({ revert: true });
    },
  };
  return `\
    globalThis._BABEL_ESM_REGISTER = { ${fnc.register.toString()}, ${fnc.revert.toString()} };
    port.unref();
  `;
}

export function getGlobalPreloadCode() {
  const fnc = {
    register() {
      throw new Error(
        "Modyfing @babel/register on-demand is not supported in this version of node"
      );
    },
    revert() {
      throw new Error(
        "Modyfing @babel/register on-demand is not supported in this version of node"
      );
    },
  };
  return `\
    globalThis._BABEL_ESM_REGISTER = { ${fnc.register.toString()}, ${fnc.revert.toString()} };
  `;
}

// backwards compat
export async function getSource(url, context, next) {
  return load(url, context, next);
}

export async function getFormat(url, context, next) {
  if (flag[url]) {
    const format = await getPackageType(url);
    return {
      format: format || "commonjs",
    };
  }
  return next(url, context, next);
}

async function getPackageType(url) {
  // `url` is only a file path during the first iteration when passed the
  // resolved url from the load() hook
  // an actual file path from load() will contain a file extension as it's
  // required by the spec
  // this simple truthy check for whether `url` contains a file extension will
  // work for most projects but does not cover some edge-cases (such as
  // extensionless files or a url ending in a trailing space)
  const ext = extname(url);
  if (ext === ".cjs") return "commonjs";
  if (ext === ".mjs") return "module";
  const isFilePath = !!ext;
  // If it is a file path, get the directory it's in
  const dir = isFilePath ? dirname(fileURLToPath(url)) : url;
  // Compose a file path to a package.json in the same directory,
  // which may or may not exist
  const packagePath = resolvePath(dir, "package.json");
  // Try to read the possibly nonexistent package.json
  const type = await readFile(packagePath, { encoding: "utf8" })
    .then(filestring => JSON.parse(filestring).type)
    .catch(err => {
      if (err?.code !== "ENOENT") console.error(err);
    });
  // Ff package.json existed and contained a `type` field with a value, voila
  if (type) return type;
  // Otherwise, (if not at the root) continue checking the next directory up
  // If at the root, stop and return false
  return dir.length > 1 && getPackageType(resolvePath(dir, ".."));
}
