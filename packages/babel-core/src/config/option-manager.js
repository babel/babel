// @flow

import path from "path";
import * as context from "../index";
import Plugin, { validatePluginObject } from "./plugin";
import merge from "lodash/merge";
import {
  buildRootChain,
  buildPresetChain,
  type ConfigChain,
  type BasicDescriptor,
  type PresetInstance,
} from "./build-config-chain";
import traverse from "@babel/traverse";
import clone from "lodash/clone";
import { makeWeakCache, type CacheConfigurator } from "./caching";
import { getEnv } from "./helpers/environment";
import { validate, type ValidatedOptions } from "./options";

export default function manageOptions(opts: {}): {
  options: Object,
  passes: Array<Array<Plugin>>,
} | null {
  return new OptionManager().init(opts);
}

class OptionManager {
  optionDefaults: ValidatedOptions = {};
  options: ValidatedOptions = {};
  passes: Array<Array<Plugin>> = [[]];

  /**
   * This is called when we want to merge the input `opts` into the
   * base options.
   *
   *  - `alias` is used to output pretty traces back to the original source.
   *  - `loc` is used to point to the original config.
   *  - `dirname` is used to resolve plugins relative to it.
   */
  mergeOptions(
    config: {
      plugins: Array<BasicDescriptor>,
      presets: Array<BasicDescriptor>,
    },
    pass: Array<Plugin>,
    envName: string,
  ) {
    const plugins = config.plugins.map(descriptor =>
      loadPluginDescriptor(descriptor, envName),
    );
    const presets = config.presets.map(descriptor => {
      return {
        preset: loadPresetDescriptor(descriptor, envName),
        pass: descriptor.ownPass ? [] : pass,
      };
    });

    // resolve presets
    if (presets.length > 0) {
      // The passes are created in the same order as the preset list, but are inserted before any
      // existing additional passes.
      this.passes.splice(
        1,
        0,
        ...presets.map(o => o.pass).filter(p => p !== pass),
      );

      presets.forEach(({ preset, pass }) => {
        this.mergeOptions(
          {
            // Call dedupDescriptors() to remove 'false' descriptors.
            plugins: preset.plugins,
            presets: preset.presets,
          },
          pass,
          envName,
        );

        preset.options.forEach(opts => {
          merge(this.optionDefaults, normalizeOptions(opts));
        });
      });
    }

    // resolve plugins
    if (plugins.length > 0) {
      pass.unshift(...plugins);
    }
  }

  mergeConfigChain(chain: ConfigChain, envName: string) {
    this.mergeOptions(
      {
        plugins: chain.plugins,
        presets: chain.presets,
      },
      this.passes[0],
      envName,
    );

    chain.options.forEach(opts => {
      merge(this.options, normalizeOptions(opts));
    });
  }

  init(inputOpts: {}) {
    const args = validate("arguments", inputOpts);

    const { envName = getEnv(), cwd = "." } = args;
    const absoluteCwd = path.resolve(cwd);

    const configChain = buildRootChain(absoluteCwd, args, envName);
    if (!configChain) return null;

    try {
      this.mergeConfigChain(configChain, envName);
    } catch (e) {
      // There are a few case where thrown errors will try to annotate themselves multiple times, so
      // to keep things simple we just bail out if re-wrapping the message.
      if (!/^\[BABEL\]/.test(e.message)) {
        e.message = `[BABEL] ${args.filename || "unknown"}: ${e.message}`;
      }

      throw e;
    }

    const opts: Object = merge(this.optionDefaults, this.options);

    // Tack the passes onto the object itself so that, if this object is passed back to Babel a second time,
    // it will be in the right structure to not change behavior.
    opts.babelrc = false;
    opts.plugins = this.passes[0];
    opts.presets = this.passes
      .slice(1)
      .filter(plugins => plugins.length > 0)
      .map(plugins => ({ plugins }));
    opts.passPerPreset = opts.presets.length > 0;
    opts.envName = envName;
    opts.cwd = absoluteCwd;

    return {
      options: opts,
      passes: this.passes,
    };
  }
}

function normalizeOptions(opts: ValidatedOptions): ValidatedOptions {
  const options = Object.assign({}, opts);
  delete options.extends;
  delete options.env;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;

  // "sourceMap" is just aliased to sourceMap, so copy it over as
  // we merge the options together.
  if (options.sourceMap) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }
  return options;
}

type LoadedDescriptor = {
  value: {},
  options: {},
  dirname: string,
  alias: string,
};

/**
 * Load a generic plugin/preset from the given descriptor loaded from the config object.
 */
const loadDescriptor = makeWeakCache(
  (
    { value, options, dirname, alias }: BasicDescriptor,
    cache: CacheConfigurator<{ envName: string }>,
  ): LoadedDescriptor => {
    // Disabled presets should already have been filtered out
    if (options === false) throw new Error("Assertion failure");

    options = options || {};

    let item = value;
    if (typeof value === "function") {
      const api = Object.assign(Object.create(context), {
        cache: cache.simple(),
        env: () => cache.using(data => data.envName),
        async: () => false,
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

    if (typeof item.then === "function") {
      throw new Error(
        `You appear to be using an async plugin, ` +
          `which your current version of Babel does not support.` +
          `If you're using a published plugin, ` +
          `you may need to upgrade your @babel/core version.`,
      );
    }

    return { value: item, options, dirname, alias };
  },
);

/**
 * Instantiate a plugin for the given descriptor, returning the plugin/options pair.
 */
function loadPluginDescriptor(
  descriptor: BasicDescriptor,
  envName: string,
): Plugin {
  if (descriptor.value instanceof Plugin) {
    if (descriptor.options) {
      throw new Error(
        "Passed options to an existing Plugin instance will not work.",
      );
    }

    return descriptor.value;
  }

  return instantiatePlugin(loadDescriptor(descriptor, { envName }), {
    envName,
  });
}

const instantiatePlugin = makeWeakCache(
  (
    { value, options, dirname, alias }: LoadedDescriptor,
    cache: CacheConfigurator<{ envName: string }>,
  ): Plugin => {
    const pluginObj = validatePluginObject(value);

    const plugin = Object.assign({}, pluginObj);
    if (plugin.visitor) {
      plugin.visitor = traverse.explode(clone(plugin.visitor));
    }

    if (plugin.inherits) {
      const inheritsDescriptor = {
        name: undefined,
        alias: `${alias}$inherits`,
        value: plugin.inherits,
        options,
        dirname,
      };

      // If the inherited plugin changes, reinstantiate this plugin.
      const inherits = cache.invalidate(data =>
        loadPluginDescriptor(inheritsDescriptor, data.envName),
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
const loadPresetDescriptor = (
  descriptor: BasicDescriptor,
  envName: string,
): ConfigChain => {
  return buildPresetChain(
    instantiatePreset(loadDescriptor(descriptor, { envName })),
  );
};

const instantiatePreset = makeWeakCache(
  ({ value, dirname, alias }: LoadedDescriptor): PresetInstance => {
    return {
      type: "preset",
      options: validate("preset", value),
      alias,
      dirname,
    };
  },
);

function chain(a, b) {
  const fns = [a, b].filter(Boolean);
  if (fns.length <= 1) return fns[0];

  return function(...args) {
    for (const fn of fns) {
      fn.apply(this, args);
    }
  };
}
