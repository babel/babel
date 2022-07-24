// https://github.com/airbnb/babel-plugin-dynamic-import-node/blob/master/src/utils.js
declare module "babel-plugin-dynamic-import-node/utils" {
  import type { PluginAPI, PluginPass } from "@babel/core";
  import type { NodePath } from "@babel/traverse";
  import type * as t from "@babel/types";
  function getImportSource(
    t: typeof import("@babel/types"),
    callNode: t.CallExpression
  ): t.Expression;

  function createDynamicImportTransform({
    template,
    types: t,
  }: PluginAPI): (context: PluginPass, path: NodePath) => void;

  export { getImportSource, createDynamicImportTransform };
}
