var traverse = require("./lib/babel/traversal");
var Module   = require("module");
var acorn    = require("acorn-babel");

var hasPatched = false;

function monkeypatch() {
  if (hasPatched) return;
  hasPatched = true;

  var mod = new Module(require.resolve("eslint"));

  // monkeypatch estraverse
  //var estraverse = mod.require("estraverse");

  // monkeypatch escope
  var escope = mod.require("escope");
  console.log(escope);
}

var tokTypes = acorn.tokTypes;

function toEsprimaToken(token) {
  var type = token.type;

  if (type === tokTypes.name) {
    token.type = "Identifier";
  } else if (type === tokTypes.semi || type === tokTypes.comma || type === tokTypes.parenL || type === tokTypes.parenR || type === tokTypes.braceL || type === tokTypes.braceR) {
    token.type = "Punctuator";
    token.value = type.type;
  }
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
  ast.tokens = tokens.map(function (token) {
    return toEsprimaToken(token) || token;
  });

  // add comments
  ast.comments = comments;

  // transform esprima and acorn divergent nodes

  return ast;
};
