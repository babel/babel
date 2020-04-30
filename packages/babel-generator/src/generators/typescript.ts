import type Printer from "../printer";
export function TSTypeAnnotation(this: Printer, node) {
  this.token(":");
  this.space();
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

export function TSTypeParameterInstantiation(this: Printer, node): void {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}

export { TSTypeParameterInstantiation as TSTypeParameterDeclaration };

export function TSTypeParameter(this: Printer, node) {
  this.word(node.name);

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

export function TSParameterProperty(this: Printer, node) {
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

export function TSDeclareFunction(this: Printer, node) {
  if (node.declare) {
    this.word("declare");
    this.space();
  }
  this._functionHead(node);
  this.token(";");
}

export function TSDeclareMethod(this: Printer, node) {
  this._classMethodHead(node);
  this.token(";");
}

export function TSQualifiedName(this: Printer, node) {
  this.print(node.left, node);
  this.token(".");
  this.print(node.right, node);
}

export function TSCallSignatureDeclaration(this: Printer, node) {
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSConstructSignatureDeclaration(this: Printer, node) {
  this.word("new");
  this.space();
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSPropertySignature(this: Printer, node) {
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

export function TSMethodSignature(this: Printer, node) {
  this.tsPrintPropertyOrMethodName(node);
  this.tsPrintSignatureDeclarationBase(node);
  this.token(";");
}

export function TSIndexSignature(this: Printer, node) {
  const { readonly } = node;
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

export function TSFunctionType(this: Printer, node) {
  this.tsPrintFunctionOrConstructorType(node);
}

export function TSConstructorType(this: Printer, node) {
  this.word("new");
  this.space();
  this.tsPrintFunctionOrConstructorType(node);
}

export function tsPrintFunctionOrConstructorType(
  this: Printer,
  // todo: missing type FunctionOrConstructorType
  node: any,
) {
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

export function TSTypeReference(this: Printer, node) {
  this.print(node.typeName, node);
  this.print(node.typeParameters, node);
}

export function TSTypePredicate(this: Printer, node) {
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

export function TSTypeQuery(this: Printer, node) {
  this.word("typeof");
  this.space();
  this.print(node.exprName);
}

export function TSTypeLiteral(this: Printer, node) {
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

export function TSArrayType(this: Printer, node) {
  this.print(node.elementType, node);
  this.token("[]");
}

export function TSTupleType(this: Printer, node) {
  this.token("[");
  this.printList(node.elementTypes, node);
  this.token("]");
}

export function TSOptionalType(this: Printer, node) {
  this.print(node.typeAnnotation, node);
  this.token("?");
}

export function TSRestType(this: Printer, node) {
  this.token("...");
  this.print(node.typeAnnotation, node);
}

export function TSNamedTupleMember(this: Printer, node) {
  this.print(node.label, node);
  if (node.optional) this.token("?");
  this.token(":");
  this.space();
  this.print(node.elementType, node);
}

export function TSUnionType(this: Printer, node) {
  this.tsPrintUnionOrIntersectionType(node, "|");
}

export function TSIntersectionType(this: Printer, node) {
  this.tsPrintUnionOrIntersectionType(node, "&");
}

export function tsPrintUnionOrIntersectionType(this: Printer, node, sep) {
  this.printJoin(node.types, node, {
    separator() {
      this.space();
      this.token(sep);
      this.space();
    },
  });
}

export function TSConditionalType(this: Printer, node) {
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

export function TSInferType(this: Printer, node) {
  this.token("infer");
  this.space();
  this.print(node.typeParameter);
}

export function TSParenthesizedType(this: Printer, node) {
  this.token("(");
  this.print(node.typeAnnotation, node);
  this.token(")");
}

export function TSTypeOperator(this: Printer, node) {
  this.word(node.operator);
  this.space();
  this.print(node.typeAnnotation, node);
}

export function TSIndexedAccessType(this: Printer, node) {
  this.print(node.objectType, node);
  this.token("[");
  this.print(node.indexType, node);
  this.token("]");
}

export function TSMappedType(this: Printer, node) {
  const { nameType, optional, readonly, typeParameter } = node;
  this.token("{");
  this.space();
  if (readonly) {
    tokenIfPlusMinus(this, readonly);
    this.word("readonly");
    this.space();
  }

  this.token("[");
  this.word(typeParameter.name);
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

export function TSLiteralType(this: Printer, node) {
  this.print(node.literal, node);
}

export function TSExpressionWithTypeArguments(this: Printer, node) {
  this.print(node.expression, node);
  this.print(node.typeParameters, node);
}

export function TSInterfaceDeclaration(this: Printer, node) {
  const { declare, id, typeParameters, extends: extendz, body } = node;
  if (declare) {
    this.word("declare");
    this.space();
  }
  this.word("interface");
  this.space();
  this.print(id, node);
  this.print(typeParameters, node);
  if (extendz) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(extendz, node);
  }
  this.space();
  this.print(body, node);
}

export function TSInterfaceBody(this: Printer, node) {
  this.tsPrintTypeLiteralOrInterfaceBody(node.body, node);
}

export function TSTypeAliasDeclaration(this: Printer, node) {
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

export function TSAsExpression(this: Printer, node) {
  const { expression, typeAnnotation } = node;
  this.print(expression, node);
  this.space();
  this.word("as");
  this.space();
  this.print(typeAnnotation, node);
}

export function TSTypeAssertion(this: Printer, node) {
  const { typeAnnotation, expression } = node;
  this.token("<");
  this.print(typeAnnotation, node);
  this.token(">");
  this.space();
  this.print(expression, node);
}

export function TSEnumDeclaration(this: Printer, node) {
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

export function TSEnumMember(this: Printer, node) {
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

export function TSModuleDeclaration(this: Printer, node) {
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

export function TSModuleBlock(this: Printer, node) {
  this.tsPrintBraced(node.body, node);
}

export function TSImportType(this: Printer, node) {
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

export function TSImportEqualsDeclaration(this: Printer, node) {
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

export function TSExternalModuleReference(this: Printer, node) {
  this.token("require(");
  this.print(node.expression, node);
  this.token(")");
}

export function TSNonNullExpression(this: Printer, node) {
  this.print(node.expression, node);
  this.token("!");
}

export function TSExportAssignment(this: Printer, node) {
  this.word("export");
  this.space();
  this.token("=");
  this.space();
  this.print(node.expression, node);
  this.token(";");
}

export function TSNamespaceExportDeclaration(this: Printer, node) {
  this.word("export");
  this.space();
  this.word("as");
  this.space();
  this.word("namespace");
  this.space();
  this.print(node.id, node);
}

export function tsPrintSignatureDeclarationBase(this: Printer, node) {
  const { typeParameters, parameters } = node;
  this.print(typeParameters, node);
  this.token("(");
  this._parameters(parameters, node);
  this.token(")");
  this.print(node.typeAnnotation, node);
}

export function tsPrintClassMemberModifiers(this: Printer, node, isField) {
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
  if (node.abstract) {
    this.word("abstract");
    this.space();
  }
  if (isField && node.readonly) {
    this.word("readonly");
    this.space();
  }
}
