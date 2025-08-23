import * as babel from "@babel/core";
import { buildExternalHelpers, type InputOptions } from "@babel/core";
import expect from "expect-24";
import * as helpers from "./helpers.ts";
import vm from "node:vm";
import LruCache from "lru-cache";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

type Module = {
  id: string;
  exports: Record<string, unknown>;
};

const require = createRequire(import.meta.url);
const dirname = path.dirname(fileURLToPath(import.meta.url));

const cachedScripts = new LruCache<
  string,
  { code: string; cachedData?: Buffer }
>({ max: 10 });
const contextModuleCache = new WeakMap();

// We never want our tests to accidentally load the root
// babel.config.js file, so we disable config loading by
// default. Tests can still set `configFile: true | string`
// to re-enable config loading.
function transformWithoutConfigFile(code: string, opts: InputOptions) {
  return babel.transformSync(code, {
    browserslistConfigFile: false,
    configFile: false,
    babelrc: false,
    caller: {
      name: "babel-helper-transform-fixture-test-runner/sync",
      supportsStaticESM: false,
      supportsDynamicImport: false,
      supportsExportNamespaceFrom: false,
    },
    ...opts,
  });
}
function transformAsyncWithoutConfigFile(code: string, opts: InputOptions) {
  return babel.transformAsync(code, {
    browserslistConfigFile: false,
    configFile: false,
    babelrc: false,
    caller: {
      name: "babel-helper-transform-fixture-test-runner/async",
      supportsStaticESM: false,
      supportsDynamicImport: false,
      supportsExportNamespaceFrom: false,
    },
    ...opts,
  });
}

export function createTestContext() {
  const context = vm.createContext({
    ...helpers,
    process: process,
    transform: transformWithoutConfigFile,
    transformAsync: transformAsyncWithoutConfigFile,
    setTimeout: setTimeout,
    setImmediate: setImmediate,
    expect,
  });
  context.global = context;

  const moduleCache = Object.create(null);
  contextModuleCache.set(context, moduleCache);

  // Populate the "babelHelpers" global with Babel's helper utilities.
  runCacheableScriptInTestContext(
    path.join(dirname, "babel-helpers-in-memory.js"),
    buildExternalHelpers,
    context,
    moduleCache,
  );

  return context;
}

function runCacheableScriptInTestContext(
  filename: string,
  srcFn: () => string,
  context: vm.Context,
  moduleCache: any,
): Module {
  let cached = cachedScripts.get(filename);
  if (!cached) {
    const code = `(function (exports, require, module, __filename, __dirname) {\n${srcFn()}\n});`;
    cached = {
      code,
      cachedData: undefined,
    };
    cachedScripts.set(filename, cached);
  }

  let script: vm.Script;
  if (process.env.BABEL_8_BREAKING) {
    script = new vm.Script(cached.code, {
      filename,
      lineOffset: -1,
      cachedData: cached.cachedData,
    });
    cached.cachedData = script.createCachedData();
  } else {
    script = new vm.Script(cached.code, {
      filename,
      lineOffset: -1,
      cachedData: cached.cachedData,
      produceCachedData: true,
    });
    if (script.cachedDataProduced) {
      cached.cachedData = script.cachedData;
    }
  }

  const module = {
    id: filename,
    exports: {},
  };
  moduleCache[filename] = module;

  const req = (id: string) =>
    runModuleInTestContext(id, filename, context, moduleCache);
  const dirname = path.dirname(filename);

  script
    .runInContext(context)
    .call(module.exports, module.exports, req, module, filename, dirname);

  return module;
}

/**
 * A basic implementation of CommonJS so we can execute `@babel/polyfill` inside our test context.
 * This allows us to run our unittests
 */
function runModuleInTestContext(
  id: string,
  relativeFilename: string,
  context: vm.Context,
  moduleCache: any,
) {
  const filename = require.resolve(id, {
    paths: [path.dirname(relativeFilename)],
  });

  // Expose Node-internal modules if the tests want them. Note, this will not execute inside
  // the context's global scope.
  if (filename === id) return require(id);

  // Modules can only evaluate once per context, so the moduleCache is a
  // stronger cache guarantee than the LRU's Script cache.
  if (moduleCache[filename]) return moduleCache[filename].exports;

  return runCacheableScriptInTestContext(
    filename,
    () => readFileSync(filename, "utf8"),
    context,
    moduleCache,
  ).exports;
}

let sharedTestContext: vm.Context;

/**
 * Run the given snippet of code inside a CommonJS module.
 *
 * Exposed for unit tests, not for use as an API.
 */
export function runCodeInTestContext(
  code: string,
  opts: {
    filename: string;
    timeout?: number;
  },
  context = (sharedTestContext ??= createTestContext()),
) {
  const filename = opts.filename;
  const dirname = path.dirname(filename);
  const moduleCache = contextModuleCache.get(context);
  const req = (id: string) =>
    runModuleInTestContext(id, filename, context, moduleCache);

  const module: Module = {
    id: filename,
    exports: {},
  };

  const oldCwd = process.cwd();
  try {
    if (opts.filename) process.chdir(path.dirname(opts.filename));

    // Expose the test options as "opts", but otherwise run the test in a CommonJS-like environment.
    // Note: This isn't doing .call(module.exports, ...) because some of our tests currently
    // rely on 'this === global'.
    const src = `((function(exports, require, module, __filename, __dirname, opts) {\n${code}\n})).apply(global, global.__callArgs);`;
    context.__callArgs = [module.exports, req, module, filename, dirname, opts];
    return vm.runInContext(src, context, {
      filename,
      displayErrors: true,
      lineOffset: -1,
      timeout: opts.timeout ?? 10000,
    });
  } finally {
    context.__callArgs = undefined;
    process.chdir(oldCwd);
  }
}

export function runCode(
  code: string,
  opts: {
    filename: string;
    timeout?: number;
  },
) {
  return runCodeInTestContext(code, opts, createTestContext());
}

if (process.argv.includes("$BABEL_WORKER$")) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  process.stdin.on("data", async data => {
    const { id, code, opts } = JSON.parse(data.toString());
    let error;
    try {
      await runCodeInTestContext(code, opts, createTestContext());
    } catch (e) {
      error = { msg: e.message, stack: e.stack };
    }
    process.stdout.write(JSON.stringify({ id, error }));
  });
}
