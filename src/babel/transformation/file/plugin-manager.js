import * as messages from "../../messages";
import * as util from  "../../util";

export default class PluginManager {
  static memoisedPlugins = [];

  static memoisePluginContainer(fn) {
    for (var i = 0; i < PluginManager.memoisedPlugins.length; i++) {
      var plugin = PluginManager.memoisedPlugins[i];
      if (plugin.container === fn) return plugin.transformer;
    }

    var transformer = fn(node);
    PluginManager.memoisedPlugins.push({
      container: fn,
      transformer: transformer
    });
    return transformer;
  }

  constructor(file, transformers, before, after) {
    this.transformers = transformers;
    this.file         = file;
    this.before       = before;
    this.after        = after;
  }

  subnormaliseString(name) {
    // this is a plugin in the form of "foobar" or "foobar:after"
    // where the optional colon is the delimiter for plugin position in the transformer stack

    var [name, position] = name.split(":");

    var loc = util.resolveRelative(name) || util.resolveRelative(`babel-plugin-${name}`);
    if (loc) {
      return {
        position: position,
        plugin:   require(loc)
      };
    } else {
      throw new ReferenceError(messages.get("pluginUnknown", name));
    }
  }

  validate(plugin) {
    // validate transformer key
    var key = plugin.key;
    if (this.transformers[key]) {
      throw new ReferenceError(messages.get("pluginKeyCollision", key));
    }

    // validate Transformer instance
    if (!plugin.buildPass || plugin.constructor.name !== "Transformer") {
      throw new TypeError(messages.get("pluginNotTransformer", name));
    }
  }

  add(name) {
    var position;
    var plugin;

    if (name) {
      if (typeof name === "object" && name.transformer) {
        ({ plugin: name, position } = name);
      } else if (typeof name !== "string") {
        // not a string so we'll just assume that it's a direct Transformer instance, if not then
        // the checks later on will complain
        plugin = name;
      }

      if (typeof name === "string") {
        ({ plugin, position } = this.subnormaliseString(name));
      }
    } else {
      throw new TypeError(messages.get("pluginIllegalKind", typeof name, name));
    }

    // default position
    position = position || "before";

    // validate position
    if (position !== "before" && position !== "after") {
      throw new TypeError(messages.get("pluginIllegalPosition", position, name));
    }

    // allow plugin containers to be specified so they don't have to manually require
    if (typeof plugin === "function") {
      plugin = PluginManager.memoisePluginContainer(plugin);
    }

    //
    this.validate(plugin);

    // build!
    var pass = this.transformers[plugin.key] = plugin.buildPass(this.file);
    if (pass.canTransform()) {
      var stack = position === "before" ? this.before : this.after;
      stack.push(pass);
    }
  }
}
