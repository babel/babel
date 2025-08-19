import type { InputTargets, Targets } from "@babel/helper-compilation-targets";

import type { ConfigItem } from "../item.ts";
import type Plugin from "../plugin.ts";

import removed from "./removed.ts";
import {
  msg,
  access,
  assertString,
  assertBoolean,
  assertObject,
  assertArray,
  assertCallerMetadata,
  assertInputSourceMap,
  assertIgnoreList,
  assertPluginList,
  assertConfigApplicableTest,
  assertConfigFileSearch,
  assertBabelrcSearch,
  assertFunction,
  assertRootMode,
  assertSourceMaps,
  assertCompact,
  assertSourceType,
  assertTargets,
  assertAssumptions,
} from "./option-assertions.ts";
import type {
  ValidatorSet,
  Validator,
  OptionPath,
} from "./option-assertions.ts";
import type { UnloadedDescriptor } from "../config-descriptors.ts";
import type { PluginAPI } from "../helpers/config-api.ts";
import type { ParserOptions } from "@babel/parser";
import type { GeneratorOptions } from "@babel/generator";
import type { VisitWrapper } from "@babel/traverse";
import ConfigError from "../../errors/config-error.ts";

const ROOT_VALIDATORS: ValidatorSet = {
  cwd: assertString as Validator<ValidatedOptions["cwd"]>,
  root: assertString as Validator<ValidatedOptions["root"]>,
  rootMode: assertRootMode as Validator<ValidatedOptions["rootMode"]>,
  configFile: assertConfigFileSearch as Validator<
    ValidatedOptions["configFile"]
  >,

  caller: assertCallerMetadata as Validator<ValidatedOptions["caller"]>,
  filename: assertString as Validator<ValidatedOptions["filename"]>,
  filenameRelative: assertString as Validator<
    ValidatedOptions["filenameRelative"]
  >,
  code: assertBoolean as Validator<ValidatedOptions["code"]>,
  ast: assertBoolean as Validator<ValidatedOptions["ast"]>,

  cloneInputAst: assertBoolean as Validator<ValidatedOptions["cloneInputAst"]>,

  envName: assertString as Validator<ValidatedOptions["envName"]>,
};

const BABELRC_VALIDATORS: ValidatorSet = {
  babelrc: assertBoolean as Validator<ValidatedOptions["babelrc"]>,
  babelrcRoots: assertBabelrcSearch as Validator<
    ValidatedOptions["babelrcRoots"]
  >,
};

const NONPRESET_VALIDATORS: ValidatorSet = {
  extends: assertString as Validator<ValidatedOptions["extends"]>,
  ignore: assertIgnoreList as Validator<ValidatedOptions["ignore"]>,
  only: assertIgnoreList as Validator<ValidatedOptions["only"]>,

  targets: assertTargets as Validator<ValidatedOptions["targets"]>,
  browserslistConfigFile: assertConfigFileSearch as Validator<
    ValidatedOptions["browserslistConfigFile"]
  >,
  browserslistEnv: assertString as Validator<
    ValidatedOptions["browserslistEnv"]
  >,
};

const COMMON_VALIDATORS: ValidatorSet = {
  // TODO: Should 'inputSourceMap' be moved to be a root-only option?
  // We may want a boolean-only version to be a common option, with the
  // object only allowed as a root config argument.
  inputSourceMap: assertInputSourceMap as Validator<
    ValidatedOptions["inputSourceMap"]
  >,
  presets: assertPluginList as Validator<ValidatedOptions["presets"]>,
  plugins: assertPluginList as Validator<ValidatedOptions["plugins"]>,
  passPerPreset: assertBoolean as Validator<ValidatedOptions["passPerPreset"]>,
  assumptions: assertAssumptions as Validator<ValidatedOptions["assumptions"]>,

  env: assertEnvSet as Validator<ValidatedOptions["env"]>,
  overrides: assertOverridesList as Validator<ValidatedOptions["overrides"]>,

  // We could limit these to 'overrides' blocks, but it's not clear why we'd
  // bother, when the ability to limit a config to a specific set of files
  // is a fairly general useful feature.
  test: assertConfigApplicableTest as Validator<ValidatedOptions["test"]>,
  include: assertConfigApplicableTest as Validator<ValidatedOptions["include"]>,
  exclude: assertConfigApplicableTest as Validator<ValidatedOptions["exclude"]>,

  retainLines: assertBoolean as Validator<ValidatedOptions["retainLines"]>,
  comments: assertBoolean as Validator<ValidatedOptions["comments"]>,
  shouldPrintComment: assertFunction as Validator<
    ValidatedOptions["shouldPrintComment"]
  >,
  compact: assertCompact as Validator<ValidatedOptions["compact"]>,
  minified: assertBoolean as Validator<ValidatedOptions["minified"]>,
  auxiliaryCommentBefore: assertString as Validator<
    ValidatedOptions["auxiliaryCommentBefore"]
  >,
  auxiliaryCommentAfter: assertString as Validator<
    ValidatedOptions["auxiliaryCommentAfter"]
  >,
  sourceType: assertSourceType as Validator<ValidatedOptions["sourceType"]>,
  wrapPluginVisitorMethod: assertFunction as Validator<
    ValidatedOptions["wrapPluginVisitorMethod"]
  >,
  highlightCode: assertBoolean as Validator<ValidatedOptions["highlightCode"]>,
  sourceMaps: assertSourceMaps as Validator<ValidatedOptions["sourceMaps"]>,
  sourceMap: assertSourceMaps as Validator<ValidatedOptions["sourceMap"]>,
  sourceFileName: assertString as Validator<ValidatedOptions["sourceFileName"]>,
  sourceRoot: assertString as Validator<ValidatedOptions["sourceRoot"]>,
  parserOpts: assertObject as Validator<ValidatedOptions["parserOpts"]>,
  generatorOpts: assertObject as Validator<ValidatedOptions["generatorOpts"]>,
};
if (!process.env.BABEL_8_BREAKING) {
  Object.assign(COMMON_VALIDATORS, {
    getModuleId: assertFunction,
    moduleRoot: assertString,
    moduleIds: assertBoolean,
    moduleId: assertString,
  });
}

export type InputOptions = ValidatedOptions;

export type ValidatedOptions = {
  cwd?: string;
  filename?: string;
  filenameRelative?: string;
  babelrc?: boolean;
  babelrcRoots?: BabelrcSearch;
  configFile?: ConfigFileSearch;
  root?: string;
  rootMode?: RootMode;
  code?: boolean;
  ast?: boolean;
  cloneInputAst?: boolean;
  inputSourceMap?: RootInputSourceMapOption;
  envName?: string;
  caller?: CallerMetadata;
  extends?: string;
  env?: EnvSet<ValidatedOptions>;
  ignore?: IgnoreList;
  only?: IgnoreList;
  overrides?: OverridesList;
  showIgnoredFiles?: boolean;
  // Generally verify if a given config object should be applied to the given file.
  test?: ConfigApplicableTest;
  include?: ConfigApplicableTest;
  exclude?: ConfigApplicableTest;
  presets?: PluginList;
  plugins?: PluginList;
  passPerPreset?: boolean;
  assumptions?: {
    [name: string]: boolean;
  };
  // browserslist-related options
  targets?: TargetsListOrObject;
  browserslistConfigFile?: ConfigFileSearch;
  browserslistEnv?: string;
  // Options for @babel/generator
  retainLines?: GeneratorOptions["retainLines"];
  comments?: GeneratorOptions["comments"];
  shouldPrintComment?: GeneratorOptions["shouldPrintComment"];
  compact?: GeneratorOptions["compact"];
  minified?: GeneratorOptions["minified"];
  auxiliaryCommentBefore?: GeneratorOptions["auxiliaryCommentBefore"];
  auxiliaryCommentAfter?: GeneratorOptions["auxiliaryCommentAfter"];
  // Parser
  sourceType?: SourceTypeOption;
  wrapPluginVisitorMethod?: VisitWrapper | null;
  highlightCode?: boolean;
  // Sourcemap generation options.
  sourceMaps?: SourceMapsOption;
  sourceMap?: SourceMapsOption;
  sourceFileName?: string;
  sourceRoot?: string;
  // Todo(Babel 9): Deprecate top level parserOpts
  parserOpts?: ParserOptions;
  // Todo(Babel 9): Deprecate top level generatorOpts
  generatorOpts?: GeneratorOptions;
};

// The `targets` field are resolved in loadPrivPartialConfig, after that the `targets` should be
// considered readonly since any further changes will be ignored.
export type NormalizedOptions = {
  readonly targets: Targets;
} & Omit<ValidatedOptions, "targets">;

export type CallerMetadata = {
  // If 'caller' is specified, require that the name is given for debugging
  // messages.
  name: string;
  supportsStaticESM?: boolean;
  supportsDynamicImport?: boolean;
  supportsTopLevelAwait?: boolean;
  supportsExportNamespaceFrom?: boolean;
};
export type EnvSet<T> = {
  [x: string]: T;
};
export type IgnoreItem =
  | string
  | RegExp
  | ((
      path: string | undefined,
      context: { dirname: string; caller: CallerMetadata; envName: string },
    ) => unknown);
export type IgnoreList = ReadonlyArray<IgnoreItem>;

export type PluginOptions = object | false;
export type PluginTarget = string | object | Function;
export type PluginItem =
  | ConfigItem<PluginAPI>
  | Plugin
  | PluginTarget
  | [PluginTarget, PluginOptions]
  | [PluginTarget, PluginOptions, string | void];
export type PluginList = ReadonlyArray<PluginItem>;

export type OverridesList = Array<ValidatedOptions>;
export type ConfigApplicableTest = IgnoreItem | Array<IgnoreItem>;

export type ConfigFileSearch = string | boolean;
export type BabelrcSearch = boolean | IgnoreItem | IgnoreList;
export type SourceMapsOption = boolean | "inline" | "both";
export type SourceTypeOption = "module" | "commonjs" | "script" | "unambiguous";
export type CompactOption = boolean | "auto";
// https://github.com/mozilla/source-map/blob/801be934007c3ed0ef66c620641b1668e92c891d/source-map.d.ts#L15C8-L23C2
interface InputSourceMap {
  version: number;
  sources: string[];
  names: string[];
  sourceRoot?: string | undefined;
  sourcesContent?: string[] | undefined;
  mappings: string;
  file: string;
}
export type RootInputSourceMapOption = InputSourceMap | boolean;
export type RootMode = "root" | "upward" | "upward-optional";

export type TargetsListOrObject =
  | Targets
  | InputTargets
  | InputTargets["browsers"];

export type OptionsSource =
  | "arguments"
  | "configfile"
  | "babelrcfile"
  | "extendsfile"
  | "preset"
  | "plugin";

export type RootPath = Readonly<{
  type: "root";
  source: OptionsSource;
}>;

type OverridesPath = Readonly<{
  type: "overrides";
  index: number;
  parent: RootPath;
}>;

type EnvPath = Readonly<{
  type: "env";
  name: string;
  parent: RootPath | OverridesPath;
}>;

export type NestingPath = RootPath | OverridesPath | EnvPath;

const knownAssumptions = [
  "arrayLikeIsIterable",
  "constantReexports",
  "constantSuper",
  "enumerableModuleMeta",
  "ignoreFunctionLength",
  "ignoreToPrimitiveHint",
  "iterableIsArray",
  "mutableTemplateObject",
  "noClassCalls",
  "noDocumentAll",
  "noIncompleteNsImportDetection",
  "noNewArrows",
  "noUninitializedPrivateFieldAccess",
  "objectRestNoSymbols",
  "privateFieldsAsSymbols",
  "privateFieldsAsProperties",
  "pureGetters",
  "setClassMethods",
  "setComputedProperties",
  "setPublicClassFields",
  "setSpreadProperties",
  "skipForOfIteratorClosing",
  "superIsCallableConstructor",
] as const;
export type AssumptionName = (typeof knownAssumptions)[number];
export const assumptionsNames = new Set(knownAssumptions);

function getSource(loc: NestingPath): OptionsSource {
  return loc.type === "root" ? loc.source : getSource(loc.parent);
}

export function validate(
  type: OptionsSource,
  opts: any,
  filename?: string,
): ValidatedOptions {
  try {
    return validateNested(
      {
        type: "root",
        source: type,
      },
      opts,
    );
  } catch (error) {
    const configError = new ConfigError(error.message, filename);
    // @ts-expect-error TODO: .code is not defined on ConfigError or Error
    if (error.code) configError.code = error.code;
    throw configError;
  }
}

function validateNested(loc: NestingPath, opts: { [key: string]: unknown }) {
  const type = getSource(loc);

  assertNoDuplicateSourcemap(opts);

  Object.keys(opts).forEach((key: string) => {
    const optLoc = {
      type: "option",
      name: key,
      parent: loc,
    } as const;

    if (type === "preset" && NONPRESET_VALIDATORS[key]) {
      throw new Error(`${msg(optLoc)} is not allowed in preset options`);
    }
    if (type !== "arguments" && ROOT_VALIDATORS[key]) {
      throw new Error(
        `${msg(optLoc)} is only allowed in root programmatic options`,
      );
    }
    if (
      type !== "arguments" &&
      type !== "configfile" &&
      BABELRC_VALIDATORS[key]
    ) {
      if (type === "babelrcfile" || type === "extendsfile") {
        throw new Error(
          `${msg(
            optLoc,
          )} is not allowed in .babelrc or "extends"ed files, only in root programmatic options, ` +
            `or babel.config.js/config file options`,
        );
      }

      throw new Error(
        `${msg(
          optLoc,
        )} is only allowed in root programmatic options, or babel.config.js/config file options`,
      );
    }

    const validator =
      COMMON_VALIDATORS[key] ||
      NONPRESET_VALIDATORS[key] ||
      BABELRC_VALIDATORS[key] ||
      ROOT_VALIDATORS[key] ||
      (throwUnknownError as Validator<void>);

    validator(optLoc, opts[key]);
  });

  return opts;
}

function throwUnknownError(loc: OptionPath) {
  const key = loc.name;

  if (removed[key]) {
    const { message, version = 5 } = removed[key];

    throw new Error(
      `Using removed Babel ${version} option: ${msg(loc)} - ${message}`,
    );
  } else {
    const unknownOptErr = new Error(
      `Unknown option: ${msg(
        loc,
      )}. Check out https://babeljs.io/docs/en/babel-core/#options for more information about options.`,
    );
    // @ts-expect-error todo(flow->ts): consider creating something like BabelConfigError with code field in it
    unknownOptErr.code = "BABEL_UNKNOWN_OPTION";

    throw unknownOptErr;
  }
}

function assertNoDuplicateSourcemap(opts: any): void {
  if (Object.hasOwn(opts, "sourceMap") && Object.hasOwn(opts, "sourceMaps")) {
    throw new Error(".sourceMap is an alias for .sourceMaps, cannot use both");
  }
}

function assertEnvSet(
  loc: OptionPath,
  value: unknown,
): void | EnvSet<ValidatedOptions> {
  if (loc.parent.type === "env") {
    throw new Error(`${msg(loc)} is not allowed inside of another .env block`);
  }
  const parent: RootPath | OverridesPath = loc.parent;

  const obj = assertObject(loc, value);
  if (obj) {
    // Validate but don't copy the .env object in order to preserve
    // object identity for use during config chain processing.
    for (const envName of Object.keys(obj)) {
      const env = assertObject(access(loc, envName), obj[envName]);
      if (!env) continue;

      const envLoc = {
        type: "env",
        name: envName,
        parent,
      } as const;
      validateNested(envLoc, env);
    }
  }
  return obj;
}

function assertOverridesList(
  loc: OptionPath,
  value: unknown[],
): undefined | OverridesList {
  if (loc.parent.type === "env") {
    throw new Error(`${msg(loc)} is not allowed inside an .env block`);
  }
  if (loc.parent.type === "overrides") {
    throw new Error(`${msg(loc)} is not allowed inside an .overrides block`);
  }
  const parent: RootPath = loc.parent;

  const arr = assertArray(loc, value);
  if (arr) {
    for (const [index, item] of arr.entries()) {
      const objLoc = access(loc, index);
      const env = assertObject(objLoc, item);
      if (!env) throw new Error(`${msg(objLoc)} must be an object`);

      const overridesLoc = {
        type: "overrides",
        index,
        parent,
      } as const;
      validateNested(overridesLoc, env);
    }
  }
  return arr as OverridesList;
}

export function checkNoUnwrappedItemOptionPairs<API>(
  items: Array<UnloadedDescriptor<API>>,
  index: number,
  type: "plugin" | "preset",
  e: Error,
): void {
  if (index === 0) return;

  const lastItem = items[index - 1];
  const thisItem = items[index];

  if (
    lastItem.file &&
    lastItem.options === undefined &&
    typeof thisItem.value === "object"
  ) {
    e.message +=
      `\n- Maybe you meant to use\n` +
      `"${type}s": [\n  ["${lastItem.file.request}", ${JSON.stringify(
        thisItem.value,
        undefined,
        2,
      )}]\n]\n` +
      `To be a valid ${type}, its name and options should be wrapped in a pair of brackets`;
  }
}
