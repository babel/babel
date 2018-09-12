import semver from "semver";

function hasMinVersion(minVersion, runtimeVersion) {
  // If the range is unavailable, we're running the script during Babel's
  // build process, and we want to assume that all versions are satisfied so
  // that the built output will include all definitions.
  if (!runtimeVersion) return true;

  // semver.intersects() has some surprising behavior with comparing ranges
  // with preprelease versions. We add '^' to ensure that we are always
  // comparing ranges with ranges, which sidesteps this logic.
  // For example:
  //
  //   semver.intersects(`<7.0.1`, "7.0.0-beta.0") // false - surprising
  //   semver.intersects(`<7.0.1`, "^7.0.0-beta.0") // true - expected
  //
  // This is because the first falls back to
  //
  //   semver.satisfies("7.0.0-beta.0", `<7.0.1`) // false - surprising
  //
  // and this fails because a prerelease version can only satisfy a range
  // if it is a prerelease within the same major/minor/patch range.
  //
  // Note: If this is found to have issues, please also revist the logic in
  // babel-core's availableHelper() API.
  if (semver.valid(runtimeVersion)) runtimeVersion = `^${runtimeVersion}`;

  return (
    !semver.intersects(`<${minVersion}`, runtimeVersion) &&
    !semver.intersects(`>=8.0.0`, runtimeVersion)
  );
}

export default runtimeVersion => {
  // Conditionally include 'Math' because it was not included in the 7.0.0
  // release of '@babel/runtime'. See issue https://github.com/babel/babel/pull/8616.
  const includeMathModule = hasMinVersion("7.0.1", runtimeVersion);

  return {
    builtins: {
      Symbol: "symbol",
      Promise: "promise",
      Map: "map",
      WeakMap: "weak-map",
      Set: "set",
      WeakSet: "weak-set",
      setImmediate: "set-immediate",
      clearImmediate: "clear-immediate",
      parseFloat: "parse-float",
      parseInt: "parse-int",
    },

    methods: {
      Array: {
        from: "array/from",
        isArray: "array/is-array",
        of: "array/of",
      },

      JSON: {
        stringify: "json/stringify",
      },

      Object: {
        assign: "object/assign",
        create: "object/create",
        defineProperties: "object/define-properties",
        defineProperty: "object/define-property",
        entries: "object/entries",
        freeze: "object/freeze",
        getOwnPropertyDescriptor: "object/get-own-property-descriptor",
        getOwnPropertyDescriptors: "object/get-own-property-descriptors",
        getOwnPropertyNames: "object/get-own-property-names",
        getOwnPropertySymbols: "object/get-own-property-symbols",
        getPrototypeOf: "object/get-prototype-of",
        isExtensible: "object/is-extensible",
        isFrozen: "object/is-frozen",
        isSealed: "object/is-sealed",
        is: "object/is",
        keys: "object/keys",
        preventExtensions: "object/prevent-extensions",
        seal: "object/seal",
        setPrototypeOf: "object/set-prototype-of",
        values: "object/values",
      },

      ...(includeMathModule
        ? {
            Math: {
              acosh: "math/acosh",
              asinh: "math/asinh",
              atanh: "math/atanh",
              cbrt: "math/cbrt",
              clz32: "math/clz32",
              cosh: "math/cosh",
              expm1: "math/expm1",
              fround: "math/fround",
              hypot: "math/hypot",
              imul: "math/imul",
              log10: "math/log10",
              log1p: "math/log1p",
              log2: "math/log2",
              sign: "math/sign",
              sinh: "math/sinh",
              tanh: "math/tanh",
              trunc: "math/trunc",
            },
          }
        : {}),

      Symbol: {
        asyncIterator: "symbol/async-iterator",
        for: "symbol/for",
        hasInstance: "symbol/has-instance",
        isConcatSpreadable: "symbol/is-concat-spreadable",
        iterator: "symbol/iterator",
        keyFor: "symbol/key-for",
        match: "symbol/match",
        replace: "symbol/replace",
        search: "symbol/search",
        species: "symbol/species",
        split: "symbol/split",
        toPrimitive: "symbol/to-primitive",
        toStringTag: "symbol/to-string-tag",
        unscopables: "symbol/unscopables",
      },

      String: {
        at: "string/at",
        fromCodePoint: "string/from-code-point",
        raw: "string/raw",
      },

      Number: {
        EPSILON: "number/epsilon",
        isFinite: "number/is-finite",
        isInteger: "number/is-integer",
        isNaN: "number/is-nan",
        isSafeInteger: "number/is-safe-integer",
        MAX_SAFE_INTEGER: "number/max-safe-integer",
        MIN_SAFE_INTEGER: "number/min-safe-integer",
        parseFloat: "number/parse-float",
        parseInt: "number/parse-int",
      },

      Reflect: {
        apply: "reflect/apply",
        construct: "reflect/construct",
        defineProperty: "reflect/define-property",
        deleteProperty: "reflect/delete-property",
        getOwnPropertyDescriptor: "reflect/get-own-property-descriptor",
        getPrototypeOf: "reflect/get-prototype-of",
        get: "reflect/get",
        has: "reflect/has",
        isExtensible: "reflect/is-extensible",
        ownKeys: "reflect/own-keys",
        preventExtensions: "reflect/prevent-extensions",
        setPrototypeOf: "reflect/set-prototype-of",
        set: "reflect/set",
      },

      Date: {
        now: "date/now",
      },
    },
  };
};
