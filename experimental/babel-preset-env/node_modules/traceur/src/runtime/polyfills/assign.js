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

const {keys} = Object;

// Object.assign (19.1.3.1)
export default function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    var props = source == null ? [] : keys(source);
    var p, length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      target[name] = source[name];
    }
  }
  return target;
}
