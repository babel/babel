// Copyright 2012 Traceur Authors.
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

import {ScopeChainBuilderWithReferences} from './ScopeChainBuilderWithReferences.js';

class FreeVariableChecker extends ScopeChainBuilderWithReferences {
  constructor(reporter, global) {
    super(reporter);
    this.global_ = global;
  }

  /**
   * Override to report an error instead of adding the reference to the scope.
   */
  referenceFound(tree, name) {
    if (this.scope.getBinding(tree)) return;
    if (!(name in this.global_)) {
      this.reporter.reportError(tree.location, `${name} is not defined`);
    }
  }

}

/**
 * Validates that there are no free variables in a tree.
 */
export function validate(tree, reporter, global = Reflect.global) {
  let checker = new FreeVariableChecker(reporter, global);
  checker.visitAny(tree);
}
