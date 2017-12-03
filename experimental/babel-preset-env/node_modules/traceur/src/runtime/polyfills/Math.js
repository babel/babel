// Copyright 2014 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {fround as jsFround} from './fround.js';
import {
  maybeAddFunctions,
  registerPolyfill,
  toUint32
} from './utils.js';

var $isFinite = isFinite;
var $isNaN = isNaN;
var {
  abs,
  ceil,
  exp,
  floor,
  log,
  pow,
  sqrt,
} = Math;

export function clz32(x) {
  // From v8
  x = toUint32(+x);
  if (x == 0) return 32;
  var result = 0;
  // Binary search.
  if ((x & 0xFFFF0000) === 0) { x <<= 16; result += 16; };
  if ((x & 0xFF000000) === 0) { x <<=  8; result +=  8; };
  if ((x & 0xF0000000) === 0) { x <<=  4; result +=  4; };
  if ((x & 0xC0000000) === 0) { x <<=  2; result +=  2; };
  if ((x & 0x80000000) === 0) { x <<=  1; result +=  1; };
  return result;
}

export function imul(x, y) {
  // From MDN
  x = toUint32(+x);
  y = toUint32(+y);
  var xh  = (x >>> 16) & 0xffff;
  var xl = x & 0xffff;
  var yh  = (y >>> 16) & 0xffff;
  var yl = y & 0xffff;
  return xl * yl + (((xh * yl + xl * yh) << 16) >>> 0) | 0;
}

export function sign(x) {
  // From V8
  x = +x;
  if (x > 0) return 1;
  if (x < 0) return -1;
  // -0, 0 or NaN.
  return x;
}

export function log10(x) {
  // From V8
  return log(x) * 0.434294481903251828;  // log10(x) = log(x)/log(10).
}

export function log2(x) {
  // From V8
  return log(x) * 1.442695040888963407;  // log2(x) = log(x)/log(2).
}

export function log1p(x) {
  // From es6-shim
  x = +x;
  if (x < -1 || $isNaN(x)) { return NaN; }
  if (x === 0 || x === Infinity) { return x; }
  if (x === -1) { return -Infinity; }
  var result = 0;
  var n = 50;

  if (x < 0 || x > 1) { return log(1 + x); }
  for (var i = 1; i < n; i++) {
    if ((i % 2) === 0) {
      result -= pow(x, i) / i;
    } else {
      result += pow(x, i) / i;
    }
  }

  return result;
}

export function expm1(x) {
  // From es6-shim
  x = +x;
  if (x === -Infinity) { return -1; }
  if (!$isFinite(x) || x === 0) { return x; }
  return exp(x) - 1;
}

export function cosh(x) {
  // From es6-shim
  x = +x;
  if (x === 0) { return 1; } // +0 or -0
  if ($isNaN(x)) { return NaN; }
  if (!$isFinite(x)) { return Infinity; }
  if (x < 0) { x = -x; }
  if (x > 21) { return exp(x) / 2; }
  return (exp(x) + exp(-x)) / 2;
}

export function sinh(x) {
  // From es6-shim
  x = +x;
  if (!$isFinite(x) || x === 0) { return x; }
  return (exp(x) - exp(-x)) / 2;
}

export function tanh(x) {
  // From V8
  x = +x;
  // Idempotent for +/-0.
  if (x === 0) return x;
  // Returns +/-1 for +/-Infinity.
  if (!$isFinite(x)) return sign(x);
  var exp1 = exp(x);
  var exp2 = exp(-x);
  return (exp1 - exp2) / (exp1 + exp2);
}

export function acosh(x) {
  // From V8
  x = +x;
  if (x < 1) return NaN;
  // Idempotent for NaN and +Infinity.
  if (!$isFinite(x)) return x;
  return log(x + sqrt(x + 1) * sqrt(x - 1));
}

export function asinh(x) {
  // From V8
  x = +x;
  // Idempotent for NaN, +/-0 and +/-Infinity.
  if (x === 0 || !$isFinite(x)) return x;
  if (x > 0) return log(x + sqrt(x * x + 1));
  // This is to prevent numerical errors caused by large negative x.
  return -log(-x + sqrt(x * x + 1));
}

export function atanh(x) {
  // From es6-shim
  x = +x;
  if (x === -1) { return -Infinity; }
  if (x === 1) { return Infinity; }
  if (x === 0) { return x; }
  if ($isNaN(x) || x < -1 || x > 1) {
    return NaN;
  }
  return 0.5 * log((1 + x) / (1 - x));
}

export function hypot(x, y) {
  // From V8
  // We may want to introduce fast paths for two arguments and when
  // normalization to avoid overflow is not necessary.  For now, we
  // simply assume the general case.
  var length = arguments.length;
  var args = new Array(length);
  var max = 0;
  for (var i = 0; i < length; i++) {
    var n = arguments[i];
    n = +n;
    if (n === Infinity || n === -Infinity) return Infinity;
    n = abs(n);
    if (n > max) max = n;
    args[i] = n;
  }

  // Kahan summation to avoid rounding errors.
  // Normalize the numbers to the largest one to avoid overflow.
  if (max === 0) max = 1;
  var sum = 0;
  var compensation = 0;
  for (var i = 0; i < length; i++) {
    var n = args[i] / max;
    var summand = n * n - compensation;
    var preliminary = sum + summand;
    compensation = (preliminary - sum) - summand;
    sum = preliminary;
  }
  return sqrt(sum) * max;
}

export function trunc(x) {
  // From V8
  x = +x;
  if (x > 0) return floor(x);
  if (x < 0) return ceil(x);
  // -0, 0 or NaN.
  return x;
}

var fround, f32;

if (typeof Float32Array === 'function') {
  f32 = new Float32Array(1);
  fround = function(x) {
    f32[0] = Number(x);
    return f32[0];
  };
} else {
  fround = jsFround;
}

export {fround};

export function cbrt(x) {
  // From MDN
  x = +x;
  if (x === 0) return x;
  var negate = x < 0;
  if (negate) x = -x;
  var result = pow(x, 1 / 3);
  return negate ? -result : result;
}

export function polyfillMath(global) {
  var {Math} = global;
  maybeAddFunctions(Math, [
    'acosh', acosh,
    'asinh', asinh,
    'atanh', atanh,
    'cbrt', cbrt,
    'clz32', clz32,
    'cosh', cosh,
    'expm1', expm1,
    'fround', fround,
    'hypot', hypot,
    'imul', imul,
    'log10', log10,
    'log1p', log1p,
    'log2', log2,
    'sign', sign,
    'sinh', sinh,
    'tanh', tanh,
    'trunc', trunc,
  ]);
}

registerPolyfill(polyfillMath);
