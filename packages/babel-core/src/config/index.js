// @flow

import path from "path";
import * as context from "../index";
import Plugin from "./plugin";
import {
  buildRootChain,
  buildPresetChain,
  type ConfigContext,
  type ConfigChain,
  type PresetInstance,
} from "./config-chain";
import type { UnloadedDescriptor } from "./config-descriptors";
import traverse from "@babel/traverse";
import { makeWeakCache, type CacheConfigurator } from "./caching";
import { getEnv } from "./helpers/environment";
import { validate, type ValidatedOptions } from "./validation/options";
import { validatePluginObject } from "./validation/plugins";

type LoadedDescriptor = {
  value: {},
  options: {},
  dirname: string,
  alias: string,
};

export type { InputOptions } from "./validation/options";

export type ResolvedConfig = {
  options: Object,
  passes: PluginPasses,
};

export type { Plugin };
export type PluginPassList = Array<Plugin>;
export type PluginPasses = Array<PluginPassList>;

// Context not including filename since it is used in places that cannot
// process 'ignore'/'only' and other filename-based logic.
type SimpleContext = {
  envName: string,
};

export default function loadConfig(inputOpts: mixed): ResolvedConfig | null {
  if (
    inputOpts != null &&
    (typeof inputOpts !== "object" || Array.isArray(inputOpts))
  ) {
    throw new Error("Babel options must be an object, null, or undefined");
  }

  const args = inputOpts ? validate("arguments", inputOpts) : {};

  const { envName = getEnv(), cwd = "." } = args;
  const absoluteCwd = path.resolve(cwd);

  const context: ConfigContext = {
    filename: args.filename ? path.resolve(cwd, args.filename) : null,
    cwd: absoluteCwd,
    envName,
  };

  const configChain = buildRootChain(args, context);
  if (!configChain) return null;

  const optionDefaults = {};
  const options = {};
  const passes = [[]];
  try {
    const ignored = (function recurseDescriptors(
      config: {
        plugins: Array<UnloadedDescriptor>,
        presets: Array<UnloadedDescriptor>,
      },
      pass: Array<Plugin>,
    ) {
      const plugins = config.plugins.map(descriptor =>
        loadPluginDescriptor(descriptor, context),
      );
      const presets = config.presets.map(descriptor => {
        return {
          preset: loadPresetDescriptor(descriptor, context),
          pass: descriptor.ownPass ? [] : pass,
        };
      });

      // resolve presets
      if (presets.length > 0) {
        // The passes are created in the same order as the preset list, but are inserted before any
        // existing additional passes.
        passes.splice(
          1,
          0,
          ...presets.map(o => o.pass).filter(p => p !== pass),
        );

        for (const { preset, pass } of presets) {
          if (!preset) return true;

          const ignored = recurseDescriptors(
            {
              plugins: preset.plugins,
              presets: preset.presets,
            },
            pass,
          );
          if (ignored) return true;

          preset.options.forEach(opts => {
            mergeOptions(optionDefaults, opts);
          });
        }
      }

      // resolve plugins
      if (plugins.length > 0) {
        pass.unshift(...plugins);
      }
    })(
      {
        plugins: configChain.plugins,
        presets: configChain.presets,
      },
      passes[0],
    );

    if (ignored) return null;

    configChain.options.forEach(opts => {
      mergeOptions(options, opts);
    });
  } catch (e) {
    // There are a few case where thrown errors will try to annotate themselves multiple times, so
    // to keep things simple we just bail out if re-wrapping the message.
    if (!/^\[BABEL\]/.test(e.message)) {
      e.message = `[BABEL] ${args.filename || "unknown"}: ${e.message}`;
    }

    throw e;
  }

  const opts: Object = optionDefaults;
  mergeOptions(opts, options);

  // Tack the passes onto the object itself so that, if this object is passed back to Babel a second time,
  // it will be in the right structure to not change behavior.
  opts.babelrc = false;
  opts.plugins = passes[0];
  opts.presets = passes
    .slice(1)
    .filter(plugins => plugins.length > 0)
    .map(plugins => ({ plugins }));
  opts.passPerPreset = opts.presets.length > 0;
  opts.envName = envName;
  opts.cwd = absoluteCwd;

  return {
    options: opts,
    passes: passes,
  };
}

function mergeOptions(
  target: ValidatedOptions,
  source: ValidatedOptions,
): void {
  for (const k of Object.keys(source)) {
    if (k === "parserOpts" && source.parserOpts) {
      const parserOpts = source.parserOpts;
      const targetObj = (target.parserOpts = target.parserOpts || {});
      mergeDefaultFields(targetObj, parserOpts);
    } else if (k === "generatorOpts" && source.generatorOpts) {
      const generatorOpts = source.generatorOpts;
      const targetObj = (target.generatorOpts = target.generatorOpts || {});
      mergeDefaultFields(targetObj, generatorOpts);
    } else {
      const val = source[k];
      if (val !== undefined) target[k] = (val: any);
    }
  }
}

function mergeDefaultFields<T: {}>(target: T, source: T) {
  for (const k of Object.keys(source)) {
    const val = source[k];
    if (val !== undefined) target[k] = (val: any);
  }
}

/**
 * Load a generic plugin/preset from the given descriptor loaded from the config object.
 */
const loadDescriptor = makeWeakCache(
  (
    { value, options, dirname, alias }: UnloadedDescriptor,
    cache: CacheConfigurator<SimpleContext>,
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
  descriptor: UnloadedDescriptor,
  context: SimpleContext,
): Plugin {
  if (descriptor.value instanceof Plugin) {
    if (descriptor.options) {
      throw new Error(
        "Passed options to an existing Plugin instance will not work.",
      );
    }

    return descriptor.value;
  }

  return instantiatePlugin(loadDescriptor(descriptor, context), context);
}

const instantiatePlugin = makeWeakCache(
  (
    { value, options, dirname, alias }: LoadedDescriptor,
    cache: CacheConfigurator<SimpleContext>,
  ): Plugin => {
    const pluginObj = validatePluginObject(value);

    const plugin = Object.assign({}, pluginObj);
    if (plugin.visitor) {
      plugin.visitor = traverse.explode(Object.assign({}, plugin.visitor));
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
        loadPluginDescriptor(inheritsDescriptor, data),
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
  descriptor: UnloadedDescriptor,
  context: ConfigContext,
): ConfigChain | null => {
  return buildPresetChain(
    instantiatePreset(loadDescriptor(descriptor, context)),
    context,
  );
};

const instantiatePreset = makeWeakCache(
  ({ value, dirname, alias }: LoadedDescriptor): PresetInstance => {
    return {
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
