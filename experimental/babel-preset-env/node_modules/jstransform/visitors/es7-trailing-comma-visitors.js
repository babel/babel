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
 * Strips trailing commas from function calls. Transforms:
 *
 * foo('bar',)
 *
 * into:
 *
 * foo('bar')
 */

function visitFunctionCallArguments(traverse, node, path, state) {

  utils.catchup(node.callee.range[0], state);
  traverse(node.callee, [node].concat(path), state);

  var args = node['arguments'];
  for (var index = 0; index < args.length; ++index) {
    utils.catchup(args[index].range[0], state);
    traverse(args[index], [node].concat(path), state);
    utils.catchup(args[index].range[1], state);
  }

  // delete first comma between the last argument and the closing parenthesis
  utils.catchup(node.range[1], state, function(value) {
    return value.replace(",", '');
  });

  return false;
}

visitFunctionCallArguments.test = function(node, path, state) {
  return (
    node.type === Syntax.CallExpression ||
    node.type === Syntax.NewExpression
  ) && (
    node['arguments'].length > 0
  );
};

/**
 * Strips trailing commas from function expressions / function declarations /
 * method calls. Transforms:
 *
 * var fnExp = function(bar,) { ... };
 * function fnDec(bar,) { ... };
 * class Test { foo(bar, ) { ... } };
 *
 * into:
 *
 * var fnExp = function(bar) { ... };
 * function fnDec(bar) { ... };
 * class Test { foo(bar) { ... } };

 */

function visitFunctionDefinitionArguments(traverse, node, path, state) {
  var end = node.range[1];
  if (node.type === Syntax.MethodDefinition) {
    node = node.value;
  }
  for (var index = 0; index < node.params.length; ++index) {
    utils.catchup(node.params[index].range[0], state);
    traverse(node.params[index], [node].concat(path), state);
    utils.catchup(node.params[index].range[1], state);
  }

  // delete first comma between the last argument and the closing parenthesis
  utils.catchup(node.body.range[0], state, function(value) {
    var commaIndex = value.substr(0, value.indexOf(")")).indexOf(",");
    return commaIndex > -1 ? value.replace(/,/, '') : value;
  });
  traverse(node.body, [node].concat(path), state);
  utils.catchup(end, state);
  return false;
}

visitFunctionDefinitionArguments.test = function(node, path, state) {
  return (
    node.type === Syntax.FunctionExpression ||
    node.type === Syntax.FunctionDeclaration ||
    node.type === Syntax.MethodDefinition
  ) && (
    node.params && node.params.length > 0 || // function expression/declaration
    node.value && node.value.params.length > 0 // method definition
  );
};

exports.visitorList = [
  visitFunctionCallArguments,
  visitFunctionDefinitionArguments,
];
