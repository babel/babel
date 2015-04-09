var acornToEsprima = require("./acorn-to-esprima");
var traverse       = require("babel-core").traverse;
var assign         = require("lodash.assign");
var Module         = require("module");
var acorn          = require("babel-core").acorn;
var path           = require("path");
var t              = require("babel-core").types;

var hasPatched = false;

function createModule(filename) {
  var mod = new Module(filename);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  return mod;
}

function monkeypatch() {
  if (hasPatched) return;
  hasPatched = true;

  var eslintLoc;
  try {
    eslintLoc = Module._resolveFilename("eslint", module.parent);
  } catch (err) {
    throw new ReferenceError("couldn't resolve eslint");
  }

  // get modules relative to what eslint will load
  var eslintMod = createModule(eslintLoc);
  var escopeLoc = Module._resolveFilename("escope", eslintMod);
  var escopeMod = createModule(escopeLoc);

  // monkeypatch estraverse
  var estraverse = escopeMod.require("estraverse");
  assign(estraverse.VisitorKeys, t.VISITOR_KEYS);

  // monkeypatch escope
  var escope  = require(escopeLoc);
  var analyze = escope.analyze;
  escope.analyze = function (ast, opts) {
    opts.ecmaVersion = 6;
    opts.sourceType = "module";
    // Don't visit TypeAlias when analyzing scope, but retain them for other
    // eslint rules.
    var TypeAliasKeys = estraverse.VisitorKeys.TypeAlias;
    estraverse.VisitorKeys.TypeAlias = [];
    var results = analyze.call(this, ast, opts);
    estraverse.VisitorKeys.TypeAlias = TypeAliasKeys;
    return results;
  };
}

exports.parse = function (code) {
  try {
    monkeypatch();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }

  var opts = {
    ecmaVersion: 7,
    locations: true,
    ranges: true,
    sourceType: "module",
    plugins: {
      jsx: true,
      flow: true
    },
    features: {
      "es7.asyncFunctions": true,
      "es7.classProperties": true,
      "es7.comprehensions": true,
      "es7.decorators": true,
      "es7.doExpressions": true,
      "es7.exponentiationOperator": true,
      "es7.exportExtensions": true,
      "es7.objectRestSpread": true
    }
  };

  var comments = opts.onComment = [];
  var tokens = opts.onToken = [];

  var ast;
  try {
    ast = acorn.parse(code, opts);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;

      // remove trailing "(LINE:COLUMN)" acorn message and add in esprima syntax error message start
      err.message = "Line X: " + err.message.replace(/ \((\d+):(\d+)\)$/, "");
    }

    throw err;
  }

  // remove EOF token, eslint doesn't use this for anything and it interferes with some rules
  // see https://github.com/babel/babel-eslint/issues/2 for more info
  // todo: find a more elegant way to do this
  tokens.pop();

  // convert tokens
  ast.tokens = tokens.map(acornToEsprima.toToken);

  // add comments
  ast.comments = comments;

  // transform esprima and acorn divergent nodes
  acornToEsprima.toAST(ast);

  return ast;
};
