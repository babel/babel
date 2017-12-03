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

import * as sym from './private-symbol.js';
import * as weak from './private-weak-map.js';

const hasWeakMap = typeof WeakMap === 'function';
const m = hasWeakMap ? weak : sym;

export const isPrivateSymbol = m.isPrivateSymbol;
export const createPrivateSymbol = m.createPrivateSymbol;
export const hasPrivate = m.hasPrivate;
export const deletePrivate = m.deletePrivate;
export const setPrivate = m.setPrivate;
export const getPrivate = m.getPrivate;

m.init();
