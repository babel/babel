var assert = require("assert");
var recast = require("recast");
var hoist = require("./hoist").hoist;
var Emitter = require("./emit").Emitter;
var b = recast.builders;

exports.transform = function(ast) {
  var visitor = new GenFunVisitor;
  return visitor.visit(ast);
};

var GenFunVisitor = recast.Visitor.extend({
  visitFunctionExpression: function(fexp) {
    return this._visitGenFun(fexp);
  },

  visitFunctionDeclaration: function(fdec) {
    return this._visitGenFun(fdec);
  },

  _visitGenFun: function(gfun) {
    this.genericVisit(gfun);

    if (!gfun.generator) {
      return;
    }

    gfun.generator = false;

    // TODO Ensure that the context is named uniquely.
    var contextId = b.identifier("context");

    if (gfun.expression) {
      // Transform expression lambdas into normal functions.
      gfun.expression = false;
      gfun.body = b.blockStatement([
        b.returnStatement(gfun.body)
      ]);
    }

    var vars = hoist(gfun);

    var emitter = new Emitter(contextId);
    emitter.explode(gfun.body);

    // TODO Need to do something about FunctionDeclarations.
    // They don't need to be exploded, and it's probably safer to move
    // them out of the inner function like the hoisted variables.
    // How about this:
    // 1. hoist the function names as variables, and then
    // 2. turn each declaration site into an assignment to the name.

    var outerBody = [];

    if (vars && vars.declarations.length > 0) {
      outerBody.push(vars);
    }

    outerBody.push(b.returnStatement(
      b.callExpression(b.identifier("wrapGenerator"), [
        emitter.getContextFunction(),
        b.thisExpression()
      ])
    ));

    gfun.body = b.blockStatement(outerBody);
  }
});
