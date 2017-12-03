/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
/*global exports:true*/

/**
 * Implements ES6 for-of loop, making optimization
 * for arrays. If an object is not an array, instantiates
 * an iterator for this object, assuming the runtime
 * support for the iterator is implemented.
 *
 * ES6:
 *
 * for (var v of <expr>) <body>
 *
 * Compiled ES3:
 *
 * for (var v,
 *      _iter = <expr>,
 *      _isArray = Array.isArray(_iter),
 *      _k = 0,
 *      _iter = _isArray ? _iter : _iter[Symbol.iterator]();;
 * ) {
 *
 *   if (_isArray) {
 *     if (_k >= _iter.length) break;
 *     v = _iter[_k++];
 *   } else {
 *     _k = _iter.next();
 *     if (_k.done) break;
 *     v = _k.value;
 *   }
 *
 *   <body>
 * }
 */

var Syntax = require('esprima-fb').Syntax;
var utils = require('../src/utils');

function process(traverse, node, path, state) {
  utils.move(node.range[0], state);
  traverse(node, path, state);
  utils.catchup(node.range[1], state);
}

function visitForOfStatement(traverse, node, path, state) {
  var iter = utils.injectTempVar(state);
  var isArray = utils.injectTempVar(state);
  var k = utils.injectTempVar(state);

  var variable;

  if (node.left.type === Syntax.VariableDeclaration) {
    variable = node.left.declarations[0].id.name;
    utils.append('var ' + variable + ';', state);
  } else {
    variable = node.left.name;
  }

  utils.append('for(', state);

  utils.append(iter + '=', state);
  process(traverse, node.right, path, state);

  // Setup iterator with optimization for arrays.
  utils.append(
    ',' + isArray + '=Array.isArray(' + iter + '),' +
    k + '=0,' +
    iter + '=' + isArray + '?' + iter + ':' +
    iter + '[/*global Symbol*/typeof Symbol=="function"' +
      '?Symbol.iterator:"@@iterator"]();;',
    state
  );

  // Jump to the body creating block if needed.
  if (node.body.type === Syntax.BlockStatement) {
    utils.catchup(node.body.range[0] + 1, state);
  } else {
    utils.catchup(node.body.range[0], state);
    utils.append('{', state);
  }

  // Arrays case.
  utils.append(
    'if(' + isArray + '){' +
    'if(' + k + '>=' + iter + '.length) break;',
    state
  );

  utils.append(variable + '=' + iter + '[' + k + '++];', state);

  // Iterators case.
  utils.append(
    '}else{' + k + '=' + iter + '.next();' +
    'if(' + k + '.done) break;',
    state
  );

  utils.append(variable + '=' + k + '.value;}', state);

  traverse(node.body, path, state);
  utils.catchup(node.body.range[1], state);

  if (node.body.type !== Syntax.BlockStatement) {
    utils.append('}', state);
  }

  return false;
}

visitForOfStatement.test = function(node, path, state) {
  return node.type === Syntax.ForOfStatement;
};

exports.visitorList = [
  visitForOfStatement,
];
