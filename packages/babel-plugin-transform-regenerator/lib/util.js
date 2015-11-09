/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;
exports.runtimeProperty = runtimeProperty;
exports.isReference = isReference;

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function runtimeProperty(name) {
  return t.memberExpression(t.identifier("regeneratorRuntime"), t.identifier(name), false);
}

function isReference(path) {
  return path.isReferenced() || path.parentPath.isAssignmentExpression({ left: path.node });
}