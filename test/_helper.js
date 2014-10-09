var fs = require("fs");
var _  = require("lodash");

var fixturesDir = __dirname + "/fixtures";

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
    suite(testSuite.title, function () {
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

      var actualLoc = taskDir + "/actual.js";
      var expectLoc = taskDir + "/expected.js";

      var taskOptsLoc = taskDir + "/options.json";
      var taskOpts = _.merge({ filename: actualLoc }, _.cloneDeep(suite.options));
      if (fs.existsSync(taskOptsLoc)) _.merge(taskOpts, require(taskOptsLoc));


      var test = {
        title: humanise(taskName),
        options: taskOpts,
        actual: {
          code: readFile(actualLoc),
          filename: actualLoc,
        },
        expect: {
          code: readFile(expectLoc),
          filename: expectLoc
        }
      };

      suite.tests.push(test);

      var sourceMapLoc = taskDir + "/source-map.json";
      if (fs.existsSync(sourceMapLoc)) {
        test.options.sourceMap = true;
        test.sourceMap = require(sourceMapLoc);
      }
    });
  });

  return suites;
};
