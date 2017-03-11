import resolve from "../../../helpers/resolve";
import json5 from "json5";
import path from "path";
import fs from "fs";

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
  const filename = opts.filename;
  const builder = new ConfigChainBuilder();

  // resolve all .babelrc files
  if (opts.babelrc !== false) {
    builder.findConfigs(filename);
  }

  builder.mergeConfig({
    options: opts,
    alias: "base",
    dirname: filename && path.dirname(filename),
  });

  return builder.configs;
}

class ConfigChainBuilder {
  constructor() {
    this.resolvedConfigs = [];
    this.configs = [];
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

      if (!foundIgnore) {
        const ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
        if (exists(ignoreLoc)) {
          this.addIgnoreConfig(ignoreLoc);
          foundIgnore = true;
        }
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
      options,
      alias: loc,
      dirname: path.dirname(loc),
    });

    return !!options;
  }

  mergeConfig({
    options,
    alias,
    loc,
    dirname,
  }) {
    if (!options) {
      return false;
    }

    options = Object.assign({}, options);

    dirname = dirname || process.cwd();
    loc = loc || alias;

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

    this.configs.push({
      options,
      alias,
      loc,
      dirname,
    });

    // env
    let envOpts;
    const envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (options.env) {
      envOpts = options.env[envKey];
      delete options.env;
    }

    this.mergeConfig({
      options: envOpts,
      alias: `${alias}.env.${envKey}`,
      dirname: dirname,
    });
  }
}

