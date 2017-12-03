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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  LiteralExpression,
  LiteralPropertyName
} from '../syntax/trees/ParseTrees.js';
import {LiteralToken} from '../syntax/LiteralToken.js';
import {
  NUMBER
} from '../syntax/TokenType.js';

function needsTransform(token) {
  return token.type === NUMBER && /^0[bBoO]/.test(token.value);
}

function transformToken(token) {
  return new LiteralToken(NUMBER,
                          String(token.processedValue),
                          token.location);
}

export class NumericLiteralTransformer extends ParseTreeTransformer {
  transformLiteralExpression(tree) {
    let token = tree.literalToken;
    if (needsTransform(token))
      return new LiteralExpression(tree.location, transformToken(token));
    return tree;
  }

  transformLiteralPropertyName(tree) {
    let token = tree.literalToken;
    if (needsTransform(token))
      return new LiteralPropertyName(tree.location, transformToken(token));
    return tree;
  }
}
