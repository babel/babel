/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasOwn = Object.prototype.hasOwnProperty;
var getProto = Object.getPrototypeOf;
var NativeIteratorPrototype =
  typeof Symbol === "function" &&
  typeof Symbol.iterator === "symbol" &&
  typeof [][Symbol.iterator] === "function" &&
  getProto &&
  getProto(getProto([][Symbol.iterator]()));

// https://tc39.es/proposal-iterator-helpers/#sec-iteratorprototype-@@tostringtag
Object.defineProperty(NativeIteratorPrototype, Symbol.toStringTag, {
  configurable: true,
  value: "Iterator",
});

describe("Symbol.toStringTag safety (#399, #400)", function () {
  it("regenerator-runtime doesn't fail to initialize when native iterator prototype has a non-writable @@toStringTag property", function() {
    require("./runtime.js");
  });
});
