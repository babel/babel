// @flow

import { toParseErrorCredentials } from "../parse-error";

export default (_: typeof toParseErrorCredentials) => ({
  StrictDelete: _("Deleting local variable in strict mode."),

  // `bindingName` is the StringValue[1] of an IdentifierReference[2], which is
  // represented as just an `Identifier`[3] in the Babel AST.
  // 1. https://tc39.es/ecma262/#sec-static-semantics-stringvalue
  // 2. https://tc39.es/ecma262/#prod-IdentifierReference
  // 3. https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#identifier
  StrictEvalArguments: _<{| referenceName: string |}>(
    ({ referenceName }) => `Assigning to '${referenceName}' in strict mode.`,
  ),
  // `bindingName` is the StringValue[1] of a BindingIdentifier[2], which is
  // represented as just an `Identifier`[3] in the Babel AST.
  // 1. https://tc39.es/ecma262/#sec-static-semantics-stringvalue
  // 2. https://tc39.es/ecma262/#prod-BindingIdentifier
  // 3. https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#identifier
  StrictEvalArgumentsBinding: _<{| bindingName: string |}>(
    ({ bindingName }) => `Binding '${bindingName}' in strict mode.`,
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
});
