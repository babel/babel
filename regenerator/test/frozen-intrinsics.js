/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assert = require("assert");

var getPrototypeOf = Reflect.getPrototypeOf;
function getConstructorOf(obj) {
  return getPrototypeOf(obj).constructor;
}

var SymbolIterator = (typeof Symbol && Symbol.iterator) || '@@iterator';
var ArrayIteratorObject = new Array()[SymbolIterator]();
var ArrayIteratorPrototype = getPrototypeOf(ArrayIteratorObject);
var IteratorPrototype = getPrototypeOf(ArrayIteratorPrototype);
async function* AsyncGeneratorFunctionInstance() {}
var AsyncGeneratorFunction = getConstructorOf(
  AsyncGeneratorFunctionInstance,
);
var AsyncGenerator = AsyncGeneratorFunction.prototype;
var AsyncGeneratorPrototype = AsyncGenerator.prototype;
var AsyncIteratorPrototype = getPrototypeOf(AsyncGeneratorPrototype);

// freeze relevant intrinsics
Object.freeze(Object.prototype);
Object.freeze(IteratorPrototype);
Object.freeze(ArrayIteratorPrototype);
Object.freeze(AsyncGenerator);
Object.freeze(AsyncGeneratorPrototype);
Object.freeze(AsyncIteratorPrototype);

describe("Frozen intrinsics test", function () {
  it("regenerator-runtime doesn't fail to initialize when Object prototype is frozen", function() {
    require("./runtime.js");
  });
});
