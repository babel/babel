var fs = require("fs");
var _  = require("lodash");

var humanise = function (val) {
  return val.replace(/-/g, " ");
};

var readFile = exports.readFile = function (filename) {
  if (fs.existsSync(filename)) {
    var file = fs.readFileSync(filename, "utf8").trim();
    file = file.replace(/\r\n/g, "\n");
    return file;
  } else {
    return "";
  }
};

exports.get = function (entryName) {
  if (exports.cache[entryName]) return exports.cache[entryName];

  var suites = [];
  var entryLoc = __dirname + "/fixtures/" + entryName;

  _.each(fs.readdirSync(entryLoc), function (suiteName) {
    if (suiteName[0] === ".") return;

    var suite = {
      options: {},
      tests: [],
      title: humanise(suiteName),
      filename: entryLoc + "/" + suiteName
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
          loc: actualLoc,
          code: readFile(actualLoc),
          filename: actualLocAlias,
        },
        expect: {
          loc: expectLoc,
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

  return exports.cache[entryName] = suites;
};

try {
  exports.cache = require("../tests.json");
} catch (err) {
  if (err.code !== "MODULE_NOT_FOUND") throw err;

  var cache = exports.cache = {};
  cache.transformation = exports.get("transformation");
  cache.generation     = exports.get("generation");
}
