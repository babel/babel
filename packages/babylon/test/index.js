var getFixtures = require("babel-helper-fixtures").multiple;
var parse       = require("../lib").parse;
var _           = require("lodash");
var fs          = require("fs");

var ignore = [
  'comments',
  'core',
  'esprima',
  'experimental',
  'flow',
  'harmony',
  'jsx'
];
var onlyTitle = '1,2,3,4,5,6,7';

// var ignore = [];

var fixtures = getFixtures(__dirname + "/fixtures", ignore);

_.each(fixtures, function (suites, name) {
  _.each(suites, function (testSuite) {
    suite(name + "/" + testSuite.title, function () {
      _.each(testSuite.tests, function (task) {
        test(task.title, !task.disabled && function () {
          if (typeof onlyTitle !== 'undefined' && onlyTitle.split(',').indexOf(task.title) < 0) return;
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
    writeResultedAST(ast);
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

  if (!test.expect.code) {
    test.expect.loc += "on";
    return save(test, ast);
  }

  if (opts.throws) {
    throw new Error("Expected error message: " + opts.throws + ". But parsing succeeded.");
  } else {
    var mis = misMatch(JSON.parse(test.expect.code), ast);
    var misPosLoc = posLocMatch(test.actual.code, ast);
    if (mis) {
      //save(test, ast);
      throw new Error(mis);
    }
    if (misPosLoc) {
      throw new Error(misPosLoc);
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

function posLocMatch(input, ast) {
  var areDefined = function () {
    return Array.prototype.slice.call(arguments).reduce(function(status, arg) {
      if (typeof arg === 'undefined') status = false;
      return status;
    }, true);
  };
  return (function loop(obj) {
    var positions;

    if(!obj) return false;

    if (areDefined(obj.start, obj.end, obj.loc)) {
      positions = locToPos(input, obj.loc.start, obj.loc.end);
      if (obj.start !== positions.start) {
        return 'node.start (' + obj.start + ') mismatch node.loc.start' +
        ' (' + positions.start + ') in \n' + JSON.stringify(obj, null, 2).substr(0, 400);
      } else if (obj.end !== positions.end) {
        return 'node.end (' + obj.end + ') mismatch node.loc.end' +
        ' (' + positions.end + ') in \n' + JSON.stringify(obj, null, 2).substr(0, 400);
      }
    }

    if (Array.isArray(obj)) {
      return obj.reduce(function(status, child) {
        if (status !== false) return status;
        return loop(child);
      }, false);
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).reduce(function(status, key) {
        if (status !== false) return status;
        return loop(obj[key]);
      }, false);
    }

    return false;
  })(ast);
}

function locToPos(input, startLoc, endLoc) {
  var line = 0, linePos = 0, startPos, endPos, newLine = false;
  // debugger;
  for (var i=0; i<=input.length; i++) {
    if (input.charAt(i) === '\n') {
      newLine = true;
    }
    if (line === startLoc.line-1 && linePos === startLoc.column) {
      startPos = i;
    }
    if (line === endLoc.line-1 && linePos === endLoc.column) {
      endPos = i;
    }
    if (newLine) {
      newLine = false;
      linePos = 0;
      ++line;
    } else {
      ++linePos;  
    }
  }
  return { start: startPos, end: endPos };
};

function writeResultedAST(ast) {
  require("fs").writeFileSync(__dirname + '/result.json', JSON.stringify(ast, null, 2));
}
