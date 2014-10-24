var fs = require("fs");
var _  = require("lodash");

var fixturesDir = __dirname + "/fixtures/transformation";

var humanise = function (val) {
  return val.replace(/-/g, " ");
};

var readFile = function (filename) {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename, "utf8");
  } else {
    return "";
  }
};

exports.run = function (suites, transform, assert) {
  _.each(suites, function (testSuite) {
    suite("transformation/" + testSuite.title, function () {
      _.each(testSuite.tests, function (task) {
        test(task.title, function () {
          var run = function () {
            transform.test(task, assert);
          };

          var throwMsg = task.options.throws;
          if (throwMsg) {
            // internal api doesn't have this option but it's best not to pollute
            // the options object with useless options
            delete task.options.throws;

            assert.throws(run, new RegExp(throwMsg));
          } else {
            run();
          }
        });
      });
    });
  });
};

exports.getTests = function () {
  var suites = [];

  _.each(fs.readdirSync(fixturesDir), function (suiteName) {
    if (suiteName[0] === ".") return;

    var suite = {
      options: {},
      tests: [],
      title: humanise(suiteName),
      filename: fixturesDir + "/" + suiteName
    };
    suites.push(suite);

    var suiteOptsLoc = suite.filename + "/options.json";
    if (fs.existsSync(suiteOptsLoc)) suite.options = require(suiteOptsLoc);

    _.each(fs.readdirSync(suite.filename), function (taskName) {
      if (taskName[0] === ".") return;

      var taskDir = suite.filename + "/" + taskName;
      if (fs.statSync(taskDir).isFile()) return;

      var actualLocAlias = suiteName + "/" + taskName + "/actual.js";
      var expectLocAlias = suiteName + "/" + taskName + "/expected.js";
      var execLocAlias   = suiteName + "/" + taskName + "/exec.js";

      var actualLoc = taskDir + "/actual.js";
      var expectLoc = taskDir + "/expected.js";
      var execLoc   = taskDir + "/exec.js";

      var taskOpts = _.merge({
        filename: actualLocAlias,
        sourceMapName: expectLocAlias
      }, _.cloneDeep(suite.options));

      var taskOptsLoc = taskDir + "/options.json";
      if (fs.existsSync(taskOptsLoc)) _.merge(taskOpts, require(taskOptsLoc));

      var test = {
        title: humanise(taskName),
        options: taskOpts,
        exec: {
          code: readFile(execLoc),
          filename: execLocAlias,
        },
        actual: {
          code: readFile(actualLoc),
          filename: actualLocAlias,
        },
        expect: {
          code: readFile(expectLoc),
          filename: expectLocAlias
        }
      };

      suite.tests.push(test);

      var sourceMappingsLoc = taskDir + "/source-mappings.json";
      if (fs.existsSync(sourceMappingsLoc)) {
        test.options.sourceMap = true;
        test.sourceMappings = require(sourceMappingsLoc);
      }

      var sourceMap = taskDir + "/source-map.json";
      if (fs.existsSync(sourceMap)) {
        test.options.sourceMap = true;
        test.sourceMap = require(sourceMap);
      }
    });
  });

  return suites;
};
