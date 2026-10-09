import type { types as t } from "@babel/core";
import { FEATURES, hasFeature } from "./features.ts";

import type { RegexpuOptions } from "regexpu-core";

export function generateRegexpuOptions(
  pattern: string,
  toTransform: number,
): RegexpuOptions {
  const feat = (name: keyof typeof FEATURES) => {
    return hasFeature(toTransform, FEATURES[name]) ? "transform" : false;
  };

  const featDuplicateNamedGroups = (): "transform" | false => {
    if (!feat("duplicateNamedCaptureGroups")) return false;

    // This can return false positive, for example for /\(?<a>\)/.
    // However, it's such a rare occurrence that it's ok to compile
    // the regexp even if we only need to compile regexps with
    // duplicate named capturing groups.
    // The $ is to exit early for malicious input such as \(?<\(?<\(?<...
    const regex = /\(\?<([^>]+)(>|$)/g;
    const seen = new Set();
    for (
      let match;
      (match = regex.exec(pattern)) && match[2];
      seen.add(match[1])
    ) {
      if (seen.has(match[1])) return "transform";
    }
    return false;
  };

  return {
    unicodeFlag: feat("unicodeFlag"),
    unicodeSetsFlag: feat("unicodeSetsFlag"),
    dotAllFlag: feat("dotAllFlag"),
    unicodePropertyEscapes: feat("unicodePropertyEscape"),
    namedGroups: feat("namedCaptureGroups") || featDuplicateNamedGroups(),
    onNamedGroup: () => {},
    modifiers: feat("modifiers"),
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
      /\\p\{/i.test(pattern)
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

  if (options.modifiers === "transform" && /\(\?[\w-]+:/.test(pattern)) {
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
