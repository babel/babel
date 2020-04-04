import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  const surrogate = /[\ud800-\udfff]/g;
  const unicodeEscape = /(\\+)u\{([0-9a-fA-F]+)\}/g;

  function escape(code) {
    return "\\u" + code.toString(16).padStart(4, 0);
  }
  function replacer(match, backslashes, code) {
    if (backslashes.length % 2 === 0) {
      return match;
    }

    const char = String.fromCodePoint(parseInt(code, 16));
    const escaped = backslashes.slice(0, -1) + escape(char.charCodeAt(0));

    return char.length === 1 ? escaped : escaped + escape(char.charCodeAt(1));
  }
  function replaceUnicodeEscapes(str) {
    return str.replace(unicodeEscape, replacer);
  }

  return {
    name: "transform-unicode-escapes",
    visitor: {
      Identifier(path) {
        const { node, key } = path;
        const { name } = node;
        const replaced = name.replace(surrogate, escape);
        if (name === replaced) return;

        const str = t.inherits(t.stringLiteral(name), node);

        if (key === "key") {
          path.replaceWith(str);
          return;
        }

        const { parentPath } = path;
        if (
          parentPath.isMemberExpression({ property: node }) ||
          parentPath.isOptionalMemberExpression({ property: node })
        ) {
          parentPath.node.computed = true;
          path.replaceWith(str);
          return;
        }

        throw path.buildCodeFrameError(
          `Can't represent "${name}" as a bare identifier`,
        );
      },

      "StringLiteral|DirectiveLiteral"(path) {
        const { node } = path;
        const { extra } = node;

        if (extra?.raw) extra.raw = replaceUnicodeEscapes(extra.raw);
      },

      TemplateElement(path) {
        const { node, parentPath } = path;
        const { value } = node;

        value.cooked = replaceUnicodeEscapes(value.cooked);

        const raw = replaceUnicodeEscapes(value.raw);
        if (raw === value.raw) return;

        const grandParent = parentPath.parentPath;
        if (grandParent.isTaggedTemplateExpression()) {
          throw path.buildCodeFrameError(
            `Can't replace Unicode escape inside tagged template literal`,
          );
        }
        value.raw = raw;
      },
    },
  };
});
