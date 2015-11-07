require("../lib/api/node");

var buildExernalHelpers = require("../lib/tools/build-external-helpers");
var getFixtures         = require("mocha-fixtures");
var transform           = require("../lib/api/node").transform;
var sourceMap           = require("source-map");
var codeFrame           = require("babel-code-frame");
var register            = require("../register");
var Module              = require("module");
var assert              = require("assert");
var chai                = require("chai");
var path                = require("path");
var util                = require("../lib/util");
var _                   = require("lodash");

exports.fixtures = getFixtures(__dirname + "/fixtures", function () {
  return require("../test-fixtures.json");
});

require("babel-polyfill");

register({
  ignore: [
    path.resolve(__dirname + "/../.."),
    "node_modules"
  ]
});

eval(buildExernalHelpers());

global.assertNoOwnProperties = function (obj) {
  assert.equal(Object.getOwnPropertyNames(obj).length, 0);
};

global.assertHasOwnProperty = function () {

};

global.assertLacksOwnProperty = function () {

};

global.assertArrayEquals = assert.deepEqual;
global.assert = chai.assert;
global.chai = chai;

// Different Traceur generator message
chai.assert._throw = chai.assert.throw;
chai.assert.throw = function (fn, msg) {
  if (msg === '"throw" on executing generator' ||
      msg === '"next" on executing generator') {
    msg = "Generator is already running";
  } else if (msg === "Sent value to newborn generator") {
    msg = /^attempt to send (.*?) to newborn generator$/;
  } else if (msg === "super prototype must be an Object or null") {
    msg = "Object prototype may only be an Object or null";
  }

  return chai.assert._throw(fn, msg);
};

function wrapPackagesArray(type, names) {
  return (names || []).map(function (val) {
    if (typeof val === "string") val = [val];
    val[0] = __dirname + "/../../babel-" + type + "-" + val[0];
    return val;
  });
}

function run(task, done) {
  var actual = task.actual;
  var expect = task.expect;
  var exec   = task.exec;
  var opts   = task.options;

  function getOpts(self) {
    var newOpts = _.merge({
      suppressDeprecationMessages: true,
      filename: self.loc,
      sourceMap: !!(task.sourceMappings || task.sourceMap)
    }, opts);

    newOpts.plugins = wrapPackagesArray("plugin", newOpts.plugins);
    newOpts.presets = wrapPackagesArray("preset", newOpts.presets).map(function (val) {
      return val[0];
    });

    return newOpts;
  }

  var execCode = exec.code;
  var result;

  if (execCode) {
    var execOpts = getOpts(exec);
    result = transform(execCode, execOpts);
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

      var fn = new Function("require", "assert", "exports", "done", "transform", execCode);
      fn.call(global, fakeRequire, chai.assert, {}, done, transform);
    } catch (err) {
      err.message = exec.loc + ": " + err.message;
      err.message += codeFrame(execCode);
      throw err;
    }
  }

  var actualCode = actual.code;
  var expectCode = expect.code;
  if (!execCode || actualCode) {
    result     = transform(actualCode, getOpts(actual));
    actualCode = result.code.trim();

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
      var actual = mapping.original;

      var expect = consumer.originalPositionFor(mapping.generated);
      chai.expect({ line: expect.line, column: expect.column }).to.deep.equal(actual);
    });
  }
}

exports.run = function (name, suiteOpts, taskOpts, dynamicOpts) {
  suiteOpts = suiteOpts || {};
  taskOpts = taskOpts || {};

  _.each(exports.fixtures[name], function (testSuite) {
    if (_.contains(suiteOpts.ignoreSuites, testSuite.title)) return;

    suite(name + "/" + testSuite.title, function () {
      setup(function () {
        require("../register")(taskOpts);
      });

      _.each(testSuite.tests, function (task) {
        if (_.contains(suiteOpts.ignoreTasks, task.title) || _.contains(suiteOpts.ignoreTasks, testSuite.title + "/" + task.title)) return;

        var runTest = function (done) {
          var runTask = function () {
            run(task, done);
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
