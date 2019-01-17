// @flow

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).

// The `startsExpr` property is used to determine whether an expression
// may be the “argument” subexpression of a `yield` expression or
// `yield` statement. It is set on all token types that may be at the
// start of a subexpression.

// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

const beforeExpr = true;
const startsExpr = true;
const isLoop = true;
const isAssign = true;
const prefix = true;
const postfix = true;

type TokenOptions = {
  keyword?: string,

  beforeExpr?: boolean,
  startsExpr?: boolean,
  rightAssociative?: boolean,
  isLoop?: boolean,
  isAssign?: boolean,
  prefix?: boolean,
  postfix?: boolean,
  binop?: ?number,
};

export class TokenType {
  label: string;
  keyword: ?string;
  beforeExpr: boolean;
  startsExpr: boolean;
  rightAssociative: boolean;
  isLoop: boolean;
  isAssign: boolean;
  prefix: boolean;
  postfix: boolean;
  binop: ?number;
  updateContext: ?(prevType: TokenType) => void;

  constructor(label: string, conf: TokenOptions = {}) {
    this.label = label;
    this.keyword = conf.keyword;
    this.beforeExpr = !!conf.beforeExpr;
    this.startsExpr = !!conf.startsExpr;
    this.rightAssociative = !!conf.rightAssociative;
    this.isLoop = !!conf.isLoop;
    this.isAssign = !!conf.isAssign;
    this.prefix = !!conf.prefix;
    this.postfix = !!conf.postfix;
    this.binop = conf.binop === 0 ? 0 : conf.binop || null;
    this.updateContext = null;
  }
}

function KeywordTokenType(keyword: string, options: TokenOptions = {}) {
  return new TokenType(keyword, { ...options, keyword });
}

function BinopTokenType(name: string, binop: number) {
  return new TokenType(name, { beforeExpr, binop });
}

export const types: { [name: string]: TokenType } = {
  num: new TokenType("num", { startsExpr }),
  bigint: new TokenType("bigint", { startsExpr }),
  regexp: new TokenType("regexp", { startsExpr }),
  string: new TokenType("string", { startsExpr }),
  name: new TokenType("name", { startsExpr }),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", { beforeExpr, startsExpr }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr, startsExpr }),
  braceBarL: new TokenType("{|", { beforeExpr, startsExpr }),
  braceR: new TokenType("}"),
  braceBarR: new TokenType("|}"),
  parenL: new TokenType("(", { beforeExpr, startsExpr }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", { beforeExpr }),
  semi: new TokenType(";", { beforeExpr }),
  colon: new TokenType(":", { beforeExpr }),
  doubleColon: new TokenType("::", { beforeExpr }),
  dot: new TokenType("."),
  question: new TokenType("?", { beforeExpr }),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", { beforeExpr }),
  template: new TokenType("template"),
  ellipsis: new TokenType("...", { beforeExpr }),
  backQuote: new TokenType("`", { startsExpr }),
  dollarBraceL: new TokenType("${", { beforeExpr, startsExpr }),
  at: new TokenType("@"),
  hash: new TokenType("#", { startsExpr }),

  // Special hashbang token.
  interpreterDirective: new TokenType("#!..."),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", { beforeExpr, isAssign }),
  assign: new TokenType("_=", { beforeExpr, isAssign }),
  incDec: new TokenType("++/--", { prefix, postfix, startsExpr }),
  bang: new TokenType("!", { beforeExpr, prefix, startsExpr }),
  tilde: new TokenType("~", { beforeExpr, prefix, startsExpr }),
  pipeline: BinopTokenType("|>", 0),
  nullishCoalescing: BinopTokenType("??", 1),
  logicalOR: BinopTokenType("||", 1),
  logicalAND: BinopTokenType("&&", 2),
  bitwiseOR: BinopTokenType("|", 3),
  bitwiseXOR: BinopTokenType("^", 4),
  bitwiseAND: BinopTokenType("&", 5),
  equality: BinopTokenType("==/!=", 6),
  relational: BinopTokenType("</>", 7),
  bitShift: BinopTokenType("<</>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr, binop: 9, prefix, startsExpr }),
  modulo: BinopTokenType("%", 10),
  star: BinopTokenType("*", 10),
  slash: BinopTokenType("/", 10),
  exponent: new TokenType("**", {
    beforeExpr,
    binop: 11,
    rightAssociative: true,
  }),
};

function makeKeywordProps(
  name: string,
  conf: any,
): PropertyDescriptor<TokenType> {
  return { value: KeywordTokenType(name, conf), enumerable: true };
}

// $FlowIssue
export const keywords = Object.create(null, {
  break: makeKeywordProps("break"),
  case: makeKeywordProps("case", { beforeExpr }),
  catch: makeKeywordProps("catch"),
  continue: makeKeywordProps("continue"),
  debugger: makeKeywordProps("debugger"),
  default: makeKeywordProps("default", { beforeExpr }),
  do: makeKeywordProps("do", { isLoop, beforeExpr }),
  else: makeKeywordProps("else", { beforeExpr }),
  finally: makeKeywordProps("finally"),
  for: makeKeywordProps("for", { isLoop }),
  function: makeKeywordProps("function", { startsExpr }),
  if: makeKeywordProps("if"),
  return: makeKeywordProps("return", { beforeExpr }),
  switch: makeKeywordProps("switch"),
  throw: makeKeywordProps("throw", { beforeExpr, prefix, startsExpr }),
  try: makeKeywordProps("try"),
  var: makeKeywordProps("var"),
  let: makeKeywordProps("let"),
  const: makeKeywordProps("const"),
  while: makeKeywordProps("while", { isLoop }),
  with: makeKeywordProps("with"),
  new: makeKeywordProps("new"),
  this: makeKeywordProps("this", { startsExpr }),
  super: makeKeywordProps("super", { startsExpr }),
  class: makeKeywordProps("class", { startsExpr }),
  extends: makeKeywordProps("extends", { beforeExpr }),
  export: makeKeywordProps("export"),
  import: makeKeywordProps("import", { startsExpr }),
  yield: makeKeywordProps("yield", { beforeExpr, startsExpr }),
  null: makeKeywordProps("null", { startsExpr }),
  true: makeKeywordProps("true", { startsExpr }),
  false: makeKeywordProps("false", { startsExpr }),
  in: makeKeywordProps("in", { beforeExpr, binop: 7 }),
  instanceof: makeKeywordProps("instanceof", { beforeExpr, binop: 7 }),
  typeof: makeKeywordProps("typeof", { beforeExpr, prefix, startsExpr }),
  void: makeKeywordProps("void", { beforeExpr, prefix, startsExpr }),
  delete: makeKeywordProps("delete", { beforeExpr, prefix, startsExpr }),
});

// Map keyword names to token types.
Object.keys(keywords).forEach(name => {
  types["_" + name] = keywords[name];
});
