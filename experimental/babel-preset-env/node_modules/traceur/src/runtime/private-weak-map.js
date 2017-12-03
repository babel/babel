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

const $WeakMap = typeof WeakMap === 'function' ? WeakMap : undefined;

export function isPrivateSymbol(s) {
  return false;
}

export function createPrivateSymbol() {
  return new $WeakMap();
}

export function hasPrivate(obj, sym) {
  return sym.has(obj);
}

export function deletePrivate(obj, sym) {
  return sym.delete(obj);
}

export function setPrivate(obj, sym, val) {
  sym.set(obj, val);
}

export function getPrivate(obj, sym) {
  return sym.get(obj);
}

export function init() {}
