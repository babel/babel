/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";
import type { VirtualTypeNodePathValidators } from "../lib/virtual-types-validator";

type Opts<Obj> = Partial<{
  [Prop in keyof Obj]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
    ? t.Node[]
    : Obj[Prop];
}>;

interface BaseNodePathValidators {
  isAccessor<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Accessor>,
  ): this is NodePath<T & t.Accessor>;
  isAnyTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.AnyTypeAnnotation>,
  ): this is NodePath<T & t.AnyTypeAnnotation>;
  isArgumentPlaceholder<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ArgumentPlaceholder>,
  ): this is NodePath<T & t.ArgumentPlaceholder>;
  isArrayExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ArrayExpression>,
  ): this is NodePath<T & t.ArrayExpression>;
  isArrayPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ArrayPattern>,
  ): this is NodePath<T & t.ArrayPattern>;
  isArrayTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ArrayTypeAnnotation>,
  ): this is NodePath<T & t.ArrayTypeAnnotation>;
  isArrowFunctionExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ArrowFunctionExpression>,
  ): this is NodePath<T & t.ArrowFunctionExpression>;
  isAssignmentExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.AssignmentExpression>,
  ): this is NodePath<T & t.AssignmentExpression>;
  isAssignmentPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.AssignmentPattern>,
  ): this is NodePath<T & t.AssignmentPattern>;
  isAwaitExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.AwaitExpression>,
  ): this is NodePath<T & t.AwaitExpression>;
  isBigIntLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BigIntLiteral>,
  ): this is NodePath<T & t.BigIntLiteral>;
  isBinary<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Binary>,
  ): this is NodePath<T & t.Binary>;
  isBinaryExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BinaryExpression>,
  ): this is NodePath<T & t.BinaryExpression>;
  isBindExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BindExpression>,
  ): this is NodePath<T & t.BindExpression>;
  isBlock<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Block>,
  ): this is NodePath<T & t.Block>;
  isBlockParent<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BlockParent>,
  ): this is NodePath<T & t.BlockParent>;
  isBlockStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BlockStatement>,
  ): this is NodePath<T & t.BlockStatement>;
  isBooleanLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BooleanLiteral>,
  ): this is NodePath<T & t.BooleanLiteral>;
  isBooleanLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BooleanLiteralTypeAnnotation>,
  ): this is NodePath<T & t.BooleanLiteralTypeAnnotation>;
  isBooleanTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BooleanTypeAnnotation>,
  ): this is NodePath<T & t.BooleanTypeAnnotation>;
  isBreakStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.BreakStatement>,
  ): this is NodePath<T & t.BreakStatement>;
  isCallExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.CallExpression>,
  ): this is NodePath<T & t.CallExpression>;
  isCatchClause<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.CatchClause>,
  ): this is NodePath<T & t.CatchClause>;
  isClass<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Class>,
  ): this is NodePath<T & t.Class>;
  isClassAccessorProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassAccessorProperty>,
  ): this is NodePath<T & t.ClassAccessorProperty>;
  isClassBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassBody>,
  ): this is NodePath<T & t.ClassBody>;
  isClassDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassDeclaration>,
  ): this is NodePath<T & t.ClassDeclaration>;
  isClassExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassExpression>,
  ): this is NodePath<T & t.ClassExpression>;
  isClassImplements<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassImplements>,
  ): this is NodePath<T & t.ClassImplements>;
  isClassMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassMethod>,
  ): this is NodePath<T & t.ClassMethod>;
  isClassPrivateMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassPrivateMethod>,
  ): this is NodePath<T & t.ClassPrivateMethod>;
  isClassPrivateProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassPrivateProperty>,
  ): this is NodePath<T & t.ClassPrivateProperty>;
  isClassProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ClassProperty>,
  ): this is NodePath<T & t.ClassProperty>;
  isCompletionStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.CompletionStatement>,
  ): this is NodePath<T & t.CompletionStatement>;
  isConditional<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Conditional>,
  ): this is NodePath<T & t.Conditional>;
  isConditionalExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ConditionalExpression>,
  ): this is NodePath<T & t.ConditionalExpression>;
  isContinueStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ContinueStatement>,
  ): this is NodePath<T & t.ContinueStatement>;
  isDebuggerStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DebuggerStatement>,
  ): this is NodePath<T & t.DebuggerStatement>;
  isDecimalLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DecimalLiteral>,
  ): this is NodePath<T & t.DecimalLiteral>;
  isDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Declaration>,
  ): this is NodePath<T & t.Declaration>;
  isDeclareClass<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareClass>,
  ): this is NodePath<T & t.DeclareClass>;
  isDeclareExportAllDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareExportAllDeclaration>,
  ): this is NodePath<T & t.DeclareExportAllDeclaration>;
  isDeclareExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareExportDeclaration>,
  ): this is NodePath<T & t.DeclareExportDeclaration>;
  isDeclareFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareFunction>,
  ): this is NodePath<T & t.DeclareFunction>;
  isDeclareInterface<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareInterface>,
  ): this is NodePath<T & t.DeclareInterface>;
  isDeclareModule<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareModule>,
  ): this is NodePath<T & t.DeclareModule>;
  isDeclareModuleExports<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareModuleExports>,
  ): this is NodePath<T & t.DeclareModuleExports>;
  isDeclareOpaqueType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareOpaqueType>,
  ): this is NodePath<T & t.DeclareOpaqueType>;
  isDeclareTypeAlias<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareTypeAlias>,
  ): this is NodePath<T & t.DeclareTypeAlias>;
  isDeclareVariable<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclareVariable>,
  ): this is NodePath<T & t.DeclareVariable>;
  isDeclaredPredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DeclaredPredicate>,
  ): this is NodePath<T & t.DeclaredPredicate>;
  isDecorator<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Decorator>,
  ): this is NodePath<T & t.Decorator>;
  isDirective<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Directive>,
  ): this is NodePath<T & t.Directive>;
  isDirectiveLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DirectiveLiteral>,
  ): this is NodePath<T & t.DirectiveLiteral>;
  isDoExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DoExpression>,
  ): this is NodePath<T & t.DoExpression>;
  isDoWhileStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.DoWhileStatement>,
  ): this is NodePath<T & t.DoWhileStatement>;
  isEmptyStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EmptyStatement>,
  ): this is NodePath<T & t.EmptyStatement>;
  isEmptyTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EmptyTypeAnnotation>,
  ): this is NodePath<T & t.EmptyTypeAnnotation>;
  isEnumBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumBody>,
  ): this is NodePath<T & t.EnumBody>;
  isEnumBooleanBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumBooleanBody>,
  ): this is NodePath<T & t.EnumBooleanBody>;
  isEnumBooleanMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumBooleanMember>,
  ): this is NodePath<T & t.EnumBooleanMember>;
  isEnumDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumDeclaration>,
  ): this is NodePath<T & t.EnumDeclaration>;
  isEnumDefaultedMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumDefaultedMember>,
  ): this is NodePath<T & t.EnumDefaultedMember>;
  isEnumMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumMember>,
  ): this is NodePath<T & t.EnumMember>;
  isEnumNumberBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumNumberBody>,
  ): this is NodePath<T & t.EnumNumberBody>;
  isEnumNumberMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumNumberMember>,
  ): this is NodePath<T & t.EnumNumberMember>;
  isEnumStringBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumStringBody>,
  ): this is NodePath<T & t.EnumStringBody>;
  isEnumStringMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumStringMember>,
  ): this is NodePath<T & t.EnumStringMember>;
  isEnumSymbolBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.EnumSymbolBody>,
  ): this is NodePath<T & t.EnumSymbolBody>;
  isExistsTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExistsTypeAnnotation>,
  ): this is NodePath<T & t.ExistsTypeAnnotation>;
  isExportAllDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportAllDeclaration>,
  ): this is NodePath<T & t.ExportAllDeclaration>;
  isExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportDeclaration>,
  ): this is NodePath<T & t.ExportDeclaration>;
  isExportDefaultDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportDefaultDeclaration>,
  ): this is NodePath<T & t.ExportDefaultDeclaration>;
  isExportDefaultSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportDefaultSpecifier>,
  ): this is NodePath<T & t.ExportDefaultSpecifier>;
  isExportNamedDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportNamedDeclaration>,
  ): this is NodePath<T & t.ExportNamedDeclaration>;
  isExportNamespaceSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportNamespaceSpecifier>,
  ): this is NodePath<T & t.ExportNamespaceSpecifier>;
  isExportSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExportSpecifier>,
  ): this is NodePath<T & t.ExportSpecifier>;
  isExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Expression>,
  ): this is NodePath<T & t.Expression>;
  isExpressionStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExpressionStatement>,
  ): this is NodePath<T & t.ExpressionStatement>;
  isExpressionWrapper<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ExpressionWrapper>,
  ): this is NodePath<T & t.ExpressionWrapper>;
  isFile<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.File>,
  ): this is NodePath<T & t.File>;
  isFlow<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Flow>,
  ): this is NodePath<T & t.Flow>;
  isFlowBaseAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FlowBaseAnnotation>,
  ): this is NodePath<T & t.FlowBaseAnnotation>;
  isFlowDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FlowDeclaration>,
  ): this is NodePath<T & t.FlowDeclaration>;
  isFlowPredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FlowPredicate>,
  ): this is NodePath<T & t.FlowPredicate>;
  isFlowType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FlowType>,
  ): this is NodePath<T & t.FlowType>;
  isFor<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.For>,
  ): this is NodePath<T & t.For>;
  isForInStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ForInStatement>,
  ): this is NodePath<T & t.ForInStatement>;
  isForOfStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ForOfStatement>,
  ): this is NodePath<T & t.ForOfStatement>;
  isForStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ForStatement>,
  ): this is NodePath<T & t.ForStatement>;
  isForXStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ForXStatement>,
  ): this is NodePath<T & t.ForXStatement>;
  isFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Function>,
  ): this is NodePath<T & t.Function>;
  isFunctionDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FunctionDeclaration>,
  ): this is NodePath<T & t.FunctionDeclaration>;
  isFunctionExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FunctionExpression>,
  ): this is NodePath<T & t.FunctionExpression>;
  isFunctionParent<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FunctionParent>,
  ): this is NodePath<T & t.FunctionParent>;
  isFunctionTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FunctionTypeAnnotation>,
  ): this is NodePath<T & t.FunctionTypeAnnotation>;
  isFunctionTypeParam<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.FunctionTypeParam>,
  ): this is NodePath<T & t.FunctionTypeParam>;
  isGenericTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.GenericTypeAnnotation>,
  ): this is NodePath<T & t.GenericTypeAnnotation>;
  isIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Identifier>,
  ): this is NodePath<T & t.Identifier>;
  isIfStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.IfStatement>,
  ): this is NodePath<T & t.IfStatement>;
  isImmutable<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Immutable>,
  ): this is NodePath<T & t.Immutable>;
  isImport<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Import>,
  ): this is NodePath<T & t.Import>;
  isImportAttribute<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportAttribute>,
  ): this is NodePath<T & t.ImportAttribute>;
  isImportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportDeclaration>,
  ): this is NodePath<T & t.ImportDeclaration>;
  isImportDefaultSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportDefaultSpecifier>,
  ): this is NodePath<T & t.ImportDefaultSpecifier>;
  isImportExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportExpression>,
  ): this is NodePath<T & t.ImportExpression>;
  isImportNamespaceSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportNamespaceSpecifier>,
  ): this is NodePath<T & t.ImportNamespaceSpecifier>;
  isImportOrExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportOrExportDeclaration>,
  ): this is NodePath<T & t.ImportOrExportDeclaration>;
  isImportSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ImportSpecifier>,
  ): this is NodePath<T & t.ImportSpecifier>;
  isIndexedAccessType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.IndexedAccessType>,
  ): this is NodePath<T & t.IndexedAccessType>;
  isInferredPredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.InferredPredicate>,
  ): this is NodePath<T & t.InferredPredicate>;
  isInterfaceDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.InterfaceDeclaration>,
  ): this is NodePath<T & t.InterfaceDeclaration>;
  isInterfaceExtends<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.InterfaceExtends>,
  ): this is NodePath<T & t.InterfaceExtends>;
  isInterfaceTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.InterfaceTypeAnnotation>,
  ): this is NodePath<T & t.InterfaceTypeAnnotation>;
  isInterpreterDirective<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.InterpreterDirective>,
  ): this is NodePath<T & t.InterpreterDirective>;
  isIntersectionTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.IntersectionTypeAnnotation>,
  ): this is NodePath<T & t.IntersectionTypeAnnotation>;
  isJSX<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSX>,
  ): this is NodePath<T & t.JSX>;
  isJSXAttribute<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXAttribute>,
  ): this is NodePath<T & t.JSXAttribute>;
  isJSXClosingElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXClosingElement>,
  ): this is NodePath<T & t.JSXClosingElement>;
  isJSXClosingFragment<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXClosingFragment>,
  ): this is NodePath<T & t.JSXClosingFragment>;
  isJSXElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXElement>,
  ): this is NodePath<T & t.JSXElement>;
  isJSXEmptyExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXEmptyExpression>,
  ): this is NodePath<T & t.JSXEmptyExpression>;
  isJSXExpressionContainer<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXExpressionContainer>,
  ): this is NodePath<T & t.JSXExpressionContainer>;
  isJSXFragment<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXFragment>,
  ): this is NodePath<T & t.JSXFragment>;
  isJSXIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXIdentifier>,
  ): this is NodePath<T & t.JSXIdentifier>;
  isJSXMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXMemberExpression>,
  ): this is NodePath<T & t.JSXMemberExpression>;
  isJSXNamespacedName<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXNamespacedName>,
  ): this is NodePath<T & t.JSXNamespacedName>;
  isJSXOpeningElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXOpeningElement>,
  ): this is NodePath<T & t.JSXOpeningElement>;
  isJSXOpeningFragment<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXOpeningFragment>,
  ): this is NodePath<T & t.JSXOpeningFragment>;
  isJSXSpreadAttribute<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXSpreadAttribute>,
  ): this is NodePath<T & t.JSXSpreadAttribute>;
  isJSXSpreadChild<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXSpreadChild>,
  ): this is NodePath<T & t.JSXSpreadChild>;
  isJSXText<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.JSXText>,
  ): this is NodePath<T & t.JSXText>;
  isLVal<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.LVal>,
  ): this is NodePath<T & t.LVal>;
  isLabeledStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.LabeledStatement>,
  ): this is NodePath<T & t.LabeledStatement>;
  isLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Literal>,
  ): this is NodePath<T & t.Literal>;
  isLogicalExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.LogicalExpression>,
  ): this is NodePath<T & t.LogicalExpression>;
  isLoop<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Loop>,
  ): this is NodePath<T & t.Loop>;
  isMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.MemberExpression>,
  ): this is NodePath<T & t.MemberExpression>;
  isMetaProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.MetaProperty>,
  ): this is NodePath<T & t.MetaProperty>;
  isMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Method>,
  ): this is NodePath<T & t.Method>;
  isMiscellaneous<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Miscellaneous>,
  ): this is NodePath<T & t.Miscellaneous>;
  isMixedTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.MixedTypeAnnotation>,
  ): this is NodePath<T & t.MixedTypeAnnotation>;
  isModuleDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ModuleDeclaration>,
  ): this is NodePath<T & t.ModuleDeclaration>;
  isModuleExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ModuleExpression>,
  ): this is NodePath<T & t.ModuleExpression>;
  isModuleSpecifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ModuleSpecifier>,
  ): this is NodePath<T & t.ModuleSpecifier>;
  isNewExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NewExpression>,
  ): this is NodePath<T & t.NewExpression>;
  isNoop<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Noop>,
  ): this is NodePath<T & t.Noop>;
  isNullLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NullLiteral>,
  ): this is NodePath<T & t.NullLiteral>;
  isNullLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NullLiteralTypeAnnotation>,
  ): this is NodePath<T & t.NullLiteralTypeAnnotation>;
  isNullableTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NullableTypeAnnotation>,
  ): this is NodePath<T & t.NullableTypeAnnotation>;
  isNumberLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NumberLiteral>,
  ): this is NodePath<T & t.NumberLiteral>;
  isNumberLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NumberLiteralTypeAnnotation>,
  ): this is NodePath<T & t.NumberLiteralTypeAnnotation>;
  isNumberTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NumberTypeAnnotation>,
  ): this is NodePath<T & t.NumberTypeAnnotation>;
  isNumericLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.NumericLiteral>,
  ): this is NodePath<T & t.NumericLiteral>;
  isObjectExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectExpression>,
  ): this is NodePath<T & t.ObjectExpression>;
  isObjectMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectMember>,
  ): this is NodePath<T & t.ObjectMember>;
  isObjectMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectMethod>,
  ): this is NodePath<T & t.ObjectMethod>;
  isObjectPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectPattern>,
  ): this is NodePath<T & t.ObjectPattern>;
  isObjectProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectProperty>,
  ): this is NodePath<T & t.ObjectProperty>;
  isObjectTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectTypeAnnotation>,
  ): this is NodePath<T & t.ObjectTypeAnnotation>;
  isObjectTypeCallProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectTypeCallProperty>,
  ): this is NodePath<T & t.ObjectTypeCallProperty>;
  isObjectTypeIndexer<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectTypeIndexer>,
  ): this is NodePath<T & t.ObjectTypeIndexer>;
  isObjectTypeInternalSlot<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectTypeInternalSlot>,
  ): this is NodePath<T & t.ObjectTypeInternalSlot>;
  isObjectTypeProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectTypeProperty>,
  ): this is NodePath<T & t.ObjectTypeProperty>;
  isObjectTypeSpreadProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ObjectTypeSpreadProperty>,
  ): this is NodePath<T & t.ObjectTypeSpreadProperty>;
  isOpaqueType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.OpaqueType>,
  ): this is NodePath<T & t.OpaqueType>;
  isOptionalCallExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.OptionalCallExpression>,
  ): this is NodePath<T & t.OptionalCallExpression>;
  isOptionalIndexedAccessType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.OptionalIndexedAccessType>,
  ): this is NodePath<T & t.OptionalIndexedAccessType>;
  isOptionalMemberExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.OptionalMemberExpression>,
  ): this is NodePath<T & t.OptionalMemberExpression>;
  isParenthesizedExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ParenthesizedExpression>,
  ): this is NodePath<T & t.ParenthesizedExpression>;
  isPattern<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Pattern>,
  ): this is NodePath<T & t.Pattern>;
  isPatternLike<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.PatternLike>,
  ): this is NodePath<T & t.PatternLike>;
  isPipelineBareFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.PipelineBareFunction>,
  ): this is NodePath<T & t.PipelineBareFunction>;
  isPipelinePrimaryTopicReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.PipelinePrimaryTopicReference>,
  ): this is NodePath<T & t.PipelinePrimaryTopicReference>;
  isPipelineTopicExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.PipelineTopicExpression>,
  ): this is NodePath<T & t.PipelineTopicExpression>;
  isPlaceholder<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Placeholder>,
  ): this is NodePath<T & t.Placeholder>;
  isPrivate<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Private>,
  ): this is NodePath<T & t.Private>;
  isPrivateName<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.PrivateName>,
  ): this is NodePath<T & t.PrivateName>;
  isProgram<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Program>,
  ): this is NodePath<T & t.Program>;
  isProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Property>,
  ): this is NodePath<T & t.Property>;
  isPureish<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Pureish>,
  ): this is NodePath<T & t.Pureish>;
  isQualifiedTypeIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.QualifiedTypeIdentifier>,
  ): this is NodePath<T & t.QualifiedTypeIdentifier>;
  isRecordExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.RecordExpression>,
  ): this is NodePath<T & t.RecordExpression>;
  isRegExpLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.RegExpLiteral>,
  ): this is NodePath<T & t.RegExpLiteral>;
  isRegexLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.RegexLiteral>,
  ): this is NodePath<T & t.RegexLiteral>;
  isRestElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.RestElement>,
  ): this is NodePath<T & t.RestElement>;
  isRestProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.RestProperty>,
  ): this is NodePath<T & t.RestProperty>;
  isReturnStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ReturnStatement>,
  ): this is NodePath<T & t.ReturnStatement>;
  isScopable<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Scopable>,
  ): this is NodePath<T & t.Scopable>;
  isSequenceExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.SequenceExpression>,
  ): this is NodePath<T & t.SequenceExpression>;
  isSpreadElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.SpreadElement>,
  ): this is NodePath<T & t.SpreadElement>;
  isSpreadProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.SpreadProperty>,
  ): this is NodePath<T & t.SpreadProperty>;
  isStandardized<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Standardized>,
  ): this is NodePath<T & t.Standardized>;
  isStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Statement>,
  ): this is NodePath<T & t.Statement>;
  isStaticBlock<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.StaticBlock>,
  ): this is NodePath<T & t.StaticBlock>;
  isStringLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.StringLiteral>,
  ): this is NodePath<T & t.StringLiteral>;
  isStringLiteralTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.StringLiteralTypeAnnotation>,
  ): this is NodePath<T & t.StringLiteralTypeAnnotation>;
  isStringTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.StringTypeAnnotation>,
  ): this is NodePath<T & t.StringTypeAnnotation>;
  isSuper<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Super>,
  ): this is NodePath<T & t.Super>;
  isSwitchCase<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.SwitchCase>,
  ): this is NodePath<T & t.SwitchCase>;
  isSwitchStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.SwitchStatement>,
  ): this is NodePath<T & t.SwitchStatement>;
  isSymbolTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.SymbolTypeAnnotation>,
  ): this is NodePath<T & t.SymbolTypeAnnotation>;
  isTSAnyKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSAnyKeyword>,
  ): this is NodePath<T & t.TSAnyKeyword>;
  isTSArrayType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSArrayType>,
  ): this is NodePath<T & t.TSArrayType>;
  isTSAsExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSAsExpression>,
  ): this is NodePath<T & t.TSAsExpression>;
  isTSBaseType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSBaseType>,
  ): this is NodePath<T & t.TSBaseType>;
  isTSBigIntKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSBigIntKeyword>,
  ): this is NodePath<T & t.TSBigIntKeyword>;
  isTSBooleanKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSBooleanKeyword>,
  ): this is NodePath<T & t.TSBooleanKeyword>;
  isTSCallSignatureDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSCallSignatureDeclaration>,
  ): this is NodePath<T & t.TSCallSignatureDeclaration>;
  isTSConditionalType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSConditionalType>,
  ): this is NodePath<T & t.TSConditionalType>;
  isTSConstructSignatureDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSConstructSignatureDeclaration>,
  ): this is NodePath<T & t.TSConstructSignatureDeclaration>;
  isTSConstructorType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSConstructorType>,
  ): this is NodePath<T & t.TSConstructorType>;
  isTSDeclareFunction<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSDeclareFunction>,
  ): this is NodePath<T & t.TSDeclareFunction>;
  isTSDeclareMethod<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSDeclareMethod>,
  ): this is NodePath<T & t.TSDeclareMethod>;
  isTSEntityName<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSEntityName>,
  ): this is NodePath<T & t.TSEntityName>;
  isTSEnumDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSEnumDeclaration>,
  ): this is NodePath<T & t.TSEnumDeclaration>;
  isTSEnumMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSEnumMember>,
  ): this is NodePath<T & t.TSEnumMember>;
  isTSExportAssignment<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSExportAssignment>,
  ): this is NodePath<T & t.TSExportAssignment>;
  isTSExpressionWithTypeArguments<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSExpressionWithTypeArguments>,
  ): this is NodePath<T & t.TSExpressionWithTypeArguments>;
  isTSExternalModuleReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSExternalModuleReference>,
  ): this is NodePath<T & t.TSExternalModuleReference>;
  isTSFunctionType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSFunctionType>,
  ): this is NodePath<T & t.TSFunctionType>;
  isTSImportEqualsDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSImportEqualsDeclaration>,
  ): this is NodePath<T & t.TSImportEqualsDeclaration>;
  isTSImportType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSImportType>,
  ): this is NodePath<T & t.TSImportType>;
  isTSIndexSignature<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSIndexSignature>,
  ): this is NodePath<T & t.TSIndexSignature>;
  isTSIndexedAccessType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSIndexedAccessType>,
  ): this is NodePath<T & t.TSIndexedAccessType>;
  isTSInferType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSInferType>,
  ): this is NodePath<T & t.TSInferType>;
  isTSInstantiationExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSInstantiationExpression>,
  ): this is NodePath<T & t.TSInstantiationExpression>;
  isTSInterfaceBody<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSInterfaceBody>,
  ): this is NodePath<T & t.TSInterfaceBody>;
  isTSInterfaceDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSInterfaceDeclaration>,
  ): this is NodePath<T & t.TSInterfaceDeclaration>;
  isTSIntersectionType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSIntersectionType>,
  ): this is NodePath<T & t.TSIntersectionType>;
  isTSIntrinsicKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSIntrinsicKeyword>,
  ): this is NodePath<T & t.TSIntrinsicKeyword>;
  isTSLiteralType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSLiteralType>,
  ): this is NodePath<T & t.TSLiteralType>;
  isTSMappedType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSMappedType>,
  ): this is NodePath<T & t.TSMappedType>;
  isTSMethodSignature<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSMethodSignature>,
  ): this is NodePath<T & t.TSMethodSignature>;
  isTSModuleBlock<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSModuleBlock>,
  ): this is NodePath<T & t.TSModuleBlock>;
  isTSModuleDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSModuleDeclaration>,
  ): this is NodePath<T & t.TSModuleDeclaration>;
  isTSNamedTupleMember<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSNamedTupleMember>,
  ): this is NodePath<T & t.TSNamedTupleMember>;
  isTSNamespaceExportDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSNamespaceExportDeclaration>,
  ): this is NodePath<T & t.TSNamespaceExportDeclaration>;
  isTSNeverKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSNeverKeyword>,
  ): this is NodePath<T & t.TSNeverKeyword>;
  isTSNonNullExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSNonNullExpression>,
  ): this is NodePath<T & t.TSNonNullExpression>;
  isTSNullKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSNullKeyword>,
  ): this is NodePath<T & t.TSNullKeyword>;
  isTSNumberKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSNumberKeyword>,
  ): this is NodePath<T & t.TSNumberKeyword>;
  isTSObjectKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSObjectKeyword>,
  ): this is NodePath<T & t.TSObjectKeyword>;
  isTSOptionalType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSOptionalType>,
  ): this is NodePath<T & t.TSOptionalType>;
  isTSParameterProperty<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSParameterProperty>,
  ): this is NodePath<T & t.TSParameterProperty>;
  isTSParenthesizedType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSParenthesizedType>,
  ): this is NodePath<T & t.TSParenthesizedType>;
  isTSPropertySignature<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSPropertySignature>,
  ): this is NodePath<T & t.TSPropertySignature>;
  isTSQualifiedName<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSQualifiedName>,
  ): this is NodePath<T & t.TSQualifiedName>;
  isTSRestType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSRestType>,
  ): this is NodePath<T & t.TSRestType>;
  isTSSatisfiesExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSSatisfiesExpression>,
  ): this is NodePath<T & t.TSSatisfiesExpression>;
  isTSStringKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSStringKeyword>,
  ): this is NodePath<T & t.TSStringKeyword>;
  isTSSymbolKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSSymbolKeyword>,
  ): this is NodePath<T & t.TSSymbolKeyword>;
  isTSThisType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSThisType>,
  ): this is NodePath<T & t.TSThisType>;
  isTSTupleType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTupleType>,
  ): this is NodePath<T & t.TSTupleType>;
  isTSType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSType>,
  ): this is NodePath<T & t.TSType>;
  isTSTypeAliasDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeAliasDeclaration>,
  ): this is NodePath<T & t.TSTypeAliasDeclaration>;
  isTSTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeAnnotation>,
  ): this is NodePath<T & t.TSTypeAnnotation>;
  isTSTypeAssertion<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeAssertion>,
  ): this is NodePath<T & t.TSTypeAssertion>;
  isTSTypeElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeElement>,
  ): this is NodePath<T & t.TSTypeElement>;
  isTSTypeLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeLiteral>,
  ): this is NodePath<T & t.TSTypeLiteral>;
  isTSTypeOperator<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeOperator>,
  ): this is NodePath<T & t.TSTypeOperator>;
  isTSTypeParameter<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeParameter>,
  ): this is NodePath<T & t.TSTypeParameter>;
  isTSTypeParameterDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeParameterDeclaration>,
  ): this is NodePath<T & t.TSTypeParameterDeclaration>;
  isTSTypeParameterInstantiation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeParameterInstantiation>,
  ): this is NodePath<T & t.TSTypeParameterInstantiation>;
  isTSTypePredicate<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypePredicate>,
  ): this is NodePath<T & t.TSTypePredicate>;
  isTSTypeQuery<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeQuery>,
  ): this is NodePath<T & t.TSTypeQuery>;
  isTSTypeReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSTypeReference>,
  ): this is NodePath<T & t.TSTypeReference>;
  isTSUndefinedKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSUndefinedKeyword>,
  ): this is NodePath<T & t.TSUndefinedKeyword>;
  isTSUnionType<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSUnionType>,
  ): this is NodePath<T & t.TSUnionType>;
  isTSUnknownKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSUnknownKeyword>,
  ): this is NodePath<T & t.TSUnknownKeyword>;
  isTSVoidKeyword<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TSVoidKeyword>,
  ): this is NodePath<T & t.TSVoidKeyword>;
  isTaggedTemplateExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TaggedTemplateExpression>,
  ): this is NodePath<T & t.TaggedTemplateExpression>;
  isTemplateElement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TemplateElement>,
  ): this is NodePath<T & t.TemplateElement>;
  isTemplateLiteral<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TemplateLiteral>,
  ): this is NodePath<T & t.TemplateLiteral>;
  isTerminatorless<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Terminatorless>,
  ): this is NodePath<T & t.Terminatorless>;
  isThisExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ThisExpression>,
  ): this is NodePath<T & t.ThisExpression>;
  isThisTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ThisTypeAnnotation>,
  ): this is NodePath<T & t.ThisTypeAnnotation>;
  isThrowStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.ThrowStatement>,
  ): this is NodePath<T & t.ThrowStatement>;
  isTopicReference<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TopicReference>,
  ): this is NodePath<T & t.TopicReference>;
  isTryStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TryStatement>,
  ): this is NodePath<T & t.TryStatement>;
  isTupleExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TupleExpression>,
  ): this is NodePath<T & t.TupleExpression>;
  isTupleTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TupleTypeAnnotation>,
  ): this is NodePath<T & t.TupleTypeAnnotation>;
  isTypeAlias<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeAlias>,
  ): this is NodePath<T & t.TypeAlias>;
  isTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeAnnotation>,
  ): this is NodePath<T & t.TypeAnnotation>;
  isTypeCastExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeCastExpression>,
  ): this is NodePath<T & t.TypeCastExpression>;
  isTypeParameter<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeParameter>,
  ): this is NodePath<T & t.TypeParameter>;
  isTypeParameterDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeParameterDeclaration>,
  ): this is NodePath<T & t.TypeParameterDeclaration>;
  isTypeParameterInstantiation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeParameterInstantiation>,
  ): this is NodePath<T & t.TypeParameterInstantiation>;
  isTypeScript<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeScript>,
  ): this is NodePath<T & t.TypeScript>;
  isTypeofTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.TypeofTypeAnnotation>,
  ): this is NodePath<T & t.TypeofTypeAnnotation>;
  isUnaryExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.UnaryExpression>,
  ): this is NodePath<T & t.UnaryExpression>;
  isUnaryLike<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.UnaryLike>,
  ): this is NodePath<T & t.UnaryLike>;
  isUnionTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.UnionTypeAnnotation>,
  ): this is NodePath<T & t.UnionTypeAnnotation>;
  isUpdateExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.UpdateExpression>,
  ): this is NodePath<T & t.UpdateExpression>;
  isUserWhitespacable<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.UserWhitespacable>,
  ): this is NodePath<T & t.UserWhitespacable>;
  isV8IntrinsicIdentifier<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.V8IntrinsicIdentifier>,
  ): this is NodePath<T & t.V8IntrinsicIdentifier>;
  isVariableDeclaration<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.VariableDeclaration>,
  ): this is NodePath<T & t.VariableDeclaration>;
  isVariableDeclarator<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.VariableDeclarator>,
  ): this is NodePath<T & t.VariableDeclarator>;
  isVariance<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.Variance>,
  ): this is NodePath<T & t.Variance>;
  isVoidTypeAnnotation<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.VoidTypeAnnotation>,
  ): this is NodePath<T & t.VoidTypeAnnotation>;
  isWhile<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.While>,
  ): this is NodePath<T & t.While>;
  isWhileStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.WhileStatement>,
  ): this is NodePath<T & t.WhileStatement>;
  isWithStatement<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.WithStatement>,
  ): this is NodePath<T & t.WithStatement>;
  isYieldExpression<T extends t.Node>(
    this: NodePath<T>,
    opts?: Opts<t.YieldExpression>,
  ): this is NodePath<T & t.YieldExpression>;
}

export interface NodePathValidators
  extends Omit<BaseNodePathValidators, keyof VirtualTypeNodePathValidators>,
    VirtualTypeNodePathValidators {}
