const assert = require("assert");
const async = require("async");
const babel = require("../lib/index");
const fs = require("fs");
const path = require("path");

// Test that plugins & presets are resolved relative to `filename`.
describe("addon resolution", function () {
  it("addon resolution", function (done) {
    const fixtures = {};
    const paths = {};

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

      const actual = babel.transform(fixtures.actual, {
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
