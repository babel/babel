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

import alphaRenameThisAndArguments from './alphaRenameThisAndArguments.js';
import {
  createArgumentList,
  createBlock,
  createFunctionBody,
  createIdentifierExpression as id,
  createMemberExpression,
  createThisExpression,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement
} from './ParseTreeFactory.js';
import {parseStatement} from './PlaceholderParser.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  AwaitExpression,
  Block,
  CallExpression,
  Catch
} from '../syntax/trees/ParseTrees.js';
import SkipFunctionsTransformerTrait from './SkipFunctionsTransformerTrait.js';
import {ARGUMENTS} from '../syntax/PredefinedName.js';
import {VAR} from '../syntax/TokenType.js';

export class AsyncGeneratorTransformer extends
    SkipFunctionsTransformerTrait(ImportRuntimeTrait(TempVarTransformer)) {
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.variableDeclarations_ = [];
    this.ctx_ = id(this.getTempIdentifier());
  }

  transformYieldExpression(tree) {
    let argList = createArgumentList([tree.expression]);
    if (tree.isYieldFor) {
      return new AwaitExpression(tree.location,
          new CallExpression(null, createMemberExpression(this.ctx_, 'yieldFor'),
              argList));
    }
    return new CallExpression(tree.location,
        createMemberExpression(this.ctx_, 'yield'), argList);
  }

  transformCatch(tree) {
    let body = tree.catchBody;
    body = new Block(body.location, [parseStatement `
        if (${this.ctx_}.inReturn) {
          throw undefined;
        }`, ...body.statements]);
    return new Catch(tree.location, tree.binding, body);
  }

  /**
   * @param {FunctionBody} tree
   * @param {IdentifierExpression} name
   * @return {FunctionBody}
   */
  transformAsyncGeneratorBody_(tree, name) {
    tree = this.transformAny(tree);
    tree = alphaRenameThisAndArguments(this, tree);
    let statements = [];
    if (this.variableDeclarations_.length > 0) {
      statements.push(createVariableStatement(
          createVariableDeclarationList(VAR, this.variableDeclarations_)));
    }
    let body = createBlock(tree.statements);
    let createAsyncGeneratorInstance =
        this.getRuntimeExpression('createAsyncGeneratorInstance');
    statements.push(parseStatement `
        return ${createAsyncGeneratorInstance}(
            async function (${this.ctx_}) {
                ${body}
            }, ${name});`);
      return createFunctionBody(statements);
  }

  // alphaRenameThisAndArguments
  addTempVarForArguments() {
    let tmpVarName = this.getTempIdentifier();
    this.variableDeclarations_.push(createVariableDeclaration(
        tmpVarName, id(ARGUMENTS)));
    return tmpVarName;
  }

  // alphaRenameThisAndArguments
  addTempVarForThis() {
    let tmpVarName = this.getTempIdentifier();
    this.variableDeclarations_.push(createVariableDeclaration(
        tmpVarName, createThisExpression()));
    return tmpVarName;
  }

   /**
    * @param {UniqueIdentifierGenerator} identifierGenerator
    * @param {ErrorReporter} reporter
    * @param {Options} options
    * @param {Block} body
    * @param {IdentifierExpression} name
    * @return {Block}
    */
  static transformAsyncGeneratorBody(identifierGenerator, reporter, options,
                                     body, name) {
    return new AsyncGeneratorTransformer(identifierGenerator, reporter,
                                         options).
        transformAsyncGeneratorBody_(body, name);
  }
}
