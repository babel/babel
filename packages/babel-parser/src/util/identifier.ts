/* eslint max-len: 0 */

import * as charCodes from "charcodes";
import { isIdentifierStart } from "@babel/helper-validator-identifier";

export {
  isIdentifierStart,
  isIdentifierChar,
  isReservedWord,
  isStrictBindOnlyReservedWord,
  isStrictBindReservedWord,
  isStrictReservedWord,
  isKeyword,
} from "@babel/helper-validator-identifier";

export const keywordRelationalOperator = /^in(stanceof)?$/;

// Test whether a current state character code and next character code is @

export function isIteratorStart(
  current: number,
  next: number,
  next2: number,
): boolean {
  return (
    current === charCodes.atSign &&
    next === charCodes.atSign &&
    isIdentifierStart(next2)
  );
}

// This is the comprehensive set of JavaScript reserved words
// If a word is in this set, it could be a reserved word,
// depending on sourceType/strictMode/binding info. In other words
// if a word is not in this set, it is not a reserved word under
// any circumstance.
const reservedWordLikeSet = new Set([
  "break",
  "case",
  "catch",
  "continue",
  "debugger",
  "default",
  "do",
  "else",
  "finally",
  "for",
  "function",
  "if",
  "return",
  "switch",
  "throw",
  "try",
  "var",
  "const",
  "while",
  "with",
  "new",
  "this",
  "super",
  "class",
  "extends",
  "export",
  "import",
  "null",
  "true",
  "false",
  "in",
  "instanceof",
  "typeof",
  "void",
  "delete",
  // strict
  "implements",
  "interface",
  "let",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  // strictBind
  "eval",
  "arguments",
  // reservedWorkLike
  "enum",
  "await",
]);

export function canBeReservedWord(word: string): boolean {
  return reservedWordLikeSet.has(word);
}
