import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import type { NodePath } from "@babel/core";

function needsWrapping(node: t.Node): boolean {
  if (t.isLiteral(node) && !t.isTemplateLiteral(node)) {
    return false;
  }

  if (
    t.isCallExpression(node) ||
    t.isOptionalCallExpression(node) ||
    t.isNewExpression(node)
  ) {
    return needsWrapping(node.callee) || node.arguments.some(needsWrapping);
  }

  if (t.isTemplateLiteral(node)) {
    return node.expressions.some(needsWrapping);
  }

  if (t.isTaggedTemplateExpression(node)) {
    return needsWrapping(node.tag) || needsWrapping(node.quasi);
  }

  if (t.isArrayExpression(node)) {
    return node.elements.some(needsWrapping);
  }

  if (t.isObjectExpression(node)) {
    return node.properties.some(prop => {
      if (t.isObjectProperty(prop)) {
        return (
          needsWrapping(prop.value) ||
          (prop.computed && needsWrapping(prop.key))
        );
      }
      if (t.isObjectMethod(prop)) {
        return false;
      }
      return false;
    });
  }

  if (t.isMemberExpression(node) || t.isOptionalMemberExpression(node)) {
    return (
      needsWrapping(node.object) ||
      (node.computed && needsWrapping(node.property))
    );
  }

  if (
    t.isFunctionExpression(node) ||
    t.isArrowFunctionExpression(node) ||
    t.isClassExpression(node)
  ) {
    return false;
  }

  if (t.isThisExpression(node)) {
    return false;
  }

  if (t.isSequenceExpression(node)) {
    return node.expressions.some(needsWrapping);
  }

  // Is an identifier, or anything else not covered above
  return true;
}

function wrapInitializer(
  path: NodePath<t.ClassProperty | t.ClassPrivateProperty>,
) {
  const { value } = path.node;

  if (value && needsWrapping(value)) {
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
