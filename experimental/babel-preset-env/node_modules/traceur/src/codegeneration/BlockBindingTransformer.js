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

import {AlphaRenamer} from './AlphaRenamer.js';
import {
  ANON_BLOCK,
  BINDING_IDENTIFIER,
  FOR_IN_STATEMENT,
  FOR_OF_STATEMENT,
  VARIABLE_DECLARATION_LIST
} from '../syntax/trees/ParseTreeType.js';
import {
  AnonBlock,
  BindingElement,
  BindingIdentifier,
  Block,
  Catch,
  DoWhileStatement,
  ForInStatement,
  ForStatement,
  FormalParameter,
  FunctionBody,
  FunctionExpression,
  LabelledStatement,
  LiteralPropertyName,
  Module,
  ObjectPatternField,
  Script,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
  WhileStatement
} from '../syntax/trees/ParseTrees.js';
import {IdentifierToken} from '../syntax/IdentifierToken.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {VAR} from '../syntax/TokenType.js';
import {
  createBindingIdentifier,
  createIdentifierExpression,
  createIdentifierToken
} from './ParseTreeFactory.js';
import {FindIdentifiers} from './FindIdentifiers.js';
import {FindVisitor} from './FindVisitor.js';
import {FnExtractAbruptCompletions} from './FnExtractAbruptCompletions.js';
import {ScopeChainBuilderWithReferences} from '../semantics/ScopeChainBuilderWithReferences.js';
import {parseExpression} from './PlaceholderParser.js';
import {prependStatements} from './PrependStatements.js';

/**
 * Transforms the block bindings from traceur to js.
 *
 * In most cases, let can be transformed to var straight away and renamed to
 * avoid name collisions.
 *
 * Making a
 *
 * if (true) { let t = 5; }
 *
 * Become a
 *
 * if (true) { var t$__0 = 5; }
 *
 * The only special case is in Iterable statements. For those, we only use a
 * different strategy if they use let in them and they define functions that use
 * those block binded variables. In that case, the loop content is extracted to
 * a function, that gets called on every iteration with its arguments being
 * any variable declared in the loop initializer.
 * If the loop contained any break/continue statements, they get extracted and
 * transformed to return statements of numbers, that correspond to the correct
 * statement in a switch case.
 *
 * Example:
 *
 * for (let i = 0; i < 5; i++) {
 *   if (i === 3) break;
 *   setTimeout(function () {
 *     log(i);
 *   });
 * }
 *
 * Becomes:
 *
 * // the loop content extracted to a function
 * var $__2 = function (i) {
 *   if (i === 3) return 0;
 *   setTimeout(function () {
 *     log(i);
 *   });
 * }, $__3;
 *
 * // the loop gets labelled if needed (it is here)
 * $__1:
 * for (var i$__0 = 0; i$__0 < 5; i$__0++) {
 *   $__3 = $__2(i$__0);
 *   switch($__3) {
 *     case 0:
 *       break $__1; // breaks the loop
 *   }
 * }
 *
 * If the loop contained return statements, they get transformed to returning
 * object which preserver the scope in which the expression get executed.
 *
 * Example:
 *
 * for (let i = 0; i < 5; i++) {
 *   if (i === 3) return i + 10;
 *   // without this the let would just become a var
 *   setTimeout(function () { log(i) });
 * }
 *
 * Becomes:
 *
 * var $__1 = function(i) {
 *   if (i === 3) return {v: i + 10};
 *   setTimeout(function() { log(i); });
 * }, $__2;
 * for (var i$__0 = 0; i$__0 < 5; i$__0++) {
 *   $__2 = $__1(i$__0);
 *   if (typeof $__2 === "object")
 *     return $__2.v;
 * }
 *
 *
 * If a loop contained both break/continue and return statements, the if-typeof
 * statement from the second example would be added as a default clause to the
 * switch statement of the first example.
 *
 *
 * const variables are handled the same way.
 *
 * The block binding rewrite pass assumes that deconstructing assignments
 * and variable declarations have already been desugared. See getVariableName_.
 *
 * Note:
 *
 * If the transformation happens inside a generator, the inner function
 * becomes an inner generator.
 */

function varNeedsInitializer(tree, loopTree) {
  if (loopTree === null) return false;

  // Loop initializers for for-in/for-of must not have an initializer RHS.
  let type = loopTree.type;
  if (type !== FOR_IN_STATEMENT && type !== FOR_OF_STATEMENT) return true;
  return loopTree.initializer.declarations[0] !== tree;
}

/**
 * BlockBindingTransformer class takes care of transforming the block bindings
 * of a function Scope to ES5. It creates a new instance of itself for every
 * new function/script it encounters.
 */
export class BlockBindingTransformer extends ParseTreeTransformer {
  constructor(idGenerator, reporter, tree,
              scopeBuilder = undefined, latestScope = undefined) {
    super();
    this.idGenerator_ = idGenerator;
    this.reporter_ = reporter;
    if (!scopeBuilder) {
      scopeBuilder = new ScopeChainBuilderWithReferences(reporter);
      scopeBuilder.visitAny(tree);
    }
    this.scopeBuilder_ = scopeBuilder;

    this.labelledLoops_ = new Map(); // of {loopTree: labelName}
    this.prependStatement_ = [];
    this.prependBlockStatement_ = [];
    this.blockRenames_ = [];
    this.rootTree_ = tree;
    if (latestScope) {
      this.scope_ = latestScope;
    } else {
      this.pushScope(tree);
    }
    this.usedVars_ = this.scope_.getAllBindingNames();
    this.maybeRename_ = false;
    this.inObjectPattern_ = false;
    this.currentLoopTree_ = null;
  }

  /**
   * @param {VariableDeclaration} variable
   * @return {string}
   */
  getVariableName_(variable) {
    let lvalue = variable.lvalue;
    if (lvalue.type === BINDING_IDENTIFIER) {
      return lvalue.getStringValue();
    }
    throw new Error('Unexpected destructuring declaration found.');
  }

  flushRenames(tree) {
    tree = renameAll(this.blockRenames_, tree);
    this.blockRenames_.length = 0;
    return tree;
  }

  /**
   * Pushes new scope
   * @param {Scope} scope
   * @return {Scope}
   */
  pushScope(tree) {
    let scope = this.scopeBuilder_.getScopeForTree(tree);
    if (!scope) throw new Error('BlockBindingTransformer tree with no scope');
    if (this.scope_) this.scope_.blockBindingRenames = this.blockRenames_;
    this.scope_ = scope;
    this.blockRenames_ = [];
    return scope;
  }

  /**
   * Pops scope, tracks proper matching of push_/pop_ operations.
   * @param {Scope} scope
   */
  popScope(scope) {
    if (this.scope_ !== scope) {
      throw new Error('BlockBindingTransformer scope mismatch');
    }
    this.scope_ = scope.parent;
    this.blockRenames_ = this.scope_ && this.scope_.blockBindingRenames || [];
  }

  revisitTreeForScopes(tree) {
    this.scopeBuilder_.scope = this.scope_;
    this.scopeBuilder_.visitAny(tree);
    this.scopeBuilder_.scope = null;
  }

  needsRename_(name) {
    if (this.usedVars_.has(name)) return true;
    let scope = this.scope_;
    let parent = scope.parent;
    if (!parent || scope.isVarScope) return false;

    // Look for free variables with the same name in the current var scope.
    let varScope = scope.getVarScope();
    if (varScope && varScope.hasFreeVariable(name)) {
      return true;
    }

    let parentBinding = parent.getBindingByName(name);
    if (!parentBinding) return false;
    let currentBinding = scope.getBindingByName(name);
    if (currentBinding.tree === parentBinding.tree) return false;
    return true;
  }

  newNameFromOrig(origName, renames) {
    let newName;
    if (this.needsRename_(origName)) {
      newName = origName + this.idGenerator_.generateUniqueIdentifier();
      renames.push(new Rename(origName, newName));
    } else {
      this.usedVars_.add(origName);
      newName = origName;
    }
    return newName;
  }

  // this is a start and end point of this transformer
  transformFunctionBody(tree) {
    if (tree === this.rootTree_ || !this.rootTree_) {
      tree = super.transformFunctionBody(tree);
      if (this.prependStatement_.length || this.blockRenames_.length) {
        let statements = prependStatements(tree.statements,
            ...this.prependStatement_);
        tree = new FunctionBody(tree.location, statements);
        tree = this.flushRenames(tree);
      }
    } else {
      let functionTransform = new BlockBindingTransformer(this.idGenerator_,
          this.reporter_, tree, this.scopeBuilder_, this.scope_);
      let functionBodyTree = functionTransform.transformAny(tree);

      if (functionBodyTree === tree) {
        return tree;
      }
      tree = new FunctionBody(tree.location, functionBodyTree.statements);
    }
    return tree;
  }

  // this is a start and end point of this transformer
  transformScript(tree) {
    if (tree === this.rootTree_ || !this.rootTree_) {
      tree = super.transformScript(tree);
      if (this.prependStatement_.length || this.blockRenames_.length) {
        let scriptItemList = prependStatements(tree.scriptItemList,
            ...this.prependStatement_);
        tree = new Script(tree.location, scriptItemList, tree.moduleName);
        tree = this.flushRenames(tree);
      }
    } else {
      let functionTransform = new BlockBindingTransformer(this.idGenerator_,
          this.reporter_, tree, this.scopeBuilder_);
      let newTree = functionTransform.transformAny(tree);

      if (newTree === tree) {
        return tree;
      }
      tree = new Script(tree.location, newTree.scriptItemList, tree.moduleName);
    }
    return tree;
  }

  // this is a start and end point of this transformer
  transformModule(tree) {
    if (tree === this.rootTree_ || !this.rootTree_) {
      tree = super.transformModule(tree);
      if (this.prependStatement_.length || this.blockRenames_.length) {
        let scriptItemList = prependStatements(tree.scriptItemList,
            ...this.prependStatement_);
        tree = new Module(tree.location, scriptItemList, tree.moduleName);
        tree = this.flushRenames(tree);
      }
    } else {
      let functionTransform = new BlockBindingTransformer(this.idGenerator_,
          this.reporter_, tree, this.scopeBuilder_);
      let newTree = functionTransform.transformAny(tree);

      if (newTree === tree) {
        return tree;
      }
      tree = new Module(tree.location, newTree.scriptItemList, tree.moduleName);
    }
    return tree;
  }

  // even if the actual transformations are in the transformVarDeclarationList
  // the Statement itself might become a AnonBlock
  transformVariableStatement(tree) {
    let declarations = this.transformAny(tree.declarations);
    if (declarations.type === ANON_BLOCK) {
      return declarations;
    }

    if (declarations === tree.declarations) {
      return tree;
    }
    return new VariableStatement(tree.location, declarations);
  }

  transformVariableDeclarationList(tree) {
    if (tree.declarationType === VAR) {
      return super.transformVariableDeclarationList(tree);
    }

    // If we are at a var scope we do not need to rename.
    this.maybeRename_ = !this.scope_.isVarScope;
    let declarations = this.transformList(tree.declarations);
    this.maybeRename_ = false;
    return new VariableDeclarationList(tree.location, VAR, declarations);
  }

  transformVariableDeclaration(tree) {
    let maybeRename = this.maybeRename_;
    let lvalue = this.transformAny(tree.lvalue);
    this.maybeRename_ = false;
    let initializer = null;
    if (tree.initializer) {
      initializer = this.transformAny(tree.initializer);
    } else if (varNeedsInitializer(tree, this.currentLoopTree_)) {
      // If we are in a loop we need to make sure we reinitialize the binding
      // on every iteration.
      initializer = parseExpression `void 0`;
    }
    this.maybeRename_ = maybeRename;
    if (tree.lvalue === lvalue && tree.initializer === initializer) {
      return tree;
    }
    return new VariableDeclaration(tree.location, lvalue, tree.typeAnnotation,
                                   initializer);
  }

  transformBindingIdentifier(tree) {
    if (this.maybeRename_) {
      let origName = tree.getStringValue()
      let newName = this.newNameFromOrig(origName, this.blockRenames_);
      if (origName === newName) {
        return tree;
      }
      let newToken = new IdentifierToken(tree.location, newName);
      let bindingIdentifier = new BindingIdentifier(tree.location, newToken);
      this.scope_.renameBinding(origName, bindingIdentifier, VAR,
                                this.reporter_);
      return bindingIdentifier;
    }
    return super.transformBindingIdentifier(tree);
  }

  transformBindingElement(tree) {
    let maybeRename = this.maybeRename_;
    let inObjectPattern = this.inObjectPattern_;
    let binding = this.transformAny(tree.binding);
    this.maybeRename_ = false;
    this.inObjectPattern_ = false;
    let initializer = this.transformAny(tree.initializer);
    this.maybeRename_ = maybeRename;
    this.inObjectPattern_ = inObjectPattern;
    if (tree.binding === binding && tree.initializer === initializer) {
      return tree;
    }

    let bindingElement =
        new BindingElement(tree.location, binding, initializer);

    // Need to transform {x} into {x: x$__0}
    if (this.inObjectPattern_ && tree.binding !== binding &&
        tree.binding.type === BINDING_IDENTIFIER) {
      return new ObjectPatternField(tree.location,
          new LiteralPropertyName(tree.location, tree.binding.identifierToken),
          bindingElement);
    }

    return bindingElement;
  }

  transformObjectPattern(tree) {
    let inObjectPattern = this.inObjectPattern_;
    this.inObjectPattern_ = true;
    let transformed = super.transformObjectPattern(tree);
    this.inObjectPattern_ = inObjectPattern;
    return transformed;
  }

  transformObjectPatternField(tree) {
    let name = this.transformAny(tree.name);
    this.inObjectPattern_ = false;
    let element = this.transformAny(tree.element);
    this.inObjectPattern_ = true;
    if (tree.name === name && tree.element === element) {
      return tree;
    }
    return new ObjectPatternField(tree.location, name, element);
  }

  transformBlock(tree) {
    let scope = this.pushScope(tree);
    let outerPrepends = this.prependBlockStatement_;
    this.prependBlockStatement_ = [];
    tree = super.transformBlock(tree);
    if (this.prependBlockStatement_.length) {
      tree = new Block(tree.location, prependStatements(tree.statements,
          ...this.prependBlockStatement_));
    }
    this.prependBlockStatement_ = outerPrepends;
    tree = this.flushRenames(tree);
    this.popScope(scope);
    return tree;
  }

  transformCatch(tree) {
    let scope = this.pushScope(tree);
    let binding = this.transformAny(tree.binding);
    // The catchBody block does not have a scope because the catch itself
    // has the scope. See ScopeVisitor.transformCatch
    let statements = this.transformList(tree.catchBody.statements);
    if (binding !== tree.binding || statements !== tree.catchBody.statements) {
      tree = new Catch(tree.location, binding,
          new Block(tree.catchBody.location, statements));
    }
    tree = this.flushRenames(tree);
    this.popScope(scope);
    return tree;
  }

  transformFunctionForScope_(func, tree) {
    let scope = this.pushScope(tree);
    tree = func();
    tree = this.flushRenames(tree);
    this.popScope(scope);
    return tree;
  }

  transformGetAccessor(tree) {
    return this.transformFunctionForScope_(
        () => super.transformGetAccessor(tree), tree);
  }

  transformSetAccessor(tree) {
    return this.transformFunctionForScope_(
        () => super.transformSetAccessor(tree), tree);
  }

  transformFunctionExpression(tree) {
    return this.transformFunctionForScope_(
        () => super.transformFunctionExpression(tree), tree);
  }

  transformFunctionDeclaration(tree) {
    // Named function in a block scope is only scoped to the block.
    // Change to variable statement and "hoist" it to the top of the block.
    if (!this.scope_.isVarScope) {
      let origName = tree.name.getStringValue();
      let newName = this.newNameFromOrig(origName, this.blockRenames_);

      // var f = function( ... ) { ... }
      let functionExpression =
          new FunctionExpression(tree.location, null, tree.functionKind,
                                 tree.parameterList, tree.typeAnnotation,
                                 tree.annotations, tree.body);
      this.revisitTreeForScopes(functionExpression);
      functionExpression = this.transformAny(functionExpression);
      let bindingIdentifier = createBindingIdentifier(newName);
      let statement = new VariableStatement(tree.location,
          new VariableDeclarationList(tree.location, VAR,
              [new VariableDeclaration(tree.location, bindingIdentifier,
                                       null, functionExpression)]));
      this.scope_.renameBinding(origName, bindingIdentifier, VAR,
                                this.reporter_);
      this.prependBlockStatement_.push(statement);

      return new AnonBlock(null, []);
    }

    return this.transformFunctionForScope_(
        () => super.transformFunctionDeclaration(tree), tree);
  }

  /**
   * @param func a function that continues the transform of the loop
   * @param tree the loop tree
   * @param loopFactory a function that recreates the loop with a provided
   *    initializer, a set of renames for the loop headers, and a loop body
   * @returns {ParseTree}
   */
  transformLoop_(func, tree, loopFactory) {
    let scope, initializerIsBlockBinding;
    if (tree.initializer &&
        tree.initializer.type === VARIABLE_DECLARATION_LIST &&
        tree.initializer.declarationType !== VAR) {
      initializerIsBlockBinding = true;
    }

    if (initializerIsBlockBinding) {
      scope = this.pushScope(tree);
    }

    // We only create an "iife" if the loop has block bindings and functions
    // that use those block binded variables
    let finder = new FindBlockBindingInLoop(tree, this.scopeBuilder_);
    finder.visitAny(tree);
    if (!finder.found) {
      let callFunc = () => {
        let currentLoopTree = this.currentLoopTree_;
        this.currentLoopTree_ = tree
        let rv = func(tree);
        this.currentLoopTree_ = currentLoopTree;
        return rv;
      };

      if (!initializerIsBlockBinding) {
        return callFunc();
      }

      // just switch it to var
      let renames = [];
      let initializer = new VariableDeclarationList(null, VAR,
          tree.initializer.declarations.map((declaration) => {
              let origName = this.getVariableName_(declaration);
              let newName = this.newNameFromOrig(origName, renames);

              let bindingIdentifier = createBindingIdentifier(newName);
              this.scope_.renameBinding(origName, bindingIdentifier,
                  VAR, this.reporter_);
              return new VariableDeclaration(null,
                  bindingIdentifier, null, declaration.initializer);
            }
          ));
      initializer = renameAll(renames, initializer);

      tree = loopFactory(initializer, renames, renameAll(renames, tree.body));
      this.revisitTreeForScopes(tree);
      tree = callFunc();

    } else {
      let iifeParameterList = [];
      let iifeArgumentList = [];
      let renames = [];
      let initializer = null;
      // switch to var and rename variables, holding them in potential
      // iife argument/parameter list
      if (tree.initializer) {
        if (tree.initializer.type === VARIABLE_DECLARATION_LIST &&
            tree.initializer.declarationType !== VAR) {
          initializer = new VariableDeclarationList(null, VAR,
              tree.initializer.declarations.map((declaration) => {
                let origName = this.getVariableName_(declaration);
                let newName = this.newNameFromOrig(origName, renames);

                iifeArgumentList.push(createIdentifierExpression(newName));
                iifeParameterList.push(new FormalParameter(null,
                    new BindingElement(null,
                        createBindingIdentifier(origName), null), null, []));

                let bindingIdentifier = createBindingIdentifier(newName);
                this.scope_.renameBinding(origName, bindingIdentifier,
                    VAR, this.reporter_);
                return new VariableDeclaration(null,
                    bindingIdentifier, null, declaration.initializer);
              }));

          initializer = renameAll(renames, initializer);
        } else  {
          initializer = this.transformAny(tree.initializer);
        }
      }

      // the loop might already have a label, let's keep it with us
      let loopLabel = this.labelledLoops_.get(tree);

      let iifeInfo = FnExtractAbruptCompletions.createIIFE(
          this.idGenerator_, tree.body, iifeParameterList, iifeArgumentList,
          () => {
            return loopLabel = loopLabel || createIdentifierToken(
                this.idGenerator_.generateUniqueIdentifier());
          }, this.scope_.inGenerator);

      tree = loopFactory(initializer, renames, iifeInfo.loopBody);

      if (loopLabel) {
        tree = new LabelledStatement(tree.location, loopLabel, tree);
      }

      tree = new AnonBlock(tree.location, [iifeInfo.variableStatements, tree]);

      this.revisitTreeForScopes(tree);
      tree = this.transformAny(tree);
    }

    if (initializerIsBlockBinding) {
      tree = this.flushRenames(tree);
      this.popScope(scope);
    }
    return tree;
  }

  transformForInStatement(tree) {
    return this.transformLoop_((t) => super.transformForInStatement(t), tree,
        (initializer, renames, body) => new ForInStatement(tree.location,
            initializer, renameAll(renames, tree.collection), body)
    );
  }

  transformForStatement(tree) {
    return this.transformLoop_((t) => super.transformForStatement(t), tree,
        (initializer, renames, body) => new ForStatement(tree.location,
            initializer, renameAll(renames, tree.condition),
            renameAll(renames, tree.increment), body)
    );
  }

  transformWhileStatement(tree) {
    return this.transformLoop_((t) => super.transformWhileStatement(t), tree,
        (initializer, renames, body) => new WhileStatement(tree.location,
            renameAll(renames, tree.condition), body)
    );
  }

  transformDoWhileStatement(tree) {
    return this.transformLoop_((t) => super.transformDoWhileStatement(t), tree,
        (initializer, renames, body) => new DoWhileStatement(tree.location,
            body, renameAll(renames, tree.condition))
    );
  }

  // We want to keep track of loops with labels.
  // If transforming them doesn't result in a statement (AnonBlock),
  // then remove the label from here
  transformLabelledStatement(tree) {
    if (tree.statement.isIterationStatement()) {
      this.labelledLoops_.set(tree.statement, tree.name.value);
      let statement = this.transformAny(tree.statement);
      if (!statement.isStatement()) {
        return statement;
      }
      if (statement === tree.statement) {
        return tree;
      }
      return new LabelledStatement(tree.location, tree.name, statement);
    }
    return super.transformLabelledStatement(tree);
  }
}

class Rename {
  /**
   * @param {string} oldName
   * @param {string} newName
   */
  constructor(oldName, newName) {
    this.oldName = oldName;
    this.newName = newName;
  }
}

/**
 * @param {Array.<Rename>} renames
 * @param {ParseTree} tree
 * @return {ParseTree}
 */
function renameAll(renames, tree) {
  renames.forEach((rename) => {
    tree = AlphaRenamer.rename(tree, rename.oldName, rename.newName);
  });
  return tree;
}

/**
 * FindBlockBindingInLoop class that finds if a tree contains both a
 * BlockBinding declaration (i.e. let/const) AND a function that might
 * depend on them.
 */
class FindBlockBindingInLoop extends FindVisitor {

  constructor(tree, scopeBuilder) {
    super();
    this.scopeBuilder_ = scopeBuilder;
    // Not all Loop Statements have a scope, but all their block bodies should.
    // Example: a For Loop with no initializer, or one that uses 'var' doesn't
    // have a Scope. Neither does a While Loop.
    // We still try to get the scope of a Loop if it's available, because
    // it might have block binding in its initializer that we can't ignore.
    this.topScope_ = scopeBuilder.getScopeForTree(tree) ||
        scopeBuilder.getScopeForTree(tree.body);
    this.outOfScope_ = null;
    this.acceptLoop_ = tree.isIterationStatement();
  }

  visitForInStatement(tree) {
    this.visitLoop_(tree, () => super.visitForInStatement(tree));
  }
  visitForStatement(tree) {
    this.visitLoop_(tree, () => super.visitForStatement(tree));
  }
  visitWhileStatement(tree) {
    this.visitLoop_(tree, () => super.visitWhileStatement(tree));
  }
  visitDoWhileStatement(tree) {
    this.visitLoop_(tree, () => super.visitDoWhileStatement(tree));
  }
  visitLoop_(tree, func) {
    if (this.acceptLoop_) {
      this.acceptLoop_ = false;
    } else if (!this.outOfScope_) {
      this.outOfScope_ = this.scopeBuilder_.getScopeForTree(tree) ||
          this.scopeBuilder_.getScopeForTree(tree.body);
    }
    func();
  }

  visitArrowFunction(tree) {this.visitFunction_(tree);}
  visitFunctionDeclaration(tree) {this.visitFunction_(tree);}
  visitFunctionExpression(tree) {this.visitFunction_(tree);}
  visitGetAccessor(tree) {this.visitFunction_(tree);}
  visitMethod(tree) {this.visitFunction_(tree);}
  visitSetAccessor(tree) {this.visitFunction_(tree);}
  visitFunction_(tree) {
    this.found = new FindIdentifiers(tree,
        (identifierToken, identScope) => {
          identScope = this.scopeBuilder_.getScopeForTree(identScope);
          let fnScope = this.outOfScope_ ||
              this.scopeBuilder_.getScopeForTree(tree);
          if (identScope.hasLexicalBindingName(identifierToken)) {
            return false;
          }

          while (identScope !== fnScope && (identScope = identScope.parent)) {
            if (identScope.hasLexicalBindingName(identifierToken)) {
              return false;
            }
          }

          while (fnScope = fnScope.parent) {
            if (fnScope.hasLexicalBindingName(identifierToken)) {
              return true;
            }
            if (fnScope.hasVariableBindingName(identifierToken)) {
              return false;
            }
            if (fnScope === this.topScope_) break;
          }
          return false;
        }).found;
  }
}
