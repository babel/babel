/* eslint max-len: 0 */

import * as t from "babel-types";

export function AnyTypeAnnotation() {
  this.push("any");
}

export function ArrayTypeAnnotation(node) {
  this.print(node.elementType, node);
  this.push("[");
  this.push("]");
}

export function BooleanTypeAnnotation() {
  this.push("bool");
}

export function BooleanLiteralTypeAnnotation(node) {
  this.push(node.value ? "true" : "false");
}

export function NullLiteralTypeAnnotation() {
  this.push("null");
}

export function DeclareClass(node) {
  this.push("declare class ");
  this._interfaceish(node);
}

export function DeclareFunction(node) {
  this.push("declare function ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);
  this.semicolon();
}

export function DeclareInterface(node) {
  this.push("declare ");
  this.InterfaceDeclaration(node);
}

export function DeclareModule(node) {
  this.push("declare module ");
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

export function DeclareTypeAlias(node) {
  this.push("declare ");
  this.TypeAlias(node);
}

export function DeclareVariable(node) {
  this.push("declare var ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

export function ExistentialTypeParam() {
  this.push("*");
}

export function FunctionTypeAnnotation(node, parent) {
  this.print(node.typeParameters, node);
  this.push("(");
  this.printList(node.params, node);

  if (node.rest) {
    if (node.params.length) {
      this.push(",");
      this.space();
    }
    this.push("...");
    this.print(node.rest, node);
  }

  this.push(")");

  // this node type is overloaded, not sure why but it makes it EXTREMELY annoying
  if (parent.type === "ObjectTypeProperty" || parent.type === "ObjectTypeCallProperty" || parent.type === "DeclareFunction") {
    this.push(":");
  } else {
    this.space();
    this.push("=>");
  }

  this.space();
  this.print(node.returnType, node);
}

export function FunctionTypeParam(node) {
  this.print(node.name, node);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  this.print(node.typeAnnotation, node);
}

export function InterfaceExtends(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

export function _interfaceish(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node.extends.length) {
    this.push(" extends ");
    this.printJoin(node.extends, node, { separator: ", " });
  }
  if (node.mixins && node.mixins.length) {
    this.push(" mixins ");
    this.printJoin(node.mixins, node, { separator: ", " });
  }
  this.space();
  this.print(node.body, node);
}

export function InterfaceDeclaration(node) {
  this.push("interface ");
  this._interfaceish(node);
}

export function IntersectionTypeAnnotation(node) {
  this.printJoin(node.types, node, { separator: " & " });
}

export function MixedTypeAnnotation() {
  this.push("mixed");
}

export function NullableTypeAnnotation(node) {
  this.push("?");
  this.print(node.typeAnnotation, node);
}

export { NumericLiteral as NumericLiteralTypeAnnotation } from "./types";

export function NumberTypeAnnotation() {
  this.push("number");
}

export function StringLiteralTypeAnnotation(node) {
  this.push(this._stringLiteral(node.value));
}

export function StringTypeAnnotation() {
  this.push("string");
}

export function ThisTypeAnnotation() {
  this.push("this");
}

export function TupleTypeAnnotation(node) {
  this.push("[");
  this.printJoin(node.types, node, { separator: ", " });
  this.push("]");
}

export function TypeofTypeAnnotation(node) {
  this.push("typeof ");
  this.print(node.argument, node);
}

export function TypeAlias(node) {
  this.push("type ");
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.push("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}

export function TypeAnnotation(node) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  this.print(node.typeAnnotation, node);
}

export function TypeParameterInstantiation(node) {
  this.push("<");
  this.printJoin(node.params, node, {
    separator: ", ",
    iterator: (node) => {
      this.print(node.typeAnnotation, node);
    }
  });
  this.push(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function ObjectTypeAnnotation(node) {
  this.push("{");
  let props = node.properties.concat(node.callProperties, node.indexers);

  if (props.length) {
    this.space();

    this.printJoin(props, node, {
      separator: false,
      indent: true,
      iterator: () => {
        if (props.length !== 1) {
          this.semicolon();
          this.space();
        }
      }
    });

    this.space();
  }

  this.push("}");
}

export function ObjectTypeCallProperty(node) {
  if (node.static) this.push("static ");
  this.print(node.value, node);
}

export function ObjectTypeIndexer(node) {
  if (node.static) this.push("static ");
  this.push("[");
  this.print(node.id, node);
  this.push(":");
  this.space();
  this.print(node.key, node);
  this.push("]");
  this.push(":");
  this.space();
  this.print(node.value, node);
}

export function ObjectTypeProperty(node) {
  if (node.static) this.push("static ");
  this.print(node.key, node);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  this.print(node.value, node);
}

export function QualifiedTypeIdentifier(node) {
  this.print(node.qualification, node);
  this.push(".");
  this.print(node.id, node);
}

export function UnionTypeAnnotation(node) {
  this.printJoin(node.types, node, { separator: " | " });
}

export function TypeCastExpression(node) {
  this.push("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.push(")");
}

export function VoidTypeAnnotation() {
  this.push("void");
}
