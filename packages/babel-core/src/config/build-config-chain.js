import * as babel from "../index";
import resolve from "./helpers/resolve";
import json5 from "json5";
import path from "path";
import fs from "fs";
import micromatch from "micromatch";

const existsCache = {};
const jsonCache = {};

const BABELRC_FILENAME = ".babelrc";
const BABELRC_JS_FILENAME = ".babelrc.js";
const PACKAGE_FILENAME = "package.json";
const BABELIGNORE_FILENAME = ".babelignore";

function exists(filename) {
  const cached = existsCache[filename];
  if (cached == null) {
    return existsCache[filename] = fs.existsSync(filename);
  } else {
    return cached;
  }
}

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
    this.resolvedConfigs = [];
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

  errorMultipleConfigs(loc1: string, loc2: string) {
    throw new Error(`Multiple configuration files found. Please remove one:\n- ${
      loc1}\n- ${loc2}`);
  }

  findConfigs(loc: string) {
    if (!loc) return;

    if (!path.isAbsolute(loc)) {
      loc = path.join(process.cwd(), loc);
    }

    let foundConfig = false;
    let foundIgnore = false;

    while (loc !== (loc = path.dirname(loc))) {
      if (!foundIgnore) {
        const ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
        if (exists(ignoreLoc)) {
          this.addIgnoreConfig(ignoreLoc);
          foundIgnore = true;
        }
      }

      if (!foundConfig) {
        const configLoc = path.join(loc, BABELRC_FILENAME);
        const configJSLoc = path.join(loc, BABELRC_JS_FILENAME);
        const pkgLoc = path.join(loc, PACKAGE_FILENAME);
        const configLocs = [configLoc, configJSLoc, pkgLoc];
        const foundConfigs = configLocs.reduce((arr, config) => {
          if (exists(config)) {
            const configAdded = config === pkgLoc
              ? this.addConfig(config, "babel", JSON)
              : this.addConfig(config);

            if (configAdded && arr.length) {
              this.errorMultipleConfigs(arr.pop(), config);
            }

            arr.push(config);
          }

          return arr;
        }, []);

        foundConfig = !!foundConfigs.length;
      }

      if (foundIgnore && foundConfig) return;
    }
  }

  addIgnoreConfig(loc: string) {
    const file = fs.readFileSync(loc, "utf8");
    let lines = file.split("\n");

    lines = lines
      .map((line) => line.replace(/#(.*?)$/, "").trim())
      .filter((line) => !!line);

    if (lines.length) {
      this.mergeConfig({
        type: "options",
        options: { ignore: lines },
        alias: loc,
        dirname: path.dirname(loc),
      });
    }
  }

  addConfig(loc: string, key?: string, json = json5): boolean {
    if (this.resolvedConfigs.indexOf(loc) >= 0) {
      return false;
    }

    this.resolvedConfigs.push(loc);

    let options;
    if (path.extname(loc) === ".js") {
      try {
        const configModule = require(loc);
        options = configModule && configModule.__esModule ? configModule.default : configModule;
      } catch (err) {
        err.message = `${loc}: Error while loading config - ${err.message}`;
        throw err;
      }

      if (!options || typeof options !== "object") {
        throw new Error("Configuration should be an exported JavaScript object.");
      }
    } else {
      const content = fs.readFileSync(loc, "utf8");
      try {
        options = jsonCache[content] = jsonCache[content] || json.parse(content);
      } catch (err) {
        err.message = `${loc}: Error while parsing JSON - ${err.message}`;
        throw err;
      }
    }

    if (key) {
      if (!options[key]) {
        return false;
      }

      options = options[key];
    }

    this.mergeConfig({
      type: "options",
      options,
      alias: loc,
      dirname: path.dirname(loc),
    });

    return !!options;
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
      const extendsLoc = resolve(options.extends, dirname);
      if (extendsLoc) {
        this.addConfig(extendsLoc);
      } else {
        throw new Error(`Couldn't resolve extends clause of ${options.extends} in ${alias}`);
      }
      delete options.extends;
    }
  }
}

