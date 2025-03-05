import type { ParseErrorTemplates } from "../parse-error.ts";
import toNodeDescription from "./to-node-description.ts";

export type LValAncestor =
  | { type: "UpdateExpression"; prefix: boolean }
  | {
      type:
        | "ArrayPattern"
        | "AssignmentExpression"
        | "CatchClause"
        | "ForOfStatement"
        | "FormalParameters"
        | "ForInStatement"
        | "ForStatement"
        | "ImportSpecifier"
        | "ImportNamespaceSpecifier"
        | "ImportDefaultSpecifier"
        | "ParenthesizedExpression"
        | "ObjectPattern"
        | "RestElement"
        | "VariableDeclarator";
    };

export default {
  AccessorIsGenerator: ({ kind }: { kind: "get" | "set" }) =>
    `A ${kind}ter cannot be a generator.`,
  ArgumentsInClass:
    "'arguments' is only allowed in functions and class methods.",
  AsyncFunctionInSingleStatementContext:
    "Async functions can only be declared at the top level or inside a block.",
  AwaitBindingIdentifier:
    "Can not use 'await' as identifier inside an async function.",
  AwaitBindingIdentifierInStaticBlock:
    "Can not use 'await' as identifier inside a static block.",
  AwaitExpressionFormalParameter:
    "'await' is not allowed in async function parameters.",
  AwaitUsingNotInAsyncContext:
    "'await using' is only allowed within async functions and at the top levels of modules.",
  AwaitNotInAsyncContext:
    "'await' is only allowed within async functions and at the top levels of modules.",
  AwaitNotInAsyncFunction: "'await' is only allowed within async functions.",
  BadGetterArity: "A 'get' accessor must not have any formal parameters.",
  BadSetterArity: "A 'set' accessor must have exactly one formal parameter.",
  BadSetterRestParameter:
    "A 'set' accessor function argument must not be a rest parameter.",
  ConstructorClassField: "Classes may not have a field named 'constructor'.",
  ConstructorClassPrivateField:
    "Classes may not have a private field named '#constructor'.",
  ConstructorIsAccessor: "Class constructor may not be an accessor.",
  ConstructorIsAsync: "Constructor can't be an async function.",
  ConstructorIsGenerator: "Constructor can't be a generator.",
  DeclarationMissingInitializer: ({
    kind,
  }: {
    kind: "await using" | "const" | "destructuring" | "using";
  }) => `Missing initializer in ${kind} declaration.`,
  DecoratorArgumentsOutsideParentheses:
    "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.",
  DecoratorBeforeExport:
    "Decorators must be placed *before* the 'export' keyword. Remove the 'decoratorsBeforeExport: true' option to use the 'export @decorator class {}' syntax.",
  DecoratorsBeforeAfterExport:
    "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.",
  DecoratorConstructor:
    "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
  DecoratorExportClass:
    "Decorators must be placed *after* the 'export' keyword. Remove the 'decoratorsBeforeExport: false' option to use the '@decorator export class {}' syntax.",
  DecoratorSemicolon: "Decorators must not be followed by a semicolon.",
  DecoratorStaticBlock: "Decorators can't be used with a static block.",
  DeferImportRequiresNamespace:
    'Only `import defer * as x from "./module"` is valid.',
  DeletePrivateField: "Deleting a private field is not allowed.",
  DestructureNamedImport:
    "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
  DuplicateConstructor: "Duplicate constructor in the same class.",
  DuplicateDefaultExport: "Only one default export allowed per module.",
  DuplicateExport: ({ exportName }: { exportName: string }) =>
    `\`${exportName}\` has already been exported. Exported identifiers must be unique.`,
  DuplicateProto: "Redefinition of __proto__ property.",
  DuplicateRegExpFlags: "Duplicate regular expression flag.",
  DynamicImportPhaseRequiresImportExpressions: ({ phase }: { phase: string }) =>
    `'import.${phase}(...)' can only be parsed when using the 'createImportExpressions' option.`,
  ElementAfterRest: "Rest element must be last element.",
  EscapedCharNotAnIdentifier: "Invalid Unicode escape.",
  ExportBindingIsString: ({
    localName,
    exportName,
  }: {
    localName: string;
    exportName: string;
  }) =>
    `A string literal cannot be used as an exported binding without \`from\`.\n- Did you mean \`export { '${localName}' as '${exportName}' } from 'some-module'\`?`,
  ExportDefaultFromAsIdentifier:
    "'from' is not allowed as an identifier after 'export default'.",

  ForInOfLoopInitializer: ({
    type,
  }: {
    type: "ForInStatement" | "ForOfStatement";
  }) =>
    `'${
      type === "ForInStatement" ? "for-in" : "for-of"
    }' loop variable declaration may not have an initializer.`,
  ForInUsing: "For-in loop may not start with 'using' declaration.",

  ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.",
  ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.",
  GeneratorInSingleStatementContext:
    "Generators can only be declared at the top level or inside a block.",

  IllegalBreakContinue: ({
    type,
  }: {
    type: "BreakStatement" | "ContinueStatement";
  }) => `Unsyntactic ${type === "BreakStatement" ? "break" : "continue"}.`,

  IllegalLanguageModeDirective:
    "Illegal 'use strict' directive in function with non-simple parameter list.",
  IllegalReturn: "'return' outside of function.",
  ImportAttributesUseAssert:
    "The `assert` keyword in import attributes is deprecated and it has been replaced by the `with` keyword. You can enable the `deprecatedImportAssert` parser plugin to suppress this error.",
  ImportBindingIsString: ({ importName }: { importName: string }) =>
    `A string literal cannot be used as an imported binding.\n- Did you mean \`import { "${importName}" as foo }\`?`,
  ImportCallArity: `\`import()\` requires exactly one or two arguments.`,
  ImportCallNotNewExpression: "Cannot use new with import(...).",
  ImportCallSpreadArgument: "`...` is not allowed in `import()`.",
  ImportJSONBindingNotDefault:
    "A JSON module can only be imported with `default`.",
  ImportReflectionHasAssertion: "`import module x` cannot have assertions.",
  ImportReflectionNotBinding:
    'Only `import module x from "./module"` is valid.',
  IncompatibleRegExpUVFlags:
    "The 'u' and 'v' regular expression flags cannot be enabled at the same time.",
  InvalidBigIntLiteral: "Invalid BigIntLiteral.",
  InvalidCodePoint: "Code point out of bounds.",
  InvalidCoverInitializedName: "Invalid shorthand property initializer.",
  InvalidDecimal: "Invalid decimal.",
  InvalidDigit: ({ radix }: { radix: number }) =>
    `Expected number in radix ${radix}.`,
  InvalidEscapeSequence: "Bad character escape sequence.",
  InvalidEscapeSequenceTemplate: "Invalid escape sequence in template.",
  InvalidEscapedReservedWord: ({ reservedWord }: { reservedWord: string }) =>
    `Escape sequence in keyword ${reservedWord}.`,
  InvalidIdentifier: ({ identifierName }: { identifierName: string }) =>
    `Invalid identifier ${identifierName}.`,
  InvalidLhs: ({ ancestor }: { ancestor: LValAncestor }) =>
    `Invalid left-hand side in ${toNodeDescription(ancestor)}.`,
  InvalidLhsBinding: ({ ancestor }: { ancestor: LValAncestor }) =>
    `Binding invalid left-hand side in ${toNodeDescription(ancestor)}.`,
  InvalidLhsOptionalChaining: ({ ancestor }: { ancestor: LValAncestor }) =>
    `Invalid optional chaining in the left-hand side of ${toNodeDescription(
      ancestor,
    )}.`,
  InvalidNumber: "Invalid number.",
  InvalidOrMissingExponent:
    "Floating-point numbers require a valid exponent after the 'e'.",
  InvalidOrUnexpectedToken: ({ unexpected }: { unexpected: string }) =>
    `Unexpected character '${unexpected}'.`,
  InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern.",
  InvalidPrivateFieldResolution: ({
    identifierName,
  }: {
    identifierName: string;
  }) => `Private name #${identifierName} is not defined.`,
  InvalidPropertyBindingPattern: "Binding member expression.",
  InvalidRecordProperty:
    "Only properties and spread elements are allowed in record definitions.",
  InvalidRestAssignmentPattern: "Invalid rest operator's argument.",
  LabelRedeclaration: ({ labelName }: { labelName: string }) =>
    `Label '${labelName}' is already declared.`,
  LetInLexicalBinding: "'let' is disallowed as a lexically bound name.",
  LineTerminatorBeforeArrow: "No line break is allowed before '=>'.",
  MalformedRegExpFlags: "Invalid regular expression flag.",
  MissingClassName: "A class name is required.",
  MissingEqInAssignment:
    "Only '=' operator can be used for specifying default value.",
  MissingSemicolon: "Missing semicolon.",
  MissingPlugin: ({ missingPlugin }: { missingPlugin: [string] }) =>
    `This experimental syntax requires enabling the parser plugin: ${missingPlugin
      .map(name => JSON.stringify(name))
      .join(", ")}.`,
  // FIXME: Would be nice to make this "missingPlugins" instead.
  // Also, seems like we can drop the "(s)" from the message and just make it "s".
  MissingOneOfPlugins: ({ missingPlugin }: { missingPlugin: string[] }) =>
    `This experimental syntax requires enabling one of the following parser plugin(s): ${missingPlugin
      .map(name => JSON.stringify(name))
      .join(", ")}.`,
  MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX.",
  MixingCoalesceWithLogical:
    "Nullish coalescing operator(??) requires parens when mixing with logical operators.",
  ModuleAttributeDifferentFromType:
    "The only accepted module attribute is `type`.",
  ModuleAttributeInvalidValue:
    "Only string literals are allowed as module attribute values.",
  ModuleAttributesWithDuplicateKeys: ({ key }: { key: string }) =>
    `Duplicate key "${key}" is not allowed in module attributes.`,
  ModuleExportNameHasLoneSurrogate: ({
    surrogateCharCode,
  }: {
    surrogateCharCode: number;
  }) =>
    `An export name cannot include a lone surrogate, found '\\u${surrogateCharCode.toString(
      16,
    )}'.`,
  ModuleExportUndefined: ({ localName }: { localName: string }) =>
    `Export '${localName}' is not defined.`,
  MultipleDefaultsInSwitch: "Multiple default clauses.",
  NewlineAfterThrow: "Illegal newline after throw.",
  NoCatchOrFinally: "Missing catch or finally clause.",
  NumberIdentifier: "Identifier directly after number.",
  NumericSeparatorInEscapeSequence:
    "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.",
  ObsoleteAwaitStar:
    "'await*' has been removed from the async functions proposal. Use Promise.all() instead.",
  OptionalChainingNoNew:
    "Constructors in/after an Optional Chain are not allowed.",
  OptionalChainingNoTemplate:
    "Tagged Template Literals are not allowed in optionalChain.",
  OverrideOnConstructor:
    "'override' modifier cannot appear on a constructor declaration.",
  ParamDupe: "Argument name clash.",
  PatternHasAccessor: "Object pattern can't contain getter or setter.",
  PatternHasMethod: "Object pattern can't contain methods.",
  PrivateInExpectedIn: ({ identifierName }: { identifierName: string }) =>
    `Private names are only allowed in property accesses (\`obj.#${identifierName}\`) or in \`in\` expressions (\`#${identifierName} in obj\`).`,
  PrivateNameRedeclaration: ({ identifierName }: { identifierName: string }) =>
    `Duplicate private name #${identifierName}.`,
  RecordExpressionBarIncorrectEndSyntaxType:
    "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  RecordExpressionBarIncorrectStartSyntaxType:
    "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  RecordExpressionHashIncorrectStartSyntaxType:
    "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
  RecordNoProto: "'__proto__' is not allowed in Record expressions.",
  RestTrailingComma: "Unexpected trailing comma after rest element.",
  SloppyFunction:
    "In non-strict mode code, functions can only be declared at top level or inside a block.",
  SloppyFunctionAnnexB:
    "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.",
  SourcePhaseImportRequiresDefault:
    'Only `import source x from "./module"` is valid.',
  StaticPrototype: "Classes may not have static property named prototype.",
  SuperNotAllowed:
    "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
  SuperPrivateField: "Private fields can't be accessed on super.",
  TrailingDecorator: "Decorators must be attached to a class element.",
  TupleExpressionBarIncorrectEndSyntaxType:
    "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  TupleExpressionBarIncorrectStartSyntaxType:
    "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.",
  TupleExpressionHashIncorrectStartSyntaxType:
    "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.",
  UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.",
  UnexpectedAwaitAfterPipelineBody:
    'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.',
  UnexpectedDigitAfterHash: "Unexpected digit after hash token.",
  UnexpectedImportExport:
    "'import' and 'export' may only appear at the top level.",
  UnexpectedKeyword: ({ keyword }: { keyword: string }) =>
    `Unexpected keyword '${keyword}'.`,
  UnexpectedLeadingDecorator:
    "Leading decorators must be attached to a class declaration.",
  UnexpectedLexicalDeclaration:
    "Lexical declaration cannot appear in a single-statement context.",
  UnexpectedNewTarget:
    "`new.target` can only be used in functions or class properties.",
  UnexpectedNumericSeparator:
    "A numeric separator is only allowed between two digits.",
  UnexpectedPrivateField: "Unexpected private name.",
  UnexpectedReservedWord: ({ reservedWord }: { reservedWord: string }) =>
    `Unexpected reserved word '${reservedWord}'.`,
  UnexpectedSuper: "'super' is only allowed in object methods and classes.",
  UnexpectedToken: ({
    expected,
    unexpected,
  }: {
    expected?: string | null;
    unexpected?: string | null;
  }) =>
    `Unexpected token${unexpected ? ` '${unexpected}'.` : ""}${
      expected ? `, expected "${expected}"` : ""
    }`,
  UnexpectedTokenUnaryExponentiation:
    "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
  UnexpectedUsingDeclaration:
    "Using declaration cannot appear in the top level when source type is `script`.",
  UnsupportedBind: "Binding should be performed on object property.",
  UnsupportedDecoratorExport:
    "A decorated export must export a class declaration.",
  UnsupportedDefaultExport:
    "Only expressions, functions or classes are allowed as the `default` export.",
  UnsupportedImport:
    "`import` can only be used in `import()` or `import.meta`.",
  UnsupportedMetaProperty: ({
    target,
    onlyValidPropertyName,
  }: {
    target: string;
    onlyValidPropertyName: string;
  }) =>
    `The only valid meta property for ${target} is ${target}.${onlyValidPropertyName}.`,
  UnsupportedParameterDecorator:
    "Decorators cannot be used to decorate parameters.",
  UnsupportedPropertyDecorator:
    "Decorators cannot be used to decorate object literal properties.",
  UnsupportedSuper:
    "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).",
  UnterminatedComment: "Unterminated comment.",
  UnterminatedRegExp: "Unterminated regular expression.",
  UnterminatedString: "Unterminated string constant.",
  UnterminatedTemplate: "Unterminated template.",
  UsingDeclarationExport: "Using declaration cannot be exported.",
  UsingDeclarationHasBindingPattern:
    "Using declaration cannot have destructuring patterns.",
  VarRedeclaration: ({ identifierName }: { identifierName: string }) =>
    `Identifier '${identifierName}' has already been declared.`,
  YieldBindingIdentifier:
    "Can not use 'yield' as identifier inside a generator.",
  YieldInParameter: "Yield expression is not allowed in formal parameters.",
  ZeroDigitNumericSeparator:
    "Numeric separator can not be used after leading 0.",
} satisfies ParseErrorTemplates;
