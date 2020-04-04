import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  const surrogate = /[\ud800-\udfff]/g;
  const unicodeEscape = /(\\+)u\{([0-9a-fA-F]+)\}/g;

  function escape(code) {
    return "\\u" + code.toString(16).padStart(4, 0);
  }
  function replaceUnicodeEscapes(str, escapeCount = 1) {
    return str.replace(unicodeEscape, (match, backslashes, codePoint) => {
      if ((backslashes.length * escapeCount) % 2 === 0) {
        return match;
      }

      let code = parseInt(codePoint, 16);
      backslashes = backslashes.slice(0, -1);

      // https://github.com/mathiasbynens/String.fromCodePoint/blob/880fb778/fromcodepoint.js#L36-L44
      if (code <= 0xffff) {
        return `${backslashes}${escape(code)}`;
      }

      code -= 0x10000;
      const head = (code >> 10) + 0xd800;
      const tail = (code % 0x400) + 0xdc00;
      return `${backslashes}${escape(head)}${escape(tail)}`;
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

        // A string's value is already parsed, which means a "\u{0061}" is
        // already an "a", and a "\\u{0061}` is an "\u{0061}". So we don't want
        // to find a "\u" in the value (because dev escaped the "u" and didn't
        // write a unicode escape).
        node.value = replaceUnicodeEscapes(node.value, 2);
        if (extra?.raw) {
          extra.raw = replaceUnicodeEscapes(extra.raw);
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
