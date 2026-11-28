import type { ParseErrorTemplates } from "../parse-error.ts";

export default {
  ArgumentPlaceholderOrdinalMustBeDecimalInteger: (raw: string) =>
    `The argument placeholder ordinal must be a decimal integer literal, but got "${raw}".`,
  DuplicateRestPlaceholder:
    "The partial application can have only one rest placeholder.",
  IncorrectPartialApplicationVersion: ({
    expected,
    actual,
  }: {
    expected: string;
    actual: string;
  }) =>
    `This syntax requires partial application plugin with version "${expected}", but got "${actual}".`,
  PartialNewHasNoArguments: `The "new" partial application must specify arguments parentheses, such as "new F~()".`,
  UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.",
  UnexpectedRestPlaceholder: "Unexpected rest placeholder.",
} satisfies ParseErrorTemplates;
