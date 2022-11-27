/* eslint-env jest */
import * as babel from "@babel/core";
import {
  buildExternalHelpers,
  type InputOptions,
  type FileResult,
} from "@babel/core";
import {
  default as getFixtures,
  resolveOptionPluginOrPreset,
  type Test,
  type TestFile,
  type TaskOptions,
} from "@babel/helper-fixtures";
import { codeFrameColumns } from "@babel/code-frame";
import * as helpers from "./helpers";
import assert from "assert";
import fs from "fs";
import path from "path";
import vm from "vm";
import QuickLRU from "quick-lru";
import { fileURLToPath } from "url";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import checkDuplicateNodes from "@babel/helper-check-duplicate-nodes";

type Module = {
  id: string;
  exports: Record<string, unknown>;
};

if (!process.env.BABEL_8_BREAKING) {
  // Introduced in Node.js 10
  if (!assert.rejects) {
    assert.rejects = async function (block, validateError) {
      try {
        await (typeof block === "function" ? block() : block);
        return Promise.reject(new Error("Promise not rejected"));
      } catch (error) {
        // @ts-expect-error Fixme: validateError can be a string | object
        // see https://nodejs.org/api/assert.html#assertrejectsasyncfn-error-message
        if (typeof validateError === "function" && !validateError(error)) {
          return Promise.reject(
            new Error("Promise rejected with invalid error"),
          );
        }
      }
    };
  }
}

const EXTERNAL_HELPERS_VERSION = "7.100.0";

const cachedScripts = new QuickLRU<
  string,
  { code: string; cachedData?: Buffer }
>({ maxSize: 64 });
const contextModuleCache = new WeakMap();
const sharedTestContext = createContext();

// We never want our tests to accidentally load the root
// babel.config.js file, so we disable config loading by
// default. Tests can still set `configFile: true | string`
// to re-enable config loading.
function transformWithoutConfigFile(code: string, opts: InputOptions) {
  return babel.transformSync(code, {
    configFile: false,
    babelrc: false,
    ...opts,
  });
}
function transformAsyncWithoutConfigFile(code: string, opts: InputOptions) {
  return babel.transformAsync(code, {
    configFile: false,
    babelrc: false,
    ...opts,
  });
}

function createContext() {
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
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "babel-helpers-in-memory.js",
    ),
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
      displayErrors: true,
      lineOffset: -1,
      cachedData: cached.cachedData,
    });
    cached.cachedData = script.createCachedData();
  } else {
    script = new vm.Script(cached.code, {
      filename,
      displayErrors: true,
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
    () => fs.readFileSync(filename, "utf8"),
    context,
    moduleCache,
  ).exports;
}

/**
 * Run the given snippet of code inside a CommonJS module.
 *
 * Exposed for unit tests, not for use as an API.
 */
export function runCodeInTestContext(
  code: string,
  opts: {
    filename: string;
  },
  context = sharedTestContext,
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
    const src = `(function(exports, require, module, __filename, __dirname, opts) {\n${code}\n});`;
    return vm.runInContext(src, context, {
      filename,
      displayErrors: true,
      lineOffset: -1,
    })(module.exports, req, module, filename, dirname, opts);
  } finally {
    process.chdir(oldCwd);
  }
}

async function maybeMockConsole<R>(validateLogs: boolean, run: () => R) {
  const actualLogs = { stdout: "", stderr: "" };

  if (!validateLogs) return { result: await run(), actualLogs };

  const spy1 = jest.spyOn(console, "log").mockImplementation(msg => {
    actualLogs.stdout += `${msg}\n`;
  });
  const spy2 = jest.spyOn(console, "warn").mockImplementation(msg => {
    actualLogs.stderr += `${msg}\n`;
  });

  try {
    return { result: await run(), actualLogs };
  } finally {
    spy1.mockRestore();
    spy2.mockRestore();
  }
}

async function run(task: Test) {
  const {
    actual,
    expect: expected,
    exec,
    options: opts,
    doNotSetSourceType,
    optionsDir,
    validateLogs,
    ignoreOutput,
    stdout,
    stderr,
  } = task;

  // todo(flow->ts) add proper return type (added any, because empty object is inferred)
  function getOpts(self: TestFile): any {
    const newOpts = {
      ast: true,
      cwd: path.dirname(self.loc),
      filename: self.loc,
      filenameRelative: self.filename,
      sourceFileName: self.filename,
      ...(doNotSetSourceType ? {} : { sourceType: "script" }),
      babelrc: false,
      configFile: false,
      inputSourceMap: task.inputSourceMap || undefined,
      ...opts,
    };

    return resolveOptionPluginOrPreset(newOpts, optionsDir);
  }

  const inputCode = actual.code;
  const expectedCode = expected.code;

  let execCode = exec.code;
  let result: FileResult;
  let resultExec;
  let execWithOutput = false;
  let execError;

  if (/@babel-test-output/.test(execCode)) {
    if (inputCode != null) {
      throw new Error("cannot have both input and exec-with-output");
    }
    execWithOutput = true;
  }

  if (execCode != null) {
    const context = createContext();
    const execOpts = getOpts(exec);

    // Ignore Babel logs of exec.js files.
    // They will be validated in input/output files.
    ({ result } = await maybeMockConsole(validateLogs, () =>
      babel.transformAsync(execCode, execOpts),
    ));

    checkDuplicateNodes(result.ast);
    execCode = result.code;

    try {
      resultExec = runCodeInTestContext(execCode, execOpts, context);
    } catch (err) {
      // Pass empty location to include the whole file in the output.
      err.message =
        `${exec.loc}: ${err.message}\n` + codeFrameColumns(execCode, {} as any);
      if (execWithOutput) {
        // This allows us to view the output.
        execError = err;
      } else {
        throw err;
      }
    }
  }

  let outputCode = null;

  if (inputCode != null) {
    let actualLogs;

    ({ result, actualLogs } = await maybeMockConsole(validateLogs, () =>
      babel.transformAsync(inputCode, getOpts(actual)),
    ));

    outputCode = normalizeOutput(result.code);

    checkDuplicateNodes(result.ast);

    if (validateLogs) {
      validateFile(
        normalizeOutput(actualLogs.stdout, /* normalizePathSeparator */ true),
        stdout.loc,
        stdout.code || "",
      );
      validateFile(
        normalizeOutput(actualLogs.stderr, /* normalizePathSeparator */ true),
        stderr.loc,
        stderr.code || "",
      );
    }
  }

  if (execWithOutput) outputCode = execCode;
  if (!ignoreOutput && !(outputCode == "")) {
    // For empty input
    if (
      !expectedCode &&
      outputCode &&
      !opts.throws &&
      fs.statSync(path.dirname(expected.loc)).isDirectory() &&
      !process.env.CI
    ) {
      const expectedFile = expected.loc.replace(
        /\.m?js$/,
        result.sourceType === "module" ? ".mjs" : ".js",
      );

      console.log(`New test file created: ${expectedFile}`);
      fs.writeFileSync(expectedFile, `${outputCode}\n`);

      if (expected.loc !== expectedFile) {
        try {
          fs.unlinkSync(expected.loc);
        } catch (e) {}
      }
    } else {
      validateFile(outputCode, expected.loc, expectedCode);

      expect(expected.loc).toMatch(
        result.sourceType === "module" ? /\.mjs$/ : /\.js$/,
      );
    }
  }

  if (execError) throw execError;

  if (opts.sourceMaps === true) {
    try {
      expect(result.map).toEqual(task.sourceMap);
    } catch (e) {
      if (!process.env.OVERWRITE && task.sourceMap) throw e;

      console.log(`Updated test file: ${task.sourceMapFile.loc}`);
      fs.writeFileSync(
        task.sourceMapFile.loc,
        JSON.stringify(result.map, null, 2),
      );
    }
  }

  if (execCode && resultExec) {
    return resultExec;
  }
}

function validateFile(
  actualCode: string,
  expectedLoc: string,
  expectedCode: string,
) {
  try {
    expect(actualCode).toEqualFile({
      filename: expectedLoc,
      code: expectedCode,
    });
  } catch (e) {
    if (!process.env.OVERWRITE) throw e;

    console.log(`Updated test file: ${expectedLoc}`);
    fs.writeFileSync(expectedLoc, `${actualCode}\n`);
  }
}

function escapeRegExp(string: string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function normalizeOutput(code: string, normalizePathSeparator?: boolean) {
  const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../",
  );
  const cwdSymbol = "<CWD>";

  const replaceWithCwd = (text: string, ...patterns: string[]) => {
    for (const pattern of patterns) {
      text = text.replace(new RegExp(escapeRegExp(pattern), "g"), cwdSymbol);
    }
    return text;
  };

  let result = replaceWithCwd(
    code.trim(),
    // (non-win32) /foo/babel/packages -> <CWD>/packages
    // (win32) C:\foo\babel\packages -> <CWD>\packages
    projectRoot,
  );
  if (process.platform === "win32") {
    result = replaceWithCwd(
      result,
      // C:/foo/babel/packages -> <CWD>/packages
      projectRoot.replace(/\\/g, "/"),
      // C:\\foo\\babel\\packages -> <CWD>\\packages (in js string literal)
      projectRoot.replace(/\\/g, "\\\\"),
    );
    if (normalizePathSeparator) {
      result = result.replace(/<CWD>[\w\\/.-]+/g, path =>
        path.replace(/\\\\?/g, "/"),
      );
    }
  }
  return result;
}

expect.extend({
  toEqualFile(actual, { filename, code }: Pick<TestFile, "filename" | "code">) {
    if (this.isNot) {
      throw new Error(".toEqualFile does not support negation");
    }

    const pass = actual === code;
    return {
      pass,
      message: () => {
        const diffString = this.utils.diff(code, actual, {
          expand: false,
        });
        return (
          `Expected ${filename} to match transform output.\n` +
          `To autogenerate a passing version of this file, delete the file and re-run the tests.\n\n` +
          `Diff:\n\n${diffString}`
        );
      },
    };
  },
});

declare global {
  // eslint-disable-next-line no-redeclare,@typescript-eslint/no-unused-vars
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toEqualFile({
        filename,
        code,
      }: Pick<TestFile, "filename" | "code">): jest.CustomMatcherResult;
    }
  }
}

export type SuiteOptions = {
  ignoreSuites?: string[];
  ignoreTasks?: string[];
};

export default function (
  fixturesLoc: string,
  name: string,
  suiteOpts: SuiteOptions = {},
  taskOpts: TaskOptions = {},
  dynamicOpts?: (options: TaskOptions, task: Test) => void,
) {
  const suites = getFixtures(fixturesLoc);

  for (const testSuite of suites) {
    if (suiteOpts.ignoreSuites?.includes(testSuite.title)) continue;

    describe(name + "/" + testSuite.title, function () {
      for (const task of testSuite.tests) {
        if (
          suiteOpts.ignoreTasks?.includes(task.title) ||
          suiteOpts.ignoreTasks?.includes(testSuite.title + "/" + task.title)
        ) {
          continue;
        }

        const testFn = task.disabled ? it.skip : it;

        testFn(
          task.title,

          async function () {
            const runTask = () => run(task);
            if ("sourceMap" in task.options === false) {
              task.options.sourceMap = !!task.sourceMap;
            }

            Object.assign(task.options, taskOpts);

            if (dynamicOpts) dynamicOpts(task.options, task);

            if (task.externalHelpers) {
              (task.options.plugins ??= [])
                // @ts-expect-error manipulating input options
                .push([
                  "external-helpers",
                  { helperVersion: EXTERNAL_HELPERS_VERSION },
                ]);
            }

            const throwMsg = task.options.throws;
            if (throwMsg) {
              // internal api doesn't have this option but it's best not to pollute
              // the options object with useless options
              delete task.options.throws;

              await assert.rejects(runTask, function (err: Error) {
                assert.ok(
                  throwMsg === true || err.message.includes(throwMsg),
                  `
Expected Error: ${throwMsg}
Actual Error: ${err.message}`,
                );
                return true;
              });
            } else {
              return runTask();
            }
          },
        );
      }
    });
  }
}
