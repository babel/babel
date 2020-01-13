// @flow

import path from "path";
import gensync, { type Handler } from "gensync";
import Plugin from "./plugin";
import { mergeOptions } from "./util";
import { createItemFromDescriptor } from "./item";
import { buildRootChain, type ConfigContext } from "./config-chain";
import { getEnv } from "./helpers/environment";
import {
  validate,
  type ValidatedOptions,
  type RootMode,
} from "./validation/options";

import {
  findConfigUpwards,
  ROOT_CONFIG_FILENAMES,
  type ConfigFile,
  type IgnoreFile,
} from "./files";

function* resolveRootMode(
  rootDir: string,
  rootMode: RootMode,
): Handler<string> {
  switch (rootMode) {
    case "root":
      return rootDir;

    case "upward-optional": {
      const upwardRootDir = yield* findConfigUpwards(rootDir);
      return upwardRootDir === null ? rootDir : upwardRootDir;
    }

    case "upward": {
      const upwardRootDir = yield* findConfigUpwards(rootDir);
      if (upwardRootDir !== null) return upwardRootDir;

      throw Object.assign(
        (new Error(
          `Babel was run with rootMode:"upward" but a root could not ` +
            `be found when searching upward from "${rootDir}".\n` +
            `One of the following config files must be in the directory tree: ` +
            `"${ROOT_CONFIG_FILENAMES.join(", ")}".`,
        ): any),
        {
          code: "BABEL_ROOT_NOT_FOUND",
          dirname: rootDir,
        },
      );
    }
    default:
      throw new Error(`Assertion failure - unknown rootMode value.`);
  }
}

type PrivPartialConfig = {
  options: ValidatedOptions,
  context: ConfigContext,
  ignore: IgnoreFile | void,
  babelrc: ConfigFile | void,
  config: ConfigFile | void,
};

export default function* loadPrivatePartialConfig(
  inputOpts: mixed,
): Handler<PrivPartialConfig | null> {
  if (
    inputOpts != null &&
    (typeof inputOpts !== "object" || Array.isArray(inputOpts))
  ) {
    throw new Error("Babel options must be an object, null, or undefined");
  }

  const args = inputOpts ? validate("arguments", inputOpts) : {};

  const {
    envName = getEnv(),
    cwd = ".",
    root: rootDir = ".",
    rootMode = "root",
    caller,
  } = args;
  const absoluteCwd = path.resolve(cwd);
  const absoluteRootDir = yield* resolveRootMode(
    path.resolve(absoluteCwd, rootDir),
    rootMode,
  );

  const context: ConfigContext = {
    filename:
      typeof args.filename === "string"
        ? path.resolve(cwd, args.filename)
        : undefined,
    cwd: absoluteCwd,
    root: absoluteRootDir,
    envName,
    caller,
  };

  const configChain = yield* buildRootChain(args, context);
  if (!configChain) return null;

  const options = {};
  configChain.options.forEach(opts => {
    mergeOptions(options, opts);
  });

  // Tack the passes onto the object itself so that, if this object is
  // passed back to Babel a second time, it will be in the right structure
  // to not change behavior.
  options.babelrc = false;
  options.configFile = false;
  options.passPerPreset = false;
  options.envName = context.envName;
  options.cwd = context.cwd;
  options.root = context.root;
  options.filename =
    typeof context.filename === "string" ? context.filename : undefined;

  options.plugins = configChain.plugins.map(descriptor =>
    createItemFromDescriptor(descriptor),
  );
  options.presets = configChain.presets.map(descriptor =>
    createItemFromDescriptor(descriptor),
  );

  return {
    options,
    context,
    ignore: configChain.ignore,
    babelrc: configChain.babelrc,
    config: configChain.config,
  };
}

export const loadPartialConfig = gensync<[any], PartialConfig | null>(function*(
  inputOpts: mixed,
): Handler<PartialConfig | null> {
  const result: ?PrivPartialConfig = yield* loadPrivatePartialConfig(inputOpts);
  if (!result) return null;

  const { options, babelrc, ignore, config } = result;

  (options.plugins || []).forEach(item => {
    if (item.value instanceof Plugin) {
      throw new Error(
        "Passing cached plugin instances is not supported in " +
          "babel.loadPartialConfig()",
      );
    }
  });

  return new PartialConfig(
    options,
    babelrc ? babelrc.filepath : undefined,
    ignore ? ignore.filepath : undefined,
    config ? config.filepath : undefined,
  );
});

export type { PartialConfig };

class PartialConfig {
  /**
   * These properties are public, so any changes to them should be considered
   * a breaking change to Babel's API.
   */
  options: ValidatedOptions;
  babelrc: string | void;
  babelignore: string | void;
  config: string | void;

  constructor(
    options: ValidatedOptions,
    babelrc: string | void,
    ignore: string | void,
    config: string | void,
  ) {
    this.options = options;
    this.babelignore = ignore;
    this.babelrc = babelrc;
    this.config = config;

    // Freeze since this is a public API and it should be extremely obvious that
    // reassigning properties on here does nothing.
    Object.freeze(this);
  }

  /**
   * Returns true if their is a config file in the filesystem for this config.
   *
   * While this only means .babelrc(.mjs)?/package.json#babel right now, it
   * may well expand in the future, so using this is recommended vs checking
   * this.babelrc directly.
   */
  hasFilesystemConfig(): boolean {
    return this.babelrc !== undefined || this.config !== undefined;
  }
}
Object.freeze(PartialConfig.prototype);
