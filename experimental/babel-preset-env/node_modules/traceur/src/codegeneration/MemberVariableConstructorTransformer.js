// Copyright 2015 Traceur Authors.
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

import {Method} from '../syntax/trees/ParseTrees.js';
import {SUPER_EXPRESSION} from '../syntax/trees/ParseTreeType.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  createCommaExpression,
  createExpressionStatement,
  createFunctionBody,
  createParenExpression,
  createThisExpression,
} from './ParseTreeFactory.js';
import {prependStatements} from './PrependStatements.js';

/**
 * Transforms class constructors when classes have initialized instance
 * member variables.
 *
 * When there is a super class, transforms `super()` to
 * `(super(), initExpression, this)`
 *
 * Otherwise (no super class), prepend the initExpression to the constructor
 * body.
 */
export function transformConstructor(constructor, initExpression, superClass) {
  if (superClass) {
    let transformer = new SuperCallTransformer(initExpression);
    return transformer.transformAny(constructor);
  }

  let statements = constructor.body.statements;
  let initStatement = createExpressionStatement(initExpression);
  statements = prependStatements(statements, initStatement);

  return new Method(constructor.location, false,
      constructor.functionKind, constructor.name, constructor.parameterList,
      constructor.typeAnnotation, constructor.annotations,
      createFunctionBody(statements), constructor.debugName);
}

class SuperCallTransformer extends ParseTreeTransformer {
  constructor(expression) {
    super();
    this.expression = expression;
  }

  transformCallExpression(tree) {
    if (tree.operand.type === SUPER_EXPRESSION) {
      var thisExpression = createThisExpression();
      return createParenExpression(
          createCommaExpression([tree, this.expression, thisExpression]));
    }

    return super.transformCallExpression(tree);
  }

  transformClassDeclaration(tree) {
    // Do not transform `super()`  in nested classes
    return tree;
  }

  transformClassExpression(tree) {
    // Do not transform `super()`  in nested classes
    return tree;
  }
}
