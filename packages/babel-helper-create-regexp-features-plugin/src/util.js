import { FEATURES, hasFeature } from "./features";

export function generateRegexpuOptions(node, features) {
  let useUnicodeFlag = false,
    dotAllFlag = false,
    unicodePropertyEscape = false,
    namedGroup = false;
  const { flags, pattern } = node;
  const flagsIncludesU = flags.includes("u");

  if (flagsIncludesU === true) {
    if (hasFeature(features, FEATURES.unicodeFlag) === false) {
      useUnicodeFlag = true;
    }
    if (
      hasFeature(features, FEATURES.unicodePropertyEscape) === true &&
      /\\[pP]{/.test(pattern) === true
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
    namedGroup === false &&
    unicodePropertyEscape === false &&
    dotAllFlag === false &&
    !(flagsIncludesU === true && hasFeature(features, FEATURES.unicodeFlag))
  ) {
    return null;
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
