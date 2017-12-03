// Copyright 2012 Traceur Authors.
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

import {IDENTIFIER_EXPRESSION} from '../syntax/trees/ParseTreeType.js';
import {
  CONST,
  MINUS_MINUS,
  PLUS_PLUS
} from '../syntax/TokenType.js';
import {ScopeVisitor} from './ScopeVisitor.js';
import {ScopeChainBuilder} from './ScopeChainBuilder.js';

export class ConstChecker extends ScopeVisitor {
  /**
   * @param {ScopeVisitor} scopeBuilder
   * @param {ErrorReporter} reporter
   */
  constructor(scopeBuilder, reporter) {
    super();
    this.scopeBuilder_ = scopeBuilder;
    this.reporter_ = reporter;
  }

  pushScope(tree) {
    // Override to return the cached scope.
    return this.scope = this.scopeBuilder_.getScopeForTree(tree);
  }

  visitUnaryExpression(tree) {
    if (tree.operand.type === IDENTIFIER_EXPRESSION &&
        (tree.operator.type === PLUS_PLUS ||
         tree.operator.type === MINUS_MINUS)) {
      this.validateMutation_(tree.operand);
    }
    super.visitUnaryExpression(tree);
  }

  visitPostfixExpression(tree) {
    if (tree.operand.type === IDENTIFIER_EXPRESSION) {
      this.validateMutation_(tree.operand);
    }
    super.visitPostfixExpression(tree);
  }

  visitBinaryExpression(tree) {
    if (tree.left.type === IDENTIFIER_EXPRESSION &&
        tree.operator.isAssignmentOperator()) {
      this.validateMutation_(tree.left);
    }
    super.visitBinaryExpression(tree);
  }

  validateMutation_(identifierExpression) {
    if (this.inWithBlock) {
      return;
    }
    let binding = this.scope.getBinding(identifierExpression);
    if (binding === null) {
      // We don't know anything about this binding.
      return;
    }

    let {type, tree} = binding;
    if (type === CONST) {
      this.reportError_(identifierExpression.location,
          `${tree.getStringValue()} is read-only`);
    }
  }

  reportError_(location, message) {
    this.reporter_.reportError(location, message);
  }
}

export function validate(tree, reporter) {
  let builder = new ScopeChainBuilder(reporter);
  builder.visitAny(tree);
  let checker = new ConstChecker(builder, reporter);
  checker.visitAny(tree);
}
