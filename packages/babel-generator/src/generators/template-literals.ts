import type Printer from "../printer.ts";
import type * as t from "@babel/types";

export function TaggedTemplateExpression(
  this: Printer,
  node: t.TaggedTemplateExpression,
) {
  this.print(node.tag);
  if (process.env.BABEL_8_BREAKING) {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 8 AST
    this.print(node.typeArguments);
  } else {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST
    this.print(node.typeParameters);
  }
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

    // In Babel 7 we have individual tokens for ${ and }, so the automatic
    // catchup logic does not work. Manually look for those tokens.
    if (!process.env.BABEL_8_BREAKING && this.tokenMap) {
      const token = this.tokenMap.findMatching(node, "}", i);
      if (token) this._catchUpTo(token.loc.start);
    }
  }
  partRaw += quasis[quasis.length - 1].value.raw;
  this.token(partRaw + "`", true);
}

export function TemplateLiteral(this: Printer, node: t.TemplateLiteral) {
  this._printTemplate(node, node.expressions);
}
