import type Printer from "../printer";
import type * as t from "@babel/types";

export type DeprecatedBabel7ASTTypes =
  | "Noop"
  | "TSExpressionWithTypeArguments"
  | "DecimalLiteral"
  | "RecordExpression"
  | "TupleExpression";

export function addDeprecatedGenerators(PrinterClass: typeof Printer) {
  // Add Babel 7 generator methods that is removed in Babel 8
  if (!process.env.BABEL_8_BREAKING) {
    const deprecatedBabel7Generators = {
      Noop(this: Printer) {},

      TSExpressionWithTypeArguments(
        this: Printer,
        // @ts-ignore(Babel 7 vs Babel 8) Babel 7 AST
        node: t.TSExpressionWithTypeArguments,
      ) {
        this.print(node.expression);
        this.print(node.typeParameters);
      },

      DecimalLiteral(this: Printer, node: any) {
        const raw = this.getPossibleRaw(node);
        if (!this.format.minified && raw !== undefined) {
          this.word(raw);
          return;
        }
        this.word(node.value + "m");
      },

      // @ts-ignore(Babel 7 vs Babel 8) - t.RecordExpression only exists in Babel 7
      RecordExpression(this: Printer, node: t.RecordExpression) {
        const props = node.properties;

        let startToken;
        let endToken;

        if (this.format.recordAndTupleSyntaxType === "bar") {
          startToken = "{|";
          endToken = "|}";
        } else if (
          this.format.recordAndTupleSyntaxType !== "hash" &&
          this.format.recordAndTupleSyntaxType != null
        ) {
          throw new Error(
            `The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(
              this.format.recordAndTupleSyntaxType,
            )} received).`,
          );
        } else {
          startToken = "#{";
          endToken = "}";
        }

        this.token(startToken);

        if (props.length) {
          this.space();
          this.printList(
            props,
            this.shouldPrintTrailingComma(endToken),
            true,
            true,
          );
          this.space();
        }
        this.token(endToken);
      },

      // @ts-ignore(Babel 7 vs Babel 8) - t.TupleExpression only exists in Babel 7
      TupleExpression(this: Printer, node: t.TupleExpression) {
        const elems = node.elements;
        const len = elems.length;

        let startToken;
        let endToken;
        if (process.env.BABEL_8_BREAKING) {
          startToken = "#[";
          endToken = "]";
        } else {
          if (this.format.recordAndTupleSyntaxType === "bar") {
            startToken = "[|";
            endToken = "|]";
          } else if (this.format.recordAndTupleSyntaxType === "hash") {
            startToken = "#[";
            endToken = "]";
          } else {
            throw new Error(
              `${this.format.recordAndTupleSyntaxType} is not a valid recordAndTuple syntax type`,
            );
          }
        }

        this.token(startToken);

        for (let i = 0; i < elems.length; i++) {
          const elem = elems[i];
          if (elem) {
            if (i > 0) this.space();
            this.print(elem);
            if (i < len - 1 || this.shouldPrintTrailingComma(endToken)) {
              this.token(",", false, i);
            }
          }
        }

        this.token(endToken);
      },
    } satisfies Record<
      DeprecatedBabel7ASTTypes,
      (this: Printer, node: any) => void
    >;
    Object.assign(PrinterClass.prototype, deprecatedBabel7Generators);
  }
}
