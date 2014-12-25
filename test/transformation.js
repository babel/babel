var genHelpers = require("./_generator-helpers");
var transform  = require("../lib/6to5/transformation/transform");
var sourceMap  = require("source-map");
var helper     = require("./_helper");
var assert     = require("assert");
var chai       = require("chai");
var util       = require("../lib/6to5/util");
var _          = require("lodash");

require("../lib/6to5/polyfill");

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

  if (execCode) {
    result = transform(execCode, getOpts(exec));
    execCode = result.code;

    try {
      var fn = new Function("assert", "done", "genHelpers", execCode);
      fn(assert, done, genHelpers);
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
    actualCode = result.code;

    chai.expect(actualCode).to.be.equal(expectCode, actual.loc + " !== " + expect.loc);
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

_.each(helper.get("transformation"), function (testSuite) {
  suite("transformation/" + testSuite.title, function () {
    _.each(testSuite.tests, function (task) {
      var runTest = function (done) {
        var runTask = function () {
          run(task, done);
        };

        var throwMsg = task.options.throws;
        if (throwMsg) {
          // internal api doesn't have this option but it's best not to pollute
          // the options object with useless options
          delete task.options.throws;

          assert.throws(runTask, function (err) {
            return err.message.indexOf(throwMsg) >= 0;
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
