import type { NodePath, types as t } from "@babel/core";

export function assertFieldTransformed(
  path: NodePath<t.ClassProperty | t.ClassDeclaration>,
) {
  if (
    path.node.declare ||
    path.node.abstract ||
    (process.env.BABEL_8_BREAKING
      ? path.isClassProperty({ definite: true })
      : false)
  ) {
    throw path.buildCodeFrameError(
      `TypeScript fields must first be transformed by ` +
        `@babel/plugin-transform-typescript.\n` +
        `If you have already enabled that plugin (or '@babel/preset-typescript'), make sure ` +
        `that it runs before any plugin related to additional class features:\n` +
        ` - @babel/plugin-transform-class-properties\n` +
        ` - @babel/plugin-transform-private-methods\n` +
        ` - @babel/plugin-proposal-decorators`,
    );
  }
}
