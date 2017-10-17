// @flow

import * as context from "../index";
import Plugin from "./plugin";
import defaults from "lodash/defaults";
import merge from "lodash/merge";
import removed from "./removed";
import buildConfigChain from "./build-config-chain";
import path from "path";
import traverse from "@babel/traverse";
import clone from "lodash/clone";
import { makeWeakCache } from "./caching";
import { getEnv } from "./helpers/environment";

import {
  loadPlugin,
  loadPreset,
  loadParser,
  loadGenerator,
} from "./loading/files";

type MergeOptions = {
  +type: "arguments" | "options" | "preset",
  options: {},
  alias: string,
  loc: string,
  dirname: string,
};

const optionNames = new Set([
  "filename",
  "filenameRelative",
  "inputSourceMap",
  "env",
  "retainLines",
  "highlightCode",
  "presets",
  "plugins",
  "ignore",
  "only",
  "code",
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

export default function manageOptions(opts: {}): {
  options: Object,
  passes: Array<Array<Plugin>>,
} | null {
  return new OptionManager().init(opts);
}

class OptionManager {
  constructor() {
    this.options = createInitialOptions();
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

  mergeOptions(config: MergeOptions, pass?: Array<Plugin>) {
    const result = loadConfig(config);

    const plugins = result.plugins.map(descriptor =>
      loadPluginDescriptor(descriptor),
    );
    const presets = result.presets.map(descriptor =>
      loadPresetDescriptor(descriptor),
    );

    if (
      config.options.passPerPreset != null &&
      typeof config.options.passPerPreset !== "boolean"
    ) {
      throw new Error(".passPerPreset must be a boolean or undefined");
    }
    const passPerPreset = config.options.passPerPreset;
    pass = pass || this.passes[0];

    // resolve presets
    if (presets.length > 0) {
      let presetPasses = null;
      if (passPerPreset) {
        presetPasses = presets.map(() => []);
        // The passes are created in the same order as the preset list, but are inserted before any
        // existing additional passes.
        this.passes.splice(1, 0, ...presetPasses);
      }

      presets.forEach((presetConfig, i) => {
        this.mergeOptions(presetConfig, presetPasses ? presetPasses[i] : pass);
      });
    }

    // resolve plugins
    if (plugins.length > 0) {
      pass.unshift(...plugins);
    }

    merge(this.options, result.options);
  }

  init(opts: {}) {
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
        const filename =
          typeof opts.filename === "string" ? opts.filename : null;
        e.message = `[BABEL] ${filename || "unknown"}: ${e.message}`;
      }

      throw e;
    }

    opts = this.options;

    // Tack the passes onto the object itself so that, if this object is passed back to Babel a second time,
    // it will be in the right structure to not change behavior.
    opts.plugins = this.passes[0];
    opts.presets = this.passes
      .slice(1)
      .filter(plugins => plugins.length > 0)
      .map(plugins => ({ plugins }));

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

    if (path.extname(opts.filenameRelative) === ".mjs") {
      opts.sourceType = "module";
    }

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

type BasicDescriptor = {
  value: {} | Function,
  options: {} | void,
  dirname: string,
  alias: string,
  loc: string,
};

type LoadedDescriptor = {
  value: {},
  options: {},
  dirname: string,
  alias: string,
  loc: string,
};

/**
 * Load and validate the given config into a set of options, plugins, and presets.
 */
const loadConfig = makeWeakCache((config): {
  options: {},
  plugins: Array<BasicDescriptor>,
  presets: Array<BasicDescriptor>,
} => {
  const options = normalizeOptions(config);

  if (
    config.options.plugins != null &&
    !Array.isArray(config.options.plugins)
  ) {
    throw new Error(".plugins should be an array, null, or undefined");
  }

  const plugins = (config.options.plugins || []).map((plugin, index) => {
    const { filepath, value, options } = normalizePair(
      plugin,
      loadPlugin,
      config.dirname,
    );

    return {
      alias: filepath || `${config.loc}$${index}`,
      loc: filepath || config.loc,
      value,
      options,
      dirname: config.dirname,
    };
  });

  if (
    config.options.presets != null &&
    !Array.isArray(config.options.presets)
  ) {
    throw new Error(".presets should be an array, null, or undefined");
  }

  const presets = (config.options.presets || []).map((preset, index) => {
    const { filepath, value, options } = normalizePair(
      preset,
      loadPreset,
      config.dirname,
    );

    return {
      alias: filepath || `${config.loc}$${index}`,
      loc: filepath || config.loc,
      value,
      options,
      dirname: config.dirname,
    };
  });

  return { options, plugins, presets };
});

/**
 * Load a generic plugin/preset from the given descriptor loaded from the config object.
 */
const loadDescriptor = makeWeakCache(
  (
    { value, options = {}, dirname, alias, loc }: BasicDescriptor,
    cache,
  ): LoadedDescriptor => {
    let item = value;
    if (typeof value === "function") {
      const api = Object.assign(Object.create(context), {
        cache,
        env: () => cache.using(() => getEnv()),
      });

      try {
        item = value(api, options, dirname);
      } catch (e) {
        if (alias) {
          e.message += ` (While processing: ${JSON.stringify(alias)})`;
        }
        throw e;
      }
    }

    if (!item || typeof item !== "object") {
      throw new Error("Plugin/Preset did not return an object.");
    }

    return { value: item, options, dirname, alias, loc };
  },
);

/**
 * Instantiate a plugin for the given descriptor, returning the plugin/options pair.
 */
function loadPluginDescriptor(descriptor: BasicDescriptor): Plugin {
  if (descriptor.value instanceof Plugin) {
    if (descriptor.options) {
      throw new Error(
        "Passed options to an existing Plugin instance will not work.",
      );
    }

    return descriptor.value;
  }

  return instantiatePlugin(loadDescriptor(descriptor));
}

const instantiatePlugin = makeWeakCache(
  (
    { value: pluginObj, options, dirname, alias, loc }: LoadedDescriptor,
    cache,
  ): Plugin => {
    Object.keys(pluginObj).forEach(key => {
      if (!ALLOWED_PLUGIN_KEYS.has(key)) {
        throw new Error(
          `Plugin ${alias} provided an invalid property of ${key}`,
        );
      }
    });
    if (
      pluginObj.visitor &&
      (pluginObj.visitor.enter || pluginObj.visitor.exit)
    ) {
      throw new Error(
        "Plugins aren't allowed to specify catch-all enter/exit handlers. " +
          "Please target individual nodes.",
      );
    }

    const plugin = Object.assign({}, pluginObj, {
      visitor: clone(pluginObj.visitor || {}),
    });

    traverse.explode(plugin.visitor);

    let inheritsDescriptor;
    let inherits;
    if (plugin.inherits) {
      inheritsDescriptor = {
        alias: `${loc}$inherits`,
        loc,
        value: plugin.inherits,
        options,
        dirname,
      };

      // If the inherited plugin changes, reinstantiate this plugin.
      inherits = cache.invalidate(() =>
        loadPluginDescriptor(inheritsDescriptor),
      );

      plugin.pre = chain(inherits.pre, plugin.pre);
      plugin.post = chain(inherits.post, plugin.post);
      plugin.manipulateOptions = chain(
        inherits.manipulateOptions,
        plugin.manipulateOptions,
      );
      plugin.visitor = traverse.visitors.merge([
        inherits.visitor,
        plugin.visitor,
      ]);
    }

    return new Plugin(plugin, options, alias);
  },
);

/**
 * Generate a config object that will act as the root of a new nested config.
 */
const loadPresetDescriptor = (descriptor: BasicDescriptor): MergeOptions => {
  return instantiatePreset(loadDescriptor(descriptor));
};

const instantiatePreset = makeWeakCache(
  ({ value, dirname, alias, loc }: LoadedDescriptor): MergeOptions => {
    return {
      type: "preset",
      options: value,
      alias,
      loc,
      dirname,
    };
  },
);

/**
 * Validate and return the options object for the config.
 */
function normalizeOptions(config) {
  const alias = config.alias || "foreign";
  const type = config.type;

  //
  if (typeof config.options !== "object" || Array.isArray(config.options)) {
    throw new TypeError(`Invalid options type for ${alias}`);
  }

  //
  const options = Object.assign({}, config.options);

  if (type !== "arguments") {
    if (options.filename !== undefined) {
      throw new Error(`${alias}.filename is only allowed as a root argument`);
    }

    if (options.babelrc !== undefined) {
      throw new Error(`${alias}.babelrc is only allowed as a root argument`);
    }
  }

  if (type === "preset") {
    if (options.only !== undefined) {
      throw new Error(`${alias}.only is not supported in a preset`);
    }
    if (options.ignore !== undefined) {
      throw new Error(`${alias}.ignore is not supported in a preset`);
    }
    if (options.extends !== undefined) {
      throw new Error(`${alias}.extends is not supported in a preset`);
    }
    if (options.env !== undefined) {
      throw new Error(`${alias}.env is not supported in a preset`);
    }
  }

  if (options.sourceMap !== undefined) {
    if (options.sourceMaps !== undefined) {
      throw new Error(`Both ${alias}.sourceMap and .sourceMaps have been set`);
    }

    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }

  for (const key in options) {
    // check for an unknown option
    if (!optionNames.has(key)) {
      if (removed[key]) {
        const { message, version = 5 } = removed[key];

        throw new ReferenceError(
          `Using removed Babel ${version} option: ${alias}.${key} - ${message}`,
        );
      } else {
        // eslint-disable-next-line max-len
        const unknownOptErr = `Unknown option: ${alias}.${key}. Check out http://babeljs.io/docs/usage/options/ for more information about options.`;

        throw new ReferenceError(unknownOptErr);
      }
    }
  }

  if (options.parserOpts && typeof options.parserOpts.parser === "string") {
    options.parserOpts = Object.assign({}, options.parserOpts);
    options.parserOpts.parser = loadParser(
      options.parserOpts.parser,
      config.dirname,
    ).value;
  }

  if (
    options.generatorOpts &&
    typeof options.generatorOpts.generator === "string"
  ) {
    options.generatorOpts = Object.assign({}, options.generatorOpts);
    options.generatorOpts.generator = loadGenerator(
      options.generatorOpts.generator,
      config.dirname,
    ).value;
  }

  delete options.passPerPreset;
  delete options.plugins;
  delete options.presets;

  return options;
}

/**
 * Given a plugin/preset item, resolve it into a standard format.
 */
function normalizePair(
  pair: mixed,
  resolver,
  dirname,
): {
  filepath: string | null,
  value: {} | Function,
  options: {} | void,
} {
  let options;
  let value = pair;
  if (Array.isArray(pair)) {
    if (pair.length > 2) {
      throw new Error(
        `Unexpected extra options ${JSON.stringify(pair.slice(2))}.`,
      );
    }

    [value, options] = pair;
  }

  let filepath = null;
  if (typeof value === "string") {
    ({ filepath, value } = resolver(value, dirname));
  }

  if (!value) {
    throw new Error(`Unexpected falsy value: ${String(value)}`);
  }

  if (typeof value === "object" && value.__esModule) {
    if (value.default) {
      value = value.default;
    } else {
      throw new Error("Must export a default export when using ES6 modules.");
    }
  }

  if (typeof value !== "object" && typeof value !== "function") {
    throw new Error(
      `Unsupported format: ${typeof value}. Expected an object or a function.`,
    );
  }

  if (filepath !== null && typeof value === "object" && value) {
    // We allow object values for plugins/presets nested directly within a
    // config object, because it can be useful to define them in nested
    // configuration contexts.
    throw new Error(
      "Plugin/Preset files are not allowed to export objects, only functions.",
    );
  }

  if (options != null && typeof options !== "object") {
    throw new Error(
      "Plugin/Preset options must be an object, null, or undefined",
    );
  }
  options = options || undefined;

  return { filepath, value, options };
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

function createInitialOptions() {
  return {
    sourceType: "module",
    babelrc: true,
    filename: "unknown",
    code: true,
    ast: true,
    comments: true,
    compact: "auto",
    highlightCode: true,
  };
}
