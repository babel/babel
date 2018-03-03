// @flow

import path from "path";
import {
  createDescriptor,
  type UnloadedDescriptor,
} from "./config-descriptors";

export function createItemFromDescriptor(desc: UnloadedDescriptor): ConfigItem {
  return new ConfigItem(desc);
}

export function createConfigItem(
  value: string | {} | Function,
  options?: {} | void,
  {
    dirname = ".",
    name,
    type,
  }: {
    dirname?: string,
    name?: string,
    type?: "preset" | "plugin",
  } = {},
): ConfigItem {
  const descriptor = createDescriptor(
    [value, options, name],
    path.resolve(dirname),
    {
      type,
      alias: "programmatic item",
    },
  );

  return createItemFromDescriptor(descriptor);
}

export function getItemDescriptor(item: mixed): UnloadedDescriptor | void {
  if (item instanceof ConfigItem) {
    return item._descriptor;
  }

  return undefined;
}

/**
 * A public representation of a plugin/preset that will _eventually_ be load.
 * Users can use this to interact with the results of a loaded Babel
 * configuration.
 */
export class ConfigItem {
  _descriptor: UnloadedDescriptor;

  constructor(descriptor: UnloadedDescriptor) {
    this._descriptor = descriptor;

    // Make people less likely to stumble onto this if they are exploring
    // programmatically.
    enumerable(this, "_descriptor", false);
  }

  /**
   * The resolved value of the item itself.
   */
  get value(): {} | Function {
    return this._descriptor.value;
  }

  /**
   * The options, if any, that were passed to the item.
   * Mutating this will lead to undefined behavior. If you need
   */
  get options(): {} | void {
    const options = this._descriptor.options;
    if (options === false) {
      throw new Error("Assertion failure - unexpected false options");
    }

    return options;
  }

  /**
   * The directory that the options for this item are relative to.
   */
  get dirname(): string {
    return this._descriptor.dirname;
  }

  /**
   * Get the name of the plugin, if the user gave it one.
   */
  get name(): string | void {
    return this._descriptor.name;
  }

  get file(): {
    request: string,
    resolved: string,
  } | void {
    const file = this._descriptor.file;
    if (!file) return undefined;

    return {
      request: file.request,
      resolved: file.resolved,
    };
  }
}

// Make these slightly easier for people to find if they are exploring the
// API programmatically.
enumerable(ConfigItem.prototype, "value", true);
enumerable(ConfigItem.prototype, "options", true);
enumerable(ConfigItem.prototype, "dirname", true);
enumerable(ConfigItem.prototype, "name", true);
enumerable(ConfigItem.prototype, "file", true);

function enumerable(obj: {}, prop: string, enumerable: boolean) {
  Object.defineProperty(obj, prop, { enumerable });
}
