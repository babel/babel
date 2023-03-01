import {
  load as _load,
  resolve as _resolve,
  globalPreload as _globalPreload,
  getSource as _getSource,
  getFormat as _getFormat,
  getGlobalPreloadCode as _getGlobalPreloadCode,
} from "./lib/loader.mjs";

const [major] = process.versions.node.split(".").map(Number);

if (major < 12) {
  throw new Error("--experimental-loader is supported no earlier than node 12");
}

export const load = _load;
export const resolve = _resolve;
export const globalPreload = _globalPreload;

// put the old exports behind a conditional export
// to prevent deprecation warnings on newer node versions
export const getSource = major < 16 ? _getSource : undefined;
export const getFormat = major < 16 ? _getFormat : undefined;
export const getGlobalPreloadCode =
  major < 16 ? _getGlobalPreloadCode : undefined;
