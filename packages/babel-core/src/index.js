export File from "./transformation/file";
export buildExternalHelpers from "./tools/build-external-helpers";
export resolvePlugin from "./helpers/resolve-plugin";
export resolvePreset from "./helpers/resolve-preset";

export { version } from "../package";
export { getEnv } from "./helpers/environment";

export * as messages from "babel-messages";
export * as types from "babel-types";
export traverse from "babel-traverse";
export template from "babel-template";

export OptionManager from "./transformation/file/options/option-manager";

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

