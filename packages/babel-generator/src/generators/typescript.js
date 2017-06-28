// @flow

import type {
  // Need to rename these to avoid conflict with function names
  TSParameterProperty as ParameterProperty,
  TSDeclareFunction as DeclareFunction,
  TSDeclareMethod as DeclareMethod,
  TsQualifiedName as QualifiedName,
  TsCallSignatureDeclaration as CallSignatureDeclaration,
  TsConstructSignatureDeclaration as ConstructSignatureDeclaration,
  TsPropertySignature as PropertySignature,
  TsMethodSignature as MethodSignature,
  TsIndexSignature as IndexSignature,
  TsFunctionType as FunctionType,
  TsConstructorType as ConstructorType,
  TsFunctionOrConstructorType as FunctionOrConstructorType,
  TsTypePredicate as TypePredicate,
  TsTypeQuery as TypeQuery,
  TsTypeLiteral as TypeLiteral,
  TsTypeElement as TypeElement,
  Node,
  TsArrayType as ArrayType,
  TsTupleType as TupleType,
  TsUnionType as UnionType,
  TsIntersectionType as IntersectionType,
  TsUnionOrIntersectionType as UnionOrIntersectionType,
  TsParenthesizedType as ParenthesizedType,
  TsTypeOperator as TypeOperator,
  TsIndexedAccessType as IndexedAccessType,
  TsMappedType as MappedType,
  TsLiteralType as LiteralType,
  TsExpressionWithTypeArguments as ExpressionWithTypeArguments,
  TsInterfaceDeclaration as InterfaceDeclaration,
  TSInterfaceBody as InterfaceBody,
  TsTypeAliasDeclaration as TypeAliasDeclaration,
  TsAsExpression as AsExpression,
  TsTypeAssertion as TypeAssertion,
  TsEnumDeclaration as EnumDeclaration,
  TsEnumMember as EnumMember,
  TsModuleDeclaration as ModuleDeclaration,
  TsModuleBlock as ModuleBlock,
  TsImportEqualsDeclaration as ImportEqualsDeclaration,
  TsExternalModuleReference as ExternalModuleReference,
  TsNonNullExpression as NonNullExpression,
  TsSignatureDeclarationBase as SignatureDeclarationBase,
  TsExportAssignment as ExportAssignment,
  TsNamespaceExportDeclaration as NamespaceExportDeclaration,
  TsTypeReference as TypeReference,
} from "babylon/src/types";

export function TSParameterProperty(node: ParameterProperty): void {
  if (node.accessibility) {
    this.word(node.accessibility);
    this.space();
  }

  if (node.readonly) {
    this.word("readonly");
    this.space();
  }

  this._param(node.parameter);
}

export function TSDeclareFunction(node: DeclareFunction): void {
  if (node.declare) {
    this.word("declare");
    this.space();
  }
  this._functionHead(node);
  this.token(";");
}

export function TSDeclareMethod(node: DeclareMethod): void {
  this._classMethodHead(node);
  this.token(";");
}

export function TSQualifiedName(node: QualifiedName): void {
  this.print(node.left, node);
  this.token(".");
  this.print(node.right, node);
}

//TODO: remember to change Pattern print, and some in Class

export function TSCallSignatureDeclaration(
  node: CallSignatureDeclaration,
): void {
  this.tsPrintSignatureDeclarationBase(node);
}

export function TSConstructSignatureDeclaration(
  node: ConstructSignatureDeclaration,
): void {
  this.token("new");
  this.space();
  this.tsPrintSignatureDeclarationBase(node);
}

export function TSPropertySignature(node: PropertySignature): void {
  const { readonly, initializer } = node;
  if (readonly) {
    this.token("readonly");
    this.space();
  }
  this.tsPrintPropertyOrMethodName(node);
  this.print(node.typeAnnotation, node);
  if (initializer) {
    this.space();
    this.token("=");
    this.space();
    this.print(initializer, node);
  }
  this.token(";");
}

export function tsPrintPropertyOrMethodName(
  node: PropertySignature | MethodSignature,
): void {
  if (node.computed) {
    this.token("[");
  }
  this.print(node.key, node);
  if (node.computed) {
    this.token("]");
  }
  if (node.optional) {
    this.token("?");
  }
}

export function TSMethodSignature(node: MethodSignature): void {
  this.tsPrintPropertyOrMethodName(node);
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSIndexSignature(node: IndexSignature): void {
  const { readonly } = node;
  if (readonly) {
    this.token("readonly");
    this.space();
  }
  this.token("[");
  this._parameters(node.parameters, node);
  this.token("]");
  this.print(node.typeAnnotation, node);
  this.token(";");
}

export function TSAnyKeyword(): void {
  this.token("any");
}
export function TSNumberKeyword(): void {
  this.token("number");
}
export function TSObjectKeyword(): void {
  this.token("object");
}
export function TSBooleanKeyword(): void {
  this.token("boolean");
}
export function TSStringKeyword(): void {
  this.token("string");
}
export function TSSymbolKeyword(): void {
  this.token("symbol");
}
export function TSVoidKeyword(): void {
  this.token("void");
}
export function TSUndefinedKeyword(): void {
  this.token("undefined");
}
export function TSNullKeyword(): void {
  this.token("null");
}
export function TSNeverKeyword(): void {
  this.token("never");
}

export function TSThisType(): void {
  this.token("this");
}

export function TSFunctionType(node: FunctionType): void {
  this.tsPrintFunctionOrConstructorType(node);
}

export function TSConstructorType(node: ConstructorType): void {
  this.token("new");
  this.space();
  this.tsPrintFunctionOrConstructorType(node);
}

export function tsPrintFunctionOrConstructorType(
  node: FunctionOrConstructorType,
): void {
  const { typeParameters, parameters } = node;
  this.print(typeParameters, node);
  this.token("(");
  this._parameters(parameters, node);
  this.token(")");
  this.space();
  this.token("=>");
  this.space();
  this.print(node.typeAnnotation.typeAnnotation, node);
}

export function TSTypeReference(node: TypeReference): void {
  this.print(node.typeName, node);
  this.print(node.typeParameters, node);
}

export function TSTypePredicate(node: TypePredicate): void {
  this.print(node.parameterName);
  this.space();
  this.token("is");
  this.space();
  this.print(node.typeAnnotation.typeAnnotation);
}

export function TSTypeQuery(node: TypeQuery): void {
  this.token("typeof");
  this.space();
  this.print(node.exprName);
}

export function TSTypeLiteral(node: TypeLiteral): void {
  this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
}

export function tsPrintTypeLiteralOrInterfaceBody(
  members: $ReadOnlyArray<TypeElement>,
  node: Node,
): void {
  this.tsPrintBraced(members, node);
}

export function tsPrintBraced(members: Node[], node: Node): void {
  this.token("{");
  if (members.length) {
    this.indent();
    this.newline();
    for (const member of members) {
      this.print(member, node);
      //this.token(sep);
      this.newline();
    }
    this.dedent();
    this.rightBrace();
  } else {
    this.token("}");
  }
}

export function TSArrayType(node: ArrayType): void {
  this.print(node.elementType);
  this.token("[]");
}

export function TSTupleType(node: TupleType): void {
  this.token("[");
  this.printList(node.elementTypes, node);
  this.token("]");
}

export function TSUnionType(node: UnionType): void {
  this.tsPrintUnionOrIntersectionType(node, "|");
}

export function TSIntersectionType(node: IntersectionType): void {
  this.tsPrintUnionOrIntersectionType(node, "&");
}

export function tsPrintUnionOrIntersectionType(
  node: UnionOrIntersectionType,
  sep: string,
): void {
  this.printJoin(node.types, node, {
    separator() {
      this.space();
      this.token(sep);
      this.space();
    },
  });
}

export function TSParenthesizedType(node: ParenthesizedType): void {
  this.token("(");
  this.print(node.typeAnnotation, node);
  this.token(")");
}

export function TSTypeOperator(node: TypeOperator): void {
  this.token(node.operator);
  this.space();
  this.print(node.typeAnnotation, node);
}

export function TSIndexedAccessType(node: IndexedAccessType): void {
  this.print(node.objectType, node);
  this.token("[");
  this.print(node.indexType, node);
  this.token("]");
}

export function TSMappedType(node: MappedType): void {
  const { readonly, typeParameter, optional } = node;
  this.token("{");
  this.space();
  if (readonly) {
    this.token("readonly");
    this.space();
  }

  this.token("[");
  this.word(typeParameter.name);
  this.space();
  this.token("in");
  this.space();
  this.print(typeParameter.constraint, typeParameter);
  this.token("]");

  if (optional) {
    this.token("?");
  }
  this.token(":");
  this.space();
  this.print(node.typeAnnotation, node);
  this.space();
  this.token("}");
}

export function TSLiteralType(node: LiteralType): void {
  this.print(node.literal, node);
}

export function TSExpressionWithTypeArguments(
  node: ExpressionWithTypeArguments,
): void {
  this.print(node.expression, node);
  this.print(node.typeParameters, node);
}

export function TSInterfaceDeclaration(node: InterfaceDeclaration): void {
  const { declare, id, typeParameters, extends: extendz, body } = node;
  if (declare) {
    this.word("declare");
    this.space();
  }
  this.token("interface"); //todo: this.token vs this.word???
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);
  if (extendz) {
    this.space();
    this.token("extends");
    this.space();
    this.printList(extendz, node);
  }
  this.space();
  this.print(body, node);
}

export function TSInterfaceBody(node: InterfaceBody): void {
  this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
}

export function TSTypeAliasDeclaration(node: TypeAliasDeclaration): void {
  const { declare, id, typeParameters, typeAnnotation } = node;
  if (declare) {
    this.word("declare");
    this.space();
  }
  this.token("type");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);
  this.space();
  this.token("=");
  this.space();
  this.print(typeAnnotation, node);
  this.token(";");
}

export function TSAsExpression(node: AsExpression): void {
  const { expression, typeAnnotation } = node;
  this.print(expression, node);
  this.space();
  this.token("as");
  this.space();
  this.print(typeAnnotation, node);
}

export function TSTypeAssertion(node: TypeAssertion): void {
  const { typeAnnotation, expression } = node;
  this.token("<");
  this.print(typeAnnotation, node);
  this.token(">");
  this.space();
  this.print(expression, node);
}

export function TSEnumDeclaration(node: EnumDeclaration): void {
  const { declare, const: isConst, id, members } = node;
  if (declare) {
    this.token("declare");
    this.space();
  }
  if (isConst) {
    this.token("const");
    this.space();
  }
  this.token("enum");
  this.space();
  this.print(id, node);
  this.space();
  this.tsPrintBraced(members, node);
}

export function TSEnumMember(node: EnumMember): void {
  const { id, initializer } = node;
  this.print(id, node);
  if (initializer) {
    this.space();
    this.token("=");
    this.space();
    this.print(initializer, node);
  }
  this.token(",");
}

export function TSModuleDeclaration(node: ModuleDeclaration): void {
  const { declare, id } = node;

  if (declare) {
    this.word("declare");
    this.space();
  }

  if (!node.global) {
    this.token(id.type === "Identifier" ? "namespace" : "module");
    this.space();
  }
  this.print(id, node);

  if (!node.body) {
    this.token(";");
    return;
  }

  let body = node.body;
  while (body.type === "TSModuleDeclaration") {
    this.token(".");
    this.print(body.id, body);
    body = body.body;
  }

  this.space();
  this.print(body, node);
}

export function TSModuleBlock(node: ModuleBlock): void {
  this.tsPrintBraced(node.body, node);
}

export function TSImportEqualsDeclaration(node: ImportEqualsDeclaration): void {
  const { isExport, id, moduleReference } = node;
  if (isExport) {
    this.token("export");
    this.space();
  }
  this.token("import");
  this.space();
  this.print(id, node);
  this.space();
  this.token("=");
  this.space();
  this.print(moduleReference, node);
  this.token(";");
}

export function TSExternalModuleReference(node: ExternalModuleReference): void {
  this.token("require(");
  this.print(node.expression, node);
  this.token(")");
}

export function TSNonNullExpression(node: NonNullExpression): void {
  this.print(node.expression, node);
  this.token("!");
}

export function TSExportAssignment(node: ExportAssignment): void {
  this.token("export");
  this.space();
  this.token("=");
  this.space();
  this.print(node.expression, node);
  this.token(";");
}

export function TSNamespaceExportDeclaration(
  node: NamespaceExportDeclaration,
): void {
  this.token("export");
  this.space();
  this.token("as");
  this.space();
  this.token("namespace");
  this.space();
  this.print(node.id, node);
}

export function tsPrintSignatureDeclarationBase(
  node: SignatureDeclarationBase,
): void {
  const { typeParameters, parameters } = node;
  this.print(typeParameters, node);
  this.token("(");
  this._parameters(parameters, node);
  this.token(")");
  this.print(node.typeAnnotation, node);
}
