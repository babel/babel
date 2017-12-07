/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
