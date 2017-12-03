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

import {ARGUMENTS} from '../syntax/PredefinedName.js';
import FindArguments from './FindArguments.js';
import {
  FunctionBody,
  FunctionDeclaration,
  FunctionExpression,
  Method,
  YieldExpression
} from '../syntax/trees/ParseTrees.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {ParenTrait} from './ParenTrait.js';
import {parseStatement} from './PlaceholderParser.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  createIdentifierExpression,
  createNullLiteral,
} from './ParseTreeFactory.js';

export class AsyncToGeneratorTransformer extends
    ImportRuntimeTrait(ParenTrait(TempVarTransformer)) {
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.inAsyncFunction_ = false;
  }

  transformFunctionDeclaration(tree) {
    if (tree.isAsyncFunction()) {
      return this.transformFunctionShared_(tree, FunctionDeclaration);
    }
    return super.transformFunctionDeclaration(tree);
  }

  transformFunctionExpression(tree) {
    if (tree.isAsyncFunction()) {
      return this.transformFunctionShared_(tree, FunctionExpression);
    }
    return super.transformFunctionExpression(tree);
  }

  transformFunctionShared_(tree, ctor) {
    const parameterList = this.transformAny(tree.parameterList);
    const typeAnnotation = this.transformAny(tree.typeAnnotation);
    const annotations = this.transformList(tree.annotations);
    const body = this.transformAsyncBody_(tree.body);
    return new ctor(tree.location, tree.name, null,
        parameterList, typeAnnotation, annotations, body);
  }

  transformAsyncBody_(body) {
    const inAsyncFunction = this.inAsyncFunction_;
    this.inAsyncFunction_ = true;
    body = this.transformFunctionBody(body);
    const spawn = this.getRuntimeExpression('spawn');
    body = wrapBodyInSpawn(body, spawn);
    this.inAsyncFunction_ = inAsyncFunction;
    return body;
  }

  transformMethod(tree) {
    if (tree.isAsyncFunction()) {
      const name = this.transformAny(tree.name);
      const parameterList = this.transformAny(tree.parameterList);
      const typeAnnotation = this.transformAny(tree.typeAnnotation);
      const annotations = this.transformList(tree.annotations);
      const body = this.transformAsyncBody_(tree.body);
      return new Method(tree.location, tree.isStatic, null, name,
                        parameterList, typeAnnotation, annotations, body,
                        tree.debugName);
    }
    return super.transformMethod(tree);
  }

  transformAwaitExpression(tree) {
    if (this.inAsyncFunction_) {
      const expression = this.transformAny(tree.expression);
      return new YieldExpression(tree.location, expression, false);
    }
    return super.transformAwaitExpression(tree);
  }
}

function wrapBodyInSpawn(body, spawn) {
  const visitor = new FindArguments();
  visitor.visitAny(body);
  const argExpr = visitor.found ?
      createIdentifierExpression(ARGUMENTS) :
      createNullLiteral();
  const statement = parseStatement
      `return ${spawn}(this, ${argExpr}, function*() { ${body} });`
  return new FunctionBody(body.location, [statement])
}
