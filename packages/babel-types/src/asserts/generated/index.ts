/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import is from "../../validators/is";

function assert(type: string, node: any, opts?: any): void {
  if (!is(type, node, opts)) {
    throw new Error(
      `Expected type "${type}" with option ${JSON.stringify(opts)}, ` +
        `but instead got "${node.type}".`,
    );
  }
}

export function assertArrayExpression(node: any, opts: any = {}): void {
  assert("ArrayExpression", node, opts);
}
export function assertAssignmentExpression(node: any, opts: any = {}): void {
  assert("AssignmentExpression", node, opts);
}
export function assertBinaryExpression(node: any, opts: any = {}): void {
  assert("BinaryExpression", node, opts);
}
export function assertInterpreterDirective(node: any, opts: any = {}): void {
  assert("InterpreterDirective", node, opts);
}
export function assertDirective(node: any, opts: any = {}): void {
  assert("Directive", node, opts);
}
export function assertDirectiveLiteral(node: any, opts: any = {}): void {
  assert("DirectiveLiteral", node, opts);
}
export function assertBlockStatement(node: any, opts: any = {}): void {
  assert("BlockStatement", node, opts);
}
export function assertBreakStatement(node: any, opts: any = {}): void {
  assert("BreakStatement", node, opts);
}
export function assertCallExpression(node: any, opts: any = {}): void {
  assert("CallExpression", node, opts);
}
export function assertCatchClause(node: any, opts: any = {}): void {
  assert("CatchClause", node, opts);
}
export function assertConditionalExpression(node: any, opts: any = {}): void {
  assert("ConditionalExpression", node, opts);
}
export function assertContinueStatement(node: any, opts: any = {}): void {
  assert("ContinueStatement", node, opts);
}
export function assertDebuggerStatement(node: any, opts: any = {}): void {
  assert("DebuggerStatement", node, opts);
}
export function assertDoWhileStatement(node: any, opts: any = {}): void {
  assert("DoWhileStatement", node, opts);
}
export function assertEmptyStatement(node: any, opts: any = {}): void {
  assert("EmptyStatement", node, opts);
}
export function assertExpressionStatement(node: any, opts: any = {}): void {
  assert("ExpressionStatement", node, opts);
}
export function assertFile(node: any, opts: any = {}): void {
  assert("File", node, opts);
}
export function assertForInStatement(node: any, opts: any = {}): void {
  assert("ForInStatement", node, opts);
}
export function assertForStatement(node: any, opts: any = {}): void {
  assert("ForStatement", node, opts);
}
export function assertFunctionDeclaration(node: any, opts: any = {}): void {
  assert("FunctionDeclaration", node, opts);
}
export function assertFunctionExpression(node: any, opts: any = {}): void {
  assert("FunctionExpression", node, opts);
}
export function assertIdentifier(node: any, opts: any = {}): void {
  assert("Identifier", node, opts);
}
export function assertIfStatement(node: any, opts: any = {}): void {
  assert("IfStatement", node, opts);
}
export function assertLabeledStatement(node: any, opts: any = {}): void {
  assert("LabeledStatement", node, opts);
}
export function assertStringLiteral(node: any, opts: any = {}): void {
  assert("StringLiteral", node, opts);
}
export function assertNumericLiteral(node: any, opts: any = {}): void {
  assert("NumericLiteral", node, opts);
}
export function assertNullLiteral(node: any, opts: any = {}): void {
  assert("NullLiteral", node, opts);
}
export function assertBooleanLiteral(node: any, opts: any = {}): void {
  assert("BooleanLiteral", node, opts);
}
export function assertRegExpLiteral(node: any, opts: any = {}): void {
  assert("RegExpLiteral", node, opts);
}
export function assertLogicalExpression(node: any, opts: any = {}): void {
  assert("LogicalExpression", node, opts);
}
export function assertMemberExpression(node: any, opts: any = {}): void {
  assert("MemberExpression", node, opts);
}
export function assertNewExpression(node: any, opts: any = {}): void {
  assert("NewExpression", node, opts);
}
export function assertProgram(node: any, opts: any = {}): void {
  assert("Program", node, opts);
}
export function assertObjectExpression(node: any, opts: any = {}): void {
  assert("ObjectExpression", node, opts);
}
export function assertObjectMethod(node: any, opts: any = {}): void {
  assert("ObjectMethod", node, opts);
}
export function assertObjectProperty(node: any, opts: any = {}): void {
  assert("ObjectProperty", node, opts);
}
export function assertRestElement(node: any, opts: any = {}): void {
  assert("RestElement", node, opts);
}
export function assertReturnStatement(node: any, opts: any = {}): void {
  assert("ReturnStatement", node, opts);
}
export function assertSequenceExpression(node: any, opts: any = {}): void {
  assert("SequenceExpression", node, opts);
}
export function assertParenthesizedExpression(node: any, opts: any = {}): void {
  assert("ParenthesizedExpression", node, opts);
}
export function assertSwitchCase(node: any, opts: any = {}): void {
  assert("SwitchCase", node, opts);
}
export function assertSwitchStatement(node: any, opts: any = {}): void {
  assert("SwitchStatement", node, opts);
}
export function assertThisExpression(node: any, opts: any = {}): void {
  assert("ThisExpression", node, opts);
}
export function assertThrowStatement(node: any, opts: any = {}): void {
  assert("ThrowStatement", node, opts);
}
export function assertTryStatement(node: any, opts: any = {}): void {
  assert("TryStatement", node, opts);
}
export function assertUnaryExpression(node: any, opts: any = {}): void {
  assert("UnaryExpression", node, opts);
}
export function assertUpdateExpression(node: any, opts: any = {}): void {
  assert("UpdateExpression", node, opts);
}
export function assertVariableDeclaration(node: any, opts: any = {}): void {
  assert("VariableDeclaration", node, opts);
}
export function assertVariableDeclarator(node: any, opts: any = {}): void {
  assert("VariableDeclarator", node, opts);
}
export function assertWhileStatement(node: any, opts: any = {}): void {
  assert("WhileStatement", node, opts);
}
export function assertWithStatement(node: any, opts: any = {}): void {
  assert("WithStatement", node, opts);
}
export function assertAssignmentPattern(node: any, opts: any = {}): void {
  assert("AssignmentPattern", node, opts);
}
export function assertArrayPattern(node: any, opts: any = {}): void {
  assert("ArrayPattern", node, opts);
}
export function assertArrowFunctionExpression(node: any, opts: any = {}): void {
  assert("ArrowFunctionExpression", node, opts);
}
export function assertClassBody(node: any, opts: any = {}): void {
  assert("ClassBody", node, opts);
}
export function assertClassExpression(node: any, opts: any = {}): void {
  assert("ClassExpression", node, opts);
}
export function assertClassDeclaration(node: any, opts: any = {}): void {
  assert("ClassDeclaration", node, opts);
}
export function assertExportAllDeclaration(node: any, opts: any = {}): void {
  assert("ExportAllDeclaration", node, opts);
}
export function assertExportDefaultDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("ExportDefaultDeclaration", node, opts);
}
export function assertExportNamedDeclaration(node: any, opts: any = {}): void {
  assert("ExportNamedDeclaration", node, opts);
}
export function assertExportSpecifier(node: any, opts: any = {}): void {
  assert("ExportSpecifier", node, opts);
}
export function assertForOfStatement(node: any, opts: any = {}): void {
  assert("ForOfStatement", node, opts);
}
export function assertImportDeclaration(node: any, opts: any = {}): void {
  assert("ImportDeclaration", node, opts);
}
export function assertImportDefaultSpecifier(node: any, opts: any = {}): void {
  assert("ImportDefaultSpecifier", node, opts);
}
export function assertImportNamespaceSpecifier(
  node: any,
  opts: any = {},
): void {
  assert("ImportNamespaceSpecifier", node, opts);
}
export function assertImportSpecifier(node: any, opts: any = {}): void {
  assert("ImportSpecifier", node, opts);
}
export function assertMetaProperty(node: any, opts: any = {}): void {
  assert("MetaProperty", node, opts);
}
export function assertClassMethod(node: any, opts: any = {}): void {
  assert("ClassMethod", node, opts);
}
export function assertObjectPattern(node: any, opts: any = {}): void {
  assert("ObjectPattern", node, opts);
}
export function assertSpreadElement(node: any, opts: any = {}): void {
  assert("SpreadElement", node, opts);
}
export function assertSuper(node: any, opts: any = {}): void {
  assert("Super", node, opts);
}
export function assertTaggedTemplateExpression(
  node: any,
  opts: any = {},
): void {
  assert("TaggedTemplateExpression", node, opts);
}
export function assertTemplateElement(node: any, opts: any = {}): void {
  assert("TemplateElement", node, opts);
}
export function assertTemplateLiteral(node: any, opts: any = {}): void {
  assert("TemplateLiteral", node, opts);
}
export function assertYieldExpression(node: any, opts: any = {}): void {
  assert("YieldExpression", node, opts);
}
export function assertAwaitExpression(node: any, opts: any = {}): void {
  assert("AwaitExpression", node, opts);
}
export function assertImport(node: any, opts: any = {}): void {
  assert("Import", node, opts);
}
export function assertBigIntLiteral(node: any, opts: any = {}): void {
  assert("BigIntLiteral", node, opts);
}
export function assertExportNamespaceSpecifier(
  node: any,
  opts: any = {},
): void {
  assert("ExportNamespaceSpecifier", node, opts);
}
export function assertOptionalMemberExpression(
  node: any,
  opts: any = {},
): void {
  assert("OptionalMemberExpression", node, opts);
}
export function assertOptionalCallExpression(node: any, opts: any = {}): void {
  assert("OptionalCallExpression", node, opts);
}
export function assertAnyTypeAnnotation(node: any, opts: any = {}): void {
  assert("AnyTypeAnnotation", node, opts);
}
export function assertArrayTypeAnnotation(node: any, opts: any = {}): void {
  assert("ArrayTypeAnnotation", node, opts);
}
export function assertBooleanTypeAnnotation(node: any, opts: any = {}): void {
  assert("BooleanTypeAnnotation", node, opts);
}
export function assertBooleanLiteralTypeAnnotation(
  node: any,
  opts: any = {},
): void {
  assert("BooleanLiteralTypeAnnotation", node, opts);
}
export function assertNullLiteralTypeAnnotation(
  node: any,
  opts: any = {},
): void {
  assert("NullLiteralTypeAnnotation", node, opts);
}
export function assertClassImplements(node: any, opts: any = {}): void {
  assert("ClassImplements", node, opts);
}
export function assertDeclareClass(node: any, opts: any = {}): void {
  assert("DeclareClass", node, opts);
}
export function assertDeclareFunction(node: any, opts: any = {}): void {
  assert("DeclareFunction", node, opts);
}
export function assertDeclareInterface(node: any, opts: any = {}): void {
  assert("DeclareInterface", node, opts);
}
export function assertDeclareModule(node: any, opts: any = {}): void {
  assert("DeclareModule", node, opts);
}
export function assertDeclareModuleExports(node: any, opts: any = {}): void {
  assert("DeclareModuleExports", node, opts);
}
export function assertDeclareTypeAlias(node: any, opts: any = {}): void {
  assert("DeclareTypeAlias", node, opts);
}
export function assertDeclareOpaqueType(node: any, opts: any = {}): void {
  assert("DeclareOpaqueType", node, opts);
}
export function assertDeclareVariable(node: any, opts: any = {}): void {
  assert("DeclareVariable", node, opts);
}
export function assertDeclareExportDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("DeclareExportDeclaration", node, opts);
}
export function assertDeclareExportAllDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("DeclareExportAllDeclaration", node, opts);
}
export function assertDeclaredPredicate(node: any, opts: any = {}): void {
  assert("DeclaredPredicate", node, opts);
}
export function assertExistsTypeAnnotation(node: any, opts: any = {}): void {
  assert("ExistsTypeAnnotation", node, opts);
}
export function assertFunctionTypeAnnotation(node: any, opts: any = {}): void {
  assert("FunctionTypeAnnotation", node, opts);
}
export function assertFunctionTypeParam(node: any, opts: any = {}): void {
  assert("FunctionTypeParam", node, opts);
}
export function assertGenericTypeAnnotation(node: any, opts: any = {}): void {
  assert("GenericTypeAnnotation", node, opts);
}
export function assertInferredPredicate(node: any, opts: any = {}): void {
  assert("InferredPredicate", node, opts);
}
export function assertInterfaceExtends(node: any, opts: any = {}): void {
  assert("InterfaceExtends", node, opts);
}
export function assertInterfaceDeclaration(node: any, opts: any = {}): void {
  assert("InterfaceDeclaration", node, opts);
}
export function assertInterfaceTypeAnnotation(node: any, opts: any = {}): void {
  assert("InterfaceTypeAnnotation", node, opts);
}
export function assertIntersectionTypeAnnotation(
  node: any,
  opts: any = {},
): void {
  assert("IntersectionTypeAnnotation", node, opts);
}
export function assertMixedTypeAnnotation(node: any, opts: any = {}): void {
  assert("MixedTypeAnnotation", node, opts);
}
export function assertEmptyTypeAnnotation(node: any, opts: any = {}): void {
  assert("EmptyTypeAnnotation", node, opts);
}
export function assertNullableTypeAnnotation(node: any, opts: any = {}): void {
  assert("NullableTypeAnnotation", node, opts);
}
export function assertNumberLiteralTypeAnnotation(
  node: any,
  opts: any = {},
): void {
  assert("NumberLiteralTypeAnnotation", node, opts);
}
export function assertNumberTypeAnnotation(node: any, opts: any = {}): void {
  assert("NumberTypeAnnotation", node, opts);
}
export function assertObjectTypeAnnotation(node: any, opts: any = {}): void {
  assert("ObjectTypeAnnotation", node, opts);
}
export function assertObjectTypeInternalSlot(node: any, opts: any = {}): void {
  assert("ObjectTypeInternalSlot", node, opts);
}
export function assertObjectTypeCallProperty(node: any, opts: any = {}): void {
  assert("ObjectTypeCallProperty", node, opts);
}
export function assertObjectTypeIndexer(node: any, opts: any = {}): void {
  assert("ObjectTypeIndexer", node, opts);
}
export function assertObjectTypeProperty(node: any, opts: any = {}): void {
  assert("ObjectTypeProperty", node, opts);
}
export function assertObjectTypeSpreadProperty(
  node: any,
  opts: any = {},
): void {
  assert("ObjectTypeSpreadProperty", node, opts);
}
export function assertOpaqueType(node: any, opts: any = {}): void {
  assert("OpaqueType", node, opts);
}
export function assertQualifiedTypeIdentifier(node: any, opts: any = {}): void {
  assert("QualifiedTypeIdentifier", node, opts);
}
export function assertStringLiteralTypeAnnotation(
  node: any,
  opts: any = {},
): void {
  assert("StringLiteralTypeAnnotation", node, opts);
}
export function assertStringTypeAnnotation(node: any, opts: any = {}): void {
  assert("StringTypeAnnotation", node, opts);
}
export function assertSymbolTypeAnnotation(node: any, opts: any = {}): void {
  assert("SymbolTypeAnnotation", node, opts);
}
export function assertThisTypeAnnotation(node: any, opts: any = {}): void {
  assert("ThisTypeAnnotation", node, opts);
}
export function assertTupleTypeAnnotation(node: any, opts: any = {}): void {
  assert("TupleTypeAnnotation", node, opts);
}
export function assertTypeofTypeAnnotation(node: any, opts: any = {}): void {
  assert("TypeofTypeAnnotation", node, opts);
}
export function assertTypeAlias(node: any, opts: any = {}): void {
  assert("TypeAlias", node, opts);
}
export function assertTypeAnnotation(node: any, opts: any = {}): void {
  assert("TypeAnnotation", node, opts);
}
export function assertTypeCastExpression(node: any, opts: any = {}): void {
  assert("TypeCastExpression", node, opts);
}
export function assertTypeParameter(node: any, opts: any = {}): void {
  assert("TypeParameter", node, opts);
}
export function assertTypeParameterDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("TypeParameterDeclaration", node, opts);
}
export function assertTypeParameterInstantiation(
  node: any,
  opts: any = {},
): void {
  assert("TypeParameterInstantiation", node, opts);
}
export function assertUnionTypeAnnotation(node: any, opts: any = {}): void {
  assert("UnionTypeAnnotation", node, opts);
}
export function assertVariance(node: any, opts: any = {}): void {
  assert("Variance", node, opts);
}
export function assertVoidTypeAnnotation(node: any, opts: any = {}): void {
  assert("VoidTypeAnnotation", node, opts);
}
export function assertEnumDeclaration(node: any, opts: any = {}): void {
  assert("EnumDeclaration", node, opts);
}
export function assertEnumBooleanBody(node: any, opts: any = {}): void {
  assert("EnumBooleanBody", node, opts);
}
export function assertEnumNumberBody(node: any, opts: any = {}): void {
  assert("EnumNumberBody", node, opts);
}
export function assertEnumStringBody(node: any, opts: any = {}): void {
  assert("EnumStringBody", node, opts);
}
export function assertEnumSymbolBody(node: any, opts: any = {}): void {
  assert("EnumSymbolBody", node, opts);
}
export function assertEnumBooleanMember(node: any, opts: any = {}): void {
  assert("EnumBooleanMember", node, opts);
}
export function assertEnumNumberMember(node: any, opts: any = {}): void {
  assert("EnumNumberMember", node, opts);
}
export function assertEnumStringMember(node: any, opts: any = {}): void {
  assert("EnumStringMember", node, opts);
}
export function assertEnumDefaultedMember(node: any, opts: any = {}): void {
  assert("EnumDefaultedMember", node, opts);
}
export function assertJSXAttribute(node: any, opts: any = {}): void {
  assert("JSXAttribute", node, opts);
}
export function assertJSXClosingElement(node: any, opts: any = {}): void {
  assert("JSXClosingElement", node, opts);
}
export function assertJSXElement(node: any, opts: any = {}): void {
  assert("JSXElement", node, opts);
}
export function assertJSXEmptyExpression(node: any, opts: any = {}): void {
  assert("JSXEmptyExpression", node, opts);
}
export function assertJSXExpressionContainer(node: any, opts: any = {}): void {
  assert("JSXExpressionContainer", node, opts);
}
export function assertJSXSpreadChild(node: any, opts: any = {}): void {
  assert("JSXSpreadChild", node, opts);
}
export function assertJSXIdentifier(node: any, opts: any = {}): void {
  assert("JSXIdentifier", node, opts);
}
export function assertJSXMemberExpression(node: any, opts: any = {}): void {
  assert("JSXMemberExpression", node, opts);
}
export function assertJSXNamespacedName(node: any, opts: any = {}): void {
  assert("JSXNamespacedName", node, opts);
}
export function assertJSXOpeningElement(node: any, opts: any = {}): void {
  assert("JSXOpeningElement", node, opts);
}
export function assertJSXSpreadAttribute(node: any, opts: any = {}): void {
  assert("JSXSpreadAttribute", node, opts);
}
export function assertJSXText(node: any, opts: any = {}): void {
  assert("JSXText", node, opts);
}
export function assertJSXFragment(node: any, opts: any = {}): void {
  assert("JSXFragment", node, opts);
}
export function assertJSXOpeningFragment(node: any, opts: any = {}): void {
  assert("JSXOpeningFragment", node, opts);
}
export function assertJSXClosingFragment(node: any, opts: any = {}): void {
  assert("JSXClosingFragment", node, opts);
}
export function assertNoop(node: any, opts: any = {}): void {
  assert("Noop", node, opts);
}
export function assertPlaceholder(node: any, opts: any = {}): void {
  assert("Placeholder", node, opts);
}
export function assertV8IntrinsicIdentifier(node: any, opts: any = {}): void {
  assert("V8IntrinsicIdentifier", node, opts);
}
export function assertArgumentPlaceholder(node: any, opts: any = {}): void {
  assert("ArgumentPlaceholder", node, opts);
}
export function assertBindExpression(node: any, opts: any = {}): void {
  assert("BindExpression", node, opts);
}
export function assertClassProperty(node: any, opts: any = {}): void {
  assert("ClassProperty", node, opts);
}
export function assertPipelineTopicExpression(node: any, opts: any = {}): void {
  assert("PipelineTopicExpression", node, opts);
}
export function assertPipelineBareFunction(node: any, opts: any = {}): void {
  assert("PipelineBareFunction", node, opts);
}
export function assertPipelinePrimaryTopicReference(
  node: any,
  opts: any = {},
): void {
  assert("PipelinePrimaryTopicReference", node, opts);
}
export function assertClassPrivateProperty(node: any, opts: any = {}): void {
  assert("ClassPrivateProperty", node, opts);
}
export function assertClassPrivateMethod(node: any, opts: any = {}): void {
  assert("ClassPrivateMethod", node, opts);
}
export function assertImportAttribute(node: any, opts: any = {}): void {
  assert("ImportAttribute", node, opts);
}
export function assertDecorator(node: any, opts: any = {}): void {
  assert("Decorator", node, opts);
}
export function assertDoExpression(node: any, opts: any = {}): void {
  assert("DoExpression", node, opts);
}
export function assertExportDefaultSpecifier(node: any, opts: any = {}): void {
  assert("ExportDefaultSpecifier", node, opts);
}
export function assertPrivateName(node: any, opts: any = {}): void {
  assert("PrivateName", node, opts);
}
export function assertRecordExpression(node: any, opts: any = {}): void {
  assert("RecordExpression", node, opts);
}
export function assertTupleExpression(node: any, opts: any = {}): void {
  assert("TupleExpression", node, opts);
}
export function assertDecimalLiteral(node: any, opts: any = {}): void {
  assert("DecimalLiteral", node, opts);
}
export function assertStaticBlock(node: any, opts: any = {}): void {
  assert("StaticBlock", node, opts);
}
export function assertTSParameterProperty(node: any, opts: any = {}): void {
  assert("TSParameterProperty", node, opts);
}
export function assertTSDeclareFunction(node: any, opts: any = {}): void {
  assert("TSDeclareFunction", node, opts);
}
export function assertTSDeclareMethod(node: any, opts: any = {}): void {
  assert("TSDeclareMethod", node, opts);
}
export function assertTSQualifiedName(node: any, opts: any = {}): void {
  assert("TSQualifiedName", node, opts);
}
export function assertTSCallSignatureDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("TSCallSignatureDeclaration", node, opts);
}
export function assertTSConstructSignatureDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("TSConstructSignatureDeclaration", node, opts);
}
export function assertTSPropertySignature(node: any, opts: any = {}): void {
  assert("TSPropertySignature", node, opts);
}
export function assertTSMethodSignature(node: any, opts: any = {}): void {
  assert("TSMethodSignature", node, opts);
}
export function assertTSIndexSignature(node: any, opts: any = {}): void {
  assert("TSIndexSignature", node, opts);
}
export function assertTSAnyKeyword(node: any, opts: any = {}): void {
  assert("TSAnyKeyword", node, opts);
}
export function assertTSBooleanKeyword(node: any, opts: any = {}): void {
  assert("TSBooleanKeyword", node, opts);
}
export function assertTSBigIntKeyword(node: any, opts: any = {}): void {
  assert("TSBigIntKeyword", node, opts);
}
export function assertTSIntrinsicKeyword(node: any, opts: any = {}): void {
  assert("TSIntrinsicKeyword", node, opts);
}
export function assertTSNeverKeyword(node: any, opts: any = {}): void {
  assert("TSNeverKeyword", node, opts);
}
export function assertTSNullKeyword(node: any, opts: any = {}): void {
  assert("TSNullKeyword", node, opts);
}
export function assertTSNumberKeyword(node: any, opts: any = {}): void {
  assert("TSNumberKeyword", node, opts);
}
export function assertTSObjectKeyword(node: any, opts: any = {}): void {
  assert("TSObjectKeyword", node, opts);
}
export function assertTSStringKeyword(node: any, opts: any = {}): void {
  assert("TSStringKeyword", node, opts);
}
export function assertTSSymbolKeyword(node: any, opts: any = {}): void {
  assert("TSSymbolKeyword", node, opts);
}
export function assertTSUndefinedKeyword(node: any, opts: any = {}): void {
  assert("TSUndefinedKeyword", node, opts);
}
export function assertTSUnknownKeyword(node: any, opts: any = {}): void {
  assert("TSUnknownKeyword", node, opts);
}
export function assertTSVoidKeyword(node: any, opts: any = {}): void {
  assert("TSVoidKeyword", node, opts);
}
export function assertTSThisType(node: any, opts: any = {}): void {
  assert("TSThisType", node, opts);
}
export function assertTSFunctionType(node: any, opts: any = {}): void {
  assert("TSFunctionType", node, opts);
}
export function assertTSConstructorType(node: any, opts: any = {}): void {
  assert("TSConstructorType", node, opts);
}
export function assertTSTypeReference(node: any, opts: any = {}): void {
  assert("TSTypeReference", node, opts);
}
export function assertTSTypePredicate(node: any, opts: any = {}): void {
  assert("TSTypePredicate", node, opts);
}
export function assertTSTypeQuery(node: any, opts: any = {}): void {
  assert("TSTypeQuery", node, opts);
}
export function assertTSTypeLiteral(node: any, opts: any = {}): void {
  assert("TSTypeLiteral", node, opts);
}
export function assertTSArrayType(node: any, opts: any = {}): void {
  assert("TSArrayType", node, opts);
}
export function assertTSTupleType(node: any, opts: any = {}): void {
  assert("TSTupleType", node, opts);
}
export function assertTSOptionalType(node: any, opts: any = {}): void {
  assert("TSOptionalType", node, opts);
}
export function assertTSRestType(node: any, opts: any = {}): void {
  assert("TSRestType", node, opts);
}
export function assertTSNamedTupleMember(node: any, opts: any = {}): void {
  assert("TSNamedTupleMember", node, opts);
}
export function assertTSUnionType(node: any, opts: any = {}): void {
  assert("TSUnionType", node, opts);
}
export function assertTSIntersectionType(node: any, opts: any = {}): void {
  assert("TSIntersectionType", node, opts);
}
export function assertTSConditionalType(node: any, opts: any = {}): void {
  assert("TSConditionalType", node, opts);
}
export function assertTSInferType(node: any, opts: any = {}): void {
  assert("TSInferType", node, opts);
}
export function assertTSParenthesizedType(node: any, opts: any = {}): void {
  assert("TSParenthesizedType", node, opts);
}
export function assertTSTypeOperator(node: any, opts: any = {}): void {
  assert("TSTypeOperator", node, opts);
}
export function assertTSIndexedAccessType(node: any, opts: any = {}): void {
  assert("TSIndexedAccessType", node, opts);
}
export function assertTSMappedType(node: any, opts: any = {}): void {
  assert("TSMappedType", node, opts);
}
export function assertTSLiteralType(node: any, opts: any = {}): void {
  assert("TSLiteralType", node, opts);
}
export function assertTSExpressionWithTypeArguments(
  node: any,
  opts: any = {},
): void {
  assert("TSExpressionWithTypeArguments", node, opts);
}
export function assertTSInterfaceDeclaration(node: any, opts: any = {}): void {
  assert("TSInterfaceDeclaration", node, opts);
}
export function assertTSInterfaceBody(node: any, opts: any = {}): void {
  assert("TSInterfaceBody", node, opts);
}
export function assertTSTypeAliasDeclaration(node: any, opts: any = {}): void {
  assert("TSTypeAliasDeclaration", node, opts);
}
export function assertTSAsExpression(node: any, opts: any = {}): void {
  assert("TSAsExpression", node, opts);
}
export function assertTSTypeAssertion(node: any, opts: any = {}): void {
  assert("TSTypeAssertion", node, opts);
}
export function assertTSEnumDeclaration(node: any, opts: any = {}): void {
  assert("TSEnumDeclaration", node, opts);
}
export function assertTSEnumMember(node: any, opts: any = {}): void {
  assert("TSEnumMember", node, opts);
}
export function assertTSModuleDeclaration(node: any, opts: any = {}): void {
  assert("TSModuleDeclaration", node, opts);
}
export function assertTSModuleBlock(node: any, opts: any = {}): void {
  assert("TSModuleBlock", node, opts);
}
export function assertTSImportType(node: any, opts: any = {}): void {
  assert("TSImportType", node, opts);
}
export function assertTSImportEqualsDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("TSImportEqualsDeclaration", node, opts);
}
export function assertTSExternalModuleReference(
  node: any,
  opts: any = {},
): void {
  assert("TSExternalModuleReference", node, opts);
}
export function assertTSNonNullExpression(node: any, opts: any = {}): void {
  assert("TSNonNullExpression", node, opts);
}
export function assertTSExportAssignment(node: any, opts: any = {}): void {
  assert("TSExportAssignment", node, opts);
}
export function assertTSNamespaceExportDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("TSNamespaceExportDeclaration", node, opts);
}
export function assertTSTypeAnnotation(node: any, opts: any = {}): void {
  assert("TSTypeAnnotation", node, opts);
}
export function assertTSTypeParameterInstantiation(
  node: any,
  opts: any = {},
): void {
  assert("TSTypeParameterInstantiation", node, opts);
}
export function assertTSTypeParameterDeclaration(
  node: any,
  opts: any = {},
): void {
  assert("TSTypeParameterDeclaration", node, opts);
}
export function assertTSTypeParameter(node: any, opts: any = {}): void {
  assert("TSTypeParameter", node, opts);
}
export function assertExpression(node: any, opts: any = {}): void {
  assert("Expression", node, opts);
}
export function assertBinary(node: any, opts: any = {}): void {
  assert("Binary", node, opts);
}
export function assertScopable(node: any, opts: any = {}): void {
  assert("Scopable", node, opts);
}
export function assertBlockParent(node: any, opts: any = {}): void {
  assert("BlockParent", node, opts);
}
export function assertBlock(node: any, opts: any = {}): void {
  assert("Block", node, opts);
}
export function assertStatement(node: any, opts: any = {}): void {
  assert("Statement", node, opts);
}
export function assertTerminatorless(node: any, opts: any = {}): void {
  assert("Terminatorless", node, opts);
}
export function assertCompletionStatement(node: any, opts: any = {}): void {
  assert("CompletionStatement", node, opts);
}
export function assertConditional(node: any, opts: any = {}): void {
  assert("Conditional", node, opts);
}
export function assertLoop(node: any, opts: any = {}): void {
  assert("Loop", node, opts);
}
export function assertWhile(node: any, opts: any = {}): void {
  assert("While", node, opts);
}
export function assertExpressionWrapper(node: any, opts: any = {}): void {
  assert("ExpressionWrapper", node, opts);
}
export function assertFor(node: any, opts: any = {}): void {
  assert("For", node, opts);
}
export function assertForXStatement(node: any, opts: any = {}): void {
  assert("ForXStatement", node, opts);
}
export function assertFunction(node: any, opts: any = {}): void {
  assert("Function", node, opts);
}
export function assertFunctionParent(node: any, opts: any = {}): void {
  assert("FunctionParent", node, opts);
}
export function assertPureish(node: any, opts: any = {}): void {
  assert("Pureish", node, opts);
}
export function assertDeclaration(node: any, opts: any = {}): void {
  assert("Declaration", node, opts);
}
export function assertPatternLike(node: any, opts: any = {}): void {
  assert("PatternLike", node, opts);
}
export function assertLVal(node: any, opts: any = {}): void {
  assert("LVal", node, opts);
}
export function assertTSEntityName(node: any, opts: any = {}): void {
  assert("TSEntityName", node, opts);
}
export function assertLiteral(node: any, opts: any = {}): void {
  assert("Literal", node, opts);
}
export function assertImmutable(node: any, opts: any = {}): void {
  assert("Immutable", node, opts);
}
export function assertUserWhitespacable(node: any, opts: any = {}): void {
  assert("UserWhitespacable", node, opts);
}
export function assertMethod(node: any, opts: any = {}): void {
  assert("Method", node, opts);
}
export function assertObjectMember(node: any, opts: any = {}): void {
  assert("ObjectMember", node, opts);
}
export function assertProperty(node: any, opts: any = {}): void {
  assert("Property", node, opts);
}
export function assertUnaryLike(node: any, opts: any = {}): void {
  assert("UnaryLike", node, opts);
}
export function assertPattern(node: any, opts: any = {}): void {
  assert("Pattern", node, opts);
}
export function assertClass(node: any, opts: any = {}): void {
  assert("Class", node, opts);
}
export function assertModuleDeclaration(node: any, opts: any = {}): void {
  assert("ModuleDeclaration", node, opts);
}
export function assertExportDeclaration(node: any, opts: any = {}): void {
  assert("ExportDeclaration", node, opts);
}
export function assertModuleSpecifier(node: any, opts: any = {}): void {
  assert("ModuleSpecifier", node, opts);
}
export function assertFlow(node: any, opts: any = {}): void {
  assert("Flow", node, opts);
}
export function assertFlowType(node: any, opts: any = {}): void {
  assert("FlowType", node, opts);
}
export function assertFlowBaseAnnotation(node: any, opts: any = {}): void {
  assert("FlowBaseAnnotation", node, opts);
}
export function assertFlowDeclaration(node: any, opts: any = {}): void {
  assert("FlowDeclaration", node, opts);
}
export function assertFlowPredicate(node: any, opts: any = {}): void {
  assert("FlowPredicate", node, opts);
}
export function assertEnumBody(node: any, opts: any = {}): void {
  assert("EnumBody", node, opts);
}
export function assertEnumMember(node: any, opts: any = {}): void {
  assert("EnumMember", node, opts);
}
export function assertJSX(node: any, opts: any = {}): void {
  assert("JSX", node, opts);
}
export function assertPrivate(node: any, opts: any = {}): void {
  assert("Private", node, opts);
}
export function assertTSTypeElement(node: any, opts: any = {}): void {
  assert("TSTypeElement", node, opts);
}
export function assertTSType(node: any, opts: any = {}): void {
  assert("TSType", node, opts);
}
export function assertTSBaseType(node: any, opts: any = {}): void {
  assert("TSBaseType", node, opts);
}
export function assertNumberLiteral(node: any, opts: any): void {
  console.trace(
    "The node type NumberLiteral has been renamed to NumericLiteral",
  );
  assert("NumberLiteral", node, opts);
}
export function assertRegexLiteral(node: any, opts: any): void {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  assert("RegexLiteral", node, opts);
}
export function assertRestProperty(node: any, opts: any): void {
  console.trace("The node type RestProperty has been renamed to RestElement");
  assert("RestProperty", node, opts);
}
export function assertSpreadProperty(node: any, opts: any): void {
  console.trace(
    "The node type SpreadProperty has been renamed to SpreadElement",
  );
  assert("SpreadProperty", node, opts);
}
