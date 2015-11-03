import template from "babel-template";
import * as t from "babel-types";

let buildRest = template(`
  for (var LEN = ARGUMENTS.length,
           ARRAY = Array(ARRAY_LEN),
           KEY = START;
       KEY < LEN;
       KEY++) {
    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];
  }
`);

let memberExpressionOptimisationVisitor = {
  Scope(path, state) {
    // check if this scope has a local binding that will shadow the rest parameter
    if (!path.scope.bindingIdentifierEquals(state.name, state.outerBinding)) {
      path.skip();
    }
  },

  Flow(path) {
    // don't touch reference in type annotations
    path.skip();
  },

  Function(path, state) {
    // skip over functions as whatever `arguments` we reference inside will refer
    // to the wrong function
    let oldNoOptimise = state.noOptimise;
    state.noOptimise = true;
    path.traverse(memberExpressionOptimisationVisitor, state);
    state.noOptimise = oldNoOptimise;
    path.skip();
  },

  ReferencedIdentifier(path, state) {
    let { node } = path;

    // we can't guarantee the purity of arguments
    if (node.name === "arguments") {
      state.deopted = true;
    }

    // is this a referenced identifier and is it referencing the rest parameter?
    if (node.name !== state.name) return;

    if (state.noOptimise) {
      state.deopted = true;
    } else {
      if (path.parentPath.isMemberExpression({ computed: true, object: node })) {
        // if we know that this member expression is referencing a number then we can safely
        // optimise it
        let prop = path.parentPath.get("property");
        if (prop.isBaseType("number")) {
          state.candidates.push(path);
          return;
        }
      }

      // optimise single spread args in calls
      if (path.parentPath.isSpreadElement() && state.offset === 0) {
        let call = path.parentPath.parentPath;
        if (call.isCallExpression() && call.node.arguments.length === 1) {
          state.candidates.push(path);
          return;
        }
      }

      state.references.push(path);
    }
  },

  /**
   * Deopt on use of a binding identifier with the same name as our rest param.
   *
   * See https://github.com/babel/babel/issues/2091
   */

  BindingIdentifier({ node }, state) {
    if (node.name === state.name) {
      state.deopted = true;
    }
  }
};

function optimiseMemberExpression(parent, offset) {
  if (offset === 0) return;

  let newExpr;
  let prop = parent.property;

  if (t.isLiteral(prop)) {
    prop.value += offset;
    prop.raw = String(prop.value);
  } else { // // UnaryExpression, BinaryExpression
    newExpr = t.binaryExpression("+", prop, t.numericLiteral(offset));
    parent.property = newExpr;
  }
}

function hasRest(node) {
  return t.isRestElement(node.params[node.params.length - 1]);
}

export let visitor = {
  Function(path) {
    let { node, scope } = path;
    if (!hasRest(node)) return;

    let restParam = node.params.pop();
    let rest = restParam.argument;

    let argsId = t.identifier("arguments");

    // otherwise `arguments` will be remapped in arrow functions
    argsId._shadowedFunctionLiteral = path;

    // support patterns
    if (t.isPattern(rest)) {
      let pattern = rest;
      rest = scope.generateUidIdentifier("ref");

      let declar = t.variableDeclaration("let", pattern.elements.map(function (elem, index) {
        let accessExpr = t.memberExpression(rest, t.numericLiteral(index), true);
        return t.variableDeclarator(elem, accessExpr);
      }));
      node.body.body.unshift(declar);
    }

    // check and optimise for extremely common cases
    let state = {
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

    path.traverse(memberExpressionOptimisationVisitor, state);

    if (!state.deopted && !state.references.length) {
      // we only have shorthands and there are no other references
      if (state.candidates.length) {
        for (let candidate of (state.candidates: Array)) {
          candidate.replaceWith(argsId);
          if (candidate.parentPath.isMemberExpression()) {
            optimiseMemberExpression(candidate.parent, state.offset);
          }
        }
      }
      return;
    } else {
      state.references = state.references.concat(state.candidates);
    }

    // deopt shadowed functions as transforms like regenerator may try touch the allocation loop
    state.deopted = state.deopted || !!node.shadow;

    //

    let start = t.numericLiteral(node.params.length);
    let key = scope.generateUidIdentifier("key");
    let len = scope.generateUidIdentifier("len");

    let arrKey = key;
    let arrLen = len;
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
        t.numericLiteral(0)
      );
    }

    let loop = buildRest({
      ARGUMENTS: argsId,
      ARRAY_KEY: arrKey,
      ARRAY_LEN: arrLen,
      START:     start,
      ARRAY:     rest,
      KEY:       key,
      LEN:       len,
    });

    if (state.deopted) {
      loop._blockHoist = node.params.length + 1;
      node.body.body.unshift(loop);
    } else {
      // perform allocation at the lowest common ancestor of all references
      loop._blockHoist = 1;

      let target = path.getEarliestCommonAncestorFrom(state.references).getStatementParent();

      // don't perform the allocation inside a loop
      let highestLoop;
      target.findParent(function (path) {
        if (path.isLoop()) {
          highestLoop = path;
        } else if (path.isFunction()) {
          // stop crawling up for functions
          return true;
        }
      });
      if (highestLoop) target = highestLoop;

      target.insertBefore(loop);
    }
  }
};
