import type { PluginAPI } from "@babel/core";
import type * as t from "@babel/types";
// https://github.com/airbnb/babel-plugin-dynamic-import-node/blob/master/src/utils.js
declare module "babel-plugin-dynamic-import-node/utils" {
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
