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

import {ArrowFunctionTransformer} from './ArrowFunctionTransformer.js';
import {AsyncTransformer} from './generator/AsyncTransformer.js';
import {ForInTransformPass} from './generator/ForInTransformPass.js';
import {GeneratorTransformer} from './generator/GeneratorTransformer.js';
import {
  parseExpression,
  parseStatement
} from './PlaceholderParser.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {FindInFunctionScope} from './FindInFunctionScope.js';
import {
  AnonBlock,
  FunctionDeclaration,
  FunctionExpression
} from '../syntax/trees/ParseTrees.js';
import {
  createBindingIdentifier,
  createIdentifierExpression as id,
  createIdentifierToken
} from './ParseTreeFactory.js';

class ForInFinder extends FindInFunctionScope {
  visitForInStatement(tree) {
    this.found = true;
  }
}

function needsTransform(tree, transformOptions) {
  return transformOptions.generators && tree.isGenerator() ||
      transformOptions.asyncFunctions && tree.isAsyncFunction();
}

/**
 * This pass just finds function bodies with yields in them and passes them
 * off to the GeneratorTransformer for the heavy lifting.
 */
export class GeneratorTransformPass extends
    ImportRuntimeTrait(TempVarTransformer) {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   */
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.tranformOptions_ = options.transformOptions;
    this.inBlock_ = false;
  }

  /**
   * @param {FunctionDeclaration} tree
   * @return {ParseTree}
   */
  transformFunctionDeclaration(tree) {
    if (!needsTransform(tree, this.tranformOptions_))
      return super.transformFunctionDeclaration(tree);

    if (tree.isGenerator())
      return this.transformGeneratorDeclaration_(tree);

    return this.transformFunction_(tree, FunctionDeclaration, null);
  }

  transformGeneratorDeclaration_(tree) {
    let nameIdExpression = id(tree.name.identifierToken);
    let initGeneratorFunction = this.getRuntimeExpression('initGeneratorFunction');
    let setupPrototypeExpression = parseExpression
        `${initGeneratorFunction}(${nameIdExpression})`;

    // Function declarations in blocks do not hoist. In that case we add the
    // variable declaration after the function declaration.

    let tmpVar = id(this.inBlock_ ?
        this.getTempIdentifier() : this.addTempVar(setupPrototypeExpression));
    let funcDecl = this.transformFunction_(tree, FunctionDeclaration, tmpVar);

    if (!this.inBlock_)
      return funcDecl;

    return new AnonBlock(null, [
      funcDecl,
      parseStatement `var ${tmpVar} = ${setupPrototypeExpression}`
    ]);
  }

  /**
   * @param {FunctionExpression} tree
   * @return {ParseTree}
   */
  transformFunctionExpression(tree) {
    if (!needsTransform(tree, this.tranformOptions_))
      return super.transformFunctionExpression(tree);

    if (tree.isGenerator())
      return this.transformGeneratorExpression_(tree);

    return this.transformFunction_(tree, FunctionExpression, null);
  }

  transformGeneratorExpression_(tree) {
    let name;
    if (!tree.name) {
      // We need a name to be able to reference the function object.
      name = createIdentifierToken(this.getTempIdentifier());
      tree = new FunctionExpression(tree.location,
          createBindingIdentifier(name), tree.functionKind,
          tree.parameterList, tree.typeAnnotation, tree.annotations,
          tree.body);
    } else {
      name = tree.name.identifierToken;
    }

    let functionExpression =
        this.transformFunction_(tree, FunctionExpression, id(name));
    let initGeneratorFunction =
        this.getRuntimeExpression('initGeneratorFunction');
    return parseExpression `${initGeneratorFunction}(${functionExpression })`;
  }

  transformFunction_(tree, constructor, nameExpression) {
    let body = super.transformAny(tree.body);

    // We need to transform for-in loops because the object key iteration
    // cannot be interrupted.
    let finder = new ForInFinder();
    finder.visitAny(body);
    if (finder.found) {
      body = new ForInTransformPass(this.identifierGenerator, this.reporter,
                                    this.options).transformAny(body);
    }

    if (this.tranformOptions_.generators && tree.isGenerator()) {
      let transformer = new GeneratorTransformer(this.identifierGenerator,
                                                 this.reporter, this.options);
      body = transformer.transformGeneratorBody(body, nameExpression);
      transformer.requiredNames.forEach((n) => {
        this.addImportedName(n);
      });

    } else if (this.tranformOptions_.asyncFunctions && tree.isAsyncFunction()) {
      let transformer = new AsyncTransformer(this.identifierGenerator,
                                             this.reporter, this.options);
      body = transformer.transformAsyncBody(body, nameExpression);
      transformer.requiredNames.forEach((n) => {
        this.addImportedName(n);
      });
    }

    // The generator has been transformed away.
    let functionKind = null;

    return new constructor(tree.location, tree.name, functionKind,
                           tree.parameterList, tree.typeAnnotation || null,
                           tree.annotations || null, body);
  }

  transformArrowFunction(tree) {
    if (!tree.isAsyncFunction())
      return super.transformArrowFunction(tree);

    return this.transformAny(ArrowFunctionTransformer.transform(this, tree));
  }

  transformBlock(tree) {
    let inBlock = this.inBlock_;
    this.inBlock_ = true;
    let rv = super.transformBlock(tree);
    this.inBlock_ = inBlock;
    return rv;
  }
}
