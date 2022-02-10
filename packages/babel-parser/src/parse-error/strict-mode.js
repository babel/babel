// @flow

import { toParseErrorClasses } from "../parse-error";

export default toParseErrorClasses(_ => ({
  StrictDelete: _("Deleting local variable in strict mode."),
  StrictEvalArguments: _<{ binding: string }>(
    ({ binding }) => `Assigning to '${binding}' in strict mode.`,
  ),
  StrictEvalArgumentsBinding: _<{ binding: string }>(
    ({ binding }) => `Binding '${binding}' in strict mode.`,
  ),
  StrictFunction: _(
    "In strict mode code, functions can only be declared at top level or inside a block.",
  ),
  StrictNumericEscape: _(
    "The only valid numeric escape in strict mode is '\\0'.",
  ),
  StrictOctalLiteral: _(
    "Legacy octal literals are not allowed in strict mode.",
  ),
  StrictWith: _("'with' in strict mode."),
}));
