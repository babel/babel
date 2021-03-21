// @flow

import type { ErrorTemplates } from "../parser/error";

/* eslint sort-keys: "error" */

/**
 * @module parser/error-message
 */

// The Errors key follows https://cs.chromium.org/chromium/src/v8/src/common/message-template.h unless it does not exist
export const ErrorMessages: ErrorTemplates = Object.freeze({
  AccessorIsGenerator: {
    code: "AccessorIsGenerator",
    template: "A %0ter cannot be a generator",
  },
  ArgumentsInClass: {
    code: "ArgumentsInClass",
    template: "'arguments' is only allowed in functions and class methods",
  },
  AsyncFunctionInSingleStatementContext: {
    code: "AsyncFunctionInSingleStatementContext",
    template:
      "Async functions can only be declared at the top level or inside a block",
  },
  AwaitBindingIdentifier: {
    code: "AwaitBindingIdentifier",
    template: "Can not use 'await' as identifier inside an async function",
  },
  AwaitBindingIdentifierInStaticBlock: {
    code: "AwaitBindingIdentifierInStaticBlock",
    template: "Can not use 'await' as identifier inside a static block",
  },
  AwaitExpressionFormalParameter: {
    code: "AwaitExpressionFormalParameter",
    template: "await is not allowed in async function parameters",
  },
  AwaitNotInAsyncContext: {
    code: "AwaitNotInAsyncContext",
    template:
      "'await' is only allowed within async functions and at the top levels of modules",
  },
  AwaitNotInAsyncFunction: {
    code: "AwaitNotInAsyncFunction",
    template: "'await' is only allowed within async functions",
  },
  BadGetterArity: {
    code: "BadGetterArity",
    template: "getter must not have any formal parameters",
  },
  BadSetterArity: {
    code: "BadSetterArity",
    template: "setter must have exactly one formal parameter",
  },
  BadSetterRestParameter: {
    code: "BadSetterRestParameter",
    template: "setter function argument must not be a rest parameter",
  },
  ConstructorClassField: {
    code: "ConstructorClassField",
    template: "Classes may not have a field named 'constructor'",
  },
  ConstructorClassPrivateField: {
    code: "ConstructorClassPrivateField",
    template: "Classes may not have a private field named '#constructor'",
  },
  ConstructorIsAccessor: {
    code: "ConstructorIsAccessor",
    template: "Class constructor may not be an accessor",
  },
  ConstructorIsAsync: {
    code: "ConstructorIsAsync",
    template: "Constructor can't be an async function",
  },
  ConstructorIsGenerator: {
    code: "ConstructorIsGenerator",
    template: "Constructor can't be a generator",
  },
  DeclarationMissingInitializer: {
    code: "DeclarationMissingInitializer",
    template: "%0 require an initialization value",
  },
  DecoratorBeforeExport: {
    code: "DecoratorBeforeExport",
    template:
      "Decorators must be placed *before* the 'export' keyword. You can set the 'decoratorsBeforeExport' option to false to use the 'export @decorator class {}' syntax",
  },
  DecoratorConstructor: {
    code: "DecoratorConstructor",
    template:
      "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
  },
  DecoratorExportClass: {
    code: "DecoratorExportClass",
    template:
      "Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.",
  },
  DecoratorSemicolon: {
    code: "DecoratorSemicolon",
    template: "Decorators must not be followed by a semicolon",
  },
  DecoratorStaticBlock: {
    code: "DecoratorStaticBlock",
    template: "Decorators can't be used with a static block",
  },
  DeletePrivateField: {
    code: "DeletePrivateField",
    template: "Deleting a private field is not allowed",
  },
  DestructureNamedImport: {
    code: "DestructureNamedImport",
    template:
      "ES2015 named imports do not destructure. Use another statement for destructuring after the import.",
  },
  DuplicateConstructor: {
    code: "DuplicateConstructor",
    template: "Duplicate constructor in the same class",
  },
  DuplicateDefaultExport: {
    code: "DuplicateDefaultExport",
    template: "Only one default export allowed per module.",
  },
  DuplicateExport: {
    code: "DuplicateExport",
    template:
      "`%0` has already been exported. Exported identifiers must be unique.",
  },
  DuplicateProto: {
    code: "DuplicateProto",
    template: "Redefinition of __proto__ property",
  },
  DuplicateRegExpFlags: {
    code: "DuplicateRegExpFlags",
    template: "Duplicate regular expression flag",
  },
  ElementAfterRest: {
    code: "ElementAfterRest",
    template: "Rest element must be last element",
  },
  EscapedCharNotAnIdentifier: {
    code: "EscapedCharNotAnIdentifier",
    template: "Invalid Unicode escape",
  },
  ExportBindingIsString: {
    code: "ExportBindingIsString",
    template:
      "A string literal cannot be used as an exported binding without `from`.\n- Did you mean `export { '%0' as '%1' } from 'some-module'`?",
  },
  ExportDefaultFromAsIdentifier: {
    code: "ExportDefaultFromAsIdentifier",
    template: "'from' is not allowed as an identifier after 'export default'",
  },
  ForInOfLoopInitializer: {
    code: "ForInOfLoopInitializer",
    template: "%0 loop variable declaration may not have an initializer",
  },
  GeneratorInSingleStatementContext: {
    code: "GeneratorInSingleStatementContext",
    template:
      "Generators can only be declared at the top level or inside a block",
  },
  IllegalBreakContinue: {
    code: "IllegalBreakContinue",
    template: "Unsyntactic %0",
  },
  IllegalLanguageModeDirective: {
    code: "IllegalLanguageModeDirective",
    template:
      "Illegal 'use strict' directive in function with non-simple parameter list",
  },
  IllegalReturn: {
    code: "IllegalReturn",
    template: "'return' outside of function",
  },
  ImportBindingIsString: {
    code: "ImportBindingIsString",
    template:
      'A string literal cannot be used as an imported binding.\n- Did you mean `import { "%0" as foo }`?',
  },
  ImportCallArgumentTrailingComma: {
    code: "ImportCallArgumentTrailingComma",
    template: "Trailing comma is disallowed inside import(...) arguments",
  },
  ImportCallArity: {
    code: "ImportCallArity",
    template: "import() requires exactly %0",
  },
  ImportCallNotNewExpression: {
    code: "ImportCallNotNewExpression",
    template: "Cannot use new with import(...)",
  },
  ImportCallSpreadArgument: {
    code: "ImportCallSpreadArgument",
    template: "... is not allowed in import()",
  },
  InvalidBigIntLiteral: {
    code: "InvalidBigIntLiteral",
    template: "Invalid BigIntLiteral",
  },
  InvalidCodePoint: {
    code: "InvalidCodePoint",
    template: "Code point out of bounds",
  },
  InvalidDecimal: {
    code: "InvalidDecimal",
    template: "Invalid decimal",
  },
  InvalidDigit: {
    code: "InvalidDigit",
    template: "Expected number in radix %0",
  },
  InvalidEscapeSequence: {
    code: "InvalidEscapeSequence",
    template: "Bad character escape sequence",
  },
  InvalidEscapeSequenceTemplate: {
    code: "InvalidEscapeSequenceTemplate",
    template: "Invalid escape sequence in template",
  },
  InvalidEscapedReservedWord: {
    code: "InvalidEscapedReservedWord",
    template: "Escape sequence in keyword %0",
  },
  InvalidIdentifier: {
    code: "InvalidIdentifier",
    template: "Invalid identifier %0",
  },
  InvalidLhs: {
    code: "InvalidLhs",
    template: "Invalid left-hand side in %0",
  },
  InvalidLhsBinding: {
    code: "InvalidLhsBinding",
    template: "Binding invalid left-hand side in %0",
  },
  InvalidNumber: {
    code: "InvalidNumber",
    template: "Invalid number",
  },
  InvalidOrMissingExponent: {
    code: "InvalidOrMissingExponent",
    template: "Floating-point numbers require a valid exponent after the 'e'",
  },
  InvalidOrUnexpectedToken: {
    code: "InvalidOrUnexpectedToken",
    template: "Unexpected character '%0'",
  },
  InvalidParenthesizedAssignment: {
    code: "InvalidParenthesizedAssignment",
    template: "Invalid parenthesized assignment pattern",
  },
  InvalidPrivateFieldResolution: {
    code: "InvalidPrivateFieldResolution",
    template: "Private name #%0 is not defined",
  },
  InvalidPropertyBindingPattern: {
    code: "InvalidPropertyBindingPattern",
    template: "Binding member expression",
  },
  InvalidRecordProperty: {
    code: "InvalidRecordProperty",
    template:
      "Only properties and spread elements are allowed in record definitions",
  },
  InvalidRestAssignmentPattern: {
    code: "InvalidRestAssignmentPattern",
    template: "Invalid rest operator's argument",
  },
  LabelRedeclaration: {
    code: "LabelRedeclaration",
    template: "Label '%0' is already declared",
  },
  LetInLexicalBinding: {
    code: "LetInLexicalBinding",
    template:
      "'let' is not allowed to be used as a name in 'let' or 'const' declarations.",
  },
  LineTerminatorBeforeArrow: {
    code: "LineTerminatorBeforeArrow",
    template: "No line break is allowed before '=>'",
  },
  MalformedRegExpFlags: {
    code: "MalformedRegExpFlags",
    template: "Invalid regular expression flag",
  },
  MissingClassName: {
    code: "MissingClassName",
    template: "A class name is required",
  },
  MissingEqInAssignment: {
    code: "MissingEqInAssignment",
    template: "Only '=' operator can be used for specifying default value.",
  },
  MissingSemicolon: {
    code: "MissingSemicolon",
    template: "Missing semicolon",
  },
  MissingUnicodeEscape: {
    code: "MissingUnicodeEscape",
    template: "Expecting Unicode escape sequence \\uXXXX",
  },
  MixingCoalesceWithLogical: {
    code: "MixingCoalesceWithLogical",
    template:
      "Nullish coalescing operator(??) requires parens when mixing with logical operators",
  },
  ModuleAttributeDifferentFromType: {
    code: "ModuleAttributeDifferentFromType",
    template: "The only accepted module attribute is `type`",
  },
  ModuleAttributeInvalidValue: {
    code: "ModuleAttributeInvalidValue",
    template: "Only string literals are allowed as module attribute values",
  },
  ModuleAttributesWithDuplicateKeys: {
    code: "ModuleAttributesWithDuplicateKeys",
    template: 'Duplicate key "%0" is not allowed in module attributes',
  },
  ModuleExportNameHasLoneSurrogate: {
    code: "ModuleExportNameHasLoneSurrogate",
    template: "An export name cannot include a lone surrogate, found '\\u%0'",
  },
  ModuleExportUndefined: {
    code: "ModuleExportUndefined",
    template: "Export '%0' is not defined",
  },
  MultipleDefaultsInSwitch: {
    code: "MultipleDefaultsInSwitch",
    template: "Multiple default clauses",
  },
  NewlineAfterThrow: {
    code: "NewlineAfterThrow",
    template: "Illegal newline after throw",
  },
  NoCatchOrFinally: {
    code: "NoCatchOrFinally",
    template: "Missing catch or finally clause",
  },
  NumberIdentifier: {
    code: "NumberIdentifier",
    template: "Identifier directly after number",
  },
  NumericSeparatorInEscapeSequence: {
    code: "NumericSeparatorInEscapeSequence",
    template:
      "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences",
  },
  ObsoleteAwaitStar: {
    code: "ObsoleteAwaitStar",
    template:
      "await* has been removed from the async functions proposal. Use Promise.all() instead.",
  },
  OptionalChainingNoNew: {
    code: "OptionalChainingNoNew",
    template: "constructors in/after an Optional Chain are not allowed",
  },
  OptionalChainingNoTemplate: {
    code: "OptionalChainingNoTemplate",
    template: "Tagged Template Literals are not allowed in optionalChain",
  },
  ParamDupe: {
    code: "ParamDupe",
    template: "Argument name clash",
  },
  PatternHasAccessor: {
    code: "PatternHasAccessor",
    template: "Object pattern can't contain getter or setter",
  },
  PatternHasMethod: {
    code: "PatternHasMethod",
    template: "Object pattern can't contain methods",
  },
  PipelineBodyNoArrow: {
    code: "PipelineBodyNoArrow",
    template:
      'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized',
  },
  PipelineBodySequenceExpression: {
    code: "PipelineBodySequenceExpression",
    template: "Pipeline body may not be a comma-separated sequence expression",
  },
  PipelineHeadSequenceExpression: {
    code: "PipelineHeadSequenceExpression",
    template:
      "Pipeline head should not be a comma-separated sequence expression",
  },
  PipelineTopicUnused: {
    code: "PipelineTopicUnused",
    template: "Pipeline is in topic style but does not use topic reference",
  },
  PrimaryTopicNotAllowed: {
    code: "PrimaryTopicNotAllowed",
    template:
      "Topic reference was used in a lexical context without topic binding",
  },
  PrimaryTopicRequiresSmartPipeline: {
    code: "PrimaryTopicRequiresSmartPipeline",
    template:
      "Primary Topic Reference found but pipelineOperator not passed 'smart' for 'proposal' option.",
  },
  PrivateInExpectedIn: {
    code: "PrivateInExpectedIn",
    template:
      "Private names are only allowed in property accesses (`obj.#%0`) or in `in` expressions (`#%0 in obj`)",
  },
  PrivateNameRedeclaration: {
    code: "PrivateNameRedeclaration",
    template: "Duplicate private name #%0",
  },
  RecordExpressionBarIncorrectEndSyntaxType: {
    code: "RecordExpressionBarIncorrectEndSyntaxType",
    template:
      "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  },
  RecordExpressionBarIncorrectStartSyntaxType: {
    code: "RecordExpressionBarIncorrectStartSyntaxType",
    template:
      "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  },
  RecordExpressionHashIncorrectStartSyntaxType: {
    code: "RecordExpressionHashIncorrectStartSyntaxType",
    template:
      "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'",
  },
  RecordNoProto: {
    code: "RecordNoProto",
    template: "'__proto__' is not allowed in Record expressions",
  },
  RestTrailingComma: {
    code: "RestTrailingComma",
    template: "Unexpected trailing comma after rest element",
  },
  SloppyFunction: {
    code: "SloppyFunction",
    template:
      "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement",
  },
  StaticPrototype: {
    code: "StaticPrototype",
    template: "Classes may not have static property named prototype",
  },
  StrictDelete: {
    code: "StrictDelete",
    template: "Deleting local variable in strict mode",
  },
  StrictEvalArguments: {
    code: "StrictEvalArguments",
    template: "Assigning to '%0' in strict mode",
  },
  StrictEvalArgumentsBinding: {
    code: "StrictEvalArgumentsBinding",
    template: "Binding '%0' in strict mode",
  },
  StrictFunction: {
    code: "StrictFunction",
    template:
      "In strict mode code, functions can only be declared at top level or inside a block",
  },
  StrictNumericEscape: {
    code: "StrictNumericEscape",
    template: "The only valid numeric escape in strict mode is '\\0'",
  },
  StrictOctalLiteral: {
    code: "StrictOctalLiteral",
    template: "Legacy octal literals are not allowed in strict mode",
  },
  StrictWith: {
    code: "StrictWith",
    template: "'with' in strict mode",
  },
  SuperNotAllowed: {
    code: "SuperNotAllowed",
    template:
      "super() is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?",
  },
  SuperPrivateField: {
    code: "SuperPrivateField",
    template: "Private fields can't be accessed on super",
  },
  TrailingDecorator: {
    code: "TrailingDecorator",
    template: "Decorators must be attached to a class element",
  },
  TupleExpressionBarIncorrectEndSyntaxType: {
    code: "TupleExpressionBarIncorrectEndSyntaxType",
    template:
      "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  },
  TupleExpressionBarIncorrectStartSyntaxType: {
    code: "TupleExpressionBarIncorrectStartSyntaxType",
    template:
      "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'",
  },
  TupleExpressionHashIncorrectStartSyntaxType: {
    code: "TupleExpressionHashIncorrectStartSyntaxType",
    template:
      "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'",
  },
  UnexpectedArgumentPlaceholder: {
    code: "UnexpectedArgumentPlaceholder",
    template: "Unexpected argument placeholder",
  },
  UnexpectedAwaitAfterPipelineBody: {
    code: "UnexpectedAwaitAfterPipelineBody",
    template:
      'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal',
  },
  UnexpectedDigitAfterHash: {
    code: "UnexpectedDigitAfterHash",
    template: "Unexpected digit after hash token",
  },
  UnexpectedImportExport: {
    code: "UnexpectedImportExport",
    template: "'import' and 'export' may only appear at the top level",
  },
  UnexpectedKeyword: {
    code: "UnexpectedKeyword",
    template: "Unexpected keyword '%0'",
  },
  UnexpectedLeadingDecorator: {
    code: "UnexpectedLeadingDecorator",
    template: "Leading decorators must be attached to a class declaration",
  },
  UnexpectedLexicalDeclaration: {
    code: "UnexpectedLexicalDeclaration",
    template: "Lexical declaration cannot appear in a single-statement context",
  },
  UnexpectedNewTarget: {
    code: "UnexpectedNewTarget",
    template: "new.target can only be used in functions",
  },
  UnexpectedNumericSeparator: {
    code: "UnexpectedNumericSeparator",
    template: "A numeric separator is only allowed between two digits",
  },
  UnexpectedPrivateField: {
    code: "UnexpectedPrivateField",
    template:
      "Private names can only be used as the name of a class element (i.e. class C { #p = 42; #m() {} } )\n or a property of member expression (i.e. this.#p).",
  },
  UnexpectedReservedWord: {
    code: "UnexpectedReservedWord",
    template: "Unexpected reserved word '%0'",
  },
  UnexpectedSuper: {
    code: "UnexpectedSuper",
    template: "super is only allowed in object methods and classes",
  },
  UnexpectedToken: {
    code: "UnexpectedToken",
    template: "Unexpected token '%0'",
  },
  UnexpectedTokenUnaryExponentiation: {
    code: "UnexpectedTokenUnaryExponentiation",
    template:
      "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.",
  },
  UnsupportedBind: {
    code: "UnsupportedBind",
    template: "Binding should be performed on object property.",
  },
  UnsupportedDecoratorExport: {
    code: "UnsupportedDecoratorExport",
    template: "A decorated export must export a class declaration",
  },
  UnsupportedDefaultExport: {
    code: "UnsupportedDefaultExport",
    template:
      "Only expressions, functions or classes are allowed as the `default` export.",
  },
  UnsupportedImport: {
    code: "UnsupportedImport",
    template: "import can only be used in import() or import.meta",
  },
  UnsupportedMetaProperty: {
    code: "UnsupportedMetaProperty",
    template: "The only valid meta property for %0 is %0.%1",
  },
  UnsupportedParameterDecorator: {
    code: "UnsupportedParameterDecorator",
    template: "Decorators cannot be used to decorate parameters",
  },
  UnsupportedPropertyDecorator: {
    code: "UnsupportedPropertyDecorator",
    template: "Decorators cannot be used to decorate object literal properties",
  },
  UnsupportedSuper: {
    code: "UnsupportedSuper",
    template:
      "super can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop])",
  },
  UnterminatedComment: {
    code: "UnterminatedComment",
    template: "Unterminated comment",
  },
  UnterminatedRegExp: {
    code: "UnterminatedRegExp",
    template: "Unterminated regular expression",
  },
  UnterminatedString: {
    code: "UnterminatedString",
    template: "Unterminated string constant",
  },
  UnterminatedTemplate: {
    code: "UnterminatedTemplate",
    template: "Unterminated template",
  },
  VarRedeclaration: {
    code: "VarRedeclaration",
    template: "Identifier '%0' has already been declared",
  },
  YieldBindingIdentifier: {
    code: "YieldBindingIdentifier",
    template: "Can not use 'yield' as identifier inside a generator",
  },
  YieldInParameter: {
    code: "YieldInParameter",
    template: "Yield expression is not allowed in formal parameters",
  },
  ZeroDigitNumericSeparator: {
    code: "ZeroDigitNumericSeparator",
    template: "Numeric separator can not be used after leading 0",
  },
});

// These errors have a different error code than the key
export const SourceTypeModuleErrorMessages: ErrorTemplates = Object.freeze({
  ImportMetaOutsideModule: {
    code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
    template: `import.meta may appear only with 'sourceType: "module"'`,
  },
  ImportOutsideModule: {
    code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED",
    template: `'import' and 'export' may appear only with 'sourceType: "module"'`,
  },
});
