import type { Token } from "./tokenizer/index.ts";
import type { SourceLocation } from "./util/location.ts";
import type { PlaceholderTypes } from "./plugins/placeholders.ts";
import type { ParseError } from "./parse-error.ts";
import type { ExportedTokenType } from "./tokenizer/types.ts";
import type * as N from "@babel/types";

interface CommentBase {
  type: "CommentBlock" | "CommentLine";
  value: string;
  start?: number | undefined;
  end?: number | undefined;
  loc?: SourceLocation | undefined;
}

export interface CommentBlock extends CommentBase {
  type: "CommentBlock";
}

export interface CommentLine extends CommentBase {
  type: "CommentLine";
}

export type Comment = CommentBlock | CommentLine;

// A whitespace containing comments
export interface CommentWhitespace {
  start: number;
  end: number;
  comments: Comment[];
  leadingNode: N.Node | null;
  trailingNode: N.Node | null;
  containerNode: N.Node | null;
}

export type ExportedToken = Omit<Token, "type"> & { type: ExportedTokenType };

export interface ParserOutput {
  comments: Comment[];
  errors: ParseError[];
  tokens?: (ExportedToken | Comment)[];
  locData?: Uint32Array;
}

export interface BaseNode {
  leadingComments?: Comment[] | null;
  innerComments?: Comment[] | null;
  trailingComments?: Comment[] | null;
  start?: number | null;
  end?: number | null;
  loc?: SourceLocation | null;
  range?: [number, number];
  extra?: Record<string, unknown>;
}

export type ESTreeNode =
  | ESTreeClassElement
  | ESTreeExpression
  | EstreePrivateIdentifier
  | EstreeProperty
  | EstreeRegExpLiteral;

export type ESTreeClassElement =
  | EstreeAccessorProperty
  | EstreeMethodDefinition
  | EstreePropertyDefinition
  | EstreeTSAbstractMethodDefinition
  | EstreeTSAbstractPropertyDefinition
  | EstreeTSAbstractAccessorProperty;

export type ESTreeLiteral = EstreeLiteral | EstreeBigIntLiteral;

export type ESTreeExpression =
  | EstreeChainExpression
  | EstreeImportExpression
  | ESTreeLiteral
  | EstreeTSEmptyBodyFunctionExpression;

export type Node = N.Node | ESTreeNode | TSTypeCastExpression;

export type BlockStatementLike = N.Program | N.BlockStatement;

export type NormalFunction = N.FunctionDeclaration | N.FunctionExpression;
export type Assignable = N.AssignmentExpression["left"];

export type ObjectOrClassMember =
  | N.ClassMethod
  | N.ClassProperty
  | N.ObjectMember;

export type ObjectMember = N.ObjectProperty | N.ObjectMethod;

export type ClassMember =
  | N.ClassMethod
  | N.ClassPrivateMethod
  | N.ClassProperty
  | N.ClassPrivateProperty
  | N.ClassAccessorProperty;

export type MethodLike =
  | N.ObjectMethod
  | N.ClassMethod
  | N.ClassPrivateMethod
  | N.TSDeclareMethod;

export type AnyImport = N.ImportDeclaration | N.TSImportEqualsDeclaration;
export type AnyExport =
  | N.ExportNamedDeclaration
  | N.ExportDefaultDeclaration
  | N.ExportAllDeclaration
  | N.TSExportAssignment
  | N.TSImportEqualsDeclaration
  | N.TSNamespaceExportDeclaration;

export type AssignmentProperty = N.ObjectProperty & {
  value: N.Identifier | N.Pattern | N.RestElement;
};

export type JSXElementTag = N.JSXOpeningElement | N.JSXClosingElement;
export type JSXFragmentTag = N.JSXOpeningFragment | N.JSXClosingFragment;
export type JSXTag = JSXElementTag | JSXFragmentTag;

export type FlowDeclare =
  | N.DeclareClass
  | N.DeclareExportDeclaration
  | N.DeclareExportAllDeclaration
  | N.DeclareFunction
  | N.DeclareVariable
  | N.DeclareModule
  | N.DeclareModuleExports
  | N.DeclareTypeAlias
  | N.DeclareOpaqueType
  | N.DeclareInterface;

export type FlowOtherTypeAnnotation =
  | N.AnyTypeAnnotation
  | N.BooleanTypeAnnotation
  | N.MixedTypeAnnotation
  | N.EmptyTypeAnnotation
  | N.ExistsTypeAnnotation
  | N.NumberTypeAnnotation
  | N.BigIntLiteralTypeAnnotation
  | N.StringTypeAnnotation
  | N.SymbolTypeAnnotation
  | N.NullLiteralTypeAnnotation
  | N.VoidTypeAnnotation
  | N.ThisTypeAnnotation
  | N.ArrayTypeAnnotation
  | N.NullableTypeAnnotation
  | N.IntersectionTypeAnnotation
  | N.UnionTypeAnnotation;

export type Accessibility = "public" | "protected" | "private";

export type VarianceAnnotations = "in" | "out";

export type TSKeywordTypeType =
  | "TSAnyKeyword"
  | "TSUnknownKeyword"
  | "TSNumberKeyword"
  | "TSObjectKeyword"
  | "TSBooleanKeyword"
  | "TSBigIntKeyword"
  | "TSStringKeyword"
  | "TSSymbolKeyword"
  | "TSVoidKeyword"
  | "TSUndefinedKeyword"
  | "TSNullKeyword"
  | "TSNeverKeyword"
  | "TSIntrinsicKeyword";

export type TSKeywordType = Extract<N.Node, { type: TSKeywordTypeType }>;

export type TSSignatureDeclaration =
  | N.TSCallSignatureDeclaration
  | N.TSConstructSignatureDeclaration
  | N.TSMethodSignature
  | N.TSFunctionType
  | N.TSConstructorType;

/**
 * TSTypeCastExpression is not a valid TS production, the parser
 * generates such code so that it can cast it to a valid pattern or
 * throw an error
 */
export interface TSTypeCastExpression extends BaseNode {
  type: "TSTypeCastExpression";
  expression: N.Expression;
  typeAnnotation: N.TSTypeAnnotation;
}

// ================
// Babel placeholders %%foo%%
// ================

export interface Placeholder<
  T extends PlaceholderTypes = PlaceholderTypes,
> extends BaseNode {
  type: "Placeholder";
  name: N.Identifier;
  expectedNode: T;
}

// ================
// Other
// ================
export interface ParseSubscriptState {
  optionalChainMember: boolean;
  maybeAsyncArrow: boolean;
  stop: boolean;
}

export interface ParseClassMemberState {
  hadConstructor: boolean;
  hadSuperClass: boolean;
}

// ESTree
export interface EstreeLiteral extends BaseNode {
  type: "Literal";
  value: any;
  raw: any;
}

interface EstreeRegExpLiteralRegex {
  pattern: string;
  flags: string;
}

export interface EstreeRegExpLiteral extends EstreeLiteral {
  regex: EstreeRegExpLiteralRegex;
}

export interface EstreeBigIntLiteral extends EstreeLiteral {
  value: number | null;
  bigint: string;
}

export interface EstreeProperty extends BaseNode {
  type: "Property";
  method: boolean;
  shorthand: boolean;
  key: N.Expression | EstreePrivateIdentifier;
  computed: boolean;
  value: N.Expression;
  decorators: N.Decorator[];
  kind?: "get" | "set" | "init";
  variance?: N.Variance | null;
  optional?: boolean;
}

interface EstreeMethodDefinitionBase extends BaseNode {
  static: boolean;
  key: N.Expression;
  computed: boolean;
  decorators: N.Decorator[];
  kind?: "get" | "set" | "method";

  accessibility?: Accessibility;
  override?: boolean;
  optional?: boolean;
}

export interface EstreeMethodDefinition extends EstreeMethodDefinitionBase {
  type: "MethodDefinition";
  value: N.FunctionExpression;
  variance?: N.Variance | null;
}

export interface EstreeImportExpression extends BaseNode {
  type: "ImportExpression";
  source: N.Expression;
  options?: N.Expression | null;
}

export interface EstreePrivateIdentifier extends BaseNode {
  type: "PrivateIdentifier";
  name: string;
}

interface EstreePropertyDefinitionBase extends BaseNode {
  static: boolean;
  key: N.Expression | EstreePrivateIdentifier;
  computed: boolean;

  accessibility?: Accessibility;
  override?: boolean;
  optional?: boolean;
  declare?: boolean;
  decorators?: N.Decorator[];
  definite?: boolean;
  readonly?: boolean;
  typeAnnotation?: N.TSTypeAnnotation | null;
}

export interface EstreePropertyDefinition extends EstreePropertyDefinitionBase {
  type: "PropertyDefinition";
  value: N.Expression;
}

export interface EstreeAccessorProperty extends EstreePropertyDefinitionBase {
  type: "AccessorProperty";
  value: N.Expression;
}

export interface EstreeChainExpression extends BaseNode {
  type: "ChainExpression";
  expression: N.Expression;
}

export interface DeclarationBase extends BaseNode {
  // TypeScript allows declarations to be prefixed by `declare`.
  //TODO: a FunctionDeclaration is never "declare", because it's a TSDeclareFunction instead.
  declare?: boolean;
}

export interface HasDecorators extends BaseNode {
  decorators?: N.Decorator[];
}

export interface TypeParameterDeclarationBase extends BaseNode {
  params: (N.TypeParameter | N.TSTypeParameter)[];
}

export interface TypeAnnotationBase extends BaseNode {
  typeAnnotation: N.Node;
}

export interface BodilessFunctionOrMethodBase extends HasDecorators {
  // TODO: Remove this. Should not assign "id" to methods.
  // https://github.com/babel/babylon/issues/535
  id: N.Identifier | undefined | null;
  params: (N.Pattern | N.TSParameterProperty)[];
  generator: boolean;
  async: boolean;
  // TODO: All not in spec
  expression: boolean;
  typeParameters?: TypeParameterDeclarationBase | null;
  returnType?: TypeAnnotationBase | null;
}

export interface EstreeTSEmptyBodyFunctionExpression
  extends BodilessFunctionOrMethodBase, DeclarationBase {
  type: "TSEmptyBodyFunctionExpression";
  body: null;
}

export interface EstreeTSAbstractMethodDefinition extends EstreeMethodDefinitionBase {
  type: "TSAbstractMethodDefinition";
  value: EstreeTSEmptyBodyFunctionExpression;
}

export interface EstreeTSAbstractPropertyDefinition extends EstreePropertyDefinitionBase {
  type: "TSAbstractPropertyDefinition";
  value: null;
}

export interface EstreeTSAbstractAccessorProperty extends EstreePropertyDefinitionBase {
  type: "TSAbstractAccessorProperty";
  value: null;
}

export type * from "@babel/types";
