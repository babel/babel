/* eslint-disable import/no-extraneous-dependencies */

declare module "js-tokens" {
  // TODO(Babel 8): Remove this
  export { default } from "js-tokens-BABEL_8_BREAKING-true";
  export * from "js-tokens-BABEL_8_BREAKING-true";
}

declare module "commander" {
  import type { Command } from "commander-BABEL_8_BREAKING-true";
  // TODO(Babel 8): Remove default export typings, they are for Babel 7 CJS only
  const _default: { program: Command };
  export { _default as default };
  export type * from "commander-BABEL_8_BREAKING-true";
}

declare module "@babel/preset-modules/lib/plugins/transform-async-arrows-in-class/index.js" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "@babel/preset-modules/lib/plugins/transform-edge-default-parameters/index.js" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "@babel/preset-modules/lib/plugins/transform-edge-function-name/index.js" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "@babel/preset-modules/lib/plugins/transform-tagged-template-caching/index.js" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "@babel/preset-modules/lib/plugins/transform-safari-block-shadowing/index.js" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "@babel/preset-modules/lib/plugins/transform-safari-for-shadowing/index.js" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "babel-plugin-polyfill-corejs2" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "babel-plugin-polyfill-corejs3" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
declare module "babel-plugin-polyfill-regenerator" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}

declare module "regenerator-transform" {
  import type { declare } from "@babel/helper-plugin-utils";
  let plugin: ReturnType<typeof declare>;
  let exports: { default: typeof plugin };
  export = exports;
}
