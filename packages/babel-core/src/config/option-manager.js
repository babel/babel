// @flow

import path from "path";
import * as context from "../index";
import Plugin, { validatePluginObject } from "./plugin";
import merge from "lodash/merge";
import buildConfigChain, { type ConfigItem } from "./build-config-chain";
import traverse from "@babel/traverse";
import clone from "lodash/clone";
import { makeWeakCache, type CacheConfigurator } from "./caching";
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
        const loadedConfig = loadConfig(preset);
        this.mergeOptions(
          {
            // Call dedupDescriptors() to remove 'false' descriptors.
            plugins: dedupDescriptors(loadedConfig.plugins),
            presets: dedupDescriptors(loadedConfig.presets),
          },
          pass,
          envName,
        );

        merge(this.optionDefaults, normalizeOptions(loadedConfig.options));
      });
    }

    // resolve plugins
    if (plugins.length > 0) {
      pass.unshift(...plugins);
    }
  }

  mergeConfigChain(chain: $ReadOnlyArray<MergeOptions>, envName: string) {
    const config = dedupLoadedConfigs(chain.map(config => loadConfig(config)));

    this.mergeOptions(
      {
        plugins: config.plugins,
        presets: config.presets,
      },
      this.passes[0],
      envName,
    );

    config.options.forEach(opts => {
      merge(this.options, normalizeOptions(opts));
    });
  }

  init(inputOpts: {}) {
    const args = validate("arguments", inputOpts);

    const { envName = getEnv(), cwd = "." } = args;
    const absoluteCwd = path.resolve(cwd);

    const configChain = buildConfigChain(absoluteCwd, args, envName);
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

type BasicDescriptor = {
  name: string | void,
  value: {} | Function,
  options: {} | void | false,
  dirname: string,
  alias: string,
  ownPass?: boolean,
};

type LoadedDescriptor = {
  value: {},
  options: {},
  dirname: string,
  alias: string,
};

type LoadedConfig = {
  options: ValidatedOptions,
  plugins: Array<BasicDescriptor>,
  presets: Array<BasicDescriptor>,
};

/**
 * Load and validate the given config into a set of options, plugins, and presets.
 */
const loadConfig = makeWeakCache((config: MergeOptions): LoadedConfig => {
  const options = config.options;

  const plugins = (config.options.plugins || []).map((plugin, index) =>
    createDescriptor(plugin, loadPlugin, config.dirname, {
      index,
      alias: config.alias,
    }),
  );

  assertNoDuplicates(plugins);

  const presets = (config.options.presets || []).map((preset, index) =>
    createDescriptor(preset, loadPreset, config.dirname, {
      index,
      alias: config.alias,
      ownPass: options.passPerPreset,
    }),
  );

  assertNoDuplicates(presets);

  return { options, plugins, presets };
});

function assertNoDuplicates(items: Array<BasicDescriptor>): void {
  const map = new Map();

  for (const item of items) {
    if (typeof item.value !== "function") continue;

    let nameMap = map.get(item.value);
    if (!nameMap) {
      nameMap = new Set();
      map.set(item.value, nameMap);
    }

    if (nameMap.has(item.name)) {
      throw new Error(
        [
          `Duplicate plugin/preset detected.`,
          `If you'd like to use two separate instances of a plugin,`,
          `they neen separate names, e.g.`,
          ``,
          `  plugins: [`,
          `    ['some-plugin', {}],`,
          `    ['some-plugin', {}, 'some unique name'],`,
          `  ]`,
        ].join("\n"),
      );
    }

    nameMap.add(item.name);
  }
}

function dedupLoadedConfigs(
  items: Array<LoadedConfig>,
): {
  plugins: Array<BasicDescriptor>,
  presets: Array<BasicDescriptor>,
  options: Array<ValidatedOptions>,
} {
  const options = [];
  const plugins = [];
  const presets = [];

  for (const item of items) {
    plugins.push(...item.plugins);
    presets.push(...item.presets);
    options.push(item.options);
  }

  return {
    options,
    plugins: dedupDescriptors(plugins),
    presets: dedupDescriptors(presets),
  };
}

function dedupDescriptors(
  items: Array<BasicDescriptor>,
): Array<BasicDescriptor> {
  const map: Map<
    Function,
    Map<string | void, { value: BasicDescriptor | null }>,
  > = new Map();

  const descriptors = [];

  for (const item of items) {
    if (typeof item.value === "function") {
      const fnKey = item.value;
      let nameMap = map.get(fnKey);
      if (!nameMap) {
        nameMap = new Map();
        map.set(fnKey, nameMap);
      }
      let desc = nameMap.get(item.name);
      if (!desc) {
        desc = { value: null };
        descriptors.push(desc);

        // Treat passPerPreset presets as unique, skipping them
        // in the merge processing steps.
        if (!item.ownPass) nameMap.set(item.name, desc);
      }

      if (item.options === false) {
        desc.value = null;
      } else {
        desc.value = item;
      }
    } else {
      descriptors.push({ value: item });
    }
  }

  return descriptors.reduce((acc, desc) => {
    if (desc.value) acc.push(desc.value);
    return acc;
  }, []);
}

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
): MergeOptions => {
  return instantiatePreset(loadDescriptor(descriptor, { envName }));
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
    ownPass,
  }: {
    index: number,
    alias: string,
    ownPass?: boolean,
  },
): BasicDescriptor {
  let name;
  let options;
  let value = pair;
  if (Array.isArray(value)) {
    if (value.length === 3) {
      // $FlowIgnore - Flow doesn't like the multiple tuple types.
      [value, options, name] = value;
    } else {
      [value, options] = value;
    }
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

  return {
    name,
    alias: filepath || `${alias}$${index}`,
    value,
    options,
    dirname,
    ownPass,
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
