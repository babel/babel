/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import * as t from "@babel/types";
import NodePath from "../index";

export interface NodePathValidators {
  isArrayExpression(opts?: object): this is NodePath<t.ArrayExpression>;
  isAssignmentExpression(
    opts?: object,
  ): this is NodePath<t.AssignmentExpression>;
  isBinaryExpression(opts?: object): this is NodePath<t.BinaryExpression>;
  isInterpreterDirective(
    opts?: object,
  ): this is NodePath<t.InterpreterDirective>;
  isDirective(opts?: object): this is NodePath<t.Directive>;
  isDirectiveLiteral(opts?: object): this is NodePath<t.DirectiveLiteral>;
  isBlockStatement(opts?: object): this is NodePath<t.BlockStatement>;
  isBreakStatement(opts?: object): this is NodePath<t.BreakStatement>;
  isCallExpression(opts?: object): this is NodePath<t.CallExpression>;
  isCatchClause(opts?: object): this is NodePath<t.CatchClause>;
  isConditionalExpression(
    opts?: object,
  ): this is NodePath<t.ConditionalExpression>;
  isContinueStatement(opts?: object): this is NodePath<t.ContinueStatement>;
  isDebuggerStatement(opts?: object): this is NodePath<t.DebuggerStatement>;
  isDoWhileStatement(opts?: object): this is NodePath<t.DoWhileStatement>;
  isEmptyStatement(opts?: object): this is NodePath<t.EmptyStatement>;
  isExpressionStatement(opts?: object): this is NodePath<t.ExpressionStatement>;
  isFile(opts?: object): this is NodePath<t.File>;
  isForInStatement(opts?: object): this is NodePath<t.ForInStatement>;
  isForStatement(opts?: object): this is NodePath<t.ForStatement>;
  isFunctionDeclaration(opts?: object): this is NodePath<t.FunctionDeclaration>;
  isFunctionExpression(opts?: object): this is NodePath<t.FunctionExpression>;
  isIdentifier(opts?: object): this is NodePath<t.Identifier>;
  isIfStatement(opts?: object): this is NodePath<t.IfStatement>;
  isLabeledStatement(opts?: object): this is NodePath<t.LabeledStatement>;
  isStringLiteral(opts?: object): this is NodePath<t.StringLiteral>;
  isNumericLiteral(opts?: object): this is NodePath<t.NumericLiteral>;
  isNullLiteral(opts?: object): this is NodePath<t.NullLiteral>;
  isBooleanLiteral(opts?: object): this is NodePath<t.BooleanLiteral>;
  isRegExpLiteral(opts?: object): this is NodePath<t.RegExpLiteral>;
  isLogicalExpression(opts?: object): this is NodePath<t.LogicalExpression>;
  isMemberExpression(opts?: object): this is NodePath<t.MemberExpression>;
  isNewExpression(opts?: object): this is NodePath<t.NewExpression>;
  isProgram(opts?: object): this is NodePath<t.Program>;
  isObjectExpression(opts?: object): this is NodePath<t.ObjectExpression>;
  isObjectMethod(opts?: object): this is NodePath<t.ObjectMethod>;
  isObjectProperty(opts?: object): this is NodePath<t.ObjectProperty>;
  isRestElement(opts?: object): this is NodePath<t.RestElement>;
  isReturnStatement(opts?: object): this is NodePath<t.ReturnStatement>;
  isSequenceExpression(opts?: object): this is NodePath<t.SequenceExpression>;
  isParenthesizedExpression(
    opts?: object,
  ): this is NodePath<t.ParenthesizedExpression>;
  isSwitchCase(opts?: object): this is NodePath<t.SwitchCase>;
  isSwitchStatement(opts?: object): this is NodePath<t.SwitchStatement>;
  isThisExpression(opts?: object): this is NodePath<t.ThisExpression>;
  isThrowStatement(opts?: object): this is NodePath<t.ThrowStatement>;
  isTryStatement(opts?: object): this is NodePath<t.TryStatement>;
  isUnaryExpression(opts?: object): this is NodePath<t.UnaryExpression>;
  isUpdateExpression(opts?: object): this is NodePath<t.UpdateExpression>;
  isVariableDeclaration(opts?: object): this is NodePath<t.VariableDeclaration>;
  isVariableDeclarator(opts?: object): this is NodePath<t.VariableDeclarator>;
  isWhileStatement(opts?: object): this is NodePath<t.WhileStatement>;
  isWithStatement(opts?: object): this is NodePath<t.WithStatement>;
  isAssignmentPattern(opts?: object): this is NodePath<t.AssignmentPattern>;
  isArrayPattern(opts?: object): this is NodePath<t.ArrayPattern>;
  isArrowFunctionExpression(
    opts?: object,
  ): this is NodePath<t.ArrowFunctionExpression>;
  isClassBody(opts?: object): this is NodePath<t.ClassBody>;
  isClassExpression(opts?: object): this is NodePath<t.ClassExpression>;
  isClassDeclaration(opts?: object): this is NodePath<t.ClassDeclaration>;
  isExportAllDeclaration(
    opts?: object,
  ): this is NodePath<t.ExportAllDeclaration>;
  isExportDefaultDeclaration(
    opts?: object,
  ): this is NodePath<t.ExportDefaultDeclaration>;
  isExportNamedDeclaration(
    opts?: object,
  ): this is NodePath<t.ExportNamedDeclaration>;
  isExportSpecifier(opts?: object): this is NodePath<t.ExportSpecifier>;
  isForOfStatement(opts?: object): this is NodePath<t.ForOfStatement>;
  isImportDeclaration(opts?: object): this is NodePath<t.ImportDeclaration>;
  isImportDefaultSpecifier(
    opts?: object,
  ): this is NodePath<t.ImportDefaultSpecifier>;
  isImportNamespaceSpecifier(
    opts?: object,
  ): this is NodePath<t.ImportNamespaceSpecifier>;
  isImportSpecifier(opts?: object): this is NodePath<t.ImportSpecifier>;
  isMetaProperty(opts?: object): this is NodePath<t.MetaProperty>;
  isClassMethod(opts?: object): this is NodePath<t.ClassMethod>;
  isObjectPattern(opts?: object): this is NodePath<t.ObjectPattern>;
  isSpreadElement(opts?: object): this is NodePath<t.SpreadElement>;
  isSuper(opts?: object): this is NodePath<t.Super>;
  isTaggedTemplateExpression(
    opts?: object,
  ): this is NodePath<t.TaggedTemplateExpression>;
  isTemplateElement(opts?: object): this is NodePath<t.TemplateElement>;
  isTemplateLiteral(opts?: object): this is NodePath<t.TemplateLiteral>;
  isYieldExpression(opts?: object): this is NodePath<t.YieldExpression>;
  isAwaitExpression(opts?: object): this is NodePath<t.AwaitExpression>;
  isImport(opts?: object): this is NodePath<t.Import>;
  isBigIntLiteral(opts?: object): this is NodePath<t.BigIntLiteral>;
  isExportNamespaceSpecifier(
    opts?: object,
  ): this is NodePath<t.ExportNamespaceSpecifier>;
  isOptionalMemberExpression(
    opts?: object,
  ): this is NodePath<t.OptionalMemberExpression>;
  isOptionalCallExpression(
    opts?: object,
  ): this is NodePath<t.OptionalCallExpression>;
  isAnyTypeAnnotation(opts?: object): this is NodePath<t.AnyTypeAnnotation>;
  isArrayTypeAnnotation(opts?: object): this is NodePath<t.ArrayTypeAnnotation>;
  isBooleanTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.BooleanTypeAnnotation>;
  isBooleanLiteralTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.BooleanLiteralTypeAnnotation>;
  isNullLiteralTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.NullLiteralTypeAnnotation>;
  isClassImplements(opts?: object): this is NodePath<t.ClassImplements>;
  isDeclareClass(opts?: object): this is NodePath<t.DeclareClass>;
  isDeclareFunction(opts?: object): this is NodePath<t.DeclareFunction>;
  isDeclareInterface(opts?: object): this is NodePath<t.DeclareInterface>;
  isDeclareModule(opts?: object): this is NodePath<t.DeclareModule>;
  isDeclareModuleExports(
    opts?: object,
  ): this is NodePath<t.DeclareModuleExports>;
  isDeclareTypeAlias(opts?: object): this is NodePath<t.DeclareTypeAlias>;
  isDeclareOpaqueType(opts?: object): this is NodePath<t.DeclareOpaqueType>;
  isDeclareVariable(opts?: object): this is NodePath<t.DeclareVariable>;
  isDeclareExportDeclaration(
    opts?: object,
  ): this is NodePath<t.DeclareExportDeclaration>;
  isDeclareExportAllDeclaration(
    opts?: object,
  ): this is NodePath<t.DeclareExportAllDeclaration>;
  isDeclaredPredicate(opts?: object): this is NodePath<t.DeclaredPredicate>;
  isExistsTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.ExistsTypeAnnotation>;
  isFunctionTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.FunctionTypeAnnotation>;
  isFunctionTypeParam(opts?: object): this is NodePath<t.FunctionTypeParam>;
  isGenericTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.GenericTypeAnnotation>;
  isInferredPredicate(opts?: object): this is NodePath<t.InferredPredicate>;
  isInterfaceExtends(opts?: object): this is NodePath<t.InterfaceExtends>;
  isInterfaceDeclaration(
    opts?: object,
  ): this is NodePath<t.InterfaceDeclaration>;
  isInterfaceTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.InterfaceTypeAnnotation>;
  isIntersectionTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.IntersectionTypeAnnotation>;
  isMixedTypeAnnotation(opts?: object): this is NodePath<t.MixedTypeAnnotation>;
  isEmptyTypeAnnotation(opts?: object): this is NodePath<t.EmptyTypeAnnotation>;
  isNullableTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.NullableTypeAnnotation>;
  isNumberLiteralTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.NumberLiteralTypeAnnotation>;
  isNumberTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.NumberTypeAnnotation>;
  isObjectTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.ObjectTypeAnnotation>;
  isObjectTypeInternalSlot(
    opts?: object,
  ): this is NodePath<t.ObjectTypeInternalSlot>;
  isObjectTypeCallProperty(
    opts?: object,
  ): this is NodePath<t.ObjectTypeCallProperty>;
  isObjectTypeIndexer(opts?: object): this is NodePath<t.ObjectTypeIndexer>;
  isObjectTypeProperty(opts?: object): this is NodePath<t.ObjectTypeProperty>;
  isObjectTypeSpreadProperty(
    opts?: object,
  ): this is NodePath<t.ObjectTypeSpreadProperty>;
  isOpaqueType(opts?: object): this is NodePath<t.OpaqueType>;
  isQualifiedTypeIdentifier(
    opts?: object,
  ): this is NodePath<t.QualifiedTypeIdentifier>;
  isStringLiteralTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.StringLiteralTypeAnnotation>;
  isStringTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.StringTypeAnnotation>;
  isSymbolTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.SymbolTypeAnnotation>;
  isThisTypeAnnotation(opts?: object): this is NodePath<t.ThisTypeAnnotation>;
  isTupleTypeAnnotation(opts?: object): this is NodePath<t.TupleTypeAnnotation>;
  isTypeofTypeAnnotation(
    opts?: object,
  ): this is NodePath<t.TypeofTypeAnnotation>;
  isTypeAlias(opts?: object): this is NodePath<t.TypeAlias>;
  isTypeAnnotation(opts?: object): this is NodePath<t.TypeAnnotation>;
  isTypeCastExpression(opts?: object): this is NodePath<t.TypeCastExpression>;
  isTypeParameter(opts?: object): this is NodePath<t.TypeParameter>;
  isTypeParameterDeclaration(
    opts?: object,
  ): this is NodePath<t.TypeParameterDeclaration>;
  isTypeParameterInstantiation(
    opts?: object,
  ): this is NodePath<t.TypeParameterInstantiation>;
  isUnionTypeAnnotation(opts?: object): this is NodePath<t.UnionTypeAnnotation>;
  isVariance(opts?: object): this is NodePath<t.Variance>;
  isVoidTypeAnnotation(opts?: object): this is NodePath<t.VoidTypeAnnotation>;
  isEnumDeclaration(opts?: object): this is NodePath<t.EnumDeclaration>;
  isEnumBooleanBody(opts?: object): this is NodePath<t.EnumBooleanBody>;
  isEnumNumberBody(opts?: object): this is NodePath<t.EnumNumberBody>;
  isEnumStringBody(opts?: object): this is NodePath<t.EnumStringBody>;
  isEnumSymbolBody(opts?: object): this is NodePath<t.EnumSymbolBody>;
  isEnumBooleanMember(opts?: object): this is NodePath<t.EnumBooleanMember>;
  isEnumNumberMember(opts?: object): this is NodePath<t.EnumNumberMember>;
  isEnumStringMember(opts?: object): this is NodePath<t.EnumStringMember>;
  isEnumDefaultedMember(opts?: object): this is NodePath<t.EnumDefaultedMember>;
  isJSXAttribute(opts?: object): this is NodePath<t.JSXAttribute>;
  isJSXClosingElement(opts?: object): this is NodePath<t.JSXClosingElement>;
  isJSXElement(opts?: object): this is NodePath<t.JSXElement>;
  isJSXEmptyExpression(opts?: object): this is NodePath<t.JSXEmptyExpression>;
  isJSXExpressionContainer(
    opts?: object,
  ): this is NodePath<t.JSXExpressionContainer>;
  isJSXSpreadChild(opts?: object): this is NodePath<t.JSXSpreadChild>;
  isJSXIdentifier(opts?: object): this is NodePath<t.JSXIdentifier>;
  isJSXMemberExpression(opts?: object): this is NodePath<t.JSXMemberExpression>;
  isJSXNamespacedName(opts?: object): this is NodePath<t.JSXNamespacedName>;
  isJSXOpeningElement(opts?: object): this is NodePath<t.JSXOpeningElement>;
  isJSXSpreadAttribute(opts?: object): this is NodePath<t.JSXSpreadAttribute>;
  isJSXText(opts?: object): this is NodePath<t.JSXText>;
  isJSXFragment(opts?: object): this is NodePath<t.JSXFragment>;
  isJSXOpeningFragment(opts?: object): this is NodePath<t.JSXOpeningFragment>;
  isJSXClosingFragment(opts?: object): this is NodePath<t.JSXClosingFragment>;
  isNoop(opts?: object): this is NodePath<t.Noop>;
  isPlaceholder(opts?: object): this is NodePath<t.Placeholder>;
  isV8IntrinsicIdentifier(
    opts?: object,
  ): this is NodePath<t.V8IntrinsicIdentifier>;
  isArgumentPlaceholder(opts?: object): this is NodePath<t.ArgumentPlaceholder>;
  isBindExpression(opts?: object): this is NodePath<t.BindExpression>;
  isClassProperty(opts?: object): this is NodePath<t.ClassProperty>;
  isPipelineTopicExpression(
    opts?: object,
  ): this is NodePath<t.PipelineTopicExpression>;
  isPipelineBareFunction(
    opts?: object,
  ): this is NodePath<t.PipelineBareFunction>;
  isPipelinePrimaryTopicReference(
    opts?: object,
  ): this is NodePath<t.PipelinePrimaryTopicReference>;
  isClassPrivateProperty(
    opts?: object,
  ): this is NodePath<t.ClassPrivateProperty>;
  isClassPrivateMethod(opts?: object): this is NodePath<t.ClassPrivateMethod>;
  isImportAttribute(opts?: object): this is NodePath<t.ImportAttribute>;
  isDecorator(opts?: object): this is NodePath<t.Decorator>;
  isDoExpression(opts?: object): this is NodePath<t.DoExpression>;
  isExportDefaultSpecifier(
    opts?: object,
  ): this is NodePath<t.ExportDefaultSpecifier>;
  isPrivateName(opts?: object): this is NodePath<t.PrivateName>;
  isRecordExpression(opts?: object): this is NodePath<t.RecordExpression>;
  isTupleExpression(opts?: object): this is NodePath<t.TupleExpression>;
  isDecimalLiteral(opts?: object): this is NodePath<t.DecimalLiteral>;
  isStaticBlock(opts?: object): this is NodePath<t.StaticBlock>;
  isTSParameterProperty(opts?: object): this is NodePath<t.TSParameterProperty>;
  isTSDeclareFunction(opts?: object): this is NodePath<t.TSDeclareFunction>;
  isTSDeclareMethod(opts?: object): this is NodePath<t.TSDeclareMethod>;
  isTSQualifiedName(opts?: object): this is NodePath<t.TSQualifiedName>;
  isTSCallSignatureDeclaration(
    opts?: object,
  ): this is NodePath<t.TSCallSignatureDeclaration>;
  isTSConstructSignatureDeclaration(
    opts?: object,
  ): this is NodePath<t.TSConstructSignatureDeclaration>;
  isTSPropertySignature(opts?: object): this is NodePath<t.TSPropertySignature>;
  isTSMethodSignature(opts?: object): this is NodePath<t.TSMethodSignature>;
  isTSIndexSignature(opts?: object): this is NodePath<t.TSIndexSignature>;
  isTSAnyKeyword(opts?: object): this is NodePath<t.TSAnyKeyword>;
  isTSBooleanKeyword(opts?: object): this is NodePath<t.TSBooleanKeyword>;
  isTSBigIntKeyword(opts?: object): this is NodePath<t.TSBigIntKeyword>;
  isTSIntrinsicKeyword(opts?: object): this is NodePath<t.TSIntrinsicKeyword>;
  isTSNeverKeyword(opts?: object): this is NodePath<t.TSNeverKeyword>;
  isTSNullKeyword(opts?: object): this is NodePath<t.TSNullKeyword>;
  isTSNumberKeyword(opts?: object): this is NodePath<t.TSNumberKeyword>;
  isTSObjectKeyword(opts?: object): this is NodePath<t.TSObjectKeyword>;
  isTSStringKeyword(opts?: object): this is NodePath<t.TSStringKeyword>;
  isTSSymbolKeyword(opts?: object): this is NodePath<t.TSSymbolKeyword>;
  isTSUndefinedKeyword(opts?: object): this is NodePath<t.TSUndefinedKeyword>;
  isTSUnknownKeyword(opts?: object): this is NodePath<t.TSUnknownKeyword>;
  isTSVoidKeyword(opts?: object): this is NodePath<t.TSVoidKeyword>;
  isTSThisType(opts?: object): this is NodePath<t.TSThisType>;
  isTSFunctionType(opts?: object): this is NodePath<t.TSFunctionType>;
  isTSConstructorType(opts?: object): this is NodePath<t.TSConstructorType>;
  isTSTypeReference(opts?: object): this is NodePath<t.TSTypeReference>;
  isTSTypePredicate(opts?: object): this is NodePath<t.TSTypePredicate>;
  isTSTypeQuery(opts?: object): this is NodePath<t.TSTypeQuery>;
  isTSTypeLiteral(opts?: object): this is NodePath<t.TSTypeLiteral>;
  isTSArrayType(opts?: object): this is NodePath<t.TSArrayType>;
  isTSTupleType(opts?: object): this is NodePath<t.TSTupleType>;
  isTSOptionalType(opts?: object): this is NodePath<t.TSOptionalType>;
  isTSRestType(opts?: object): this is NodePath<t.TSRestType>;
  isTSNamedTupleMember(opts?: object): this is NodePath<t.TSNamedTupleMember>;
  isTSUnionType(opts?: object): this is NodePath<t.TSUnionType>;
  isTSIntersectionType(opts?: object): this is NodePath<t.TSIntersectionType>;
  isTSConditionalType(opts?: object): this is NodePath<t.TSConditionalType>;
  isTSInferType(opts?: object): this is NodePath<t.TSInferType>;
  isTSParenthesizedType(opts?: object): this is NodePath<t.TSParenthesizedType>;
  isTSTypeOperator(opts?: object): this is NodePath<t.TSTypeOperator>;
  isTSIndexedAccessType(opts?: object): this is NodePath<t.TSIndexedAccessType>;
  isTSMappedType(opts?: object): this is NodePath<t.TSMappedType>;
  isTSLiteralType(opts?: object): this is NodePath<t.TSLiteralType>;
  isTSExpressionWithTypeArguments(
    opts?: object,
  ): this is NodePath<t.TSExpressionWithTypeArguments>;
  isTSInterfaceDeclaration(
    opts?: object,
  ): this is NodePath<t.TSInterfaceDeclaration>;
  isTSInterfaceBody(opts?: object): this is NodePath<t.TSInterfaceBody>;
  isTSTypeAliasDeclaration(
    opts?: object,
  ): this is NodePath<t.TSTypeAliasDeclaration>;
  isTSAsExpression(opts?: object): this is NodePath<t.TSAsExpression>;
  isTSTypeAssertion(opts?: object): this is NodePath<t.TSTypeAssertion>;
  isTSEnumDeclaration(opts?: object): this is NodePath<t.TSEnumDeclaration>;
  isTSEnumMember(opts?: object): this is NodePath<t.TSEnumMember>;
  isTSModuleDeclaration(opts?: object): this is NodePath<t.TSModuleDeclaration>;
  isTSModuleBlock(opts?: object): this is NodePath<t.TSModuleBlock>;
  isTSImportType(opts?: object): this is NodePath<t.TSImportType>;
  isTSImportEqualsDeclaration(
    opts?: object,
  ): this is NodePath<t.TSImportEqualsDeclaration>;
  isTSExternalModuleReference(
    opts?: object,
  ): this is NodePath<t.TSExternalModuleReference>;
  isTSNonNullExpression(opts?: object): this is NodePath<t.TSNonNullExpression>;
  isTSExportAssignment(opts?: object): this is NodePath<t.TSExportAssignment>;
  isTSNamespaceExportDeclaration(
    opts?: object,
  ): this is NodePath<t.TSNamespaceExportDeclaration>;
  isTSTypeAnnotation(opts?: object): this is NodePath<t.TSTypeAnnotation>;
  isTSTypeParameterInstantiation(
    opts?: object,
  ): this is NodePath<t.TSTypeParameterInstantiation>;
  isTSTypeParameterDeclaration(
    opts?: object,
  ): this is NodePath<t.TSTypeParameterDeclaration>;
  isTSTypeParameter(opts?: object): this is NodePath<t.TSTypeParameter>;
  isExpression(opts?: object): this is NodePath<t.Expression>;
  isBinary(opts?: object): this is NodePath<t.Binary>;
  isScopable(opts?: object): this is NodePath<t.Scopable>;
  isBlockParent(opts?: object): this is NodePath<t.BlockParent>;
  isBlock(opts?: object): this is NodePath<t.Block>;
  isStatement(opts?: object): this is NodePath<t.Statement>;
  isTerminatorless(opts?: object): this is NodePath<t.Terminatorless>;
  isCompletionStatement(opts?: object): this is NodePath<t.CompletionStatement>;
  isConditional(opts?: object): this is NodePath<t.Conditional>;
  isLoop(opts?: object): this is NodePath<t.Loop>;
  isWhile(opts?: object): this is NodePath<t.While>;
  isExpressionWrapper(opts?: object): this is NodePath<t.ExpressionWrapper>;
  isFor(opts?: object): this is NodePath<t.For>;
  isForXStatement(opts?: object): this is NodePath<t.ForXStatement>;
  isFunction(opts?: object): this is NodePath<t.Function>;
  isFunctionParent(opts?: object): this is NodePath<t.FunctionParent>;
  isPureish(opts?: object): this is NodePath<t.Pureish>;
  isDeclaration(opts?: object): this is NodePath<t.Declaration>;
  isPatternLike(opts?: object): this is NodePath<t.PatternLike>;
  isLVal(opts?: object): this is NodePath<t.LVal>;
  isTSEntityName(opts?: object): this is NodePath<t.TSEntityName>;
  isLiteral(opts?: object): this is NodePath<t.Literal>;
  isImmutable(opts?: object): this is NodePath<t.Immutable>;
  isUserWhitespacable(opts?: object): this is NodePath<t.UserWhitespacable>;
  isMethod(opts?: object): this is NodePath<t.Method>;
  isObjectMember(opts?: object): this is NodePath<t.ObjectMember>;
  isProperty(opts?: object): this is NodePath<t.Property>;
  isUnaryLike(opts?: object): this is NodePath<t.UnaryLike>;
  isPattern(opts?: object): this is NodePath<t.Pattern>;
  isClass(opts?: object): this is NodePath<t.Class>;
  isModuleDeclaration(opts?: object): this is NodePath<t.ModuleDeclaration>;
  isExportDeclaration(opts?: object): this is NodePath<t.ExportDeclaration>;
  isModuleSpecifier(opts?: object): this is NodePath<t.ModuleSpecifier>;
  isFlow(opts?: object): this is NodePath<t.Flow>;
  isFlowType(opts?: object): this is NodePath<t.FlowType>;
  isFlowBaseAnnotation(opts?: object): this is NodePath<t.FlowBaseAnnotation>;
  isFlowDeclaration(opts?: object): this is NodePath<t.FlowDeclaration>;
  isFlowPredicate(opts?: object): this is NodePath<t.FlowPredicate>;
  isEnumBody(opts?: object): this is NodePath<t.EnumBody>;
  isEnumMember(opts?: object): this is NodePath<t.EnumMember>;
  isJSX(opts?: object): this is NodePath<t.JSX>;
  isPrivate(opts?: object): this is NodePath<t.Private>;
  isTSTypeElement(opts?: object): this is NodePath<t.TSTypeElement>;
  isTSType(opts?: object): this is NodePath<t.TSType>;
  isTSBaseType(opts?: object): this is NodePath<t.TSBaseType>;
  isNumberLiteral(opts?: object): this is NodePath<t.NumberLiteral>;
  isRegexLiteral(opts?: object): this is NodePath<t.RegexLiteral>;
  isRestProperty(opts?: object): this is NodePath<t.RestProperty>;
  isSpreadProperty(opts?: object): this is NodePath<t.SpreadProperty>;
  isReferencedIdentifier(opts?: object): boolean;
  isReferencedMemberExpression(opts?: object): boolean;
  isBindingIdentifier(opts?: object): boolean;
  isStatement(opts?: object): this is NodePath<t.Statement>;
  isExpression(opts?: object): this is NodePath<t.Expression>;
  isScope(opts?: object): boolean;
  isReferenced(opts?: object): boolean;
  isBlockScoped(opts?: object): boolean;
  isVar(opts?: object): boolean;
  isUser(opts?: object): boolean;
  isGenerated(opts?: object): boolean;
  isPure(opts?: object): boolean;
  isFlow(opts?: object): this is NodePath<t.Flow>;
  isRestProperty(opts?: object): boolean;
  isSpreadProperty(opts?: object): boolean;
  isExistentialTypeParam(opts?: object): boolean;
  isNumericLiteralTypeAnnotation(opts?: object): boolean;
  isForAwaitStatement(opts?: object): boolean;
}
