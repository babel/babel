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
import "babel-polyfill";
import fs from "fs";
import path from "path";

const babelHelpers = eval(buildExternalHelpers(null, "var"));

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
    const execDirName = path.dirname(exec.loc);
    result = babel.transform(execCode, execOpts);
    execCode = result.code;

    try {
      resultExec = runExec(execOpts, execCode, execDirName);
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
      chai.expect(actualCode).to.be.equal(expectCode, actual.loc + " !== " + expect.loc);
    }
  }

  if (task.sourceMap) {
    chai.expect(result.map).to.deep.equal(task.sourceMap);
  }

  if (task.sourceMappings) {
    const consumer = new sourceMap.SourceMapConsumer(result.map);

    task.sourceMappings.forEach(function (mapping) {
      const actual = mapping.original;

      const expect = consumer.originalPositionFor(mapping.generated);
      chai.expect({ line: expect.line, column: expect.column }).to.deep.equal(actual);
    });
  }

  if (execCode && resultExec) {
    return resultExec;
  }
}

function runExec(opts, execCode, execDirname) {
  const sandbox = {
    ...helpers,
    babelHelpers,
    assert: chai.assert,
    transform: babel.transform,
    opts,
    exports: {},
    require(id) {
      return require(id[0] === "." ? path.resolve(execDirname, id) : id);
    }
  };

  const fn = new Function(...Object.keys(sandbox), execCode);
  return fn.apply(null, Object.values(sandbox));
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
            inputSourceMap: task.inputSourceMap || undefined,
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
