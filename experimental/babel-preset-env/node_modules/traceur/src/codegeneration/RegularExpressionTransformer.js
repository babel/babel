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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {LiteralExpression} from '../syntax/trees/ParseTrees.js';
import {LiteralToken} from '../syntax/LiteralToken.js';
import {REGULAR_EXPRESSION} from '../syntax/TokenType.js';
import {regexpuRewritePattern} from '../outputgeneration/regexpuRewritePattern.js';

export class RegularExpressionTransformer extends ParseTreeTransformer {
  transformLiteralExpression(tree) {
    let token = tree.literalToken;
    if (token.type === REGULAR_EXPRESSION) {
      let value = token.value;
      let lastIndex = value.lastIndexOf('/');
      let pattern = value.slice(1, lastIndex);
      let flags = value.slice(lastIndex + 1);
      if (flags.indexOf('u') !== -1) {
        let result = '/' + regexpuRewritePattern(pattern, flags) + '/' +
            flags.replace('u', '');
        return new LiteralExpression(
            tree.location,
            new LiteralToken(REGULAR_EXPRESSION,
                             result,
                             token.location));
      }
    }
    return tree;
  }
}
