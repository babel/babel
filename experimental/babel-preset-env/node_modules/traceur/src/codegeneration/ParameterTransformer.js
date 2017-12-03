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

import {FunctionBody} from '../syntax/trees/ParseTrees.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {prependStatements} from './PrependStatements.js';

let stack = [];

/**
 * Base class for rest, default and destructuring parameters.
 */
export class ParameterTransformer extends TempVarTransformer {
  transformArrowFunction(tree) {
    // The stack is popped in transformFunctionBody.
    stack.push([]);
    return super.transformArrowFunction(tree);
  }

  transformFunctionDeclaration(tree) {
    // The stack is popped in transformFunctionBody.
    stack.push([]);
    return super.transformFunctionDeclaration(tree);
  }

  transformFunctionExpression(tree) {
    // The stack is popped in transformFunctionBody.
    stack.push([]);
    return super.transformFunctionExpression(tree);
  }

  transformGetAccessor(tree) {
    // The stack is popped in transformFunctionBody.
    stack.push([]);
    return super.transformGetAccessor(tree);
  }

  transformSetAccessor(tree) {
    // The stack is popped in transformFunctionBody.
    stack.push([]);
    return super.transformSetAccessor(tree);
  }

  transformMethod(tree) {
    // The stack is popped in transformFunctionBody.
    stack.push([]);
    return super.transformMethod(tree);
  }

  transformFunctionBody(tree) {
    let transformedTree = super.transformFunctionBody(tree);

    // The stack is pushed onto further up in the call chain
    // (transformFunctionDeclaration, transformFunctionExpression,
    // transformGetAccessor, transformSetAccessor,
    // transformMethod)
    let statements = stack.pop();
    if (!statements.length)
      return transformedTree;

    // Prepend the var statements to the block.
    statements = prependStatements(transformedTree.statements,
                                   ...statements);

    return new FunctionBody(transformedTree.location, statements);
  }

  get parameterStatements() {
    return stack[stack.length - 1];
  }

  transformConstructorType(tree) {
    return tree;
  }

  transformFunctionType(tree) {
    return tree;
  }
}
