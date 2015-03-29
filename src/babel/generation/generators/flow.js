import * as t from "../../types";

export function AnyTypeAnnotation() {
  this.push("any");
}

export function ArrayTypeAnnotation(node, print) {
  print(node.elementType);
  this.push("[");
  this.push("]");
}

export function BooleanTypeAnnotation(node) {
  this.push("bool");
}

export function DeclareClass(node, print) {
  this.push("declare class ");
  this._interfaceish(node, print);
}

export function DeclareFunction(node, print) {
  this.push("declare function ");
  print(node.id);
  print(node.id.typeAnnotation.typeAnnotation);
  this.semicolon();
}

export function DeclareModule(node, print) {
  this.push("declare module ");
  print(node.id);
  this.space();
  print(node.body);
}

export function DeclareVariable(node, print) {
  this.push("declare var ");
  print(node.id);
  print(node.id.typeAnnotation);
  this.semicolon();
}

export function FunctionTypeAnnotation(node, print, parent) {
  print(node.typeParameters);
  this.push("(");
  print.list(node.params);

  if (node.rest) {
    if (node.params.length) {
      this.push(",");
      this.space();
    }
    this.push("...");
    print(node.rest);
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
  print(node.returnType);
}

export function FunctionTypeParam(node, print) {
  print(node.name);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  print(node.typeAnnotation);
}

export function InterfaceExtends(node, print) {
  print(node.id);
  print(node.typeParameters);
}

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

export function _interfaceish(node, print) {
  print(node.id);
  print(node.typeParameters);
  if (node.extends.length) {
    this.push(" extends ");
    print.join(node.extends, { separator: ", " });
  }
  this.space();
  print(node.body);
}

export function InterfaceDeclaration(node, print) {
  this.push("interface ");
  this._interfaceish(node, print);
}

export function IntersectionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " & " });
}

export function NullableTypeAnnotation(node, print) {
  this.push("?");
  print(node.typeAnnotation);
}

export function NumberTypeAnnotation() {
  this.push("number");
}

export function StringLiteralTypeAnnotation(node) {
  this._stringLiteral(node.value);
}

export function StringTypeAnnotation() {
  this.push("string");
}

export function TupleTypeAnnotation(node, print) {
  this.push("[");
  print.join(node.types, { separator: ", " });
  this.push("]");
}

export function TypeofTypeAnnotation(node, print) {
  this.push("typeof ");
  print(node.argument);
}

export function TypeAlias(node, print) {
  this.push("type ");
  print(node.id);
  print(node.typeParameters);
  this.space();
  this.push("=");
  this.space();
  print(node.right);
  this.semicolon();
}

export function TypeAnnotation(node, print) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  print(node.typeAnnotation);
}

export function TypeParameterInstantiation(node, print) {
  this.push("<");
  print.join(node.params, { separator: ", " });
  this.push(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function ObjectTypeAnnotation(node, print) {
  this.push("{");
  var props = node.properties.concat(node.callProperties, node.indexers);

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

export function ObjectTypeCallProperty(node, print) {
  if (node.static) this.push("static ");
  print(node.value);
}

export function ObjectTypeIndexer(node, print) {
  if (node.static) this.push("static ");
  this.push("[");
  print(node.id);
  this.push(":");
  this.space();
  print(node.key);
  this.push("]");
  this.push(":");
  this.space();
  print(node.value);
}

export function ObjectTypeProperty(node, print) {
  if (node.static) this.push("static ");
  print(node.key);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  print(node.value);
}

export function QualifiedTypeIdentifier(node, print) {
  print(node.qualification);
  this.push(".");
  print(node.id);
}

export function UnionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " | " });
}

export function TypeCastExpression(node, print) {
  this.push("(");
  print(node.expression);
  print(node.typeAnnotation);
  this.push(")");
}

export function VoidTypeAnnotation(node) {
  this.push("void");
}
