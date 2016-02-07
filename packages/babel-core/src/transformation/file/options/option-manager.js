/* eslint max-len: 0 */

import * as context from "../../../api/node";
import type Logger from "../logger";
import Plugin from "../../plugin";
import * as messages from "babel-messages";
import { normaliseOptions } from "./index";
import resolve from "../../../helpers/resolve";
import json5 from "json5";
import isAbsolute from "path-is-absolute";
import pathExists from "path-exists";
import cloneDeepWith from "lodash/cloneDeepWith";
import clone from "lodash/clone";
import merge from "../../../helpers/merge";
import config from "./config";
import removed from "./removed";
import path from "path";
import fs from "fs";

let existsCache = {};
let jsonCache   = {};

const BABELIGNORE_FILENAME = ".babelignore";
const BABELRC_FILENAME     = ".babelrc";
const PACKAGE_FILENAME     = "package.json";

function exists(filename) {
  let cached = existsCache[filename];
  if (cached == null) {
    return existsCache[filename] = pathExists.sync(filename);
  } else {
    return cached;
  }
}

type PluginObject = {
  pre?: Function;
  post?: Function;
  manipulateOptions?: Function;

  visitor: ?{
    [key: string]: Function | {
      enter?: Function | Array<Function>;
      exit?: Function | Array<Function>;
    }
  };
};

type MergeOptions = {
  options?: Object,
  extending?: Object,
  alias: string,
  loc?: string,
  dirname?: string
};

export default class OptionManager {
  constructor(log?: Logger) {
    this.resolvedConfigs = [];
    this.options = OptionManager.createBareOptions();
    this.log = log;
  }

  resolvedConfigs: Array<string>;
  options: Object;
  log: ?Logger;

  static memoisedPlugins: Array<{
    container: Function;
    plugin: Plugin;
  }>;

  static memoisePluginContainer(fn, loc, i, alias) {
    for (let cache of (OptionManager.memoisedPlugins: Array<Object>)) {
      if (cache.container === fn) return cache.plugin;
    }

    let obj: ?PluginObject;

    if (typeof fn === "function") {
      obj = fn(context);
    } else {
      obj = fn;
    }

    if (typeof obj === "object") {
      let plugin = new Plugin(obj, alias);
      OptionManager.memoisedPlugins.push({
        container: fn,
        plugin: plugin
      });
      return plugin;
    } else {
      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj) + loc + i);
    }
  }

  static createBareOptions() {
    let opts = {};

    for (let key in config) {
      let opt = config[key];
      opts[key] = clone(opt.default);
    }

    return opts;
  }

  static normalisePlugin(plugin, loc, i, alias) {
    plugin = plugin.__esModule ? plugin.default : plugin;

    if (!(plugin instanceof Plugin)) {
      // allow plugin containers to be specified so they don't have to manually require
      if (typeof plugin === "function" || typeof plugin === "object") {
        plugin = OptionManager.memoisePluginContainer(plugin, loc, i, alias);
      } else {
        throw new TypeError(messages.get("pluginNotFunction", loc, i, typeof plugin));
      }
    }

    plugin.init(loc, i);

    return plugin;
  }

  static normalisePlugins(loc, dirname, plugins) {
    return plugins.map(function (val, i) {
      let plugin, options;

      if (!val) {
        throw new TypeError("Falsy value found in plugins");
      }

      // destructure plugins
      if (Array.isArray(val)) {
        [plugin, options] = val;
      } else {
        plugin = val;
      }

      let alias = typeof plugin === "string" ? plugin : `${loc}$${i}`;

      // allow plugins to be specified as strings
      if (typeof plugin === "string") {
        let pluginLoc = resolve(`babel-plugin-${plugin}`, dirname) || resolve(plugin, dirname);
        if (pluginLoc) {
          plugin = require(pluginLoc);
        } else {
          throw new ReferenceError(messages.get("pluginUnknown", plugin, loc, i, dirname));
        }
      }

      plugin = OptionManager.normalisePlugin(plugin, loc, i, alias);

      return [plugin, options];
    });
  }

  addConfig(loc: string, key?: string, json = json5): boolean {
    if (this.resolvedConfigs.indexOf(loc) >= 0) {
      return false;
    }

    let content = fs.readFileSync(loc, "utf8");
    let opts;

    try {
      opts = jsonCache[content] = jsonCache[content] || json.parse(content);
      if (key) opts = opts[key];
    } catch (err) {
      err.message = `${loc}: Error while parsing JSON - ${err.message}`;
      throw err;
    }

    this.mergeOptions({
      options: opts,
      alias: loc,
      dirname: path.dirname(loc)
    });
    this.resolvedConfigs.push(loc);

    return !!opts;
  }

  /**
   * This is called when we want to merge the input `opts` into the
   * base options (passed as the `extendingOpts`: at top-level it's the
   * main options, at presets level it's presets options).
   *
   *  - `alias` is used to output pretty traces back to the original source.
   *  - `loc` is used to point to the original config.
   *  - `dirname` is used to resolve plugins relative to it.
   */

  mergeOptions({
    options: rawOpts,
    extending: extendingOpts,
    alias,
    loc,
    dirname
  }: MergeOptions) {
    alias = alias || "foreign";
    if (!rawOpts) return;

    //
    if (typeof rawOpts !== "object" || Array.isArray(rawOpts)) {
      this.log.error(`Invalid options type for ${alias}`, TypeError);
    }

    //
    let opts = cloneDeepWith(rawOpts, (val) => {
      if (val instanceof Plugin) {
        return val;
      }
    });

    //
    dirname = dirname || process.cwd();
    loc = loc || alias;

    for (let key in opts) {
      let option = config[key];

      // check for an unknown option
      if (!option && this.log) {
        let pluginOptsInfo = "Check out http://babeljs.io/docs/usage/options/ for more info";

        if (removed[key]) {
          this.log.error(`Using removed Babel 5 option: ${alias}.${key} - ${removed[key].message}`, ReferenceError);
        } else {
          this.log.error(`Unknown option: ${alias}.${key}. ${pluginOptsInfo}`, ReferenceError);
        }
      }
    }

    // normalise options
    normaliseOptions(opts);

    // resolve plugins
    if (opts.plugins) {
      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
    }

    // add extends clause
    if (opts.extends) {
      let extendsLoc = resolve(opts.extends, dirname);
      if (extendsLoc) {
        this.addConfig(extendsLoc);
      } else {
        if (this.log) this.log.error(`Couldn't resolve extends clause of ${opts.extends} in ${alias}`);
      }
      delete opts.extends;
    }

    // resolve presets
    if (opts.presets) {
      // If we're in the "pass per preset" mode, we resolve the presets
      // and keep them for further execution to calculate the options.
      if (opts.passPerPreset) {
        opts.presets = this.resolvePresets(opts.presets, dirname, (preset, presetLoc) => {
          this.mergeOptions({
            options: preset,
            extending: preset,
            alias: presetLoc,
            loc: presetLoc,
            dirname: dirname
          });
        });
      } else {
        // Otherwise, just merge presets options into the main options.
        this.mergePresets(opts.presets, dirname);
        delete opts.presets;
      }
    }

    // env
    let envOpts;
    let envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (opts.env) {
      envOpts = opts.env[envKey];
      delete opts.env;
    }

    // Merge them into current extending options in case of top-level
    // options. In case of presets, just re-assign options which are got
    // normalized during the `mergeOptions`.
    if (rawOpts === extendingOpts) {
      Object.assign(extendingOpts, opts);
    } else {
      merge(extendingOpts || this.options, opts);
    }

    // merge in env options
    this.mergeOptions({
      options: envOpts,
      extending: extendingOpts,
      alias: `${alias}.env.${envKey}`,
      dirname: dirname
    });
  }

  /**
   * Merges all presets into the main options in case we are not in the
   * "pass per preset" mode. Otherwise, options are calculated per preset.
   */
  mergePresets(presets: Array<string | Object>, dirname: string) {
    this.resolvePresets(presets, dirname, (presetOpts, presetLoc) => {
      this.mergeOptions({
        options: presetOpts,
        alias: presetLoc,
        loc: presetLoc,
        dirname: path.dirname(presetLoc || "")
      });
    });
  }

  /**
   * Resolves presets options which can be either direct object data,
   * or a module name to require.
   */
  resolvePresets(presets: Array<string | Object>, dirname: string, onResolve?) {
    return presets.map((val) => {
      let options;
      if (Array.isArray(val)) {
        if (val.length > 2) {
          throw new Error(`Unexpected extra options ${JSON.stringify(val.slice(2))} many ` +
            "options passed to preset.");
        }

        [val, options] = val;
      }

      let presetLoc;
      if (typeof val === "string") {
        presetLoc = resolve(`babel-preset-${val}`, dirname) || resolve(val, dirname);
        if (!presetLoc) {
          throw new Error(`Couldn't find preset ${JSON.stringify(val)} relative to directory ` +
            JSON.stringify(dirname));
        }

        val = require(presetLoc);
      }

      if (typeof val !== "function" && options !== undefined) {
        throw new Error(`Options ${JSON.stringify(options)} passed to ` +
          (presetLoc || "a preset") + " which does not accept options.");
      }

      if (typeof val === "function") val = val(context, options);

      if (typeof val !== "object") {
        throw new Error(`Unsupported preset format: ${val}.`);
      }

      onResolve && onResolve(val);
      return val;
    });
  }

  addIgnoreConfig(loc) {
    let file  = fs.readFileSync(loc, "utf8");
    let lines = file.split("\n");

    lines = lines
      .map((line) => line.replace(/#(.*?)$/, "").trim())
      .filter((line) => !!line);

    this.mergeOptions({
      options: { ignore: lines },
      loc
    });
  }

  findConfigs(loc) {
    if (!loc) return;

    if (!isAbsolute(loc)) {
      loc = path.join(process.cwd(), loc);
    }

    let foundConfig = false;
    let foundIgnore = false;

    while (loc !== (loc = path.dirname(loc))) {
      if (!foundConfig) {
        let configLoc = path.join(loc, BABELRC_FILENAME);
        if (exists(configLoc)) {
          this.addConfig(configLoc);
          foundConfig = true;
        }

        let pkgLoc = path.join(loc, PACKAGE_FILENAME);
        if (!foundConfig && exists(pkgLoc)) {
          foundConfig = this.addConfig(pkgLoc, "babel", JSON);
        }
      }

      if (!foundIgnore) {
        let ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
        if (exists(ignoreLoc)) {
          this.addIgnoreConfig(ignoreLoc);
          foundIgnore = true;
        }
      }

      if (foundIgnore && foundConfig) return;
    }
  }

  normaliseOptions() {
    let opts = this.options;

    for (let key in config) {
      let option = config[key];
      let val    = opts[key];

      // optional
      if (!val && option.optional) continue;

      // aliases
      if (option.alias) {
        opts[option.alias] = opts[option.alias] || val;
      } else {
        opts[key] = val;
      }
    }
  }

  init(opts: Object = {}): Object {
    let filename = opts.filename;

    // resolve all .babelrc files
    if (opts.babelrc !== false) {
      this.findConfigs(filename);
    }

    // merge in base options
    this.mergeOptions({
      options: opts,
      alias: "base",
      dirname: filename && path.dirname(filename)
    });

    // normalise
    this.normaliseOptions(opts);

    return this.options;
  }
}

OptionManager.memoisedPlugins = [];
