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

import {NewExpression} from '../syntax/trees/ParseTrees.js';
import {ParseTreeVisitor} from './ParseTreeVisitor.js';
import {TreeWriter} from '../outputgeneration/TreeWriter.js';
import {
  AMPERSAND,
  AMPERSAND_EQUAL,
  AND,
  BAR,
  BAR_EQUAL,
  CARET,
  CARET_EQUAL,
  CLOSE_ANGLE,
  EQUAL,
  EQUAL_EQUAL,
  EQUAL_EQUAL_EQUAL,
  GREATER_EQUAL,
  IDENTIFIER,
  IN,
  INSTANCEOF,
  LEFT_SHIFT,
  LEFT_SHIFT_EQUAL,
  LESS_EQUAL,
  MINUS,
  MINUS_EQUAL,
  NOT_EQUAL,
  NOT_EQUAL_EQUAL,
  NUMBER,
  OPEN_ANGLE,
  OR,
  PERCENT,
  PERCENT_EQUAL,
  PLUS,
  PLUS_EQUAL,
  RIGHT_SHIFT,
  RIGHT_SHIFT_EQUAL,
  SLASH,
  SLASH_EQUAL,
  STAR,
  STAR_EQUAL,
  STAR_STAR,
  STAR_STAR_EQUAL,
  STRING,
  UNSIGNED_RIGHT_SHIFT,
  UNSIGNED_RIGHT_SHIFT_EQUAL,
  YIELD
} from './TokenType.js';
import {
  ARRAY_PATTERN,
  ASSIGNMENT_ELEMENT,
  BINDING_ELEMENT,
  BINDING_IDENTIFIER,
  BLOCK,
  CASE_CLAUSE,
  CATCH,
  CLASS_DECLARATION,
  COMPUTED_PROPERTY_NAME,
  DEFAULT_CLAUSE,
  EXPORT_DEFAULT,
  EXPORT_SPECIFIER,
  EXPORT_SPECIFIER_SET,
  EXPORT_STAR,
  FINALLY,
  FORMAL_PARAMETER,
  FORMAL_PARAMETER_LIST,
  FORWARD_DEFAULT_EXPORT,
  FUNCTION_BODY,
  FUNCTION_DECLARATION,
  GET_ACCESSOR,
  IDENTIFIER_EXPRESSION,
  IMPORTED_BINDING,
  IMPORT_CLAUSE_PAIR,
  IMPORT_SPECIFIER_SET,
  IMPORT_TYPE_CLAUSE,
  JSX_ATTRIBUTE,
  JSX_ELEMENT_NAME,
  JSX_ELEMENT,
  JSX_PLACEHOLDER,
  JSX_SPREAD_ATTRIBUTE,
  JSX_TEXT,
  LITERAL_PROPERTY_NAME,
  METHOD,
  MODULE_SPECIFIER,
  NAMED_EXPORT,
  NAME_SPACE_EXPORT,
  NAME_SPACE_IMPORT,
  OBJECT_PATTERN,
  OBJECT_PATTERN_FIELD,
  PROPERTY_NAME_ASSIGNMENT,
  PROPERTY_NAME_SHORTHAND,
  PROPERTY_VARIABLE_DECLARATION,
  REST_PARAMETER,
  SET_ACCESSOR,
  SPREAD_EXPRESSION,
  TEMPLATE_LITERAL_PORTION,
  TEMPLATE_SUBSTITUTION,
  TYPE_ALIAS_DECLARATION,
  TYPE_ARGUMENTS,
  TYPE_NAME,
  TYPE_PARAMETER,
  TYPE_PARAMETERS,
  VARIABLE_DECLARATION_LIST,
  VARIABLE_STATEMENT
} from './trees/ParseTreeType.js';
import {assert} from '../util/assert.js';

/*
TODO: add contextual information to the validator so we can check
non-local grammar rules, such as:
 * operator precedence
 * expressions with or without "in"
 * return statements must be in a function
 * break must be enclosed in loops or switches
 * continue must be enclosed in loops
 * function declarations must have non-null names
   (optional for function expressions)
*/

/**
 * An error thrown when an invalid parse tree is encountered. This error is
 * used internally to distinguish between errors in the Validator itself vs
 * errors it threw to unwind the call stack.
 *
 * @param {ParseTree} tree
 * @param {string} message
 */
class ValidationError extends Error {
  constructor(tree, message) {
    super();
    this.tree = tree;
    this.message = message;
  }
}

/**
 * Validates a parse tree
 */
export class ParseTreeValidator extends ParseTreeVisitor {
  /**
   * @param {ParseTree} tree
   * @param {string} message
   */
  fail_(tree, message) {
    throw new ValidationError(tree, message);
  }

  /**
   * @param {boolean} condition
   * @param {ParseTree} tree
   * @param {string} message
   */
  check_(condition, tree, message) {
    if (!condition) {
      this.fail_(tree, message);
    }
  }

  /**
   * @param {boolean} condition
   * @param {ParseTree} tree
   * @param {string} message
   */
  checkVisit_(condition, tree, message) {
    this.check_(condition, tree, message);
    this.visitAny(tree);
  }

  /**
   * @param {ParseTreeType} type
   * @param {ParseTree} tree
   * @param {string} message
   */
  checkType_(type, tree, message) {
    this.checkVisit_(tree.type === type, tree, message);
  }

  /**
   * @param {ArgumentList} tree
   */
  visitArgumentList(tree) {
    for (let i = 0; i < tree.args.length; i++) {
      let argument = tree.args[i];
      this.checkVisit_(argument.isAssignmentOrSpread(), argument,
          'assignment or spread expected');
    }
  }

  /**
   * @param {ArrayLiteral} tree
   */
  visitArrayLiteral(tree) {
    for (let i = 0; i < tree.elements.length; i++) {
      let element = tree.elements[i];
      this.checkVisit_(element === null || element.isAssignmentOrSpread(),
          element, 'assignment or spread expected');
    }
  }

  /**
   * @param {ArrayPattern} tree
   */
  visitArrayPattern(tree) {
    for (let i = 0; i < tree.elements.length; i++) {
      let element = tree.elements[i];
      this.checkVisit_(element === null ||
          element.type === BINDING_ELEMENT ||
          element.type === ASSIGNMENT_ELEMENT ||
          element.isLeftHandSideExpression() ||
          element.isPattern() ||
          element.isSpreadPatternElement(),
          element,
          'null, sub pattern, left hand side expression or spread expected');

      if (element && element.isSpreadPatternElement()) {
        this.check_(i === (tree.elements.length - 1), element,
            'spread in array patterns must be the last element');
      }
    }
  }

  /**
   * @param {BinaryExpression} tree
   */
  visitBinaryExpression(tree) {
    switch (tree.operator.type) {
      // assignment
      case EQUAL:
      case STAR_EQUAL:
      case STAR_STAR_EQUAL:
      case SLASH_EQUAL:
      case PERCENT_EQUAL:
      case PLUS_EQUAL:
      case MINUS_EQUAL:
      case LEFT_SHIFT_EQUAL:
      case RIGHT_SHIFT_EQUAL:
      case UNSIGNED_RIGHT_SHIFT_EQUAL:
      case AMPERSAND_EQUAL:
      case CARET_EQUAL:
      case BAR_EQUAL:
        this.check_(tree.left.isLeftHandSideExpression() ||
            tree.left.isPattern(),
            tree.left,
            'left hand side expression or pattern expected');
        this.check_(tree.right.isAssignmentExpression(),
            tree.right,
            'assignment expression expected');
        break;

      // logical
      case AND:
      case OR:
      case BAR:
      case CARET:
      case AMPERSAND:

      // equality
      case EQUAL_EQUAL:
      case NOT_EQUAL:
      case EQUAL_EQUAL_EQUAL:
      case NOT_EQUAL_EQUAL:

      // relational
      case OPEN_ANGLE:
      case CLOSE_ANGLE:
      case GREATER_EQUAL:
      case LESS_EQUAL:
      case INSTANCEOF:
      case IN:

      // shift
      case LEFT_SHIFT:
      case RIGHT_SHIFT:
      case UNSIGNED_RIGHT_SHIFT:

      // additive
      case PLUS:
      case MINUS:

      // multiplicative
      case STAR:
      case SLASH:
      case PERCENT:

      // exponentiation
      case STAR_STAR:
        this.check_(tree.left.isAssignmentExpression(), tree.left,
            'assignment expression expected');
        this.check_(tree.right.isAssignmentExpression(), tree.right,
            'assignment expression expected');
        break;

      default:
        this.fail_(tree, 'unexpected binary operator');
    }
    this.visitAny(tree.left);
    this.visitAny(tree.right);
  }

  /**
   * @param {BindingElement} tree
   */
  visitBindingElement(tree) {
    let binding = tree.binding;
    this.checkVisit_(
        binding.type === BINDING_IDENTIFIER ||
        binding.type === OBJECT_PATTERN ||
        binding.type === ARRAY_PATTERN,
        binding,
        'expected valid binding element');
    this.visitAny(tree.initializer);
  }

  /**
   * @param {AssignmentElement} tree
   */
  visitAssignmentElement(tree) {
    let assignment = tree.assignment;
    this.checkVisit_(
        assignment.type === OBJECT_PATTERN ||
        assignment.type === ARRAY_PATTERN ||
        assignment.isLeftHandSideExpression(),
        assignment,
        'expected valid assignment element');
    this.visitAny(tree.initializer);
  }

  /**
   * @param {Block} tree
   */
  visitBlock(tree) {
    for (let i = 0; i < tree.statements.length; i++) {
      let statement = tree.statements[i];
      this.checkVisit_(statement.isStatementListItem(), statement,
          'statement or function declaration expected');
    }
  }

  /**
   * @param {CallExpression} tree
   */
  visitCallExpression(tree) {
    this.check_(tree.operand.isMemberExpression(),
                tree.operand,
                'member expression expected');
    if (tree.operand instanceof NewExpression) {
      this.check_(tree.operand.args !== null, tree.operand,
          'new args expected');
    }
    this.visitAny(tree.operand);
    this.visitAny(tree.args);
  }

  /**
   * @param {CaseClause} tree
   */
  visitCaseClause(tree) {
    this.checkVisit_(tree.expression.isExpression(), tree.expression,
        'expression expected');
    for (let i = 0; i < tree.statements.length; i++) {
      let statement = tree.statements[i];
      this.checkVisit_(statement.isStatementListItem(), statement,
          'statement expected');
    }
  }

  /**
   * @param {Catch} tree
   */
  visitCatch(tree) {
    this.checkVisit_(tree.binding.isPattern() ||
        tree.binding.type === BINDING_IDENTIFIER,
        tree.binding, 'binding identifier expected');
    this.checkVisit_(tree.catchBody.type === BLOCK,
        tree.catchBody, 'block expected');
  }

  /**
   * @param {ClassDeclaration} tree
   */
  visitClassDeclaration(tree) {
    this.visitClassShared_(tree);
  }

  /**
   * @param {ClassExpression} tree
   */
  visitClassExpression(tree) {
    this.visitClassShared_(tree);
  }

  visitClassShared_(tree) {
    if (tree.typeParameters) {
      this.checkVisit_(
          tree.typeParameters.type === TYPE_PARAMETERS,
          tree.typeParameters,
          'type parameters expected');
    }
    for (let i = 0; i < tree.elements.length; i++) {
      let element = tree.elements[i];
      switch (element.type) {
        case GET_ACCESSOR:
        case SET_ACCESSOR:
        case METHOD:
        case PROPERTY_VARIABLE_DECLARATION:
          break;
        default:
          this.fail_(element, 'class element expected');
      }
      this.visitAny(element);
    }
  }


  /**
   * @param {CommaExpression} tree
   */
  visitCommaExpression(tree) {
    for (let i = 0; i < tree.expressions.length; i++) {
      let expression = tree.expressions[i];
      this.checkVisit_(expression.isExpression(), expression,
          'expression expected');
    }
  }

  /**
   * @param {ConditionalExpression} tree
   */
  visitConditionalExpression(tree) {
    this.checkVisit_(tree.condition.isAssignmentExpression(), tree.condition,
        'expression expected');
    this.checkVisit_(tree.left.isAssignmentExpression(), tree.left,
        'expression expected');
    this.checkVisit_(tree.right.isAssignmentExpression(), tree.right,
        'expression expected');
  }

  visitCoverFormals(tree) {
    this.fail_(tree, 'CoverFormals should have been removed');
  }

  visitCoverInitializedName(tree) {
    this.fail_(tree, 'CoverInitializedName should have been removed');
  }

  /**
   * @param {DefaultClause} tree
   */
  visitDefaultClause(tree) {
    for (let i = 0; i < tree.statements.length; i++) {
      let statement = tree.statements[i];
      this.checkVisit_(statement.isStatementListItem(), statement,
          'statement expected');
    }
  }

  /**
   * @param {DoWhileStatement} tree
   */
  visitDoWhileStatement(tree) {
    this.checkVisit_(tree.body.isStatement(), tree.body,
        'statement expected');
    this.checkVisit_(tree.condition.isExpression(), tree.condition,
        'expression expected');
  }

  /**
   * @param {ExportDeclaration} tree
   */
  visitExportDeclaration(tree) {
    let declType = tree.declaration.type;
    this.checkVisit_(
        declType === VARIABLE_STATEMENT ||
        declType === FUNCTION_DECLARATION ||
        declType === CLASS_DECLARATION ||
        declType === NAMED_EXPORT ||
        declType === EXPORT_DEFAULT ||
        declType === TYPE_ALIAS_DECLARATION,
        tree.declaration,
        'expected valid export tree');
  }

  /**
   * @param {NamedExport} tree
   */
  visitNamedExport(tree) {
    let specifierType = tree.exportClause.type;
    this.checkVisit_(specifierType === EXPORT_SPECIFIER ||
                     specifierType === EXPORT_SPECIFIER_SET ||
                     specifierType === EXPORT_STAR ||
                     specifierType === FORWARD_DEFAULT_EXPORT ||
                     specifierType === NAME_SPACE_EXPORT,
                     tree.exportClause,
                     'Invalid export clause');
    if (tree.moduleSpecifier) {
      this.checkVisit_(
          tree.moduleSpecifier.type === MODULE_SPECIFIER,
          tree.moduleSpecifier,
          'module expression expected');
    }
  }

  /**
   * @param {ExportSpecifierSet} tree
   */
  visitExportSpecifierSet(tree) {
    this.check_(tree.specifiers.length > 0, tree,
        'expected at least one identifier');
    for (let i = 0; i < tree.specifiers.length; i++) {
      let specifier = tree.specifiers[i];
      this.checkVisit_(
          specifier.type === EXPORT_SPECIFIER ||
          specifier.type === IDENTIFIER_EXPRESSION,
          specifier,
          'expected valid export specifier');
    }
  }

  /**
   * @param {ExpressionStatement} tree
   */
  visitExpressionStatement(tree) {
    this.checkVisit_(tree.expression.isExpression(), tree.expression,
        'expression expected');
  }

  /**
   * @param {Finally} tree
   */
  visitFinally(tree) {
    this.checkVisit_(tree.block.type === BLOCK, tree.block,
        'block expected');
  }

  /**
   * @param {ForOfStatement} tree
   */
  visitForOfStatement(tree) {
    this.checkVisit_(
      tree.initializer.isPattern() ||
      tree.initializer.type === IDENTIFIER_EXPRESSION ||
      tree.initializer.type === VARIABLE_DECLARATION_LIST &&
      tree.initializer.declarations.length === 1,
        tree.initializer,
        'for-each statement may not have more than one variable declaration');
    this.checkVisit_(tree.collection.isExpression(), tree.collection,
        'expression expected');
    this.checkVisit_(tree.body.isStatement(), tree.body,
        'statement expected');
  }

  /**
   * @param {ForInStatement} tree
   */
  visitForInStatement(tree) {
    if (tree.initializer.type === VARIABLE_DECLARATION_LIST) {
      this.checkVisit_(
          tree.initializer.declarations.length <=
              1,
          tree.initializer,
          'for-in statement may not have more than one variable declaration');
    } else {
      this.checkVisit_(tree.initializer.isPattern() ||
                       tree.initializer.isExpression(),
                       tree.initializer,
                       'variable declaration, expression or ' +
                       'pattern expected');
    }
    this.checkVisit_(tree.collection.isExpression(), tree.collection,
        'expression expected');
    this.checkVisit_(tree.body.isStatement(), tree.body,
        'statement expected');
  }

  /**
   * @param {FormalParameterList} tree
   */
  visitFormalParameterList(tree) {
    for (let i = 0; i < tree.parameters.length; i++) {
      let parameter = tree.parameters[i];
      assert(parameter.type === FORMAL_PARAMETER)
      parameter = parameter.parameter;

      switch (parameter.type) {
        case BINDING_ELEMENT:
          break;

        case REST_PARAMETER:
          this.checkVisit_(
              i === tree.parameters.length - 1, parameter,
              'rest parameters must be the last parameter in a parameter list');
          this.checkType_(BINDING_IDENTIFIER,
                          parameter.identifier,
                          'binding identifier expected');
          break;

        default:
          this.fail_(parameter, 'parameters must be identifiers or rest' +
              ` parameters. Found: ${parameter.type}`);
          break;
      }
      this.visitAny(parameter);
    }
  }

  /**
   * @param {ForStatement} tree
   */
  visitForStatement(tree) {
    if (tree.initializer !== null) {
      this.checkVisit_(
          tree.initializer.isExpression() ||
          tree.initializer.type === VARIABLE_DECLARATION_LIST,
          tree.initializer,
          'variable declaration list or expression expected');
    }
    if (tree.condition !== null) {
      this.checkVisit_(tree.condition.isExpression(), tree.condition,
          'expression expected');
    }
    if (tree.increment !== null) {
      this.checkVisit_(tree.increment.isExpression(), tree.increment,
          'expression expected');
    }
    this.checkVisit_(tree.body.isStatement(), tree.body,
        'statement expected');
  }

  /**
   * @param {Block} tree
   */
  visitFunctionBody(tree) {
    for (let i = 0; i < tree.statements.length; i++) {
      let statement = tree.statements[i];
      this.checkVisit_(statement.isStatementListItem(), statement,
          'statement expected');
    }
  }

  /**
   * @param {FunctionDeclaration} tree
   */
  visitFunctionDeclaration(tree) {
    this.checkType_(BINDING_IDENTIFIER,
                    tree.name,
                    'binding identifier expected');
    this.visitFunction_(tree);
  }

  /**
   * @param {FunctionExpression} tree
   */
  visitFunctionExpression(tree) {
    if (tree.name !== null) {
      this.checkType_(BINDING_IDENTIFIER,
                      tree.name,
                      'binding identifier expected');
    }
    this.visitFunction_(tree);
  }

  visitFunction_(tree) {
    this.checkType_(FORMAL_PARAMETER_LIST,
                    tree.parameterList,
                    'formal parameters expected');

    this.checkType_(FUNCTION_BODY,
                    tree.body,
                    'function body expected');
  }

  /**
   * @param {GetAccessor} tree
   */
  visitGetAccessor(tree) {
    this.checkPropertyName_(tree.name);
    this.checkType_(FUNCTION_BODY, tree.body, 'function body expected');
  }

  /**
   * @param {IfStatement} tree
   */
  visitIfStatement(tree) {
    this.checkVisit_(tree.condition.isExpression(), tree.condition,
        'expression expected');
    this.checkVisit_(tree.ifClause.isStatement(), tree.ifClause,
        'statement expected');
    if (tree.elseClause !== null) {
      this.checkVisit_(tree.elseClause.isStatement(), tree.elseClause,
          'statement expected');
    }
  }

  visitImportDeclaration(tree) {
    if (tree.importClause !== null) {
      this.check_(tree.importClause.type === NAME_SPACE_IMPORT ||
                  tree.importClause.type === IMPORTED_BINDING ||
                  tree.importClause.type === IMPORT_SPECIFIER_SET ||
                  tree.importClause.type === IMPORT_CLAUSE_PAIR ||
                  tree.importClause.type === IMPORT_TYPE_CLAUSE,
                  tree.importClause,
                  'Invalid import clause');
    }
    this.checkType_(MODULE_SPECIFIER, tree.moduleSpecifier,
                    'module specifier expected');
  }

  visitImportSpecifier(tree) {
    this.checkType_(IMPORTED_BINDING, tree.binding, 'ImportedBinding expected');
  }

  visitImportedBinding(tree) {
    this.checkType_(BINDING_IDENTIFIER, tree.binding,
                    'binding identifier expected');
  }

  visitImportClausePair(tree) {
    this.checkType_(IMPORTED_BINDING, tree.first, 'ImportedBinding expected');
    this.check_(tree.second.type === NAME_SPACE_IMPORT ||
                tree.second.type === IMPORT_SPECIFIER_SET,
                tree.second,
                'Invalid import clause');
  }

  visitJsxElement(tree) {
    this.checkType_(JSX_ELEMENT_NAME, tree.name, 'JSX Element Name expected');
    for (let i = 0; i < tree.attributes.length; i++) {
      let attr = tree.attributes[i];
      this.checkVisit_(attr.type === JSX_ATTRIBUTE ||
                       attr.type === JSX_SPREAD_ATTRIBUTE,
                       attr,
                       'JSX Attribute expected');
    }
    for (let i = 0; i < tree.children.length; i++) {
      let child = tree.children[i];
      this.checkVisit_(child.type === JSX_ELEMENT ||
                       child.type === JSX_PLACEHOLDER ||
                       child.type === JSX_TEXT, child,
                       'JSX child expected');
    }

  }

  /**
   * @param {LabelledStatement} tree
   */
  visitLabelledStatement(tree) {
    this.checkVisit_(tree.statement.isStatement(), tree.statement,
        'statement expected');
  }

  /**
   * @param {MemberExpression} tree
   */
  visitMemberExpression(tree) {
    this.check_(tree.operand.isMemberExpression(), tree.operand,
        'member expression expected');
    if (tree.operand instanceof NewExpression) {
      this.check_(tree.operand.args !== null, tree.operand,
          'new args expected');
    }
    this.visitAny(tree.operand);
  }

  /**
   * @param {MemberLookupExpression} tree
   */
  visitMemberLookupExpression(tree) {
    this.check_(tree.operand.isMemberExpression(),
                tree.operand,
                'member expression expected');
    if (tree.operand instanceof NewExpression) {
      this.check_(tree.operand.args !== null, tree.operand,
          'new args expected');
    }
    this.visitAny(tree.operand);
  }

  /**
   * @param {SyntaxErrorTree} tree
   */
  visitSyntaxErrorTree(tree) {
    this.fail_(tree, `parse tree contains SyntaxError: ${tree.message}`);
  }

  /**
   * @param {ModuleSpecifier} tree
   */
  visitModuleSpecifier(tree) {
    this.check_(tree.token.type === STRING, tree,
                'string or identifier expected');
  }

  /**
   * @param {NewExpression} tree
   */
  visitNewExpression(tree) {
    this.checkVisit_(tree.operand.isMemberExpression(),
                     tree.operand,
                     'member expression expected');
    this.visitAny(tree.args);
  }

  /**
   * @param {ObjectLiteral} tree
   */
  visitObjectLiteral(tree) {
    for (let i = 0; i < tree.propertyNameAndValues.length; i++) {
      let propertyNameAndValue = tree.propertyNameAndValues[i];
      switch (propertyNameAndValue.type) {
        case GET_ACCESSOR:
        case SET_ACCESSOR:
        case METHOD:
          this.check_(!propertyNameAndValue.isStatic, propertyNameAndValue,
                      'static is not allowed in object literal expression');
          break;
        case PROPERTY_NAME_ASSIGNMENT:
        case PROPERTY_NAME_SHORTHAND:
        case SPREAD_EXPRESSION:
          break;
        default:
          this.fail_(propertyNameAndValue, 'accessor, property name ' +
              'assignment or property method assigment expected');
      }
      this.visitAny(propertyNameAndValue);
    }
  }

  /**
   * @param {ObjectPattern} tree
   */
  visitObjectPattern(tree) {
    for (let i = 0; i < tree.fields.length; i++) {
      let field = tree.fields[i];
      this.checkVisit_(field.type === OBJECT_PATTERN_FIELD ||
                       field.type === ASSIGNMENT_ELEMENT ||
                       field.type === BINDING_ELEMENT,
                       field,
                       'object pattern field expected');
    }
  }

  /**
   * @param {ObjectPatternField} tree
   */
  visitObjectPatternField(tree) {
    this.checkPropertyName_(tree.name);
    this.checkVisit_(tree.element.type === ASSIGNMENT_ELEMENT ||
                     tree.element.type === BINDING_ELEMENT ||
                     tree.element.isPattern() ||
                     tree.element.isLeftHandSideExpression(),
                     tree.element,
                     'binding element expected');
  }

  /**
   * @param {ParenExpression} tree
   */
  visitParenExpression(tree) {
    if (tree.expression.isPattern()) {
      this.visitAny(tree.expression);
    } else {
      this.checkVisit_(tree.expression.isExpression(), tree.expression,
          'expression expected');
    }
  }

  /**
   * @param {PostfixExpression} tree
   */
  visitPostfixExpression(tree) {
    this.checkVisit_(tree.operand.isAssignmentExpression(), tree.operand,
        'assignment expression expected');
  }

  /**
   * @param {PredefinedType} tree
   */
  visitPredefinedType(tree) {
    // TODO(peterhal): Implement.
  }

  /**
   * @param {Script} tree
   */
  visitScript(tree) {
    for (let i = 0; i < tree.scriptItemList.length; i++) {
      let scriptItemList = tree.scriptItemList[i];
      this.checkVisit_(scriptItemList.isScriptElement(),
          scriptItemList,
          'global script item expected');
    }
  }

  checkPropertyName_(tree) {
    this.checkVisit_(
        tree.type === LITERAL_PROPERTY_NAME ||
        tree.type === COMPUTED_PROPERTY_NAME,
        tree,
        'property name expected');
  }

  /**
   * @param {PropertyNameAssignment} tree
   */
  visitPropertyNameAssignment(tree) {
    this.checkPropertyName_(tree.name);
    this.checkVisit_(tree.value.isAssignmentExpression(), tree.value,
        'assignment expression expected');
  }

  /**
   * @param {PropertyNameShorthand} tree
   */
  visitPropertyNameShorthand(tree) {
    this.check_(tree.name.type === IDENTIFIER ||
                tree.name.type === YIELD ||
                tree.name.isStrictKeyword(),
                tree,
                'identifier token expected');
  }

  /**
   * @param {LiteralPropertyName} tree
   */
  visitLiteralPropertyName(tree) {
    let type = tree.literalToken.type;
    this.check_(tree.literalToken.isKeyword() ||
        type === IDENTIFIER ||
        type === NUMBER ||
        type === STRING,
        tree,
        'Unexpected token in literal property name');
  }

  /**
   * @param {TemplateLiteralExpression} tree
   */
  visitTemplateLiteralExpression(tree) {
    if (tree.operand) {
      this.checkVisit_(tree.operand.isMemberExpression(), tree.operand,
                       'member or call expression expected');
    }

    // The elements are alternating between TemplateLiteralPortion and
    // TemplateSubstitution.
    for (let i = 0; i < tree.elements.length; i++) {
      let element = tree.elements[i];
      if (i % 2) {
        this.checkType_(TEMPLATE_SUBSTITUTION,
                        element,
                        'Template literal substitution expected');
      } else {
        this.checkType_(TEMPLATE_LITERAL_PORTION,
                        element,
                        'Template literal portion expected');

      }
    }
  }

  /**
   * @param {ReturnStatement} tree
   */
  visitReturnStatement(tree) {
    if (tree.expression !== null) {
      this.checkVisit_(tree.expression.isExpression(), tree.expression,
          'expression expected');
    }
  }

  /**
   * @param {SetAccessor} tree
   */
  visitSetAccessor(tree) {
    this.checkPropertyName_(tree.name);
    this.checkType_(FUNCTION_BODY, tree.body, 'function body expected');
  }

  /**
   * @param {SpreadExpression} tree
   */
  visitSpreadExpression(tree) {
    this.checkVisit_(tree.expression.isAssignmentExpression(),
        tree.expression,
        'assignment expression expected');
  }

  /**
   * @param {StateMachine} tree
   */
  visitStateMachine(tree) {
    this.fail_(tree, 'State machines are never valid outside of the ' +
        'GeneratorTransformer pass.');
  }

  /**
   * @param {SwitchStatement} tree
   */
  visitSwitchStatement(tree) {
    this.checkVisit_(tree.expression.isExpression(), tree.expression,
        'expression expected');
    let defaultCount = 0;
    for (let i = 0; i < tree.caseClauses.length; i++) {
      let caseClause = tree.caseClauses[i];
      if (caseClause.type === DEFAULT_CLAUSE) {
        ++defaultCount;
        this.checkVisit_(defaultCount <= 1, caseClause,
            'no more than one default clause allowed');
      } else {
        this.checkType_(CASE_CLAUSE,
                        caseClause, 'case or default clause expected');
      }
    }
  }

  /**
   * @param {ThrowStatement} tree
   */
  visitThrowStatement(tree) {
    if (tree.value === null) {
      return;
    }
    this.checkVisit_(tree.value.isExpression(), tree.value,
        'expression expected');
  }

  /**
   * @param {TryStatement} tree
   */
  visitTryStatement(tree) {
    this.checkType_(BLOCK, tree.body, 'block expected');
    if (tree.catchBlock !== null) {
      this.checkType_(CATCH, tree.catchBlock,
                      'catch block expected');
    }
    if (tree.finallyBlock !== null) {
      this.checkType_(FINALLY, tree.finallyBlock,
                      'finally block expected');
    }
    if (tree.catchBlock === null && tree.finallyBlock === null) {
      this.fail_(tree, 'either catch or finally must be present');
    }
  }

  /**
   * @param {TypeArguments} tree
   */
  visitTypeArguments(tree) {
    let {args} = tree;
    for (let i = 0; i < args.length; i++) {
      this.checkVisit_(args[i].isType(), args[i],
                       'Type arguments must be type expressions');
    }
  }

  /**
   * @param {TypeName} tree
   */
  visitTypeName(tree) {
    this.checkVisit_(tree.moduleName === null ||
                     tree.moduleName.type === TYPE_NAME,
                     tree.moduleName,
                     'moduleName must be null or a TypeName');
    this.check_(tree.name.type === IDENTIFIER, tree,
                'name must be an identifier');
  }

  /**
   * @param {TypeReference} tree
   */
  visitTypeReference(tree) {
    this.checkType_(TYPE_NAME, tree.typeName, 'typeName must be a TypeName');
    this.checkType_(TYPE_ARGUMENTS, tree.args, 'args must be a TypeArguments');
  }

  /**
   * @param {TypeParameters} tree
   */
  visitTypeParameters(tree) {
    let {parameters} = tree;
    for (let i = 0; i < parameters.length; i++) {
      this.checkType_(TYPE_PARAMETER, parameters[i],
                      'Type parameters must all be type parameters');
    }
  }

  /**
   * @param {TypeParameter} tree
   */
  visitTypeParameter(tree) {
    this.check_(tree.identifierToken.type === IDENTIFIER, tree,
                'Type parameter must be an identifier token');
    if (tree.extendsType) {
      this.checkVisit_(tree.extendsType.isType(), tree.extendsType,
                       'extends type must be a type expression');
    }
  }

  /**
   * @param {UnaryExpression} tree
   */
  visitUnaryExpression(tree) {
    this.checkVisit_(tree.operand.isAssignmentExpression(), tree.operand,
        'assignment expression expected');
  }

  /**
   * @param {VariableDeclaration} tree
   */
  visitVariableDeclaration(tree) {
    this.checkVisit_(tree.lvalue.isPattern() ||
                     tree.lvalue.type === BINDING_IDENTIFIER,
                     tree.lvalue,
                     'binding identifier expected, found: ' + tree.lvalue.type);
    if (tree.initializer !== null) {
      this.checkVisit_(tree.initializer.isAssignmentExpression(),
          tree.initializer, 'assignment expression expected');
    }
  }

  /**
   * @param {WhileStatement} tree
   */
  visitWhileStatement(tree) {
    this.checkVisit_(tree.condition.isExpression(), tree.condition,
        'expression expected');
    this.checkVisit_(tree.body.isStatement(), tree.body,
        'statement expected');
  }

  /**
   * @param {WithStatement} tree
   */
  visitWithStatement(tree) {
    this.checkVisit_(tree.expression.isExpression(), tree.expression,
        'expression expected');
    this.checkVisit_(tree.body.isStatement(), tree.body,
        'statement expected');
  }

  /**
   * @param {YieldExpression} tree
   */
  visitYieldExpression(tree) {
    if (tree.expression !== null) {
      this.checkVisit_(tree.expression.isExpression(), tree.expression,
          'expression expected');
    }
  }
}

/**
 * Validates a parse tree.  Validation failures are compiler bugs.
 * When a failure is found, the source file is dumped to standard
 * error output and a runtime exception is thrown.
 *
 * @param {ParseTree} tree
 */
ParseTreeValidator.validate = function(tree) {
  let validator = new ParseTreeValidator();
  try {
    validator.visitAny(tree);
  } catch (e) {
    if (!(e instanceof ValidationError)) {
      throw e;
    }

    let location = null;
    if (e.tree !== null) {
      location = e.tree.location;
    }
    if (location === null) {
      location = tree.location;
    }
    let locationString = location !== null ?
        location.start.toString() :
        '(unknown)';
    throw new Error(
        `Parse tree validation failure '${e.message}' at ${locationString}:` +
        `\n\n${TreeWriter.write(tree)}\n`);
  }
};
