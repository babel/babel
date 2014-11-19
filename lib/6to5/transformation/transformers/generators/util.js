/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var t = require("../../../types");

exports.runtimeProperty = function (name) {
  return t.memberExpression(
    t.identifier("regeneratorRuntime"),
    t.identifier(name)
  );
};

// Offsets into this.listing that could be used as targets for branches or
// jumps are represented as numeric Literal nodes. This representation has
// the amazingly convenient benefit of allowing the exact value of the
// location to be determined at any time, even after generating code that
// refers to the location.

exports.loc = function () {
  return t.literal(-1);
};
