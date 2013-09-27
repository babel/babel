var assert = require("assert");
var recast = require("recast");
var b = recast.builders;
var n = recast.namedTypes;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function(fun) {
  n.Function.assert(fun);
  var hoister = new DeclarationHoister;
  hoister.visit(fun.body);
  return hoister.getHoistedVarDecl(fun);
};

var DeclarationHoister = recast.Visitor.extend({
  init: function() {
    this.vars = {};
  },

  getHoistedVarDecl: function(fun) {
    var paramNames = {};
    fun.params.forEach(function(param) {
      if (n.Identifier.check(param)) {
        paramNames[param.name] = param;
      } else {
        // Variables declared by destructuring parameter patterns
        // will be harmlessly re-declared.
      }
    });

    var vars = this.vars;
    var declarations = [];

    Object.keys(vars).forEach(function(name) {
      if (!paramNames.hasOwnProperty(name))
        declarations.push(b.variableDeclarator(vars[name], null));
    });

    if (declarations.length === 0)
      return null; // Be sure to handle this case!

    return b.variableDeclaration("var", declarations);
  },

  visitVariableDeclaration: function(vdec) {
    var expr = this._varDeclToExpr(vdec, false);
    if (expr === null) {
      this.remove();
    } else {
      return b.expressionStatement(expr);
    }
  },

  visitForStatement: function(stmt) {
    if (n.VariableDeclaration.check(stmt.init))
      stmt.init = this._varDeclToExpr(stmt.init, false);
    this.genericVisit(stmt);
  },

  visitForInStatement: function(stmt) {
    if (n.VariableDeclaration.check(stmt.left))
      stmt.left = this._varDeclToExpr(stmt.left, true);
    this.genericVisit(stmt);
  },

  _varDeclToExpr: function(vdec, includeIdentifiers) {
    n.VariableDeclaration.assert(vdec);

    var vars = this.vars;
    var exprs = [];

    vdec.declarations.forEach(function(dec) {
      vars[dec.id.name] = dec.id;

      if (dec.init) {
        exprs.push(b.assignmentExpression(
          "=", dec.id, dec.init
        ));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });

    if (exprs.length === 0)
      return null;

    if (exprs.length === 1)
      return exprs[0];

    return b.sequenceExpression(exprs);
  },

  visitFunctionDeclaration: function(fdec) {
    // Deliberately not calling this.genericVisit() because we don't
    // want to hoist variables out of inner functions.

    this.vars[fdec.id.name] = fdec.id;

    return b.expressionStatement(
      b.assignmentExpression(
        "=",
        fdec.id,
        b.functionExpression(
          fdec.id,
          fdec.params,
          fdec.body,
          fdec.generator,
          fdec.expression
        )
      )
    );
  },

  // Do not descend into nested function expressions.
  visitFunctionExpression: function() {}
});
