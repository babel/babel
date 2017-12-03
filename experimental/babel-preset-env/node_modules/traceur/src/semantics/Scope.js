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
  BLOCK,
  CATCH,
  FUNCTION_EXPRESSION,
} from '../syntax/trees/ParseTreeType.js';
import {StringMap} from '../util/StringMap.js';
import {VAR} from '../syntax/TokenType.js';
import {isTreeStrict} from './isTreeStrict.js';

function reportDuplicateVar(reporter, tree, name) {
  reporter.reportError(tree.location, `Duplicate declaration, ${name}`);
}

/**
 * Represents the link in the scope chain.
 */
export class Scope {
  /**
   * @param {Scope} parent The parent scope, or null if top level scope.
   * @param {ParseTree} tree
   */
  constructor(parent, tree) {
    this.parent = parent;
    this.tree = tree;
    // These are the variable declarations introduced in this scope. These are
    // set here even if the scope represents a block but we also add them to
    // parent scope all the way up until we find a funciton or top level scope.
    this.variableDeclarations_ = new StringMap();
    // Let and const as well as block scoped functions.
    this.lexicalDeclarations_ = new StringMap();
    this.strictMode = parent && parent.strictMode || isTreeStrict(tree);
    this.inGenerator = parent ? parent.inGenerator || false : false;
  }

  addBinding(tree, type, reporter) {
    if (type === VAR) {
      this.addVar(tree, reporter);
    } else {
      this.addDeclaration(tree, type, reporter);
    }
  }

  addVar(tree, reporter) {
    // We add VAR bindings to blocks so that we can check for duplicates.
    let name = tree.getStringValue();
    if (this.lexicalDeclarations_.has(name) &&
        !this.isFunctionExpressionName(name)) {
      reportDuplicateVar(reporter, tree, name);
      return;
    }
    this.variableDeclarations_.set(name, {type: VAR, tree, scope: this});
    if (!this.isVarScope && this.parent) {
      this.parent.addVar(tree, reporter);
    }
  }

  addDeclaration(tree, type, reporter) {
    let name = tree.getStringValue();
    if ((this.lexicalDeclarations_.has(name) ||
         this.variableDeclarations_.has(name)) &&
         !this.isFunctionExpressionName(name)) {
      reportDuplicateVar(reporter, tree, name);
      return;
    }
    this.lexicalDeclarations_.set(name, {type, tree, scope: this});
  }

  // we deduce the oldType
  renameBinding(oldName, newTree, newType, reporter) {
    let name = newTree.getStringValue();
    if (newType === VAR) {
      if (this.lexicalDeclarations_.has(oldName)) {
        this.lexicalDeclarations_.delete(oldName);
        this.addVar(newTree, reporter);
      }
    } else if (this.variableDeclarations_.has(oldName)) {
      this.variableDeclarations_.delete(oldName);
      this.addDeclaration(newTree, newType, reporter);
      if (!this.isVarScope && this.parent) {
        this.parent.renameBinding(oldName, newTree, newType);
      }
    }
  }

  get isVarScope() {
    switch (this.tree.type) {
      case BLOCK:
      case CATCH:
        return false;
    }
    return true;
  }

  getVarScope() {
    if (this.isVarScope) {
      return this;
    }
    if (this.parent) {
      return this.parent.getVarScope();
    }
    return null;
  }

  /**
   * Whether name is name of the current function expression.
   */
  isFunctionExpressionName(name) {
    let b = this.getBindingByName(name);
    return b && b.scope.tree.type === FUNCTION_EXPRESSION &&
        b.scope.tree.name === b.tree;
  }

  getBinding(tree) {
    let name = tree.getStringValue();
    return this.getBindingByName(name);
  }

  getBindingByName(name) {
    let b = this.variableDeclarations_.get(name);
    if (b && this.isVarScope) {
      return b;
    }
    b = this.lexicalDeclarations_.get(name);
    if (b) {
      return b;
    }
    if (this.parent) {
      return this.parent.getBindingByName(name);
    }
    return null;
  }

  getAllBindingNames() {
    let names = this.variableDeclarations_.keysAsSet();
    this.lexicalDeclarations_.forEach((name) => names.add(name));
    return names;
  }

  getVariableBindingNames() {
    return this.variableDeclarations_.keysAsSet()
  }

  getLexicalBindingNames() {
    return this.lexicalDeclarations_.keysAsSet();
  }

  hasBindingName(name) {
    return this.lexicalDeclarations_.has(name) ||
           this.variableDeclarations_.has(name);
  }

  hasLexicalBindingName(name) {
    return this.lexicalDeclarations_.has(name);
  }

  hasVariableBindingName(name) {
    return this.variableDeclarations_.has(name);
  }
}
