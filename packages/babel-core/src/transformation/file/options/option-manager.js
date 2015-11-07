/* @flow */

import * as context from "../../../api/node";
import type Logger from "../logger";
import Plugin from "../../plugin";
import * as messages from "babel-messages";
import { normaliseOptions } from "./index";
import resolve from "../../../helpers/resolve";
import json5 from "json5";
import isAbsolute from "path-is-absolute";
import pathExists from "path-exists";
import cloneDeep from "lodash/lang/cloneDeep";
import clone from "lodash/lang/clone";
import merge from "../../../helpers/merge";
import config from "./config";
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

  static memoisePluginContainer(fn, loc, i) {
    for (let cache of (OptionManager.memoisedPlugins: Array<Object>)) {
      if (cache.container === fn) return cache.plugin;
    }

    let obj;

    if (typeof fn === "function") {
      obj = fn(context);
    } else {
      obj = fn;
    }

    if (typeof obj === "object") {
      let plugin = new Plugin(obj);
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

  static normalisePlugin(plugin, loc, i) {
    if (!(plugin instanceof Plugin)) {
      // allow plugin containers to be specified so they don't have to manually require
      if (typeof plugin === "function" || typeof plugin === "object") {
        plugin = OptionManager.memoisePluginContainer(plugin, loc, i);
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

      // destructure plugins
      if (Array.isArray(val)) {
        [plugin, options] = val;
      } else {
        plugin = val;
      }

      // allow plugins to be specified as strings
      if (typeof plugin === "string") {
        let pluginLoc = resolve(`babel-plugin-${plugin}`, dirname) || resolve(plugin, dirname);
        if (pluginLoc) {
          plugin = require(pluginLoc);
          plugin = plugin.__esModule ? plugin.default : plugin;
        } else {
          throw new ReferenceError(messages.get("pluginUnknown", plugin, loc, i));
        }
      }

      plugin = OptionManager.normalisePlugin(plugin, loc, i);

      return [plugin, options];
    });
  }

  addConfig(loc: string, key?: string, json = json5) {
    if (this.resolvedConfigs.indexOf(loc) >= 0) return;

    let content = fs.readFileSync(loc, "utf8");
    let opts;

    try {
      opts = jsonCache[content] = jsonCache[content] || json.parse(content);
      if (key) opts = opts[key];
    } catch (err) {
      err.message = `${loc}: Error while parsing JSON - ${err.message}`;
      throw err;
    }

    this.mergeOptions(opts, loc);
    this.resolvedConfigs.push(loc);
  }

  /**
   * This is called when we want to merge the input `opts` into our
   * base options.
   *
   *  - `alias` is used to output pretty traces back to the original source.
   *  - `loc` is used to point to the original config.
   *  - `dirname` is used to resolve plugins relative to it.
   */

  mergeOptions(rawOpts?: Object, alias: string = "foreign", loc?: string, dirname?: string) {
    if (!rawOpts) return;

    //
    if (typeof rawOpts !== "object" || Array.isArray(rawOpts)) {
      this.log.error(`Invalid options type for ${alias}`, TypeError);
    }

    //
    let opts = cloneDeep(rawOpts, val => {
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
        this.log.error(`Unknown option: ${alias}.${key}`, ReferenceError);
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
      this.mergePresets(opts.presets, dirname);
      delete opts.presets;
    }

    // env
    let envOpts;
    let envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (opts.env) {
      envOpts = opts.env[envKey];
      delete opts.env;
    }

    // merge them into this current files options
    merge(this.options, opts);

    // merge in env options
    this.mergeOptions(envOpts, `${alias}.env.${envKey}`);
  }

  mergePresets(presets: Array<string | Object>, dirname: string) {
    const presetsLoc = presets.map(val =>
      (typeof val === "string")
        ? resolve(`babel-preset-${val}`, dirname) || resolve(val, dirname)
        : val);

    if (presetsLoc.length == 0) {
      throw new Error("Couldn't find presets at all");
    }

    for (let val of presets) {
      if (typeof val === "string") {
        let presetLoc = resolve(`babel-preset-${val}`, dirname) || resolve(val, dirname);
        if (presetLoc) {
          let presetOpts = require(presetLoc);
          this.mergeOptions(presetOpts, presetLoc, presetLoc, path.dirname(presetLoc));
        }
      } else if (typeof val === "object") {
        this.mergeOptions(val);
      } else {
        throw new Error("todo");
      }
    }
  }

  addIgnoreConfig(loc) {
    let file  = fs.readFileSync(loc, "utf8");
    let lines = file.split("\n");

    lines = lines
      .map((line) => line.replace(/#(.*?)$/, "").trim())
      .filter((line) => !!line);

    this.mergeOptions({ ignore: lines }, loc);
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
        if (exists(pkgLoc)) {
          this.addConfig(pkgLoc, "babel", JSON);
          foundConfig = true;
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

  init(opts: Object): Object {
    // resolve all .babelrc files
    if (opts.babelrc !== false) {
      this.findConfigs(opts.filename);
    }

    // merge in base options
    this.mergeOptions(opts, "base");

    // normalise
    this.normaliseOptions(opts);

    return this.options;
  }
}

OptionManager.memoisedPlugins = [];
