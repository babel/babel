import type { ParseErrorTemplates } from "../parse-error.ts";

export default {
  ParseExpressionEmptyInput:
    "Unexpected parseExpression() input: The input is empty or contains only comments.",
  ParseExpressionExpectsEOF: ({ unexpected }: { unexpected: string }) =>
    `Unexpected parseExpression() input: The input should contain exactly one expression, but \`${unexpected}\` is seen.`,
} satisfies ParseErrorTemplates;
