// Copyright 2016 Traceur Authors.
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

const {
  defineProperty,
  getOwnPropertyNames,
  getOwnPropertySymbols,
  propertyIsEnumerable,
} = Object;

function createDataProperty(o, p, v) {
  defineProperty(o, p, {
    configurable: true,
    enumerable: true,
    value: v,
    writable: true,
  });
}

function copyDataProperties(target, source) {
  if (source == null) {  // needs to be ==
    return;
  }

  // The spec has a ToObject here but getOwnProperty* does the ToObjext so we
  // do not need to call it here.

  const copy = keys => {
    for (let i = 0; i < keys.length; i++) {
      const nextKey = keys[i];
      if (propertyIsEnumerable.call(source, nextKey)) {
        const propValue = source[nextKey];
        createDataProperty(target, nextKey, propValue);
      }
    }
  };

  copy(getOwnPropertyNames(source));
  copy(getOwnPropertySymbols(source));
}

export default function() {
  const target = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    copyDataProperties(target, arguments[i]);
  }
  return target;
}
