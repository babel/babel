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

import {
  FOR_ON_STATEMENT,
  LABELLED_STATEMENT
} from '../syntax/trees/ParseTreeType.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {InnerForOnTransformer} from './InnerForOnTransformer.js';

/**
 * Transforms for-on loops into calls to async functions
 *
 * Example:
 *
 * for (let i on o) {
 *   if (continue) continue;
 *   if (break) break;
 *   if (return) return;
 * }
 *
 * Becomes:
 *
 * do {
 *   var $result = undefined;
 *   let i;
 *   await $traceurRuntime.observableForEach(o, async function ($value) {
.*     try {
 *       $observer = this;
 *       i = $value;
 *       if (continue) return;
 *       if (break) { $result = 0; $observer.return(); return; }
 *       if (return) { $result = {v: undefined}; $observer.return(); return; }
 *     } catch (e) {
.*       $observer.throw(e);
 *     }
 *   });
 *   switch ($result) {
 *   case 0:
 *     continue;
 *   case undefined:
 *     continue;
 *   default:
 *     return $result.v;
 *   }
 * } while (false)
 */

/**
 * Desugars for-on statement.
 */
export class ForOnTransformer extends ImportRuntimeTrait(TempVarTransformer) {
  /**
   * @param {ForOnStatement} original
   * @return {ParseTree}
   */
  transformForOnStatement(original) {
    return this.transformForOnStatement_(original, []);
  }

  transformForOnStatement_(original, labelSet) {
    return InnerForOnTransformer.transform(this,
        super.transformForOnStatement(original), labelSet);
  }

  // keep track of labels in the tree
  transformLabelledStatement(tree) {
    let labelSet = [tree];
    let statement;
    for (statement = tree.statement; statement.type === LABELLED_STATEMENT;
        statement = statement.statement) {
      labelSet.push(statement);
    }
    if (statement.type !== FOR_ON_STATEMENT) {
      return super.transformLabelledStatement(tree);
      // Slightly inefficient in the (unlikely) case of more than one label
    }
    return this.transformForOnStatement_(statement, labelSet);
  }
}
