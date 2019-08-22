function isString(value) { return typeof value === "string" || typeof value === "object" && Object.prototype.toString.call(value) === "[object String]"; }

function toLength(value) { var len = toInteger(value); if (len < 0) { return 0; } return Math.min(len, 9007199254740991); }

function toInteger(value) { const number = +value; if (isNaN(number)) { return 0; } if (number === 0 || number === Infinity || number === -Infinity) { return number; } return number > 0 ? Math.floor(number) : -Math.floor(-number); }

function _slice(t, begin, end, step) { if (step === void 0) { step = 1; } step = toInteger(step); if (step === 0 || step === Infinity || step === -Infinity) { throw new Error("Slice step can not be zero, NaN of Infinity"); } var tIsString = isString(t); var tIsArray = Array.isArray(t); if (!tIsArray && !tIsString && (typeof t.slice !== "function" || !_isNativeFunction(t.slice) || Object.prototype.toString.call(t).indexOf("ArrayBuffer") !== -1)) { throw new Error("Slice notation only supports array, string and typed array"); } if (step === 1) { return t.slice(begin, end); } var k, final, low, high; var len = toLength(t.length); if (step < 0) { low = -1; high = len - 1; } else { low = 0; high = len; } if (begin === void 0) { k = step < 0 ? high : low; } else { begin = toInteger(begin); k = begin < 0 ? Math.max(low, len + begin) : Math.min(begin, high); } if (end === void 0) { final = step < 0 ? low : high; } else { end = toInteger(end); final = end < 0 ? Math.max(low, len + end) : Math.min(end, high); } var o; if (tIsString) { o = ""; if (step > 0) { while (k < final) { o += t[k]; k += step; } } else { while (k > final) { o += t[k]; k += step; } } } else { var count = Math.max(Math.floor((final - k) / step), 0), n = 0; o = new Array(count); if (step > 0) { while (k < final) { o[n] = t[k]; k += step; n++; } } else { while (k > final) { o[n] = t[k]; k += step; n++; } } if (!tIsArray) { o = new t.constructor(o); } } return o; }

;

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

var a = [0, 1, 2, 3, 4];

_slice(a, 0, 1, void 0);
