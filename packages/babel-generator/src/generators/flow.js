/* @flow */

import type NodePrinter from "../node/printer";
import * as t from "babel-types";

export function AnyTypeAnnotation() {
  this.push("any");
}

export function ArrayTypeAnnotation(node: Object, print: NodePrinter) {
  print.plain(node.elementType);
  this.push("[");
  this.push("]");
}

export function BooleanTypeAnnotation() {
  this.push("bool");
}

export function BooleanLiteralTypeAnnotation(node: Object) {
  this.push(node.value ? "true" : "false");
}

export function DeclareClass(node: Object, print: NodePrinter) {
  this.push("declare class ");
  this._interfaceish(node, print);
}

export function DeclareFunction(node: Object, print: NodePrinter) {
  this.push("declare function ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation.typeAnnotation);
  this.semicolon();
}

export function DeclareModule(node: Object, print: NodePrinter) {
  this.push("declare module ");
  print.plain(node.id);
  this.space();
  print.plain(node.body);
}

export function DeclareVariable(node: Object, print: NodePrinter) {
  this.push("declare let ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation);
  this.semicolon();
}

export function FunctionTypeAnnotation(node: Object, print: NodePrinter, parent: Object) {
  print.plain(node.typeParameters);
  this.push("(");
  print.list(node.params);

  if (node.rest) {
    if (node.params.length) {
      this.push(",");
      this.space();
    }
    this.push("...");
    print.plain(node.rest);
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
  print.plain(node.returnType);
}

export function FunctionTypeParam(node: Object, print: NodePrinter) {
  print.plain(node.name);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  print.plain(node.typeAnnotation);
}

export function InterfaceExtends(node: Object, print: NodePrinter) {
  print.plain(node.id);
  print.plain(node.typeParameters);
}

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

export function _interfaceish(node: Object, print: NodePrinter) {
  print.plain(node.id);
  print.plain(node.typeParameters);
  if (node.extends.length) {
    this.push(" extends ");
    print.join(node.extends, { separator: ", " });
  }
  this.space();
  print.plain(node.body);
}

export function InterfaceDeclaration(node: Object, print: NodePrinter) {
  this.push("interface ");
  this._interfaceish(node, print);
}

export function IntersectionTypeAnnotation(node: Object, print: NodePrinter) {
  print.join(node.types, { separator: " & " });
}

export function MixedTypeAnnotation() {
  this.push("mixed");
}

export function NullableTypeAnnotation(node: Object, print: NodePrinter) {
  this.push("?");
  print.plain(node.typeAnnotation);
}

export { NumberLiteral as NumberLiteralTypeAnnotation } from "./types";

export function NumberTypeAnnotation() {
  this.push("number");
}

export function StringLiteralTypeAnnotation(node: Object) {
  this.push(this._stringLiteral(node.value));
}

export function StringTypeAnnotation() {
  this.push("string");
}

export function TupleTypeAnnotation(node: Object, print: NodePrinter) {
  this.push("[");
  print.join(node.types, { separator: ", " });
  this.push("]");
}

export function TypeofTypeAnnotation(node: Object, print: NodePrinter) {
  this.push("typeof ");
  print.plain(node.argument);
}

export function TypeAlias(node: Object, print: NodePrinter) {
  this.push("type ");
  print.plain(node.id);
  print.plain(node.typeParameters);
  this.space();
  this.push("=");
  this.space();
  print.plain(node.right);
  this.semicolon();
}

export function TypeAnnotation(node: Object, print: NodePrinter) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  print.plain(node.typeAnnotation);
}

export function TypeParameterInstantiation(node: Object, print: NodePrinter) {
  this.push("<");
  print.join(node.params, {
    separator: ", ",
    iterator(node: Object) {
      print.plain(node.typeAnnotation);
    }
  });
  this.push(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function ObjectTypeAnnotation(node: Object, print: NodePrinter) {
  this.push("{");
  let props = node.properties.concat(node.callProperties, node.indexers);

  if (props.length) {
    this.space();

    print.list(props, {
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

export function ObjectTypeCallProperty(node: Object, print: NodePrinter) {
  if (node.static) this.push("static ");
  print.plain(node.value);
}

export function ObjectTypeIndexer(node: Object, print: NodePrinter) {
  if (node.static) this.push("static ");
  this.push("[");
  print.plain(node.id);
  this.push(":");
  this.space();
  print.plain(node.key);
  this.push("]");
  this.push(":");
  this.space();
  print.plain(node.value);
}

export function ObjectTypeProperty(node: Object, print: NodePrinter) {
  if (node.static) this.push("static ");
  print.plain(node.key);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  print.plain(node.value);
}

export function QualifiedTypeIdentifier(node: Object, print: NodePrinter) {
  print.plain(node.qualification);
  this.push(".");
  print.plain(node.id);
}

export function UnionTypeAnnotation(node: Object, print: NodePrinter) {
  print.join(node.types, { separator: " | " });
}

export function TypeCastExpression(node: Object, print: NodePrinter) {
  this.push("(");
  print.plain(node.expression);
  print.plain(node.typeAnnotation);
  this.push(")");
}

export function VoidTypeAnnotation() {
  this.push("void");
}
