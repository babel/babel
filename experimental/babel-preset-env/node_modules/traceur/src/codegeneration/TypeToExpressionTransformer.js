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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  ArgumentList,
  IdentifierExpression,
  MemberExpression
} from '../syntax/trees/ParseTrees.js';
import {
  parseExpression
} from './PlaceholderParser.js';

export class TypeToExpressionTransformer extends ParseTreeTransformer {

  transformTypeName(tree) {
    if (tree.moduleName) {
      let operand = this.transformAny(tree.moduleName);
      return new MemberExpression(tree.location, operand, tree.name);
    }
    return new IdentifierExpression(tree.location, tree.name);
  }

  transformPredefinedType(tree) {
    return parseExpression `$traceurRuntime.type.${tree.typeToken})`;
  }

  transformTypeReference(tree) {
    let typeName = this.transformAny(tree.typeName);
    let args = this.transformAny(tree.args);
    let argumentList = new ArgumentList(tree.location, [typeName, ...args]);
    return parseExpression `$traceurRuntime.genericType(${argumentList})`;
  }

  transformTypeArguments(tree) {
    return this.transformList(tree.args);
  }

}
