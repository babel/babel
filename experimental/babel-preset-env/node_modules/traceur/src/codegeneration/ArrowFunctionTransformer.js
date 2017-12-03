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

import {ARGUMENTS, CONSTRUCTOR, THIS} from '../syntax/PredefinedName.js';
import {AlphaRenamer} from './AlphaRenamer.js';
import {FunctionExpression} from '../syntax/trees/ParseTrees.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {ParenTrait} from './ParenTrait.js';
import alphaRenameThisAndArguments from './alphaRenameThisAndArguments.js';
import {FUNCTION_BODY, LITERAL_PROPERTY_NAME} from '../syntax/trees/ParseTreeType.js';
import {FindThisOrArguments} from './FindThisOrArguments.js';
import {
  createAssignmentExpression,
  createCommaExpression,
  createFunctionBody,
  createIdentifierExpression,
  createReturnStatement,
  createThisExpression,
} from './ParseTreeFactory.js';

/**
 * Converts a concise body to a function body.
 * @param {ParseTree} tree
 * @return {FunctionBody}
 */
function convertConciseBody(tree) {
  if (tree.type !== FUNCTION_BODY)
    return createFunctionBody([createReturnStatement(tree)]);
  return tree;
}

/**
 * Desugars arrow function expressions
 *
 * @see <a href="http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax">strawman:arrow_function_syntax</a>
 */
export class ArrowFunctionTransformer extends ParenTrait(TempVarTransformer) {
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.inDerivedClass_ = false;
    this.inConstructor_ = false;
  }

  /**
   * Transforms an arrow function expression into a function declaration.
   * The main things we need to deal with are the 'this' binding, and adding a
   * function body and return statement if needed.
   */
  transformArrowFunction(tree) {
    if (this.inDerivedClass_ && this.inConstructor_) {
      return this.transformUsingCommaExpression_(tree);
    }
    return this.transformUsingTempVar_(tree);
  }

  // Transforms the arrow function using a comma expression to avoid needing to
  // read this earlier in the function.
  //
  //   ($tmp = this, function() {})
  transformUsingCommaExpression_(tree) {
    let finder = new FindThisOrArguments();
    let argumentsTempName, thisTempName;
    finder.visitAny(tree);
    if (finder.foundArguments) {
      argumentsTempName = this.addTempVar();
      tree = AlphaRenamer.rename(tree, ARGUMENTS, argumentsTempName);
    }
    if (finder.foundThis) {
      thisTempName = this.addTempVar();
      tree = AlphaRenamer.rename(tree, THIS, thisTempName);
    }

    let parameterList = this.transformAny(tree.parameterList);

    let body = this.transformAny(tree.body);
    body = convertConciseBody(body);
    let functionExpression = new FunctionExpression(tree.location, null,
        tree.functionKind, parameterList, null, [], body);

    let expressions = [];
    if (argumentsTempName) {
      expressions.push(createAssignmentExpression(
          createIdentifierExpression(argumentsTempName),
          createIdentifierExpression(ARGUMENTS)));
    }
    if (thisTempName) {
      expressions.push(createAssignmentExpression(
          createIdentifierExpression(thisTempName),
          createThisExpression()));
    }

    if (expressions.length === 0) {
      return functionExpression;
    }

    expressions.push(functionExpression);
    return createCommaExpression(expressions);
  }

  // This transforms the arrow function into:
  //
  //   var $tmp = this;
  //   ...
  //   (function() {})
  //
  // with a temp variable added to the top of the current function.
  transformUsingTempVar_(tree) {
    // TODO(arv): alphaRenameThisAndArguments is used in other places. It is
    // possible that we run into the same issues with super() in derived
    // constructors in those cases (that we hoist this before the super call).
    // Come up with a better reusable way to do this.
    let alphaRenamed = alphaRenameThisAndArguments(this, tree);
    let parameterList = this.transformAny(alphaRenamed.parameterList);

    let body = this.transformAny(alphaRenamed.body);
    body = convertConciseBody(body);
    let functionExpression = new FunctionExpression(tree.location, null,
        tree.functionKind, parameterList, null, [], body);

    return functionExpression;
  }

  transformClassExpression(tree) {
    let inDerivedClass = this.inDerivedClass_;
    this.inDerivedClass_ = tree.superClass !== null;
    let result = super.transformClassExpression(tree);
    this.inDerivedClass_ = inDerivedClass;
    return result;

  }

  transformClassDeclaration(tree) {
    let inDerivedClass = this.inDerivedClass_;
    this.inDerivedClass_ = tree.superClass !== null;
    let result = super.transformClassDeclaration(tree);
    this.inDerivedClass_ = inDerivedClass;
    return result;
  }

  transformMethod(tree) {
    let inConstructor = this.inConstructor_;
    this.inConstructor_ = !tree.isStatic && tree.functionKind === null &&
        tree.name.type === LITERAL_PROPERTY_NAME &&
        tree.name.literalToken.value === CONSTRUCTOR;
    let result = super.transformMethod(tree);
    this.inConstructor_ = inConstructor;
    return result;

  }

  /**
   * Shallowly transforms |tree| into a FunctionExpression and adds the needed
   * temp variables to the |tempVarTransformer|.
   * @param {TempVarTransformer} tempVarTransformer
   * @param {ArrowFunction} tree
   * @return {FunctionExpression}
   */
  static transform(tempVarTransformer, tree) {
    tree = alphaRenameThisAndArguments(tempVarTransformer, tree);
    let body = convertConciseBody(tree.body);
    return new FunctionExpression(tree.location, null, tree.functionKind,
        tree.parameterList, null, [], body);
  }
}
