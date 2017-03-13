import * as context from "../../../index";
import Plugin from "../../plugin";
import * as messages from "babel-messages";
import resolvePlugin from "../../../helpers/resolve-plugin";
import resolvePreset from "../../../helpers/resolve-preset";
import defaults from "lodash/defaults";
import cloneDeepWith from "lodash/cloneDeepWith";
import merge from "../../../helpers/merge";
import removed from "./removed";
import buildConfigChain from "./build-config-chain";
import path from "path";
import * as util from "../../../util";

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

const optionNames = new Set([
  "filename",
  "filenameRelative",
  "inputSourceMap",
  "env",
  "mode",
  "retainLines",
  "highlightCode",
  "suppressDeprecationMessages",
  "presets",
  "plugins",
  "ignore",
  "only",
  "code",
  "metadata",
  "ast",
  "extends",
  "comments",
  "shouldPrintComment",
  "wrapPluginVisitorMethod",
  "compact",
  "minified",
  "sourceMaps",
  "sourceMapTarget",
  "sourceFileName",
  "sourceRoot",
  "babelrc",
  "sourceType",
  "auxiliaryCommentBefore",
  "auxiliaryCommentAfter",
  "resolveModuleSource",
  "getModuleId",
  "moduleRoot",
  "moduleIds",
  "moduleId",
  "passPerPreset",
  // Deprecate top level parserOpts
  "parserOpts",
  // Deprecate top level generatorOpts
  "generatorOpts",
]);

export default class OptionManager {
  constructor() {
    this.resolvedConfigs = [];
    this.options = OptionManager.createBareOptions();
  }

  resolvedConfigs: Array<string>;
  options: Object;

  static memoisedPlugins: Array<{
    container: Function;
    plugin: Plugin;
  }>;

  static memoisePluginContainer(fn, loc, i, alias) {
    for (const cache of (OptionManager.memoisedPlugins: Array<Object>)) {
      if (cache.container === fn) return cache.plugin;
    }

    let obj: ?PluginObject;

    if (typeof fn === "function") {
      obj = fn(context);
    } else {
      obj = fn;
    }

    if (typeof obj === "object") {
      const plugin = new Plugin(obj, alias);
      OptionManager.memoisedPlugins.push({
        container: fn,
        plugin: plugin,
      });
      return plugin;
    } else {
      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj) + loc + i);
    }
  }

  static createBareOptions() {
    return {
      sourceType: "module",
      babelrc: true,
      filename: "unknown",
      code: true,
      metadata: true,
      ast: true,
      comments: true,
      compact: "auto",
      highlightCode: true,
    };
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

      const alias = typeof plugin === "string" ? plugin : `${loc}$${i}`;

      // allow plugins to be specified as strings
      if (typeof plugin === "string") {
        const pluginLoc = resolvePlugin(plugin, dirname);
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
    dirname,
  }: MergeOptions) {
    alias = alias || "foreign";
    if (!rawOpts) return;

    //
    if (typeof rawOpts !== "object" || Array.isArray(rawOpts)) {
      throw new TypeError(`Invalid options type for ${alias}`);
    }

    //
    const opts = cloneDeepWith(rawOpts, (val) => {
      if (val instanceof Plugin) {
        return val;
      }
    });

    //
    dirname = dirname || process.cwd();
    loc = loc || alias;

    if (opts.sourceMap !== undefined) {
      if (opts.sourceMaps !== undefined) {
        throw new Error(`Both ${alias}.sourceMap and .sourceMaps have been set`);
      }

      opts.sourceMaps = opts.sourceMap;
      delete opts.sourceMap;
    }

    for (const key in opts) {
      // check for an unknown option
      if (!optionNames.has(key)) {
        if (removed[key]) {
          throw new ReferenceError(`Using removed Babel 5 option: ${alias}.${key} - ${removed[key].message}`);
        } else {
          // eslint-disable-next-line max-len
          const unknownOptErr = `Unknown option: ${alias}.${key}. Check out http://babeljs.io/docs/usage/options/ for more information about options.`;

          throw new ReferenceError(unknownOptErr);
        }
      }
    }

    if (opts.ignore) {
      if (!Array.isArray(rawOpts.ignore)) throw new Error(`${alias}.ignore should be an array`);

      opts.ignore = opts.ignore.map(util.regexify);
    }
    if (opts.only) {
      if (!Array.isArray(rawOpts.only)) throw new Error(`${alias}.only should be an array`);

      opts.only = opts.only.map(util.regexify);
    }

    // resolve plugins
    if (opts.plugins) {
      if (!Array.isArray(rawOpts.plugins)) throw new Error(`${alias}.plugins should be an array`);

      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
    }

    // resolve presets
    if (opts.presets) {
      if (!Array.isArray(rawOpts.presets)) throw new Error(`${alias}.presets should be an array`);

      // If we're in the "pass per preset" mode, we resolve the presets
      // and keep them for further execution to calculate the options.
      if (opts.passPerPreset) {
        opts.presets = this.resolvePresets(opts.presets, dirname, (preset, presetLoc) => {
          this.mergeOptions({
            options: preset,
            extending: preset,
            alias: presetLoc,
            loc: presetLoc,
            dirname: dirname,
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
        dirname: path.dirname(presetLoc || ""),
      });
    });
  }

  /**
   * Resolves presets options which can be either direct object data,
   * or a module name to require.
   */
  resolvePresets(presets: Array<string | Object>, dirname: string, onResolve?) {
    return presets.map((preset) => {
      let options;
      if (Array.isArray(preset)) {
        if (preset.length > 2) {
          throw new Error(`Unexpected extra options ${JSON.stringify(preset.slice(2))} passed to preset.`);
        }

        [preset, options] = preset;
      }

      let presetLoc;
      try {
        if (typeof preset === "string") {
          presetLoc = resolvePreset(preset, dirname);

          if (!presetLoc) {
            throw new Error(`Couldn't find preset ${JSON.stringify(preset)} relative to directory ` +
              JSON.stringify(dirname));
          }
        }
        const resolvedPreset = this.loadPreset(presetLoc || preset, options, { dirname });

        if (onResolve) onResolve(resolvedPreset, presetLoc);

        return resolvedPreset;
      } catch (e) {
        if (presetLoc) {
          e.message += ` (While processing preset: ${JSON.stringify(presetLoc)})`;
        }
        throw e;
      }
    });
  }

  /**
   * Tries to load one preset. The input is either the module name of the preset,
   * a function, or an object
   */
  loadPreset(preset, options, meta) {
    let presetFactory = preset;
    if (typeof presetFactory === "string") {
      presetFactory = require(presetFactory);
    }

    if (typeof presetFactory === "object" && presetFactory.__esModule) {
      if (presetFactory.default) {
        presetFactory = presetFactory.default;
      } else {
        throw new Error("Preset must export a default export when using ES6 modules.");
      }
    }

    // Allow simple object exports
    if (typeof presetFactory === "object") {
      return presetFactory;
    }

    if (typeof presetFactory !== "function") {
      // eslint-disable-next-line max-len
      throw new Error(`Unsupported preset format: ${typeof presetFactory}. Expected preset to return a function.`);
    }

    return presetFactory(context, options, meta);
  }

  init(opts: Object = {}): Object {
    for (const config of buildConfigChain(opts)) {
      this.mergeOptions(config);
    }

    opts = this.options;

    if (opts.inputSourceMap) {
      opts.sourceMaps = true;
    }

    if (opts.moduleId) {
      opts.moduleIds = true;
    }

    defaults(opts, {
      moduleRoot: opts.sourceRoot,
    });

    defaults(opts, {
      sourceRoot: opts.moduleRoot,
    });

    defaults(opts, {
      filenameRelative: opts.filename,
    });

    const basenameRelative = path.basename(opts.filenameRelative);

    defaults(opts, {
      sourceFileName: basenameRelative,
      sourceMapTarget: basenameRelative,
    });

    return opts;
  }
}

OptionManager.memoisedPlugins = [];
