import * as babel from "babel-core";
import { buildExternalHelpers } from "babel-core";
import getFixtures from "babel-helper-fixtures";
import sourceMap from "source-map";
import codeFrame from "babel-code-frame";
import defaults from "lodash/defaults";
import includes from "lodash/includes";
import * as helpers from "./helpers";
import extend from "lodash/extend";
import merge from "lodash/merge";
import assert from "assert";
import chai from "chai";
import fs from "fs";
import path from "path";
import vm from "vm";
import Module from "module";

const moduleCache = {};
const testContext = vm.createContext({
  ...helpers,
  assert: chai.assert,
  transform: babel.transform,
});
testContext.global = testContext;

const jest = {};
jest.expect = global.expect;

// Initialize the test context with the polyfill, and then freeze the global to prevent implicit
// global creation in tests, which could cause things to bleed between tests.
runModuleInTestContext("babel-polyfill", __filename);

// Populate the "babelHelpers" global with Babel's helper utilities.
runCodeInTestContext(buildExternalHelpers());

/**
 * A basic implementation of CommonJS so we can execute `babel-polyfill` inside our test context.
 * This allows us to run our unittests
 */
function runModuleInTestContext(id: string, relativeFilename: string) {
  // This code is a gross hack using internal APIs, but we also have the same logic in babel-core
  // to resolve presets and plugins, so if this breaks, we'll have even worse issues to deal with.
  const relativeMod = new Module();
  relativeMod.id = relativeFilename;
  relativeMod.filename = relativeFilename;
  relativeMod.paths = Module._nodeModulePaths(path.dirname(relativeFilename));
  const filename = Module._resolveFilename(id, relativeMod);

  // Expose Node-internal modules if the tests want them. Note, this will not execute inside
  // the context's global scope.
  if (filename === id) return require(id);

  if (moduleCache[filename]) return moduleCache[filename].exports;

  const module = moduleCache[filename] = {
    id: filename,
    exports: {},
  };
  const dirname = path.dirname(filename);
  const req = (id) => runModuleInTestContext(id, filename);

  const src = fs.readFileSync(filename, "utf8");
  const code = `(function (exports, require, module, __filename, __dirname) {${src}\n});`;

  vm.runInContext(code, testContext, {
    filename,
    displayErrors: true,
  }).call(module.exports, module.exports, req, module, filename, dirname);

  return module.exports;
}

/**
 * Run the given snippet of code inside a CommonJS module.
 *
 * Exposed for unit tests, not for use as an API.
 */
export function runCodeInTestContext(code: string, opts: {filename?: string} = {}) {
  const filename = opts.filename || null;
  const dirname = filename ? path.dirname(filename) : null;
  const req = filename ? ((id) => runModuleInTestContext(id, filename)) : null;

  const module = {
    id: filename,
    exports: {},
  };

  // Expose the test options as "opts", but otherwise run the test in a CommonJS-like environment.
  // Note: This isn't doing .call(module.exports, ...) because some of our tests currently
  // rely on 'this === global'.
  const src = `(function(exports, require, module, __filename, __dirname, opts) {${code}\n});`;
  return vm.runInContext(src, testContext, {
    filename,
    displayErrors: true,
  })(module.exports, req, module, filename, dirname, opts);
}

function wrapPackagesArray(type, names, optionsDir) {
  return (names || []).map(function (val) {
    if (typeof val === "string") val = [val];

    // relative path (outside of monorepo)
    if (val[0][0] === ".") {

      if (!optionsDir) {
        throw new Error("Please provide an options.json in test dir when using a " +
          "relative plugin path.");
      }

      val[0] = path.resolve(optionsDir, val[0]);
    }
    // check node_modules/babel-x-y
    else {
      val[0] = __dirname + "/../../babel-" + type + "-" + val[0];
    }

    return val;
  });
}

function run(task) {
  const actual = task.actual;
  const expect = task.expect;
  const exec   = task.exec;
  const opts   = task.options;
  const optionsDir = task.optionsDir;

  function getOpts(self) {
    const newOpts = merge({
      filename: self.loc,
    }, opts);

    newOpts.plugins = wrapPackagesArray("plugin", newOpts.plugins, optionsDir);
    newOpts.presets = wrapPackagesArray("preset", newOpts.presets, optionsDir).map(function (val) {
      if (val.length > 2) {
        throw new Error("Unexpected extra options " + JSON.stringify(val.slice(2)) +
          " passed to preset.");
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
    execCode = result.code;

    try {
      resultExec = runCodeInTestContext(execCode, execOpts);
    } catch (err) {
      err.message = exec.loc + ": " + err.message;
      err.message += codeFrame(execCode);
      throw err;
    }
  }

  let actualCode = actual.code;
  const expectCode = expect.code;
  if (!execCode || actualCode) {
    result = babel.transform(actualCode, getOpts(actual));
    if (
      !expect.code && result.code && !opts.throws && fs.statSync(path.dirname(expect.loc)).isDirectory() &&
      !process.env.CI
    ) {
      console.log(`New test file created: ${expect.loc}`);
      fs.writeFileSync(expect.loc, result.code);
    } else {
      actualCode = result.code.trim();
      jest.expect(actualCode).toEqual(expectCode);
    }
  }

  if (task.sourceMap) {
    jest.expect(result.map).toEqual(task.sourceMap);
  }

  if (task.sourceMappings) {
    const consumer = new sourceMap.SourceMapConsumer(result.map);

    task.sourceMappings.forEach(function (mapping) {
      const actual = mapping.original;

      const expect = consumer.originalPositionFor(mapping.generated);
      jest.expect({ line: expect.line, column: expect.column }).toEqual(actual);
    });
  }

  if (execCode && resultExec) {
    return resultExec;
  }
}

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
      for (const task of testSuite.tests) {
        if (includes(suiteOpts.ignoreTasks, task.title) ||
            includes(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)) continue;

        it(task.title, !task.disabled && function () {
          function runTask() {
            run(task);
          }

          defaults(task.options, {
            filenameRelative: task.expect.filename,
            sourceFileName:   task.actual.filename,
            sourceMapTarget:  task.expect.filename,
            suppressDeprecationMessages: true,
            babelrc: false,
            sourceMap: !!(task.sourceMappings || task.sourceMap),
          });

          extend(task.options, taskOpts);

          if (dynamicOpts) dynamicOpts(task.options, task);

          const throwMsg = task.options.throws;
          if (throwMsg) {
            // internal api doesn't have this option but it's best not to pollute
            // the options object with useless options
            delete task.options.throws;

            assert.throws(runTask, function (err) {
              return throwMsg === true || err.message.indexOf(throwMsg) >= 0;
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
        });
      }
    });
  }
}
