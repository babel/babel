/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// tests that should be run only in node 4 and higher, as they use
// language features not supported by versions < 4 (even with --harmony).
var shared = require("./shared.js");
var check = shared.check;

describe("object properties", function () {
  it("should work if the generator is a simple object property", function () {
    var obj = {
      gen: function*(x) {
        yield x;
      }
    };

    check(obj.gen("oyez"), ["oyez"]);
  });

  it("should work if the generator is a shorthand object method", function () {
    var obj = {
      *gen(x) {
        yield x;
      }
    };

    check(obj.gen("oyez"), ["oyez"]);
  });

  it("should work if the generator is a shorthand computed object method", function () {
    var fnName = "gen";
    var obj = {
      *[fnName](x) {
        yield x;
      }
    };

    check(obj.gen("oyez"), ["oyez"]);
  });

});
