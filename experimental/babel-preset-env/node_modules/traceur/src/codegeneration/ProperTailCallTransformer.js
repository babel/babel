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

import {TempVarTransformer} from './TempVarTransformer.js';
import {RewriteTailCallsTransformer} from './RewriteTailCallsTransformer.js';
import {
  createFunctionBody,
  createFunctionExpression,
  createIdentifierExpression as id
} from './ParseTreeFactory.js';
import {
  parseExpression,
  parseStatement,
  parseStatements
} from './PlaceholderParser.js';
import {
  AnonBlock,
  FunctionDeclaration,
  FunctionExpression,
} from '../syntax/trees/ParseTrees.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';

//
// Example:
//
// function f(a) {
//   var b = g(a);
//   f;
//   return h(b);
// }
//
// Becomes:
//
// $traceurRuntime.initTailRecursiveFunction(function f(a) {
//   return $traceurRuntime.call(function(a) {
//     var b = g(a);
//     f;
//     return $traceurRuntime.continuation(h, null, [b]);
//   }, this, arguments);
// })

export class ProperTailCallTransformer extends
    ImportRuntimeTrait(TempVarTransformer) {
  // TODO(mnieper): This transformer currently expects that classes and template
  // literals have already been desugared. Otherwise they are not guaranteed
  // to have proper tail calls.
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.inBlock_ = false;
    this.options = options;
  }

  transformFunctionDeclaration(tree) {
    tree = super.transformFunctionDeclaration(tree);
    if (tree.functionKind !== null) {
      // do not transform async/generator functions
      return tree;
    }

    let nameIdExpression = id(tree.name.identifierToken);

    const initTailRecursiveFunction =
        this.getRuntimeExpression('initTailRecursiveFunction');

    let setupFlagExpression = parseExpression
        `${initTailRecursiveFunction}(${nameIdExpression})`;

    let funcDecl = this.transformFunction_(tree, FunctionDeclaration);
    if (funcDecl === tree) {
      return tree;
    }

    // Function declarations in blocks do not hoist. In that case we add the
    // variable declaration after the function declaration.

    let tmpVar = id(this.inBlock_ ?
        this.getTempIdentifier() : this.addTempVar(setupFlagExpression));

    if (!this.inBlock_) {
      return funcDecl;
    }

    return new AnonBlock(null, [
      funcDecl,
      parseStatement `var ${tmpVar} = ${setupFlagExpression};`
    ]);
  }

  transformFunctionExpression(tree) {
    tree = super.transformFunctionExpression(tree);
    if (tree.functionKind) {
      // do not transform async/generator functions
      return tree;
    }

    let functionExpression =
        this.transformFunction_(tree, FunctionExpression);

    if (functionExpression === tree) {
      return tree;
    }

    const initTailRecursiveFunction =
        this.getRuntimeExpression('initTailRecursiveFunction');
    return parseExpression `${
        initTailRecursiveFunction}(${functionExpression})`;
  }

  transformFunction_(tree, constructor) {
    let body = RewriteTailCallsTransformer.transform(this, tree.body);
    if (body === tree.body) {
      return tree;
    }
    let func = id(this.getTempIdentifier());
    let innerFunction = createFunctionExpression(tree.parameterList, body);
    const call = this.getRuntimeExpression('call');
    let outerBody = createFunctionBody(parseStatements `
        return ${call}(${innerFunction}, this, arguments);`);
    return new constructor(tree.location, tree.name, tree.functionKind,
        tree.parameterList, tree.typeAnnotation, tree.annotations, outerBody);
  }

  transformBlock(tree) {
    let inBlock = this.inBlock_;
    this.inBlock_ = true;
    let rv = super.transformBlock(tree);
    this.inBlock_ = inBlock;
    return rv;
  }
}
