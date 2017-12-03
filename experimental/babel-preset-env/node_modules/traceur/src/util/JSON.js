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

/**
 * Works like JSON.stringify, except returns the transformed structure.
 * @param {*} v Value to transform.
 * @param {Function=} replacer
 */
export function transform(v, replacer = (k, v) => v) {
  return transform_(replacer('', v), replacer);
}

function transform_(v, replacer) {
  let rv, tv;
  if (Array.isArray(v)) {
    let len = v.length;
    rv = Array(len);
    for (let i = 0; i < len; i++) {
      tv = transform_(replacer(String(i), v[i]), replacer);
      rv[i] = tv === undefined ? null : tv;
    }
    return rv;
  }
  if (v instanceof Object) {
    rv = {};
    Object.keys(v).forEach((k) => {
      tv = transform_(replacer(k, v[k]), replacer);
      if (tv !== undefined) {
        rv[k] = tv;
      }
    });
    return rv;
  }
  return v;
}
