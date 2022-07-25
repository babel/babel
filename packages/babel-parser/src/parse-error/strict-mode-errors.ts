export default {
  StrictDelete: "Deleting local variable in strict mode.",

  // `referenceName` is the StringValue[1] of an IdentifierReference[2], which
  // is represented as just an `Identifier`[3] in the Babel AST.
  // 1. https://tc39.es/ecma262/#sec-static-semantics-stringvalue
  // 2. https://tc39.es/ecma262/#prod-IdentifierReference
  // 3. https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#identifier
  StrictEvalArguments: ({ referenceName }: { referenceName: string }) =>
    `Assigning to '${referenceName}' in strict mode.`,

  // `bindingName` is the StringValue[1] of a BindingIdentifier[2], which is
  // represented as just an `Identifier`[3] in the Babel AST.
  // 1. https://tc39.es/ecma262/#sec-static-semantics-stringvalue
  // 2. https://tc39.es/ecma262/#prod-BindingIdentifier
  // 3. https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#identifier
  StrictEvalArgumentsBinding: ({ bindingName }: { bindingName: string }) =>
    `Binding '${bindingName}' in strict mode.`,

  StrictFunction:
    "In strict mode code, functions can only be declared at top level or inside a block.",

  StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.",

  StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode.",

  StrictWith: "'with' in strict mode.",
};
