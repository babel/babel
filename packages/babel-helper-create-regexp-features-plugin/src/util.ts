import type { types as t } from "@babel/core";
import { FEATURES, hasFeature } from "./features";

type RegexpuOptions = {
  unicodeFlag: "transform" | false;
  unicodeSetsFlag: "transform" | "parse" | false;
  dotAllFlag: "transform" | false;
  unicodePropertyEscapes: "transform" | false;
  namedGroups: "transform" | false;
  onNamedGroup: (name: string, index: number) => void;
};

type Stable = 0;

export function generateRegexpuOptions(toTransform: number): RegexpuOptions {
  const feat = <IsStable extends 0 | 1>(
    name: keyof typeof FEATURES,
    ok: "transform" | (IsStable extends Stable ? never : "parse") = "transform",
  ) => {
    return hasFeature(toTransform, FEATURES[name]) ? ok : false;
  };

  return {
    unicodeFlag: feat<Stable>("unicodeFlag"),
    unicodeSetsFlag:
      feat("unicodeSetsFlag") || feat("unicodeSetsFlag_syntax", "parse"),
    dotAllFlag: feat<Stable>("dotAllFlag"),
    unicodePropertyEscapes: feat<Stable>("unicodePropertyEscape"),
    namedGroups: feat<Stable>("namedCaptureGroups"),
    onNamedGroup: () => {},
  };
}

export function canSkipRegexpu(
  node: t.RegExpLiteral,
  options: RegexpuOptions,
): boolean {
  const { flags, pattern } = node;

  if (flags.includes("v")) {
    if (options.unicodeSetsFlag === "transform") return false;
  }

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
  if (regexpuOptions.unicodeSetsFlag === "transform") {
    flags = flags.replace("v", "u");
  }
  if (regexpuOptions.unicodeFlag === "transform") {
    flags = flags.replace("u", "");
  }
  if (regexpuOptions.dotAllFlag === "transform") {
    flags = flags.replace("s", "");
  }
  return flags;
}
