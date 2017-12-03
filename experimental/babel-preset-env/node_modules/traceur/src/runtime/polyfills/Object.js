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
  maybeAddFunctions,
  registerPolyfill
} from './utils.js';
import assign from './assign.js';
export {assign};

var {
  defineProperty,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
} = Object;

// Object.is

// Unlike === this returns true for (NaN, NaN) and false for (0, -0).
export function is(left, right) {
  if (left === right)
    return left !== 0 || 1 / left === 1 / right;
  return left !== left && right !== right;
}

// Object.mixin (19.1.3.15)
export function mixin(target, source) {
  var props = getOwnPropertyNames(source);
  var p, descriptor, length = props.length;
  for (p = 0; p < length; p++) {
    var name = props[p];
    descriptor = getOwnPropertyDescriptor(source, props[p]);
    defineProperty(target, props[p], descriptor);
  }
  return target;
}

export function polyfillObject(global) {
  var {Object} = global;
  maybeAddFunctions(Object, [
    'assign', assign,
    'is', is,
    'mixin', mixin,
  ]);
}

registerPolyfill(polyfillObject);
