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

import {StringSet} from './StringSet.js';

function assertString(value) {
  if (typeof value !== 'string') throw new TypeError();
}

export class StringMap {
  constructor() {
    this.storage_ = Object.create(null);
  }
  set(key, value) {
    assertString(key);
    this.storage_[key] = value;
  }
  get(key) {
    assertString(key);
    return this.storage_[key];
  }
  delete(key) {
    assertString(key);
    delete this.storage_[key];
  }
  has(key) {
    assertString(key);
    return this.storage_[key] !== undefined;
  }
  keysAsArray() {
    return Object.keys(this.storage_);
  }
  keysAsSet() {
    let set = new StringSet();
    this.forEach((key) => set.add(key));
    return set;
  }
  forEach(func) {
    for (let key in this.storage_) {
      func(key, this.storage_[key]);
    }
  }
}
