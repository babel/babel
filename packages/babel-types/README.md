# babel-types

This module contains methods for building ASTs manually and for checking the types of AST nodes.

## API

<!-- begin generated section -->

### t.anyTypeAnnotation()

See also `t.isAnyTypeAnnotation(node, opts)` and `t.assertAnyTypeAnnotation(node, opts)`.

aliases `Flow`, `FlowBaseAnnotation`


### t.arrayExpression(elements)

See also `t.isArrayExpression(node, opts)` and `t.assertArrayExpression(node, opts)`.

aliases `Expression`

 - `elements`: `array` (required)

### t.arrayPattern(elements, typeAnnotation)

See also `t.isArrayPattern(node, opts)` and `t.assertArrayPattern(node, opts)`.

aliases `Pattern`, `LVal`

 - `elements`: `Array<Expression>` (required)
 - `typeAnnotation` (required)

### t.arrayTypeAnnotation(elementType)

See also `t.isArrayTypeAnnotation(node, opts)` and `t.assertArrayTypeAnnotation(node, opts)`.

aliases `Flow`

 - `elementType` (required)

### t.arrowFunctionExpression(params, body, async)

See also `t.isArrowFunctionExpression(node, opts)` and `t.assertArrowFunctionExpression(node, opts)`.

aliases `Scopable`, `Function`, `BlockParent`, `FunctionParent`, `Expression`, `Pureish`

 - `params`: `Array<LVal>` (required)
 - `body`: `BlockStatement | Expression` (required)
 - `async`: `boolean` (default: `false`)

### t.assignmentExpression(operator, left, right)

See also `t.isAssignmentExpression(node, opts)` and `t.assertAssignmentExpression(node, opts)`.

aliases `Expression`

 - `operator`: `string` (required)
 - `left`: `LVal` (required)
 - `right`: `Expression` (required)

### t.assignmentPattern(left, right)

See also `t.isAssignmentPattern(node, opts)` and `t.assertAssignmentPattern(node, opts)`.

aliases `Pattern`, `LVal`

 - `left`: `Identifier` (required)
 - `right`: `Expression` (required)

### t.awaitExpression(argument)

See also `t.isAwaitExpression(node, opts)` and `t.assertAwaitExpression(node, opts)`.

aliases `Expression`, `Terminatorless`

 - `argument`: `Expression` (required)

### t.binaryExpression(operator, left, right)

See also `t.isBinaryExpression(node, opts)` and `t.assertBinaryExpression(node, opts)`.

aliases `Binary`, `Expression`

 - `operator`: `string` (required)
 - `left`: `Expression` (required)
 - `right`: `Expression` (required)

### t.bindExpression(object, callee)

See also `t.isBindExpression(node, opts)` and `t.assertBindExpression(node, opts)`.

 - `object` (required)
 - `callee` (required)

### t.blockStatement(body, directives)

See also `t.isBlockStatement(node, opts)` and `t.assertBlockStatement(node, opts)`.

aliases `Scopable`, `BlockParent`, `Block`, `Statement`

 - `body`: `Array<Statement>` (required)
 - `directives`: `Array<Directive>` (default: `[]`)

### t.booleanLiteral(value)

See also `t.isBooleanLiteral(node, opts)` and `t.assertBooleanLiteral(node, opts)`.

aliases `Expression`, `Pureish`, `Literal`, `Immutable`

 - `value`: `boolean` (required)

### t.booleanLiteralTypeAnnotation()

See also `t.isBooleanLiteralTypeAnnotation(node, opts)` and `t.assertBooleanLiteralTypeAnnotation(node, opts)`.

aliases `Flow`


### t.booleanTypeAnnotation()

See also `t.isBooleanTypeAnnotation(node, opts)` and `t.assertBooleanTypeAnnotation(node, opts)`.

aliases `Flow`, `FlowBaseAnnotation`


### t.breakStatement(label)

See also `t.isBreakStatement(node, opts)` and `t.assertBreakStatement(node, opts)`.

aliases `Statement`, `Terminatorless`, `CompletionStatement`

 - `label`: `Identifier` (default: `null`)

### t.callExpression(callee, arguments)

See also `t.isCallExpression(node, opts)` and `t.assertCallExpression(node, opts)`.

aliases `Expression`

 - `callee`: `Expression` (required)
 - `arguments`: `array` (required)

### t.catchClause(param, body)

See also `t.isCatchClause(node, opts)` and `t.assertCatchClause(node, opts)`.

aliases `Scopable`

 - `param`: `Identifier` (required)
 - `body`: `BlockStatement` (required)

### t.classBody(body)

See also `t.isClassBody(node, opts)` and `t.assertClassBody(node, opts)`.

 - `body`: `Array<ClassMethod>` (required)

### t.classDeclaration(id, superClass, body, decorators)

See also `t.isClassDeclaration(node, opts)` and `t.assertClassDeclaration(node, opts)`.

aliases `Scopable`, `Class`, `Statement`, `Declaration`, `Pureish`

 - `id`: `Identifier` (required)
 - `superClass`: `Expression` (default: `null`)
 - `body`: `ClassBody` (required)
 - `decorators`: `Array<Decorator>` (required)

### t.classExpression(id, superClass, body, decorators)

See also `t.isClassExpression(node, opts)` and `t.assertClassExpression(node, opts)`.

aliases `Scopable`, `Class`, `Expression`, `Pureish`

 - `id`: `Identifier` (default: `null`)
 - `superClass`: `Expression` (default: `null`)
 - `body`: `ClassBody` (required)
 - `decorators`: `Array<Decorator>` (required)

### t.classImplements(id, typeParameters)

See also `t.isClassImplements(node, opts)` and `t.assertClassImplements(node, opts)`.

aliases `Flow`

 - `id` (required)
 - `typeParameters` (required)

### t.classMethod(kind, key, params, body, computed, static)

See also `t.isClassMethod(node, opts)` and `t.assertClassMethod(node, opts)`.

aliases `Function`, `Scopable`, `BlockParent`, `FunctionParent`, `Method`

 - `kind`: `"get" | "set" | "method" | "constructor"` (default: `'method'`)
 - `key`if computed then `Expression` else `Identifier | Literal` (required)
 - `params`: `Array<LVal>` (required)
 - `body`: `BlockStatement` (required)
 - `computed`: `boolean` (default: `false`)
 - `static`: `boolean` (default: `false`)

### t.classProperty(key, value, typeAnnotation, decorators)

See also `t.isClassProperty(node, opts)` and `t.assertClassProperty(node, opts)`.

aliases `Flow`, `Property`

 - `key` (required)
 - `value` (required)
 - `typeAnnotation` (required)
 - `decorators` (required)

### t.conditionalExpression(test, consequent, alternate)

See also `t.isConditionalExpression(node, opts)` and `t.assertConditionalExpression(node, opts)`.

aliases `Expression`, `Conditional`

 - `test`: `Expression` (required)
 - `consequent`: `Expression` (required)
 - `alternate`: `Expression` (required)

### t.continueStatement(label)

See also `t.isContinueStatement(node, opts)` and `t.assertContinueStatement(node, opts)`.

aliases `Statement`, `Terminatorless`, `CompletionStatement`

 - `label`: `Identifier` (default: `null`)

### t.debuggerStatement()

See also `t.isDebuggerStatement(node, opts)` and `t.assertDebuggerStatement(node, opts)`.

aliases `Statement`


### t.declareClass(id, typeParameters, extends, body)

See also `t.isDeclareClass(node, opts)` and `t.assertDeclareClass(node, opts)`.

aliases `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (required)
 - `typeParameters` (required)
 - `extends` (required)
 - `body` (required)

### t.declareFunction(id)

See also `t.isDeclareFunction(node, opts)` and `t.assertDeclareFunction(node, opts)`.

aliases `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (required)

### t.declareModule(id, body)

See also `t.isDeclareModule(node, opts)` and `t.assertDeclareModule(node, opts)`.

aliases `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (required)
 - `body` (required)

### t.declareVariable(id)

See also `t.isDeclareVariable(node, opts)` and `t.assertDeclareVariable(node, opts)`.

aliases `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (required)

### t.decorator(expression)

See also `t.isDecorator(node, opts)` and `t.assertDecorator(node, opts)`.

 - `expression`: `Expression` (required)

### t.directive(value)

See also `t.isDirective(node, opts)` and `t.assertDirective(node, opts)`.

 - `value`: `DirectiveLiteral` (required)

### t.directiveLiteral(value)

See also `t.isDirectiveLiteral(node, opts)` and `t.assertDirectiveLiteral(node, opts)`.

 - `value`: `string` (required)

### t.doExpression(body)

See also `t.isDoExpression(node, opts)` and `t.assertDoExpression(node, opts)`.

aliases `Expression`

 - `body`: `BlockStatement` (required)

### t.doWhileStatement(test, body)

See also `t.isDoWhileStatement(node, opts)` and `t.assertDoWhileStatement(node, opts)`.

aliases `Statement`, `BlockParent`, `Loop`, `While`, `Scopable`

 - `test`: `Expression` (required)
 - `body`: `BlockStatement` (required)

### t.emptyStatement()

See also `t.isEmptyStatement(node, opts)` and `t.assertEmptyStatement(node, opts)`.

aliases `Statement`


### t.existentialTypeParam()

See also `t.isExistentialTypeParam(node, opts)` and `t.assertExistentialTypeParam(node, opts)`.

aliases `Flow`


### t.exportAllDeclaration(source)

See also `t.isExportAllDeclaration(node, opts)` and `t.assertExportAllDeclaration(node, opts)`.

aliases `Statement`, `Declaration`, `ModuleDeclaration`, `ExportDeclaration`

 - `source` (required)

### t.exportDefaultDeclaration(declaration)

See also `t.isExportDefaultDeclaration(node, opts)` and `t.assertExportDefaultDeclaration(node, opts)`.

aliases `Statement`, `Declaration`, `ModuleDeclaration`, `ExportDeclaration`

 - `declaration` (required)

### t.exportDefaultSpecifier(exported)

See also `t.isExportDefaultSpecifier(node, opts)` and `t.assertExportDefaultSpecifier(node, opts)`.

aliases `ModuleSpecifier`

 - `exported`: `Identifier` (required)

### t.exportNamedDeclaration(declaration, specifiers, source)

See also `t.isExportNamedDeclaration(node, opts)` and `t.assertExportNamedDeclaration(node, opts)`.

aliases `Statement`, `Declaration`, `ModuleDeclaration`, `ExportDeclaration`

 - `declaration` (required)
 - `specifiers` (required)
 - `source` (required)

### t.exportNamespaceSpecifier(exported)

See also `t.isExportNamespaceSpecifier(node, opts)` and `t.assertExportNamespaceSpecifier(node, opts)`.

aliases `ModuleSpecifier`

 - `exported`: `Identifier` (required)

### t.exportSpecifier(local, exported)

See also `t.isExportSpecifier(node, opts)` and `t.assertExportSpecifier(node, opts)`.

aliases `ModuleSpecifier`

 - `local`: `Identifier` (required)
 - `exported` (required)

### t.expressionStatement(expression)

See also `t.isExpressionStatement(node, opts)` and `t.assertExpressionStatement(node, opts)`.

aliases `Statement`, `ExpressionWrapper`

 - `expression`: `Expression` (required)

### t.file(program, comments, tokens)

See also `t.isFile(node, opts)` and `t.assertFile(node, opts)`.

 - `program`: `Program` (required)
 - `comments` (required)
 - `tokens` (required)

### t.forInStatement(left, right, body)

See also `t.isForInStatement(node, opts)` and `t.assertForInStatement(node, opts)`.

aliases `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`, `ForXStatement`

 - `left`: `VariableDeclaration | LVal` (required)
 - `right`: `Expression` (required)
 - `body`: `Statement` (required)

### t.forOfStatement(left, right, body)

See also `t.isForOfStatement(node, opts)` and `t.assertForOfStatement(node, opts)`.

aliases `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`, `ForXStatement`

 - `left`: `VariableDeclaration | LVal` (required)
 - `right`: `Expression` (required)
 - `body`: `Statement` (required)

### t.forStatement(init, test, update, body)

See also `t.isForStatement(node, opts)` and `t.assertForStatement(node, opts)`.

aliases `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`

 - `init`: `VariableDeclaration | Expression` (default: `null`)
 - `test`: `Expression` (default: `null`)
 - `update`: `Expression` (default: `null`)
 - `body`: `Statement` (required)

### t.functionDeclaration(id, params, body, generator, async)

See also `t.isFunctionDeclaration(node, opts)` and `t.assertFunctionDeclaration(node, opts)`.

aliases `Scopable`, `Function`, `BlockParent`, `FunctionParent`, `Statement`, `Pureish`, `Declaration`

 - `id`: `Identifier` (required)
 - `params`: `Array<LVal>` (required)
 - `body`: `BlockStatement` (required)
 - `generator`: `boolean` (default: `false`)
 - `async`: `boolean` (default: `false`)

### t.functionExpression(id, params, body, generator, async)

See also `t.isFunctionExpression(node, opts)` and `t.assertFunctionExpression(node, opts)`.

aliases `Scopable`, `Function`, `BlockParent`, `FunctionParent`, `Expression`, `Pureish`

 - `id`: `Identifier` (default: `null`)
 - `params`: `Array<LVal>` (required)
 - `body`: `BlockStatement` (required)
 - `generator`: `boolean` (default: `false`)
 - `async`: `boolean` (default: `false`)

### t.functionTypeAnnotation(typeParameters, params, rest, returnType)

See also `t.isFunctionTypeAnnotation(node, opts)` and `t.assertFunctionTypeAnnotation(node, opts)`.

aliases `Flow`

 - `typeParameters` (required)
 - `params` (required)
 - `rest` (required)
 - `returnType` (required)

### t.functionTypeParam(name, typeAnnotation)

See also `t.isFunctionTypeParam(node, opts)` and `t.assertFunctionTypeParam(node, opts)`.

aliases `Flow`

 - `name` (required)
 - `typeAnnotation` (required)

### t.genericTypeAnnotation(id, typeParameters)

See also `t.isGenericTypeAnnotation(node, opts)` and `t.assertGenericTypeAnnotation(node, opts)`.

aliases `Flow`

 - `id` (required)
 - `typeParameters` (required)

### t.identifier(name)

See also `t.isIdentifier(node, opts)` and `t.assertIdentifier(node, opts)`.

aliases `Expression`, `LVal`

 - `name``string` (required)

### t.ifStatement(test, consequent, alternate)

See also `t.isIfStatement(node, opts)` and `t.assertIfStatement(node, opts)`.

aliases `Statement`, `Conditional`

 - `test`: `Expression` (required)
 - `consequent`: `Statement` (default: `null`)
 - `alternate`: `Statement` (default: `null`)

### t.importDeclaration(specifiers, source)

See also `t.isImportDeclaration(node, opts)` and `t.assertImportDeclaration(node, opts)`.

aliases `Statement`, `Declaration`, `ModuleDeclaration`

 - `specifiers`: `Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>` (required)
 - `source`: `StringLiteral` (required)

### t.importDefaultSpecifier(local)

See also `t.isImportDefaultSpecifier(node, opts)` and `t.assertImportDefaultSpecifier(node, opts)`.

aliases `ModuleSpecifier`

 - `local`: `Identifier` (required)

### t.importNamespaceSpecifier(local)

See also `t.isImportNamespaceSpecifier(node, opts)` and `t.assertImportNamespaceSpecifier(node, opts)`.

aliases `ModuleSpecifier`

 - `local`: `Identifier` (required)

### t.importSpecifier(local, imported)

See also `t.isImportSpecifier(node, opts)` and `t.assertImportSpecifier(node, opts)`.

aliases `ModuleSpecifier`

 - `local`: `Identifier` (required)
 - `imported`: `Identifier` (required)

### t.interfaceDeclaration(id, typeParameters, extends, body)

See also `t.isInterfaceDeclaration(node, opts)` and `t.assertInterfaceDeclaration(node, opts)`.

aliases `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (required)
 - `typeParameters` (required)
 - `extends` (required)
 - `body` (required)

### t.interfaceExtends(id, typeParameters)

See also `t.isInterfaceExtends(node, opts)` and `t.assertInterfaceExtends(node, opts)`.

aliases `Flow`

 - `id` (required)
 - `typeParameters` (required)

### t.intersectionTypeAnnotation(types)

See also `t.isIntersectionTypeAnnotation(node, opts)` and `t.assertIntersectionTypeAnnotation(node, opts)`.

aliases `Flow`

 - `types` (required)

### t.jSXAttribute(name, value)

See also `t.isJSXAttribute(node, opts)` and `t.assertJSXAttribute(node, opts)`.

aliases `JSX`, `Immutable`

 - `name`: `JSXIdentifier | JSXMemberExpression` (required)
 - `value`: `JSXElement | StringLiteral | JSXExpressionContainer` (default: `null`)

### t.jSXClosingElement(name)

See also `t.isJSXClosingElement(node, opts)` and `t.assertJSXClosingElement(node, opts)`.

aliases `JSX`, `Immutable`

 - `name`: `JSXIdentifier | JSXMemberExpression` (required)

### t.jSXElement(openingElement, closingElement, children, selfClosing)

See also `t.isJSXElement(node, opts)` and `t.assertJSXElement(node, opts)`.

aliases `JSX`, `Immutable`, `Expression`

 - `openingElement`: `JSXOpeningElement` (required)
 - `closingElement`: `JSXClosingElement` (default: `null`)
 - `children` (required)
 - `selfClosing` (required)

### t.jSXEmptyExpression()

See also `t.isJSXEmptyExpression(node, opts)` and `t.assertJSXEmptyExpression(node, opts)`.

aliases `JSX`, `Expression`


### t.jSXExpressionContainer(expression)

See also `t.isJSXExpressionContainer(node, opts)` and `t.assertJSXExpressionContainer(node, opts)`.

aliases `JSX`, `Immutable`

 - `expression`: `Expression` (required)

### t.jSXIdentifier(name)

See also `t.isJSXIdentifier(node, opts)` and `t.assertJSXIdentifier(node, opts)`.

aliases `JSX`, `Expression`

 - `name`: `string` (required)

### t.jSXMemberExpression(object, property)

See also `t.isJSXMemberExpression(node, opts)` and `t.assertJSXMemberExpression(node, opts)`.

aliases `JSX`, `Expression`

 - `object`: `JSXIdentifier` (required)
 - `property`: `JSXIdentifier` (required)

### t.jSXNamespacedName(namespace, name)

See also `t.isJSXNamespacedName(node, opts)` and `t.assertJSXNamespacedName(node, opts)`.

aliases `JSX`

 - `namespace`: `JSXIdentifier` (required)
 - `name`: `JSXIdentifier` (required)

### t.jSXOpeningElement(name, attributes, selfClosing)

See also `t.isJSXOpeningElement(node, opts)` and `t.assertJSXOpeningElement(node, opts)`.

aliases `JSX`, `Immutable`

 - `name`: `JSXIdentifier | JSXMemberExpression` (required)
 - `attributes`: `Array<JSXAttribute | JSXSpreadAttribute>` (required)
 - `selfClosing`: `boolean` (default: `false`)

### t.jSXSpreadAttribute(argument)

See also `t.isJSXSpreadAttribute(node, opts)` and `t.assertJSXSpreadAttribute(node, opts)`.

aliases `JSX`

 - `argument`: `Expression` (required)

### t.jSXText(value)

See also `t.isJSXText(node, opts)` and `t.assertJSXText(node, opts)`.

aliases `JSX`

 - `value`: `string` (required)

### t.labeledStatement(label, body)

See also `t.isLabeledStatement(node, opts)` and `t.assertLabeledStatement(node, opts)`.

aliases `Statement`

 - `label`: `Identifier` (required)
 - `body`: `Statement` (required)

### t.logicalExpression(operator, left, right)

See also `t.isLogicalExpression(node, opts)` and `t.assertLogicalExpression(node, opts)`.

aliases `Binary`, `Expression`

 - `operator` (required)
 - `left`: `Expression` (required)
 - `right`: `Expression` (required)

### t.memberExpression(object, property, computed)

See also `t.isMemberExpression(node, opts)` and `t.assertMemberExpression(node, opts)`.

aliases `Expression`, `LVal`

 - `object`: `Expression` (required)
 - `property`if computed then `Expression` else `Identifier` (required)
 - `computed`: `boolean` (default: `false`)

### t.metaProperty(meta, property)

See also `t.isMetaProperty(node, opts)` and `t.assertMetaProperty(node, opts)`.

aliases `Expression`

 - `meta`: `string` (required)
 - `property`: `string` (required)

### t.mixedTypeAnnotation()

See also `t.isMixedTypeAnnotation(node, opts)` and `t.assertMixedTypeAnnotation(node, opts)`.

aliases `Flow`, `FlowBaseAnnotation`


### t.newExpression(callee, arguments)

See also `t.isNewExpression(node, opts)` and `t.assertNewExpression(node, opts)`.

aliases `Expression`

 - `callee`: `Expression` (required)
 - `arguments`: `Array<Expression>` (required)

### t.noop()

See also `t.isNoop(node, opts)` and `t.assertNoop(node, opts)`.


### t.nullLiteral()

See also `t.isNullLiteral(node, opts)` and `t.assertNullLiteral(node, opts)`.

aliases `Expression`, `Pureish`, `Literal`, `Immutable`


### t.nullableTypeAnnotation(typeAnnotation)

See also `t.isNullableTypeAnnotation(node, opts)` and `t.assertNullableTypeAnnotation(node, opts)`.

aliases `Flow`

 - `typeAnnotation` (required)

### t.numberTypeAnnotation()

See also `t.isNumberTypeAnnotation(node, opts)` and `t.assertNumberTypeAnnotation(node, opts)`.

aliases `Flow`, `FlowBaseAnnotation`


### t.numericLiteral(value)

See also `t.isNumericLiteral(node, opts)` and `t.assertNumericLiteral(node, opts)`.

aliases `Expression`, `Pureish`, `Literal`, `Immutable`

 - `value`: `number` (required)

### t.numericLiteralTypeAnnotation()

See also `t.isNumericLiteralTypeAnnotation(node, opts)` and `t.assertNumericLiteralTypeAnnotation(node, opts)`.

aliases `Flow`


### t.objectExpression(properties)

See also `t.isObjectExpression(node, opts)` and `t.assertObjectExpression(node, opts)`.

aliases `Expression`

 - `properties`: `Array<ObjectMethod | ObjectProperty | SpreadProperty>` (required)

### t.objectMethod(kind, key, params, body, computed)

See also `t.isObjectMethod(node, opts)` and `t.assertObjectMethod(node, opts)`.

aliases `UserWhitespacable`, `Function`, `Scopable`, `BlockParent`, `FunctionParent`, `Method`

 - `kind`: `"method" | "get" | "set"` (default: `'method'`)
 - `key`if computed then `Expression` else `Identifier | Literal` (required)
 - `params` (required)
 - `body`: `BlockStatement` (required)
 - `computed`: `boolean` (default: `false`)

### t.objectPattern(properties, typeAnnotation)

See also `t.isObjectPattern(node, opts)` and `t.assertObjectPattern(node, opts)`.

aliases `Pattern`, `LVal`

 - `properties`: `Array<RestProperty>` (required)
 - `typeAnnotation` (required)

### t.objectProperty(key, value, computed, shorthand, decorators)

See also `t.isObjectProperty(node, opts)` and `t.assertObjectProperty(node, opts)`.

aliases `UserWhitespacable`, `Property`

 - `key`if computed then `Expression` else `Identifier | Literal` (required)
 - `value`: `Expression` (required)
 - `computed`: `boolean` (default: `false`)
 - `shorthand`: `boolean` (default: `false`)
 - `decorators`: `Array<Decorator>` (default: `null`)

### t.objectTypeAnnotation(properties, indexers, callProperties)

See also `t.isObjectTypeAnnotation(node, opts)` and `t.assertObjectTypeAnnotation(node, opts)`.

aliases `Flow`

 - `properties` (required)
 - `indexers` (required)
 - `callProperties` (required)

### t.objectTypeCallProperty(value)

See also `t.isObjectTypeCallProperty(node, opts)` and `t.assertObjectTypeCallProperty(node, opts)`.

aliases `Flow`, `UserWhitespacable`

 - `value` (required)

### t.objectTypeIndexer(id, key, value)

See also `t.isObjectTypeIndexer(node, opts)` and `t.assertObjectTypeIndexer(node, opts)`.

aliases `Flow`, `UserWhitespacable`

 - `id` (required)
 - `key` (required)
 - `value` (required)

### t.objectTypeProperty(key, value)

See also `t.isObjectTypeProperty(node, opts)` and `t.assertObjectTypeProperty(node, opts)`.

aliases `Flow`, `UserWhitespacable`

 - `key` (required)
 - `value` (required)

### t.parenthesizedExpression(expression)

See also `t.isParenthesizedExpression(node, opts)` and `t.assertParenthesizedExpression(node, opts)`.

aliases `Expression`, `ExpressionWrapper`

 - `expression`: `Expression` (required)

### t.program(body, directives)

See also `t.isProgram(node, opts)` and `t.assertProgram(node, opts)`.

aliases `Scopable`, `BlockParent`, `Block`, `FunctionParent`

 - `body`: `Array<Statement>` (required)
 - `directives`: `Array<Directive>` (default: `[]`)

### t.qualifiedTypeIdentifier(id, qualification)

See also `t.isQualifiedTypeIdentifier(node, opts)` and `t.assertQualifiedTypeIdentifier(node, opts)`.

aliases `Flow`

 - `id` (required)
 - `qualification` (required)

### t.regExpLiteral(pattern, flags)

See also `t.isRegExpLiteral(node, opts)` and `t.assertRegExpLiteral(node, opts)`.

aliases `Expression`, `Literal`

 - `pattern`: `string` (required)
 - `flags`: `string` (default: `''`)

### t.restElement(argument, typeAnnotation)

See also `t.isRestElement(node, opts)` and `t.assertRestElement(node, opts)`.

aliases `LVal`

 - `argument`: `LVal` (required)
 - `typeAnnotation` (required)

### t.restProperty(argument)

See also `t.isRestProperty(node, opts)` and `t.assertRestProperty(node, opts)`.

aliases `UnaryLike`

 - `argument`: `LVal` (required)

### t.returnStatement(argument)

See also `t.isReturnStatement(node, opts)` and `t.assertReturnStatement(node, opts)`.

aliases `Statement`, `Terminatorless`, `CompletionStatement`

 - `argument`: `Expression` (default: `null`)

### t.sequenceExpression(expressions)

See also `t.isSequenceExpression(node, opts)` and `t.assertSequenceExpression(node, opts)`.

aliases `Expression`

 - `expressions`: `array` (required)

### t.spreadElement(argument)

See also `t.isSpreadElement(node, opts)` and `t.assertSpreadElement(node, opts)`.

aliases `UnaryLike`

 - `argument`: `Expression` (required)

### t.spreadProperty(argument)

See also `t.isSpreadProperty(node, opts)` and `t.assertSpreadProperty(node, opts)`.

aliases `UnaryLike`

 - `argument`: `Expression` (required)

### t.stringLiteral(value)

See also `t.isStringLiteral(node, opts)` and `t.assertStringLiteral(node, opts)`.

aliases `Expression`, `Pureish`, `Literal`, `Immutable`

 - `value`: `string` (required)

### t.stringLiteralTypeAnnotation()

See also `t.isStringLiteralTypeAnnotation(node, opts)` and `t.assertStringLiteralTypeAnnotation(node, opts)`.

aliases `Flow`


### t.stringTypeAnnotation()

See also `t.isStringTypeAnnotation(node, opts)` and `t.assertStringTypeAnnotation(node, opts)`.

aliases `Flow`, `FlowBaseAnnotation`


### t.super()

See also `t.isSuper(node, opts)` and `t.assertSuper(node, opts)`.

aliases `Expression`


### t.switchCase(test, consequent)

See also `t.isSwitchCase(node, opts)` and `t.assertSwitchCase(node, opts)`.

 - `test` (required)
 - `consequent` (required)

### t.switchStatement(discriminant, cases)

See also `t.isSwitchStatement(node, opts)` and `t.assertSwitchStatement(node, opts)`.

aliases `Statement`, `BlockParent`, `Scopable`

 - `discriminant` (required)
 - `cases` (required)

### t.taggedTemplateExpression(tag, quasi)

See also `t.isTaggedTemplateExpression(node, opts)` and `t.assertTaggedTemplateExpression(node, opts)`.

aliases `Expression`

 - `tag`: `Expression` (required)
 - `quasi`: `TemplateLiteral` (required)

### t.templateElement(value, tail)

See also `t.isTemplateElement(node, opts)` and `t.assertTemplateElement(node, opts)`.

 - `value` (required)
 - `tail`: `boolean` (default: `false`)

### t.templateLiteral(quasis, expressions)

See also `t.isTemplateLiteral(node, opts)` and `t.assertTemplateLiteral(node, opts)`.

aliases `Expression`, `Literal`

 - `quasis` (required)
 - `expressions` (required)

### t.thisExpression()

See also `t.isThisExpression(node, opts)` and `t.assertThisExpression(node, opts)`.

aliases `Expression`


### t.throwStatement(argument)

See also `t.isThrowStatement(node, opts)` and `t.assertThrowStatement(node, opts)`.

aliases `Statement`, `Terminatorless`, `CompletionStatement`

 - `argument`: `Expression` (required)

### t.tryStatement(block, handler, finalizer)

See also `t.isTryStatement(node, opts)` and `t.assertTryStatement(node, opts)`.

aliases `Statement`

 - `block` (required)
 - `handler` (default: `null`)
 - `finalizer`: `BlockStatement` (default: `null`)

### t.tupleTypeAnnotation(types)

See also `t.isTupleTypeAnnotation(node, opts)` and `t.assertTupleTypeAnnotation(node, opts)`.

aliases `Flow`

 - `types` (required)

### t.typeAlias(id, typeParameters, right)

See also `t.isTypeAlias(node, opts)` and `t.assertTypeAlias(node, opts)`.

aliases `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (required)
 - `typeParameters` (required)
 - `right` (required)

### t.typeAnnotation(typeAnnotation)

See also `t.isTypeAnnotation(node, opts)` and `t.assertTypeAnnotation(node, opts)`.

aliases `Flow`

 - `typeAnnotation` (required)

### t.typeCastExpression(expression, typeAnnotation)

See also `t.isTypeCastExpression(node, opts)` and `t.assertTypeCastExpression(node, opts)`.

aliases `Flow`, `ExpressionWrapper`

 - `expression` (required)
 - `typeAnnotation` (required)

### t.typeParameterDeclaration(params)

See also `t.isTypeParameterDeclaration(node, opts)` and `t.assertTypeParameterDeclaration(node, opts)`.

aliases `Flow`

 - `params` (required)

### t.typeParameterInstantiation(params)

See also `t.isTypeParameterInstantiation(node, opts)` and `t.assertTypeParameterInstantiation(node, opts)`.

aliases `Flow`

 - `params` (required)

### t.typeofTypeAnnotation(argument)

See also `t.isTypeofTypeAnnotation(node, opts)` and `t.assertTypeofTypeAnnotation(node, opts)`.

aliases `Flow`

 - `argument` (required)

### t.unaryExpression(operator, argument, prefix)

See also `t.isUnaryExpression(node, opts)` and `t.assertUnaryExpression(node, opts)`.

aliases `UnaryLike`, `Expression`

 - `operator` (required)
 - `argument`: `Expression` (required)
 - `prefix`: `boolean` (default: `false`)

### t.unionTypeAnnotation(types)

See also `t.isUnionTypeAnnotation(node, opts)` and `t.assertUnionTypeAnnotation(node, opts)`.

aliases `Flow`

 - `types` (required)

### t.updateExpression(operator, argument, prefix)

See also `t.isUpdateExpression(node, opts)` and `t.assertUpdateExpression(node, opts)`.

aliases `Expression`

 - `operator` (required)
 - `argument`: `Expression` (required)
 - `prefix`: `boolean` (default: `false`)

### t.variableDeclaration(kind, declarations)

See also `t.isVariableDeclaration(node, opts)` and `t.assertVariableDeclaration(node, opts)`.

aliases `Statement`, `Declaration`

 - `kind`: `"var" | "let" | "const"` (required)
 - `declarations`: `Array<VariableDeclarator>` (required)

### t.variableDeclarator(id, init)

See also `t.isVariableDeclarator(node, opts)` and `t.assertVariableDeclarator(node, opts)`.

 - `id`: `LVal` (required)
 - `init`: `Expression` (default: `null`)

### t.voidTypeAnnotation()

See also `t.isVoidTypeAnnotation(node, opts)` and `t.assertVoidTypeAnnotation(node, opts)`.

aliases `Flow`, `FlowBaseAnnotation`


### t.whileStatement(test, body)

See also `t.isWhileStatement(node, opts)` and `t.assertWhileStatement(node, opts)`.

aliases `Statement`, `BlockParent`, `Loop`, `While`, `Scopable`

 - `test`: `Expression` (required)
 - `body`: `BlockStatement | Statement` (required)

### t.withStatement(object, body)

See also `t.isWithStatement(node, opts)` and `t.assertWithStatement(node, opts)`.

aliases `Statement`

 - `object` (required)
 - `body`: `BlockStatement` (required)

### t.yieldExpression(argument, delegate)

See also `t.isYieldExpression(node, opts)` and `t.assertYieldExpression(node, opts)`.

aliases `Expression`, `Terminatorless`

 - `argument`: `Expression` (default: `null`)
 - `delegate`: `boolean` (default: `false`)


<!-- end generated section -->

