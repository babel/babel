import { types as t } from "../../../../lib/index.js";

export default function () {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "REPLACE_ME") {
          path.replaceWith(t.stringLiteral("Replaced!"));
        }
      },
    },
  };
}
