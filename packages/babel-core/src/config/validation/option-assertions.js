// @flow

import type {
  ConfigFileSearch,
  BabelrcSearch,
  IgnoreList,
  IgnoreItem,
  PluginList,
  PluginItem,
  PluginTarget,
  ConfigApplicableTest,
  SourceMapsOption,
  SourceTypeOption,
  CompactOption,
  RootInputSourceMapOption,
} from "./options";

export type ValidatorSet = {
  [string]: Validator<any>,
};

export type Validator<T> = (string, mixed) => T;

export function assertSourceMaps(
  key: string,
  value: mixed,
): SourceMapsOption | void {
  if (
    value !== undefined &&
    typeof value !== "boolean" &&
    value !== "inline" &&
    value !== "both"
  ) {
    throw new Error(
      `.${key} must be a boolean, "inline", "both", or undefined`,
    );
  }
  return value;
}

export function assertCompact(key: string, value: mixed): CompactOption | void {
  if (value !== undefined && typeof value !== "boolean" && value !== "auto") {
    throw new Error(`.${key} must be a boolean, "auto", or undefined`);
  }
  return value;
}

export function assertSourceType(
  key: string,
  value: mixed,
): SourceTypeOption | void {
  if (
    value !== undefined &&
    value !== "module" &&
    value !== "script" &&
    value !== "unambiguous"
  ) {
    throw new Error(
      `.${key} must be "module", "script", "unambiguous", or undefined`,
    );
  }
  return value;
}

export function assertInputSourceMap(
  key: string,
  value: mixed,
): RootInputSourceMapOption | void {
  if (
    value !== undefined &&
    typeof value !== "boolean" &&
    (typeof value !== "object" || !value)
  ) {
    throw new Error(".inputSourceMap must be a boolean, object, or undefined");
  }
  return value;
}

export function assertString(key: string, value: mixed): string | void {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`.${key} must be a string, or undefined`);
  }
  return value;
}

export function assertFunction(key: string, value: mixed): Function | void {
  if (value !== undefined && typeof value !== "function") {
    throw new Error(`.${key} must be a function, or undefined`);
  }
  return value;
}

export function assertBoolean(key: string, value: mixed): boolean | void {
  if (value !== undefined && typeof value !== "boolean") {
    throw new Error(`.${key} must be a boolean, or undefined`);
  }
  return value;
}

export function assertObject(key: string, value: mixed): {} | void {
  if (
    value !== undefined &&
    (typeof value !== "object" || Array.isArray(value) || !value)
  ) {
    throw new Error(`.${key} must be an object, or undefined`);
  }
  return value;
}

export function assertArray(key: string, value: mixed): ?$ReadOnlyArray<mixed> {
  if (value != null && !Array.isArray(value)) {
    throw new Error(`.${key} must be an array, or undefined`);
  }
  return value;
}

export function assertIgnoreList(key: string, value: mixed): IgnoreList | void {
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
      `.${key}[${index}] must be an array of string/Funtion/RegExp values, or undefined`,
    );
  }
  return value;
}

export function assertConfigApplicableTest(
  key: string,
  value: mixed,
): ConfigApplicableTest | void {
  if (value === undefined) return value;

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(`.${key}[${i}] must be a string/Function/RegExp.`);
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(
      `.${key} must be a string/Function/RegExp, or an array of those`,
    );
  }
  return (value: any);
}

function checkValidTest(value: mixed): boolean {
  return (
    typeof value === "string" ||
    typeof value === "function" ||
    value instanceof RegExp
  );
}

export function assertConfigFileSearch(
  key: string,
  value: mixed,
): ConfigFileSearch | void {
  if (
    value !== undefined &&
    typeof value !== "boolean" &&
    typeof value !== "string"
  ) {
    throw new Error(
      `.${key} must be a undefined, a boolean, a string, ` +
        `got ${JSON.stringify(value)}`,
    );
  }

  return value;
}

export function assertBabelrcSearch(
  key: string,
  value: mixed,
): BabelrcSearch | void {
  if (value === undefined || typeof value === "boolean") return value;

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(`.${key}[${i}] must be a string/Function/RegExp.`);
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(
      `.${key} must be a undefined, a boolean, a string/Function/RegExp ` +
        `or an array of those, got ${JSON.stringify(value)}`,
    );
  }
  return (value: any);
}

export function assertPluginList(key: string, value: mixed): PluginList | void {
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

    if (value.length > 3) {
      throw new Error(
        `.${key}[${index}] may only be a two-tuple or three-tuple`,
      );
    }

    assertPluginTarget(key, index, true, value[0]);

    if (value.length > 1) {
      const opts = value[1];
      if (
        opts !== undefined &&
        opts !== false &&
        (typeof opts !== "object" || Array.isArray(opts))
      ) {
        throw new Error(
          `.${key}[${index}][1] must be an object, false, or undefined`,
        );
      }
    }
    if (value.length === 3) {
      const name = value[2];
      if (name !== undefined && typeof name !== "string") {
        throw new Error(`.${key}[${index}][2] must be a string, or undefined`);
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
      `.${key}[${index}]${
        inArray ? `[0]` : ""
      } must be a string, object, function`,
    );
  }
  return value;
}
