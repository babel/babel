var tests = [];

function test(code, ast, options) {
  tests.push({code: code, ast: ast, options: options});
}
function testFail(code, message, options) {
  tests.push({code: code, error: message, options: options});
}

function runTests(callback) {
  var opts = {linePositions: true};
  for (var i = 0; i < tests.length; ++i) {
    var test = tests[i];
    try {
      var ast = acorn.parse(test.code, test.options || opts);
      if (test.error) callback("fail", test.code,
                               "Expected error message: " + test.error + "\nBut parsing succeeded.");
      else {
        var mis = misMatch(test.ast, ast);
        if (!mis) callback("ok", test.code);
        else callback("fail", test.code, mis);
      }
    } catch(e) {
      if (test.error && e instanceof SyntaxError) {
        if (e.message == test.error) callback("ok", test.code);
        else callback("fail", test.code,
                      "Expected error message: " + test.error + "\nGot error message: " + e.message);
      } else {
        callback("error", test.code, e.message || e.toString());
      }
    }
  }
}

function ppJSON(v) { return JSON.stringify(v, null, 2); }
function addPath(str, pt) {
  if (str.charAt(str.length-1) == ")")
    return str.slice(0, str.length-1) + "/" + pt + ")";
  return str + " (" + pt + ")";
}

function misMatch(exp, act) {
  if (!exp || !act || (typeof exp != "object") || (typeof act != "object")) {
    if (exp !== act) return ppJSON(exp) + " !== " + ppJSON(act);
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
