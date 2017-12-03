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

import {
  isNumber,
  maybeAddConsts,
  maybeAddFunctions,
  registerPolyfill,
  toInteger
} from './utils.js';

var $abs = Math.abs;
var $isFinite = isFinite;
var $isNaN = isNaN;

export var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
export var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
export var EPSILON = Math.pow(2, -52);

function NumberIsFinite(number) {
  return isNumber(number) && $isFinite(number);
}
export {NumberIsFinite as isFinite};

export function isInteger(number) {
  return NumberIsFinite(number) && toInteger(number) === number;
}

function NumberIsNaN(number) {
  return isNumber(number) && $isNaN(number);
}
export {NumberIsNaN as isNaN};

export function isSafeInteger(number) {
  if (NumberIsFinite(number)) {
    var integral = toInteger(number);
    if (integral === number)
      return $abs(integral) <= MAX_SAFE_INTEGER;
  }
  return false;
}

export function polyfillNumber(global) {
  var {Number} = global;
  maybeAddConsts(Number, [
    'MAX_SAFE_INTEGER', MAX_SAFE_INTEGER,
    'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER,
    'EPSILON', EPSILON,
  ]);
  maybeAddFunctions(Number, [
    'isFinite', NumberIsFinite,
    'isInteger', isInteger,
    'isNaN', NumberIsNaN,
    'isSafeInteger', isSafeInteger,
  ]);
}

registerPolyfill(polyfillNumber);
