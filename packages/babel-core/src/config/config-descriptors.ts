import gensync, { type Handler } from "gensync";
import { once } from "../gensync-utils/functional";

import { loadPlugin, loadPreset } from "./files";

import { getItemDescriptor } from "./item";

import {
  makeWeakCacheSync,
  makeStrongCacheSync,
  makeStrongCache,
} from "./caching";
import type { CacheConfigurator } from "./caching";

import type {
  ValidatedOptions,
  PluginList,
  PluginItem,
} from "./validation/options";

import { resolveBrowserslistConfigFile } from "./resolve-targets";

// Represents a config object and functions to lazily load the descriptors
// for the plugins and presets so we don't load the plugins/presets unless
// the options object actually ends up being applicable.
export type OptionsAndDescriptors = {
  options: ValidatedOptions;
  plugins: () => Handler<Array<UnloadedDescriptor>>;
  presets: () => Handler<Array<UnloadedDescriptor>>;
};

// Represents a plugin or presets at a given location in a config object.
// At this point these have been resolved to a specific object or function,
// but have not yet been executed to call functions with options.
export type UnloadedDescriptor = {
  name: string | undefined;
  value: any | Function;
  options: {} | undefined | false;
  dirname: string;
  alias: string;
  ownPass?: boolean;
  file?: {
    request: string;
    resolved: string;
  };
};

function isEqualDescriptor(
  a: UnloadedDescriptor,
  b: UnloadedDescriptor,
): boolean {
  return (
    a.name === b.name &&
    a.value === b.value &&
    a.options === b.options &&
    a.dirname === b.dirname &&
    a.alias === b.alias &&
    a.ownPass === b.ownPass &&
    (a.file && a.file.request) === (b.file && b.file.request) &&
    (a.file && a.file.resolved) === (b.file && b.file.resolved)
  );
}

export type ValidatedFile = {
  filepath: string;
  dirname: string;
  options: ValidatedOptions;
};

// eslint-disable-next-line require-yield
function* handlerOf<T>(value: T): Handler<T> {
  return value;
}

function optionsWithResolvedBrowserslistConfigFile(
  options: ValidatedOptions,
  dirname: string,
): ValidatedOptions {
  if (typeof options.browserslistConfigFile === "string") {
    options.browserslistConfigFile = resolveBrowserslistConfigFile(
      options.browserslistConfigFile,
      dirname,
    );
  }
  return options;
}

/**
 * Create a set of descriptors from a given options object, preserving
 * descriptor identity based on the identity of the plugin/preset arrays
 * themselves, and potentially on the identity of the plugins/presets + options.
 */
export function createCachedDescriptors(
  dirname: string,
  options: ValidatedOptions,
  alias: string,
): OptionsAndDescriptors {
  const { plugins, presets, passPerPreset } = options;
  return {
    options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
    plugins: plugins
      ? () =>
          // @ts-expect-error todo(flow->ts) ts complains about incorrect arguments
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          createCachedPluginDescriptors(plugins, dirname)(alias)
      : () => handlerOf([]),
    presets: presets
      ? () =>
          // @ts-expect-error todo(flow->ts) ts complains about incorrect arguments
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          createCachedPresetDescriptors(presets, dirname)(alias)(
            !!passPerPreset,
          )
      : () => handlerOf([]),
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
  return {
    options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
    // The returned result here is cached to represent a config object in
    // memory, so we build and memoize the descriptors to ensure the same
    // values are returned consistently.
    plugins: once(() =>
      createPluginDescriptors(options.plugins || [], dirname, alias),
    ),
    presets: once(() =>
      createPresetDescriptors(
        options.presets || [],
        dirname,
        alias,
        !!options.passPerPreset,
      ),
    ),
  };
}

const PRESET_DESCRIPTOR_CACHE = new WeakMap();
const createCachedPresetDescriptors = makeWeakCacheSync(
  (items: PluginList, cache: CacheConfigurator<string>) => {
    const dirname = cache.using(dir => dir);
    return makeStrongCacheSync((alias: string) =>
      makeStrongCache(function* (
        passPerPreset: boolean,
      ): Handler<Array<UnloadedDescriptor>> {
        const descriptors = yield* createPresetDescriptors(
          items,
          dirname,
          alias,
          passPerPreset,
        );
        return descriptors.map(
          // Items are cached using the overall preset array identity when
          // possibly, but individual descriptors are also cached if a match
          // can be found in the previously-used descriptor lists.
          desc => loadCachedDescriptor(PRESET_DESCRIPTOR_CACHE, desc),
        );
      }),
    );
  },
);

const PLUGIN_DESCRIPTOR_CACHE = new WeakMap();
const createCachedPluginDescriptors = makeWeakCacheSync(
  (items: PluginList, cache: CacheConfigurator<string>) => {
    const dirname = cache.using(dir => dir);
    return makeStrongCache(function* (
      alias: string,
    ): Handler<Array<UnloadedDescriptor>> {
      const descriptors = yield* createPluginDescriptors(items, dirname, alias);
      return descriptors.map(
        // Items are cached using the overall plugin array identity when
        // possibly, but individual descriptors are also cached if a match
        // can be found in the previously-used descriptor lists.
        desc => loadCachedDescriptor(PLUGIN_DESCRIPTOR_CACHE, desc),
      );
    });
  },
);

/**
 * When no options object is given in a descriptor, this object is used
 * as a WeakMap key in order to have consistent identity.
 */
const DEFAULT_OPTIONS = {};

/**
 * Given the cache and a descriptor, returns a matching descriptor from the
 * cache, or else returns the input descriptor and adds it to the cache for
 * next time.
 */
function loadCachedDescriptor(
  cache: WeakMap<{} | Function, WeakMap<{}, Array<UnloadedDescriptor>>>,
  desc: UnloadedDescriptor,
) {
  const { value, options = DEFAULT_OPTIONS } = desc;
  if (options === false) return desc;

  let cacheByOptions = cache.get(value);
  if (!cacheByOptions) {
    cacheByOptions = new WeakMap();
    cache.set(value, cacheByOptions);
  }

  let possibilities = cacheByOptions.get(options);
  if (!possibilities) {
    possibilities = [];
    cacheByOptions.set(options, possibilities);
  }

  if (possibilities.indexOf(desc) === -1) {
    const matches = possibilities.filter(possibility =>
      isEqualDescriptor(possibility, desc),
    );
    if (matches.length > 0) {
      return matches[0];
    }

    possibilities.push(desc);
  }

  return desc;
}

function* createPresetDescriptors(
  items: PluginList,
  dirname: string,
  alias: string,
  passPerPreset: boolean,
): Handler<Array<UnloadedDescriptor>> {
  return yield* createDescriptors(
    "preset",
    items,
    dirname,
    alias,
    passPerPreset,
  );
}

function* createPluginDescriptors(
  items: PluginList,
  dirname: string,
  alias: string,
): Handler<Array<UnloadedDescriptor>> {
  return yield* createDescriptors("plugin", items, dirname, alias);
}

function* createDescriptors(
  type: "plugin" | "preset",
  items: PluginList,
  dirname: string,
  alias: string,
  ownPass?: boolean,
): Handler<Array<UnloadedDescriptor>> {
  const descriptors = yield* gensync.all(
    items.map((item, index) =>
      createDescriptor(item, dirname, {
        type,
        alias: `${alias}$${index}`,
        ownPass: !!ownPass,
      }),
    ),
  );

  assertNoDuplicates(descriptors);

  return descriptors;
}

/**
 * Given a plugin/preset item, resolve it into a standard format.
 */
export function* createDescriptor(
  pair: PluginItem,
  dirname: string,
  {
    type,
    alias,
    ownPass,
  }: {
    type?: "plugin" | "preset";
    alias: string;
    ownPass?: boolean;
  },
): Handler<UnloadedDescriptor> {
  const desc = getItemDescriptor(pair);
  if (desc) {
    return desc;
  }

  let name;
  let options;
  // todo(flow->ts) better type annotation
  let value: any = pair;
  if (Array.isArray(value)) {
    if (value.length === 3) {
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

    ({ filepath, value } = yield* resolver(value, dirname));

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
      const conflicts = items.filter(i => i.value === item.value);
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
          ``,
          `Duplicates detected are:`,
          `${JSON.stringify(conflicts, null, 2)}`,
        ].join("\n"),
      );
    }

    nameMap.add(item.name);
  }
}
