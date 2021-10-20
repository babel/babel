import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

export function assertFieldTransformed(
  path: NodePath<t.ClassProperty | t.ClassDeclaration>,
) {
  // TODO (Babel 8): Also check path.node.definite

  if (path.node.declare) {
    throw path.buildCodeFrameError(
      `TypeScript 'declare' fields must first be transformed by ` +
        `@babel/plugin-transform-typescript.\n` +
        `If you have already enabled that plugin (or '@babel/preset-typescript'), make sure ` +
        `that it runs before any plugin related to additional class features:\n` +
        ` - @babel/plugin-proposal-class-properties\n` +
        ` - @babel/plugin-proposal-private-methods\n` +
        ` - @babel/plugin-proposal-decorators`,
    );
  }
}
