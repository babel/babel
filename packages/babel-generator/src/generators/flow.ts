import type Printer from "../printer.ts";
import { isDeclareExportDeclaration, isStatement } from "@babel/types";
import type * as t from "@babel/types";
import { ExportAllDeclaration } from "./modules.ts";
import { TokenContext } from "../node/index.ts";

export function AnyTypeAnnotation(this: Printer) {
  this.word("any");
}

export function ArrayTypeAnnotation(
  this: Printer,
  node: t.ArrayTypeAnnotation,
) {
  this.print(node.elementType, true);
  this.token("[");
  this.token("]");
}

export function BooleanTypeAnnotation(this: Printer) {
  this.word("boolean");
}

export function BooleanLiteralTypeAnnotation(
  this: Printer,
  node: t.BooleanLiteralTypeAnnotation,
) {
  this.word(node.value ? "true" : "false");
}

export function NullLiteralTypeAnnotation(this: Printer) {
  this.word("null");
}

export function DeclareClass(
  this: Printer,
  node: t.DeclareClass,
  parent: t.Node,
) {
  if (!isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("class");
  this.space();
  this._interfaceish(node);
}

export function DeclareFunction(
  this: Printer,
  node: t.DeclareFunction,
  parent: t.Node,
) {
  if (!isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("function");
  this.space();
  this.print(node.id);
  // @ts-ignore(Babel 7 vs Babel 8) TODO(Babel 8) Remove this comment, since we'll remove the Noop node
  this.print(node.id.typeAnnotation.typeAnnotation);

  if (node.predicate) {
    this.space();
    this.print(node.predicate);
  }

  this.semicolon();
}

export function InferredPredicate(this: Printer) {
  this.token("%");
  this.word("checks");
}

export function DeclaredPredicate(this: Printer, node: t.DeclaredPredicate) {
  this.token("%");
  this.word("checks");
  this.token("(");
  this.print(node.value);
  this.token(")");
}

export function DeclareInterface(this: Printer, node: t.DeclareInterface) {
  this.word("declare");
  this.space();
  this.InterfaceDeclaration(node);
}

export function DeclareModule(this: Printer, node: t.DeclareModule) {
  this.word("declare");
  this.space();
  this.word("module");
  this.space();
  this.print(node.id);
  this.space();
  this.print(node.body);
}

export function DeclareModuleExports(
  this: Printer,
  node: t.DeclareModuleExports,
) {
  this.word("declare");
  this.space();
  this.word("module");
  this.token(".");
  this.word("exports");
  this.print(node.typeAnnotation);
}

export function DeclareTypeAlias(this: Printer, node: t.DeclareTypeAlias) {
  this.word("declare");
  this.space();
  this.TypeAlias(node);
}

export function DeclareOpaqueType(
  this: Printer,
  node: t.DeclareOpaqueType,
  parent: t.Node,
) {
  if (!isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.OpaqueType(node);
}

export function DeclareVariable(
  this: Printer,
  node: t.DeclareVariable,
  parent: t.Node,
) {
  if (!isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("var");
  this.space();
  this.print(node.id);
  this.print(node.id.typeAnnotation);
  this.semicolon();
}

export function DeclareExportDeclaration(
  this: Printer,
  node: t.DeclareExportDeclaration,
) {
  this.word("declare");
  this.space();
  this.word("export");
  this.space();
  if (node.default) {
    this.word("default");
    this.space();
  }

  FlowExportDeclaration.call(this, node);
}

export function DeclareExportAllDeclaration(
  this: Printer,
  node: t.DeclareExportAllDeclaration,
) {
  this.word("declare");
  this.space();
  ExportAllDeclaration.call(this, node);
}

export function EnumDeclaration(this: Printer, node: t.EnumDeclaration) {
  const { id, body } = node;
  this.word("enum");
  this.space();
  this.print(id);
  this.print(body);
}

function enumExplicitType(
  context: Printer,
  name: string,
  hasExplicitType: boolean,
) {
  if (hasExplicitType) {
    context.space();
    context.word("of");
    context.space();
    context.word(name);
  }
  context.space();
}

function enumBody(context: Printer, node: t.EnumBody) {
  const { members } = node;
  context.token("{");
  context.indent();
  context.newline();
  for (const member of members) {
    context.print(member);
    context.newline();
  }
  if (node.hasUnknownMembers) {
    context.token("...");
    context.newline();
  }
  context.dedent();
  context.token("}");
}

export function EnumBooleanBody(this: Printer, node: t.EnumBooleanBody) {
  const { explicitType } = node;
  enumExplicitType(this, "boolean", explicitType);
  enumBody(this, node);
}

export function EnumNumberBody(this: Printer, node: t.EnumNumberBody) {
  const { explicitType } = node;
  enumExplicitType(this, "number", explicitType);
  enumBody(this, node);
}

export function EnumStringBody(this: Printer, node: t.EnumStringBody) {
  const { explicitType } = node;
  enumExplicitType(this, "string", explicitType);
  enumBody(this, node);
}

export function EnumSymbolBody(this: Printer, node: t.EnumSymbolBody) {
  enumExplicitType(this, "symbol", true);
  enumBody(this, node);
}

export function EnumDefaultedMember(
  this: Printer,
  node: t.EnumDefaultedMember,
) {
  const { id } = node;
  this.print(id);
  this.token(",");
}

function enumInitializedMember(
  context: Printer,
  node: t.EnumBooleanMember | t.EnumNumberMember | t.EnumStringMember,
) {
  context.print(node.id);
  context.space();
  context.token("=");
  context.space();
  context.print(node.init);
  context.token(",");
}

export function EnumBooleanMember(this: Printer, node: t.EnumBooleanMember) {
  enumInitializedMember(this, node);
}

export function EnumNumberMember(this: Printer, node: t.EnumNumberMember) {
  enumInitializedMember(this, node);
}

export function EnumStringMember(this: Printer, node: t.EnumStringMember) {
  enumInitializedMember(this, node);
}

function FlowExportDeclaration(
  this: Printer,
  node: t.DeclareExportDeclaration,
) {
  if (node.declaration) {
    const declar = node.declaration;
    this.print(declar);
    if (!isStatement(declar)) this.semicolon();
  } else {
    this.token("{");
    if (node.specifiers.length) {
      this.space();
      this.printList(node.specifiers);
      this.space();
    }
    this.token("}");

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      this.print(node.source);
    }

    this.semicolon();
  }
}

export function ExistsTypeAnnotation(this: Printer) {
  this.token("*");
}

export function FunctionTypeAnnotation(
  this: Printer,
  node: t.FunctionTypeAnnotation,
  parent?: t.Node,
) {
  this.print(node.typeParameters);
  this.token("(");

  if (node.this) {
    this.word("this");
    this.token(":");
    this.space();
    this.print(node.this.typeAnnotation);
    if (node.params.length || node.rest) {
      this.token(",");
      this.space();
    }
  }

  this.printList(node.params);

  if (node.rest) {
    if (node.params.length) {
      this.token(",");
      this.space();
    }
    this.token("...");
    this.print(node.rest);
  }

  this.token(")");

  // this node type is overloaded, not sure why but it makes it EXTREMELY annoying

  const type = parent?.type;
  if (
    type != null &&
    (type === "ObjectTypeCallProperty" ||
      type === "ObjectTypeInternalSlot" ||
      type === "DeclareFunction" ||
      (type === "ObjectTypeProperty" && parent.method))
  ) {
    this.token(":");
  } else {
    this.space();
    this.token("=>");
  }

  this.space();
  this.print(node.returnType);
}

export function FunctionTypeParam(this: Printer, node: t.FunctionTypeParam) {
  this.print(node.name);
  if (node.optional) this.token("?");
  if (node.name) {
    this.token(":");
    this.space();
  }
  this.print(node.typeAnnotation);
}

export function InterfaceExtends(this: Printer, node: t.InterfaceExtends) {
  this.print(node.id);
  this.print(node.typeParameters, true);
}

export {
  InterfaceExtends as ClassImplements,
  InterfaceExtends as GenericTypeAnnotation,
};

export function _interfaceish(
  this: Printer,
  node: t.InterfaceDeclaration | t.DeclareInterface | t.DeclareClass,
) {
  this.print(node.id);
  this.print(node.typeParameters);
  if (node.extends?.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends);
  }
  if (node.type === "DeclareClass") {
    if (node.mixins?.length) {
      this.space();
      this.word("mixins");
      this.space();
      this.printList(node.mixins);
    }
    if (node.implements?.length) {
      this.space();
      this.word("implements");
      this.space();
      this.printList(node.implements);
    }
  }
  this.space();
  this.print(node.body);
}

export function _variance(
  this: Printer,
  node:
    | t.TypeParameter
    | t.ObjectTypeIndexer
    | t.ObjectTypeProperty
    | t.ClassProperty
    | t.ClassPrivateProperty
    | t.ClassAccessorProperty,
) {
  const kind = node.variance?.kind;
  if (kind != null) {
    if (kind === "plus") {
      this.token("+");
    } else if (kind === "minus") {
      this.token("-");
    }
  }
}

export function InterfaceDeclaration(
  this: Printer,
  node: t.InterfaceDeclaration | t.DeclareInterface,
) {
  this.word("interface");
  this.space();
  this._interfaceish(node);
}

function andSeparator(this: Printer) {
  this.space();
  this.token("&");
  this.space();
}

export function InterfaceTypeAnnotation(
  this: Printer,
  node: t.InterfaceTypeAnnotation,
) {
  this.word("interface");
  if (node.extends?.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends);
  }
  this.space();
  this.print(node.body);
}

export function IntersectionTypeAnnotation(
  this: Printer,
  node: t.IntersectionTypeAnnotation,
) {
  this.printJoin(node.types, { separator: andSeparator });
}

export function MixedTypeAnnotation(this: Printer) {
  this.word("mixed");
}

export function EmptyTypeAnnotation(this: Printer) {
  this.word("empty");
}

export function NullableTypeAnnotation(
  this: Printer,
  node: t.NullableTypeAnnotation,
) {
  this.token("?");
  this.print(node.typeAnnotation);
}

export {
  NumericLiteral as NumberLiteralTypeAnnotation,
  StringLiteral as StringLiteralTypeAnnotation,
} from "./types.ts";

export function NumberTypeAnnotation(this: Printer) {
  this.word("number");
}

export function StringTypeAnnotation(this: Printer) {
  this.word("string");
}

export function ThisTypeAnnotation(this: Printer) {
  this.word("this");
}

export function TupleTypeAnnotation(
  this: Printer,
  node: t.TupleTypeAnnotation,
) {
  this.token("[");
  this.printList(node.types);
  this.token("]");
}

export function TypeofTypeAnnotation(
  this: Printer,
  node: t.TypeofTypeAnnotation,
) {
  this.word("typeof");
  this.space();
  this.print(node.argument);
}

export function TypeAlias(
  this: Printer,
  node: t.TypeAlias | t.DeclareTypeAlias,
) {
  this.word("type");
  this.space();
  this.print(node.id);
  this.print(node.typeParameters);
  this.space();
  this.token("=");
  this.space();
  this.print(node.right);
  this.semicolon();
}

export function TypeAnnotation(
  this: Printer,
  node: t.TypeAnnotation,
  parent: t.Node,
) {
  this.token(":");
  this.space();
  if (parent.type === "ArrowFunctionExpression") {
    this.tokenContext |= TokenContext.arrowFlowReturnType;
  } else if (
    // @ts-expect-error todo(flow->ts) can this be removed? `.optional` looks to be not existing property
    node.optional
  ) {
    this.token("?");
  }
  this.print(node.typeAnnotation);
}

export function TypeParameterInstantiation(
  this: Printer,
  node: t.TypeParameterInstantiation,
): void {
  this.token("<");
  this.printList(node.params, {});
  this.token(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function TypeParameter(this: Printer, node: t.TypeParameter) {
  this._variance(node);

  this.word(node.name);

  if (node.bound) {
    this.print(node.bound);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default);
  }
}

export function OpaqueType(
  this: Printer,
  node: t.OpaqueType | t.DeclareOpaqueType,
) {
  this.word("opaque");
  this.space();
  this.word("type");
  this.space();
  this.print(node.id);
  this.print(node.typeParameters);
  if (node.supertype) {
    this.token(":");
    this.space();
    this.print(node.supertype);
  }

  if (node.impltype) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.impltype);
  }
  this.semicolon();
}

export function ObjectTypeAnnotation(
  this: Printer,
  node: t.ObjectTypeAnnotation,
) {
  if (node.exact) {
    this.token("{|");
  } else {
    this.token("{");
  }

  // TODO: remove the array fallbacks and instead enforce the types to require an array
  const props = [
    ...node.properties,
    ...(node.callProperties || []),
    ...(node.indexers || []),
    ...(node.internalSlots || []),
  ];

  if (props.length) {
    this.newline();

    this.space();

    this.printJoin(props, {
      addNewlines(leading) {
        if (leading && !props[0]) return 1;
      },
      indent: true,
      statement: true,
      iterator: () => {
        if (props.length !== 1 || node.inexact) {
          this.token(",");
          this.space();
        }
      },
    });

    this.space();
  }

  if (node.inexact) {
    this.indent();
    this.token("...");
    if (props.length) {
      this.newline();
    }
    this.dedent();
  }

  if (node.exact) {
    this.token("|}");
  } else {
    this.token("}");
  }
}

export function ObjectTypeInternalSlot(
  this: Printer,
  node: t.ObjectTypeInternalSlot,
) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this.token("[");
  this.token("[");
  this.print(node.id);
  this.token("]");
  this.token("]");
  if (node.optional) this.token("?");
  if (!node.method) {
    this.token(":");
    this.space();
  }
  this.print(node.value);
}

export function ObjectTypeCallProperty(
  this: Printer,
  node: t.ObjectTypeCallProperty,
) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this.print(node.value);
}

export function ObjectTypeIndexer(this: Printer, node: t.ObjectTypeIndexer) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this._variance(node);
  this.token("[");
  if (node.id) {
    this.print(node.id);
    this.token(":");
    this.space();
  }
  this.print(node.key);
  this.token("]");
  this.token(":");
  this.space();
  this.print(node.value);
}

export function ObjectTypeProperty(this: Printer, node: t.ObjectTypeProperty) {
  if (node.proto) {
    this.word("proto");
    this.space();
  }
  if (node.static) {
    this.word("static");
    this.space();
  }
  if (node.kind === "get" || node.kind === "set") {
    this.word(node.kind);
    this.space();
  }
  this._variance(node);
  this.print(node.key);
  if (node.optional) this.token("?");
  if (!node.method) {
    this.token(":");
    this.space();
  }
  this.print(node.value);
}

export function ObjectTypeSpreadProperty(
  this: Printer,
  node: t.ObjectTypeSpreadProperty,
) {
  this.token("...");
  this.print(node.argument);
}

export function QualifiedTypeIdentifier(
  this: Printer,
  node: t.QualifiedTypeIdentifier,
) {
  this.print(node.qualification);
  this.token(".");
  this.print(node.id);
}

export function SymbolTypeAnnotation(this: Printer) {
  this.word("symbol");
}

function orSeparator(this: Printer) {
  this.space();
  this.token("|");
  this.space();
}

export function UnionTypeAnnotation(
  this: Printer,
  node: t.UnionTypeAnnotation,
) {
  this.printJoin(node.types, { separator: orSeparator });
}

export function TypeCastExpression(this: Printer, node: t.TypeCastExpression) {
  this.token("(");
  this.print(node.expression);
  this.print(node.typeAnnotation);
  this.token(")");
}

export function Variance(this: Printer, node: t.Variance) {
  if (node.kind === "plus") {
    this.token("+");
  } else {
    this.token("-");
  }
}

export function VoidTypeAnnotation(this: Printer) {
  this.word("void");
}

export function IndexedAccessType(this: Printer, node: t.IndexedAccessType) {
  this.print(node.objectType, true);
  this.token("[");
  this.print(node.indexType);
  this.token("]");
}

export function OptionalIndexedAccessType(
  this: Printer,
  node: t.OptionalIndexedAccessType,
) {
  this.print(node.objectType);
  if (node.optional) {
    this.token("?.");
  }
  this.token("[");
  this.print(node.indexType);
  this.token("]");
}
