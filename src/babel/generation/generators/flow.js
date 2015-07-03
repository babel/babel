import * as t from "../../types";

/**
 * [Please add a description.]
 */

export function AnyTypeAnnotation() {
  this.push("any");
}

/**
 * [Please add a description.]
 */

export function ArrayTypeAnnotation(node, print) {
  print.plain(node.elementType);
  this.push("[");
  this.push("]");
}

/**
 * [Please add a description.]
 */

export function BooleanTypeAnnotation(node) {
  this.push("bool");
}

/**
 * [Please add a description.]
 */

export function DeclareClass(node, print) {
  this.push("declare class ");
  this._interfaceish(node, print);
}

/**
 * [Please add a description.]
 */

export function DeclareFunction(node, print) {
  this.push("declare function ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation.typeAnnotation);
  this.semicolon();
}

/**
 * [Please add a description.]
 */

export function DeclareModule(node, print) {
  this.push("declare module ");
  print.plain(node.id);
  this.space();
  print.plain(node.body);
}

/**
 * [Please add a description.]
 */

export function DeclareVariable(node, print) {
  this.push("declare var ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation);
  this.semicolon();
}

/**
 * [Please add a description.]
 */

export function FunctionTypeAnnotation(node, print, parent) {
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

/**
 * [Please add a description.]
 */

export function FunctionTypeParam(node, print) {
  print.plain(node.name);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  print.plain(node.typeAnnotation);
}

/**
 * [Please add a description.]
 */

export function InterfaceExtends(node, print) {
  print.plain(node.id);
  print.plain(node.typeParameters);
}

/**
 * [Please add a description.]
 */

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

/**
 * [Please add a description.]
 */

export function _interfaceish(node, print) {
  print.plain(node.id);
  print.plain(node.typeParameters);
  if (node.extends.length) {
    this.push(" extends ");
    print.join(node.extends, { separator: ", " });
  }
  this.space();
  print.plain(node.body);
}

/**
 * [Please add a description.]
 */

export function InterfaceDeclaration(node, print) {
  this.push("interface ");
  this._interfaceish(node, print);
}

/**
 * [Please add a description.]
 */

export function IntersectionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " & " });
}

/**
 * [Please add a description.]
 */

export function MixedTypeAnnotation() {
  this.push("mixed");
}

/**
 * [Please add a description.]
 */

export function NullableTypeAnnotation(node, print) {
  this.push("?");
  print.plain(node.typeAnnotation);
}

/**
 * [Please add a description.]
 */

export function NumberTypeAnnotation() {
  this.push("number");
}

/**
 * [Please add a description.]
 */

export function StringLiteralTypeAnnotation(node) {
  this._stringLiteral(node.value);
}

/**
 * [Please add a description.]
 */

export function StringTypeAnnotation() {
  this.push("string");
}

/**
 * [Please add a description.]
 */

export function TupleTypeAnnotation(node, print) {
  this.push("[");
  print.join(node.types, { separator: ", " });
  this.push("]");
}

/**
 * [Please add a description.]
 */

export function TypeofTypeAnnotation(node, print) {
  this.push("typeof ");
  print.plain(node.argument);
}

/**
 * [Please add a description.]
 */

export function TypeAlias(node, print) {
  this.push("type ");
  print.plain(node.id);
  print.plain(node.typeParameters);
  this.space();
  this.push("=");
  this.space();
  print.plain(node.right);
  this.semicolon();
}

/**
 * [Please add a description.]
 */

export function TypeAnnotation(node, print) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  print.plain(node.typeAnnotation);
}

/**
 * [Please add a description.]
 */

export function TypeParameterInstantiation(node, print) {
  this.push("<");
  print.join(node.params, { separator: ", " });
  this.push(">");
}

/**
 * [Please add a description.]
 */

export { TypeParameterInstantiation as TypeParameterDeclaration };

/**
 * [Please add a description.]
 */

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

/**
 * [Please add a description.]
 */

export function ObjectTypeCallProperty(node, print) {
  if (node.static) this.push("static ");
  print.plain(node.value);
}

/**
 * [Please add a description.]
 */

export function ObjectTypeIndexer(node, print) {
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

/**
 * [Please add a description.]
 */

export function ObjectTypeProperty(node, print) {
  if (node.static) this.push("static ");
  print.plain(node.key);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  print.plain(node.value);
}

/**
 * [Please add a description.]
 */

export function QualifiedTypeIdentifier(node, print) {
  print.plain(node.qualification);
  this.push(".");
  print.plain(node.id);
}

/**
 * [Please add a description.]
 */

export function UnionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " | " });
}

/**
 * [Please add a description.]
 */

export function TypeCastExpression(node, print) {
  this.push("(");
  print.plain(node.expression);
  print.plain(node.typeAnnotation);
  this.push(")");
}

/**
 * [Please add a description.]
 */

export function VoidTypeAnnotation(node) {
  this.push("void");
}
