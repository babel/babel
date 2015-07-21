import * as t from "../../types";

/**
 * Prints AnyTypeAnnotation.
 */

export function AnyTypeAnnotation() {
  this.push("any");
}

/**
 * Prints ArrayTypeAnnotation, prints elementType.
 */

export function ArrayTypeAnnotation(node, print) {
  print.plain(node.elementType);
  this.push("[");
  this.push("]");
}

/**
 * Prints BooleanTypeAnnotation.
 */

export function BooleanTypeAnnotation(node) {
  this.push("bool");
}

/**
 * Prints DeclareClass, prints node.
 */

export function DeclareClass(node, print) {
  this.push("declare class ");
  this._interfaceish(node, print);
}

/**
 * Prints DeclareFunction, prints id and id.typeAnnotation.
 */

export function DeclareFunction(node, print) {
  this.push("declare function ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation.typeAnnotation);
  this.semicolon();
}

/**
 * Prints DeclareModule, prints id and body.
 */

export function DeclareModule(node, print) {
  this.push("declare module ");
  print.plain(node.id);
  this.space();
  print.plain(node.body);
}

/**
 * Prints DeclareVariable, prints id and id.typeAnnotation.
 */

export function DeclareVariable(node, print) {
  this.push("declare var ");
  print.plain(node.id);
  print.plain(node.id.typeAnnotation);
  this.semicolon();
}

/**
 * Prints FunctionTypeAnnotation, prints typeParameters, params, and rest.
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
 * Prints FunctionTypeParam, prints name and typeAnnotation, handles optional.
 */

export function FunctionTypeParam(node, print) {
  print.plain(node.name);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  print.plain(node.typeAnnotation);
}

/**
 * Prints InterfaceExtends, prints id and typeParameters.
 */

export function InterfaceExtends(node, print) {
  print.plain(node.id);
  print.plain(node.typeParameters);
}

/**
 * Alias InterfaceExtends printer as ClassImplements,
 * and InterfaceExtends printer as GenericTypeAnnotation.
 */

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

/**
 * Prints interface-like node, prints id, typeParameters, extends, and body.
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
 * Prints InterfaceDeclaration, prints node.
 */

export function InterfaceDeclaration(node, print) {
  this.push("interface ");
  this._interfaceish(node, print);
}

/**
 * Prints IntersectionTypeAnnotation, prints types.
 */

export function IntersectionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " & " });
}

/**
 * Prints MixedTypeAnnotation.
 */

export function MixedTypeAnnotation() {
  this.push("mixed");
}

/**
 * Prints NullableTypeAnnotation, prints typeAnnotation.
 */

export function NullableTypeAnnotation(node, print) {
  this.push("?");
  print.plain(node.typeAnnotation);
}

/**
 * Prints NumberLiteralTypeAnnotation, prints value.
 */

export { Literal as NumberLiteralTypeAnnotation } from "./types";

/**
 * Prints NumberTypeAnnotation.
 */

export function NumberTypeAnnotation() {
  this.push("number");
}

/**
 * Prints StringLiteralTypeAnnotation, prints value.
 */

export function StringLiteralTypeAnnotation(node) {
  this.push(this._stringLiteral(node.value));
}

/**
 * Prints StringTypeAnnotation.
 */

export function StringTypeAnnotation() {
  this.push("string");
}

/**
 * Prints TupleTypeAnnotation, prints types.
 */

export function TupleTypeAnnotation(node, print) {
  this.push("[");
  print.join(node.types, { separator: ", " });
  this.push("]");
}

/**
 * Prints TypeofTypeAnnotation, prints argument.
 */

export function TypeofTypeAnnotation(node, print) {
  this.push("typeof ");
  print.plain(node.argument);
}

/**
 * Prints TypeAlias, prints id, typeParameters, and right.
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
 * Prints TypeAnnotation, prints typeAnnotation, handles optional.
 */

export function TypeAnnotation(node, print) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  print.plain(node.typeAnnotation);
}

/**
 * Prints TypeParameterInstantiation, prints params.
 */

export function TypeParameterInstantiation(node, print) {
  this.push("<");
  print.join(node.params, {
    separator: ", ",
    iterator(node) {
      print.plain(node.typeAnnotation);
    }
  });
  this.push(">");
}

/**
 * Alias TypeParameterInstantiation printer as TypeParameterDeclaration
 */

export { TypeParameterInstantiation as TypeParameterDeclaration };

/**
 * Prints ObjectTypeAnnotation, prints properties, callProperties, and indexers.
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
 * Prints ObjectTypeCallProperty, prints value, handles static.
 */

export function ObjectTypeCallProperty(node, print) {
  if (node.static) this.push("static ");
  print.plain(node.value);
}

/**
 * Prints ObjectTypeIndexer, prints id, key, and value, handles static.
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
 * Prints ObjectTypeProperty, prints static, key, and value.
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
 * Prints QualifiedTypeIdentifier, prints qualification and id.
 */

export function QualifiedTypeIdentifier(node, print) {
  print.plain(node.qualification);
  this.push(".");
  print.plain(node.id);
}

/**
 * Prints UnionTypeAnnotation, prints types.
 */

export function UnionTypeAnnotation(node, print) {
  print.join(node.types, { separator: " | " });
}

/**
 * Prints TypeCastExpression, prints expression and typeAnnotation.
 */

export function TypeCastExpression(node, print) {
  this.push("(");
  print.plain(node.expression);
  print.plain(node.typeAnnotation);
  this.push(")");
}

/**
 * Prints VoidTypeAnnotation.
 */

export function VoidTypeAnnotation(node) {
  this.push("void");
}
