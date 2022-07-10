import type { PluginPass } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import type * as t from "@babel/types";
declare module "js-tokens" {
  // TODO(Babel 8): Remove this
  export { default } from "js-tokens-BABEL_8_BREAKING-true";
  export * from "js-tokens-BABEL_8_BREAKING-true";
}

declare module "@babel/preset-modules/lib/plugins/transform-async-arrows-in-class" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "@babel/preset-modules/lib/plugins/transform-edge-default-parameters" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "@babel/preset-modules/lib/plugins/transform-edge-function-name" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "@babel/preset-modules/lib/plugins/transform-tagged-template-caching" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "@babel/preset-modules/lib/plugins/transform-safari-block-shadowing" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "@babel/preset-modules/lib/plugins/transform-safari-for-shadowing" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "babel-plugin-polyfill-corejs2" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "babel-plugin-polyfill-corejs3" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
declare module "babel-plugin-polyfill-regenerator" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}

declare module "regenerator-transform" {
  let plugin: ReturnType<typeof declare>;
  export = { default: plugin };
}
