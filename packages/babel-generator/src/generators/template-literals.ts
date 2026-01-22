import type Printer from "../printer.ts";
import type * as t from "@babel/types";

export function TaggedTemplateExpression(
  this: Printer,
  node: t.TaggedTemplateExpression,
) {
  this.print(node.tag);

  this.print(node.typeArguments);

  this.print(node.quasi);
}

export function TemplateElement(this: Printer) {
  throw new Error("TemplateElement printing is handled in TemplateLiteral");
}

export type TemplateLiteralBase = t.Node & {
  quasis: t.TemplateElement[];
};

export function _printTemplate<T extends t.Node>(
  this: Printer,
  node: TemplateLiteralBase,
  substitutions: T[],
) {
  const quasis = node.quasis;
  let partRaw = "`";
  for (let i = 0; i < quasis.length - 1; i++) {
    partRaw += quasis[i].value.raw;
    this.token(partRaw + "${", true);
    this.print(substitutions[i]);
    partRaw = "}";
  }

  partRaw += quasis[quasis.length - 1].value.raw;
  this.token(partRaw + "`", true);
}

export function TemplateLiteral(this: Printer, node: t.TemplateLiteral) {
  _printTemplate.call(this, node, node.expressions);
}
