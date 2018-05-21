// @flow

import { loadPlugin, loadPreset } from "./files";

import { getItemDescriptor } from "./item";

import {
  makeWeakCache,
  makeStrongCache,
  type CacheConfigurator,
} from "./caching";

import type {
  ValidatedOptions,
  PluginList,
  PluginItem,
} from "./validation/options";

// Represents a config object and functions to lazily load the descriptors
// for the plugins and presets so we don't load the plugins/presets unless
// the options object actually ends up being applicable.
export type OptionsAndDescriptors = {
  options: ValidatedOptions,
  plugins: () => Array<UnloadedDescriptor>,
  presets: () => Array<UnloadedDescriptor>,
};

// Represents a plugin or presets at a given location in a config object.
// At this point these have been resolved to a specific object or function,
// but have not yet been executed to call functions with options.
export type UnloadedDescriptor = {
  name: string | void,
  value: {} | Function,
  options: {} | void | false,
  dirname: string,
  alias: string,
  ownPass?: boolean,
  file?: {
    request: string,
    resolved: string,
  } | void,
};

export type ValidatedFile = {
  filepath: string,
  dirname: string,
  options: ValidatedOptions,
};

/**
 * Create a set of descriptors from a given options object, preserving
 * descriptor identity based on the identity of the plugin/preset arrays
 * themselves.
 */
export function createCachedDescriptors(
  dirname: string,
  options: ValidatedOptions,
  alias: string,
): OptionsAndDescriptors {
  const { plugins, presets, passPerPreset } = options;
  return {
    options,
    plugins: plugins
      ? () => createCachedPluginDescriptors(plugins, dirname)(alias)
      : () => [],
    presets: presets
      ? () =>
          createCachedPresetDescriptors(presets, dirname)(alias)(
            !!passPerPreset,
          )
      : () => [],
  };
}

/**
 * Create a set of descriptors from a given options object, with consistent
 * identity for the descriptors, but not caching based on any specific identity.
 */
export function createUncachedDescriptors(
  dirname: string,
  options: ValidatedOptions,
  alias: string,
): OptionsAndDescriptors {
  // The returned result here is cached to represent a config object in
  // memory, so we build and memoize the descriptors to ensure the same
  // values are returned consistently.
  let plugins;
  let presets;

  return {
    options,
    plugins: () => {
      if (!plugins) {
        plugins = createPluginDescriptors(
          options.plugins || [],
          dirname,
          alias,
        );
      }
      return plugins;
    },
    presets: () => {
      if (!presets) {
        presets = createPresetDescriptors(
          options.presets || [],
          dirname,
          alias,
          !!options.passPerPreset,
        );
      }
      return presets;
    },
  };
}

const createCachedPresetDescriptors = makeWeakCache(
  (items: PluginList, cache: CacheConfigurator<string>) => {
    const dirname = cache.using(dir => dir);
    return makeStrongCache((alias: string) =>
      makeStrongCache((passPerPreset: boolean) =>
        createPresetDescriptors(items, dirname, alias, passPerPreset),
      ),
    );
  },
);

const createCachedPluginDescriptors = makeWeakCache(
  (items: PluginList, cache: CacheConfigurator<string>) => {
    const dirname = cache.using(dir => dir);
    return makeStrongCache((alias: string) =>
      createPluginDescriptors(items, dirname, alias),
    );
  },
);

function createPresetDescriptors(
  items: PluginList,
  dirname: string,
  alias: string,
  passPerPreset: boolean,
): Array<UnloadedDescriptor> {
  return createDescriptors("preset", items, dirname, alias, passPerPreset);
}

function createPluginDescriptors(
  items: PluginList,
  dirname: string,
  alias: string,
): Array<UnloadedDescriptor> {
  return createDescriptors("plugin", items, dirname, alias);
}

function createDescriptors(
  type: "plugin" | "preset",
  items: PluginList,
  dirname: string,
  alias: string,
  ownPass?: boolean,
): Array<UnloadedDescriptor> {
  const descriptors = items.map((item, index) =>
    createDescriptor(item, dirname, {
      type,
      alias: `${alias}$${index}`,
      ownPass: !!ownPass,
    }),
  );

  assertNoDuplicates(descriptors);

  return descriptors;
}

/**
 * Given a plugin/preset item, resolve it into a standard format.
 */
export function createDescriptor(
  pair: PluginItem,
  dirname: string,
  {
    type,
    alias,
    ownPass,
  }: {
    type?: "plugin" | "preset",
    alias: string,
    ownPass?: boolean,
  },
): UnloadedDescriptor {
  const desc = getItemDescriptor(pair);
  if (desc) {
    return desc;
  }

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

  let file = undefined;
  let filepath = null;
  if (typeof value === "string") {
    if (typeof type !== "string") {
      throw new Error(
        "To resolve a string-based item, the type of item must be given",
      );
    }
    const resolver = type === "plugin" ? loadPlugin : loadPreset;
    const request = value;

    ({ filepath, value } = resolver(value, dirname));

    file = {
      request,
      resolved: filepath,
    };
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
      `Plugin/Preset files are not allowed to export objects, only functions. In ${filepath}`,
    );
  }

  return {
    name,
    alias: filepath || alias,
    value,
    options,
    dirname,
    ownPass,
    file,
  };
}

function assertNoDuplicates(items: Array<UnloadedDescriptor>): void {
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
          `they need separate names, e.g.`,
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
