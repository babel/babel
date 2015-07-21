var parse = require("../lib").parse;

exports.test = function(code, ast, options) {
  buildTest({code: code, ast: ast, options: options});
};

exports.testFail = function(code, message, options) {
  buildTest({code: code, error: message, options: options});
};

exports.testAssert = function(code, assert, options) {
  buildTest({code: code, assert: assert, options: options});
};

function buildTest(config) {
  test(config.code, function () {
    return runTest(config);
  });
}

function runTest(test) {
  if (test.filter && !test.filter(test)) return;
  var testOpts = test.options || {locations: true};
  var expected = {};
  if (expected.onComment = testOpts.onComment)
    testOpts.onComment = []
  if (expected.onToken = testOpts.onToken)
    testOpts.onToken = [];

  try {
    var ast = parse(test.code, testOpts).program;
  } catch (err) {
    if (test.error) {
      if (err.message === test.error) {
        return;
      } else {
        err.message = "Expected error message: " + test.error + ". Got error message: " + err.message;
        throw err;
      }
    }

    throw err;
  }

  if (test.error) {
    throw new Error("Expected error message: " + test.error + ". But parsing succeeded.");
  } else if (test.assert) {
    var error = test.assert(ast);
    if (error) throw new Error("Assertion failed: " + error);
  } else {
    var mis = misMatch(test.ast, ast);
    for (var name in expected) {
      if (mis) break;
      if (expected[name]) {
        mis = misMatch(expected[name], testOpts[name]);
        testOpts[name] = expected[name];
      }
    }
    if (mis) throw new Error(mis);
  }
};

function ppJSON(v) { return v instanceof RegExp ? v.toString() : JSON.stringify(v, null, 2); }
function addPath(str, pt) {
  if (str.charAt(str.length-1) == ")")
    return str.slice(0, str.length-1) + "/" + pt + ")";
  return str + " (" + pt + ")";
}

var misMatch = exports.misMatch = function(exp, act) {
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
};
