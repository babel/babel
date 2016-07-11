var getFixtures = require("babel-helper-fixtures").multiple;
var parse       = require("../lib").parse;
var test        = require("ava");
var _           = require("lodash");

var fixtures = getFixtures(__dirname + "/fixtures");

_.each(fixtures, function (suites, name) {
  _.each(suites, function (testSuite) {
    _.each(testSuite.tests, function (task) {
      test(name + "/" + testSuite.title + "/" + task.title, !task.disabled && function () {
        try {
          return runTest(task);
        } catch (err) {
          err.message = task.actual.loc + ": " + err.message;
          throw err;
        }
      });
    });
  });
});

function save(test, ast) {
  delete ast.tokens;
  if (!ast.comments.length) delete ast.comments;
  require("fs").writeFileSync(test.expect.loc, JSON.stringify(ast, null, "  "));
}

function runTest(test) {
  var opts = test.options;
  opts.locations = true;
  opts.ranges = true;

  try {
    var ast = parse(test.actual.code, opts);
  } catch (err) {
    if (opts.throws) {
      if (err.message === opts.throws) {
        return;
      } else {
        err.message = "Expected error message: " + opts.throws + ". Got error message: " + err.message;
        throw err;
      }
    }

    throw err;
  }

  if (!test.expect.code && !opts.throws) {
    test.expect.loc += "on";
    return save(test, ast);
  }

  if (opts.throws) {
    throw new Error("Expected error message: " + opts.throws + ". But parsing succeeded.");
  } else {
    var mis = misMatch(JSON.parse(test.expect.code), ast);
    if (mis) {
      //save(test, ast);
      throw new Error(mis);
    }
  }
}

function ppJSON(v) {
  return v instanceof RegExp ? v.toString() : JSON.stringify(v, null, 2);
}

function addPath(str, pt) {
  if (str.charAt(str.length - 1) == ")") {
    return str.slice(0, str.length - 1) + "/" + pt + ")";
  } else {
    return str + " (" + pt + ")";
  }
}

function misMatch(exp, act) {
  if (!exp || !act || (typeof exp != "object") || (typeof act != "object")) {
    if (exp !== act && typeof exp != "function")
      return ppJSON(exp) + " !== " + ppJSON(act);
  } else if (exp instanceof RegExp || act instanceof RegExp) {
    var left = ppJSON(exp), right = ppJSON(act);
    if (left !== right) return left + " !== " + right;
  } else if (exp.splice) {
    if (!act.slice) return ppJSON(exp) + " != " + ppJSON(act);
    if (act.length != exp.length) return "array length mismatch " + exp.length + " != " + act.length;
    for (var i = 0; i < act.length; ++i) {
      var mis = misMatch(exp[i], act[i]);
      if (mis) return addPath(mis, i);
    }
  } else {
    for (var prop in exp) {
      var mis = misMatch(exp[prop], act[prop]);
      if (mis) return addPath(mis, prop);
    }
  }
}
