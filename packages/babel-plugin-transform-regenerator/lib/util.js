/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var t = require("babel-types");

exports.runtimeProperty = function(name) {
  return t.memberExpression(
    t.identifier("regeneratorRuntime"),
    t.identifier(name),
    false
  );
};

exports.isReference = function(path) {
  return path.isReferenced() || path.parentPath.isAssignmentExpression({ left: path.node });
};
