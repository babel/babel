/**
 * @fileoverview Rule to disallow uses of await inside of loops.
 * @author Nat Mote
 */
"use strict";

// Node types which are considered loops.
var loopTypes = {
  'ForStatement': true,
  'ForOfStatement': true,
  'ForInStatement': true,
  'WhileStatement': true,
  'DoWhileStatement': true,
};

// Node types at which we should stop looking for loops. For example, it is fine to declare an async
// function within a loop, and use await inside of that.
var boundaryTypes = {
  'FunctionDeclaration': true,
  'FunctionExpression': true,
  'ArrowFunctionExpression': true,
};

module.exports = function(context) {
  return {
    // babel-eslint transpiles AwaitExpressions to YieldExpressions, but the actual node kind is
    // still available in _babelType.
    YieldExpression: function(node) {
      if (node._babelType === 'AwaitExpression') {
        var ancestors = context.getAncestors();
        // Reverse so that we can traverse from the deepest node upwards.
        ancestors.reverse();
        // Create a set of all the ancestors plus this node so that we can check
        // if this use of await appears in the body of the loop as opposed to
        // the right-hand side of a for...of, for example.
        //
        // Implement the set with an Array since there are likely to be very few
        // elements. An Object would not be appropriate since the elements are
        // not strings.
        var ancestorSet = [].concat(ancestors, [node]);
        var ancestorSetHas = function(element) {
          return ancestorSet.indexOf(element) !== -1;
        }
        for (var i = 0; i < ancestors.length; i++) {
          var ancestor = ancestors[i];
          if (boundaryTypes.hasOwnProperty(ancestor.type)) {
            // Short-circuit out if we encounter a boundary type. Loops above
            // this do not matter.
            return;
          }
          if (loopTypes.hasOwnProperty(ancestor.type)) {
            // Only report if we are actually in the body or another part that gets executed on
            // every iteration.
            if (
              ancestorSetHas(ancestor.body) ||
              ancestorSetHas(ancestor.test) ||
              ancestorSetHas(ancestor.update)
            ) {
              context.report(
                node,
                'Avoid using await inside a loop. Consider refactoring to use Promise.all. If ' +
                'you are sure you want to do this, add `// eslint-disable-line ' +
                context.id + '` at the end of this line.'
              );
              return;
            }
          }
        }
      }
    },
  };
}
