/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import type * as t from "@babel/types";
import type NodePath from "../index";

type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
      ? t.Node[]
      : Obj[Prop];
}>;

export interface NodePathAssertions {
  assertAccessor<Opts extends Options<t.Accessor>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Accessor & Opts>;
  assertAnyTypeAnnotation<Opts extends Options<t.AnyTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.AnyTypeAnnotation & Opts>;
  assertArgumentPlaceholder<Opts extends Options<t.ArgumentPlaceholder>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ArgumentPlaceholder & Opts>;
  assertArrayExpression<Opts extends Options<t.ArrayExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ArrayExpression & Opts>;
  assertArrayPattern<Opts extends Options<t.ArrayPattern>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ArrayPattern & Opts>;
  assertArrayTypeAnnotation<Opts extends Options<t.ArrayTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ArrayTypeAnnotation & Opts>;
  assertArrowFunctionExpression<
    Opts extends Options<t.ArrowFunctionExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ArrowFunctionExpression & Opts>;
  assertAssignmentExpression<Opts extends Options<t.AssignmentExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.AssignmentExpression & Opts>;
  assertAssignmentPattern<Opts extends Options<t.AssignmentPattern>>(
    opts?: Opts,
  ): asserts this is NodePath<t.AssignmentPattern & Opts>;
  assertAwaitExpression<Opts extends Options<t.AwaitExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.AwaitExpression & Opts>;
  assertBigIntLiteral<Opts extends Options<t.BigIntLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BigIntLiteral & Opts>;
  assertBinary<Opts extends Options<t.Binary>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Binary & Opts>;
  assertBinaryExpression<Opts extends Options<t.BinaryExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BinaryExpression & Opts>;
  assertBindExpression<Opts extends Options<t.BindExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BindExpression & Opts>;
  assertBlock<Opts extends Options<t.Block>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Block & Opts>;
  assertBlockParent<Opts extends Options<t.BlockParent>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BlockParent & Opts>;
  assertBlockStatement<Opts extends Options<t.BlockStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BlockStatement & Opts>;
  assertBooleanLiteral<Opts extends Options<t.BooleanLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BooleanLiteral & Opts>;
  assertBooleanLiteralTypeAnnotation<
    Opts extends Options<t.BooleanLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.BooleanLiteralTypeAnnotation & Opts>;
  assertBooleanTypeAnnotation<Opts extends Options<t.BooleanTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BooleanTypeAnnotation & Opts>;
  assertBreakStatement<Opts extends Options<t.BreakStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.BreakStatement & Opts>;
  assertCallExpression<Opts extends Options<t.CallExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.CallExpression & Opts>;
  assertCatchClause<Opts extends Options<t.CatchClause>>(
    opts?: Opts,
  ): asserts this is NodePath<t.CatchClause & Opts>;
  assertClass<Opts extends Options<t.Class>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Class & Opts>;
  assertClassAccessorProperty<Opts extends Options<t.ClassAccessorProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassAccessorProperty & Opts>;
  assertClassBody<Opts extends Options<t.ClassBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassBody & Opts>;
  assertClassDeclaration<Opts extends Options<t.ClassDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassDeclaration & Opts>;
  assertClassExpression<Opts extends Options<t.ClassExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassExpression & Opts>;
  assertClassImplements<Opts extends Options<t.ClassImplements>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassImplements & Opts>;
  assertClassMethod<Opts extends Options<t.ClassMethod>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassMethod & Opts>;
  assertClassPrivateMethod<Opts extends Options<t.ClassPrivateMethod>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassPrivateMethod & Opts>;
  assertClassPrivateProperty<Opts extends Options<t.ClassPrivateProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassPrivateProperty & Opts>;
  assertClassProperty<Opts extends Options<t.ClassProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ClassProperty & Opts>;
  assertCompletionStatement<Opts extends Options<t.CompletionStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.CompletionStatement & Opts>;
  assertConditional<Opts extends Options<t.Conditional>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Conditional & Opts>;
  assertConditionalExpression<Opts extends Options<t.ConditionalExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ConditionalExpression & Opts>;
  assertContinueStatement<Opts extends Options<t.ContinueStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ContinueStatement & Opts>;
  assertDebuggerStatement<Opts extends Options<t.DebuggerStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DebuggerStatement & Opts>;
  assertDecimalLiteral<Opts extends Options<t.DecimalLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DecimalLiteral & Opts>;
  assertDeclaration<Opts extends Options<t.Declaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Declaration & Opts>;
  assertDeclareClass<Opts extends Options<t.DeclareClass>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareClass & Opts>;
  assertDeclareExportAllDeclaration<
    Opts extends Options<t.DeclareExportAllDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareExportAllDeclaration & Opts>;
  assertDeclareExportDeclaration<
    Opts extends Options<t.DeclareExportDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareExportDeclaration & Opts>;
  assertDeclareFunction<Opts extends Options<t.DeclareFunction>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareFunction & Opts>;
  assertDeclareInterface<Opts extends Options<t.DeclareInterface>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareInterface & Opts>;
  assertDeclareModule<Opts extends Options<t.DeclareModule>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareModule & Opts>;
  assertDeclareModuleExports<Opts extends Options<t.DeclareModuleExports>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareModuleExports & Opts>;
  assertDeclareOpaqueType<Opts extends Options<t.DeclareOpaqueType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareOpaqueType & Opts>;
  assertDeclareTypeAlias<Opts extends Options<t.DeclareTypeAlias>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareTypeAlias & Opts>;
  assertDeclareVariable<Opts extends Options<t.DeclareVariable>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclareVariable & Opts>;
  assertDeclaredPredicate<Opts extends Options<t.DeclaredPredicate>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DeclaredPredicate & Opts>;
  assertDecorator<Opts extends Options<t.Decorator>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Decorator & Opts>;
  assertDirective<Opts extends Options<t.Directive>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Directive & Opts>;
  assertDirectiveLiteral<Opts extends Options<t.DirectiveLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DirectiveLiteral & Opts>;
  assertDoExpression<Opts extends Options<t.DoExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DoExpression & Opts>;
  assertDoWhileStatement<Opts extends Options<t.DoWhileStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.DoWhileStatement & Opts>;
  assertEmptyStatement<Opts extends Options<t.EmptyStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EmptyStatement & Opts>;
  assertEmptyTypeAnnotation<Opts extends Options<t.EmptyTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EmptyTypeAnnotation & Opts>;
  assertEnumBody<Opts extends Options<t.EnumBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumBody & Opts>;
  assertEnumBooleanBody<Opts extends Options<t.EnumBooleanBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumBooleanBody & Opts>;
  assertEnumBooleanMember<Opts extends Options<t.EnumBooleanMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumBooleanMember & Opts>;
  assertEnumDeclaration<Opts extends Options<t.EnumDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumDeclaration & Opts>;
  assertEnumDefaultedMember<Opts extends Options<t.EnumDefaultedMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumDefaultedMember & Opts>;
  assertEnumMember<Opts extends Options<t.EnumMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumMember & Opts>;
  assertEnumNumberBody<Opts extends Options<t.EnumNumberBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumNumberBody & Opts>;
  assertEnumNumberMember<Opts extends Options<t.EnumNumberMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumNumberMember & Opts>;
  assertEnumStringBody<Opts extends Options<t.EnumStringBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumStringBody & Opts>;
  assertEnumStringMember<Opts extends Options<t.EnumStringMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumStringMember & Opts>;
  assertEnumSymbolBody<Opts extends Options<t.EnumSymbolBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.EnumSymbolBody & Opts>;
  assertExistsTypeAnnotation<Opts extends Options<t.ExistsTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExistsTypeAnnotation & Opts>;
  assertExportAllDeclaration<Opts extends Options<t.ExportAllDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportAllDeclaration & Opts>;
  assertExportDeclaration<Opts extends Options<t.ExportDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportDeclaration & Opts>;
  assertExportDefaultDeclaration<
    Opts extends Options<t.ExportDefaultDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportDefaultDeclaration & Opts>;
  assertExportDefaultSpecifier<Opts extends Options<t.ExportDefaultSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportDefaultSpecifier & Opts>;
  assertExportNamedDeclaration<Opts extends Options<t.ExportNamedDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportNamedDeclaration & Opts>;
  assertExportNamespaceSpecifier<
    Opts extends Options<t.ExportNamespaceSpecifier>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportNamespaceSpecifier & Opts>;
  assertExportSpecifier<Opts extends Options<t.ExportSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExportSpecifier & Opts>;
  assertExpression<Opts extends Options<t.Expression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Expression & Opts>;
  assertExpressionStatement<Opts extends Options<t.ExpressionStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExpressionStatement & Opts>;
  assertExpressionWrapper<Opts extends Options<t.ExpressionWrapper>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ExpressionWrapper & Opts>;
  assertFile<Opts extends Options<t.File>>(
    opts?: Opts,
  ): asserts this is NodePath<t.File & Opts>;
  assertFlow<Opts extends Options<t.Flow>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Flow & Opts>;
  assertFlowBaseAnnotation<Opts extends Options<t.FlowBaseAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FlowBaseAnnotation & Opts>;
  assertFlowDeclaration<Opts extends Options<t.FlowDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FlowDeclaration & Opts>;
  assertFlowPredicate<Opts extends Options<t.FlowPredicate>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FlowPredicate & Opts>;
  assertFlowType<Opts extends Options<t.FlowType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FlowType & Opts>;
  assertFor<Opts extends Options<t.For>>(
    opts?: Opts,
  ): asserts this is NodePath<t.For & Opts>;
  assertForInStatement<Opts extends Options<t.ForInStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ForInStatement & Opts>;
  assertForOfStatement<Opts extends Options<t.ForOfStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ForOfStatement & Opts>;
  assertForStatement<Opts extends Options<t.ForStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ForStatement & Opts>;
  assertForXStatement<Opts extends Options<t.ForXStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ForXStatement & Opts>;
  assertFunction<Opts extends Options<t.Function>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Function & Opts>;
  assertFunctionDeclaration<Opts extends Options<t.FunctionDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FunctionDeclaration & Opts>;
  assertFunctionExpression<Opts extends Options<t.FunctionExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FunctionExpression & Opts>;
  assertFunctionParameter<Opts extends Options<t.FunctionParameter>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FunctionParameter & Opts>;
  assertFunctionParent<Opts extends Options<t.FunctionParent>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FunctionParent & Opts>;
  assertFunctionTypeAnnotation<Opts extends Options<t.FunctionTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FunctionTypeAnnotation & Opts>;
  assertFunctionTypeParam<Opts extends Options<t.FunctionTypeParam>>(
    opts?: Opts,
  ): asserts this is NodePath<t.FunctionTypeParam & Opts>;
  assertGenericTypeAnnotation<Opts extends Options<t.GenericTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.GenericTypeAnnotation & Opts>;
  assertIdentifier<Opts extends Options<t.Identifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Identifier & Opts>;
  assertIfStatement<Opts extends Options<t.IfStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.IfStatement & Opts>;
  assertImmutable<Opts extends Options<t.Immutable>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Immutable & Opts>;
  assertImport<Opts extends Options<t.Import>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Import & Opts>;
  assertImportAttribute<Opts extends Options<t.ImportAttribute>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportAttribute & Opts>;
  assertImportDeclaration<Opts extends Options<t.ImportDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportDeclaration & Opts>;
  assertImportDefaultSpecifier<Opts extends Options<t.ImportDefaultSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportDefaultSpecifier & Opts>;
  assertImportExpression<Opts extends Options<t.ImportExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportExpression & Opts>;
  assertImportNamespaceSpecifier<
    Opts extends Options<t.ImportNamespaceSpecifier>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportNamespaceSpecifier & Opts>;
  assertImportOrExportDeclaration<
    Opts extends Options<t.ImportOrExportDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportOrExportDeclaration & Opts>;
  assertImportSpecifier<Opts extends Options<t.ImportSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ImportSpecifier & Opts>;
  assertIndexedAccessType<Opts extends Options<t.IndexedAccessType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.IndexedAccessType & Opts>;
  assertInferredPredicate<Opts extends Options<t.InferredPredicate>>(
    opts?: Opts,
  ): asserts this is NodePath<t.InferredPredicate & Opts>;
  assertInterfaceDeclaration<Opts extends Options<t.InterfaceDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.InterfaceDeclaration & Opts>;
  assertInterfaceExtends<Opts extends Options<t.InterfaceExtends>>(
    opts?: Opts,
  ): asserts this is NodePath<t.InterfaceExtends & Opts>;
  assertInterfaceTypeAnnotation<
    Opts extends Options<t.InterfaceTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.InterfaceTypeAnnotation & Opts>;
  assertInterpreterDirective<Opts extends Options<t.InterpreterDirective>>(
    opts?: Opts,
  ): asserts this is NodePath<t.InterpreterDirective & Opts>;
  assertIntersectionTypeAnnotation<
    Opts extends Options<t.IntersectionTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.IntersectionTypeAnnotation & Opts>;
  assertJSX<Opts extends Options<t.JSX>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSX & Opts>;
  assertJSXAttribute<Opts extends Options<t.JSXAttribute>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXAttribute & Opts>;
  assertJSXClosingElement<Opts extends Options<t.JSXClosingElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXClosingElement & Opts>;
  assertJSXClosingFragment<Opts extends Options<t.JSXClosingFragment>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXClosingFragment & Opts>;
  assertJSXElement<Opts extends Options<t.JSXElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXElement & Opts>;
  assertJSXEmptyExpression<Opts extends Options<t.JSXEmptyExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXEmptyExpression & Opts>;
  assertJSXExpressionContainer<Opts extends Options<t.JSXExpressionContainer>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXExpressionContainer & Opts>;
  assertJSXFragment<Opts extends Options<t.JSXFragment>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXFragment & Opts>;
  assertJSXIdentifier<Opts extends Options<t.JSXIdentifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXIdentifier & Opts>;
  assertJSXMemberExpression<Opts extends Options<t.JSXMemberExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXMemberExpression & Opts>;
  assertJSXNamespacedName<Opts extends Options<t.JSXNamespacedName>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXNamespacedName & Opts>;
  assertJSXOpeningElement<Opts extends Options<t.JSXOpeningElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXOpeningElement & Opts>;
  assertJSXOpeningFragment<Opts extends Options<t.JSXOpeningFragment>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXOpeningFragment & Opts>;
  assertJSXSpreadAttribute<Opts extends Options<t.JSXSpreadAttribute>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXSpreadAttribute & Opts>;
  assertJSXSpreadChild<Opts extends Options<t.JSXSpreadChild>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXSpreadChild & Opts>;
  assertJSXText<Opts extends Options<t.JSXText>>(
    opts?: Opts,
  ): asserts this is NodePath<t.JSXText & Opts>;
  assertLVal<Opts extends Options<t.LVal>>(
    opts?: Opts,
  ): asserts this is NodePath<t.LVal & Opts>;
  assertLabeledStatement<Opts extends Options<t.LabeledStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.LabeledStatement & Opts>;
  assertLiteral<Opts extends Options<t.Literal>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Literal & Opts>;
  assertLogicalExpression<Opts extends Options<t.LogicalExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.LogicalExpression & Opts>;
  assertLoop<Opts extends Options<t.Loop>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Loop & Opts>;
  assertMemberExpression<Opts extends Options<t.MemberExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.MemberExpression & Opts>;
  assertMetaProperty<Opts extends Options<t.MetaProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.MetaProperty & Opts>;
  assertMethod<Opts extends Options<t.Method>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Method & Opts>;
  assertMiscellaneous<Opts extends Options<t.Miscellaneous>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Miscellaneous & Opts>;
  assertMixedTypeAnnotation<Opts extends Options<t.MixedTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.MixedTypeAnnotation & Opts>;
  assertModuleDeclaration<Opts extends Options<t.ModuleDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ModuleDeclaration & Opts>;
  assertModuleExpression<Opts extends Options<t.ModuleExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ModuleExpression & Opts>;
  assertModuleSpecifier<Opts extends Options<t.ModuleSpecifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ModuleSpecifier & Opts>;
  assertNewExpression<Opts extends Options<t.NewExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.NewExpression & Opts>;
  assertNoop<Opts extends Options<t.Noop>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Noop & Opts>;
  assertNullLiteral<Opts extends Options<t.NullLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.NullLiteral & Opts>;
  assertNullLiteralTypeAnnotation<
    Opts extends Options<t.NullLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.NullLiteralTypeAnnotation & Opts>;
  assertNullableTypeAnnotation<Opts extends Options<t.NullableTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.NullableTypeAnnotation & Opts>;
  assertNumberLiteral<Opts extends Options<t.NumberLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.NumberLiteral & Opts>;
  assertNumberLiteralTypeAnnotation<
    Opts extends Options<t.NumberLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.NumberLiteralTypeAnnotation & Opts>;
  assertNumberTypeAnnotation<Opts extends Options<t.NumberTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.NumberTypeAnnotation & Opts>;
  assertNumericLiteral<Opts extends Options<t.NumericLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.NumericLiteral & Opts>;
  assertObjectExpression<Opts extends Options<t.ObjectExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectExpression & Opts>;
  assertObjectMember<Opts extends Options<t.ObjectMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectMember & Opts>;
  assertObjectMethod<Opts extends Options<t.ObjectMethod>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectMethod & Opts>;
  assertObjectPattern<Opts extends Options<t.ObjectPattern>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectPattern & Opts>;
  assertObjectProperty<Opts extends Options<t.ObjectProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectProperty & Opts>;
  assertObjectTypeAnnotation<Opts extends Options<t.ObjectTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectTypeAnnotation & Opts>;
  assertObjectTypeCallProperty<Opts extends Options<t.ObjectTypeCallProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectTypeCallProperty & Opts>;
  assertObjectTypeIndexer<Opts extends Options<t.ObjectTypeIndexer>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectTypeIndexer & Opts>;
  assertObjectTypeInternalSlot<Opts extends Options<t.ObjectTypeInternalSlot>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectTypeInternalSlot & Opts>;
  assertObjectTypeProperty<Opts extends Options<t.ObjectTypeProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectTypeProperty & Opts>;
  assertObjectTypeSpreadProperty<
    Opts extends Options<t.ObjectTypeSpreadProperty>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ObjectTypeSpreadProperty & Opts>;
  assertOpaqueType<Opts extends Options<t.OpaqueType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.OpaqueType & Opts>;
  assertOptionalCallExpression<Opts extends Options<t.OptionalCallExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.OptionalCallExpression & Opts>;
  assertOptionalIndexedAccessType<
    Opts extends Options<t.OptionalIndexedAccessType>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.OptionalIndexedAccessType & Opts>;
  assertOptionalMemberExpression<
    Opts extends Options<t.OptionalMemberExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.OptionalMemberExpression & Opts>;
  assertParenthesizedExpression<
    Opts extends Options<t.ParenthesizedExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.ParenthesizedExpression & Opts>;
  assertPattern<Opts extends Options<t.Pattern>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Pattern & Opts>;
  assertPatternLike<Opts extends Options<t.PatternLike>>(
    opts?: Opts,
  ): asserts this is NodePath<t.PatternLike & Opts>;
  assertPipelineBareFunction<Opts extends Options<t.PipelineBareFunction>>(
    opts?: Opts,
  ): asserts this is NodePath<t.PipelineBareFunction & Opts>;
  assertPipelinePrimaryTopicReference<
    Opts extends Options<t.PipelinePrimaryTopicReference>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.PipelinePrimaryTopicReference & Opts>;
  assertPipelineTopicExpression<
    Opts extends Options<t.PipelineTopicExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.PipelineTopicExpression & Opts>;
  assertPlaceholder<Opts extends Options<t.Placeholder>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Placeholder & Opts>;
  assertPrivate<Opts extends Options<t.Private>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Private & Opts>;
  assertPrivateName<Opts extends Options<t.PrivateName>>(
    opts?: Opts,
  ): asserts this is NodePath<t.PrivateName & Opts>;
  assertProgram<Opts extends Options<t.Program>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Program & Opts>;
  assertProperty<Opts extends Options<t.Property>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Property & Opts>;
  assertPureish<Opts extends Options<t.Pureish>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Pureish & Opts>;
  assertQualifiedTypeIdentifier<
    Opts extends Options<t.QualifiedTypeIdentifier>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.QualifiedTypeIdentifier & Opts>;
  assertRecordExpression<Opts extends Options<t.RecordExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.RecordExpression & Opts>;
  assertRegExpLiteral<Opts extends Options<t.RegExpLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.RegExpLiteral & Opts>;
  assertRegexLiteral<Opts extends Options<t.RegexLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.RegexLiteral & Opts>;
  assertRestElement<Opts extends Options<t.RestElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.RestElement & Opts>;
  assertRestProperty<Opts extends Options<t.RestProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.RestProperty & Opts>;
  assertReturnStatement<Opts extends Options<t.ReturnStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ReturnStatement & Opts>;
  assertScopable<Opts extends Options<t.Scopable>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Scopable & Opts>;
  assertSequenceExpression<Opts extends Options<t.SequenceExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.SequenceExpression & Opts>;
  assertSpreadElement<Opts extends Options<t.SpreadElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.SpreadElement & Opts>;
  assertSpreadProperty<Opts extends Options<t.SpreadProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.SpreadProperty & Opts>;
  assertStandardized<Opts extends Options<t.Standardized>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Standardized & Opts>;
  assertStatement<Opts extends Options<t.Statement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Statement & Opts>;
  assertStaticBlock<Opts extends Options<t.StaticBlock>>(
    opts?: Opts,
  ): asserts this is NodePath<t.StaticBlock & Opts>;
  assertStringLiteral<Opts extends Options<t.StringLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.StringLiteral & Opts>;
  assertStringLiteralTypeAnnotation<
    Opts extends Options<t.StringLiteralTypeAnnotation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.StringLiteralTypeAnnotation & Opts>;
  assertStringTypeAnnotation<Opts extends Options<t.StringTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.StringTypeAnnotation & Opts>;
  assertSuper<Opts extends Options<t.Super>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Super & Opts>;
  assertSwitchCase<Opts extends Options<t.SwitchCase>>(
    opts?: Opts,
  ): asserts this is NodePath<t.SwitchCase & Opts>;
  assertSwitchStatement<Opts extends Options<t.SwitchStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.SwitchStatement & Opts>;
  assertSymbolTypeAnnotation<Opts extends Options<t.SymbolTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.SymbolTypeAnnotation & Opts>;
  assertTSAnyKeyword<Opts extends Options<t.TSAnyKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSAnyKeyword & Opts>;
  assertTSArrayType<Opts extends Options<t.TSArrayType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSArrayType & Opts>;
  assertTSAsExpression<Opts extends Options<t.TSAsExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSAsExpression & Opts>;
  assertTSBaseType<Opts extends Options<t.TSBaseType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSBaseType & Opts>;
  assertTSBigIntKeyword<Opts extends Options<t.TSBigIntKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSBigIntKeyword & Opts>;
  assertTSBooleanKeyword<Opts extends Options<t.TSBooleanKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSBooleanKeyword & Opts>;
  assertTSCallSignatureDeclaration<
    Opts extends Options<t.TSCallSignatureDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSCallSignatureDeclaration & Opts>;
  assertTSConditionalType<Opts extends Options<t.TSConditionalType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSConditionalType & Opts>;
  assertTSConstructSignatureDeclaration<
    Opts extends Options<t.TSConstructSignatureDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSConstructSignatureDeclaration & Opts>;
  assertTSConstructorType<Opts extends Options<t.TSConstructorType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSConstructorType & Opts>;
  assertTSDeclareFunction<Opts extends Options<t.TSDeclareFunction>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSDeclareFunction & Opts>;
  assertTSDeclareMethod<Opts extends Options<t.TSDeclareMethod>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSDeclareMethod & Opts>;
  assertTSEntityName<Opts extends Options<t.TSEntityName>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSEntityName & Opts>;
  assertTSEnumBody<Opts extends Options<t.TSEnumBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSEnumBody & Opts>;
  assertTSEnumDeclaration<Opts extends Options<t.TSEnumDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSEnumDeclaration & Opts>;
  assertTSEnumMember<Opts extends Options<t.TSEnumMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSEnumMember & Opts>;
  assertTSExportAssignment<Opts extends Options<t.TSExportAssignment>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSExportAssignment & Opts>;
  assertTSExpressionWithTypeArguments<
    Opts extends Options<t.TSExpressionWithTypeArguments>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSExpressionWithTypeArguments & Opts>;
  assertTSExternalModuleReference<
    Opts extends Options<t.TSExternalModuleReference>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSExternalModuleReference & Opts>;
  assertTSFunctionType<Opts extends Options<t.TSFunctionType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSFunctionType & Opts>;
  assertTSImportEqualsDeclaration<
    Opts extends Options<t.TSImportEqualsDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSImportEqualsDeclaration & Opts>;
  assertTSImportType<Opts extends Options<t.TSImportType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSImportType & Opts>;
  assertTSIndexSignature<Opts extends Options<t.TSIndexSignature>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSIndexSignature & Opts>;
  assertTSIndexedAccessType<Opts extends Options<t.TSIndexedAccessType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSIndexedAccessType & Opts>;
  assertTSInferType<Opts extends Options<t.TSInferType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSInferType & Opts>;
  assertTSInstantiationExpression<
    Opts extends Options<t.TSInstantiationExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSInstantiationExpression & Opts>;
  assertTSInterfaceBody<Opts extends Options<t.TSInterfaceBody>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSInterfaceBody & Opts>;
  assertTSInterfaceDeclaration<Opts extends Options<t.TSInterfaceDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSInterfaceDeclaration & Opts>;
  assertTSIntersectionType<Opts extends Options<t.TSIntersectionType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSIntersectionType & Opts>;
  assertTSIntrinsicKeyword<Opts extends Options<t.TSIntrinsicKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSIntrinsicKeyword & Opts>;
  assertTSLiteralType<Opts extends Options<t.TSLiteralType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSLiteralType & Opts>;
  assertTSMappedType<Opts extends Options<t.TSMappedType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSMappedType & Opts>;
  assertTSMethodSignature<Opts extends Options<t.TSMethodSignature>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSMethodSignature & Opts>;
  assertTSModuleBlock<Opts extends Options<t.TSModuleBlock>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSModuleBlock & Opts>;
  assertTSModuleDeclaration<Opts extends Options<t.TSModuleDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSModuleDeclaration & Opts>;
  assertTSNamedTupleMember<Opts extends Options<t.TSNamedTupleMember>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSNamedTupleMember & Opts>;
  assertTSNamespaceExportDeclaration<
    Opts extends Options<t.TSNamespaceExportDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSNamespaceExportDeclaration & Opts>;
  assertTSNeverKeyword<Opts extends Options<t.TSNeverKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSNeverKeyword & Opts>;
  assertTSNonNullExpression<Opts extends Options<t.TSNonNullExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSNonNullExpression & Opts>;
  assertTSNullKeyword<Opts extends Options<t.TSNullKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSNullKeyword & Opts>;
  assertTSNumberKeyword<Opts extends Options<t.TSNumberKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSNumberKeyword & Opts>;
  assertTSObjectKeyword<Opts extends Options<t.TSObjectKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSObjectKeyword & Opts>;
  assertTSOptionalType<Opts extends Options<t.TSOptionalType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSOptionalType & Opts>;
  assertTSParameterProperty<Opts extends Options<t.TSParameterProperty>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSParameterProperty & Opts>;
  assertTSParenthesizedType<Opts extends Options<t.TSParenthesizedType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSParenthesizedType & Opts>;
  assertTSPropertySignature<Opts extends Options<t.TSPropertySignature>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSPropertySignature & Opts>;
  assertTSQualifiedName<Opts extends Options<t.TSQualifiedName>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSQualifiedName & Opts>;
  assertTSRestType<Opts extends Options<t.TSRestType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSRestType & Opts>;
  assertTSSatisfiesExpression<Opts extends Options<t.TSSatisfiesExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSSatisfiesExpression & Opts>;
  assertTSStringKeyword<Opts extends Options<t.TSStringKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSStringKeyword & Opts>;
  assertTSSymbolKeyword<Opts extends Options<t.TSSymbolKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSSymbolKeyword & Opts>;
  assertTSTemplateLiteralType<Opts extends Options<t.TSTemplateLiteralType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTemplateLiteralType & Opts>;
  assertTSThisType<Opts extends Options<t.TSThisType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSThisType & Opts>;
  assertTSTupleType<Opts extends Options<t.TSTupleType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTupleType & Opts>;
  assertTSType<Opts extends Options<t.TSType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSType & Opts>;
  assertTSTypeAliasDeclaration<Opts extends Options<t.TSTypeAliasDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeAliasDeclaration & Opts>;
  assertTSTypeAnnotation<Opts extends Options<t.TSTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeAnnotation & Opts>;
  assertTSTypeAssertion<Opts extends Options<t.TSTypeAssertion>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeAssertion & Opts>;
  assertTSTypeElement<Opts extends Options<t.TSTypeElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeElement & Opts>;
  assertTSTypeLiteral<Opts extends Options<t.TSTypeLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeLiteral & Opts>;
  assertTSTypeOperator<Opts extends Options<t.TSTypeOperator>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeOperator & Opts>;
  assertTSTypeParameter<Opts extends Options<t.TSTypeParameter>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeParameter & Opts>;
  assertTSTypeParameterDeclaration<
    Opts extends Options<t.TSTypeParameterDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeParameterDeclaration & Opts>;
  assertTSTypeParameterInstantiation<
    Opts extends Options<t.TSTypeParameterInstantiation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeParameterInstantiation & Opts>;
  assertTSTypePredicate<Opts extends Options<t.TSTypePredicate>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypePredicate & Opts>;
  assertTSTypeQuery<Opts extends Options<t.TSTypeQuery>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeQuery & Opts>;
  assertTSTypeReference<Opts extends Options<t.TSTypeReference>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSTypeReference & Opts>;
  assertTSUndefinedKeyword<Opts extends Options<t.TSUndefinedKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSUndefinedKeyword & Opts>;
  assertTSUnionType<Opts extends Options<t.TSUnionType>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSUnionType & Opts>;
  assertTSUnknownKeyword<Opts extends Options<t.TSUnknownKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSUnknownKeyword & Opts>;
  assertTSVoidKeyword<Opts extends Options<t.TSVoidKeyword>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TSVoidKeyword & Opts>;
  assertTaggedTemplateExpression<
    Opts extends Options<t.TaggedTemplateExpression>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TaggedTemplateExpression & Opts>;
  assertTemplateElement<Opts extends Options<t.TemplateElement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TemplateElement & Opts>;
  assertTemplateLiteral<Opts extends Options<t.TemplateLiteral>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TemplateLiteral & Opts>;
  assertTerminatorless<Opts extends Options<t.Terminatorless>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Terminatorless & Opts>;
  assertThisExpression<Opts extends Options<t.ThisExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ThisExpression & Opts>;
  assertThisTypeAnnotation<Opts extends Options<t.ThisTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ThisTypeAnnotation & Opts>;
  assertThrowStatement<Opts extends Options<t.ThrowStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.ThrowStatement & Opts>;
  assertTopicReference<Opts extends Options<t.TopicReference>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TopicReference & Opts>;
  assertTryStatement<Opts extends Options<t.TryStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TryStatement & Opts>;
  assertTupleExpression<Opts extends Options<t.TupleExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TupleExpression & Opts>;
  assertTupleTypeAnnotation<Opts extends Options<t.TupleTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TupleTypeAnnotation & Opts>;
  assertTypeAlias<Opts extends Options<t.TypeAlias>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeAlias & Opts>;
  assertTypeAnnotation<Opts extends Options<t.TypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeAnnotation & Opts>;
  assertTypeCastExpression<Opts extends Options<t.TypeCastExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeCastExpression & Opts>;
  assertTypeParameter<Opts extends Options<t.TypeParameter>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeParameter & Opts>;
  assertTypeParameterDeclaration<
    Opts extends Options<t.TypeParameterDeclaration>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeParameterDeclaration & Opts>;
  assertTypeParameterInstantiation<
    Opts extends Options<t.TypeParameterInstantiation>,
  >(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeParameterInstantiation & Opts>;
  assertTypeScript<Opts extends Options<t.TypeScript>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeScript & Opts>;
  assertTypeofTypeAnnotation<Opts extends Options<t.TypeofTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.TypeofTypeAnnotation & Opts>;
  assertUnaryExpression<Opts extends Options<t.UnaryExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.UnaryExpression & Opts>;
  assertUnaryLike<Opts extends Options<t.UnaryLike>>(
    opts?: Opts,
  ): asserts this is NodePath<t.UnaryLike & Opts>;
  assertUnionTypeAnnotation<Opts extends Options<t.UnionTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.UnionTypeAnnotation & Opts>;
  assertUpdateExpression<Opts extends Options<t.UpdateExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.UpdateExpression & Opts>;
  assertUserWhitespacable<Opts extends Options<t.UserWhitespacable>>(
    opts?: Opts,
  ): asserts this is NodePath<t.UserWhitespacable & Opts>;
  assertV8IntrinsicIdentifier<Opts extends Options<t.V8IntrinsicIdentifier>>(
    opts?: Opts,
  ): asserts this is NodePath<t.V8IntrinsicIdentifier & Opts>;
  assertVariableDeclaration<Opts extends Options<t.VariableDeclaration>>(
    opts?: Opts,
  ): asserts this is NodePath<t.VariableDeclaration & Opts>;
  assertVariableDeclarator<Opts extends Options<t.VariableDeclarator>>(
    opts?: Opts,
  ): asserts this is NodePath<t.VariableDeclarator & Opts>;
  assertVariance<Opts extends Options<t.Variance>>(
    opts?: Opts,
  ): asserts this is NodePath<t.Variance & Opts>;
  assertVoidPattern<Opts extends Options<t.VoidPattern>>(
    opts?: Opts,
  ): asserts this is NodePath<t.VoidPattern & Opts>;
  assertVoidTypeAnnotation<Opts extends Options<t.VoidTypeAnnotation>>(
    opts?: Opts,
  ): asserts this is NodePath<t.VoidTypeAnnotation & Opts>;
  assertWhile<Opts extends Options<t.While>>(
    opts?: Opts,
  ): asserts this is NodePath<t.While & Opts>;
  assertWhileStatement<Opts extends Options<t.WhileStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.WhileStatement & Opts>;
  assertWithStatement<Opts extends Options<t.WithStatement>>(
    opts?: Opts,
  ): asserts this is NodePath<t.WithStatement & Opts>;
  assertYieldExpression<Opts extends Options<t.YieldExpression>>(
    opts?: Opts,
  ): asserts this is NodePath<t.YieldExpression & Opts>;
}
