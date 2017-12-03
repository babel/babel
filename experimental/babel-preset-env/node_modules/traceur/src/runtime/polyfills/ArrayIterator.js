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

// This is based on the V8 implementation.

import {
  toObject,
  toUint32,
  createIteratorResultObject
} from './utils.js';

var ARRAY_ITERATOR_KIND_KEYS = 1;
var ARRAY_ITERATOR_KIND_VALUES = 2;
var ARRAY_ITERATOR_KIND_ENTRIES = 3;
// The spec draft also has "sparse" but it is never used.

class ArrayIterator {

  // 15.4.5.2.2 ArrayIterator.prototype.next( )
  next() {
    var iterator = toObject(this);
    var array = iterator.iteratorObject_;
    if (!array) {
      throw new TypeError('Object is not an ArrayIterator');
    }

    var index = iterator.arrayIteratorNextIndex_;
    var itemKind = iterator.arrayIterationKind_;
    var length = toUint32(array.length);

    // "sparse" is never used.

    if (index >= length) {
      iterator.arrayIteratorNextIndex_ = Infinity;
      return createIteratorResultObject(undefined, true);
    }

    iterator.arrayIteratorNextIndex_ = index + 1;

    if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
      return createIteratorResultObject(array[index], false);

    if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
      return createIteratorResultObject([index, array[index]], false);

    return createIteratorResultObject(index, false);
  }

  [Symbol.iterator]() {
    return this;
  }
}

// 15.4.5.1 CreateArrayIterator Abstract Operation
function createArrayIterator(array, kind) {
  var object = toObject(array);
  var iterator = new ArrayIterator;
  iterator.iteratorObject_ = object;
  iterator.arrayIteratorNextIndex_ = 0;
  iterator.arrayIterationKind_ = kind;
  return iterator;
}

export function entries() {
  return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
}

export function keys() {
  return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
}

export function values() {
  return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
}
