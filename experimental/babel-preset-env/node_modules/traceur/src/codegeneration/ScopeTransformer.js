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

import {
  ARGUMENTS,
  THIS
} from '../syntax/PredefinedName.js';
import {FindInFunctionScope} from './FindInFunctionScope.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  FunctionDeclaration,
  FunctionExpression,
  GetAccessor,
  Method,
  SetAccessor,
} from '../syntax/trees/ParseTrees.js';
import {StringSet} from '../util/StringSet.js';
import {VARIABLE_DECLARATION_LIST} from '../syntax/trees/ParseTreeType.js'
import {VAR} from '../syntax/TokenType.js'
import {
  variablesInBlock,
  variablesInFunction
} from '../semantics/VariableBinder.js';

class FindNames extends FindInFunctionScope {
  constructor(names) {
    super();
    this.names = names;
  }
  visitBindingIdentifier(tree) {
    this.names.add(tree.getStringValue());
  }
}

/**
 * Gets the variable names in a declaration list. This is used to get the names
 * from for loops (for, for-in and for-of)
 * @param {VariableDeclarationList} tree
 * @return {StringSet} An object as a map where the keys are the variable names.
 */
function getLexicalBindingNames(tree) {
  let names = new StringSet();
  if (tree !== null && tree.type === VARIABLE_DECLARATION_LIST &&
      tree.declarationType !== VAR) {
    let visitor = new FindNames(names);
    for (let i = 0; i < tree.declarations.length; i++) {
      visitor.visitAny(tree.declarations[i].lvalue);
    }
  }
  return names;
}

/**
 * A BaseClass for creating scope visitor-based operations
 * Used as the base for AlphaRenamer
 * This only works if the variable's scope isn't dynamically limited
 * using the {@code with} statement, nor its name observed with
 * {@code eval} or in a property binding, and so on.
 */
export class ScopeTransformer extends ParseTreeTransformer {
  /**
   * @param {string} varName
   */
  constructor(varName) {
    super();
    this.varName_ = varName;
  }

  /**
   * @param {Block} tree
   * @return {ParseTree}
   */
  transformBlock(tree) {
    if (variablesInBlock(tree).has(this.varName_)) {
      // the var name is bound in the block, skip rename
      return tree;
    }
    return super.transformBlock(tree);
  }

  sameTreeIfNameInLoopInitializer_(tree) {
    let names = getLexicalBindingNames(tree.initializer);
    if (names.has(this.varName_)) {
      return tree;
    }
    return null;
  }

  /**
   * @param {ForStatement} tree
   * @return {ParseTree}
   */
  transformForStatement(tree) {
    return this.sameTreeIfNameInLoopInitializer_(tree) ||
        super.transformForStatement(tree);
  }

  /**
   * @param {ForInStatement} tree
   * @return {ParseTree}
   */
  transformForInStatement(tree) {
    return this.sameTreeIfNameInLoopInitializer_(tree) ||
        super.transformForInStatement(tree);
  }

  /**
   * @param {ForOfStatement} tree
   * @return {ParseTree}
   */
  transformForOfStatement(tree) {
    return this.sameTreeIfNameInLoopInitializer_(tree) ||
        super.transformForOfStatement(tree);
  }

  /**
   * @param {ForOnStatement} tree
   * @return {ParseTree}
   */
  transformForOnStatement(tree) {
    return this.sameTreeIfNameInLoopInitializer_(tree) ||
        super.transformForOnStatement(tree);
  }

  transformThisExpression(tree) {
    if (this.varName_ !== THIS)
      return tree;
    return super.transformThisExpression(tree);
  }

  transformParameterListAndBody_(tree) {
    if (this.getDoNotRecurse(tree)) return tree;
    return {
      parameterList: this.transformAny(tree.parameterList),
      body: this.transformAny(tree.body)
    };
  }

  /**
   * @param {FunctionDeclaration} tree
   * @return {ParseTree}
   */
  transformFunctionDeclaration(tree) {
    let name = this.transformAny(tree.name);
    let typeAnnotation = this.transformAny(tree.typeAnnotation);
    let annotations = this.transformList(tree.annotations);
    let {parameterList, body} = this.transformParameterListAndBody_(tree);
    if (name === tree.name && parameterList === tree.parameterList &&
        typeAnnotation === tree.typeAnnotation &&
        annotations === tree.annotations && body === tree.body) {
      return tree;
    }

    return new FunctionDeclaration(tree.location, name, tree.functionKind,
                                   parameterList, typeAnnotation, annotations,
                                   body);
  }

  /**
   * @param {FunctionExpression} tree
   * @return {ParseTree}
   */
  transformFunctionExpression(tree) {
    let name = this.transformAny(tree.name);
    let typeAnnotation = this.transformAny(tree.typeAnnotation);
    let annotations = this.transformList(tree.annotations);
    let {parameterList, body} = this.transformParameterListAndBody_(tree);
    if (name === tree.name && parameterList === tree.parameterList &&
        typeAnnotation === tree.typeAnnotation &&
        annotations === tree.annotations && body === tree.body) {
      return tree;
    }

    return new FunctionExpression(tree.location, name, tree.functionKind,
                                  parameterList, typeAnnotation, annotations,
                                  body);
  }

  /**
   * @param {Method} tree
   * @return {ParseTree}
   */
  transformMethod(tree) {
    let name = this.transformAny(tree.name);
    let typeAnnotation = this.transformAny(tree.typeAnnotation);
    let annotations = this.transformList(tree.annotations);
    let {parameterList, body} = this.transformParameterListAndBody_(tree);
    if (name === tree.name && typeAnnotation === tree.typeAnnotation &&
        annotations === tree.annotations &&
        parameterList === tree.parameterList && body === tree.body) {
      return tree;
    }
    return new Method(tree.location, tree.isStatic,
                                        tree.functionKind, name,
                                        parameterList, typeAnnotation,
                                        annotations, body, tree.debugName);
  }

  /**
   * @param {GetAccessor} tree
   * @return {ParseTree}
   */
  transformGetAccessor(tree) {
    let name = this.transformAny(tree.name);
    let typeAnnotation = this.transformAny(tree.typeAnnotation);
    let annotations = this.transformList(tree.annotations);
    let body = this.getDoNotRecurse(tree) ? tree.body :
        this.transformAny(tree.body);
    if (name === tree.name && typeAnnotation === tree.typeAnnotation &&
        annotations === tree.annotations && body === tree.body) {
      return tree;
    }
    return new GetAccessor(tree.location, tree.isStatic, name, typeAnnotation,
                           annotations, body);
  }

  /**
   * @param {SetAccessor} tree
   * @return {ParseTree}
   */
  transformSetAccessor(tree) {
    let name = this.transformAny(tree.name);
    let annotations = this.transformList(tree.annotations);
    let {parameterList, body} = this.transformParameterListAndBody_(tree);
    if (name === tree.name && annotations === tree.annotations &&
        parameterList === tree.parameterList && body === tree.body) {
      return tree;
    }
    return new SetAccessor(tree.location, tree.isStatic, name, parameterList,
                           annotations, body);
  }

  // Do not recurse into functions if:
  //  - 'arguments' is implicitly bound in function bodies
  //  - 'this' is implicitly bound in function bodies
  //  - this.varName_ is rebound in the new nested scope
  getDoNotRecurse(tree) {
    return this.varName_ === ARGUMENTS ||
        this.varName_ === THIS ||
        variablesInFunction(tree).has(this.varName_);
  }

  /**
   * @param {Catch} tree
   * @return {ParseTree}
   */
  transformCatch(tree) {
    if (!tree.binding.isPattern() &&
        this.varName_ === tree.binding.identifierToken.value) {
      // this.varName_ is rebound in the catch block, so don't recurse
      return tree;
    }

    // TODO(arv): Compare the var name to the bindings in the pattern.
    return super.transformCatch(tree);
  }
}
