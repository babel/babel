/* @flow */

import * as t from "babel-types";

export function AnyTypeAnnotation() {
  this.push("any");
}

export function ArrayTypeAnnotation(node: Object) {
  this.print(node.elementType, node);
  this.push("[");
  this.push("]");
}

export function BooleanTypeAnnotation() {
  this.push("bool");
}

export function BooleanLiteralTypeAnnotation(node: Object) {
  this.push(node.value ? "true" : "false");
}

export function NullLiteralTypeAnnotation() {
  this.push("null");
}

export function DeclareClass(node: Object) {
  this.push("declare class ");
  this._interfaceish(node);
}

export function DeclareFunction(node: Object) {
  this.push("declare function ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);
  this.semicolon();
}

export function DeclareModule(node: Object) {
  this.push("declare module ");
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

export function DeclareVariable(node: Object) {
  this.push("declare var ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

export function ExistentialTypeParam() {
  this.push("*");
}

export function FunctionTypeAnnotation(node: Object, parent: Object) {
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

export function FunctionTypeParam(node: Object) {
  this.print(node.name, node);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  this.print(node.typeAnnotation, node);
}

export function InterfaceExtends(node: Object) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

export function _interfaceish(node: Object) {
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

export function InterfaceDeclaration(node: Object) {
  this.push("interface ");
  this._interfaceish(node);
}

export function IntersectionTypeAnnotation(node: Object) {
  this.printJoin(node.types, node, { separator: " & " });
}

export function MixedTypeAnnotation() {
  this.push("mixed");
}

export function NullableTypeAnnotation(node: Object) {
  this.push("?");
  this.print(node.typeAnnotation, node);
}

export { NumericLiteral as NumericLiteralTypeAnnotation } from "./types";

export function NumberTypeAnnotation() {
  this.push("number");
}

export function StringLiteralTypeAnnotation(node: Object) {
  this.push(this._stringLiteral(node.value));
}

export function StringTypeAnnotation() {
  this.push("string");
}

export function TupleTypeAnnotation(node: Object) {
  this.push("[");
  this.printJoin(node.types, node, { separator: ", " });
  this.push("]");
}

export function TypeofTypeAnnotation(node: Object) {
  this.push("typeof ");
  this.print(node.argument, node);
}

export function TypeAlias(node: Object) {
  this.push("type ");
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.push("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}

export function TypeAnnotation(node: Object) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  this.print(node.typeAnnotation, node);
}

export function TypeParameterInstantiation(node: Object) {
  this.push("<");
  this.printJoin(node.params, node, {
    separator: ", ",
    iterator: (node: Object) => {
      this.print(node.typeAnnotation, node);
    }
  });
  this.push(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function ObjectTypeAnnotation(node: Object) {
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

export function ObjectTypeCallProperty(node: Object) {
  if (node.static) this.push("static ");
  this.print(node.value, node);
}

export function ObjectTypeIndexer(node: Object) {
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

export function ObjectTypeProperty(node: Object) {
  if (node.static) this.push("static ");
  this.print(node.key, node);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  this.print(node.value, node);
}

export function QualifiedTypeIdentifier(node: Object) {
  this.print(node.qualification, node);
  this.push(".");
  this.print(node.id, node);
}

export function UnionTypeAnnotation(node: Object) {
  this.printJoin(node.types, node, { separator: " | " });
}

export function TypeCastExpression(node: Object) {
  this.push("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.push(")");
}

export function VoidTypeAnnotation() {
  this.push("void");
}
