var acornToEsprima = require("./acorn-to-esprima");
var traverse       = require("babel").traverse;
var extend         = require("lodash/object/extend");
var Module         = require("module");
var acorn          = require("babel").acorn;
var path           = require("path");
var t              = require("babel").types;

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
    eslintLoc = require.resolve("eslint");
  } catch (err) {
    throw new ReferenceError("couldn't resolve eslint");
  }

  // get modules relative to what eslint will load
  var eslintMod = createModule(eslintLoc);
  var escopeLoc = Module._resolveFilename("escope", eslintMod);
  var escopeMod = createModule(escopeLoc);

  // monkeypatch estraverse
  var estraverse = escopeMod.require("estraverse");
  extend(estraverse.VisitorKeys, t.VISITOR_KEYS);

  // monkeypatch escope
  var escope  = require(escopeLoc);
  var analyze = escope.analyze;
  escope.analyze = function (ast, opts) {
    opts.ecmaVersion = 6;
    opts.sourceType = "module";
    return analyze.call(this, ast, opts)
  };
}

exports.parse = function (code) {
  try {
    monkeypatch();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }

  var opts = {};
  opts.ecmaVersion = 7;
  opts.playground = true;
  opts.locations = true;
  opts.ranges = true;

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

  // convert tokens
  ast.tokens = tokens.map(acornToEsprima.toToken);

  // add comments
  ast.comments = comments;

  // transform esprima and acorn divergent nodes
  acornToEsprima.toAST(ast);

  return ast;
};
