import { declare } from "@babel/helper-plugin-utils";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );
  const regex = /(\\*)([\u2028\u2029])/g;
  function replace(match: string, escapes: string, separator: string) {
    // If there's an odd number, that means the separator itself was escaped.
    // "\X" escapes X.
    // "\\X" escapes the backslash, so X is unescaped.
    const isEscaped = escapes.length % 2 === 1;
    if (isEscaped) return match;

    return `${escapes}\\u${separator.charCodeAt(0).toString(16)}`;
  }

  return {
    name: "transform-json-strings",
    inherits: USE_ESM
      ? undefined
      : IS_STANDALONE
        ? undefined
        : // eslint-disable-next-line no-restricted-globals
          require("@babel/plugin-syntax-json-strings").default,

    visitor: {
      "DirectiveLiteral|StringLiteral"({
        node,
      }: NodePath<t.DirectiveLiteral | t.StringLiteral>) {
        const { extra } = node;
        if (!extra?.raw) return;

        extra.raw = (extra.raw as string).replace(regex, replace);
      },
    },
  };
});
