import type { ParseErrorTemplates } from "../parse-error.ts";

export default {
  UnsupportedBind: "Binding should be performed on object property.",
  UnsupportedBindRHS:
    "The right-hand side of binding can not be super or import.",
} satisfies ParseErrorTemplates;
