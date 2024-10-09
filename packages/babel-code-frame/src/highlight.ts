import type { Token as JSToken, JSXToken } from "js-tokens";
import jsTokens from "js-tokens";

import {
  isStrictReservedWord,
  isKeyword,
} from "@babel/helper-validator-identifier";

import { getDefs, type InternalTokenType } from "./defs.ts";

/**
 * Names that are always allowed as identifiers, but also appear as keywords
 * within certain syntactic productions.
 *
 * https://tc39.es/ecma262/#sec-keywords-and-reserved-words
 *
 * `target` has been omitted since it is very likely going to be a false
 * positive.
 */
const sometimesKeywords = new Set(["as", "async", "from", "get", "of", "set"]);

type Token = {
  type: InternalTokenType | "uncolored";
  value: string;
};

/**
 * RegExp to test for newlines in terminal.
 */
const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

/**
 * RegExp to test for the three types of brackets.
 */
const BRACKET = /^[()[\]{}]$/;

let tokenize: (
  text: string,
) => Generator<{ type: InternalTokenType | "uncolored"; value: string }>;

if (process.env.BABEL_8_BREAKING) {
  /**
   * Get the type of token, specifying punctuator type.
   */
  const getTokenType = function (
    token: JSToken | JSXToken,
  ): InternalTokenType | "uncolored" {
    if (token.type === "IdentifierName") {
      if (
        isKeyword(token.value) ||
        isStrictReservedWord(token.value, true) ||
        sometimesKeywords.has(token.value)
      ) {
        return "keyword";
      }

      if (token.value[0] !== token.value[0].toLowerCase()) {
        return "capitalized";
      }
    }

    if (token.type === "Punctuator" && BRACKET.test(token.value)) {
      return "uncolored";
    }

    if (token.type === "Invalid" && token.value === "@") {
      return "punctuator";
    }

    switch (token.type) {
      case "NumericLiteral":
        return "number";

      case "StringLiteral":
      case "JSXString":
      case "NoSubstitutionTemplate":
        return "string";

      case "RegularExpressionLiteral":
        return "regex";

      case "Punctuator":
      case "JSXPunctuator":
        return "punctuator";

      case "MultiLineComment":
      case "SingleLineComment":
        return "comment";

      case "Invalid":
      case "JSXInvalid":
        return "invalid";

      case "JSXIdentifier":
        return "jsxIdentifier";

      default:
        return "uncolored";
    }
  };

  /**
   * Turn a string of JS into an array of objects.
   */
  tokenize = function* (text: string): Generator<Token> {
    for (const token of jsTokens(text, { jsx: true })) {
      switch (token.type) {
        case "TemplateHead":
          yield { type: "string", value: token.value.slice(0, -2) };
          yield { type: "punctuator", value: "${" };
          break;

        case "TemplateMiddle":
          yield { type: "punctuator", value: "}" };
          yield { type: "string", value: token.value.slice(1, -2) };
          yield { type: "punctuator", value: "${" };
          break;

        case "TemplateTail":
          yield { type: "punctuator", value: "}" };
          yield { type: "string", value: token.value.slice(1) };
          break;

        default:
          yield {
            type: getTokenType(token),
            value: token.value,
          };
      }
    }
  };
} else {
  /**
   * RegExp to test for what seems to be a JSX tag name.
   */
  const JSX_TAG = /^[a-z][\w-]*$/i;

  // The token here is defined in js-tokens@4. However we don't bother
  // typing it since the whole block will be removed in Babel 8
  const getTokenType = function (token: any, offset: number, text: string) {
    if (token.type === "name") {
      if (
        isKeyword(token.value) ||
        isStrictReservedWord(token.value, true) ||
        sometimesKeywords.has(token.value)
      ) {
        return "keyword";
      }

      if (
        JSX_TAG.test(token.value) &&
        (text[offset - 1] === "<" || text.slice(offset - 2, offset) === "</")
      ) {
        return "jsxIdentifier";
      }

      if (token.value[0] !== token.value[0].toLowerCase()) {
        return "capitalized";
      }
    }

    if (token.type === "punctuator" && BRACKET.test(token.value)) {
      return "bracket";
    }

    if (
      token.type === "invalid" &&
      (token.value === "@" || token.value === "#")
    ) {
      return "punctuator";
    }

    return token.type;
  };

  tokenize = function* (text: string) {
    let match;
    while ((match = (jsTokens as any).default.exec(text))) {
      const token = (jsTokens as any).matchToToken(match);

      yield {
        type: getTokenType(token, match.index, text),
        value: token.value,
      };
    }
  };
}

export function highlight(text: string) {
  if (text === "") return "";

  const defs = getDefs(true);

  let highlighted = "";

  for (const { type, value } of tokenize(text)) {
    if (type in defs) {
      highlighted += value
        .split(NEWLINE)
        .map(str => defs[type as InternalTokenType](str))
        .join("\n");
    } else {
      highlighted += value;
    }
  }

  return highlighted;
}
