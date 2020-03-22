// @flow

const reservedWords = {
  keyword: [
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
  ],
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
const keywords = new Set(reservedWords.keyword);
const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);

/**
 * Checks if word is a reserved word in non-strict mode
 */
export function isReservedWord(word: string, inModule: boolean): boolean {
  return (inModule && word === "await") || word === "enum";
}

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
