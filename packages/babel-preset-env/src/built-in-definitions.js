// TODO: this is the opposite of built-in-features so maybe generate one from the other?
export const definitions = {
  builtins: {
    Number: ["es.number.constructor"],
    RegExp: ["es.regexp.constructor"],
    Symbol: ["es.object.to-string", "es.symbol"],
    Promise: ["es.object.to-string", "es.promise"],
    Map: [
      "es.object.to-string",
      "es.map",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Set: [
      "es.object.to-string",
      "es.set",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    WeakMap: [
      "es.object.to-string",
      "es.weak-map",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    WeakSet: [
      "es.object.to-string",
      "es.weak-set",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    ArrayBuffer: ["es.object.to-string", "es.array-buffer.constructor"],
    DataView: ["es.object.to-string", "es.data-view"],
    Int8Array: [
      "es.object.to-string",
      "es.typed-array.int8-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Uint8Array: [
      "es.object.to-string",
      "es.typed-array.uint8-array",
      "es.array.iterator",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Uint8ClampedArray: [
      "es.object.to-string",
      "es.typed-array.uint8-clamped-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Int16Array: [
      "es.object.to-string",
      "es.typed-array.int16-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Uint16Array: [
      "es.object.to-string",
      "es.typed-array.uint16-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Int32Array: [
      "es.object.to-string",
      "es.typed-array.int32-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Uint32Array: [
      "es.object.to-string",
      "es.typed-array.uint32-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
    Float32Array: [
      "es.object.to-string",
      "es.typed-array.float32-array",
      "web.dom-collections.iterator",
    ],
    Float64Array: [
      "es.object.to-string",
      "es.typed-array.float64-array",
      "es.array.iterator",
      "web.dom-collections.iterator",
    ],
  },

  instanceMethods: {
    anchor: ["es.string.anchor"],
    big: ["es.string.big"],
    bind: ["es.function.bind"],
    blink: ["es.string.blink"],
    bold: ["es.string.bold"],
    codePointAt: ["es.string.code-point-at"],
    concat: ["es.array.concat"],
    copyWithin: ["es.array.copy-within", "es.typed-array.copy-within"],
    endsWith: ["es.string.ends-with"],
    entries: [
      "es.array.iterator",
      "es.typed-array.iterator",
      "web.dom-collections.iterator",
    ],
    every: ["es.array.is-array", "es.typed-array.every"],
    fill: ["es.array.fill", "es.typed-array.fill"],
    filter: ["es.array.filter", "es.typed-array.filter"],
    find: ["es.array.find", "es.typed-array.find"],
    findIndex: ["es.array.find-index", "es.typed-array.find-index"],
    fixed: ["es.string.fixed"],
    flags: ["es.regexp.flags"],
    fontcolor: ["es.string.fontcolor"],
    fontsize: ["es.string.fontsize"],
    forEach: ["es.array.for-each", "es.typed-array.for-each"],
    join: ["es.typed-array.join"],
    includes: [
      "es.string.includes",
      "es.array.includes",
      "es.typed-array.includes",
    ],
    indexOf: ["es.array.index-of", "es.typed-array.index-of"],
    italic: ["es.string.italics"],
    keys: [
      "es.array.iterator",
      "es.typed-array.iterator",
      "web.dom-collections.iterator",
    ],
    lastIndexOf: ["es.array.last-index-of", "es.typed-array.last-index-of"],
    link: ["es.string.link"],
    match: ["es.string.match"],
    map: ["es.array.map", "es.typed-array.map"],
    name: ["es.function.name"],
    padStart: ["es.string.pad-start"],
    padEnd: ["es.string.pad-end"],
    reduce: ["es.array.reduce", "es.typed-array.reduce"],
    reduceRight: ["es.array.reduce-right", "es.typed-array.reduce-right"],
    repeat: ["es.string.repeat"],
    replace: ["es.string.replace"],
    reverse: ["es.typed-array.reverse"],
    search: ["es.string.search"],
    set: ["es.typed-array.set"],
    slice: ["es.array.slice", "es.array-buffer.slice", "es.typed-array.slice"],
    small: ["es.string.small"],
    some: ["es.array.some", "es.typed-array.some"],
    sort: ["es.array.sort", "es.typed-array.sort"],
    splice: ["es.array.splice"],
    split: ["es.string.split"],
    startsWith: ["es.string.starts-with"],
    strike: ["es.string.strike"],
    sub: ["es.string.sub"],
    subarray: ["es.typed-array.subarray"],
    sup: ["es.string.sup"],
    toISOString: ["es.date.to-iso-string"],
    toJSON: ["es.date.to-json"],
    toLocaleString: ["es.typed-array.to-locale-string"],
    toString: [
      "es.object.to-string",
      "es.date.to-string",
      "es.regexp.to-string",
      "es.typed-array.to-string",
    ],
    trim: ["es.string.trim"],
    values: [
      "es.array.iterator",
      "es.typed-array.iterator",
      "web.dom-collections.iterator",
    ],
    __defineGetter__: ["es.object.define-getter"],
    __defineSetter__: ["es.object.define-setter"],
    __lookupGetter__: ["es.object.lookup-getter"],
    __lookupSetter__: ["es.object.lookup-setter"],
  },

  staticMethods: {
    Array: {
      from: ["es.array.from", "es.string.iterator"],
      isArray: "es.array.is-array",
      of: "es.array.of",
    },

    Date: {
      now: "es.date.now",
    },

    Object: {
      assign: "es.object.assign",
      create: "es.object.create",
      defineProperty: "es.object.define-property",
      defineProperties: "es.object.define-properties",
      entries: "es.object.entries",
      freeze: "es.object.freeze",
      getOwnPropertyDescriptor: "es.object.get-own-property-descriptor",
      getOwnPropertyDescriptors: "es.object.get-own-property-descriptors",
      getOwnPropertyNames: "es.object.get-own-property-names",
      getOwnPropertySymbols: "es.object.get-own-property-symbols",
      getPrototypeOf: "es.object.get-prototype-of",
      is: "es.object.is",
      isExtensible: "es.object.is-extensible",
      isFrozen: "es.object.is-frozen",
      isSealed: "es.object.is-sealed",
      keys: "es.object.keys",
      preventExtensions: "es.object.prevent-extensions",
      seal: "es.object.seal",
      setPrototypeOf: "es.object.set-prototype-of",
      values: "es.object.values",
    },

    Math: {
      acosh: "es.math.acosh",
      asinh: "es.math.asinh",
      atanh: "es.math.atanh",
      cbrt: "es.math.cbrt",
      clz32: "es.math.clz32",
      cosh: "es.math.cosh",
      expm1: "es.math.expm1",
      fround: "es.math.fround",
      hypot: "es.math.hypot",
      imul: "es.math.imul",
      log1p: "es.math.log1p",
      log10: "es.math.log10",
      log2: "es.math.log2",
      sign: "es.math.sign",
      sinh: "es.math.sinh",
      tanh: "es.math.tanh",
      trunc: "es.math.trunc",
    },

    String: {
      fromCodePoint: "es.string.from-code-point",
      raw: "es.string.raw",
    },

    Number: {
      isFinite: "es.number.is-finite",
      isInteger: "es.number.is-integer",
      isSafeInteger: "es.number.is-safe-integer",
      isNaN: "es.number.is-nan",
      parseFloat: "es.number.parse-float",
      parseInt: "es.number.parse-int",
      EPSILON: "es.number.epsilon",
      MIN_SAFE_INTEGER: "es.number.min-safe-integer",
      MAX_SAFE_INTEGER: "es.number.max-safe-integer",
    },

    Promise: {
      all: [
        "es.array.iterator",
        "es.string.iterator",
        "web.dom-collections.iterator",
      ],
      race: [
        "es.array.iterator",
        "es.string.iterator",
        "web.dom-collections.iterator",
      ],
    },

    Reflect: {
      apply: "es.reflect.apply",
      construct: "es.reflect.construct",
      defineProperty: "es.reflect.define-property",
      deleteProperty: "es.reflect.delete-property",
      get: "es.reflect.get",
      getOwnPropertyDescriptor: "es.reflect.get-own-property-descriptor",
      getPrototypeOf: "es.reflect.get-prototype-of",
      has: "es.reflect.has",
      isExtensible: "es.reflect.is-extensible",
      ownKeys: "es.reflect.own-keys",
      preventExtensions: "es.reflect.prevent-extensions",
      set: "es.reflect.set",
      setPrototypeOf: "es.reflect.set-prototype-of",
    },

    Symbol: {
      asyncIterator: "es.symbol.async-iterator",
    },

    ArrayBuffer: {
      isView: ["es.array-buffer.is-view"],
    },

    Int8Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Uint8Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Uint8ClampedArray: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Int16Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Uint16Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Int32Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Uint32Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Float32Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },

    Float64Array: {
      from: "es.typed-array.from",
      of: "es.typed-array.of",
    },
  },
};
