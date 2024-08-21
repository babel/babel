import type Printer from "../printer.ts";
import type * as t from "@babel/types";

export function TaggedTemplateExpression(
  this: Printer,
  node: t.TaggedTemplateExpression,
) {
  this.print(node.tag);
  this.print(node.typeParameters); // TS
  this.print(node.quasi);
}

export function TemplateElement(this: Printer) {
  throw new Error("TemplateElement printing is handled in TemplateLiteral");
}

export function TemplateLiteral(this: Printer, node: t.TemplateLiteral) {
  const quasis = node.quasis;

  let partRaw = "`";

  for (let i = 0; i < quasis.length; i++) {
    partRaw += quasis[i].value.raw;

    if (i + 1 < quasis.length) {
      this.token(partRaw + "${", true);
      this.print(node.expressions[i]);
      partRaw = "}";
    }
  }

  this.token(partRaw + "`", true);
}
