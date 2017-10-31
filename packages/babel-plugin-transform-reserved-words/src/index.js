import { types as t } from "@babel/core";

export default function() {
  return {
    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (!t.isValidES3Identifier(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
}
