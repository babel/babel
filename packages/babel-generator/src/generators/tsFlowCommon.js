import type {
  TypeAnnotation as ITypeAnnotation,
  TypeParameter as ITypeParameter,
  TypeParameterInstantiation as ITypeParameterInstantiation,
} from "babylon/src/types";

export function TypeAnnotation(node: ITypeAnnotation): void {
  this.token(":");
  this.space();
  if (node.optional) this.token("?");
  this.print(node.typeAnnotation, node);
}

export function TypeParameterInstantiation(
  node: ITypeParameterInstantiation,
): void {
  this.token("<");
  this.printList(node.params, node, {});
  this.token(">");
}

export { TypeParameterInstantiation as TypeParameterDeclaration };

export function TypeParameter(node: ITypeParameter): void {
  this._variance(node);

  this.word(node.name);

  if (node.bound) {
    this.print(node.bound, node);
  }

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
