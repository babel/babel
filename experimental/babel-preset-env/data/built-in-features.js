const typedArrayMethods = [
  "typed arrays / %TypedArray%.from",
  "typed arrays / %TypedArray%.of",
  "typed arrays / %TypedArray%.prototype.subarray",
  "typed arrays / %TypedArray%.prototype.join",
  "typed arrays / %TypedArray%.prototype.indexOf",
  "typed arrays / %TypedArray%.prototype.lastIndexOf",
  "typed arrays / %TypedArray%.prototype.slice",
  "typed arrays / %TypedArray%.prototype.every",
  "typed arrays / %TypedArray%.prototype.filter",
  "typed arrays / %TypedArray%.prototype.forEach",
  "typed arrays / %TypedArray%.prototype.map",
  "typed arrays / %TypedArray%.prototype.reduce",
  "typed arrays / %TypedArray%.prototype.reduceRight",
  "typed arrays / %TypedArray%.prototype.reverse",
  "typed arrays / %TypedArray%.prototype.some",
  "typed arrays / %TypedArray%.prototype.sort",
  "typed arrays / %TypedArray%.prototype.copyWithin",
  "typed arrays / %TypedArray%.prototype.find",
  "typed arrays / %TypedArray%.prototype.findIndex",
  "typed arrays / %TypedArray%.prototype.fill",
  "typed arrays / %TypedArray%.prototype.keys",
  "typed arrays / %TypedArray%.prototype.values",
  "typed arrays / %TypedArray%.prototype.entries",
  "typed arrays / %TypedArray%.prototype[Symbol.iterator]",
  "typed arrays / %TypedArray%[Symbol.species]",
];

const es2015 = {
  "es6.typed.array-buffer": "typed arrays / ArrayBuffer[Symbol.species]",
  "es6.typed.data-view": "typed arrays / DataView",
  "es6.typed.int8-array": {
    features: ["typed arrays / Int8Array"].concat(typedArrayMethods)
  },
  "es6.typed.uint8-array": {
    features: ["typed arrays / Uint8Array"].concat(typedArrayMethods)
  },
  "es6.typed.uint8-clamped-array": {
    features: ["typed arrays / Uint8ClampedArray"].concat(typedArrayMethods)
  },
  "es6.typed.int16-array": {
    features: ["typed arrays / Int16Array"].concat(typedArrayMethods)
  },
  "es6.typed.uint16-array": {
    features: ["typed arrays / Uint16Array"].concat(typedArrayMethods)
  },
  "es6.typed.int32-array": {
    features: ["typed arrays / Int32Array"].concat(typedArrayMethods)
  },
  "es6.typed.uint32-array": {
    features: ["typed arrays / Uint32Array"].concat(typedArrayMethods)
  },
  "es6.typed.float32-array": {
    features: ["typed arrays / Float32Array"].concat(typedArrayMethods)
  },
  "es6.typed.float64-array": {
    features: ["typed arrays / Float64Array"].concat(typedArrayMethods)
  },

  "es6.map": "Map",
  "es6.set": "Set",
  "es6.weak-map": "WeakMap",
  "es6.weak-set": "WeakSet",

  // Proxy not implementable

  "es6.reflect.apply": "Reflect / Reflect.apply",
  "es6.reflect.construct": "Reflect / Reflect.construct",
  "es6.reflect.define-property": "Reflect / Reflect.defineProperty",
  "es6.reflect.delete-property": "Reflect / Reflect.deleteProperty",
  "es6.reflect.get": "Reflect / Reflect.get",
  "es6.reflect.get-own-property-descriptor": "Reflect / Reflect.getOwnPropertyDescriptor",
  "es6.reflect.get-prototype-of": "Reflect / Reflect.getPrototypeOf",
  "es6.reflect.has": "Reflect / Reflect.has",
  "es6.reflect.is-extensible": "Reflect / Reflect.isExtensible",
  "es6.reflect.own-keys": "Reflect / Reflect.ownKeys",
  "es6.reflect.prevent-extensions": "Reflect / Reflect.preventExtensions",
  "es6.reflect.set": "Reflect / Reflect.set",
  "es6.reflect.set-prototype-of": "Reflect / Reflect.setPrototypeOf",

  "es6.promise": {
    features: [
      "Promise / basic functionality",
      "Promise / constructor requires new",
      "Promise / Promise.prototype isn\'t an instance",
      "Promise / Promise.all",
      "Promise / Promise.all, generic iterables",
      "Promise / Promise.race",
      "Promise / Promise.race, generic iterables",
      "Promise / Promise[Symbol.species]"
    ]
  },

  "es6.symbol": {
    features: [
      "Symbol",
      "Object static methods / Object.getOwnPropertySymbols",
      "well-known symbols / Symbol.hasInstance",
      "well-known symbols / Symbol.isConcatSpreadable",
      "well-known symbols / Symbol.iterator",
      "well-known symbols / Symbol.match",
      "well-known symbols / Symbol.replace",
      "well-known symbols / Symbol.search",
      "well-known symbols / Symbol.species",
      "well-known symbols / Symbol.split",
      "well-known symbols / Symbol.toPrimitive",
      "well-known symbols / Symbol.toStringTag",
      "well-known symbols / Symbol.unscopables",
    ]
  },

  "es6.object.assign": "Object static methods / Object.assign",
  "es6.object.is": "Object static methods / Object.is",
  "es6.object.set-prototype-of": "Object static methods / Object.setPrototypeOf",

  "es6.function.name": "function \"name\" property",

  "es6.string.raw": "String static methods / String.raw",
  "es6.string.from-code-point": "String static methods / String.fromCodePoint",

  "es6.string.code-point-at": "String.prototype methods / String.prototype.codePointAt",
  // "String.prototype methods / String.prototype.normalize" not implemented
  "es6.string.repeat": "String.prototype methods / String.prototype.repeat",
  "es6.string.starts-with": "String.prototype methods / String.prototype.startsWith",
  "es6.string.ends-with": "String.prototype methods / String.prototype.endsWith",
  "es6.string.includes": "String.prototype methods / String.prototype.includes",

  "es6.regexp.flags": "RegExp.prototype properties / RegExp.prototype.flags",
  "es6.regexp.match": "RegExp.prototype properties / RegExp.prototype[Symbol.match]",
  "es6.regexp.replace": "RegExp.prototype properties / RegExp.prototype[Symbol.replace]",
  "es6.regexp.split": "RegExp.prototype properties / RegExp.prototype[Symbol.split]",
  "es6.regexp.search": "RegExp.prototype properties / RegExp.prototype[Symbol.search]",

  "es6.array.from": "Array static methods / Array.from",
  "es6.array.of": "Array static methods / Array.of",

  "es6.array.copy-within": "Array.prototype methods / Array.prototype.copyWithin",
  "es6.array.find": "Array.prototype methods / Array.prototype.find",
  "es6.array.find-index": "Array.prototype methods / Array.prototype.findIndex",
  "es6.array.fill": "Array.prototype methods / Array.prototype.fill",

  "es6.array.iterator": {
    features: [
      "Array.prototype methods / Array.prototype.keys",
     // can use Symbol.iterator, not implemented in many environments
     // "Array.prototype methods / Array.prototype.values",
      "Array.prototype methods / Array.prototype.entries",
    ]
  },

  "es6.number.is-finite": "Number properties / Number.isFinite",
  "es6.number.is-integer": "Number properties / Number.isInteger",
  "es6.number.is-safe-integer": "Number properties / Number.isSafeInteger",
  "es6.number.is-nan": "Number properties / Number.isNaN",
  "es6.number.epsilon": "Number properties / Number.EPSILON",
  "es6.number.min-safe-integer": "Number properties / Number.MIN_SAFE_INTEGER",
  "es6.number.max-safe-integer": "Number properties / Number.MAX_SAFE_INTEGER",

  "es6.math.acosh": "Math methods / Math.acosh",
  "es6.math.asinh": "Math methods / Math.asinh",
  "es6.math.atanh": "Math methods / Math.atanh",
  "es6.math.cbrt": "Math methods / Math.cbrt",
  "es6.math.clz32": "Math methods / Math.clz32",
  "es6.math.cosh": "Math methods / Math.cosh",
  "es6.math.expm1": "Math methods / Math.expm1",
  "es6.math.fround": "Math methods / Math.fround",
  "es6.math.hypot": "Math methods / Math.hypot",
  "es6.math.imul": "Math methods / Math.imul",
  "es6.math.log1p": "Math methods / Math.log1p",
  "es6.math.log10": "Math methods / Math.log10",
  "es6.math.log2": "Math methods / Math.log2",
  "es6.math.sign": "Math methods / Math.sign",
  "es6.math.sinh": "Math methods / Math.sinh",
  "es6.math.tanh": "Math methods / Math.tanh",
  "es6.math.trunc": "Math methods / Math.trunc",
};

const es2016 = {
  "es7.array.includes": "Array.prototype.includes",
};

const es2017 = {
  "es7.object.values": "Object static methods / Object.values",
  "es7.object.entries": "Object static methods / Object.entries",
  "es7.object.get-own-property-descriptors": "Object static methods / Object.getOwnPropertyDescriptors",
  "es7.string.pad-start": "String padding / String.prototype.padStart",
  "es7.string.pad-end": "String padding / String.prototype.padEnd",
};

const stage3 = require("./stage3").builtIns;

module.exports = Object.assign({}, es2015, es2016, es2017, stage3);
