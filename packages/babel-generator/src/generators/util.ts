// eslint-disable-next-line import/no-extraneous-dependencies
import * as charCodes from "charcodes";

const jsxEntityRE = /&(?:#x[\da-f]+|#\d+|[a-z\d]+);/iy;

// Whether `raw` is a JSX attribute string whose value is `value`, i.e. it
// equals `value` after decoding HTML entities
export function isJSXAttributeRaw(raw: string, value: string) {
  let j = 0;
  for (let i = 1; i < raw.length - 1; ) {
    if (raw.charCodeAt(i) === charCodes.ampersand) {
      jsxEntityRE.lastIndex = i;
      if (jsxEntityRE.test(raw)) {
        // The entity's code point is not checked: a JS string has no
        // entities, so its raw would differ from `value` in length
        if (j >= value.length) return false;
        j += value.codePointAt(j)! > 0xffff ? 2 : 1;
        i = jsxEntityRE.lastIndex;
        continue;
      }
    }
    if (raw.charCodeAt(i) !== value.charCodeAt(j)) return false;
    i++;
    j++;
  }
  return j === value.length;
}

export function jsxAttributeString(
  value: string,
  quotes: "single" | "double" | "backtick" | undefined,
) {
  // The parser decodes HTML entities, so an `&` that would start one must be
  // encoded
  value = value.replace(/&(?=#|[a-z\d]+;)/gi, "&amp;");
  const [quote, other] = quotes === "single" ? ["'", '"'] : ['"', "'"];
  if (value.includes(quote)) {
    if (!value.includes(other)) return other + value + other;
    value = value.replace(
      quote === '"' ? /"/g : /'/g,
      quote === '"' ? "&quot;" : "&apos;",
    );
  }
  return quote + value + quote;
}
