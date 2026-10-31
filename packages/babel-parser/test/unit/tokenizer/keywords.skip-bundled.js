import { keywordBuckets } from "../../../lib/tokenizer/index.js";
import { tokenLabelName } from "../../../lib/tokenizer/types.js";

describe("keywordBuckets", () => {
  it("buckets keywords by (length, first char code)", () => {
    // Keys show the bucket's index, `(length << 7) | firstCode`. The length
    // is padded so that Jest, which sorts keys as strings, lists them by length.
    const buckets = {};
    keywordBuckets.forEach((bucket, index) => {
      const words = [];
      for (let i = 0; i < bucket.length; i += 2) {
        // Each word is followed by its token type.
        expect(tokenLabelName(bucket[i + 1])).toBe(bucket[i]);
        words.push(bucket[i]);
      }
      const length = String(index >> 7).padStart(2, "0");
      const firstChar = String.fromCharCode(index & 127);
      buckets[`length ${length}, '${firstChar}' (${index})`] = words.join(" ");
    });
    expect(buckets).toMatchInlineSnapshot(`
      {
        "length 02, 'a' (353)": "as",
        "length 02, 'd' (356)": "do",
        "length 02, 'i' (361)": "in if is",
        "length 02, 'o' (367)": "of",
        "length 03, 'f' (486)": "for",
        "length 03, 'g' (487)": "get",
        "length 03, 'l' (492)": "let",
        "length 03, 'n' (494)": "new",
        "length 03, 's' (499)": "set",
        "length 03, 't' (500)": "try",
        "length 03, 'v' (502)": "var",
        "length 04, 'c' (611)": "case",
        "length 04, 'e' (613)": "else enum",
        "length 04, 'f' (614)": "from",
        "length 04, 'm' (621)": "meta",
        "length 04, 'n' (622)": "null",
        "length 04, 's' (627)": "sent sync",
        "length 04, 't' (628)": "this true type",
        "length 04, 'v' (630)": "void",
        "length 04, 'w' (631)": "with",
        "length 05, 'a' (737)": "async await",
        "length 05, 'b' (738)": "break",
        "length 05, 'c' (739)": "catch const class",
        "length 05, 'd' (740)": "defer",
        "length 05, 'f' (742)": "false",
        "length 05, 'i' (745)": "infer",
        "length 05, 'k' (747)": "keyof",
        "length 05, 'p' (752)": "proto",
        "length 05, 's' (755)": "super",
        "length 05, 't' (756)": "throw",
        "length 05, 'u' (757)": "using",
        "length 05, 'w' (759)": "while",
        "length 05, 'y' (761)": "yield",
        "length 06, 'a' (865)": "assert",
        "length 06, 'c' (867)": "checks",
        "length 06, 'd' (868)": "delete",
        "length 06, 'e' (869)": "export",
        "length 06, 'g' (871)": "global",
        "length 06, 'i' (873)": "import",
        "length 06, 'm' (877)": "mixins module",
        "length 06, 'o' (879)": "opaque",
        "length 06, 'r' (882)": "return",
        "length 06, 's' (883)": "switch source static struct",
        "length 06, 't' (884)": "typeof",
        "length 06, 'u' (885)": "unique",
        "length 07, 'a' (993)": "asserts",
        "length 07, 'd' (996)": "default declare",
        "length 07, 'e' (997)": "extends exports",
        "length 07, 'f' (998)": "finally",
        "length 07, 'r' (1010)": "require",
        "length 08, 'a' (1121)": "abstract",
        "length 08, 'c' (1123)": "continue",
        "length 08, 'd' (1124)": "debugger",
        "length 08, 'f' (1126)": "function",
        "length 08, 'r' (1138)": "readonly",
        "length 09, 'a' (1249)": "arguments",
        "length 09, 'i' (1257)": "intrinsic interface",
        "length 09, 'n' (1262)": "namespace",
        "length 09, 's' (1267)": "satisfies",
        "length 10, 'i' (1385)": "instanceof implements",
      }
    `);
  });
});
