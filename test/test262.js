if (process.env.SIMPLE_6TO5_TESTS) return;

require("./_helper").assertVendor("test262");

var transform = require("../lib/6to5/transformation");
var readdir   = require("fs-readdir-recursive");
var path      = require("path");
var fs        = require("fs");
var _         = require("lodash");

var test262Loc = __dirname + "/../vendor/test262";

var read = function (loc) {
  return readdir(loc).map(function (filename) {
    return path.join(loc, filename);
  });
};

var exec = function (loc) {
  try {
    var file = fs.readFileSync(loc, "utf8");

    // this normalizes syntax and early runtime reference errors since they're
    // both thrown as SyntaxErrors in acorn
    // SyntaxError: var null;
    // ReferenceError: 1++; (runtime)
    var lazyError = /negative: (\S+)/.test(file);

    var compiled = transform(file, {
      filename: loc,
      blacklist: ["useStrict"]
    });

    global.eval(compiled);
  } catch (err) {
    if (err && lazyError && err instanceof SyntaxError) {
      return;
    } else {
      throw err;
    }
  }
};

// harness
var harness = read(test262Loc + "/harness");
_.each(harness, exec);

// tests!
var tests = read(test262Loc + "/test");
_.each(tests, function (loc) {
  var alias = path.relative(test262Loc + "/test", loc);
  alias = alias.replace(/\.([^\.]+)$/g, "");
  test(alias, function () {
    this.timeout(0);
    exec(loc);
  });
});
