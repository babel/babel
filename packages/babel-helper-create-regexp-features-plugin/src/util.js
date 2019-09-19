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
  return {
    useUnicodeFlag,
    onNamedGroup: () => {},
    namedGroup,
    unicodePropertyEscape,
    dotAllFlag,
    lookbehind: true,
  };
}
