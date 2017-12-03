// Copyright 2012 Traceur Authors.
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

import {ComprehensionTransformer} from './ComprehensionTransformer.js';
import {createIdentifierExpression} from './ParseTreeFactory.js';
import {parseStatement} from './PlaceholderParser.js';

/**
 * Array Comprehension Transformer:
 *
 * The desugaring is defined at
 * http://wiki.ecmascript.org/doku.php?id=harmony:array_comprehensions
 * as something like this:
 *
 * [ Expression0 for ( LHSExpression1 of Expression1 )
 *               ...
 *               for ( LHSExpressionn ) if ( Expression )opt ]
 *
 * =>
 *
 * (function () {
 *     var $result = [], $i = 0;
 *     for (let LHSExpression1 of Expression1 ) {
 *         ...
 *         for (let LHSExpressionn of Expressionn ) {
 *             if ( Expression )opt
 *                 $result[$i++] = Expression0;
 *             }
 *         }
 *     }
 *     return $result;
 * })()
 *
 * with alpha renaming of this and arguments of course.
 */
export class ArrayComprehensionTransformer extends ComprehensionTransformer {

  transformArrayComprehension(tree) {
    this.pushTempScope();

    let expression = this.transformAny(tree.expression);

    let index = createIdentifierExpression(this.getTempIdentifier());
    let result = createIdentifierExpression(this.getTempIdentifier());

    let tempVarsStatatement = parseStatement `var ${index} = 0, ${result} = [];`;
    let statement = parseStatement `${result}[${index}++] = ${expression};`;
    let returnStatement = parseStatement `return ${result};`;
    let functionKind = null;

    result = this.transformComprehension(tree, statement, functionKind,
                                         tempVarsStatatement,
                                         returnStatement);
    this.popTempScope();
    return result;
  }
}
