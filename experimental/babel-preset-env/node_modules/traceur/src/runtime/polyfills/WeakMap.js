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

import {
  createPrivateSymbol,
  deletePrivate,
  getPrivate,
  hasPrivate,
  setPrivate
} from '../private.js';
import {
  deleteFrozen,
  getFrozen,
  hasFrozen,
  setFrozen,
} from '../frozen-data.js';
import {
  isObject,
  registerPolyfill
} from './utils.js'
import hasNativeSymbol from '../has-native-symbols.js';

const {defineProperty, getOwnPropertyDescriptor, isExtensible} = Object;
const $TypeError = TypeError;
const {hasOwnProperty} = Object.prototype;

const sentinel = {};

export class WeakMap {
  constructor() {
    this.name_ = createPrivateSymbol();
    this.frozenData_ = [];
  }

  set(key, value) {
    if (!isObject(key)) throw new $TypeError('key must be an object');
    if (!isExtensible(key)) {
      setFrozen(this.frozenData_, key, value);
    } else {
      setPrivate(key, this.name_, value);
    }
    return this;
  }

  get(key) {
    if (!isObject(key)) return undefined;
    if (!isExtensible(key)) {
      return getFrozen(this.frozenData_, key);
    }
    return getPrivate(key, this.name_);
  }

  delete(key) {
    if (!isObject(key)) return false;
    if (!isExtensible(key)) {
      return deleteFrozen(this.frozenData_, key);
    }
    return deletePrivate(key, this.name_);
  }

  has(key) {
    if (!isObject(key)) return false;
    if (!isExtensible(key)) {
      return hasFrozen(this.frozenData_, key);
    }
    return hasPrivate(key, this.name_);
  }
}

function needsPolyfill(global) {
  let {WeakMap, Symbol} = global;
  if (!WeakMap || !hasNativeSymbol()) {
    return true;
  }
  try {
    let o = {};
    let wm = new WeakMap([[o, false]]);
    return wm.get(o);
  } catch (e) {
    return false;
  }
}

export function polyfillWeakMap(global) {
  if (needsPolyfill(global)) {
    global.WeakMap = WeakMap;
  }
}

registerPolyfill(polyfillWeakMap);
