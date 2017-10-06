// @flow

export default class Plugin {
  key: ?string;
  manipulateOptions: ?Function;
  post: ?Function;
  pre: ?Function;
  visitor: ?{};

  options: {} | void;

  constructor(plugin: {}, options: {} | void, key?: string) {
    if (plugin.name != null && typeof plugin.name !== "string") {
      throw new Error("Plugin .name must be a string, null, or undefined");
    }
    if (
      plugin.manipulateOptions != null &&
      typeof plugin.manipulateOptions !== "function"
    ) {
      throw new Error(
        "Plugin .manipulateOptions must be a function, null, or undefined",
      );
    }
    if (plugin.post != null && typeof plugin.post !== "function") {
      throw new Error("Plugin .post must be a function, null, or undefined");
    }
    if (plugin.pre != null && typeof plugin.pre !== "function") {
      throw new Error("Plugin .pre must be a function, null, or undefined");
    }
    if (plugin.visitor != null && typeof plugin.visitor !== "object") {
      throw new Error("Plugin .visitor must be an object, null, or undefined");
    }

    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor;
    this.options = options;
  }
}
