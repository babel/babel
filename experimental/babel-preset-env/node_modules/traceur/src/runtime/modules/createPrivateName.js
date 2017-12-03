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

const {create} = Object;
const {floor, random} = Math;

// Private names are a bit simpler than Symbol since it is not supposed to be
// exposed to user code.
const privateNames = create(null);

let counter = 0;

/**
 * Generates a new unique string.
 * @return {string}
 */
function newUniqueString() {
  return '__$' + floor(random() * 1e9) + '$' + ++counter + '$__';
}

export function createPrivateName() {
  let s = newUniqueString();
  privateNames[s] = true;
  return s;
}

function isPrivateName(s) {
  return privateNames[s];
}
