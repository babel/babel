// @flow

import type { ConfigItem } from "../item";
import Plugin from "../plugin";

import removed from "./removed";
import {
  assertString,
  assertBoolean,
  assertObject,
  assertArray,
  assertInputSourceMap,
  assertIgnoreList,
  assertPluginList,
  assertConfigApplicableTest,
  assertConfigFileSearch,
  assertBabelrcSearch,
  assertFunction,
  assertSourceMaps,
  assertCompact,
  assertSourceType,
  type ValidatorSet,
  type Validator,
} from "./option-assertions";

const ROOT_VALIDATORS: ValidatorSet = {
  cwd: (assertString: Validator<$PropertyType<ValidatedOptions, "cwd">>),
  root: (assertString: Validator<$PropertyType<ValidatedOptions, "root">>),
  configFile: (assertConfigFileSearch: Validator<
    $PropertyType<ValidatedOptions, "configFile">,
  >),

  filename: (assertString: Validator<
    $PropertyType<ValidatedOptions, "filename">,
  >),
  filenameRelative: (assertString: Validator<
    $PropertyType<ValidatedOptions, "filenameRelative">,
  >),
  code: (assertBoolean: Validator<$PropertyType<ValidatedOptions, "code">>),
  ast: (assertBoolean: Validator<$PropertyType<ValidatedOptions, "ast">>),

  envName: (assertString: Validator<
    $PropertyType<ValidatedOptions, "envName">,
  >),
};

const BABELRC_VALIDATORS: ValidatorSet = {
  babelrc: (assertBoolean: Validator<
    $PropertyType<ValidatedOptions, "babelrc">,
  >),
  babelrcRoots: (assertBabelrcSearch: Validator<
    $PropertyType<ValidatedOptions, "babelrcRoots">,
  >),
};

const NONPRESET_VALIDATORS: ValidatorSet = {
  extends: (assertString: Validator<
    $PropertyType<ValidatedOptions, "extends">,
  >),
  ignore: (assertIgnoreList: Validator<
    $PropertyType<ValidatedOptions, "ignore">,
  >),
  only: (assertIgnoreList: Validator<$PropertyType<ValidatedOptions, "only">>),
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

  env: (assertEnvSet: Validator<$PropertyType<ValidatedOptions, "env">>),
  overrides: (assertOverridesList: Validator<
    $PropertyType<ValidatedOptions, "overrides">,
  >),

  // We could limit these to 'overrides' blocks, but it's not clear why we'd
  // bother, when the ability to limit a config to a specific set of files
  // is a fairly general useful feature.
  test: (assertConfigApplicableTest: Validator<
    $PropertyType<ValidatedOptions, "test">,
  >),
  include: (assertConfigApplicableTest: Validator<
    $PropertyType<ValidatedOptions, "include">,
  >),
  exclude: (assertConfigApplicableTest: Validator<
    $PropertyType<ValidatedOptions, "exclude">,
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
  cwd?: string,
  filename?: string,
  filenameRelative?: string,
  babelrc?: boolean,
  babelrcRoots?: BabelrcSearch,
  configFile?: ConfigFileSearch,
  root?: string,
  code?: boolean,
  ast?: boolean,
  inputSourceMap?: RootInputSourceMapOption,
  envName?: string,

  extends?: string,
  env?: EnvSet<ValidatedOptions>,
  ignore?: IgnoreList,
  only?: IgnoreList,
  overrides?: OverridesList,

  // Generally verify if a given config object should be applied to the given file.
  test?: ConfigApplicableTest,
  include?: ConfigApplicableTest,
  exclude?: ConfigApplicableTest,

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
};

export type EnvSet<T> = {
  [string]: ?T,
};
export type IgnoreItem = string | Function | RegExp;
export type IgnoreList = $ReadOnlyArray<IgnoreItem>;

export type PluginOptions = {} | void | false;
export type PluginTarget = string | {} | Function;
export type PluginItem =
  | ConfigItem
  | Plugin
  | PluginTarget
  | [PluginTarget, PluginOptions]
  | [PluginTarget, PluginOptions, string | void];
export type PluginList = $ReadOnlyArray<PluginItem>;

export type OverridesList = Array<ValidatedOptions>;
export type ConfigApplicableTest = IgnoreItem | Array<IgnoreItem>;

export type ConfigFileSearch = string | boolean;
export type BabelrcSearch = boolean | IgnoreItem | IgnoreList;
export type SourceMapsOption = boolean | "inline" | "both";
export type SourceTypeOption = "module" | "script" | "unambiguous";
export type CompactOption = boolean | "auto";
export type RootInputSourceMapOption = {} | boolean;

export type OptionsType =
  | "arguments"
  | "env"
  | "preset"
  | "override"
  | "configfile"
  | "babelrcfile"
  | "extendsfile";

export function validate(type: OptionsType, opts: {}): ValidatedOptions {
  assertNoDuplicateSourcemap(opts);

  Object.keys(opts).forEach(key => {
    if (type === "preset" && NONPRESET_VALIDATORS[key]) {
      throw new Error(`.${key} is not allowed in preset options`);
    }
    if (type !== "arguments" && ROOT_VALIDATORS[key]) {
      throw new Error(`.${key} is only allowed in root programmatic options`);
    }
    if (
      type !== "arguments" &&
      type !== "configfile" &&
      BABELRC_VALIDATORS[key]
    ) {
      if (type === "babelrcfile" || type === "extendsfile") {
        throw new Error(
          `.${key} is not allowed in .babelrc or "extend"ed files, only in root programmatic options, ` +
            `or babel.config.js/config file options`,
        );
      }

      throw new Error(
        `.${key} is only allowed in root programmatic options, or babel.config.js/config file options`,
      );
    }
    if (type === "env" && key === "env") {
      throw new Error(`.${key} is not allowed inside another env block`);
    }
    if (type === "env" && key === "overrides") {
      throw new Error(`.${key} is not allowed inside an env block`);
    }
    if (type === "override" && key === "overrides") {
      throw new Error(`.${key} is not allowed inside an overrides block`);
    }

    const validator =
      COMMON_VALIDATORS[key] ||
      NONPRESET_VALIDATORS[key] ||
      BABELRC_VALIDATORS[key] ||
      ROOT_VALIDATORS[key];

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
    const unknownOptErr = `Unknown option: .${key}. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.`;

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

function assertOverridesList(key: string, value: mixed): OverridesList {
  const arr = assertArray(key, value);
  if (arr) {
    for (const [index, item] of arr.entries()) {
      const env = assertObject(`${index}`, item);
      if (!env) throw new Error(`.${key}[${index}] must be an object`);

      validate("override", env);
    }
  }
  return (arr: any);
}
