/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * @emails jeffmo@fb.com
 */

/*jshint evil:true*/

require('mock-modules').autoMockOff();

describe('jstransform-utils', function() {
  var transform, utils;
  var Syntax = require('esprima-fb').Syntax;

  beforeEach(function() {
    require('mock-modules').dumpCache();
    transform = require('../jstransform').transform;
    utils = require('../utils');
  });

  describe('temporary variables', function() {
    it('should inject temporary variables at the start of functions', function() {
      function visitFunctionBlock(traverse, node, path, state) {
        utils.catchup(node.range[0] + 1, state);
        var x = utils.injectTempVar(state);
        var y = utils.injectTempVar(state);
        traverse(node.body, path, state);
        utils.append('return ' + x + ' + ' + y + ';', state);
        utils.catchup(node.range[1], state);
        return false;
      }
      visitFunctionBlock.test = function(node, path, state) {
        var parentType = path.length && path[0].type;
        return node.type === Syntax.BlockStatement && (
          parentType === Syntax.FunctionDeclaration ||
          parentType === Syntax.FunctionExpression
        );
      };

      expect(transform(
        [visitFunctionBlock],
        'var x = function() {};'
      ).code).toEqual(
        'var x = function() {var $__0, $__1;return $__0 + $__1;};'
      );

      expect(eval(transform(
        [visitFunctionBlock],
        '2 + (function sum(x, y)\t{ $__0 = x; $__1 = y; }(3, 5))'
      ).code)).toEqual(10);
    });
  });

});
