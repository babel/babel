import {
  load as _load,
  resolve as _resolve,
  getSource as _getSource,
  getFormat as _getFormat,
  globalPreload as _globalPreload,
  getGlobalPreloadCode as _getGlobalPreloadCode,
} from "./lib/loader.mjs";

const [major] = process.versions.node.split(".").map(Number);

export const load = major >= 16 && _load;
export const resolve = major >= 16 && _resolve;
export const globalPreload = major >= 16 && _globalPreload;

export const getSource = major < 16 && _getSource;
export const getFormat = major < 16 && _getFormat;
export const getGlobalPreloadCode = major < 16 && _getGlobalPreloadCode;
