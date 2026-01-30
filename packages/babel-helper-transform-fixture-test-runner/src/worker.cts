import expect = require("expect-24");
import resolve = require("resolve");
import vm = require("vm");
import LruCache = require("lru-cache");
import path = require("path");
import fs = require("fs");

const helpers = {
  assertNoOwnProperties: function assertNoOwnProperties(obj: object) {
    expect(Object.getOwnPropertyNames(obj)).toHaveLength(0);
  },
  multiline: function multiline(arr: string[]) {
    return arr.join("\n");
  },
};

type Module = {
  id: string;
  exports: Record<string, unknown>;
};

const cachedScripts = new LruCache<
  string,
  { code: string; cachedData?: Buffer }
>({ max: 100 });
const contextModuleCache = new WeakMap();

export function createTestContext() {
  const context = vm.createContext(
    Object.assign({}, helpers, {
      process: process,
      setTimeout: setTimeout,
      setImmediate: setImmediate,
      expect,
    }),
  );
  context.global = context;

  const moduleCache = Object.create(null);
  contextModuleCache.set(context, moduleCache);

  const babelHelpers =
    // @ts-expect-error read global
    global.BABEL_HELPERS ||
    (process.argv.includes("$BABEL_WORKER$")
      ? fs.readFileSync(process.argv[3], "utf8")
      : require("@babel/core").buildExternalHelpers());
  // Populate the "babelHelpers" global with Babel's helper utilities.
  runCacheableScriptInTestContext(
    path.join(__dirname, "babel-helpers-in-memory.js"),
    () => babelHelpers,
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

  const script = new vm.Script(cached.code, {
    filename,
    lineOffset: -1,
    cachedData: cached.cachedData,
    produceCachedData: true,
  });
  if (script.cachedDataProduced) {
    cached.cachedData = script.cachedData;
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
  const filename = resolve.sync(id, {
    basedir: path.dirname(relativeFilename),
  });

  // Expose Node-internal modules if the tests want them. Note, this will not execute inside
  // the context's global scope.
  if (filename === id) return require(id);

  // Modules can only evaluate once per context, so the moduleCache is a
  // stronger cache guarantee than the LRU's Script cache.
  if (moduleCache[filename]) return moduleCache[filename].exports;

  return runCacheableScriptInTestContext(
    filename,
    () => fs.readFileSync(filename, "utf8"),
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
  context = (sharedTestContext = sharedTestContext || createTestContext()),
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
      timeout: opts.timeout === undefined ? 10000 : opts.timeout,
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

function isThenable<T = any>(val: any): val is PromiseLike<T> {
  return (
    !!val &&
    (typeof val === "object" || typeof val === "function") &&
    !!val.then &&
    typeof val.then === "function"
  );
}

if (process.argv.includes("$BABEL_WORKER$")) {
  process.stdin.on("data", data => {
    const { id, code, opts } = JSON.parse(data.toString());
    let error;
    try {
      const result = runCodeInTestContext(code, opts, createTestContext());
      if (isThenable(result)) {
        result.then(
          () => process.stdout.write(JSON.stringify({ id })),
          e =>
            process.stdout.write(
              JSON.stringify({ id, error: { msg: e.message, stack: e.stack } }),
            ),
        );
        return;
      }
    } catch (e) {
      error = { msg: e.message, stack: e.stack };
    }
    process.stdout.write(JSON.stringify({ id, error }));
  });
}
