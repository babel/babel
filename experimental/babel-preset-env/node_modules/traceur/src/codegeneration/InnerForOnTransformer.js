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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import alphaRenameThisAndArguments from './alphaRenameThisAndArguments.js';
import {
  parseStatement,
  parseStatements
} from './PlaceholderParser.js';
import {
  AnonBlock,
  Block,
  ContinueStatement,
  LabelledStatement,
  ReturnStatement
} from '../syntax/trees/ParseTrees.js';
import {StringSet} from '../util/StringSet.js';
import {
  createAssignmentStatement,
  createCaseClause,
  createDefaultClause,
  createIdentifierExpression as id,
  createNumberLiteral,
  createSwitchStatement,
  createThisExpression,
  createVariableStatement,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVoid0
} from './ParseTreeFactory.js';
import SkipFunctionsTransformerTrait from './SkipFunctionsTransformerTrait.js';
import {ARGUMENTS} from '../syntax/PredefinedName.js';
import {VAR} from '../syntax/TokenType.js';
import {
  VARIABLE_DECLARATION_LIST,
  BLOCK
} from '../syntax/trees/ParseTreeType.js';

export class InnerForOnTransformer extends
    SkipFunctionsTransformerTrait(ParseTreeTransformer) {
  // TODO: This class has considerable overlap with
  // FnExtractAbruptCompletions. The common code should really be refactored
  // into an abstract base class.

  constructor(tempIdGenerator, labelSet, options) {
    super();
    this.idGenerator_ = tempIdGenerator;
    this.inLoop_ = 0;
    this.inBreakble_ = 0;
    this.variableDeclarations_ = [];
    this.extractedStatements_ = [];
    this.labelSet_ = labelSet;
    this.labelledStatements_ = new StringSet();
    this.observer_ = id(this.idGenerator_.getTempIdentifier());
    this.result_ = id(this.idGenerator_.getTempIdentifier());
    this.parentLabels_ = new StringSet();
    this.labelSet_.forEach((tree) => {
      this.parentLabels_.add(tree.name.value);
    });
    this.options = options;
  }

  transform(tree) {
    let value = id(this.idGenerator_.getTempIdentifier());
    let assignment;
    if (tree.initializer.type === VARIABLE_DECLARATION_LIST) {
      // {var,let,const} initializer = $value;
      assignment = createVariableStatement(
          tree.initializer.declarationType,
          tree.initializer.declarations[0].lvalue, value);
    } else {
      assignment = parseStatement `
          ${tree.initializer} = ${value};`;
    }

    let body;
    if (tree.body.type === BLOCK) {
      body = new Block(tree.body.location,
          [assignment, ...tree.body.statements]);
    } else {
      body = new Block(null, [assignment, tree.body]);
    }
    body = this.transformAny(body);
    body = alphaRenameThisAndArguments(this, body);

    // var $result = undefined
    this.variableDeclarations_.push(
        createVariableDeclaration(this.result_, createVoid0()));

    let caseClauses = this.extractedStatements_.map(
        (statement, index) => {
          return createCaseClause(createNumberLiteral(index), [statement])
        });
    caseClauses.push(createCaseClause(createVoid0(), [
        new ContinueStatement(null, null)]));
    caseClauses.push(createDefaultClause(parseStatements `
        return ${this.result_}.v;`));

    let switchStatement = createSwitchStatement(this.result_, caseClauses);
    let observeForEach = this.idGenerator_.getRuntimeExpression('observeForEach');
    let statement = parseStatement `
        do {
          ${createVariableStatement(
            createVariableDeclarationList(VAR, this.variableDeclarations_))}
            await ${observeForEach}(
              ${tree.observable}[Symbol.observer].bind(${tree.observable}),
              async function (${value}) {
                var ${this.observer_} = this;
                try {
                  ${body}
                } catch (e) {
                  ${this.observer_}.throw(e);
                }
              });
          ${switchStatement}
        } while (false);`;

    let labelledStatement;
    while (labelledStatement = this.labelSet_.pop()) {
      statement = new LabelledStatement(labelledStatement.location,
      labelledStatement.name, statement);
    }

    return statement;
  }

  // alphaRenameThisAndArguments
  addTempVarForArguments() {
    let tmpVarName = this.idGenerator_.generateUniqueIdentifier();
    this.variableDeclarations_.push(createVariableDeclaration(
        tmpVarName, id(ARGUMENTS)));
    return tmpVarName;
  }
  // alphaRenameThisAndArguments
  addTempVarForThis() {
    let tmpVarName = this.idGenerator_.generateUniqueIdentifier();
    this.variableDeclarations_.push(createVariableDeclaration(
        tmpVarName, createThisExpression()));
    return tmpVarName;
  }

  transformAny(tree) {
    if (tree) {
      if (tree.isBreakableStatement()) this.inBreakble_++;
      if (tree.isIterationStatement()) this.inLoop_++;
      tree = super.transformAny(tree);
      if (tree.isBreakableStatement()) this.inBreakble_--;
      if (tree.isIterationStatement()) this.inLoop_--;
    }
    return tree;
  }

  transformReturnStatement(tree) {
    return new AnonBlock(tree.location, parseStatements `
        ${this.observer_}.return();
        ${this.result_} = {v: ${tree.expression || createVoid0()}};
        return;`);
  }

  transformAbruptCompletion_(tree) {
    this.extractedStatements_.push(tree);

    let index = this.extractedStatements_.length - 1;
    return new AnonBlock(null, parseStatements `
        ${this.observer_}.return();
        ${this.result_} = ${index};
        return;`);
  }

  transformBreakStatement(tree) {
    if (!tree.name) {
      if (this.inBreakble_) {
        return super.transformBreakStatement(tree);
      }
      return this.transformAbruptCompletion_(
        new ContinueStatement(tree.location, null));
    }
    if (this.labelledStatements_.has(tree.name.value)) {
      return super.transformBreakStatement(tree);
    }
    return this.transformAbruptCompletion_(tree);
  }

  transformContinueStatement(tree) {
    if (!tree.name) {
      if (this.inLoop_) {
        return super.transformContinueStatement(tree);
      }
      return new ReturnStatement(tree.location, null);
    }
    if (this.labelledStatements_.has(tree.name.value)) {
      return super.transformContinueStatement(tree);
    }
    if (this.parentLabels_.has(tree.name.value)) {
      return new ReturnStatement(tree.location, null);
    }
    return this.transformAbruptCompletion_(tree);
  }

  // keep track of labels in the tree
  transformLabelledStatement(tree) {
    this.labelledStatements_.add(tree.name.value);
    return super.transformLabelledStatement(tree);
  }

  transformVariableStatement(tree) {
    if (tree.declarations.declarationType === VAR) {
      let assignments = [];
      tree.declarations.declarations.forEach((variableDeclaration) => {
        let variableName = variableDeclaration.lvalue.getStringValue();
        let initializer = super.transformAny(variableDeclaration.initializer);

        this.variableDeclarations_.push(
            createVariableDeclaration(variableName, null));

        assignments.push(createAssignmentStatement(
            id(variableName), initializer));
      });

      return new AnonBlock(null, assignments);
    }

    return super.transformVariableStatement(tree);
  }

  static transform(tempIdGenerator, tree, labelSet) {
    return new InnerForOnTransformer(tempIdGenerator, labelSet).transform(tree);
  }
}
