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

import {ScopeChainBuilder} from './ScopeChainBuilder.js';
import {ScopeReferences} from './ScopeReferences.js';
import {
  FUNCTION_DECLARATION,
  FUNCTION_EXPRESSION,
  GET_ACCESSOR,
  IDENTIFIER_EXPRESSION,
  METHOD,
  MODULE,
  SET_ACCESSOR
} from '../syntax/trees/ParseTreeType.js';
import {TYPEOF} from '../syntax/TokenType.js';

function hasArgumentsInScope(scope) {
  for (; scope; scope = scope.parent) {
    switch (scope.tree.type) {
      case FUNCTION_DECLARATION:
      case FUNCTION_EXPRESSION:
      case GET_ACCESSOR:
      case METHOD:
      case SET_ACCESSOR:
        return true;
    }
  }
  return false;
}

function inModuleScope(scope) {
  for (; scope; scope = scope.parent) {
    if (scope.tree.type === MODULE) {
      return true;
    }
  }
  return false;
}


export class ScopeChainBuilderWithReferences extends ScopeChainBuilder {
  createScope(tree) {
    return new ScopeReferences(this.scope, tree);
  }

  visitIdentifierExpression(tree) {
    if (this.inWithBlock) {
      return;
    }
    let scope = this.scope;

    let name = tree.getStringValue();
    if (name === 'arguments' && hasArgumentsInScope(scope)) {
      return;
    }

    if (name === '__moduleName' && inModuleScope(scope)) {
      return;
    }

    this.referenceFound(tree, name);
  }

  visitUnaryExpression(tree) {
    // Allow typeof x to be a heuristic for allowing reading x later.
    if (tree.operator.type === TYPEOF &&
        tree.operand.type === IDENTIFIER_EXPRESSION) {
      let scope = this.scope;
      let binding = scope.getBinding(tree.operand);
      if (!binding) {
        scope.addVar(tree.operand, this.reporter);
      }
    } else {
      super.visitUnaryExpression(tree);
    }
  }

  referenceFound(tree, name) {
    // tree is used in subclass.
    this.scope.addReference(name);
  }
}
