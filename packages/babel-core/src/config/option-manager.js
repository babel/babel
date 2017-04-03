import * as context from "../index";
import Plugin from "./plugin";
import * as messages from "babel-messages";
import defaults from "lodash/defaults";
import cloneDeepWith from "lodash/cloneDeepWith";
import merge from "./helpers/merge";
import removed from "./removed";
import buildConfigChain from "./build-config-chain";
import path from "path";
import traverse from "babel-traverse";
import clone from "lodash/clone";

import { loadPlugin, loadPreset, loadParser, loadGenerator } from "./loading/files";

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
  type: "arguments"|"options"|"preset",
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

const ALLOWED_PLUGIN_KEYS = new Set([
  "name",
  "manipulateOptions",
  "pre",
  "post",
  "visitor",
  "inherits",
]);

export default class OptionManager {
  constructor() {
    this.options = OptionManager.createBareOptions();
  }

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

    if (typeof obj !== "object") {
      throw new TypeError(messages.get("pluginNotObject", loc, i, typeof obj) + loc + i);
    }
    Object.keys(obj).forEach((key) => {
      if (!ALLOWED_PLUGIN_KEYS.has(key)) {
        throw new Error(messages.get("pluginInvalidProperty", loc, i, key));
      }
    });
    if (obj.visitor && (obj.visitor.enter || obj.visitor.exit)) {
      throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. " +
        "Please target individual nodes.");
    }

    obj = Object.assign({}, obj, {
      visitor: clone(obj.visitor || {}),
    });

    traverse.explode(obj.visitor);

    if (obj.inherits) {
      const inherited = OptionManager.normalisePlugin(obj.inherits, loc, "inherits");

      obj.pre = OptionManager.chain(inherited.pre, obj.pre);
      obj.post = OptionManager.chain(inherited.post, obj.post);
      obj.manipulateOptions = OptionManager.chain(inherited.manipulateOptions, obj.manipulateOptions);
      obj.visitor = traverse.visitors.merge([inherited.visitor, obj.visitor]);
    }

    const plugin = new Plugin(obj, alias);
    OptionManager.memoisedPlugins.push({
      container: fn,
      plugin: plugin,
    });
    return plugin;
  }

  static chain(a, b) {
    const fns = [a, b].filter(Boolean);
    if (fns.length <= 1) return fns[0];

    return function(...args) {
      for (const fn of fns) {
        fn.apply(this, args);
      }
    };
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
        plugin = loadPlugin(plugin, dirname).plugin;
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
    type,
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

    if (type !== "arguments") {
      if (opts.filename !== undefined) {
        throw new Error(`${alias}.filename is only allowed as a root argument`);
      }

      if (opts.babelrc !== undefined) {
        throw new Error(`${alias}.babelrc is only allowed as a root argument`);
      }
    }

    if (type === "preset") {
      if (opts.only !== undefined) throw new Error(`${alias}.only is not supported in a preset`);
      if (opts.ignore !== undefined) throw new Error(`${alias}.ignore is not supported in a preset`);
      if (opts.extends !== undefined) throw new Error(`${alias}.extends is not supported in a preset`);
      if (opts.env !== undefined) throw new Error(`${alias}.env is not supported in a preset`);
    }

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

    if (opts.parserOpts && typeof opts.parserOpts.parser === "string") {
      opts.parserOpts.parser = loadParser(opts.parserOpts.parser, dirname).parser;
    }

    if (opts.generatorOpts && typeof opts.generatorOpts.generator === "string") {
      opts.generatorOpts.generator = loadGenerator(opts.generatorOpts.generator, dirname).generator;
    }

    // resolve plugins
    if (opts.plugins) {
      if (!Array.isArray(rawOpts.plugins)) throw new Error(`${alias}.plugins should be an array`);

      opts.plugins = OptionManager.normalisePlugins(loc, dirname, opts.plugins);
    }

    // resolve presets
    if (opts.presets) {
      if (!Array.isArray(rawOpts.presets)) throw new Error(`${alias}.presets should be an array`);

      opts.presets = this.resolvePresets(opts.presets, dirname, (preset, presetLoc) => {
        this.mergeOptions({
          type: "preset",
          options: preset,

          // For `passPerPreset` we merge child options back into the preset object instead of the root.
          extending: opts.passPerPreset ? preset : null,
          alias: presetLoc,
          loc: presetLoc,
          dirname: dirname,
        });
      });

      // If not passPerPreset, the plugins have all been merged into the parent config so the presets
      // list is not needed.
      if (!opts.passPerPreset) delete opts.presets;
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
          ({
            filepath: presetLoc,
            preset,
          } = loadPreset(preset, dirname));
        }
        const resolvedPreset = this.loadPreset(preset, options, { dirname });

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
    const configChain = buildConfigChain(opts);
    if (!configChain) return null;

    try {
      for (const config of configChain) {
        this.mergeOptions(config);
      }
    } catch (e) {
      // There are a few case where thrown errors will try to annotate themselves multiple times, so
      // to keep things simple we just bail out if re-wrapping the message.
      if (!/^\[BABEL\]/.test(e.message)) {
        e.message = `[BABEL] ${opts.filename || "unknown"}: ${e.message}`;
      }

      throw e;
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
