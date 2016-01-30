var assert = require("assert");
var assign = require("lodash.assign");
var eslint = require("eslint");
var fs = require("fs");
var path = require("path");

var paths = {
  fixtures: path.join(__dirname, "fixtures", "rules"),
};

var encoding = "utf8";
var errorLevel = 2;

var baseEslintOpts = {
  parser: require.resolve(".."),
};

/**
 * Load a fixture and run eslint.linter.verify() on it.
 * Pass the return value to done().
 * @param object opts
 * @param function done
 */
function lint (opts, done) {
  readFixture(opts.fixture, function (err, src) {
    if (err) return done(err);
    done(null, eslint.linter.verify(src, opts.eslint));
  });
}

/**
 * Read a fixture file, passing the content to done().
 * @param string|array id
 * @param function done
 */
function readFixture (id, done) {
  if (Array.isArray(id)) id = path.join.apply(path, id);
  if (!path.extname(id)) id += ".js";
  fs.readFile(
    path.join(paths.fixtures, id),
    encoding,
    done
  );
}
// readFixture

describe("Rules:", function () {
  describe("`strict`", strictSuite);
});
// describe

function strictSuite () {
  var ruleId = "strict";

  describe("when set to 'never'", function () {
    var eslintOpts = assign({}, baseEslintOpts, {
      rules: {},
    });
    eslintOpts.rules[ruleId] = [errorLevel, "never"];

    ["global-with", "function-with"].forEach(function (fixture) {
      it(
        "should error on " + fixture.match(/^[^-]+/)[0] + " directive",
        function (done) {
          lint({
            fixture: ["strict", fixture],
            eslint: eslintOpts,
          }, function (err, report) {
            if (err) return done(err);
            assert(report[0].ruleId === ruleId);
            done();
          });
        }
      );
      // it
    });
  });
  // describe

  describe("when set to 'global'", function () {
    var eslintOpts = assign({}, baseEslintOpts, {
      rules: {}
    });
    eslintOpts.rules[ruleId] = [errorLevel, "global"];

    it("shouldn't error on single global directive", function (done) {
      lint({
        fixture: ["strict", "global-with"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        assert(!report.length);
        done();
      });
    });
    // it

    it("should error twice on global directive: no and function directive: yes", function (done) {
      lint({
        fixture: ["strict", "function-with"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        [0, 1].forEach(function (i) {
          assert(report[i].ruleId === ruleId);
        });
        done();
      });
    });
    // it

    it("should error on function directive", function (done) {
      lint({
        fixture: ["strict", "global-with-function-with"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        assert(report[0].ruleId === ruleId);

        // This is to make sure the test fails prior to adapting Babel AST
        // directive representation to ESLint format. Otherwise it reports an
        // error for missing global directive that masquerades as the expected
        // result of the previous assertion.
        assert(report[0].nodeType !== "Program");
        done();
      });
    });
    // it

    it("should error on no directive", function (done) {
      lint({
        fixture: ["strict", "none"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        assert(report[0].ruleId === ruleId);
        done();
      });
    });
    // it
  });
  // describe

  describe("when set to 'function'", function () {
    var eslintOpts = assign({}, baseEslintOpts, {
      rules: {}
    });
    eslintOpts.rules[ruleId] = [errorLevel, "function"];

    it("shouldn't error on single function directive", function (done) {
      lint({
        fixture: ["strict", "function-with"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        assert(!report.length);
        done();
      });
    });
    // it

    it("should error twice on function directive: no and global directive: yes", function (done) {
      lint({
        fixture: ["strict", "global-with-function-without"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        [0, 1].forEach(function (i) {
          assert(report[i].ruleId === ruleId);
        });
        done();
      });
    });
    // it

    it("should error on only global directive", function (done) {
      lint({
        fixture: ["strict", "global-with"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        assert(report[0].ruleId === ruleId);
        done();
      });
    });
    // it

    it("should error on extraneous global directive", function (done) {
      lint({
        fixture: ["strict", "global-with-function-with"],
        eslint: eslintOpts,
      }, function (err, report) {
        if (err) return done(err);
        assert(report[0].ruleId === ruleId);
        assert(report[0].nodeType.indexOf("Function") === -1);
        done();
      });
    });
    // it
  });
  // describe
}
