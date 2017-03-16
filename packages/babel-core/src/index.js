export File from "./transformation/file";
export buildExternalHelpers from "./tools/build-external-helpers";
export resolvePlugin from "./config/helpers/resolve-plugin";
export resolvePreset from "./config/helpers/resolve-preset";

export { version } from "../package";
export { getEnv } from "./config/helpers/environment";

export * as messages from "babel-messages";
export * as types from "babel-types";
export traverse from "babel-traverse";
export template from "babel-template";

export OptionManager from "./config/option-manager";

export function Plugin(alias) {
  throw new Error(`The (${alias}) Babel 5 plugin is being run with Babel 6.`);
}

export {
  transform,
  analyse,
  transformFromAst,
  transformFile,
  transformFileSync,
} from "./transformation/pipeline";

/**
 * Recommended set of compilable extensions. Not used in babel-core directly, but meant as
 * as an easy source for tooling making use of babel-core.
 */
export const DEFAULT_EXTENSIONS = Object.freeze([".js", ".jsx", ".es6", ".es"]);
