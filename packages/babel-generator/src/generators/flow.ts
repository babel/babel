import * as t from "@babel/types";
import { ExportAllDeclaration } from "./modules";

export function AnyTypeAnnotation() {
  this.word("any");
}

export function ArrayTypeAnnotation(node: any) {
  this.print(node.elementType, node);
  this.token("[");
  this.token("]");
}

export function BooleanTypeAnnotation() {
  this.word("boolean");
}

export function BooleanLiteralTypeAnnotation(node: any) {
  this.word(node.value ? "true" : "false");
}

export function NullLiteralTypeAnnotation() {
  this.word("null");
}

export function DeclareClass(node: any, parent: any) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("class");
  this.space();
  this._interfaceish(node);
}

export function DeclareFunction(node: any, parent: any) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("function");
  this.space();
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);

  if (node.predicate) {
    this.space();
    this.print(node.predicate, node);
  }

  this.semicolon();
}

export function InferredPredicate(/*node: Object*/) {
  this.token("%");
  this.word("checks");
}

export function DeclaredPredicate(node: any) {
  this.token("%");
  this.word("checks");
  this.token("(");
  this.print(node.value, node);
  this.token(")");
}

export function DeclareInterface(node: any) {
  this.word("declare");
  this.space();
  this.InterfaceDeclaration(node);
}

export function DeclareModule(node: any) {
  this.word("declare");
  this.space();
  this.word("module");
  this.space();
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

export function DeclareModuleExports(node: any) {
  this.word("declare");
  this.space();
  this.word("module");
  this.token(".");
  this.word("exports");
  this.print(node.typeAnnotation, node);
}

export function DeclareTypeAlias(node: any) {
  this.word("declare");
  this.space();
  this.TypeAlias(node);
}

export function DeclareOpaqueType(node: any, parent: any) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.OpaqueType(node);
}

export function DeclareVariable(node: any, parent: any) {
  if (!t.isDeclareExportDeclaration(parent)) {
    this.word("declare");
    this.space();
  }
  this.word("var");
  this.space();
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

export function DeclareExportDeclaration(node: any) {
  this.word("declare");
  this.space();
  this.word("export");
  this.space();
  if (node.default) {
    this.word("default");
    this.space();
  }

  FlowExportDeclaration.apply(this, arguments);
}

export function DeclareExportAllDeclaration(/*node: Object*/) {
  this.word("declare");
  this.space();
  ExportAllDeclaration.apply(this, arguments);
}

export function EnumDeclaration(node: any) {
  const { id, body } = node;
  this.word("enum");
  this.space();
  this.print(id, node);
  this.print(body, node);
}

function enumExplicitType(
  context: any,
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

function enumBody(context: any, node: any) {
  const { members } = node;
  context.token("{");
  context.indent();
  context.newline();
  for (const member of members) {
    context.print(member, node);
    context.newline();
  }
  context.dedent();
  context.token("}");
}

export function EnumBooleanBody(node: any) {
  const { explicitType } = node;
  enumExplicitType(this, "boolean", explicitType);
  enumBody(this, node);
}

export function EnumNumberBody(node: any) {
  const { explicitType } = node;
  enumExplicitType(this, "number", explicitType);
  enumBody(this, node);
}

export function EnumStringBody(node: any) {
  const { explicitType } = node;
  enumExplicitType(this, "string", explicitType);
  enumBody(this, node);
}

export function EnumSymbolBody(node: any) {
  enumExplicitType(this, "symbol", true);
  enumBody(this, node);
}

export function EnumDefaultedMember(node: any) {
  const { id } = node;
  this.print(id, node);
  this.token(",");
}

function enumInitializedMember(context: any, node: any) {
  const { id, init } = node;
  context.print(id, node);
  context.space();
  context.token("=");
  context.space();
  context.print(init, node);
  context.token(",");
}

export function EnumBooleanMember(node: any) {
  enumInitializedMember(this, node);
}

export function EnumNumberMember(node: any) {
  enumInitializedMember(this, node);
}

export function EnumStringMember(node: any) {
  enumInitializedMember(this, node);
}

function FlowExportDeclaration(node: any) {
  if (node.declaration) {
    const declar = node.declaration;
    this.print(declar, node);
    if (!t.isStatement(declar)) this.semicolon();
  } else {
    this.token("{");
    if (node.specifiers.length) {
      this.space();
      this.printList(node.specifiers, node);
      this.space();
    }
    this.token("}");

    if (node.source) {
      this.space();
      this.word("from");
      this.space();
      this.print(node.source, node);
    }

    this.semicolon();
  }
}

export function ExistsTypeAnnotation() {
  this.token("*");
}

export function FunctionTypeAnnotation(node: any, parent: any) {
  this.print(node.typeParameters, node);
  this.token("(");
  this.printList(node.params, node);

  if (node.rest) {
    if (node.params.length) {
      this.token(",");
      this.space();
    }
    this.token("...");
    this.print(node.rest, node);
  }

  this.token(")");

  // this node type is overloaded, not sure why but it makes it EXTREMELY annoying
  if (
    parent.type === "ObjectTypeCallProperty" ||
    parent.type === "DeclareFunction" ||
    (parent.type === "ObjectTypeProperty" && parent.method)
  ) {
    this.token(":");
  } else {
    this.space();
    this.token("=>");
  }

  this.space();
  this.print(node.returnType, node);
}

export function FunctionTypeParam(node: any) {
  this.print(node.name, node);
  if (node.optional) this.token("?");
  if (node.name) {
    this.token(":");
    this.space();
  }
  this.print(node.typeAnnotation, node);
}

export function InterfaceExtends(node: any) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

export {
  InterfaceExtends as ClassImplements,
  InterfaceExtends as GenericTypeAnnotation,
};

export function _interfaceish(node: any) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node.extends.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends, node);
  }
  if (node.mixins && node.mixins.length) {
    this.space();
    this.word("mixins");
    this.space();
    this.printList(node.mixins, node);
  }
  if (node.implements && node.implements.length) {
    this.space();
    this.word("implements");
    this.space();
    this.printList(node.implements, node);
  }
  this.space();
  this.print(node.body, node);
}

export function _variance(node) {
  if (node.variance) {
    if (node.variance.kind === "plus") {
      this.token("+");
    } else if (node.variance.kind === "minus") {
      this.token("-");
    }
  }
}

export function InterfaceDeclaration(node: any) {
  this.word("interface");
  this.space();
  this._interfaceish(node);
}

function andSeparator() {
  this.space();
  this.token("&");
  this.space();
}

export function InterfaceTypeAnnotation(node: any) {
  this.word("interface");
  if (node.extends && node.extends.length) {
    this.space();
    this.word("extends");
    this.space();
    this.printList(node.extends, node);
  }
  this.space();
  this.print(node.body, node);
}

export function IntersectionTypeAnnotation(node: any) {
  this.printJoin(node.types, node, { separator: andSeparator });
}

export function MixedTypeAnnotation() {
  this.word("mixed");
}

export function EmptyTypeAnnotation() {
  this.word("empty");
}

export function NullableTypeAnnotation(node: any) {
  this.token("?");
  this.print(node.typeAnnotation, node);
}

export {
  NumericLiteral as NumberLiteralTypeAnnotation,
  StringLiteral as StringLiteralTypeAnnotation,
} from "./types";

export function NumberTypeAnnotation() {
  this.word("number");
}

export function StringTypeAnnotation() {
  this.word("string");
}

export function ThisTypeAnnotation() {
  this.word("this");
}

export function TupleTypeAnnotation(node: any) {
  this.token("[");
  this.printList(node.types, node);
  this.token("]");
}

export function TypeofTypeAnnotation(node: any) {
  this.word("typeof");
  this.space();
  this.print(node.argument, node);
}

export function TypeAlias(node: any) {
  this.word("type");
  this.space();
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.token("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}

export function TypeAnnotation(node) {
  this.token(":");
  this.space();
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

export function TypeParameterInstantiation(node): void {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function TypeParameter(node) {
  this._variance(node);

  this.word(node.name);

  if (node.bound) {
    this.print(node.bound, node);
  }

  if (node.default) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.default, node);
  }
}

export function OpaqueType(node: any) {
  this.word("opaque");
  this.space();
  this.word("type");
  this.space();
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node.supertype) {
    this.token(":");
    this.space();
    this.print(node.supertype, node);
  }
  if (node.impltype) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.impltype, node);
  }
  this.semicolon();
}

export function ObjectTypeAnnotation(node: any) {
  if (node.exact) {
    this.token("{|");
  } else {
    this.token("{");
  }

  // TODO: remove the array fallbacks and instead enforce the types to require an array
  const props = node.properties.concat(
    node.callProperties || [],
    node.indexers || [],
    node.internalSlots || [],
  );

  if (props.length) {
    this.space();

    this.printJoin(props, node, {
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

export function ObjectTypeInternalSlot(node: any) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this.token("[");
  this.token("[");
  this.print(node.id, node);
  this.token("]");
  this.token("]");
  if (node.optional) this.token("?");
  if (!node.method) {
    this.token(":");
    this.space();
  }
  this.print(node.value, node);
}

export function ObjectTypeCallProperty(node: any) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this.print(node.value, node);
}

export function ObjectTypeIndexer(node: any) {
  if (node.static) {
    this.word("static");
    this.space();
  }
  this._variance(node);
  this.token("[");
  if (node.id) {
    this.print(node.id, node);
    this.token(":");
    this.space();
  }
  this.print(node.key, node);
  this.token("]");
  this.token(":");
  this.space();
  this.print(node.value, node);
}

export function ObjectTypeProperty(node: any) {
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
  this.print(node.key, node);
  if (node.optional) this.token("?");
  if (!node.method) {
    this.token(":");
    this.space();
  }
  this.print(node.value, node);
}

export function ObjectTypeSpreadProperty(node: any) {
  this.token("...");
  this.print(node.argument, node);
}

export function QualifiedTypeIdentifier(node: any) {
  this.print(node.qualification, node);
  this.token(".");
  this.print(node.id, node);
}

export function SymbolTypeAnnotation() {
  this.word("symbol");
}

function orSeparator() {
  this.space();
  this.token("|");
  this.space();
}

export function UnionTypeAnnotation(node: any) {
  this.printJoin(node.types, node, { separator: orSeparator });
}

export function TypeCastExpression(node: any) {
  this.token("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.token(")");
}

export function Variance(node: any) {
  if (node.kind === "plus") {
    this.token("+");
  } else {
    this.token("-");
  }
}

export function VoidTypeAnnotation() {
  this.word("void");
}
