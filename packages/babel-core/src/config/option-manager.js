// @flow

import * as context from "../index";
import Plugin, { validatePluginObject } from "./plugin";
import merge from "lodash/merge";
import buildConfigChain, { type ConfigItem } from "./build-config-chain";
import traverse from "@babel/traverse";
import clone from "lodash/clone";
import { makeWeakCache } from "./caching";
import { getEnv } from "./helpers/environment";
import { validate, type ValidatedOptions, type PluginItem } from "./options";

import { loadPlugin, loadPreset } from "./loading/files";

type MergeOptions =
  | ConfigItem
  | {
      type: "preset",
      options: ValidatedOptions,
      alias: string,
      dirname: string,
    };

export default function manageOptions(opts: {}): {
  options: Object,
  passes: Array<Array<Plugin>>,
} | null {
  return new OptionManager().init(opts);
}

class OptionManager {
  constructor() {
    this.options = {};
    this.passes = [[]];
  }

  options: ValidatedOptions;
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

    const options = Object.assign({}, result.options);
    delete options.extends;
    delete options.env;
    delete options.plugins;
    delete options.presets;
    delete options.passPerPreset;

    // "sourceMap" is just aliased to sourceMap, so copy it over as
    // we merge the options together.
    if (options.sourceMap) {
      options.sourceMaps = options.sourceMap;
      delete options.sourceMap;
    }

    merge(this.options, options);
  }

  init(inputOpts: {}) {
    const args = validate("arguments", inputOpts);

    const configChain = buildConfigChain(args);
    if (!configChain) return null;

    try {
      for (const config of configChain) {
        this.mergeOptions(config);
      }
    } catch (e) {
      // There are a few case where thrown errors will try to annotate themselves multiple times, so
      // to keep things simple we just bail out if re-wrapping the message.
      if (!/^\[BABEL\]/.test(e.message)) {
        e.message = `[BABEL] ${args.filename || "unknown"}: ${e.message}`;
      }

      throw e;
    }

    const opts: Object = this.options;

    // Tack the passes onto the object itself so that, if this object is passed back to Babel a second time,
    // it will be in the right structure to not change behavior.
    opts.babelrc = false;
    opts.plugins = this.passes[0];
    opts.presets = this.passes
      .slice(1)
      .filter(plugins => plugins.length > 0)
      .map(plugins => ({ plugins }));
    opts.passPerPreset = opts.presets.length > 0;

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
};

type LoadedDescriptor = {
  value: {},
  options: {},
  dirname: string,
  alias: string,
};

/**
 * Load and validate the given config into a set of options, plugins, and presets.
 */
const loadConfig = makeWeakCache((config: MergeOptions): {
  options: {},
  plugins: Array<BasicDescriptor>,
  presets: Array<BasicDescriptor>,
} => {
  const options = config.options;

  const plugins = (config.options.plugins || []).map((plugin, index) =>
    createDescriptor(plugin, loadPlugin, config.dirname, {
      index,
      alias: config.alias,
    }),
  );

  const presets = (config.options.presets || []).map((preset, index) =>
    createDescriptor(preset, loadPreset, config.dirname, {
      index,
      alias: config.alias,
    }),
  );

  return { options, plugins, presets };
});

/**
 * Load a generic plugin/preset from the given descriptor loaded from the config object.
 */
const loadDescriptor = makeWeakCache(
  (
    { value, options = {}, dirname, alias }: BasicDescriptor,
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

    return { value: item, options, dirname, alias };
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
  ({ value, options, dirname, alias }: LoadedDescriptor, cache): Plugin => {
    const pluginObj = validatePluginObject(value);

    const plugin = Object.assign({}, pluginObj);
    if (plugin.visitor) {
      plugin.visitor = traverse.explode(clone(plugin.visitor));
    }

    if (plugin.inherits) {
      const inheritsDescriptor = {
        alias: `${alias}$inherits`,
        value: plugin.inherits,
        options,
        dirname,
      };

      // If the inherited plugin changes, reinstantiate this plugin.
      const inherits = cache.invalidate(() =>
        loadPluginDescriptor(inheritsDescriptor),
      );

      plugin.pre = chain(inherits.pre, plugin.pre);
      plugin.post = chain(inherits.post, plugin.post);
      plugin.manipulateOptions = chain(
        inherits.manipulateOptions,
        plugin.manipulateOptions,
      );
      plugin.visitor = traverse.visitors.merge([
        inherits.visitor || {},
        plugin.visitor || {},
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
  ({ value, dirname, alias }: LoadedDescriptor): MergeOptions => {
    return {
      type: "preset",
      options: validate("preset", value),
      alias,
      dirname,
    };
  },
);

/**
 * Given a plugin/preset item, resolve it into a standard format.
 */
function createDescriptor(
  pair: PluginItem,
  resolver,
  dirname,
  {
    index,
    alias,
  }: {
    index: number,
    alias: string,
  },
): BasicDescriptor {
  let options;
  let value = pair;
  if (Array.isArray(value)) {
    [value, options] = value;
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

  return {
    alias: filepath || `${alias}$${index}`,
    value,
    options,
    dirname,
  };
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
