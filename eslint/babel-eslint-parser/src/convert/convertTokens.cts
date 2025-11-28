import type { BabelToken } from "../types.cts";
import type * as t from "@babel/types";

function convertToken(
  token: BabelToken,
  source: string,
  tl: Record<string, any>,
) {
  const { type } = token;
  const { label } = type;

  const newToken: {
    type: string;
    range?: [number, number];
    value?: string;
    regex?: {
      pattern: string;
      flags: string;
    };
    loc?: t.SourceLocation | null;
  } = token as any;
  newToken.range = [token.start, token.end];

  if (label === tl.name) {
    const tokenValue = token.value;
    if (
      tokenValue === "let" ||
      tokenValue === "static" ||
      tokenValue === "yield"
    ) {
      newToken.type = "Keyword";
    } else {
      newToken.type = "Identifier";
    }
  } else if (
    label === tl.semi ||
    label === tl.comma ||
    label === tl.parenL ||
    label === tl.parenR ||
    label === tl.braceL ||
    label === tl.braceR ||
    label === tl.slash ||
    label === tl.dot ||
    label === tl.bracketL ||
    label === tl.bracketR ||
    label === tl.ellipsis ||
    label === tl.arrow ||
    label === tl.pipeline ||
    label === tl.star ||
    label === tl.incDec ||
    label === tl.colon ||
    label === tl.question ||
    label === tl.template ||
    label === tl.backQuote ||
    label === tl.dollarBraceL ||
    label === tl.at ||
    label === tl.logicalOR ||
    label === tl.logicalAND ||
    label === tl.nullishCoalescing ||
    label === tl.bitwiseOR ||
    label === tl.bitwiseXOR ||
    label === tl.bitwiseAND ||
    label === tl.equality ||
    label === tl.relational ||
    label === tl.bitShift ||
    label === tl.plusMin ||
    label === tl.modulo ||
    label === tl.exponent ||
    label === tl.bang ||
    label === tl.tilde ||
    label === tl.doubleColon ||
    label === tl.hash ||
    label === tl.questionDot ||
    label === tl.braceHashL ||
    label === tl.braceBarL ||
    label === tl.braceBarR ||
    label === tl.bracketHashL ||
    label === tl.bracketBarL ||
    label === tl.bracketBarR ||
    label === tl.doubleCaret ||
    label === tl.doubleAt ||
    type.isAssign
  ) {
    newToken.type = "Punctuator";
    newToken.value ??= label;
  } else if (label === tl.jsxTagStart) {
    newToken.type = "Punctuator";
    newToken.value = "<";
  } else if (label === tl.jsxTagEnd) {
    newToken.type = "Punctuator";
    newToken.value = ">";
  } else if (label === tl.jsxName) {
    newToken.type = "JSXIdentifier";
  } else if (label === tl.jsxText) {
    newToken.type = "JSXText";
  } else if (type.keyword === "null") {
    newToken.type = "Null";
  } else if (type.keyword === "false" || type.keyword === "true") {
    newToken.type = "Boolean";
  } else if (type.keyword) {
    newToken.type = "Keyword";
  } else if (label === tl.num) {
    newToken.type = "Numeric";
    newToken.value = source.slice(token.start, token.end);
  } else if (label === tl.string) {
    newToken.type = "String";
    newToken.value = source.slice(token.start, token.end);
  } else if (label === tl.regexp) {
    newToken.type = "RegularExpression";
    const value = token.value;
    newToken.regex = {
      pattern: value.pattern,
      flags: value.flags,
    };
    newToken.value = `/${value.pattern}/${value.flags}`;
  } else if (label === tl.bigint) {
    newToken.type = "Numeric";
    newToken.value = `${token.value}n`;
  } else if (label === tl.privateName) {
    newToken.type = "PrivateIdentifier";
  } else if (
    label === tl.templateNonTail ||
    label === tl.templateTail ||
    label === tl.Template
  ) {
    newToken.type = "Template";
  }
  if (!process.env.IS_PUBLISH) {
    // To minimize the jest-diff noise comparing Babel AST and third-party AST,
    // here we generate a deep copy of loc without identifierName and index
    newToken.loc = {
      end: {
        column: newToken.loc.end.column,
        line: newToken.loc.end.line,
      },
      start: {
        column: newToken.loc.start.column,
        line: newToken.loc.start.line,
      },
    } as any;
  }
  return newToken;
}

export = function convertTokens(
  tokens: BabelToken[],
  code: string,
  tokLabels: Record<string, any>,
) {
  const result = [];
  const templateTypeMergedTokens = tokens;
  // The last token is always tt.eof and should be skipped
  for (let i = 0, { length } = templateTypeMergedTokens; i < length - 1; i++) {
    const token = templateTypeMergedTokens[i];
    const tokenType = token.type;
    // @ts-expect-error(Babel 7 vs Babel 8) TODO(Babel 8)
    if (tokenType === "CommentLine" || tokenType === "CommentBlock") {
      continue;
    }

    result.push(convertToken(token, code, tokLabels));
  }

  return result;
};
