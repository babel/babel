var acornToEsprima = require("./lib/babel/helpers/acorn-to-esprima");
var traverse       = require("./lib/babel/traversal");
var extend         = require("lodash/object/extend");
var Module         = require("module");
var acorn          = require("acorn-babel");
var t              = require("./lib/babel/types");

var hasPatched = false;

function monkeypatch() {
  if (hasPatched) return;
  hasPatched = true;

  // monkeypatch estraverse
  var estraverse = require("estraverse");
  extend(estraverse.VisitorKeys, t.VISITOR_KEYS);

  // monkeypatch escope
  var escope = require("eslint/node_modules/escope");
  var analyze = escope.analyze;
  escope.analyze = function (ast, opts) {
    opts.sourceType = 'module';
    opts.ecmaVersion = 6;
    return analyze.call(this, ast, opts)
  };
}

exports.parse = function (code) {
  monkeypatch();

  var opts = {};
  opts.ecmaVersion = 7;
  opts.locations = true;
  opts.playground = true;
  opts.ranges = true;

  var comments = opts.onComment = [];
  var tokens = opts.onToken = [];

  var ast = acorn.parse(code, opts);

  // convert tokens
  ast.tokens = tokens.map(acornToEsprima.toEsprimaToken);

  // add comments
  ast.comments = comments;

  // transform esprima and acorn divergent nodes
  acornToEsprima.toEsprimaAST(ast);

  return ast;
};
