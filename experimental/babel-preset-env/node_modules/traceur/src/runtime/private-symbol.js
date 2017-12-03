// Copyright 2015 Traceur Authors.
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

import newUniqueString from './new-unique-string.js';

const $Symbol = typeof Symbol === 'function' ? Symbol : undefined;
const $getOwnPropertySymbols = Object.getOwnPropertySymbols;
const $create = Object.create

// Uses Symbol or Symbol polyfill.
// We override getOwnPropertySymbols to filter out these private symbols.

const privateNames = $create(null);

export function isPrivateSymbol(s) {
  return privateNames[s];
};

// This creates a Symbol that we filter out in getOwnPropertySymbols.
export function createPrivateSymbol() {
  let s = ($Symbol || newUniqueString)();
  privateNames[s] = true;
  return s;
};

// Provide abstraction so that we can replace the symbol with a WeakMap in
// the future.
export function hasPrivate(obj, sym) {
  return hasOwnProperty.call(obj, sym);
};

export function deletePrivate(obj, sym) {
  if (!hasPrivate(obj, sym)) {
    return false;
  }
  delete obj[sym];
  return true;
};

export function setPrivate(obj, sym, val) {
  obj[sym] = val;
};

export function getPrivate(obj, sym) {
  let val = obj[sym];
  if (val === undefined) return undefined;
  return hasOwnProperty.call(obj, sym) ? val : undefined;
};

export function init() {
  if ($getOwnPropertySymbols) {
    Object.getOwnPropertySymbols = function getOwnPropertySymbols(object) {
      var rv = [];
      var symbols = $getOwnPropertySymbols(object);
      for (var i = 0; i < symbols.length; i++) {
        var symbol = symbols[i];
        if (!isPrivateSymbol(symbol)) {
          rv.push(symbol);
        }
      }
      return rv;
    };
  }
}
