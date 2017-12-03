"use strict";

exports.__esModule = true;
exports.definitions = void 0;
var definitions = {
  builtins: {
    DataView: "es6.typed.data-view",
    Int8Array: "es6.typed.int8-array",
    Uint8Array: "es6.typed.uint8-array",
    Uint8ClampedArray: "es6.typed.uint8-clamped-array",
    Int16Array: "es6.typed.int16-array",
    Uint16Array: "es6.typed.uint16-array",
    Int32Array: "es6.typed.int32-array",
    Uint32Array: "es6.typed.uint32-array",
    Float32Array: "es6.typed.float32-array",
    Float64Array: "es6.typed.float64-array",
    Map: "es6.map",
    Set: "es6.set",
    WeakMap: "es6.weak-map",
    WeakSet: "es6.weak-set",
    Promise: "es6.promise",
    Symbol: "es6.symbol"
  },
  instanceMethods: {
    name: ["es6.function.name"],
    fromCodePoint: ["es6.string.from-code-point"],
    codePointAt: ["es6.string.code-point-at"],
    repeat: ["es6.string.repeat"],
    startsWith: ["es6.string.starts-with"],
    endsWith: ["es6.string.ends-with"],
    includes: ["es6.string.includes", "es7.array.includes"],
    flags: ["es6.regexp.flags"],
    match: ["es6.regexp.match"],
    replace: ["es6.regexp.replace"],
    split: ["es6.regexp.split"],
    search: ["es6.regexp.search"],
    copyWithin: ["es6.array.copy-within"],
    find: ["es6.array.find"],
    findIndex: ["es6.array.find-index"],
    fill: ["es6.array.fill"],
    padStart: ["es7.string.pad-start"],
    padEnd: ["es7.string.pad-end"]
  },
  staticMethods: {
    Array: {
      from: "es6.array.from",
      of: "es6.array.of"
    },
    Object: {
      assign: "es6.object.assign",
      is: "es6.object.is",
      getOwnPropertySymbols: "es6.object.get-own-property-symbols",
      setPrototypeOf: "es6.object.set-prototype-of",
      values: "es7.object.values",
      entries: "es7.object.entries",
      getOwnPropertyDescriptors: "es7.object.get-own-property-descriptors"
    },
    Math: {
      acosh: "es6.math.acosh",
      asinh: "es6.math.asinh",
      atanh: "es6.math.atanh",
      cbrt: "es6.math.cbrt",
      clz32: "es6.math.clz32",
      cosh: "es6.math.cosh",
      expm1: "es6.math.expm1",
      fround: "es6.math.fround",
      hypot: "es6.math.hypot",
      imul: "es6.math.imul",
      log1p: "es6.math.log1p",
      log10: "es6.math.log10",
      log2: "es6.math.log2",
      sign: "es6.math.sign",
      sinh: "es6.math.sinh",
      tanh: "es6.math.tanh",
      trunc: "es6.math.trunc"
    },
    String: {
      raw: "es6.string.raw"
    },
    Number: {
      isFinite: "es6.number.is-finite",
      isInteger: "es6.number.is-integer",
      isSafeInteger: "es6.number.is-safe-integer",
      isNaN: "es6.number.is-nan",
      EPSILON: "es6.number.epsilon",
      MIN_SAFE_INTEGER: "es6.number.min-safe-integer",
      MAX_SAFE_INTEGER: "es6.number.max-safe-integer"
    },
    Reflect: {
      apply: "es6.reflect.apply",
      construct: "es6.reflect.construct",
      defineProperty: "es6.reflect.define-property",
      deleteProperty: "es6.reflect.delete-property",
      get: "es6.reflect.get",
      getOwnPropertyDescriptor: "es6.reflect.get-own-property-descriptor",
      getPrototypeOf: "es6.reflect.get-prototype-of",
      has: "es6.reflect.has",
      isExtensible: "es6.reflect.is-extensible",
      ownKeys: "es6.reflect.own-keys",
      preventExtensions: "es6.reflect.prevent-extensions",
      set: "es6.reflect.set",
      setPrototypeOf: "es6.reflect.set-prototype-of"
    }
  }
};
exports.definitions = definitions;