/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";
import type { VirtualTypeNodePathValidators } from "../lib/virtual-types-validator";

type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

interface BaseNodePathValidators {
  isAccessor(this: NodePath): this is NodePath<t.Accessor>;
  isAccessor<Opts extends Options<t.Accessor>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Accessor & Opts>;
  isAnyTypeAnnotation(this: NodePath): this is NodePath<t.AnyTypeAnnotation>;
  isAnyTypeAnnotation<Opts extends Options<t.AnyTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.AnyTypeAnnotation & Opts>;
  isArgumentPlaceholder(
    this: NodePath,
  ): this is NodePath<t.ArgumentPlaceholder>;
  isArgumentPlaceholder<Opts extends Options<t.ArgumentPlaceholder>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ArgumentPlaceholder & Opts>;
  isArrayExpression(this: NodePath): this is NodePath<t.ArrayExpression>;
  isArrayExpression<Opts extends Options<t.ArrayExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ArrayExpression & Opts>;
  isArrayPattern(this: NodePath): this is NodePath<t.ArrayPattern>;
  isArrayPattern<Opts extends Options<t.ArrayPattern>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ArrayPattern & Opts>;
  isArrayTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.ArrayTypeAnnotation>;
  isArrayTypeAnnotation<Opts extends Options<t.ArrayTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ArrayTypeAnnotation & Opts>;
  isArrowFunctionExpression(
    this: NodePath,
  ): this is NodePath<t.ArrowFunctionExpression>;
  isArrowFunctionExpression<Opts extends Options<t.ArrowFunctionExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ArrowFunctionExpression & Opts>;
  isAssignmentExpression(
    this: NodePath,
  ): this is NodePath<t.AssignmentExpression>;
  isAssignmentExpression<Opts extends Options<t.AssignmentExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.AssignmentExpression & Opts>;
  isAssignmentPattern(this: NodePath): this is NodePath<t.AssignmentPattern>;
  isAssignmentPattern<Opts extends Options<t.AssignmentPattern>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.AssignmentPattern & Opts>;
  isAwaitExpression(this: NodePath): this is NodePath<t.AwaitExpression>;
  isAwaitExpression<Opts extends Options<t.AwaitExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.AwaitExpression & Opts>;
  isBigIntLiteral(this: NodePath): this is NodePath<t.BigIntLiteral>;
  isBigIntLiteral<Opts extends Options<t.BigIntLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BigIntLiteral & Opts>;
  isBinary(this: NodePath): this is NodePath<t.Binary>;
  isBinary<Opts extends Options<t.Binary>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Binary & Opts>;
  isBinaryExpression(this: NodePath): this is NodePath<t.BinaryExpression>;
  isBinaryExpression<Opts extends Options<t.BinaryExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BinaryExpression & Opts>;
  isBindExpression(this: NodePath): this is NodePath<t.BindExpression>;
  isBindExpression<Opts extends Options<t.BindExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BindExpression & Opts>;
  isBlock(this: NodePath): this is NodePath<t.Block>;
  isBlock<Opts extends Options<t.Block>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Block & Opts>;
  isBlockParent(this: NodePath): this is NodePath<t.BlockParent>;
  isBlockParent<Opts extends Options<t.BlockParent>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BlockParent & Opts>;
  isBlockStatement(this: NodePath): this is NodePath<t.BlockStatement>;
  isBlockStatement<Opts extends Options<t.BlockStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BlockStatement & Opts>;
  isBooleanLiteral(this: NodePath): this is NodePath<t.BooleanLiteral>;
  isBooleanLiteral<Opts extends Options<t.BooleanLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BooleanLiteral & Opts>;
  isBooleanLiteralTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.BooleanLiteralTypeAnnotation>;
  isBooleanLiteralTypeAnnotation<
    Opts extends Options<t.BooleanLiteralTypeAnnotation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BooleanLiteralTypeAnnotation & Opts>;
  isBooleanTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.BooleanTypeAnnotation>;
  isBooleanTypeAnnotation<Opts extends Options<t.BooleanTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BooleanTypeAnnotation & Opts>;
  isBreakStatement(this: NodePath): this is NodePath<t.BreakStatement>;
  isBreakStatement<Opts extends Options<t.BreakStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.BreakStatement & Opts>;
  isCallExpression(this: NodePath): this is NodePath<t.CallExpression>;
  isCallExpression<Opts extends Options<t.CallExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.CallExpression & Opts>;
  isCatchClause(this: NodePath): this is NodePath<t.CatchClause>;
  isCatchClause<Opts extends Options<t.CatchClause>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.CatchClause & Opts>;
  isClass(this: NodePath): this is NodePath<t.Class>;
  isClass<Opts extends Options<t.Class>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Class & Opts>;
  isClassAccessorProperty(
    this: NodePath,
  ): this is NodePath<t.ClassAccessorProperty>;
  isClassAccessorProperty<Opts extends Options<t.ClassAccessorProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassAccessorProperty & Opts>;
  isClassBody(this: NodePath): this is NodePath<t.ClassBody>;
  isClassBody<Opts extends Options<t.ClassBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassBody & Opts>;
  isClassDeclaration(this: NodePath): this is NodePath<t.ClassDeclaration>;
  isClassDeclaration<Opts extends Options<t.ClassDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassDeclaration & Opts>;
  isClassExpression(this: NodePath): this is NodePath<t.ClassExpression>;
  isClassExpression<Opts extends Options<t.ClassExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassExpression & Opts>;
  isClassImplements(this: NodePath): this is NodePath<t.ClassImplements>;
  isClassImplements<Opts extends Options<t.ClassImplements>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassImplements & Opts>;
  isClassMethod(this: NodePath): this is NodePath<t.ClassMethod>;
  isClassMethod<Opts extends Options<t.ClassMethod>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassMethod & Opts>;
  isClassPrivateMethod(this: NodePath): this is NodePath<t.ClassPrivateMethod>;
  isClassPrivateMethod<Opts extends Options<t.ClassPrivateMethod>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassPrivateMethod & Opts>;
  isClassPrivateProperty(
    this: NodePath,
  ): this is NodePath<t.ClassPrivateProperty>;
  isClassPrivateProperty<Opts extends Options<t.ClassPrivateProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassPrivateProperty & Opts>;
  isClassProperty(this: NodePath): this is NodePath<t.ClassProperty>;
  isClassProperty<Opts extends Options<t.ClassProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ClassProperty & Opts>;
  isCompletionStatement(
    this: NodePath,
  ): this is NodePath<t.CompletionStatement>;
  isCompletionStatement<Opts extends Options<t.CompletionStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.CompletionStatement & Opts>;
  isConditional(this: NodePath): this is NodePath<t.Conditional>;
  isConditional<Opts extends Options<t.Conditional>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Conditional & Opts>;
  isConditionalExpression(
    this: NodePath,
  ): this is NodePath<t.ConditionalExpression>;
  isConditionalExpression<Opts extends Options<t.ConditionalExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ConditionalExpression & Opts>;
  isContinueStatement(this: NodePath): this is NodePath<t.ContinueStatement>;
  isContinueStatement<Opts extends Options<t.ContinueStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ContinueStatement & Opts>;
  isDebuggerStatement(this: NodePath): this is NodePath<t.DebuggerStatement>;
  isDebuggerStatement<Opts extends Options<t.DebuggerStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DebuggerStatement & Opts>;
  isDecimalLiteral(this: NodePath): this is NodePath<t.DecimalLiteral>;
  isDecimalLiteral<Opts extends Options<t.DecimalLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DecimalLiteral & Opts>;
  isDeclaration(this: NodePath): this is NodePath<t.Declaration>;
  isDeclaration<Opts extends Options<t.Declaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Declaration & Opts>;
  isDeclareClass(this: NodePath): this is NodePath<t.DeclareClass>;
  isDeclareClass<Opts extends Options<t.DeclareClass>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareClass & Opts>;
  isDeclareExportAllDeclaration(
    this: NodePath,
  ): this is NodePath<t.DeclareExportAllDeclaration>;
  isDeclareExportAllDeclaration<
    Opts extends Options<t.DeclareExportAllDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareExportAllDeclaration & Opts>;
  isDeclareExportDeclaration(
    this: NodePath,
  ): this is NodePath<t.DeclareExportDeclaration>;
  isDeclareExportDeclaration<Opts extends Options<t.DeclareExportDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareExportDeclaration & Opts>;
  isDeclareFunction(this: NodePath): this is NodePath<t.DeclareFunction>;
  isDeclareFunction<Opts extends Options<t.DeclareFunction>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareFunction & Opts>;
  isDeclareInterface(this: NodePath): this is NodePath<t.DeclareInterface>;
  isDeclareInterface<Opts extends Options<t.DeclareInterface>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareInterface & Opts>;
  isDeclareModule(this: NodePath): this is NodePath<t.DeclareModule>;
  isDeclareModule<Opts extends Options<t.DeclareModule>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareModule & Opts>;
  isDeclareModuleExports(
    this: NodePath,
  ): this is NodePath<t.DeclareModuleExports>;
  isDeclareModuleExports<Opts extends Options<t.DeclareModuleExports>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareModuleExports & Opts>;
  isDeclareOpaqueType(this: NodePath): this is NodePath<t.DeclareOpaqueType>;
  isDeclareOpaqueType<Opts extends Options<t.DeclareOpaqueType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareOpaqueType & Opts>;
  isDeclareTypeAlias(this: NodePath): this is NodePath<t.DeclareTypeAlias>;
  isDeclareTypeAlias<Opts extends Options<t.DeclareTypeAlias>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareTypeAlias & Opts>;
  isDeclareVariable(this: NodePath): this is NodePath<t.DeclareVariable>;
  isDeclareVariable<Opts extends Options<t.DeclareVariable>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclareVariable & Opts>;
  isDeclaredPredicate(this: NodePath): this is NodePath<t.DeclaredPredicate>;
  isDeclaredPredicate<Opts extends Options<t.DeclaredPredicate>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DeclaredPredicate & Opts>;
  isDecorator(this: NodePath): this is NodePath<t.Decorator>;
  isDecorator<Opts extends Options<t.Decorator>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Decorator & Opts>;
  isDirective(this: NodePath): this is NodePath<t.Directive>;
  isDirective<Opts extends Options<t.Directive>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Directive & Opts>;
  isDirectiveLiteral(this: NodePath): this is NodePath<t.DirectiveLiteral>;
  isDirectiveLiteral<Opts extends Options<t.DirectiveLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DirectiveLiteral & Opts>;
  isDoExpression(this: NodePath): this is NodePath<t.DoExpression>;
  isDoExpression<Opts extends Options<t.DoExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DoExpression & Opts>;
  isDoWhileStatement(this: NodePath): this is NodePath<t.DoWhileStatement>;
  isDoWhileStatement<Opts extends Options<t.DoWhileStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.DoWhileStatement & Opts>;
  isEmptyStatement(this: NodePath): this is NodePath<t.EmptyStatement>;
  isEmptyStatement<Opts extends Options<t.EmptyStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EmptyStatement & Opts>;
  isEmptyTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.EmptyTypeAnnotation>;
  isEmptyTypeAnnotation<Opts extends Options<t.EmptyTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EmptyTypeAnnotation & Opts>;
  isEnumBody(this: NodePath): this is NodePath<t.EnumBody>;
  isEnumBody<Opts extends Options<t.EnumBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumBody & Opts>;
  isEnumBooleanBody(this: NodePath): this is NodePath<t.EnumBooleanBody>;
  isEnumBooleanBody<Opts extends Options<t.EnumBooleanBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumBooleanBody & Opts>;
  isEnumBooleanMember(this: NodePath): this is NodePath<t.EnumBooleanMember>;
  isEnumBooleanMember<Opts extends Options<t.EnumBooleanMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumBooleanMember & Opts>;
  isEnumDeclaration(this: NodePath): this is NodePath<t.EnumDeclaration>;
  isEnumDeclaration<Opts extends Options<t.EnumDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumDeclaration & Opts>;
  isEnumDefaultedMember(
    this: NodePath,
  ): this is NodePath<t.EnumDefaultedMember>;
  isEnumDefaultedMember<Opts extends Options<t.EnumDefaultedMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumDefaultedMember & Opts>;
  isEnumMember(this: NodePath): this is NodePath<t.EnumMember>;
  isEnumMember<Opts extends Options<t.EnumMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumMember & Opts>;
  isEnumNumberBody(this: NodePath): this is NodePath<t.EnumNumberBody>;
  isEnumNumberBody<Opts extends Options<t.EnumNumberBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumNumberBody & Opts>;
  isEnumNumberMember(this: NodePath): this is NodePath<t.EnumNumberMember>;
  isEnumNumberMember<Opts extends Options<t.EnumNumberMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumNumberMember & Opts>;
  isEnumStringBody(this: NodePath): this is NodePath<t.EnumStringBody>;
  isEnumStringBody<Opts extends Options<t.EnumStringBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumStringBody & Opts>;
  isEnumStringMember(this: NodePath): this is NodePath<t.EnumStringMember>;
  isEnumStringMember<Opts extends Options<t.EnumStringMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumStringMember & Opts>;
  isEnumSymbolBody(this: NodePath): this is NodePath<t.EnumSymbolBody>;
  isEnumSymbolBody<Opts extends Options<t.EnumSymbolBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.EnumSymbolBody & Opts>;
  isExistsTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.ExistsTypeAnnotation>;
  isExistsTypeAnnotation<Opts extends Options<t.ExistsTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExistsTypeAnnotation & Opts>;
  isExportAllDeclaration(
    this: NodePath,
  ): this is NodePath<t.ExportAllDeclaration>;
  isExportAllDeclaration<Opts extends Options<t.ExportAllDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportAllDeclaration & Opts>;
  isExportDeclaration(this: NodePath): this is NodePath<t.ExportDeclaration>;
  isExportDeclaration<Opts extends Options<t.ExportDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportDeclaration & Opts>;
  isExportDefaultDeclaration(
    this: NodePath,
  ): this is NodePath<t.ExportDefaultDeclaration>;
  isExportDefaultDeclaration<Opts extends Options<t.ExportDefaultDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportDefaultDeclaration & Opts>;
  isExportDefaultSpecifier(
    this: NodePath,
  ): this is NodePath<t.ExportDefaultSpecifier>;
  isExportDefaultSpecifier<Opts extends Options<t.ExportDefaultSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportDefaultSpecifier & Opts>;
  isExportNamedDeclaration(
    this: NodePath,
  ): this is NodePath<t.ExportNamedDeclaration>;
  isExportNamedDeclaration<Opts extends Options<t.ExportNamedDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportNamedDeclaration & Opts>;
  isExportNamespaceSpecifier(
    this: NodePath,
  ): this is NodePath<t.ExportNamespaceSpecifier>;
  isExportNamespaceSpecifier<Opts extends Options<t.ExportNamespaceSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportNamespaceSpecifier & Opts>;
  isExportSpecifier(this: NodePath): this is NodePath<t.ExportSpecifier>;
  isExportSpecifier<Opts extends Options<t.ExportSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExportSpecifier & Opts>;
  isExpression(this: NodePath): this is NodePath<t.Expression>;
  isExpression<Opts extends Options<t.Expression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Expression & Opts>;
  isExpressionStatement(
    this: NodePath,
  ): this is NodePath<t.ExpressionStatement>;
  isExpressionStatement<Opts extends Options<t.ExpressionStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExpressionStatement & Opts>;
  isExpressionWrapper(this: NodePath): this is NodePath<t.ExpressionWrapper>;
  isExpressionWrapper<Opts extends Options<t.ExpressionWrapper>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ExpressionWrapper & Opts>;
  isFile(this: NodePath): this is NodePath<t.File>;
  isFile<Opts extends Options<t.File>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.File & Opts>;
  isFlow(this: NodePath): this is NodePath<t.Flow>;
  isFlow<Opts extends Options<t.Flow>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Flow & Opts>;
  isFlowBaseAnnotation(this: NodePath): this is NodePath<t.FlowBaseAnnotation>;
  isFlowBaseAnnotation<Opts extends Options<t.FlowBaseAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FlowBaseAnnotation & Opts>;
  isFlowDeclaration(this: NodePath): this is NodePath<t.FlowDeclaration>;
  isFlowDeclaration<Opts extends Options<t.FlowDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FlowDeclaration & Opts>;
  isFlowPredicate(this: NodePath): this is NodePath<t.FlowPredicate>;
  isFlowPredicate<Opts extends Options<t.FlowPredicate>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FlowPredicate & Opts>;
  isFlowType(this: NodePath): this is NodePath<t.FlowType>;
  isFlowType<Opts extends Options<t.FlowType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FlowType & Opts>;
  isFor(this: NodePath): this is NodePath<t.For>;
  isFor<Opts extends Options<t.For>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.For & Opts>;
  isForInStatement(this: NodePath): this is NodePath<t.ForInStatement>;
  isForInStatement<Opts extends Options<t.ForInStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ForInStatement & Opts>;
  isForOfStatement(this: NodePath): this is NodePath<t.ForOfStatement>;
  isForOfStatement<Opts extends Options<t.ForOfStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ForOfStatement & Opts>;
  isForStatement(this: NodePath): this is NodePath<t.ForStatement>;
  isForStatement<Opts extends Options<t.ForStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ForStatement & Opts>;
  isForXStatement(this: NodePath): this is NodePath<t.ForXStatement>;
  isForXStatement<Opts extends Options<t.ForXStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ForXStatement & Opts>;
  isFunction(this: NodePath): this is NodePath<t.Function>;
  isFunction<Opts extends Options<t.Function>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Function & Opts>;
  isFunctionDeclaration(
    this: NodePath,
  ): this is NodePath<t.FunctionDeclaration>;
  isFunctionDeclaration<Opts extends Options<t.FunctionDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FunctionDeclaration & Opts>;
  isFunctionExpression(this: NodePath): this is NodePath<t.FunctionExpression>;
  isFunctionExpression<Opts extends Options<t.FunctionExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FunctionExpression & Opts>;
  isFunctionParameter(this: NodePath): this is NodePath<t.FunctionParameter>;
  isFunctionParameter<Opts extends Options<t.FunctionParameter>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FunctionParameter & Opts>;
  isFunctionParent(this: NodePath): this is NodePath<t.FunctionParent>;
  isFunctionParent<Opts extends Options<t.FunctionParent>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FunctionParent & Opts>;
  isFunctionTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.FunctionTypeAnnotation>;
  isFunctionTypeAnnotation<Opts extends Options<t.FunctionTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FunctionTypeAnnotation & Opts>;
  isFunctionTypeParam(this: NodePath): this is NodePath<t.FunctionTypeParam>;
  isFunctionTypeParam<Opts extends Options<t.FunctionTypeParam>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.FunctionTypeParam & Opts>;
  isGenericTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.GenericTypeAnnotation>;
  isGenericTypeAnnotation<Opts extends Options<t.GenericTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.GenericTypeAnnotation & Opts>;
  isIdentifier(this: NodePath): this is NodePath<t.Identifier>;
  isIdentifier<Opts extends Options<t.Identifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Identifier & Opts>;
  isIfStatement(this: NodePath): this is NodePath<t.IfStatement>;
  isIfStatement<Opts extends Options<t.IfStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.IfStatement & Opts>;
  isImmutable(this: NodePath): this is NodePath<t.Immutable>;
  isImmutable<Opts extends Options<t.Immutable>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Immutable & Opts>;
  isImport(this: NodePath): this is NodePath<t.Import>;
  isImport<Opts extends Options<t.Import>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Import & Opts>;
  isImportAttribute(this: NodePath): this is NodePath<t.ImportAttribute>;
  isImportAttribute<Opts extends Options<t.ImportAttribute>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportAttribute & Opts>;
  isImportDeclaration(this: NodePath): this is NodePath<t.ImportDeclaration>;
  isImportDeclaration<Opts extends Options<t.ImportDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportDeclaration & Opts>;
  isImportDefaultSpecifier(
    this: NodePath,
  ): this is NodePath<t.ImportDefaultSpecifier>;
  isImportDefaultSpecifier<Opts extends Options<t.ImportDefaultSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportDefaultSpecifier & Opts>;
  isImportExpression(this: NodePath): this is NodePath<t.ImportExpression>;
  isImportExpression<Opts extends Options<t.ImportExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportExpression & Opts>;
  isImportNamespaceSpecifier(
    this: NodePath,
  ): this is NodePath<t.ImportNamespaceSpecifier>;
  isImportNamespaceSpecifier<Opts extends Options<t.ImportNamespaceSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportNamespaceSpecifier & Opts>;
  isImportOrExportDeclaration(
    this: NodePath,
  ): this is NodePath<t.ImportOrExportDeclaration>;
  isImportOrExportDeclaration<
    Opts extends Options<t.ImportOrExportDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportOrExportDeclaration & Opts>;
  isImportSpecifier(this: NodePath): this is NodePath<t.ImportSpecifier>;
  isImportSpecifier<Opts extends Options<t.ImportSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ImportSpecifier & Opts>;
  isIndexedAccessType(this: NodePath): this is NodePath<t.IndexedAccessType>;
  isIndexedAccessType<Opts extends Options<t.IndexedAccessType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.IndexedAccessType & Opts>;
  isInferredPredicate(this: NodePath): this is NodePath<t.InferredPredicate>;
  isInferredPredicate<Opts extends Options<t.InferredPredicate>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.InferredPredicate & Opts>;
  isInterfaceDeclaration(
    this: NodePath,
  ): this is NodePath<t.InterfaceDeclaration>;
  isInterfaceDeclaration<Opts extends Options<t.InterfaceDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.InterfaceDeclaration & Opts>;
  isInterfaceExtends(this: NodePath): this is NodePath<t.InterfaceExtends>;
  isInterfaceExtends<Opts extends Options<t.InterfaceExtends>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.InterfaceExtends & Opts>;
  isInterfaceTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.InterfaceTypeAnnotation>;
  isInterfaceTypeAnnotation<Opts extends Options<t.InterfaceTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.InterfaceTypeAnnotation & Opts>;
  isInterpreterDirective(
    this: NodePath,
  ): this is NodePath<t.InterpreterDirective>;
  isInterpreterDirective<Opts extends Options<t.InterpreterDirective>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.InterpreterDirective & Opts>;
  isIntersectionTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.IntersectionTypeAnnotation>;
  isIntersectionTypeAnnotation<
    Opts extends Options<t.IntersectionTypeAnnotation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.IntersectionTypeAnnotation & Opts>;
  isJSX(this: NodePath): this is NodePath<t.JSX>;
  isJSX<Opts extends Options<t.JSX>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSX & Opts>;
  isJSXAttribute(this: NodePath): this is NodePath<t.JSXAttribute>;
  isJSXAttribute<Opts extends Options<t.JSXAttribute>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXAttribute & Opts>;
  isJSXClosingElement(this: NodePath): this is NodePath<t.JSXClosingElement>;
  isJSXClosingElement<Opts extends Options<t.JSXClosingElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXClosingElement & Opts>;
  isJSXClosingFragment(this: NodePath): this is NodePath<t.JSXClosingFragment>;
  isJSXClosingFragment<Opts extends Options<t.JSXClosingFragment>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXClosingFragment & Opts>;
  isJSXElement(this: NodePath): this is NodePath<t.JSXElement>;
  isJSXElement<Opts extends Options<t.JSXElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXElement & Opts>;
  isJSXEmptyExpression(this: NodePath): this is NodePath<t.JSXEmptyExpression>;
  isJSXEmptyExpression<Opts extends Options<t.JSXEmptyExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXEmptyExpression & Opts>;
  isJSXExpressionContainer(
    this: NodePath,
  ): this is NodePath<t.JSXExpressionContainer>;
  isJSXExpressionContainer<Opts extends Options<t.JSXExpressionContainer>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXExpressionContainer & Opts>;
  isJSXFragment(this: NodePath): this is NodePath<t.JSXFragment>;
  isJSXFragment<Opts extends Options<t.JSXFragment>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXFragment & Opts>;
  isJSXIdentifier(this: NodePath): this is NodePath<t.JSXIdentifier>;
  isJSXIdentifier<Opts extends Options<t.JSXIdentifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXIdentifier & Opts>;
  isJSXMemberExpression(
    this: NodePath,
  ): this is NodePath<t.JSXMemberExpression>;
  isJSXMemberExpression<Opts extends Options<t.JSXMemberExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXMemberExpression & Opts>;
  isJSXNamespacedName(this: NodePath): this is NodePath<t.JSXNamespacedName>;
  isJSXNamespacedName<Opts extends Options<t.JSXNamespacedName>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXNamespacedName & Opts>;
  isJSXOpeningElement(this: NodePath): this is NodePath<t.JSXOpeningElement>;
  isJSXOpeningElement<Opts extends Options<t.JSXOpeningElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXOpeningElement & Opts>;
  isJSXOpeningFragment(this: NodePath): this is NodePath<t.JSXOpeningFragment>;
  isJSXOpeningFragment<Opts extends Options<t.JSXOpeningFragment>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXOpeningFragment & Opts>;
  isJSXSpreadAttribute(this: NodePath): this is NodePath<t.JSXSpreadAttribute>;
  isJSXSpreadAttribute<Opts extends Options<t.JSXSpreadAttribute>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXSpreadAttribute & Opts>;
  isJSXSpreadChild(this: NodePath): this is NodePath<t.JSXSpreadChild>;
  isJSXSpreadChild<Opts extends Options<t.JSXSpreadChild>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXSpreadChild & Opts>;
  isJSXText(this: NodePath): this is NodePath<t.JSXText>;
  isJSXText<Opts extends Options<t.JSXText>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.JSXText & Opts>;
  isLVal(this: NodePath): this is NodePath<t.LVal>;
  isLVal<Opts extends Options<t.LVal>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.LVal & Opts>;
  isLabeledStatement(this: NodePath): this is NodePath<t.LabeledStatement>;
  isLabeledStatement<Opts extends Options<t.LabeledStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.LabeledStatement & Opts>;
  isLiteral(this: NodePath): this is NodePath<t.Literal>;
  isLiteral<Opts extends Options<t.Literal>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Literal & Opts>;
  isLogicalExpression(this: NodePath): this is NodePath<t.LogicalExpression>;
  isLogicalExpression<Opts extends Options<t.LogicalExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.LogicalExpression & Opts>;
  isLoop(this: NodePath): this is NodePath<t.Loop>;
  isLoop<Opts extends Options<t.Loop>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Loop & Opts>;
  isMemberExpression(this: NodePath): this is NodePath<t.MemberExpression>;
  isMemberExpression<Opts extends Options<t.MemberExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.MemberExpression & Opts>;
  isMetaProperty(this: NodePath): this is NodePath<t.MetaProperty>;
  isMetaProperty<Opts extends Options<t.MetaProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.MetaProperty & Opts>;
  isMethod(this: NodePath): this is NodePath<t.Method>;
  isMethod<Opts extends Options<t.Method>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Method & Opts>;
  isMiscellaneous(this: NodePath): this is NodePath<t.Miscellaneous>;
  isMiscellaneous<Opts extends Options<t.Miscellaneous>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Miscellaneous & Opts>;
  isMixedTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.MixedTypeAnnotation>;
  isMixedTypeAnnotation<Opts extends Options<t.MixedTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.MixedTypeAnnotation & Opts>;
  isModuleDeclaration(this: NodePath): this is NodePath<t.ModuleDeclaration>;
  isModuleDeclaration<Opts extends Options<t.ModuleDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ModuleDeclaration & Opts>;
  isModuleExpression(this: NodePath): this is NodePath<t.ModuleExpression>;
  isModuleExpression<Opts extends Options<t.ModuleExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ModuleExpression & Opts>;
  isModuleSpecifier(this: NodePath): this is NodePath<t.ModuleSpecifier>;
  isModuleSpecifier<Opts extends Options<t.ModuleSpecifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ModuleSpecifier & Opts>;
  isNewExpression(this: NodePath): this is NodePath<t.NewExpression>;
  isNewExpression<Opts extends Options<t.NewExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NewExpression & Opts>;
  isNoop(this: NodePath): this is NodePath<t.Noop>;
  isNoop<Opts extends Options<t.Noop>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Noop & Opts>;
  isNullLiteral(this: NodePath): this is NodePath<t.NullLiteral>;
  isNullLiteral<Opts extends Options<t.NullLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NullLiteral & Opts>;
  isNullLiteralTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.NullLiteralTypeAnnotation>;
  isNullLiteralTypeAnnotation<
    Opts extends Options<t.NullLiteralTypeAnnotation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NullLiteralTypeAnnotation & Opts>;
  isNullableTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.NullableTypeAnnotation>;
  isNullableTypeAnnotation<Opts extends Options<t.NullableTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NullableTypeAnnotation & Opts>;
  isNumberLiteral(this: NodePath): this is NodePath<t.NumberLiteral>;
  isNumberLiteral<Opts extends Options<t.NumberLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NumberLiteral & Opts>;
  isNumberLiteralTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.NumberLiteralTypeAnnotation>;
  isNumberLiteralTypeAnnotation<
    Opts extends Options<t.NumberLiteralTypeAnnotation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NumberLiteralTypeAnnotation & Opts>;
  isNumberTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.NumberTypeAnnotation>;
  isNumberTypeAnnotation<Opts extends Options<t.NumberTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NumberTypeAnnotation & Opts>;
  isNumericLiteral(this: NodePath): this is NodePath<t.NumericLiteral>;
  isNumericLiteral<Opts extends Options<t.NumericLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.NumericLiteral & Opts>;
  isObjectExpression(this: NodePath): this is NodePath<t.ObjectExpression>;
  isObjectExpression<Opts extends Options<t.ObjectExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectExpression & Opts>;
  isObjectMember(this: NodePath): this is NodePath<t.ObjectMember>;
  isObjectMember<Opts extends Options<t.ObjectMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectMember & Opts>;
  isObjectMethod(this: NodePath): this is NodePath<t.ObjectMethod>;
  isObjectMethod<Opts extends Options<t.ObjectMethod>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectMethod & Opts>;
  isObjectPattern(this: NodePath): this is NodePath<t.ObjectPattern>;
  isObjectPattern<Opts extends Options<t.ObjectPattern>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectPattern & Opts>;
  isObjectProperty(this: NodePath): this is NodePath<t.ObjectProperty>;
  isObjectProperty<Opts extends Options<t.ObjectProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectProperty & Opts>;
  isObjectTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.ObjectTypeAnnotation>;
  isObjectTypeAnnotation<Opts extends Options<t.ObjectTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectTypeAnnotation & Opts>;
  isObjectTypeCallProperty(
    this: NodePath,
  ): this is NodePath<t.ObjectTypeCallProperty>;
  isObjectTypeCallProperty<Opts extends Options<t.ObjectTypeCallProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectTypeCallProperty & Opts>;
  isObjectTypeIndexer(this: NodePath): this is NodePath<t.ObjectTypeIndexer>;
  isObjectTypeIndexer<Opts extends Options<t.ObjectTypeIndexer>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectTypeIndexer & Opts>;
  isObjectTypeInternalSlot(
    this: NodePath,
  ): this is NodePath<t.ObjectTypeInternalSlot>;
  isObjectTypeInternalSlot<Opts extends Options<t.ObjectTypeInternalSlot>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectTypeInternalSlot & Opts>;
  isObjectTypeProperty(this: NodePath): this is NodePath<t.ObjectTypeProperty>;
  isObjectTypeProperty<Opts extends Options<t.ObjectTypeProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectTypeProperty & Opts>;
  isObjectTypeSpreadProperty(
    this: NodePath,
  ): this is NodePath<t.ObjectTypeSpreadProperty>;
  isObjectTypeSpreadProperty<Opts extends Options<t.ObjectTypeSpreadProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ObjectTypeSpreadProperty & Opts>;
  isOpaqueType(this: NodePath): this is NodePath<t.OpaqueType>;
  isOpaqueType<Opts extends Options<t.OpaqueType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.OpaqueType & Opts>;
  isOptionalCallExpression(
    this: NodePath,
  ): this is NodePath<t.OptionalCallExpression>;
  isOptionalCallExpression<Opts extends Options<t.OptionalCallExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.OptionalCallExpression & Opts>;
  isOptionalIndexedAccessType(
    this: NodePath,
  ): this is NodePath<t.OptionalIndexedAccessType>;
  isOptionalIndexedAccessType<
    Opts extends Options<t.OptionalIndexedAccessType>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.OptionalIndexedAccessType & Opts>;
  isOptionalMemberExpression(
    this: NodePath,
  ): this is NodePath<t.OptionalMemberExpression>;
  isOptionalMemberExpression<Opts extends Options<t.OptionalMemberExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.OptionalMemberExpression & Opts>;
  isParenthesizedExpression(
    this: NodePath,
  ): this is NodePath<t.ParenthesizedExpression>;
  isParenthesizedExpression<Opts extends Options<t.ParenthesizedExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ParenthesizedExpression & Opts>;
  isPattern(this: NodePath): this is NodePath<t.Pattern>;
  isPattern<Opts extends Options<t.Pattern>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Pattern & Opts>;
  isPatternLike(this: NodePath): this is NodePath<t.PatternLike>;
  isPatternLike<Opts extends Options<t.PatternLike>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.PatternLike & Opts>;
  isPipelineBareFunction(
    this: NodePath,
  ): this is NodePath<t.PipelineBareFunction>;
  isPipelineBareFunction<Opts extends Options<t.PipelineBareFunction>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.PipelineBareFunction & Opts>;
  isPipelinePrimaryTopicReference(
    this: NodePath,
  ): this is NodePath<t.PipelinePrimaryTopicReference>;
  isPipelinePrimaryTopicReference<
    Opts extends Options<t.PipelinePrimaryTopicReference>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.PipelinePrimaryTopicReference & Opts>;
  isPipelineTopicExpression(
    this: NodePath,
  ): this is NodePath<t.PipelineTopicExpression>;
  isPipelineTopicExpression<Opts extends Options<t.PipelineTopicExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.PipelineTopicExpression & Opts>;
  isPlaceholder(this: NodePath): this is NodePath<t.Placeholder>;
  isPlaceholder<Opts extends Options<t.Placeholder>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Placeholder & Opts>;
  isPrivate(this: NodePath): this is NodePath<t.Private>;
  isPrivate<Opts extends Options<t.Private>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Private & Opts>;
  isPrivateName(this: NodePath): this is NodePath<t.PrivateName>;
  isPrivateName<Opts extends Options<t.PrivateName>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.PrivateName & Opts>;
  isProgram(this: NodePath): this is NodePath<t.Program>;
  isProgram<Opts extends Options<t.Program>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Program & Opts>;
  isProperty(this: NodePath): this is NodePath<t.Property>;
  isProperty<Opts extends Options<t.Property>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Property & Opts>;
  isPureish(this: NodePath): this is NodePath<t.Pureish>;
  isPureish<Opts extends Options<t.Pureish>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Pureish & Opts>;
  isQualifiedTypeIdentifier(
    this: NodePath,
  ): this is NodePath<t.QualifiedTypeIdentifier>;
  isQualifiedTypeIdentifier<Opts extends Options<t.QualifiedTypeIdentifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.QualifiedTypeIdentifier & Opts>;
  isRecordExpression(this: NodePath): this is NodePath<t.RecordExpression>;
  isRecordExpression<Opts extends Options<t.RecordExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.RecordExpression & Opts>;
  isRegExpLiteral(this: NodePath): this is NodePath<t.RegExpLiteral>;
  isRegExpLiteral<Opts extends Options<t.RegExpLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.RegExpLiteral & Opts>;
  isRegexLiteral(this: NodePath): this is NodePath<t.RegexLiteral>;
  isRegexLiteral<Opts extends Options<t.RegexLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.RegexLiteral & Opts>;
  isRestElement(this: NodePath): this is NodePath<t.RestElement>;
  isRestElement<Opts extends Options<t.RestElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.RestElement & Opts>;
  isRestProperty(this: NodePath): this is NodePath<t.RestProperty>;
  isRestProperty<Opts extends Options<t.RestProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.RestProperty & Opts>;
  isReturnStatement(this: NodePath): this is NodePath<t.ReturnStatement>;
  isReturnStatement<Opts extends Options<t.ReturnStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ReturnStatement & Opts>;
  isScopable(this: NodePath): this is NodePath<t.Scopable>;
  isScopable<Opts extends Options<t.Scopable>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Scopable & Opts>;
  isSequenceExpression(this: NodePath): this is NodePath<t.SequenceExpression>;
  isSequenceExpression<Opts extends Options<t.SequenceExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.SequenceExpression & Opts>;
  isSpreadElement(this: NodePath): this is NodePath<t.SpreadElement>;
  isSpreadElement<Opts extends Options<t.SpreadElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.SpreadElement & Opts>;
  isSpreadProperty(this: NodePath): this is NodePath<t.SpreadProperty>;
  isSpreadProperty<Opts extends Options<t.SpreadProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.SpreadProperty & Opts>;
  isStandardized(this: NodePath): this is NodePath<t.Standardized>;
  isStandardized<Opts extends Options<t.Standardized>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Standardized & Opts>;
  isStatement(this: NodePath): this is NodePath<t.Statement>;
  isStatement<Opts extends Options<t.Statement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Statement & Opts>;
  isStaticBlock(this: NodePath): this is NodePath<t.StaticBlock>;
  isStaticBlock<Opts extends Options<t.StaticBlock>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.StaticBlock & Opts>;
  isStringLiteral(this: NodePath): this is NodePath<t.StringLiteral>;
  isStringLiteral<Opts extends Options<t.StringLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.StringLiteral & Opts>;
  isStringLiteralTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.StringLiteralTypeAnnotation>;
  isStringLiteralTypeAnnotation<
    Opts extends Options<t.StringLiteralTypeAnnotation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.StringLiteralTypeAnnotation & Opts>;
  isStringTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.StringTypeAnnotation>;
  isStringTypeAnnotation<Opts extends Options<t.StringTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.StringTypeAnnotation & Opts>;
  isSuper(this: NodePath): this is NodePath<t.Super>;
  isSuper<Opts extends Options<t.Super>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Super & Opts>;
  isSwitchCase(this: NodePath): this is NodePath<t.SwitchCase>;
  isSwitchCase<Opts extends Options<t.SwitchCase>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.SwitchCase & Opts>;
  isSwitchStatement(this: NodePath): this is NodePath<t.SwitchStatement>;
  isSwitchStatement<Opts extends Options<t.SwitchStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.SwitchStatement & Opts>;
  isSymbolTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.SymbolTypeAnnotation>;
  isSymbolTypeAnnotation<Opts extends Options<t.SymbolTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.SymbolTypeAnnotation & Opts>;
  isTSAnyKeyword(this: NodePath): this is NodePath<t.TSAnyKeyword>;
  isTSAnyKeyword<Opts extends Options<t.TSAnyKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSAnyKeyword & Opts>;
  isTSArrayType(this: NodePath): this is NodePath<t.TSArrayType>;
  isTSArrayType<Opts extends Options<t.TSArrayType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSArrayType & Opts>;
  isTSAsExpression(this: NodePath): this is NodePath<t.TSAsExpression>;
  isTSAsExpression<Opts extends Options<t.TSAsExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSAsExpression & Opts>;
  isTSBaseType(this: NodePath): this is NodePath<t.TSBaseType>;
  isTSBaseType<Opts extends Options<t.TSBaseType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSBaseType & Opts>;
  isTSBigIntKeyword(this: NodePath): this is NodePath<t.TSBigIntKeyword>;
  isTSBigIntKeyword<Opts extends Options<t.TSBigIntKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSBigIntKeyword & Opts>;
  isTSBooleanKeyword(this: NodePath): this is NodePath<t.TSBooleanKeyword>;
  isTSBooleanKeyword<Opts extends Options<t.TSBooleanKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSBooleanKeyword & Opts>;
  isTSCallSignatureDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSCallSignatureDeclaration>;
  isTSCallSignatureDeclaration<
    Opts extends Options<t.TSCallSignatureDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSCallSignatureDeclaration & Opts>;
  isTSConditionalType(this: NodePath): this is NodePath<t.TSConditionalType>;
  isTSConditionalType<Opts extends Options<t.TSConditionalType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSConditionalType & Opts>;
  isTSConstructSignatureDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSConstructSignatureDeclaration>;
  isTSConstructSignatureDeclaration<
    Opts extends Options<t.TSConstructSignatureDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSConstructSignatureDeclaration & Opts>;
  isTSConstructorType(this: NodePath): this is NodePath<t.TSConstructorType>;
  isTSConstructorType<Opts extends Options<t.TSConstructorType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSConstructorType & Opts>;
  isTSDeclareFunction(this: NodePath): this is NodePath<t.TSDeclareFunction>;
  isTSDeclareFunction<Opts extends Options<t.TSDeclareFunction>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSDeclareFunction & Opts>;
  isTSDeclareMethod(this: NodePath): this is NodePath<t.TSDeclareMethod>;
  isTSDeclareMethod<Opts extends Options<t.TSDeclareMethod>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSDeclareMethod & Opts>;
  isTSEntityName(this: NodePath): this is NodePath<t.TSEntityName>;
  isTSEntityName<Opts extends Options<t.TSEntityName>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSEntityName & Opts>;
  isTSEnumBody(this: NodePath): this is NodePath<t.TSEnumBody>;
  isTSEnumBody<Opts extends Options<t.TSEnumBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSEnumBody & Opts>;
  isTSEnumDeclaration(this: NodePath): this is NodePath<t.TSEnumDeclaration>;
  isTSEnumDeclaration<Opts extends Options<t.TSEnumDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSEnumDeclaration & Opts>;
  isTSEnumMember(this: NodePath): this is NodePath<t.TSEnumMember>;
  isTSEnumMember<Opts extends Options<t.TSEnumMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSEnumMember & Opts>;
  isTSExportAssignment(this: NodePath): this is NodePath<t.TSExportAssignment>;
  isTSExportAssignment<Opts extends Options<t.TSExportAssignment>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSExportAssignment & Opts>;
  isTSExpressionWithTypeArguments(
    this: NodePath,
  ): this is NodePath<t.TSExpressionWithTypeArguments>;
  isTSExpressionWithTypeArguments<
    Opts extends Options<t.TSExpressionWithTypeArguments>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSExpressionWithTypeArguments & Opts>;
  isTSExternalModuleReference(
    this: NodePath,
  ): this is NodePath<t.TSExternalModuleReference>;
  isTSExternalModuleReference<
    Opts extends Options<t.TSExternalModuleReference>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSExternalModuleReference & Opts>;
  isTSFunctionType(this: NodePath): this is NodePath<t.TSFunctionType>;
  isTSFunctionType<Opts extends Options<t.TSFunctionType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSFunctionType & Opts>;
  isTSImportEqualsDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSImportEqualsDeclaration>;
  isTSImportEqualsDeclaration<
    Opts extends Options<t.TSImportEqualsDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSImportEqualsDeclaration & Opts>;
  isTSImportType(this: NodePath): this is NodePath<t.TSImportType>;
  isTSImportType<Opts extends Options<t.TSImportType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSImportType & Opts>;
  isTSIndexSignature(this: NodePath): this is NodePath<t.TSIndexSignature>;
  isTSIndexSignature<Opts extends Options<t.TSIndexSignature>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSIndexSignature & Opts>;
  isTSIndexedAccessType(
    this: NodePath,
  ): this is NodePath<t.TSIndexedAccessType>;
  isTSIndexedAccessType<Opts extends Options<t.TSIndexedAccessType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSIndexedAccessType & Opts>;
  isTSInferType(this: NodePath): this is NodePath<t.TSInferType>;
  isTSInferType<Opts extends Options<t.TSInferType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSInferType & Opts>;
  isTSInstantiationExpression(
    this: NodePath,
  ): this is NodePath<t.TSInstantiationExpression>;
  isTSInstantiationExpression<
    Opts extends Options<t.TSInstantiationExpression>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSInstantiationExpression & Opts>;
  isTSInterfaceBody(this: NodePath): this is NodePath<t.TSInterfaceBody>;
  isTSInterfaceBody<Opts extends Options<t.TSInterfaceBody>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSInterfaceBody & Opts>;
  isTSInterfaceDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSInterfaceDeclaration>;
  isTSInterfaceDeclaration<Opts extends Options<t.TSInterfaceDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSInterfaceDeclaration & Opts>;
  isTSIntersectionType(this: NodePath): this is NodePath<t.TSIntersectionType>;
  isTSIntersectionType<Opts extends Options<t.TSIntersectionType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSIntersectionType & Opts>;
  isTSIntrinsicKeyword(this: NodePath): this is NodePath<t.TSIntrinsicKeyword>;
  isTSIntrinsicKeyword<Opts extends Options<t.TSIntrinsicKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSIntrinsicKeyword & Opts>;
  isTSLiteralType(this: NodePath): this is NodePath<t.TSLiteralType>;
  isTSLiteralType<Opts extends Options<t.TSLiteralType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSLiteralType & Opts>;
  isTSMappedType(this: NodePath): this is NodePath<t.TSMappedType>;
  isTSMappedType<Opts extends Options<t.TSMappedType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSMappedType & Opts>;
  isTSMethodSignature(this: NodePath): this is NodePath<t.TSMethodSignature>;
  isTSMethodSignature<Opts extends Options<t.TSMethodSignature>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSMethodSignature & Opts>;
  isTSModuleBlock(this: NodePath): this is NodePath<t.TSModuleBlock>;
  isTSModuleBlock<Opts extends Options<t.TSModuleBlock>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSModuleBlock & Opts>;
  isTSModuleDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSModuleDeclaration>;
  isTSModuleDeclaration<Opts extends Options<t.TSModuleDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSModuleDeclaration & Opts>;
  isTSNamedTupleMember(this: NodePath): this is NodePath<t.TSNamedTupleMember>;
  isTSNamedTupleMember<Opts extends Options<t.TSNamedTupleMember>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSNamedTupleMember & Opts>;
  isTSNamespaceExportDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSNamespaceExportDeclaration>;
  isTSNamespaceExportDeclaration<
    Opts extends Options<t.TSNamespaceExportDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSNamespaceExportDeclaration & Opts>;
  isTSNeverKeyword(this: NodePath): this is NodePath<t.TSNeverKeyword>;
  isTSNeverKeyword<Opts extends Options<t.TSNeverKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSNeverKeyword & Opts>;
  isTSNonNullExpression(
    this: NodePath,
  ): this is NodePath<t.TSNonNullExpression>;
  isTSNonNullExpression<Opts extends Options<t.TSNonNullExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSNonNullExpression & Opts>;
  isTSNullKeyword(this: NodePath): this is NodePath<t.TSNullKeyword>;
  isTSNullKeyword<Opts extends Options<t.TSNullKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSNullKeyword & Opts>;
  isTSNumberKeyword(this: NodePath): this is NodePath<t.TSNumberKeyword>;
  isTSNumberKeyword<Opts extends Options<t.TSNumberKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSNumberKeyword & Opts>;
  isTSObjectKeyword(this: NodePath): this is NodePath<t.TSObjectKeyword>;
  isTSObjectKeyword<Opts extends Options<t.TSObjectKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSObjectKeyword & Opts>;
  isTSOptionalType(this: NodePath): this is NodePath<t.TSOptionalType>;
  isTSOptionalType<Opts extends Options<t.TSOptionalType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSOptionalType & Opts>;
  isTSParameterProperty(
    this: NodePath,
  ): this is NodePath<t.TSParameterProperty>;
  isTSParameterProperty<Opts extends Options<t.TSParameterProperty>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSParameterProperty & Opts>;
  isTSParenthesizedType(
    this: NodePath,
  ): this is NodePath<t.TSParenthesizedType>;
  isTSParenthesizedType<Opts extends Options<t.TSParenthesizedType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSParenthesizedType & Opts>;
  isTSPropertySignature(
    this: NodePath,
  ): this is NodePath<t.TSPropertySignature>;
  isTSPropertySignature<Opts extends Options<t.TSPropertySignature>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSPropertySignature & Opts>;
  isTSQualifiedName(this: NodePath): this is NodePath<t.TSQualifiedName>;
  isTSQualifiedName<Opts extends Options<t.TSQualifiedName>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSQualifiedName & Opts>;
  isTSRestType(this: NodePath): this is NodePath<t.TSRestType>;
  isTSRestType<Opts extends Options<t.TSRestType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSRestType & Opts>;
  isTSSatisfiesExpression(
    this: NodePath,
  ): this is NodePath<t.TSSatisfiesExpression>;
  isTSSatisfiesExpression<Opts extends Options<t.TSSatisfiesExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSSatisfiesExpression & Opts>;
  isTSStringKeyword(this: NodePath): this is NodePath<t.TSStringKeyword>;
  isTSStringKeyword<Opts extends Options<t.TSStringKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSStringKeyword & Opts>;
  isTSSymbolKeyword(this: NodePath): this is NodePath<t.TSSymbolKeyword>;
  isTSSymbolKeyword<Opts extends Options<t.TSSymbolKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSSymbolKeyword & Opts>;
  isTSTemplateLiteralType(
    this: NodePath,
  ): this is NodePath<t.TSTemplateLiteralType>;
  isTSTemplateLiteralType<Opts extends Options<t.TSTemplateLiteralType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTemplateLiteralType & Opts>;
  isTSThisType(this: NodePath): this is NodePath<t.TSThisType>;
  isTSThisType<Opts extends Options<t.TSThisType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSThisType & Opts>;
  isTSTupleType(this: NodePath): this is NodePath<t.TSTupleType>;
  isTSTupleType<Opts extends Options<t.TSTupleType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTupleType & Opts>;
  isTSType(this: NodePath): this is NodePath<t.TSType>;
  isTSType<Opts extends Options<t.TSType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSType & Opts>;
  isTSTypeAliasDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSTypeAliasDeclaration>;
  isTSTypeAliasDeclaration<Opts extends Options<t.TSTypeAliasDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeAliasDeclaration & Opts>;
  isTSTypeAnnotation(this: NodePath): this is NodePath<t.TSTypeAnnotation>;
  isTSTypeAnnotation<Opts extends Options<t.TSTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeAnnotation & Opts>;
  isTSTypeAssertion(this: NodePath): this is NodePath<t.TSTypeAssertion>;
  isTSTypeAssertion<Opts extends Options<t.TSTypeAssertion>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeAssertion & Opts>;
  isTSTypeElement(this: NodePath): this is NodePath<t.TSTypeElement>;
  isTSTypeElement<Opts extends Options<t.TSTypeElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeElement & Opts>;
  isTSTypeLiteral(this: NodePath): this is NodePath<t.TSTypeLiteral>;
  isTSTypeLiteral<Opts extends Options<t.TSTypeLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeLiteral & Opts>;
  isTSTypeOperator(this: NodePath): this is NodePath<t.TSTypeOperator>;
  isTSTypeOperator<Opts extends Options<t.TSTypeOperator>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeOperator & Opts>;
  isTSTypeParameter(this: NodePath): this is NodePath<t.TSTypeParameter>;
  isTSTypeParameter<Opts extends Options<t.TSTypeParameter>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeParameter & Opts>;
  isTSTypeParameterDeclaration(
    this: NodePath,
  ): this is NodePath<t.TSTypeParameterDeclaration>;
  isTSTypeParameterDeclaration<
    Opts extends Options<t.TSTypeParameterDeclaration>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeParameterDeclaration & Opts>;
  isTSTypeParameterInstantiation(
    this: NodePath,
  ): this is NodePath<t.TSTypeParameterInstantiation>;
  isTSTypeParameterInstantiation<
    Opts extends Options<t.TSTypeParameterInstantiation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeParameterInstantiation & Opts>;
  isTSTypePredicate(this: NodePath): this is NodePath<t.TSTypePredicate>;
  isTSTypePredicate<Opts extends Options<t.TSTypePredicate>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypePredicate & Opts>;
  isTSTypeQuery(this: NodePath): this is NodePath<t.TSTypeQuery>;
  isTSTypeQuery<Opts extends Options<t.TSTypeQuery>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeQuery & Opts>;
  isTSTypeReference(this: NodePath): this is NodePath<t.TSTypeReference>;
  isTSTypeReference<Opts extends Options<t.TSTypeReference>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSTypeReference & Opts>;
  isTSUndefinedKeyword(this: NodePath): this is NodePath<t.TSUndefinedKeyword>;
  isTSUndefinedKeyword<Opts extends Options<t.TSUndefinedKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSUndefinedKeyword & Opts>;
  isTSUnionType(this: NodePath): this is NodePath<t.TSUnionType>;
  isTSUnionType<Opts extends Options<t.TSUnionType>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSUnionType & Opts>;
  isTSUnknownKeyword(this: NodePath): this is NodePath<t.TSUnknownKeyword>;
  isTSUnknownKeyword<Opts extends Options<t.TSUnknownKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSUnknownKeyword & Opts>;
  isTSVoidKeyword(this: NodePath): this is NodePath<t.TSVoidKeyword>;
  isTSVoidKeyword<Opts extends Options<t.TSVoidKeyword>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TSVoidKeyword & Opts>;
  isTaggedTemplateExpression(
    this: NodePath,
  ): this is NodePath<t.TaggedTemplateExpression>;
  isTaggedTemplateExpression<Opts extends Options<t.TaggedTemplateExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TaggedTemplateExpression & Opts>;
  isTemplateElement(this: NodePath): this is NodePath<t.TemplateElement>;
  isTemplateElement<Opts extends Options<t.TemplateElement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TemplateElement & Opts>;
  isTemplateLiteral(this: NodePath): this is NodePath<t.TemplateLiteral>;
  isTemplateLiteral<Opts extends Options<t.TemplateLiteral>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TemplateLiteral & Opts>;
  isTerminatorless(this: NodePath): this is NodePath<t.Terminatorless>;
  isTerminatorless<Opts extends Options<t.Terminatorless>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Terminatorless & Opts>;
  isThisExpression(this: NodePath): this is NodePath<t.ThisExpression>;
  isThisExpression<Opts extends Options<t.ThisExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ThisExpression & Opts>;
  isThisTypeAnnotation(this: NodePath): this is NodePath<t.ThisTypeAnnotation>;
  isThisTypeAnnotation<Opts extends Options<t.ThisTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ThisTypeAnnotation & Opts>;
  isThrowStatement(this: NodePath): this is NodePath<t.ThrowStatement>;
  isThrowStatement<Opts extends Options<t.ThrowStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.ThrowStatement & Opts>;
  isTopicReference(this: NodePath): this is NodePath<t.TopicReference>;
  isTopicReference<Opts extends Options<t.TopicReference>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TopicReference & Opts>;
  isTryStatement(this: NodePath): this is NodePath<t.TryStatement>;
  isTryStatement<Opts extends Options<t.TryStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TryStatement & Opts>;
  isTupleExpression(this: NodePath): this is NodePath<t.TupleExpression>;
  isTupleExpression<Opts extends Options<t.TupleExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TupleExpression & Opts>;
  isTupleTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.TupleTypeAnnotation>;
  isTupleTypeAnnotation<Opts extends Options<t.TupleTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TupleTypeAnnotation & Opts>;
  isTypeAlias(this: NodePath): this is NodePath<t.TypeAlias>;
  isTypeAlias<Opts extends Options<t.TypeAlias>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeAlias & Opts>;
  isTypeAnnotation(this: NodePath): this is NodePath<t.TypeAnnotation>;
  isTypeAnnotation<Opts extends Options<t.TypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeAnnotation & Opts>;
  isTypeCastExpression(this: NodePath): this is NodePath<t.TypeCastExpression>;
  isTypeCastExpression<Opts extends Options<t.TypeCastExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeCastExpression & Opts>;
  isTypeParameter(this: NodePath): this is NodePath<t.TypeParameter>;
  isTypeParameter<Opts extends Options<t.TypeParameter>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeParameter & Opts>;
  isTypeParameterDeclaration(
    this: NodePath,
  ): this is NodePath<t.TypeParameterDeclaration>;
  isTypeParameterDeclaration<Opts extends Options<t.TypeParameterDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeParameterDeclaration & Opts>;
  isTypeParameterInstantiation(
    this: NodePath,
  ): this is NodePath<t.TypeParameterInstantiation>;
  isTypeParameterInstantiation<
    Opts extends Options<t.TypeParameterInstantiation>,
  >(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeParameterInstantiation & Opts>;
  isTypeScript(this: NodePath): this is NodePath<t.TypeScript>;
  isTypeScript<Opts extends Options<t.TypeScript>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeScript & Opts>;
  isTypeofTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.TypeofTypeAnnotation>;
  isTypeofTypeAnnotation<Opts extends Options<t.TypeofTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.TypeofTypeAnnotation & Opts>;
  isUnaryExpression(this: NodePath): this is NodePath<t.UnaryExpression>;
  isUnaryExpression<Opts extends Options<t.UnaryExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.UnaryExpression & Opts>;
  isUnaryLike(this: NodePath): this is NodePath<t.UnaryLike>;
  isUnaryLike<Opts extends Options<t.UnaryLike>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.UnaryLike & Opts>;
  isUnionTypeAnnotation(
    this: NodePath,
  ): this is NodePath<t.UnionTypeAnnotation>;
  isUnionTypeAnnotation<Opts extends Options<t.UnionTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.UnionTypeAnnotation & Opts>;
  isUpdateExpression(this: NodePath): this is NodePath<t.UpdateExpression>;
  isUpdateExpression<Opts extends Options<t.UpdateExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.UpdateExpression & Opts>;
  isUserWhitespacable(this: NodePath): this is NodePath<t.UserWhitespacable>;
  isUserWhitespacable<Opts extends Options<t.UserWhitespacable>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.UserWhitespacable & Opts>;
  isV8IntrinsicIdentifier(
    this: NodePath,
  ): this is NodePath<t.V8IntrinsicIdentifier>;
  isV8IntrinsicIdentifier<Opts extends Options<t.V8IntrinsicIdentifier>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.V8IntrinsicIdentifier & Opts>;
  isVariableDeclaration(
    this: NodePath,
  ): this is NodePath<t.VariableDeclaration>;
  isVariableDeclaration<Opts extends Options<t.VariableDeclaration>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.VariableDeclaration & Opts>;
  isVariableDeclarator(this: NodePath): this is NodePath<t.VariableDeclarator>;
  isVariableDeclarator<Opts extends Options<t.VariableDeclarator>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.VariableDeclarator & Opts>;
  isVariance(this: NodePath): this is NodePath<t.Variance>;
  isVariance<Opts extends Options<t.Variance>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.Variance & Opts>;
  isVoidPattern(this: NodePath): this is NodePath<t.VoidPattern>;
  isVoidPattern<Opts extends Options<t.VoidPattern>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.VoidPattern & Opts>;
  isVoidTypeAnnotation(this: NodePath): this is NodePath<t.VoidTypeAnnotation>;
  isVoidTypeAnnotation<Opts extends Options<t.VoidTypeAnnotation>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.VoidTypeAnnotation & Opts>;
  isWhile(this: NodePath): this is NodePath<t.While>;
  isWhile<Opts extends Options<t.While>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.While & Opts>;
  isWhileStatement(this: NodePath): this is NodePath<t.WhileStatement>;
  isWhileStatement<Opts extends Options<t.WhileStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.WhileStatement & Opts>;
  isWithStatement(this: NodePath): this is NodePath<t.WithStatement>;
  isWithStatement<Opts extends Options<t.WithStatement>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.WithStatement & Opts>;
  isYieldExpression(this: NodePath): this is NodePath<t.YieldExpression>;
  isYieldExpression<Opts extends Options<t.YieldExpression>>(
    this: NodePath,
    opts: Opts,
  ): this is NodePath<t.YieldExpression & Opts>;
}

export interface NodePathValidators
  extends Omit<BaseNodePathValidators, keyof VirtualTypeNodePathValidators>,
    VirtualTypeNodePathValidators {}
