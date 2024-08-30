import type Printer from "../printer.ts";
import type * as t from "@babel/types";

export function TSTypeAnnotation(this: Printer, node: t.TSTypeAnnotation) {
  this.token(":");
  this.space();
  // @ts-expect-error todo(flow->ts) can this be removed? `.optional` looks to be not existing property
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation);
}

export function TSTypeParameterInstantiation(
  this: Printer,
  node: t.TSTypeParameterInstantiation,
  parent: t.Node,
): void {
  this.token("<");
  this.printList(node.params, {});
  if (parent.type === "ArrowFunctionExpression" && node.params.length === 1) {
    this.token(",");
  }
  this.token(">");
}

export { TSTypeParameterInstantiation as TSTypeParameterDeclaration };

export function TSTypeParameter(this: Printer, node: t.TSTypeParameter) {
  if (node.in) {
    this.word("in");
    this.space();
  }

  if (node.out) {
    this.word("out");
    this.space();
  }

  this.word(
    !process.env.BABEL_8_BREAKING
      ? (node.name as unknown as string)
      : (node.name as unknown as t.Identifier).name,
  );

  if (node.constraint) {
    this.space();
    this.word("extends");
    this.space();
    this.print(node.constraint);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default);
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

export function TSDeclareFunction(
  this: Printer,
  node: t.TSDeclareFunction,
  parent: t.ParentMaps["TSDeclareFunction"],
) {
  if (node.declare) {
    this.word("declare");
    this.space();
  }
  this._functionHead(node, parent);
  this.semicolon();
}

export function TSDeclareMethod(this: Printer, node: t.TSDeclareMethod) {
  this._classMethodHead(node);
  this.semicolon();
}

export function TSQualifiedName(this: Printer, node: t.TSQualifiedName) {
  this.print(node.left);
  this.token(".");
  this.print(node.right);
}

export function TSCallSignatureDeclaration(
  this: Printer,
  node: t.TSCallSignatureDeclaration,
) {
  this.tsPrintSignatureDeclarationBase(node);
  this.semicolon();
}

export function TSConstructSignatureDeclaration(
  this: Printer,
  node: t.TSConstructSignatureDeclaration,
) {
  this.word("new");
  this.space();
  this.tsPrintSignatureDeclarationBase(node);
  this.semicolon();
}

export function TSPropertySignature(
  this: Printer,
  node: t.TSPropertySignature,
) {
  const { readonly } = node;
  if (readonly) {
    this.word("readonly");
    this.space();
  }
  this.tsPrintPropertyOrMethodName(node);
  this.print(node.typeAnnotation);
  this.semicolon();
}

export function tsPrintPropertyOrMethodName(
  this: Printer,
  node: t.TSPropertySignature | t.TSMethodSignature,
) {
  if (node.computed) {
    this.token("[");
  }
  this.print(node.key);
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
  this.semicolon();
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
  this._parameters(node.parameters);
  this.token("]");
  this.print(node.typeAnnotation);
  this.semicolon();
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
export function TSIntrinsicKeyword(this: Printer) {
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
  node: t.TSFunctionType | t.TSConstructorType,
) {
  const { typeParameters } = node;
  const parameters = process.env.BABEL_8_BREAKING
    ? // @ts-ignore(Babel 7 vs Babel 8) Babel 8 AST shape
      node.params
    : // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST shape
      node.parameters;
  this.print(typeParameters);
  this.token("(");
  this._parameters(parameters);
  this.token(")");
  this.space();
  this.token("=>");
  this.space();
  const returnType = process.env.BABEL_8_BREAKING
    ? // @ts-ignore(Babel 7 vs Babel 8) Babel 8 AST shape
      node.returnType
    : // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST shape
      node.typeAnnotation;
  this.print(returnType.typeAnnotation);
}

export function TSTypeReference(this: Printer, node: t.TSTypeReference) {
  this.print(node.typeName, true);
  this.print(node.typeParameters, true);
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

  if (node.typeParameters) {
    this.print(node.typeParameters);
  }
}

export function TSTypeLiteral(this: Printer, node: t.TSTypeLiteral) {
  this.tsPrintTypeLiteralOrInterfaceBody(node.members, node);
}

export function tsPrintTypeLiteralOrInterfaceBody(
  this: Printer,
  members: t.TSTypeElement[],
  node: t.TSType | t.TSInterfaceBody,
) {
  tsPrintBraced(this, members, node);
}

function tsPrintBraced(printer: Printer, members: t.Node[], node: t.Node) {
  printer.token("{");
  if (members.length) {
    printer.indent();
    printer.newline();
    for (const member of members) {
      printer.print(member);
      //this.token(sep);
      printer.newline();
    }
    printer.dedent();
  }

  printer.rightBrace(node);
}

export function TSArrayType(this: Printer, node: t.TSArrayType) {
  this.print(node.elementType, true);

  this.token("[");
  this.token("]");
}

export function TSTupleType(this: Printer, node: t.TSTupleType) {
  this.token("[");
  this.printList(node.elementTypes);
  this.token("]");
}

export function TSOptionalType(this: Printer, node: t.TSOptionalType) {
  this.print(node.typeAnnotation);
  this.token("?");
}

export function TSRestType(this: Printer, node: t.TSRestType) {
  this.token("...");
  this.print(node.typeAnnotation);
}

export function TSNamedTupleMember(this: Printer, node: t.TSNamedTupleMember) {
  this.print(node.label);
  if (node.optional) this.token("?");
  this.token(":");
  this.space();
  this.print(node.elementType);
}

export function TSUnionType(this: Printer, node: t.TSUnionType) {
  tsPrintUnionOrIntersectionType(this, node, "|");
}

export function TSIntersectionType(this: Printer, node: t.TSIntersectionType) {
  tsPrintUnionOrIntersectionType(this, node, "&");
}

function tsPrintUnionOrIntersectionType(
  printer: Printer,
  node: t.TSUnionType | t.TSIntersectionType,
  sep: "|" | "&",
) {
  printer.printJoin(node.types, {
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
  this.word("infer");
  this.print(node.typeParameter);
}

export function TSParenthesizedType(
  this: Printer,
  node: t.TSParenthesizedType,
) {
  this.token("(");
  this.print(node.typeAnnotation);
  this.token(")");
}

export function TSTypeOperator(this: Printer, node: t.TSTypeOperator) {
  this.word(node.operator);
  this.space();
  this.print(node.typeAnnotation);
}

export function TSIndexedAccessType(
  this: Printer,
  node: t.TSIndexedAccessType,
) {
  this.print(node.objectType, true);
  this.token("[");
  this.print(node.indexType);
  this.token("]");
}

export function TSMappedType(this: Printer, node: t.TSMappedType) {
  const { nameType, optional, readonly, typeAnnotation } = node;
  this.token("{");
  this.space();
  if (readonly) {
    tokenIfPlusMinus(this, readonly);
    this.word("readonly");
    this.space();
  }

  this.token("[");
  if (process.env.BABEL_8_BREAKING) {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 8 AST shape
    this.word(node.key.name);
  } else {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST shape
    this.word(node.typeParameter.name);
  }

  this.space();
  this.word("in");
  this.space();
  if (process.env.BABEL_8_BREAKING) {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 8 AST shape
    this.print(node.constraint);
  } else {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST shape
    this.print(node.typeParameter.constraint);
  }

  if (nameType) {
    this.space();
    this.word("as");
    this.space();
    this.print(nameType);
  }

  this.token("]");

  if (optional) {
    tokenIfPlusMinus(this, optional);
    this.token("?");
  }

  if (typeAnnotation) {
    this.token(":");
    this.space();
    this.print(typeAnnotation);
  }
  this.space();
  this.token("}");
}

function tokenIfPlusMinus(self: Printer, tok: true | "+" | "-") {
  if (tok !== true) {
    self.token(tok);
  }
}

export function TSLiteralType(this: Printer, node: t.TSLiteralType) {
  this.print(node.literal);
}

export function TSExpressionWithTypeArguments(
  this: Printer,
  node: t.TSExpressionWithTypeArguments,
) {
  this.print(node.expression);
  this.print(node.typeParameters);
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
  this.print(id);
  this.print(typeParameters);
  if (extendz?.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(extendz);
  }
  this.space();
  this.print(body);
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
  this.print(id);
  this.print(typeParameters);
  this.space();
  this.token("=");
  this.space();
  this.print(typeAnnotation);
  this.semicolon();
}

function TSTypeExpression(
  this: Printer,
  node: t.TSAsExpression | t.TSSatisfiesExpression,
) {
  const { type, expression, typeAnnotation } = node;
  this.print(expression, true);
  this.space();
  this.word(type === "TSAsExpression" ? "as" : "satisfies");
  this.space();
  this.print(typeAnnotation);
}

export {
  TSTypeExpression as TSAsExpression,
  TSTypeExpression as TSSatisfiesExpression,
};

export function TSTypeAssertion(this: Printer, node: t.TSTypeAssertion) {
  const { typeAnnotation, expression } = node;
  this.token("<");
  this.print(typeAnnotation);
  this.token(">");
  this.space();
  this.print(expression);
}

export function TSInstantiationExpression(
  this: Printer,
  node: t.TSInstantiationExpression,
) {
  this.print(node.expression);
  this.print(node.typeParameters);
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
  this.print(id);
  this.space();
  tsPrintBraced(this, members, node);
}

export function TSEnumMember(this: Printer, node: t.TSEnumMember) {
  const { id, initializer } = node;
  this.print(id);
  if (initializer) {
    this.space();
    this.token("=");
    this.space();
    this.print(initializer);
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
  this.print(id);

  if (!node.body) {
    this.semicolon();
    return;
  }

  let body = node.body;
  while (body.type === "TSModuleDeclaration") {
    this.token(".");
    this.print(body.id);
    body = body.body;
  }

  this.space();
  this.print(body);
}

export function TSModuleBlock(this: Printer, node: t.TSModuleBlock) {
  tsPrintBraced(this, node.body, node);
}

export function TSImportType(this: Printer, node: t.TSImportType) {
  const { argument, qualifier, typeParameters } = node;
  this.word("import");
  this.token("(");
  this.print(argument);
  this.token(")");
  if (qualifier) {
    this.token(".");
    this.print(qualifier);
  }
  if (typeParameters) {
    this.print(typeParameters);
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
  this.print(id);
  this.space();
  this.token("=");
  this.space();
  this.print(moduleReference);
  this.semicolon();
}

export function TSExternalModuleReference(
  this: Printer,
  node: t.TSExternalModuleReference,
) {
  this.token("require(");
  this.print(node.expression);
  this.token(")");
}

export function TSNonNullExpression(
  this: Printer,
  node: t.TSNonNullExpression,
) {
  this.print(node.expression);
  this.token("!");
}

export function TSExportAssignment(this: Printer, node: t.TSExportAssignment) {
  this.word("export");
  this.space();
  this.token("=");
  this.space();
  this.print(node.expression);
  this.semicolon();
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
  this.print(node.id);
  this.semicolon();
}

export function tsPrintSignatureDeclarationBase(this: Printer, node: any) {
  const { typeParameters } = node;
  const parameters = process.env.BABEL_8_BREAKING
    ? node.params
    : node.parameters;
  this.print(typeParameters);
  this.token("(");
  this._parameters(parameters);
  this.token(")");
  const returnType = process.env.BABEL_8_BREAKING
    ? node.returnType
    : node.typeAnnotation;
  this.print(returnType);
}

export function tsPrintClassMemberModifiers(
  this: Printer,
  node:
    | t.ClassProperty
    | t.ClassAccessorProperty
    | t.ClassMethod
    | t.ClassPrivateMethod
    | t.TSDeclareMethod,
) {
  const isField =
    node.type === "ClassAccessorProperty" || node.type === "ClassProperty";
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
