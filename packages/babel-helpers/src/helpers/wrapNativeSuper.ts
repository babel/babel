/* @minVersion 7.0.0-beta.0 */

// Based on https://github.com/WebReflection/babel-plugin-transform-builtin-classes

import getPrototypeOf from "./getPrototypeOf.ts";
import setPrototypeOf from "./setPrototypeOf.ts";
import isNativeFunction from "./isNativeFunction.ts";
import construct from "./construct.ts";

export default function _wrapNativeSuper(Class: Function | null) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  // @ts-expect-error -- reuse function id for helper size
  _wrapNativeSuper = function _wrapNativeSuper(Class: Function | null) {
    if (Class === null || !isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (_cache !== undefined) {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      // @ts-expect-error -- we are sure Class is a function here
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });

    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}
