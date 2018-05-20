const basicDataViewSupport = [
  "typed arrays / DataView (Int8)",
  "typed arrays / DataView (Uint8) ",
  "typed arrays / DataView (Int16)",
  "typed arrays / DataView (Uint16)",
  "typed arrays / DataView (Int32)",
  "typed arrays / DataView (Uint32)",
  "typed arrays / DataView (Float32)",
  "typed arrays / DataView (Float64)",
];

const basicTypedArraysSupport = [
  "typed arrays / Int8Array",
  "typed arrays / Uint8Array",
  "typed arrays / Uint8ClampedArray",
  "typed arrays / Int16Array",
  "typed arrays / Uint16Array",
  "typed arrays / Int32Array",
  "typed arrays / Uint32Array",
  "typed arrays / Float32Array",
  "typed arrays / Float64Array",
  "typed arrays / correct prototype chains",
];

const basicTypedArrayConstructorsSupport = basicTypedArraysSupport.concat([
  "typed arrays / constructors require new",
  "typed arrays / constructors accept generic iterables",
  "typed arrays / %TypedArray%[Symbol.species]",
]);

const basicSymbolsSupport = [
  "Symbol",
  "Object static methods / Object.getOwnPropertySymbols",
];

const es = {
  "es.symbol": { features: basicSymbolsSupport },
  "es.symbol.async-iterator": { features: basicSymbolsSupport.concat("Asynchronous Iterators") },
  "es.symbol.has-instance": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.hasInstance") },
  "es.symbol.is-concat-spreadable": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.isConcatSpreadable") },
  "es.symbol.iterator": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.iterator") },
  "es.symbol.match": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.match") },
  "es.symbol.replace": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.replace") },
  "es.symbol.search": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.search") },
  "es.symbol.species": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.species") },
  "es.symbol.split": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.split") },
  "es.symbol.to-primitive": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.toPrimitive") },
  "es.symbol.to-string-tag": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.toStringTag") },
  "es.symbol.unscopables": { features: basicSymbolsSupport.concat("well-known symbols / Symbol.unscopables") },

  "es.object.assign": { features: basicSymbolsSupport.concat("Object static methods / Object.assign") },
  "es.object.create": "Object static methods / Object.create",
  "es.object.define-property": "Object static methods / Object.defineProperty",
  "es.object.define-properties": "Object static methods / Object.defineProperties",
  "es.object.get-own-property-descriptor": "Object static methods accept primitives / Object.getOwnPropertyDescriptor",
  "es.object.get-own-property-descriptors": "Object static methods / Object.getOwnPropertyDescriptors",
  "es.object.get-prototype-of": "Object static methods accept primitives / Object.getPrototypeOf",
  "es.object.keys": "Object static methods accept primitives / Object.keys",
  "es.object.values": "Object static methods / Object.values",
  "es.object.entries": "Object static methods / Object.entries",
  "es.object.get-own-property-names": "Object static methods accept primitives / Object.getOwnPropertyNames",
  "es.object.freeze": "Object static methods accept primitives / Object.freeze",
  "es.object.seal": "Object static methods accept primitives / Object.seal",
  "es.object.prevent-extensions": "Object static methods accept primitives / Object.preventExtensions",
  "es.object.is-frozen": "Object static methods accept primitives / Object.isFrozen",
  "es.object.is-sealed": "Object static methods accept primitives / Object.isSealed",
  "es.object.is-extensible": "Object static methods accept primitives / Object.isExtensible",
  "es.object.is": "Object static methods / Object.is",
  "es.object.set-prototype-of": "Object static methods / Object.setPrototypeOf",
  "es.object.to-string": "well-known symbols / Symbol.toStringTag",
  "es.object.define-getter": {
    features: [
      "Object.prototype getter/setter methods / __defineGetter__",
      "Object.prototype getter/setter methods / __defineGetter__, symbols",
      "Object.prototype getter/setter methods / __defineGetter__, ToObject(this)",
    ]
  },
  "es.object.define-setter": {
    features: [
      "Object.prototype getter/setter methods / __defineSetter__",
      "Object.prototype getter/setter methods / __defineSetter__, symbols",
      "Object.prototype getter/setter methods / __defineSetter__, ToObject(this)",
    ]
  },
  "es.object.lookup-getter": {
    features: [
      "Object.prototype getter/setter methods / __lookupGetter__",
      "Object.prototype getter/setter methods / __lookupGetter__, prototype chain",
      "Object.prototype getter/setter methods / __lookupGetter__, symbols",
      "Object.prototype getter/setter methods / __lookupGetter__, ToObject(this)",
      "Object.prototype getter/setter methods / __lookupGetter__, data properties can shadow accessors",
    ]
  },
  "es.object.lookup-setter": {
    features: [
      "Object.prototype getter/setter methods / __lookupSetter__",
      "Object.prototype getter/setter methods / __lookupSetter__, prototype chain",
      "Object.prototype getter/setter methods / __lookupSetter__, symbols",
      "Object.prototype getter/setter methods / __lookupSetter__, ToObject(this)",
      "Object.prototype getter/setter methods / __lookupSetter__, data properties can shadow accessors",
    ]
  },

  "es.function.bind": "Function.prototype.bind",
  "es.function.name": {
    features: [
      "function \"name\" property / function statements",
      "function \"name\" property / function expressions",
    ]
  },
  "es.function.has-instance": "well-known symbols / Symbol.hasInstance",

  "es.array.is-array": "Array methods / Array.isArray",
  "es.array.from": "Array static methods / Array.from",
  "es.array.of": "Array static methods / Array.of",
  "es.array.concat": {
    features: [
      "well-known symbols / Symbol.isConcatSpreadable",
      "well-known symbols / Symbol.species, Array.prototype.concat",
    ]
  },
  "es.array.copy-within": "Array.prototype methods / Array.prototype.copyWithin",
  "es.array.every": "Array methods / Array.prototype.every",
  "es.array.fill": "Array.prototype methods / Array.prototype.fill",
  "es.array.filter": "well-known symbols / Symbol.species, Array.prototype.filter",
  "es.array.find": "Array.prototype methods / Array.prototype.find",
  "es.array.find-index": "Array.prototype methods / Array.prototype.findIndex",
  "es.array.for-each": "Array methods / Array.prototype.forEach",
  "es.array.includes": "Array.prototype.includes / Array.prototype.includes",
  "es.array.index-of": "Array methods / Array.prototype.indexOf",
  // "es.array.join": "", required tests for that
  "es.array.last-index-of": "Array methods / Array.prototype.lastIndexOf",
  "es.array.map": "well-known symbols / Symbol.species, Array.prototype.map",
  "es.array.reduce": "Array methods / Array.prototype.reduce",
  "es.array.reduce-right": "Array methods / Array.prototype.reduceRight",
  "es.array.slice": "well-known symbols / Symbol.species, Array.prototype.slice",
  "es.array.some": "Array methods / Array.prototype.some",
  "es.array.sort": "Array methods / Array.prototype.sort",
  "es.array.splice": "well-known symbols / Symbol.species, Array.prototype.splice",
  "es.array.iterator": {
    features: [
      "Array.prototype methods / Array.prototype.keys",
      "Array.prototype methods / Array.prototype.values",
      "Array.prototype methods / Array.prototype.entries",
      "Array.prototype methods / Array.prototype[Symbol.iterator]",
    ],
  },
  "es.array.species": "Array static methods / Array[Symbol.species]",

  "es.string.from-code-point": "String static methods / String.fromCodePoint",
  "es.string.raw": "String static methods / String.raw",
  "es.string.match": "RegExp.prototype properties / RegExp.prototype[Symbol.match]",
  "es.string.replace": "RegExp.prototype properties / RegExp.prototype[Symbol.replace]",
  "es.string.split": "RegExp.prototype properties / RegExp.prototype[Symbol.split]",
  "es.string.search": "RegExp.prototype properties / RegExp.prototype[Symbol.search]",
  "es.string.trim": "String properties and methods / String.prototype.trim", // required additional tests
  "es.string.code-point-at": "String.prototype methods / String.prototype.codePointAt",
  "es.string.ends-with": "String.prototype methods / String.prototype.endsWith",
  "es.string.includes": "String.prototype methods / String.prototype.includes",
  "es.string.repeat": "String.prototype methods / String.prototype.repeat",
  "es.string.starts-with": "String.prototype methods / String.prototype.startsWith",
  "es.string.pad-start": "String padding / String.prototype.padStart",
  "es.string.pad-end": "String padding / String.prototype.padEnd",
  "es.string.iterator": "String.prototype methods / String.prototype[Symbol.iterator]",

  "es.string.anchor": "String.prototype HTML methods",
  "es.string.big": "String.prototype HTML methods",
  "es.string.blink": "String.prototype HTML methods",
  "es.string.bold": "String.prototype HTML methods",
  "es.string.fixed": "String.prototype HTML methods",
  "es.string.fontcolor": "String.prototype HTML methods",
  "es.string.fontsize": "String.prototype HTML methods",
  "es.string.italics": "String.prototype HTML methods",
  "es.string.link": "String.prototype HTML methods",
  "es.string.small": "String.prototype HTML methods",
  "es.string.strike": "String.prototype HTML methods",
  "es.string.sub": "String.prototype HTML methods",
  "es.string.sup": "String.prototype HTML methods",

  "es.regexp.constructor":  {
    features: [
      "miscellaneous / RegExp constructor can alter flags",
      "well-known symbols / Symbol.match, RegExp constructor",
    ],
  },
  "es.regexp.to-string": "miscellaneous / RegExp.prototype.toString generic and uses \"flags\" property",
  "es.regexp.flags": "RegExp.prototype properties / RegExp.prototype.flags",

  // "es.parse-int": "", required tests for that
  // "es.parse-float": "", required tests for that

  "es.number.constructor": {
    features: [
      "octal and binary literals / octal supported by Number()",
      "octal and binary literals / binary supported by Number()",
    ],
  },
  "es.number.epsilon": "Number properties / Number.EPSILON",
  "es.number.is-finite": "Number properties / Number.isFinite",
  "es.number.is-integer": "Number properties / Number.isInteger",
  "es.number.is-safe-integer": "Number properties / Number.isSafeInteger",
  "es.number.is-nan": "Number properties / Number.isNaN",
  "es.number.min-safe-integer": "Number properties / Number.MIN_SAFE_INTEGER",
  "es.number.max-safe-integer": "Number properties / Number.MAX_SAFE_INTEGER",
  "es.number.parse-float": "Number properties / Number.parseFloat",
  "es.number.parse-int": "Number properties / Number.parseInt",
  // "es.number.to-fixed": "", required tests for that
  // "es.number.to-precision": "", required tests for that

  "es.math.acosh": "Math methods / Math.acosh",
  "es.math.asinh": "Math methods / Math.asinh",
  "es.math.atanh": "Math methods / Math.atanh",
  "es.math.cbrt": "Math methods / Math.cbrt",
  "es.math.clz32": "Math methods / Math.clz32",
  "es.math.cosh": "Math methods / Math.cosh",
  "es.math.expm1": "Math methods / Math.expm1",
  "es.math.fround": "Math methods / Math.fround",
  "es.math.hypot": "Math methods / Math.hypot",
  "es.math.imul": "Math methods / Math.imul",
  "es.math.log1p": "Math methods / Math.log1p",
  "es.math.log10": "Math methods / Math.log10",
  "es.math.log2": "Math methods / Math.log2",
  "es.math.sign": "Math methods / Math.sign",
  "es.math.sinh": "Math methods / Math.sinh",
  "es.math.tanh": "Math methods / Math.tanh",
  "es.math.trunc": "Math methods / Math.trunc",
  "es.math.to-string-tag": { features: basicSymbolsSupport.concat( "well-known symbols / Symbol.toStringTag, misc. built-ins") },

  "es.json.to-string-tag": { features: basicSymbolsSupport.concat( "well-known symbols / Symbol.toStringTag, misc. built-ins") },

  "es.promise": {
    features: [
      // required unhandled rejection tracking tests
      "Promise",
      "well-known symbols / Symbol.species, Promise.prototype.then",
    ]
  },
  "es.promise.finally": "Promise.prototype.finally",

  "es.map": "Map",
  // This is explicit due to prevent the stage-1 Set proposals under the
  // category "Set methods" from being included.
  "es.set": {
    features: [
      "Set / basic functionality",
      "Set / constructor arguments",
      "Set / constructor requires new",
      "Set / constructor accepts null",
      "Set / constructor invokes add",
      "Set / iterator closing",
      "Set / Set.prototype.add returns this",
      "Set / -0 key converts to +0",
      "Set / Set.prototype.size",
      "Set / Set.prototype.delete",
      "Set / Set.prototype.clear",
      "Set / Set.prototype.forEach",
      "Set / Set.prototype.keys",
      "Set / Set.prototype.values",
      "Set / Set.prototype.entries",
      "Set / Set.prototype[Symbol.iterator]",
      "Set / Set.prototype isn't an instance",
      "Set / Set iterator prototype chain",
      "Set / Set[Symbol.species]",
    ],
  },
  "es.weak-map": "WeakMap",
  "es.weak-set": "WeakSet",

  "es.date.now": "Date methods / Date.now",
  "es.date.to-json": "Date methods / Date.prototype.toJSON",
  "es.date.to-iso-string": "Date methods / Date.prototype.toISOString",
  "es.date.to-string": "miscellaneous / Invalid Date",
  "es.date.to-primitive": "Date.prototype[Symbol.toPrimitive]",

  "es.reflect.apply": "Reflect / Reflect.apply",
  "es.reflect.construct": "Reflect / Reflect.construct",
  "es.reflect.define-property": "Reflect / Reflect.defineProperty",
  "es.reflect.delete-property": "Reflect / Reflect.deleteProperty",
  "es.reflect.get": "Reflect / Reflect.get",
  "es.reflect.get-own-property-descriptor": "Reflect / Reflect.getOwnPropertyDescriptor",
  "es.reflect.get-prototype-of": "Reflect / Reflect.getPrototypeOf",
  "es.reflect.has": "Reflect / Reflect.has",
  "es.reflect.is-extensible": "Reflect / Reflect.isExtensible",
  "es.reflect.own-keys": "Reflect / Reflect.ownKeys",
  "es.reflect.prevent-extensions": "Reflect / Reflect.preventExtensions",
  "es.reflect.set": "Reflect / Reflect.set",
  "es.reflect.set-prototype-of": "Reflect / Reflect.setPrototypeOf",

  "es.array-buffer.constructor": {
    features: basicDataViewSupport.concat("typed arrays / ArrayBuffer[Symbol.species]"),
  },
  "es.array-buffer.is-view": {
    features: basicDataViewSupport.concat(basicTypedArraysSupport),
  },
  "es.array-buffer.slice": {
    // required additional tests
    features: basicDataViewSupport,
  },
  "es.data-view": {
    features: basicDataViewSupport,
  },
  "es.typed-array.int8-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.uint8-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.uint8-clamped-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.int16-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.uint16-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.int32-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.uint32-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.float32-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.float64-array": {
    features: basicTypedArrayConstructorsSupport
  },
  "es.typed-array.from": {
    features: basicTypedArrayConstructorsSupport.concat("typed arrays / %TypedArray%.from"),
  },
  "es.typed-array.of": {
    features: basicTypedArrayConstructorsSupport.concat("typed arrays / %TypedArray%.of"),
  },
  "es.typed-array.copy-within": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.copyWithin"),
  },
  "es.typed-array.every": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.every"),
  },
  "es.typed-array.fill": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.fill"),
  },
  "es.typed-array.filter": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.filter"),
  },
  "es.typed-array.find": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.find"),
  },
  "es.typed-array.find-index": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.findIndex"),
  },
  "es.typed-array.for-each": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.forEach"),
  },
  "es.typed-array.includes": {
    features: basicTypedArraysSupport.concat("Array.prototype.includes / %TypedArray%.prototype.includes"),
  },
  "es.typed-array.index-of": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.indexOf"),
  },
  "es.typed-array.iterator": {
    features: basicTypedArraysSupport.concat([
      "typed arrays / %TypedArray%.prototype.keys",
      "typed arrays / %TypedArray%.prototype.values",
      "typed arrays / %TypedArray%.prototype.entries",
      "typed arrays / %TypedArray%.prototype[Symbol.iterator]",
    ]),
  },
  "es.typed-array.join": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.join"),
  },
  "es.typed-array.last-index-of": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.lastIndexOf"),
  },
  "es.typed-array.map": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.map"),
  },
  "es.typed-array.reduce": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.reduce"),
  },
  "es.typed-array.reduce-right": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.reduceRight"),
  },
  "es.typed-array.reverse": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.reverse"),
  },
  "es.typed-array.set": {
    // required additional tests
    features: basicTypedArraysSupport,
  },
  "es.typed-array.slice": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.slice"),
  },
  "es.typed-array.some": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.some"),
  },
  "es.typed-array.sort": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.sort"),
  },
  "es.typed-array.subarray": {
    features: basicTypedArraysSupport.concat("typed arrays / %TypedArray%.prototype.subarray"),
  },
  "es.typed-array.to-locale-string": {
    // required additional tests
    features: basicTypedArraysSupport,
  },
  "es.typed-array.to-string": {
    // required additional tests
    features: basicTypedArraysSupport,
  },
};

const proposals = require("./shipped-proposals").builtIns;

module.exports = Object.assign({}, es, proposals);
