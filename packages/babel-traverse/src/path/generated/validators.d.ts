/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";
import type { VirtualTypeNodePathValidators } from "../lib/virtual-types-validator";

interface BaseNodePathValidators {
  isAccessor<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Accessor>;
  isAnyTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.AnyTypeAnnotation>;
  isArgumentPlaceholder<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ArgumentPlaceholder>;
  isArrayExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ArrayExpression>;
  isArrayPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ArrayPattern>;
  isArrayTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ArrayTypeAnnotation>;
  isArrowFunctionExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ArrowFunctionExpression>;
  isAssignmentExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.AssignmentExpression>;
  isAssignmentPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.AssignmentPattern>;
  isAwaitExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.AwaitExpression>;
  isBigIntLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BigIntLiteral>;
  isBinary<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Binary>;
  isBinaryExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BinaryExpression>;
  isBindExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BindExpression>;
  isBlock<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Block>;
  isBlockParent<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BlockParent>;
  isBlockStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BlockStatement>;
  isBooleanLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BooleanLiteral>;
  isBooleanLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BooleanLiteralTypeAnnotation>;
  isBooleanTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BooleanTypeAnnotation>;
  isBreakStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.BreakStatement>;
  isCallExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.CallExpression>;
  isCatchClause<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.CatchClause>;
  isClass<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Class>;
  isClassAccessorProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassAccessorProperty>;
  isClassBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassBody>;
  isClassDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassDeclaration>;
  isClassExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassExpression>;
  isClassImplements<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassImplements>;
  isClassMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassMethod>;
  isClassPrivateMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassPrivateMethod>;
  isClassPrivateProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassPrivateProperty>;
  isClassProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ClassProperty>;
  isCompletionStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.CompletionStatement>;
  isConditional<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Conditional>;
  isConditionalExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ConditionalExpression>;
  isContinueStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ContinueStatement>;
  isDebuggerStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DebuggerStatement>;
  isDecimalLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DecimalLiteral>;
  isDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Declaration>;
  isDeclareClass<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareClass>;
  isDeclareExportAllDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareExportAllDeclaration>;
  isDeclareExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareExportDeclaration>;
  isDeclareFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareFunction>;
  isDeclareInterface<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareInterface>;
  isDeclareModule<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareModule>;
  isDeclareModuleExports<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareModuleExports>;
  isDeclareOpaqueType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareOpaqueType>;
  isDeclareTypeAlias<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareTypeAlias>;
  isDeclareVariable<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclareVariable>;
  isDeclaredPredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DeclaredPredicate>;
  isDecorator<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Decorator>;
  isDirective<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Directive>;
  isDirectiveLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DirectiveLiteral>;
  isDoExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DoExpression>;
  isDoWhileStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.DoWhileStatement>;
  isEmptyStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EmptyStatement>;
  isEmptyTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EmptyTypeAnnotation>;
  isEnumBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumBody>;
  isEnumBooleanBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumBooleanBody>;
  isEnumBooleanMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumBooleanMember>;
  isEnumDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumDeclaration>;
  isEnumDefaultedMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumDefaultedMember>;
  isEnumMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumMember>;
  isEnumNumberBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumNumberBody>;
  isEnumNumberMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumNumberMember>;
  isEnumStringBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumStringBody>;
  isEnumStringMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumStringMember>;
  isEnumSymbolBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.EnumSymbolBody>;
  isExistsTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExistsTypeAnnotation>;
  isExportAllDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportAllDeclaration>;
  isExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportDeclaration>;
  isExportDefaultDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportDefaultDeclaration>;
  isExportDefaultSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportDefaultSpecifier>;
  isExportNamedDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportNamedDeclaration>;
  isExportNamespaceSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportNamespaceSpecifier>;
  isExportSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExportSpecifier>;
  isExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Expression>;
  isExpressionStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExpressionStatement>;
  isExpressionWrapper<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ExpressionWrapper>;
  isFile<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.File>;
  isFlow<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Flow>;
  isFlowBaseAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FlowBaseAnnotation>;
  isFlowDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FlowDeclaration>;
  isFlowPredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FlowPredicate>;
  isFlowType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FlowType>;
  isFor<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.For>;
  isForInStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ForInStatement>;
  isForOfStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ForOfStatement>;
  isForStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ForStatement>;
  isForXStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ForXStatement>;
  isFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Function>;
  isFunctionDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FunctionDeclaration>;
  isFunctionExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FunctionExpression>;
  isFunctionParent<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FunctionParent>;
  isFunctionTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FunctionTypeAnnotation>;
  isFunctionTypeParam<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.FunctionTypeParam>;
  isGenericTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.GenericTypeAnnotation>;
  isIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Identifier>;
  isIfStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.IfStatement>;
  isImmutable<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Immutable>;
  isImport<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Import>;
  isImportAttribute<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ImportAttribute>;
  isImportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ImportDeclaration>;
  isImportDefaultSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ImportDefaultSpecifier>;
  isImportNamespaceSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ImportNamespaceSpecifier>;
  isImportOrExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ImportOrExportDeclaration>;
  isImportSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ImportSpecifier>;
  isIndexedAccessType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.IndexedAccessType>;
  isInferredPredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.InferredPredicate>;
  isInterfaceDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.InterfaceDeclaration>;
  isInterfaceExtends<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.InterfaceExtends>;
  isInterfaceTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.InterfaceTypeAnnotation>;
  isInterpreterDirective<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.InterpreterDirective>;
  isIntersectionTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.IntersectionTypeAnnotation>;
  isJSX<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSX>;
  isJSXAttribute<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXAttribute>;
  isJSXClosingElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXClosingElement>;
  isJSXClosingFragment<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXClosingFragment>;
  isJSXElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXElement>;
  isJSXEmptyExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXEmptyExpression>;
  isJSXExpressionContainer<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXExpressionContainer>;
  isJSXFragment<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXFragment>;
  isJSXIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXIdentifier>;
  isJSXMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXMemberExpression>;
  isJSXNamespacedName<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXNamespacedName>;
  isJSXOpeningElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXOpeningElement>;
  isJSXOpeningFragment<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXOpeningFragment>;
  isJSXSpreadAttribute<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXSpreadAttribute>;
  isJSXSpreadChild<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXSpreadChild>;
  isJSXText<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.JSXText>;
  isLVal<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.LVal>;
  isLabeledStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.LabeledStatement>;
  isLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Literal>;
  isLogicalExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.LogicalExpression>;
  isLoop<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Loop>;
  isMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.MemberExpression>;
  isMetaProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.MetaProperty>;
  isMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Method>;
  isMiscellaneous<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Miscellaneous>;
  isMixedTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.MixedTypeAnnotation>;
  isModuleDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ModuleDeclaration>;
  isModuleExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ModuleExpression>;
  isModuleSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ModuleSpecifier>;
  isNewExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NewExpression>;
  isNoop<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Noop>;
  isNullLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NullLiteral>;
  isNullLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NullLiteralTypeAnnotation>;
  isNullableTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NullableTypeAnnotation>;
  isNumberLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NumberLiteral>;
  isNumberLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NumberLiteralTypeAnnotation>;
  isNumberTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NumberTypeAnnotation>;
  isNumericLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.NumericLiteral>;
  isObjectExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectExpression>;
  isObjectMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectMember>;
  isObjectMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectMethod>;
  isObjectPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectPattern>;
  isObjectProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectProperty>;
  isObjectTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectTypeAnnotation>;
  isObjectTypeCallProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectTypeCallProperty>;
  isObjectTypeIndexer<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectTypeIndexer>;
  isObjectTypeInternalSlot<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectTypeInternalSlot>;
  isObjectTypeProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectTypeProperty>;
  isObjectTypeSpreadProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ObjectTypeSpreadProperty>;
  isOpaqueType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.OpaqueType>;
  isOptionalCallExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.OptionalCallExpression>;
  isOptionalIndexedAccessType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.OptionalIndexedAccessType>;
  isOptionalMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.OptionalMemberExpression>;
  isParenthesizedExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ParenthesizedExpression>;
  isPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Pattern>;
  isPatternLike<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.PatternLike>;
  isPipelineBareFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.PipelineBareFunction>;
  isPipelinePrimaryTopicReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.PipelinePrimaryTopicReference>;
  isPipelineTopicExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.PipelineTopicExpression>;
  isPlaceholder<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Placeholder>;
  isPrivate<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Private>;
  isPrivateName<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.PrivateName>;
  isProgram<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Program>;
  isProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Property>;
  isPureish<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Pureish>;
  isQualifiedTypeIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.QualifiedTypeIdentifier>;
  isRecordExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.RecordExpression>;
  isRegExpLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.RegExpLiteral>;
  isRegexLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.RegexLiteral>;
  isRestElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.RestElement>;
  isRestProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.RestProperty>;
  isReturnStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ReturnStatement>;
  isScopable<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Scopable>;
  isSequenceExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SequenceExpression>;
  isSpreadElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SpreadElement>;
  isSpreadProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SpreadProperty>;
  isStandardized<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Standardized>;
  isStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Statement>;
  isStaticBlock<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.StaticBlock>;
  isStringLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.StringLiteral>;
  isStringLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.StringLiteralTypeAnnotation>;
  isStringTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.StringTypeAnnotation>;
  isSuper<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Super>;
  isSwitchCase<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SwitchCase>;
  isSwitchStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SwitchStatement>;
  isSymbolTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.SymbolTypeAnnotation>;
  isTSAnyKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSAnyKeyword>;
  isTSArrayType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSArrayType>;
  isTSAsExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSAsExpression>;
  isTSBaseType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSBaseType>;
  isTSBigIntKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSBigIntKeyword>;
  isTSBooleanKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSBooleanKeyword>;
  isTSCallSignatureDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSCallSignatureDeclaration>;
  isTSConditionalType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSConditionalType>;
  isTSConstructSignatureDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSConstructSignatureDeclaration>;
  isTSConstructorType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSConstructorType>;
  isTSDeclareFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSDeclareFunction>;
  isTSDeclareMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSDeclareMethod>;
  isTSEntityName<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSEntityName>;
  isTSEnumDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSEnumDeclaration>;
  isTSEnumMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSEnumMember>;
  isTSExportAssignment<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSExportAssignment>;
  isTSExpressionWithTypeArguments<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSExpressionWithTypeArguments>;
  isTSExternalModuleReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSExternalModuleReference>;
  isTSFunctionType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSFunctionType>;
  isTSImportEqualsDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSImportEqualsDeclaration>;
  isTSImportType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSImportType>;
  isTSIndexSignature<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSIndexSignature>;
  isTSIndexedAccessType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSIndexedAccessType>;
  isTSInferType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSInferType>;
  isTSInstantiationExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSInstantiationExpression>;
  isTSInterfaceBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSInterfaceBody>;
  isTSInterfaceDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSInterfaceDeclaration>;
  isTSIntersectionType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSIntersectionType>;
  isTSIntrinsicKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSIntrinsicKeyword>;
  isTSLiteralType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSLiteralType>;
  isTSMappedType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSMappedType>;
  isTSMethodSignature<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSMethodSignature>;
  isTSModuleBlock<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSModuleBlock>;
  isTSModuleDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSModuleDeclaration>;
  isTSNamedTupleMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSNamedTupleMember>;
  isTSNamespaceExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSNamespaceExportDeclaration>;
  isTSNeverKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSNeverKeyword>;
  isTSNonNullExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSNonNullExpression>;
  isTSNullKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSNullKeyword>;
  isTSNumberKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSNumberKeyword>;
  isTSObjectKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSObjectKeyword>;
  isTSOptionalType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSOptionalType>;
  isTSParameterProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSParameterProperty>;
  isTSParenthesizedType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSParenthesizedType>;
  isTSPropertySignature<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSPropertySignature>;
  isTSQualifiedName<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSQualifiedName>;
  isTSRestType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSRestType>;
  isTSSatisfiesExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSSatisfiesExpression>;
  isTSStringKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSStringKeyword>;
  isTSSymbolKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSSymbolKeyword>;
  isTSThisType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSThisType>;
  isTSTupleType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTupleType>;
  isTSType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSType>;
  isTSTypeAliasDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeAliasDeclaration>;
  isTSTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeAnnotation>;
  isTSTypeAssertion<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeAssertion>;
  isTSTypeElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeElement>;
  isTSTypeLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeLiteral>;
  isTSTypeOperator<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeOperator>;
  isTSTypeParameter<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeParameter>;
  isTSTypeParameterDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeParameterDeclaration>;
  isTSTypeParameterInstantiation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeParameterInstantiation>;
  isTSTypePredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypePredicate>;
  isTSTypeQuery<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeQuery>;
  isTSTypeReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSTypeReference>;
  isTSUndefinedKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSUndefinedKeyword>;
  isTSUnionType<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSUnionType>;
  isTSUnknownKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSUnknownKeyword>;
  isTSVoidKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TSVoidKeyword>;
  isTaggedTemplateExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TaggedTemplateExpression>;
  isTemplateElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TemplateElement>;
  isTemplateLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TemplateLiteral>;
  isTerminatorless<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Terminatorless>;
  isThisExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ThisExpression>;
  isThisTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ThisTypeAnnotation>;
  isThrowStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.ThrowStatement>;
  isTopicReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TopicReference>;
  isTryStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TryStatement>;
  isTupleExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TupleExpression>;
  isTupleTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TupleTypeAnnotation>;
  isTypeAlias<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeAlias>;
  isTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeAnnotation>;
  isTypeCastExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeCastExpression>;
  isTypeParameter<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeParameter>;
  isTypeParameterDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeParameterDeclaration>;
  isTypeParameterInstantiation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeParameterInstantiation>;
  isTypeScript<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeScript>;
  isTypeofTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.TypeofTypeAnnotation>;
  isUnaryExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.UnaryExpression>;
  isUnaryLike<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.UnaryLike>;
  isUnionTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.UnionTypeAnnotation>;
  isUpdateExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.UpdateExpression>;
  isUserWhitespacable<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.UserWhitespacable>;
  isV8IntrinsicIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.V8IntrinsicIdentifier>;
  isVariableDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.VariableDeclaration>;
  isVariableDeclarator<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.VariableDeclarator>;
  isVariance<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.Variance>;
  isVoidTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.VoidTypeAnnotation>;
  isWhile<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.While>;
  isWhileStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.WhileStatement>;
  isWithStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.WithStatement>;
  isYieldExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: object,
  ): this is NodePath<T & t.YieldExpression>;
}

export interface NodePathValidators
  extends BaseNodePathValidators,
    VirtualTypeNodePathValidators {}
