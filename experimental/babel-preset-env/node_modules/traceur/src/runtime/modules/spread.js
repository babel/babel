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

import checkObjectCoercible from '../checkObjectCoercible.js';

export default function spread() {
  var rv = [], j = 0, iterResult;

  for (var i = 0; i < arguments.length; i++) {
    var valueToSpread = checkObjectCoercible(arguments[i]);

    // TODO(arv): Use array specialization?
    // TODO(arv): Use Array.from?

    if (typeof valueToSpread[Symbol.iterator] !== 'function') {
      throw new TypeError('Cannot spread non-iterable object.');
    }

    var iter = valueToSpread[Symbol.iterator]();
    while (!(iterResult = iter.next()).done) {
      rv[j++] = iterResult.value;
    }
  }

  return rv;
}
