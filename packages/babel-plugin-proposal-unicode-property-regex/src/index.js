import * as regex from "@babel/helper-regex";

export default function(api, options) {
  const { useUnicodeFlag = true } = options;
  if (typeof useUnicodeFlag !== "boolean") {
    throw new Error(".useUnicodeFlag must be a boolean, or undefined");
  }

  return {
    visitor: regex.buildRegexpVisitor({
      filter: node => regex.is(node, "u"),
      manipulateFlags: useUnicodeFlag ? undefined : flags => flags.delete("u"),
      manipulateOptions: options => ({
        ...options,
        unicodePropertyEscape: true,
        useUnicodeFlag,
      }),
    }),
  };
}
