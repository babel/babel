/* eslint max-len: 0 */

// @flow

import * as charCodes from "charcodes";
import { keywords } from "../tokenizer/types";

export {
  isIdentifierStart,
  isIdentifierChar,
} from "@babel/helper-validator-identifier";

const reservedWords = {
  strict: [
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield",
  ],
  strictBind: ["eval", "arguments"],
};

const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);

/**
 * Checks if word is a reserved word in non-strict mode
 */
export const isReservedWord = (word: string, inModule: boolean): boolean => {
  return (inModule && word === "await") || word === "enum";
};

/**
 * Checks if word is a reserved word in non-binding strict mode
 *
 * Includes non-strict reserved words
 */
export function isStrictReservedWord(word: string, inModule: boolean): boolean {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}

/**
 * Checks if word is a reserved word in binding strict mode, but it is allowed as
 * a normal identifier.
 */
export function isStrictBindOnlyReservedWord(word: string): boolean {
  return reservedWordsStrictBindSet.has(word);
}

/**
 * Checks if word is a reserved word in binding strict mode
 *
 * Includes non-strict reserved words and non-binding strict reserved words
 */
export function isStrictBindReservedWord(
  word: string,
  inModule: boolean,
): boolean {
  return (
    isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word)
  );
}

export function isKeyword(word: string): boolean {
  return keywords.has(word);
}

export const keywordRelationalOperator = /^in(stanceof)?$/;

// Test whether a current state character code and next character code is @

export function isIteratorStart(current: number, next: number): boolean {
  return current === charCodes.atSign && next === charCodes.atSign;
}
