/* eslint-env jest */
import * as babel from "@babel/core";
import { buildExternalHelpers } from "@babel/core";
import getFixtures from "@babel/helper-fixtures";
import sourceMap from "source-map";
import { codeFrameColumns } from "@babel/code-frame";
import defaults from "lodash/defaults";
import includes from "lodash/includes";
import escapeRegExp from "lodash/escapeRegExp";
import * as helpers from "./helpers";
import extend from "lodash/extend";
import merge from "lodash/merge";
import assert from "assert";
import fs from "fs";
import path from "path";
import vm from "vm";
import checkDuplicatedNodes from "babel-check-duplicated-nodes";

import diff from "jest-diff";

const moduleCache = {};
const testContext = vm.createContext({
  ...helpers,
  process: process,
  transform: babel.transform,
  setTimeout: setTimeout,
  setImmediate: setImmediate,
  expect,
});
testContext.global = testContext;

// Initialize the test context with the polyfill, and then freeze the global to prevent implicit
// global creation in tests, which could cause things to bleed between tests.
runModuleInTestContext("@babel/polyfill", __filename);

// Populate the "babelHelpers" global with Babel's helper utilities.
runCodeInTestContext(buildExternalHelpers(), {
  filename: path.join(__dirname, "babel-helpers-in-memory.js"),
});

/**
 * A basic implementation of CommonJS so we can execute `@babel/polyfill` inside our test context.
 * This allows us to run our unittests
 */
function runModuleInTestContext(id: string, relativeFilename: string) {
  const filename = require.resolve(id, {
    paths: [path.dirname(relativeFilename)],
  });

  // Expose Node-internal modules if the tests want them. Note, this will not execute inside
  // the context's global scope.
  if (filename === id) return require(id);

  if (moduleCache[filename]) return moduleCache[filename].exports;

  const module = (moduleCache[filename] = {
    id: filename,
    exports: {},
  });
  const dirname = path.dirname(filename);
  const req = id => runModuleInTestContext(id, filename);

  const src = fs.readFileSync(filename, "utf8");
  const code = `(function (exports, require, module, __filename, __dirname) {\n${src}\n});`;

  vm.runInContext(code, testContext, {
    filename,
    displayErrors: true,
    lineOffset: -1,
  }).call(module.exports, module.exports, req, module, filename, dirname);

  return module.exports;
}

/**
 * Run the given snippet of code inside a CommonJS module.
 *
 * Exposed for unit tests, not for use as an API.
 */
export function runCodeInTestContext(code: string, opts: { filename: string }) {
  const filename = opts.filename;
  const dirname = path.dirname(filename);
  const req = id => runModuleInTestContext(id, filename);

  const module = {
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
    return vm.runInContext(src, testContext, {
      filename,
      displayErrors: true,
      lineOffset: -1,
    })(module.exports, req, module, filename, dirname, opts);
  } finally {
    process.chdir(oldCwd);
  }
}

function wrapPackagesArray(type, names, optionsDir) {
  return (names || []).map(function (val) {
    if (typeof val === "string") val = [val];

    // relative path (outside of monorepo)
    if (val[0][0] === ".") {
      if (!optionsDir) {
        throw new Error(
          "Please provide an options.json in test dir when using a " +
            "relative plugin path.",
        );
      }

      val[0] = path.resolve(optionsDir, val[0]);
    } else {
      const monorepoPath = __dirname + "/../../babel-" + type + "-" + val[0];

      if (fs.existsSync(monorepoPath)) {
        val[0] = monorepoPath;
      }
    }

    return val;
  });
}

function run(task) {
  const {
    actual,
    expect: expected,
    exec,
    options: opts,
    optionsDir,
    validateLogs,
    ignoreOutput,
    stdout,
    stderr,
  } = task;

  function getOpts(self) {
    const newOpts = merge(
      {
        cwd: path.dirname(self.loc),
        filename: self.loc,
        filenameRelative: self.filename,
        sourceFileName: self.filename,
        sourceType: "script",
        babelrc: false,
        inputSourceMap: task.inputSourceMap || undefined,
      },
      opts,
    );

    newOpts.plugins = wrapPackagesArray("plugin", newOpts.plugins, optionsDir);
    newOpts.presets = wrapPackagesArray(
      "preset",
      newOpts.presets,
      optionsDir,
    ).map(function (val) {
      if (val.length > 3) {
        throw new Error(
          "Unexpected extra options " +
            JSON.stringify(val.slice(3)) +
            " passed to preset.",
        );
      }

      return val;
    });

    return newOpts;
  }

  let execCode = exec.code;
  let result;
  let resultExec;

  if (execCode) {
    const execOpts = getOpts(exec);
    result = babel.transform(execCode, execOpts);
    checkDuplicatedNodes(babel, result.ast);
    execCode = result.code;

    try {
      resultExec = runCodeInTestContext(execCode, execOpts);
    } catch (err) {
      // Pass empty location to include the whole file in the output.
      err.message =
        `${exec.loc}: ${err.message}\n` + codeFrameColumns(execCode, {});
      throw err;
    }
  }

  const inputCode = actual.code;
  const expectedCode = expected.code;
  if (!execCode || inputCode) {
    const actualLogs = { stdout: "", stderr: "" };
    let restoreSpies = null;
    if (validateLogs) {
      const spy1 = jest.spyOn(console, "log").mockImplementation(msg => {
        actualLogs.stdout += `${msg}\n`;
      });
      const spy2 = jest.spyOn(console, "warn").mockImplementation(msg => {
        actualLogs.stderr += `${msg}\n`;
      });
      restoreSpies = () => {
        spy1.mockRestore();
        spy2.mockRestore();
      };
    }

    result = babel.transform(inputCode, getOpts(actual));

    if (restoreSpies) restoreSpies();

    const outputCode = normalizeOutput(result.code);

    checkDuplicatedNodes(babel, result.ast);
    if (!ignoreOutput) {
      if (
        !expected.code &&
        outputCode &&
        !opts.throws &&
        !opts.rejects &&
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

        if (inputCode) {
          expect(expected.loc).toMatch(
            result.sourceType === "module" ? /\.mjs$/ : /\.js$/,
          );
        }
      }
    }

    if (validateLogs) {
      validateFile(normalizeOutput(actualLogs.stdout), stdout.loc, stdout.code);
      validateFile(normalizeOutput(actualLogs.stderr), stderr.loc, stderr.code);
    }
  }

  if (task.sourceMap) {
    expect(result.map).toEqual(task.sourceMap);
  }

  if (task.sourceMappings) {
    const consumer = new sourceMap.SourceMapConsumer(result.map);

    task.sourceMappings.forEach(function (mapping) {
      const actual = mapping.original;

      const expected = consumer.originalPositionFor(mapping.generated);
      expect({ line: expected.line, column: expected.column }).toEqual(actual);
    });
  }

  if (execCode && resultExec) {
    return resultExec;
  }
}

function validateFile(actualCode, expectedLoc, expectedCode) {
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

function normalizeOutput(code) {
  const projectRoot = path.resolve(__dirname, "../../../");
  const cwdSymbol = "<CWD>";
  let result = code
    .trim()
    // (non-win32) /foo/babel/packages -> <CWD>/packages
    // (win32) C:\foo\babel\packages -> <CWD>\packages
    .replace(new RegExp(escapeRegExp(projectRoot), "g"), cwdSymbol);
  if (process.platform === "win32") {
    result = result
      // C:/foo/babel/packages -> <CWD>/packages
      .replace(
        new RegExp(escapeRegExp(projectRoot.replace(/\\/g, "/")), "g"),
        cwdSymbol,
      )
      // C:\\foo\\babel\\packages -> <CWD>\\packages (in js string literal)
      .replace(
        new RegExp(escapeRegExp(projectRoot.replace(/\\/g, "\\\\")), "g"),
        cwdSymbol,
      );
  }
  return result;
}

const toEqualFile = () => ({
  compare: (actual, { filename, code }) => {
    const pass = actual === code;
    return {
      pass,
      message: () => {
        const diffString = diff(code, actual, {
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
  negativeCompare: () => {
    throw new Error("Negation unsupported");
  },
});

export default function (
  fixturesLoc: string,
  name: string,
  suiteOpts = {},
  taskOpts = {},
  dynamicOpts?: Function,
) {
  const suites = getFixtures(fixturesLoc);

  for (const testSuite of suites) {
    if (includes(suiteOpts.ignoreSuites, testSuite.title)) continue;

    describe(name + "/" + testSuite.title, function () {
      jest.addMatchers({
        toEqualFile,
      });

      for (const task of testSuite.tests) {
        if (
          includes(suiteOpts.ignoreTasks, task.title) ||
          includes(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)
        ) {
          continue;
        }

        const testFn = task.disabled ? it.skip : it;

        testFn(
          task.title,

          function () {
            function runTask() {
              run(task);
            }

            async function runTaskAsync() {
              run(task);
            }

            defaults(task.options, {
              sourceMap: !!(task.sourceMappings || task.sourceMap),
            });

            extend(task.options, taskOpts);

            if (dynamicOpts) dynamicOpts(task.options, task);

            const throwMsg = task.options.throws;
            const rejectMsg = task.options.rejects;
            if (throwMsg) {
              // internal api doesn't have this option but it's best not to pollute
              // the options object with useless options
              delete task.options.throws;

              return assert.throws(runTask, function (err) {
                assert.ok(err.message.includes(throwMsg));
                return true;
              });
            } else if (rejectMsg) {
              delete task.options.rejects;

              return assert.rejects(runTaskAsync, function (err) {
                assert.ok(err.message.includes(rejectMsg));
                return true;
              });
            } else {
              if (task.exec.code) {
                const result = run(task);
                if (result && typeof result.then === "function") {
                  return result;
                }
              } else {
                runTask();
              }
            }
          },
        );
      }
    });
  }
}
