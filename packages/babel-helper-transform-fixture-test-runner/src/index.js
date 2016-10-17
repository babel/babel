import * as babel from "babel-core";
import { buildExternalHelpers } from "babel-core";
import getFixtures from "babel-helper-fixtures";
import sourceMap from "source-map";
import codeFrame from "babel-code-frame";
import * as helpers from "./helpers";
import assert from "assert";
import chai from "chai";
import _ from "lodash";
import "babel-polyfill";
import fs from "fs";
import path from "path";

let babelHelpers = eval(buildExternalHelpers(null, "var"));

function wrapPackagesArray(type, names) {
  return (names || []).map(function (val) {
    if (typeof val === "string") val = [val];
    val[0] = __dirname + "/../../babel-" + type + "-" + val[0];
    return val;
  });
}

function run(task) {
  let actual = task.actual;
  let expect = task.expect;
  let exec   = task.exec;
  let opts   = task.options;

  function getOpts(self) {
    let newOpts = _.merge({
      filename: self.loc,
    }, opts);

    newOpts.plugins = wrapPackagesArray("plugin", newOpts.plugins);
    newOpts.presets = wrapPackagesArray("preset", newOpts.presets).map(function (val) {
      if (val.length > 2) {
        throw new Error(`Unexpected extra options ${JSON.stringify(val.slice(2))} passed to preset.`);
      }

      return val;
    });

    return newOpts;
  }

  let execCode = exec.code;
  let result;
  let resultExec;

  if (execCode) {
    let execOpts = getOpts(exec);
    result = babel.transform(execCode, execOpts);
    execCode = result.code;

    try {
      resultExec = runExec(execOpts, execCode);
    } catch (err) {
      err.message = exec.loc + ": " + err.message;
      err.message += codeFrame(execCode);
      throw err;
    }
  }

  let actualCode = actual.code;
  let expectCode = expect.code;
  if (!execCode || actualCode) {
    result = babel.transform(actualCode, getOpts(actual));
    if (!expect.code && result.code && !opts.throws && fs.statSync(path.dirname(expect.loc)).isDirectory() && !process.env.CI) {
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
    let consumer = new sourceMap.SourceMapConsumer(result.map);

    _.each(task.sourceMappings, function (mapping) {
      let actual = mapping.original;

      let expect = consumer.originalPositionFor(mapping.generated);
      chai.expect({ line: expect.line, column: expect.column }).to.deep.equal(actual);
    });
  }

  if (execCode && resultExec) {
    return resultExec;
  }
}

function runExec(opts, execCode) {
  let sandbox = {
    ...helpers,
    babelHelpers,
    assert: chai.assert,
    transform: babel.transform,
    opts,
    exports: {},
  };

  let fn = new Function(...Object.keys(sandbox), execCode);
  return fn.apply(null, Object.values(sandbox));
}

export default function (
  fixturesLoc: string,
  name: string,
  suiteOpts = {},
  taskOpts = {},
  dynamicOpts?: Function,
) {
  let suites = getFixtures(fixturesLoc);

  for (let testSuite of suites) {
    if (_.includes(suiteOpts.ignoreSuites, testSuite.title)) continue;

    describe(name + "/" + testSuite.title, function () {
      for (let task of testSuite.tests) {
        if (_.includes(suiteOpts.ignoreTasks, task.title) ||
            _.includes(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)) continue;

        it(task.title, !task.disabled && function () {
          function runTask() {
            run(task);
          }

          _.defaults(task.options, {
            filenameRelative: task.expect.filename,
            sourceFileName:   task.actual.filename,
            sourceMapTarget:  task.expect.filename,
            suppressDeprecationMessages: true,
            babelrc: false,
            sourceMap: !!(task.sourceMappings || task.sourceMap),
          });

          _.extend(task.options, taskOpts);

          if (dynamicOpts) dynamicOpts(task.options, task);

          let throwMsg = task.options.throws;
          if (throwMsg) {
            // internal api doesn't have this option but it's best not to pollute
            // the options object with useless options
            delete task.options.throws;

            assert.throws(runTask, function (err) {
              return throwMsg === true || err.message.indexOf(throwMsg) >= 0;
            });
          } else {
            if (task.exec.code) {
              let result = run(task);
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
