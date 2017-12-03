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

import {Scope} from './Scope.js';
import {StringSet} from '../util/StringSet.js';

export class ScopeReferences extends Scope {
  /**
   * @param {Scope} parent The parent scope, or null if top level scope.
   * @param {ParseTree} tree
   */
  constructor(parent, tree) {
    super(parent, tree);
    this.freeVars_ = new StringSet();
  }

  addReference(name) {
    this.freeVars_.add(name);
  }

  hasFreeVariable(name) {
    return this.freeVars_.has(name);
  }
}
