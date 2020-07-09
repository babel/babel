import { tokTypes as tt } from "@babel/core";

function convertTemplateType(tokens) {
  let curlyBrace = null;
  let templateTokens = [];
  const result = [];

  function addTemplateType() {
    const start = templateTokens[0];
    const end = templateTokens[templateTokens.length - 1];

    const value = templateTokens.reduce((result, token) => {
      if (token.value) {
        result += token.value;
      } else if (token.type !== tt.template) {
        result += token.type.label;
      }

      return result;
    }, "");

    result.push({
      type: "Template",
      value: value,
      start: start.start,
      end: end.end,
      loc: {
        start: start.loc.start,
        end: end.loc.end,
      },
    });

    templateTokens = [];
  }

  tokens.forEach(token => {
    switch (token.type) {
      case tt.backQuote:
        if (curlyBrace) {
          result.push(curlyBrace);
          curlyBrace = null;
        }

        templateTokens.push(token);

        if (templateTokens.length > 1) {
          addTemplateType();
        }

        break;

      case tt.dollarBraceL:
        templateTokens.push(token);
        addTemplateType();
        break;

      case tt.braceR:
        if (curlyBrace) {
          result.push(curlyBrace);
        }

        curlyBrace = token;
        break;

      case tt.template:
        if (curlyBrace) {
          templateTokens.push(curlyBrace);
          curlyBrace = null;
        }

        templateTokens.push(token);
        break;

      case tt.eof:
        if (curlyBrace) {
          result.push(curlyBrace);
        }

        break;

      default:
        if (curlyBrace) {
          result.push(curlyBrace);
          curlyBrace = null;
        }

        result.push(token);
    }
  });

  return result;
}

function convertToken(token, source) {
  const type = token.type;
  token.range = [token.start, token.end];

  if (type === tt.name) {
    token.type = "Identifier";
  } else if (
    type === tt.semi ||
    type === tt.comma ||
    type === tt.parenL ||
    type === tt.parenR ||
    type === tt.braceL ||
    type === tt.braceR ||
    type === tt.slash ||
    type === tt.dot ||
    type === tt.bracketL ||
    type === tt.bracketR ||
    type === tt.ellipsis ||
    type === tt.arrow ||
    type === tt.pipeline ||
    type === tt.star ||
    type === tt.incDec ||
    type === tt.colon ||
    type === tt.question ||
    type === tt.template ||
    type === tt.backQuote ||
    type === tt.dollarBraceL ||
    type === tt.at ||
    type === tt.logicalOR ||
    type === tt.logicalAND ||
    type === tt.nullishCoalescing ||
    type === tt.bitwiseOR ||
    type === tt.bitwiseXOR ||
    type === tt.bitwiseAND ||
    type === tt.equality ||
    type === tt.relational ||
    type === tt.bitShift ||
    type === tt.plusMin ||
    type === tt.modulo ||
    type === tt.exponent ||
    type === tt.bang ||
    type === tt.tilde ||
    type === tt.doubleColon ||
    type === tt.hash ||
    type.isAssign
  ) {
    token.type = "Punctuator";
    if (!token.value) token.value = type.label;
  } else if (type === tt.jsxTagStart) {
    token.type = "Punctuator";
    token.value = "<";
  } else if (type === tt.jsxTagEnd) {
    token.type = "Punctuator";
    token.value = ">";
  } else if (type === tt.jsxName) {
    token.type = "JSXIdentifier";
  } else if (type === tt.jsxText) {
    token.type = "JSXText";
  } else if (type.keyword === "null") {
    token.type = "Null";
  } else if (type.keyword === "false" || type.keyword === "true") {
    token.type = "Boolean";
  } else if (type.keyword) {
    token.type = "Keyword";
  } else if (type === tt.num) {
    token.type = "Numeric";
    token.value = source.slice(token.start, token.end);
  } else if (type === tt.string) {
    token.type = "String";
    token.value = source.slice(token.start, token.end);
  } else if (type === tt.regexp) {
    token.type = "RegularExpression";
    const value = token.value;
    token.regex = {
      pattern: value.pattern,
      flags: value.flags,
    };
    token.value = `/${value.pattern}/${value.flags}`;
  } else if (type === tt.bigint) {
    token.type = "Numeric";
    token.value = `${token.value}n`;
  } else if (type === tt.questionDot) {
    token.value = type.label;
  }
  if (typeof token.type !== "string") {
    // Acorn does not have rightAssociative
    delete token.type.rightAssociative;
  }

  return token;
}

export default function convertTokens(tokens, code) {
  return convertTemplateType(tokens)
    .filter(t => t.type !== "CommentLine" && t.type !== "CommentBlock")
    .map(t => convertToken(t, code));
}
