import Plugin from "../../plugin";
import * as messages from "babel-messages";
import * as context from "../../../api/node";
import { normaliseOptions } from "./index";
import resolve from "../../../helpers/resolve";
import json5 from "json5";
import isAbsolute from "path-is-absolute";
import pathExists from "path-exists";
import clone from "lodash/lang/clone";
import merge from "../../../helpers/merge";
import config from "./config";
import path from "path";
import fs from "fs";

var existsCache = {};
var jsonCache   = {};

const BABELIGNORE_FILENAME = ".babelignore";
const BABELRC_FILENAME     = ".babelrc";
const PACKAGE_FILENAME     = "package.json";

function exists(filename) {
  var cached = existsCache[filename];
  if (cached != null) {
    return cached;
  } else {
    return existsCache[filename] = pathExists.sync(filename);
  }
}

export default class OptionManager {
  constructor(log, pipeline) {
    this.resolvedConfigs = [];
    this.options         = OptionManager.createBareOptions();
    this.pipeline        = pipeline;
    this.log             = log;
  }

  static memoisedPlugins = [];

  static memoisePluginContainer(fn, loc, i) {
    for (var cache of (OptionManager.memoisedPlugins: Array)) {
      if (cache.container === fn) return cache.plugin;
    }

    var obj = fn(context);

    if (typeof obj === "object") {
      var plugin = new Plugin(obj);
      OptionManager.memoisedPlugins.push({
        container: fn,
        plugin: plugin
      });
      return plugin;
    } else {
      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj));
    }
  }

  static createBareOptions() {
    var opts = {};

    for (var key in config) {
      var opt = config[key];
      opts[key] = clone(opt.default);
    }

    return opts;
  }

  static normalisePlugins(loc, dirname, plugins) {
    return plugins.map(function (val, i) {
      var plugin, options;

      // destructure plugins
      if (Array.isArray(val)) {
        [plugin, options] = val;
      } else {
        plugin = val;
      }

      // allow plugins to be specified as strings
      if (typeof plugin === "string") {
        var pluginLoc = resolve(`babel-plugin-${plugin}`, dirname) || resolve(plugin, dirname);
        if (pluginLoc) {
          plugin = require(pluginLoc);
        } else {
          throw new ReferenceError(messages.get("pluginUnknown", plugin, loc, i));
        }
      }

      // allow plugin containers to be specified so they don't have to manually require
      if (typeof plugin === "function") {
        plugin = OptionManager.memoisePluginContainer(plugin, loc, i);
      } else {
        throw new TypeError(messages.get("pluginNotFunction", loc, i));
      }

      // validate
      plugin.validate(loc, i);

      return [plugin, options];
    });
  }

  addConfig(loc, key?, json=json5) {
    if (this.resolvedConfigs.indexOf(loc) >= 0) return;

    var content = fs.readFileSync(loc, "utf8");
    var opts;

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

  mergeOptions(opts, alias = "foreign", loc, dirname) {
    if (!opts) return;

    dirname = dirname || process.cwd();
    loc = loc || alias;

    for (let key in opts) {
      let option = config[key];

      // check for an unknown option
      if (!option && this.log) this.log.error(`Unknown option: ${alias}.${key}`, ReferenceError);
    }

    // normalise options
    normaliseOptions(opts);

    // resolve plugins
    if (opts.plugins) {
      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
    }

    // add extends clause
    if (opts.extends) {
      this.addConfig(resolve(opts.extends, dirname));
      delete opts.extends;
    }

    // resolve presets
    if (opts.presets) {
      this.mergePresets(opts.presets, dirname);
      delete opts.presets;
    }

    var envOpts;
    var envKey = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
    if (opts.env) {
      envOpts = opts.env[envKey];
      delete opts.env;
    }

    // merge them into this current files options
    merge(this.options, opts);

    // merge in env options
    this.mergeOptions(envOpts, `${alias}.env.${envKey}`);
  }

  mergePresets(presets: Array, dirname) {
    for (var val of presets) {
      if (typeof val === "string") {
        var presetLoc = resolve(`babel-preset-${val}`, dirname) || resolve(val, dirname);
        if (presetLoc) {
          var presetOpts = require(presetLoc);
          this.mergeOptions(presetOpts, presetLoc, presetLoc, path.dirname(presetLoc));
        } else {
          throw new Error("todo");
        }
      } else if (typeof val === "object") {
        this.mergeOptions(val);
      } else {
        throw new Error("todo");
      }
    }
  }

  addIgnoreConfig(loc) {
    var file  = fs.readFileSync(loc, "utf8");
    var lines = file.split("\n");

    lines = lines.map(function (line) {
      return line.replace(/#(.*?)$/, "").trim();
    }).filter((line) => !!line);

    this.mergeOptions({ ignore: lines }, loc);
  }

  findConfigs(loc) {
    if (!loc) return;

    if (!isAbsolute(loc)) {
      loc = path.join(process.cwd(), loc);
    }

    var foundConfig = false;
    var foundIgnore = false;

    while (loc !== (loc = path.dirname(loc))) {
      if (!foundConfig) {
        var configLoc = path.join(loc, BABELRC_FILENAME);
        if (exists(configLoc)) {
          this.addConfig(configLoc);
          foundConfig = true;
        }

        var pkgLoc = path.join(loc, PACKAGE_FILENAME);
        if (exists(pkgLoc)) {
          this.addConfig(pkgLoc, "babel", JSON);
          foundConfig = true;
        }
      }

      if (!foundIgnore) {
        var ignoreLoc = path.join(loc, BABELIGNORE_FILENAME);
        if (exists(ignoreLoc)) {
          this.addIgnoreConfig(ignoreLoc);
          foundIgnore = true;
        }
      }

      if (foundIgnore && foundConfig) return;
    }
  }

  normaliseOptions() {
    var opts = this.options;

    for (let key in config) {
      var option = config[key];
      var val    = opts[key];

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

  init(opts) {
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
