import { keywordLikeWord } from "../../../lib/parser/statement.js";
import { keywords } from "../../../lib/tokenizer/types.js";
import { isKeyword, isReservedWord } from "../../../lib/util/identifier.js";

describe("keywordLikeWord", () => {
  // The words isReservedWordOnNewLineAfterLet checks after matching
  // keywordLikeWord: keywords and `enum`
  const reservedWords = [...keywords.keys()].filter(
    word => isKeyword(word) || isReservedWord(word, false),
  );

  it("covers the keywords and `enum`", () => {
    expect(reservedWords).toContain("instanceof");
    expect(reservedWords).toContain("enum");
  });

  it.each(reservedWords)("fully matches %s", word => {
    keywordLikeWord.lastIndex = 0;
    expect(keywordLikeWord.test(word)).toBe(true);
    expect(keywordLikeWord.lastIndex).toBe(word.length);
  });

  it("has length bounds matching the shortest and longest word", () => {
    const lengths = reservedWords.map(word => word.length);
    expect(keywordLikeWord.source).toBe(
      `[a-z]{${Math.min(...lengths)},${Math.max(...lengths)}}`,
    );
  });
});
