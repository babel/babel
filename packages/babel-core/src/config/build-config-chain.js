// @flow

import { getEnv } from "./helpers/environment";
import path from "path";
import micromatch from "micromatch";
import buildDebug from "debug";

const debug = buildDebug("babel:config:config-chain");

import { findConfigs, loadConfig, type ConfigFile } from "./loading/files";

type ConfigItem = {
  type: "options" | "arguments",
  options: {},
  dirname: string,
  alias: string,
  loc: string,
};

export default function buildConfigChain(opts: {}): Array<ConfigItem> | null {
  if (typeof opts.filename !== "string" && opts.filename != null) {
    throw new Error(".filename must be a string, null, or undefined");
  }

  const filename = opts.filename ? path.resolve(opts.filename) : null;
  const builder = new ConfigChainBuilder(
    filename ? new LoadedFile(filename) : null,
  );

  try {
    builder.mergeConfigArguments(opts, process.cwd());

    // resolve all .babelrc files
    if (opts.babelrc !== false && filename) {
      findConfigs(path.dirname(filename)).forEach(configFile =>
        builder.mergeConfigFile(configFile),
      );
    }
  } catch (e) {
    if (e.code !== "BABEL_IGNORED_FILE") throw e;

    return null;
  }

  return builder.configs.reverse();
}

class ConfigChainBuilder {
  file: LoadedFile | null;
  configs: Array<ConfigItem> = [];

  constructor(file: LoadedFile | null) {
    this.file = file;
  }

  mergeConfigArguments(opts, dirname) {
    this.mergeConfig({
      type: "arguments",
      options: opts,
      alias: "base",
      dirname,
    });
  }

  mergeConfigFile(file: ConfigFile) {
    const { filepath, dirname, options } = file;

    this.mergeConfig({
      type: "options",
      options,
      alias: filepath,
      dirname,
    });
  }

  mergeConfig({ type, options: rawOpts, alias, dirname }) {
    if (rawOpts.ignore != null && !Array.isArray(rawOpts.ignore)) {
      throw new Error(
        `.ignore should be an array, ${JSON.stringify(rawOpts.ignore)} given`,
      );
    }
    if (rawOpts.only != null && !Array.isArray(rawOpts.only)) {
      throw new Error(
        `.only should be an array, ${JSON.stringify(rawOpts.only)} given`,
      );
    }

    // Bail out ASAP if this file is ignored so that we run as little logic as possible on ignored files.
    if (
      this.file &&
      this.file.shouldIgnore(rawOpts.ignore, rawOpts.only, dirname)
    ) {
      // TODO(logan): This is a really cross way to bail out. Avoid this in rewrite.
      throw Object.assign((new Error("This file has been ignored."): any), {
        code: "BABEL_IGNORED_FILE",
      });
    }

    const options = Object.assign({}, rawOpts);
    delete options.env;
    delete options.extends;

    const envKey = getEnv();

    if (
      rawOpts.env != null &&
      (typeof rawOpts.env !== "object" || Array.isArray(rawOpts.env))
    ) {
      throw new Error(".env block must be an object, null, or undefined");
    }

    const envOpts = rawOpts.env && rawOpts.env[envKey];

    if (
      envOpts != null &&
      (typeof envOpts !== "object" || Array.isArray(envOpts))
    ) {
      throw new Error(".env[...] block must be an object, null, or undefined");
    }

    if (envOpts) {
      this.mergeConfig({
        type,
        options: envOpts,
        alias: `${alias}.env.${envKey}`,
        dirname: dirname,
      });
    }

    this.configs.push({
      type,
      options,
      alias,
      loc: alias,
      dirname,
    });

    if (rawOpts.extends) {
      if (typeof rawOpts.extends !== "string") {
        throw new Error(".extends must be a string");
      }

      const extendsConfig = loadConfig(rawOpts.extends, dirname);

      const existingConfig = this.configs.some(config => {
        return config.alias === extendsConfig.filepath;
      });
      if (!existingConfig) {
        this.mergeConfig({
          type: "options",
          alias: extendsConfig.filepath,
          options: extendsConfig.options,
          dirname: extendsConfig.dirname,
        });
      }
    }
  }
}

/**
 * Track a given file and expose function to check if it should be ignored.
 */
class LoadedFile {
  filename: string;
  possibleDirs: null | Array<string> = null;

  constructor(filename) {
    this.filename = filename;
  }

  /**
   * Tests if a filename should be ignored based on "ignore" and "only" options.
   */
  shouldIgnore(
    ignore: ?Array<mixed>,
    only: ?Array<mixed>,
    dirname: string,
  ): boolean {
    if (ignore) {
      if (this._matchesPatterns(ignore, dirname)) {
        debug(
          "Ignored %o because it matched one of %O from %o",
          this.filename,
          ignore,
          dirname,
        );
        return true;
      }
    }

    if (only) {
      if (!this._matchesPatterns(only, dirname)) {
        debug(
          "Ignored %o because it failed to match one of %O from %o",
          this.filename,
          only,
          dirname,
        );
        return true;
      }
    }

    return false;
  }

  /**
   * Returns result of calling function with filename if pattern is a function.
   * Otherwise returns result of matching pattern Regex with filename.
   */
  _matchesPatterns(patterns: Array<mixed>, dirname: string): boolean {
    const res = [];
    const strings = [];
    const fns = [];

    patterns.forEach(pattern => {
      if (typeof pattern === "string") strings.push(pattern);
      else if (typeof pattern === "function") fns.push(pattern);
      else if (pattern instanceof RegExp) res.push(pattern);
      else {
        throw new Error(
          "Patterns must be a string, function, or regular expression",
        );
      }
    });

    const filename = this.filename;
    if (res.some(re => re.test(filename))) return true;
    if (fns.some(fn => fn(filename))) return true;

    if (strings.length > 0) {
      let possibleDirs = this.possibleDirs;
      // Lazy-init so we don't initialize this for files that have no glob patterns.
      if (!possibleDirs) {
        possibleDirs = this.possibleDirs = [];

        possibleDirs.push(filename);

        let current = filename;
        while (true) {
          const previous = current;
          current = path.dirname(current);
          if (previous === current) break;

          possibleDirs.push(current);
        }
      }

      const absolutePatterns = strings.map(pattern => {
        // Preserve the "!" prefix so that micromatch can use it for negation.
        const negate = pattern[0] === "!";
        if (negate) pattern = pattern.slice(1);

        return (negate ? "!" : "") + path.resolve(dirname, pattern);
      });

      if (
        micromatch(possibleDirs, absolutePatterns, { nocase: true }).length > 0
      ) {
        return true;
      }
    }

    return false;
  }
}
