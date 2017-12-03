// Copyright 2016 Traceur Authors.
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

import {SPREAD_EXPRESSION} from  '../syntax/trees/ParseTreeType.js';
import {createObjectLiteral, createArgumentList} from './ParseTreeFactory.js';
import {parseExpression} from './PlaceholderParser.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';

function hasSpread(trees) {
  return trees.some((tree) => tree && tree.type === SPREAD_EXPRESSION);
}

/**
 * Adds support for spread properties on object literals
 *
 * https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spec.md
 *
 * {a, ...b, c, ...d}
 * =>
 * $spreadProperties({a}, b, {c}, d)
 */
export class SpreadPropertiesTransformer extends
    ImportRuntimeTrait(ParseTreeTransformer) {
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.options = options;
  }

  transformObjectLiteral(tree) {
    if (!hasSpread(tree.propertyNameAndValues)) {
      return super.transformObjectLiteral(tree);
    }

    const properties = this.transformList(tree.propertyNameAndValues);
    return spreadProperties(properties, this);
  }
}

export function spreadProperties(properties, self) {
  // Accummulate consecutive properties into a single js property.
  let args = [];
  let accummulatedProps = null;
  for (let i = 0; i < properties.length; i++) {
    let property = properties[i];
    if (property.type === SPREAD_EXPRESSION) {
      if (accummulatedProps) {
        args.push(createObjectLiteral(accummulatedProps));
        accummulatedProps = null;
      }
      args.push(property.expression);
    } else {
      if (!accummulatedProps) {
        accummulatedProps = [];
      }
      accummulatedProps.push(property);
    }
  }
  if (accummulatedProps) {
    args.push(createObjectLiteral(accummulatedProps));
  }
  const runtime = self.getRuntimeExpression('spreadProperties');
  return parseExpression `${runtime}(${createArgumentList(args)})`;
}
