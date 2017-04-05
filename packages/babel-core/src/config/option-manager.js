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

export default function manageOptions(opts?: Object) {
  return new OptionManager().init(opts);
}

class OptionManager {
  constructor() {
    this.options = createBareOptions();
    this.passes = [[]];
  }

  options: Object;
  passes: Array<Array<Plugin>>;

  /**
   * This is called when we want to merge the input `opts` into the
   * base options.
   *
   *  - `alias` is used to output pretty traces back to the original source.
   *  - `loc` is used to point to the original config.
   *  - `dirname` is used to resolve plugins relative to it.
   */

  mergeOptions({
    type,
    options: rawOpts,
    alias,
    loc,
    dirname,
  }: MergeOptions, pass?: Array<Plugin>) {
    alias = alias || "foreign";

    if (!pass) pass = this.passes[0];

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
      opts.parserOpts.parser = loadParser(opts.parserOpts.parser, dirname).value;
    }

    if (opts.generatorOpts && typeof opts.generatorOpts.generator === "string") {
      opts.generatorOpts.generator = loadGenerator(opts.generatorOpts.generator, dirname).value;
    }

    // const plugins =

    // resolve presets
    if (opts.presets) {
      if (!Array.isArray(rawOpts.presets)) throw new Error(`${alias}.presets should be an array`);

      const presets = resolvePresets(opts.presets, dirname);

      let presetPasses = null;
      if (opts.passPerPreset) {
        presetPasses = presets.map(() => []);
        // The passes are created in the same order as the preset list, but are inserted before any
        // existing additional passes.
        this.passes.splice(1, 0, ...presetPasses);
      }

      presets.forEach(([preset, presetLoc], i) => {
        this.mergeOptions({
          type: "preset",
          options: preset,
          alias: presetLoc,
          loc: presetLoc,
          dirname: dirname,
        }, presetPasses ? presetPasses[i] : pass);
      });
    }

    // resolve plugins
    if (opts.plugins) {
      if (!Array.isArray(rawOpts.plugins)) throw new Error(`${alias}.plugins should be an array`);

      pass.unshift(...normalisePlugins(loc, dirname, opts.plugins));
    }

    delete opts.passPerPreset;
    delete opts.plugins;
    delete opts.presets;

    merge(this.options, opts);
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

    // Tack the passes onto the object itself so that, if this object is passed back to Babel a second time,
    // it will be in the right structure to not change behavior.
    opts.plugins = this.passes[0];
    opts.presets = this.passes.slice(1)
      .filter((plugins) => plugins.length > 0)
      .map((plugins) => ({ plugins }));

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

    return {
      options: opts,
      passes: this.passes,
    };
  }
}

/**
 * Resolves presets options which can be either direct object data,
 * or a module name to require.
 */
function resolvePresets(presets: Array<string | Object>, dirname: string) {
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
          value: preset,
        } = loadPreset(preset, dirname));
      }
      const resolvedPreset = loadPresetObject(preset, options, { dirname });

      return [ resolvedPreset, presetLoc ];
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
function loadPresetObject(preset, options, meta) {
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


const memoisedPlugins: Array<{
  container: Function;
  plugin: Plugin;
}> = [];

function memoisePluginContainer(fn, loc, i, alias) {
  for (const cache of (memoisedPlugins: Array<Object>)) {
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
    const inherited = normalisePlugin(obj.inherits, loc, "inherits");

    obj.pre = chain(inherited.pre, obj.pre);
    obj.post = chain(inherited.post, obj.post);
    obj.manipulateOptions = chain(inherited.manipulateOptions, obj.manipulateOptions);
    obj.visitor = traverse.visitors.merge([inherited.visitor, obj.visitor]);
  }

  const plugin = new Plugin(obj, alias);
  memoisedPlugins.push({
    container: fn,
    plugin: plugin,
  });
  return plugin;
}

function chain(a, b) {
  const fns = [a, b].filter(Boolean);
  if (fns.length <= 1) return fns[0];

  return function(...args) {
    for (const fn of fns) {
      fn.apply(this, args);
    }
  };
}

function createBareOptions() {
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

function normalisePlugin(plugin, loc, i, alias) {
  plugin = plugin.__esModule ? plugin.default : plugin;

  if (!(plugin instanceof Plugin)) {
    // allow plugin containers to be specified so they don't have to manually require
    if (typeof plugin === "function" || typeof plugin === "object") {
      plugin = memoisePluginContainer(plugin, loc, i, alias);
    } else {
      throw new TypeError(messages.get("pluginNotFunction", loc, i, typeof plugin));
    }
  }

  return plugin;
}

function normalisePlugins(loc, dirname, plugins) {
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
      plugin = loadPlugin(plugin, dirname).value;
    }

    plugin = normalisePlugin(plugin, loc, i, alias);

    return [plugin, options];
  });
}
