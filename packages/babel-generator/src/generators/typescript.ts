import type Printer from "../printer";
import type * as t from "@babel/types";

export function TSTypeAnnotation(this: Printer, node: t.TSTypeAnnotation) {
  this.token(":");
  this.space();
  // @ts-expect-error todo(flow->ts) can this be removed? `.optional` looks to be not existing property
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

export function TSTypeParameterInstantiation(
  this: Printer,
  node: t.TSTypeParameterInstantiation,
  parent: t.Node,
): void {
  this.token("<");
  this.printList(node.params, node, {});
  if (parent.type === "ArrowFunctionExpression" && node.params.length === 1) {
    this.token(",");
  }
  this.token(">");
}

export { TSTypeParameterInstantiation as TSTypeParameterDeclaration };

export function TSTypeParameter(this: Printer, node: t.TSTypeParameter) {
  this.word(
    !process.env.BABEL_8_BREAKING
      ? (node.name as unknown as string)
      : (node.name as unknown as t.Identifier).name,
  );

  if (node.constraint) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.constraint, node);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default, node);
  }
}

export function TSParameterProperty(
  this: Printer,
  node: t.TSParameterProperty,
) {
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

export function TSDeclareFunction(this: Printer, node: t.TSDeclareFunction) {
  if (node.declare) {
    this.word("declare");
    this.space();
  }
  this._functionHead(node);
  this.token(";");
}

export function TSDeclareMethod(this: Printer, node: t.TSDeclareMethod) {
  this._classMethodHead(node);
  this.token(";");
}

export function TSQualifiedName(this: Printer, node: t.TSQualifiedName) {
  this.print(node.left, node);
  this.token(".");
  this.print(node.right, node);
}

export function TSCallSignatureDeclaration(
  this: Printer,
  node: t.TSCallSignatureDeclaration,
) {
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSConstructSignatureDeclaration(
  this: Printer,
  node: t.TSConstructSignatureDeclaration,
) {
  this.word("new");
  this.space();
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSPropertySignature(
  this: Printer,
  node: t.TSPropertySignature,
) {
  const { readonly, initializer } = node;
  if (readonly) {
    this.word("readonly");
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

export function tsPrintPropertyOrMethodName(this: Printer, node) {
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

export function TSMethodSignature(this: Printer, node: t.TSMethodSignature) {
  const { kind } = node;
  if (kind === "set" || kind === "get") {
    this.word(kind);
    this.space();
  }
  this.tsPrintPropertyOrMethodName(node);
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSIndexSignature(this: Printer, node: t.TSIndexSignature) {
  const { readonly, static: isStatic } = node;
  if (isStatic) {
    this.word("static");
    this.space();
  }
  if (readonly) {
    this.word("readonly");
    this.space();
  }
  this.token("[");
  this._parameters(node.parameters, node);
  this.token("]");
  this.print(node.typeAnnotation, node);
  this.token(";");
}

export function TSAnyKeyword(this: Printer) {
  this.word("any");
}
export function TSBigIntKeyword(this: Printer) {
  this.word("bigint");
}
export function TSUnknownKeyword(this: Printer) {
  this.word("unknown");
}
export function TSNumberKeyword(this: Printer) {
  this.word("number");
}
export function TSObjectKeyword(this: Printer) {
  this.word("object");
}
export function TSBooleanKeyword(this: Printer) {
  this.word("boolean");
}
export function TSStringKeyword(this: Printer) {
  this.word("string");
}
export function TSSymbolKeyword(this: Printer) {
  this.word("symbol");
}
export function TSVoidKeyword(this: Printer) {
  this.word("void");
}
export function TSUndefinedKeyword(this: Printer) {
  this.word("undefined");
}
export function TSNullKeyword(this: Printer) {
  this.word("null");
}
export function TSNeverKeyword(this: Printer) {
  this.word("never");
}
export function TSIntrinsicKeyword() {
  this.word("intrinsic");
}

export function TSThisType(this: Printer) {
  this.word("this");
}

export function TSFunctionType(this: Printer, node: t.TSFunctionType) {
  this.tsPrintFunctionOrConstructorType(node);
}

export function TSConstructorType(this: Printer, node: t.TSConstructorType) {
  if (node.abstract) {
    this.word("abstract");
    this.space();
  }
  this.word("new");
  this.space();
  this.tsPrintFunctionOrConstructorType(node);
}

export function tsPrintFunctionOrConstructorType(
  this: Printer,
  // todo: missing type FunctionOrConstructorType
  node: any,
) {
  const { typeParameters } = node;
  const parameters = process.env.BABEL_8_BREAKING
    ? node.params
    : node.parameters;
  this.print(typeParameters, node);
  this.token("(");
  this._parameters(parameters, node);
  this.token(")");
  this.space();
  this.token("=>");
  this.space();
  const returnType = process.env.BABEL_8_BREAKING
    ? node.returnType
    : node.typeAnnotation;
  this.print(returnType.typeAnnotation, node);
}

export function TSTypeReference(this: Printer, node: t.TSTypeReference) {
  this.print(node.typeName, node);
  this.print(node.typeParameters, node);
}

export function TSTypePredicate(this: Printer, node: t.TSTypePredicate) {
  if (node.asserts) {
    this.word("asserts");
    this.space();
  }
  this.print(node.parameterName);
  if (node.typeAnnotation) {
    this.space();
    this.word("is");
    this.space();
    this.print(node.typeAnnotation.typeAnnotation);
  }
}

export function TSTypeQuery(this: Printer, node: t.TSTypeQuery) {
  this.word("typeof");
  this.space();
  this.print(node.exprName);
}

export function TSTypeLiteral(this: Printer, node: t.TSTypeLiteral) {
  this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
}

export function tsPrintTypeLiteralOrInterfaceBody(
  this: Printer,
  members,
  node,
) {
  this.tsPrintBraced(members, node);
}

export function tsPrintBraced(this: Printer, members, node) {
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

export function TSArrayType(this: Printer, node: t.TSArrayType) {
  this.print(node.elementType, node);
  this.token("[]");
}

export function TSTupleType(this: Printer, node: t.TSTupleType) {
  this.token("[");
  this.printList(node.elementTypes, node);
  this.token("]");
}

export function TSOptionalType(this: Printer, node: t.TSOptionalType) {
  this.print(node.typeAnnotation, node);
  this.token("?");
}

export function TSRestType(this: Printer, node: t.TSRestType) {
  this.token("...");
  this.print(node.typeAnnotation, node);
}

export function TSNamedTupleMember(this: Printer, node: t.TSNamedTupleMember) {
  this.print(node.label, node);
  if (node.optional) this.token("?");
  this.token(":");
  this.space();
  this.print(node.elementType, node);
}

export function TSUnionType(this: Printer, node: t.TSUnionType) {
  this.tsPrintUnionOrIntersectionType(node, "|");
}

export function TSIntersectionType(this: Printer, node: t.TSIntersectionType) {
  this.tsPrintUnionOrIntersectionType(node, "&");
}

export function tsPrintUnionOrIntersectionType(this: Printer, node: any, sep) {
  this.printJoin(node.types, node, {
    separator() {
      this.space();
      this.token(sep);
      this.space();
    },
  });
}

export function TSConditionalType(this: Printer, node: t.TSConditionalType) {
  this.print(node.checkType);
  this.space();
  this.word("extends");
  this.space();
  this.print(node.extendsType);
  this.space();
  this.token("?");
  this.space();
  this.print(node.trueType);
  this.space();
  this.token(":");
  this.space();
  this.print(node.falseType);
}

export function TSInferType(this: Printer, node: t.TSInferType) {
  this.token("infer");
  this.space();
  this.print(node.typeParameter);
}

export function TSParenthesizedType(
  this: Printer,
  node: t.TSParenthesizedType,
) {
  this.token("(");
  this.print(node.typeAnnotation, node);
  this.token(")");
}

export function TSTypeOperator(this: Printer, node: t.TSTypeOperator) {
  this.word(node.operator);
  this.space();
  this.print(node.typeAnnotation, node);
}

export function TSIndexedAccessType(
  this: Printer,
  node: t.TSIndexedAccessType,
) {
  this.print(node.objectType, node);
  this.token("[");
  this.print(node.indexType, node);
  this.token("]");
}

export function TSMappedType(this: Printer, node: t.TSMappedType) {
  const { nameType, optional, readonly, typeParameter } = node;
  this.token("{");
  this.space();
  if (readonly) {
    tokenIfPlusMinus(this, readonly);
    this.word("readonly");
    this.space();
  }

  this.token("[");
  this.word(
    !process.env.BABEL_8_BREAKING
      ? (typeParameter.name as unknown as string)
      : (typeParameter.name as unknown as t.Identifier).name,
  );
  this.space();
  this.word("in");
  this.space();
  this.print(typeParameter.constraint, typeParameter);

  if (nameType) {
    this.space();
    this.word("as");
    this.space();
    this.print(nameType, node);
  }

  this.token("]");

  if (optional) {
    tokenIfPlusMinus(this, optional);
    this.token("?");
  }
  this.token(":");
  this.space();
  this.print(node.typeAnnotation, node);
  this.space();
  this.token("}");
}

function tokenIfPlusMinus(self, tok) {
  if (tok !== true) {
    self.token(tok);
  }
}

export function TSLiteralType(this: Printer, node: t.TSLiteralType) {
  this.print(node.literal, node);
}

export function TSExpressionWithTypeArguments(
  this: Printer,
  node: t.TSExpressionWithTypeArguments,
) {
  this.print(node.expression, node);
  this.print(node.typeParameters, node);
}

export function TSInterfaceDeclaration(
  this: Printer,
  node: t.TSInterfaceDeclaration,
) {
  const { declare, id, typeParameters, extends: extendz, body } = node;
  if (declare) {
    this.word("declare");
    this.space();
  }
  this.word("interface");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);
  if (extendz?.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(extendz, node);
  }
  this.space();
  this.print(body, node);
}

export function TSInterfaceBody(this: Printer, node: t.TSInterfaceBody) {
  this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
}

export function TSTypeAliasDeclaration(
  this: Printer,
  node: t.TSTypeAliasDeclaration,
) {
  const { declare, id, typeParameters, typeAnnotation } = node;
  if (declare) {
    this.word("declare");
    this.space();
  }
  this.word("type");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);
  this.space();
  this.token("=");
  this.space();
  this.print(typeAnnotation, node);
  this.token(";");
}

export function TSAsExpression(this: Printer, node: t.TSAsExpression) {
  const { expression, typeAnnotation } = node;
  this.print(expression, node);
  this.space();
  this.word("as");
  this.space();
  this.print(typeAnnotation, node);
}

export function TSTypeAssertion(this: Printer, node: t.TSTypeAssertion) {
  const { typeAnnotation, expression } = node;
  this.token("<");
  this.print(typeAnnotation, node);
  this.token(">");
  this.space();
  this.print(expression, node);
}

export function TSEnumDeclaration(this: Printer, node: t.TSEnumDeclaration) {
  const { declare, const: isConst, id, members } = node;
  if (declare) {
    this.word("declare");
    this.space();
  }
  if (isConst) {
    this.word("const");
    this.space();
  }
  this.word("enum");
  this.space();
  this.print(id, node);
  this.space();
  this.tsPrintBraced(members, node);
}

export function TSEnumMember(this: Printer, node: t.TSEnumMember) {
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

export function TSModuleDeclaration(
  this: Printer,
  node: t.TSModuleDeclaration,
) {
  const { declare, id } = node;

  if (declare) {
    this.word("declare");
    this.space();
  }

  if (!node.global) {
    this.word(id.type === "Identifier" ? "namespace" : "module");
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

export function TSModuleBlock(this: Printer, node: t.TSModuleBlock) {
  this.tsPrintBraced(node.body, node);
}

export function TSImportType(this: Printer, node: t.TSImportType) {
  const { argument, qualifier, typeParameters } = node;
  this.word("import");
  this.token("(");
  this.print(argument, node);
  this.token(")");
  if (qualifier) {
    this.token(".");
    this.print(qualifier, node);
  }
  if (typeParameters) {
    this.print(typeParameters, node);
  }
}

export function TSImportEqualsDeclaration(
  this: Printer,
  node: t.TSImportEqualsDeclaration,
) {
  const { isExport, id, moduleReference } = node;
  if (isExport) {
    this.word("export");
    this.space();
  }
  this.word("import");
  this.space();
  this.print(id, node);
  this.space();
  this.token("=");
  this.space();
  this.print(moduleReference, node);
  this.token(";");
}

export function TSExternalModuleReference(
  this: Printer,
  node: t.TSExternalModuleReference,
) {
  this.token("require(");
  this.print(node.expression, node);
  this.token(")");
}

export function TSNonNullExpression(
  this: Printer,
  node: t.TSNonNullExpression,
) {
  this.print(node.expression, node);
  this.token("!");
}

export function TSExportAssignment(this: Printer, node: t.TSExportAssignment) {
  this.word("export");
  this.space();
  this.token("=");
  this.space();
  this.print(node.expression, node);
  this.token(";");
}

export function TSNamespaceExportDeclaration(
  this: Printer,
  node: t.TSNamespaceExportDeclaration,
) {
  this.word("export");
  this.space();
  this.word("as");
  this.space();
  this.word("namespace");
  this.space();
  this.print(node.id, node);
}

export function tsPrintSignatureDeclarationBase(this: Printer, node: any) {
  const { typeParameters } = node;
  const parameters = process.env.BABEL_8_BREAKING
    ? node.params
    : node.parameters;
  this.print(typeParameters, node);
  this.token("(");
  this._parameters(parameters, node);
  this.token(")");
  const returnType = process.env.BABEL_8_BREAKING
    ? node.returnType
    : node.typeAnnotation;
  this.print(returnType, node);
}

export function tsPrintClassMemberModifiers(this: Printer, node: any, isField) {
  if (isField && node.declare) {
    this.word("declare");
    this.space();
  }
  if (node.accessibility) {
    this.word(node.accessibility);
    this.space();
  }
  if (node.static) {
    this.word("static");
    this.space();
  }
  if (node.override) {
    this.word("override");
    this.space();
  }
  if (node.abstract) {
    this.word("abstract");
    this.space();
  }
  if (isField && node.readonly) {
    this.word("readonly");
    this.space();
  }
}
