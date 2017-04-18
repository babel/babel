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

    if (ignore && !Array.isArray(ignore)) {
      throw new Error(`.ignore should be an array, ${JSON.stringify(ignore)} given`);
    }

    if (only && !Array.isArray(only)) {
      throw new Error(`.only should be an array, ${JSON.stringify(only)} given`);
    }

    return (ignore && this.matchesPatterns(ignore, dirname)) ||
      (only && !this.matchesPatterns(only, dirname));
  }

  /**
   * Returns result of calling function with filename if pattern is a function.
   * Otherwise returns result of matching pattern Regex with filename.
   */
  matchesPatterns(patterns: Array<string | Function | RegExp>, dirname: string) {
    const res = [];
    const strings = [];
    const fns = [];

    patterns.forEach((pattern) => {
      const type = typeof pattern;
      if (type === "string") strings.push(pattern);
      else if (type === "function") fns.push(pattern);
      else res.push(pattern);
    });

    if (res.some((re) => re.test(this.filename))) return true;
    if (fns.some((fn) => fn(this.filename))) return true;

    if (strings.length > 0) {
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

      const absolutePatterns = strings.map((pattern) => {
        // Preserve the "!" prefix so that micromatch can use it for negation.
        const negate = pattern[0] === "!";
        if (negate) pattern = pattern.slice(1);

        return (negate ? "!" : "") + path.resolve(dirname, pattern);
      });

      if (micromatch(this.possibleDirs, absolutePatterns, { nocase: true }).length > 0) {
        return true;
      }
    }

    return false;
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

