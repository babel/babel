export default function () {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      NumberLiteral(node) {
        // number octal like 0b10 or 0o70
        if (/^0[ob]/i.test(node.raw)) {
          node.raw = undefined;
        }
      },

      StringLiteral(node) {
        // unicode escape
        if (/\\[u]/gi.test(node.raw)) {
          node.raw = undefined;
        }
      }
    }
  };
}
