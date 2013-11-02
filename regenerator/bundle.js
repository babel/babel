!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.regenerator=e():"undefined"!=typeof global?global.regenerator=e():"undefined"!=typeof self&&(self.regenerator=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


//
// The shims in this file are not fully implemented shims for the ES5
// features, but do work for the particular usecases there is in
// the other modules.
//

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Array.isArray is supported in IE9
function isArray(xs) {
  return toString.call(xs) === '[object Array]';
}
exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;

// Array.prototype.indexOf is supported in IE9
exports.indexOf = function indexOf(xs, x) {
  if (xs.indexOf) return xs.indexOf(x);
  for (var i = 0; i < xs.length; i++) {
    if (x === xs[i]) return i;
  }
  return -1;
};

// Array.prototype.filter is supported in IE9
exports.filter = function filter(xs, fn) {
  if (xs.filter) return xs.filter(fn);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (fn(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
};

// Array.prototype.forEach is supported in IE9
exports.forEach = function forEach(xs, fn, self) {
  if (xs.forEach) return xs.forEach(fn, self);
  for (var i = 0; i < xs.length; i++) {
    fn.call(self, xs[i], i, xs);
  }
};

// Array.prototype.map is supported in IE9
exports.map = function map(xs, fn) {
  if (xs.map) return xs.map(fn);
  var out = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    out[i] = fn(xs[i], i, xs);
  }
  return out;
};

// Array.prototype.reduce is supported in IE9
exports.reduce = function reduce(array, callback, opt_initialValue) {
  if (array.reduce) return array.reduce(callback, opt_initialValue);
  var value, isValueSet = false;

  if (2 < arguments.length) {
    value = opt_initialValue;
    isValueSet = true;
  }
  for (var i = 0, l = array.length; l > i; ++i) {
    if (array.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, array[i], i, array);
      }
      else {
        value = array[i];
        isValueSet = true;
      }
    }
  }

  return value;
};

// String.prototype.substr - negative index don't work in IE8
if ('ab'.substr(-1) !== 'b') {
  exports.substr = function (str, start, length) {
    // did we get a negative start, calculate how much it is from the beginning of the string
    if (start < 0) start = str.length + start;

    // call the original function
    return str.substr(start, length);
  };
} else {
  exports.substr = function (str, start, length) {
    return str.substr(start, length);
  };
}

// String.prototype.trim is supported in IE9
exports.trim = function (str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
};

// Function.prototype.bind is supported in IE9
exports.bind = function () {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  if (fn.bind) return fn.bind.apply(fn, args);
  var self = args.shift();
  return function () {
    fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
  };
};

// Object.create is supported in IE9
function create(prototype, properties) {
  var object;
  if (prototype === null) {
    object = { '__proto__' : null };
  }
  else {
    if (typeof prototype !== 'object') {
      throw new TypeError(
        'typeof prototype[' + (typeof prototype) + '] != \'object\''
      );
    }
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
    object.__proto__ = prototype;
  }
  if (typeof properties !== 'undefined' && Object.defineProperties) {
    Object.defineProperties(object, properties);
  }
  return object;
}
exports.create = typeof Object.create === 'function' ? Object.create : create;

// Object.keys and Object.getOwnPropertyNames is supported in IE9 however
// they do show a description and number property on Error objects
function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}

function keysShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var result = [];
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// getOwnPropertyNames is almost the same as Object.keys one key feature
//  is that it returns hidden properties, since that can't be implemented,
//  this feature gets reduced so it just shows the length property on arrays
function propertyShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.getOwnPropertyNames called on a non-object");
  }

  var result = keysShim(object);
  if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
    result.push('length');
  }
  return result;
}

var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ?
  Object.getOwnPropertyNames : propertyShim;

if (new Error().hasOwnProperty('description')) {
  var ERROR_PROPERTY_FILTER = function (obj, array) {
    if (toString.call(obj) === '[object Error]') {
      array = exports.filter(array, function (name) {
        return name !== 'description' && name !== 'number' && name !== 'message';
      });
    }
    return array;
  };

  exports.keys = function (object) {
    return ERROR_PROPERTY_FILTER(object, keys(object));
  };
  exports.getOwnPropertyNames = function (object) {
    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
  };
} else {
  exports.keys = keys;
  exports.getOwnPropertyNames = getOwnPropertyNames;
}

// Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
function valueObject(value, key) {
  return { value: value[key] };
}

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  try {
    Object.getOwnPropertyDescriptor({'a': 1}, 'a');
    exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  } catch (e) {
    // IE8 dom element issue - use a try catch and default to valueObject
    exports.getOwnPropertyDescriptor = function (value, key) {
      try {
        return Object.getOwnPropertyDescriptor(value, key);
      } catch (e) {
        return valueObject(value, key);
      }
    };
  }
} else {
  exports.getOwnPropertyDescriptor = valueObject;
}

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// UTILITY
var util = require('util');
var shims = require('_shims');
var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  this.message = options.message || getMessage(this);
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = shims.keys(a),
        kb = shims.keys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};
},{"_shims":1,"util":5}],3:[function(require,module,exports){

// not implemented
// The reason for having an empty file and not throwing is to allow
// untraditional implementation of this module.

},{}],4:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util');
var shims = require('_shims');

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = shims.substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(shims.filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(shims.filter(paths, function(p, index) {
    if (!util.isString(p)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

},{"__browserify_process":6,"_shims":1,"util":5}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var shims = require('_shims');

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  shims.forEach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = shims.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = shims.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  shims.forEach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = shims.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (shims.indexOf(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = shims.reduce(output, function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return shims.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.binarySlice === 'function'
  ;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = shims.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = shims.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"_shims":1}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],7:[function(require,module,exports){
/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var types = require("ast-types");
var isArray = types.builtInTypes.array;
var b = types.builders;
var n = types.namedTypes;
var leap = require("./leap");
var meta = require("./meta");
var hasOwn = Object.prototype.hasOwnProperty;

function Emitter(contextId) {
  assert.ok(this instanceof Emitter);
  n.Identifier.assert(contextId);

  Object.defineProperties(this, {
    // In order to make sure the context object does not collide with
    // anything in the local scope, we might have to rename it, so we
    // refer to it symbolically instead of just assuming that it will be
    // called "context".
    contextId: { value: contextId },

    // An append-only list of Statements that grows each time this.emit is
    // called.
    listing: { value: [] },

    // A sparse array whose keys correspond to locations in this.listing
    // that have been marked as branch/jump targets.
    marked: { value: [true] },

    // The last location will be marked when this.getDispatchLoop is
    // called.
    finalLoc: { value: loc() }
  });

  // The .leapManager property needs to be defined by a separate
  // defineProperties call so that .finalLoc will be visible to the
  // leap.LeapManager constructor.
  Object.defineProperties(this, {
    // Each time we evaluate the body of a loop, we tell this.leapManager
    // to enter a nested loop context that determines the meaning of break
    // and continue statements therein.
    leapManager: { value: new leap.LeapManager(this) }
  });
}

var Ep = Emitter.prototype;
exports.Emitter = Emitter;

// Offsets into this.listing that could be used as targets for branches or
// jumps are represented as numeric Literal nodes. This representation has
// the amazingly convenient benefit of allowing the exact value of the
// location to be determined at any time, even after generating code that
// refers to the location.
function loc() {
  return b.literal(-1);
}

// Sets the exact value of the given location to the offset of the next
// Statement emitted.
Ep.mark = function(loc) {
  n.Literal.assert(loc);
  var index = this.listing.length;
  loc.value = index;
  this.marked[index] = true;
  return loc;
};

Ep.emit = function(node) {
  if (n.Expression.check(node))
    node = b.expressionStatement(node);
  n.Statement.assert(node);
  this.listing.push(node);
};

// Shorthand for emitting assignment statements. This will come in handy
// for assignments to temporary variables.
Ep.emitAssign = function(lhs, rhs) {
  this.emit(this.assign(lhs, rhs));
  return lhs;
};

// Shorthand for an assignment statement.
Ep.assign = function(lhs, rhs) {
  return b.expressionStatement(
    b.assignmentExpression("=", lhs, rhs));
};

// Convenience function for generating expressions like context.next,
// context.sent, and context.rval.
Ep.contextProperty = function(name) {
  return b.memberExpression(
    this.contextId,
    b.identifier(name),
    false
  );
};

var volatileContextPropertyNames = {
  next: true,
  sent: true,
  rval: true,
  thrown: true
};

// A "volatile" context property is a MemberExpression like context.sent
// that should probably be stored in a temporary variable when there's a
// possibility the property will get overwritten.
Ep.isVolatileContextProperty = function(expr) {
  if (n.MemberExpression.check(expr)) {
    if (expr.computed) {
      // If it's a computed property such as context[couldBeAnything],
      // assume the worst in terms of volatility.
      return true;
    }

    if (n.Identifier.check(expr.object) &&
        n.Identifier.check(expr.property) &&
        expr.object.name === this.contextId.name &&
        hasOwn.call(volatileContextPropertyNames,
                    expr.property.name)) {
      return true;
    }
  }

  return false;
};

// Shorthand for setting context.rval and jumping to `context.stop()`.
Ep.stop = function(rval) {
  if (rval) {
    this.setReturnValue(rval);
  }

  this.jump(this.finalLoc);
};

Ep.setReturnValue = function(valuePath) {
  n.Expression.assert(valuePath.value);

  this.emitAssign(
    this.contextProperty("rval"),
    this.explodeExpression(valuePath)
  );
};

Ep.clearPendingException = function(assignee) {
  var cp = this.contextProperty("thrown");

  if (assignee) {
    this.emitAssign(assignee, cp);
  }

  this.emit(b.unaryExpression("delete", cp));
};

// Emits code for an unconditional jump to the given location, even if the
// exact value of the location is not yet known.
Ep.jump = function(toLoc) {
  this.emitAssign(this.contextProperty("next"), toLoc);
  this.emit(b.breakStatement());
};

// Conditional jump.
Ep.jumpIf = function(test, toLoc) {
  n.Expression.assert(test);
  n.Literal.assert(toLoc);

  this.emit(b.ifStatement(
    test,
    b.blockStatement([
      this.assign(this.contextProperty("next"), toLoc),
      b.breakStatement()
    ])
  ));
};

// Conditional jump, with the condition negated.
Ep.jumpIfNot = function(test, toLoc) {
  n.Expression.assert(test);
  n.Literal.assert(toLoc);

  this.emit(b.ifStatement(
    b.unaryExpression("!", test),
    b.blockStatement([
      this.assign(this.contextProperty("next"), toLoc),
      b.breakStatement()
    ])
  ));
};

// Returns a unique MemberExpression that can be used to store and
// retrieve temporary values. Since the object of the member expression is
// the context object, which is presumed to coexist peacefully with all
// other local variables, and since we just increment `nextTempId`
// monotonically, uniqueness is assured.
var nextTempId = 0;
Ep.makeTempVar = function() {
  return this.contextProperty("t" + nextTempId++);
};

Ep.getContextFunction = function() {
  return b.functionExpression(
    null, // Anonymous.
    [this.contextId],
    b.blockStatement([this.getDispatchLoop()]),
    false, // Not a generator anymore!
    false // Nor an expression.
  );
};

// Turns this.listing into a loop of the form
//
//   while (1) switch (context.next) {
//   case 0:
//   ...
//   case n:
//     return context.stop();
//   }
//
// Each marked location in this.listing will correspond to one generated
// case statement.
Ep.getDispatchLoop = function() {
  var self = this;
  var cases = [];
  var current;

  // If we encounter a break, continue, or return statement in a switch
  // case, we can skip the rest of the statements until the next case.
  var alreadyEnded = false;

  self.listing.forEach(function(stmt, i) {
    if (self.marked.hasOwnProperty(i)) {
      cases.push(b.switchCase(
        b.literal(i),
        current = []));
      alreadyEnded = false;
    }

    if (!alreadyEnded) {
      current.push(stmt);
      if (isSwitchCaseEnder(stmt))
        alreadyEnded = true;
    }
  });

  // Now that we know how many statements there will be in this.listing,
  // we can finally resolve this.finalLoc.value.
  this.finalLoc.value = this.listing.length;

  cases.push(
    b.switchCase(this.finalLoc, [
      // Intentionally fall through to the "end" case...
    ]),

    // So that the runtime can jump to the final location without having
    // to know its offset, we provide the "end" case as a synonym.
    b.switchCase(b.literal("end"), [
      // This will check/clear both context.thrown and context.rval.
      b.returnStatement(
        b.callExpression(this.contextProperty("stop"), [])
      )
    ])
  );

  return b.whileStatement(
    b.literal(1),
    b.switchStatement(this.contextProperty("next"), cases)
  );
};

// See comment above re: alreadyEnded.
function isSwitchCaseEnder(stmt) {
  return n.BreakStatement.check(stmt)
      || n.ContinueStatement.check(stmt)
      || n.ReturnStatement.check(stmt)
      || n.ThrowStatement.check(stmt);
}

// All side effects must be realized in order.

// If any subexpression harbors a leap, all subexpressions must be
// neutered of side effects.

// No destructive modification of AST nodes.

Ep.explode = function(path, ignoreResult) {
  assert.ok(path instanceof types.NodePath);

  var node = path.value;
  var self = this;

  n.Node.assert(node);

  if (n.Statement.check(node))
    return self.explodeStatement(path);

  if (n.Expression.check(node))
    return self.explodeExpression(path, ignoreResult);

  if (n.Declaration.check(node))
    throw getDeclError(node);

  switch (node.type) {
  case "Program":
    return path.get("body").map(
      self.explodeStatement,
      self
    );

  case "VariableDeclarator":
    throw getDeclError(node);

  // These node types should be handled by their parent nodes
  // (ObjectExpression, SwitchStatement, and TryStatement, respectively).
  case "Property":
  case "SwitchCase":
  case "CatchClause":
    throw new Error(
      node.type + " nodes should be handled by their parents");

  default:
    throw new Error(
      "unknown Node of type " +
        JSON.stringify(node.type));
  }
};

function getDeclError(node) {
  return new Error(
    "all declarations should have been transformed into " +
    "assignments before the Exploder began its work: " +
    JSON.stringify(node));
}

Ep.explodeStatement = function(path, labelId) {
  assert.ok(path instanceof types.NodePath);

  var stmt = path.value;
  var self = this;

  n.Statement.assert(stmt);

  if (labelId) {
    n.Identifier.assert(labelId);
  } else {
    labelId = null;
  }

  // Explode BlockStatement nodes even if they do not contain a yield,
  // because we don't want or need the curly braces.
  if (n.BlockStatement.check(stmt)) {
    return path.get("body").each(
      self.explodeStatement,
      self
    );
  }

  if (!meta.containsLeap(stmt)) {
    // Technically we should be able to avoid emitting the statement
    // altogether if !meta.hasSideEffects(stmt), but that leads to
    // confusing generated code (for instance, `while (true) {}` just
    // disappears) and is probably a more appropriate job for a dedicated
    // dead code elimination pass.
    self.emit(stmt);
    return;
  }

  switch (stmt.type) {
  case "ExpressionStatement":
    self.explodeExpression(path.get("expression"), true);
    break;

  case "LabeledStatement":
    self.explodeStatement(path.get("body"), stmt.label);
    break;

  case "WhileStatement":
    var before = loc();
    var after = loc();

    self.mark(before);
    self.jumpIfNot(self.explodeExpression(path.get("test")), after);
    self.leapManager.withEntry(
      new leap.LoopEntry(after, before, labelId),
      function() { self.explodeStatement(path.get("body")); }
    );
    self.jump(before);
    self.mark(after);

    break;

  case "DoWhileStatement":
    var first = loc();
    var test = loc();
    var after = loc();

    self.mark(first);
    self.leapManager.withEntry(
      new leap.LoopEntry(after, test, labelId),
      function() { self.explode(path.get("body")); }
    );
    self.mark(test);
    self.jumpIf(self.explodeExpression(path.get("test")), first);
    self.mark(after);

    break;

  case "ForStatement":
    var head = loc();
    var update = loc();
    var after = loc();

    if (stmt.init) {
      // We pass true here to indicate that if stmt.init is an expression
      // then we do not care about its result.
      self.explode(path.get("init"), true);
    }

    self.mark(head);

    if (stmt.test) {
      self.jumpIfNot(self.explodeExpression(path.get("test")), after);
    } else {
      // No test means continue unconditionally.
    }

    self.leapManager.withEntry(
      new leap.LoopEntry(after, update, labelId),
      function() { self.explodeStatement(path.get("body")); }
    );

    self.mark(update);

    if (stmt.update) {
      // We pass true here to indicate that if stmt.update is an
      // expression then we do not care about its result.
      self.explode(path.get("update"), true);
    }

    self.jump(head);

    self.mark(after);

    break;

  case "ForInStatement":
    n.Identifier.assert(stmt.left);

    var head = loc();
    var after = loc();

    var keysPath = new types.NodePath(b.callExpression(
      self.contextProperty("keys"),
      [stmt.right]
    ), path, "right");

    var keys = self.emitAssign(
      self.makeTempVar(),
      self.explodeExpression(keysPath)
    );

    self.mark(head);

    self.jumpIfNot(
      b.memberExpression(
        keys,
        b.identifier("length"),
        false
      ),
      after
    );

    self.emitAssign(
      stmt.left,
      b.callExpression(
        b.memberExpression(
          keys,
          b.identifier("pop"),
          false
        ),
        []
      )
    );

    self.leapManager.withEntry(
      new leap.LoopEntry(after, head, labelId),
      function() { self.explodeStatement(path.get("body")); }
    );

    self.jump(head);

    self.mark(after);

    break;

  case "BreakStatement":
    self.leapManager.emitBreak(stmt.label);
    break;

  case "ContinueStatement":
    self.leapManager.emitContinue(stmt.label);
    break;

  case "SwitchStatement":
    // Always save the discriminant into a temporary variable in case the
    // test expressions overwrite values like context.sent.
    var disc = self.emitAssign(
      self.makeTempVar(),
      self.explodeExpression(path.get("discriminant"))
    );

    var after = loc();
    var defaultLoc = loc();
    var condition = defaultLoc;
    var caseLocs = [];

    // If there are no cases, .cases might be undefined.
    var cases = stmt.cases || [];

    for (var i = cases.length - 1; i >= 0; --i) {
      var c = cases[i];
      n.SwitchCase.assert(c);

      if (c.test) {
        condition = b.conditionalExpression(
          b.binaryExpression("===", disc, c.test),
          caseLocs[i] = loc(),
          condition
        );
      } else {
        caseLocs[i] = defaultLoc;
      }
    }

    self.jump(self.explodeExpression(
      new types.NodePath(condition, path, "discriminant")
    ));

    self.leapManager.withEntry(
      new leap.SwitchEntry(after),
      function() {
        path.get("cases").each(function(casePath) {
          var c = casePath.value;
          var i = casePath.name;

          self.mark(caseLocs[i]);

          casePath.get("consequent").each(
            self.explodeStatement,
            self
          );
        });
      }
    );

    self.mark(after);
    if (defaultLoc.value === -1) {
      self.mark(defaultLoc);
      assert.strictEqual(after.value, defaultLoc.value);
    }

    break;

  case "IfStatement":
    var elseLoc = stmt.alternate && loc();
    var after = loc();

    self.jumpIfNot(
      self.explodeExpression(path.get("test")),
      elseLoc || after
    );

    self.explodeStatement(path.get("consequent"));

    if (elseLoc) {
      self.jump(after);
      self.mark(elseLoc);
      self.explodeStatement(path.get("alternate"));
    }

    self.mark(after);

    break;

  case "ReturnStatement":
    self.leapManager.emitReturn(path.get("argument"));
    break;

  case "WithStatement":
    throw new Error(
      node.type + " not supported in generator functions.");

  case "TryStatement":
    var after = loc();

    var handler = stmt.handler;
    if (!handler && stmt.handlers) {
      handler = stmt.handlers[0] || null;
    }

    var catchLoc = handler && loc();
    var catchEntry = catchLoc && new leap.CatchEntry(
      catchLoc,
      handler.param
    );

    var finallyLoc = stmt.finalizer && loc();
    var finallyEntry = finallyLoc && new leap.FinallyEntry(
      finallyLoc,
      self.makeTempVar()
    );

    if (finallyEntry) {
      // Finally blocks examine their .nextLocTempVar property to figure
      // out where to jump next, so we must set that property to the
      // fall-through location, by default.
      self.emitAssign(finallyEntry.nextLocTempVar, after);
    }

    var tryEntry = new leap.TryEntry(catchEntry, finallyEntry);

    // Push information about this try statement so that the runtime can
    // figure out what to do if it gets an uncaught exception.
    self.pushTry(tryEntry);

    self.leapManager.withEntry(tryEntry, function() {
      self.explodeStatement(path.get("block"));

      if (catchLoc) {
        // If execution leaves the try block normally, the associated
        // catch block no longer applies.
        self.popCatch(catchEntry);

        if (finallyLoc) {
          // If we have both a catch block and a finally block, then
          // because we emit the catch block first, we need to jump over
          // it to the finally block.
          self.jump(finallyLoc);

        } else {
          // If there is no finally block, then we need to jump over the
          // catch block to the fall-through location.
          self.jump(after);
        }

        self.mark(catchLoc);

        // On entering a catch block, we must not have exited the
        // associated try block normally, so we won't have called
        // context.popCatch yet.  Call it here instead.
        self.popCatch(catchEntry);

        var bodyPath = path.get("handler", "body");
        var safeParam = self.makeTempVar();
        self.clearPendingException(safeParam);

        types.traverse(bodyPath, function(node) {
          var scope = this.scope.lookup(handler.param.name);
          if (scope && scope.depth >= bodyPath.scope.depth) {
            return false;
          }

          if (n.Identifier.check(node) &&
              node.name === handler.param.name) {
            this.replace(safeParam);
            return false;
          }
        });

        self.leapManager.withEntry(catchEntry, function() {
          self.explodeStatement(bodyPath);
        });
      }

      if (finallyLoc) {
        self.mark(finallyLoc);

        self.popFinally(finallyEntry);

        self.leapManager.withEntry(finallyEntry, function() {
          self.explodeStatement(path.get("finalizer"));
        });

        self.jump(finallyEntry.nextLocTempVar);
      }
    });

    self.mark(after);

    break;

  case "ThrowStatement":
    self.emit(b.throwStatement(
      self.explodeExpression(path.get("argument"))
    ));

    break;

  default:
    throw new Error(
      "unknown Statement of type " +
        JSON.stringify(stmt.type));
  }
};

// Emit a runtime call to context.pushTry(catchLoc, finallyLoc) so that
// the runtime wrapper can dispatch uncaught exceptions appropriately.
Ep.pushTry = function(tryEntry) {
  assert.ok(tryEntry instanceof leap.TryEntry);

  var nil = b.literal(null);
  var catchEntry = tryEntry.catchEntry;
  var finallyEntry = tryEntry.finallyEntry;
  var method = this.contextProperty("pushTry");
  var args = [
    catchEntry && catchEntry.firstLoc || nil,
    finallyEntry && finallyEntry.firstLoc || nil,
    finallyEntry && b.literal(
      finallyEntry.nextLocTempVar.property.name
    ) || nil
  ];

  this.emit(b.callExpression(method, args));
};

// Emit a runtime call to context.popCatch(catchLoc) so that the runtime
// wrapper knows when a catch block reported to pushTry no longer applies.
Ep.popCatch = function(catchEntry) {
  var catchLoc;

  if (catchEntry) {
    assert.ok(catchEntry instanceof leap.CatchEntry);
    catchLoc = catchEntry.firstLoc;
  } else {
    assert.strictEqual(catchEntry, null);
    catchLoc = b.literal(null);
  }

  // TODO Think about not emitting anything when catchEntry === null.  For
  // now, emitting context.popCatch(null) is good for sanity checking.

  this.emit(b.callExpression(
    this.contextProperty("popCatch"),
    [catchLoc]
  ));
};

// Emit a runtime call to context.popFinally(finallyLoc) so that the
// runtime wrapper knows when a finally block reported to pushTry no
// longer applies.
Ep.popFinally = function(finallyEntry) {
  var finallyLoc;

  if (finallyEntry) {
    assert.ok(finallyEntry instanceof leap.FinallyEntry);
    finallyLoc = finallyEntry.firstLoc;
  } else {
    assert.strictEqual(finallyEntry, null);
    finallyLoc = b.literal(null);
  }

  // TODO Think about not emitting anything when finallyEntry === null.
  // For now, emitting context.popFinally(null) is good for sanity
  // checking.

  this.emit(b.callExpression(
    this.contextProperty("popFinally"),
    [finallyLoc]
  ));
};

Ep.explodeExpression = function(path, ignoreResult) {
  assert.ok(path instanceof types.NodePath);

  var expr = path.value;
  if (expr) {
    n.Expression.assert(expr);
  } else {
    return expr;
  }

  var self = this;
  var result; // Used optionally by several cases below.

  function finish(expr) {
    n.Expression.assert(expr);
    if (ignoreResult) {
      self.emit(expr);
    } else {
      return expr;
    }
  }

  // If the expression does not contain a leap, then we either emit the
  // expression as a standalone statement or return it whole.
  if (!meta.containsLeap(expr)) {
    return finish(expr);
  }

  // If any child contains a leap (such as a yield or labeled continue or
  // break statement), then any sibling subexpressions will almost
  // certainly have to be exploded in order to maintain the order of their
  // side effects relative to the leaping child(ren).
  var hasLeapingChildren = meta.containsLeap.onlyChildren(expr);

  // In order to save the rest of explodeExpression from a combinatorial
  // trainwreck of special cases, explodeViaTempVar is responsible for
  // deciding when a subexpression needs to be "exploded," which is my
  // very technical term for emitting the subexpression as an assignment
  // to a temporary variable and the substituting the temporary variable
  // for the original subexpression. Think of exploded view diagrams, not
  // Michael Bay movies. The point of exploding subexpressions is to
  // control the precise order in which the generated code realizes the
  // side effects of those subexpressions.
  function explodeViaTempVar(tempVar, childPath, ignoreChildResult) {
    assert.ok(childPath instanceof types.NodePath);

    assert.ok(
      !ignoreChildResult || !tempVar,
      "Ignoring the result of a child expression but forcing it to " +
        "be assigned to a temporary variable?"
    );

    var result = self.explodeExpression(childPath, ignoreChildResult);

    if (ignoreChildResult) {
      // Side effects already emitted above.

    } else if (tempVar || (hasLeapingChildren &&
                           (self.isVolatileContextProperty(result) ||
                            meta.hasSideEffects(result)))) {
      // If tempVar was provided, then the result will always be assigned
      // to it, even if the result does not otherwise need to be assigned
      // to a temporary variable.  When no tempVar is provided, we have
      // the flexibility to decide whether a temporary variable is really
      // necessary.  In general, temporary assignment is required only
      // when some other child contains a leap and the child in question
      // is a context property like $ctx.sent that might get overwritten
      // or an expression with side effects that need to occur in proper
      // sequence relative to the leap.
      result = self.emitAssign(
        tempVar || self.makeTempVar(),
        result
      );
    }
    return result;
  }

  // If ignoreResult is true, then we must take full responsibility for
  // emitting the expression with all its side effects, and we should not
  // return a result.

  switch (expr.type) {
  case "MemberExpression":
    return finish(b.memberExpression(
      self.explodeExpression(path.get("object")),
      expr.computed
        ? explodeViaTempVar(null, path.get("property"))
        : expr.property,
      expr.computed
    ));

  case "CallExpression":
    var oldCalleePath = path.get("callee");
    var newCallee = self.explodeExpression(oldCalleePath);

    // If the callee was not previously a MemberExpression, then the
    // CallExpression was "unqualified," meaning its `this` object should
    // be the global object. If the exploded expression has become a
    // MemberExpression, then we need to force it to be unqualified by
    // using the (0, object.property)(...) trick; otherwise, it will
    // receive the object of the MemberExpression as its `this` object.
    if (!n.MemberExpression.check(oldCalleePath.node) &&
        n.MemberExpression.check(newCallee)) {
      newCallee = b.sequenceExpression([
        b.literal(0),
        newCallee
      ]);
    }

    return finish(b.callExpression(
      newCallee,
      path.get("arguments").map(function(argPath) {
        return explodeViaTempVar(null, argPath);
      })
    ));

  case "ObjectExpression":
    return finish(b.objectExpression(
      path.get("properties").map(function(propPath) {
        return b.property(
          propPath.value.kind,
          propPath.value.key,
          explodeViaTempVar(null, propPath.get("value"))
        );
      })
    ));

  case "ArrayExpression":
    return finish(b.arrayExpression(
      path.get("elements").map(function(elemPath) {
        return explodeViaTempVar(null, elemPath);
      })
    ));

  case "SequenceExpression":
    var lastIndex = expr.expressions.length - 1;

    path.get("expressions").each(function(exprPath) {
      if (exprPath.name === lastIndex) {
        result = self.explodeExpression(exprPath, ignoreResult);
      } else {
        self.explodeExpression(exprPath, true);
      }
    });

    return result;

  case "LogicalExpression":
    var after = loc();

    if (!ignoreResult) {
      result = self.makeTempVar();
    }

    var left = explodeViaTempVar(result, path.get("left"));

    if (expr.operator === "&&") {
      self.jumpIfNot(left, after);
    } else if (expr.operator = "||") {
      self.jumpIf(left, after);
    }

    explodeViaTempVar(result, path.get("right"), ignoreResult);

    self.mark(after);

    return result;

  case "ConditionalExpression":
    var elseLoc = loc();
    var after = loc();
    var test = self.explodeExpression(path.get("test"));

    self.jumpIfNot(test, elseLoc);

    if (!ignoreResult) {
      result = self.makeTempVar();
    }

    explodeViaTempVar(result, path.get("consequent"), ignoreResult);
    self.jump(after);

    self.mark(elseLoc);
    explodeViaTempVar(result, path.get("alternate"), ignoreResult);

    self.mark(after);

    return result;

  case "UnaryExpression":
    return finish(b.unaryExpression(
      expr.operator,
      // Can't (and don't need to) break up the syntax of the argument.
      // Think about delete a[b].
      self.explodeExpression(path.get("argument")),
      !!expr.prefix
    ));

  case "BinaryExpression":
    return finish(b.binaryExpression(
      expr.operator,
      explodeViaTempVar(null, path.get("left")),
      explodeViaTempVar(null, path.get("right"))
    ));

  case "AssignmentExpression":
    return finish(b.assignmentExpression(
      expr.operator,
      self.explodeExpression(path.get("left")),
      self.explodeExpression(path.get("right"))
    ));

  case "UpdateExpression":
    return finish(b.updateExpression(
      expr.operator,
      self.explodeExpression(path.get("argument")),
      expr.prefix
    ));

  case "YieldExpression":
    var after = loc();
    var arg = expr.argument && self.explodeExpression(path.get("argument"));

    if (arg && expr.delegate) {
      var result = self.makeTempVar();

      self.emit(b.returnStatement(b.callExpression(
        self.contextProperty("delegateYield"), [
          arg,
          b.literal(result.property.name),
          after
        ]
      )));

      self.mark(after);

      return result;
    }

    self.emitAssign(self.contextProperty("next"), after);
    self.emit(b.returnStatement(arg || null));
    self.mark(after);

    return self.contextProperty("sent");

  default:
    throw new Error(
      "unknown Expression of type " +
        JSON.stringify(expr.type));
  }
};

},{"./leap":9,"./meta":10,"assert":2,"ast-types":24}],8:[function(require,module,exports){
/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var types = require("ast-types");
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function(fun) {
  n.Function.assert(fun);
  var vars = {};
  var funDeclsToRaise = [];

  function varDeclToExpr(vdec, includeIdentifiers) {
    n.VariableDeclaration.assert(vdec);
    var exprs = [];

    vdec.declarations.forEach(function(dec) {
      vars[dec.id.name] = dec.id;

      if (dec.init) {
        exprs.push(b.assignmentExpression(
          "=", dec.id, dec.init
        ));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });

    if (exprs.length === 0)
      return null;

    if (exprs.length === 1)
      return exprs[0];

    return b.sequenceExpression(exprs);
  }

  types.traverse(fun.body, function(node) {
    if (n.VariableDeclaration.check(node)) {
      var expr = varDeclToExpr(node, false);
      if (expr === null) {
        this.replace();
      } else {
        // We don't need to traverse this expression any further because
        // there can't be any new declarations inside an expression.
        this.replace(b.expressionStatement(expr));
      }

      // Since the original node has been either removed or replaced,
      // avoid traversing it any further.
      return false;

    } else if (n.ForStatement.check(node)) {
      if (n.VariableDeclaration.check(node.init)) {
        var expr = varDeclToExpr(node.init, false);
        this.get("init").replace(expr);
      }

    } else if (n.ForInStatement.check(node)) {
      if (n.VariableDeclaration.check(node.left)) {
        var expr = varDeclToExpr(node.left, true);
        this.get("left").replace(expr);
      }

    } else if (n.FunctionDeclaration.check(node)) {
      vars[node.id.name] = node.id;

      var parentNode = this.parent.node;
      var assignment = b.expressionStatement(
        b.assignmentExpression(
          "=",
          node.id,
          b.functionExpression(
            node.id,
            node.params,
            node.body,
            node.generator,
            node.expression
          )
        )
      );

      if (n.BlockStatement.check(this.parent.node)) {
        funDeclsToRaise.push({
          block: this.parent.node,
          assignment: assignment
        });

        // Remove the function declaration for now, but reinsert the assignment
        // form later, at the top of the enclosing BlockStatement.
        this.replace();

      } else {
        this.replace(assignment);
      }

      // Don't hoist variables out of inner functions.
      return false;

    } else if (n.FunctionExpression.check(node)) {
      // Don't descend into nested function expressions.
      return false;
    }
  });

  funDeclsToRaise.forEach(function(entry) {
    entry.block.body.unshift(entry.assignment);
  });

  var paramNames = {};
  fun.params.forEach(function(param) {
    if (n.Identifier.check(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  var declarations = [];

  Object.keys(vars).forEach(function(name) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(b.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return b.variableDeclaration("var", declarations);
};

},{"assert":2,"ast-types":24}],9:[function(require,module,exports){
/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var types = require("ast-types");
var n = types.namedTypes;
var b = types.builders;
var inherits = require("util").inherits;

function Entry() {
  assert.ok(this instanceof Entry);
}

function FunctionEntry(returnLoc) {
  Entry.call(this);

  n.Literal.assert(returnLoc);

  Object.defineProperties(this, {
    returnLoc: { value: returnLoc }
  });
}

inherits(FunctionEntry, Entry);
exports.FunctionEntry = FunctionEntry;

function LoopEntry(breakLoc, continueLoc, label) {
  Entry.call(this);

  n.Literal.assert(breakLoc);
  n.Literal.assert(continueLoc);

  if (label) {
    n.Identifier.assert(label);
  } else {
    label = null;
  }

  Object.defineProperties(this, {
    breakLoc: { value: breakLoc },
    continueLoc: { value: continueLoc },
    label: { value: label }
  });
}

inherits(LoopEntry, Entry);
exports.LoopEntry = LoopEntry;

function SwitchEntry(breakLoc) {
  Entry.call(this);

  n.Literal.assert(breakLoc);

  Object.defineProperties(this, {
    breakLoc: { value: breakLoc }
  });
}

inherits(SwitchEntry, Entry);
exports.SwitchEntry = SwitchEntry;

function TryEntry(catchEntry, finallyEntry) {
  Entry.call(this);

  if (catchEntry) {
    assert.ok(catchEntry instanceof CatchEntry);
  } else {
    catchEntry = null;
  }

  if (finallyEntry) {
    assert.ok(finallyEntry instanceof FinallyEntry);
  } else {
    finallyEntry = null;
  }

  Object.defineProperties(this, {
    catchEntry: { value: catchEntry },
    finallyEntry: { value: finallyEntry }
  });
}

inherits(TryEntry, Entry);
exports.TryEntry = TryEntry;

function CatchEntry(firstLoc, paramId) {
  Entry.call(this);

  n.Literal.assert(firstLoc);
  n.Identifier.assert(paramId);

  Object.defineProperties(this, {
    firstLoc: { value: firstLoc },
    paramId: { value: paramId }
  });
}

inherits(CatchEntry, Entry);
exports.CatchEntry = CatchEntry;

function FinallyEntry(firstLoc, nextLocTempVar) {
  Entry.call(this);

  n.Literal.assert(firstLoc);
  n.MemberExpression.assert(nextLocTempVar);

  Object.defineProperties(this, {
    firstLoc: { value: firstLoc },
    nextLocTempVar: { value: nextLocTempVar }
  });
}

inherits(FinallyEntry, Entry);
exports.FinallyEntry = FinallyEntry;

function LeapManager(emitter) {
  assert.ok(this instanceof LeapManager);

  var Emitter = require("./emit").Emitter;
  assert.ok(emitter instanceof Emitter);

  Object.defineProperties(this, {
    emitter: { value: emitter },
    entryStack: {
      value: [new FunctionEntry(emitter.finalLoc)]
    }
  });
}

var LMp = LeapManager.prototype;
exports.LeapManager = LeapManager;

LMp.withEntry = function(entry, callback) {
  assert.ok(entry instanceof Entry);
  this.entryStack.push(entry);
  try {
    callback.call(this.emitter);
  } finally {
    var popped = this.entryStack.pop();
    assert.strictEqual(popped, entry);
  }
};

LMp._leapToEntry = function(predicate, defaultLoc) {
  var entry, loc;
  var finallyEntries = [];
  var skipNextTryEntry = null;

  for (var i = this.entryStack.length - 1; i >= 0; --i) {
    entry = this.entryStack[i];

    if (entry instanceof CatchEntry ||
        entry instanceof FinallyEntry) {

      // If we are inside of a catch or finally block, then we must
      // have exited the try block already, so we shouldn't consider
      // the next TryStatement as a handler for this throw.
      skipNextTryEntry = entry;

    } else if (entry instanceof TryEntry) {
      if (skipNextTryEntry) {
        // If an exception was thrown from inside a catch block and this
        // try statement has a finally block, make sure we execute that
        // finally block.
        if (skipNextTryEntry instanceof CatchEntry &&
            entry.finallyEntry) {
          finallyEntries.push(entry.finallyEntry);
        }

        skipNextTryEntry = null;

      } else if ((loc = predicate.call(this, entry))) {
        break;

      } else if (entry.finallyEntry) {
        finallyEntries.push(entry.finallyEntry);
      }

    } else if ((loc = predicate.call(this, entry))) {
      break;
    }
  }

  if (loc) {
    // fall through
  } else if (defaultLoc) {
    loc = defaultLoc;
  } else {
    return null;
  }

  n.Literal.assert(loc);

  while ((finallyEntry = finallyEntries.pop())) {
    this.emitter.emitAssign(finallyEntry.nextLocTempVar, loc);
    loc = finallyEntry.firstLoc;
  }

  return loc;
};

function getLeapLocation(entry, property, label) {
  var loc = entry[property];
  if (loc) {
    if (label) {
      if (entry.label &&
          entry.label.name === label.name) {
        return loc;
      }
    } else {
      return loc;
    }
  }
  return null;
}

LMp.emitBreak = function(label) {
  var loc = this._leapToEntry(function(entry) {
    return getLeapLocation(entry, "breakLoc", label);
  });

  if (loc === null) {
    throw new Error("illegal break statement");
  }

  this.emitter.clearPendingException();
  this.emitter.jump(loc);
};

LMp.emitContinue = function(label) {
  var loc = this._leapToEntry(function(entry) {
    return getLeapLocation(entry, "continueLoc", label);
  });

  if (loc === null) {
    throw new Error("illegal continue statement");
  }

  this.emitter.clearPendingException();
  this.emitter.jump(loc);
};

LMp.emitReturn = function(argPath) {
  assert.ok(argPath instanceof types.NodePath);

  var loc = this._leapToEntry(function(entry) {
    return getLeapLocation(entry, "returnLoc");
  });

  if (loc === null) {
    throw new Error("illegal return statement");
  }

  if (argPath.value) {
    this.emitter.setReturnValue(argPath);
  }

  this.emitter.clearPendingException();
  this.emitter.jump(loc);
};

},{"./emit":7,"assert":2,"ast-types":24,"util":5}],10:[function(require,module,exports){
/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var m = require("private").makeAccessor();
var types = require("ast-types");
var isArray = types.builtInTypes.array;
var n = types.namedTypes;
var hasOwn = Object.prototype.hasOwnProperty;

function makePredicate(propertyName, knownTypes) {
  function onlyChildren(node) {
    n.Node.assert(node);

    // Assume no side effects until we find out otherwise.
    var result = false;

    function check(child) {
      if (result) {
        // Do nothing.
      } else if (isArray.check(child)) {
        child.some(check);
      } else if (n.Node.check(child)) {
        assert.strictEqual(result, false);
        result = predicate(child);
      }
      return result;
    }

    types.eachField(node, function(name, child) {
      check(child);
    });

    return result;
  }

  function predicate(node) {
    n.Node.assert(node);

    var meta = m(node);
    if (hasOwn.call(meta, propertyName))
      return meta[propertyName];

    // Certain types are "opaque," which means they have no side
    // effects or leaps and we don't care about their subexpressions.
    if (hasOwn.call(opaqueTypes, node.type))
      return meta[propertyName] = false;

    if (hasOwn.call(knownTypes, node.type))
      return meta[propertyName] = true;

    return meta[propertyName] = onlyChildren(node);
  }

  predicate.onlyChildren = onlyChildren;

  return predicate;
}

var opaqueTypes = {
  FunctionExpression: true
};

// These types potentially have side effects regardless of what side
// effects their subexpressions have.
var sideEffectTypes = {
  CallExpression: true, // Anything could happen!
  ForInStatement: true, // Modifies the key variable.
  UnaryExpression: true, // Think delete.
  BinaryExpression: true, // Might invoke .toString() or .valueOf().
  AssignmentExpression: true, // Side-effecting by definition.
  UpdateExpression: true, // Updates are essentially assignments.
  NewExpression: true // Similar to CallExpression.
};

// These types are the direct cause of all leaps in control flow.
var leapTypes = {
  YieldExpression: true,
  BreakStatement: true,
  ContinueStatement: true,
  ReturnStatement: true,
  ThrowStatement: true
};

// All leap types are also side effect types.
for (var type in leapTypes) {
  if (hasOwn.call(leapTypes, type)) {
    sideEffectTypes[type] = leapTypes[type];
  }
}

exports.hasSideEffects = makePredicate("hasSideEffects", sideEffectTypes);
exports.containsLeap = makePredicate("containsLeap", leapTypes);

},{"assert":2,"ast-types":24,"private":28}],11:[function(require,module,exports){
/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

exports.guessTabWidth = function(source) {
  var counts = []; // Sparse array.
  var lastIndent = 0;

  source.split("\n").forEach(function(line) {
    var indent = /^\s*/.exec(line)[0].length;
    var diff = Math.abs(indent - lastIndent);
    counts[diff] = ~~counts[diff] + 1;
    lastIndent = indent;
  });

  var maxCount = -1;
  var result = 2;

  for (var tabWidth = 1;
       tabWidth < counts.length;
       tabWidth += 1) {
    if (tabWidth in counts &&
        counts[tabWidth] > maxCount) {
      maxCount = counts[tabWidth];
      result = tabWidth;
    }
  }

  return result;
};

},{}],12:[function(require,module,exports){
/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var types = require("ast-types");
var n = types.namedTypes;
var b = types.builders;
var hoist = require("./hoist").hoist;
var Emitter = require("./emit").Emitter;

exports.transform = function(ast) {
  return types.traverse(ast, visitNode);
};

function visitNode(node) {
  if (!n.Function.check(node) || !node.generator) {
    // Note that because we are not returning false here the traversal
    // will continue into the subtree rooted at this node, as desired.
    return;
  }

  node.generator = false;

  if (node.expression) {
    // Transform expression lambdas into normal functions.
    node.expression = false;
    node.body = b.blockStatement([
      b.returnStatement(node.body)
    ]);
  }

  // TODO Ensure these identifiers are named uniquely.
  var contextId = b.identifier("$ctx");
  var argsId = b.identifier("$args");
  var wrapGeneratorId = b.identifier("wrapGenerator");
  var shouldAliasArguments = renameArguments(node, argsId);
  var vars = hoist(node);

  if (shouldAliasArguments) {
    vars = vars || b.variableDeclaration("var", []);
    vars.declarations.push(b.variableDeclarator(
      argsId, b.identifier("arguments")
    ));
  }

  var emitter = new Emitter(contextId);
  var path = new types.NodePath(node);
  emitter.explode(path.get("body"));

  var outerBody = [];

  if (vars && vars.declarations.length > 0) {
    outerBody.push(vars);
  }

  outerBody.push(b.returnStatement(
    b.callExpression(wrapGeneratorId, [
      emitter.getContextFunction(),
      b.thisExpression()
    ])
  ));

  node.body = b.blockStatement(outerBody);

  var markMethod = b.memberExpression(
    wrapGeneratorId,
    b.identifier("mark"),
    false
  );

  if (n.FunctionDeclaration.check(node)) {
    var path = this.parent;

    while (path && !(n.BlockStatement.check(path.value) ||
                     n.Program.check(path.value))) {
      path = path.parent;
    }

    if (path) {
      var firstStmtPath = path.get("body", 0);
      firstStmtPath.replace(
        b.expressionStatement(b.callExpression(markMethod, [node.id])),
        firstStmtPath.value
      );
    }

  } else {
    n.FunctionExpression.assert(node);
    this.replace(b.callExpression(markMethod, [node]));
  }
}

function renameArguments(func, argsId) {
  var didReplaceArguments = false;
  var hasImplicitArguments = false;

  types.traverse(func, function(node) {
    if (node === func) {
      hasImplicitArguments = !this.scope.lookup("arguments");
    } else if (n.Function.check(node)) {
      return false;
    }

    if (n.Identifier.check(node) && node.name === "arguments") {
      var isMemberProperty =
        n.MemberExpression.check(this.parent.node) &&
        this.name === "property" &&
        !this.parent.node.computed;

      if (!isMemberProperty) {
        this.replace(argsId);
        didReplaceArguments = true;
        return false;
      }
    }
  });

  // If the traversal replaced any arguments identifiers, and those
  // identifiers were free variables, then we need to alias the outer
  // function's arguments object to the variable named by argsId.
  return didReplaceArguments && hasImplicitArguments;
}

},{"./emit":7,"./hoist":8,"assert":2,"ast-types":24}],13:[function(require,module,exports){
var __dirname="/";/**
 * Copyright (c) 2013, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var assert = require("assert");
var path = require("path");
var fs = require("fs");
var transform = require("./lib/visit").transform;
var guessTabWidth = require("./lib/util").guessTabWidth;
var recast = require("recast");
var esprimaHarmony = require("esprima");
var genFunExp = /\bfunction\s*\*/;

assert.ok(
  /harmony/.test(esprimaHarmony.version),
  "Bad esprima version: " + esprimaHarmony.version
);

function regenerator(source, options) {
  if (!options) {
    options = {
      includeRuntime: false
    };
  }

  var runtime = options.includeRuntime ? fs.readFileSync(
    regenerator.runtime.dev, "utf-8"
  ) + "\n" : "";

  if (!genFunExp.test(source)) {
    return runtime + source; // Shortcut: no generators to transform.
  }

  var recastOptions = {
    tabWidth: guessTabWidth(source),
    // Use the harmony branch of Esprima that installs with regenerator
    // instead of the master branch that recast provides.
    esprima: esprimaHarmony
  };

  var ast = recast.parse(source, recastOptions);
  var es5 = recast.print(transform(ast), recastOptions);
  return runtime + es5;
}

// To modify an AST directly, call require("regenerator").transform(ast).
regenerator.transform = transform;

regenerator.runtime = {
  dev: path.join(__dirname, "runtime", "dev.js"),
  min: path.join(__dirname, "runtime", "min.js")
};

// To transform a string of ES6 code, call require("regenerator")(source);
module.exports = regenerator;

},{"./lib/util":11,"./lib/visit":12,"assert":2,"esprima":27,"fs":3,"path":4,"recast":39}],14:[function(require,module,exports){
var types = require("../lib/types");
var Type = types.Type;
var def = Type.def;
var or = Type.or;
var builtin = types.builtInTypes;
var isString = builtin.string;
var isNumber = builtin.number;
var isBoolean = builtin.boolean;
var isRegExp = builtin.RegExp;
var shared = require("../lib/shared");
var defaults = shared.defaults;
var geq = shared.geq;

def("Node")
    .field("type", isString)
    .field("loc", or(
        def("SourceLocation"),
        null
    ), defaults["null"]);

def("SourceLocation")
    .build("start", "end", "source")
    .field("start", def("Position"))
    .field("end", def("Position"))
    .field("source", or(isString, null), defaults["null"]);

def("Position")
    .build("line", "column")
    .field("line", geq(1))
    .field("column", geq(0));

def("Program")
    .bases("Node")
    .build("body")
    .field("body", [def("Statement")]);

def("Function")
    .bases("Node")
    .field("id", or(def("Identifier"), null), defaults["null"])
    .field("params", [def("Pattern")])
    .field("body", or(def("BlockStatement"), def("Expression")))
    .field("generator", isBoolean, defaults["false"])
    .field("expression", isBoolean, defaults["false"])
    .field("defaults", [def("Expression")], defaults.emptyArray)
    .field("rest", or(def("Identifier"), null), defaults["null"]);

def("Statement").bases("Node");

// The empty .build() here means that an EmptyStatement can be constructed
// (i.e. it's not abstract) but that it needs no arguments.
def("EmptyStatement").bases("Statement").build();

def("BlockStatement")
    .bases("Statement")
    .build("body")
    .field("body", [def("Statement")]);

// TODO Figure out how to silently coerce Expressions to
// ExpressionStatements where a Statement was expected.
def("ExpressionStatement")
    .bases("Statement")
    .build("expression")
    .field("expression", def("Expression"));

def("IfStatement")
    .bases("Statement")
    .build("test", "consequent", "alternate")
    .field("test", def("Expression"))
    .field("consequent", def("Statement"))
    .field("alternate", or(def("Statement"), null), defaults["null"]);

def("LabeledStatement")
    .bases("Statement")
    .build("label", "body")
    .field("label", def("Identifier"))
    .field("body", def("Statement"));

def("BreakStatement")
    .bases("Statement")
    .build("label")
    .field("label", or(def("Identifier"), null), defaults["null"]);

def("ContinueStatement")
    .bases("Statement")
    .build("label")
    .field("label", or(def("Identifier"), null), defaults["null"]);

def("WithStatement")
    .bases("Statement")
    .build("object", "body")
    .field("object", def("Expression"))
    .field("body", def("Statement"));

def("SwitchStatement")
    .bases("Statement")
    .build("discriminant", "cases", "lexical")
    .field("discriminant", def("Expression"))
    .field("cases", [def("SwitchCase")])
    .field("lexical", isBoolean, defaults["false"]);

def("ReturnStatement")
    .bases("Statement")
    .build("argument")
    .field("argument", or(def("Expression"), null));

def("ThrowStatement")
    .bases("Statement")
    .build("argument")
    .field("argument", def("Expression"));

def("TryStatement")
    .bases("Statement")
    .build("block", "handler", "finalizer")
    .field("block", def("BlockStatement"))
    .field("handler", or(def("CatchClause"), null), function() {
        return this.handlers && this.handlers[0] || null;
    })
    .field("handlers", [def("CatchClause")], function() {
        return this.handler ? [this.handler] : [];
    }, true) // Indicates this field is hidden from eachField iteration.
    .field("guardedHandlers", [def("CatchClause")], defaults.emptyArray)
    .field("finalizer", or(def("BlockStatement"), null), defaults["null"]);

def("CatchClause")
    .bases("Node")
    .build("param", "guard", "body")
    .field("param", def("Pattern"))
    .field("guard", or(def("Expression"), null), defaults["null"])
    .field("body", def("BlockStatement"));

def("WhileStatement")
    .bases("Statement")
    .build("test", "body")
    .field("test", def("Expression"))
    .field("body", def("Statement"));

def("DoWhileStatement")
    .bases("Statement")
    .build("body", "test")
    .field("body", def("Statement"))
    .field("test", def("Expression"));

def("ForStatement")
    .bases("Statement")
    .build("init", "test", "update", "body")
    .field("init", or(
        def("VariableDeclaration"),
        def("Expression"),
        null))
    .field("test", or(def("Expression"), null))
    .field("update", or(def("Expression"), null))
    .field("body", def("Statement"));

def("ForInStatement")
    .bases("Statement")
    .build("left", "right", "body", "each")
    .field("left", or(
        def("VariableDeclaration"),
        def("Expression")))
    .field("right", def("Expression"))
    .field("body", def("Statement"))
    .field("each", isBoolean);

def("DebuggerStatement").bases("Statement").build();

def("Declaration").bases("Statement");

def("FunctionDeclaration")
    .bases("Function", "Declaration")
    .build("id", "params", "body", "generator", "expression")
    .field("id", def("Identifier"));

def("FunctionExpression")
    .bases("Function", "Expression")
    .build("id", "params", "body", "generator", "expression");

def("VariableDeclaration")
    .bases("Declaration")
    .build("kind", "declarations")
    .field("kind", or("var", "let", "const"))
    .field("declarations", [or(
        def("VariableDeclarator"),
        def("Identifier") // TODO Esprima deviation.
    )]);

def("VariableDeclarator")
    .bases("Node")
    .build("id", "init")
    .field("id", def("Pattern"))
    .field("init", or(def("Expression"), null));

// TODO Are all Expressions really Patterns?
def("Expression").bases("Node", "Pattern");

def("ThisExpression").bases("Expression").build();

def("ArrayExpression")
    .bases("Expression")
    .build("elements")
    .field("elements", [or(def("Expression"), null)]);

def("ObjectExpression")
    .bases("Expression")
    .build("properties")
    .field("properties", [def("Property")]);

// TODO Not in the Mozilla Parser API, but used by Esprima.
def("Property")
    .bases("Node") // Want to be able to visit Property Nodes.
    .build("kind", "key", "value")
    .field("kind", or("init", "get", "set"))
    .field("key", or(def("Literal"), def("Identifier")))
    .field("value", def("Expression"))
    // Esprima extensions not mentioned in the Mozilla Parser API:
    .field("method", isBoolean, defaults["false"])
    .field("shorthand", isBoolean, defaults["false"]);

def("SequenceExpression")
    .bases("Expression")
    .build("expressions")
    .field("expressions", [def("Expression")]);

var UnaryOperator = or(
    "-", "+", "!", "~",
    "typeof", "void", "delete");

def("UnaryExpression")
    .bases("Expression")
    .build("operator", "argument", "prefix")
    .field("operator", UnaryOperator)
    .field("argument", def("Expression"))
    // TODO Esprima doesn't bother with this field, presumably because
    // it's always true for unary operators.
    .field("prefix", isBoolean, defaults["true"]);

var BinaryOperator = or(
    "==", "!=", "===", "!==",
    "<", "<=", ">", ">=",
    "<<", ">>", ">>>",
    "+", "-", "*", "/", "%",
    "&", // TODO Missing from the Parser API.
    "|", "^", "in",
    "instanceof", "..");

def("BinaryExpression")
    .bases("Expression")
    .build("operator", "left", "right")
    .field("operator", BinaryOperator)
    .field("left", def("Expression"))
    .field("right", def("Expression"));

var AssignmentOperator = or(
    "=", "+=", "-=", "*=", "/=", "%=",
    "<<=", ">>=", ">>>=",
    "|=", "^=", "&=");

def("AssignmentExpression")
    .bases("Expression")
    .build("operator", "left", "right")
    .field("operator", AssignmentOperator)
    // TODO Shouldn't this be def("Pattern")?
    .field("left", def("Expression"))
    .field("right", def("Expression"));

var UpdateOperator = or("++", "--");

def("UpdateExpression")
    .bases("Expression")
    .build("operator", "argument", "prefix")
    .field("operator", UpdateOperator)
    .field("argument", def("Expression"))
    .field("prefix", isBoolean);

var LogicalOperator = or("||", "&&");

def("LogicalExpression")
    .bases("Expression")
    .build("operator", "left", "right")
    .field("operator", LogicalOperator)
    .field("left", def("Expression"))
    .field("right", def("Expression"));

def("ConditionalExpression")
    .bases("Expression")
    .build("test", "consequent", "alternate")
    .field("test", def("Expression"))
    .field("consequent", def("Expression"))
    .field("alternate", def("Expression"));

def("NewExpression")
    .bases("Expression")
    .build("callee", "arguments")
    .field("callee", def("Expression"))
    // The Mozilla Parser API gives this type as [or(def("Expression"),
    // null)], but null values don't really make sense at the call site.
    // TODO Report this nonsense.
    .field("arguments", [def("Expression")]);

def("CallExpression")
    .bases("Expression")
    .build("callee", "arguments")
    .field("callee", def("Expression"))
    // See comment for NewExpression above.
    .field("arguments", [def("Expression")]);

def("MemberExpression")
    .bases("Expression")
    .build("object", "property", "computed")
    .field("object", def("Expression"))
    .field("property", or(def("Identifier"), def("Expression")))
    .field("computed", isBoolean);

def("Pattern").bases("Node");

def("ObjectPattern")
    .bases("Pattern")
    .build("properties")
    // TODO File a bug to get PropertyPattern added to the interfaces API.
    .field("properties", [def("PropertyPattern")]);

def("PropertyPattern")
    .bases("Pattern")
    .build("key", "pattern")
    .field("key", or(def("Literal"), def("Identifier")))
    .field("pattern", def("Pattern"));

def("ArrayPattern")
    .bases("Pattern")
    .build("elements")
    .field("elements", [or(def("Pattern"), null)]);

def("SwitchCase")
    .bases("Node")
    .build("test", "consequent")
    .field("test", or(def("Expression"), null))
    .field("consequent", [def("Statement")]);

def("Identifier")
    // But aren't Expressions and Patterns already Nodes? TODO Report this.
    .bases("Node", "Expression", "Pattern")
    .build("name")
    .field("name", isString);

def("Literal")
    // But aren't Expressions already Nodes? TODO Report this.
    .bases("Node", "Expression")
    .build("value")
    .field("value", or(
        isString,
        isBoolean,
        null, // isNull would also work here.
        isNumber,
        isRegExp
    ));

types.finalize();

},{"../lib/shared":21,"../lib/types":23}],15:[function(require,module,exports){
require("./core");
var types = require("../lib/types");
var def = types.Type.def;
var or = types.Type.or;
var builtin = types.builtInTypes;
var isString = builtin.string;
var isBoolean = builtin.boolean;

// Note that none of these types are buildable because the Mozilla Parser
// API doesn't specify any builder functions, and nobody uses E4X anymore.

def("XMLDefaultDeclaration")
    .bases("Declaration")
    .field("namespace", def("Expression"));

def("XMLAnyName").bases("Expression");

def("XMLQualifiedIdentifier")
    .bases("Expression")
    .field("left", or(def("Identifier"), def("XMLAnyName")))
    .field("right", or(def("Identifier"), def("Expression")))
    .field("computed", isBoolean);

def("XMLFunctionQualifiedIdentifier")
    .bases("Expression")
    .field("right", or(def("Identifier"), def("Expression")))
    .field("computed", isBoolean);

def("XMLAttributeSelector")
    .bases("Expression")
    .field("attribute", def("Expression"));

def("XMLFilterExpression")
    .bases("Expression")
    .field("left", def("Expression"))
    .field("right", def("Expression"));

def("XMLElement")
    .bases("XML", "Expression")
    .field("contents", [def("XML")]);

def("XMLList")
    .bases("XML", "Expression")
    .field("contents", [def("XML")]);

def("XML").bases("Node");

def("XMLEscape")
    .bases("XML")
    .field("expression", def("Expression"));

def("XMLText")
    .bases("XML")
    .field("text", isString);

def("XMLStartTag")
    .bases("XML")
    .field("contents", [def("XML")]);

def("XMLEndTag")
    .bases("XML")
    .field("contents", [def("XML")]);

def("XMLPointTag")
    .bases("XML")
    .field("contents", [def("XML")]);

def("XMLName")
    .bases("XML")
    .field("contents", or(isString, [def("XML")]));

def("XMLAttribute")
    .bases("XML")
    .field("value", isString);

def("XMLCdata")
    .bases("XML")
    .field("contents", isString);

def("XMLComment")
    .bases("XML")
    .field("contents", isString);

def("XMLProcessingInstruction")
    .bases("XML")
    .field("target", isString)
    .field("contents", or(isString, null));

types.finalize();

},{"../lib/types":23,"./core":14}],16:[function(require,module,exports){
require("./core");
var types = require("../lib/types");
var def = types.Type.def;
var or = types.Type.or;
var builtin = types.builtInTypes;
var isBoolean = builtin.boolean;
var isString = builtin.string;
var defaults = require("../lib/shared").defaults;

// TODO The Parser API calls this ArrowExpression, but Esprima uses
// ArrowFunctionExpression.
def("ArrowFunctionExpression")
    .bases("Function", "Expression")
    .build("params", "body", "expression")
    // The forced null value here is compatible with the overridden
    // definition of the "id" field in the Function interface.
    .field("id", null, defaults["null"])
    // The current spec forbids arrow generators, so I have taken the
    // liberty of enforcing that. TODO Report this.
    .field("generator", false, defaults["false"]);

def("YieldExpression")
    .bases("Expression")
    .build("argument", "delegate")
    .field("argument", or(def("Expression"), null))
    .field("delegate", isBoolean, false);

def("GeneratorExpression")
    .bases("Expression")
    .build("body", "blocks", "filter")
    .field("body", def("Expression"))
    .field("blocks", [def("ComprehensionBlock")])
    .field("filter", or(def("Expression"), null));

def("ComprehensionExpression")
    .bases("Expression")
    .build("body", "blocks", "filter")
    .field("body", def("Expression"))
    .field("blocks", [def("ComprehensionBlock")])
    .field("filter", or(def("Expression"), null));

def("ComprehensionBlock")
    .bases("Node")
    .build("left", "right", "each")
    .field("left", def("Pattern"))
    .field("right", def("Expression"))
    .field("each", isBoolean);

// This would be the ideal definition for ModuleSpecifier, but alas we
// can't expect ASTs parsed by Esprima to use this custom subtype:
def("ModuleSpecifier")
    .bases("Specifier", "Literal")
//  .build("value") // Make it abstract/non-buildable for now.
    .field("value", isString);

// Instead we must settle for a cheap type alias:
var ModuleSpecifier = def("Literal");

def("ModuleDeclaration")
    .bases("Declaration")
    .build("id", "from", "body")
    .field("id", or(def("Literal"), def("Identifier")))
    .field("source", or(ModuleSpecifier, null))
    .field("body", or(def("BlockStatement"), null));

def("MethodDefinition")
    .bases("Declaration")
    .build("kind", "key", "value")
    .field("kind", or("init", "get", "set", ""))
    .field("key", or(def("Literal"), def("Identifier")))
    .field("value", def("Function"));

def("SpreadElement")
    .bases("Pattern")
    .build("argument")
    .field("argument", def("Pattern"));

var ClassBodyElement = or(
    def("MethodDefinition"),
    def("VariableDeclarator"),
    def("ClassPropertyDefinition")
);

def("ClassPropertyDefinition") // static property
    .bases("Declaration")
    .build("definition")
    // Yes, Virginia, circular definitions are permitted.
    .field("definition", ClassBodyElement);

def("ClassBody")
    .bases("Declaration")
    .build("body")
    .field("body", [ClassBodyElement]);

def("ClassDeclaration")
    .bases("Declaration")
    .build("id", "body", "superClass")
    .field("id", def("Identifier"))
    .field("body", def("ClassBody"))
    .field("superClass", or(def("Expression"), null), defaults["null"]);

def("ClassExpression")
    .bases("Expression")
    .build("id", "body", "superClass")
    .field("id", or(def("Identifier"), null), defaults["null"])
    .field("body", def("ClassBody"))
    .field("superClass", or(def("Expression"), null), defaults["null"]);

// Specifier and NamedSpecifier are non-standard types that I introduced
// for definitional convenience.
def("Specifier").bases("Node");
def("NamedSpecifier")
    .bases("Specifier")
    .field("id", def("Identifier"))
    .field("name", def("Identifier"), defaults["null"]);

def("ExportSpecifier")
    .bases("NamedSpecifier")
    .build("id", "name");

def("ExportBatchSpecifier")
    .bases("Specifier")
    .build();

def("ImportSpecifier")
    .bases("NamedSpecifier")
    .build("id", "name");

def("ExportDeclaration")
    .bases("Declaration")
    .build("default", "declaration", "specifiers", "source")
    .field("default", isBoolean)
    .field("declaration", or(
        def("Declaration"),
        def("AssignmentExpression") // Implies default.
    ))
    .field("specifiers", [or(
        def("ExportSpecifier"),
        def("ExportBatchSpecifier")
    )])
    .field("source", or(ModuleSpecifier, null));

def("ImportDeclaration")
    .bases("Declaration")
    .build("specifiers", "kind", "source")
    .field("specifiers", [def("ImportSpecifier")])
    .field("kind", or("named", "default"))
    .field("source", ModuleSpecifier);

types.finalize();

},{"../lib/shared":21,"../lib/types":23,"./core":14}],17:[function(require,module,exports){
require("./core");
var types = require("../lib/types");
var def = types.Type.def;
var or = types.Type.or;
var builtin = types.builtInTypes;
var isString = builtin.string;
var isBoolean = builtin.boolean;
var defaults = require("../lib/shared").defaults;

def("XJSAttribute")
    .bases("Node")
    .build("name", "value")
    .field("name", def("XJSIdentifier"))
    .field("value", or(
        def("Literal"), // attr="value"
        def("XJSExpressionContainer"), // attr={value}
        null // attr= or just attr
    ), defaults["null"]);

def("XJSIdentifier")
    .bases("Node")
    .build("name", "namespace")
    .field("name", isString)
    .field("namespace", or(isString, null), defaults["null"]);

def("XJSExpressionContainer")
    .bases("Expression")
    .build("expression")
    .field("expression", def("Expression"));

def("XJSElement")
    .bases("Expression")
    .build("openingElement", "closingElement", "children")
    .field("openingElement", def("XJSOpeningElement"))
    .field("closingElement", or(def("XJSClosingElement"), null), defaults["null"])
    .field("children", [or(
        def("XJSElement"),
        def("XJSExpressionContainer"),
        def("XJSText"),
        def("Literal") // TODO Esprima should return XJSText instead.
    )], defaults.emptyArray)
    .field("name", def("XJSIdentifier"), function() {
        // Little-known fact: the `this` object inside a default function
        // is none other than the partially-built object itself, and any
        // fields initialized directly from builder function arguments
        // (like openingElement, closingElement, and children) are
        // guaranteed to be available.
        return this.openingElement.name;
    })
    .field("selfClosing", isBoolean, function() {
        return this.openingElement.selfClosing;
    })
    .field("attributes", [def("XJSAttribute")], function() {
        return this.openingElement.attributes;
    });

def("XJSOpeningElement")
    .bases("Node") // TODO Does this make sense? Can't really be an XJSElement.
    .build("name", "attributes", "selfClosing")
    .field("name", def("XJSIdentifier"))
    .field("attributes", [def("XJSAttribute")], defaults.emptyArray)
    .field("selfClosing", isBoolean, defaults["false"]);

def("XJSClosingElement")
    .bases("Node") // TODO Same concern.
    .build("name")
    .field("name", def("XJSIdentifier"));

def("XJSText")
    .bases("Literal")
    .build("value")
    .field("value", isString);

def("XJSEmptyExpression").bases("Expression").build();

def("TypeAnnotatedIdentifier")
    .bases("Pattern")
    .build("annotation", "identifier")
    .field("annotation", def("TypeAnnotation"))
    .field("identifier", def("Identifier"));

def("TypeAnnotation")
    .bases("Pattern")
    .build("annotatedType", "templateTypes", "paramTypes", "returnType", 
           "unionType", "nullable")
    .field("annotatedType", def("Identifier"))
    .field("templateTypes", or([def("TypeAnnotation")], null))
    .field("paramTypes", or([def("TypeAnnotation")], null))
    .field("returnType", or(def("TypeAnnotation"), null))
    .field("unionType", or(def("TypeAnnotation"), null))
    .field("nullable", isBoolean);

types.finalize();

},{"../lib/shared":21,"../lib/types":23,"./core":14}],18:[function(require,module,exports){
require("./core");
var types = require("../lib/types");
var def = types.Type.def;
var or = types.Type.or;
var geq = require("../lib/shared").geq;

def("ForOfStatement")
    .bases("Statement")
    .build("left", "right", "body")
    .field("left", or(
        def("VariableDeclaration"),
        def("Expression")))
    .field("right", def("Expression"))
    .field("body", def("Statement"));

def("LetStatement")
    .bases("Statement")
    .build("head", "body")
    // TODO Deviating from the spec by reusing VariableDeclarator here.
    .field("head", [def("VariableDeclarator")])
    .field("body", def("Statement"));

def("LetExpression")
    .bases("Expression")
    .build("head", "body")
    // TODO Deviating from the spec by reusing VariableDeclarator here.
    .field("head", [def("VariableDeclarator")])
    .field("body", def("Expression"));

def("GraphExpression")
    .bases("Expression")
    .build("index", "expression")
    .field("index", geq(0))
    .field("expression", def("Literal"));

def("GraphIndexExpression")
    .bases("Expression")
    .build("index")
    .field("index", geq(0));

types.finalize();

},{"../lib/shared":21,"../lib/types":23,"./core":14}],19:[function(require,module,exports){
var assert = require("assert");
var types = require("./types");
var n = types.namedTypes;
var isNumber = types.builtInTypes.number;
var isArray = types.builtInTypes.array;
var Path = require("ast-path").Path;
var Scope = require("./scope");

function NodePath(value, parentPath, name) {
    assert.ok(this instanceof NodePath);
    Path.call(this, value, parentPath, name);

    // Conservatively update parameters to reflect any alterations made by
    // the Path constructor.
    value = this.value;
    parentPath = this.parentPath;
    name = this.name;

    var node = null;
    var pp = parentPath;
    var scope = pp && pp.scope;

    if (n.Node.check(value)) {
        node = value;

        if (Scope.isEstablishedBy(node)) {
            scope = new Scope(node, scope);
        }

    } else {
        while (pp && !n.Node.check(pp.value)) {
            assert.strictEqual(pp.scope, scope);
            pp = pp.parentPath;
        }

        if (pp) {
            assert.strictEqual(pp.scope, scope);
            node = pp.value || null;
            pp = pp.parentPath;
        }
    }

    while (pp && !n.Node.check(pp.value)) {
        pp = pp.parentPath;
    }

    if (pp && node) {
        assert.notStrictEqual(pp.value, node);
        assert.notStrictEqual(pp.node, node);
    }

    Object.defineProperties(this, {
        // The value of the first ancestor Path whose value is a Node.
        node: { value: node || null },

        // The first ancestor Path whose value is a Node distinct from
        // this.node.
        parent: { value: pp || null },

        // The closest enclosing scope that governs this node.
        scope: { value: scope || null }
    });
}

require("util").inherits(NodePath, Path);
var NPp = NodePath.prototype;

NPp.getValueProperty = function(name) {
    return types.getFieldValue(this.value, name);
};

NPp.needsParens = function() {
    if (!this.parent)
        return false;

    var node = this.node;

    // If this NodePath object is not the direct owner of this.node, then
    // we do not need parentheses here, though the direct owner might need
    // parentheses.
    if (node !== this.value)
        return false;

    var parent = this.parent.node;

    assert.notStrictEqual(node, parent);

    if (!n.Expression.check(node))
        return false;

    if (n.UnaryExpression.check(node))
        return n.MemberExpression.check(parent)
            && this.name === "object"
            && parent.object === node;

    if (isBinary(node)) {
        if (n.CallExpression.check(parent) &&
            this.name === "callee") {
            assert.strictEqual(parent.callee, node);
            return true;
        }

        if (n.UnaryExpression.check(parent))
            return true;

        if (n.MemberExpression.check(parent) &&
            this.name === "object") {
            assert.strictEqual(parent.object, node);
            return true;
        }

        if (isBinary(parent)) {
            var po = parent.operator;
            var pp = PRECEDENCE[po];
            var no = node.operator;
            var np = PRECEDENCE[no];

            if (pp > np) {
                return true;
            }

            if (pp === np && this.name === "right") {
                assert.strictEqual(parent.right, node);
                return true;
            }
        }
    }

    if (n.SequenceExpression.check(node))
        return n.CallExpression.check(parent)
            || n.UnaryExpression.check(parent)
            || isBinary(parent)
            || n.VariableDeclarator.check(parent)
            || n.MemberExpression.check(parent)
            || n.ArrayExpression.check(parent)
            || n.Property.check(parent)
            || n.ConditionalExpression.check(parent);

    if (n.NewExpression.check(parent) &&
        this.name === "callee") {
        assert.strictEqual(parent.callee, node);
        return containsCallExpression(node);
    }

    if (n.Literal.check(node) &&
        isNumber.check(node.value) &&
        n.MemberExpression.check(parent) &&
        this.name === "object") {
        assert.strictEqual(parent.object, node);
        return true;
    }

    if (n.AssignmentExpression.check(node) ||
        n.ConditionalExpression.check(node)) {
        if (n.UnaryExpression.check(parent))
            return true;

        if (isBinary(parent))
            return true;

        if (n.CallExpression.check(parent) &&
            this.name === "callee") {
            assert.strictEqual(parent.callee, node);
            return true;
        }

        if (n.ConditionalExpression.check(parent) &&
            this.name === "test") {
            assert.strictEqual(parent.test, node);
            return true;
        }

        if (n.MemberExpression.check(parent) &&
            this.name === "object") {
            assert.strictEqual(parent.object, node);
            return true;
        }
    }

    if (n.FunctionExpression.check(node) &&
        this.firstInStatement())
        return true;

    if (n.ObjectExpression.check(node) &&
        this.firstInStatement())
        return true;

    return false;
};

function isBinary(node) {
    return n.BinaryExpression.check(node)
        || n.LogicalExpression.check(node);
}

var PRECEDENCE = {};
[["||"],
 ["&&"],
 ["|"],
 ["^"],
 ["&"],
 ["==", "===", "!=", "!=="],
 ["<", ">", "<=", ">=", "in", "instanceof"],
 [">>", "<<", ">>>"],
 ["+", "-"],
 ["*", "/", "%"]
].forEach(function(tier, i) {
    tier.forEach(function(op) {
        PRECEDENCE[op] = i;
    });
});

function containsCallExpression(node) {
    if (n.CallExpression.check(node)) {
        return true;
    }

    if (isArray.check(node)) {
        return node.some(containsCallExpression);
    }

    if (n.Node.check(node)) {
        return types.someField(node, function(name, child) {
            return containsCallExpression(child);
        });
    }

    return false;
}

NPp.firstInStatement = function() {
    return firstInStatement(this);
};

function firstInStatement(path) {
    for (var node, parent; path.parent; path = path.parent) {
        node = path.node;
        parent = path.parent.node;

        if (n.BlockStatement.check(parent) &&
            path.parent.name === "body" &&
            path.name === 0) {
            assert.strictEqual(parent.body[0], node);
            return true;
        }

        if (n.ExpressionStatement.check(parent) &&
            path.name === "expression") {
            assert.strictEqual(parent.expression, node);
            return true;
        }

        if (n.SequenceExpression.check(parent) &&
            path.parent.name === "expressions" &&
            path.name === 0) {
            assert.strictEqual(parent.expressions[0], node);
            continue;
        }

        if (n.CallExpression.check(parent) &&
            path.name === "callee") {
            assert.strictEqual(parent.callee, node);
            continue;
        }

        if (n.MemberExpression.check(parent) &&
            path.name === "object") {
            assert.strictEqual(parent.object, node);
            continue;
        }

        if (n.ConditionalExpression.check(parent) &&
            path.name === "test") {
            assert.strictEqual(parent.test, node);
            continue;
        }

        if (isBinary(parent) &&
            path.name === "left") {
            assert.strictEqual(parent.left, node);
            continue;
        }

        if (n.UnaryExpression.check(parent) &&
            !parent.prefix &&
            path.name === "argument") {
            assert.strictEqual(parent.argument, node);
            continue;
        }

        return false;
    }

    return true;
}

module.exports = NodePath;

},{"./scope":20,"./types":23,"assert":2,"ast-path":26,"util":5}],20:[function(require,module,exports){
var assert = require("assert");
var types = require("./types");
var Type = types.Type;
var namedTypes = types.namedTypes;
var Node = namedTypes.Node;
var isArray = types.builtInTypes.array;
var hasOwn = Object.prototype.hasOwnProperty;

function Scope(node, parentScope) {
    assert.ok(this instanceof Scope);
    assert.ok(Scope.isEstablishedBy(node));
    var depth;

    if (parentScope) {
        assert.ok(parentScope instanceof Scope);
        depth = parentScope.depth + 1;
    } else {
        parentScope = null;
        depth = 0;
    }

    Object.defineProperties(this, {
        node: { value: node },
        isGlobal: { value: !parentScope, enumerable: true },
        depth: { value: depth },
        parent: { value: parentScope },
        bindings: { value: {} }
    });
}

var scopeTypes = [
    // Program nodes introduce global scopes.
    namedTypes.Program,

    // Function is the supertype of FunctionExpression,
    // FunctionDeclaration, ArrowExpression, etc.
    namedTypes.Function,

    // In case you didn't know, the caught parameter shadows any variable
    // of the same name in an outer scope.
    namedTypes.CatchClause
];

if (namedTypes.ModuleDeclaration) {
    // Include ModuleDeclaration only if it exists (ES6).
    scopeTypes.push(namedTypes.ModuleDeclaration);
}

var ScopeType = Type.or.apply(Type, scopeTypes);

Scope.isEstablishedBy = function(node) {
    return ScopeType.check(node);
};

var Sp = Scope.prototype;

// Will be overridden after an instance lazily calls scanScope.
Sp.didScan = false;

Sp.declares = function(name) {
    if (!this.didScan) {
        for (var name in this.bindings) {
            // Empty out this.bindings, just in cases.
            delete this.bindings[name];
        }
        scanScope(this.node, this.bindings);
        this.didScan = true;
    }

    return hasOwn.call(this.bindings, name);
};

// TODO What about CatchClause??
function scanScope(node, bindings) {
    if (isArray.check(node)) {
        node.forEach(function(child) {
            scanChild(child, bindings);
        });

    } else if (namedTypes.Function.check(node)) {
        node.params.map(function(param) {
            addPattern(param, bindings);
        });

        scanChild(node.body, bindings);

    } else if (namedTypes.VariableDeclarator.check(node)) {
        addPattern(node.id, bindings);
        scanChild(node.init, bindings);

    } else if (namedTypes.ImportSpecifier &&
               namedTypes.ImportSpecifier.check(node)) {
        addPattern(node.name || node.id);

    } else if (Node.check(node)) {
        types.eachField(node, function(name, child) {
            scanChild(child, bindings);
        });
    }
}

function scanChild(node, bindings) {
    if (namedTypes.FunctionDeclaration.check(node)) {
        addPattern(node.id, bindings);

    } else if (namedTypes.ClassDeclaration &&
               namedTypes.ClassDeclaration.check(node)) {
        addPattern(node.id, bindings);

    } else if (Scope.isEstablishedBy(node)) {
        // Don't descend into nested scopes.

    } else {
        scanScope(node, bindings);
    }
}

function addPattern(pattern, bindings) {
    namedTypes.Pattern.assert(pattern);

    if (namedTypes.Identifier.check(pattern)) {
        bindings[pattern.name] = pattern;
    } else if (namedTypes.SpreadElement &&
               namedTypes.SpreadElement.check(pattern)) {
        addPattern(pattern.argument, bindings);
    }
}

Sp.lookup = function(name) {
    for (var scope = this; scope; scope = scope.parent)
        if (scope.declares(name))
            break;
    return scope;
};

Sp.getGlobalScope = function() {
    var scope = this;
    while (!scope.isGlobal)
        scope = scope.parent;
    return scope;
};

module.exports = Scope;

},{"./types":23,"assert":2}],21:[function(require,module,exports){
var types = require("../lib/types");
var Type = types.Type;
var builtin = types.builtInTypes;
var isNumber = builtin.number;

// An example of constructing a new type with arbitrary constraints from
// an existing type.
exports.geq = function(than) {
    return new Type(function(value) {
        return isNumber.check(value) && value >= than;
    }, isNumber + " >= " + than);
};

// Default value-returning functions that may optionally be passed as a
// third argument to Def.prototype.field.
exports.defaults = {
    // Functions were used because (among other reasons) that's the most
    // elegant way to allow for the emptyArray one always to give a new
    // array instance.
    "null": function() { return null },
    "emptyArray": function() { return [] },
    "false": function() { return false },
    "true": function() { return true },
    "undefined": function() {}
};

var naiveIsPrimitive = Type.or(
    builtin.string,
    builtin.number,
    builtin.boolean,
    builtin.null,
    builtin.undefined
);

exports.isPrimitive = new Type(function(value) {
    if (value === null)
        return true;
    var type = typeof value;
    return !(type === "object" ||
             type === "function");
}, naiveIsPrimitive.toString());

},{"../lib/types":23}],22:[function(require,module,exports){
var assert = require("assert");
var types = require("./types");
var Node = types.namedTypes.Node;
var isArray = types.builtInTypes.array;
var NodePath = require("./node-path");

module.exports = function(node, callback) {
    function traverse(path) {
        assert.ok(path instanceof NodePath);

        if (isArray.check(path.value)) {
            path.each(traverse);

        } else if (Node.check(path.value)) {
            var node = path.value;

            if (callback.call(path, node, traverse) === false) {
                return;
            }

            types.eachField(node, function(name, child) {
                var childPath = path.get(name);
                assert.strictEqual(childPath.value, child);
                traverse(childPath);
            });
        }
    }

    if (node instanceof NodePath) {
        traverse(node);
        return node.value;
    } else {
        // Just in case we call this.replace at the root, there needs to
        // be an additional parent Path to update.
        var rootPath = new NodePath({ root: node });
        traverse(rootPath.get("root"));
        return rootPath.value.root;
    }
};

},{"./node-path":19,"./types":23,"assert":2}],23:[function(require,module,exports){
var assert = require("assert");
var Ap = Array.prototype;
var slice = Ap.slice;
var map = Ap.map;
var each = Ap.forEach;
var objToStr = Object.prototype.toString;
var funObjStr = objToStr.call(function(){});
var strObjStr = objToStr.call("");

// A type is an object with a .check method that takes a value and returns
// true or false according to whether the value matches the type.

function Type(check, name) {
    var self = this;
    assert.ok(self instanceof Type, self);

    // Unfortunately we can't elegantly reuse isFunction and isString,
    // here, because this code is executed while defining those types.
    assert.strictEqual(objToStr.call(check), funObjStr,
                       check + " is not a function");

    // The `name` parameter can be either a function or a string.
    var nameObjStr = objToStr.call(name);
    assert.ok(nameObjStr === funObjStr ||
              nameObjStr === strObjStr,
              name + " is neither a function nor a string");

    Object.defineProperties(self, {
        name: { value: name },
        check: {
            value: function(value, deep) {
                var result = check.call(self, value, deep);
                if (!result && objToStr.call(deep) === funObjStr)
                    deep(self, value);
                return result;
            }
        }
    });
}

var Tp = Type.prototype;

// Throughout this file we use Object.defineProperty to prevent
// redefinition of exported properties.
Object.defineProperty(exports, "Type", { value: Type });

// Like .check, except that failure triggers an AssertionError.
Tp.assert = function(value, deep) {
    if (!this.check(value, deep)) {
        var str = shallowStringify(value);
        assert.ok(false, str + " does not match type " + this);
        return false;
    }
    return true;
};

function shallowStringify(value) {
    if (isObject.check(value))
        return "{" + Object.keys(value).map(function(key) {
            return key + ": " + value[key];
        }).join(", ") + "}";

    if (isArray.check(value))
        return "[" + value.map(shallowStringify).join(", ") + "]";

    return JSON.stringify(value);
}

Tp.toString = function() {
    var name = this.name;

    if (isString.check(name))
        return name;

    if (isFunction.check(name))
        return name.call(this) + "";

    return name + " type";
};

var builtInTypes = {};
Object.defineProperty(exports, "builtInTypes", {
    enumerable: true,
    value: builtInTypes
});

function defBuiltInType(example, name) {
    var objStr = objToStr.call(example);

    Object.defineProperty(builtInTypes, name, {
        enumerable: true,
        value: new Type(function(value) {
            return objToStr.call(value) === objStr;
        }, name)
    });

    return builtInTypes[name];
}

// These types check the underlying [[Class]] attribute of the given
// value, rather than using the problematic typeof operator. Note however
// that no subtyping is considered; so, for instance, isObject.check
// returns false for [], /./, new Date, and null.
var isString = defBuiltInType("", "string");
var isFunction = defBuiltInType(function(){}, "function");
var isArray = defBuiltInType([], "array");
var isObject = defBuiltInType({}, "object");
var isRegExp = defBuiltInType(/./, "RegExp");
var isDate = defBuiltInType(new Date, "Date");
var isNumber = defBuiltInType(3, "number");
var isBoolean = defBuiltInType(true, "boolean");
var isNull = defBuiltInType(null, "null");
var isUndefined = defBuiltInType(void 0, "undefined");

// There are a number of idiomatic ways of expressing types, so this
// function serves to coerce them all to actual Type objects. Note that
// providing the name argument is not necessary in most cases.
function toType(from, name) {
    // The toType function should of course be idempotent.
    if (from instanceof Type)
        return from;

    // The Def type is used as a helper for constructing compound
    // interface types for AST nodes.
    if (from instanceof Def)
        return from.type;

    // Support [ElemType] syntax.
    if (isArray.check(from))
        return Type.fromArray(from);

    // Support { someField: FieldType, ... } syntax.
    if (isObject.check(from))
        return Type.fromObject(from);

    // If isFunction.check(from), assume that from is a binary predicate
    // function we can use to define the type.
    if (isFunction.check(from))
        return new Type(from, name);

    // As a last resort, toType returns a type that matches any value that
    // is === from. This is primarily useful for literal values like
    // toType(null), but it has the additional advantage of allowing
    // toType to be a total function.
    return new Type(function(value) {
        return value === from;
    }, isUndefined.check(name) ? function() {
        return from + "";
    } : name);
}

// Returns a type that matches the given value iff any of type1, type2,
// etc. match the value.
Type.or = function(/* type1, type2, ... */) {
    var types = [];
    var len = arguments.length;
    for (var i = 0; i < len; ++i)
        types.push(toType(arguments[i]));

    return new Type(function(value, deep) {
        for (var i = 0; i < len; ++i)
            if (types[i].check(value, deep))
                return true;
        return false;
    }, function() {
        return types.join(" | ");
    });
};

Type.fromArray = function(arr) {
    assert.ok(isArray.check(arr));
    assert.strictEqual(
        arr.length, 1,
        "only one element type is permitted for typed arrays");
    return toType(arr[0]).arrayOf();
};

Tp.arrayOf = function() {
    var elemType = this;
    return new Type(function(value, deep) {
        return isArray.check(value) && value.every(function(elem) {
            return elemType.check(elem, deep);
        });
    }, function() {
        return "[" + elemType + "]";
    });
};

Type.fromObject = function(obj) {
    var fields = Object.keys(obj).map(function(name) {
        return new Field(name, obj[name]);
    });

    return new Type(function(value, deep) {
        return isObject.check(value) && fields.every(function(field) {
            return field.type.check(value[field.name], deep);
        });
    }, function() {
        return "{ " + fields.join(", ") + " }";
    });
};

function Field(name, type, defaultFn, hidden) {
    var self = this;

    assert.ok(self instanceof Field);
    isString.assert(name);

    type = toType(type);

    var properties = {
        name: { value: name },
        type: { value: type },
        hidden: { value: !!hidden }
    };

    if (isFunction.check(defaultFn)) {
        properties.defaultFn = { value: defaultFn };
    }

    Object.defineProperties(self, properties);
}

var Fp = Field.prototype;

Fp.toString = function() {
    return JSON.stringify(this.name) + ": " + this.type;
};

Fp.getValue = function(obj) {
    var value = obj[this.name];

    if (!isUndefined.check(value))
        return value;

    if (this.defaultFn)
        value = this.defaultFn.call(obj);

    return value;
};

// Define a type whose name is registered in a namespace (the defCache) so
// that future definitions will return the same type given the same name.
// In particular, this system allows for circular and forward definitions.
// The Def object d returned from Type.def may be used to configure the
// type d.type by calling methods such as d.bases, d.build, and d.field.
Type.def = function(typeName) {
    isString.assert(typeName);
    return defCache.hasOwnProperty(typeName)
        ? defCache[typeName]
        : defCache[typeName] = new Def(typeName);
};

// In order to return the same Def instance every time Type.def is called
// with a particular name, those instances need to be stored in a cache.
var defCache = {};

function Def(typeName) {
    var self = this;
    assert.ok(self instanceof Def);

    Object.defineProperties(self, {
        typeName: { value: typeName },
        baseNames: { value: [] },
        ownFields: { value: {} },

        // These two are populated during finalization.
        allSupertypes: { value: {} }, // Includes own typeName.
        allFields: { value: {} }, // Includes inherited fields.

        type: {
            value: new Type(function(value, deep) {
                return self.check(value, deep);
            }, typeName)
        }
    });
}

Def.fromValue = function(value) {
    if (isObject.check(value) &&
        value.hasOwnProperty("type") &&
        defCache.hasOwnProperty(value.type))
    {
        var vDef = defCache[value.type];
        assert.strictEqual(vDef.finalized, true);
        return vDef;
    }
};

var Dp = Def.prototype;

Dp.isSupertypeOf = function(that) {
    assert.ok(that instanceof Def, that + " is not a Def");
    assert.strictEqual(this.finalized, true);
    assert.strictEqual(that.finalized, true);
    return that.allSupertypes.hasOwnProperty(this.typeName);
};

Dp.checkAllFields = function(value, deep) {
    var allFields = this.allFields;
    assert.strictEqual(this.finalized, true);

    function checkFieldByName(name) {
        var field = allFields[name];
        var type = field.type;
        var child = field.getValue(value);
        return type.check(child, deep);
    }

    return isObject.check(value)
        && Object.keys(allFields).every(checkFieldByName);
};

Dp.check = function(value, deep) {
    assert.strictEqual(
        this.finalized, true,
        "prematurely checking unfinalized type " + this.typeName);

    // A Def type can only match an object value.
    if (!isObject.check(value))
        return false;

    var vDef = Def.fromValue(value);

    // If we couldn't determine the Def associated with the given value,
    // it was probably just missing a "type" field, so be optimistic and
    // let this.checkAllFields make the final decision.
    if (!vDef)
        return this.checkAllFields(value, deep);

    // If checking deeply and vDef === this, then we only need to call
    // checkAllFields once. Calling checkAllFields is too strict when deep
    // is false, because then we only care about this.isSupertypeOf(vDef).
    if (deep && vDef === this)
        return this.checkAllFields(value, deep);

    // In most cases we rely exclusively on isSupertypeOf to make O(1)
    // subtyping determinations. This suffices in most situations outside
    // of unit tests, since interface conformance is checked whenever new
    // instances are created using builder functions.
    if (!this.isSupertypeOf(vDef))
        return false;

    // The exception is when deep is true; then, we recursively check all
    // fields.
    if (!deep)
        return true;

    // Use the more specific Def (vDef) to perform the deep check, but
    // shallow-check fields defined by the less specific Def (this).
    return vDef.checkAllFields(value, deep)
        && this.checkAllFields(value, false);
};

Dp.bases = function() {
    var bases = this.baseNames;

    assert.strictEqual(this.finalized, false);

    each.call(arguments, function(baseName) {
        isString.assert(baseName);

        // This indexOf lookup may be O(n), but the typical number of base
        // names is very small, and indexOf is a native Array method.
        if (bases.indexOf(baseName) < 0)
            bases.push(baseName);
    });

    return this; // For chaining.
};

// False by default until .build(...) is called on an instance.
Object.defineProperty(Dp, "buildable", { value: false });

var builders = {};
Object.defineProperty(exports, "builders", {
    value: builders
});

// Calling the .build method of a Def simultaneously marks the type as
// buildable (by defining builders[getBuilderName(typeName)]) and
// specifies the order of arguments that should be passed to the builder
// function to create an instance of the type.
Dp.build = function(/* param1, param2, ... */) {
    var self = this;
    var buildParams = slice.call(arguments);
    var typeName = self.typeName;

    assert.strictEqual(self.finalized, false);
    isString.arrayOf().assert(buildParams);

    // Every buildable type will have its "type" field filled in
    // automatically. This includes types that are not subtypes of Node,
    // like SourceLocation, but that seems harmless (TODO?).
    self.field("type", typeName, function() { return typeName });

    // Override Dp.buildable for this Def instance.
    Object.defineProperty(self, "buildable", { value: true });

    Object.defineProperty(builders, getBuilderName(typeName), {
        enumerable: true,

        value: function() {
            var args = arguments;
            var argc = args.length;
            var built = {};

            assert.ok(
                self.finalized,
                "attempting to instantiate unfinalized type " + typeName);

            function add(param, i) {
                if (built.hasOwnProperty(param))
                    return;

                var all = self.allFields;
                assert.ok(all.hasOwnProperty(param), param);

                var field = all[param];
                var type = field.type;
                var value;

                if (isNumber.check(i) && i < argc) {
                    value = args[i];
                } else if (field.defaultFn) {
                    // Expose the partially-built object to the default
                    // function as its `this` object.
                    value = field.defaultFn.call(built);
                } else {
                    var message = "no value or default function given for field " +
                        JSON.stringify(param) + " of " + typeName + "(" +
                            buildParams.map(function(name) {
                                return all[name];
                            }).join(", ") + ")";
                    assert.ok(false, message);
                }

                assert.ok(
                    type.check(value),
                    shallowStringify(value) +
                        " does not match field " + field +
                        " of type " + typeName);

                // TODO Could attach getters and setters here to enforce
                // dynamic type safety.
                built[param] = value;
            }

            buildParams.forEach(function(param, i) {
                add(param, i);
            });

            Object.keys(self.allFields).forEach(function(param) {
                add(param); // Use the default value.
            });

            // Make sure that the "type" field was filled automatically.
            assert.strictEqual(built.type, typeName);

            return built;
        }
    });

    return self; // For chaining.
};

function getBuilderName(typeName) {
    return typeName.replace(/^[A-Z]+/, function(upperCasePrefix) {
        var len = upperCasePrefix.length;
        switch (len) {
        case 0: return "";
        // If there's only one initial capital letter, just lower-case it.
        case 1: return upperCasePrefix.toLowerCase();
        default:
            // If there's more than one initial capital letter, lower-case
            // all but the last one, so that XMLDefaultDeclaration (for
            // example) becomes xmlDefaultDeclaration.
            return upperCasePrefix.slice(
                0, len - 1).toLowerCase() +
                upperCasePrefix.charAt(len - 1);
        }
    });
}

// The reason fields are specified using .field(...) instead of an object
// literal syntax is somewhat subtle: the object literal syntax would
// support only one key and one value, but with .field(...) we can pass
// any number of arguments to specify the field.
Dp.field = function(name, type, defaultFn, hidden) {
    assert.strictEqual(this.finalized, false);
    this.ownFields[name] = new Field(name, type, defaultFn, hidden);
    return this; // For chaining.
};

var namedTypes = {};
Object.defineProperty(exports, "namedTypes", {
    value: namedTypes
});

// Get the value of an object property, taking object.type and default
// functions into account.
Object.defineProperty(exports, "getFieldValue", {
    value: function(object, fieldName) {
        var d = Def.fromValue(object);
        if (d) {
            var field = d.allFields[fieldName];
            if (field) {
                return field.getValue(object);
            }
        }

        return object[fieldName];
    }
});

// Iterate over all defined fields of an object, including those missing
// or undefined, passing each field name and effective value (as returned
// by getFieldValue) to the callback. If the object has no corresponding
// Def, the callback will never be called.
Object.defineProperty(exports, "eachField", {
    value: function(object, callback, context) {
        var d = Def.fromValue(object);
        if (d) {
            var all = d.allFields;
            Object.keys(all).forEach(function(name) {
                var field = all[name];
                if (!field.hidden) {
                    callback.call(this, name, field.getValue(object));
                }
            }, context);
        }
    }
});

// Similar to eachField, except that iteration stops as soon as the
// callback returns a truthy value. Like Array.prototype.some, the final
// result is either true or false to indicates whether the callback
// returned true for any element or not.
Object.defineProperty(exports, "someField", {
    value: function(object, callback, context) {
        var d = Def.fromValue(object);
        if (d) {
            var all = d.allFields;
            return Object.keys(all).some(function(name) {
                var field = all[name];
                if (!field.hidden) {
                    var value = field.getValue(object);
                    return callback.call(this, name, value);
                }
            }, context);
        }

        // If the object has no fields, then of course no field satisified
        // the predicate.
        return false;
    }
});

// This property will be overridden as true by individual Def instances
// when they are finalized.
Object.defineProperty(Dp, "finalized", { value: false });

Dp.finalize = function() {
    // It's not an error to finalize a type more than once, but only the
    // first call to .finalize does anything.
    if (!this.finalized) {
        var allFields = this.allFields;
        var allSupertypes = this.allSupertypes;

        this.baseNames.forEach(function(name) {
            var def = defCache[name];
            def.finalize();
            extend(allFields, def.allFields);
            extend(allSupertypes, def.allSupertypes);
        });

        // TODO Warn if fields are overridden with incompatible types.
        extend(allFields, this.ownFields);
        allSupertypes[this.typeName] = this;

        // Types are exported only once they have been finalized.
        Object.defineProperty(namedTypes, this.typeName, {
            enumerable: true,
            value: this.type
        });

        Object.defineProperty(this, "finalized", { value: true });
    }
};

function extend(into, from) {
    Object.keys(from).forEach(function(name) {
        into[name] = from[name];
    });

    return into;
};

Object.defineProperty(exports, "finalize", {
    // This function should be called at the end of any complete file of
    // type definitions. It declares that everything defined so far is
    // complete and needs no further modification, and defines all
    // finalized types as properties of exports.namedTypes.
    value: function() {
        Object.keys(defCache).forEach(function(name) {
            defCache[name].finalize();
        });
    }
});

},{"assert":2}],24:[function(require,module,exports){
var types = require("./lib/types");

// This core module of AST types captures ES5 as it is parsed today by
// git://github.com/ariya/esprima.git#master.
require("./def/core");

// Feel free to add to or remove from this list of extension modules to
// configure the precise type hierarchy that you need.
require("./def/es6");
require("./def/mozilla");
require("./def/e4x");
require("./def/fb-harmony");

exports.Type = types.Type;
exports.builtInTypes = types.builtInTypes;
exports.namedTypes = types.namedTypes;
exports.builders = types.builders;
exports.getFieldValue = types.getFieldValue;
exports.eachField = types.eachField;
exports.someField = types.someField;
exports.traverse = require("./lib/traverse");
exports.finalize = types.finalize;
exports.NodePath = require("./lib/node-path");

},{"./def/core":14,"./def/e4x":15,"./def/es6":16,"./def/fb-harmony":17,"./def/mozilla":18,"./lib/node-path":19,"./lib/traverse":22,"./lib/types":23}],25:[function(require,module,exports){
var assert = require("assert");
var getChildCache = require("private").makeAccessor();
var Op = Object.prototype;
var hasOwn = Op.hasOwnProperty;
var toString = Op.toString;
var arrayToString = toString.call([]);
var Ap = Array.prototype;
var slice = Ap.slice;
var map = Ap.map;

function Path(value, parentPath, name) {
  assert.ok(this instanceof Path);

  if (parentPath) {
    assert.ok(parentPath instanceof Path);
  } else {
    parentPath = null;
    name = null;
  }

  Object.defineProperties(this, {
    // The value encapsulated by this Path, generally equal to
    // parentPath.value[name] if we have a parentPath.
    value: { value: value },

    // The immediate parent Path of this Path.
    parentPath: { value: parentPath },

    // The name of the property of parentPath.value through which this
    // Path's value was reached.
    name: {
      value: name,
      configurable: true
    }
  });
}

var Pp = Path.prototype;

function getChildPath(path, name) {
  var cache = getChildCache(path);
  return hasOwn.call(cache, name)
    ? cache[name]
    : cache[name] = new path.constructor(
        path.getValueProperty(name), path, name);
}

// This method is designed to be overridden by subclasses that need to
// handle missing properties, etc.
Pp.getValueProperty = function(name) {
  return this.value[name];
};

Pp.get = function(name) {
  var path = this;
  var names = arguments;
  var count = names.length;

  for (var i = 0; i < count; ++i) {
    path = getChildPath(path, names[i]);
  }

  return path;
};

Pp.each = function(callback, context) {
  var childPaths = [];
  var len = this.value.length;
  var i = 0;

  // Collect all the original child paths before invoking the callback.
  for (var i = 0; i < len; ++i) {
    if (hasOwn.call(this.value, i)) {
      childPaths[i] = this.get(i);
    }
  }

  // Invoke the callback on just the original child paths, regardless of
  // any modifications made to the array by the callback. I chose these
  // semantics over cleverly invoking the callback on new elements because
  // this way is much easier to reason about.
  context = context || this;
  for (i = 0; i < len; ++i) {
    if (hasOwn.call(childPaths, i)) {
      callback.call(context, childPaths[i]);
    }
  }
};

Pp.map = function(callback, context) {
  var result = [];

  this.each(function(childPath) {
    result.push(callback.call(this, childPath));
  }, context);

  return result;
};

Pp.filter = function(callback, context) {
  var result = [];

  this.each(function(childPath) {
    if (callback.call(this, childPath)) {
      result.push(childPath);
    }
  }, context);

  return result;
};

Pp.replace = function(replacement) {
  var count = arguments.length;

  assert.ok(
    this.parentPath instanceof Path,
    "Instead of replacing the root of the tree, create a new tree."
  );

  var name = this.name;
  var parentValue = this.parentPath.value;
  var parentCache = getChildCache(this.parentPath);
  var results = [];

  if (toString.call(parentValue) === arrayToString) {
    delete parentCache.length;
    delete parentCache[name];

    var moved = {};

    for (var i = name + 1; i < parentValue.length; ++i) {
      var child = parentCache[i];
      if (child) {
        var newIndex = i - 1 + count;
        moved[newIndex] = child;
        Object.defineProperty(child, "name", { value: newIndex });
        delete parentCache[i];
      }
    }

    var args = slice.call(arguments);
    args.unshift(name, 1);
    parentValue.splice.apply(parentValue, args);

    for (newIndex in moved) {
      if (hasOwn.call(moved, newIndex)) {
        parentCache[newIndex] = moved[newIndex];
      }
    }

    for (i = name; i < name + count; ++i) {
      results.push(this.parentPath.get(i));
    }

  } else if (count === 1) {
    delete parentCache[name];
    parentValue[name] = replacement;
    results.push(this.parentPath.get(name));

  } else if (count === 0) {
    delete parentCache[name];
    delete parentValue[name];

  } else {
    assert.ok(false, "Could not replace Path.");
  }

  return results;
};

exports.Path = Path;

},{"assert":2,"private":28}],26:[function(require,module,exports){
exports.Path = require("./lib/path").Path;

},{"./lib/path":25}],27:[function(require,module,exports){
/*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true plusplus:true */
/*global esprima:true, define:true, exports:true, window: true,
throwError: true, generateStatement: true, peek: true,
parseAssignmentExpression: true, parseBlock: true,
parseClassExpression: true, parseClassDeclaration: true, parseExpression: true,
parseForStatement: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseImportSpecifier: true,
parseLeftHandSideExpression: true, parseParams: true, validateParam: true,
parseSpreadOrAssignmentExpression: true,
parseStatement: true, parseSourceElement: true, parseModuleBlock: true, parseConciseBody: true,
parseYieldExpression: true
*/

(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.esprima = {}));
    }
}(this, function (exports) {
    'use strict';

    var Token,
        TokenName,
        FnExprTokens,
        Syntax,
        PropertyKind,
        Messages,
        Regex,
        SyntaxTreeDelegate,
        ClassPropertyType,
        source,
        strict,
        index,
        lineNumber,
        lineStart,
        length,
        delegate,
        lookahead,
        state,
        extra;

    Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8,
        RegularExpression: 9,
        Template: 10
    };

    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    TokenName[Token.RegularExpression] = 'RegularExpression';

    // A function following one of those tokens is an expression.
    FnExprTokens = ["(", "{", "[", "in", "typeof", "instanceof", "new",
                    "return", "case", "delete", "throw", "void",
                    // assignment operators
                    "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
                    "&=", "|=", "^=", ",",
                    // binary/unary operators
                    "+", "-", "*", "/", "%", "++", "--", "<<", ">>", ">>>", "&",
                    "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=",
                    "<=", "<", ">", "!=", "!=="];

    Syntax = {
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AssignmentExpression: 'AssignmentExpression',
        BinaryExpression: 'BinaryExpression',
        BlockStatement: 'BlockStatement',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ClassHeritage: 'ClassHeritage',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportDeclaration: 'ExportDeclaration',
        ExportBatchSpecifier: 'ExportBatchSpecifier',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        ForStatement: 'ForStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportSpecifier: 'ImportSpecifier',
        LabeledStatement: 'LabeledStatement',
        Literal: 'Literal',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        ModuleDeclaration: 'ModuleDeclaration',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        SwitchCase: 'SwitchCase',
        SwitchStatement: 'SwitchStatement',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    PropertyKind = {
        Data: 1,
        Get: 2,
        Set: 4
    };

    ClassPropertyType = {
        static: 'static',
        prototype: 'prototype'
    };

    // Error messages should be identical to V8.
    Messages = {
        UnexpectedToken:  'Unexpected token %0',
        UnexpectedNumber:  'Unexpected number',
        UnexpectedString:  'Unexpected string',
        UnexpectedIdentifier:  'Unexpected identifier',
        UnexpectedReserved:  'Unexpected reserved word',
        UnexpectedTemplate:  'Unexpected quasi %0',
        UnexpectedEOS:  'Unexpected end of input',
        NewlineAfterThrow:  'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp:  'Invalid regular expression: missing /',
        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
        InvalidLHSInFormalsList:  'Invalid left-hand side in formals list',
        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
        NoCatchOrFinally:  'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalDuplicateClassProperty: 'Illegal duplicate property in class definition',
        IllegalReturn: 'Illegal return statement',
        IllegalYield: 'Illegal yield expression',
        IllegalSpread: 'Illegal spread element',
        StrictModeWith:  'Strict mode code may not include a with statement',
        StrictCatchVariable:  'Catch variable may not be eval or arguments in strict mode',
        StrictVarName:  'Variable name may not be eval or arguments in strict mode',
        StrictParamName:  'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        ParameterAfterRestParameter: 'Rest parameter must be final parameter of an argument list',
        DefaultRestParameter: 'Rest parameter can not have a default value',
        ElementAfterSpreadElement: 'Spread must be the final element of an element list',
        ObjectPatternAsRestParameter: 'Invalid rest parameter',
        ObjectPatternAsSpread: 'Invalid spread argument',
        StrictFunctionName:  'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral:  'Octal literals are not allowed in strict mode.',
        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
        AccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
        AccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name',
        StrictLHSAssignment:  'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix:  'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix:  'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord:  'Use of future reserved word in strict mode',
        NewlineAfterModule:  'Illegal newline after module',
        NoFromAfterImport: 'Missing from after import',
        InvalidModuleSpecifier: 'Invalid module specifier',
        NestedModule: 'Module declaration can not be nested',
        NoYieldInGenerator: 'Missing yield in generator',
        NoUnintializedConst: 'Const must be initialized',
        ComprehensionRequiresBlock: 'Comprehension must have at least one block',
        ComprehensionError:  'Comprehension Error',
        EachNotAllowed:  'Each is not supported'
    };

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
        NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
    };

    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
        if (!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }

    function isDecimalDigit(ch) {
        return (ch >= 48 && ch <= 57);   // 0..9
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
    }


    // 7.2 White Space

    function isWhiteSpace(ch) {
        return (ch === 32) ||  // space
            (ch === 9) ||      // tab
            (ch === 0xB) ||
            (ch === 0xC) ||
            (ch === 0xA0) ||
            (ch >= 0x1680 && '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(String.fromCharCode(ch)) > 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === 10) || (ch === 13) || (ch === 0x2028) || (ch === 0x2029);
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 97 && ch <= 122) ||        // a..z
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
    }

    function isIdentifierPart(ch) {
        return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
            (ch >= 65 && ch <= 90) ||         // A..Z
            (ch >= 97 && ch <= 122) ||        // a..z
            (ch >= 48 && ch <= 57) ||         // 0..9
            (ch === 92) ||                    // \ (backslash)
            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
            return true;
        default:
            return false;
        }
    }

    function isStrictModeReservedWord(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        if (strict && isStrictModeReservedWord(id)) {
            return true;
        }

        // 'const' is specialized as Keyword in V8.
        // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
        // Some others are from future reserved words.

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') ||
                (id === 'try') || (id === 'let');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    // 7.4 Comments

    function skipComment() {
        var ch, blockComment, lineComment;

        blockComment = false;
        lineComment = false;

        while (index < length) {
            ch = source.charCodeAt(index);

            if (lineComment) {
                ++index;
                if (isLineTerminator(ch)) {
                    lineComment = false;
                    if (ch === 13 && source.charCodeAt(index) === 10) {
                        ++index;
                    }
                    ++lineNumber;
                    lineStart = index;
                }
            } else if (blockComment) {
                if (isLineTerminator(ch)) {
                    if (ch === 13 && source.charCodeAt(index + 1) === 10) {
                        ++index;
                    }
                    ++lineNumber;
                    ++index;
                    lineStart = index;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    ch = source.charCodeAt(index++);
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    // Block comment ends with '*/' (char #42, char #47).
                    if (ch === 42) {
                        ch = source.charCodeAt(index);
                        if (ch === 47) {
                            ++index;
                            blockComment = false;
                        }
                    }
                }
            } else if (ch === 47) {
                ch = source.charCodeAt(index + 1);
                // Line comment starts with '//' (char #47, char #47).
                if (ch === 47) {
                    index += 2;
                    lineComment = true;
                } else if (ch === 42) {
                    // Block comment starts with '/*' (char #47, char #42).
                    index += 2;
                    blockComment = true;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    break;
                }
            } else if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 13 && source.charCodeAt(index) === 10) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
            } else {
                break;
            }
        }
    }

    function scanHexEscape(prefix) {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
                ch = source[index++];
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function scanUnicodeCodePointEscape() {
        var ch, code, cu1, cu2;

        ch = source[index];
        code = 0;

        // At least, one hex digit is required.
        if (ch === '}') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        while (index < length) {
            ch = source[index++];
            if (!isHexDigit(ch)) {
                break;
            }
            code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
        }

        if (code > 0x10FFFF || ch !== '}') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        // UTF-16 Encoding
        if (code <= 0xFFFF) {
            return String.fromCharCode(code);
        }
        cu1 = ((code - 0x10000) >> 10) + 0xD800;
        cu2 = ((code - 0x10000) & 1023) + 0xDC00;
        return String.fromCharCode(cu1, cu2);
    }

    function getEscapedIdentifier() {
        var ch, id;

        ch = source.charCodeAt(index++);
        id = String.fromCharCode(ch);

        // '\u' (char #92, char #117) denotes an escaped character.
        if (ch === 92) {
            if (source.charCodeAt(index) !== 117) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
        }

        while (index < length) {
            ch = source.charCodeAt(index);
            if (!isIdentifierPart(ch)) {
                break;
            }
            ++index;
            id += String.fromCharCode(ch);

            // '\u' (char #92, char #117) denotes an escaped character.
            if (ch === 92) {
                id = id.substr(0, id.length - 1);
                if (source.charCodeAt(index) !== 117) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                ++index;
                ch = scanHexEscape('u');
                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
                id += ch;
            }
        }

        return id;
    }

    function getIdentifier() {
        var start, ch;

        start = index++;
        while (index < length) {
            ch = source.charCodeAt(index);
            if (ch === 92) {
                // Blackslash (char #92) marks Unicode escape sequence.
                index = start;
                return getEscapedIdentifier();
            }
            if (isIdentifierPart(ch)) {
                ++index;
            } else {
                break;
            }
        }

        return source.slice(start, index);
    }

    function scanIdentifier() {
        var start, id, type;

        start = index;

        // Backslash (char #92) starts an escaped character.
        id = (source.charCodeAt(index) === 92) ? getEscapedIdentifier() : getIdentifier();

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            type = Token.Identifier;
        } else if (isKeyword(id)) {
            type = Token.Keyword;
        } else if (id === 'null') {
            type = Token.NullLiteral;
        } else if (id === 'true' || id === 'false') {
            type = Token.BooleanLiteral;
        } else {
            type = Token.Identifier;
        }

        return {
            type: type,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }


    // 7.7 Punctuators

    function scanPunctuator() {
        var start = index,
            code = source.charCodeAt(index),
            code2,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;

        switch (code) {
        // Check for most common single-character punctuators.
        case 40:   // ( open bracket
        case 41:   // ) close bracket
        case 59:   // ; semicolon
        case 44:   // , comma
        case 123:  // { open curly brace
        case 125:  // } close curly brace
        case 91:   // [
        case 93:   // ]
        case 58:   // :
        case 63:   // ?
        case 126:  // ~
            ++index;
            if (extra.tokenize) {
                if (code === 40) {
                    extra.openParenToken = extra.tokens.length;
                } else if (code === 123) {
                    extra.openCurlyToken = extra.tokens.length;
                }
            }
            return {
                type: Token.Punctuator,
                value: String.fromCharCode(code),
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };

        default:
            code2 = source.charCodeAt(index + 1);

            // '=' (char #61) marks an assignment or comparison operator.
            if (code2 === 61) {
                switch (code) {
                case 37:  // %
                case 38:  // &
                case 42:  // *:
                case 43:  // +
                case 45:  // -
                case 47:  // /
                case 60:  // <
                case 62:  // >
                case 94:  // ^
                case 124: // |
                    index += 2;
                    return {
                        type: Token.Punctuator,
                        value: String.fromCharCode(code) + String.fromCharCode(code2),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };

                case 33: // !
                case 61: // =
                    index += 2;

                    // !== and ===
                    if (source.charCodeAt(index) === 61) {
                        ++index;
                    }
                    return {
                        type: Token.Punctuator,
                        value: source.slice(start, index),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };
                default:
                    break;
                }
            }
            break;
        }

        // Peek more characters.

        ch2 = source[index + 1];
        ch3 = source[index + 2];
        ch4 = source[index + 3];

        // 4-character punctuator: >>>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            if (ch4 === '=') {
                index += 4;
                return {
                    type: Token.Punctuator,
                    value: '>>>=',
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        // 3-character punctuators: === !== >>> <<= >>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '>>>',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '<<=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '>>=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '.' && ch2 === '.' && ch3 === '.') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '...',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // Other 2-character punctuators: ++ -- << >> && ||

        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
            index += 2;
            return {
                type: Token.Punctuator,
                value: ch1 + ch2,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '=' && ch2 === '>') {
            index += 2;
            return {
                type: Token.Punctuator,
                value: '=>',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '.') {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    // 7.8.3 Numeric Literals

    function scanHexLiteral(start) {
        var number = '';

        while (index < length) {
            if (!isHexDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (number.length === 0) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt('0x' + number, 16),
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanOctalLiteral(prefix, start) {
        var number, octal;

        if (isOctalDigit(prefix)) {
            octal = true;
            number = '0' + source[index++];
        } else {
            octal = false;
            ++index;
            number = '';
        }

        while (index < length) {
            if (!isOctalDigit(source[index])) {
                break;
            }
            number += source[index++];
        }

        if (!octal && number.length === 0) {
            // only 0o or 0O
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseInt(number, 8),
            octal: octal,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanNumericLiteral() {
        var number, start, ch, octal;

        ch = source[index];
        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
            'Numeric literal must start with a decimal digit or a decimal point');

        start = index;
        number = '';
        if (ch !== '.') {
            number = source[index++];
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            // Octal number in ES6 starts with '0o'.
            // Binary number in ES6 starts with '0b'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    ++index;
                    return scanHexLiteral(start);
                }
                if (ch === 'b' || ch === 'B') {
                    ++index;
                    number = '';

                    while (index < length) {
                        ch = source[index];
                        if (ch !== '0' && ch !== '1') {
                            break;
                        }
                        number += source[index++];
                    }

                    if (number.length === 0) {
                        // only 0b or 0B
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }

                    if (index < length) {
                        ch = source.charCodeAt(index);
                        if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    }
                    return {
                        type: Token.NumericLiteral,
                        value: parseInt(number, 2),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };
                }
                if (ch === 'o' || ch === 'O' || isOctalDigit(ch)) {
                    return scanOctalLiteral(ch, start);
                }
                // decimal number starts with '0' such as '09' is illegal.
                if (ch && isDecimalDigit(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            }

            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === '.') {
            number += source[index++];
            while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
            }
            ch = source[index];
        }

        if (ch === 'e' || ch === 'E') {
            number += source[index++];

            ch = source[index];
            if (ch === '+' || ch === '-') {
                number += source[index++];
            }
            if (isDecimalDigit(source.charCodeAt(index))) {
                while (isDecimalDigit(source.charCodeAt(index))) {
                    number += source[index++];
                }
            } else {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
        var str = '', quote, start, ch, code, unescaped, restore, octal = false;

        quote = source[index];
        assert((quote === '\'' || quote === '"'),
            'String literal must starts with a quote');

        start = index;
        ++index;

        while (index < length) {
            ch = source[index++];

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = source[index++];
                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'u':
                    case 'x':
                        if (source[index] === '{') {
                            ++index;
                            str += scanUnicodeCodePointEscape();
                        } else {
                            restore = index;
                            unescaped = scanHexEscape(ch);
                            if (unescaped) {
                                str += unescaped;
                            } else {
                                index = restore;
                                str += ch;
                            }
                        }
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'v':
                        str += '\x0B';
                        break;

                    default:
                        if (isOctalDigit(ch)) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            if (code !== 0) {
                                octal = true;
                            }

                            if (index < length && isOctalDigit(source[index])) {
                                octal = true;
                                code = code * 8 + '01234567'.indexOf(source[index++]);

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        isOctalDigit(source[index])) {
                                    code = code * 8 + '01234567'.indexOf(source[index++]);
                                }
                            }
                            str += String.fromCharCode(code);
                        } else {
                            str += ch;
                        }
                        break;
                    }
                } else {
                    ++lineNumber;
                    if (ch ===  '\r' && source[index] === '\n') {
                        ++index;
                    }
                }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str,
            octal: octal,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanTemplate() {
        var cooked = '', ch, start, terminated, tail, restore, unescaped, code, octal;

        terminated = false;
        tail = false;
        start = index;

        ++index;

        while (index < length) {
            ch = source[index++];
            if (ch === '`') {
                tail = true;
                terminated = true;
                break;
            } else if (ch === '$') {
                if (source[index] === '{') {
                    ++index;
                    terminated = true;
                    break;
                }
                cooked += ch;
            } else if (ch === '\\') {
                ch = source[index++];
                if (!isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                    case 'n':
                        cooked += '\n';
                        break;
                    case 'r':
                        cooked += '\r';
                        break;
                    case 't':
                        cooked += '\t';
                        break;
                    case 'u':
                    case 'x':
                        if (source[index] === '{') {
                            ++index;
                            cooked += scanUnicodeCodePointEscape();
                        } else {
                            restore = index;
                            unescaped = scanHexEscape(ch);
                            if (unescaped) {
                                cooked += unescaped;
                            } else {
                                index = restore;
                                cooked += ch;
                            }
                        }
                        break;
                    case 'b':
                        cooked += '\b';
                        break;
                    case 'f':
                        cooked += '\f';
                        break;
                    case 'v':
                        cooked += '\v';
                        break;

                    default:
                        if (isOctalDigit(ch)) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            if (code !== 0) {
                                octal = true;
                            }

                            if (index < length && isOctalDigit(source[index])) {
                                octal = true;
                                code = code * 8 + '01234567'.indexOf(source[index++]);

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        isOctalDigit(source[index])) {
                                    code = code * 8 + '01234567'.indexOf(source[index++]);
                                }
                            }
                            cooked += String.fromCharCode(code);
                        } else {
                            cooked += ch;
                        }
                        break;
                    }
                } else {
                    ++lineNumber;
                    if (ch ===  '\r' && source[index] === '\n') {
                        ++index;
                    }
                }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                ++lineNumber;
                if (ch ===  '\r' && source[index] === '\n') {
                    ++index;
                }
                cooked += '\n';
            } else {
                cooked += ch;
            }
        }

        if (!terminated) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.Template,
            value: {
                cooked: cooked,
                raw: source.slice(start + 1, index - ((tail) ? 1 : 2))
            },
            tail: tail,
            octal: octal,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanTemplateElement(option) {
        var startsWith, template;

        lookahead = null;
        skipComment();

        startsWith = (option.head) ? '`' : '}';

        if (source[index] !== startsWith) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        template = scanTemplate();

        peek();

        return template;
    }

    function scanRegExp() {
        var str, ch, start, pattern, flags, value, classMarker = false, restore, terminated = false;

        lookahead = null;
        skipComment();

        start = index;
        ch = source[index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = source[index++];

        while (index < length) {
            ch = source[index++];
            str += ch;
            if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '\\') {
                    ch = source[index++];
                    // ECMA-262 7.8.5
                    if (isLineTerminator(ch.charCodeAt(0))) {
                        throwError({}, Messages.UnterminatedRegExp);
                    }
                    str += ch;
                } else if (ch === '/') {
                    terminated = true;
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                } else if (isLineTerminator(ch.charCodeAt(0))) {
                    throwError({}, Messages.UnterminatedRegExp);
                }
            }
        }

        if (!terminated) {
            throwError({}, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        pattern = str.substr(1, str.length - 2);

        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch.charCodeAt(0))) {
                break;
            }

            ++index;
            if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                    ++index;
                    restore = index;
                    ch = scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        for (str += '\\u'; restore < index; ++restore) {
                            str += source[restore];
                        }
                    } else {
                        index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                } else {
                    str += '\\';
                }
            } else {
                flags += ch;
                str += ch;
            }
        }

        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError({}, Messages.InvalidRegExp);
        }

        peek();


        if (extra.tokenize) {
            return {
                type: Token.RegularExpression,
                value: value,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
        return {
            literal: str,
            value: value,
            range: [start, index]
        };
    }

    function isIdentifierName(token) {
        return token.type === Token.Identifier ||
            token.type === Token.Keyword ||
            token.type === Token.BooleanLiteral ||
            token.type === Token.NullLiteral;
    }

    function advanceSlash() {
        var prevToken,
            checkToken;
        // Using the following algorithm:
        // https://github.com/mozilla/sweet.js/wiki/design
        prevToken = extra.tokens[extra.tokens.length - 1];
        if (!prevToken) {
            // Nothing before that: it cannot be a division.
            return scanRegExp();
        }
        if (prevToken.type === "Punctuator") {
            if (prevToken.value === ")") {
                checkToken = extra.tokens[extra.openParenToken - 1];
                if (checkToken &&
                        checkToken.type === "Keyword" &&
                        (checkToken.value === "if" ||
                         checkToken.value === "while" ||
                         checkToken.value === "for" ||
                         checkToken.value === "with")) {
                    return scanRegExp();
                }
                return scanPunctuator();
            }
            if (prevToken.value === "}") {
                // Dividing a function by anything makes little sense,
                // but we have to check for that.
                if (extra.tokens[extra.openCurlyToken - 3] &&
                        extra.tokens[extra.openCurlyToken - 3].type === "Keyword") {
                    // Anonymous function.
                    checkToken = extra.tokens[extra.openCurlyToken - 4];
                    if (!checkToken) {
                        return scanPunctuator();
                    }
                } else if (extra.tokens[extra.openCurlyToken - 4] &&
                        extra.tokens[extra.openCurlyToken - 4].type === "Keyword") {
                    // Named function.
                    checkToken = extra.tokens[extra.openCurlyToken - 5];
                    if (!checkToken) {
                        return scanRegExp();
                    }
                } else {
                    return scanPunctuator();
                }
                // checkToken determines whether the function is
                // a declaration or an expression.
                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                    // It is an expression.
                    return scanPunctuator();
                }
                // It is a declaration.
                return scanRegExp();
            }
            return scanRegExp();
        }
        if (prevToken.type === "Keyword") {
            return scanRegExp();
        }
        return scanPunctuator();
    }

    function advance() {
        var ch;

        skipComment();

        if (index >= length) {
            return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [index, index]
            };
        }

        ch = source.charCodeAt(index);

        // Very common: ( and ) and ;
        if (ch === 40 || ch === 41 || ch === 58) {
            return scanPunctuator();
        }

        // String literal starts with single quote (#39) or double quote (#34).
        if (ch === 39 || ch === 34) {
            return scanStringLiteral();
        }

        if (ch === 96) {
            return scanTemplate();
        }
        if (isIdentifierStart(ch)) {
            return scanIdentifier();
        }

        // Dot (.) char #46 can also start a floating-point number, hence the need
        // to check the next character.
        if (ch === 46) {
            if (isDecimalDigit(source.charCodeAt(index + 1))) {
                return scanNumericLiteral();
            }
            return scanPunctuator();
        }

        if (isDecimalDigit(ch)) {
            return scanNumericLiteral();
        }

        // Slash (/) char #47 can also start a regex.
        if (extra.tokenize && ch === 47) {
            return advanceSlash();
        }

        return scanPunctuator();
    }

    function lex() {
        var token;

        token = lookahead;
        index = token.range[1];
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        lookahead = advance();

        index = token.range[1];
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;

        return token;
    }

    function peek() {
        var pos, line, start;

        pos = index;
        line = lineNumber;
        start = lineStart;
        lookahead = advance();
        index = pos;
        lineNumber = line;
        lineStart = start;
    }

    function lookahead2() {
        var adv, pos, line, start, result;

        // If we are collecting the tokens, don't grab the next one yet.
        adv = (typeof extra.advance === 'function') ? extra.advance : advance;

        pos = index;
        line = lineNumber;
        start = lineStart;

        // Scan for the next immediate token.
        if (lookahead === null) {
            lookahead = adv();
        }
        index = lookahead.range[1];
        lineNumber = lookahead.lineNumber;
        lineStart = lookahead.lineStart;

        // Grab the token right after.
        result = adv();
        index = pos;
        lineNumber = line;
        lineStart = start;

        return result;
    }

    SyntaxTreeDelegate = {

        name: 'SyntaxTree',

        postProcess: function (node) {
            return node;
        },

        createArrayExpression: function (elements) {
            return {
                type: Syntax.ArrayExpression,
                elements: elements
            };
        },

        createAssignmentExpression: function (operator, left, right) {
            return {
                type: Syntax.AssignmentExpression,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBinaryExpression: function (operator, left, right) {
            var type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression :
                        Syntax.BinaryExpression;
            return {
                type: type,
                operator: operator,
                left: left,
                right: right
            };
        },

        createBlockStatement: function (body) {
            return {
                type: Syntax.BlockStatement,
                body: body
            };
        },

        createBreakStatement: function (label) {
            return {
                type: Syntax.BreakStatement,
                label: label
            };
        },

        createCallExpression: function (callee, args) {
            return {
                type: Syntax.CallExpression,
                callee: callee,
                'arguments': args
            };
        },

        createCatchClause: function (param, body) {
            return {
                type: Syntax.CatchClause,
                param: param,
                body: body
            };
        },

        createConditionalExpression: function (test, consequent, alternate) {
            return {
                type: Syntax.ConditionalExpression,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createContinueStatement: function (label) {
            return {
                type: Syntax.ContinueStatement,
                label: label
            };
        },

        createDebuggerStatement: function () {
            return {
                type: Syntax.DebuggerStatement
            };
        },

        createDoWhileStatement: function (body, test) {
            return {
                type: Syntax.DoWhileStatement,
                body: body,
                test: test
            };
        },

        createEmptyStatement: function () {
            return {
                type: Syntax.EmptyStatement
            };
        },

        createExpressionStatement: function (expression) {
            return {
                type: Syntax.ExpressionStatement,
                expression: expression
            };
        },

        createForStatement: function (init, test, update, body) {
            return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
            };
        },

        createForInStatement: function (left, right, body) {
            return {
                type: Syntax.ForInStatement,
                left: left,
                right: right,
                body: body,
                each: false
            };
        },

        createForOfStatement: function (left, right, body) {
            return {
                type: Syntax.ForOfStatement,
                left: left,
                right: right,
                body: body,
            };
        },

        createFunctionDeclaration: function (id, params, defaults, body, rest, generator, expression) {
            return {
                type: Syntax.FunctionDeclaration,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: rest,
                generator: generator,
                expression: expression
            };
        },

        createFunctionExpression: function (id, params, defaults, body, rest, generator, expression) {
            return {
                type: Syntax.FunctionExpression,
                id: id,
                params: params,
                defaults: defaults,
                body: body,
                rest: rest,
                generator: generator,
                expression: expression
            };
        },

        createIdentifier: function (name) {
            return {
                type: Syntax.Identifier,
                name: name
            };
        },

        createIfStatement: function (test, consequent, alternate) {
            return {
                type: Syntax.IfStatement,
                test: test,
                consequent: consequent,
                alternate: alternate
            };
        },

        createLabeledStatement: function (label, body) {
            return {
                type: Syntax.LabeledStatement,
                label: label,
                body: body
            };
        },

        createLiteral: function (token) {
            return {
                type: Syntax.Literal,
                value: token.value,
                raw: source.slice(token.range[0], token.range[1])
            };
        },

        createMemberExpression: function (accessor, object, property) {
            return {
                type: Syntax.MemberExpression,
                computed: accessor === '[',
                object: object,
                property: property
            };
        },

        createNewExpression: function (callee, args) {
            return {
                type: Syntax.NewExpression,
                callee: callee,
                'arguments': args
            };
        },

        createObjectExpression: function (properties) {
            return {
                type: Syntax.ObjectExpression,
                properties: properties
            };
        },

        createPostfixExpression: function (operator, argument) {
            return {
                type: Syntax.UpdateExpression,
                operator: operator,
                argument: argument,
                prefix: false
            };
        },

        createProgram: function (body) {
            return {
                type: Syntax.Program,
                body: body
            };
        },

        createProperty: function (kind, key, value, method, shorthand) {
            return {
                type: Syntax.Property,
                key: key,
                value: value,
                kind: kind,
                method: method,
                shorthand: shorthand
            };
        },

        createReturnStatement: function (argument) {
            return {
                type: Syntax.ReturnStatement,
                argument: argument
            };
        },

        createSequenceExpression: function (expressions) {
            return {
                type: Syntax.SequenceExpression,
                expressions: expressions
            };
        },

        createSwitchCase: function (test, consequent) {
            return {
                type: Syntax.SwitchCase,
                test: test,
                consequent: consequent
            };
        },

        createSwitchStatement: function (discriminant, cases) {
            return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant,
                cases: cases
            };
        },

        createThisExpression: function () {
            return {
                type: Syntax.ThisExpression
            };
        },

        createThrowStatement: function (argument) {
            return {
                type: Syntax.ThrowStatement,
                argument: argument
            };
        },

        createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
            return {
                type: Syntax.TryStatement,
                block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer
            };
        },

        createUnaryExpression: function (operator, argument) {
            if (operator === '++' || operator === '--') {
                return {
                    type: Syntax.UpdateExpression,
                    operator: operator,
                    argument: argument,
                    prefix: true
                };
            }
            return {
                type: Syntax.UnaryExpression,
                operator: operator,
                argument: argument
            };
        },

        createVariableDeclaration: function (declarations, kind) {
            return {
                type: Syntax.VariableDeclaration,
                declarations: declarations,
                kind: kind
            };
        },

        createVariableDeclarator: function (id, init) {
            return {
                type: Syntax.VariableDeclarator,
                id: id,
                init: init
            };
        },

        createWhileStatement: function (test, body) {
            return {
                type: Syntax.WhileStatement,
                test: test,
                body: body
            };
        },

        createWithStatement: function (object, body) {
            return {
                type: Syntax.WithStatement,
                object: object,
                body: body
            };
        },

        createTemplateElement: function (value, tail) {
            return {
                type: Syntax.TemplateElement,
                value: value,
                tail: tail
            };
        },

        createTemplateLiteral: function (quasis, expressions) {
            return {
                type: Syntax.TemplateLiteral,
                quasis: quasis,
                expressions: expressions
            };
        },

        createSpreadElement: function (argument) {
            return {
                type: Syntax.SpreadElement,
                argument: argument
            };
        },

        createTaggedTemplateExpression: function (tag, quasi) {
            return {
                type: Syntax.TaggedTemplateExpression,
                tag: tag,
                quasi: quasi
            };
        },

        createArrowFunctionExpression: function (params, defaults, body, rest, expression) {
            return {
                type: Syntax.ArrowFunctionExpression,
                id: null,
                params: params,
                defaults: defaults,
                body: body,
                rest: rest,
                generator: false,
                expression: expression
            };
        },

        createMethodDefinition: function (propertyType, kind, key, value) {
            return {
                type: Syntax.MethodDefinition,
                key: key,
                value: value,
                kind: kind,
                'static': propertyType === ClassPropertyType.static
            };
        },

        createClassBody: function (body) {
            return {
                type: Syntax.ClassBody,
                body: body
            };
        },

        createClassExpression: function (id, superClass, body) {
            return {
                type: Syntax.ClassExpression,
                id: id,
                superClass: superClass,
                body: body
            };
        },

        createClassDeclaration: function (id, superClass, body) {
            return {
                type: Syntax.ClassDeclaration,
                id: id,
                superClass: superClass,
                body: body
            };
        },

        createExportSpecifier: function (id, name) {
            return {
                type: Syntax.ExportSpecifier,
                id: id,
                name: name
            };
        },

        createExportBatchSpecifier: function () {
            return {
                type: Syntax.ExportBatchSpecifier
            };
        },

        createExportDeclaration: function (declaration, specifiers, source) {
            return {
                type: Syntax.ExportDeclaration,
                declaration: declaration,
                specifiers: specifiers,
                source: source
            };
        },

        createImportSpecifier: function (id, name) {
            return {
                type: Syntax.ImportSpecifier,
                id: id,
                name: name
            };
        },

        createImportDeclaration: function (specifiers, kind, source) {
            return {
                type: Syntax.ImportDeclaration,
                specifiers: specifiers,
                kind: kind,
                source: source
            };
        },

        createYieldExpression: function (argument, delegate) {
            return {
                type: Syntax.YieldExpression,
                argument: argument,
                delegate: delegate
            };
        },

        createModuleDeclaration: function (id, source, body) {
            return {
                type: Syntax.ModuleDeclaration,
                id: id,
                source: source,
                body: body
            };
        }


    };

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, start, found;

        pos = index;
        line = lineNumber;
        start = lineStart;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
        var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(
                /%(\d)/g,
                function (whole, index) {
                    assert(index < args.length, 'Message reference must be in range');
                    return args[index];
                }
            );

        if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.range[0];
            error.lineNumber = token.lineNumber;
            error.column = token.range[0] - lineStart + 1;
        } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
        }

        error.description = msg;
        throw error;
    }

    function throwErrorTolerant() {
        try {
            throwError.apply(null, arguments);
        } catch (e) {
            if (extra.errors) {
                extra.errors.push(e);
            } else {
                throw e;
            }
        }
    }


    // Throw an exception because of the token.

    function throwUnexpected(token) {
        if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
        }

        if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictReservedWord);
                return;
            }
            throwError(token, Messages.UnexpectedToken, token.value);
        }

        if (token.type === Token.Template) {
            throwError(token, Messages.UnexpectedTemplate, token.value.raw);
        }

        // BooleanLiteral, NullLiteral, or Punctuator.
        throwError(token, Messages.UnexpectedToken, token.value);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.

    function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
        return lookahead.type === Token.Punctuator && lookahead.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
        return lookahead.type === Token.Keyword && lookahead.value === keyword;
    }


    // Return true if the next token matches the specified contextual keyword

    function matchContextualKeyword(keyword) {
        return lookahead.type === Token.Identifier && lookahead.value === keyword;
    }

    // Return true if the next token is an assignment operator

    function matchAssign() {
        var op;

        if (lookahead.type !== Token.Punctuator) {
            return false;
        }
        op = lookahead.value;
        return op === '=' ||
            op === '*=' ||
            op === '/=' ||
            op === '%=' ||
            op === '+=' ||
            op === '-=' ||
            op === '<<=' ||
            op === '>>=' ||
            op === '>>>=' ||
            op === '&=' ||
            op === '^=' ||
            op === '|=';
    }

    function consumeSemicolon() {
        var line;

        // Catch the very common case first: immediately a semicolon (char #59).
        if (source.charCodeAt(index) === 59) {
            lex();
            return;
        }

        line = lineNumber;
        skipComment();
        if (lineNumber !== line) {
            return;
        }

        if (match(';')) {
            lex();
            return;
        }

        if (lookahead.type !== Token.EOF && !match('}')) {
            throwUnexpected(lookahead);
        }
    }

    // Return true if provided expression is LeftHandSideExpression

    function isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    }

    function isAssignableLeftHandSide(expr) {
        return isLeftHandSide(expr) || expr.type === Syntax.ObjectPattern || expr.type === Syntax.ArrayPattern;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [], blocks = [], filter = null, tmp, possiblecomprehension = true, body;

        expect('[');
        while (!match(']')) {
            if (lookahead.value === 'for' &&
                    lookahead.type === Token.Keyword) {
                if (!possiblecomprehension) {
                    throwError({}, Messages.ComprehensionError);
                }
                matchKeyword('for');
                tmp = parseForStatement({ignore_body: true});
                tmp.of = tmp.type === Syntax.ForOfStatement;
                tmp.type = Syntax.ComprehensionBlock;
                if (tmp.left.kind) { // can't be let or const
                    throwError({}, Messages.ComprehensionError);
                }
                blocks.push(tmp);
            } else if (lookahead.value === 'if' &&
                           lookahead.type === Token.Keyword) {
                if (!possiblecomprehension) {
                    throwError({}, Messages.ComprehensionError);
                }
                expectKeyword('if');
                expect('(');
                filter = parseExpression();
                expect(')');
            } else if (lookahead.value === ',' &&
                           lookahead.type === Token.Punctuator) {
                possiblecomprehension = false; // no longer allowed.
                lex();
                elements.push(null);
            } else {
                tmp = parseSpreadOrAssignmentExpression();
                elements.push(tmp);
                if (tmp && tmp.type === Syntax.SpreadElement) {
                    if (!match(']')) {
                        throwError({}, Messages.ElementAfterSpreadElement);
                    }
                } else if (!(match(']') || matchKeyword('for') || matchKeyword('if'))) {
                    expect(','); // this lexes.
                    possiblecomprehension = false;
                }
            }
        }

        expect(']');

        if (filter && !blocks.length) {
            throwError({}, Messages.ComprehensionRequiresBlock);
        }

        if (blocks.length) {
            if (elements.length !== 1) {
                throwError({}, Messages.ComprehensionError);
            }
            return {
                type:  Syntax.ComprehensionExpression,
                filter: filter,
                blocks: blocks,
                body: elements[0]
            };
        }
        return delegate.createArrayExpression(elements);
    }

    // 11.1.5 Object Initialiser

    function parsePropertyFunction(options) {
        var previousStrict, previousYieldAllowed, params, defaults, body;

        previousStrict = strict;
        previousYieldAllowed = state.yieldAllowed;
        state.yieldAllowed = options.generator;
        params = options.params || [];
        defaults = options.defaults || [];

        body = parseConciseBody();
        if (options.name && strict && isRestrictedWord(params[0].name)) {
            throwErrorTolerant(options.name, Messages.StrictParamName);
        }
        if (state.yieldAllowed && !state.yieldFound) {
            throwErrorTolerant({}, Messages.NoYieldInGenerator);
        }
        strict = previousStrict;
        state.yieldAllowed = previousYieldAllowed;

        return delegate.createFunctionExpression(null, params, defaults, body, options.rest || null, options.generator, body.type !== Syntax.BlockStatement);
    }


    function parsePropertyMethodFunction(options) {
        var previousStrict, tmp, method;

        previousStrict = strict;
        strict = true;

        tmp = parseParams();

        if (tmp.stricted) {
            throwErrorTolerant(tmp.stricted, tmp.message);
        }


        method = parsePropertyFunction({
            params: tmp.params,
            defaults: tmp.defaults,
            rest: tmp.rest,
            generator: options.generator
        });

        strict = previousStrict;

        return method;
    }


    function parseObjectPropertyKey() {
        var token = lex();

        // Note: This function is called only from parseObjectProperty(), where
        // EOF and Punctuator tokens are already filtered out.

        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return delegate.createLiteral(token);
        }

        return delegate.createIdentifier(token.value);
    }

    function parseObjectProperty() {
        var token, key, id, value, param;

        token = lookahead;

        if (token.type === Token.Identifier) {

            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !(match(':') || match('('))) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                return delegate.createProperty('get', key, parsePropertyFunction({ generator: false }), false, false);
            }
            if (token.value === 'set' && !(match(':') || match('('))) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead;
                param = [ parseVariableIdentifier() ];
                expect(')');
                return delegate.createProperty('set', key, parsePropertyFunction({ params: param, generator: false, name: token }), false, false);
            }
            if (match(':')) {
                lex();
                return delegate.createProperty('init', id, parseAssignmentExpression(), false, false);
            }
            if (match('(')) {
                return delegate.createProperty('init', id, parsePropertyMethodFunction({ generator: false }), true, false);
            }
            return delegate.createProperty('init', id, id, false, true);
        }
        if (token.type === Token.EOF || token.type === Token.Punctuator) {
            if (!match('*')) {
                throwUnexpected(token);
            }
            lex();

            id = parseObjectPropertyKey();

            if (!match('(')) {
                throwUnexpected(lex());
            }

            return delegate.createProperty('init', id, parsePropertyMethodFunction({ generator: true }), true, false);
        }
        key = parseObjectPropertyKey();
        if (match(':')) {
            lex();
            return delegate.createProperty('init', key, parseAssignmentExpression(), false, false);
        }
        if (match('(')) {
            return delegate.createProperty('init', key, parsePropertyMethodFunction({ generator: false }), true, false);
        }
        throwUnexpected(lex());
    }

    function parseObjectInitialiser() {
        var properties = [], property, name, key, kind, map = {}, toString = String;

        expect('{');

        while (!match('}')) {
            property = parseObjectProperty();

            if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
            } else {
                name = toString(property.key.value);
            }
            kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;

            key = '$' + name;
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (map[key] === PropertyKind.Data) {
                    if (strict && kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                    } else if (kind !== PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    }
                } else {
                    if (kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.AccessorDataProperty);
                    } else if (map[key] & kind) {
                        throwErrorTolerant({}, Messages.AccessorGetSet);
                    }
                }
                map[key] |= kind;
            } else {
                map[key] = kind;
            }

            properties.push(property);

            if (!match('}')) {
                expect(',');
            }
        }

        expect('}');

        return delegate.createObjectExpression(properties);
    }

    function parseTemplateElement(option) {
        var token = scanTemplateElement(option);
        if (strict && token.octal) {
            throwError(token, Messages.StrictOctalLiteral);
        }
        return delegate.createTemplateElement({ raw: token.value.raw, cooked: token.value.cooked }, token.tail);
    }

    function parseTemplateLiteral() {
        var quasi, quasis, expressions;

        quasi = parseTemplateElement({ head: true });
        quasis = [ quasi ];
        expressions = [];

        while (!quasi.tail) {
            expressions.push(parseExpression());
            quasi = parseTemplateElement({ head: false });
            quasis.push(quasi);
        }

        return delegate.createTemplateLiteral(quasis, expressions);
    }

    // 11.1.6 The Grouping Operator

    function parseGroupExpression() {
        var expr;

        expect('(');

        ++state.parenthesizedCount;

        state.allowArrowFunction = !state.allowArrowFunction;
        expr = parseExpression();
        state.allowArrowFunction = false;

        if (expr.type !== Syntax.ArrowFunctionExpression) {
            expect(')');
        }

        return expr;
    }


    // 11.1 Primary Expressions

    function parsePrimaryExpression() {
        var type, token;

        token = lookahead;
        type = lookahead.type;

        if (type === Token.Identifier) {
            lex();
            return delegate.createIdentifier(token.value);
        }

        if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && lookahead.octal) {
                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
            }
            return delegate.createLiteral(lex());
        }

        if (type === Token.Keyword) {
            if (matchKeyword('this')) {
                lex();
                return delegate.createThisExpression();
            }

            if (matchKeyword('function')) {
                return parseFunctionExpression();
            }

            if (matchKeyword('class')) {
                return parseClassExpression();
            }

            if (matchKeyword('super')) {
                lex();
                return delegate.createIdentifier('super');
            }
        }

        if (type === Token.BooleanLiteral) {
            token = lex();
            token.value = (token.value === 'true');
            return delegate.createLiteral(token);
        }

        if (type === Token.NullLiteral) {
            token = lex();
            token.value = null;
            return delegate.createLiteral(token);
        }

        if (match('[')) {
            return parseArrayInitialiser();
        }

        if (match('{')) {
            return parseObjectInitialiser();
        }

        if (match('(')) {
            return parseGroupExpression();
        }

        if (match('/') || match('/=')) {
            return delegate.createLiteral(scanRegExp());
        }

        if (type === Token.Template) {
            return parseTemplateLiteral();
        }

        return throwUnexpected(lex());
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [], arg;

        expect('(');

        if (!match(')')) {
            while (index < length) {
                arg = parseSpreadOrAssignmentExpression();
                args.push(arg);

                if (match(')')) {
                    break;
                } else if (arg.type === Syntax.SpreadElement) {
                    throwError({}, Messages.ElementAfterSpreadElement);
                }

                expect(',');
            }
        }

        expect(')');

        return args;
    }

    function parseSpreadOrAssignmentExpression() {
        if (match('...')) {
            lex();
            return delegate.createSpreadElement(parseAssignmentExpression());
        }
        return parseAssignmentExpression();
    }

    function parseNonComputedProperty() {
        var token = lex();

        if (!isIdentifierName(token)) {
            throwUnexpected(token);
        }

        return delegate.createIdentifier(token.value);
    }

    function parseNonComputedMember() {
        expect('.');

        return parseNonComputedProperty();
    }

    function parseComputedMember() {
        var expr;

        expect('[');

        expr = parseExpression();

        expect(']');

        return expr;
    }

    function parseNewExpression() {
        var callee, args;

        expectKeyword('new');
        callee = parseLeftHandSideExpression();
        args = match('(') ? parseArguments() : [];

        return delegate.createNewExpression(callee, args);
    }

    function parseLeftHandSideExpressionAllowCall() {
        var expr, args, property;

        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

        while (match('.') || match('[') || match('(') || lookahead.type === Token.Template) {
            if (match('(')) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
            } else if (match('[')) {
                expr = delegate.createMemberExpression('[', expr, parseComputedMember());
            } else if (match('.')) {
                expr = delegate.createMemberExpression('.', expr, parseNonComputedMember());
            } else {
                expr = delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral());
            }
        }

        return expr;
    }


    function parseLeftHandSideExpression() {
        var expr, property;

        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

        while (match('.') || match('[') || lookahead.type === Token.Template) {
            if (match('[')) {
                expr = delegate.createMemberExpression('[', expr, parseComputedMember());
            } else if (match('.')) {
                expr = delegate.createMemberExpression('.', expr, parseNonComputedMember());
            } else {
                expr = delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral());
            }
        }

        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr = parseLeftHandSideExpressionAllowCall(),
            token = lookahead;

        if (lookahead.type !== Token.Punctuator) {
            return expr;
        }

        if ((match('++') || match('--')) && !peekLineTerminator()) {
            // 11.3.1, 11.3.2
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPostfix);
            }

            if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            token = lex();
            expr = delegate.createPostfixExpression(token.value, expr);
        }

        return expr;
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
        var token, expr;

        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
            return parsePostfixExpression();
        }

        if (match('++') || match('--')) {
            token = lex();
            expr = parseUnaryExpression();
            // 11.4.4, 11.4.5
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPrefix);
            }

            if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            return delegate.createUnaryExpression(token.value, expr);
        }

        if (match('+') || match('-') || match('~') || match('!')) {
            token = lex();
            expr = parseUnaryExpression();
            return delegate.createUnaryExpression(token.value, expr);
        }

        if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
            }
            return expr;
        }

        return parsePostfixExpression();
    }

    function binaryPrecedence(token, allowIn) {
        var prec = 0;

        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
            return 0;
        }

        switch (token.value) {
        case '||':
            prec = 1;
            break;

        case '&&':
            prec = 2;
            break;

        case '|':
            prec = 3;
            break;

        case '^':
            prec = 4;
            break;

        case '&':
            prec = 5;
            break;

        case '==':
        case '!=':
        case '===':
        case '!==':
            prec = 6;
            break;

        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
            prec = 7;
            break;

        case 'in':
            prec = allowIn ? 7 : 0;
            break;

        case '<<':
        case '>>':
        case '>>>':
            prec = 8;
            break;

        case '+':
        case '-':
            prec = 9;
            break;

        case '*':
        case '/':
        case '%':
            prec = 11;
            break;

        default:
            break;
        }

        return prec;
    }

    // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators

    function parseBinaryExpression() {
        var expr, token, prec, previousAllowIn, stack, right, operator, left, i;

        previousAllowIn = state.allowIn;
        state.allowIn = true;

        expr = parseUnaryExpression();

        token = lookahead;
        prec = binaryPrecedence(token, previousAllowIn);
        if (prec === 0) {
            return expr;
        }
        token.prec = prec;
        lex();

        stack = [expr, token, parseUnaryExpression()];

        while ((prec = binaryPrecedence(lookahead, previousAllowIn)) > 0) {

            // Reduce: make a binary expression from the three topmost entries.
            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
                right = stack.pop();
                operator = stack.pop().value;
                left = stack.pop();
                stack.push(delegate.createBinaryExpression(operator, left, right));
            }

            // Shift.
            token = lex();
            token.prec = prec;
            stack.push(token);
            stack.push(parseUnaryExpression());
        }

        state.allowIn = previousAllowIn;

        // Final reduce to clean-up the stack.
        i = stack.length - 1;
        expr = stack[i];
        while (i > 1) {
            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
            i -= 2;
        }
        return expr;
    }


    // 11.12 Conditional Operator

    function parseConditionalExpression() {
        var expr, previousAllowIn, consequent, alternate;

        expr = parseBinaryExpression();

        if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');
            alternate = parseAssignmentExpression();

            expr = delegate.createConditionalExpression(expr, consequent, alternate);
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function reinterpretAsAssignmentBindingPattern(expr) {
        var i, len, property, element;

        if (expr.type === Syntax.ObjectExpression) {
            expr.type = Syntax.ObjectPattern;
            for (i = 0, len = expr.properties.length; i < len; i += 1) {
                property = expr.properties[i];
                if (property.kind !== 'init') {
                    throwError({}, Messages.InvalidLHSInAssignment);
                }
                reinterpretAsAssignmentBindingPattern(property.value);
            }
        } else if (expr.type === Syntax.ArrayExpression) {
            expr.type = Syntax.ArrayPattern;
            for (i = 0, len = expr.elements.length; i < len; i += 1) {
                element = expr.elements[i];
                if (element) {
                    reinterpretAsAssignmentBindingPattern(element);
                }
            }
        } else if (expr.type === Syntax.Identifier) {
            if (isRestrictedWord(expr.name)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }
        } else if (expr.type === Syntax.SpreadElement) {
            reinterpretAsAssignmentBindingPattern(expr.argument);
            if (expr.argument.type === Syntax.ObjectPattern) {
                throwError({}, Messages.ObjectPatternAsSpread);
            }
        } else {
            if (expr.type !== Syntax.MemberExpression && expr.type !== Syntax.CallExpression && expr.type !== Syntax.NewExpression) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }
        }
    }


    function reinterpretAsDestructuredParameter(options, expr) {
        var i, len, property, element;

        if (expr.type === Syntax.ObjectExpression) {
            expr.type = Syntax.ObjectPattern;
            for (i = 0, len = expr.properties.length; i < len; i += 1) {
                property = expr.properties[i];
                if (property.kind !== 'init') {
                    throwError({}, Messages.InvalidLHSInFormalsList);
                }
                reinterpretAsDestructuredParameter(options, property.value);
            }
        } else if (expr.type === Syntax.ArrayExpression) {
            expr.type = Syntax.ArrayPattern;
            for (i = 0, len = expr.elements.length; i < len; i += 1) {
                element = expr.elements[i];
                if (element) {
                    reinterpretAsDestructuredParameter(options, element);
                }
            }
        } else if (expr.type === Syntax.Identifier) {
            validateParam(options, expr, expr.name);
        } else {
            if (expr.type !== Syntax.MemberExpression) {
                throwError({}, Messages.InvalidLHSInFormalsList);
            }
        }
    }

    function reinterpretAsCoverFormalsList(expressions) {
        var i, len, param, params, defaults, defaultCount, options, rest;

        params = [];
        defaults = [];
        defaultCount = 0;
        rest = null;
        options = {
            paramSet: {}
        };

        for (i = 0, len = expressions.length; i < len; i += 1) {
            param = expressions[i];
            if (param.type === Syntax.Identifier) {
                params.push(param);
                defaults.push(null);
                validateParam(options, param, param.name);
            } else if (param.type === Syntax.ObjectExpression || param.type === Syntax.ArrayExpression) {
                reinterpretAsDestructuredParameter(options, param);
                params.push(param);
                defaults.push(null);
            } else if (param.type === Syntax.SpreadElement) {
                assert(i === len - 1, "It is guaranteed that SpreadElement is last element by parseExpression");
                reinterpretAsDestructuredParameter(options, param.argument);
                rest = param.argument;
            } else if (param.type === Syntax.AssignmentExpression) {
                params.push(param.left);
                defaults.push(param.right);
                ++defaultCount;
            } else {
                return null;
            }
        }

        if (options.firstRestricted) {
            throwError(options.firstRestricted, options.message);
        }
        if (options.stricted) {
            throwErrorTolerant(options.stricted, options.message);
        }

        if (defaultCount === 0) {
            defaults = [];
        }

        return { params: params, defaults: defaults, rest: rest };
    }

    function parseArrowFunctionExpression(options) {
        var previousStrict, previousYieldAllowed, body;

        expect('=>');

        previousStrict = strict;
        previousYieldAllowed = state.yieldAllowed;
        strict = true;
        state.yieldAllowed = false;
        body = parseConciseBody();
        strict = previousStrict;
        state.yieldAllowed = previousYieldAllowed;

        return delegate.createArrowFunctionExpression(options.params, options.defaults, body, options.rest, body.type !== Syntax.BlockStatement);
    }

    function parseAssignmentExpression() {
        var expr, token, params, oldParenthesizedCount;

        if (matchKeyword('yield')) {
            return parseYieldExpression();
        }

        oldParenthesizedCount = state.parenthesizedCount;

        if (match('(')) {
            token = lookahead2();
            if ((token.type === Token.Punctuator && token.value === ')') || token.value === '...') {
                params = parseParams();
                if (!match('=>')) {
                    throwUnexpected(lex());
                }
                return parseArrowFunctionExpression(params);
            }
        }

        token = lookahead;
        expr = parseConditionalExpression();

        if (match('=>') && expr.type === Syntax.Identifier) {
            if (state.parenthesizedCount === oldParenthesizedCount || state.parenthesizedCount === (oldParenthesizedCount + 1)) {
                if (isRestrictedWord(expr.name)) {
                    throwError({}, Messages.StrictParamName);
                }
                return parseArrowFunctionExpression({ params: [ expr ], defaults: [], rest: null });
            }
        }

        if (matchAssign()) {
            // 11.13.1
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant(token, Messages.StrictLHSAssignment);
            }

            // ES.next draf 11.13 Runtime Semantics step 1
            if (match('=') && (expr.type === Syntax.ObjectExpression || expr.type === Syntax.ArrayExpression)) {
                reinterpretAsAssignmentBindingPattern(expr);
            } else if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            expr = delegate.createAssignmentExpression(lex().value, expr, parseAssignmentExpression());
        }

        return expr;
    }

    // 11.14 Comma Operator

    function parseExpression() {
        var expr, expressions, sequence, coverFormalsList, spreadFound, token;

        expr = parseAssignmentExpression();
        expressions = [ expr ];

        if (match(',')) {
            while (index < length) {
                if (!match(',')) {
                    break;
                }

                lex();
                expr = parseSpreadOrAssignmentExpression();
                expressions.push(expr);

                if (expr.type === Syntax.SpreadElement) {
                    spreadFound = true;
                    if (!match(')')) {
                        throwError({}, Messages.ElementAfterSpreadElement);
                    }
                    break;
                }
            }

            sequence = delegate.createSequenceExpression(expressions);
        }

        if (state.allowArrowFunction && match(')')) {
            token = lookahead2();
            if (token.value === '=>') {
                lex();

                state.allowArrowFunction = false;
                expr = expressions;
                coverFormalsList = reinterpretAsCoverFormalsList(expr);
                if (coverFormalsList) {
                    return parseArrowFunctionExpression(coverFormalsList);
                }

                throwUnexpected(token);
            }
        }

        if (spreadFound) {
            throwError({}, Messages.IllegalSpread);
        }

        return sequence || expr;
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseBlock() {
        var block;

        expect('{');

        block = parseStatementList();

        expect('}');

        return delegate.createBlockStatement(block);
    }

    // 12.2 Variable Statement

    function parseVariableIdentifier() {
        var token = lex();

        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        return delegate.createIdentifier(token.value);
    }

    function parseVariableDeclaration(kind) {
        var id,
            init = null;
        if (match('{')) {
            id = parseObjectInitialiser();
            reinterpretAsAssignmentBindingPattern(id);
        } else if (match('[')) {
            id = parseArrayInitialiser();
            reinterpretAsAssignmentBindingPattern(id);
        } else {
            id = state.allowKeyword ? parseNonComputedProperty() : parseVariableIdentifier();
            // 12.2.1
            if (strict && isRestrictedWord(id.name)) {
                throwErrorTolerant({}, Messages.StrictVarName);
            }
        }

        if (kind === 'const') {
            if (!match('=')) {
                throwError({}, Messages.NoUnintializedConst);
            }
            expect('=');
            init = parseAssignmentExpression();
        } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return delegate.createVariableDeclarator(id, init);
    }

    function parseVariableDeclarationList(kind) {
        var list = [];

        do {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
                break;
            }
            lex();
        } while (index < length);

        return list;
    }

    function parseVariableStatement() {
        var declarations;

        expectKeyword('var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return delegate.createVariableDeclaration(declarations, 'var');
    }

    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
        var declarations;

        expectKeyword(kind);

        declarations = parseVariableDeclarationList(kind);

        consumeSemicolon();

        return delegate.createVariableDeclaration(declarations, kind);
    }

    // http://wiki.ecmascript.org/doku.php?id=harmony:modules

    function parseModuleDeclaration() {
        var id, src, body;

        lex();   // 'module'

        if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterModule);
        }

        switch (lookahead.type) {

        case Token.StringLiteral:
            id = parsePrimaryExpression();
            body = parseModuleBlock();
            src = null;
            break;

        case Token.Identifier:
            id = parseVariableIdentifier();
            body = null;
            if (!matchContextualKeyword('from')) {
                throwUnexpected(lex());
            }
            lex();
            src = parsePrimaryExpression();
            if (src.type !== Syntax.Literal) {
                throwError({}, Messages.InvalidModuleSpecifier);
            }
            break;
        }

        consumeSemicolon();
        return delegate.createModuleDeclaration(id, src, body);
    }

    function parseExportBatchSpecifier() {
        expect('*');
        return delegate.createExportBatchSpecifier();
    }

    function parseExportSpecifier() {
        var id, name = null;

        id = parseVariableIdentifier();
        if (matchContextualKeyword('as')) {
            lex();
            name = parseNonComputedProperty();
        }

        return delegate.createExportSpecifier(id, name);
    }

    function parseExportDeclaration() {
        var previousAllowKeyword, decl, def, src, specifiers;

        expectKeyword('export');

        if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
            case 'let':
            case 'const':
            case 'var':
            case 'class':
            case 'function':
                return delegate.createExportDeclaration(parseSourceElement(), null, null);
            }
        }

        if (isIdentifierName(lookahead)) {
            previousAllowKeyword = state.allowKeyword;
            state.allowKeyword = true;
            decl = parseVariableDeclarationList('let');
            state.allowKeyword = previousAllowKeyword;
            return delegate.createExportDeclaration(decl, null, null);
        }

        specifiers = [];
        src = null;

        if (match('*')) {
            specifiers.push(parseExportBatchSpecifier());
        } else {
            expect('{');
            do {
                specifiers.push(parseExportSpecifier());
            } while (match(',') && lex());
            expect('}');
        }

        if (matchContextualKeyword('from')) {
            lex();
            src = parsePrimaryExpression();
            if (src.type !== Syntax.Literal) {
                throwError({}, Messages.InvalidModuleSpecifier);
            }
        }

        consumeSemicolon();

        return delegate.createExportDeclaration(null, specifiers, src);
    }

    function parseImportDeclaration() {
        var specifiers, kind, src;

        expectKeyword('import');
        specifiers = [];

        if (isIdentifierName(lookahead)) {
            kind = 'default';
            specifiers.push(parseImportSpecifier());

            if (!matchContextualKeyword('from')) {
                throwError({}, Messages.NoFromAfterImport);
            }
            lex();
        } else if (match('{')) {
            kind = 'named';
            lex();
            do {
                specifiers.push(parseImportSpecifier());
            } while (match(',') && lex());
            expect('}');

            if (!matchContextualKeyword('from')) {
                throwError({}, Messages.NoFromAfterImport);
            }
            lex();
        }

        src = parsePrimaryExpression();
        if (src.type !== Syntax.Literal) {
            throwError({}, Messages.InvalidModuleSpecifier);
        }

        consumeSemicolon();

        return delegate.createImportDeclaration(specifiers, kind, src);
    }

    function parseImportSpecifier() {
        var id, name = null;

        id = parseNonComputedProperty();
        if (matchContextualKeyword('as')) {
            lex();
            name = parseVariableIdentifier();
        }

        return delegate.createImportSpecifier(id, name);
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(';');
        return delegate.createEmptyStatement();
    }

    // 12.4 Expression Statement

    function parseExpressionStatement() {
        var expr = parseExpression();
        consumeSemicolon();
        return delegate.createExpressionStatement(expr);
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression();

        expect(')');

        consequent = parseStatement();

        if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
        } else {
            alternate = null;
        }

        return delegate.createIfStatement(test, consequent, alternate);
    }

    // 12.6 Iteration Statements

    function parseDoWhileStatement() {
        var body, test, oldInIteration;

        expectKeyword('do');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

        return delegate.createDoWhileStatement(body, test);
    }

    function parseWhileStatement() {
        var test, body, oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return delegate.createWhileStatement(test, body);
    }

    function parseForVariableDeclaration() {
        var token = lex(),
            declarations = parseVariableDeclarationList();

        return delegate.createVariableDeclaration(declarations, token.value);
    }

    function parseForStatement(opts) {
        var init, test, update, left, right, body, operator, oldInIteration;
        init = test = update = null;
        expectKeyword('for');

        // http://wiki.ecmascript.org/doku.php?id=proposals:iterators_and_generators&s=each
        if (matchContextualKeyword("each")) {
            throwError({}, Messages.EachNotAllowed);
        }

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let') || matchKeyword('const')) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = true;

                if (init.declarations.length === 1) {
                    if (matchKeyword('in') || matchContextualKeyword('of')) {
                        operator = lookahead;
                        if (!((operator.value === 'in' || init.kind !== 'var') && init.declarations[0].init)) {
                            lex();
                            left = init;
                            right = parseExpression();
                            init = null;
                        }
                    }
                }
            } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = true;

                if (matchContextualKeyword('of')) {
                    operator = lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                } else if (matchKeyword('in')) {
                    // LeftHandSideExpression
                    if (!isAssignableLeftHandSide(init)) {
                        throwError({}, Messages.InvalidLHSInForIn);
                    }
                    operator = lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            }

            if (typeof left === 'undefined') {
                expect(';');
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression();
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression();
            }
        }

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        if (!(opts !== undefined && opts.ignore_body)) {
            body = parseStatement();
        }

        state.inIteration = oldInIteration;

        if (typeof left === 'undefined') {
            return delegate.createForStatement(init, test, update, body);
        }

        if (operator.value === 'in') {
            return delegate.createForInStatement(left, right, body);
        }
        return delegate.createForOfStatement(left, right, body);
    }

    // 12.7 The continue statement

    function parseContinueStatement() {
        var label = null, key;

        expectKeyword('continue');

        // Optimize the most common form: 'continue;'.
        if (source.charCodeAt(index) === 59) {
            lex();

            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (peekLineTerminator()) {
            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return delegate.createContinueStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return delegate.createContinueStatement(label);
    }

    // 12.8 The break statement

    function parseBreakStatement() {
        var label = null, key;

        expectKeyword('break');

        // Catch the very common case first: immediately a semicolon (char #59).
        if (source.charCodeAt(index) === 59) {
            lex();

            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return delegate.createBreakStatement(null);
        }

        if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();

            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return delegate.createBreakStatement(label);
    }

    // 12.9 The return statement

    function parseReturnStatement() {
        var argument = null;

        expectKeyword('return');

        if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
        }

        // 'return' followed by a space and an identifier is very common.
        if (source.charCodeAt(index) === 32) {
            if (isIdentifierStart(source.charCodeAt(index + 1))) {
                argument = parseExpression();
                consumeSemicolon();
                return delegate.createReturnStatement(argument);
            }
        }

        if (peekLineTerminator()) {
            return delegate.createReturnStatement(null);
        }

        if (!match(';')) {
            if (!match('}') && lookahead.type !== Token.EOF) {
                argument = parseExpression();
            }
        }

        consumeSemicolon();

        return delegate.createReturnStatement(argument);
    }

    // 12.10 The with statement

    function parseWithStatement() {
        var object, body;

        if (strict) {
            throwErrorTolerant({}, Messages.StrictModeWith);
        }

        expectKeyword('with');

        expect('(');

        object = parseExpression();

        expect(')');

        body = parseStatement();

        return delegate.createWithStatement(object, body);
    }

    // 12.10 The swith statement

    function parseSwitchCase() {
        var test,
            consequent = [],
            sourceElement;

        if (matchKeyword('default')) {
            lex();
            test = null;
        } else {
            expectKeyword('case');
            test = parseExpression();
        }
        expect(':');

        while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            consequent.push(sourceElement);
        }

        return delegate.createSwitchCase(test, consequent);
    }

    function parseSwitchStatement() {
        var discriminant, cases, clause, oldInSwitch, defaultFound;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression();

        expect(')');

        expect('{');

        cases = [];

        if (match('}')) {
            lex();
            return delegate.createSwitchStatement(discriminant, cases);
        }

        oldInSwitch = state.inSwitch;
        state.inSwitch = true;
        defaultFound = false;

        while (index < length) {
            if (match('}')) {
                break;
            }
            clause = parseSwitchCase();
            if (clause.test === null) {
                if (defaultFound) {
                    throwError({}, Messages.MultipleDefaultsInSwitch);
                }
                defaultFound = true;
            }
            cases.push(clause);
        }

        state.inSwitch = oldInSwitch;

        expect('}');

        return delegate.createSwitchStatement(discriminant, cases);
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var argument;

        expectKeyword('throw');

        if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
        }

        argument = parseExpression();

        consumeSemicolon();

        return delegate.createThrowStatement(argument);
    }

    // 12.14 The try statement

    function parseCatchClause() {
        var param, body;

        expectKeyword('catch');

        expect('(');
        if (match(')')) {
            throwUnexpected(lookahead);
        }

        param = parseExpression();
        // 12.14.1
        if (strict && param.type === Syntax.Identifier && isRestrictedWord(param.name)) {
            throwErrorTolerant({}, Messages.StrictCatchVariable);
        }

        expect(')');
        body = parseBlock();
        return delegate.createCatchClause(param, body);
    }

    function parseTryStatement() {
        var block, handlers = [], finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
        }

        return delegate.createTryStatement(block, [], handlers, finalizer);
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expectKeyword('debugger');

        consumeSemicolon();

        return delegate.createDebuggerStatement();
    }

    // 12 Statements

    function parseStatement() {
        var type = lookahead.type,
            expr,
            labeledBody,
            key;

        if (type === Token.EOF) {
            throwUnexpected(lookahead);
        }

        if (type === Token.Punctuator) {
            switch (lookahead.value) {
            case ';':
                return parseEmptyStatement();
            case '{':
                return parseBlock();
            case '(':
                return parseExpressionStatement();
            default:
                break;
            }
        }

        if (type === Token.Keyword) {
            switch (lookahead.value) {
            case 'break':
                return parseBreakStatement();
            case 'continue':
                return parseContinueStatement();
            case 'debugger':
                return parseDebuggerStatement();
            case 'do':
                return parseDoWhileStatement();
            case 'for':
                return parseForStatement();
            case 'function':
                return parseFunctionDeclaration();
            case 'class':
                return parseClassDeclaration();
            case 'if':
                return parseIfStatement();
            case 'return':
                return parseReturnStatement();
            case 'switch':
                return parseSwitchStatement();
            case 'throw':
                return parseThrowStatement();
            case 'try':
                return parseTryStatement();
            case 'var':
                return parseVariableStatement();
            case 'while':
                return parseWhileStatement();
            case 'with':
                return parseWithStatement();
            default:
                break;
            }
        }

        expr = parseExpression();

        // 12.12 Labelled Statements
        if ((expr.type === Syntax.Identifier) && match(':')) {
            lex();

            key = '$' + expr.name;
            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
                throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }

            state.labelSet[key] = true;
            labeledBody = parseStatement();
            delete state.labelSet[key];
            return delegate.createLabeledStatement(expr, labeledBody);
        }

        consumeSemicolon();

        return delegate.createExpressionStatement(expr);
    }

    // 13 Function Definition

    function parseConciseBody() {
        if (match('{')) {
            return parseFunctionSourceElements();
        }
        return parseAssignmentExpression();
    }

    function parseFunctionSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted,
            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, oldParenthesizedCount;

        expect('{');

        while (index < length) {
            if (lookahead.type !== Token.StringLiteral) {
                break;
            }
            token = lookahead;

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        oldLabelSet = state.labelSet;
        oldInIteration = state.inIteration;
        oldInSwitch = state.inSwitch;
        oldInFunctionBody = state.inFunctionBody;
        oldParenthesizedCount = state.parenthesizedCount;

        state.labelSet = {};
        state.inIteration = false;
        state.inSwitch = false;
        state.inFunctionBody = true;
        state.parenthesizedCount = 0;

        while (index < length) {
            if (match('}')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }

        expect('}');

        state.labelSet = oldLabelSet;
        state.inIteration = oldInIteration;
        state.inSwitch = oldInSwitch;
        state.inFunctionBody = oldInFunctionBody;
        state.parenthesizedCount = oldParenthesizedCount;

        return delegate.createBlockStatement(sourceElements);
    }

    function validateParam(options, param, name) {
        var key = '$' + name;
        if (strict) {
            if (isRestrictedWord(name)) {
                options.stricted = param;
                options.message = Messages.StrictParamName;
            }
            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                options.stricted = param;
                options.message = Messages.StrictParamDupe;
            }
        } else if (!options.firstRestricted) {
            if (isRestrictedWord(name)) {
                options.firstRestricted = param;
                options.message = Messages.StrictParamName;
            } else if (isStrictModeReservedWord(name)) {
                options.firstRestricted = param;
                options.message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
                options.firstRestricted = param;
                options.message = Messages.StrictParamDupe;
            }
        }
        options.paramSet[key] = true;
    }

    function parseParam(options) {
        var token, rest, param, def;

        token = lookahead;
        if (token.value === '...') {
            token = lex();
            rest = true;
        }

        if (match('[')) {
            param = parseArrayInitialiser();
            reinterpretAsDestructuredParameter(options, param);
        } else if (match('{')) {
            if (rest) {
                throwError({}, Messages.ObjectPatternAsRestParameter);
            }
            param = parseObjectInitialiser();
            reinterpretAsDestructuredParameter(options, param);
        } else {
            param = parseVariableIdentifier();
            validateParam(options, token, token.value);
            if (match('=')) {
                if (rest) {
                    throwErrorTolerant(lookahead, Messages.DefaultRestParameter);
                }
                lex();
                def = parseAssignmentExpression();
                ++options.defaultCount;
            }
        }

        if (rest) {
            if (!match(')')) {
                throwError({}, Messages.ParameterAfterRestParameter);
            }
            options.rest = param;
            return false;
        }

        options.params.push(param);
        options.defaults.push(def);
        return !match(')');
    }

    function parseParams(firstRestricted) {
        var options;

        options = {
            params: [],
            defaultCount: 0,
            defaults: [],
            rest: null,
            firstRestricted: firstRestricted
        };

        expect('(');

        if (!match(')')) {
            options.paramSet = {};
            while (index < length) {
                if (!parseParam(options)) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        if (options.defaultCount === 0) {
            options.defaults = [];
        }

        return options;
    }

    function parseFunctionDeclaration() {
        var id, body, token, tmp, firstRestricted, message, previousStrict, previousYieldAllowed, generator, expression;

        expectKeyword('function');

        generator = false;
        if (match('*')) {
            lex();
            generator = true;
        }

        token = lookahead;

        id = parseVariableIdentifier();

        if (strict) {
            if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
            }
        } else {
            if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }

        tmp = parseParams(firstRestricted);
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        previousYieldAllowed = state.yieldAllowed;
        state.yieldAllowed = generator;

        // here we redo some work in order to set 'expression'
        expression = !match('{');
        body = parseConciseBody();

        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && tmp.stricted) {
            throwErrorTolerant(tmp.stricted, message);
        }
        if (state.yieldAllowed && !state.yieldFound) {
            throwErrorTolerant({}, Messages.NoYieldInGenerator);
        }
        strict = previousStrict;
        state.yieldAllowed = previousYieldAllowed;

        return delegate.createFunctionDeclaration(id, tmp.params, tmp.defaults, body, tmp.rest, generator, expression);
    }

    function parseFunctionExpression() {
        var token, id = null, firstRestricted, message, tmp, body, previousStrict, previousYieldAllowed, generator, expression;

        expectKeyword('function');

        generator = false;

        if (match('*')) {
            lex();
            generator = true;
        }

        if (!match('(')) {
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
                if (isRestrictedWord(token.value)) {
                    throwErrorTolerant(token, Messages.StrictFunctionName);
                }
            } else {
                if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        tmp = parseParams(firstRestricted);
        firstRestricted = tmp.firstRestricted;
        if (tmp.message) {
            message = tmp.message;
        }

        previousStrict = strict;
        previousYieldAllowed = state.yieldAllowed;
        state.yieldAllowed = generator;

        // here we redo some work in order to set 'expression'
        expression = !match('{');
        body = parseConciseBody();

        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        if (strict && tmp.stricted) {
            throwErrorTolerant(tmp.stricted, message);
        }
        if (state.yieldAllowed && !state.yieldFound) {
            throwErrorTolerant({}, Messages.NoYieldInGenerator);
        }
        strict = previousStrict;
        state.yieldAllowed = previousYieldAllowed;

        return delegate.createFunctionExpression(id, tmp.params, tmp.defaults, body, tmp.rest, generator, expression);
    }

    function parseYieldExpression() {
        var delegateFlag, expr, previousYieldAllowed;

        expectKeyword('yield');

        if (!state.yieldAllowed) {
            throwErrorTolerant({}, Messages.IllegalYield);
        }

        delegateFlag = false;
        if (match('*')) {
            lex();
            delegateFlag = true;
        }

        // It is a Syntax Error if any AssignmentExpression Contains YieldExpression.
        previousYieldAllowed = state.yieldAllowed;
        state.yieldAllowed = false;
        expr = parseAssignmentExpression();
        state.yieldAllowed = previousYieldAllowed;
        state.yieldFound = true;

        return delegate.createYieldExpression(expr, delegateFlag);
    }

    // 14 Classes

    function parseMethodDefinition(existingPropNames) {
        var token, key, param, propType, isValidDuplicateProp = false;

        if (lookahead.value === 'static') {
            propType = ClassPropertyType.static;
            lex();
        } else {
            propType = ClassPropertyType.prototype;
        }

        if (match('*')) {
            lex();
            return delegate.createMethodDefinition(
                propType,
                '',
                parseObjectPropertyKey(),
                parsePropertyMethodFunction({ generator: true })
            );
        }

        token = lookahead;
        key = parseObjectPropertyKey();

        if (token.value === 'get' && !match('(')) {
            key = parseObjectPropertyKey();

            // It is a syntax error if any other properties have a name
            // duplicating this one unless they are a setter
            if (existingPropNames[propType].hasOwnProperty(key.name)) {
                isValidDuplicateProp =
                    // There isn't already a getter for this prop
                    existingPropNames[propType][key.name].get === undefined
                    // There isn't already a data prop by this name
                    && existingPropNames[propType][key.name].data === undefined
                    // The only existing prop by this name is a setter
                    && existingPropNames[propType][key.name].set !== undefined;
                if (!isValidDuplicateProp) {
                    throwError(key, Messages.IllegalDuplicateClassProperty);
                }
            } else {
                existingPropNames[propType][key.name] = {};
            }
            existingPropNames[propType][key.name].get = true;

            expect('(');
            expect(')');
            return delegate.createMethodDefinition(
                propType,
                'get',
                key,
                parsePropertyFunction({ generator: false })
            );
        }
        if (token.value === 'set' && !match('(')) {
            key = parseObjectPropertyKey();

            // It is a syntax error if any other properties have a name
            // duplicating this one unless they are a getter
            if (existingPropNames[propType].hasOwnProperty(key.name)) {
                isValidDuplicateProp =
                    // There isn't already a setter for this prop
                    existingPropNames[propType][key.name].set === undefined
                    // There isn't already a data prop by this name
                    && existingPropNames[propType][key.name].data === undefined
                    // The only existing prop by this name is a getter
                    && existingPropNames[propType][key.name].get !== undefined;
                if (!isValidDuplicateProp) {
                    throwError(key, Messages.IllegalDuplicateClassProperty);
                }
            } else {
                existingPropNames[propType][key.name] = {};
            }
            existingPropNames[propType][key.name].set = true;

            expect('(');
            token = lookahead;
            param = [ parseVariableIdentifier() ];
            expect(')');
            return delegate.createMethodDefinition(
                propType,
                'set',
                key,
                parsePropertyFunction({ params: param, generator: false, name: token })
            );
        }

        // It is a syntax error if any other properties have the same name as a
        // non-getter, non-setter method
        if (existingPropNames[propType].hasOwnProperty(key.name)) {
            throwError(key, Messages.IllegalDuplicateClassProperty);
        } else {
            existingPropNames[propType][key.name] = {};
        }
        existingPropNames[propType][key.name].data = true;

        return delegate.createMethodDefinition(
            propType,
            '',
            key,
            parsePropertyMethodFunction({ generator: false })
        );
    }

    function parseClassElement(existingProps) {
        if (match(';')) {
            lex();
            return;
        }
        return parseMethodDefinition(existingProps);
    }

    function parseClassBody() {
        var classElement, classElements = [], existingProps = {};

        existingProps[ClassPropertyType.static] = {};
        existingProps[ClassPropertyType.prototype] = {};

        expect('{');

        while (index < length) {
            if (match('}')) {
                break;
            }
            classElement = parseClassElement(existingProps);

            if (typeof classElement !== 'undefined') {
                classElements.push(classElement);
            }
        }

        expect('}');

        return delegate.createClassBody(classElements);
    }

    function parseClassExpression() {
        var id, previousYieldAllowed, superClass = null;

        expectKeyword('class');

        if (!matchKeyword('extends') && !match('{')) {
            id = parseVariableIdentifier();
        }

        if (matchKeyword('extends')) {
            expectKeyword('extends');
            previousYieldAllowed = state.yieldAllowed;
            state.yieldAllowed = false;
            superClass = parseAssignmentExpression();
            state.yieldAllowed = previousYieldAllowed;
        }

        return delegate.createClassExpression(id, superClass, parseClassBody());
    }

    function parseClassDeclaration() {
        var id, previousYieldAllowed, superClass = null;

        expectKeyword('class');

        id = parseVariableIdentifier();

        if (matchKeyword('extends')) {
            expectKeyword('extends');
            previousYieldAllowed = state.yieldAllowed;
            state.yieldAllowed = false;
            superClass = parseAssignmentExpression();
            state.yieldAllowed = previousYieldAllowed;
        }

        return delegate.createClassDeclaration(id, superClass, parseClassBody());
    }

    // 15 Program

    function matchModuleDeclaration() {
        var id;
        if (matchContextualKeyword('module')) {
            id = lookahead2();
            return id.type === Token.StringLiteral || id.type === Token.Identifier;
        }
        return false;
    }

    function parseSourceElement() {
        if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
            case 'const':
            case 'let':
                return parseConstLetDeclaration(lookahead.value);
            case 'function':
                return parseFunctionDeclaration();
            case 'export':
                return parseExportDeclaration();
            case 'import':
                return parseImportDeclaration();
            default:
                return parseStatement();
            }
        }

        if (matchModuleDeclaration()) {
            throwError({}, Messages.NestedModule);
        }

        if (lookahead.type !== Token.EOF) {
            return parseStatement();
        }
    }

    function parseProgramElement() {
        if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
            case 'export':
                return parseExportDeclaration();
            case 'import':
                return parseImportDeclaration();
            }
        }

        if (matchModuleDeclaration()) {
            return parseModuleDeclaration();
        }

        return parseSourceElement();
    }

    function parseProgramElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted;

        while (index < length) {
            token = lookahead;
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseProgramElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = source.slice(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        while (index < length) {
            sourceElement = parseProgramElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }
        return sourceElements;
    }

    function parseModuleElement() {
        return parseSourceElement();
    }

    function parseModuleElements() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseModuleElement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseModuleBlock() {
        var block;

        expect('{');

        block = parseModuleElements();

        expect('}');

        return delegate.createBlockStatement(block);
    }

    function parseProgram() {
        var body;
        strict = false;
        peek();
        body = parseProgramElements();
        return delegate.createProgram(body);
    }

    // The following functions are needed only when the option to preserve
    // the comments is active.

    function addComment(type, value, start, end, loc) {
        assert(typeof start === 'number', 'Comment must have valid position');

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (extra.comments.length > 0) {
            if (extra.comments[extra.comments.length - 1].range[1] > start) {
                return;
            }
        }

        extra.comments.push({
            type: type,
            value: value,
            range: [start, end],
            loc: loc
        });
    }

    function scanComment() {
        var comment, ch, loc, start, blockComment, lineComment;

        comment = '';
        blockComment = false;
        lineComment = false;

        while (index < length) {
            ch = source[index];

            if (lineComment) {
                ch = source[index++];
                if (isLineTerminator(ch.charCodeAt(0))) {
                    loc.end = {
                        line: lineNumber,
                        column: index - lineStart - 1
                    };
                    lineComment = false;
                    addComment('Line', comment, start, index - 1, loc);
                    if (ch === '\r' && source[index] === '\n') {
                        ++index;
                    }
                    ++lineNumber;
                    lineStart = index;
                    comment = '';
                } else if (index >= length) {
                    lineComment = false;
                    comment += ch;
                    loc.end = {
                        line: lineNumber,
                        column: length - lineStart
                    };
                    addComment('Line', comment, start, length, loc);
                } else {
                    comment += ch;
                }
            } else if (blockComment) {
                if (isLineTerminator(ch.charCodeAt(0))) {
                    if (ch === '\r' && source[index + 1] === '\n') {
                        ++index;
                        comment += '\r\n';
                    } else {
                        comment += ch;
                    }
                    ++lineNumber;
                    ++index;
                    lineStart = index;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    ch = source[index++];
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    comment += ch;
                    if (ch === '*') {
                        ch = source[index];
                        if (ch === '/') {
                            comment = comment.substr(0, comment.length - 1);
                            blockComment = false;
                            ++index;
                            loc.end = {
                                line: lineNumber,
                                column: index - lineStart
                            };
                            addComment('Block', comment, start, index, loc);
                            comment = '';
                        }
                    }
                }
            } else if (ch === '/') {
                ch = source[index + 1];
                if (ch === '/') {
                    loc = {
                        start: {
                            line: lineNumber,
                            column: index - lineStart
                        }
                    };
                    start = index;
                    index += 2;
                    lineComment = true;
                    if (index >= length) {
                        loc.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        lineComment = false;
                        addComment('Line', comment, start, index, loc);
                    }
                } else if (ch === '*') {
                    start = index;
                    index += 2;
                    blockComment = true;
                    loc = {
                        start: {
                            line: lineNumber,
                            column: index - lineStart - 2
                        }
                    };
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    break;
                }
            } else if (isWhiteSpace(ch.charCodeAt(0))) {
                ++index;
            } else if (isLineTerminator(ch.charCodeAt(0))) {
                ++index;
                if (ch ===  '\r' && source[index] === '\n') {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
            } else {
                break;
            }
        }
    }

    function filterCommentLocation() {
        var i, entry, comment, comments = [];

        for (i = 0; i < extra.comments.length; ++i) {
            entry = extra.comments[i];
            comment = {
                type: entry.type,
                value: entry.value
            };
            if (extra.range) {
                comment.range = entry.range;
            }
            if (extra.loc) {
                comment.loc = entry.loc;
            }
            comments.push(comment);
        }

        extra.comments = comments;
    }

    function collectToken() {
        var start, loc, token, range, value;

        skipComment();
        start = index;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        token = extra.advance();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        if (token.type !== Token.EOF) {
            range = [token.range[0], token.range[1]];
            value = source.slice(token.range[0], token.range[1]);
            extra.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: range,
                loc: loc
            });
        }

        return token;
    }

    function collectRegex() {
        var pos, loc, regex, token;

        skipComment();

        pos = index;
        loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            }
        };

        regex = extra.scanRegExp();
        loc.end = {
            line: lineNumber,
            column: index - lineStart
        };

        if (!extra.tokenize) {
            // Pop the previous token, which is likely '/' or '/='
            if (extra.tokens.length > 0) {
                token = extra.tokens[extra.tokens.length - 1];
                if (token.range[0] === pos && token.type === 'Punctuator') {
                    if (token.value === '/' || token.value === '/=') {
                        extra.tokens.pop();
                    }
                }
            }

            extra.tokens.push({
                type: 'RegularExpression',
                value: regex.literal,
                range: [pos, index],
                loc: loc
            });
        }

        return regex;
    }

    function filterTokenLocation() {
        var i, entry, token, tokens = [];

        for (i = 0; i < extra.tokens.length; ++i) {
            entry = extra.tokens[i];
            token = {
                type: entry.type,
                value: entry.value
            };
            if (extra.range) {
                token.range = entry.range;
            }
            if (extra.loc) {
                token.loc = entry.loc;
            }
            tokens.push(token);
        }

        extra.tokens = tokens;
    }

    function LocationMarker() {
        this.range = [index, index];
        this.loc = {
            start: {
                line: lineNumber,
                column: index - lineStart
            },
            end: {
                line: lineNumber,
                column: index - lineStart
            }
        };
    }

    LocationMarker.prototype = {
        constructor: LocationMarker,

        end: function () {
            this.range[1] = index;
            this.loc.end.line = lineNumber;
            this.loc.end.column = index - lineStart;
        },

        applyGroup: function (node) {
            if (extra.range) {
                node.groupRange = [this.range[0], this.range[1]];
            }
            if (extra.loc) {
                node.groupLoc = {
                    start: {
                        line: this.loc.start.line,
                        column: this.loc.start.column
                    },
                    end: {
                        line: this.loc.end.line,
                        column: this.loc.end.column
                    }
                };
                node = delegate.postProcess(node);
            }
        },

        apply: function (node) {
            var nodeType = typeof node;
            assert(nodeType === "object",
                "Applying location marker to an unexpected node type: " +
                    nodeType);

            if (extra.range) {
                node.range = [this.range[0], this.range[1]];
            }
            if (extra.loc) {
                node.loc = {
                    start: {
                        line: this.loc.start.line,
                        column: this.loc.start.column
                    },
                    end: {
                        line: this.loc.end.line,
                        column: this.loc.end.column
                    }
                };
                node = delegate.postProcess(node);
            }
        }
    };

    function createLocationMarker() {
        return new LocationMarker();
    }

    function trackGroupExpression() {
        var marker, expr;

        skipComment();
        marker = createLocationMarker();
        expect('(');

        ++state.parenthesizedCount;

        state.allowArrowFunction = !state.allowArrowFunction;
        expr = parseExpression();
        state.allowArrowFunction = false;

        if (expr.type === 'ArrowFunctionExpression') {
            marker.end();
            marker.apply(expr);
        } else {
            expect(')');
            marker.end();
            marker.applyGroup(expr);
        }

        return expr;
    }

    function trackLeftHandSideExpression() {
        var marker, expr;

        skipComment();
        marker = createLocationMarker();

        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

        while (match('.') || match('[') || lookahead.type === Token.Template) {
            if (match('[')) {
                expr = delegate.createMemberExpression('[', expr, parseComputedMember());
                marker.end();
                marker.apply(expr);
            } else if (match('.')) {
                expr = delegate.createMemberExpression('.', expr, parseNonComputedMember());
                marker.end();
                marker.apply(expr);
            } else {
                expr = delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral());
                marker.end();
                marker.apply(expr);
            }
        }

        return expr;
    }

    function trackLeftHandSideExpressionAllowCall() {
        var marker, expr, args;

        skipComment();
        marker = createLocationMarker();

        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

        while (match('.') || match('[') || match('(') || lookahead.type === Token.Template) {
            if (match('(')) {
                args = parseArguments();
                expr = delegate.createCallExpression(expr, args);
                marker.end();
                marker.apply(expr);
            } else if (match('[')) {
                expr = delegate.createMemberExpression('[', expr, parseComputedMember());
                marker.end();
                marker.apply(expr);
            } else if (match('.')) {
                expr = delegate.createMemberExpression('.', expr, parseNonComputedMember());
                marker.end();
                marker.apply(expr);
            } else {
                expr = delegate.createTaggedTemplateExpression(expr, parseTemplateLiteral());
                marker.end();
                marker.apply(expr);
            }
        }

        return expr;
    }

    function filterGroup(node) {
        var n, i, entry;

        n = (Object.prototype.toString.apply(node) === '[object Array]') ? [] : {};
        for (i in node) {
            if (node.hasOwnProperty(i) && i !== 'groupRange' && i !== 'groupLoc') {
                entry = node[i];
                if (entry === null || typeof entry !== 'object' || entry instanceof RegExp) {
                    n[i] = entry;
                } else {
                    n[i] = filterGroup(entry);
                }
            }
        }
        return n;
    }

    function wrapTrackingFunction(range, loc) {

        return function (parseFunction) {

            function isBinary(node) {
                return node.type === Syntax.LogicalExpression ||
                    node.type === Syntax.BinaryExpression;
            }

            function visit(node) {
                var start, end;

                if (isBinary(node.left)) {
                    visit(node.left);
                }
                if (isBinary(node.right)) {
                    visit(node.right);
                }

                if (range) {
                    if (node.left.groupRange || node.right.groupRange) {
                        start = node.left.groupRange ? node.left.groupRange[0] : node.left.range[0];
                        end = node.right.groupRange ? node.right.groupRange[1] : node.right.range[1];
                        node.range = [start, end];
                    } else if (typeof node.range === 'undefined') {
                        start = node.left.range[0];
                        end = node.right.range[1];
                        node.range = [start, end];
                    }
                }
                if (loc) {
                    if (node.left.groupLoc || node.right.groupLoc) {
                        start = node.left.groupLoc ? node.left.groupLoc.start : node.left.loc.start;
                        end = node.right.groupLoc ? node.right.groupLoc.end : node.right.loc.end;
                        node.loc = {
                            start: start,
                            end: end
                        };
                        node = delegate.postProcess(node);
                    } else if (typeof node.loc === 'undefined') {
                        node.loc = {
                            start: node.left.loc.start,
                            end: node.right.loc.end
                        };
                        node = delegate.postProcess(node);
                    }
                }
            }

            return function () {
                var marker, node;

                skipComment();

                marker = createLocationMarker();
                node = parseFunction.apply(null, arguments);
                marker.end();

                if (range && typeof node.range === 'undefined') {
                    marker.apply(node);
                }

                if (loc && typeof node.loc === 'undefined') {
                    marker.apply(node);
                }

                if (isBinary(node)) {
                    visit(node);
                }

                return node;
            };
        };
    }

    function patch() {

        var wrapTracking;

        if (extra.comments) {
            extra.skipComment = skipComment;
            skipComment = scanComment;
        }

        if (extra.range || extra.loc) {

            extra.parseGroupExpression = parseGroupExpression;
            extra.parseLeftHandSideExpression = parseLeftHandSideExpression;
            extra.parseLeftHandSideExpressionAllowCall = parseLeftHandSideExpressionAllowCall;
            parseGroupExpression = trackGroupExpression;
            parseLeftHandSideExpression = trackLeftHandSideExpression;
            parseLeftHandSideExpressionAllowCall = trackLeftHandSideExpressionAllowCall;

            wrapTracking = wrapTrackingFunction(extra.range, extra.loc);

            extra.parseAssignmentExpression = parseAssignmentExpression;
            extra.parseBinaryExpression = parseBinaryExpression;
            extra.parseBlock = parseBlock;
            extra.parseFunctionSourceElements = parseFunctionSourceElements;
            extra.parseCatchClause = parseCatchClause;
            extra.parseComputedMember = parseComputedMember;
            extra.parseConditionalExpression = parseConditionalExpression;
            extra.parseConstLetDeclaration = parseConstLetDeclaration;
            extra.parseExportBatchSpecifier = parseExportBatchSpecifier;
            extra.parseExportDeclaration = parseExportDeclaration;
            extra.parseExportSpecifier = parseExportSpecifier;
            extra.parseExpression = parseExpression;
            extra.parseForVariableDeclaration = parseForVariableDeclaration;
            extra.parseFunctionDeclaration = parseFunctionDeclaration;
            extra.parseFunctionExpression = parseFunctionExpression;
            extra.parseParams = parseParams;
            extra.parseImportDeclaration = parseImportDeclaration;
            extra.parseImportSpecifier = parseImportSpecifier;
            extra.parseModuleDeclaration = parseModuleDeclaration;
            extra.parseModuleBlock = parseModuleBlock;
            extra.parseNewExpression = parseNewExpression;
            extra.parseNonComputedProperty = parseNonComputedProperty;
            extra.parseObjectProperty = parseObjectProperty;
            extra.parseObjectPropertyKey = parseObjectPropertyKey;
            extra.parsePostfixExpression = parsePostfixExpression;
            extra.parsePrimaryExpression = parsePrimaryExpression;
            extra.parseProgram = parseProgram;
            extra.parsePropertyFunction = parsePropertyFunction;
            extra.parseSpreadOrAssignmentExpression = parseSpreadOrAssignmentExpression;
            extra.parseTemplateElement = parseTemplateElement;
            extra.parseTemplateLiteral = parseTemplateLiteral;
            extra.parseStatement = parseStatement;
            extra.parseSwitchCase = parseSwitchCase;
            extra.parseUnaryExpression = parseUnaryExpression;
            extra.parseVariableDeclaration = parseVariableDeclaration;
            extra.parseVariableIdentifier = parseVariableIdentifier;
            extra.parseMethodDefinition = parseMethodDefinition;
            extra.parseClassDeclaration = parseClassDeclaration;
            extra.parseClassExpression = parseClassExpression;
            extra.parseClassBody = parseClassBody;

            parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression);
            parseBinaryExpression = wrapTracking(extra.parseBinaryExpression);
            parseBlock = wrapTracking(extra.parseBlock);
            parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements);
            parseCatchClause = wrapTracking(extra.parseCatchClause);
            parseComputedMember = wrapTracking(extra.parseComputedMember);
            parseConditionalExpression = wrapTracking(extra.parseConditionalExpression);
            parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration);
            parseExportBatchSpecifier = wrapTracking(parseExportBatchSpecifier);
            parseExportDeclaration = wrapTracking(parseExportDeclaration);
            parseExportSpecifier = wrapTracking(parseExportSpecifier);
            parseExpression = wrapTracking(extra.parseExpression);
            parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration);
            parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration);
            parseFunctionExpression = wrapTracking(extra.parseFunctionExpression);
            parseParams = wrapTracking(extra.parseParams);
            parseImportDeclaration = wrapTracking(extra.parseImportDeclaration);
            parseImportSpecifier = wrapTracking(extra.parseImportSpecifier);
            parseModuleDeclaration = wrapTracking(extra.parseModuleDeclaration);
            parseModuleBlock = wrapTracking(extra.parseModuleBlock);
            parseLeftHandSideExpression = wrapTracking(parseLeftHandSideExpression);
            parseNewExpression = wrapTracking(extra.parseNewExpression);
            parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty);
            parseObjectProperty = wrapTracking(extra.parseObjectProperty);
            parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey);
            parsePostfixExpression = wrapTracking(extra.parsePostfixExpression);
            parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression);
            parseProgram = wrapTracking(extra.parseProgram);
            parsePropertyFunction = wrapTracking(extra.parsePropertyFunction);
            parseTemplateElement = wrapTracking(extra.parseTemplateElement);
            parseTemplateLiteral = wrapTracking(extra.parseTemplateLiteral);
            parseSpreadOrAssignmentExpression = wrapTracking(extra.parseSpreadOrAssignmentExpression);
            parseStatement = wrapTracking(extra.parseStatement);
            parseSwitchCase = wrapTracking(extra.parseSwitchCase);
            parseUnaryExpression = wrapTracking(extra.parseUnaryExpression);
            parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration);
            parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier);
            parseMethodDefinition = wrapTracking(extra.parseMethodDefinition);
            parseClassDeclaration = wrapTracking(extra.parseClassDeclaration);
            parseClassExpression = wrapTracking(extra.parseClassExpression);
            parseClassBody = wrapTracking(extra.parseClassBody);
        }

        if (typeof extra.tokens !== 'undefined') {
            extra.advance = advance;
            extra.scanRegExp = scanRegExp;

            advance = collectToken;
            scanRegExp = collectRegex;
        }
    }

    function unpatch() {
        if (typeof extra.skipComment === 'function') {
            skipComment = extra.skipComment;
        }

        if (extra.range || extra.loc) {
            parseAssignmentExpression = extra.parseAssignmentExpression;
            parseBinaryExpression = extra.parseBinaryExpression;
            parseBlock = extra.parseBlock;
            parseFunctionSourceElements = extra.parseFunctionSourceElements;
            parseCatchClause = extra.parseCatchClause;
            parseComputedMember = extra.parseComputedMember;
            parseConditionalExpression = extra.parseConditionalExpression;
            parseConstLetDeclaration = extra.parseConstLetDeclaration;
            parseExportBatchSpecifier = extra.parseExportBatchSpecifier;
            parseExportDeclaration = extra.parseExportDeclaration;
            parseExportSpecifier = extra.parseExportSpecifier;
            parseExpression = extra.parseExpression;
            parseForVariableDeclaration = extra.parseForVariableDeclaration;
            parseFunctionDeclaration = extra.parseFunctionDeclaration;
            parseFunctionExpression = extra.parseFunctionExpression;
            parseImportDeclaration = extra.parseImportDeclaration;
            parseImportSpecifier = extra.parseImportSpecifier;
            parseGroupExpression = extra.parseGroupExpression;
            parseLeftHandSideExpression = extra.parseLeftHandSideExpression;
            parseLeftHandSideExpressionAllowCall = extra.parseLeftHandSideExpressionAllowCall;
            parseModuleDeclaration = extra.parseModuleDeclaration;
            parseModuleBlock = extra.parseModuleBlock;
            parseNewExpression = extra.parseNewExpression;
            parseNonComputedProperty = extra.parseNonComputedProperty;
            parseObjectProperty = extra.parseObjectProperty;
            parseObjectPropertyKey = extra.parseObjectPropertyKey;
            parsePostfixExpression = extra.parsePostfixExpression;
            parsePrimaryExpression = extra.parsePrimaryExpression;
            parseProgram = extra.parseProgram;
            parsePropertyFunction = extra.parsePropertyFunction;
            parseTemplateElement = extra.parseTemplateElement;
            parseTemplateLiteral = extra.parseTemplateLiteral;
            parseSpreadOrAssignmentExpression = extra.parseSpreadOrAssignmentExpression;
            parseStatement = extra.parseStatement;
            parseSwitchCase = extra.parseSwitchCase;
            parseUnaryExpression = extra.parseUnaryExpression;
            parseVariableDeclaration = extra.parseVariableDeclaration;
            parseVariableIdentifier = extra.parseVariableIdentifier;
            parseMethodDefinition = extra.parseMethodDefinition;
            parseClassDeclaration = extra.parseClassDeclaration;
            parseClassExpression = extra.parseClassExpression;
            parseClassBody = extra.parseClassBody;
        }

        if (typeof extra.scanRegExp === 'function') {
            advance = extra.advance;
            scanRegExp = extra.scanRegExp;
        }
    }

    // This is used to modify the delegate.

    function extend(object, properties) {
        var entry, result = {};

        for (entry in object) {
            if (object.hasOwnProperty(entry)) {
                result[entry] = object[entry];
            }
        }

        for (entry in properties) {
            if (properties.hasOwnProperty(entry)) {
                result[entry] = properties[entry];
            }
        }

        return result;
    }

    function tokenize(code, options) {
        var toString,
            token,
            tokens;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowKeyword: true,
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false
        };

        extra = {};

        // Options matching.
        options = options || {};

        // Of course we collect tokens here.
        options.tokens = true;
        extra.tokens = [];
        extra.tokenize = true;
        // The following two fields are necessary to compute the Regex tokens.
        extra.openParenToken = -1;
        extra.openCurlyToken = -1;

        extra.range = (typeof options.range === 'boolean') && options.range;
        extra.loc = (typeof options.loc === 'boolean') && options.loc;

        if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
        }

        if (length > 0) {
            if (typeof source[0] === 'undefined') {
                // Try first to convert to a string. This is good as fast path
                // for old IE which understands string indexing for string
                // literals only and not for string object.
                if (code instanceof String) {
                    source = code.valueOf();
                }
            }
        }

        patch();

        try {
            peek();
            if (lookahead.type === Token.EOF) {
                return extra.tokens;
            }

            token = lex();
            while (lookahead.type !== Token.EOF) {
                try {
                    token = lex();
                } catch (lexError) {
                    token = lookahead;
                    if (extra.errors) {
                        extra.errors.push(lexError);
                        // We have to break on the first error
                        // to avoid infinite loops.
                        break;
                    } else {
                        throw lexError;
                    }
                }
            }

            filterTokenLocation();
            tokens = extra.tokens;
            if (typeof extra.comments !== 'undefined') {
                filterCommentLocation();
                tokens.comments = extra.comments;
            }
            if (typeof extra.errors !== 'undefined') {
                tokens.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            unpatch();
            extra = {};
        }
        return tokens;
    }

    function parse(code, options) {
        var program, toString;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        delegate = SyntaxTreeDelegate;
        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        lookahead = null;
        state = {
            allowKeyword: false,
            allowIn: true,
            labelSet: {},
            parenthesizedCount: 0,
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            yieldAllowed: false,
            yieldFound: false
        };

        extra = {};
        if (typeof options !== 'undefined') {
            extra.range = (typeof options.range === 'boolean') && options.range;
            extra.loc = (typeof options.loc === 'boolean') && options.loc;

            if (extra.loc && options.source !== null && options.source !== undefined) {
                delegate = extend(delegate, {
                    'postProcess': function (node) {
                        node.loc.source = toString(options.source);
                        return node;
                    }
                });
            }

            if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
                extra.errors = [];
            }
        }

        if (length > 0) {
            if (typeof source[0] === 'undefined') {
                // Try first to convert to a string. This is good as fast path
                // for old IE which understands string indexing for string
                // literals only and not for string object.
                if (code instanceof String) {
                    source = code.valueOf();
                }
            }
        }

        patch();
        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                filterCommentLocation();
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                filterTokenLocation();
                program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
                program.errors = extra.errors;
            }
            if (extra.range || extra.loc) {
                program.body = filterGroup(program.body);
            }
        } catch (e) {
            throw e;
        } finally {
            unpatch();
            extra = {};
        }

        return program;
    }

    // Sync with package.json and component.json.
    exports.version = '1.1.0-dev-harmony';

    exports.tokenize = tokenize;

    exports.parse = parse;

    // Deep copy.
    exports.Syntax = (function () {
        var name, types = {};

        if (typeof Object.create === 'function') {
            types = Object.create(null);
        }

        for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
            }
        }

        if (typeof Object.freeze === 'function') {
            Object.freeze(types);
        }

        return types;
    }());

}));
/* vim: set sw=4 ts=4 et tw=80 : */

},{}],28:[function(require,module,exports){
"use strict";

var defProp = Object.defineProperty || function(obj, name, desc) {
    // Normal property assignment is the best we can do if
    // Object.defineProperty is not available.
    obj[name] = desc.value;
};

// For functions that will be invoked using .call or .apply, we need to
// define those methods on the function objects themselves, rather than
// inheriting them from Function.prototype, so that a malicious or clumsy
// third party cannot interfere with the functionality of this module by
// redefining Function.prototype.call or .apply.
function makeSafeToCall(fun) {
    defProp(fun, "call", { value: fun.call });
    defProp(fun, "apply", { value: fun.apply });
    return fun;
}

var hasOwn = makeSafeToCall(Object.prototype.hasOwnProperty);
var numToStr = makeSafeToCall(Number.prototype.toString);
var strSlice = makeSafeToCall(String.prototype.slice);

var cloner = function(){};
var create = Object.create || function(prototype, properties) {
    cloner.prototype = prototype || null;
    var obj = new cloner;

    // The properties parameter is unused by this module, but I want this
    // shim to be as complete as possible.
    if (properties)
        for (var name in properties)
            if (hasOwn.call(properties, name))
                defProp(obj, name, properties[name]);

    return obj;
};

var rand = Math.random;
var uniqueKeys = create(null);

function makeUniqueKey() {
    // Collisions are highly unlikely, but this module is in the business
    // of making guarantees rather than safe bets.
    do var uniqueKey = strSlice.call(numToStr.call(rand(), 36), 2);
    while (hasOwn.call(uniqueKeys, uniqueKey));
    return uniqueKeys[uniqueKey] = uniqueKey;
}

// External users might find this function useful, but it is not necessary
// for the typical use of this module.
defProp(exports, "makeUniqueKey", {
    value: makeUniqueKey
});

function makeAccessor() {
    var secrets = [];
    var brand = makeUniqueKey();

    function register(object) {
        var key = secrets.length;
        defProp(object, brand, { value: key });
        secrets[key] = {
            object: object,
            value: create(null)
        };
    }

    return function(object) {
        if (!hasOwn.call(object, brand))
            register(object);

        var secret = secrets[object[brand]];
        if (secret.object === object)
            return secret.value;
    };
}

defProp(exports, "makeAccessor", {
    value: makeAccessor
});

},{}],29:[function(require,module,exports){
var fnTest = /xyz/.test(function(){return xyz;}) ? /\b_super\b/ : /.*/,
    empty = function() {},
    populating = {};

function clone(obj) {
    empty.prototype = obj || null;
    return new empty;
}

function makeClass(base, newProps) {
    var baseProto = base.prototype,
        ownProto = clone(baseProto),
        newStatics = newProps.statics,
        populated;

    function constructor() {
        if (!populated) {
            // Ensure population of baseProto.
            base.call(populating);

            populate(ownProto, newProps, baseProto);

            // Help the garbage collector reclaim this object, since we
            // don't need it anymore.
            newProps = null;

            populated = true;
        }

        // When we invoke a constructor just for the sake of making sure
        // its prototype has been populated, the receiver object (this)
        // will be strictly equal to the populating object, which means we
        // want to avoid invoking this.init.
        if (this === populating)
            return;

        // Evaluate this.init only once to avoid looking up .init in the
        // prototype chain twice.
        var init = this.init;
        if (init)
            init.apply(this, arguments);
    }

    // Copy any static properties that have been assigned to the base
    // class over to the subclass.
    populate(constructor, base);

    if (newStatics) {
        // Remove the statics property from newProps so that it does not
        // get copied to the prototype.
        delete newProps.statics;

        // We re-use populate for static properties, so static methods
        // have the same access to this._super that normal methods have.
        populate(constructor, newStatics, base);

        // Help the GC reclaim this object.
        newStatics = null;
    }

    // These property assignments overwrite any properties of the same
    // name that may have been copied from base, above. Note that ownProto
    // has not been populated with any methods or properties, yet, because
    // we postpone that work until the subclass is instantiated for the
    // first time. Also note that we share a single implementation of
    // extend between all classes.
    constructor.prototype = ownProto;
    constructor.extend = extend;

    // Setting constructor.prototype.constructor = constructor is
    // important so that instanceof works properly in all browsers.
    ownProto.constructor = constructor;

    // Setting .cls as a shorthand for .constructor is purely a
    // convenience to make calling static methods easier.
    ownProto.cls = constructor;

    // If there is a static initializer, call it now. This needs to happen
    // last so that the constructor is ready to be used if, for example,
    // constructor.init needs to create an instance of the new class.
    if (constructor.init)
        constructor.init(constructor);

    return constructor;
}

function populate(target, source, parent) {
    for (var name in source)
        if (source.hasOwnProperty(name))
            target[name] = parent ? maybeWrap(name, source, parent) : source[name];
}

function maybeWrap(name, child, parent) {
    var cval = child && child[name],
        pval = parent && parent[name];

    if (typeof cval === "function" &&
        typeof pval === "function" &&
        cval !== pval && // Avoid infinite recursion.
        cval.extend !== extend && // Don't wrap classes.
        fnTest.test(cval)) // Only wrap if this._super needed.
    {
        return function() {
            var saved = this._super;
            this._super = parent[name];
            try { return cval.apply(this, arguments) }
            finally { this._super = saved };
        };
    }

    return cval;
}

function extend(newProps) {
    return makeClass(this, newProps || {});
}

exports.Class = extend.call(function(){});

},{}],30:[function(require,module,exports){
var assert = require("assert");
var linesModule = require("./lines");
var fromString = linesModule.fromString;
var Lines = linesModule.Lines;
var concat = linesModule.concat;
var Visitor = require("./visitor").Visitor;

exports.add = function(ast, lines) {
    var comments = ast.comments;
    assert.ok(comments instanceof Array);
    delete ast.comments;

    assert.ok(lines instanceof Lines);

    var pt = new PosTracker,
        len = comments.length,
        comment,
        key,
        loc, locs = pt.locs,
        pair,
        sorted = [];

    pt.visit(ast);

    for (var i = 0; i < len; ++i) {
        comment = comments[i];
        Object.defineProperty(comment.loc, "lines", { value: lines });
        pt.getEntry(comment, "end").comment = comment;
    }

    for (key in locs) {
        loc = locs[key];
        pair = key.split(",");

        sorted.push({
            line: +pair[0],
            column: +pair[1],
            startNode: loc.startNode,
            endNode: loc.endNode,
            comment: loc.comment
        });
    }

    sorted.sort(cmpPos);

    var pendingComments = [];
    var previousNode;

    function addComment(node, comment) {
        if (node) {
            var comments = node.comments || (node.comments = []);
            comments.push(comment);
        }
    }

    function dumpTrailing() {
        pendingComments.forEach(function(comment) {
            addComment(previousNode, comment);
            comment.trailing = true;
        });

        pendingComments.length = 0;
    }

    sorted.forEach(function(entry) {
        if (entry.endNode) {
            // If we're ending a node with comments still pending, then we
            // need to attach those comments to the previous node before
            // updating the previous node.
            dumpTrailing();
            previousNode = entry.endNode;
        }

        if (entry.comment) {
            pendingComments.push(entry.comment);
        }

        if (entry.startNode) {
            var node = entry.startNode;
            var nodeStartColumn = node.loc.start.column;
            var didAddLeadingComment = false;
            var gapEndLoc = node.loc.start;

            // Iterate backwards through pendingComments, examining the
            // gaps between them. In order to earn the .possiblyLeading
            // status, a comment must be separated from entry.startNode by
            // an unbroken series of whitespace-only gaps.
            for (var i = pendingComments.length - 1; i >= 0; --i) {
                var comment = pendingComments[i];
                var gap = lines.slice(comment.loc.end, gapEndLoc);
                gapEndLoc = comment.loc.start;

                if (gap.isOnlyWhitespace()) {
                    comment.possiblyLeading = true;
                } else {
                    break;
                }
            }

            pendingComments.forEach(function(comment) {
                if (!comment.possiblyLeading) {
                    // If comment.possiblyLeading was not set to true
                    // above, the comment must be a trailing comment.
                    comment.trailing = true;
                    addComment(previousNode, comment);

                } else if (didAddLeadingComment) {
                    // If we previously added a leading comment to this
                    // node, then any subsequent pending comments must
                    // also be leading comments, even if they are indented
                    // more deeply than the node itself.
                    assert.strictEqual(comment.possiblyLeading, true);
                    comment.trailing = false;
                    addComment(node, comment);

                } else if (comment.type === "Line" &&
                           comment.loc.start.column > nodeStartColumn) {
                    // If the comment is a //-style comment and indented
                    // more deeply than the node itself, and we have not
                    // encountered any other leading comments, treat this
                    // comment as a trailing comment and add it to the
                    // previous node.
                    comment.trailing = true;
                    addComment(previousNode, comment);

                } else {
                    // Here we have the first leading comment for this node.
                    comment.trailing = false;
                    addComment(node, comment);
                    didAddLeadingComment = true;
                }
            });

            pendingComments.length = 0;

            // Note: the previous node is the node that started OR ended
            // most recently.
            previousNode = entry.startNode;
        }
    });

    // Provided we have a previous node to add them to, dump any
    // still-pending comments into the last node we came across.
    dumpTrailing();
};

var PosTracker = Visitor.extend({
    init: function() {
        this.locs = {};
    },

    getEntry: function(node, which) {
        var locs = this.locs,
            key = getKey(node, which);
        return key && (locs[key] || (locs[key] = {}));
    },

    onStart: function(node) {
        var entry = this.getEntry(node, "start");
        if (entry && !entry.startNode)
            entry.startNode = node;
    },

    onEnd: function(node) {
        var entry = this.getEntry(node, "end");
        if (entry)
            entry.endNode = node;
    },

    genericVisit: function(node) {
        this.onStart(node);
        this._super(node);
        this.onEnd(node);
    }
});

function getKey(node, which) {
    var loc = node && node.loc,
        pos = loc && loc[which];
    return pos && (pos.line + "," + pos.column);
}

function cmpPos(a, b) {
    return (a.line - b.line) || (a.column - b.column);
}

function printLeadingComment(comment) {
    var orig = comment.original;
    var loc = orig && orig.loc;
    var lines = loc && loc.lines;
    var parts = [];

    if (comment.type === "Block") {
        parts.push("/*", comment.value, "*/");
    } else if (comment.type === "Line") {
        parts.push("//", comment.value);
    } else assert.fail(comment.type);

    if (comment.trailing) {
        // When we print trailing comments as leading comments, we don't
        // want to bring any trailing spaces along.
        parts.push("\n");

    } else if (lines instanceof Lines) {
        var trailingSpace = lines.slice(
            loc.end,
            lines.firstNonSpacePos(loc.end)
        );

        if (trailingSpace.length === 1) {
            // If the trailing space contains no newlines, then we want to
            // preserve it exactly as we found it.
            parts.push(trailingSpace);
        } else {
            // If the trailing space contains newlines, then replace it
            // with just that many newlines, with all other spaces removed.
            parts.push(new Array(trailingSpace.length).join("\n"));
        }

    } else {
        parts.push("\n");
    }

    return concat(parts).stripMargin(loc ? loc.start.column : 0);
}

function printTrailingComment(comment) {
    var orig = comment.original;
    var loc = orig && orig.loc;
    var lines = loc && loc.lines;
    var parts = [];

    if (lines instanceof Lines) {
        var fromPos = lines.lastNonSpacePos(loc.start);
        if (fromPos) {
            lines.nextPos(fromPos); // Exclude the non-space character.
        } else {
            fromPos = lines.firstPos();
        }

        var leadingSpace = lines.slice(fromPos, loc.start);

        if (leadingSpace.length === 1) {
            // If the leading space contains no newlines, then we want to
            // preserve it exactly as we found it.
            parts.push(leadingSpace);
        } else {
            // If the leading space contains newlines, then replace it
            // with just that many newlines, sans all other spaces.
            parts.push(new Array(leadingSpace.length).join("\n"));
        }
    }

    if (comment.type === "Block") {
        parts.push("/*", comment.value, "*/");
    } else if (comment.type === "Line") {
        parts.push("//", comment.value, "\n");
    } else assert.fail(comment.type);

    return concat(parts).stripMargin(
        loc ? loc.start.column : 0,
        true // Skip the first line, in case there were leading spaces.
    );
}

exports.printComments = function(comments, innerLines) {
    if (innerLines) {
        assert.ok(innerLines instanceof Lines);
    } else {
        innerLines = fromString("");
    }

    var count = comments ? comments.length : 0;
    if (count === 0) {
        return innerLines;
    }

    var parts = [];
    var leading = [];
    var trailing = [];

    comments.forEach(function(comment) {
        // For now, only /*comments*/ can be trailing comments.
        if (comment.type === "Block" &&
            comment.trailing) {
            trailing.push(comment);
        } else {
            leading.push(comment);
        }
    });

    leading.forEach(function(comment) {
        parts.push(printLeadingComment(comment));
    });

    parts.push(innerLines);

    trailing.forEach(function(comment) {
        parts.push(printTrailingComment(comment));
    });

    return concat(parts);
};

},{"./lines":31,"./visitor":38,"assert":2}],31:[function(require,module,exports){
var assert = require("assert");
var normalizeOptions = require("./options").normalize;
var getSecret = require("private").makeAccessor();

// Goals:
// 1. Minimize new string creation.
// 2. Keep (de)identation O(lines) time.
// 3. Permit negative indentations.
// 4. Enforce immutability.
// 5. No newline characters.

function Lines(infos) {
    var self = this;

    assert.ok(self instanceof Lines);
    assert.ok(infos.length > 0);

    getSecret(self).infos = infos;

    Object.defineProperties(self, {
        length: { value: infos.length }
    });
}

// Exposed for instanceof checks. The fromString function should be used
// to create new Lines objects.
exports.Lines = Lines;

var Lp = Lines.prototype,
    leadingSpaceExp = /^\s*/,
    secret;

function copyLineInfo(info) {
    return {
        line: info.line,
        indent: info.indent,
        sliceStart: info.sliceStart,
        sliceEnd: info.sliceEnd
    };
}

var fromStringCache = {};
var hasOwn = fromStringCache.hasOwnProperty;
var maxCacheKeyLen = 10;

function countSpaces(spaces, tabWidth) {
    var count = 0;
    var len = spaces.length;

    for (var i = 0; i < len; ++i) {
        var ch = spaces.charAt(i);

        if (ch === " ") {
            count += 1;

        } else if (ch === "\t") {
            assert.strictEqual(typeof tabWidth, "number");
            assert.ok(tabWidth > 0);

            var next = Math.ceil(count / tabWidth) * tabWidth;
            if (next === count) {
                count += tabWidth;
            } else {
                count = next;
            }

        } else if (ch === "\r") {
            // Ignore carriage return characters.

        } else {
            assert.fail("unexpected whitespace character", ch);
        }
    }

    return count;
}
exports.countSpaces = countSpaces;

function fromString(string, tabWidth) {
    if (string instanceof Lines)
        return string;

    string += "";

    var tabless = string.indexOf("\t") < 0;
    var cacheable = tabless && (string.length <= maxCacheKeyLen);

    assert.ok(tabWidth || tabless, "encountered tabs, but no tab width specified");

    if (cacheable && hasOwn.call(fromStringCache, string))
        return fromStringCache[string];

    var lines = new Lines(string.split("\n").map(function(line) {
        var spaces = leadingSpaceExp.exec(line)[0];
        return {
            line: line,
            indent: countSpaces(spaces, tabWidth),
            sliceStart: spaces.length,
            sliceEnd: line.length
        };
    }));

    if (cacheable)
        fromStringCache[string] = lines;

    return lines;
}
exports.fromString = fromString;
var emptyLines = fromString("");

function isOnlyWhitespace(string) {
    return !/\S/.test(string);
}

Lp.toString = function(options) {
    options = normalizeOptions(options);

    var secret = getSecret(this),
        tabWidth = options.tabWidth;

    return secret.infos.map(function(info) {
        var indent = Math.max(info.indent, 0);
        var before = info.line.slice(0, info.sliceStart);

        if (options.reuseWhitespace &&
            isOnlyWhitespace(before) &&
            (countSpaces(before, options.tabWidth) === indent))
            // Reuse original spaces if the indentation is correct.
            return info.line.slice(0, info.sliceEnd);

        var tabs = 0;
        var spaces = indent;

        if (options.useTabs) {
            tabs = Math.floor(indent / tabWidth);
            spaces -= tabs * tabWidth;
        }

        var result = "";

        if (tabs > 0)
            result += new Array(tabs + 1).join("\t");

        if (spaces > 0)
            result += new Array(spaces + 1).join(" ");

        result += info.line.slice(
            info.sliceStart,
            info.sliceEnd);

        return result;
    }).join("\n");
};

Lp.bootstrapCharAt = function(pos) {
    assert.strictEqual(typeof pos, "object");
    assert.strictEqual(typeof pos.line, "number");
    assert.strictEqual(typeof pos.column, "number");

    var line = pos.line,
        column = pos.column,
        strings = this.toString().split("\n"),
        string = strings[line - 1];

    if (typeof string === "undefined")
        return "";

    if (column === string.length &&
        line < strings.length)
        return "\n";

    return string.charAt(column);
};

Lp.charAt = function(pos) {
    assert.strictEqual(typeof pos, "object");
    assert.strictEqual(typeof pos.line, "number");
    assert.strictEqual(typeof pos.column, "number");

    var line = pos.line,
        column = pos.column,
        secret = getSecret(this),
        infos = secret.infos,
        info = infos[line - 1],
        c = column;

    if (typeof info === "undefined" || c < 0)
        return "";

    var indent = this.getIndentAt(line);
    if (c < indent)
        return " ";

    c += info.sliceStart - indent;
    if (c === info.sliceEnd &&
        line < this.length)
        return "\n";

    return info.line.charAt(c);
};

Lp.stripMargin = function(width, skipFirstLine) {
    if (width === 0)
        return this;

    assert.ok(width > 0, "negative margin: " + width);

    if (skipFirstLine && this.length === 1)
        return this;

    var infos = getSecret(this).infos;

    return new Lines(infos.map(function(info, i) {
        if (info.line && (i > 0 || !skipFirstLine)) {
            info = copyLineInfo(info);
            info.indent = Math.max(0, info.indent - width);
        }
        return info;
    }));
};

Lp.indent = function(by) {
    if (by === 0)
        return this;

    var infos = getSecret(this).infos;

    return new Lines(infos.map(function(info) {
        if (info.line) {
            info = copyLineInfo(info);
            info.indent += by;
        }
        return info
    }));
};

Lp.indentTail = function(by) {
    if (by === 0)
        return this;

    if (this.length < 2)
        return this;

    var infos = getSecret(this).infos;

    return new Lines(infos.map(function(info, i) {
        if (i > 0 && info.line) {
            info = copyLineInfo(info);
            info.indent += by;
        }

        return info;
    }));
};

Lp.getIndentAt = function(line) {
    assert.ok(line >= 1, "no line " + line + " (line numbers start from 1)");
    var secret = getSecret(this),
        info = secret.infos[line - 1];
    return Math.max(info.indent, 0);
};

Lp.isOnlyWhitespace = function() {
    return isOnlyWhitespace(this.toString());
};

Lp.isPrecededOnlyByWhitespace = function(pos) {
    return this.slice({
        line: pos.line,
        column: 0
    }, pos).isOnlyWhitespace();
};

Lp.getLineLength = function(line) {
    var secret = getSecret(this),
        info = secret.infos[line - 1];
    return this.getIndentAt(line) + info.sliceEnd - info.sliceStart;
};

Lp.nextPos = function(pos) {
    var l = Math.max(pos.line, 0),
        c = Math.max(pos.column, 0);

    if (c < this.getLineLength(l)) {
        pos.column += 1;
        return true;
    }

    if (l < this.length) {
        pos.line += 1;
        pos.column = 0;
        return true;
    }

    return false;
};

Lp.prevPos = function(pos) {
    var l = pos.line,
        c = pos.column;

    if (c < 1) {
        l -= 1;

        if (l < 1)
            return false;

        c = this.getLineLength(l);

    } else {
        c = Math.min(c - 1, this.getLineLength(l));
    }

    pos.line = l;
    pos.column = c;

    return true;
};

Lp.firstPos = function() {
    // Trivial, but provided for completeness.
    return { line: 1, column: 0 };
};

// Returns the position of the first non-whitespace character, starting
// from and including startPos (or lines.firstPos() if startPos is not
// specified).
Lp.firstNonSpacePos = function(startPos) {
    var lines = this;
    var pos = startPos ? {
        line: startPos.line,
        column: startPos.column
    } : lines.firstPos();

    while (isOnlyWhitespace(lines.charAt(pos)))
        if (!lines.nextPos(pos))
            return null;

    return pos;
};

Lp.lastPos = function() {
    return {
        line: this.length,
        column: this.getLineLength(this.length)
    };
};

// Returns the position of the last non-whitespace character before endPos
// (or lines.lastPos() if endPos is not specified).
Lp.lastNonSpacePos = function(endPos) {
    var lines = this;
    var pos = endPos ? {
        line: endPos.line,
        column: endPos.column
    } : lines.lastPos();

    while (lines.prevPos(pos))
        if (!isOnlyWhitespace(lines.charAt(pos)))
            return pos;

    return null;
};

Lp.trimLeft = function() {
    var pos = this.firstNonSpacePos();
    if (pos === null)
        return emptyLines;
    return this.slice(pos);
};

Lp.trimRight = function() {
    var pos = this.lastNonSpacePos();
    if (pos === null)
        return emptyLines;
    assert.ok(this.nextPos(pos));
    return this.slice(this.firstPos(), pos);
};

Lp.trim = function() {
    var start = this.firstNonSpacePos();
    if (start === null)
        return emptyLines;

    var end = this.lastNonSpacePos();
    assert.notStrictEqual(end, null);
    assert.ok(this.nextPos(end));

    return this.slice(start, end);
};

Lp.eachPos = function(callback, startPos) {
    var pos = this.firstPos();

    if (startPos) {
        pos.line = startPos.line,
        pos.column = startPos.column
    }

    do callback.call(this, pos);
    while (this.nextPos(pos));
};

Lp.bootstrapSlice = function(start, end) {
    var strings = this.toString().split("\n").slice(
            start.line - 1, end.line);

    strings.push(strings.pop().slice(0, end.column));
    strings[0] = strings[0].slice(start.column);

    return fromString(strings.join("\n"));
};

Lp.slice = function(start, end) {
    var argc = arguments.length;
    if (argc < 1)
        // The client seems to want a copy of this Lines object, but Lines
        // objects are immutable, so it's perfectly adequate to return the
        // same object.
        return this;

    if (argc < 2)
        // Slice to the end if no end position was provided.
        end = this.lastPos();

    var secret = getSecret(this),
        sliced = secret.infos.slice(start.line - 1, end.line),
        info = copyLineInfo(sliced.pop()),
        indent = this.getIndentAt(end.line),
        sc = start.column,
        ec = end.column;

    if (start.line === end.line) {
        // If the same line is getting sliced from both ends, make sure
        // end.column is not less than start.column.
        ec = Math.max(sc, ec);
    }

    if (ec < indent) {
        info.indent -= indent - ec;
        info.sliceEnd = info.sliceStart;
    } else {
        info.sliceEnd = info.sliceStart + ec - indent;
    }

    assert.ok(info.sliceStart <= info.sliceEnd);

    sliced.push(info);

    if (sliced.length > 1) {
        sliced[0] = info = copyLineInfo(sliced[0]);
        indent = this.getIndentAt(start.line);
    } else {
        assert.strictEqual(info, sliced[0]);
    }

    if (sc < indent) {
        info.indent -= sc;
    } else {
        sc -= indent;
        info.indent = 0;
        info.sliceStart += sc;
    }

    assert.ok(info.sliceStart <= info.sliceEnd);

    return new Lines(sliced);
};

Lp.isEmpty = function() {
    return this.length < 2 && this.getLineLength(1) < 1;
};

Lp.join = function(elements) {
    var separator = this,
        separatorSecret = getSecret(separator),
        infos = [],
        prevInfo;

    function appendSecret(secret) {
        if (secret === null)
            return;

        if (prevInfo) {
            var info = secret.infos[0],
                indent = new Array(info.indent + 1).join(" ");

            prevInfo.line = prevInfo.line.slice(
                0, prevInfo.sliceEnd) + indent + info.line.slice(
                    info.sliceStart, info.sliceEnd);

            prevInfo.sliceEnd = prevInfo.line.length;
        }

        secret.infos.forEach(function(info, i) {
            if (!prevInfo || i > 0) {
                prevInfo = copyLineInfo(info);
                infos.push(prevInfo);
            }
        });
    }

    function appendWithSeparator(secret, i) {
        if (i > 0)
            appendSecret(separatorSecret);
        appendSecret(secret);
    }

    elements.map(function(elem) {
        var lines = fromString(elem);
        if (lines.isEmpty())
            return null;
        return getSecret(lines);
    }).forEach(separator.isEmpty()
               ? appendSecret
               : appendWithSeparator);

    if (infos.length < 1)
        return emptyLines;

    return new Lines(infos);
};

exports.concat = function(elements) {
    return emptyLines.join(elements);
};

Lp.concat = function(other) {
    var args = arguments,
        list = [this];
    list.push.apply(list, args);
    assert.strictEqual(list.length, args.length + 1);
    return emptyLines.join(list);
};

},{"./options":32,"assert":2,"private":28}],32:[function(require,module,exports){
var defaults = {
    tabWidth: 4,
    useTabs: false,
    reuseWhitespace: true,
    wrapColumn: 74, // Aspirational for now.
    esprima: require("esprima"),
    tolerant: true
}, hasOwn = defaults.hasOwnProperty;

// Copy options and fill in default values.
exports.normalize = function(options) {
    options = options || defaults;

    function get(key) {
        return hasOwn.call(options, key)
            ? options[key]
            : defaults[key];
    }

    return {
        tabWidth: +get("tabWidth"),
        useTabs: !!get("useTabs"),
        reuseWhitespace: !!get("reuseWhitespace"),
        wrapColumn: Math.max(get("wrapColumn"), 0),
        esprima: get("esprima"),
        tolerant: get("tolerant")
    };
};

},{"esprima":27}],33:[function(require,module,exports){
var assert = require("assert");
var types = require("./types");
var Syntax = types.Syntax;
var n = types.namedTypes;
var b = types.builders;
var Patcher = require("./patcher").Patcher;
var Visitor = require("./visitor").Visitor;
var normalizeOptions = require("./options").normalize;

exports.parse = function(source, options) {
    options = normalizeOptions(options);

    var lines = require("./lines").fromString(
        source, options.tabWidth);

    var pure = options.esprima.parse(lines.toString({
        tabWidth: options.tabWidth,
        reuseWhitespace: false,
        useTabs: false
    }), {
        loc: true,
        comment: true,
        tolerant: options.tolerant
    });

    new LocationFixer(lines).visit(pure);

    require("./comments").add(pure, lines);

    // In order to ensure we reprint leading and trailing program
    // comments, wrap the original Program node with a File node.
    pure = b.file(pure);
    pure.loc = {
        lines: lines,
        start: lines.firstPos(),
        end: lines.lastPos()
    };

    // Return a copy of the original AST so that any changes made may be
    // compared to the original.
    return copyAst(pure);
};

var LocationFixer = Visitor.extend({
    init: function(lines) {
        this.lines = lines;
    },

    genericVisit: function(node) {
        this._super(node);

        var loc = node && node.loc,
            start = loc && loc.start,
            end = loc && loc.end;

        if (loc) {
            Object.defineProperty(loc, "lines", {
                value: this.lines
            });
        }

        if (start) {
            start.line = Math.max(start.line, 1);
        }

        if (end) {
            end.line = Math.max(end.line, 1);

            var lines = loc.lines, pos = {
                line: end.line,
                column: end.column
            };

            // Negative columns might indicate an Esprima bug?
            // For now, treat them as reverse indices, a la Python.
            if (pos.column < 0)
                pos.column += lines.getLineLength(pos.line);

            while (lines.prevPos(pos)) {
                if (/\S/.test(lines.charAt(pos))) {
                    assert.ok(lines.nextPos(pos));

                    end.line = pos.line;
                    end.column = pos.column;

                    break;
                }
            }
        }
    }
});

function copyAst(node, parent) {
    if (typeof node === "object" &&
        node !== null)
    {
        if (node instanceof RegExp)
            return node;

        if (node instanceof Array) {
            return node.map(function(child) {
                return copyAst(child, parent);
            });
        }

        var copy = {},
            key,
            val;

        for (key in node) {
            if (node.hasOwnProperty(key)) {
                val = copyAst(node[key], node);
                if (typeof val !== "function")
                    copy[key] = val;
            }
        }

        if (parent && (node.type in Syntax)) {
            // Allow upwards traversal of the original AST.
            Object.defineProperty(node, "parentNode", {
                value: parent
            });
        }

        // Provide a link from the copy to the original.
        Object.defineProperty(copy, "original", {
            value: node,
            configurable: false,
            enumerable: false,
            writable: true,
        });

        return copy;
    }

    return node;
}

},{"./comments":30,"./lines":31,"./options":32,"./patcher":34,"./types":36,"./visitor":38,"assert":2}],34:[function(require,module,exports){
var assert = require("assert");
var linesModule = require("./lines");
var typesModule = require("./types");
var Syntax = typesModule.Syntax;
var getFieldValue = typesModule.getFieldValue;
var util = require("./util");
var NodePath = require("ast-types").NodePath;

function Patcher(lines) {
    assert.ok(this instanceof Patcher);
    assert.ok(lines instanceof linesModule.Lines);

    var self = this,
        replacements = [];

    self.replace = function(loc, lines) {
        if (typeof lines === "string")
            lines = linesModule.fromString(lines);

        replacements.push({
            lines: lines,
            start: loc.start,
            end: loc.end
        });
    };

    self.get = function(loc) {
        // If no location is provided, return the complete Lines object.
        loc = loc || {
            start: { line: 1, column: 0 },
            end: { line: lines.length,
                   column: lines.getLineLength(lines.length) }
        };

        var sliceFrom = loc.start,
            toConcat = [];

        function pushSlice(from, to) {
            assert.ok(cmpPos(from, to) <= 0);
            toConcat.push(lines.slice(from, to));
        }

        replacements.sort(function(a, b) {
            return cmpPos(a.start, b.start);
        }).forEach(function(rep) {
            if (cmpPos(sliceFrom, rep.start) > 0) {
                // Ignore nested replacement ranges.
            } else {
                pushSlice(sliceFrom, rep.start);
                toConcat.push(rep.lines);
                sliceFrom = rep.end;
            }
        });

        pushSlice(sliceFrom, loc.end);

        return linesModule.concat(toConcat);
    };
}
exports.Patcher = Patcher;

// TODO unify this with other cmpPos functions
function cmpPos(a, b) {
    return (a.line - b.line) || (a.column - b.column);
}

exports.getReprinter = function(path) {
    assert.ok(path instanceof NodePath);

    var orig = path.node.original;
    var origLoc = orig && orig.loc;
    var lines = origLoc && origLoc.lines;
    var reprints = [];

    if (!lines || !findReprints(path, reprints))
        return;

    return function(print) {
        var patcher = new Patcher(lines);

        reprints.forEach(function(reprint) {
            var old = reprint.oldNode;
            patcher.replace(
                old.loc,
                print(reprint.newPath).indentTail(
                    getIndent(old)));
        });

        return patcher.get(origLoc).indentTail(-getIndent(orig));
    };
};

// Get the indentation of the first ancestor node on a line with nothing
// before it but whitespace.
function getIndent(orig) {
    var naiveIndent = orig.loc.lines.getIndentAt(
        orig.loc.start.line);

    for (var loc, start, lines;
         orig &&
         (loc = orig.loc) &&
         (start = loc.start) &&
         (lines = loc.lines);
         orig = orig.parentNode)
    {
        if (lines.isPrecededOnlyByWhitespace(start)) {
            // The indent returned by lines.getIndentAt is the column of
            // the first non-space character in the line, but start.column
            // may fall before that character, as when a file begins with
            // whitespace but its start.column nevertheless must be 0.
            assert.ok(start.column <= lines.getIndentAt(start.line));
            return start.column;
        }
    }

    return naiveIndent;
}

function findReprints(path, reprints) {
    var node = path.node;
    assert.ok(node.original);
    assert.deepEqual(reprints, []);

    var canReprint = findChildReprints(path, node.original, reprints);

    if (!canReprint) {
        // Make absolutely sure the calling code does not attempt to reprint
        // any nodes.
        reprints.length = 0;
    }

    return canReprint;
}

function findAnyReprints(path, oldNode, reprints) {
    var newNode = path.value;
    if (newNode === oldNode)
        return true;

    if (newNode instanceof Array)
        return findArrayReprints(path, oldNode, reprints);

    if (typeof newNode === "object")
        return findObjectReprints(path, oldNode, reprints);

    return false;
}

function findArrayReprints(path, oldNode, reprints) {
    var newNode = path.value;
    assert.ok(newNode instanceof Array);
    var len = newNode.length;

    if (!(oldNode instanceof Array &&
          oldNode.length === len))
        return false;

    for (var i = 0; i < len; ++i)
        if (!findAnyReprints(path.get(i), oldNode[i], reprints))
            return false;

    return true;
}

function findObjectReprints(path, oldNode, reprints) {
    var newNode = path.value;
    assert.strictEqual(typeof newNode, "object");
    if (!newNode || !oldNode || typeof oldNode !== "object")
        return false;

    var childReprints = [];
    var canReprintChildren = findChildReprints(path, oldNode, childReprints);

    if (newNode.type in Syntax) {
        // TODO Decompose this check: if (!printTheSame(newNode, oldNode))
        if (newNode.type !== oldNode.type)
            return false;

        if (!canReprintChildren) {
            reprints.push({
                newPath: path,
                oldNode: oldNode
            });

            return true;
        }
    }

    reprints.push.apply(reprints, childReprints);
    return canReprintChildren;
}

function hasParens(oldNode) {
    var loc = oldNode.loc;
    var lines = loc && loc.lines;

    if (lines) {
        // This logic can technically be fooled if the node has
        // parentheses but there are comments intervening between the
        // parentheses and the node. In such cases the node will be
        // harmlessly wrapped in an additional layer of parentheses.
        var pos = lines.lastNonSpacePos(loc.start);
        if (pos && lines.charAt(pos) === "(") {
            pos = lines.firstNonSpacePos(loc.end);
            if (pos && lines.charAt(pos) === ")")
                return true;
        }
    }

    return false;
}

function findChildReprints(path, oldNode, reprints) {
    var newNode = path.value;
    assert.strictEqual(typeof newNode, "object");
    assert.strictEqual(typeof oldNode, "object");

    // If this node needs parentheses and will not be wrapped with
    // parentheses when reprinted, then return false to skip reprinting
    // and let it be printed generically.
    if (path.needsParens() && !hasParens(oldNode))
        return false;

    for (var k in util.getUnionOfKeys(newNode, oldNode)) {
        if (k === "loc")
            continue;

        var oldChild = getFieldValue(oldNode, k);
        var newChild = getFieldValue(newNode, k);

        // Normally we would use path.get(k), but that might not produce a
        // Path with newChild as its .value (for instance, if a default
        // value was returned), so we must forge this path by hand.
        var newChildPath = new NodePath(newChild, path, k);

        if (!findAnyReprints(newChildPath, oldChild, reprints))
            return false;
    }

    return true;
}

},{"./lines":31,"./types":36,"./util":37,"assert":2,"ast-types":24}],35:[function(require,module,exports){
var assert = require("assert");
var Syntax = require("./types").Syntax;
var printComments = require("./comments").printComments;
var linesModule = require("./lines");
var fromString = linesModule.fromString;
var concat = linesModule.concat;
var normalizeOptions = require("./options").normalize;
var getReprinter = require("./patcher").getReprinter;
var types = require("./types").namedTypes;
var NodePath = require("ast-types").NodePath;

function Printer(options) {
    assert.ok(this instanceof Printer);

    options = normalizeOptions(options);

    function printWithComments(path) {
        assert.ok(path instanceof NodePath);
        return printComments(path.node.comments, print(path));
    }

    function print(path, includeComments) {
        if (includeComments)
            return printWithComments(path);

        assert.ok(path instanceof NodePath);

        var reprinter = getReprinter(path);
        if (reprinter)
            return maybeAddParens(path, reprinter(printRootGenerically));

        return printRootGenerically(path);
    }

    // Print the root node generically, but then resume reprinting its
    // children non-generically.
    function printRootGenerically(path) {
        return genericPrint(path, options, printWithComments);
    }

    // Print the entire AST generically.
    function printGenerically(path) {
        return genericPrint(path, options, printGenerically);
    }

    this.print = function(ast) {
        if (!ast) return "";
        return print(new NodePath(ast), true).toString(options);
    };

    this.printGenerically = function(ast) {
        if (!ast) return "";
        return printGenerically(new NodePath(ast)).toString(options);
    };
}

exports.Printer = Printer;

function maybeAddParens(path, lines) {
    return path.needsParens() ? concat(["(", lines, ")"]) : lines;
}

function genericPrint(path, options, printPath) {
    assert.ok(path instanceof NodePath);
    return maybeAddParens(path, genericPrintNoParens(path, options, printPath));
}

function genericPrintNoParens(path, options, print) {
    var n = path.value;

    if (!n) {
        return fromString("");
    }

    if (typeof n === "string") {
        return fromString(n, options.tabWidth);
    }

    types.Node.assert(n);

    switch (n.type) {
    case "File":
        path = path.get("program");
        n = path.node;
        types.Program.assert(n);

        // intentionally fall through...

    case "Program":
        return maybeAddSemicolon(
            printStatementSequence(path.get("body"), print)
        );

    case "EmptyStatement":
        return fromString("");

    case "ExpressionStatement":
        return concat([print(path.get("expression")), ";"]);

    case "BinaryExpression":
    case "LogicalExpression":
    case "AssignmentExpression":
        return fromString(" ").join([
            print(path.get("left")),
            n.operator,
            print(path.get("right"))
        ]);

    case "MemberExpression":
        var parts = [print(path.get("object"))];

        if (n.computed)
            parts.push("[", print(path.get("property")), "]");
        else
            parts.push(".", print(path.get("property")));

        return concat(parts);

    case "Path":
        return fromString(".").join(n.body);

    case "Identifier":
        return fromString(n.name, options.tabWidth);

    case "SpreadElement":
        return concat(["...", print(path.get("argument"))]);

    case "FunctionDeclaration":
    case "FunctionExpression":
        var parts = ["function"];

        if (n.generator)
            parts.push("*");

        if (n.id)
            parts.push(" ", print(path.get("id")));

        parts.push(
            "(",
            maybeWrapParams(path.get("params"), options, print),
            ") ",
            print(path.get("body")));

        return concat(parts);

    case "ArrowFunctionExpression":
        var parts = [];

        if (n.params.length === 1) {
            parts.push(print(path.get("params", 0)));
        } else {
            parts.push(
                "(",
                maybeWrapParams(path.get("params"), options, print),
                ")"
            );
        }

        parts.push(" => ", print(path.get("body")));

        return concat(parts);

    case "MethodDefinition":
        var parts = [];

        if (!n.kind || n.kind === "init") {
            if (n.value.generator)
                parts.push("*");

        } else {
            assert.ok(
                n.kind === "get" ||
                n.kind === "set");

            parts.push(n.kind, " ");
        }

        parts.push(
            print(path.get("key")),
            "(",
            maybeWrapParams(path.get("value", "params"), options, print),
            ") ",
            print(path.get("value", "body"))
        );

        return concat(parts);

    case "YieldExpression":
        var parts = ["yield"];

        if (n.delegate)
            parts.push("*");

        if (n.argument)
            parts.push(" ", print(path.get("argument")));

        return concat(parts);

    case "ModuleDeclaration":
        var parts = ["module", print(path.get("id"))];

        if (n.source) {
            assert.ok(!n.body);
            parts.push("from", print(path.get("source")));
        } else {
            parts.push(print(path.get("body")));
        }

        return fromString(" ").join(parts);

    case "ImportSpecifier":
    case "ExportSpecifier":
        var parts = [print(path.get("id"))];

        if (n.name)
            parts.push(" as ", print(path.get("name")));

        return concat(parts);

    case "ExportBatchSpecifier":
        return fromString("*");

    case "ExportDeclaration":
        var parts = ["export"];

        if (n["default"]) {
            parts.push(" default");

        } else if (n.specifiers &&
                   n.specifiers.length > 0) {

            if (n.specifiers.length === 1 &&
                n.specifiers[0].type === "ExportBatchSpecifier") {
                parts.push(" *");
            } else {
                parts.push(
                    " { ",
                    fromString(", ").join(path.get("specifiers").map(print)),
                    " }"
                );
            }

            if (n.source)
                parts.push(" from ", print(path.get("source")));

            parts.push(";");

            return concat(parts);
        }

        parts.push(" ", print(path.get("declaration")), ";");

        return concat(parts);

    case "ImportDeclaration":
        var parts = ["import"];

        if (!(n.specifiers &&
              n.specifiers.length > 0)) {
            parts.push(" ", print(path.get("source")));

        } else if (n.kind === "default") {
            parts.push(
                " ",
                print(path.get("specifiers", 0)),
                " from ",
                print(path.get("source"))
            );

        } else if (n.kind === "named") {
            parts.push(
                " { ",
                fromString(", ").join(path.get("specifiers").map(print)),
                " } from ",
                print(path.get("source"))
            );
        }

        parts.push(";");

        return concat(parts);

    case "BlockStatement":
        var naked = printStatementSequence(path.get("body"), print);
        if (naked.isEmpty())
            return fromString("{}");

        return concat([
            "{\n",
            naked.indent(options.tabWidth),
            "\n}"
        ]);

    case "ReturnStatement":
        var parts = ["return"];

        if (n.argument)
            parts.push(" ", print(path.get("argument")));

        return concat(parts);

    case "CallExpression":
        return concat([
            print(path.get("callee")),
            "(",
            fromString(", ").join(path.get("arguments").map(print)),
            ")"
        ]);

    case "ObjectExpression":
    case "ObjectPattern":
        var allowBreak = false,
            len = n.properties.length,
            parts = [len > 0 ? "{\n" : "{"];

        path.get("properties").map(function(childPath) {
            var prop = childPath.value;
            var i = childPath.name;

            // Esprima uses these non-standard AST node types.
            if (!/^Property/.test(prop.type)) {
                if (prop.hasOwnProperty("kind")) {
                    prop.type = "Property";
                } else {
                    prop.type = Syntax.PropertyPattern || "Property";
                }
            }

            var lines = print(childPath).indent(options.tabWidth);

            var multiLine = lines.length > 1;
            if (multiLine && allowBreak) {
                // Similar to the logic for BlockStatement.
                parts.push("\n");
            }

            parts.push(lines);

            if (i < len - 1) {
                // Add an extra line break if the previous object property
                // had a multi-line value.
                parts.push(multiLine ? ",\n\n" : ",\n");
                allowBreak = !multiLine;
            }
        });

        parts.push(len > 0 ? "\n}" : "}");

        return concat(parts);

    case "PropertyPattern":
        return concat([
            print(path.get("key")),
            ": ",
            print(path.get("pattern"))
        ]);

    case "Property": // Non-standard AST node type.
        var key = print(path.get("key")),
            val = print(path.get("value"));

        if (!n.kind || n.kind === "init")
            return fromString(": ").join([key, val]);

        types.FunctionExpression.assert(n.value);
        assert.ok(n.value.id);
        assert.ok(n.kind === "get" ||
                  n.kind === "set");

        return concat([
            n.kind,
            " ",
            print(path.get("value", "id")),
            "(",
            maybeWrapParams(path.get("value", "params"), options, print),
            ")",
            print(path.get("value", "body"))
        ]);

    case "ArrayExpression":
    case "ArrayPattern":
        var elems = n.elements,
            len = elems.length,
            parts = ["["];

        path.get("elements").each(function(elemPath) {
            var elem = elemPath.value;
            if (!elem) {
                // If the array expression ends with a hole, that hole
                // will be ignored by the interpreter, but if it ends with
                // two (or more) holes, we need to write out two (or more)
                // commas so that the resulting code is interpreted with
                // both (all) of the holes.
                parts.push(",");
            } else {
                var i = elemPath.name;
                if (i > 0)
                    parts.push(" ");
                parts.push(print(elemPath));
                if (i < len - 1)
                    parts.push(",");
            }
        });

        parts.push("]");

        return concat(parts);

    case "SequenceExpression":
        return fromString(", ").join(path.get("expressions").map(print));

    case "ThisExpression":
        return fromString("this");

    case "Literal":
        if (typeof n.value !== "string")
            return fromString(n.value, options.tabWidth);

        // intentionally fall through...

    case "ModuleSpecifier":
        // A ModuleSpecifier is a string-valued Literal.
        return fromString(nodeStr(n), options.tabWidth);

    case "UnaryExpression":
        var parts = [n.operator];
        if (/[a-z]$/.test(n.operator))
            parts.push(" ");
        parts.push(print(path.get("argument")));
        return concat(parts);

    case "UpdateExpression":
        var parts = [
            print(path.get("argument")),
            n.operator
        ];

        if (n.prefix)
            parts.reverse();

        return concat(parts);

    case "ConditionalExpression":
        return concat([
            "(", print(path.get("test")),
            " ? ", print(path.get("consequent")),
            " : ", print(path.get("alternate")), ")"
        ]);

    case "NewExpression":
        var parts = ["new ", print(path.get("callee"))];
        var args = n.arguments;

        if (args) {
            parts.push(
                "(",
                fromString(", ").join(path.get("arguments").map(print)),
                ")"
            );
        }

        return concat(parts);

    case "VariableDeclaration":
        var parts = [n.kind, " "];
        var maxLen = 0;
        var printed = path.get("declarations").map(function(childPath) {
            var lines = print(childPath);
            maxLen = Math.max(lines.length, maxLen);
            return lines;
        });

        if (maxLen === 1) {
            parts.push(fromString(", ").join(printed));
        } else {
            parts.push(
                fromString(",\n").join(printed)
                    .indentTail("var ".length)
            );
        }

        return concat(parts);

    case "VariableDeclarator":
        return n.init ? fromString(" = ").join([
            print(path.get("id")),
            print(path.get("init"))
        ]) : print(path.get("id"));

    case "WithStatement":
        return concat([
            "with (",
            print(path.get("object")),
            ") ",
            print(path.get("body"))
        ]);

    case "IfStatement":
        var con = adjustClause(print(path.get("consequent")), options),
            parts = ["if (", print(path.get("test")), ")", con];

        if (n.alternate)
            parts.push(
                endsWithBrace(con) ? " else" : "\nelse",
                adjustClause(print(path.get("alternate")), options));

        return concat(parts);

    case "ForStatement":
        // TODO Get the for (;;) case right.
        var init = print(path.get("init")),
            sep = init.length > 1 ? ";\n" : "; ",
            forParen = "for (",
            indented = fromString(sep).join([
                init,
                print(path.get("test")),
                print(path.get("update"))
            ]).indentTail(forParen.length),
            head = concat([forParen, indented, ")"]),
            clause = adjustClause(print(path.get("body")), options),
            parts = [head];

        if (head.length > 1) {
            parts.push("\n");
            clause = clause.trimLeft();
        }

        parts.push(clause);

        return concat(parts);

    case "WhileStatement":
        return concat([
            "while (",
            print(path.get("test")),
            ")",
            adjustClause(print(path.get("body")), options)
        ]);

    case "ForInStatement":
        // Note: esprima can't actually parse "for each (".
        return concat([
            n.each ? "for each (" : "for (",
            print(path.get("left")),
            " in ",
            print(path.get("right")),
            ")",
            adjustClause(print(path.get("body")), options)
        ]);

    case "ForOfStatement":
        return concat([
            "for (",
            print(path.get("left")),
            " of ",
            print(path.get("right")),
            ")",
            adjustClause(print(path.get("body")), options)
        ]);

    case "DoWhileStatement":
        var doBody = concat([
            "do",
            adjustClause(print(path.get("body")), options)
        ]), parts = [doBody];

        if (endsWithBrace(doBody))
            parts.push(" while");
        else
            parts.push("\nwhile");

        parts.push(" (", print(path.get("test")), ");");

        return concat(parts);

    case "BreakStatement":
        var parts = ["break"];
        if (n.label)
            parts.push(" ", print(path.get("label")));
        return concat(parts);

    case "ContinueStatement":
        var parts = ["continue"];
        if (n.label)
            parts.push(" ", print(path.get("label")));
        return concat(parts);

    case "LabeledStatement":
        return concat([
            print(path.get("label")),
            ":\n",
            print(path.get("body"))
        ]);

    case "TryStatement":
        var parts = [
            "try ",
            print(path.get("block"))
        ];

        n.handlers.forEach(function(handler) {
            parts.push(" ", print(handler));
        });

        if (n.finalizer)
            parts.push(" finally ", print(path.get("finalizer")));

        return concat(parts);

    case "CatchClause":
        var parts = ["catch (", print(path.get("param"))];

        if (n.guard)
            // Note: esprima does not recognize conditional catch clauses.
            parts.push(" if ", print(path.get("guard")));

        parts.push(") ", print(path.get("body")));

        return concat(parts);

    case "ThrowStatement":
        return concat([
            "throw ",
            print(path.get("argument"))
        ]);

    case "SwitchStatement":
        return concat([
            "switch (",
            print(path.get("discriminant")),
            ") {\n",
            fromString("\n").join(path.get("cases").map(print)),
            "\n}"
        ]);

        // Note: ignoring n.lexical because it has no printing consequences.

    case "SwitchCase":
        var parts = [];

        if (n.test)
            parts.push("case ", print(path.get("test")), ":");
        else
            parts.push("default:");

        if (n.consequent.length > 0) {
            parts.push("\n", printStatementSequence(
                path.get("consequent"),
                print
            ).indent(options.tabWidth));
        }

        return concat(parts);

    case "DebuggerStatement":
        return fromString("debugger");

    // XJS extensions below.

    case "XJSAttribute":
        var parts = [print(path.get("name"))];
        if (n.value)
            parts.push("=", print(path.get("value")));
        return concat(parts);

    case "XJSIdentifier":
        var str = n.name;
        if (typeof n.namespace === "string")
            str = n.namespace + ":" + str;
        return fromString(str, options.tabWidth);

    case "XJSExpressionContainer":
        return concat(["{", print(path.get("expression")), "}"]);

    case "XJSElement":
        var parts = [print(path.get("openingElement"))];

        if (!n.selfClosing) {
            parts.push(
                concat(path.get("children").map(function(childPath) {
                    var child = childPath.value;
                    if (child.type === Syntax.Literal)
                        child.type = Syntax.XJSText;
                    return print(childPath);
                })),
                print(path.get("closingElement"))
            );
        }

        return concat(parts);

    case "XJSOpeningElement":
        var parts = ["<", print(path.get("name"))];

        n.attributes.forEach(function(attr) {
            parts.push(" ", print(attr));
        });

        parts.push(n.selfClosing ? " />" : ">");

        return concat(parts);

    case "XJSClosingElement":
        return concat(["</", print(path.get("name")), ">"]);

    case "XJSText":
        return fromString(n.value, options.tabWidth);

    case "XJSEmptyExpression":
        return fromString("");

    case "TypeAnnotatedIdentifier":
        var parts = [
            print(path.get("annotation")),
            " ",
            print(path.get("identifier"))
        ];

        return concat(parts);

    case "ClassBody":
        return concat([
            "{\n",
            printStatementSequence(path.get("body"), print, true)
                .indent(options.tabWidth),
            "\n}"
        ]);

    case "ClassPropertyDefinition":
        var parts = ["static ", print(path.get("definition"))];
        if (!types.MethodDefinition.check(n.definition))
            parts.push(";");
        return concat(parts);

    case "ClassDeclaration":
    case "ClassExpression":
        var parts = ["class"];

        if (n.id)
            parts.push(" ", print(path.get("id")));

        if (n.superClass)
            parts.push(" extends ", print(path.get("superClass")));

        parts.push(" ", print(path.get("body")));

        return concat(parts);

    // Unhandled types below. If encountered, nodes of these types should
    // be either left alone or desugared into AST types that are fully
    // supported by the pretty-printer.

    case "ClassHeritage": // TODO
    case "ComprehensionBlock": // TODO
    case "ComprehensionExpression": // TODO
    case "Glob": // TODO
    case "TaggedTemplateExpression": // TODO
    case "TemplateElement": // TODO
    case "TemplateLiteral": // TODO
    case "GeneratorExpression": // TODO
    case "LetStatement": // TODO
    case "LetExpression": // TODO
    case "GraphExpression": // TODO
    case "GraphIndexExpression": // TODO
    case "TypeAnnotation": // TODO
    default:
        debugger;
        throw new Error("unknown type: " + JSON.stringify(n.type));
    }

    return p;
}

function printStatementSequence(path, print, inClassBody) {
    var filtered = path.filter(function(stmtPath) {
        var stmt = stmtPath.value;

        // Just in case the AST has been modified to contain falsy
        // "statements," it's safer simply to skip them.
        if (!stmt)
            return false;

        // Skip printing EmptyStatement nodes to avoid leaving stray
        // semicolons lying around.
        if (stmt.type === "EmptyStatement")
            return false;

        types.Statement.assert(stmt);

        return true;
    });

    var allowBreak = false,
        len = filtered.length,
        parts = [];

    filtered.map(function(stmtPath) {
        var lines = print(stmtPath);
        var stmt = stmtPath.value;

        if (inClassBody) {
            if (types.MethodDefinition.check(stmt))
                return lines;

            if (types.ClassPropertyDefinition.check(stmt) &&
                types.MethodDefinition.check(stmt.definition))
                return lines;
        }

        // Try to add a semicolon to anything that isn't a method in a
        // class body.
        return maybeAddSemicolon(lines);

    }).forEach(function(lines, i) {
        var multiLine = lines.length > 1;
        if (multiLine && allowBreak) {
            // Insert an additional line break before multi-line
            // statements, if we did not insert an extra line break
            // after the previous statement.
            parts.push("\n");
        }

        if (!inClassBody)
            lines = maybeAddSemicolon(lines);

        parts.push(lines);

        if (i < len - 1) {
            // Add an extra line break if the previous statement
            // spanned multiple lines.
            parts.push(multiLine ? "\n\n" : "\n");

            // Avoid adding another line break if we just added an
            // extra one.
            allowBreak = !multiLine;
        }
    });

    return concat(parts);
}

function maybeWrapParams(path, options, print) {
    var printed = path.map(print);
    var joined = fromString(", ").join(printed);
    if (joined.length > 1 ||
        joined.getLineLength(1) > options.wrapColumn) {
        joined = fromString(",\n").join(printed);
        return concat(["\n", joined.indent(options.tabWidth)]);
    }
    return joined;
}

function adjustClause(clause, options) {
    if (clause.length > 1)
        return concat([" ", clause]);

    return concat([
        "\n",
        maybeAddSemicolon(clause).indent(options.tabWidth)
    ]);
}

function lastNonSpaceCharacter(lines) {
    var pos = lines.lastPos();
    do {
        var ch = lines.charAt(pos);
        if (/\S/.test(ch))
            return ch;
    } while (lines.prevPos(pos));
}

function endsWithBrace(lines) {
    return lastNonSpaceCharacter(lines) === "}";
}

function nodeStrEscape(str) {
    return str.replace(/\\/g, "\\\\")
              .replace(/"/g, "\\\"")
              // The previous line messes up my syntax highlighting
              // unless this comment includes a " character.
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/</g, "\\u003C")
              .replace(/>/g, "\\u003E");
}

function nodeStr(n) {
    if (/[\u0000-\u001F\u0080-\uFFFF]/.test(n.value)) {
        // use the convoluted algorithm to avoid broken low/high characters
        var str = "";
        for (var i = 0; i < n.value.length; i++) {
            var c = n.value[i];
            if (c <= "\x1F" || c >= "\x80") {
                var cc = c.charCodeAt(0).toString(16);
                while (cc.length < 4) cc = "0" + cc;
                str += "\\u" + cc;
            } else {
                str += nodeStrEscape(c);
            }
        }
        return '"' + str + '"';
    }

    return '"' + nodeStrEscape(n.value) + '"';
}

function maybeAddSemicolon(lines) {
    var eoc = lastNonSpaceCharacter(lines);
    if (eoc && "\n};".indexOf(eoc) < 0)
        return concat([lines, ";"]);
    return lines;
}

},{"./comments":30,"./lines":31,"./options":32,"./patcher":34,"./types":36,"assert":2,"ast-types":24}],36:[function(require,module,exports){
var types = require("ast-types");
var def = types.Type.def;

def("File")
    .bases("Node")
    .build("program")
    .field("program", def("Program"));

types.finalize();

exports.builders = types.builders;
exports.namedTypes = types.namedTypes;
exports.getFieldValue = types.getFieldValue;

var Syntax = exports.Syntax = {};
Object.keys(types.namedTypes).forEach(function(name) {
    if (def(name).buildable)
        Syntax[name] = name;
});

// These two types are buildable but do not technically count as syntax
// because they are not printable.
delete Syntax.SourceLocation;
delete Syntax.Position;

},{"ast-types":24}],37:[function(require,module,exports){
var assert = require("assert");
var getFieldValue = require("./types").getFieldValue;

function getUnionOfKeys(obj) {
    for (var i = 0, key,
             result = {},
             objs = arguments,
             argc = objs.length;
         i < argc;
         i += 1)
    {
        obj = objs[i];
        for (key in obj)
            if (obj.hasOwnProperty(key))
                result[key] = true;
    }
    return result;
}
exports.getUnionOfKeys = getUnionOfKeys;

exports.assertEquivalent = function(a, b) {
    if (!deepEquivalent(a, b)) {
        throw new Error(
            JSON.stringify(a) + " not equivalent to " +
            JSON.stringify(b)
        );
    }
};

function deepEquivalent(a, b) {
    if (a === b)
        return true;

    if (a instanceof Array)
        return deepArrEquiv(a, b);

    if (typeof a === "object")
        return deepObjEquiv(a, b);

    return false;
}
exports.deepEquivalent = deepEquivalent;

function deepArrEquiv(a, b) {
    assert.ok(a instanceof Array);
    var len = a.length;

    if (!(b instanceof Array &&
          b.length === len))
        return false;

    for (var i = 0; i < len; ++i) {
        if (i in a !== i in b)
            return false;

        if (!deepEquivalent(a[i], b[i]))
            return false;
    }

    return true;
}

function deepObjEquiv(a, b) {
    assert.strictEqual(typeof a, "object");
    if (!a || !b || typeof b !== "object")
        return false;

    for (var key in getUnionOfKeys(a, b)) {
        if (key === "loc" ||
            key === "range" ||
            key === "comments" ||
            key === "raw")
            continue;

        if (!deepEquivalent(getFieldValue(a, key),
                            getFieldValue(b, key)))
        {
            return false;
        }
    }

    return true;
}

},{"./types":36,"assert":2}],38:[function(require,module,exports){
var Syntax = require("./types").Syntax,
    Class = require("./Class").Class,
    assert = require("assert"),
    slice = Array.prototype.slice,
    removeRequests = [];

function isAstNode(node) {
    return !!(node && (node.type in Syntax));
}

var Visitor = exports.Visitor = Class.extend({
    visit: function(node) {
        var self = this;

        if (!node) {
            // pass

        } else if (node instanceof Array) {
            node = self.visitArray(node);

        } else if (isAstNode(node)) {
            var methodName = "visit" + node.type,
                method = self[methodName] || self.genericVisit;
            node = method.call(this, node);

        } else if (typeof node === "object") {
            // Some AST node types contain ad-hoc (non-AST) objects that
            // may contain nested AST nodes.
            self.genericVisit(node);
        }

        return node;
    },

    visitArray: function(arr, noUpdate) {
        for (var elem, result, undef,
                 i = 0, len = arr.length;
             i < len;
             i += 1)
        {
            if (i in arr)
                elem = arr[i];
            else
                continue;

            var requesters = [];
            removeRequests.push(requesters);

            // Make sure we don't accidentally reuse a previous result
            // when this.visit throws an exception.
            result = undef;

            try {
                result = this.visit(elem);

            } finally {
                assert.strictEqual(
                    removeRequests.pop(),
                    requesters);
            }

            if (requesters.length > 0 || result === null) {
                // This hole will be elided by the compaction loop below.
                delete arr[i];
            } else if (result !== undef) {
                arr[i] = result;
            }
        }

        // Compact the array to eliminate holes.
        for (var dst = 0,
                 src = dst,
                 // The length of the array might have changed during the
                 // iteration performed above.
                 len = arr.length;
             src < len;
             src += 1)
            if (src in arr)
                arr[dst++] = arr[src];
        arr.length = dst;

        return arr;
    },

    remove: function() {
        var len = removeRequests.length,
            requesters = removeRequests[len - 1];
        if (requesters)
            requesters.push(this);
    },

    genericVisit: function(node) {
        var field,
            oldValue,
            newValue;

        for (field in node) {
            if (!node.hasOwnProperty(field))
                continue;

            oldValue = node[field];

            if (oldValue instanceof Array) {
                this.visitArray(oldValue);

            } else if (isAstNode(oldValue)) {
                newValue = this.visit(oldValue);

                if (typeof newValue === "undefined") {
                    // Keep oldValue.
                } else {
                    node[field] = newValue;
                }

            } else if (typeof oldValue === "object") {
                this.genericVisit(oldValue);
            }
        }

        return node;
    }
});

},{"./Class":29,"./types":36,"assert":2}],39:[function(require,module,exports){
var process=require("__browserify_process");var fs = require("fs");
var normalizeOptions = require("./lib/options").normalize;
var types = require("./lib/types");
var parse = require("./lib/parser").parse;
var Printer = require("./lib/printer").Printer;

function print(node, options) {
    return new Printer(options).print(node);
}

function prettyPrint(node, options) {
    return new Printer(options).printGenerically(node);
}

function run(transformer, options) {
    return runFile(process.argv[2], transformer, options);
}

function runFile(path, transformer, options) {
    fs.readFile(path, "utf-8", function(err, code) {
        if (err) {
            console.error(err);
            return;
        }

        runString(code, transformer, options);
    });
}

function defaultWriteback(output) {
    process.stdout.write(output);
}

function runString(code, transformer, options) {
    var writeback = options && options.writeback || defaultWriteback;
    transformer(parse(code, options), function(node) {
        writeback(print(node, options));
    });
}

Object.defineProperties(exports, {
    /**
     * Scriptable interface to recast.
     */
    run: {
        enumerable: true,
        value: run
    },

    runFile: {
        enumerable: true,
        value: runFile
    },

    runString: {
        enumerable: true,
        value: runString
    },

    /**
     * Useful utilities for implementing transformer functions.
     */
    Syntax: {
        enumerable: true,
        value: types.Syntax,
    },

    Visitor: {
        enumerable: true,
        value: require("./lib/visitor").Visitor
    },

    builder: { // Legacy singular form.
        enumerable: false,
        value: types.builders
    },

    builders: { // Plural preferred.
        enumerable: true,
        value: types.builders
    },

    namedTypes: {
        enumerable: true,
        value: types.namedTypes
    },

    /**
     * Direct access to the parsing and printing interfaces.
     */
    parse: {
        enumerable: true,
        value: parse
    },

    print: {
        enumerable: true,
        value: print
    },

    prettyPrint: {
        enumerable: true,
        value: prettyPrint
    }
});

},{"./lib/options":32,"./lib/parser":33,"./lib/printer":35,"./lib/types":36,"./lib/visitor":38,"__browserify_process":6,"fs":3}]},{},[13])
(13)
});
;