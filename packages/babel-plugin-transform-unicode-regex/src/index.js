import * as regex from "@babel/helper-regex";

export default function() {
  return {
    visitor: regex.buildRegexpVisitor({
      filter: node => regex.is(node, "u"),
      manipulateFlags: flags => flags.delete("u"),
      manipulateOptions: options => ({
        ...options,
        useUnicodeFlag: false,
      }),
    }),
  };
}
