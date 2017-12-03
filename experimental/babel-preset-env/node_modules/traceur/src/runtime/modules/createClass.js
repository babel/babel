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


var $Object = Object;
var $TypeError = TypeError;

var {
  create,
  defineProperties,
  defineProperty,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
  getOwnPropertySymbols,
} = Object;

function forEachPropertyKey(object, f) {
  getOwnPropertyNames(object).forEach(f);
  if (getOwnPropertySymbols) {
    getOwnPropertySymbols(object).forEach(f);
  }
}

function getDescriptors(object) {
  var descriptors = {};
  forEachPropertyKey(object, (key) => {
    descriptors[key] = getOwnPropertyDescriptor(object, key);
    descriptors[key].enumerable = false;
  });
  return descriptors;
}

var nonEnum = {enumerable: false};

function makePropertiesNonEnumerable(object) {
  forEachPropertyKey(object, (key) => {
    defineProperty(object, key, nonEnum);
  });
}

export default function createClass(ctor, object, staticObject, superClass) {
  defineProperty(object, 'constructor', {
    value: ctor,
    configurable: true,
    enumerable: false,
    writable: true
  });

  if (arguments.length > 3) {
    if (typeof superClass === 'function')
      ctor.__proto__ = superClass;
    ctor.prototype = create(getProtoParent(superClass),
                            getDescriptors(object));
  } else {
    makePropertiesNonEnumerable(object)
    ctor.prototype = object;
  }
  defineProperty(ctor, 'prototype', {configurable: false, writable: false});
  return defineProperties(ctor, getDescriptors(staticObject));
}

function getProtoParent(superClass) {
  if (typeof superClass === 'function') {
    var prototype = superClass.prototype;
    if ($Object(prototype) === prototype || prototype === null)
      return superClass.prototype;
    throw new $TypeError('super prototype must be an Object or null');
  }
  if (superClass === null)
    return null;
  throw new $TypeError(
      `Super expression must either be null or a function, not ${
          typeof superClass}.`);
}
