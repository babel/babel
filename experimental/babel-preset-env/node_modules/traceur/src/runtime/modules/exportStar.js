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

const {defineProperty, getOwnPropertyNames} = Object;

export default function exportStar(object) {
  for (let i = 1; i < arguments.length; i++) {
    let mod = arguments[i];
    let names = getOwnPropertyNames(mod);
    for (let j = 0; j < names.length; j++) {
      let name = names[j];
      if (name === '__esModule' || name === 'default') {
        continue;
      }
      defineProperty(object, name, {
        get: () => mod[name],
        enumerable: true
      });
    }
  }
  return object;
}
