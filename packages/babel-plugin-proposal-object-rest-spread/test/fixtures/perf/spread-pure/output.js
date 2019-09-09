function _combineRestSpread(source, keysToRemove, toAdd) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (keysToRemove.indexOf(key) >= 0) continue; target[key] = source[key]; } Object.keys(toAdd).forEach(function (key) { _defineProperty(target, key, toAdd[key]); }); return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  a,
  b
} = obj;

const abc = _combineRestSpread(obj, ["a", "b"], {
  c: 123
});
