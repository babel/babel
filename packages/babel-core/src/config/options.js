// @flow

import type { CacheKey } from "@babel/helper-caching";

import removed from "./removed";
import {
  assertString,
  assertBoolean,
  assertObject,
  assertInputSourceMap,
  assertIgnoreList,
  assertPluginList,
  assertFunction,
  assertSourceMaps,
  assertCompact,
  assertSourceType,
  assertCacheKey,
  type ValidatorSet,
  type Validator,
} from "./option-assertions";

const ROOT_VALIDATORS: ValidatorSet = {
  filename: (assertString: Validator<
    $PropertyType<ValidatedOptions, "filename">,
  >),
  filenameRelative: (assertString: Validator<
    $PropertyType<ValidatedOptions, "filenameRelative">,
  >),
  babelrc: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "babelrc">,
  >),
  code: (assertBoolean: Validator<$PropertyType<ValidatedOptions, "code">>),
  ast: (assertBoolean: Validator<$PropertyType<ValidatedOptions, "ast">>),
};

const NONPRESET_VALIDATORS: ValidatorSet = {
  extends: (assertString: Validator<
    $PropertyType<ValidatedOptions, "extends">,
  >),
  env: (assertEnvSet: Validator<$PropertyType<ValidatedOptions, "env">>),
  ignore: (assertIgnoreList: Validator<
    $PropertyType<ValidatedOptions, "ignore">,
  >),
  only: (assertIgnoreList: Validator<$PropertyType<ValidatedOptions, "only">>),
};

const CACHE_VALIDATORS: ValidatorSet = {
  cacheKey: (assertCacheKey: Validator<
    $PropertyType<ValidatedOptions, "cacheKey">,
  >),
};

const COMMON_VALIDATORS: ValidatorSet = {
  // TODO: Should 'inputSourceMap' be moved to be a root-only option?
  // We may want a boolean-only version to be a common option, with the
  // object only allowed as a root config argument.
  inputSourceMap: (assertInputSourceMap: Validator<
    $PropertyType<ValidatedOptions, "inputSourceMap">,
  >),
  presets: (assertPluginList: Validator<
    $PropertyType<ValidatedOptions, "presets">,
  >),
  plugins: (assertPluginList: Validator<
    $PropertyType<ValidatedOptions, "plugins">,
  >),
  passPerPreset: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "passPerPreset">,
  >),
  retainLines: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "retainLines">,
  >),
  comments: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "comments">,
  >),
  shouldPrintComment: (assertFunction: Validator<
    $PropertyType<ValidatedOptions, "shouldPrintComment">,
  >),
  compact: (assertCompact: Validator<
    $PropertyType<ValidatedOptions, "compact">,
  >),
  minified: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "minified">,
  >),
  auxiliaryCommentBefore: (assertString: Validator<
    $PropertyType<ValidatedOptions, "auxiliaryCommentBefore">,
  >),
  auxiliaryCommentAfter: (assertString: Validator<
    $PropertyType<ValidatedOptions, "auxiliaryCommentAfter">,
  >),
  sourceType: (assertSourceType: Validator<
    $PropertyType<ValidatedOptions, "sourceType">,
  >),
  wrapPluginVisitorMethod: (assertFunction: Validator<
    $PropertyType<ValidatedOptions, "wrapPluginVisitorMethod">,
  >),
  highlightCode: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "highlightCode">,
  >),
  sourceMaps: (assertSourceMaps: Validator<
    $PropertyType<ValidatedOptions, "sourceMaps">,
  >),
  sourceMap: (assertSourceMaps: Validator<
    $PropertyType<ValidatedOptions, "sourceMap">,
  >),
  sourceMapTarget: (assertString: Validator<
    $PropertyType<ValidatedOptions, "sourceMapTarget">,
  >),
  sourceFileName: (assertString: Validator<
    $PropertyType<ValidatedOptions, "sourceFileName">,
  >),
  sourceRoot: (assertString: Validator<
    $PropertyType<ValidatedOptions, "sourceRoot">,
  >),
  getModuleId: (assertFunction: Validator<
    $PropertyType<ValidatedOptions, "getModuleId">,
  >),
  moduleRoot: (assertString: Validator<
    $PropertyType<ValidatedOptions, "moduleRoot">,
  >),
  moduleIds: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "moduleIds">,
  >),
  moduleId: (assertString: Validator<
    $PropertyType<ValidatedOptions, "moduleId">,
  >),
  parserOpts: (assertObject: Validator<
    $PropertyType<ValidatedOptions, "parserOpts">,
  >),
  generatorOpts: (assertObject: Validator<
    $PropertyType<ValidatedOptions, "generatorOpts">,
  >),
};
export type InputOptions = ValidatedOptions;

export type ValidatedOptions = {
  filename?: string,
  filenameRelative?: string,
  babelrc?: boolean,
  code?: boolean,
  ast?: boolean,
  inputSourceMap?: RootInputSourceMapOption,

  extends?: string,
  env?: EnvSet<ValidatedOptions>,
  ignore?: IgnoreList,
  only?: IgnoreList,

  presets?: PluginList,
  plugins?: PluginList,
  passPerPreset?: boolean,

  // Options for @babel/generator
  retainLines?: boolean,
  comments?: boolean,
  shouldPrintComment?: Function,
  compact?: CompactOption,
  minified?: boolean,
  auxiliaryCommentBefore?: string,
  auxiliaryCommentAfter?: string,

  // Parser
  sourceType?: SourceTypeOption,

  wrapPluginVisitorMethod?: Function,
  highlightCode?: boolean,

  // Sourcemap generation options.
  sourceMaps?: SourceMapsOption,
  sourceMap?: SourceMapsOption,
  sourceMapTarget?: string,
  sourceFileName?: string,
  sourceRoot?: string,

  // AMD/UMD/SystemJS module naming options.
  getModuleId?: Function,
  moduleRoot?: string,
  moduleIds?: boolean,
  moduleId?: string,

  // Deprecate top level parserOpts
  parserOpts?: {},
  // Deprecate top level generatorOpts
  generatorOpts?: {},

  cacheKey?: CacheKey,
};

export type EnvSet<T> = {
  [string]: ?T,
};
export type IgnoreItem = string | Function | RegExp;
export type IgnoreList = $ReadOnlyArray<IgnoreItem>;

export type PluginTarget = string | {} | Function;
export type PluginItem = PluginTarget | [PluginTarget, {} | void];
export type PluginList = $ReadOnlyArray<PluginItem>;

export type SourceMapsOption = boolean | "inline" | "both";
export type SourceTypeOption = "module" | "script" | "unambiguous";
export type CompactOption = boolean | "auto";
export type RootInputSourceMapOption = {} | boolean;

export type OptionsType = "arguments" | "file" | "env" | "preset";

export function validate(type: OptionsType, opts: {}): ValidatedOptions {
  assertNoDuplicateSourcemap(opts);

  Object.keys(opts).forEach(key => {
    if (type === "preset" && NONPRESET_VALIDATORS[key]) {
      throw new Error(`.${key} is not allowed in preset options`);
    }
    if (type !== "arguments" && ROOT_VALIDATORS[key]) {
      throw new Error(`.${key} is only allowed in root programmatic options`);
    }
    if (type === "env" && CACHE_VALIDATORS[key]) {
      throw new Error(`.${key} is not allowed in 'env' options`);
    }

    const validator =
      COMMON_VALIDATORS[key] ||
      NONPRESET_VALIDATORS[key] ||
      ROOT_VALIDATORS[key] ||
      CACHE_VALIDATORS[key];

    if (validator) validator(key, opts[key]);
    else throw buildUnknownError(key);
  });

  return (opts: any);
}

function buildUnknownError(key: string) {
  if (removed[key]) {
    const { message, version = 5 } = removed[key];

    throw new ReferenceError(
      `Using removed Babel ${version} option: .${key} - ${message}`,
    );
  } else {
    // eslint-disable-next-line max-len
    const unknownOptErr = `Unknown option: .${key}. Check out http://babeljs.io/docs/usage/options/ for more information about options.`;

    throw new ReferenceError(unknownOptErr);
  }
}

function has(obj: {}, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function assertNoDuplicateSourcemap(opts: {}): void {
  if (has(opts, "sourceMap") && has(opts, "sourceMaps")) {
    throw new Error(".sourceMap is an alias for .sourceMaps, cannot use both");
  }
}

function assertEnvSet(key: string, value: mixed): EnvSet<ValidatedOptions> {
  const obj = assertObject(key, value);
  if (obj) {
    // Validate but don't copy the .env object in order to preserve
    // object identity for use during config chain processing.
    for (const key of Object.keys(obj)) {
      const env = assertObject(key, obj[key]);
      if (env) validate("env", env);
    }
  }
  return (obj: any);
}
