import type Printer from "../printer";

export function addDeprecatedGenerators(PrinterClass: typeof Printer) {
  // Add Babel 7 generator methods that is removed in Babel 8
  if (!process.env.BABEL_8_BREAKING) {
    // @ts-ignore(Babel 7 vs Babel 8) Babel 7 has Noop print method
    PrinterClass.prototype.Noop = function Noop(this: Printer) {};

    // @ts-ignore(Babel 7 vs Babel 8) Babel 7 has TSExpressionWithTypeArguments print method
    PrinterClass.prototype.TSExpressionWithTypeArguments =
      function TSExpressionWithTypeArguments(
        this: Printer,
        // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST
        node: t.TSExpressionWithTypeArguments,
      ) {
        this.print(node.expression);
        this.print(node.typeParameters);
      };
  }
}
