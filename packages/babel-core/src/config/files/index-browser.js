// @flow

import type {
  ConfigFile,
  IgnoreFile,
  RelativeConfig,
  FilePackageData,
} from "./types";

import type { CallerMetadata } from "../validation/options";

export type { ConfigFile, IgnoreFile, RelativeConfig, FilePackageData };

export function findPackageData(filepath: string): FilePackageData {
  return {
    filepath,
    directories: [],
    pkg: null,
    isPackage: false,
  };
}

export function findRelativeConfig(
  pkgData: FilePackageData, // eslint-disable-line no-unused-vars
  envName: string, // eslint-disable-line no-unused-vars
  caller: CallerMetadata | void, // eslint-disable-line no-unused-vars
): RelativeConfig {
  return { pkg: null, config: null, ignore: null };
}

export function findRootConfig(
  dirname: string, // eslint-disable-line no-unused-vars
  envName: string, // eslint-disable-line no-unused-vars
  caller: CallerMetadata | void, // eslint-disable-line no-unused-vars
): ConfigFile | null {
  return null;
}

export function loadConfig(
  name: string,
  dirname: string,
  envName: string, // eslint-disable-line no-unused-vars
  caller: CallerMetadata | void, // eslint-disable-line no-unused-vars
): ConfigFile {
  throw new Error(`Cannot load ${name} relative to ${dirname} in a browser`);
}

// eslint-disable-next-line no-unused-vars
export function resolvePlugin(name: string, dirname: string): string | null {
  return null;
}

// eslint-disable-next-line no-unused-vars
export function resolvePreset(name: string, dirname: string): string | null {
  return null;
}

export function loadPlugin(
  name: string,
  dirname: string,
): { filepath: string, value: mixed } {
  throw new Error(
    `Cannot load plugin ${name} relative to ${dirname} in a browser`,
  );
}

export function loadPreset(
  name: string,
  dirname: string,
): { filepath: string, value: mixed } {
  throw new Error(
    `Cannot load preset ${name} relative to ${dirname} in a browser`,
  );
}
