var transform = require("../lib/6to5/transformation/transform");
var sourceMap = require("source-map");
var helper    = require("./_helper");
var assert    = require("assert");
var chai      = require("chai");
var util      = require("../lib/6to5/util");
var _         = require("lodash");

var run = function (task) {
  var actual = task.actual;
  var expect = task.expect;
  var opts   = task.options;
  var exec   = task.exec;

  var getOpts = function (filename) {
    return _.merge({
      whtiespace: true,
      filename: filename
    }, opts);
  };

  var execCode = exec.code;
  var result;

  if (execCode) {
    result = transform(execCode, getOpts(exec.filename));
    execCode = result.code;

    require("../polyfill");

    try {
      var fn = new Function("assert", execCode);
      fn(assert);
    } catch (err) {
      err.message += util.codeFrame(execCode);
      throw err;
    }
  } else {
    var actualCode = actual.code;
    var expectCode = expect.code;

    result     = transform(actualCode, getOpts(actual.filename));
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
      test(task.title, function () {
        var runTask = function () {
          run(task);
        };

        var throwMsg = task.options.throws;
        if (throwMsg) {
          // internal api doesn't have this option but it's best not to pollute
          // the options object with useless options
          delete task.options.throws;

          assert.throws(runTask, new RegExp(throwMsg));
        } else {
          runTask();
        }
      });
    });
  });
});
