import * as util from  "../../../util";
import * as t from "../../../types";

var memberExpressionOptimisationVisitor = {
  Scope(node, parent, scope, state) {
    // check if this scope has a local binding that will shadow the rest parameter
    if (!scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      this.skip();
    }
  },

  Function(node, parent, scope, state) {
    // skip over functions as whatever `arguments` we reference inside will refer
    // to the wrong function
    state.noOptimise = true;
    this.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = false;
    this.skip();
  },

  ReferencedIdentifier(node, parent, scope, state) {
    // we can't guarantee the purity of arguments
    if (node.name === "arguments") {
      state.deopted = true;
    }

    // is this a referenced identifier and is it referencing the rest parameter?
    if (node.name !== state.name) return;

    if (!state.noOptimise) {
      if (this.parentPath.isMemberExpression({ computed: true, object: node })) {
        // if we know that this member expression is referencing a number then we can safely
        // optimise it
        var prop = this.parentPath.get("property");
        if (prop.isBaseType("number")) {
          state.candidates.push(this);
          return;
        }
      }

      // optimise single spread args in calls
      if (this.parentPath.isSpreadElement() && state.offset === 0) {
        var call = this.parentPath.parentPath;
        if (call.isCallExpression() && call.node.arguments.length === 1) {
          return state.argumentsNode;
        }
      }
    }

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      state.references.push(this);
    }
  }
};

function optimiseMemberExpression(parent, offset) {
  if (offset === 0) return;

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

function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
}

export var visitor = {
  Function(node, parent, scope) {
    if (!hasRest(node)) return;

    var restParam = node.params.pop();
    var rest = restParam.argument;

    var argsId = t.identifier("arguments");

    // otherwise `arguments` will be remapped in arrow functions
    argsId._shadowedFunctionLiteral = true;

    // support patterns
    if (t.isPattern(rest)) {
      var pattern = rest;
      rest = scope.generateUidIdentifier("ref");

      var declar = t.variableDeclaration("let", pattern.elements.map(function (elem, index) {
        var accessExpr = t.memberExpression(rest, t.literal(index), true);
        return t.variableDeclarator(elem, accessExpr);
      }));
      node.body.body.unshift(declar);
    }

    // check and optimise for extremely common cases

    var state = {
      references: [],
      offset:     node.params.length,

      argumentsNode: argsId,
      outerBinding:  scope.getBindingIdentifier(rest.name),

      // candidate member expressions we could optimise if there are no other references
      candidates: [],

      // local rest binding name
      name: rest.name,

      // whether any references to the rest parameter were made in a function
      deopted: false
    };

    this.traverse(memberExpressionOptimisationVisitor, state);

    if (!state.deopted && !state.references.length) {
      // we only have shorthands and there are no other references
      if (state.candidates.length) {
        for (var candidate of (state.candidates: Array)) {
          candidate.replaceWith(argsId);
          optimiseMemberExpression(candidate.parent, state.offset);
        }
      }
      return;
    } else {
      state.references = state.references.concat(state.candidates);
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

    var loop = util.template("rest", {
      ARRAY_TYPE: restParam.typeAnnotation,
      ARGUMENTS:  argsId,
      ARRAY_KEY:  arrKey,
      ARRAY_LEN:  arrLen,
      START:      start,
      ARRAY:      rest,
      KEY:        key,
      LEN:        len
    });

    if (!state.deopted) {
      // perform allocation at the lowest common denominator of all references
      this.getEarliestCommonAncestorFrom(state.references).getStatementParent().insertBefore(loop);
      return;
    }

    loop._blockHoist = node.params.length + 1;
    node.body.body.unshift(loop);
  }
};
