// Copyright 2014 Traceur Authors.
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

import {ExplodeExpressionTransformer} from './ExplodeExpressionTransformer.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {ParenTrait} from './ParenTrait.js';
import {
  STAR_STAR,
  STAR_STAR_EQUAL
} from '../syntax/TokenType.js';
import {parseExpression} from './PlaceholderParser.js';

export class ExponentiationTransformer extends ParenTrait(TempVarTransformer) {
  transformBinaryExpression(tree) {
    switch (tree.operator.type) {
      case STAR_STAR: {
        let left = this.transformAny(tree.left);
        let right = this.transformAny(tree.right);
        return parseExpression `Math.pow(${left}, ${right})`;
      }

      case STAR_STAR_EQUAL: {
        let exploded =
            new ExplodeExpressionTransformer(this).transformAny(tree);
        return this.transformAny(exploded);
      }
    }

    return super.transformBinaryExpression(tree);
  }
}
