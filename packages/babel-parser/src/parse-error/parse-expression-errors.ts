import type { ParseErrorTemplates } from "../parse-error.ts";

export default {
  ParseExpressionEmptyInput:
    "Unexpected parseExpression() input: The input is empty or contains only comments.",
  ParseExpressionExpectsEOF: ({ unexpected }: { unexpected: number }) =>
    `Unexpected parseExpression() input: The input should contain exactly one expression, but the first expression is followed by the unexpected character \`${String.fromCodePoint(unexpected)}\`.`,
} satisfies ParseErrorTemplates;
