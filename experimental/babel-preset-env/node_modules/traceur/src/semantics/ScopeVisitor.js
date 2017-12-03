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

import {ParseTreeVisitor} from '../syntax/ParseTreeVisitor.js';
import {VAR} from '../syntax/TokenType.js';
import {Scope} from './Scope.js';
import {
  COMPREHENSION_FOR,
  VARIABLE_DECLARATION_LIST
} from '../syntax/trees/ParseTreeType.js';

/**
 * Base class for building up the scope chains for a tree.
 */
export class ScopeVisitor extends ParseTreeVisitor {
  constructor() {
    super();
    this.map_ = new Map();
    this.scope = null;
    this.withBlockCounter_ = 0;
  }

  getScopeForTree(tree) {
    return this.map_.get(tree);
  }

  createScope(tree) {
    return new Scope(this.scope, tree);
  }

  /**
   * @return {Scope}
   */
  pushScope(tree) {
    let scope = this.createScope(tree);
    this.map_.set(tree, scope);
    return this.scope = scope;
  }

  /**
   * @param {Scope} scope
   */
  popScope(scope) {
    if (this.scope !== scope) {
      throw new Error('ScopeVisitor scope mismatch');
    }

    this.scope = scope.parent;
  }

  visitScript(tree) {
    let scope = this.pushScope(tree);
    super.visitScript(tree);
    this.popScope(scope);
  }

  visitModule(tree) {
    let scope = this.pushScope(tree);
    super.visitModule(tree);
    this.popScope(scope);
  }

  visitBlock(tree) {
    let scope = this.pushScope(tree);
    super.visitBlock(tree);
    this.popScope(scope);
  }

  visitCatch(tree) {
    let scope = this.pushScope(tree);
    this.visitAny(tree.binding);
    // We already entered the block.
    this.visitList(tree.catchBody.statements);
    this.popScope(scope);
  }

  visitFunctionBodyForScope(tree, parameterList = tree.parameterList) {
    let scope = this.pushScope(tree);
    this.visitAny(parameterList);
    scope.inGenerator = tree.functionKind && tree.isGenerator();
    this.visitAny(tree.body);
    this.popScope(scope);
  }

  visitFunctionExpression(tree) {
    this.visitFunctionBodyForScope(tree);
  }

  visitFunctionDeclaration(tree) {
    this.visitAny(tree.name);
    this.visitFunctionBodyForScope(tree);
  }

  visitArrowFunction(tree) {
    this.visitFunctionBodyForScope(tree);
  }

  visitGetAccessor(tree) {
    this.visitFunctionBodyForScope(tree, null);
  }

  visitSetAccessor(tree) {
    this.visitFunctionBodyForScope(tree);
  }

  visitMethod(tree) {
    this.visitFunctionBodyForScope(tree);
  }

  visitClassDeclaration(tree) {
    this.visitAny(tree.superClass);
    let scope = this.pushScope(tree);
    this.visitAny(tree.name);
    this.visitList(tree.elements);
    this.popScope(scope);
  }

  visitClassExpression(tree) {
    this.visitAny(tree.superClass);
    let scope;
    if (tree.name) {
      scope = this.pushScope(tree);
      this.visitAny(tree.name);
    }
    this.visitList(tree.elements);
    if (tree.name) {
      this.popScope(scope);
    }
  }

  visitWithStatement(tree) {
    this.visitAny(tree.expression);
    this.withBlockCounter_++;
    this.visitAny(tree.body);
    this.withBlockCounter_--;
  }

  get inWithBlock() {
    return this.withBlockCounter_ > 0;
  }

  visitLoop_(tree, func) {
    if (tree.initializer.type !== VARIABLE_DECLARATION_LIST ||
        tree.initializer.declarationType === VAR) {
      func();
      return;
    }

    let scope = this.pushScope(tree);
    func();
    this.popScope(scope);
  }

  visitForInStatement(tree) {
    this.visitLoop_(tree, () => super.visitForInStatement(tree));
  }

  visitForOfStatement(tree) {
    this.visitLoop_(tree, () => super.visitForOfStatement(tree));
  }

  visitForStatement(tree) {
    if (!tree.initializer) {
      super.visitForStatement(tree);
    } else {
      this.visitLoop_(tree, () => super.visitForStatement(tree));
    }
  }

  visitComprehension_(tree) {
    let scopes = [];
    for (let i = 0; i < tree.comprehensionList.length; i++) {
      let scope = null;
      if (tree.comprehensionList[i].type === COMPREHENSION_FOR) {
        scope = this.pushScope(tree.comprehensionList[i]);
      }
      scopes.push(scope);
      this.visitAny(tree.comprehensionList[i]);
    }

    this.visitAny(tree.expression);

    for(let i = scopes.length - 1; i >= 0; i--) {
      if (scopes[i]) {
        this.popScope(scopes[i]);
      }
    }
  }

  visitArrayComprehension(tree) {
    this.visitComprehension_(tree);
  }

  visitGeneratorComprehension(tree) {
    this.visitComprehension_(tree);
  }

  // Do not recurse into type annotations
  visitPredefinedType(tree) {}
  visitTypeArguments(tree) {}
  visitFunctionType(tree) {}
}
