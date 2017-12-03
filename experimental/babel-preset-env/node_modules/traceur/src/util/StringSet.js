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

function assertString(value) {
  if (typeof value !== 'string') throw new TypeError();
}

export class StringSet {
  constructor() {
    this.storage_ = Object.create(null);
  }
  add(value) {
    assertString(value);
    this.storage_[value] = true;
  }
  has(value) {
    assertString(value);
    return this.storage_[value] !== undefined;
  }
  delete(value) {
    assertString(value);
    delete this.storage_[value];
  }
  isEmpty() {
    for (let _ in this.storage_) {
      return false;
    }
    return true;
  }
  valuesAsArray() {
    return Object.keys(this.storage_);
  }
  forEach(func) {
    for (let value in this.storage_) {
      func(value);
    }
  }
}
