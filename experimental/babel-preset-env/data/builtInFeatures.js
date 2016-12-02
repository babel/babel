// https://github.com/zloirock/core-js

/* eslint-disable quotes */
module.exports = {
  // es2015
  // core-js/fn/map

  // "typed": "typed arrays", ?
  // "typed/array-buffer": "typed arrays / ", ?
  "typed/data-view": "typed arrays / DataView",
  "typed/int8-array": "typed arrays / Int8Array",
  "typed/uint8-array": "typed arrays / Uint8Array",
  "typed/uint8-clamped-array": "typed arrays / Uint8ClampedArray",
  "typed/int16-array": "typed arrays / Int16Array",
  "typed/uint16-array": "typed arrays / Uint16Array",
  "typed/int32-array": "typed arrays / Int32Array",
  "typed/uint32-array": "typed arrays / Uint32Array",
  "typed/float32-array": "typed arrays / Float32Array",
  "typed/float64-array": "typed arrays / Float64Array",

  "map": "Map",
  "set": "Set",
  "weak-map": "WeakMap",
  "weak-set": "WeakSet",

  // No polyfill for proxy

  "reflect": "Reflect",
  "reflect/apply": "Reflect / ",
  "reflect/construct": "Reflect / Reflect.construct",
  "reflect/define-property": "Reflect / Reflect.defineProperty",
  "reflect/delete-property": "Reflect / Reflect.deleteProperty",
  "reflect/get": "Reflect / Reflect.get",
  "reflect/get-own-property-descriptor": "Reflect / Reflect.getOwnPropertyDescriptor",
  "reflect/get-prototype-of": "Reflect / Reflect.getPrototypeOf",
  "reflect/has": "Reflect / Reflect.has",
  "reflect/is-extensible": "Reflect / Reflect.isExtensible",
  "reflect/own-keys": "Reflect / Reflect.ownKeys",
  "reflect/prevent-extensions": "Reflect / Reflect.preventExtensions",
  "reflect/set": "Reflect / Reflect.set",
  "reflect/set-prototype-of": "Reflect / Reflect.setPrototypeOf",

  "promise": "Promise",

  "symbol": "Symbol",
  "symbol/for": "Symbol / global symbol registry",
  "symbol/key-for": "Symbol / global symbol registry",

  "symbol/has-instance": "well-known symbols / Symbol.hasInstance",
  "symbol/is-concat-spreadable": "well-known symbols / Symbol.isConcatSpreadable",
  "symbol/iterator": "well-known symbols / Symbol.iterator",
  "symbol/match": "well-known symbols / Symbol.match",
  "symbol/replace": "well-known symbols / Symbol.replace",
  "symbol/search": "well-known symbols / Symbol.search",
  "symbol/species": "well-known symbols / Symbol.species",
  "symbol/split": "well-known symbols / Symbol.split",
  "symbol/to-primitive": "well-known symbols / Symbol.toPrimitive",
  "symbol/to-string-tag": "well-known symbols / Symbol.toStringTag",
  "symbol/unscopables": "well-known symbols / Symbol.unscopables",

  "object/assign": "Object static methods / Object.assign",
  "object/is": "Object static methods / Object.is",
  "object/get-own-property-symbols": "Object static methods / Object.getOwnPropertySymbols",
  "object/set-prototype-of": "Object static methods / Object.setPrototypeOf",

  "function/name": 'function "name" property',

  "string/raw": "String static methods / String.raw",
  "string/string/from-code-point": "String static methods / String.fromCodePoint",

  // String.prototype methods
};
