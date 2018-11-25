// @flow

import type { PluginTarget, PluginOptions } from "./validation/options";

import path from "path";
import {
  createDescriptor,
  type UnloadedDescriptor,
} from "./config-descriptors";

export function createItemFromDescriptor(desc: UnloadedDescriptor): ConfigItem {
  return new ConfigItem(desc);
}

/**
 * Create a config item using the same value format used in Babel's config
 * files. Items returned from this function should be cached by the caller
 * ideally, as recreating the config item will mean re-resolving the item
 * and re-evaluating the plugin/preset function.
 */
export function createConfigItem(
  value:
    | PluginTarget
    | [PluginTarget, PluginOptions]
    | [PluginTarget, PluginOptions, string | void],
  {
    dirname = ".",
    type,
  }: {
    dirname?: string,
    type?: "preset" | "plugin",
  } = {},
): ConfigItem {
  const descriptor = createDescriptor(value, path.resolve(dirname), {
    type,
    alias: "programmatic item",
  });

  return createItemFromDescriptor(descriptor);
}

export function getItemDescriptor(item: mixed): UnloadedDescriptor | void {
  if (item instanceof ConfigItem) {
    return item._descriptor;
  }

  return undefined;
}

export type { ConfigItem };

/**
 * A public representation of a plugin/preset that will _eventually_ be load.
 * Users can use this to interact with the results of a loaded Babel
 * configuration.
 *
 * Any changes to public properties of this class should be considered a
 * breaking change to Babel's API.
 */
class ConfigItem {
  /**
   * The private underlying descriptor that Babel actually cares about.
   * If you access this, you are a bad person.
   */
  _descriptor: UnloadedDescriptor;

  /**
   * The resolved value of the item itself.
   */
  value: {} | Function;

  /**
   * The options, if any, that were passed to the item.
   * Mutating this will lead to undefined behavior.
   *
   * "false" means that this item has been disabled.
   */
  options: {} | void | false;

  /**
   * The directory that the options for this item are relative to.
   */
  dirname: string;

  /**
   * Get the name of the plugin, if the user gave it one.
   */
  name: string | void;

  /**
   * Data about the file that the item was loaded from, if Babel knows it.
   */
  file: {
    // The requested path, e.g. "@babel/env".
    request: string,

    // The resolved absolute path of the file.
    resolved: string,
  } | void;

  constructor(descriptor: UnloadedDescriptor) {
    // Make people less likely to stumble onto this if they are exploring
    // programmatically, and also make sure that if people happen to
    // pass the item through JSON.stringify, it doesn't show up.
    this._descriptor = descriptor;
    Object.defineProperty(this, "_descriptor", ({ enumerable: false }: any));

    this.value = this._descriptor.value;
    this.options = this._descriptor.options;
    this.dirname = this._descriptor.dirname;
    this.name = this._descriptor.name;
    this.file = this._descriptor.file
      ? {
          request: this._descriptor.file.request,
          resolved: this._descriptor.file.resolved,
        }
      : undefined;

    // Freeze the object to make it clear that people shouldn't expect mutating
    // this object to do anything. A new item should be created if they want
    // to change something.
    Object.freeze(this);
  }
}

Object.freeze(ConfigItem.prototype);
