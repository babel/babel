import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  const surrogate = /[\ud800-\udfff]/g;
  const unicodeEscape = /(\\+)u\{([0-9a-fA-F]+)\}/g;

  function replaceUnicodeEscapes(str) {
    return str.replace(unicodeEscape, (match, backslashes, codePoint) => {
      if (backslashes.length % 2 === 0) {
        return match;
      }
      return String.fromCodePoint(parseInt(codePoint, 16));
    });
  }

  return {
    name: "transform-unicode-escapes",
    visitor: {
      Identifier(path) {
        const { node, key } = path;
        const { name } = node;
        const replaced = name.replace(surrogate, c => {
          c = c
            .charCodeAt(0)
            .toString(16)
            .padStart(4);
          return `\\u${c}`;
        });
        if (name === replaced) return;

        if (key === "key") {
          path.replaceWith(t.stringLiteral(name));
          return;
        }

        const { parentPath } = path;
        if (
          parentPath.isMemberExpression({ property: node }) ||
          parentPath.isOptionalMemberExpression({ property: node })
        ) {
          parentPath.node.computed = true;
          path.replaceWith(t.stringLiteral(name));
          return;
        }

        throw path.buildCodeFrameError(
          `Can't represent "${name}" as a bare identifier`,
        );
      },

      "StringLiteral|DirectiveLiteral"(path) {
        const { node } = path;
        const { extra } = node;

        if (extra?.raw) {
          extra.raw = replaceUnicodeEscapes(extra.raw);
        } else {
          node.value = replaceUnicodeEscapes(node.value);
        }
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
