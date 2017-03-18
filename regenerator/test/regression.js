/**
 * Copyright (c) 2017, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");

describe("regressions", function() {
  it("should correctly hoist arguments", async function () {
    function test(fn) {
      return async (...args) => {
        return fn(...args);
      };
    }
    const result = [];
    await test((arg1, arg2) => { result.push(arg1, arg2); })(1, "foo");

    assert.deepEqual(result, [1, "foo"]);
  });
});
