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

export function ArrayTypeAnnotation(node, parent) {
  this.print(node.elementType, node);
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
 * Prints BooleanLiteralTypeAnnotation.
 */

export function BooleanLiteralTypeAnnotation(node) {
  this.push(node.value ? "true" : "false");
}

/**
 * Prints DeclareClass, prints node.
 */

export function DeclareClass(node, parent) {
  this.push("declare class ");
  this._interfaceish(node);
}

/**
 * Prints DeclareFunction, prints id and id.typeAnnotation.
 */

export function DeclareFunction(node, parent) {
  this.push("declare function ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation.typeAnnotation, node);
  this.semicolon();
}

/**
 * Prints DeclareModule, prints id and body.
 */

export function DeclareModule(node, parent) {
  this.push("declare module ");
  this.print(node.id, node);
  this.space();
  this.print(node.body, node);
}

/**
 * Prints DeclareVariable, prints id and id.typeAnnotation.
 */

export function DeclareVariable(node, parent) {
  this.push("declare var ");
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  this.semicolon();
}

/**
 * Prints FunctionTypeAnnotation, prints typeParameters, params, and rest.
 */

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

/**
 * Prints FunctionTypeParam, prints name and typeAnnotation, handles optional.
 */

export function FunctionTypeParam(node, parent) {
  this.print(node.name, node);
  if (node.optional) this.push("?");
  this.push(":");
  this.space();
  this.print(node.typeAnnotation, node);
}

/**
 * Prints InterfaceExtends, prints id and typeParameters.
 */

export function InterfaceExtends(node, parent) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
}

/**
 * Alias InterfaceExtends printer as ClassImplements,
 * and InterfaceExtends printer as GenericTypeAnnotation.
 */

export { InterfaceExtends as ClassImplements, InterfaceExtends as GenericTypeAnnotation };

/**
 * Prints interface-like node, prints id, typeParameters, extends, and body.
 */

export function _interfaceish(node) {
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  if (node.extends.length) {
    this.push(" extends ");
    this.printJoin(node.extends, node, { separator: ", " });
  }
  this.space();
  this.print(node.body, node);
}

/**
 * Prints InterfaceDeclaration, prints node.
 */

export function InterfaceDeclaration(node, parent) {
  this.push("interface ");
  this._interfaceish(node);
}

/**
 * Prints IntersectionTypeAnnotation, prints types.
 */

export function IntersectionTypeAnnotation(node, parent) {
  this.printJoin(node.types, node, { separator: " & " });
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

export function NullableTypeAnnotation(node, parent) {
  this.push("?");
  this.print(node.typeAnnotation, node);
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

export function TupleTypeAnnotation(node, parent) {
  this.push("[");
  this.printJoin(node.types, node, { separator: ", " });
  this.push("]");
}

/**
 * Prints TypeofTypeAnnotation, prints argument.
 */

export function TypeofTypeAnnotation(node, parent) {
  this.push("typeof ");
  this.print(node.argument, node);
}

/**
 * Prints TypeAlias, prints id, typeParameters, and right.
 */

export function TypeAlias(node, parent) {
  this.push("type ");
  this.print(node.id, node);
  this.print(node.typeParameters, node);
  this.space();
  this.push("=");
  this.space();
  this.print(node.right, node);
  this.semicolon();
}

/**
 * Prints TypeAnnotation, prints typeAnnotation, handles optional.
 */

export function TypeAnnotation(node, parent) {
  this.push(":");
  this.space();
  if (node.optional) this.push("?");
  this.print(node.typeAnnotation, node);
}

/**
 * Prints TypeParameterInstantiation, prints params.
 */

export function TypeParameterInstantiation(node, parent) {
  this.push("<");
  this.printJoin(node.params, node, {
    separator: ", ",
    iterator: (node) => {
      this.print(node.typeAnnotation, node);
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

export function ObjectTypeAnnotation(node, parent) {
  this.push("{");
  var props = node.properties.concat(node.callProperties, node.indexers);

  if (props.length) {
    this.space();

    this.printList(props, node, {
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

export function ObjectTypeCallProperty(node, parent) {
  if (node.static) this.push("static ");
  this.print(node.value, node);
}

/**
 * Prints ObjectTypeIndexer, prints id, key, and value, handles static.
 */

export function ObjectTypeIndexer(node, parent) {
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

/**
 * Prints ObjectTypeProperty, prints static, key, and value.
 */

export function ObjectTypeProperty(node, parent) {
  if (node.static) this.push("static ");
  this.print(node.key, node);
  if (node.optional) this.push("?");
  if (!t.isFunctionTypeAnnotation(node.value)) {
    this.push(":");
    this.space();
  }
  this.print(node.value, node);
}

/**
 * Prints QualifiedTypeIdentifier, prints qualification and id.
 */

export function QualifiedTypeIdentifier(node, parent) {
  this.print(node.qualification, node);
  this.push(".");
  this.print(node.id, node);
}

/**
 * Prints UnionTypeAnnotation, prints types.
 */

export function UnionTypeAnnotation(node, parent) {
  this.printJoin(node.types, node, { separator: " | " });
}

/**
 * Prints TypeCastExpression, prints expression and typeAnnotation.
 */

export function TypeCastExpression(node, parent) {
  this.push("(");
  this.print(node.expression, node);
  this.print(node.typeAnnotation, node);
  this.push(")");
}

/**
 * Prints VoidTypeAnnotation.
 */

export function VoidTypeAnnotation(node) {
  this.push("void");
}
