import type { NodePath, types as t } from "@babel/core";

const pluginOrderHint =
  `If you have already enabled that plugin (or '@babel/preset-typescript'), make sure ` +
  `that it runs before any plugin related to additional class features:\n` +
  ` - @babel/plugin-transform-class-properties\n` +
  ` - @babel/plugin-transform-private-methods\n` +
  ` - @babel/plugin-proposal-decorators`;

export function assertFieldTransformed(
  path: NodePath<t.ClassProperty | t.ClassDeclaration>,
) {
  if (path.node.declare || path.isClassProperty({ definite: true })) {
    throw path.buildCodeFrameError(
      `TypeScript 'declare' fields must first be transformed by ` +
        `@babel/plugin-transform-typescript.\n` +
        pluginOrderHint,
    );
  }
}

export function assertAccessorTransformed(
  path: NodePath<t.ClassAccessorProperty>,
) {
  // The TypeScript plugin removes them: they have no runtime semantics.
  const { node } = path;
  if (node.abstract || node.declare) {
    throw path.buildCodeFrameError(
      `TypeScript '${node.abstract ? "abstract" : "declare"}' accessors must ` +
        `first be removed by @babel/plugin-transform-typescript.\n` +
        pluginOrderHint,
    );
  }
}
