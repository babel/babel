var genHelpers = require("./_generator-helpers");
var transform  = require("../lib/6to5/transformation/transform");
var sourceMap  = require("source-map");
var esvalid    = require("esvalid");
var Module     = require("module");
var helper     = require("./_helper");
var assert     = require("assert");
var chai       = require("chai");
var path       = require("path");
var util       = require("../lib/6to5/util");
var _          = require("lodash");

require("../lib/6to5/polyfill");

global.assertNoOwnProperties = function (obj) {
  assert.equal(Object.getOwnPropertyNames(obj).length, 0);
};

global.assertArrayEquals = assert.deepEqual;
global.assert = chai.assert;
global.chai = chai;
global.genHelpers = genHelpers;

// Different Traceur generator message
chai.assert._throw = chai.assert.throw;
chai.assert.throw = function (fn, msg) {
  if (msg === '"throw" on executing generator' ||
      msg === '"next" on executing generator') {
    msg = "Generator is already running";
  } else if (msg === "Sent value to newborn generator") {
    msg = /^attempt to send (.*?) to newborn generator$/;
  }

  return chai.assert._throw(fn, msg);
};

var run = function (task, done) {
  var actual = task.actual;
  var expect = task.expect;
  var exec   = task.exec;
  var opts   = task.options;

  var getOpts = function (self) {
    return _.merge({
      filename: self.loc
    }, opts);
  };

  var execCode = exec.code;
  var result;

  var checkAst = function (result) {
    if (opts.noCheckAst) return;

    var errors = esvalid.errors(result.ast.program);
    if (errors.length) {
      var msg = [];
      _.each(errors, function (err) {
        msg.push(err.message + " - " + JSON.stringify(err.node));
      });
      throw new Error(msg.join(". "));
    }
  };

  if (execCode) {
    result = transform(execCode, getOpts(exec));
    checkAst(result);
    execCode = result.code;

    try {
      var fakeRequire = function (loc) {
        if (loc === "../../../src/runtime/polyfills/Number.js") {
          return Number;
        } else if (loc === "../../../src/runtime/polyfills/Math.js") {
          return Math;
        } else {
          return require(path.resolve(exec.loc, "..", loc));
        }
      };

      var fn = new Function("require", "done", execCode);
      fn.call(global, fakeRequire, chai.assert, done);
    } catch (err) {
      err.message = exec.loc + ": " + err.message;
      err.message += util.codeFrame(execCode);
      throw err;
    }
  }

  var actualCode = actual.code;
  var expectCode = expect.code;
  if (!execCode || actualCode) {
    result     = transform(actualCode, getOpts(actual));
    checkAst(result);
    actualCode = result.code;

    try {
      chai.expect(actualCode).to.be.equal(expectCode, actual.loc + " !== " + expect.loc);
    } catch (err) {
      //require("fs").writeFileSync(expect.loc, actualCode);
      throw err;
    }
  }

  if (task.sourceMap) {
    chai.expect(result.map).to.deep.equal(task.sourceMap);
  }

  if (task.sourceMappings) {
    var consumer = new sourceMap.SourceMapConsumer(result.map);

    _.each(task.sourceMappings, function (mapping, i) {
      var expect = mapping.original;

      var actual = consumer.originalPositionFor(mapping.generated);
      chai.expect({ line: actual.line, column: actual.column }).to.deep.equal(expect);
    });
  }
};

module.exports = function (suiteOpts, taskOpts, dynamicOpts) {
  taskOpts = taskOpts || {};

  require("../register")(taskOpts);

  _.each(helper.get(suiteOpts.name, suiteOpts.loc), function (testSuite) {
    if (_.contains(suiteOpts.ignoreSuites, testSuite.title)) return;

    suite(suiteOpts.name + "/" + testSuite.title, function () {
      _.each(testSuite.tests, function (task) {
        if (_.contains(suiteOpts.ignoreTasks, task.title) || _.contains(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)) return;

        var runTest = function (done) {
          var runTask = function () {
            try {
              run(task, done);
            } catch (err) {
              if (task.options.after) task.options.after();
              throw err;
            }
          };

          _.extend(task.options, taskOpts);
          if (dynamicOpts) dynamicOpts(task.options, task);

          var throwMsg = task.options.throws;
          if (throwMsg) {
            // internal api doesn't have this option but it's best not to pollute
            // the options object with useless options
            delete task.options.throws;

            assert.throws(runTask, function (err) {
              return throwMsg === true || err.message.indexOf(throwMsg) >= 0;
            });
          } else {
            runTask();
          }
        };

        var callback;
        if (task.options.asyncExec) {
          callback = runTest;
        } else {
          callback = function () {
            return runTest();
          };
        }

        test(task.title, !task.disabled && callback);
      });
    });
  });
};
