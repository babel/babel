/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */

import * as b from "./lowercase.ts";
import deprecationWarning from "../../utils/deprecationWarning.ts";

function alias<const N extends keyof typeof b>(lowercase: N): (typeof b)[N] {
  if (process.env.BABEL_8_BREAKING) {
    return function () {
      deprecationWarning(
        lowercase.replace(/^[a-z]+/, x => x.toUpperCase()),
        lowercase,
      );
      return (b[lowercase] as any)(...arguments);
    } as any;
  } else {
    return b[lowercase];
  }
}

export const ArrayExpression = alias("arrayExpression"),
  AssignmentExpression = alias("assignmentExpression"),
  BinaryExpression = alias("binaryExpression"),
  InterpreterDirective = alias("interpreterDirective"),
  Directive = alias("directive"),
  DirectiveLiteral = alias("directiveLiteral"),
  BlockStatement = alias("blockStatement"),
  BreakStatement = alias("breakStatement"),
  CallExpression = alias("callExpression"),
  CatchClause = alias("catchClause"),
  ConditionalExpression = alias("conditionalExpression"),
  ContinueStatement = alias("continueStatement"),
  DebuggerStatement = alias("debuggerStatement"),
  DoWhileStatement = alias("doWhileStatement"),
  EmptyStatement = alias("emptyStatement"),
  ExpressionStatement = alias("expressionStatement"),
  File = alias("file"),
  ForInStatement = alias("forInStatement"),
  ForStatement = alias("forStatement"),
  FunctionDeclaration = alias("functionDeclaration"),
  FunctionExpression = alias("functionExpression"),
  Identifier = alias("identifier"),
  IfStatement = alias("ifStatement"),
  LabeledStatement = alias("labeledStatement"),
  StringLiteral = alias("stringLiteral"),
  NumericLiteral = alias("numericLiteral"),
  NullLiteral = alias("nullLiteral"),
  BooleanLiteral = alias("booleanLiteral"),
  RegExpLiteral = alias("regExpLiteral"),
  LogicalExpression = alias("logicalExpression"),
  MemberExpression = alias("memberExpression"),
  NewExpression = alias("newExpression"),
  Program = alias("program"),
  ObjectExpression = alias("objectExpression"),
  ObjectMethod = alias("objectMethod"),
  ObjectProperty = alias("objectProperty"),
  RestElement = alias("restElement"),
  ReturnStatement = alias("returnStatement"),
  SequenceExpression = alias("sequenceExpression"),
  ParenthesizedExpression = alias("parenthesizedExpression"),
  SwitchCase = alias("switchCase"),
  SwitchStatement = alias("switchStatement"),
  ThisExpression = alias("thisExpression"),
  ThrowStatement = alias("throwStatement"),
  TryStatement = alias("tryStatement"),
  UnaryExpression = alias("unaryExpression"),
  UpdateExpression = alias("updateExpression"),
  VariableDeclaration = alias("variableDeclaration"),
  VariableDeclarator = alias("variableDeclarator"),
  WhileStatement = alias("whileStatement"),
  WithStatement = alias("withStatement"),
  AssignmentPattern = alias("assignmentPattern"),
  ArrayPattern = alias("arrayPattern"),
  ArrowFunctionExpression = alias("arrowFunctionExpression"),
  ClassBody = alias("classBody"),
  ClassExpression = alias("classExpression"),
  ClassDeclaration = alias("classDeclaration"),
  ExportAllDeclaration = alias("exportAllDeclaration"),
  ExportDefaultDeclaration = alias("exportDefaultDeclaration"),
  ExportNamedDeclaration = alias("exportNamedDeclaration"),
  ExportSpecifier = alias("exportSpecifier"),
  ForOfStatement = alias("forOfStatement"),
  ImportDeclaration = alias("importDeclaration"),
  ImportDefaultSpecifier = alias("importDefaultSpecifier"),
  ImportNamespaceSpecifier = alias("importNamespaceSpecifier"),
  ImportSpecifier = alias("importSpecifier"),
  ImportExpression = alias("importExpression"),
  MetaProperty = alias("metaProperty"),
  ClassMethod = alias("classMethod"),
  ObjectPattern = alias("objectPattern"),
  SpreadElement = alias("spreadElement"),
  Super = alias("super"),
  TaggedTemplateExpression = alias("taggedTemplateExpression"),
  TemplateElement = alias("templateElement"),
  TemplateLiteral = alias("templateLiteral"),
  YieldExpression = alias("yieldExpression"),
  AwaitExpression = alias("awaitExpression"),
  Import = alias("import"),
  BigIntLiteral = alias("bigIntLiteral"),
  ExportNamespaceSpecifier = alias("exportNamespaceSpecifier"),
  OptionalMemberExpression = alias("optionalMemberExpression"),
  OptionalCallExpression = alias("optionalCallExpression"),
  ClassProperty = alias("classProperty"),
  ClassAccessorProperty = alias("classAccessorProperty"),
  ClassPrivateProperty = alias("classPrivateProperty"),
  ClassPrivateMethod = alias("classPrivateMethod"),
  PrivateName = alias("privateName"),
  StaticBlock = alias("staticBlock"),
  ImportAttribute = alias("importAttribute"),
  AnyTypeAnnotation = alias("anyTypeAnnotation"),
  ArrayTypeAnnotation = alias("arrayTypeAnnotation"),
  BooleanTypeAnnotation = alias("booleanTypeAnnotation"),
  BooleanLiteralTypeAnnotation = alias("booleanLiteralTypeAnnotation"),
  NullLiteralTypeAnnotation = alias("nullLiteralTypeAnnotation"),
  ClassImplements = alias("classImplements"),
  DeclareClass = alias("declareClass"),
  DeclareFunction = alias("declareFunction"),
  DeclareInterface = alias("declareInterface"),
  DeclareModule = alias("declareModule"),
  DeclareModuleExports = alias("declareModuleExports"),
  DeclareTypeAlias = alias("declareTypeAlias"),
  DeclareOpaqueType = alias("declareOpaqueType"),
  DeclareVariable = alias("declareVariable"),
  DeclareExportDeclaration = alias("declareExportDeclaration"),
  DeclareExportAllDeclaration = alias("declareExportAllDeclaration"),
  DeclaredPredicate = alias("declaredPredicate"),
  ExistsTypeAnnotation = alias("existsTypeAnnotation"),
  FunctionTypeAnnotation = alias("functionTypeAnnotation"),
  FunctionTypeParam = alias("functionTypeParam"),
  GenericTypeAnnotation = alias("genericTypeAnnotation"),
  InferredPredicate = alias("inferredPredicate"),
  InterfaceExtends = alias("interfaceExtends"),
  InterfaceDeclaration = alias("interfaceDeclaration"),
  InterfaceTypeAnnotation = alias("interfaceTypeAnnotation"),
  IntersectionTypeAnnotation = alias("intersectionTypeAnnotation"),
  MixedTypeAnnotation = alias("mixedTypeAnnotation"),
  EmptyTypeAnnotation = alias("emptyTypeAnnotation"),
  NullableTypeAnnotation = alias("nullableTypeAnnotation"),
  NumberLiteralTypeAnnotation = alias("numberLiteralTypeAnnotation"),
  NumberTypeAnnotation = alias("numberTypeAnnotation"),
  ObjectTypeAnnotation = alias("objectTypeAnnotation"),
  ObjectTypeInternalSlot = alias("objectTypeInternalSlot"),
  ObjectTypeCallProperty = alias("objectTypeCallProperty"),
  ObjectTypeIndexer = alias("objectTypeIndexer"),
  ObjectTypeProperty = alias("objectTypeProperty"),
  ObjectTypeSpreadProperty = alias("objectTypeSpreadProperty"),
  OpaqueType = alias("opaqueType"),
  QualifiedTypeIdentifier = alias("qualifiedTypeIdentifier"),
  StringLiteralTypeAnnotation = alias("stringLiteralTypeAnnotation"),
  StringTypeAnnotation = alias("stringTypeAnnotation"),
  SymbolTypeAnnotation = alias("symbolTypeAnnotation"),
  ThisTypeAnnotation = alias("thisTypeAnnotation"),
  TupleTypeAnnotation = alias("tupleTypeAnnotation"),
  TypeofTypeAnnotation = alias("typeofTypeAnnotation"),
  TypeAlias = alias("typeAlias"),
  TypeAnnotation = alias("typeAnnotation"),
  TypeCastExpression = alias("typeCastExpression"),
  TypeParameter = alias("typeParameter"),
  TypeParameterDeclaration = alias("typeParameterDeclaration"),
  TypeParameterInstantiation = alias("typeParameterInstantiation"),
  UnionTypeAnnotation = alias("unionTypeAnnotation"),
  Variance = alias("variance"),
  VoidTypeAnnotation = alias("voidTypeAnnotation"),
  EnumDeclaration = alias("enumDeclaration"),
  EnumBooleanBody = alias("enumBooleanBody"),
  EnumNumberBody = alias("enumNumberBody"),
  EnumStringBody = alias("enumStringBody"),
  EnumSymbolBody = alias("enumSymbolBody"),
  EnumBooleanMember = alias("enumBooleanMember"),
  EnumNumberMember = alias("enumNumberMember"),
  EnumStringMember = alias("enumStringMember"),
  EnumDefaultedMember = alias("enumDefaultedMember"),
  IndexedAccessType = alias("indexedAccessType"),
  OptionalIndexedAccessType = alias("optionalIndexedAccessType"),
  JSXAttribute = alias("jsxAttribute"),
  JSXClosingElement = alias("jsxClosingElement"),
  JSXElement = alias("jsxElement"),
  JSXEmptyExpression = alias("jsxEmptyExpression"),
  JSXExpressionContainer = alias("jsxExpressionContainer"),
  JSXSpreadChild = alias("jsxSpreadChild"),
  JSXIdentifier = alias("jsxIdentifier"),
  JSXMemberExpression = alias("jsxMemberExpression"),
  JSXNamespacedName = alias("jsxNamespacedName"),
  JSXOpeningElement = alias("jsxOpeningElement"),
  JSXSpreadAttribute = alias("jsxSpreadAttribute"),
  JSXText = alias("jsxText"),
  JSXFragment = alias("jsxFragment"),
  JSXOpeningFragment = alias("jsxOpeningFragment"),
  JSXClosingFragment = alias("jsxClosingFragment"),
  Noop = alias("noop"),
  Placeholder = alias("placeholder"),
  V8IntrinsicIdentifier = alias("v8IntrinsicIdentifier"),
  ArgumentPlaceholder = alias("argumentPlaceholder"),
  BindExpression = alias("bindExpression"),
  Decorator = alias("decorator"),
  DoExpression = alias("doExpression"),
  ExportDefaultSpecifier = alias("exportDefaultSpecifier"),
  RecordExpression = alias("recordExpression"),
  TupleExpression = alias("tupleExpression"),
  DecimalLiteral = alias("decimalLiteral"),
  ModuleExpression = alias("moduleExpression"),
  TopicReference = alias("topicReference"),
  PipelineTopicExpression = alias("pipelineTopicExpression"),
  PipelineBareFunction = alias("pipelineBareFunction"),
  PipelinePrimaryTopicReference = alias("pipelinePrimaryTopicReference"),
  TSParameterProperty = alias("tsParameterProperty"),
  TSDeclareFunction = alias("tsDeclareFunction"),
  TSDeclareMethod = alias("tsDeclareMethod"),
  TSQualifiedName = alias("tsQualifiedName"),
  TSCallSignatureDeclaration = alias("tsCallSignatureDeclaration"),
  TSConstructSignatureDeclaration = alias("tsConstructSignatureDeclaration"),
  TSPropertySignature = alias("tsPropertySignature"),
  TSMethodSignature = alias("tsMethodSignature"),
  TSIndexSignature = alias("tsIndexSignature"),
  TSAnyKeyword = alias("tsAnyKeyword"),
  TSBooleanKeyword = alias("tsBooleanKeyword"),
  TSBigIntKeyword = alias("tsBigIntKeyword"),
  TSIntrinsicKeyword = alias("tsIntrinsicKeyword"),
  TSNeverKeyword = alias("tsNeverKeyword"),
  TSNullKeyword = alias("tsNullKeyword"),
  TSNumberKeyword = alias("tsNumberKeyword"),
  TSObjectKeyword = alias("tsObjectKeyword"),
  TSStringKeyword = alias("tsStringKeyword"),
  TSSymbolKeyword = alias("tsSymbolKeyword"),
  TSUndefinedKeyword = alias("tsUndefinedKeyword"),
  TSUnknownKeyword = alias("tsUnknownKeyword"),
  TSVoidKeyword = alias("tsVoidKeyword"),
  TSThisType = alias("tsThisType"),
  TSFunctionType = alias("tsFunctionType"),
  TSConstructorType = alias("tsConstructorType"),
  TSTypeReference = alias("tsTypeReference"),
  TSTypePredicate = alias("tsTypePredicate"),
  TSTypeQuery = alias("tsTypeQuery"),
  TSTypeLiteral = alias("tsTypeLiteral"),
  TSArrayType = alias("tsArrayType"),
  TSTupleType = alias("tsTupleType"),
  TSOptionalType = alias("tsOptionalType"),
  TSRestType = alias("tsRestType"),
  TSNamedTupleMember = alias("tsNamedTupleMember"),
  TSUnionType = alias("tsUnionType"),
  TSIntersectionType = alias("tsIntersectionType"),
  TSConditionalType = alias("tsConditionalType"),
  TSInferType = alias("tsInferType"),
  TSParenthesizedType = alias("tsParenthesizedType"),
  TSTypeOperator = alias("tsTypeOperator"),
  TSIndexedAccessType = alias("tsIndexedAccessType"),
  TSMappedType = alias("tsMappedType"),
  TSTemplateLiteralType = alias("tsTemplateLiteralType"),
  TSLiteralType = alias("tsLiteralType"),
  TSExpressionWithTypeArguments = alias("tsExpressionWithTypeArguments"),
  TSInterfaceDeclaration = alias("tsInterfaceDeclaration"),
  TSInterfaceBody = alias("tsInterfaceBody"),
  TSTypeAliasDeclaration = alias("tsTypeAliasDeclaration"),
  TSInstantiationExpression = alias("tsInstantiationExpression"),
  TSAsExpression = alias("tsAsExpression"),
  TSSatisfiesExpression = alias("tsSatisfiesExpression"),
  TSTypeAssertion = alias("tsTypeAssertion"),
  TSEnumBody = alias("tsEnumBody"),
  TSEnumDeclaration = alias("tsEnumDeclaration"),
  TSEnumMember = alias("tsEnumMember"),
  TSModuleDeclaration = alias("tsModuleDeclaration"),
  TSModuleBlock = alias("tsModuleBlock"),
  TSImportType = alias("tsImportType"),
  TSImportEqualsDeclaration = alias("tsImportEqualsDeclaration"),
  TSExternalModuleReference = alias("tsExternalModuleReference"),
  TSNonNullExpression = alias("tsNonNullExpression"),
  TSExportAssignment = alias("tsExportAssignment"),
  TSNamespaceExportDeclaration = alias("tsNamespaceExportDeclaration"),
  TSTypeAnnotation = alias("tsTypeAnnotation"),
  TSTypeParameterInstantiation = alias("tsTypeParameterInstantiation"),
  TSTypeParameterDeclaration = alias("tsTypeParameterDeclaration"),
  TSTypeParameter = alias("tsTypeParameter");
export const NumberLiteral = b.numberLiteral,
  RegexLiteral = b.regexLiteral,
  RestProperty = b.restProperty,
  SpreadProperty = b.spreadProperty;
