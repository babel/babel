var assert = require("assert");
var async = require("async");
var babel = require("../lib/api/node");
var fs = require("fs");
var path = require("path");

// Test that plugins & presets are resolved relative to `filename`.
suite("addon resolution", function () {
  test("addon resolution", function (done) {
    var fixtures = {};
    var paths = {};

    paths.fixtures = path.join(
      __dirname,
      "fixtures",
      "resolution",
      "resolve-addons-relative-to-file"
    );

    async.each(
      ["actual", "expected"],
      function (key, mapDone) {
        paths[key] = path.join(paths.fixtures, key + ".js");
        fs.readFile(paths[key], { encoding: "utf8" }, function (err, data) {
          if (err) return mapDone(err);
          fixtures[key] = data.trim();
          mapDone();
        });
      },
      fixturesReady
    );

    function fixturesReady (err) {
      if (err) return done(err);

      var actual = babel.transform(fixtures.actual, {
        filename: paths.actual,
        plugins: ["addons/plugin"],
        presets: ["addons/preset"],
      }).code;

      assert.equal(actual, fixtures.expected);
      done();
    }
    // fixturesReady
  });
});
