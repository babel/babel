import { isValidES3Identifier } from "../../babel-types";

export default function() {
  return {
    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (!isValidES3Identifier(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
}
