// Copyright 2013 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  FunctionBody,
  Script
} from '../syntax/trees/ParseTrees.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {createUseStrictDirective} from './ParseTreeFactory.js';
import {hasUseStrict} from '../semantics/util.js';

function prepend(statements) {
  return [
    createUseStrictDirective(),
    ...statements
  ]
}

/**
 * This makes the code strict. It will add 'use strict' to Script and
 * FunctionBody as needed.
 */
export class MakeStrictTransformer extends ParseTreeTransformer {
  transformScript(tree) {
    if (hasUseStrict(tree.scriptItemList))
      return tree;

    return new Script(tree.location, prepend(tree.scriptItemList),
                      tree.moduleName);
  }
  transformFunctionBody(tree) {
    if (hasUseStrict(tree.statements))
      return tree;
    return new FunctionBody(tree.location, prepend(tree.statements));
  }

  static transformTree(tree) {
    return new MakeStrictTransformer().transformAny(tree);
  }
}
