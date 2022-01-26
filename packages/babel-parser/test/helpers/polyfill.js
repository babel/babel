// TODO(Babel 8): Remove this file.
// We run these tests as far back as Node 6, so we need these there.

if (!Object.entries) {
  Object.entries = object => Object.keys(object).map(key => [key, object[key]]);
}

// From: https://github.com/tc39/proposal-object-from-entries/blob/main/polyfill.js
if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    const obj = {};

    for (const pair of entries) {
      if (Object(pair) !== pair) {
        throw new TypeError("iterable for fromEntries should yield objects");
      }

      // Consistency with Map: contract is that entry has "0" and "1" keys, not
      // that it is an array or iterable.

      const { 0: key, 1: val } = pair;

      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: val,
      });
    }

    return obj;
  };
}
