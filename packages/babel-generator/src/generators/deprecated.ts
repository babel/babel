import type Printer from "../printer";
import type * as t from "@babel/types";

export type DeprecatedBabel7ASTTypes =
  | "Noop"
  | "TSExpressionWithTypeArguments"
  | "DecimalLiteral"
  | "RecordExpression"
  | "TupleExpression";

export function addDeprecatedGenerators(PrinterClass: typeof Printer) {}
