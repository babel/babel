var assert = require("assert");
var transform = require("./lib/visit").transform;
var guessTabWidth = require("./lib/util").guessTabWidth;
var recast = require("recast");
var esprimaHarmony = require("esprima");

assert.ok(
  /harmony/.test(esprimaHarmony.version),
  "Bad esprima version: " + esprimaHarmony.version
);

function regenerate(source) {
  var options = {
    tabWidth: guessTabWidth(source),
    // Use the harmony branch of Esprima that installs with regenerator
    // instead of the master branch that recast provides.
    esprima: esprimaHarmony
  };
  var ast = recast.parse(source, options);
  return recast.print(transform(ast), options);
}

// To modify an AST directly, call require("regenerator").transform(ast).
regenerate.transform = transform;

// To transform a string of ES6 code, call require("regenerator")(source);
module.exports = regenerate;
