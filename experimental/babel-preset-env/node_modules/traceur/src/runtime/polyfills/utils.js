// Copyright 2013 Traceur Authors.
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

const $ceil = Math.ceil;
const $floor = Math.floor;
const $isFinite = isFinite;
const $isNaN = isNaN;
const $pow = Math.pow;
const $min = Math.min;
const $TypeError = TypeError;
const $Object = Object;

export function toObject(x) {
  if (x == null) {  // Needs to be ==
    throw $TypeError();
  }
  return $Object(x);
}

export function toUint32(x) {
  return x >>> 0;
}

export function isObject(x) {
  return x && (typeof x === 'object' || typeof x === 'function');
}

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
export function isCallable(x) {
  return typeof x === 'function';
}

export function isNumber(x) {
  return typeof x === 'number';
}

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
export function toInteger(x) {
  x = +x;
  if ($isNaN(x)) return 0;
  if (x === 0 || !$isFinite(x)) return x;
  return x > 0 ? $floor(x) : $ceil(x);
}

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
var MAX_SAFE_LENGTH = $pow(2, 53) - 1;

export function toLength(x) {
  var len = toInteger(x);
  return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
}

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-checkiterable
export function checkIterable(x) {
  return !isObject(x) ? undefined : x[Symbol.iterator];
}

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
export function isConstructor(x) {
  return isCallable(x);
}

// 15.19.4.3.4 CreateIterResultObject
export function createIteratorResultObject(value, done) {
  return {value: value, done: done};
}

export function maybeDefine(object, name, descr) {
  if (!(name in object)) {
    Object.defineProperty(object, name, descr);
  }
}

export function maybeDefineMethod(object, name, value) {
  maybeDefine(object, name, {
    value: value,
    configurable: true,
    enumerable: false,
    writable: true
  });
}

export function maybeDefineConst(object, name, value) {
  maybeDefine(object, name, {
    value: value,
    configurable: false,
    enumerable: false,
    writable: false
  });
}

export function maybeAddFunctions(object, functions) {
  for (var i = 0; i < functions.length; i += 2) {
    var name = functions[i];
    var value = functions[i + 1];
    maybeDefineMethod(object, name, value);
  }
}

export function maybeAddConsts(object, consts) {
  for (var i = 0; i < consts.length; i += 2) {
    var name = consts[i];
    var value = consts[i + 1];
    maybeDefineConst(object, name, value);
  }
}

export function maybeAddIterator(object, func, Symbol) {
  if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
    return;

  // Firefox does not have symbols so they use a hack.
  if (object['@@iterator'])
    func = object['@@iterator'];

  Object.defineProperty(object, Symbol.iterator, {
    value: func,
    configurable: true,
    enumerable: false,
    writable: true
  });
}

var polyfills = [];

export function registerPolyfill(func) {
  polyfills.push(func);
}

export function polyfillAll(global) {
  polyfills.forEach((f) => f(global));
}
