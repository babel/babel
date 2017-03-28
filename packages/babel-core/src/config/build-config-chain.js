import * as babel from "../index";
import path from "path";
import micromatch from "micromatch";

import { findConfigs, loadConfig } from "./loading/files";

export default function buildConfigChain(opts: Object = {}) {
  const filename = opts.filename ? path.resolve(opts.filename) : null;
  const builder = new ConfigChainBuilder(filename);

  try {
    builder.mergeConfig({
      type: "arguments",
      options: opts,
      alias: "base",
      dirname: process.cwd(),
    });

    // resolve all .babelrc files
    if (opts.babelrc !== false) {
      builder.findConfigs(filename);
    }
  } catch (e) {
    if (e.code !== "BABEL_IGNORED_FILE") throw e;

    return null;
  }

  return builder.configs.reverse();
}

class ConfigChainBuilder {
  constructor(filename) {
    this.configs = [];
    this.filename = filename;
    this.possibleDirs = null;
  }

  /**
   * Tests if a filename should be ignored based on "ignore" and "only" options.
   */
  shouldIgnore(
    ignore: Array<string | RegExp | Function>,
    only?: Array<string | RegExp | Function>,
    dirname: string,
  ): boolean {
    if (!this.filename) return false;

    if (ignore) {
      if (!Array.isArray(ignore)) {
        throw new Error(`.ignore should be an array, was ${JSON.stringify(ignore)}`);
      }

      for (const pattern of ignore) {
        if (this.matchesPattern(pattern, dirname)) return true;
      }
    }

    if (only) {
      if (!Array.isArray(only)) {
        throw new Error(`.only should be an array, was ${JSON.stringify(only)}`);
      }

      for (const pattern of only) {
        if (this.matchesPattern(pattern, dirname)) return false;
      }
      return true;
    }

    return false;
  }

  /**
   * Returns result of calling function with filename if pattern is a function.
   * Otherwise returns result of matching pattern Regex with filename.
   */
  matchesPattern(pattern: string | Function | RegExp, dirname: string) {
    if (typeof pattern === "string") {
      // Lazy-init so we don't initialize this for files that have no glob patterns.
      if (!this.possibleDirs) {
        this.possibleDirs = [];

        if (this.filename) {
          this.possibleDirs.push(this.filename);

          let current = this.filename;
          while (true) {
            const previous = current;
            current = path.dirname(current);
            if (previous === current) break;

            this.possibleDirs.push(current);
          }
        }
      }

      return this.possibleDirs.some(micromatch.filter(path.resolve(dirname, pattern), {
        nocase: true,
        nonegate: true,
      }));
    } else if (typeof pattern === "function") {
      return pattern(this.filename);
    } else {
      return pattern.test(this.filename);
    }
  }

  findConfigs(loc: string) {
    if (!loc) return;

    if (!path.isAbsolute(loc)) {
      loc = path.join(process.cwd(), loc);
    }

    findConfigs(path.dirname(loc)).forEach(({ filepath, dirname, options }) => {
      this.mergeConfig({
        type: "options",
        options,
        alias: filepath,
        dirname,
      });
    });
  }

  mergeConfig({
    type,
    options,
    alias,
    loc,
    dirname,
  }) {
    if (!options) {
      return false;
    }

    // Bail out ASAP if this file is ignored so that we run as little logic as possible on ignored files.
    if (this.filename && this.shouldIgnore(options.ignore, options.only, dirname)) {
      // TODO(logan): This is a really cross way to bail out. Avoid this in rewrite.
      throw Object.assign(new Error("This file has been ignored."), { code: "BABEL_IGNORED_FILE" });
    }

    options = Object.assign({}, options);

    loc = loc || alias;

    // env
    const envKey = babel.getEnv();
    if (options.env) {
      const envOpts = options.env[envKey];
      delete options.env;

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
      loc,
      dirname,
    });

    // add extends clause
    if (options.extends) {
      const extendsConfig = loadConfig(options.extends, dirname);

      const existingConfig = this.configs.some((config) => {
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
      delete options.extends;
    }
  }
}

