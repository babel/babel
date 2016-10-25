/* eslint max-len: 0 */

import * as context from "../../../api/node";
import type Logger from "../logger";
import Plugin from "../../plugin";
import * as messages from "babel-messages";
import { normaliseOptions } from "./index";
import resolve from "../../../helpers/resolve";
import cloneDeepWith from "lodash/cloneDeepWith";
import clone from "lodash/clone";
import merge from "../../../helpers/merge";
import config from "./config";
import removed from "./removed";
import buildConfigChain from "./build-config-chain";
import path from "path";

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
        if (removed[key]) {
          this.log.error(`Using removed Babel 5 option: ${alias}.${key} - ${removed[key].message}`, ReferenceError);
        } else {
          let unknownOptErr = `Unknown option: ${alias}.${key}. Check out http://babeljs.io/docs/usage/options/ for more information about options.`;
          let presetConfigErr = `A common cause of this error is the presence of a configuration options object without the corresponding preset name. Example:\n\nInvalid:\n  \`{ presets: [{option: value}] }\`\nValid:\n  \`{ presets: [['pluginName', {option: value}]] }\`\n\nFor more detailed information on preset configuration, please see http://babeljs.io/docs/plugins/#pluginpresets-options.`;

          this.log.error(`${unknownOptErr}\n\n${presetConfigErr}`, ReferenceError);
        }
      }
    }

    // normalise options
    normaliseOptions(opts);

    // resolve plugins
    if (opts.plugins) {
      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
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

    // Merge them into current extending options in case of top-level
    // options. In case of presets, just re-assign options which are got
    // normalized during the `mergeOptions`.
    if (rawOpts === extendingOpts) {
      Object.assign(extendingOpts, opts);
    } else {
      merge(extendingOpts || this.options, opts);
    }
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
          throw new Error(`Unexpected extra options ${JSON.stringify(val.slice(2))} passed to preset.`);
        }

        [val, options] = val;
      }

      let presetLoc;
      try {
        if (typeof val === "string") {
          presetLoc = resolve(`babel-preset-${val}`, dirname) || resolve(val, dirname);

          // trying to resolve @organization shortcat
          // @foo/es2015 -> @foo/babel-preset-es2015
          if (!presetLoc) {
            let matches = val.match(/^(@[^/]+)\/(.+)$/);
            if (matches) {
              let [, orgName, presetPath] = matches;
              val = `${orgName}/babel-preset-${presetPath}`;
              presetLoc = resolve(val, dirname);
            }
          }

          if (!presetLoc) {
            throw new Error(`Couldn't find preset ${JSON.stringify(val)} relative to directory ` +
              JSON.stringify(dirname));
          }

          val = require(presetLoc);
        }

        // If the imported preset is a transpiled ES2015 module
        if (typeof val === "object" && val.__esModule) {
          // Try to grab the default export.
          if (val.default) {
            val = val.default;
          } else {
            // If there is no default export we treat all named exports as options
            // and just remove the __esModule. This is to support presets that have been
            // exporting named exports in the past, although we definitely want presets to
            // only use the default export (with either an object or a function)
            const { __esModule, ...rest } = val; // eslint-disable-line no-unused-vars
            val = rest;
          }
        }

        // For compatibility with babel-core < 6.13.x, allow presets to export an object with a
        // a 'buildPreset' function that will return the preset itself, while still exporting a
        // simple object (rather than a function), for supporting old Babel versions.
        if (typeof val === "object" && val.buildPreset) val = val.buildPreset;


        if (typeof val !== "function" && options !== undefined) {
          throw new Error(`Options ${JSON.stringify(options)} passed to ` +
            (presetLoc || "a preset") + " which does not accept options.");
        }

        if (typeof val === "function") val = val(context, options);

        if (typeof val !== "object") {
          throw new Error(`Unsupported preset format: ${val}.`);
        }

        onResolve && onResolve(val, presetLoc);
      } catch (e) {
        if (presetLoc) {
          e.message += ` (While processing preset: ${JSON.stringify(presetLoc)})`;
        }
        throw e;
      }
      return val;
    });
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
    for (let config of buildConfigChain(opts, this.log)) {
      this.mergeOptions(config);
    }

    // normalise
    this.normaliseOptions(opts);

    return this.options;
  }
}

OptionManager.memoisedPlugins = [];
