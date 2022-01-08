import type { types as t } from "@babel/core";
import { FEATURES, hasFeature } from "./features";

type RegexpuOptions = {
  unicodeFlag: "transform" | false;
  dotAllFlag: "transform" | false;
  unicodePropertyEscapes: "transform" | false;
  namedGroups: "transform" | false;
  onNamedGroup: (name: string, index: number) => void;
};

export function generateRegexpuOptions(toTransform: number): RegexpuOptions {
  const feat = (name: keyof typeof FEATURES) => {
    return hasFeature(toTransform, FEATURES[name]) ? "transform" : false;
  };

  return {
    unicodeFlag: feat("unicodeFlag"),
    dotAllFlag: feat("dotAllFlag"),
    unicodePropertyEscapes: feat("unicodePropertyEscape"),
    namedGroups: feat("namedCaptureGroups"),
    onNamedGroup: () => {},
  };
}

export function canSkipRegexpu(
  node: t.RegExpLiteral,
  options: RegexpuOptions,
): boolean {
  const { flags, pattern } = node;

  if (flags.includes("u")) {
    if (options.unicodeFlag === "transform") return false;
    if (
      options.unicodePropertyEscapes === "transform" &&
      /\\[pP]{/.test(pattern)
    ) {
      return false;
    }
  }

  if (flags.includes("s")) {
    if (options.dotAllFlag === "transform") return false;
  }

  if (options.namedGroups === "transform" && /\(\?<(?![=!])/.test(pattern)) {
    return false;
  }

  return true;
}

export function transformFlags(regexpuOptions: RegexpuOptions, flags: string) {
  if (regexpuOptions.unicodeFlag === "transform") {
    flags = flags.replace("u", "");
  }
  if (regexpuOptions.dotAllFlag === "transform") {
    flags = flags.replace("s", "");
  }
  return flags;
}
