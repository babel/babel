// Copyright 2014 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  CONST,
  LET,
  VAR
} from '../syntax/TokenType.js';
import {ScopeVisitor} from './ScopeVisitor.js';

/**
 * This adds the bindings to the scopes.
 */
export class ScopeChainBuilder extends ScopeVisitor {
  /**
   * @param {ErrorReporter} reporter
   */
  constructor(reporter) {
    super();
    this.reporter = reporter;
    this.declarationType_ = null;
  }

  visitCatch(tree) {
    let scope = this.pushScope(tree);
    this.declarationType_ = LET;
    this.visitAny(tree.binding);
    // We already entered the block.
    this.visitList(tree.catchBody.statements);
    this.popScope(scope);
  }

  visitImportedBinding(tree) {
    this.declarationType_ = CONST;
    super.visitImportedBinding(tree);
  }

  visitVariableDeclarationList(tree) {
    this.declarationType_ = tree.declarationType;
    super.visitVariableDeclarationList(tree);
  }

  visitBindingIdentifier(tree) {
    this.declareVariable(tree);
  }

  visitFunctionExpression(tree) {
    let scope = this.pushScope(tree);
    if (tree.name) {
      this.declarationType_ = CONST;
      this.visitAny(tree.name);
    }
    this.visitAny(tree.parameterList);
    scope.inGenerator = tree.isGenerator();
    this.visitAny(tree.body);
    this.popScope(scope);
  }

  visitFormalParameter(tree) {
    this.declarationType_ = VAR;
    super.visitFormalParameter(tree);
  }

  visitFunctionDeclaration(tree) {
    // Allow this to he the entry point.
    if (this.scope) {
      if (this.scope.isVarScope) {
        this.declarationType_ = VAR;
        this.visitAny(tree.name);
      } else {
        if (!this.scope.strictMode) {
          let varScope = this.scope.getVarScope();
          if (varScope) {
            varScope.addVar(tree.name, this.reporter);
          }
        }
        this.declarationType_ = LET;
        this.visitAny(tree.name);
      }
    }

    this.visitFunctionBodyForScope(tree, tree.parameterList, tree.body);
  }

  visitClassDeclaration(tree) {
    this.visitAny(tree.superClass);
    this.declarationType_ = LET;
    this.visitAny(tree.name);
    let scope = this.pushScope(tree);

    // Again, because the name is bound in the class
    this.declarationType_ = CONST;
    this.visitAny(tree.name);

    this.visitList(tree.elements);
    this.popScope(scope);
  }

  visitClassExpression(tree) {
    this.visitAny(tree.superClass);
    let scope;
    if (tree.name) {
      scope = this.pushScope(tree);
      this.declarationType_ = CONST;
      this.visitAny(tree.name);
    }
    this.visitList(tree.elements);
    if (tree.name) {
      this.popScope(scope);
    }
  }

  visitComprehensionFor(tree) {
    this.declarationType_ = LET;
    super.visitComprehensionFor(tree);
  }

  declareVariable(tree) {
    this.scope.addBinding(tree, this.declarationType_, this.reporter);
  }
}
