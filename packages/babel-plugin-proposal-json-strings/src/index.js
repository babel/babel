import { declare } from "@babel/helper-plugin-utils";
import syntaxJsonStrings from "@babel/plugin-syntax-json-strings";

export default declare(api => {
  api.assertVersion(7);
  const regex = /(^|[^\\])([\u2028\u2029])/g;
  function replace(match, previous, separator) {
    return `${previous}\\u${separator.charCodeAt(0).toString(16)}`;
  }

  return {
    inherits: syntaxJsonStrings,

    visitor: {
      "DirectiveLiteral|StringLiteral"({ node }) {
        const { extra } = node;
        if (!extra || !extra.raw) return;

        extra.raw = extra.raw.replace(regex, replace);
      },
    },
  };
});
