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
 * Implements ES7 object spread property.
 * https://gist.github.com/sebmarkbage/aa849c7973cb4452c547
 *
 * { ...a, x: 1 }
 *
 * Object.assign({}, a, {x: 1 })
 *
 */

var Syntax = require('esprima-fb').Syntax;
var utils = require('../src/utils');

function visitObjectLiteralSpread(traverse, node, path, state) {
  utils.catchup(node.range[0], state);

  utils.append('Object.assign({', state);

  // Skip the original {
  utils.move(node.range[0] + 1, state);

  var lastWasSpread = renderSpreadProperties(
    traverse,
    node.properties,
    path,
    state,
    false // previousWasSpread
  );

  // Strip any non-whitespace between the last item and the end.
  // We only catch up on whitespace so that we ignore any trailing commas which
  // are stripped out for IE8 support. Unfortunately, this also strips out any
  // trailing comments.
  utils.catchupWhiteSpace(node.range[1] - 1, state);

  // Skip the trailing }
  utils.move(node.range[1], state);

  if (!lastWasSpread) {
    utils.append('}', state);
  }

  utils.append(')', state);
  return false;
}

// This method is also used by es6-object-computed-property-visitor.
function renderSpreadProperties(traverse, properties, path, state, previousWasSpread) {

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (property.type === Syntax.SpreadProperty) {

      // Close the previous object or initial object
      if (!previousWasSpread) {
        utils.append('}', state);
      }

      if (i === 0) {
        // Normally there will be a comma when we catch up, but not before
        // the first property.
        utils.append(',', state);
      }

      utils.catchup(property.range[0], state);

      // skip ...
      utils.move(property.range[0] + 3, state);

      traverse(property.argument, path, state);

      utils.catchup(property.range[1], state);

      previousWasSpread = true;

    } else {

      utils.catchup(property.range[0], state);

      if (previousWasSpread) {
        utils.append('{', state);
      }

      traverse(property, path, state);

      utils.catchup(property.range[1], state);

      previousWasSpread = false;

    }
  }

  return previousWasSpread;
}

visitObjectLiteralSpread.test = function(node, path, state) {
  if (node.type !== Syntax.ObjectExpression) {
    return false;
  }
  // Tight loop optimization
  var hasAtLeastOneSpreadProperty = false;
  for (var i = 0; i < node.properties.length; i++) {
    var property = node.properties[i];
    if (property.type === Syntax.SpreadProperty) {
      hasAtLeastOneSpreadProperty = true;
    } else if (property.kind !== 'init') {
      return false;
    }
  }
  return hasAtLeastOneSpreadProperty;
};

exports.renderSpreadProperties = renderSpreadProperties;
exports.visitorList = [
  visitObjectLiteralSpread
];
