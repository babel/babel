import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import type { NodePath } from "@babel/core";

function wrapInitializer(
  path: NodePath<t.ClassProperty | t.ClassPrivateProperty>,
) {
  const { value } = path.node;

  if (value && !(t.isLiteral(value) && !t.isTemplateLiteral(value))) {
    path.node.value = t.callExpression(
      t.arrowFunctionExpression([], value),
      [],
    );
  }
}

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.16.0"));

  return {
    name: "plugin-bugfix-safari-class-field-initializer-scope",

    visitor: {
      ClassProperty(path) {
        wrapInitializer(path);
      },
      ClassPrivateProperty(path) {
        wrapInitializer(path);
      },
    },
  };
});
