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

import {IdentifierToken} from '../syntax/IdentifierToken.js';
import {LiteralToken} from '../syntax/LiteralToken.js';
import {
  ParseTree,
  ParseTreeType
} from '../syntax/trees/ParseTree.js';
import {
  CALL,
  CREATE,
  DEFINE_PROPERTY,
  FREEZE,
  OBJECT,
  UNDEFINED
} from '../syntax/PredefinedName.js';
import {Token} from '../syntax/Token.js';
import {
  EQUAL,
  FALSE,
  NULL,
  NUMBER,
  STRING,
  TRUE,
  VOID
} from '../syntax/TokenType.js';
import {assert} from '../util/assert.js';

import {
  ArgumentList,
  ArrayLiteral,
  BindingElement,
  BinaryExpression,
  BindingIdentifier,
  Block,
  BreakStatement,
  CallExpression,
  CaseClause,
  Catch,
  ClassDeclaration,
  CommaExpression,
  ConditionalExpression,
  ContinueStatement,
  DefaultClause,
  DoWhileStatement,
  EmptyStatement,
  ExpressionStatement,
  Finally,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FormalParameter,
  FormalParameterList,
  FunctionBody,
  FunctionExpression,
  IdentifierExpression,
  IfStatement,
  ImportedBinding,
  LiteralExpression,
  LiteralPropertyName,
  MemberExpression,
  MemberLookupExpression,
  NewExpression,
  ObjectLiteral,
  ParenExpression,
  PostfixExpression,
  Script,
  PropertyNameAssignment,
  RestParameter,
  ReturnStatement,
  SpreadExpression,
  SwitchStatement,
  ThisExpression,
  ThrowStatement,
  TryStatement,
  UnaryExpression,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
  WhileStatement,
  WithStatement
} from '../syntax/trees/ParseTrees.js';

// Helpers so we can use these on Arguments objects.
let slice = Array.prototype.slice.call.bind(Array.prototype.slice);
let map = Array.prototype.map.call.bind(Array.prototype.map);

// Tokens

/**
 * @param {TokenType} operator
 * @return {Token}
 */
export function createOperatorToken(operator) {
  return new Token(operator, null);
}

/**
 * @param {string} identifier
 * @return {IdentifierToken}
 */
export function createIdentifierToken(identifier) {
  return new IdentifierToken(null, identifier);
}

export function createStringLiteralToken(value) {
  return new LiteralToken(STRING, JSON.stringify(value), null);
}

export function createBooleanLiteralToken(value) {
  return new Token(value ? TRUE : FALSE, null);
}

export function createNullLiteralToken() {
  return new LiteralToken(NULL, 'null', null);
}

export function createNumberLiteralToken(value) {
  return new LiteralToken(NUMBER, String(value), null);
}

// Trees

/**
 * @return {FormalParameterList}
 */
export function createEmptyParameterList() {
  return new FormalParameterList(null, []);
}

export function createFormalParameter(name) {
  let bindingIdentifier = createBindingIdentifier(name);
  return new FormalParameter(
      null,
      new BindingElement(null, bindingIdentifier, null),
      null,
      []);
}

/**
 * @param {Array.<ParseTree>} list
 * @return {ArgumentList}
 */
export function createArgumentList(list) {
  return new ArgumentList(null, list);
}

/**
 * @return {ArgumentList}
 */
export function createEmptyArgumentList() {
  return createArgumentList([]);
}

/**
 * @param {Array.<ParseTree>} list
 * @return {ArrayLiteral}
 */
export function createArrayLiteral(list) {
  return new ArrayLiteral(null, list);
}

/**
 * @return {ArrayLiteral}
 */
export function createEmptyArrayLiteral() {
  return createArrayLiteral([]);
}

/**
 * @param {ParseTree} lhs
 * @param {ParseTree} rhs
 * @return {BinaryExpression}
 */
export function createAssignmentExpression(lhs, rhs) {
  return new BinaryExpression(null, lhs,
      createOperatorToken(EQUAL), rhs);
}

/**
 * @return {BinaryExpression}
 */
export function createBinaryExpression(left, operator, right) {
  return new BinaryExpression(null, left, operator, right);
}

/**
 * @param {string|IdentifierToken|IdentifierExpression|BindingIdentifier}
 *     identifier
 * @return {BindingIdentifier}
 */
export function createBindingIdentifier(identifier) {
  if (typeof identifier === 'string')
    identifier = createIdentifierToken(identifier);
  else if (identifier.type === ParseTreeType.BINDING_IDENTIFIER)
    return identifier;
  else if (identifier.type === ParseTreeType.IDENTIFIER_EXPRESSION)
    return new BindingIdentifier(identifier.location,
                                 identifier.identifierToken);
  return new BindingIdentifier(null, identifier);
}

export function createImportedBinding(name) {
  let bindingIdentifier = createBindingIdentifier(name);
  return new ImportedBinding(bindingIdentifier.location, bindingIdentifier);
}

/**
 * @return {EmptyStatement}
 */
export function createEmptyStatement() {
  return new EmptyStatement(null);
}

/**
 * @return {Block}
 */
export function createEmptyBlock() {
  return createBlock([]);
}

/**
 * @param {Array.<ParseTree>} statements
 * @return {Block}
 */
export function createBlock(statements) {
  return new Block(null, statements);
}

/**
 * @param {Array.<ParseTree>} statements
 * @return {FunctionBody}
 */
export function createFunctionBody(statements) {
  return new FunctionBody(null, statements);
}

/**
 * @param {FunctionBody} body
 * @return {CallExpression}
 */
export function createScopedExpression(body, scope) {
  assert(body.type === 'FUNCTION_BODY');
  return createCallCall(
      createParenExpression(
          createFunctionExpression(createEmptyParameterList(), body)),
      scope);
}

/**
 * @param {FunctionBody} body
 * @return {CallExpression}
 */
export function createImmediatelyInvokedFunctionExpression(body) {
  assert(body.type === 'FUNCTION_BODY');
  return createCallExpression(createParenExpression(
          createFunctionExpression(createEmptyParameterList(), body)));
}

/**
 * @param {ParseTree} operand
 * @param {ArgumentList=} args
 * @return {CallExpression}
 */
export function createCallExpression(operand,
                                     args = createEmptyArgumentList()) {
  return new CallExpression(null, operand, args);
}

/**
 * @return {BreakStatement}
 */
export function createBreakStatement(name = null) {
  return new BreakStatement(null, name);
}

/**
 * @param {ParseTree} func
 * @param {ParseTree} thisExpression
 * @return {CallExpression}
 */
function createCallCall(func, thisExpression) {
  return createCallExpression(
      createMemberExpression(func, CALL),
      createArgumentList([thisExpression]));
}

/**
 * @param {ParseTree} expression
 * @param {Array.<ParseTree>} statements
 * @return {CaseClause}
 */
export function createCaseClause(expression, statements) {
  return new CaseClause(null, expression, statements);
}

/**
 * @param {BindingIdentifier|IdentifierToken} identifier
 * @param {ParseTree} catchBody
 * @return {Catch}
 */
export function createCatch(identifier, catchBody) {
  identifier = createBindingIdentifier(identifier);
  return new Catch(null, identifier, catchBody);
}

/**
 * @param {IdentifierToken} name
 * @param {ParseTree} superClass
 * @param {Array.<ParseTree>} elements
 * @return {ClassDeclaration}
 */
export function createClassDeclaration(name, superClass, elements) {
  return new ClassDeclaration(null, name, superClass, elements, []);
}

/**
 * @param {Array.<ParseTree>} expressions
 * @return {CommaExpression}
 */
export function createCommaExpression(expressions) {
  return new CommaExpression(null, expressions);
}

/**
 * @param {ParseTree} condition
 * @param {ParseTree} left
 * @param {ParseTree} right
 * @return {ConditionalExpression}
 */
export function createConditionalExpression(condition, left, right) {
  return new ConditionalExpression(null, condition, left, right);
}

/**
 * @return {ContinueStatement}
 */
export function createContinueStatement(name = null) {
  return new ContinueStatement(null, name);
}

/**
 * @param {Array.<ParseTree>} statements
 * @return {DefaultClause}
 */
export function createDefaultClause(statements) {
  return new DefaultClause(null, statements);
}

/**
 * @param {ParseTree} body
 * @param {ParseTree} condition
 * @return {DoWhileStatement}
 */
export function createDoWhileStatement(body, condition) {
  return new DoWhileStatement(null, body, condition);
}

/**
 * @param {ParseTree} lhs
 * @param {ParseTree} rhs
 * @return {ExpressionStatement}
 */
export function createAssignmentStatement(lhs, rhs) {
  return createExpressionStatement(createAssignmentExpression(lhs, rhs));
}

/**
 * @param {ParseTree} operand
 * @param {ArgumentList=} args
 * @return {ExpressionStatement}
 */
export function createCallStatement(operand, args = undefined) {
  return createExpressionStatement(createCallExpression(operand, args));
}

/**
 * @param {ParseTree} expression
 * @return {ExpressionStatement}
 */
export function createExpressionStatement(expression) {
  return new ExpressionStatement(null, expression);
}

/**
 * @param {ParseTree} block
 * @return {Finally}
 */
export function createFinally(block) {
  return new Finally(null, block);
}

/**
 * @param {VariableDeclarationList} initializer
 * @param {ParseTree} collection
 * @param {ParseTree} body
 * @return {ForOfStatement}
 */
export function createForOfStatement(initializer, collection, body) {
  return new ForOfStatement(null, initializer, collection, body);
}

/**
 * @param {ParseTree} initializer
 * @param {ParseTree} collection
 * @param {ParseTree} body
 * @return {ForInStatement}
 */
export function createForInStatement(initializer, collection, body) {
  return new ForInStatement(null, initializer, collection, body);
}

/**
 * @param {ParseTree} variables
 * @param {ParseTree} condition
 * @param {ParseTree} increment
 * @param {ParseTree} body
 * @return {ForStatement}
 */
export function createForStatement(variables, condition, increment, body) {
  return new ForStatement(null, variables, condition, increment, body);
}

/**
 * @param {FormalParameterList} parameterList
 * @param {FunctionBody} body
 * @return {FunctionExpression}
 */
export function createFunctionExpression(parameterList, body) {
  assert(body.type === 'FUNCTION_BODY');
  return new FunctionExpression(null, null, false,
                                parameterList, null, [], body);
}


/**
 * @param {string|IdentifierToken} identifier
 * @return {IdentifierExpression}
 */
export function createIdentifierExpression(identifier) {
  if (typeof identifier === 'string')
    identifier = createIdentifierToken(identifier);
  else if (identifier instanceof BindingIdentifier)
    identifier = identifier.identifierToken;
  return new IdentifierExpression(null, identifier);
}

/**
 * @return {IdentifierExpression}
 */
export function createUndefinedExpression() {
  return createIdentifierExpression(UNDEFINED);
}

/**
 * @param {ParseTree} condition
 * @param {ParseTree} ifClause
 * @param {ParseTree=} elseClause
 * @return {IfStatement}
 */
export function createIfStatement(condition, ifClause, elseClause = null) {
  return new IfStatement(null, condition, ifClause, elseClause);
}

/**
 * @param {string} value
 * @return {ParseTree}
 */
export function createStringLiteral(value) {
  return new LiteralExpression(null, createStringLiteralToken(value));
}

/**
 * @param {boolean} value
 * @return {ParseTree}
 */
export function createBooleanLiteral(value) {
  return new LiteralExpression(null, createBooleanLiteralToken(value));
}

/**
 * @return {ParseTree}
 */
export function createTrueLiteral() {
  return createBooleanLiteral(true);
}

/**
 * @return {ParseTree}
 */
export function createFalseLiteral() {
  return createBooleanLiteral(false);
}

/**
 * @return {ParseTree}
 */
export function createNullLiteral() {
  return new LiteralExpression(null, createNullLiteralToken());
}

/**
 * @param {number} value
 * @return {ParseTree}
 */
export function createNumberLiteral(value) {
  return new LiteralExpression(null, createNumberLiteralToken(value));
}

/**
 * Creates 'operand.memberName' or 'operand[memberName]' if memberName
 * is a LiteralToken or LiteralExpression.
 *
 * @param {string|IdentifierToken|ParseTree} operand
 * @param {string|IdentifierToken|LiteralToken|LiteralExpression} memberName
 * @param {...string|IdentifierToken} memberNames
 * @return {MemberExpression|MemberLookupExpression}
 */
export function createMemberExpression(operand, memberName, ...memberNames) {
  if (typeof operand === 'string' || operand instanceof IdentifierToken)
    operand = createIdentifierExpression(operand);
  if (typeof memberName === 'string')
    memberName = createIdentifierToken(memberName);
  if (memberName instanceof LiteralToken)
    memberName = new LiteralExpression(null, memberName);

  let tree = memberName instanceof LiteralExpression ?
      new MemberLookupExpression(null, operand, memberName) :
      new MemberExpression(null, operand, memberName);
  for (let i = 0; i < memberNames.length; i++) {
    tree = createMemberExpression(tree, memberNames[i]);
  }
  return tree;
}

/**
 * @return {MemberLookupExpression}
 */
export function createMemberLookupExpression(operand,  memberExpression) {
  return new MemberLookupExpression(null, operand, memberExpression);
}

/**
 * @return {ParseTree}
 */
export function createThisExpression() {
  return new ThisExpression(null);
}

/**
 * @param {ParseTree} operand
 * @param {ArgumentList} args
 * @return {NewExpression}
 */
export function createNewExpression(operand, args) {
  return new NewExpression(null, operand, args);
}

/**
 * @param {ParseTree} value
 * @return {ParseTree}
 */
export function createObjectFreeze(value) {
  // Object.freeze(value)
  return createCallExpression(
      createMemberExpression(OBJECT, FREEZE),
      createArgumentList([value]));
}


/**
 * @param {ParseTree} protoExpression
 * @param {ObjectLiteral=} descriptors
 * @return {ParseTree}
 */
export function createObjectCreate(protoExpression, descriptors = undefined) {
  let argumentList = [protoExpression];
  if (descriptors)
    argumentList.push(descriptors);

  return createCallExpression(
      createMemberExpression(OBJECT,
                             CREATE),
      createArgumentList(argumentList));
}

/**
 * Creates an object literal tree representing a property descriptor.
 * @param {Object} descr This is a normal js object. The values in the descr
 *     may be true, false or a ParseTree.
 * @return {ObjectLiteral}
 */
export function createObjectLiteralForDescriptor(descr) {
  let propertyNameAndValues = Object.keys(descr).map(function(name) {
    let value = descr[name];
    if (!(value instanceof ParseTree))
      value = createBooleanLiteral(!!value);
    return createPropertyNameAssignment(name, value);
  });
  return createObjectLiteral(propertyNameAndValues);
}

/**
 * Creates a call expression to Object.defineProperty(tree, name, descr).
 *
 * @param {ParseTree} tree
 * @param {string|ParseTree} name
 * @param {Object} descr This is a normal js object. The values in the descr
 *     may be true, false or a ParseTree.
 * @return {ParseTree}
 */
export function createDefineProperty(tree, name, descr) {
  if (typeof name === 'string')
    name = createStringLiteral(name);

  return createCallExpression(
      createMemberExpression(OBJECT, DEFINE_PROPERTY),
      createArgumentList([
        tree,
        name,
        createObjectLiteralForDescriptor(descr)
      ]));
}

/**
 * @param {Array.<ParseTree>} propertyNameAndValues
 * @return {ObjectLiteral}
 */
export function createObjectLiteral(propertyNameAndValues) {
  return new ObjectLiteral(null, propertyNameAndValues);
}

/**
 * @param {ParseTree} expression
 * @return {ParenExpression}
 */
export function createParenExpression(expression) {
  return new ParenExpression(null, expression);
}

/**
 * @param {ParseTree} operand
 * @param {ParseTree} operator
 * @return {PostfixExpression}
 */
export function createPostfixExpression(operand, operator) {
  return new PostfixExpression(null, operand, operator);
}

/**
 * @param {Array.<ParseTree>} scriptItemList
 * @return {Script}
 */
export function createScript(scriptItemList) {
  return new Script(null, scriptItemList, null);
}

/**
 * @param {string|ParseTree} identifier
 * @param {ParseTree} value
 * @return {PropertyNameAssignment}
 */
export function createPropertyNameAssignment(identifier, value) {
  if (typeof identifier === 'string')
    identifier = createLiteralPropertyName(identifier);
  return new PropertyNameAssignment(null, identifier, value);
}

/**
 * @param {string} name
 * @return {LiteralPropertyName}
 */
export function createLiteralPropertyName(name) {
  return new LiteralPropertyName(null, createIdentifierToken(name));
}

/**
 * @param {string|IdentifierToken|BindingIdentifier} identifier
 * @return {RestParameter}
 */
export function createRestParameter(identifier) {
  let rest = new RestParameter(null, createBindingIdentifier(identifier));
  return new FormalParameter(null, rest, null, []);
}

/**
 * @param {ParseTree} expression
 * @return {ReturnStatement}
 */
export function createReturnStatement(expression) {
  return new ReturnStatement(null, expression);
}

/**
 * @param {ParseTree} expression
 * @return {SpreadExpression}
 */
function createSpreadExpression(expression) {
  return new SpreadExpression(null, expression);
}

/**
 * @param {ParseTree} expression
 * @param {Array.<ParseTree>} caseClauses
 * @return {SwitchStatement}
 */
export function createSwitchStatement(expression, caseClauses) {
  return new SwitchStatement(null, expression, caseClauses);
}

/**
 * @param {ParseTree} value
 * @return {ThrowStatement}
 */
export function createThrowStatement(value) {
  return new ThrowStatement(null, value);
}

/**
 * @param {ParseTree} body
 * @param {ParseTree} catchBlock
 * @param {ParseTree=} finallyBlock
 * @return {TryStatement}
 */
export function createTryStatement(body, catchBlock, finallyBlock = null) {
  return new TryStatement(null, body, catchBlock, finallyBlock);
}

/**
 * @param {Token} operator
 * @param {ParseTree} operand
 * @return {UnaryExpression}
 */
export function createUnaryExpression(operator, operand) {
  return new UnaryExpression(null, operator, operand);
}

/**
 * @return {ParseTree}
 */
export function createUseStrictDirective() {
  return createExpressionStatement(createStringLiteral('use strict'));
}

/**
 * @param {TokenType} binding
 * @param {IdentifierToken|Array.<VariableDeclaration>} identifierOrDeclarations
 * @param {ParseTree=} initializer
 * @return {VariableDeclarationList}
 */
export function createVariableDeclarationList(binding,
                                              identifierOrDeclarations,
                                              initializer = undefined) {
  if (identifierOrDeclarations instanceof Array) {
    let declarations = identifierOrDeclarations;
    return new VariableDeclarationList(null, binding, declarations);
  }

  let identifier = identifierOrDeclarations;
  return createVariableDeclarationList(
      binding, [createVariableDeclaration(identifier, initializer)]);
}

/**
 * @param {string|IdentifierToken|ParseTree} identifier
 * @param {ParseTree} initializer
 * @return {VariableDeclaration}
 */
export function createVariableDeclaration(identifier, initializer) {
  if (!(identifier instanceof ParseTree) ||
      identifier.type !== ParseTreeType.BINDING_IDENTIFIER &&
      identifier.type !== ParseTreeType.OBJECT_PATTERN &&
      identifier.type !== ParseTreeType.ARRAY_PATTERN) {
    identifier = createBindingIdentifier(identifier);
  }

  return new VariableDeclaration(null, identifier, null, initializer);
}

/**
 * @param {VariableDeclarationList|TokenType} listOrBinding
 * @param {string|IdentifierToken=} identifier
 * @param {ParseTree=} initializer
 * @return {VariableStatement}
 */
export function createVariableStatement(listOrBinding,
                                        identifier = undefined,
                                        initializer = undefined) {
  if (listOrBinding instanceof VariableDeclarationList)
    return new VariableStatement(null, listOrBinding);
  let binding = listOrBinding;
  let list = createVariableDeclarationList(binding, identifier, initializer);
  return createVariableStatement(list);
}

/**
 * Creates a (void 0) expression.
 * @return {ParenExpression}
 */
export function createVoid0() {
  return createParenExpression(
    createUnaryExpression(
      createOperatorToken(VOID),
      createNumberLiteral(0)));
}

/**
 * @param {ParseTree} condition
 * @param {ParseTree} body
 * @return {WhileStatement}
 */
export function createWhileStatement(condition, body) {
  return new WhileStatement(null, condition, body);
}

/**
 * @param {ParseTree} expression
 * @param {ParseTree} body
 * @return {WithStatement}
 */
export function createWithStatement(expression, body) {
  return new WithStatement(null, expression, body);
}

/**
 * @param {number} state
 * @return {ExpressionStatement}
 */
export function createAssignStateStatement(state) {
  return createAssignmentStatement(
      createMemberExpression('$ctx', 'state'),
      createNumberLiteral(state));
}
