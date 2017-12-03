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

import {
  ARRAY_LITERAL,
  ARRAY_PATTERN,
  ASSIGNMENT_ELEMENT,
  BINDING_ELEMENT,
  BINDING_IDENTIFIER,
  BLOCK,
  CALL_EXPRESSION,
  COMPUTED_PROPERTY_NAME,
  IDENTIFIER_EXPRESSION,
  LITERAL_EXPRESSION,
  MEMBER_EXPRESSION,
  MEMBER_LOOKUP_EXPRESSION,
  OBJECT_LITERAL,
  OBJECT_PATTERN_FIELD,
  OBJECT_PATTERN,
  PAREN_EXPRESSION,
  VARIABLE_DECLARATION_LIST,
  VARIABLE_STATEMENT,
} from '../syntax/trees/ParseTreeType.js';
import {
  AnonBlock,
  AssignmentElement,
  BindingElement,
  Catch,
  ExportDeclaration,
  ForInStatement,
  ForOfStatement,
  ForOnStatement,
  VariableDeclarationList,
  VariableStatement,
} from '../syntax/trees/ParseTrees.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  EQUAL,
  LET,
  VAR
} from '../syntax/TokenType.js';
import bindingsInDestructuringPattern from '../semantics/bindingsInDestructuringPattern.js';
import {
  createAssignmentExpression,
  createBindingIdentifier,
  createBlock,
  createCommaExpression,
  createExpressionStatement,
  createFunctionBody,
  createIdentifierExpression,
  createMemberExpression,
  createMemberLookupExpression,
  createParenExpression,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement
} from './ParseTreeFactory.js';
import {parseExpression} from './PlaceholderParser.js';
import {prependStatements} from './PrependStatements.js'


/**
 * Collects assignments in the desugaring of a pattern.
 */
class Desugaring {
  /**
   * @param {ParseTree} rvalue
   */
  constructor(rvalue) {
    this.rvalue = rvalue;
    this.expressions = [];
    this.pendingExpressions = [];
  }

  createIterator(iterId) {
    this.pendingExpressions.push(parseExpression
        `${iterId} = ${this.rvalue}[Symbol.iterator]()`);
  }

  createInitializer(expression) {
    if (this.pendingExpressions.length === 0) return expression;
    let expressions = this.pendingExpressions;
    this.pendingExpressions = [];
    expressions.push(expression);
    return createParenExpression(createCommaExpression(expressions));
  }

  skipHole(iterId) {
    this.pendingExpressions.push(parseExpression `${iterId}.next()`);
  }
}

/**
 * Collects assignments as assignment expressions. This is the
 * desugaring for assignment expressions.
 */
class AssignmentExpressionDesugaring extends Desugaring {
  /**
   * @param {ParseTree} rvalue
   */
  constructor(rvalue) {
    super(rvalue);
  }

  /**
   * @param {AssignmentElement|IdentifierExpression} lvalue
   * @param {ParseTree} rvalue
   */
  assign(lvalue, rvalue) {
    lvalue = lvalue instanceof AssignmentElement ? lvalue.assignment : lvalue;
    rvalue = this.createInitializer(rvalue);
    this.expressions.push(createAssignmentExpression(lvalue, rvalue));
  }

  createAssignmentExpression(tempId, rvalue) {
    let expressions = this.expressions;
    expressions.unshift(createAssignmentExpression(tempId, rvalue));
    expressions.push(...this.pendingExpressions, tempId);
    return createParenExpression(createCommaExpression(expressions));
  }
}

/**
 * Collects assignments as variable declarations. This is the
 * desugaring for 'var', 'const' declarations.
 */
class VariableDeclarationDesugaring extends Desugaring {
  /**
   * @param {ParseTree} rvalue
   */
  constructor(rvalue) {
    super(rvalue);
  }

  /**
   * @param {BindingElement|IdentifierExpression} lvalue
   * @param {ParseTree} rvalue
   */
  assign(lvalue, rvalue) {
    let binding = lvalue instanceof BindingElement ?
        lvalue.binding : createBindingIdentifier(lvalue);
    rvalue = this.createInitializer(rvalue);
    this.expressions.push(createVariableDeclaration(binding, rvalue));
  }

  get declarations() {
    return this.expressions;
  }
}

/**
 * Desugars destructuring assignment.
 *
 * @see <a href="http://wiki.ecmascript.org/doku.php?id=harmony:destructuring#assignments">harmony:destructuring</a>
 */
export class DestructuringTransformer extends
    ImportRuntimeTrait(TempVarTransformer) {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   */
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.parameterDeclarations = null;
  }

  /**
   * @param {ArrayPattern} tree
   * @return {ParseTree}
   */
  transformArrayPattern(tree) {
    // Patterns should be desugared by their parent nodes.
    throw new Error('unreachable');
  }

  /**
   * @param {ObjectPattern} tree
   * @return {ParseTree}
   */
  transformObjectPattern(tree) {
    // Patterns should be desugared by their parent nodes.
    throw new Error('unreachable');
  }

  /**
   * Transforms:
   *   [a, ...b]] = x
   * From an assignment expression into:
   *
   *  ($__0 = x,
   *   a = ($__1 = $__0[Symbol.iterator](),
   *       ($__2 = $__1.next()).done ? void 0 : $__2.value),
   *   b = $traceurRuntime.iteratorToArray($__1),
   *   $__0);
   *
   * Nested patterns are desugared by recursive calls to transform.
   *
   * @param {BinaryExpression} tree
   * @return {ParseTree}
   */
  transformBinaryExpression(tree) {
    this.pushTempScope();

    let rv;
    if (tree.operator.type === EQUAL && tree.left.isPattern()) {
      rv = this.transformAny(this.desugarAssignment_(tree.left, tree.right));
    } else {
      rv = super.transformBinaryExpression(tree);
    }

    this.popTempScope();
    return rv;
  }

  /**
   * @param {ParseTree} lvalue
   * @param {ParseTree} rvalue
   * @return {ParseTree}
   */
  desugarAssignment_(lvalue, rvalue) {
    let tempId = createIdentifierExpression(this.addTempVar());
    let desugaring = new AssignmentExpressionDesugaring(tempId);
    this.desugarPattern_(desugaring, lvalue);
    return desugaring.createAssignmentExpression(tempId, rvalue);
  }

  /**
   * Transforms:
   *   [a, [b, c]] = x
   * From a variable declaration list into:
   *   tmp = x, a = x[0], [b, c] = x[1]
   *
   * We do it this way (as opposed to a block with a declaration and
   * initialization statements) so that we can translate const
   * declarations, which must be initialised at declaration.
   *
   * Nested patterns are desugared by recursive calls to transform.
   *
   * @param {VariableDeclarationList} tree
   * @return {ParseTree}
   */
  transformVariableDeclarationList(tree) {
    if (!hasDestructuring(tree)) {
      // No lvalues to desugar.
      return super.transformVariableDeclarationList(tree);
    }

    // Desugar one level of patterns.
    let desugaredDeclarations = [];
    tree.declarations.forEach((declaration) => {
      if (declaration.lvalue.isPattern()) {
        desugaredDeclarations.push(
            ...this.desugarVariableDeclaration_(declaration));
      } else {
        desugaredDeclarations.push(declaration);
      }
    });

    // Desugar more.
    let transformedTree = this.transformVariableDeclarationList(
        createVariableDeclarationList(
            tree.declarationType,
            desugaredDeclarations));

    return transformedTree;
  }

  transformForInStatement(tree) {
    return this.transformForInOrOfOrOn_(tree,
                                        super.transformForInStatement,
                                        ForInStatement);
  }

  transformForOfStatement(tree) {
    return this.transformForInOrOfOrOn_(tree,
                                        super.transformForOfStatement,
                                        ForOfStatement);
  }

  transformForOnStatement(tree) {
    return this.transformForInOrOfOrOn_(tree,
                                        super.transformForOnStatement,
                                        ForOnStatement);
  }

  /**
   * Transforms for-in and for-of loops.
   * @param  {ForInStatement|ForOfStatement} tree The for-in or for-of loop.
   * @param  {Function} superMethod The super method to call if no pattern is
   *     present.
   * @param  {Function} constr The constructor used to create the transformed
   *     tree.
   * @return {ForInStatement|ForOfStatement} The transformed tree.
   * @private
   */
  transformForInOrOfOrOn_(tree, superMethod, constr) {
    if (!tree.initializer.isPattern() &&
        (tree.initializer.type !== VARIABLE_DECLARATION_LIST ||
         !hasDestructuring(tree.initializer))) {
      return superMethod.call(this, tree);
    }

    this.pushTempScope();

    let declarationType, lvalue;
    if (tree.initializer.isPattern()) {
      declarationType = null;
      lvalue = tree.initializer;
    } else {
      declarationType = tree.initializer.declarationType;
      lvalue = tree.initializer.declarations[0].lvalue;
    }

    // for (var pattern in coll) {
    //
    // =>
    //
    // for (var $tmp in coll) {
    //   var pattern = $tmp;
    //
    // And when the initializer is an assignment expression.
    //
    // for (pattern in coll) {
    //
    // =>
    //
    // for (var $tmp in coll) {
    //   pattern = $tmp;

    let statements = [];
    let binding = this.desugarBinding_(lvalue, statements, declarationType);
    let initializer = createVariableDeclarationList(VAR,
        binding, null);

    let collection = this.transformAny(tree.collection);
    let body = this.transformAny(tree.body);
    if (body.type === BLOCK)
      statements.push(...body.statements);
    else
      statements.push(body);
    body = createBlock(statements);

    this.popTempScope();

    return new constr(tree.location, initializer, collection, body);
  }

  transformAssignmentElement(tree) {
    // Patterns should be desugared by their parent nodes.
    throw new Error('unreachable');
  }

  transformBindingElement(tree) {
    // If this has an initializer the default parameter transformer moves the
    // pattern into the function body and it will be taken care of by the
    // variable pass.
    if (!tree.binding.isPattern() || tree.initializer)
      return tree;

    // function f(pattern) { }
    //
    // =>
    //
    // function f($tmp) {
    //   var pattern = $tmp;
    // }

    // We only get here for formal parameters. Variable declarations are handled
    // further up in the transformer without calling transformBindingElement.

    if (this.parameterDeclarations === null) {
      this.parameterDeclarations = [];
      this.pushTempScope();  // Popped in the function body.
    }

    let varName = this.getTempIdentifier();
    let binding = createBindingIdentifier(varName);
    let initializer = createIdentifierExpression(varName);
    let decl = createVariableDeclaration(tree.binding, initializer);

    this.parameterDeclarations.push(decl);

    return new BindingElement(null, binding, null);
  }

  transformFunctionBody(tree) {
    if (this.parameterDeclarations === null)
      return super.transformFunctionBody(tree);

    let list = createVariableDeclarationList(VAR, this.parameterDeclarations);
    let statement = createVariableStatement(list);
    let statements = prependStatements(tree.statements, statement);
    let newBody = createFunctionBody(statements);

    this.parameterDeclarations = null;

    let result = super.transformFunctionBody(newBody);
    this.popTempScope();
    return result;
  }

  transformCatch(tree) {
    if (!tree.binding.isPattern())
      return super.transformCatch(tree);

    // catch(pattern) {
    //
    // =>
    //
    // catch ($tmp) {
    //   let pattern = $tmp

    let body = this.transformAny(tree.catchBody);
    let statements = [];
    let kind = this.options.blockBinding ? LET : VAR;
    let binding = this.desugarBinding_(tree.binding, statements, kind);
    statements.push(...body.statements);
    return new Catch(tree.location, binding, createBlock(statements));
  }

  transformExportDeclaration(tree) {
    if (tree.declaration.type === VARIABLE_STATEMENT &&
        hasDestructuring(tree.declaration.declarations)) {
      // Make sure we do not export the temp variable bindings.
      const names = bindingsInDestructuringPattern(tree.declaration.declarations);
      const declaration = this.transformAny(tree.declaration);
      const statements = [];
      const {declarations, declarationType} = declaration.declarations;
      for (let i = 0; i < declarations.length; i++) {
        const declaration = declarations[i];
        let statement = new VariableStatement(declaration.location,
            new VariableDeclarationList(declaration.location, declarationType, [declaration]));

        if (names.has(declarations[i].lvalue.getStringValue())) {
          statement = new ExportDeclaration(statement.location, statement, []);
        }
        statements.push(statement);
      }
      return new AnonBlock(null, statements);
    }
    return super.transformExportDeclaration(tree);
  }

  /**
   * Helper for transformations that transforms a binding to a temp binding
   * as well as a statement added into a block. For example, this is used by
   * function, for-in/of and catch.
   * @param  {ParseTree} bindingTree The tree with the binding pattern.
   * @param  {Array} statements Array that we add the assignment/variable
   *     declaration to.
   * @param {TokenType?} declarationType The kind of variable declaration to
   *     generate or null if an assignment expression is to be used.
   * @return {BindingIdentifier} The binding tree.
   */
  desugarBinding_(bindingTree, statements, declarationType) {
    let varName = this.getTempIdentifier();
    let binding = createBindingIdentifier(varName);
    let idExpr = createIdentifierExpression(varName);

    let desugaring;
    if (declarationType === null)
      desugaring = new AssignmentExpressionDesugaring(idExpr);
    else
      desugaring = new VariableDeclarationDesugaring(idExpr);

    this.desugarPattern_(desugaring, bindingTree);

    if (declarationType === null) {
      statements.push(createExpressionStatement(
          createCommaExpression(desugaring.expressions)));
    } else {
      statements.push(
          createVariableStatement(
              // Desugar more.
              this.transformVariableDeclarationList(
                  createVariableDeclarationList(
                      declarationType,
                      desugaring.declarations))));
    }

    return binding;
  }

  /**
   * @param {VariableDeclaration} tree
   * @return {Array.<VariableDeclaration>}
   */
  desugarVariableDeclaration_(tree) {
    let tempRValueName = this.getTempIdentifier();
    let tempRValueIdent = createIdentifierExpression(tempRValueName);
    let desugaring;
    let initializer;

    // Don't use parens for these cases:
    // - tree.initializer is assigned to a temporary.
    // - tree.initializer normally doesn't need parens for member access.
    // Don't use temporary if:
    // - there is only one value to assign (and no initializer).
    switch (tree.initializer.type) {
      // Paren not necessary.
      case ARRAY_LITERAL:
      case CALL_EXPRESSION:
      case IDENTIFIER_EXPRESSION:
      case LITERAL_EXPRESSION:
      case MEMBER_EXPRESSION:
      case MEMBER_LOOKUP_EXPRESSION:
      case OBJECT_LITERAL:
      case PAREN_EXPRESSION:
        initializer = tree.initializer;
    }

    // [1] Try first using a temporary (used later as the base rvalue).
    desugaring = new VariableDeclarationDesugaring(tempRValueIdent);
    desugaring.assign(desugaring.rvalue, tree.initializer);
    let initializerFound = this.desugarPattern_(desugaring, tree.lvalue);

    // [2] Was the temporary necessary? Then return.
    if (initializerFound || desugaring.declarations.length > 2) {
      return desugaring.declarations;
    }

    if (!initializer) {
      initializer = createParenExpression(tree.initializer);
    }

    // [3] Redo everything without the temporary.
    desugaring = new VariableDeclarationDesugaring(initializer);
    this.desugarPattern_(desugaring, tree.lvalue);

    return desugaring.declarations;
  }

  /**
   * @param {Desugaring} desugaring
   * @param {ParseTree} tree
   * @return {boolean} True if any of the patterns have an initializer.
   */
  desugarPattern_(desugaring, tree) {
    let initializerFound = false;
    let pattern;
    switch (tree.type) {
      case ARRAY_PATTERN: {
        pattern = tree;
        this.pushTempScope();
        let iterId = createIdentifierExpression(this.addTempVar());
        let iterObjectId = createIdentifierExpression(this.addTempVar());
        desugaring.createIterator(iterId);

        for (let i = 0; i < pattern.elements.length; i++) {
          let lvalue = pattern.elements[i];
          if (lvalue === null) {
            // A skip, for example [a,,c]
            desugaring.skipHole(iterId);
            continue;
          } else if (lvalue.isSpreadPatternElement()) {
            // Rest of the array, for example [x, ...y] = [1, 2, 3]
            let iteratorToArray = this.getRuntimeExpression('iteratorToArray');
            desugaring.assign(
                lvalue.lvalue,
                parseExpression `${iteratorToArray}(${iterId})`);
          } else {
            if (lvalue.initializer) {
              initializerFound = true;
            }
            desugaring.assign(
                lvalue,
                this.createConditionalIterExpression(iterObjectId, iterId,
                                                     lvalue.initializer));
          }
        }
        this.popTempScope();
        break;
      }

      case OBJECT_PATTERN: {
        pattern = tree;

        let elementHelper = (lvalue, initializer) => {
          if (initializer)
            initializerFound = true;
          let lookup = this.createConditionalMemberExpression(desugaring.rvalue,
              lvalue, initializer);
          desugaring.assign(lvalue, lookup);
        };

        pattern.fields.forEach((field) => {
          let lookup;
          switch (field.type) {
            case ASSIGNMENT_ELEMENT:
              elementHelper(field.assignment, field.initializer);
              break;

            case BINDING_ELEMENT:
              elementHelper(field.binding, field.initializer);
              break;

            case OBJECT_PATTERN_FIELD: {
              if (field.element.initializer)
                initializerFound = true;
              let name = field.name;
              lookup = this.createConditionalMemberExpression(desugaring.rvalue,
                  name, field.element.initializer);
              desugaring.assign(field.element, lookup);
              break;
            }

            default:
              throw Error('unreachable');
          }
        });
        break;
      }

      case PAREN_EXPRESSION:
        return this.desugarPattern_(desugaring, tree.expression);

      default:
        throw new Error('unreachable');
    }

    // In case we have `var {} = expr` or `var [] = expr` we use a temp
    // variable name so that the expression still gets executed.
    //
    // AssignmentExpressionDesugaring already works.
    if (desugaring instanceof VariableDeclarationDesugaring &&
        desugaring.declarations.length === 0) {
      desugaring.assign(createBindingIdentifier(this.getTempIdentifier()),
                        desugaring.rvalue);
    }

    return initializerFound;
  }

  /**
   * Creates something like:
   *
   *   ($tmp = rvalue.ident) === undefined ? initializer : $tmp
   */
  createConditionalMemberExpression(rvalue, name, initializer) {
    if (name.type === COMPUTED_PROPERTY_NAME) {
      return this.createConditionalMemberLookupExpression(rvalue,
          name.expression, initializer);
    }

    let token;
    switch (name.type) {
      case BINDING_IDENTIFIER:
      case IDENTIFIER_EXPRESSION:
        token = name.identifierToken;
        break;
      default:
        token = name.literalToken;
    }

    if (!initializer)
      return createMemberExpression(rvalue, token);

    let tempIdent = createIdentifierExpression(this.addTempVar());

    return parseExpression `(${tempIdent} = ${rvalue}.${token}) === void 0 ?
        ${initializer} : ${tempIdent}`;
  }

  createConditionalMemberLookupExpression(rvalue, index, initializer) {
    if (!initializer)
      return createMemberLookupExpression(rvalue, index);

    let tempIdent = createIdentifierExpression(this.addTempVar());
    return parseExpression `(${tempIdent} = ${rvalue}[${index}]) === void 0 ?
        ${initializer} : ${tempIdent}`;
  }

  createConditionalIterExpression(iterObjectId, iterId, initializer) {
    let expr = parseExpression `(${iterObjectId} =
        ${iterId}.next()).done ? void 0 : ${iterObjectId}.value`;
    if (!initializer) {
      return expr;
    }
    // TODO(arv): Simplify this expression?
    let tempIdent = createIdentifierExpression(this.addTempVar());
    return parseExpression `(${tempIdent} = ${expr}) === void 0 ?
        ${initializer} : ${tempIdent}`;
  }
}

/**
 * @param {VariableDeclarationList} tree
 * @return {boolean}
 */
function hasDestructuring(tree) {
  return tree.declarations.some(
      (declaration) => declaration.lvalue.isPattern());
}
