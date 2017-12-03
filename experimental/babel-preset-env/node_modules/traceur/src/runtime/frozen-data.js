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

function findIndex(arr, key) {
  for (let i = 0; i < arr.length; i += 2) {
    if (arr[i] === key) {
      return i;
    }
  }
  return -1;
}

export function setFrozen(arr, key, val) {
  let i = findIndex(arr, key);
  if (i === -1) {
    arr.push(key, val);
  }
}

export function getFrozen(arr, key) {
  let i = findIndex(arr, key);
  if (i !== -1) {
    return arr[i + 1];
  }
  return undefined;
}

export function hasFrozen(arr, key) {
  return findIndex(arr, key) !== -1;
}

export function deleteFrozen(arr, key) {
  let i = findIndex(arr, key);
  if (i !== -1) {
    arr.splice(i, 2);
    return true;
  }
  return false;
}
