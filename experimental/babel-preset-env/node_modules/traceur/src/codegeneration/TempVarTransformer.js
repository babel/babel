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
  Module,
  Script
} from '../syntax/trees/ParseTrees.js';
import {ARGUMENTS} from '../syntax/PredefinedName.js';
import {StringSet} from '../util/StringSet.js';
import {LET, VAR} from '../syntax/TokenType.js';
import {
  createFunctionBody,
  createThisExpression,
  createIdentifierExpression,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement
} from './ParseTreeFactory.js';
import {prependStatements} from './PrependStatements.js';

class TempVarStatement {
  constructor(name, initializer) {
    this.name = name;
    this.initializer = initializer;
  }
}

class TempScope {
  constructor() {
    this.identifiers = [];
  }

  push(identifier) {
    this.identifiers.push(identifier);
  }

  pop() {
    return this.identifiers.pop();
  }

  release(obj) {
    for (let i = this.identifiers.length - 1; i >= 0; i--) {
      obj.releaseTempName(this.identifiers[i]);
    }
  }
}

class VarScope {
  constructor(options) {
    this.thisName = null;
    this.argumentName = null;
    this.tempVarStatements = [];
    this.declarationType_ =
        options.blockBinding && !options.transformOptions.blockBinding ?
            LET : VAR;
  }

  push(tempVarStatement) {
    this.tempVarStatements.push(tempVarStatement);
  }

  pop() {
    return this.tempVarStatements.pop();
  }

  release(obj) {
    for (let i = this.tempVarStatements.length - 1; i >= 0; i--) {
      obj.releaseTempName(this.tempVarStatements[i].name);
    }
  }

  isEmpty() {
    return !this.tempVarStatements.length;
  }

  createVariableStatement() {
    let declarations = [];
    let seenNames = new StringSet();
    for (let i = 0; i < this.tempVarStatements.length; i++) {
      let {name, initializer} = this.tempVarStatements[i];
      if (seenNames.has(name)) {
        if (initializer)
          throw new Error('Invalid use of TempVarTransformer');
        continue;
      }
      seenNames.add(name);
      declarations.push(createVariableDeclaration(name, initializer));
    }

    return createVariableStatement(
        createVariableDeclarationList(this.declarationType_, declarations));
  }
}

/**
 * A generic transformer that allows you to easily create a expression with
 * temporary variables.
 */
export class TempVarTransformer extends ParseTreeTransformer {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   * @param {Options} options
   */
  constructor(identifierGenerator, reporter, options) {
    super();
    this.identifierGenerator = identifierGenerator;
    this.reporter = reporter;
    this.options = options;

    // Stack used for variable declarations.
    this.tempVarStack_ = [new VarScope(this.options)];

    // Stack used for the temp scopes. Temp scopes can be used to allow
    // temporary names to used sooner than after leaving the currently function
    // body.
    this.tempScopeStack_ = [new TempScope()];

    // Names that can be reused.
    this.namePool_ = [];
  }

  /**
   * Transforms a an array of statements and adds a new temp var scope.
   * @param {Array.<ParseTree>} statements
   * @return {Array.<ParseTree>}
   * @private
   */
  transformStatements_(statements) {
    this.tempVarStack_.push(new VarScope(this.options));

    let transformedStatements = this.transformList(statements);

    let vars = this.tempVarStack_.pop();
    if (vars.isEmpty())
      return transformedStatements;

    let variableStatement = vars.createVariableStatement();
    vars.release(this);

    return prependStatements(transformedStatements, variableStatement);
  }

  transformScript(tree) {
    let scriptItemList = this.transformStatements_(tree.scriptItemList);
    if (scriptItemList === tree.scriptItemList) {
      return tree;
    }
    return new Script(tree.location, scriptItemList, tree.moduleName);
  }

  transformModule(tree) {
    let scriptItemList = this.transformStatements_(tree.scriptItemList);
    if (scriptItemList === tree.scriptItemList) {
      return tree;
    }
    return new Module(tree.location, scriptItemList, tree.moduleName);
  }

  transformFunctionBody(tree) {
    this.pushTempScope();
    let statements = this.transformStatements_(tree.statements);
    this.popTempScope();
    if (statements === tree.statements)
      return tree;
    return createFunctionBody(statements);
  }

  /**
   * @return {string} An identifier string that can may be reused after the
   *     current temp scope has been exited.
   */
  getTempIdentifier() {
    // TODO(arv): Rename to getTempName
    let name = this.getName_();
    this.tempScopeStack_[this.tempScopeStack_.length - 1].push(name);
    return name;
  }

  getName_() {
    return this.namePool_.length ? this.namePool_.pop() :
        this.identifierGenerator.generateUniqueIdentifier();
  }

  /**
   * Adds a new temporary variable to the current function scope.
   * @param {ParseTree=} initializer If present then the variable will
   *     have this as the initializer expression.
   * @return {string} The name of the temporary variable.
   */
  addTempVar(initializer = null) {
    let vars = this.tempVarStack_[this.tempVarStack_.length - 1];
    let name = this.getName_();
    vars.push(new TempVarStatement(name, initializer));
    return name;
  }

  /**
   * Allows you to create a temp var after you have created a temp identifier.
   * This is useful if you do not know ahead of time if you need to create the
   * temp var but you want to pass in a temp name to some function.
   *
   * Example:
   *   let name = transformer.getTempIdentifier();
   *   ...
   *   if (needed) {
   *     transformer.registerTempVarName(name);
   *   } else {
   *     transformer.releaseTempName(name);
   *   }
   *
   * @param {string} name
   */
  registerTempVarName(name) {
    let vars = this.tempVarStack_[this.tempVarStack_.length - 1];
    vars.push(new TempVarStatement(name, null));
  }

  addTempVarForThis() {
    let varScope = this.tempVarStack_[this.tempVarStack_.length - 1];
    return varScope.thisName ||
        (varScope.thisName = this.addTempVar(createThisExpression()));
  }

  addTempVarForArguments() {
    let varScope = this.tempVarStack_[this.tempVarStack_.length - 1];
    return varScope.argumentName || (varScope.argumentName =
        this.addTempVar(createIdentifierExpression(ARGUMENTS)));
  }

  /**
   * Pushes a new temporary name scope. This is useful if you know that
   * your temporary variable can be reused sooner than after the current
   * lexical scope has been exited.
   */
  pushTempScope() {
    this.tempScopeStack_.push(new TempScope());
  }

  popTempScope() {
    this.tempScopeStack_.pop().release(this);
  }

  /**
   * Put back the |name| into the pool of reusable temporary varible names.
   * @param {string} name
   */
  releaseTempName(name) {
    this.namePool_.push(name);
  }
}
