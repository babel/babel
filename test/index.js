var transform = require("../lib/6to5/transform");
var assert    = require("assert");
var fs        = require("fs");
var _         = require("lodash");

var humanise = function (val) {
  return val.replace(/-/g, " ");
};

var fixturesDir = __dirname + "/fixtures";

_.each(fs.readdirSync(fixturesDir), function (suiteName) {
  var suiteDir = fixturesDir + "/" + suiteName;

  var suiteOptsLoc = suiteDir + "/options.json";
  var suiteOpts = {};
  if (fs.existsSync(suiteOptsLoc)) suiteOpts = require(suiteOptsLoc);

  suite(humanise(suiteName), function () {
    _.each(fs.readdirSync(suiteDir), function (taskName) {
      var taskDir = suiteDir + "/" + taskName;
      if (fs.statSync(taskDir).isFile()) return;

      test(humanise(taskName), function () {
        var actualLoc = taskDir + "/actual.js";

        var actual = fs.readFileSync(actualLoc, "utf8");
        var expect = fs.readFileSync(taskDir + "/expected.js", "utf8");

        var taskOptsLoc = taskDir + "/options.json";
        var taskOpts = _.merge({ filename: actualLoc }, _.cloneDeep(suiteOpts));
        if (fs.existsSync(taskOptsLoc)) _.merge(taskOpts, require(taskOptsLoc));

        transform.test(actual, expect, taskOpts);
      });
    });
  });
});
