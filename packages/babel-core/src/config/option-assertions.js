// @flow

import type {
  IgnoreList,
  IgnoreItem,
  PluginList,
  PluginItem,
  PluginTarget,
  SourceMapsOption,
  SourceTypeOption,
  CompactOption,
  RootInputSourceMapOption,
} from "./options";

export function assertSourceMaps(key: string, value: mixed): ?SourceMapsOption {
  if (
    value != null &&
    typeof value !== "boolean" &&
    value !== "inline" &&
    value !== "both"
  ) {
    throw new Error(
      `.${key} must be a boolean, "inline", "both", null, or undefined`,
    );
  }
  return value;
}

export function assertCompact(key: string, value: mixed): ?CompactOption {
  if (value != null && typeof value !== "boolean" && value !== "auto") {
    throw new Error(`.${key} must be a boolean, "auto", null, or undefined`);
  }
  return value;
}

export function assertSourceType(key: string, value: mixed): ?SourceTypeOption {
  if (value != null && value !== "module" && value !== "script") {
    throw new Error(`.${key} must be "module", "script", null, or undefined`);
  }
  return value;
}

export function assertInputSourceMap(
  key: string,
  value: mixed,
): ?RootInputSourceMapOption {
  if (
    value != null &&
    typeof value !== "boolean" &&
    typeof value !== "object"
  ) {
    throw new Error(
      ".inputSourceMap must be a boolean, object, null, or undefined",
    );
  }
  return value;
}

export function assertString(key: string, value: mixed): ?string {
  if (value != null && typeof value !== "string") {
    throw new Error(`.${key} must be a string, null, or undefined`);
  }
  return value;
}

export function assertFunction(key: string, value: mixed): ?Function {
  if (value != null && typeof value !== "function") {
    throw new Error(`.${key} must be a function, null, or undefined`);
  }
  return value;
}

export function assertBoolean(key: string, value: mixed): ?boolean {
  if (value != null && typeof value !== "boolean") {
    throw new Error(`.${key} must be a boolean, null, or undefined`);
  }
  return value;
}

export function assertObject(key: string, value: mixed): ?{} {
  if (value != null && (typeof value !== "object" || Array.isArray(value))) {
    throw new Error(`.${key} must be an object, null, or undefined`);
  }
  return value;
}

export function assertIgnoreList(key: string, value: mixed): ?IgnoreList {
  const arr = assertArray(key, value);
  if (arr) {
    arr.forEach((item, i) => assertIgnoreItem(key, i, item));
  }
  return (arr: any);
}
function assertIgnoreItem(
  key: string,
  index: number,
  value: mixed,
): IgnoreItem {
  if (
    typeof value !== "string" &&
    typeof value !== "function" &&
    !(value instanceof RegExp)
  ) {
    throw new Error(
      `.${key}[${index}] must be an array of string/Funtion/RegExp values, or null, or undefined`,
    );
  }
  return value;
}

export function assertPluginList(key: string, value: mixed): ?PluginList {
  const arr = assertArray(key, value);
  if (arr) {
    // Loop instead of using `.map` in order to preserve object identity
    // for plugin array for use during config chain processing.
    arr.forEach((item, i) => assertPluginItem(key, i, item));
  }
  return (arr: any);
}
function assertPluginItem(
  key: string,
  index: number,
  value: mixed,
): PluginItem {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error(`.${key}[${index}] must include an object`);
    }
    if (value.length > 2) {
      throw new Error(`.${key}[${index}] may only be a two-tuple`);
    }

    assertPluginTarget(key, index, true, value[0]);

    if (value.length === 2) {
      const opts = value[1];
      if (opts != null && (typeof opts !== "object" || Array.isArray(opts))) {
        throw new Error(
          `.${key}[${index}][1] must be an object, null, or undefined`,
        );
      }
    }
  } else {
    assertPluginTarget(key, index, false, value);
  }

  return (value: any);
}
function assertPluginTarget(
  key: string,
  index: number,
  inArray: boolean,
  value: mixed,
): PluginTarget {
  if (
    (typeof value !== "object" || !value) &&
    typeof value !== "string" &&
    typeof value !== "function"
  ) {
    throw new Error(
      `.${key}[${index}]${inArray
        ? `[0]`
        : ""} must be a string, object, function`,
    );
  }
  return value;
}

function assertArray(key: string, value: mixed): ?$ReadOnlyArray<mixed> {
  if (value != null && !Array.isArray(value)) {
    throw new Error(`.${key} must be an array, null, or undefined`);
  }
  return value;
}
