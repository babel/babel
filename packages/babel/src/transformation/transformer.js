import Plugin from "./plugin";

/**
 * [Please add a description.]
 */

export default class Transformer {
  constructor(key, obj) {
    var plugin = {};

    plugin.metadata = obj.metadata;
    delete obj.metadata;

    plugin.visitor = obj;

    return new Plugin(key, plugin);
  }
}
