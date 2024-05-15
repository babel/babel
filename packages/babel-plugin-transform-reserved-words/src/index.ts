import { declare } from "@babel/helper-plugin-utils";
import { types as t, type NodePath } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-reserved-words",

    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path: NodePath<t.Identifier>) {
        if (!t.isValidES3Identifier(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
});
