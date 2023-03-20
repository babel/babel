type indexBrowserType = typeof import("./index-browser");
type indexType = typeof import("./index");

// Kind of gross, but essentially asserting that the exports of this module are the same as the
// exports of index-browser, since this file may be replaced at bundle time with index-browser.
({}) as any as indexBrowserType as indexType;

export { findPackageData } from "./package";

export {
  findConfigUpwards,
  findRelativeConfig,
  findRootConfig,
  loadConfig,
  resolveShowConfigPath,
  ROOT_CONFIG_FILENAMES,
} from "./configuration";
export type {
  ConfigFile,
  IgnoreFile,
  RelativeConfig,
  FilePackageData,
} from "./types";
export { loadPlugin, loadPreset } from "./plugins";

import gensync from "gensync";
import * as plugins from "./plugins";

export const resolvePlugin = gensync(plugins.resolvePlugin).sync;
export const resolvePreset = gensync(plugins.resolvePreset).sync;
