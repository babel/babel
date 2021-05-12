import { FEATURES, hasFeature } from "./features";

export function generateRegexpuOptions(node, features) {
  let useUnicodeFlag = false,
    dotAllFlag = false,
    unicodePropertyEscape = false,
    namedGroup = false;
  const { flags, pattern } = node;
  const flagsIncludesU = flags.includes("u");

  if (flagsIncludesU) {
    if (!hasFeature(features, FEATURES.unicodeFlag)) {
      useUnicodeFlag = true;
    }
    if (
      hasFeature(features, FEATURES.unicodePropertyEscape) &&
      /\\[pP]{/.test(pattern)
    ) {
      unicodePropertyEscape = true;
    }
  }

  if (hasFeature(features, FEATURES.dotAllFlag) && flags.indexOf("s") >= 0) {
    dotAllFlag = true;
  }
  if (
    hasFeature(features, FEATURES.namedCaptureGroups) &&
    /\(\?<(?![=!])/.test(pattern)
  ) {
    namedGroup = true;
  }
  if (
    !namedGroup &&
    !unicodePropertyEscape &&
    !dotAllFlag &&
    (!flagsIncludesU || useUnicodeFlag)
  ) {
    return null;
  }
  // Now we have to feed regexpu-core the regex
  if (flagsIncludesU && flags.indexOf("s") >= 0) {
    // When flags includes u, `config.unicode` will be enabled even if `u` is supported natively.
    // In this case we have to enable dotAllFlag, otherwise `rewritePattern(/./su)` will return
    // incorrect result
    // https://github.com/mathiasbynens/regexpu-core/blob/v4.6.0/rewrite-pattern.js#L191
    dotAllFlag = true;
  }
  return {
    useUnicodeFlag,
    onNamedGroup: () => {},
    namedGroup,
    unicodePropertyEscape,
    dotAllFlag,
    lookbehind: true,
  };
}
