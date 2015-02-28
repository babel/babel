import isNumber from "lodash/lang/isNumber";
import * as util from  "../../../util";
import t from "../../../types";

export var check = t.isRestElement;

var memberExpressionOptimisationVisitor = {
  enter(node, parent, scope, state) {
    // check if this scope has a local binding that will shadow the rest parameter
    if (t.isScope(node, parent) && !scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      return this.skip();
    }

    // skip over functions as whatever `arguments` we reference inside will refer
    // to the wrong function
    if (t.isFunctionDeclaration(node) || t.isFunctionExpression(node)) {
      state.noOptimise = true;
      scope.traverse(node, memberExpressionOptimisationVisitor, state);
      state.noOptimise = false;
      return this.skip();
    }

    // is this a referenced identifier and is it referencing the rest parameter?
    if (!t.isReferencedIdentifier(node, parent, { name: state.name })) return;

    if (!state.noOptimise && t.isMemberExpression(parent) && parent.computed) {
      // if we know that this member expression is referencing a number then we can safely
      // optimise it
      var prop = parent.property;
      if (isNumber(prop.value) || t.isUnaryExpression(prop) || t.isBinaryExpression(prop)) {
        state.candidates.push(this);
        state.canOptimise = true;
        return;
      }
    }

    state.canOptimise = false;
    this.stop();
  }
};

function optimizeMemberExpression(parent, offset) {
  var newExpr;
  var prop = parent.property;

  if (t.isLiteral(prop)) {
    prop.value += offset;
    prop.raw = String(prop.value);
  } else { // // UnaryExpression, BinaryExpression
    newExpr = t.binaryExpression("+", prop, t.literal(offset));
    parent.property = newExpr;
  }
}

var hasRest = function (node) {
  return t.isRestElement(node.params[node.params.length - 1]);
};

exports.Function = function (node, parent, scope) {
  if (!hasRest(node)) return;

  var rest = node.params.pop().argument;

  var argsId = t.identifier("arguments");

  // otherwise `arguments` will be remapped in arrow functions
  argsId._ignoreAliasFunctions = true;

  // support patterns
  if (t.isPattern(rest)) {
    var pattern = rest;
    rest = scope.generateUidIdentifier("ref");
    var declar = t.variableDeclaration("var", pattern.elements.map(function (elem, index) {
      var accessExpr = t.memberExpression(rest, t.literal(index), true);
      return t.variableDeclarator(elem, accessExpr);
    }));
    node.body.body.unshift(declar);
  }

  // check if rest is used in member expressions and optimise for those cases

  var state = {
    outerBinding: scope.getBindingIdentifier(rest.name),
    canOptimise:  false,
    candidates:   [],
    method:       node,
    name:         rest.name,
    argsId:       argsId
  };

  scope.traverse(node, memberExpressionOptimisationVisitor, state);

  // we only have shorthands and there's no other references
  if (state.canOptimise) {
    for (var i = 0; i < state.candidates.length; i++) {
      var candidate = state.candidates[i];
      optimizeMemberExpression(candidate.node, candidate.parent, node.params.length);
    }
    return;
  }

  //

  var start = t.literal(node.params.length);
  var key = scope.generateUidIdentifier("key");
  var len = scope.generateUidIdentifier("len");

  var arrKey = key;
  var arrLen = len;
  if (node.params.length) {
    // this method has additional params, so we need to subtract
    // the index of the current argument position from the
    // position in the array that we want to populate
    arrKey = t.binaryExpression("-", key, start);

    // we need to work out the size of the array that we're
    // going to store all the rest parameters
    //
    // we need to add a check to avoid constructing the array
    // with <0 if there are less arguments than params as it'll
    // cause an error
    arrLen = t.conditionalExpression(
      t.binaryExpression(">", len, start),
      t.binaryExpression("-", len, start),
      t.literal(0)
    );
  }

  scope.assignTypeGeneric(rest.name, "Array");

  var loop = util.template("rest", {
    ARGUMENTS: argsId,
    ARRAY_KEY: arrKey,
    ARRAY_LEN: arrLen,
    START: start,
    ARRAY: rest,
    KEY: key,
    LEN: len,
  });
  loop._blockHoist = node.params.length + 1;
  node.body.body.unshift(loop);
};
