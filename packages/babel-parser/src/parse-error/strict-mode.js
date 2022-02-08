import { toParseErrorClasses } from "../parse-error";

export default toParseErrorClasses(_ => {
  StrictDelete: _("Deleting local variable in strict mode."),
  StrictEvalArguments: _<{ name: string }>(({ name }) => `Assigning to '${name}' in strict mode.`),
  StrictEvalArgumentsBinding: _<{ name: string }>(({ name }) => `Binding '${name}' in strict mode.`),
  StrictFunction: _("In strict mode code, functions can only be declared at top level or inside a block."),
  StrictNumericEscape: _("The only valid numeric escape in strict mode is '\\0'."),
  StrictOctalLiteral: _("Legacy octal literals are not allowed in strict mode."),
  StrictWith: _("'with' in strict mode."),
});
