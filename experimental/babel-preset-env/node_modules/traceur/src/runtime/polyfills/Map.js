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

import {createPrivateSymbol, getPrivate, setPrivate} from '../private.js';
import {deleteFrozen, getFrozen, setFrozen} from '../frozen-data.js';
import {isObject, registerPolyfill} from './utils.js'
import hasNativeSymbol from '../has-native-symbols.js';

const {
  defineProperty,
  getOwnPropertyDescriptor,
  hasOwnProperty,
  isExtensible
} = Object;

const deletedSentinel = {};

let counter = 1;
const hashCodeName = createPrivateSymbol();

function getHashCodeForObject(obj) {
  return getPrivate(obj, hashCodeName);
}

function getOrSetHashCodeForObject(obj) {
  let hash = getHashCodeForObject(obj);
  if (!hash) {
    hash = counter++;
    setPrivate(obj, hashCodeName, hash);
  }
  return hash;
}

function lookupIndex(map, key) {
  if (typeof key === 'string') {
    return map.stringIndex_[key];
  }
  if (isObject(key)) {
    if (!isExtensible(key)) {
      return getFrozen(map.frozenData_, key);
    }
    let hc = getHashCodeForObject(key);
    if (hc === undefined) {
      return undefined;
    }
    return map.objectIndex_[hc];
  }
  return map.primitiveIndex_[key];
}

function initMap(map) {
  map.entries_ = []; // every odd index is key, every even index is value
  map.objectIndex_ = Object.create(null); // avoid prototype's properties
  // Since a string can represent any string value we need a unique backing
  // store for strings vs other primitives.
  map.stringIndex_ = Object.create(null);
  // All toString() values of primitives are unique (symbols excluded).
  map.primitiveIndex_ = Object.create(null);
  map.frozenData_ = [];
  map.deletedCount_ = 0;
}

export class Map {
  constructor(iterable = undefined) {
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');

    if (hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }

    initMap(this);

    if (iterable !== null && iterable !== undefined) {
      for (var [key, value] of iterable) {
        this.set(key, value);
      }
    }
  }

  get size() {
    return this.entries_.length / 2 - this.deletedCount_;
  }

  get(key) {
    var index = lookupIndex(this, key);

    if (index !== undefined) {
      return this.entries_[index + 1];
    }
  }

  set(key, value) {
    let index = lookupIndex(this, key);

    if (index !== undefined) {
      this.entries_[index + 1] = value;
    } else {
      index = this.entries_.length;
      this.entries_[index] = key;
      this.entries_[index + 1] = value;

      if (isObject(key)) {
        if (!isExtensible(key)) {
          setFrozen(this.frozenData_, key, index);
        } else {
          let hash = getOrSetHashCodeForObject(key);
          this.objectIndex_[hash] = index;
        }
      } else if (typeof key === 'string') {
        this.stringIndex_[key] = index;
      } else {
        this.primitiveIndex_[key] = index;
      }
    }
    return this; // 23.1.3.9.11
  }

  has(key) {
    return lookupIndex(this, key) !== undefined;
  }

  delete(key) {
    let index = lookupIndex(this, key);
    if (index === undefined) {
      return false;
    }

    this.entries_[index] = deletedSentinel;
    // remove possible reference to value to avoid memory leaks
    this.entries_[index + 1] = undefined;
    this.deletedCount_++;

    if (isObject(key)) {
      if (!isExtensible(key)) {
        deleteFrozen(this.frozenData_, key);
      } else {
        let hash = getHashCodeForObject(key);
        delete this.objectIndex_[hash];
      }
    } else if (typeof key === 'string') {
      delete this.stringIndex_[key];
    } else {
      delete this.primitiveIndex_[key]
    }

    return true;
  }

  clear() {
    initMap(this);
  }

  forEach(callbackFn, thisArg = undefined) {
    for (var i = 0; i < this.entries_.length; i += 2) {
      var key = this.entries_[i];
      var value = this.entries_[i + 1];

      if (key === deletedSentinel)
        continue;

      callbackFn.call(thisArg, value, key, this);
    }
  }

  *entries() {
    for (var i = 0; i < this.entries_.length; i += 2) {
      var key = this.entries_[i];
      var value = this.entries_[i + 1];

      if (key === deletedSentinel)
        continue;

      yield [key, value];
    }
  }

  *keys() {
    for (var i = 0; i < this.entries_.length; i += 2) {
      var key = this.entries_[i];
      var value = this.entries_[i + 1];

      if (key === deletedSentinel)
        continue;

      yield key;
    }
  }

  *values() {
    for (var i = 0; i < this.entries_.length; i += 2) {
      var key = this.entries_[i];
      var value = this.entries_[i + 1];

      if (key === deletedSentinel)
        continue;

      yield value;
    }
  }
}

defineProperty(Map.prototype, Symbol.iterator, {
  configurable: true,
  writable: true,
  value: Map.prototype.entries
});

function needsPolyfill(global) {
  var {Map, Symbol} = global;
  if (!Map || !hasNativeSymbol() ||
      !Map.prototype[Symbol.iterator] || !Map.prototype.entries) {
    return true;
  }
  try {
    return new Map([[]]).size !== 1;
  } catch (e) {
    return false;
  }
}

export function polyfillMap(global) {
  if (needsPolyfill(global)) {
    global.Map = Map;
  }
}

registerPolyfill(polyfillMap);
