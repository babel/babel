import Transformer from "../transformer";
import Plugin from "../plugin";
import * as types from "../../types";
import * as messages from "../../messages";
import traverse from "../../traversal";
import parse from "../../helpers/parse";

/**
 * [Please add a description.]
 */

var context = {
  messages,
  Transformer,
  Plugin,
  types,
  parse,
  traverse
};

import * as util from  "../../util";

/**
 * [Please add a description.]
 */

export default class PluginManager {

  /**
   * [Please add a description.]
   */

  static memoisedPlugins = [];

  /**
   * [Please add a description.]
   */

  static memoisePluginContainer(fn) {
    for (var i = 0; i < PluginManager.memoisedPlugins.length; i++) {
      var plugin = PluginManager.memoisedPlugins[i];
      if (plugin.container === fn) return plugin.transformer;
    }

    var transformer = fn(context);
    PluginManager.memoisedPlugins.push({
      container: fn,
      transformer: transformer
    });
    return transformer;
  }

  /**
   * [Please add a description.]
   */

  static positions = ["before", "after"];

  /**
   * [Please add a description.]
   */

  constructor({ file, transformers, before, after } = { transformers: {}, before: [], after: [] }) {
    this.transformers = transformers;
    this.file         = file;
    this.before       = before;
    this.after        = after;
  }

  /**
   * [Please add a description.]
   */

  subnormaliseString(name, position) {
    // this is a plugin in the form of "foobar" or "foobar:after"
    // where the optional colon is the delimiter for plugin position in the transformer stack

    var match = name.match(/^(.*?):(after|before)$/);
    if (match) [, name, position] = match;

    var loc = util.resolveRelative(`babel-plugin-${name}`) || util.resolveRelative(name);
    if (loc) {
      var plugin = require(loc);
      return {
        position: position,
        plugin:   plugin.default || plugin
      };
    } else {
      throw new ReferenceError(messages.get("pluginUnknown", name));
    }
  }

  /**
   * [Please add a description.]
   */

  validate(name, plugin) {
    // validate transformer key
    var key = plugin.key;
    if (this.transformers[key]) {
      throw new ReferenceError(messages.get("pluginKeyCollision", key));
    }

    // validate Transformer instance
    if (!plugin.buildPass || plugin.constructor.name !== "Plugin") {
      throw new TypeError(messages.get("pluginNotTransformer", name));
    }

    // register as a plugin
    plugin.metadata.plugin = true;
  }

  /**
   * [Please add a description.]
   */

  add(name) {
    var position;
    var plugin;

    if (name) {
      if (typeof name === "object" && name.transformer) {
        ({ transformer: plugin, position } = name);
      } else if (typeof name !== "string") {
        // not a string so we'll just assume that it's a direct Transformer instance, if not then
        // the checks later on will complain
        plugin = name;
      }

      if (typeof name === "string") {
        ({ plugin, position } = this.subnormaliseString(name, position));
      }
    } else {
      throw new TypeError(messages.get("pluginIllegalKind", typeof name, name));
    }

    // default position
    position = position || "before";

    // validate position
    if (PluginManager.positions.indexOf(position) < 0) {
      throw new TypeError(messages.get("pluginIllegalPosition", position, name));
    }

    // allow plugin containers to be specified so they don't have to manually require
    if (typeof plugin === "function") {
      plugin = PluginManager.memoisePluginContainer(plugin);
    }

    //
    this.validate(name, plugin);

    // build!
    var pass = this.transformers[plugin.key] = plugin.buildPass(this.file);
    if (pass.canTransform()) {
      var stack = position === "before" ? this.before : this.after;
      stack.push(pass);
    }
  }
}
