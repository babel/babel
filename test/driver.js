(function(exports) {
  var tests = [];
  var acorn = typeof require == "undefined" ? window.acorn : require("../acorn.js");

  exports.test = function(code, ast, options, comments) {
    tests.push({code: code, ast: ast, options: options, comments: comments});
  };
  exports.testFail = function(code, message, options) {
    tests.push({code: code, error: message, options: options});
  };
  exports.testAssert = function(code, assert, options) {
    tests.push({code: code, assert: assert, options: options});
  };

  exports.runTests = function(callback) {
    var comments;

    function onComment(block, text, start, end, startLoc, endLoc) {
        comments.push({
          block: block,
          text: text,
          start: start,
          end: end,
          startLoc: { line: startLoc.line, column: startLoc.column },
          endLoc: { line: endLoc.line, column: endLoc.column }
        });
    }

    var opts = {locations: true, onComment: onComment};

    for (var i = 0; i < tests.length; ++i) {
      var test = tests[i];
      try {
        comments = [];
        if (test.options && !test.options.onComment) test.options.onComment = onComment;
        var ast = acorn.parse(test.code, test.options || opts);
        if (test.error) callback("fail", test.code,
                                 "Expected error message: " + test.error + "\nBut parsing succeeded.");
        else if (test.assert) {
          var error = test.assert(ast);
          if (error) callback("fail", test.code,
                                 "\n  Assertion failed:\n " + error);
          else callback("ok", test.code);
        } else {
          var mis = misMatch(test.ast, ast);
          if (mis) callback("fail", test.code, mis);
          if (test.comments) mis = misMatch(test.comments, comments);
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
  };

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

  function mangle(ast) {
    if (typeof ast != "object" || !ast) return;
    if (ast.slice) {
      for (var i = 0; i < ast.length; ++i) mangle(ast[i]);
    } else {
      var loc = ast.start && ast.end && {start: ast.start, end: ast.end};
      if (loc) { delete ast.start; delete ast.end; }
      for (var name in ast) if (ast.hasOwnProperty(name)) mangle(ast[name]);
      if (loc) ast.loc = loc;
    }
  }

  exports.printTests = function() {
    var out = "";
    for (var i = 0; i < tests.length; ++i) {
      if (tests[i].error) continue;
      mangle(tests[i].ast);
      out += "test(" + JSON.stringify(tests[i].code) + ", " + JSON.stringify(tests[i].ast, null, 2) + ");\n\n";
    }
    document.body.innerHTML = "";
    document.body.appendChild(document.createElement("pre")).appendChild(document.createTextNode(out));
  };
})(typeof exports == "undefined" ? window : exports);
