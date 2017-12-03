/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var Syntax = require('esprima-fb').Syntax;
var utils = require('../src/utils');

/**
 * Replaces `undefined` with `(void 0)` when it appears as an rvalue and is
 * undeclared in the lexical scope.
 *
 * Example:
 *
 * (function() {
 *   foo.undefined = bar;
 *   ({undefined: foo});
 *
 *   var bar = undefined;
 *   bar = undefined;
 *   foo.bar = undefined;
 *   undefined.foo = bar;
 *   foo[undefined] = bar;
 *   ({foo: undefined});
 * })(undefined);
 *
 * (function(undefined) { // declared here
 *   return undefined;
 * })(1);
 *
 * (function() {
 *   var undefined;       // declared here
 *   undefined = 1;       // assignment to declared variable
 *   return undefined;
 * })();
 *
 * (function(undefined) { // declared here
 *   return (function() {
 *     return undefined;  // respects lexical scope
 *   })();
 * })();
 *
 * Becomes:
 *
 * (function() {
 *   foo.undefined = bar;
 *   ({undefined: foo});
 *
 *   var bar = (void 0);
 *   bar = (void 0);
 *   foo.bar = (void 0);
 *   (void 0).foo = bar;
 *   foo[(void 0)] = bar;
 *   ({foo: (void 0)});
 * })((void 0));
 *
 * (function(undefined) { // declared here
 *   return undefined;
 * })(1);
 *
 * (function() {
 *   var undefined;       // declared here
 *   undefined = 1;       // assignment to declared variable
 *   return undefined;
 * })();
 *
 * (function(undefined) { // declared here
 *   return (function() {
 *     return undefined;  // respects lexical scope
 *   })();
 * })();
 *
 *
 *
 * NOTE: Any assignment to `undefined` where `undefined` is not declared in the
 * lexical scope will result in an exception.
 */

function visitIdentifierUndefined(traverse, node, path, state) {
  utils.catchup(node.range[1], state, function(value) {
    return '(void 0)';
  });
}

visitIdentifierUndefined.test = function(node, path, state) {
  if (
    node.type === Syntax.Identifier
      && node.name === 'undefined'
      && !utils.identWithinLexicalScope('undefined', state)
  ) {
    if (path[0]) {
      switch (path[0].type) {
        case Syntax.FunctionDeclaration:
        case Syntax.FunctionExpression:
        case Syntax.ArrowFunctionExpression:
          // skips: function params
          if (node !== path[0].body) {
            return false;
          }
          break;
        case Syntax.AssignmentExpression:
          // throws for: `undefined = foo` (where `undefined` is not declared)
          if (node === path[0].left) {
            throw new Error(
              'Illegal assignment to `undefined`. '
                + 'This breaks assumptions of the transform.'
            );
          }
          break;
        case Syntax.MemberExpression:
          // skips: `foo.undefined` but not `foo[undefined]`
          if (node === path[0].property && !path[0].computed) {
            return false;
          }
          break;
        case Syntax.VariableDeclarator:
          // skips: `var undefined`
          if (node !== path[0].init) {
            return false;
          }
          break;
        case Syntax.Property:
          // skips: `undefined: foo`
          if (node === path[0].key) {
            return false;
          }
          break;
      }
    }
    return true;
  }
  return false;
};

exports.visitorList = [
  visitIdentifierUndefined
];
