// This file is auto-generated! Do not modify it directly.
// Run `yarn gulp bundle-dts` to re-generate it.
/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/no-redundant-type-constituents */
import { File, Expression } from '@babel/types';

declare const UnparenthesizedPipeBodyDescriptions: Set<"AssignmentExpression" | "ArrowFunctionExpression" | "ConditionalExpression" | "YieldExpression">;
type GetSetMemberType<T extends Set<any>> = T extends Set<infer M> ? M : unknown;
type UnparenthesizedPipeBodyTypes = GetSetMemberType<typeof UnparenthesizedPipeBodyDescriptions>;
declare const _default$4: {
    PipelineBodyNoArrow?: string | undefined;
    PipelineBodySequenceExpression?: string | undefined;
    PipelineHeadSequenceExpression?: string | undefined;
    PipelineTopicUnused?: string | undefined;
    PrimaryTopicNotAllowed?: string | undefined;
    PrimaryTopicRequiresSmartPipeline?: string | undefined;
    PipeBodyIsTighter: string;
    PipeTopicRequiresHackPipes: string;
    PipeTopicUnbound: string;
    PipeTopicUnconfiguredToken: ({ token }: {
        token: string;
    }) => string;
    PipeTopicUnused: string;
    PipeUnparenthesizedBody: ({ type }: {
        type: UnparenthesizedPipeBodyTypes;
    }) => string;
};

declare class Position {
    line: number;
    column: number;
    index: number;
    constructor(line: number, col: number, index: number);
}

declare const _default$3: {
    ImportMetaOutsideModule: {
        message: string;
        code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED";
    };
    ImportOutsideModule: {
        message: string;
        code: "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED";
    };
};
//# sourceMappingURL=module-errors.d.ts.map

type LValAncestor = {
    type: "UpdateExpression";
    prefix: boolean;
} | {
    type: "ArrayPattern" | "AssignmentExpression" | "CatchClause" | "ForOfStatement" | "FormalParameters" | "ForInStatement" | "ForStatement" | "ImportSpecifier" | "ImportNamespaceSpecifier" | "ImportDefaultSpecifier" | "ParenthesizedExpression" | "ObjectPattern" | "RestElement" | "VariableDeclarator";
};
declare const _default$2: {
    AccessorIsGenerator: ({ kind }: {
        kind: "get" | "set";
    }) => string;
    ArgumentsInClass: string;
    AsyncFunctionInSingleStatementContext: string;
    AwaitBindingIdentifier: string;
    AwaitBindingIdentifierInStaticBlock: string;
    AwaitExpressionFormalParameter: string;
    AwaitUsingNotInAsyncContext: string;
    AwaitNotInAsyncContext: string;
    BadGetterArity: string;
    BadSetterArity: string;
    BadSetterRestParameter: string;
    ConstructorClassField: string;
    ConstructorClassPrivateField: string;
    ConstructorIsAccessor: string;
    ConstructorIsAsync: string;
    ConstructorIsGenerator: string;
    DeclarationMissingInitializer: ({ kind, }: {
        kind: "await using" | "const" | "destructuring" | "using";
    }) => string;
    DecoratorArgumentsOutsideParentheses: string;
    DecoratorBeforeExport: string;
    DecoratorsBeforeAfterExport: string;
    DecoratorConstructor: string;
    DecoratorExportClass: string;
    DecoratorSemicolon: string;
    DecoratorStaticBlock: string;
    DeferImportRequiresNamespace: string;
    DeletePrivateField: string;
    DestructureNamedImport: string;
    DuplicateConstructor: string;
    DuplicateDefaultExport: string;
    DuplicateExport: ({ exportName }: {
        exportName: string;
    }) => string;
    DuplicateProto: string;
    DuplicateRegExpFlags: string;
    ElementAfterRest: string;
    EscapedCharNotAnIdentifier: string;
    ExportBindingIsString: ({ localName, exportName, }: {
        localName: string;
        exportName: string;
    }) => string;
    ExportDefaultFromAsIdentifier: string;
    ForInOfLoopInitializer: ({ type, }: {
        type: "ForInStatement" | "ForOfStatement";
    }) => string;
    ForInUsing: string;
    ForOfAsync: string;
    ForOfLet: string;
    GeneratorInSingleStatementContext: string;
    IllegalBreakContinue: ({ type, }: {
        type: "BreakStatement" | "ContinueStatement";
    }) => string;
    IllegalLanguageModeDirective: string;
    IllegalReturn: string;
    ImportAttributesUseAssert: string;
    ImportBindingIsString: ({ importName }: {
        importName: string;
    }) => string;
    ImportCallArity: string;
    ImportCallNotNewExpression: string;
    ImportCallSpreadArgument: string;
    ImportJSONBindingNotDefault: string;
    ImportReflectionHasAssertion: string;
    ImportReflectionNotBinding: string;
    IncompatibleRegExpUVFlags: string;
    InvalidBigIntLiteral: string;
    InvalidCodePoint: string;
    InvalidCoverDiscardElement: string;
    InvalidCoverInitializedName: string;
    InvalidDecimal: string;
    InvalidDigit: ({ radix }: {
        radix: number;
    }) => string;
    InvalidEscapeSequence: string;
    InvalidEscapeSequenceTemplate: string;
    InvalidEscapedReservedWord: ({ reservedWord }: {
        reservedWord: string;
    }) => string;
    InvalidIdentifier: ({ identifierName }: {
        identifierName: string;
    }) => string;
    InvalidLhs: ({ ancestor }: {
        ancestor: LValAncestor;
    }) => string;
    InvalidLhsBinding: ({ ancestor }: {
        ancestor: LValAncestor;
    }) => string;
    InvalidLhsOptionalChaining: ({ ancestor }: {
        ancestor: LValAncestor;
    }) => string;
    InvalidNumber: string;
    InvalidOrMissingExponent: string;
    InvalidOrUnexpectedToken: ({ unexpected }: {
        unexpected: string;
    }) => string;
    InvalidParenthesizedAssignment: string;
    InvalidPrivateFieldResolution: ({ identifierName, }: {
        identifierName: string;
    }) => string;
    InvalidPropertyBindingPattern: string;
    InvalidRecordProperty: string;
    InvalidRestAssignmentPattern: string;
    LabelRedeclaration: ({ labelName }: {
        labelName: string;
    }) => string;
    LetInLexicalBinding: string;
    LineTerminatorBeforeArrow: string;
    MalformedRegExpFlags: string;
    MissingClassName: string;
    MissingEqInAssignment: string;
    MissingSemicolon: string;
    MissingPlugin: ({ missingPlugin }: {
        missingPlugin: [string];
    }) => string;
    MissingOneOfPlugins: ({ missingPlugin }: {
        missingPlugin: string[];
    }) => string;
    MissingUnicodeEscape: string;
    MixingCoalesceWithLogical: string;
    ModuleAttributeDifferentFromType: string;
    ModuleAttributeInvalidValue: string;
    ModuleAttributesWithDuplicateKeys: ({ key }: {
        key: string;
    }) => string;
    ModuleExportNameHasLoneSurrogate: ({ surrogateCharCode, }: {
        surrogateCharCode: number;
    }) => string;
    ModuleExportUndefined: ({ localName }: {
        localName: string;
    }) => string;
    MultipleDefaultsInSwitch: string;
    NewlineAfterThrow: string;
    NoCatchOrFinally: string;
    NumberIdentifier: string;
    NumericSeparatorInEscapeSequence: string;
    ObsoleteAwaitStar: string;
    OptionalChainingNoNew: string;
    OptionalChainingNoTemplate: string;
    OverrideOnConstructor: string;
    ParamDupe: string;
    PatternHasAccessor: string;
    PatternHasMethod: string;
    PrivateInExpectedIn: ({ identifierName }: {
        identifierName: string;
    }) => string;
    PrivateNameRedeclaration: ({ identifierName }: {
        identifierName: string;
    }) => string;
    RecordExpressionBarIncorrectEndSyntaxType: string;
    RecordExpressionBarIncorrectStartSyntaxType: string;
    RecordExpressionHashIncorrectStartSyntaxType: string;
    RecordNoProto: string;
    RestTrailingComma: string;
    SloppyFunction: string;
    SloppyFunctionAnnexB: string;
    SourcePhaseImportRequiresDefault: string;
    StaticPrototype: string;
    SuperNotAllowed: string;
    SuperPrivateField: string;
    TrailingDecorator: string;
    TupleExpressionBarIncorrectEndSyntaxType: string;
    TupleExpressionBarIncorrectStartSyntaxType: string;
    TupleExpressionHashIncorrectStartSyntaxType: string;
    UnexpectedArgumentPlaceholder: string;
    UnexpectedAwaitAfterPipelineBody: string;
    UnexpectedDigitAfterHash: string;
    UnexpectedImportExport: string;
    UnexpectedKeyword: ({ keyword }: {
        keyword: string;
    }) => string;
    UnexpectedLeadingDecorator: string;
    UnexpectedLexicalDeclaration: string;
    UnexpectedNewTarget: string;
    UnexpectedNumericSeparator: string;
    UnexpectedPrivateField: string;
    UnexpectedReservedWord: ({ reservedWord }: {
        reservedWord: string;
    }) => string;
    UnexpectedSuper: string;
    UnexpectedToken: ({ expected, unexpected, }: {
        expected?: string | null;
        unexpected?: string | null;
    }) => string;
    UnexpectedTokenUnaryExponentiation: string;
    UnexpectedUsingDeclaration: string;
    UnexpectedVoidPattern: string;
    UnsupportedBind: string;
    UnsupportedDecoratorExport: string;
    UnsupportedDefaultExport: string;
    UnsupportedImport: string;
    UnsupportedMetaProperty: ({ target, onlyValidPropertyName, }: {
        target: string;
        onlyValidPropertyName: string;
    }) => string;
    UnsupportedParameterDecorator: string;
    UnsupportedPropertyDecorator: string;
    UnsupportedSuper: string;
    UnterminatedComment: string;
    UnterminatedRegExp: string;
    UnterminatedString: string;
    UnterminatedTemplate: string;
    UsingDeclarationExport: string;
    UsingDeclarationHasBindingPattern: string;
    VarRedeclaration: ({ identifierName }: {
        identifierName: string;
    }) => string;
    VoidPatternCatchClauseParam: string;
    VoidPatternInitializer: string;
    YieldBindingIdentifier: string;
    YieldInParameter: string;
    YieldNotInGeneratorFunction: string;
    ZeroDigitNumericSeparator: string;
};

declare const _default$1: {
    StrictDelete: string;
    StrictEvalArguments: ({ referenceName }: {
        referenceName: string;
    }) => string;
    StrictEvalArgumentsBinding: ({ bindingName }: {
        bindingName: string;
    }) => string;
    StrictFunction: string;
    StrictNumericEscape: string;
    StrictOctalLiteral: string;
    StrictWith: string;
};
//# sourceMappingURL=strict-mode-errors.d.ts.map

declare const _default: {
    ParseExpressionEmptyInput: string;
    ParseExpressionExpectsEOF: ({ unexpected }: {
        unexpected: number;
    }) => string;
};
//# sourceMappingURL=parse-expression-errors.d.ts.map

type Accessibility = "public" | "protected" | "private";
type VarianceAnnotations = "in" | "out";

type BABEL_8_BREAKING = true;
type IF_BABEL_7<V> = false extends BABEL_8_BREAKING ? V : never;

type Plugin$1 =
  | "asyncDoExpressions"
  | IF_BABEL_7<"asyncGenerators">
  | IF_BABEL_7<"bigInt">
  | IF_BABEL_7<"classPrivateMethods">
  | IF_BABEL_7<"classPrivateProperties">
  | IF_BABEL_7<"classProperties">
  | IF_BABEL_7<"classStaticBlock">
  | IF_BABEL_7<"decimal">
  | "decorators"
  | "decorators-legacy"
  | "decoratorAutoAccessors"
  | "deferredImportEvaluation"
  | "destructuringPrivate"
  | IF_BABEL_7<"deprecatedImportAssert">
  | "doExpressions"
  | IF_BABEL_7<"dynamicImport">
  | IF_BABEL_7<"explicitResourceManagement">
  | "exportDefaultFrom"
  | IF_BABEL_7<"exportNamespaceFrom">
  | "flow"
  | "flowComments"
  | "functionBind"
  | "functionSent"
  | "importMeta"
  | "jsx"
  | IF_BABEL_7<"jsonStrings">
  | IF_BABEL_7<"logicalAssignment">
  | IF_BABEL_7<"importAssertions">
  | IF_BABEL_7<"importReflection">
  | "moduleBlocks"
  | IF_BABEL_7<"moduleStringNames">
  | IF_BABEL_7<"nullishCoalescingOperator">
  | IF_BABEL_7<"numericSeparator">
  | IF_BABEL_7<"objectRestSpread">
  | IF_BABEL_7<"optionalCatchBinding">
  | IF_BABEL_7<"optionalChaining">
  | "partialApplication"
  | "placeholders"
  | IF_BABEL_7<"privateIn">
  | IF_BABEL_7<"regexpUnicodeSets">
  | "sourcePhaseImports"
  | "throwExpressions"
  | IF_BABEL_7<"topLevelAwait">
  | "v8intrinsic"
  | ParserPluginWithOptions[0];

type ParserPluginWithOptions =
  | ["discardBinding", { syntaxType: "void" }]
  | ["estree", { classFeatures?: boolean }]
  | IF_BABEL_7<["importAttributes", { deprecatedAssertSyntax: boolean }]>
  | IF_BABEL_7<["moduleAttributes", { version: "may-2020" }]>
  | ["optionalChainingAssign", { version: "2023-07" }]
  | ["pipelineOperator", PipelineOperatorPluginOptions]
  | ["flow", FlowPluginOptions]
  | ["typescript", TypeScriptPluginOptions];

type PluginConfig = Plugin$1 | ParserPluginWithOptions;

interface PipelineOperatorPluginOptions {
  proposal: BABEL_8_BREAKING extends false
    ? "minimal" | "fsharp" | "hack" | "smart"
    : "fsharp" | "hack";
  topicToken?: "%" | "#" | "@@" | "^^" | "^";
}

type FlowPluginOptions = BABEL_8_BREAKING extends true
  ? {
      all?: boolean;
      enums?: boolean;
    }
  : {
      all?: boolean;
    };

interface TypeScriptPluginOptions {
  dts?: boolean;
  disallowAmbiguousJSXLike?: boolean;
}

declare const JsxErrorTemplates: {
    AttributeIsEmpty: string;
    MissingClosingTagElement: ({ openingTagName }: {
        openingTagName: string;
    }) => string;
    MissingClosingTagFragment: string;
    UnexpectedSequenceExpression: string;
    UnexpectedToken: ({ unexpected, HTMLEntity, }: {
        unexpected: string;
        HTMLEntity: string;
    }) => string;
    UnsupportedJsxValue: string;
    UnterminatedJsxContent: string;
    UnwrappedAdjacentJSXElements: string;
};

type TsModifier = "readonly" | "abstract" | "declare" | "static" | "override" | "const" | Accessibility | VarianceAnnotations;
declare const TSErrorTemplates: {
    AbstractMethodHasImplementation: ({ methodName }: {
        methodName: string;
    }) => string;
    AbstractPropertyHasInitializer: ({ propertyName, }: {
        propertyName: string;
    }) => string;
    AccessorCannotBeOptional: string;
    AccesorCannotDeclareThisParameter: string;
    AccesorCannotHaveTypeParameters: string;
    ClassMethodHasDeclare: string;
    ClassMethodHasReadonly: string;
    ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference: string;
    ConstructorHasTypeParameters: string;
    DeclareAccessor: ({ kind }: {
        kind: "get" | "set";
    }) => string;
    DeclareClassFieldHasInitializer: string;
    DeclareFunctionHasImplementation: string;
    DuplicateAccessibilityModifier: ({ modifier, }: {
        modifier: Accessibility;
    }) => string;
    DuplicateModifier: ({ modifier }: {
        modifier: TsModifier;
    }) => string;
    EmptyHeritageClauseType: ({ token }: {
        token: "extends" | "implements";
    }) => string;
    EmptyTypeArguments: string;
    EmptyTypeParameters: string;
    ExpectedAmbientAfterExportDeclare: string;
    ImportAliasHasImportType: string;
    ImportReflectionHasImportType: string;
    IncompatibleModifiers: ({ modifiers, }: {
        modifiers: [TsModifier, TsModifier];
    }) => string;
    IndexSignatureHasAbstract: string;
    IndexSignatureHasAccessibility: ({ modifier, }: {
        modifier: Accessibility;
    }) => string;
    IndexSignatureHasDeclare: string;
    IndexSignatureHasOverride: string;
    IndexSignatureHasStatic: string;
    InitializerNotAllowedInAmbientContext: string;
    InvalidHeritageClauseType: ({ token }: {
        token: "extends" | "implements";
    }) => string;
    InvalidModifierOnAwaitUsingDeclaration: (modifier: TsModifier) => string;
    InvalidModifierOnTypeMember: ({ modifier }: {
        modifier: TsModifier;
    }) => string;
    InvalidModifierOnTypeParameter: ({ modifier }: {
        modifier: TsModifier;
    }) => string;
    InvalidModifierOnTypeParameterPositions: ({ modifier, }: {
        modifier: TsModifier;
    }) => string;
    InvalidModifierOnUsingDeclaration: (modifier: TsModifier) => string;
    InvalidModifiersOrder: ({ orderedModifiers, }: {
        orderedModifiers: [TsModifier, TsModifier];
    }) => string;
    InvalidPropertyAccessAfterInstantiationExpression: string;
    InvalidTupleMemberLabel: string;
    MissingInterfaceName: string;
    NonAbstractClassHasAbstractMethod: string;
    NonClassMethodPropertyHasAbstractModifier: string;
    OptionalTypeBeforeRequired: string;
    OverrideNotInSubClass: string;
    PatternIsOptional: string;
    PrivateElementHasAbstract: string;
    PrivateElementHasAccessibility: ({ modifier, }: {
        modifier: Accessibility;
    }) => string;
    ReadonlyForMethodSignature: string;
    ReservedArrowTypeParam: string;
    ReservedTypeAssertion: string;
    SetAccesorCannotHaveOptionalParameter: string;
    SetAccesorCannotHaveRestParameter: string;
    SetAccesorCannotHaveReturnType: string;
    SingleTypeParameterWithoutTrailingComma: ({ typeParameterName, }: {
        typeParameterName: string;
    }) => string;
    StaticBlockCannotHaveModifier: string;
    TupleOptionalAfterType: string;
    TypeAnnotationAfterAssign: string;
    TypeImportCannotSpecifyDefaultAndNamed: string;
    TypeModifierIsUsedInTypeExports: string;
    TypeModifierIsUsedInTypeImports: string;
    UnexpectedParameterModifier: string;
    UnexpectedReadonly: string;
    UnexpectedTypeAnnotation: string;
    UnexpectedTypeCastInParameter: string;
    UnsupportedImportTypeArgument: string;
    UnsupportedParameterPropertyKind: string;
    UnsupportedSignatureParameterKind: ({ type }: {
        type: string;
    }) => string;
    UsingDeclarationInAmbientContext: (kind: "using" | "await using") => string;
};

declare const FlowErrorTemplates: {
    AmbiguousConditionalArrow: string;
    AmbiguousDeclareModuleKind: string;
    AssignReservedType: ({ reservedType }: {
        reservedType: string;
    }) => string;
    DeclareClassElement: string;
    DeclareClassFieldInitializer: string;
    DuplicateDeclareModuleExports: string;
    EnumBooleanMemberNotInitialized: ({ memberName, enumName, }: {
        memberName: string;
        enumName: string;
    }) => string;
    EnumDuplicateMemberName: ({ memberName, enumName, }: {
        memberName: string;
        enumName: string;
    }) => string;
    EnumInconsistentMemberValues: ({ enumName }: {
        enumName: string;
    }) => string;
    EnumInvalidExplicitType: ({ invalidEnumType, enumName, }: {
        invalidEnumType: string;
        enumName: string;
    }) => string;
    EnumInvalidExplicitTypeUnknownSupplied: ({ enumName, }: {
        enumName: string;
    }) => string;
    EnumInvalidMemberInitializerPrimaryType: ({ enumName, memberName, explicitType, }: {
        enumName: string;
        memberName: string;
        explicitType: EnumExplicitType;
    }) => string;
    EnumInvalidMemberInitializerSymbolType: ({ enumName, memberName, }: {
        enumName: string;
        memberName: string;
        explicitType: EnumExplicitType;
    }) => string;
    EnumInvalidMemberInitializerUnknownType: ({ enumName, memberName, }: {
        enumName: string;
        memberName: string;
        explicitType: EnumExplicitType;
    }) => string;
    EnumInvalidMemberName: ({ enumName, memberName, suggestion, }: {
        enumName: string;
        memberName: string;
        suggestion: string;
    }) => string;
    EnumNumberMemberNotInitialized: ({ enumName, memberName, }: {
        enumName: string;
        memberName: string;
    }) => string;
    EnumStringMemberInconsistentlyInitialized: ({ enumName, }: {
        enumName: string;
    }) => string;
    GetterMayNotHaveThisParam: string;
    ImportReflectionHasImportType: string;
    ImportTypeShorthandOnlyInPureImport: string;
    InexactInsideExact: string;
    InexactInsideNonObject: string;
    InexactVariance: string;
    InvalidNonTypeImportInDeclareModule: string;
    MissingTypeParamDefault: string;
    NestedDeclareModule: string;
    NestedFlowComment: string;
    PatternIsOptional: {
        reasonCode?: string | undefined;
        message: string;
    };
    SetterMayNotHaveThisParam: string;
    SpreadVariance: string;
    ThisParamAnnotationRequired: string;
    ThisParamBannedInConstructor: string;
    ThisParamMayNotBeOptional: string;
    ThisParamMustBeFirst: string;
    ThisParamNoDefault: string;
    TypeBeforeInitializer: string;
    TypeCastInPattern: string;
    UnexpectedExplicitInexactInObject: string;
    UnexpectedReservedType: ({ reservedType }: {
        reservedType: string;
    }) => string;
    UnexpectedReservedUnderscore: string;
    UnexpectedSpaceBetweenModuloChecks: string;
    UnexpectedSpreadType: string;
    UnexpectedSubtractionOperand: string;
    UnexpectedTokenAfterTypeParameter: string;
    UnexpectedTypeParameterBeforeAsyncArrowFunction: string;
    UnsupportedDeclareExportKind: ({ unsupportedExportKind, suggestion, }: {
        unsupportedExportKind: string;
        suggestion: string;
    }) => string;
    UnsupportedStatementInDeclareModule: string;
    UnterminatedFlowComment: string;
};
type EnumExplicitType = null | "boolean" | "number" | "string" | "symbol";

type ParseError = SyntaxError & {
    missingPlugin?: string | string[];
    loc: Position;
    pos: number;
} & ErrorObjects;
type ToMessage<ErrorDetails> = (self: ErrorDetails) => string;
type ErrorToObject<T> = {
    [K in keyof T]: {
        code: T[K] extends {
            code: string;
        } ? T[K]["code"] : "BABEL_PARSER_SYNTAX_ERROR";
        reasonCode: K;
        details: T[K] extends {
            message: string | ToMessage<any>;
        } ? T[K]["message"] extends ToMessage<any> ? Parameters<T[K]["message"]>[0] : object : T[K] extends ToMessage<any> ? Parameters<T[K]>[0] : object;
    };
};
type ErrorToObjects<T, U = ErrorToObject<T>> = U[keyof U];
type ErrorObjects = ErrorToObjects<typeof _default$3> | ErrorToObjects<typeof _default$2> | ErrorToObjects<typeof _default$1> | ErrorToObjects<typeof _default> | ErrorToObjects<typeof _default$4> | ErrorToObjects<typeof TSErrorTemplates> | ErrorToObjects<typeof FlowErrorTemplates> | ErrorToObjects<typeof JsxErrorTemplates> | ErrorToObjects<typeof PlaceholderErrorTemplates>;

declare const PlaceholderErrorTemplates: {
    ClassNameIsRequired: string;
    UnexpectedSpace: string;
};

type Plugin = PluginConfig;

type SourceType = "script" | "commonjs" | "module" | "unambiguous";
interface Options {
    /**
     * By default, import and export declarations can only appear at a program's top level.
     * Setting this option to true allows them anywhere where a statement is allowed.
     */
    allowImportExportEverywhere?: boolean;
    /**
     * By default, await use is not allowed outside of an async function.
     * Set this to true to accept such code.
     */
    allowAwaitOutsideFunction?: boolean;
    /**
     * By default, a return statement at the top level raises an error.
     * Set this to true to accept such code.
     */
    allowReturnOutsideFunction?: boolean;
    /**
     * By default, new.target use is not allowed outside of a function or class.
     * Set this to true to accept such code.
     */
    allowNewTargetOutsideFunction?: boolean;
    /**
     * By default, super calls are not allowed outside of a method.
     * Set this to true to accept such code.
     */
    allowSuperOutsideMethod?: boolean;
    /**
     * By default, exported identifiers must refer to a declared variable.
     * Set this to true to allow export statements to reference undeclared variables.
     */
    allowUndeclaredExports?: boolean;
    /**
     * By default, yield use is not allowed outside of a generator function.
     * Set this to true to accept such code.
     */
    allowYieldOutsideFunction?: boolean;
    /**
     * By default, Babel parser JavaScript code according to Annex B syntax.
     * Set this to `false` to disable such behavior.
     */
    annexB?: boolean;
    /**
     * By default, Babel attaches comments to adjacent AST nodes.
     * When this option is set to false, comments are not attached.
     * It can provide up to 30% performance improvement when the input code has many comments.
     * @babel/eslint-parser will set it for you.
     * It is not recommended to use attachComment: false with Babel transform,
     * as doing so removes all the comments in output code, and renders annotations such as
     * /* istanbul ignore next *\/ nonfunctional.
     */
    attachComment?: boolean;
    /**
     * By default, Babel always throws an error when it finds some invalid code.
     * When this option is set to true, it will store the parsing error and
     * try to continue parsing the invalid input file.
     */
    errorRecovery?: boolean;
    /**
     * Indicate the mode the code should be parsed in.
     * Can be one of "script", "commonjs", "module", or "unambiguous". Defaults to "script".
     * "unambiguous" will make @babel/parser attempt to guess, based on the presence
     * of ES6 import or export statements.
     * Files with ES6 imports and exports are considered "module" and are otherwise "script".
     *
     * Use "commonjs" to parse code that is intended to be run in a CommonJS environment such as Node.js.
     */
    sourceType?: SourceType;
    /**
     * Correlate output AST nodes with their source filename.
     * Useful when generating code and source maps from the ASTs of multiple input files.
     */
    sourceFilename?: string;
    /**
     * By default, all source indexes start from 0.
     * You can provide a start index to alternatively start with.
     * Useful for integration with other source tools.
     */
    startIndex?: number;
    /**
     * By default, the first line of code parsed is treated as line 1.
     * You can provide a line number to alternatively start with.
     * Useful for integration with other source tools.
     */
    startLine?: number;
    /**
     * By default, the parsed code is treated as if it starts from line 1, column 0.
     * You can provide a column number to alternatively start with.
     * Useful for integration with other source tools.
     */
    startColumn?: number;
    /**
     * Array containing the plugins that you want to enable.
     */
    plugins?: Plugin[];
    /**
     * Should the parser work in strict mode.
     * Defaults to true if sourceType === 'module'. Otherwise, false.
     */
    strictMode?: boolean;
    /**
     * Adds a ranges property to each node: [node.start, node.end]
     */
    ranges?: boolean;
    /**
     * Adds all parsed tokens to a tokens property on the File node.
     */
    tokens?: boolean;
    /**
     * By default, the parser adds information about parentheses by setting
     * `extra.parenthesized` to `true` as needed.
     * When this option is `true` the parser creates `ParenthesizedExpression`
     * AST nodes instead of using the `extra` property.
     */
    createParenthesizedExpressions?: boolean;
    /**
     * By default, the parser parses import expressions as an `ImportExpression` node.
     * Set this to false to parse it as `CallExpression(Import, [Identifier(foo)])`.
     */
    createImportExpressions?: boolean;
}

type ParserOptions = Partial<Options>;
type ParseResult<Result extends File | Expression = File> = Result & {
    comments: File["comments"];
    errors: ParseError[];
    tokens?: File["tokens"];
};
/**
 * Parse the provided code as an entire ECMAScript program.
 */
declare function parse(input: string, options?: ParserOptions): ParseResult<File>;
declare function parseExpression(input: string, options?: ParserOptions): ParseResult<Expression>;

declare const tokTypes: {
  // todo(flow->ts) real token type
  [name: string]: any;
};

export { type FlowPluginOptions, type ParseError, type ParseResult, type ParserOptions, type PluginConfig as ParserPlugin, type PipelineOperatorPluginOptions, type TypeScriptPluginOptions, parse, parseExpression, tokTypes };
