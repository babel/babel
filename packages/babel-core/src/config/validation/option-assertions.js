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
  NestingPath,
} from "./options";

export type ValidatorSet = {
  [string]: Validator<any>,
};

export type Validator<T> = (OptionPath, mixed) => T;

export function msg(loc: NestingPath | GeneralPath) {
  switch (loc.type) {
    case "root":
      return ``;
    case "env":
      return `${msg(loc.parent)}.env["${loc.name}"]`;
    case "overrides":
      return `${msg(loc.parent)}.overrides[${loc.index}]`;
    case "option":
      return `${msg(loc.parent)}.${loc.name}`;
    case "access":
      return `${msg(loc.parent)}[${JSON.stringify(loc.name)}]`;
    default:
      throw new Error(`Assertion failure: Unknown type ${loc.type}`);
  }
}

export function access(loc: GeneralPath, name: string | number): AccessPath {
  return {
    type: "access",
    name,
    parent: loc,
  };
}

export type OptionPath = $ReadOnly<{
  type: "option",
  name: string,
  parent: NestingPath,
}>;
type AccessPath = $ReadOnly<{
  type: "access",
  name: string | number,
  parent: GeneralPath,
}>;
type GeneralPath = OptionPath | AccessPath;

export function assertSourceMaps(
  loc: OptionPath,
  value: mixed,
): SourceMapsOption | void {
  if (
    value !== undefined &&
    typeof value !== "boolean" &&
    value !== "inline" &&
    value !== "both"
  ) {
    throw new Error(
      `${msg(loc)} must be a boolean, "inline", "both", or undefined`,
    );
  }
  return value;
}

export function assertCompact(
  loc: OptionPath,
  value: mixed,
): CompactOption | void {
  if (value !== undefined && typeof value !== "boolean" && value !== "auto") {
    throw new Error(`${msg(loc)} must be a boolean, "auto", or undefined`);
  }
  return value;
}

export function assertSourceType(
  loc: OptionPath,
  value: mixed,
): SourceTypeOption | void {
  if (
    value !== undefined &&
    value !== "module" &&
    value !== "script" &&
    value !== "unambiguous"
  ) {
    throw new Error(
      `${msg(loc)} must be "module", "script", "unambiguous", or undefined`,
    );
  }
  return value;
}

export function assertInputSourceMap(
  loc: OptionPath,
  value: mixed,
): RootInputSourceMapOption | void {
  if (
    value !== undefined &&
    typeof value !== "boolean" &&
    (typeof value !== "object" || !value)
  ) {
    throw new Error(`${msg(loc)} must be a boolean, object, or undefined`);
  }
  return value;
}

export function assertString(loc: GeneralPath, value: mixed): string | void {
  if (value !== undefined && typeof value !== "string") {
    throw new Error(`${msg(loc)} must be a string, or undefined`);
  }
  return value;
}

export function assertFunction(
  loc: GeneralPath,
  value: mixed,
): Function | void {
  if (value !== undefined && typeof value !== "function") {
    throw new Error(`${msg(loc)} must be a function, or undefined`);
  }
  return value;
}

export function assertBoolean(loc: GeneralPath, value: mixed): boolean | void {
  if (value !== undefined && typeof value !== "boolean") {
    throw new Error(`${msg(loc)} must be a boolean, or undefined`);
  }
  return value;
}

export function assertObject(loc: GeneralPath, value: mixed): {} | void {
  if (
    value !== undefined &&
    (typeof value !== "object" || Array.isArray(value) || !value)
  ) {
    throw new Error(`${msg(loc)} must be an object, or undefined`);
  }
  return value;
}

export function assertArray(
  loc: GeneralPath,
  value: mixed,
): ?$ReadOnlyArray<mixed> {
  if (value != null && !Array.isArray(value)) {
    throw new Error(`${msg(loc)} must be an array, or undefined`);
  }
  return value;
}

export function assertIgnoreList(
  loc: OptionPath,
  value: mixed,
): IgnoreList | void {
  const arr = assertArray(loc, value);
  if (arr) {
    arr.forEach((item, i) => assertIgnoreItem(access(loc, i), item));
  }
  return (arr: any);
}
function assertIgnoreItem(loc: GeneralPath, value: mixed): IgnoreItem {
  if (
    typeof value !== "string" &&
    typeof value !== "function" &&
    !(value instanceof RegExp)
  ) {
    throw new Error(
      `${msg(
        loc,
      )} must be an array of string/Funtion/RegExp values, or undefined`,
    );
  }
  return value;
}

export function assertConfigApplicableTest(
  loc: OptionPath,
  value: mixed,
): ConfigApplicableTest | void {
  if (value === undefined) return value;

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(
          `${msg(access(loc, i))} must be a string/Function/RegExp.`,
        );
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(
      `${msg(loc)} must be a string/Function/RegExp, or an array of those`,
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
  loc: OptionPath,
  value: mixed,
): ConfigFileSearch | void {
  if (
    value !== undefined &&
    typeof value !== "boolean" &&
    typeof value !== "string"
  ) {
    throw new Error(
      `${msg(loc)} must be a undefined, a boolean, a string, ` +
        `got ${JSON.stringify(value)}`,
    );
  }

  return value;
}

export function assertBabelrcSearch(
  loc: OptionPath,
  value: mixed,
): BabelrcSearch | void {
  if (value === undefined || typeof value === "boolean") return value;

  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      if (!checkValidTest(item)) {
        throw new Error(
          `${msg(access(loc, i))} must be a string/Function/RegExp.`,
        );
      }
    });
  } else if (!checkValidTest(value)) {
    throw new Error(
      `${msg(loc)} must be a undefined, a boolean, a string/Function/RegExp ` +
        `or an array of those, got ${JSON.stringify(value)}`,
    );
  }
  return (value: any);
}

export function assertPluginList(
  loc: OptionPath,
  value: mixed,
): PluginList | void {
  const arr = assertArray(loc, value);
  if (arr) {
    // Loop instead of using `.map` in order to preserve object identity
    // for plugin array for use during config chain processing.
    arr.forEach((item, i) => assertPluginItem(access(loc, i), item));
  }
  return (arr: any);
}
function assertPluginItem(loc: GeneralPath, value: mixed): PluginItem {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      throw new Error(`${msg(loc)} must include an object`);
    }

    if (value.length > 3) {
      throw new Error(`${msg(loc)} may only be a two-tuple or three-tuple`);
    }

    assertPluginTarget(access(loc, 0), value[0]);

    if (value.length > 1) {
      const opts = value[1];
      if (
        opts !== undefined &&
        opts !== false &&
        (typeof opts !== "object" || Array.isArray(opts))
      ) {
        throw new Error(
          `${msg(access(loc, 1))} must be an object, false, or undefined`,
        );
      }
    }
    if (value.length === 3) {
      const name = value[2];
      if (name !== undefined && typeof name !== "string") {
        throw new Error(
          `${msg(access(loc, 2))} must be a string, or undefined`,
        );
      }
    }
  } else {
    assertPluginTarget(loc, value);
  }

  return (value: any);
}
function assertPluginTarget(loc: GeneralPath, value: mixed): PluginTarget {
  if (
    (typeof value !== "object" || !value) &&
    typeof value !== "string" &&
    typeof value !== "function"
  ) {
    throw new Error(`${msg(loc)} must be a string, object, function`);
  }
  return value;
}
